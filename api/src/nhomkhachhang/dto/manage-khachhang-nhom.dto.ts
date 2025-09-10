import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, IsUUID } from 'class-validator';

@InputType()
export class ManageKhachhangInNhomInput {
  @Field(() => String, { description: 'ID của nhóm khách hàng' })
  @IsString()
  @IsUUID('4', { message: 'ID nhóm không hợp lệ' })
  nhomId: string;

  @Field(() => [String], { description: 'Danh sách ID khách hàng' })
  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true, message: 'ID khách hàng không hợp lệ' })
  khachhangIds: string[];
}
