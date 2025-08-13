import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  
  /**
   * Enhanced UTC conversion with precise date field handling
   * Special handling for ngaygiao, ngaynhan fields
   * FIXED: Prevents date shifting by treating dates as local midnight
   * @param date Date string hoặc Date object hoặc moment object
   * @param fieldName Optional field name for special handling
   * @returns ISO string UTC để lưu database
   */
  toUTC(date: any, fieldName?: string): string {
    if (!date) return '';
    
    // Log for critical fields
    if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
      console.log(`🔄 Frontend converting ${fieldName}: ${date} to UTC`);
    }
    
    // FIXED: Handle YYYY-MM-DD format without timezone shift
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Create date at local midnight to prevent timezone shifts
      const localDate = moment(date, 'YYYY-MM-DD').startOf('day');
      const utcDate = localDate.utc().toISOString();
      
      if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        console.log(`✅ Frontend converted ${fieldName}: ${date} (local) -> ${utcDate} (UTC)`);
      }
      
      return utcDate;
    }
    
    // FIXED: Handle DD/MM/YYYY format (Vietnamese format)
    if (typeof date === 'string' && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      // Parse Vietnamese date format and create at local midnight
      const localDate = moment(date, 'DD/MM/YYYY').startOf('day');
      const utcDate = localDate.utc().toISOString();
      
      if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        console.log(`✅ Frontend converted ${fieldName}: ${date} (DD/MM/YYYY) -> ${utcDate} (UTC)`);
      }
      
      return utcDate;
    }
    
    // FIXED: Handle Date objects without timezone shift
    if (date instanceof Date) {
      // For Date objects from date pickers, ensure we get the local date without timezone conversion
      const localDate = moment(date).startOf('day');
      const utcDate = localDate.utc().toISOString();
      
      if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        console.log(`✅ Frontend converted ${fieldName}: ${date} (Date object) -> ${utcDate} (UTC)`);
      }
      
      return utcDate;
    }
    
    // For other formats, convert carefully
    const momentDate = moment(date);
    if (!momentDate.isValid()) {
      console.error(`Invalid date provided: ${date}`);
      return moment().utc().toISOString(); // Fallback to current UTC
    }
    
    // Use startOf('day') to prevent timezone shift issues
    const utcDate = momentDate.startOf('day').utc().toISOString();
    
    if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
      console.log(`✅ Frontend converted ${fieldName}: ${date} -> ${utcDate} (UTC)`);
    }
    
    return utcDate;
  }
  
  /**
   * Chuyển đổi ngày từ UTC (database) về timezone local để hiển thị
   * @param utcDate UTC date string từ database
   * @returns Formatted string theo timezone local
   */
  fromUTC(utcDate: any, format: string = 'YYYY-MM-DD'): string {
    if (!utcDate) return '';
    
    return moment.utc(utcDate).local().format(format);
  }
  
  /**
   * Lấy ngày hiện tại theo UTC để lưu database
   * @returns ISO string UTC
   */
  nowUTC(): string {
    return moment().utc().toISOString();
  }
  
  /**
   * Lấy ngày hiện tại theo local timezone để hiển thị
   * @param format Format string
   * @returns Formatted string theo timezone local
   */
  nowLocal(format: string = 'YYYY-MM-DD'): string {
    return moment().format(format);
  }
  
  /**
   * So sánh 2 ngày (bỏ qua timezone)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu date1 > date2
   */
  isAfter(date1: any, date2: any): boolean {
    return moment.utc(date1).isAfter(moment.utc(date2));
  }
  
  /**
   * So sánh 2 ngày (bỏ qua timezone)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu date1 < date2
   */
  isBefore(date1: any, date2: any): boolean {
    return moment.utc(date1).isBefore(moment.utc(date2));
  }
  
  /**
   * Kiểm tra 2 ngày có cùng ngày không (bỏ qua giờ)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu cùng ngày
   */
  isSameDay(date1: any, date2: any): boolean {
    return moment.utc(date1).format('YYYY-MM-DD') === moment.utc(date2).format('YYYY-MM-DD');
  }
  
  /**
   * Thêm/trừ số ngày
   * @param date Ngày gốc
   * @param days Số ngày cần thêm/trừ
   * @param format Format output
   * @returns Formatted string
   */
  addDays(date: any, days: number, format: string = 'YYYY-MM-DD'): string {
    return moment.utc(date).add(days, 'days').format(format);
  }
  
  /**
   * Lấy khoảng cách giữa 2 ngày (số ngày)
   * @param startDate Ngày bắt đầu
   * @param endDate Ngày kết thúc
   * @returns Số ngày chênh lệch
   */
  diffInDays(startDate: any, endDate: any): number {
    return moment.utc(endDate).diff(moment.utc(startDate), 'days');
  }
  
  /**
   * Validate date format
   * @param date Date string
   * @param format Expected format
   * @returns true nếu valid
   */
  isValidDate(date: string, format: string = 'YYYY-MM-DD'): boolean {
    return moment(date, format, true).isValid();
  }
  
  /**
   * Chuyển đổi date input từ form sang UTC để gửi API
   * @param formDate Date từ form (YYYY-MM-DD hoặc Date object)
   * @returns UTC ISO string
   */
  formDateToUTC(formDate: any): string {
    if (!formDate) return '';
    
    // Nếu là date picker value (Date object)
    if (formDate instanceof Date) {
      return moment(formDate).utc().toISOString();
    }
    
    // Nếu là string YYYY-MM-DD từ input date
    if (typeof formDate === 'string') {
      return this.toUTC(formDate);
    }
    
    return moment(formDate).utc().toISOString();
  }
  
  /**
   * Chuyển đổi UTC date từ API về format cho form
   * @param utcDate UTC date từ API
   * @param forDatePicker Có phải cho date picker không
   * @returns Date object cho date picker hoặc string cho input
   */
  utcToFormDate(utcDate: any, forDatePicker: boolean = false): any {
    if (!utcDate) return null;
    
    if (forDatePicker) {
      return moment.utc(utcDate).local().toDate();
    }
    
    return moment.utc(utcDate).local().format('YYYY-MM-DD');
  }

  /**
   * Format ngày để hiển thị cho user với timezone local
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị
   * @returns Formatted string
   */
  formatForDisplay(utcDate: any, format: string = 'DD/MM/YYYY'): string {
    if (!utcDate) return '';
    return moment.utc(utcDate).local().format(format);
  }

  /**
   * Parse ngày từ input user và chuyển sang UTC để lưu database
   * @param userInput Input từ user
   * @param inputFormat Format của input
   * @returns UTC ISO string
   */
  parseUserInputToUTC(userInput: string, inputFormat: string = 'YYYY-MM-DD'): string {
    if (!userInput) return '';
    
    const parsed = moment(userInput, inputFormat);
    if (!parsed.isValid()) {
      throw new Error(`Invalid date format: ${userInput}`);
    }
    
    return parsed.utc().toISOString();
  }

  /**
   * Lấy range ngày theo UTC (cho query database)
   * @param startDate Ngày bắt đầu (local)
   * @param endDate Ngày kết thúc (local)
   * @returns Object với startUTC và endUTC
   */
  getUTCDateRange(startDate: any, endDate: any): { startUTC: string; endUTC: string } {
    let startUTC = '';
    let endUTC = '';
    
    if (startDate) {
      // ✅ Đảm bảo start of day theo local timezone, convert sang UTC
      const start = moment(startDate).startOf('day').utc().toISOString();
      startUTC = start;
    }
    
    if (endDate) {
      // ✅ Đảm bảo end of day theo local timezone, convert sang UTC
      const end = moment(endDate).endOf('day').utc().toISOString();
      endUTC = end;
    }
    
    return { startUTC, endUTC };
  }

  /**
   * Convert date range từ frontend form để gửi API
   * Đảm bảo consistent timezone handling
   * @param startDate Ngày bắt đầu
   * @param endDate Ngày kết thúc  
   * @returns Object với Batdau và Ketthuc format chuẩn
   */
  getAPIDateRange(startDate: any, endDate: any): { Batdau: string; Ketthuc: string } {
    const range = this.getUTCDateRange(startDate, endDate);
    return {
      Batdau: range.startUTC,
      Ketthuc: range.endUTC
    };
  }

  /**
   * Enhanced object date field synchronization
   * Specifically handles ngaygiao, ngaynhan fields for API calls
   * @param data Object containing date fields
   * @param dateFields Array of date field names to process
   * @returns Object with UTC-converted date fields
   */
  synchronizeObjectDates(data: any, dateFields: string[] = ['ngaygiao', 'ngaynhan']): any {
    if (!data || typeof data !== 'object') return data;
    
    const synchronized = { ...data };
    
    dateFields.forEach(field => {
      if (synchronized[field] !== undefined && synchronized[field] !== null) {
        console.log(`🔄 Frontend synchronizing ${field}: ${synchronized[field]}`);
        
        try {
          synchronized[field] = this.toUTC(synchronized[field], field);
          console.log(`✅ Frontend synchronized ${field}: ${synchronized[field]}`);
        } catch (error) {
          console.error(`❌ Error synchronizing ${field}:`, error);
          throw new Error(`Failed to synchronize ${field}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    });
    
    return synchronized;
  }

  /**
   * Enhanced formatForDisplay method with logging for critical fields
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị
   * @param fieldName Optional field name for logging
   * @returns Formatted string
   */
  formatForDisplayEnhanced(utcDate: any, format: string = 'DD/MM/YYYY', fieldName?: string): string {
    if (!utcDate) return '';
    
    try {
      const formatted = moment.utc(utcDate).local().format(format);
      
      if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        console.log(`📅 Frontend displaying ${fieldName}: ${utcDate} → ${formatted}`);
      }
      
      return formatted;
    } catch (error) {
      console.error(`Error formatting date for display:`, error);
      return '';
    }
  }

  /**
   * Validate date synchronization between client and server
   * @param clientDate Date from client
   * @param serverDate Date from server response
   * @param fieldName Field name for logging
   * @returns boolean indicating if dates match
   */
  validateDateSync(clientDate: any, serverDate: any, fieldName?: string): boolean {
    if (!clientDate || !serverDate) return false;
    
    try {
      const clientUTC = this.toUTC(clientDate);
      const serverUTC = moment.utc(serverDate).toISOString();
      
      const isMatch = clientUTC === serverUTC;
      
      if (fieldName && ['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        console.log(`🔍 Date sync validation for ${fieldName}:`, {
          client: clientUTC,
          server: serverUTC,
          match: isMatch
        });
      }
      
      return isMatch;
    } catch (error) {
      console.error(`Error validating date sync:`, error);
      return false;
    }
  }
}
