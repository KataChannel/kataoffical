import { IsString, IsOptional, IsObject, IsNumber, IsPositive, Min, Max } from 'class-validator';
export class FilterDto {
  @IsString()
  type: string;

  @IsOptional()
  value: string | number;
}

export class RelationFilterDto {
  @IsOptional()
  include?: boolean;

  @IsOptional()
  @IsObject()
  filters?: Record<string, FilterDto>;
}

export class SearchDto {
  @IsString()
  model: string;

  @IsOptional()
  @IsObject()
  filters?: Record<string, FilterDto>;

  @IsOptional()
  @IsObject()
  relations?: Record<string, RelationFilterDto>;

  @IsOptional()
  @IsObject()
  orderBy?: { field: string; direction: 'asc' | 'desc' };

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number = 0;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(100)
  take?: number = 10;
}
