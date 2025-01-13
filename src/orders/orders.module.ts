import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { Cars } from 'src/entities/cars.entity';
import { PaymentService } from 'src/payment/payment.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerController } from 'src/mailer/mailer.controller';
import { MailerService } from 'src/mailer/mailer.service';
// import { MailModule } from 'src/mail/mail.module';
// import { MailController } from 'src/mail/mail.controller';
// import { MailService } from 'src/mail/mail.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, Users, Cars]), MailerModule,
  ],
  controllers: [OrdersController, MailerController],
  providers: [OrdersService, PaymentService, MailerService],
  exports: [OrdersService],
})
export class OrdersModule {}
