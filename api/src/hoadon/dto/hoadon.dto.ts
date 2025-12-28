import {
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateHoaDonDto {
  @IsString()
  @IsNotEmpty()
  donhangId: string;

  @IsOptional()
  @IsString()
  mauSo?: string;

  @IsOptional()
  @IsString()
  kyHieu?: string;

  @IsOptional()
  @IsString()
  ghichu?: string;
}

export class UpdateHoaDonDto {
  @IsOptional()
  @IsString()
  mauSo?: string;

  @IsOptional()
  @IsString()
  kyHieu?: string;

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsOptional()
  @IsString()
  ghichu?: string;
}
