import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequirePermissions } from 'src/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import {
  CreatePaymentProposalDto,
  ReviewPaymentProposalDto,
} from './dto/payment-proposal.dto';
import { PaymentProposalService } from './payment-proposal.service';

@Controller('payment-proposal')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PaymentProposalController {
  constructor(
    private readonly paymentProposalService: PaymentProposalService,
  ) {}

  @Get()
  @RequirePermissions('payment-proposal.view')
  findAll(
    @Query('status') status?: string,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
  ) {
    return this.paymentProposalService.findAll({ status, tuNgay, denNgay });
  }

  @Get(':id')
  @RequirePermissions('payment-proposal.view')
  findOne(@Param('id') id: string) {
    return this.paymentProposalService.findOne(id);
  }

  @Post()
  @RequirePermissions('payment-proposal.create')
  create(@Body() createDto: CreatePaymentProposalDto) {
    return this.paymentProposalService.create(createDto);
  }

  @Post(':id/review')
  @RequirePermissions('payment-proposal.approve')
  review(@Param('id') id: string, @Body() reviewDto: ReviewPaymentProposalDto) {
    return this.paymentProposalService.review(id, reviewDto);
  }
}
