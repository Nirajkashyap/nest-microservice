import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { createLogger, format, Logger, transports } from 'winston';
import { LoggingInterceptor } from './logging.interceptor';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  
  const options = new DocumentBuilder()
    .setTitle('Order example')
    .setDescription('The Order API description')
    .setVersion('1.0')
    .addTag('Order')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const logger: Logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'Order-module' },
    transports: [new transports.Console()],
  });

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  console.log('order module')
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3001, retryAttempts: 5, retryDelay: 3000 },

    // transport: Transport.RMQ,
    // options: {
    //   urls: ['amqp://guest:guest@localhost:5672/hello'],
    //   queue: 'user-messages',
    //   queueOptions: {
    //     durable: false
    //   },
    // },
  });
  

  await app.startAllMicroservicesAsync();
  console.log('order module 2')

  await app.listen(process.env.ORDER_API_PORT);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
