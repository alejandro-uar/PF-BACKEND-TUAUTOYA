import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Cars } from 'src/entities/cars.entity';
import { PaymentService } from 'src/payment/payment.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Users, Cars]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService],
  exports: [OrdersService],
})
export class OrdersModule {}
