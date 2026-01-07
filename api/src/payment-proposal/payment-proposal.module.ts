import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PaymentProposalController } from './payment-proposal.controller';
import { PaymentProposalService } from './payment-proposal.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PaymentProposalController],
  providers: [PaymentProposalService],
  exports: [PaymentProposalService],
})
export class PaymentProposalModule {}
