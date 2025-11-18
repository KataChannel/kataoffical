import { IsString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { LoaiPhongban } from '@prisma/client';

export class CreatePhongbanDto {
  @IsString()
  ma: string;

  @IsString()
  ten: string;

  @IsEnum(LoaiPhongban)
  loai: LoaiPhongban;

  @IsOptional()
  @IsInt()
  @Min(1)
  level?: number;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsString()
  truongPhongId?: string;

  @IsOptional()
  @IsString()
  moTa?: string;
}
