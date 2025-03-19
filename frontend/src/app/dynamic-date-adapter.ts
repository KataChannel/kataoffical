// dynamic-date-adapter.ts
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class DynamicDateAdapter extends NativeDateAdapter {
  // Lấy múi giờ từ trình duyệt hoặc cấu hình (có thể thay đổi động)
  private getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone; // Ví dụ: "Asia/Ho_Chi_Minh"
  }

  // Tính offset từ UTC (đơn vị: milliseconds)
  private getTimezoneOffsetMs(date: Date): number {
    const tz = this.getUserTimezone();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const localTime = new Date(
      formatter.formatToParts(date).reduce((acc, part) => {
        if (part.type === 'hour') acc.setHours(+part.value);
        if (part.type === 'minute') acc.setMinutes(+part.value);
        if (part.type === 'second') acc.setSeconds(+part.value);
        return acc;
      }, new Date(date)).toISOString()
    );
    return date.getTime() - localTime.getTime();
  }

  // Hiển thị ngày theo múi giờ của người dùng
  override format(date: Date, displayFormat: any): string {
    const offsetMs = this.getTimezoneOffsetMs(date);
    const localDate = new Date(date.getTime() + offsetMs);
    return super.format(localDate, displayFormat);
  }

  // Parse giá trị nhập vào, chuyển về UTC
  override parse(value: any): Date | null {
    const date = super.parse(value);
    if (!date) return null;
    const offsetMs = this.getTimezoneOffsetMs(date);
    return new Date(date.getTime() - offsetMs); // Chuyển về UTC
  }

  // Tạo ngày mới ở UTC
  override createDate(year: number, month: number, date: number): Date {
    return new Date(Date.UTC(year, month, date)); // Luôn trả về UTC
  }

  // Deserialize giá trị, chuyển về UTC
  override deserialize(value: any): Date | null {
    const date = super.deserialize(value);
    if (!date) return null;
    const offsetMs = this.getTimezoneOffsetMs(date);
    return new Date(date.getTime() - offsetMs); // Chuyển về UTC
  }

  // Ngày hiện tại ở UTC
  override today(): Date {
    const now = new Date();
    const offsetMs = this.getTimezoneOffsetMs(now);
    return new Date(now.getTime() - offsetMs); // Trả về UTC
  }
}