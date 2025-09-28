import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreatePostDto,
  CurrentUser,
  JwtAuthGuard,
  UpdatePostDto,
  UserFromReq,
} from '@social-network/shared';
import { FilesInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POSTS_SERVICE') private readonly postsClient: ClientProxy,
    @Inject('FILES_SERVICE') private readonly filesClient: ClientProxy
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/')
  async createPost(
    @CurrentUser() user: UserFromReq,
    @Body() dto: CreatePostDto,
    @UploadedFiles() files
  ) {
    const post = await firstValueFrom(
      this.postsClient.send({ cmd: 'create-post' }, dto)
    );
    if (files) {
      const urls: { url: string; key: string }[] = await firstValueFrom(
        this.filesClient.send({ cmd: 'upload-files' }, files)
      );
      const data: UpdatePostDto = {
        postId: post.id,
        userId: user.userId,
        files: urls.map((url) => url.url),
      };
      return firstValueFrom(
        this.postsClient.send({ cmd: 'update-post' }, data)
      );
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return firstValueFrom(
      this.postsClient.send({ cmd: 'by-id' }, { postId: id })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getMyPosts(@CurrentUser() user: UserFromReq) {
    return firstValueFrom(
      this.postsClient.send({ cmd: 'get-my-posts' }, { authorId: user.userId })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updatePost(@CurrentUser() user: UserFromReq, dto: UpdatePostDto) {
    return firstValueFrom(
      this.postsClient.send(
        { cmd: 'update-post' },
        { ...dto, userId: user.userId }
      )
    );
  }
}
