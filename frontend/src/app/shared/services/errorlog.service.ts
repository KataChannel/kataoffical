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

    console.error(logEntry); // Log tạm vào console

    try {
      await fetch(`${environment.APIURL}/errorlog`, {
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
}