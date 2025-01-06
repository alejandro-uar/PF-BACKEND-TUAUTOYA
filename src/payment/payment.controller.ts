import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly mercadoPagoService: PaymentService,
    private readonly ordersService: OrdersService, // Para actualizar el estado de la orden
  ) {}


  @Post('webhook')
  async webhook(@Query() queries) {
    try {
      if (queries.type === 'payment') {
        // Obtener el ID de pago de la notificación
        const payment = await this.mercadoPagoService.getPaymentById(
          queries['data.id'],
        );

        // Comprobar si el estado del pago es 'approved'
        if (payment.status === 'approved') {
          const orderId = payment.metadata.orderId; // Obtener el ID de la orden asociada
          await this.ordersService.updateOrderStatus(orderId, 'PAID'); // Actualizar el estado de la orden
        } else {
          console.log('El pago no fue aprobado:', payment.status);
        }
      }
      return { status: 'OK' }; // Responder a Mercado Pago con un estado exitoso
    } catch (error) {
      console.error('Error en el webhook de Mercado Pago:', error);
      throw new HttpException(
        'Error al procesar la notificación del pago.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get('success')
  async success(@Query() queries) {
    // Aquí puedes procesar los detalles adicionales si lo necesitas.
    const paymentId = queries.payment_id; // Obtener el ID de pago desde las query params
    const payment = await this.mercadoPagoService.getPaymentById(paymentId); // Obtener el detalle del pago

    if (payment.status === 'approved') {
      const orderId = payment.metadata.orderId; // Obtener el ID de la orden
      await this.ordersService.updateOrderStatus(orderId, 'PAID'); // Actualizar la orden a 'PAID'
      // Aquí también podrías enviar un mensaje de éxito al cliente
      return { message: 'Pago aprobado, gracias por tu compra' };
    } else {
      // Manejo de pagos no aprobados
      return { message: 'El pago no fue aprobado. Por favor, inténtalo de nuevo.' };
    }
  }


  @Get('failure')
  async failure(@Query() queries) {
    // Aquí puedes procesar los detalles adicionales si lo necesitas.
    return { message: 'Pago fallido, por favor intente nuevamente.' };
  }
}
