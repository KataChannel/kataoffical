import {
    LoaiThanhToan,
    PhuongThucThanhToan,
    TrangThaiThanhToan
} from '@prisma/client';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class CreateThanhToanDto {
  @IsString()
  @IsNotEmpty()
  donhangId: string;

  @IsNumber()
  @IsNotEmpty()
  soTien: number;

  @IsEnum(LoaiThanhToan)
  @IsOptional()
  loai?: LoaiThanhToan;

  @IsEnum(PhuongThucThanhToan)
  @IsOptional()
  phuongThuc?: PhuongThucThanhToan;

  @IsOptional()
  @IsString()
  ghichu?: string;

  @IsOptional()
  @IsDateString()
  ngayThanhToan?: string;
}

export class UpdateThanhToanDto {
  @IsOptional()
  @IsNumber()
  soTien?: number;

  @IsOptional()
  @IsEnum(LoaiThanhToan)
  loai?: LoaiThanhToan;

  @IsOptional()
  @IsEnum(PhuongThucThanhToan)
  phuongThuc?: PhuongThucThanhToan;

  @IsOptional()
  @IsString()
  ghichu?: string;

  @IsOptional()
  @IsDateString()
  ngayThanhToan?: string;

  @IsOptional()
  @IsEnum(TrangThaiThanhToan)
  trangThai?: TrangThaiThanhToan;
}
