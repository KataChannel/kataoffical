import { Component, inject, signal, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { LichSuTonKhoService } from '../lichsu-tonkho.service';
import moment from 'moment';

@Component({
  selector: 'app-list-chot-kho',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './list-chot-kho.component.html',
  styleUrl: './list-chot-kho.component.scss'
})
export class ListChotKhoComponent {
  // Injected services
  private _lichSuTonKhoService = inject(LichSuTonKhoService);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  // ViewChild references
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table configuration
  displayedColumns: string[] = [
    'maChotKho',
    'tenChotKho', 
    'tuNgay',
    'denNgay',
    'trangThai',
    'tongSanPham',
    'tongGiaTri',
    'nguoiTao',
    'ngayTao',
    'actions'
  ];

  // Data sources
  dataSource = new MatTableDataSource<any>([]);
  totalItems = signal<number>(0);
  
  // Filter states
  filterParams = signal({
    page: 0,
    limit: 10,
    search: '',
    trangThai: '',
    tuNgay: '',
    denNgay: ''
  });

  // UI states
  isLoading = signal<boolean>(false);
  
  // Filter options
  trangThaiOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'KHOI_TAO', label: 'Khởi tạo', color: 'primary', icon: 'fiber_new' },
    { value: 'DANG_XU_LY', label: 'Đang xử lý', color: 'accent', icon: 'hourglass_empty' },
    { value: 'HOAN_THANH', label: 'Hoàn thành', color: 'primary', icon: 'check_circle' },
    { value: 'HUY', label: 'Hủy', color: 'warn', icon: 'cancel' }
  ];

  constructor() {
    // Auto-load data when filter changes
    effect(() => {
      this.loadDanhSachChotKho();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadDanhSachChotKho() {
    try {
      this.isLoading.set(true);
      const params = this.filterParams();
      
      const response = await this._lichSuTonKhoService.getDanhSachChotKho(params);
      
      this.dataSource.data = response.data || [];
      this.totalItems.set(response.total || 0);
      
    } catch (error: any) {
      console.error('Error loading danh sach chot kho:', error);
      this._snackBar.open('Lỗi tải danh sách chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  // Filter methods
  onPageChange(event: any) {
    this.filterParams.update(current => ({
      ...current,
      page: event.pageIndex,
      limit: event.pageSize
    }));
  }

  onSearchChange(event: any) {
    const search = (event.target as HTMLInputElement)?.value || ''
    this.filterParams.update(current => ({
      ...current,
      search: search.trim(),
      page: 0
    }));
  }

  onTrangThaiChange(trangThai: string) {
    this.filterParams.update(current => ({
      ...current,
      trangThai,
      page: 0
    }));
  }

  onDateRangeChange(tuNgay?: string, denNgay?: string) {
    this.filterParams.update(current => ({
      ...current,
      tuNgay: tuNgay || '',
      denNgay: denNgay || '',
      page: 0
    }));
  }

  resetFilters() {
    this.filterParams.set({
      page: 0,
      limit: 10,
      search: '',
      trangThai: '',
      tuNgay: '',
      denNgay: ''
    });
  }

  // Navigation methods
  createChotKho() {
    this._router.navigate(['/admin/lichsu-tonkho/chot-kho/0']);
  }

  viewChotKho(id: string) {
    this._router.navigate(['/admin/lichsu-tonkho/chot-kho', id]);
  }

  editChotKho(id: string) {
    this._router.navigate(['/admin/lichsu-tonkho/chot-kho', id, 'edit']);
  }

  // Action methods
  async thucHienChotKho(chotKho: any) {
    if (chotKho.trangThai !== 'KHOI_TAO') {
      this._snackBar.open('Chỉ có thể thực hiện chốt kho đang ở trạng thái khởi tạo', 'Đóng', { duration: 3000 });
      return;
    }

    const confirm = window.confirm(`Bạn có chắc chắn muốn thực hiện chốt kho "${chotKho.tenChotKho}"?`);
    if (!confirm) return;

    try {
      this.isLoading.set(true);
      await this._lichSuTonKhoService.thucHienChotKho(chotKho.id);
      this._snackBar.open('Thực hiện chốt kho thành công', 'Đóng', { duration: 3000 });
      await this.loadDanhSachChotKho();
    } catch (error: any) {
      console.error('Error executing chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi thực hiện chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteChotKho(chotKho: any) {
    if (chotKho.trangThai === 'HOAN_THANH') {
      this._snackBar.open('Không thể xóa chốt kho đã hoàn thành', 'Đóng', { duration: 3000 });
      return;
    }

    const confirm = window.confirm(`Bạn có chắc chắn muốn xóa chốt kho "${chotKho.tenChotKho}"?`);
    if (!confirm) return;

    try {
      this.isLoading.set(true);
      await this._lichSuTonKhoService.xoaChotKho(chotKho.id);
      this._snackBar.open('Xóa chốt kho thành công', 'Đóng', { duration: 3000 });
      await this.loadDanhSachChotKho();
    } catch (error: any) {
      console.error('Error deleting chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi xóa chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  // Utility methods
  getTrangThaiOption(value: string) {
    return this.trangThaiOptions.find(opt => opt.value === value);
  }

  formatDate(date: string): string {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }

  formatDateOnly(date: string): string {
    return moment(date).format('DD/MM/YYYY');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  calculateDuration(tuNgay: string, denNgay: string): string {
    const start = moment(tuNgay);
    const end = moment(denNgay);
    const days = end.diff(start, 'days') + 1;
    return `${days} ngày`;
  }

  getTrangThaiColor(trangThai: string): string {
    const option = this.getTrangThaiOption(trangThai);
    return option?.color || 'basic';
  }

  canEdit(chotKho: any): boolean {
    return chotKho.trangThai === 'KHOI_TAO';
  }

  canExecute(chotKho: any): boolean {
    return chotKho.trangThai === 'KHOI_TAO';
  }

  canDelete(chotKho: any): boolean {
    return chotKho.trangThai !== 'HOAN_THANH';
  }
}
