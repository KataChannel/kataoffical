import { PartialType } from '@nestjs/mapped-types';
import { CreateNhanvienDto } from './create-nhanvien.dto';

export class UpdateNhanvienDto extends PartialType(CreateNhanvienDto) {}
