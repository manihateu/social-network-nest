import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendMessageCommand } from '../centryfugo/commands/send-message.command';

@Controller()
export class ChatController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern({ cmd: 'send-message' })
  async sendMessage(@Payload() data: { chatId: string; authorId: string; text: string }) {
    return this.commandBus.execute(new SendMessageCommand(data.chatId, data.authorId, data.text));
  }
}
