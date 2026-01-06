import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProposalController } from './payment-proposal.controller';

describe('PaymentProposalController', () => {
  let controller: PaymentProposalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentProposalController],
    }).compile();

    controller = module.get<PaymentProposalController>(PaymentProposalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
