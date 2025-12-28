import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BaoCaoDongTienController } from './baocao-dongtien.controller';
import { BaoCaoDongTienResolver } from './baocao-dongtien.resolver';
import { BaoCaoDongTienService } from './baocao-dongtien.service';

@Module({
  imports: [PrismaModule],
  controllers: [BaoCaoDongTienController],
  providers: [BaoCaoDongTienService, BaoCaoDongTienResolver],
  exports: [BaoCaoDongTienService],
})
export class BaoCaoModule {}
