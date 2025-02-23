import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
  @Module({
    imports: [PrismaModule],
    controllers: [SanphamController],
    providers: [SanphamService],
    exports:[SanphamService]
  })
  export class SanphamModule {}