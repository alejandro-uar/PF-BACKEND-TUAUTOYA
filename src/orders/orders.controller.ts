import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async addOrder(@Body() createOrderDto: CreateOrderDTO){
    const { userId, cars, startDate, endDate } = createOrderDto;
    return await this.ordersService.addOrder(userId, cars, startDate, endDate)
  }

  @Delete('id/cancel')
  async cancelOrder(@Param('id') orderId:string){
    return await this.ordersService.cancelOrder(orderId);
  }
}
