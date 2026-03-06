import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';
import { DonhangPriceController } from './donhang-price.controller';
import { DonhangCronService } from './donhang-cron.service';
import { CancelOrderService } from './cancel-order.service';
import { CancelOrderController } from './cancel-order.controller';
import { PriceHistoryService } from './price-history.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from '../importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { StatusMachineService } from '../common/status-machine.service';
import { TonkhoManagerService } from '../common/tonkho-manager.service';
import { AuthModule } from '../auth/auth.module';
import { BanggiaModule } from '../banggia/banggia.module';

@Module({
  imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule, BanggiaModule],
  controllers: [DonhangController, DonhangPriceController, CancelOrderController],
  providers: [
    DonhangService,
    DonhangCronService,
    CancelOrderService,
    PriceHistoryService,
    StatusMachineService,
    TonkhoManagerService
  ],
  exports: [DonhangService, CancelOrderService, PriceHistoryService]
})
export class DonhangModule { }