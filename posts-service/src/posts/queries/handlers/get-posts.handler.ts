import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { GetMyPostsQuery } from '../impl/get-my-posts.query';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetMyPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetMyPostsQuery> {
  constructor(private prisma: PrismaClient) {}

  async execute(query: GetMyPostsQuery) {
    if (query.authorId) {
      return this.prisma.post.findMany({ where: { authorId: query.authorId } });
    }
    throw new BadRequestException()
  }
}
