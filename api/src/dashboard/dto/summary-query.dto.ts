import { IsOptional, IsDateString, IsEnum } from 'class-validator';

export enum TimeRangePreset {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class SummaryQueryDto {
  @IsOptional()
  @IsEnum(TimeRangePreset)
  preset?: TimeRangePreset; // Chọn nhanh (hôm nay, tuần này...)

  @IsOptional()
  @IsDateString()
  startDate?: string; // Hoặc chọn ngày bắt đầu cụ thể

  @IsOptional()
  @IsDateString()
  endDate?: string; // Ngày kết thúc
}