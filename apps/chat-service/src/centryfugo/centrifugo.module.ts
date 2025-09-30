import { Module } from '@nestjs/common';
import { CentrifugoService } from './centrifugo.service';

@Module({
  providers: [CentrifugoService],
  exports: [CentrifugoService]
})
export class CentrifugoModule {}
