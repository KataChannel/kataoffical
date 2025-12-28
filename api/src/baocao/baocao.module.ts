import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { BaoCaoDongTienController } from './baocao-dongtien.controller';
import { BaoCaoDongTienResolver } from './baocao-dongtien.resolver';
import { BaoCaoDongTienService } from './baocao-dongtien.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'rausachtrangia-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [BaoCaoDongTienController],
  providers: [BaoCaoDongTienService, BaoCaoDongTienResolver],
  exports: [BaoCaoDongTienService],
})
export class BaoCaoModule {}
