import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: { origin: '*' }})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notifyLogin')
  onNotifyLogin(user: any) {
    console.log(user)
    this.server.emit('notifyLogin', {
      msg: `${user.email} is logged in`,
      data: user
    })
  }

  @SubscribeMessage('message')
  onMessageWs(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    this.server.emit('message', {
      message: data,
      clientId: client.id
    })
  }
}
