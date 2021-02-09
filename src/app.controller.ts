import { Controller, Get , Inject } from '@nestjs/common';
import { ClientProxy,EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(@Inject('ABCD') private readonly client:   ClientProxy,private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    return this.appService.getHello();
  }

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data);
  }
}
