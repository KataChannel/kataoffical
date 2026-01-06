import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PhieuThuChiService } from '../phieuthuchi.service';

@Component({
  selector: 'app-list-phieuthuchi',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './list-phieuthuchi.component.html',
  styleUrls: ['./list-phieuthuchi.component.scss']
})
export class ListPhieuthuchiComponent implements OnInit {
  // Signals for state management
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  filters = signal<any>({
    loai: '',
    trangThai: '',
    tuNgay: '',
    denNgay: '',
    page: 1,
    limit: 20
  });

  // Computed filtered list
  filteredList = computed(() => {
    const list = this.phieuThuChiService.listPhieuThuChi();
    const filters = this.filters();
    
    if (!list || list.length === 0) return [];

    return list.filter((item: any) => {
      const matchLoai = !filters.loai || item.loai === filters.loai;
      const matchTrangThai = !filters.trangThai || item.trangThai === filters.trangThai;
      return matchLoai && matchTrangThai;
    });
  });

  // Stats computed
  stats = computed(() => {
    const list = this.phieuThuChiService.listPhieuThuChi();
    if (!list || list.length === 0) {
      return { tongThu: 0, tongChi: 0, choDuyet: 0, daDuyet: 0 };
    }

    const tongThu = list
      .filter((p: any) => p.loai === 'THU' && p.trangThai === 'DA_DUYET')
      .reduce((sum: number, p: any) => sum + Number(p.soTien || 0), 0);
    
    const tongChi = list
      .filter((p: any) => p.loai === 'CHI' && p.trangThai === 'DA_DUYET')
      .reduce((sum: number, p: any) => sum + Number(p.soTien || 0), 0);
    
    const choDuyet = list.filter((p: any) => p.trangThai === 'CHO_DUYET').length;
    const daDuyet = list.filter((p: any) => p.trangThai === 'DA_DUYET').length;

    return { tongThu, tongChi, choDuyet, daDuyet };
  });

  constructor(
    public phieuThuChiService: PhieuThuChiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loading.set(true);
      this.error.set(false);
      await this.phieuThuChiService.getList(this.filters());
    } catch (err: any) {
      console.error('Error loading data:', err);
      this.error.set(true);
      this.errorMessage.set(err.message || 'Có lỗi khi tải dữ liệu');
    } finally {
      this.loading.set(false);
    }
  }

  onFilterChange() {
    this.filters.update(f => ({ ...f, page: 1 }));
    this.loadData();
  }

  resetFilters() {
    this.filters.set({
      loai: '',
      trangThai: '',
      tuNgay: '',
      denNgay: '',
      page: 1,
      limit: 20
    });
    this.loadData();
  }

  onPageChange(page: number) {
    this.filters.update(f => ({ ...f, page }));
    this.loadData();
  }

  viewDetail(id: string) {
    this.router.navigate(['/admin/phieuthuchi', id]);
  }

  createNew() {
    this.router.navigate(['/admin/phieuthuchi/new']);
  }

  // Badge variant helper
  getBadgeVariant(trangThai: string): 'default' | 'destructive' | 'warning' | 'success' {
    switch (trangThai) {
      case 'DA_DUYET':
        return 'success';
      case 'CHO_DUYET':
        return 'warning';
      case 'HUY':
        return 'destructive';
      default:
        return 'default';
    }
  }

  // Trạng thái label helper
  getTrangThaiLabel(trangThai: string): string {
    switch (trangThai) {
      case 'NHAP':
        return 'Đang nhập';
      case 'CHO_DUYET':
        return 'Chờ duyệt';
      case 'DA_DUYET':
        return 'Đã duyệt';
      case 'HUY':
        return 'Hủy';
      default:
        return trangThai;
    }
  }

  async guiDuyet(id: string) {
    if (!confirm('Bạn có chắc muốn gửi duyệt phiếu này?')) return;
    
    try {
      await this.phieuThuChiService.guiDuyet(id);
      alert('Đã gửi duyệt thành công');
      this.loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  }

  async duyet(id: string) {
    if (!confirm('Bạn có chắc muốn duyệt phiếu này?')) return;
    
    try {
      await this.phieuThuChiService.duyet(id);
      alert('Đã duyệt thành công');
      this.loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  }

  async huy(id: string) {
    if (!confirm('Bạn có chắc muốn hủy phiếu này?')) return;
    
    try {
      await this.phieuThuChiService.huy(id);
      alert('Đã hủy thành công');
      this.loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  }

  async deletePhieu(id: string) {
    if (!confirm('Bạn có chắc muốn xóa phiếu này?')) return;
    
    try {
      await this.phieuThuChiService.delete(id);
      alert('Đã xóa thành công');
      this.loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  getTrangThaiClass(trangThai: string): string {
    switch (trangThai) {
      case 'NHAP': return 'badge-secondary';
      case 'CHO_DUYET': return 'badge-warning';
      case 'DA_DUYET': return 'badge-success';
      case 'HUY': return 'badge-danger';
      default: return 'badge-light';
    }
  }

  getTrangThaiText(trangThai: string): string {
    switch (trangThai) {
      case 'NHAP': return 'Đang nhập';
      case 'CHO_DUYET': return 'Chờ duyệt';
      case 'DA_DUYET': return 'Đã duyệt';
      case 'HUY': return 'Hủy';
      default: return trangThai;
    }
  }

  getLoaiClass(loai: string): string {
    return loai === 'THU' ? 'text-success' : 'text-danger';
  }
}
