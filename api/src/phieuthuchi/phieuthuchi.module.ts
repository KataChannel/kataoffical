import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PaymentProposalModule } from '../payment-proposal/payment-proposal.module';
import { PhieuThuChiController } from './phieuthuchi.controller';
import { PhieuThuChiResolver } from './phieuthuchi.resolver';
import { PhieuThuChiService } from './phieuthuchi.service';

@Module({
  imports: [PrismaModule, AuthModule, PaymentProposalModule],
  controllers: [PhieuThuChiController],
  providers: [PhieuThuChiService, PhieuThuChiResolver],
  exports: [PhieuThuChiService],
})
export class PhieuThuChiModule {}
