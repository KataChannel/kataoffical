import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Lưu dữ liệu
  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Lấy dữ liệu
  getItem(key: string): any {
 
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  }

  // Xóa dữ liệu
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Xóa tất cả
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
  async clearAllIndexedDB() {
    try {
        // Get all database names
        const databases = await window.indexedDB.databases();
        
        // Delete each database
        for (const dbInfo of databases) {
            if (dbInfo.name) {
                await new Promise<void>((resolve, reject) => {
                    const request = window.indexedDB.deleteDatabase(dbInfo.name as string);
                    
                    request.onsuccess = () => {
                        console.log(`Database ${dbInfo.name} deleted`);
                        resolve();
                    };
                    
                    request.onerror = (event) => {
                        console.error(`Error deleting ${dbInfo.name}:`, event);
                        reject(event);
                    };
                    
                    request.onblocked = () => {
                        console.warn(`Deletion of ${dbInfo.name} blocked`);
                        reject(new Error(`Deletion of ${dbInfo.name} blocked`));
                    };
                });
            }
        }
        console.log('All IndexedDB databases cleared');
    } catch (error) {
        console.error('Failed to clear all IndexedDB databases:', error);
    }
}
}
