import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/order.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperar todas las ordenes' })  
  @ApiResponse({ status: 200, description: 'Successful request, Orders[{}]'}) 
  @ApiResponse({ status: 404, description: 'Orders not found' }) 
  async findOrders(){
    return await this.ordersService.allOrdersService()
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiParam({
    name: 'userId',
    description: 'El ID del usuario para obtener todas las ordenes',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Orders found',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object', description: 'User data' },
        orders: { type: 'array', items: { type: 'object', description: 'Order data' } }
      }
    }
  })
  async getUserOrders(@Param('userId') userId: string) {
    return await this.ordersService.getUserOrdersService(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar la order por su ID' })
  @ApiParam({
    name: 'id',
    description: 'Trear todos los datos por su ID',
    required: true,
    type: String,
  })
  
  @ApiResponse({
    status: 200,
    description: 'Order found',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        orderDate: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        paymentStatus: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        price: { type: 'number' },
        subtotal: { type: 'number' },
        cars: { type: 'array', items: { type: 'object', description: 'Car data' } },
      }
    }
  })
  @ApiResponse({status: 404, description: 'Order not found'})
  async findOrderById(@Param('id') id:string){
    return await this.ordersService.getOrderByIdService(id)
  }

  @Post()
  @ApiOperation({ summary: 'Crear una orden' })
  @ApiBody({
    description: 'Datos para crear un nuevo orden',
    type: CreateOrderDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Order successfully created',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        orderDate: { type: 'string', format: 'date-time' },
        status: { type: 'string' },
        paymentStatus: { type: 'string' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        price: { type: 'number' },
        subtotal: { type: 'number' },
        cars: { type: 'array', items: { type: 'object', description: 'Car data' } },
      }
    }
  })
  @ApiResponse({status: 400})
  async addOrder(@Body() createOrderDto: CreateOrderDTO){
    const { userId, cars, startDate, endDate } = createOrderDto;
    return await this.ordersService.addOrder(userId, cars, startDate, endDate)
  }

  @Put('/:orderId')
  @ApiOperation({ summary: 'Actualizar el estado de una orden'})
  @ApiParam({
    name: 'orderId',
    description: 'ID de la orden',
    type: String,
  })
  @ApiBody({
    description: 'Estado de la orden a actualizar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Order[{}]',
  })
  @ApiResponse({
    status: 404,
    description: 'Order no encontrada',
  })
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }


  @Delete('id/cancel')
  @ApiOperation({ summary: 'Cancelar una orden' })
  @ApiResponse({
    status: 200,
    description: 'Order successfully canceled',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden a cancelar',
    type: String,
  })
  async cancelOrder(@Param('id') orderId:string){
    return await this.ordersService.cancelOrder(orderId);
  }

  @Get('summary/general')
  @ApiOperation({ summary: 'Suma general de todas las ordenes' })
  @ApiResponse({
    status: 200,
    description: 'General summary of orders, including total accumulated and weekly summary',
    schema: {
      type: 'object',
      properties: {
        totalAccumulated: { type: 'number', description: 'Total accumulated price of all orders' },
        weeklySummary: {
          type: 'array',
          description: 'Weekly summary of orders',
          items: {
            type: 'object',
            properties: {
              week: { type: 'string', format: 'date-time', description: 'Start date of the week' },
              total: { type: 'number', description: 'Total earnings for the week' },
              orderCount: { type: 'number', description: 'Number of orders for the week' },
            },
          },
        },
      },
    },
  })
  async getOrdersSummary() {
    return await this.ordersService.getTotalAndWeeklySummary();
  }


  @Get('user/:userId/earnings')
  @ApiOperation({ summary: 'Recuperar ganancias de los usuarios por un mes y un año específicos' })
  @ApiResponse({
    status: 200,
    description: 'User earnings summary for the specified year and month',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
            name: { type: 'string', description: 'User name' },
            email: { type: 'string', description: 'User email' },
          },
        },
        year: { type: 'number', description: 'Year for the earnings summary' },
        month: { type: 'number', description: 'Month for the earnings summary' },
        totalEarnings: { type: 'number', description: 'Total earnings for the specified month' },
        weeklySummary: {
          type: 'array',
          description: 'Weekly earnings summary for the specified month',
          items: {
            type: 'object',
            properties: {
              week: { type: 'string', format: 'date-time', description: 'Start date of the week' },
              total: { type: 'number', description: 'Total earnings for the week' },
              orderCount: { type: 'number', description: 'Number of orders for the week' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserEarnings(
    @Param('userId') userId: string,
    @Query('year') year: string,
    @Query('month') month: string
  ) {
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      throw new Error('Invalid year or month');
    }

    return await this.ordersService.getUserEarningsSummary(userId, yearNum, monthNum);
  }
}
