import { Module } from '@nestjs/common';
  import { KhachhangService } from './khachhang.service';
  import { KhachhangController } from './khachhang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
  @Module({
    imports: [PrismaModule,ImportdataModule],
    controllers: [KhachhangController],
    providers: [KhachhangService],
    exports:[KhachhangService]
  })
  export class KhachhangModule {}