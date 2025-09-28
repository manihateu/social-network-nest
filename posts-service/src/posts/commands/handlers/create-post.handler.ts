import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { CreatePostCommand } from '../impl/create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private prisma: PrismaClient) {}

  async execute(command: CreatePostCommand) {
    const { authorId, content } = command;
    const post = await this.prisma.post.create({
      data: { authorId, content, commentIds: [] },
    });
    return post;
  }
}
