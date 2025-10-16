import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPriceDto {
  @ApiProperty({ description: 'ID của đơn hàng' })
  @IsString()
  donhangId: string;

  @ApiProperty({ description: 'ID của sản phẩm trong đơn hàng' })
  @IsString()
  donhangsanphamId: string;

  @ApiProperty({ description: 'ID của sản phẩm' })
  @IsString()
  sanphamId: string;

  @ApiProperty({ description: 'Giá mới', example: 12000 })
  @IsNumber()
  @Min(0)
  newPrice: number;

  @ApiProperty({ description: 'Lý do thay đổi giá', example: 'Điều chỉnh theo thỏa thuận khách hàng' })
  @IsString()
  changeReason: string;

  @ApiProperty({ required: false, description: 'User ID người thay đổi' })
  @IsOptional()
  @IsString()
  changedBy?: string;

  @ApiProperty({ required: false, description: 'Email người thay đổi' })
  @IsOptional()
  @IsString()
  changedByEmail?: string;

  @ApiProperty({ required: false, description: 'IP Address' })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({ required: false, description: 'User Agent' })
  @IsOptional()
  @IsString()
  userAgent?: string;
}

export class BulkUpdatePriceDto {
  @ApiProperty({ description: 'ID của bảng giá' })
  @IsString()
  banggiaId: string;

  @ApiProperty({ description: 'Phần trăm tăng/giảm', example: 10 })
  @IsNumber()
  percentage: number;

  @ApiProperty({ description: 'Lý do thay đổi' })
  @IsString()
  changeReason: string;

  @ApiProperty({ required: false, description: 'User ID người thay đổi' })
  @IsOptional()
  @IsString()
  changedBy?: string;
}

export class GetPriceHistoryDto {
  @ApiProperty({ required: false, description: 'ID của bảng giá' })
  @IsOptional()
  @IsString()
  banggiaId?: string;

  @ApiProperty({ required: false, description: 'ID của sản phẩm' })
  @IsOptional()
  @IsString()
  sanphamId?: string;

  @ApiProperty({ required: false, description: 'Số lượng records', example: 50 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class GetDonhangPriceAuditDto {
  @ApiProperty({ required: false, description: 'ID của đơn hàng' })
  @IsOptional()
  @IsString()
  donhangId?: string;

  @ApiProperty({ required: false, description: 'ID của sản phẩm' })
  @IsOptional()
  @IsString()
  sanphamId?: string;

  @ApiProperty({ required: false, description: 'Số lượng records', example: 50 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
