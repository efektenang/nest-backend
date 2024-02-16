import { Controller, Get } from '@nestjs/common';
import { App2Service } from './app2.service';

@Controller()
export class App2Controller {
  constructor(private readonly appService: App2Service) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
