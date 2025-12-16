import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { writeExcelFile } from '../../shared/utils/exceldrive.utils';
import {
  Nhanvien,
  CreateNhanvienDto,
  UpdateNhanvienDto,
  NhanvienListResponse,
  NhanvienQueryOptions,
  NhanvienStatistics,
  GioiTinhLabels,
  TrangThaiNhanvienLabels,
  GioiTinh,
  TrangThaiNhanvien
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
    const token = this.storageService.getItem('token');
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

  // ==========================================
  // IMPORT / EXPORT METHODS
  // ==========================================

  /**
   * Export nhân viên to Excel
   */
  async exportToExcel(options?: NhanvienQueryOptions): Promise<void> {
    try {
      this.loading.set(true);
      
      // Fetch all data without pagination
      const response = await firstValueFrom(
        this.http.get<NhanvienListResponse>(this.apiUrl + '?limit=10000', { headers: this.getHeaders() })
      );

      if (!response.data || response.data.length === 0) {
        this.snackBar.open('Không có dữ liệu để xuất', 'Đóng', { duration: 3000 });
        return;
      }

      // Define headers and mapping for Excel
      const headers = [
        'Mã NV', 'Mã Làm Việc', 'Họ và Tên', 'Giới Tính', 'Ngày Sinh',
        'CMND/CCCD', 'Số Điện Thoại', 'Email', 'Địa Chỉ Hiện Tại',
        'Phòng Ban', 'Chức Vụ', 'Vị Trí', 'Ngày Vào Làm', 'Trạng Thái',
        'Lương Cơ Bản', 'Hiệu Suất Công Việc', 'Phụ Cấp Xăng', 'Phụ Cấp ĐT',
        'Hỗ Trợ Chuyên Cần', 'Tiền Ăn Giữa Ca', 'Thưởng Kinh Doanh', 'Phụ Cấp Khác',
        'Số Tài Khoản', 'Ngân Hàng', 'Chi Nhánh', 'Ghi Chú'
      ];

      const mapping: { [key: string]: string } = {
        'maNV': 'Mã NV',
        'maLamViec': 'Mã Làm Việc',
        'hoTen': 'Họ và Tên',
        'gioiTinhLabel': 'Giới Tính',
        'ngaySinhFormatted': 'Ngày Sinh',
        'cmnd': 'CMND/CCCD',
        'soDienThoai': 'Số Điện Thoại',
        'email': 'Email',
        'diaChiHienTai': 'Địa Chỉ Hiện Tại',
        'phongbanTen': 'Phòng Ban',
        'chucVu': 'Chức Vụ',
        'viTri': 'Vị Trí',
        'ngayVaoLamFormatted': 'Ngày Vào Làm',
        'trangThaiLabel': 'Trạng Thái',
        'luongCoBan': 'Lương Cơ Bản',
        'hieuSuatCongViec': 'Hiệu Suất Công Việc',
        'phuCapXang': 'Phụ Cấp Xăng',
        'phuCapDienThoai': 'Phụ Cấp ĐT',
        'hoTroChuyenCan': 'Hỗ Trợ Chuyên Cần',
        'tienAnGiuaCa': 'Tiền Ăn Giữa Ca',
        'thuongKinhDoanh': 'Thưởng Kinh Doanh',
        'phuCapKhac': 'Phụ Cấp Khác',
        'soTaiKhoan': 'Số Tài Khoản',
        'nganHang': 'Ngân Hàng',
        'chiNhanh': 'Chi Nhánh',
        'ghiChu': 'Ghi Chú'
      };

      // Transform data for export
      const exportData = response.data.map(nv => ({
        ...nv,
        gioiTinhLabel: nv.gioiTinh ? GioiTinhLabels[nv.gioiTinh as GioiTinh] : '',
        trangThaiLabel: TrangThaiNhanvienLabels[nv.trangThai as TrangThaiNhanvien] || nv.trangThai,
        ngaySinhFormatted: nv.ngaySinh ? new Date(nv.ngaySinh).toLocaleDateString('vi-VN') : '',
        ngayVaoLamFormatted: nv.ngayVaoLam ? new Date(nv.ngayVaoLam).toLocaleDateString('vi-VN') : '',
        phongbanTen: nv.phongban?.ten || ''
      }));

      writeExcelFile(exportData, 'DanhSachNhanVien', headers, mapping);
      this.snackBar.open(`Đã xuất ${response.data.length} nhân viên thành công`, 'Đóng', { duration: 3000 });

    } catch (error: any) {
      console.error('Error exporting to Excel:', error);
      this.snackBar.open('Lỗi khi xuất Excel', 'Đóng', { duration: 3000 });
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Export template Excel for import
   */
  exportImportTemplate(): void {
    const templateData = [
      {
        'Mã NV': 'NV001',
        'Mã Làm Việc': 'MLV001',
        'Họ và Tên': 'Nguyễn Văn A',
        'Giới Tính': 'Nam',
        'Ngày Sinh': '01/01/1990',
        'CMND/CCCD': '012345678901',
        'Số Điện Thoại': '0901234567',
        'Email': 'example@email.com',
        'Địa Chỉ Hiện Tại': '123 Đường ABC, Quận XYZ',
        'Phòng Ban': 'Kế Toán',
        'Chức Vụ': 'Nhân viên',
        'Vị Trí': 'KT Nội Bộ',
        'Ngày Vào Làm': '01/01/2024',
        'Trạng Thái': 'Đang làm việc',
        'Lương Cơ Bản': 10000000,
        'Hiệu Suất Công Việc': 0,
        'Phụ Cấp Xăng': 500000,
        'Phụ Cấp ĐT': 200000,
        'Hỗ Trợ Chuyên Cần': 300000,
        'Tiền Ăn Giữa Ca': 500000,
        'Thưởng Kinh Doanh': 0,
        'Phụ Cấp Khác': 0,
        'Số Tài Khoản': '1234567890',
        'Ngân Hàng': 'Vietcombank',
        'Chi Nhánh': 'Chi nhánh HCM',
        'Ghi Chú': ''
      }
    ];

    const headers = Object.keys(templateData[0]);
    writeExcelFile(templateData, 'MauImportNhanVien', headers);
    this.snackBar.open('Đã tải mẫu import thành công', 'Đóng', { duration: 3000 });
  }

  /**
   * Import nhân viên from Excel data
   */
  async importFromExcel(data: any[]): Promise<{ success: number; failed: number; errors: string[] }> {
    const result = { success: 0, failed: 0, errors: [] as string[] };

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNum = i + 2; // Excel row number (header is row 1)

      try {
        const nhanvienData = this.transformImportRow(row);
        
        if (!nhanvienData.maNV) {
          result.errors.push(`Dòng ${rowNum}: Mã NV là bắt buộc`);
          result.failed++;
          continue;
        }

        if (!nhanvienData.hoTen) {
          result.errors.push(`Dòng ${rowNum}: Họ và tên là bắt buộc`);
          result.failed++;
          continue;
        }

        // Check if exists, update; otherwise create
        try {
          const existing = await firstValueFrom(
            this.http.get<Nhanvien>(`${this.apiUrl}/ma/${nhanvienData.maNV}`, { headers: this.getHeaders() })
          );
          
          // Update existing
          await firstValueFrom(
            this.http.patch<Nhanvien>(`${this.apiUrl}/${existing.id}`, nhanvienData, { headers: this.getHeaders() })
          );
          result.success++;
        } catch (e: any) {
          if (e.status === 404) {
            // Create new
            await firstValueFrom(
              this.http.post<Nhanvien>(this.apiUrl, nhanvienData, { headers: this.getHeaders() })
            );
            result.success++;
          } else {
            throw e;
          }
        }

      } catch (error: any) {
        const message = error?.error?.message || error?.message || 'Lỗi không xác định';
        result.errors.push(`Dòng ${rowNum}: ${message}`);
        result.failed++;
      }
    }

    return result;
  }

  /**
   * Transform Excel row to CreateNhanvienDto
   */
  private transformImportRow(row: any): CreateNhanvienDto {
    // Map Vietnamese headers to DTO fields
    const gioiTinhMap: { [key: string]: GioiTinh } = {
      'Nam': GioiTinh.NAM,
      'Nữ': GioiTinh.NU,
      'nam': GioiTinh.NAM,
      'nữ': GioiTinh.NU,
      'NAM': GioiTinh.NAM,
      'NU': GioiTinh.NU,
      'Khác': GioiTinh.KHAC
    };

    const trangThaiMap: { [key: string]: TrangThaiNhanvien } = {
      'Đang làm việc': TrangThaiNhanvien.DANGLAMVIEC,
      'Đang Làm Việc': TrangThaiNhanvien.DANGLAMVIEC,
      'Nghỉ phép': TrangThaiNhanvien.NGHIPHEP,
      'Thử việc': TrangThaiNhanvien.THUVIEC,
      'Đã nghỉ việc': TrangThaiNhanvien.DANGHIVIEC,
      'Tạm nghỉ': TrangThaiNhanvien.TAMNGHI,
      'Khác': TrangThaiNhanvien.KHAC,
      'DANGLAMVIEC': TrangThaiNhanvien.DANGLAMVIEC,
      'NGHIPHEP': TrangThaiNhanvien.NGHIPHEP,
      'THUVIEC': TrangThaiNhanvien.THUVIEC,
      'DANGHIVIEC': TrangThaiNhanvien.DANGHIVIEC,
      'TAMNGHI': TrangThaiNhanvien.TAMNGHI
    };

    // Parse date from various formats
    const parseDate = (value: any): string | undefined => {
      if (!value) return undefined;
      if (value instanceof Date) return value.toISOString();
      const str = String(value).trim();
      if (!str) return undefined;
      
      // Try DD/MM/YYYY format
      const parts = str.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts.map(p => parseInt(p));
        if (day && month && year) {
          return new Date(year, month - 1, day).toISOString();
        }
      }
      
      // Try other formats
      const date = new Date(str);
      return isNaN(date.getTime()) ? undefined : date.toISOString();
    };

    const parseNumber = (value: any): number | undefined => {
      if (value === null || value === undefined || value === '') return undefined;
      const num = Number(value);
      return isNaN(num) ? undefined : num;
    };

    return {
      maNV: String(row['Mã NV'] || row['maNV'] || '').trim(),
      maLamViec: String(row['Mã Làm Việc'] || row['maLamViec'] || '').trim() || undefined,
      hoTen: String(row['Họ và Tên'] || row['hoTen'] || '').trim(),
      gioiTinh: gioiTinhMap[row['Giới Tính'] || row['gioiTinh']] || GioiTinh.KHAC,
      ngaySinh: parseDate(row['Ngày Sinh'] || row['ngaySinh']),
      cmnd: String(row['CMND/CCCD'] || row['cmnd'] || '').trim() || undefined,
      soDienThoai: String(row['Số Điện Thoại'] || row['soDienThoai'] || '').trim() || undefined,
      email: String(row['Email'] || row['email'] || '').trim() || undefined,
      diaChiHienTai: String(row['Địa Chỉ Hiện Tại'] || row['diaChiHienTai'] || '').trim() || undefined,
      chucVu: String(row['Chức Vụ'] || row['chucVu'] || '').trim() || undefined,
      viTri: String(row['Vị Trí'] || row['viTri'] || '').trim() || undefined,
      ngayVaoLam: parseDate(row['Ngày Vào Làm'] || row['ngayVaoLam']),
      trangThai: trangThaiMap[row['Trạng Thái'] || row['trangThai']] || TrangThaiNhanvien.THUVIEC,
      luongCoBan: parseNumber(row['Lương Cơ Bản'] || row['luongCoBan']),
      hieuSuatCongViec: parseNumber(row['Hiệu Suất Công Việc'] || row['hieuSuatCongViec']),
      phuCapXang: parseNumber(row['Phụ Cấp Xăng'] || row['phuCapXang']),
      phuCapDienThoai: parseNumber(row['Phụ Cấp ĐT'] || row['phuCapDienThoai']),
      hoTroChuyenCan: parseNumber(row['Hỗ Trợ Chuyên Cần'] || row['hoTroChuyenCan']),
      tienAnGiuaCa: parseNumber(row['Tiền Ăn Giữa Ca'] || row['tienAnGiuaCa']),
      thuongKinhDoanh: parseNumber(row['Thưởng Kinh Doanh'] || row['thuongKinhDoanh']),
      phuCapKhac: parseNumber(row['Phụ Cấp Khác'] || row['phuCapKhac']),
      soTaiKhoan: String(row['Số Tài Khoản'] || row['soTaiKhoan'] || '').trim() || undefined,
      nganHang: String(row['Ngân Hàng'] || row['nganHang'] || '').trim() || undefined,
      chiNhanh: String(row['Chi Nhánh'] || row['chiNhanh'] || '').trim() || undefined,
      ghiChu: String(row['Ghi Chú'] || row['ghiChu'] || '').trim() || undefined,
      isActive: true
    };
  }
}
