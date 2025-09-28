import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaClient } from '@prisma/client';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { GetPostsHandler } from './queries/handlers/get-posts.handler';

const CommadsHandlers = [CreatePostHandler]
const QueryHandlers = [GetPostsHandler]
@Module({
    imports: [CqrsModule],
    providers: [PrismaClient, ...CommadsHandlers, ...QueryHandlers],
    controllers: [PostsController]
})
export class PostsModule {}
