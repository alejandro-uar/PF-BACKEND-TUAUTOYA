import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/entities/messages.entity';
import { Users } from 'src/entities/users.entity';
import { Conversation } from 'src/entities/conversation.entity';
import { FirebaseService } from 'src/firebase/firebase-admin.service';
import { UsersService } from 'src/users/users.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Messages,Users, Conversation]), MailerModule],
  controllers: [MessagesController],
  providers: [MessagesService, FirebaseService, UsersService],
})
export class MessagesModule {}
