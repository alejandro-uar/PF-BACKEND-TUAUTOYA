import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findOrders(){
    return await this.ordersService.allOrdersService()
  }

  @Get(':id')
  async findOrderById(@Param('id') id:string){
    return await this.ordersService.getOrderByIdService(id)
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDTO){
    const {usersId, cars, startDate, endDate} = order
    // return await this.ordersService.addOrderService(usersId, cars, startDate, endDate)
    return order
  }
}
