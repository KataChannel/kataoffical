import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private dbName = 'PermissionDB';
  private storeName = 'permissions';
  private db: IDBDatabase | null = null;
  private openConnections: IDBRequest[] = [];
  private snackBar = inject(MatSnackBar);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Lưu dữ liệu vào localStorage
  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Lấy dữ liệu từ localStorage
  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  // Xóa dữ liệu từ localStorage
  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Xóa tất cả dữ liệu trong localStorage
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  // Open PermissionDB and create object store if needed
  async openDB(): Promise<IDBDatabase> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('IndexedDB is not available in this environment');
    }

    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      this.openConnections.push(request);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => {
        reject(new Error('Failed to open PermissionDB'));
      };

      request.onblocked = () => {
        this.snackBar.open(
          'Cannot access PermissionDB: Database is blocked by another connection',
          'Close',
          {
            duration: 5000,
            panelClass: ['snackbar-error'],
          }
        );
        reject(new Error('PermissionDB blocked'));
      };
    });
  }

  // Save data to PermissionDB
  async saveData(key: string, data: any): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ id: key, data });

      this.openConnections.push(request);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to save data'));
      });
    } catch (error) {
      console.error('Failed to save data:', error);
      throw error;
    }
  }

  // Retrieve data from PermissionDB
  async getData(key: string): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      this.openConnections.push(request);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result?.data);
        request.onerror = () => reject(new Error('Failed to retrieve data'));
      });
    } catch (error) {
      console.error('Failed to retrieve data:', error);
      return null;
    }
  }

  // Clear all data in the permissions store
  async clearStore(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      this.openConnections.push(request);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to clear store'));
      });
    } catch (error) {
      console.error('Failed to clear store:', error);
      throw error;
    }
  }

  // Delete PermissionDB with retry on block
  async deleteDB(maxRetries: number = 3, delay: number = 1000): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    for (let i = 0; i < maxRetries; i++) {
      try {
        // Close existing connections
        if (this.db) {
          this.db.close();
          this.db = null;
        }
        this.openConnections = [];

        return await new Promise<void>((resolve, reject) => {
          const request = indexedDB.deleteDatabase(this.dbName);

          request.onsuccess = () => {
            this.snackBar.open('PermissionDB deleted successfully', '', {
              duration: 1000,
              panelClass: ['snackbar-success'],
            });
            resolve();
          };

          request.onerror = () => {
            reject(new Error('Failed to delete PermissionDB'));
          };

          request.onblocked = () => {
            this.snackBar.open(
              'Cannot delete PermissionDB: Please close other tabs or refresh',
              'Retry',
              {
                duration: 5000,
                panelClass: ['snackbar-error'],
              }
            ).onAction().subscribe(() => {
              // Retry will be handled by the loop
            });
            reject(new Error('Deletion of PermissionDB blocked'));
          };
        });
      } catch (error) {
        if (i === maxRetries - 1) {
          console.error('Failed to delete PermissionDB after retries:', error);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
      deleteAllIndexedDBs() {
        // Lấy danh sách tất cả cơ sở dữ liệu
        indexedDB.databases().then(databases => {
          if (databases.length === 0) {
            console.log("Không có cơ sở dữ liệu IndexedDB nào để xóa.");
            return;
          }

          // Lặp qua từng cơ sở dữ liệu và xóa
          databases.forEach((db:any) => {
            indexedDB.deleteDatabase(db.name).onsuccess = () => {
              console.log(`Đã xóa cơ sở dữ liệu: ${db.name}`);
            };
            indexedDB.deleteDatabase(db.name).onerror = (event:any) => {
              console.error(`Lỗi khi xóa cơ sở dữ liệu ${db.name}:`, event.target.error);
            };
          });
        }).catch(error => {
          console.error("Lỗi khi lấy danh sách cơ sở dữ liệu:", error);
        });
      }
  // Close database explicitly
  closeDB(): void {
    if (isPlatformBrowser(this.platformId) && this.db) {
      this.db.close();
      this.db = null;
      this.openConnections = [];
    }
  }
}