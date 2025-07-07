import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateTrackingeventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateTrackingeventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  order?: number;
}

export class ReorderTrackingeventDto {
  @IsArray()
  @IsString({ each: true })
  trackingeventIds: string[];
}

export class FindByDto {
  [key: string]: any;
}