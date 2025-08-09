import { Module } from '@nestjs/common';
  import { DonhangService } from './donhang.service';
  import { DonhangController } from './donhang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
  @Module({
    imports: [PrismaModule, ImportdataModule, SharedModule],
    controllers: [DonhangController],
    providers: [DonhangService],
    exports:[DonhangService]
  })
  export class DonhangModule {}