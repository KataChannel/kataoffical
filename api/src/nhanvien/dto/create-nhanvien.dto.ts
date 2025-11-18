import { IsString, IsOptional, IsEnum, IsEmail, IsDateString, IsNumber, IsBoolean } from 'class-validator';
import { GioiTinh, TrangThaiNhanvien } from '@prisma/client';

export class CreateNhanvienDto {
  @IsString()
  maNV: string;

  @IsString()
  hoTen: string;

  @IsOptional()
  @IsString()
  cmnd?: string;

  @IsOptional()
  @IsEnum(GioiTinh)
  gioiTinh?: GioiTinh;

  @IsOptional()
  @IsDateString()
  ngaySinh?: string;

  @IsOptional()
  @IsString()
  queQuan?: string;

  @IsOptional()
  @IsString()
  diaChiHienTai?: string;

  @IsOptional()
  @IsString()
  soDienThoai?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phongbanId?: string;

  @IsOptional()
  @IsString()
  chucVu?: string;

  @IsOptional()
  @IsString()
  viTri?: string;

  @IsOptional()
  @IsDateString()
  ngayVaoLam?: string;

  @IsOptional()
  @IsEnum(TrangThaiNhanvien)
  trangThai?: TrangThaiNhanvien;

  @IsOptional()
  @IsNumber()
  luongCoBan?: number;

  @IsOptional()
  @IsNumber()
  phuCap?: number;

  @IsOptional()
  @IsNumber()
  heSoLuong?: number;

  @IsOptional()
  @IsString()
  soTaiKhoan?: string;

  @IsOptional()
  @IsString()
  nganHang?: string;

  @IsOptional()
  @IsString()
  chiNhanh?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  ghiChu?: string;
}
