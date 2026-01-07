import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { BanggiaModule } from 'src/banggia/banggia.module';
import { StatusMachineService } from 'src/common/status-machine.service';
import { TonkhoManagerService } from 'src/common/tonkho-manager.service';
import { ConfirmationModule } from 'src/confirmation/confirmation.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { CancelOrderController } from './cancel-order.controller';
import { CancelOrderService } from './cancel-order.service';
import { DonhangCronService } from './donhang-cron.service';
import { DonhangPriceController } from './donhang-price.controller';
import { DonhangController } from './donhang.controller';
import { DonhangService } from './donhang.service';
import { PriceHistoryService } from './price-history.service';

@Module({
  imports: [
    PrismaModule,
    ImportdataModule,
    SharedModule,
    AuthModule,
    BanggiaModule,
    ConfirmationModule,
  ],
  controllers: [
    DonhangController,
    DonhangPriceController,
    CancelOrderController,
  ],
  providers: [
    DonhangService,
    DonhangCronService,
    CancelOrderService,
    PriceHistoryService,
    StatusMachineService,
    TonkhoManagerService,
  ],
  exports: [
    DonhangService,
    DonhangCronService,
    CancelOrderService,
    PriceHistoryService,
  ],
})
export class DonhangModule {}
