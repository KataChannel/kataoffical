import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SanphamGateway } from './sanpham.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [SanphamController],
    providers: [SanphamService,SanphamGateway],
    exports:[SanphamService]
  })
  export class SanphamModule {}