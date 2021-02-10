import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { createLogger, format, Logger, transports } from 'winston';
import { LoggingInterceptor } from './logging.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User example')
    .setDescription('The User API description')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const logger: Logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'User-module' },
    transports: [new transports.Console()],
  });

  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3000 , retryAttempts: 5, retryDelay: 3000 },

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


  await app.listen(process.env.USER_API_PORT);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
