import { ObjectType, Field, ID, InputType, Int, Float } from '@nestjs/graphql';
import { PaginationInfo } from './common.types';
import { Banggia } from './banggia.types';

@ObjectType()
export class Nhomkhachhang {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Khachhang])
  khachhang: Khachhang[];
}

@ObjectType()
export class Khachhang {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  tenfile?: string;

  @Field({ nullable: true })
  tenkh?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  namenn?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field()
  makh: string;

  @Field({ nullable: true })
  makhold?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  mst?: string;

  @Field({ nullable: true })
  gionhanhang?: string;

  @Field({ nullable: true })
  quan?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  loaikh?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field()
  hiengia: boolean;

  @Field()
  isActive: boolean;

  @Field()
  istitle2: boolean;

  @Field()
  isshowvat: boolean;

  @Field(() => ID, { nullable: true })
  banggiaId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => Banggia, { nullable: true })
  banggia?: Banggia;

  @Field(() => [Nhomkhachhang])
  nhomkhachhang: Nhomkhachhang[];
}

@ObjectType()
export class KhachhangPaginated {
  @Field(() => [Khachhang])
  data: Khachhang[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateKhachhangInput {
  @Field({ nullable: true })
  tenfile?: string;

  @Field({ nullable: true })
  tenkh?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  namenn?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field()
  makh: string;

  @Field({ nullable: true })
  makhold?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  mst?: string;

  @Field({ nullable: true })
  gionhanhang?: string;

  @Field({ nullable: true })
  quan?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  loaikh?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ defaultValue: false })
  hiengia: boolean;

  @Field({ defaultValue: false })
  isActive: boolean;

  @Field({ defaultValue: false })
  istitle2: boolean;

  @Field({ defaultValue: true })
  isshowvat: boolean;

  @Field(() => ID, { nullable: true })
  banggiaId?: string;
}

@InputType()
export class UpdateKhachhangInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  tenfile?: string;

  @Field({ nullable: true })
  tenkh?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  namenn?: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  makh?: string;

  @Field({ nullable: true })
  makhold?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  mst?: string;

  @Field({ nullable: true })
  gionhanhang?: string;

  @Field({ nullable: true })
  quan?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  loaikh?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  hiengia?: boolean;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  istitle2?: boolean;

  @Field({ nullable: true })
  isshowvat?: boolean;

  @Field(() => ID, { nullable: true })
  banggiaId?: string;
}

@InputType()
export class KhachhangFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  loaikh?: string;

  @Field({ nullable: true })
  quan?: string;

  @Field({ nullable: true })
  hiengia?: boolean;
}
