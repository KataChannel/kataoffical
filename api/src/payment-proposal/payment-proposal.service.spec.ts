import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProposalService } from './payment-proposal.service';

describe('PaymentProposalService', () => {
  let service: PaymentProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentProposalService],
    }).compile();

    service = module.get<PaymentProposalService>(PaymentProposalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
