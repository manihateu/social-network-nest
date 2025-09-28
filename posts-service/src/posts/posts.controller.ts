import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostCommand } from './commands/impl/create-post.command';
import { CreatePostDto, GetMyPostsDto, UpdatePostDto } from '@social-network/shared';
import { GetMyPostsQuery } from './queries/impl/get-my-posts.query';
import { UpdatePostCommand } from './commands/impl/update-post.command';
import { GetPostByIdQuery } from './queries/impl/get-by-id.query';

@Controller()
export class PostsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @MessagePattern({ cmd: 'create-post' })
    async createPost(@Payload() data: CreatePostDto) {
        return this.commandBus.execute(
            new CreatePostCommand(data.authorId, data.content),
        );
    }

    @MessagePattern({ cmd: 'get-my-posts' })
    async getMyPosts(@Payload() data: GetMyPostsDto) {
        return this.queryBus.execute(new GetMyPostsQuery(data.authorId));
    }

    @MessagePattern({ cmd: 'update-post' })
    async updatePost(@Payload() data: UpdatePostDto) {
        return this.queryBus.execute(new UpdatePostCommand(data.postId, data.userId, data.content, data.files));
    }

    @MessagePattern({ cmd: 'by-id' })
    async getPostById(@Payload() data: Pick<UpdatePostDto, "postId">) {
        return this.queryBus.execute(new GetPostByIdQuery(data.postId));
    }
}
