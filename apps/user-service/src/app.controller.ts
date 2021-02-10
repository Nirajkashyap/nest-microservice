import { Controller, Get , Inject } from '@nestjs/common';
import { ClientProxy,EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(@Inject('ORDER_SERVICE') private readonly client:   ClientProxy,private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.client.emit<any>('message_printed_2', new Message('Hello World from user'));
    return this.appService.getHello();
  }

  @EventPattern('message_printed_1')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data);
  }
}
