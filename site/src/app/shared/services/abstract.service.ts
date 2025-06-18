import { inject, Injectable, signal, Signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { openDB } from 'idb';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../utils/storage.service';
import { ErrorLogService } from './errorlog.service';
import { SharedSocketService } from './sharedsocket.service';
import { ServiceInterface } from '../interfaces/service.interface';
@Injectable()
export abstract class AbstractService<T> implements ServiceInterface<T> {
  private socket: any;
  protected entityName: string; // Tên entity (dathang, donhang, sanpham)

  constructor(
    entityName: string,
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService
  ) {
    this.entityName = entityName.toLowerCase();
    this.socket = this._sharedSocketService.getSocket();
    this.listenComponentUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListComponent = signal<T[]>([]);
  DetailComponent = signal<T | null>(null);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10);
  componentId = signal<string | null>(null);

  private async initDB() {
    const entityName = this.entityName;
    return await openDB(`${entityName}DB`, 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore(entityName, { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains(entityName)) {
            db.deleteObjectStore(entityName);
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore(entityName, { keyPath: 'id' });
        }
      },
    });
  }

  private async saveEntities(data: T[], pagination: { page: number; totalPages: number; total: number; pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction(this.entityName, 'readwrite');
    const store = tx.objectStore(this.entityName);
    await store.clear();
    await store.put({ id: 'data', entities: data, pagination });
    await tx.done;
  }

  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get(this.entityName, 'data');
    if (cached && cached.entities) {
      return {
        entities: cached.entities,
        pagination: cached.pagination || { page: 1, totalPages: 1, total: cached.entities.length, pageSize: 10 }
      };
    }
    return { entities: [], pagination: { page: 1, totalPages: 1, total: 0, pageSize: 10 } };
  }

  setComponentId(id: string | null) {
    this.componentId.set(id);
  }

  async ImportComponent(dulieu: T) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}/import`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await this.getAllComponent();
    } catch (error) {
      console.error(error);
    }
  }

  async CreateComponent(dulieu: T) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      await this.getAllComponent(undefined, true);
      this.componentId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError(`Failed to Create ${this.entityName}`, error);
      console.error(error);
    }
  }

  async getAllComponent(queryParams?: any, forceRefresh: boolean = false): Promise<T[]> {
    this.pageSize.set(queryParams?.limit || this.pageSize());
    const cached = await this.getCachedData();
    const updatedAtCache = this._StorageService.getItem(`${this.entityName}_updatedAt`) || '0';

    if (!forceRefresh && cached.entities.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) {
      this.ListComponent.set(cached.entities);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.entities;
    }

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/${this.entityName}/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListComponent.set(cached.entities);
          this.page.set(cached.pagination.page);
          this.totalPages.set(cached.pagination.totalPages);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.entities;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        if (updatedAtServer <= updatedAtCache) {
          this.ListComponent.set(cached.entities);
          this.page.set(cached.pagination.page);
          this.totalPages.set(cached.pagination.totalPages);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.entities;
        }
      }

      const query = new URLSearchParams({
        page: (queryParams?.page || this.page()).toString(),
        limit: (queryParams?.limit || this.pageSize()).toString()
      });
      const response = await fetch(`${environment.APIURL}/${this.entityName}?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListComponent.set(cached.entities);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.entities;
      }

      const data = await response.json();
      await this.saveEntities(data.data, {
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        total: data.total || data.data.length,
        pageSize: queryParams?.limit || this.pageSize()
      });

      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/${this.entityName}/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem(`${this.entityName}_updatedAt`, updatedAtServer);
      } else {
        this._StorageService.setItem(`${this.entityName}_updatedAt`, new Date().toISOString());
      }

      this.ListComponent.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(queryParams?.limit || this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError(`Failed to getAll ${this.entityName}`, error);
      console.error(error);
      this.ListComponent.set(cached.entities);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.entities;
    }
  }

  async getUpdatedCodeIds(): Promise<string[] | undefined> {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      await this.getAllComponent();
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError(`Failed to getUpdatedCodeIds for ${this.entityName}`, error);
      console.error(error);
      return undefined;
    }
  }

  listenComponentUpdates(): void {
    this.socket.off(`${this.entityName}-updated`);
    this.socket.on(`${this.entityName}-updated`, async () => {
      console.log(`🔄 Dữ liệu ${this.entityName} thay đổi, cập nhật lại cache...`);
      this._StorageService.removeItem(`${this.entityName}_updatedAt`);
      await this.getAllComponent();
    });
  }

  async getComponentBy(param: any): Promise<void> {
    this.pageSize.set(param?.limit || this.pageSize());
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ ...param, page: this.page(), limit: this.pageSize() }),
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailComponent.set(data);
      } else {
        await this.saveEntities(data.data, {
          page: data.page || 1,
          totalPages: data.totalPages || 1,
          total: data.total || data.data.length,
          pageSize: this.pageSize()
        });
        this._StorageService.setItem(`${this.entityName}_updatedAt`, new Date().toISOString());
        this.ListComponent.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
    } catch (error) {
      this._ErrorLogService.logError(`Failed to get ${this.entityName} by`, error);
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListComponent.set(cached.entities);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async SearchBy(param: any): Promise<void> {
    return this.getComponentBy(param);
  }

  async updateComponent(dulieu: T): Promise<void> {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}/${(dulieu as any).id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      await this.getAllComponent(undefined, true);
      await this.getComponentBy({ id: data.id, isOne: true });
    } catch (error) {
      this._ErrorLogService.logError(`Failed to update ${this.entityName}`, error);
      console.error(error);
    }
  }

  async DeleteComponent(item: T): Promise<void> {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/${this.entityName}/${(item as any).id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      await this.getAllComponent(undefined, true);
    } catch (error) {
      this._ErrorLogService.logError(`Failed to delete ${this.entityName}`, error);
      console.error(error);
    }
  }

  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại';
        break;
      case 401:
      case 404:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
    this._snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}