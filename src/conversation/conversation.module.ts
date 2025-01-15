import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { FirebaseService } from 'src/firebase/firebase-admin.service';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entities/users.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Users]), MailerModule],
  controllers: [ConversationController],
  providers: [ConversationService, FirebaseService, UsersService],
})
export class ConversationModule {}
