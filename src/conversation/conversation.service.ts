import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create.dto';

@Injectable()
export class ConversationService {

    constructor(
        @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>,
    ){}

    private async createNewConversation({ memberOneId, memberTwoId }: CreateConversationDto) {
        const conversation = this.conversationRepository.create({
            memberOneId,
            memberTwoId
        })

        const savedConversation = await this.conversationRepository.save(conversation);

        return await this.conversationRepository.findOne({
            where: { id: savedConversation.id },
            relations: ['memberOne', 'memberTwo']
        })
    }

    private async findConversation(memberOneId: string, memberTwoId: string) {
        return await this.conversationRepository.findOne({
            where: {
                memberOneId,
                memberTwoId
            },
            relations: ['memberOne', 'memberTwo']
        })
    }

    async getOrCreateConversation({ memberOneId, memberTwoId }: CreateConversationDto) {
        let conversation = await this.findConversation(memberOneId, memberTwoId) || await this.findConversation(memberTwoId, memberOneId);

        if (!conversation) {
            conversation = await this.createNewConversation({ memberOneId, memberTwoId });
        }

        return conversation;
    }

}
