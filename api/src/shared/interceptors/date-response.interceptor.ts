import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Enhanced interceptor for precise date field synchronization
 * Response dates are already in UTC format - no conversion needed since frontend expects UTC
 * Special handling for ngaygiao, ngaynhan fields
 */
@Injectable()
export class DateResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.transformDatesInResponse(data, context))
    );
  }

  /**
   * Transform dates in response - since frontend expects UTC, return as-is
   * @param data Response data
   * @param context Execution context for logging
   * @returns Data với dates đã được synchronized
   */
  private transformDatesInResponse(data: any, context?: ExecutionContext): any {
    if (!data) return data;
    if (context) {
      const request = context.switchToHttp?.()?.getRequest?.();
      const endpoint = request?.url || 'unknown';
      
      if (endpoint.includes('dathang') || endpoint.includes('donhang')) {
        console.log(`📤 Enhanced date response transform for ${endpoint}`);
      }
    }

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
   * Enhanced transform dates trong một object với special handling
   * @param obj Object cần transform
   * @returns Object với dates đã được synchronized
   */
  private transformDatesInObject(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    const transformed = { ...obj };

    // Priority date fields requiring enhanced synchronization
    const criticalDateFields = ['ngaygiao', 'ngaynhan'];
    const commonDateFields = [
      'createdAt', 'updatedAt', 'ngaytao', 'ngaycapnhat',
      'batdau', 'ketthuc', 'startDate', 'endDate', 'date', 'datetime', 'ngay'
    ];

    Object.keys(transformed).forEach(key => {
      const value = transformed[key];

      // Enhanced handling for critical date fields
      if (criticalDateFields.includes(key) && this.isDateValue(value)) {
        try {
          // Ensure proper UTC format for critical fields
          const utcDate = value instanceof Date ? value.toISOString() : new Date(value).toISOString();
          transformed[key] = new Date(utcDate).toISOString();
          
          console.log(`📤 Response transform ${key}: ${value} → ${transformed[key]}`);
        } catch (error) {
          console.error(`❌ Error transforming ${key}:`, error);
          transformed[key] = value; // Keep original on error
        }
      }
      // Standard handling for other date fields
      else if (commonDateFields.includes(key) && this.isDateValue(value)) {
        // Ensure UTC ISO string format for consistency
        transformed[key] = value instanceof Date ? value.toISOString() : value;
      }
      // Nested objects or arrays
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
