import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';
import { PaginationInfo } from './common.types';
import { Donhang } from './donhang.types';
import { Sanpham } from './sanpham.types';

@ObjectType()
export class Congty {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Kho])
  kho: Kho[];
}

@ObjectType()
export class Kho {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  makho?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => ID, { nullable: true })
  congtyId?: string;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => Congty, { nullable: true })
  congty?: Congty;

  @Field(() => [SanphamKho])
  sanphamKho: SanphamKho[];

  @Field(() => [PhieuKho])
  phieukho: PhieuKho[];
}

@ObjectType()
export class SanphamKho {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  khoId: string;

  @Field(() => ID)
  sanphamId: string;

  @Field(() => Float)
  soluong: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => Kho)
  kho: Kho;

  @Field(() => Sanpham)
  sanpham: Sanpham;
}

@ObjectType()
export class PhieuKho {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  maphieu?: string;

  @Field({ nullable: true })
  madonhang?: string;

  @Field({ nullable: true })
  madncc?: string;

  @Field({ nullable: true })
  madathang?: string;

  @Field(() => Date, { nullable: true })
  ngay?: Date;

  @Field({ nullable: true })
  type?: string; // "nhap" | "xuat"

  @Field()
  isChotkho: boolean;

  @Field(() => ID, { nullable: true })
  khoId?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => Donhang, { nullable: true })
  donhang?: Donhang;

  @Field(() => Kho, { nullable: true })
  kho?: Kho;

  @Field(() => [PhieuKhoSanpham])
  sanpham: PhieuKhoSanpham[];
}

@ObjectType()
export class PhieuKhoSanpham {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sanphamId: string;

  @Field(() => Float)
  soluong: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => ID)
  phieuKhoId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations
  @Field(() => Sanpham)
  sanpham: Sanpham;

  @Field(() => PhieuKho)
  phieuKho: PhieuKho;
}

@ObjectType()
export class TonKho {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sanphamId: string;

  @Field(() => Float)
  slton: number;

  @Field(() => Float)
  slchogiao: number;

  @Field(() => Float)
  slchonhap: number;

  // Relations
  @Field(() => Sanpham)
  sanpham: Sanpham;
}

// Paginated types
@ObjectType()
export class KhoPaginated {
  @Field(() => [Kho])
  data: Kho[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

@ObjectType()
export class PhieuKhoPaginated {
  @Field(() => [PhieuKho])
  data: PhieuKho[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

@ObjectType()
export class TonKhoPaginated {
  @Field(() => [TonKho])
  data: TonKho[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateKhoInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  makho?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => ID, { nullable: true })
  congtyId?: string;

  @Field({ defaultValue: true })
  isActive: boolean;
}

@InputType()
export class UpdateKhoInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  makho?: string;

  @Field({ nullable: true })
  diachi?: string;

  @Field({ nullable: true })
  sdt?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => ID, { nullable: true })
  congtyId?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class CreatePhieuKhoInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  maphieu?: string;

  @Field({ nullable: true })
  madonhang?: string;

  @Field({ nullable: true })
  madncc?: string;

  @Field({ nullable: true })
  madathang?: string;

  @Field(() => Date, { nullable: true })
  ngay?: Date;

  @Field({ nullable: true })
  type?: string;

  @Field({ defaultValue: false })
  isChotkho: boolean;

  @Field(() => ID, { nullable: true })
  khoId?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field(() => [CreatePhieuKhoSanphamInput])
  sanpham: CreatePhieuKhoSanphamInput[];
}

@InputType()
export class CreatePhieuKhoSanphamInput {
  @Field(() => ID)
  sanphamId: string;

  @Field(() => Float)
  soluong: number;

  @Field({ nullable: true })
  ghichu?: string;
}

@InputType()
export class UpdatePhieuKhoInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  maphieu?: string;

  @Field({ nullable: true })
  madonhang?: string;

  @Field({ nullable: true })
  madncc?: string;

  @Field({ nullable: true })
  madathang?: string;

  @Field(() => Date, { nullable: true })
  ngay?: Date;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  isChotkho?: boolean;

  @Field(() => ID, { nullable: true })
  khoId?: string;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => [UpdatePhieuKhoSanphamInput], { nullable: true })
  sanpham?: UpdatePhieuKhoSanphamInput[];
}

@InputType()
export class UpdatePhieuKhoSanphamInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID)
  sanphamId: string;

  @Field(() => Float, { nullable: true })
  soluong?: number;

  @Field({ nullable: true })
  ghichu?: string;
}

// Filter inputs
@InputType()
export class KhoFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => ID, { nullable: true })
  congtyId?: string;
}

@InputType()
export class PhieuKhoFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isChotkho?: boolean;

  @Field(() => ID, { nullable: true })
  khoId?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}

@InputType()
export class TonKhoFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field(() => ID, { nullable: true })
  sanphamId?: string;

  @Field(() => Float, { nullable: true })
  minSlton?: number;

  @Field(() => Float, { nullable: true })
  maxSlton?: number;
}
