import { Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  async handleConnection(client: Socket) {
    // create new socketClients storage if clientsData is empty
    const cachedData = await this.cacheManager.get('socketClients');
    if (!cachedData) {
      const clientsData = [{id: client.id}];
      await this.cacheManager.set('socketClients', clientsData);
      return clientsData;
    }

    // add new client in socketClients storage
    let clientData: { id: string }[] = await this.cacheManager.get('socketClients');
    let newClient = { id: client.id };
    clientData.push(newClient);
    this.cacheManager.set('socketClients', clientData);

    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    let cachedData: {id: string}[] = await this.cacheManager.get('socketClients')
    
    // remove current client from storage when disconnect
    cachedData = cachedData.filter(obj => obj.id !== client.id);
    this.cacheManager.set('socketClients', cachedData)
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notifyLogin')
  onNotifyLogin(user: any) {
    console.log(user);
    this.server.emit('notifyLogin', {
      msg: `${user.email} is logged in`,
      data: user,
    });
  }

  @SubscribeMessage('message')
  onMessageWs(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    this.server.emit('message', {
      message: data,
      clientId: client.id,
    });
  }
}
