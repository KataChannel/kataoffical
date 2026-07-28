import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Nhomkhachhang } from '../entities/nhomkhachhang.entity';

@ObjectType('NhomkhachhangConnection', { description: 'Kết nối phân trang cho nhóm khách hàng' })
export class NhomkhachhangConnection {
  @Field(() => [Nhomkhachhang], { description: 'Danh sách nhóm khách hàng' })
  data: Nhomkhachhang[];

  @Field(() => Int, { description: 'Tổng số bản ghi' })
  total: number;

  @Field(() => Int, { description: 'Trang hiện tại' })
  page: number;

  @Field(() => Int, { description: 'Số lượng mỗi trang' })
  limit: number;

  @Field(() => Int, { description: 'Tổng số trang' })
  totalPages: number;

  @Field(() => Boolean, { description: 'Có trang tiếp theo' })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: 'Có trang trước' })
  hasPreviousPage: boolean;
}

@ObjectType('NhomkhachhangMutationResponse', { description: 'Response cho các mutation' })
export class NhomkhachhangMutationResponse {
  @Field(() => Boolean, { description: 'Trạng thái thành công' })
  success: boolean;

  @Field(() => String, { nullable: true, description: 'Thông báo' })
  message?: string;

  @Field(() => Nhomkhachhang, { nullable: true, description: 'Dữ liệu nhóm khách hàng' })
  data?: Nhomkhachhang;
}
