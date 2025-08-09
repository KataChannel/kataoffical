import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimezoneUtilService } from '../services/timezone-util.service';

/**
 * Interceptor để tự động format date fields trong response
 * Chuyển đổi UTC dates từ database về local timezone cho client
 */
@Injectable()
export class DateResponseInterceptor implements NestInterceptor {
  constructor(private readonly timezoneUtil: TimezoneUtilService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.transformDatesInResponse(data))
    );
  }

  /**
   * Transform UTC dates trong response về local timezone
   * @param data Response data
   * @returns Data với dates đã được format
   */
  private transformDatesInResponse(data: any): any {
    if (!data) return data;

    // Nếu là array
    if (Array.isArray(data)) {
      return data.map(item => this.transformDatesInObject(item));
    }

    // Nếu là object
    if (typeof data === 'object') {
      return this.transformDatesInObject(data);
    }

    return data;
  }

  /**
   * Transform dates trong một object
   * @param obj Object cần transform
   * @returns Object với dates đã được format
   */
  private transformDatesInObject(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    const transformed = { ...obj };

    // Các field thường là date
    const commonDateFields = [
      'createdAt', 'updatedAt', 'ngaynhan', 'ngaygiao', 'ngaytao', 'ngaycapnhat',
      'batdau', 'ketthuc', 'startDate', 'endDate', 'date', 'datetime'
    ];

    Object.keys(transformed).forEach(key => {
      const value = transformed[key];

      // Nếu value là date string hoặc Date object
      if (this.isDateValue(value)) {
        // Giữ nguyên UTC ISO string để client tự xử lý với timezone service
        // Không tự động convert ở server để tránh confusion
        transformed[key] = value;
      }
      // Nếu value là nested object hoặc array
      else if (value && typeof value === 'object') {
        transformed[key] = this.transformDatesInResponse(value);
      }
    });

    return transformed;
  }

  /**
   * Kiểm tra value có phải là date không
   * @param value Value cần kiểm tra
   * @returns true nếu là date
   */
  private isDateValue(value: any): boolean {
    if (!value) return false;

    // Nếu là Date object
    if (value instanceof Date) return true;

    // Nếu là string có format ISO date
    if (typeof value === 'string') {
      // Check ISO format với timezone (có T và Z hoặc offset)
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})$/;
      return isoRegex.test(value);
    }

    return false;
  }
}
