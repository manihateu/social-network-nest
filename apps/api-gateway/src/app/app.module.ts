import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [AuthModule, PostsModule, ConfigModule.forRoot()],
})
export class AppModule {}
