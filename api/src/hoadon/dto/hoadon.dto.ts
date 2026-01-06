import { Field, InputType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

@InputType('CreateHoaDonDetailInput')
export class CreateHoaDonDetailDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  sanphamId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  tenSanPham: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  maSanPham: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dvt?: string;

  @Field()
  @IsNotEmpty()
  soluong: number;

  @Field()
  @IsNotEmpty()
  dongia: number;

  @Field({ nullable: true })
  @IsOptional()
  vat?: number;

  @Field()
  @IsNotEmpty()
  thanhtien: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;
}

@InputType('CreateHoaDonDienTuInput')
export class CreateHoaDonDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  donhangId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mauSo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  kyHieu?: string;

  @Field(() => [CreateHoaDonDetailDto], { nullable: true })
  @IsOptional()
  details?: CreateHoaDonDetailDto[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;
}

@InputType('UpdateHoaDonDienTuInput')
export class UpdateHoaDonDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mauSo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  kyHieu?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;
}
