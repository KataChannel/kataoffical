import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportResolver } from './support.resolver';
import { SupportUploadController } from './support-upload.controller';
import { AuthModule } from '../auth/auth.module';
import { MinioService } from '../minio/minio.service';

@Module({
  imports: [AuthModule],
  controllers: [SupportUploadController],
  providers: [SupportResolver, SupportService, MinioService],
  exports: [SupportService],
})
export class SupportModule { }