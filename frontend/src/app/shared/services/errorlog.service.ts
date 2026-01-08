import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ErrorLogService {
  private platformId = inject(PLATFORM_ID);

  async logError(message: string, details?: any): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.error('Server error log:', message, details);
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      details: {
        ...details,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
        url: typeof window !== 'undefined' ? window.location.href : 'Server',
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
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('errorLogs', JSON.stringify(logEntry));
      }
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