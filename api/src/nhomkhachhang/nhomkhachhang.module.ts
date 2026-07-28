import { Module } from '@nestjs/common';
import { NhomkhachhangService } from './nhomkhachhang.service';
import { NhomkhachhangController } from './nhomkhachhang.controller';
import { NhomkhachhangResolver } from './nhomkhachhang.resolver';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NhomkhachhangController],
  providers: [NhomkhachhangService, NhomkhachhangResolver],
  exports: [NhomkhachhangService]
})
export class NhomkhachhangModule {}