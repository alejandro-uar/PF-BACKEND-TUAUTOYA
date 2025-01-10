import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MessagesService } from 'src/messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { Messages } from 'src/entities/messages.entity';
import { Conversation } from 'src/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Messages, Conversation]), MessagesModule],
  providers: [WebsocketGateway, MessagesService],
})
export class WebsocketModule {}
