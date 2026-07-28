import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';
import { PaginationInfo } from './common.types';
import { Banggia } from './banggia.types';

@ObjectType()
export class Sanpham {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  title2?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  masp: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field(() => Float)
  giagoc: number;

  @Field(() => Float)
  giaban: number;

  @Field({ nullable: true })
  dvt?: string;

  @Field({ nullable: true })
  hinhanh?: string;

  @Field(() => Float, { nullable: true })
  loadpoint?: number;

  @Field(() => Float, { nullable: true })
  vat?: number;

  @Field(() => Float, { nullable: true })
  soluong?: number;

  @Field(() => Float, { nullable: true })
  soluongkho?: number;

  @Field(() => Float)
  haohut: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => [Banggiasanpham], { nullable: true })
  banggia?: Banggiasanpham[];

  @Field(() => [Nhacungcap], { nullable: true })
  nhacungcap?: Nhacungcap[];
}

@ObjectType()
export class Banggiasanpham {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  giaban: number;

  @Field(() => ID)
  sanphamId: string;

  @Field(() => ID)
  banggiaId: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field()
  isActive: boolean;

  @Field(() => Sanpham)
  sanpham: Sanpham;

  @Field(() => Banggia)
  banggia: Banggia;
}

@ObjectType()
export class Nhacungcap {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  tenfile?: string;

  @Field()
  mancc: string;

  @Field({ nullable: true })
  manccold?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field()
  isActive: boolean;

  @Field()
  isshowvat: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Sanpham])
  sanpham: Sanpham[];
}

@ObjectType()
export class SanphamPaginated {
  @Field(() => [Sanpham])
  data: Sanpham[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateSanphamInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  title2?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  masp: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field(() => Float, { defaultValue: 0 })
  giagoc: number;

  @Field(() => Float, { defaultValue: 0 })
  giaban: number;

  @Field({ nullable: true })
  dvt?: string;

  @Field({ nullable: true })
  hinhanh?: string;

  @Field(() => Float, { nullable: true })
  loadpoint?: number;

  @Field(() => Float, { nullable: true })
  vat?: number;

  @Field(() => Float, { nullable: true })
  soluong?: number;

  @Field(() => Float, { nullable: true })
  soluongkho?: number;

  @Field(() => Float, { defaultValue: 0 })
  haohut: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ defaultValue: false })
  isActive: boolean;
}

@InputType()
export class UpdateSanphamInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  title2?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  masp?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field(() => Float, { nullable: true })
  giagoc?: number;

  @Field(() => Float, { nullable: true })
  giaban?: number;

  @Field({ nullable: true })
  dvt?: string;

  @Field({ nullable: true })
  hinhanh?: string;

  @Field(() => Float, { nullable: true })
  loadpoint?: number;

  @Field(() => Float, { nullable: true })
  vat?: number;

  @Field(() => Float, { nullable: true })
  soluong?: number;

  @Field(() => Float, { nullable: true })
  soluongkho?: number;

  @Field(() => Float, { nullable: true })
  haohut?: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class SanphamFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  dvt?: string;

  @Field(() => Float, { nullable: true })
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  maxPrice?: number;
}
