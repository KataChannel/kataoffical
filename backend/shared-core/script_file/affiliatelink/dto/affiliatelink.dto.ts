import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateAffiliatelinkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateAffiliatelinkDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  order?: number;
}

export class ReorderAffiliatelinkDto {
  @IsArray()
  @IsString({ each: true })
  affiliatelinkIds: string[];
}

export class FindByDto {
  [key: string]: any;
}