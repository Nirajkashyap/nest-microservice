import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy,EventPattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { Message } from './message.event';

@Controller()
export class OrderController {
  constructor(@Inject('USER_SERVICE') private readonly client:   ClientProxy,private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    this.client.emit<any>('message_printed_1', new Message('Hello World from order'));
    return this.orderService.getHello();
  }

  @EventPattern('message_printed_2')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data);
  }
}
