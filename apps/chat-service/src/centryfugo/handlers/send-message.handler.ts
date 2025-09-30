import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/client';
import { CentrifugoService } from '../centrifugo.service';
import { SendMessageCommand } from '../commands/send-message.command';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly centrifugo: CentrifugoService,
  ) {}

  async execute(command: SendMessageCommand) {
    const { chatId, authorId, text } = command;

    const message = await this.prisma.message.create({
      data: { chatId, authorId, text },
    });

    await this.centrifugo.publish(`chat:${chatId}`, {
      type: 'new_message',
      message,
    });

    return message;
  }
}
