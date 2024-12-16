import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Cars } from 'src/entities/cars.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, Cars,OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
