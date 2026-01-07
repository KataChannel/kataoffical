import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { HoaDonController } from './hoadon.controller';
import { HoaDonResolver } from './hoadon.resolver';
import { HoaDonService } from './hoadon.service';

@Module({
  imports: [PrismaModule, AuthModule, JwtModule.register({})],
  controllers: [HoaDonController],
  providers: [HoaDonService, HoaDonResolver],
  exports: [HoaDonService],
})
export class HoaDonModule {}
