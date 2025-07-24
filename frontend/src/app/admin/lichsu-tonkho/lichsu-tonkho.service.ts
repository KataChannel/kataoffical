import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LichSuTonKhoService {
  private apiUrl = environment.APIURL;
  
  // Signals để quản lý state
  ListLichSuTonKho = signal<any[]>([]);
  DanhSachChotKho = signal<any[]>([]);
  ThongKeGiaoDich = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  // Tạo lịch sử giao dịch tồn kho
  async createLichSuTonKho(data: {
    sanphamId: string;
    loaiGiaoDich: string;
    soLuongThayDoi: number;
    donGia?: number;
    phieuKhoId?: string;
    donhangId?: string;
    userId?: string;
    lyDo?: string;
    ghichu?: string;
    soChungTu?: string;
  }) {
    try {
      this.isLoading.set(true);
      const response = await this.http.post(`${this.apiUrl}/lichsu-tonkho/create`, data).toPromise();
      return response;
    } catch (error) {
      console.error('Error creating lich su ton kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Lấy lịch sử tồn kho với phân trang và filter
  async getLichSuTonKho(params: {
    page: number;
    limit: number;
    sanphamId?: string;
    loaiGiaoDich?: string;
    tuNgay?: string;
    denNgay?: string;
    userId?: string;
  }) {
    try {
      this.isLoading.set(true);
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response: any = await this.http.get(`${this.apiUrl}/lichsu-tonkho?${queryParams.toString()}`).toPromise();
      this.ListLichSuTonKho.set(response.data || []);
      return response;
    } catch (error) {
      console.error('Error getting lich su ton kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Lấy thống kê giao dịch
  async getThongKeGiaoDich(params: {
    tuNgay?: string;
    denNgay?: string;
    sanphamId?: string;
  }) {
    try {
      this.isLoading.set(true);
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response: any = await this.http.get(`${this.apiUrl}/lichsu-tonkho/thong-ke?${queryParams.toString()}`).toPromise();
      this.ThongKeGiaoDich.set(response || []);
      return response;
    } catch (error) {
      console.error('Error getting thong ke giao dich:', error);
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
      const response = await this.http.post(`${this.apiUrl}/lichsu-tonkho/chot-kho`, data).toPromise();
      return response;
    } catch (error) {
      console.error('Error creating chot kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Thực hiện chốt kho
  async thucHienChotKho(chotKhoId: string, userId?: string) {
    try {
      this.isLoading.set(true);
      const response = await this.http.put(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}/thuc-hien`, { userId }).toPromise();
      return response;
    } catch (error) {
      console.error('Error executing chot kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Lấy danh sách chốt kho
  async getDanhSachChotKho(params: {
    page: number;
    limit: number;
    trangThai?: string;
    tuNgay?: string;
    denNgay?: string;
  }) {
    try {
      this.isLoading.set(true);
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response: any = await this.http.get(`${this.apiUrl}/lichsu-tonkho/chot-kho?${queryParams.toString()}`).toPromise();
      this.DanhSachChotKho.set(response.data || []);
      return response;
    } catch (error) {
      console.error('Error getting danh sach chot kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Lấy chi tiết chốt kho
  async getChiTietChotKho(chotKhoId: string) {
    try {
      this.isLoading.set(true);
      const response = await this.http.get(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error getting chi tiet chot kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Xóa chốt kho
  async xoaChotKho(chotKhoId: string) {
    try {
      this.isLoading.set(true);
      const response = await this.http.delete(`${this.apiUrl}/lichsu-tonkho/chot-kho/${chotKhoId}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error deleting chot kho:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Reset data
  resetData() {
    this.ListLichSuTonKho.set([]);
    this.DanhSachChotKho.set([]);
    this.ThongKeGiaoDich.set([]);
  }
}
