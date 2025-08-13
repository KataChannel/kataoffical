import { Injectable } from '@nestjs/common';

@Injectable()
export class TimezoneUtilService {
  /**
   * Convert any date input to UTC ISO string for database storage
   * FIXED: Enhanced to prevent date shifting issues
   */
  toUTC(date: Date | string | number): string {
    if (!date) return new Date().toISOString();
    
    let d: Date;
    
    // Handle different input types with timezone-aware logic
    if (typeof date === 'string') {
      // FIXED: Handle YYYY-MM-DD format as local midnight
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Parse as local date at midnight to prevent timezone shifts
        const [year, month, day] = date.split('-').map(Number);
        d = new Date(year, month - 1, day, 0, 0, 0, 0); // Local midnight
        console.log(`🔄 Backend parsing YYYY-MM-DD: ${date} -> Local: ${d} -> UTC: ${d.toISOString()}`);
      } 
      // FIXED: Handle DD/MM/YYYY format (Vietnamese)
      else if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = date.split('/').map(Number);
        d = new Date(year, month - 1, day, 0, 0, 0, 0); // Local midnight
        console.log(`🔄 Backend parsing DD/MM/YYYY: ${date} -> Local: ${d} -> UTC: ${d.toISOString()}`);
      }
      // Handle ISO strings and other formats
      else {
        d = new Date(date);
      }
    } else {
      d = new Date(date);
    }
    
    if (isNaN(d.getTime())) {
      throw new Error(`Invalid date provided: ${date}`);
    }
    
    const utcResult = d.toISOString();
    console.log(`✅ Backend UTC conversion: ${date} -> ${utcResult}`);
    return utcResult;
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
   * FIXED: Prevents date shifting issues
   */
  synchronizeDateField(fieldName: string, value: any): Date | null {
    if (!value) return null;
    
    console.log(`🔄 Backend synchronizing ${fieldName}: ${value} (type: ${typeof value})`);
    
    try {
      // For critical date fields, ensure proper UTC conversion without shifting
      if (['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        let result: Date;
        
        // Handle different input formats from frontend
        if (typeof value === 'string') {
          // FIXED: Handle YYYY-MM-DD format properly
          if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = value.split('-').map(Number);
            result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            console.log(`🔧 Backend YYYY-MM-DD: ${value} -> UTC Date: ${result.toISOString()}`);
          } 
          // FIXED: Handle DD/MM/YYYY format
          else if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const [day, month, year] = value.split('/').map(Number);
            result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            console.log(`🔧 Backend DD/MM/YYYY: ${value} -> UTC Date: ${result.toISOString()}`);
          }
          // Handle ISO strings
          else if (value.includes('T') || value.includes('Z')) {
            result = new Date(value);
            console.log(`🔧 Backend ISO string: ${value} -> UTC Date: ${result.toISOString()}`);
          } 
          // Other string formats
          else {
            result = new Date(this.toUTC(value));
          }
        } else if (value instanceof Date) {
          // FIXED: Handle Date objects properly
          result = new Date(Date.UTC(
            value.getFullYear(), 
            value.getMonth(), 
            value.getDate(), 
            0, 0, 0, 0
          ));
          console.log(`🔧 Backend Date object: ${value} -> UTC Date: ${result.toISOString()}`);
        } else {
          // Fallback
          result = new Date(this.toUTC(value));
        }
        
        console.log(`✅ Backend synchronized ${fieldName}: ${result.toISOString()}`);
        return result;
      }
      
      // For other date fields, use standard conversion
      return new Date(this.toUTC(value));
    } catch (error) {
      console.error(`❌ Backend error synchronizing ${fieldName}:`, error);
      throw new Error(`Failed to synchronize date field ${fieldName}: ${error instanceof Error ? error.message : String(error)}`);
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
