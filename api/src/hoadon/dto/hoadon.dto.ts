import { Field, InputType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';

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
