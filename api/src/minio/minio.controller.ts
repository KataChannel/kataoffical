import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Delete, Param } from '@nestjs/common';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: {title?: string; category?: string; group?: string; description?: string},
  ) {
    const imageUrl = await this.minioService.uploadFile(file, body);
    return { imageUrl };
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    await this.minioService.deleteFile(id);
    return { message: 'File deleted successfully' };
  }
}
