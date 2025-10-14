import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';
import { DonhangCronService } from './donhang-cron.service';
import { CancelOrderService } from './cancel-order.service';
import { CancelOrderController } from './cancel-order.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { StatusMachineService } from 'src/common/status-machine.service';
import { TonkhoManagerService } from 'src/common/tonkho-manager.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule],
  controllers: [DonhangController, CancelOrderController],
  providers: [
    DonhangService, 
    DonhangCronService, 
    CancelOrderService,
    StatusMachineService, 
    TonkhoManagerService
  ],
  exports: [DonhangService, CancelOrderService]
})
export class DonhangModule {}