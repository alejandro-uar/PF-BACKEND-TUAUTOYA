import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { MessagesService } from 'src/messages/messages.service';
import { Server, Socket } from 'socket.io';
import { Conversation } from 'src/entities/conversation.entity';

@WebSocketGateway({
  cors: {
    origin: ['https://tuautoya.vercel.app','http://localhost:3000'],
    credentials: true
  },
})
export class WebsocketGateway implements OnGatewayConnection {

  @WebSocketServer()
  public server: Server;

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>,
    private readonly messageService: MessagesService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    const { userId = null } = client.handshake.auth;

    if (!userId) {
      client.emit('error', 'ID De Usuario no encontrado');
      return;
    }

    console.log('new connection ', userId);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: {senderId: string, conversationId: string, content: string},
    @ConnectedSocket() client: Socket,
  ){
    const { senderId, conversationId, content } = data
    //Verificar que el emisor y el receptor son usuarios validos
    const sender = await this.userRepository.findOneBy({id: senderId})
    const conversation = await this.conversationRepository.findOneBy({id: conversationId})

    if (!sender || !conversation) {
      client.emit('error', 'Usuario o conversación no encontrado');
      return;
    }

    //Guardar el mensaje en la base de datos
    const message = await this.messageService.createMessage(senderId, conversationId, content)

    //Emitir el mensaje a ambos usuarios
    this.server.emit(`[new-message]:${conversation.id}`, message); // Enviar mensaje al cliente emisor
    // client.to(recipientId).emit('message', message)// Enviar mensaje al propietario (owner)
  }

  @SubscribeMessage('join_chat')
  joinChat(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.userId);  // El cliente se une a una sala de chat correspondiente al usuario
  }
}
