import { Injectable } from '@nestjs/common';
import { ChatGateway } from 'src/events/chat.gateway';

@Injectable()
export class ChatService {
  constructor(private readonly chatGateway: ChatGateway) {}

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
}
