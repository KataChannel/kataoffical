import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ErrorLogService {
  async logError(message: string, details?: any): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      details: {
        ...details,
        userAgent: navigator.userAgent, // Thêm thông tin client
        url: window.location.href,
      },
    };
    try {
      await fetch(`${environment.APIURL}/errorlogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry),
      });
    } catch (err) {
      console.error('Failed to send log to server:', err);
      // Lưu cục bộ nếu gửi thất bại
      localStorage.setItem('errorLogs', JSON.stringify(logEntry));
    }
  }
  async ClearRedisCache(){
    try {
      await fetch(`${environment.APIURL}/redis/clear`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Failed to send log to server:', err);
    }
  }
}