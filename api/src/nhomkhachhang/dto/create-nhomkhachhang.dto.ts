import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateNhomkhachhangInput {
  @Field(() => String, { description: 'Tên nhóm khách hàng' })
  @IsString()
  @MinLength(1, { message: 'Tên nhóm không được để trống' })
  @MaxLength(255, { message: 'Tên nhóm không được vượt quá 255 ký tự' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Mô tả nhóm khách hàng' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Mô tả không được vượt quá 500 ký tự' })
  description?: string;
}
