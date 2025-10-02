import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SupportService } from './support.service';
import { SupportResolver } from './support.resolver';
import { SupportUploadController } from './support-upload.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [SupportUploadController],
  providers: [SupportResolver, SupportService, PrismaService],
  exports: [SupportService],
})
export class SupportModule {}