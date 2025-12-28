import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { HoaDonController } from './hoadon.controller';
import { HoaDonService } from './hoadon.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [HoaDonController],
  providers: [HoaDonService],
  exports: [HoaDonService],
})
export class HoaDonModule {}
