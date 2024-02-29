import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [EventsGateway, ChatGateway],
})
export class EventsModule {}
