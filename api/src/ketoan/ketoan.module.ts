import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { KetoanService } from './ketoan.service';
import { KetoanController } from './ketoan.controller';
import { KetoanCronService } from './ketoan-cron.service';
import { HOADON_PROVIDER, MockHoaDonProvider } from './hoadon-provider';

@Module({
  imports: [PrismaModule, AuthModule, NotificationModule],
  controllers: [KetoanController],
  providers: [
    KetoanService,
    KetoanCronService,
    // Adapter HĐĐT mặc định (mock). Thay bằng adapter NCC thật khi tích hợp.
    { provide: HOADON_PROVIDER, useClass: MockHoaDonProvider },
  ],
  exports: [KetoanService],
})
export class KetoanModule {}
