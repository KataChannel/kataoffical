import { ObjectType, Field, ID, Float, Int, InputType } from '@nestjs/graphql';
import { StatusDonhang } from '../enums';
import { PaginationInfo } from './common.types';
import { Khachhang } from './khachhang.types';
import { Sanpham } from './sanpham.types';

@ObjectType()
export class Donhang {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  type?: string;

  @Field()
  madonhang: string;

  @Field(() => Date, { nullable: true })
  ngaygiao?: Date;

  @Field({ nullable: true })
  ghichu?: string;

  @Field()
  isshowvat: boolean;

  @Field(() => StatusDonhang)
  status: StatusDonhang;

  @Field(() => ID)
  khachhangId: string;

  @Field(() => Int, { nullable: true })
  printCount?: number;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Float)
  tongvat: number;

  @Field(() => Float)
  tongtien: number;

  // Relations
  @Field(() => Khachhang)
  khachhang: Khachhang;

  @Field(() => [Donhangsanpham])
  sanpham: Donhangsanpham[];
}

@ObjectType()
export class Donhangsanpham {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  idSP: string;

  @Field(() => Float)
  giaban: number;

  @Field(() => Float)
  sldat: number;

  @Field(() => Float)
  slgiao: number;

  @Field(() => Float)
  slnhan: number;

  @Field(() => Float)
  slhuy: number;

  @Field(() => Float)
  ttdat: number;

  @Field(() => Float)
  ttgiao: number;

  @Field(() => Float)
  ttnhan: number;

  @Field(() => Float)
  vat: number;

  @Field(() => Float)
  ttsauvat: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => ID)
  donhangId: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  // Relations
  @Field(() => Sanpham)
  sanpham: Sanpham;

  @Field(() => Donhang)
  donhang: Donhang;
}

@ObjectType()
export class DonhangPaginated {
  @Field(() => [Donhang])
  data: Donhang[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateDonhangInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  ngaygiao?: Date;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ defaultValue: false })
  isshowvat: boolean;

  @Field(() => StatusDonhang, { defaultValue: StatusDonhang.DADAT })
  status: StatusDonhang;

  @Field(() => ID)
  khachhangId: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ defaultValue: false })
  isActive: boolean;

  @Field(() => Float, { defaultValue: 0 })
  tongvat: number;

  @Field(() => Float, { defaultValue: 0 })
  tongtien: number;

  @Field(() => [CreateDonhangsanphamInput])
  sanpham: CreateDonhangsanphamInput[];
}

@InputType()
export class CreateDonhangsanphamInput {
  @Field(() => ID)
  idSP: string;

  @Field(() => Float)
  giaban: number;

  @Field(() => Float)
  sldat: number;

  @Field(() => Float)
  slgiao: number;

  @Field(() => Float, { defaultValue: 0 })
  slnhan: number;

  @Field(() => Float, { defaultValue: 0 })
  slhuy: number;

  @Field(() => Float)
  ttdat: number;

  @Field(() => Float)
  ttgiao: number;

  @Field(() => Float, { defaultValue: 0 })
  ttnhan: number;

  @Field(() => Float, { defaultValue: 0 })
  vat: number;

  @Field(() => Float)
  ttsauvat: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class UpdateDonhangInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  ngaygiao?: Date;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  isshowvat?: boolean;

  @Field(() => StatusDonhang, { nullable: true })
  status?: StatusDonhang;

  @Field(() => ID, { nullable: true })
  khachhangId?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => Float, { nullable: true })
  tongvat?: number;

  @Field(() => Float, { nullable: true })
  tongtien?: number;

  @Field(() => [UpdateDonhangsanphamInput], { nullable: true })
  sanpham?: UpdateDonhangsanphamInput[];
}

@InputType()
export class UpdateDonhangsanphamInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID)
  idSP: string;

  @Field(() => Float, { nullable: true })
  giaban?: number;

  @Field(() => Float, { nullable: true })
  sldat?: number;

  @Field(() => Float, { nullable: true })
  slgiao?: number;

  @Field(() => Float, { nullable: true })
  slnhan?: number;

  @Field(() => Float, { nullable: true })
  slhuy?: number;

  @Field(() => Float, { nullable: true })
  ttdat?: number;

  @Field(() => Float, { nullable: true })
  ttgiao?: number;

  @Field(() => Float, { nullable: true })
  ttnhan?: number;

  @Field(() => Float, { nullable: true })
  vat?: number;

  @Field(() => Float, { nullable: true })
  ttsauvat?: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class DonhangFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field(() => StatusDonhang, { nullable: true })
  status?: StatusDonhang;

  @Field(() => [StatusDonhang], { nullable: true })
  statuses?: StatusDonhang[];

  @Field(() => ID, { nullable: true })
  khachhangId?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isshowvat?: boolean;

  @Field(() => Float, { nullable: true })
  minTongtien?: number;

  @Field(() => Float, { nullable: true })
  maxTongtien?: number;
}
