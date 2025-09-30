import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ChatController],
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'chat_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ]
})
export class ChatModule {}
