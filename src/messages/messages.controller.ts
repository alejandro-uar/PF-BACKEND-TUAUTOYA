import { Body, Controller, Get, InternalServerErrorException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async sendMessage(@Body() body:{content: string, conversationId: string}, @Request() req) {
    return this.messagesService.createMessage(req.user.sub, body.conversationId, body.content);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async getMessages(@Query() query: { conversationId: string }, @Request() req) {
    try {
      const messages = await this.messagesService.getMessages(
        query.conversationId,
        req.user.sub
      );

      return {
        messages
      }
    }catch (e) {
      console.log(e);
      throw new InternalServerErrorException()
    }
  }

}
