import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        transport: Transport.TCP,
        // options: { retryAttempts: 5, retryDelay: 3000 },
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
