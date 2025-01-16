import { Body, Controller, Get, InternalServerErrorException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('FirebaseToken')
  @ApiOperation({ 
    summary: 'Enviar un mensaje', 
    description: 'Permite a un usuario autenticado enviar un mensaje en una conversación específica.' 
  })
  @ApiBody({ 
    description: 'Detalle del mensaje', 
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'Message content', example: 'Hello!' },
        conversationId: { type: 'string', description: 'ID de la conversacion', example: 'asdasfsdf45651' }
      },
      required: ['content', 'conversationId']
    }
  })
  @ApiResponse({ status: 201, description: 'Mensaje[{}]' })
  @ApiResponse({ status: 404, description: 'Sender with ID not found | Conversation with ID  not found'})
  async sendMessage(@Body() body:{content: string, conversationId: string}, @Request() req) {
    return this.messagesService.createMessage(req.user.sub, body.conversationId, body.content);
  }


  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('FirebaseToken')
  @ApiOperation({ 
    summary: 'Traer todos los mensajes', 
    description: 'Recupera los mensajes de una conversación específica para un usuario autenticado.' 
  })
  @ApiQuery({ 
    name: 'conversationId', 
    type: 'string', 
    description: 'ID de la conversación para recuperar mensajes', 
    example: 'abc123dfsdf2',
    required: true 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Messages retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Message ID', example: 'msg123' },
              content: { type: 'string', description: 'Message content', example: 'Hello, world!' },
              timestamp: { type: 'string', format: 'date-time', description: 'Message timestamp', example: '2024-01-16T14:00:00Z' },
              sender: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'Sender ID', example: 'user123' },
                  name: { type: 'string', description: 'Sender name', example: 'John Doe' },
                  email: { type: 'string', description: 'Sender email', example: 'johndoe@example.com' },
                },
              },
              conversationId: { type: 'string', description: 'Conversation ID', example: 'conv456' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized: User not authenticated.' })
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
