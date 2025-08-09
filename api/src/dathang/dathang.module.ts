import { Module } from '@nestjs/common';
  import { DathangService } from './dathang.service';
  import { DathangController } from './dathang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
  @Module({
    imports: [PrismaModule, ImportdataModule, SharedModule],
    controllers: [DathangController],
    providers: [DathangService],
    exports:[DathangService]
  })
  export class DathangModule {}