import { Module } from '@nestjs/common';
  import { DathangService } from './dathang.service';
  import { DathangController } from './dathang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
  @Module({
    imports: [PrismaModule,ImportdataModule],
    controllers: [DathangController],
    providers: [DathangService],
    exports:[DathangService]
  })
  export class DathangModule {}