import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Phongban,
  CreatePhongbanDto,
  UpdatePhongbanDto,
  PhongbanStatistics,
  PhongbanQueryOptions
} from '../../models/phongban.model';

@Injectable({
  providedIn: 'root'
})
export class PhongbanService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);
  
  private apiUrl = `${environment.APIURL}/phongban`;
  
  // Signals for reactive state management
  ListPhongban = signal<Phongban[]>([]);
  PhongbanTree = signal<Phongban[]>([]);
  DetailPhongban = signal<Phongban | null>(null);
  Statistics = signal<PhongbanStatistics | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all phòng ban with optional filters
   */
  async getAllPhongban(options?: PhongbanQueryOptions): Promise<Phongban[]> {
    try {
      this.loading.set(true);
      this.error.set(null);

      let url = this.apiUrl;
      const params: string[] = [];

      if (options?.level !== undefined) {
        params.push(`level=${options.level}`);
      }
      if (options?.loai) {
        params.push(`loai=${options.loai}`);
      }
      if (options?.parentId !== undefined) {
        params.push(`parentId=${options.parentId || 'null'}`);
      }
      if (options?.includeChildren !== undefined) {
        params.push(`includeChildren=${options.includeChildren}`);
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await firstValueFrom(
        this.http.get<Phongban[]>(url, { headers: this.getHeaders() })
      );

      this.ListPhongban.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải danh sách phòng ban');
      this.snackBar.open('Lỗi khi tải danh sách phòng ban', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get phòng ban tree structure
   */
  async getPhongbanTree(): Promise<Phongban[]> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<Phongban[]>(`${this.apiUrl}/tree`, { headers: this.getHeaders() })
      );

      this.PhongbanTree.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải cây phòng ban');
      this.snackBar.open('Lỗi khi tải cây phòng ban', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get phòng ban statistics
   */
  async getStatistics(): Promise<PhongbanStatistics> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<PhongbanStatistics>(`${this.apiUrl}/statistics`, { headers: this.getHeaders() })
      );

      this.Statistics.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải thống kê');
      this.snackBar.open('Lỗi khi tải thống kê', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get phòng ban by ID
   */
  async getPhongbanById(id: string): Promise<Phongban> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<Phongban>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      );

      this.DetailPhongban.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải chi tiết phòng ban');
      this.snackBar.open('Lỗi khi tải chi tiết phòng ban', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get phòng ban by mã
   */
  async getPhongbanByMa(ma: string): Promise<Phongban> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<Phongban>(`${this.apiUrl}/ma/${ma}`, { headers: this.getHeaders() })
      );

      this.DetailPhongban.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải phòng ban');
      this.snackBar.open('Lỗi khi tải phòng ban', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Create new phòng ban
   */
  async createPhongban(data: CreatePhongbanDto): Promise<Phongban> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.post<Phongban>(this.apiUrl, data, { headers: this.getHeaders() })
      );

      this.snackBar.open('Tạo phòng ban thành công', 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllPhongban();
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi tạo phòng ban';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Update phòng ban
   */
  async updatePhongban(id: string, data: UpdatePhongbanDto): Promise<Phongban> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.patch<Phongban>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() })
      );

      this.snackBar.open('Cập nhật phòng ban thành công', 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllPhongban();
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi cập nhật phòng ban';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Delete phòng ban
   */
  async deletePhongban(id: string): Promise<{ message: string }> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      );

      this.snackBar.open(response.message, 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllPhongban();
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi xóa phòng ban';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Reset error state
   */
  clearError() {
    this.error.set(null);
  }

  /**
   * Reset all signals
   */
  reset() {
    this.ListPhongban.set([]);
    this.PhongbanTree.set([]);
    this.DetailPhongban.set(null);
    this.Statistics.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
}
