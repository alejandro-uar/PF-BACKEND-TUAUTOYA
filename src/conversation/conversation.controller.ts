import { Body, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { FirebaseAuthGuard } from 'src/guards/fireabase-auth.guard';
import { CreateConversationDto } from './dto/create.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('FirebaseToken')
  @ApiOperation({
    summary: 'Crear o recuperar una conversacion',
    description: 'Crea una nueva conversación si no existe o recupera la conversación existente entre dos miembros.',
  })
  @ApiBody({
    type: CreateConversationDto,
    description: 'All',
  })
  @ApiResponse({
    status: 201,
    description: 'Conversacion creada o recuperada con exito',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Conversation ID', example: 'conv123' },
        memberOneId: { type: 'string', description: 'ID of the first member', example: 'user123' },
        memberTwoId: { type: 'string', description: 'ID of the second member', example: 'user456' },
        memberOne: {
          type: 'object',
          description: 'Detalles del primer miembro',
          properties: {
            id: { type: 'string', description: 'Member ID', example: 'user123' },
            name: { type: 'string', description: 'Name of the member', example: 'John Doe' },
            email: { type: 'string', description: 'Email of the member', example: 'johndoe@example.com' },
          },
        },
        memberTwo: {
          type: 'object',
          description: 'Detalles del segundo miembro',
          properties: {
            id: { type: 'string', description: 'Member ID', example: 'user456' },
            name: { type: 'string', description: 'Name of the member', example: 'Jane Doe' },
            email: { type: 'string', description: 'Email of the member', example: 'janedoe@example.com' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: User not authenticated.',
  })
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
