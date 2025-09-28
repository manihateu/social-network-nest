import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [PostsModule, ConfigModule.forRoot()],
})
export class AppModule {}
