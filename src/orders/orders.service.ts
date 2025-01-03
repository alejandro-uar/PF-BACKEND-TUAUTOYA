import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/cars/cars.enum';
import { Cars } from 'src/entities/cars.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders, OrderStatus } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Orders) private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Cars) private readonly carRepository: Repository<Cars>,
    @InjectRepository(OrderDetails) private readonly orderDetailsRepository: Repository<OrderDetails>
  ){}

  async allOrdersService(){
    const orders = await this.orderRepository.find({
      relations:{
        orderDetails: {
          cars: {
            users:true
          }
        },
        users: true
      }
    })
    return orders
  }

  async getOrderByIdService(id: string){
    const order = await this.orderRepository.findOne({
      where:{id: id},
      relations:{
        orderDetails:{
          cars:true
        }
      }
    })
    if (!order) throw new NotFoundException('Order no encontrada');
    return order
  }

  async cancelOrder(orderId: string){
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { orderDetails: {cars: true }},
    });

    if(!order) throw new NotFoundException('Orderno encontrada');
    if(order.status !== OrderStatus.Active){
      throw new BadRequestException('La orden no puede ser cancelada');
    }

    order.status = OrderStatus.Cancelled;
    await this.orderRepository.save(order);

    const cars = order.orderDetails.cars;
    if(cars && cars.length > 0){
      for(const car of cars){
        car.status = Status.Active;
        await this.carRepository.save(car);
      }
    }
    return `Orden con ID ${orderId} cancelada correctamente`;

  }

  async addOrder(userId: string, cars:{ id: string; rentalDays: number }[], startDate: string, endDate: string){
    const user = await this.userRepository.findOne({ where: { id: userId }});
    if(!user) throw new NotFoundException('Usuario no encontrado');

    const order = new Orders();
    order.orderDate = new Date();
    order.users = user;
    const newOrder = await this.orderRepository.save(order);

    let total = 0;

    const carDetails = await Promise.all(
      cars.map(async(carData) => {
        const car = await this.carRepository.findOne({ where:{ id: carData.id }});
        if(!car) throw new NotFoundException(`El auto con el ID ${carData.id} no fue encontrado.`);
        if(car.status !== 'active') throw new BadRequestException(`El auto con el ID ${carData.id} no esta disponible`);

        const rentalDays = carData.rentalDays;
        const carTotal = rentalDays * car.pricePerDay;

        car.status = Status.Inactive;
        await this.carRepository.save(car);

        total += carTotal;
        return {
          car,
          rentalDays,
          carTotal,
        };
      }),
    );

    // detalle de orden
    const orderDetails = new OrderDetails();
    orderDetails.startDate = new Date(startDate);
    orderDetails.endDate = new Date(endDate);
    orderDetails.price = total;
    orderDetails.subtotal = total;
    orderDetails.order = newOrder;
    orderDetails.cars = carDetails.map((detail) => detail.car);

    await this.orderDetailsRepository.save(orderDetails);

    //asociar los detalles a la orden
    newOrder.orderDetails = orderDetails;
    await this.orderRepository.save(newOrder);

    return this.orderRepository.findOne({
      where: {id: newOrder.id },
      relations: {
        orderDetails: {
          cars: true,
        },
      },
    });
  }
}
