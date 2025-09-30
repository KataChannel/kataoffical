import { Module } from '@nestjs/common';
  import { KhachhangService } from './khachhang.service';
  import { KhachhangController } from './khachhang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';
  @Module({
    imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule],
    controllers: [KhachhangController],
    providers: [KhachhangService],
    exports:[KhachhangService]
  })
  export class KhachhangModule {}