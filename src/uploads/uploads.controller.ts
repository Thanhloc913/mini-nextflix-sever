import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { Public } from '../auth/public.decorator';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @Public()
  async uploadImage(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('file is required');
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const url = await this.uploadsService.uploadBuffer(
      'images',
      safeName,
      file.buffer,
      file.mimetype || 'application/octet-stream',
    );
    return { url };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('file is required');
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const url = await this.uploadsService.uploadBuffer(
      'videos',
      safeName,
      file.buffer,
      file.mimetype || 'application/octet-stream',
    );
    return { url };
  }
}



