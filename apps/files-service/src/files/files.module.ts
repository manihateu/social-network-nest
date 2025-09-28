import { Module } from '@nestjs/common';
import { FileService } from './files.service';
import { FileController } from './files.controller';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
