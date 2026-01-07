import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentProposalDto {
  @IsString()
  @IsNotEmpty()
  maDeXuat: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNotEmpty()
  items: PaymentProposalItemDto[];
}

export class PaymentProposalItemDto {
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsArray()
  @IsNotEmpty()
  purchaseOrderIds: string[];
}

export class ReviewPaymentProposalDto {
  @IsString()
  @IsNotEmpty()
  status: 'CHO_THANH_TOAN' | 'KHONG_DUYET';

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdatePaymentProposalDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  items?: PaymentProposalItemDto[];
}
