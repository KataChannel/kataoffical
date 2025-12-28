import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PhieuThuChiService } from '../phieuthuchi.service';

@Component({
  selector: 'app-list-phieuthuchi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-phieuthuchi.component.html',
  styleUrls: ['./list-phieuthuchi.component.scss']
})
export class ListPhieuthuchiComponent implements OnInit {
  filters = signal<any>({
    loai: '',
    trangThai: '',
    tuNgay: '',
    denNgay: '',
    page: 1,
    limit: 20
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
      await this.phieuThuChiService.getList(this.filters());
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Có lỗi khi tải dữ liệu');
    }
  }

  onFilterChange() {
    this.filters.update(f => ({ ...f, page: 1 }));
    this.loadData();
  }

  onPageChange(page: number) {
    this.filters.update(f => ({ ...f, page }));
    this.loadData();
  }

  viewDetail(id: string) {
    this.router.navigate(['/admin/phieuthuchi/detail', id]);
  }

  createNew() {
    this.router.navigate(['/admin/phieuthuchi/detail/new']);
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
