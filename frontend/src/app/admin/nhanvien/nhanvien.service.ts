import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Nhanvien,
  CreateNhanvienDto,
  UpdateNhanvienDto,
  NhanvienListResponse,
  NhanvienQueryOptions,
  NhanvienStatistics
} from '../../models/nhanvien.model';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);
  
  private apiUrl = `${environment.APIURL}/nhanvien`;
  
  // Signals for reactive state management
  ListNhanvien = signal<Nhanvien[]>([]);
  DetailNhanvien = signal<Nhanvien | null>(null);
  Statistics = signal<NhanvienStatistics | null>(null);
  total = signal<number>(0);
  page = signal<number>(1);
  limit = signal<number>(50);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('accessToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all nhân viên with pagination and filters
   */
  async getAllNhanvien(options?: NhanvienQueryOptions): Promise<NhanvienListResponse> {
    try {
      this.loading.set(true);
      this.error.set(null);

      let url = this.apiUrl;
      const params: string[] = [];

      if (options?.phongbanId) {
        params.push(`phongbanId=${options.phongbanId}`);
      }
      if (options?.trangThai) {
        params.push(`trangThai=${options.trangThai}`);
      }
      if (options?.chucVu) {
        params.push(`chucVu=${options.chucVu}`);
      }
      if (options?.search) {
        params.push(`search=${encodeURIComponent(options.search)}`);
      }
      if (options?.page) {
        params.push(`page=${options.page}`);
        this.page.set(options.page);
      }
      if (options?.limit) {
        params.push(`limit=${options.limit}`);
        this.limit.set(options.limit);
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await firstValueFrom(
        this.http.get<NhanvienListResponse>(url, { headers: this.getHeaders() })
      );

      this.ListNhanvien.set(response.data);
      this.total.set(response.total);
      this.page.set(response.page);
      this.limit.set(response.limit);
      
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải danh sách nhân viên');
      this.snackBar.open('Lỗi khi tải danh sách nhân viên', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get nhân viên statistics
   */
  async getStatistics(): Promise<NhanvienStatistics> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<NhanvienStatistics>(`${this.apiUrl}/statistics`, { headers: this.getHeaders() })
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
   * Get nhân viên by ID
   */
  async getNhanvienById(id: string): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<Nhanvien>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      );

      this.DetailNhanvien.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải chi tiết nhân viên');
      this.snackBar.open('Lỗi khi tải chi tiết nhân viên', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Get nhân viên by mã
   */
  async getNhanvienByMaNV(maNV: string): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.get<Nhanvien>(`${this.apiUrl}/ma/${maNV}`, { headers: this.getHeaders() })
      );

      this.DetailNhanvien.set(response);
      return response;
    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải nhân viên');
      this.snackBar.open('Lỗi khi tải nhân viên', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Create new nhân viên
   */
  async createNhanvien(data: CreateNhanvienDto): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.post<Nhanvien>(this.apiUrl, data, { headers: this.getHeaders() })
      );

      this.snackBar.open('Tạo nhân viên thành công', 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllNhanvien({ page: this.page(), limit: this.limit() });
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi tạo nhân viên';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Update nhân viên
   */
  async updateNhanvien(id: string, data: UpdateNhanvienDto): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.patch<Nhanvien>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() })
      );

      this.snackBar.open('Cập nhật nhân viên thành công', 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllNhanvien({ page: this.page(), limit: this.limit() });
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi cập nhật nhân viên';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Delete nhân viên
   */
  async deleteNhanvien(id: string): Promise<{ message: string }> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      );

      this.snackBar.open(response.message, 'Đóng', { duration: 3000 });
      
      // Refresh list
      await this.getAllNhanvien({ page: this.page(), limit: this.limit() });
      
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi xóa nhân viên';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Link nhân viên to user
   */
  async linkToUser(nhanvienId: string, userId: string): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.post<Nhanvien>(
          `${this.apiUrl}/${nhanvienId}/link-user`,
          { userId },
          { headers: this.getHeaders() }
        )
      );

      this.snackBar.open('Liên kết user thành công', 'Đóng', { duration: 3000 });
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi liên kết user';
      this.error.set(message);
      this.snackBar.open(message, 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Unlink nhân viên from user
   */
  async unlinkFromUser(nhanvienId: string): Promise<Nhanvien> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const response = await firstValueFrom(
        this.http.post<Nhanvien>(
          `${this.apiUrl}/${nhanvienId}/unlink-user`,
          {},
          { headers: this.getHeaders() }
        )
      );

      this.snackBar.open('Gỡ liên kết user thành công', 'Đóng', { duration: 3000 });
      return response;
    } catch (error: any) {
      const message = error.error?.message || 'Lỗi khi gỡ liên kết user';
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
    this.ListNhanvien.set([]);
    this.DetailNhanvien.set(null);
    this.Statistics.set(null);
    this.total.set(0);
    this.page.set(1);
    this.limit.set(50);
    this.loading.set(false);
    this.error.set(null);
  }
}
