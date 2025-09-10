import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class NhomkhachhangFilterInput {
  @Field(() => String, { nullable: true, description: 'Tìm kiếm theo tên' })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => String, { nullable: true, description: 'Tìm kiếm theo mô tả' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, { nullable: true, description: 'Tìm kiếm chung' })
  @IsOptional()
  @IsString()
  search?: string;
}

@InputType()
export class NhomkhachhangPaginationInput {
  @Field(() => Number, { nullable: true, defaultValue: 1, description: 'Trang hiện tại' })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Number, { nullable: true, defaultValue: 10, description: 'Số lượng mỗi trang' })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

@InputType()
export class NhomkhachhangSortInput {
  @Field(() => String, { nullable: true, defaultValue: 'createdAt', description: 'Trường sắp xếp' })
  @IsOptional()
  @IsString()
  field?: string = 'createdAt';

  @Field(() => String, { nullable: true, defaultValue: 'desc', description: 'Hướng sắp xếp: asc hoặc desc' })
  @IsOptional()
  @IsString()
  direction?: 'asc' | 'desc' = 'desc';
}
