import { Module } from '@nestjs/common';
import { NhanvienService } from './nhanvien.service';
import { NhanvienController } from './nhanvien.controller';
import { NhanvienResolver } from './nhanvien.resolver';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NhanvienController],
  providers: [NhanvienService, NhanvienResolver],
  exports: [NhanvienService]
})
export class NhanvienModule {}
