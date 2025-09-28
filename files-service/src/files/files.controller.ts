import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern({ cmd: 'upload-file' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.fileService.uploadFile(file);
  }

  @MessagePattern({ cmd: 'delete-file' })
  async deleteFile(@Payload() data: { key: string }) {
    return this.fileService.deleteFile(data.key);
  }
}
