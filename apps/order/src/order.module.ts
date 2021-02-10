import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'HELLO_SERVICE', transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqp://guest:guest@localhost:5672/hello'],
      //     queue: 'user-messages',
      //     queueOptions: {
      //       durable: false
      //     },
      //   },
      // },
      {
        name: 'USER_SERVICE' , transport: Transport.TCP
        // options: { retryAttempts: 5, retryDelay: 3000 },
      }
    ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
