import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class TimezoneUtilService {
  /**
   * Chuyển đổi ngày từ local timezone sang UTC để lưu database
   * @param date Date input từ client
   * @returns UTC ISO string
   */
  toUTC(date: any): string {
    if (!date) return '';
    
    // Nếu là string date format YYYY-MM-DD
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Coi như local date và chuyển sang UTC
      return moment(date, 'YYYY-MM-DD').utc().toISOString();
    }
    
    // Các trường hợp khác
    return moment(date).utc().toISOString();
  }

  /**
   * Chuyển đổi ngày từ UTC (database) về local để hiển thị
   * @param utcDate UTC date từ database
   * @param format Format output
   * @returns Formatted string
   */
  fromUTC(utcDate: any, format: string = 'YYYY-MM-DD'): string {
    if (!utcDate) return '';
    
    return moment.utc(utcDate).local().format(format);
  }

  /**
   * Lấy ngày hiện tại UTC để lưu database
   * @returns UTC ISO string
   */
  nowUTC(): string {
    return moment().utc().toISOString();
  }

  /**
   * Validate và chuẩn hóa date input từ client
   * @param dateInput Input từ client
   * @returns UTC ISO string hoặc null nếu invalid
   */
  validateAndConvertToUTC(dateInput: any): string | null {
    if (!dateInput) return null;

    try {
      // Nếu đã là UTC ISO string
      if (typeof dateInput === 'string' && dateInput.includes('T') && dateInput.includes('Z')) {
        const parsed = moment.utc(dateInput);
        return parsed.isValid() ? parsed.toISOString() : null;
      }

      // Nếu là string date format YYYY-MM-DD
      if (typeof dateInput === 'string' && dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parsed = moment(dateInput, 'YYYY-MM-DD');
        return parsed.isValid() ? parsed.utc().toISOString() : null;
      }

      // Các trường hợp khác
      const parsed = moment(dateInput);
      return parsed.isValid() ? parsed.utc().toISOString() : null;
    } catch (error) {
      console.error('Date validation error:', error);
      return null;
    }
  }

  /**
   * Chuẩn hóa date range từ client để query database
   * @param startDate Start date từ client
   * @param endDate End date từ client
   * @returns Object với startUTC và endUTC
   */
  normalizeeDateRange(startDate?: any, endDate?: any): { startUTC?: string; endUTC?: string } {
    const result: { startUTC?: string; endUTC?: string } = {};

    if (startDate) {
      const startUTC = this.validateAndConvertToUTC(startDate);
      if (startUTC) {
        result.startUTC = startUTC;
      }
    }

    if (endDate) {
      const endUTC = this.validateAndConvertToUTC(endDate);
      if (endUTC) {
        // Set end date to end of day in UTC
        result.endUTC = moment.utc(endUTC).endOf('day').toISOString();
      }
    }

    return result;
  }

  /**
   * Chuẩn hóa data object có chứa date fields
   * @param data Object data từ client
   * @param dateFields Array tên các field là date
   * @returns Object với date fields đã chuyển sang UTC
   */
  normalizeDateFields(data: any, dateFields: string[]): any {
    if (!data || typeof data !== 'object') return data;

    const normalizedData = { ...data };

    dateFields.forEach(field => {
      if (normalizedData[field]) {
        const utcDate = this.validateAndConvertToUTC(normalizedData[field]);
        if (utcDate) {
          normalizedData[field] = utcDate;
        } else {
          // Nếu invalid, xóa field hoặc set null
          normalizedData[field] = null;
        }
      }
    });

    return normalizedData;
  }

  /**
   * Tạo Prisma where condition cho date range
   * @param fieldName Tên field date trong Prisma model
   * @param startDate Start date (sẽ convert sang UTC)
   * @param endDate End date (sẽ convert sang UTC)
   * @returns Prisma where condition object
   */
  createDateRangeWhere(fieldName: string, startDate?: any, endDate?: any): any {
    const dateRange = this.normalizeeDateRange(startDate, endDate);
    const where: any = {};

    if (dateRange.startUTC || dateRange.endUTC) {
      where[fieldName] = {};
      
      if (dateRange.startUTC) {
        where[fieldName].gte = new Date(dateRange.startUTC);
      }
      
      if (dateRange.endUTC) {
        where[fieldName].lte = new Date(dateRange.endUTC);
      }
    }

    return where;
  }

  /**
   * Format date cho response API (convert UTC về local)
   * @param utcDate UTC date từ database
   * @param format Format output
   * @returns Formatted string hoặc ISO string
   */
  formatForResponse(utcDate: any, format?: string): string {
    if (!utcDate) return '';

    if (format) {
      return moment.utc(utcDate).local().format(format);
    }

    // Trả về ISO string với local timezone
    return moment.utc(utcDate).local().toISOString();
  }

  /**
   * Kiểm tra 2 ngày có cùng ngày không (bỏ qua timezone)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu cùng ngày
   */
  isSameDay(date1: any, date2: any): boolean {
    if (!date1 || !date2) return false;
    
    return moment.utc(date1).format('YYYY-MM-DD') === moment.utc(date2).format('YYYY-MM-DD');
  }

  /**
   * Lấy start và end của ngày theo UTC
   * @param date Date input
   * @returns Object với startOfDay và endOfDay UTC
   */
  getDayBounds(date: any): { startOfDay: string; endOfDay: string } {
    const utcDate = this.validateAndConvertToUTC(date);
    
    if (!utcDate) {
      const now = moment().utc();
      return {
        startOfDay: now.startOf('day').toISOString(),
        endOfDay: now.endOf('day').toISOString()
      };
    }

    const momentDate = moment.utc(utcDate);
    return {
      startOfDay: momentDate.startOf('day').toISOString(),
      endOfDay: momentDate.endOf('day').toISOString()
    };
  }
}
