import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MinioService } from '../minio/minio.service';

@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportUploadController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Validate files
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = /^(image|video)\//;

    for (const file of files) {
      if (!allowedTypes.test(file.mimetype)) {
        throw new Error(
          `File type ${file.mimetype} not allowed. Only images and videos are supported.`,
        );
      }
      if (file.size > maxSize) {
        throw new Error(
          `File ${file.originalname} exceeds maximum size of 50MB`,
        );
      }
    }

    // Upload to MinIO
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const fileUrl = await this.minioService.uploadFile(file, {
          category: 'support',
          group: 'tickets',
          title: file.originalname,
        });

        return {
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          fileUrl: fileUrl,
        };
      }),
    );

    return uploadResults;
  }
}
