import { Module } from '@nestjs/common';
import { JwtStrategy } from "@social-network/shared"
import { PostsController } from './posts.controller';

@Module({
    imports: [],
    providers: [JwtStrategy],
    controllers: [PostsController]
})
export class PostsModule {}
