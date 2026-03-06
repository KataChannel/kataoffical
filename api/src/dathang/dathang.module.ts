import { Module } from '@nestjs/common';
import { DathangService } from './dathang.service';
import { DathangController } from './dathang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from '../importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { StatusMachineService } from '../common/status-machine.service';
import { TonkhoManagerService } from '../common/tonkho-manager.service';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule, NotificationModule],
  controllers: [DathangController],
  providers: [DathangService, StatusMachineService, TonkhoManagerService],
  exports: [DathangService]
})
export class DathangModule { }