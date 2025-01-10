import { Body, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';
import { CreateConversationDto } from './dto/create.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async handleConversation(
    @Body() createConversationDto: CreateConversationDto
  ) {
    try {
      const conversation = await this.conversationService.getOrCreateConversation(createConversationDto);

      return conversation;
    }catch (e) {
      console.log(e);
      throw new InternalServerErrorException()
    }
  }
}
