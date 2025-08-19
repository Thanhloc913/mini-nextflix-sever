import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    // Configure nothing globally; per-route interceptors will set storage/limits
    MulterModule.register({}),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}

