import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ChotKho {
  id: string;
  maChotKho: string;
  tenChotKho: string;
  tuNgay: Date;
  denNgay: Date;
  trangThai: 'DANG_MO' | 'DA_CHOT';
  userId?: string;
  user?: {
    id: string;
    email: string;
    profile?: {
      name: string;
    };
  };
  ngayChot?: Date;
  ghichu?: string;
  tongSanPham?: number;
  tongGiaTri?: number;
  _count?: {
    chiTietChotKho: number;
    lichSuTonKho: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ChiTietChotKho {
  id: string;
  chotKhoId: string;
  sanphamId: string;
  sanpham: {
    id: string;
    title: string;
    masp: string;
    dvt: string;
    giaban?: number;
  };
  slTonDauKy: number;
  slNhapTrongKy: number;
  slXuatTrongKy: number;
  slDieuChinhTrongKy: number;
  slTonCuoiKy: number;
  donGiaTrungBinh?: number;
  giaTri?: number;
  ghichu?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChotKhoDetail extends ChotKho {
  chiTietChotKho: ChiTietChotKho[];
}

@Injectable({
  providedIn: 'root'
})
export class ChotKhoService {
  private apiUrl = environment.apiUrl;

  // Signals for state management
  ListChotKho = signal<ChotKho[]>([]);
  ChiTietChotKho = signal<ChotKhoDetail | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Statistics signals
  ThongKeChotKho = signal<any>({
    tongSoChotKho: 0,
    soChotKhoDangMo: 0,
    soChotKhoDaChot: 0,
    tongSanPham: 0,
    tongGiaTri: 0
  });

  constructor(private http: HttpClient) {}

  // Lấy danh sách chốt kho với phân trang và filter
  async getDanhSachChotKho(params: {
    page: number;
    limit: number;
    trangThai?: string;
    tuNgay?: string;
    denNgay?: string;
  }) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response: any = await this.http.get(`${this.apiUrl}/lichsu-tonkho/chot-kho?${queryParams.toString()}`).toPromise();
      this.ListChotKho.set(response.data || []);
      
      // Update statistics
      this.updateThongKe(response.data || []);
      
      return response;
    } catch (error: any) {
      console.error('Error getting danh sach chot kho:', error);
      this.error.set(error.message || 'Lỗi tải danh sách chốt kho');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Lấy chi tiết chốt kho
  async getChiTietChotKho(chotKhoId: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response: any = await this.http.get(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}`).toPromise();
      this.ChiTietChotKho.set(response);
      return response;
    } catch (error: any) {
      console.error('Error getting chi tiet chot kho:', error);
      this.error.set(error.message || 'Lỗi tải chi tiết chốt kho');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Tạo chốt kho mới
  async createChotKho(data: {
    maChotKho: string;
    tenChotKho: string;
    tuNgay: string;
    denNgay: string;
    userId?: string;
    ghichu?: string;
  }) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response = await this.http.post(`${this.apiUrl}/lichsu-tonkho/chot-kho`, data).toPromise();
      return response;
    } catch (error: any) {
      console.error('Error creating chot kho:', error);
      this.error.set(error.message || 'Lỗi tạo chốt kho');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Thực hiện chốt kho
  async thucHienChotKho(chotKhoId: string, userId?: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response = await this.http.put(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}/thuc-hien`, { userId }).toPromise();
      
      // Update the local list
      this.ListChotKho.update(list => 
        list.map(item => 
          item.id === chotKhoId 
            ? { ...item, trangThai: 'DA_CHOT' as const, ngayChot: new Date(), userId }
            : item
        )
      );
      
      return response;
    } catch (error: any) {
      console.error('Error executing chot kho:', error);
      this.error.set(error.message || 'Lỗi thực hiện chốt kho');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Xóa chốt kho
  async xoaChotKho(chotKhoId: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response = await this.http.delete(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}`).toPromise();
      
      // Remove from local list
      this.ListChotKho.update(list => list.filter(item => item.id !== chotKhoId));
      
      return response;
    } catch (error: any) {
      console.error('Error deleting chot kho:', error);
      this.error.set(error.message || 'Lỗi xóa chốt kho');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Export chi tiết chốt kho to Excel
  async exportChotKhoToExcel(chotKhoId: string) {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const response = await this.http.get(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}/export`, 
        { responseType: 'blob' }).toPromise();
      
      // Create download link
      const blob = new Blob([response as any], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ChiTietChotKho_${chotKhoId}_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      return response;
    } catch (error: any) {
      console.error('Error exporting chot kho:', error);
      this.error.set(error.message || 'Lỗi xuất báo cáo');
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Generate unique code for new chot kho
  generateMaChotKho(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const time = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    return `CK${year}${month}${day}${time}`;
  }

  // Update statistics from data
  private updateThongKe(data: ChotKho[]) {
    const thongKe = {
      tongSoChotKho: data.length,
      soChotKhoDangMo: data.filter(item => item.trangThai === 'DANG_MO').length,
      soChotKhoDaChot: data.filter(item => item.trangThai === 'DA_CHOT').length,
      tongSanPham: data.reduce((sum, item) => sum + (item.tongSanPham || 0), 0),
      tongGiaTri: data.reduce((sum, item) => sum + Number(item.tongGiaTri || 0), 0)
    };
    this.ThongKeChotKho.set(thongKe);
  }

  // Utility methods
  getTrangThaiLabel(trangThai: string): string {
    switch (trangThai) {
      case 'DANG_MO': return 'Đang mở';
      case 'DA_CHOT': return 'Đã chốt';
      default: return trangThai;
    }
  }

  getTrangThaiColor(trangThai: string): string {
    switch (trangThai) {
      case 'DANG_MO': return 'primary';
      case 'DA_CHOT': return 'accent';
      default: return 'basic';
    }
  }

  getTrangThaiIcon(trangThai: string): string {
    switch (trangThai) {
      case 'DANG_MO': return 'lock_open';
      case 'DA_CHOT': return 'lock';
      default: return 'help';
    }
  }

  // Format currency
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  // Format date
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Reset data
  resetData() {
    this.ListChotKho.set([]);
    this.ChiTietChotKho.set(null);
    this.error.set(null);
    this.ThongKeChotKho.set({
      tongSoChotKho: 0,
      soChotKhoDangMo: 0,
      soChotKhoDaChot: 0,
      tongSanPham: 0,
      tongGiaTri: 0
    });
  }
}
