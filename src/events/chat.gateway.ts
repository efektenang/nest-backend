import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chatMessage')
  handleMessage(payload: any): void {
      this.server.emit('chatMessage', {
        payload
    });
  }

  @SubscribeMessage('sendMessage')
  repeatMessage(client: Socket, payload: any): void {
    const { recipientId, message } = payload;
    client.to(recipientId).emit('chatMessage', {
      payload,
    });
  }

  @SubscribeMessage('privateMessage')
  privateMessage(client: string, payload: any): void {
    this.server.to(client).emit('chatMessage', {
      from: client,
      message: payload
    });
  }
}
