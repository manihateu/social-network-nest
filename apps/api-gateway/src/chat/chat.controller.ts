import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard, CurrentUser, UserFromReq } from '@social-network/shared';
import { firstValueFrom } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private readonly chatClient: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(@CurrentUser() user: UserFromReq, @Body() dto: { chatId: string; text: string }) {
    return firstValueFrom(
      this.chatClient.send({ cmd: 'send-message' }, { ...dto, authorId: user.userId }),
    );
  }
}
