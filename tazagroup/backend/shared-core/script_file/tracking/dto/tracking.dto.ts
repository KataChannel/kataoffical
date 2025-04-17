import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateTrackingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateTrackingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  order?: number;
}

export class ReorderTrackingDto {
  @IsArray()
  @IsString({ each: true })
  trackingIds: string[];
}

export class FindByDto {
  [key: string]: any;
}