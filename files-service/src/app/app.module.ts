import { Module } from '@nestjs/common';
import { FileModule } from '../files/files.module';
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [FileModule, ConfigModule.forRoot()],
})
export class AppModule {}
