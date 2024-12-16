import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from 'src/entities/cars.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
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
        orderDetails: true
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

  // async addOrderService(userId: string,cars:any, startDate:string, endDate:string){
  //   const user = await this.userRepository.findOneBy({id:userId})
  //   if(!user) throw new NotFoundException('Usuario no encontrado')
    
  //   const order = new Orders()
  //   order.orderDate = new Date()
  //   order.users = user

  //   const newOrder = await this.orderRepository.save(order)

  //   let total = 0
  //   const carsArray = await Promise.all(
  //     cars.map(async (element)=>{
  //       const car = await this.carRepository.findOneBy({id: element.id})
  //       if(parseInt(car.stock,10)<=0) return {message:"No hay stock"}
  //       total+=Number(car.pricePerDay)
  //       let newStock = Number(car.stock)-1
  //       await this.carRepository.update(
  //         {id: car.id},
  //         {stock: newStock.toString()}
  //       )
  //       return car
  //     })
  //   )
    
  //   const orderDetail = new OrderDetails()
  //   orderDetail.startDate = new Date(startDate)
  //   orderDetail.endDate = new Date(endDate)
  //   orderDetail.price = Number(Number(total).toFixed(2))
  //   orderDetail.subtotal = Number(Number())
  //   orderDetail.cars = carsArray
  //   orderDetail.order = newOrder
  //   await this.orderDetailsRepository.save(orderDetail)

  //   newOrder.orderDetails = orderDetail
  //   await this.orderRepository.save(newOrder)

  //   return this.orderRepository.findOne({
  //     where:{id: newOrder.id},
  //     relations:{
  //       orderDetails:{
  //         cars: true
  //       }
  //     }
  //   })
  // }

  // async addOrderService(userId: string, cars: any, startDate: string, endDate: string) {
  //   // Buscar al usuario
  //   const user = await this.userRepository.findOneBy({ id: userId });
  //   if (!user) throw new NotFoundException('Usuario no encontrado');

  //   // Crear el nuevo pedido
  //   const order = new Orders();
  //   order.orderDate = new Date();
  //   order.users = user;

  //   // Guardar el pedido
  //   const newOrder = await this.orderRepository.save(order);

  //   // Calcular el total
  //   let total = 0;
  //   const carsArray = await Promise.all(
  //       cars.map(async (element) => {
  //           const car = await this.carRepository.findOneBy({ id: element.id });
  //           if (parseInt(car.stock, 10) <= 0) return { message: "No hay stock" };

  //           //Calcular la canti dad de días de alquiler
  //           const start = new Date(startDate);
  //           const end = new Date(endDate);
  //           const diffTime = Math.abs(end.getTime() - start.getTime());
  //           const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Días de alquiler

  //           //Calcular el total por el auto
  //           total += Number (car.pricePerDay) * diffDays;

  //           //Actualizar el stock
  //           let newStock = parseInt(car.stock) - 1;
  //           await this.carRepository.update(
  //               { id: car.id },
  //               { stock: newStock.toString() }
  //           );
  //           return car;
  //       })  
  //   );

  //   // Crear detalles del pedido
  //   const orderDetail = new OrderDetails();
  //   orderDetail.startDate = new Date(startDate);
  //   orderDetail.endDate = new Date(endDate);
  //   orderDetail.price = Number(total.toFixed(2));  // Total calculado
  //   orderDetail.subtotal = Number(total.toFixed(2));  // Subtotal es el mismo que el total
  //   orderDetail.cars = carsArray;
  //   orderDetail.order = newOrder;

  //   //Guardar los detalles del pedido
  //   await this.orderDetailsRepository.save(orderDetail);

  //   //Asociar los detalles del pedido con el pedido principal
  //   newOrder.orderDetails = orderDetail;
  //   await this.orderRepository.save(newOrder);

  //   // // Retornar el pedido con sus detalles
  //   return this.orderRepository.findOne({
  //       where: { id: newOrder.id },
  //       relations: {
  //           orderDetails: {
  //               cars: true
  //           }
  //       }
  //   });
  // }
}
