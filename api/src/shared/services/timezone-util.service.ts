import { Injectable } from '@nestjs/common';

@Injectable()
export class TimezoneUtilService {
  /**
   * Convert any date input to UTC ISO string for database storage
   * Enhanced with better validation and timezone handling
   */
  toUTC(date: Date | string | number): string {
    if (!date) return new Date().toISOString();
    
    let d: Date;
    
    // Handle different input types
    if (typeof date === 'string') {
      // Handle YYYY-MM-DD format specifically (treat as local date)
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        d = new Date(date + 'T00:00:00'); // Add time component to avoid UTC conversion issues
      } else {
        d = new Date(date);
      }
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d.getTime())) {
      throw new Error(`Invalid date provided: ${date}`);
    }
    
    return d.toISOString();
  }

  /**
   * Convert UTC date to local timezone for display
   * Enhanced with better error handling
   */
  fromUTC(utcDate: string | Date, timezone: string = 'Asia/Ho_Chi_Minh'): Date {
    if (!utcDate) {
      throw new Error('UTC date is required');
    }
    
    const date = new Date(utcDate);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid UTC date: ${utcDate}`);
    }
    
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
   * Enhanced to handle ngaygiao, ngaynhan specifically
   */
  normalizeDateFields(data: any, dateFields: string[] = ['createdAt', 'updatedAt', 'ngaygiao', 'ngaynhan', 'ngaytao']): any {
    if (!data || typeof data !== 'object') return data;

    const normalized = { ...data };
    
    dateFields.forEach(field => {
      if (normalized[field] !== undefined && normalized[field] !== null) {
        try {
          // Special handling for critical date fields
          if (['ngaygiao', 'ngaynhan'].includes(field)) {
            console.log(`🔄 Converting ${field}: ${normalized[field]} to UTC`);
          }
          
          const utcDate = this.toUTC(normalized[field]);
          normalized[field] = new Date(utcDate);
          
          if (['ngaygiao', 'ngaynhan'].includes(field)) {
            console.log(`✅ Converted ${field}: ${normalized[field]} (UTC)`);
          }
        } catch (error) {
          console.error(`❌ Error normalizing date field ${field}:`, error);
          throw new Error(`Failed to normalize date field ${field}: ${error.message}`);
        }
      }
    });

    return normalized;
  }

  /**
   * Enhanced date conversion specifically for ngaygiao and ngaynhan
   * Ensures precise synchronization between client and server
   */
  synchronizeDateField(fieldName: string, value: any): Date | null {
    if (!value) return null;
    
    console.log(`🔄 Synchronizing ${fieldName}: ${value}`);
    
    try {
      // For critical date fields, ensure proper UTC conversion
      if (['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        let utcDate: string;
        
        // Handle different input formats from frontend
        if (typeof value === 'string') {
          if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // YYYY-MM-DD format from date picker - treat as local date
            utcDate = this.toUTC(value + 'T00:00:00');
          } else if (value.includes('T') || value.includes('Z')) {
            // ISO string already - validate and convert
            utcDate = this.toUTC(value);
          } else {
            // Other string formats
            utcDate = this.toUTC(value);
          }
        } else {
          // Date object or timestamp
          utcDate = this.toUTC(value);
        }
        
        const result = new Date(utcDate);
        console.log(`✅ Synchronized ${fieldName}: ${result.toISOString()}`);
        return result;
      }
      
      // For other date fields, use standard conversion
      return new Date(this.toUTC(value));
    } catch (error) {
      console.error(`❌ Error synchronizing ${fieldName}:`, error);
      throw new Error(`Failed to synchronize date field ${fieldName}: ${error.message}`);
    }
  }

  /**
   * Convert date filters for queries with enhanced synchronization
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
