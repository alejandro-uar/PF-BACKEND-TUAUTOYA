import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/cars/cars.enum';
import { Cars } from 'src/entities/cars.entity';
import { Orders, OrderStatus } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { PaymentService } from 'src/payment/payment.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Orders) private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Cars) private readonly carRepository: Repository<Cars>,
    private readonly mercadoPagoService: PaymentService,
    private readonly mailerService: MailerService,
  ){}

  async allOrdersService(){
    const orders = await this.orderRepository.find({
      relations:{
          cars: {
            users:true
          }
        }
    })
    return orders
  }

  async getOrderByIdService(id: string){
    const order = await this.orderRepository.findOne({
      where:{id: id},
      relations:{ cars:true }
    })

    if (!order) throw new NotFoundException('Order no encontrada');
    return order
  }

  async cancelOrder(orderId: string){
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { cars: true },
    });

    if(!order) throw new NotFoundException('Orderno encontrada');
    if(order.status !== OrderStatus.Active){
      throw new BadRequestException('La orden no puede ser cancelada');
    }

    order.status = OrderStatus.Cancelled;
    await this.orderRepository.save(order);

    const cars = order.cars;
    if(cars && cars.length > 0){
      for(const car of cars){
        car.status = Status.Active;
        await this.carRepository.save(car);
      }
    }
    return `Orden con ID ${orderId} cancelada correctamente`;

  }

  async updateOrderStatus(orderId: string, status: string) {
    const result = await this.orderRepository.update(
      { id: orderId },
      { paymentStatus: status }
    );
  
    if (result.affected === 0) {
      throw new NotFoundException('Orden no encontrada');
    }
  
    return this.orderRepository.findOne({ where: { id: orderId } });
  }
  

async addOrder(
  userId: string,
  cars: { id: string }[],
  startDate: string,
  endDate: string
) {
  // Obtener usuario
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('Usuario no encontrado');

  let total = 0;

  // Validar y procesar los autos
  const carDetails = await Promise.all(
    cars.map(async (carData) => {
      const car = await this.carRepository.findOne({ where: { id: carData.id } });
      if (!car) throw new NotFoundException(`El auto con el ID ${carData.id} no fue encontrado.`);
      if (car.status !== 'active')
        throw new BadRequestException(`El auto con el ID ${carData.id} no está disponible`);

      let start = parseInt(startDate.split('-')[2])
      let end = parseInt(endDate.split('-')[2])
      let rentalDays = end - start;
      const carTotal = rentalDays * car.pricePerDay;

      total += carTotal;

      return {
        car,
        rentalDays,
        carTotal,
      };
    })
  );

  // Crear nueva orden
  const order = new Orders();
  order.orderDate = new Date();
  order.startDate = new Date(startDate);
  order.endDate = new Date(endDate);
  order.price = total;
  order.subtotal = total;
  order.users = user;
  const newOrder = await this.orderRepository.save(order);

  // Actualizar estado de los autos usando QueryBuilder
  await Promise.all(
    carDetails.map(async (detail) => {
      await this.carRepository
        .createQueryBuilder()
        .update(Cars) 
        .set({ status: Status.Inactive }) 
        .where('id = :id', { id: detail.car.id }) 
        .execute();
    })
  );

  await this.mailerService.mailOrderConfirmed(order.users.email);

  // Crear preferencia en Mercado Pago
  const paymentPreference = await this.mercadoPagoService.createPreference(total, newOrder.id, user.email);



  // Retornar resultado
  return {
    orderId: newOrder.id,
    paymentLink: paymentPreference.init_point,
  };
}

async getUserOrdersService(userId: string) {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const orders = await this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.cars', 'car')
    .leftJoinAndSelect('car.users', 'carOwner')
    .where('order.users = :userId', { userId })
    .orderBy('order.orderDate', 'DESC')
    .getMany();

  if (orders.length === 0) {
    return { message: 'No orders found for this user' };
  }

  const userOrders = orders.map(order => ({
    id: order.id,
    orderDate: order.orderDate,
    status: order.status,
    paymentStatus: order.paymentStatus,
    startDate: order.startDate,
    endDate: order.endDate,
    price: order.price,
    subtotal: order.subtotal,
    cars: order.cars
  }));

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city
    },
    orders: userOrders
  };
}

async getTotalAndWeeklySummary() {
  const totalAccumulated = await this.orderRepository
    .createQueryBuilder('order')
    .select('SUM(order.price)', 'total')
    .getRawOne();

  const weeklySummary = await this.orderRepository
    .createQueryBuilder('order')
    .select([
      "DATE_TRUNC('week', order.orderDate) AS week",
      'SUM(order.price) AS total',
      'COUNT(order.id) AS orderCount'
    ])
    .groupBy("DATE_TRUNC('week', order.orderDate)")
    .orderBy("DATE_TRUNC('week', order.orderDate)", 'DESC')
    .getRawMany();

  return {
    totalAccumulated: Number(totalAccumulated.total) || 0,
    weeklySummary: weeklySummary.map(summary => ({
      week: summary.week,
      total: Number(summary.total) || 0,
      orderCount: Number(summary.orderCount) || 0
    }))
  };
}

async getUserEarningsSummary(userId: string, year: number, month: number) {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if(!user) {
    throw new NotFoundException('User not found');
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const totalEarnings = await this.orderRepository
  .createQueryBuilder('order')
  .leftJoin('order.cars', 'car')
  .where('car.users = :userId', { userId })
  .andWhere('order.orderDate >= :startDate', { startDate })
  .andWhere('order.orderDate <= :endDate', { endDate })
  .select('SUM(order.orice)', 'total')
  .getRawOne();

  const weeklySummary = await this.orderRepository
  .createQueryBuilder('order')
  .leftJoin('order.cars', 'car')
  .where('car.users = :userID', { userId })
  .andWhere('order.orderDate >= :startDate', { startDate })
  .andWhere('order.orderDate <= :endDate', { endDate })
  .select([
    "DATE_TRUNC('week', order.orderDate) AS week",
    'SUM(order.price) AS total',
    'COUNT(order.id) AS orderCount'
  ])
  .groupBy("date_trunc('week', order.orderDate)")
  .orderBy("date_trunc('week', order.orderDate)", 'ASC')
  .getRawMany();

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    year,
    month,
    totalEarnings: Number(totalEarnings.total) || 0,
    weeklySummary: weeklySummary.map(summary => ({
      week: summary.week,
      total: Number(summary.total) || 0,
      orderCount: Number(summary.orderCount) || 0
    }))
  };
}

}
