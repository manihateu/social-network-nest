import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { CreatePostCommand } from '../impl/create-post.command';
import { UpdatePostCommand } from '../impl/update-post.command';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(private prisma: PrismaClient) {}

  async execute(command: UpdatePostCommand) {
    const { userId, postId, ...dto } = command;
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (post.authorId !== userId) throw new ForbiddenException();

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }
}
