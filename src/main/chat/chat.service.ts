import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ChatGateway } from 'src/events/chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatGateway: ChatGateway,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  broadcastMessage(message: string) {
    this.chatGateway.handleMessage(message);
  }

  forwardMessage(senderId: string, recipientId: string, message: string) {
    this.chatGateway.server
      .to(senderId)
      .emit('sendMessage', { recipientId, message });
  }

  privateMessage(recipientId: string, message: string) {
    this.chatGateway.privateMessage(recipientId, message);
  }

  async getClientIdFromStorage() {
    let cachedData: { id: string }[] =
      await this.cacheManager.get('socketClients');

    return cachedData;
  }
}
