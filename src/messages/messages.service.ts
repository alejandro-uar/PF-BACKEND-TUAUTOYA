import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Messages } from 'src/entities/messages.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Messages) private readonly messageRepository: Repository<Messages>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>
    ){}

    async createMessage(senderId: string, conversationId: string, content: string) {
        const sender = await this.userRepository.findOneBy({id: senderId})
        const conversation = await this.conversationRepository.findOneBy({id: conversationId})

        if(!sender) {
            throw new NotFoundException(`Sender with ID ${senderId} not found`);
        }

        if(!conversation) {
            throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
        }

        const message = this.messageRepository.create({
            sender,
            content,
            conversationId
        })

        //Guardar el mensaje 
        return await this.messageRepository.save(message)
    }

    async getMessages(conversationId: string, userId: string): Promise<Messages[]> {
        return await this.messageRepository.find({
          where: [
            { conversationId, conversation: { memberOneId: userId } },
            { conversationId, conversation: { memberTwoId: userId } },
          ],
          order: { timestamp: 'ASC' },
          select: {
            sender: {
                email: true,
                id: true,
                name: true,
            }
          },
          relations: ['conversation', 'sender'], // Asegúrate de cargar las relaciones
        });
    }
}
