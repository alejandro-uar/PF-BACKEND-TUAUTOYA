import { BadRequestException, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

@Injectable()
export class PaymentService {
    private client: MercadoPagoConfig;
    private preference: Preference;
    private payment: Payment;

    constructor() {
        this.client = new MercadoPagoConfig({
            accessToken: process.env.ACCESS_TOKEN_MERCADO_PAGO, // Tu Access Token de sandbox
            options: {
                timeout: 5000,
            }
        });

        this.payment = new Payment(this.client);
        this.preference = new Preference(this.client)
    }

  async createPreference(amount: number, orderId: string) {
    const items = [
      {
        id: 'alquiler-auto',
        title: 'Alquiler de auto',
        unit_price: Number(amount),
        quantity: 1,
      },
    ];

    try {
      const response = await this.preference.create({
        body: {
          items,
          back_urls: {
            success: 'http://localhost:3000/payments/success',
            failure: 'http://localhost:3000/payments/failure',
          },
          notification_url: 'https://d767-2803-9800-9400-4b56-91e4-e2fe-a075-671.ngrok-free.app/payments/webhook',
          metadata: {
            orderId, // Asociar la orden al pago.
          },
        },
      });

      return response;
    } catch (error) {
      console.error('Error al crear la preferencia', error);
      throw new BadRequestException('No se pudo crear la preferencia de pago.');
    }
  }

  async getPaymentById(paymentId: string) {
    try {
      const { status, status_detail, metadata } = await this.payment.get({
        id: paymentId,
      });
      return { status, status_detail, metadata };
    } catch (error) {
      console.error('Error al obtener el pago', error);
      throw new BadRequestException('Error al obtener el pago.');
    }
  }
}
