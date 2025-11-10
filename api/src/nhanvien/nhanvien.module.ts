import { Module } from '@nestjs/common';
import { NhanvienService } from './nhanvien.service';
import { NhanvienController } from './nhanvien.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NhanvienController],
  providers: [NhanvienService, PrismaService],
  exports: [NhanvienService],
})
export class NhanvienModule {}
