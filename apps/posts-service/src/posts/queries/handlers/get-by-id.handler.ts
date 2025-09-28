import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { GetPostByIdQuery } from '../impl/get-by-id.query';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(private prisma: PrismaClient) {}

  async execute(query: GetPostByIdQuery) {
    if (query.postId) {
      return this.prisma.post.findFirst({ where: { id: query.postId } });
    }
    throw new BadRequestException();
  }
}
