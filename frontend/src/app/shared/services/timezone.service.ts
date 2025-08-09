import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  
  /**
   * Chuyển đổi ngày từ timezone local sang UTC để lưu database
   * @param date Date string hoặc Date object hoặc moment object
   * @returns ISO string UTC để lưu database
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
    const startUTC = startDate ? this.toUTC(startDate) : '';
    const endUTC = endDate ? this.toUTC(endDate) : '';
    
    return { startUTC, endUTC };
  }
}
