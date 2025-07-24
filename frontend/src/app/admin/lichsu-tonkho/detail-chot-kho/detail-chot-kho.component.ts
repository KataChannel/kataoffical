import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { LichSuTonKhoService } from '../lichsu-tonkho.service';
import moment from 'moment';

interface ChotKhoDetail {
  id?: string;
  maChotKho: string;
  tenChotKho: string;
  tuNgay: string;
  denNgay: string;
  ghichu: string;
  userId: string;
  trangThai?: string;
  ngayThucHien?: string;
  createdAt?: string;
  chiTietTonKho?: any[];
}

@Component({
  selector: 'app-detail-chot-kho',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './detail-chot-kho.component.html',
  styleUrl: './detail-chot-kho.component.scss'
})
export class DetailChotKhoComponent implements OnInit {
  // Injected services
  private _lichSuTonKhoService = inject(LichSuTonKhoService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  // Form data
  detail = signal<ChotKhoDetail>({
    maChotKho: '',
    tenChotKho: '',
    tuNgay: '',
    denNgay: '',
    ghichu: '',
    userId: ''
  });

  // UI states
  isEdit = signal<boolean>(false);
  isCreate = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  chotKhoId = signal<string>('');

  // Chi tiết chốt kho (if viewing existing)
  chiTietChotKho = signal<ChotKhoDetail | null>(null);
  inventoryData = new MatTableDataSource<any>([]);
  
  // Table configuration for inventory details
  displayedColumns: string[] = [
    'sanpham',
    'tonKhoHienTai',
    'soLuongDieuChinh',
    'tonKhoSauChot',
    'giaTri',
    'ghichu'
  ];

  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      const mode = params.get('mode');
      
      this.chotKhoId.set(id || '');
      this.isCreate.set(id === '0');
      this.isEdit.set(id === '0' || mode === 'edit');
      
      if (id && id !== '0') {
        await this.loadChotKhoDetail(id);
      } else {
        this.resetForm();
      }
    });
  }

  async ngOnInit() {
    // Initialize component
  }

  async loadChotKhoDetail(id: string) {
    try {
      this.isLoading.set(true);
      const response = await this._lichSuTonKhoService.getChiTietChotKho(id) as ChotKhoDetail;
      
      if (response) {
        this.chiTietChotKho.set(response);
        this.detail.set({
          maChotKho: response.maChotKho || '',
          tenChotKho: response.tenChotKho || '',
          tuNgay: response.tuNgay || '',
          denNgay: response.denNgay || '',
          ghichu: response.ghichu || '',
          userId: response.userId || ''
        });

        // Load inventory details if available
        if (response.chiTietTonKho) {
          this.inventoryData.data = response.chiTietTonKho;
        }
      }

    } catch (error: any) {
      console.error('Error loading chot kho detail:', error);
      this._snackBar.open('Lỗi tải chi tiết chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  resetForm() {
    this.detail.set({
      maChotKho: this.generateMaChotKho(),
      tenChotKho: '',
      tuNgay: moment().startOf('month').format('YYYY-MM-DD'),
      denNgay: moment().endOf('month').format('YYYY-MM-DD'),
      ghichu: '',
      userId: ''
    });
  }

  generateMaChotKho(): string {
    return `CK${moment().format('YYYYMM')}${this.genId()}`;
  }

  private genId(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  async saveData() {
    try {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading.set(true);
      const formData = this.detail();

      if (this.isCreate()) {
        // Create new chot kho
        await this._lichSuTonKhoService.createChotKho(formData);
        this._snackBar.open('Tạo chốt kho thành công', 'Đóng', { duration: 3000 });
      } else {
        // Update existing chot kho (if supported)
        this._snackBar.open('Cập nhật chốt kho thành công', 'Đóng', { duration: 3000 });
      }

      this.goBack();

    } catch (error: any) {
      console.error('Error saving chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi lưu dữ liệu', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  async thucHienChotKho() {
    const chotKho = this.chiTietChotKho();
    if (!chotKho || !chotKho.id || chotKho.trangThai !== 'KHOI_TAO') {
      this._snackBar.open('Chỉ có thể thực hiện chốt kho đang ở trạng thái khởi tạo', 'Đóng', { duration: 3000 });
      return;
    }

    const confirm = window.confirm(`Bạn có chắc chắn muốn thực hiện chốt kho "${chotKho.tenChotKho}"?`);
    if (!confirm) return;

    try {
      this.isLoading.set(true);
      await this._lichSuTonKhoService.thucHienChotKho(chotKho.id);
      this._snackBar.open('Thực hiện chốt kho thành công', 'Đóng', { duration: 3000 });
      await this.loadChotKhoDetail(chotKho.id);
    } catch (error: any) {
      console.error('Error executing chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi thực hiện chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  validateForm(): boolean {
    const data = this.detail();
    
    if (!data.tenChotKho?.trim()) {
      this._snackBar.open('Vui lòng nhập tên chốt kho', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.tuNgay) {
      this._snackBar.open('Vui lòng chọn ngày bắt đầu', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.denNgay) {
      this._snackBar.open('Vui lòng chọn ngày kết thúc', 'Đóng', { duration: 3000 });
      return false;
    }

    if (moment(data.denNgay).isBefore(moment(data.tuNgay))) {
      this._snackBar.open('Ngày kết thúc phải sau ngày bắt đầu', 'Đóng', { duration: 3000 });
      return false;
    }

    return true;
  }

  goBack() {
    this._router.navigate(['/admin/lichsu-tonkho/chot-kho']);
  }

  // Utility methods
  formatDate(date: string): string {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }

  formatDateOnly(date: string): string {
    if (!date) return '';
    return moment(date).format('DD/MM/YYYY');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  calculateDuration(): string {
    const data = this.detail();
    if (!data.tuNgay || !data.denNgay) return '';
    
    const start = moment(data.tuNgay);
    const end = moment(data.denNgay);
    const days = end.diff(start, 'days') + 1;
    return `${days} ngày`;
  }

  getTrangThaiInfo(trangThai: string) {
    const statusMap: any = {
      'KHOI_TAO': { label: 'Khởi tạo', color: 'primary', icon: 'fiber_new' },
      'DANG_XU_LY': { label: 'Đang xử lý', color: 'accent', icon: 'hourglass_empty' },
      'HOAN_THANH': { label: 'Hoàn thành', color: 'primary', icon: 'check_circle' },
      'HUY': { label: 'Hủy', color: 'warn', icon: 'cancel' }
    };
    return statusMap[trangThai] || { label: trangThai, color: 'basic', icon: 'help' };
  }

  canEdit(): boolean {
    const chotKho = this.chiTietChotKho();
    return this.isCreate() || (chotKho !== null && chotKho.trangThai === 'KHOI_TAO');
  }

  canExecute(): boolean {
    const chotKho = this.chiTietChotKho();
    return chotKho !== null && chotKho.trangThai === 'KHOI_TAO';
  }

  getTotalInventoryValue(): number {
    return this.inventoryData.data.reduce((total, item) => {
      return total + ((item.tonKhoSauChot || 0) * (item.donGia || 0));
    }, 0);
  }

  getTotalProducts(): number {
    return this.inventoryData.data.length;
  }

  getTotalQuantity(): number {
    return this.inventoryData.data.reduce((total, item) => {
      return total + (item.tonKhoSauChot || 0);
    }, 0);
  }
}
