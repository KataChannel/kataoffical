import { Module } from '@nestjs/common';
import { NhomkhachhangService } from './nhomkhachhang.service';
import { NhomkhachhangController } from './nhomkhachhang.controller';
import { NhomkhachhangResolver } from './nhomkhachhang.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NhomkhachhangController],
  providers: [NhomkhachhangService, NhomkhachhangResolver],
  exports: [NhomkhachhangService]
})
export class NhomkhachhangModule {}