import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async chat(@Body() body: any) {
    const { message } = body;

    this.chatService.broadcastMessage(message);
    return { success: true };
  }

  @Post('private-chat')
  @HttpCode(201)
  async privateChat(@Body() body: any) {
    const { recipientId, message } = body;

    this.chatService.privateMessage(recipientId, message);
    return { success: true };
  }

  @Post('repeat-chat')
  @HttpCode(201)
  repeatChat(@Body() body: any) {
    const { senderId, recipientId, message } = body;
    this.chatService.forwardMessage(senderId, recipientId, message);
    return { success: true };
  }

  @Get('client-id')
  async getClientId() {
    return this.chatService.getClientIdFromStorage();
  }
}
