import { Injectable } from '@nestjs/common';

@Injectable()
export class TimezoneUtilService {
  /**
   * Convert any date input to UTC ISO string for database storage
   */
  toUTC(date: Date | string | number): string {
    if (!date) return new Date().toISOString();
    
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error('Invalid date provided');
    }
    
    return d.toISOString();
  }

  /**
   * Convert UTC date to local timezone for display
   */
  fromUTC(utcDate: string | Date, timezone: string = 'Asia/Ho_Chi_Minh'): Date {
    const date = new Date(utcDate);
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  }

  /**
   * Get current UTC timestamp
   */
  nowUTC(): string {
    return new Date().toISOString();
  }

  /**
   * Normalize date fields in an object to UTC
   */
  normalizeDateFields(data: any, dateFields: string[] = ['createdAt', 'updatedAt', 'ngaygiao', 'ngaynhan', 'ngaytao']): any {
    if (!data || typeof data !== 'object') return data;

    const normalized = { ...data };
    
    dateFields.forEach(field => {
      if (normalized[field]) {
        try {
          normalized[field] = this.toUTC(normalized[field]);
        } catch (error) {
          console.warn(`Warning: Could not normalize date field ${field}:`, error);
        }
      }
    });

    return normalized;
  }

  /**
   * Convert date filters for queries
   */
  convertDateFilters(filters: any): any {
    if (!filters || typeof filters !== 'object') return filters;

    const converted = { ...filters };
    
    // Handle common date filter patterns
    Object.keys(converted).forEach(key => {
      const value = converted[key];
      
      if (value && typeof value === 'object') {
        // Handle range queries like { gte: date, lte: date }
        if (value.gte) {
          // ✅ Frontend đã gửi start-of-day UTC, không cần modify thêm
          value.gte = this.toUTC(value.gte);
        }
        if (value.lte) {
          // ✅ Frontend đã gửi end-of-day UTC, không cần modify thêm
          value.lte = this.toUTC(value.lte);
        }
        if (value.gt) value.gt = this.toUTC(value.gt);
        if (value.lt) value.lt = this.toUTC(value.lt);
        if (value.equals) value.equals = this.toUTC(value.equals);
      } else if (this.isDateField(key) && value) {
        // Direct date assignment
        converted[key] = this.toUTC(value);
      }
    });

    return converted;
  }

  /**
   * Format current date as DDMMYYYY for filename generation
   */
  formatDateForFilename(): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}${month}${year}`;
  }

  /**
   * Format current date as DD_MM_YYYY
   */
  formatDateUnderscored(): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}_${month}_${year}`;
  }

  /**
   * Get start of day for a date in local timezone then convert to UTC
   */
  getStartOfDay(date: Date | string): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return this.toUTC(d);
  }

  /**
   * Get end of day for a date in local timezone then convert to UTC
   */
  getEndOfDay(date: Date | string): string {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return this.toUTC(d);
  }

  /**
   * Validate and convert date to UTC (for backward compatibility)
   */
  validateAndConvertToUTC(date: any): string | null {
    if (!date) return null;
    
    try {
      return this.toUTC(date);
    } catch (error) {
      console.warn('Date validation error:', error);
      return null;
    }
  }

  /**
   * Check if a field name is a date field
   */
  private isDateField(fieldName: string): boolean {
    const dateFields = ['createdAt', 'updatedAt', 'ngaygiao', 'ngaynhan', 'ngaytao', 'date', 'time', 'datetime'];
    return dateFields.some(field => fieldName.toLowerCase().includes(field.toLowerCase()));
  }
}
