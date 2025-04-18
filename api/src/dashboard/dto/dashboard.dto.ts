import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateDashboardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateDashboardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  order?: number;
}

export class ReorderDashboardDto {
  @IsArray()
  @IsString({ each: true })
  dashboardIds: string[];
}

export class FindByDto {
  [key: string]: any;
}