import { Module } from '@nestjs/common';
  import { NhacungcapService } from './nhacungcap.service';
  import { NhacungcapController } from './nhacungcap.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
  @Module({
    imports: [PrismaModule, ImportdataModule, SharedModule],
    controllers: [NhacungcapController],
    providers: [NhacungcapService],
    exports:[NhacungcapService]
  })
  export class NhacungcapModule {}