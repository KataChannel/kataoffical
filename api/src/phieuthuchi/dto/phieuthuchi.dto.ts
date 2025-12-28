import { Field, InputType } from '@nestjs/graphql';
import {
    DoiTuongThuChi,
    LoaiPhieuThuChi,
    PhuongThucThanhToan
} from '@prisma/client';
import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

@InputType()
export class CreatePhieuThuChiDto {
  @Field()
  @IsEnum(LoaiPhieuThuChi)
  @IsNotEmpty()
  loai: LoaiPhieuThuChi;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  soTien: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  donhangId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dathangId?: string;

  @Field()
  @IsEnum(DoiTuongThuChi)
  @IsNotEmpty()
  doiTuong: DoiTuongThuChi;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  doiTuongId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tenDoiTuong?: string;

  @Field({ nullable: true })
  @IsEnum(PhuongThucThanhToan)
  @IsOptional()
  phuongThuc?: PhuongThucThanhToan;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  coHoaDon?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lydo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  ngay?: string;
}

@InputType()
export class UpdatePhieuThuChiDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(LoaiPhieuThuChi)
  loai?: LoaiPhieuThuChi;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  soTien?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  donhangId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dathangId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(DoiTuongThuChi)
  doiTuong?: DoiTuongThuChi;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  doiTuongId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tenDoiTuong?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PhuongThucThanhToan)
  phuongThuc?: PhuongThucThanhToan;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  coHoaDon?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lydo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  ngay?: string;
}

@InputType()
export class DuyetPhieuThuChiDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  ghichu?: string;
}
