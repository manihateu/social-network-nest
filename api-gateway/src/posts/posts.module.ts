import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [
      {
          name: "POSTS_SERVICE",
          transport: Transport.RMQ,
          options: {
              urls: [process.env.RMQ_URL],
              queue: 'posts_queue',
              queueOptions: {
                  durable: false
              },
          },
      },
      {
          name: "FILES_SERVICE",
          transport: Transport.RMQ,
          options: {
              urls: [process.env.RMQ_URL],
              queue: 'posts_queue',
              queueOptions: {
                  durable: false
              },
          },
      }
  ])],
  controllers: [PostsController]
})
export class PostsModule {}
