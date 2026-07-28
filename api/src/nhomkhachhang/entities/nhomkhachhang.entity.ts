import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';

@ObjectType('Nhomkhachhang', { description: 'Nhóm khách hàng entity' })
export class Nhomkhachhang {
  @Field(() => ID, { description: 'ID của nhóm khách hàng' })
  id: string;

  @Field(() => String, { description: 'Tên nhóm khách hàng' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Mô tả nhóm khách hàng' })
  description?: string;

  @Field(() => GraphQLDateTime, { description: 'Ngày tạo' })
  createdAt: Date;

  @Field(() => GraphQLDateTime, { description: 'Ngày cập nhật' })
  updatedAt: Date;

  @Field(() => [KhachhangBasic], { nullable: true, description: 'Danh sách khách hàng trong nhóm' })
  khachhang?: KhachhangBasic[];
}

@ObjectType('KhachhangBasic', { description: 'Thông tin cơ bản của khách hàng' })
export class KhachhangBasic {
  @Field(() => ID, { description: 'ID khách hàng' })
  id: string;

  @Field(() => String, { nullable: true, description: 'Tên khách hàng' })
  name?: string;

  @Field(() => String, { nullable: true, description: 'Tên khách hàng (tenkh)' })
  tenkh?: string;

  @Field(() => String, { nullable: true, description: 'Địa chỉ khách hàng' })
  diachi?: string;

  @Field(() => String, { nullable: true, description: 'Số điện thoại' })
  sdt?: string;

  @Field(() => String, { nullable: true, description: 'Email' })
  email?: string;

  @Field(() => Boolean, { description: 'Trạng thái hoạt động' })
  isActive: boolean;
}