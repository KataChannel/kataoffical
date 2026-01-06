import { Module } from '@nestjs/common';
import { PaymentProposalController } from './payment-proposal.controller';
import { PaymentProposalService } from './payment-proposal.service';

@Module({
  controllers: [PaymentProposalController],
  providers: [PaymentProposalService]
})
export class PaymentProposalModule {}
