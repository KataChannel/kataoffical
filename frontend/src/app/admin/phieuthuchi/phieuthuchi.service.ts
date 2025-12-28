import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { CreatePhieuThuChiDto, PhieuThuChi, PhieuThuChiFilter } from './phieuthuchi';

@Injectable({
  providedIn: 'root'
})
export class PhieuThuChiService {
  constructor(private storageService: StorageService) {}

  listPhieuThuChi = signal<PhieuThuChi[]>([]);
  detailPhieuThuChi = signal<PhieuThuChi | null>(null);
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(20);
  loading = signal<boolean>(false);

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getItem('token')
    };
  }

  async getList(filters: PhieuThuChiFilter = {}) {
    try {
      this.loading.set(true);
      const params = new URLSearchParams();
      
      if (filters.loai) params.append('loai', filters.loai);
      if (filters.trangThai) params.append('trangThai', filters.trangThai);
      if (filters.doiTuong) params.append('doiTuong', filters.doiTuong);
      if (filters.tuNgay) params.append('tuNgay', filters.tuNgay);
      if (filters.denNgay) params.append('denNgay', filters.denNgay);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(
        `${environment.APIURL}/phieuthuchi?${params.toString()}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      this.listPhieuThuChi.set(result.data || []);
      this.total.set(result.total || 0);
      this.page.set(result.page || 1);
      this.pageCount.set(result.totalPages || 1);
      
      return result;
    } catch (error) {
      console.error('Error fetching phieu thu chi:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async getDetail(id: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.detailPhieuThuChi.set(data);
      return data;
    } catch (error) {
      console.error('Error fetching phieu detail:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async create(dto: CreatePhieuThuChiDto) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(dto)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating phieu:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: string, dto: Partial<CreatePhieuThuChiDto>) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify(dto)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating phieu:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async delete(id: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}`,
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting phieu:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async guiDuyet(id: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}/gui-duyet`,
        {
          method: 'POST',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending for approval:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async duyet(id: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}/duyet`,
        {
          method: 'POST',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error approving phieu:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async huy(id: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/${id}/huy`,
        {
          method: 'POST',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling phieu:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async getBaoCao(tuNgay: string, denNgay: string) {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/phieuthuchi/bao-cao?tuNgay=${tuNgay}&denNgay=${denNgay}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }
}
