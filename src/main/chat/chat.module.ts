import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from 'src/events/chat.gateway';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
