import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: 'posts_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
  Logger.log(
    `🚀 Posts microservice is running`
  );
}

bootstrap();
