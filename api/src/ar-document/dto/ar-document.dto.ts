import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateARDocumentItemDto {
  @IsString()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsArray()
  @IsString({ each: true })
  salesOrderIds: string[];
}

export class CreateARDocumentDto {
  @IsString()
  maChungTu: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  items: CreateARDocumentItemDto[];
}

export class ReviewARDocumentDto {
  @IsString()
  status: string; // CHO_THU_TIEN, KHONG_DUYET

  @IsOptional()
  @IsString()
  comment?: string;
}
