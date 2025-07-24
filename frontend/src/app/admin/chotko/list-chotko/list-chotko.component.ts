import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChotKhoService, ChotKho } from '../chotko.service';
import { DetailChotKhoComponent } from '../detail-chotko/detail-chotko.component';
import { ChiTietChotKhoComponent } from '../chitiet-chotko/chitiet-chotko.component';

@Component({
  selector: 'app-list-chotko',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
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
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DetailChotKhoComponent,
    ChiTietChotKhoComponent
  ],
  templateUrl: './list-chotko.component.html',
  styleUrl: './list-chotko.component.scss'
})
export class ListChotKhoComponent implements OnInit {
  private _chotKhoService = inject(ChotKhoService);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  // Table configuration
  displayedColumns: string[] = [
    'maChotKho',
    'tenChotKho',
    'khoangThoiGian',
    'trangThai',
    'nguoiThucHien',
    'thongKe',
    'ngayChot',
    'actions'
  ];

  // Pagination
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  totalElements = signal<number>(0);

  // Filters
  filters = signal({
    trangThai: '',
    tuNgay: '',
    denNgay: '',
    search: ''
  });

  // UI states
  isLoading = signal<boolean>(false);
  selectedChotKho = signal<ChotKho | null>(null);

  // Filter options
  trangThaiOptions = [
    { value: '', label: 'Tất cả trạng thái', icon: 'list', color: '' },
    { value: 'DANG_MO', label: 'Đang mở', icon: 'lock_open', color: 'primary' },
    { value: 'DA_CHOT', label: 'Đã chốt', icon: 'lock', color: 'accent' }
  ];

  // Drawer for detail view
  drawer = signal({ 
    open: () => this.drawerOpened.set(true),
    close: () => this.drawerOpened.set(false)
  });
  drawerOpened = signal<boolean>(false);
  drawerMode = signal<'create' | 'detail' | 'view'>('create');

  constructor() {}

  async ngOnInit() {
    await this.loadChotKho();
  }

  // Service getters (computed signals)
  get ListChotKho() { return this._chotKhoService.ListChotKho; }
  get ThongKeChotKho() { return this._chotKhoService.ThongKeChotKho; }
  get serviceLoading() { return this._chotKhoService.isLoading; }
  get serviceError() { return this._chotKhoService.error; }

  async loadChotKho() {
    try {
      this.isLoading.set(true);
      const params = {
        page: this.pageIndex() + 1,
        limit: this.pageSize(),
        ...this.filters()
      };

      const response = await this._chotKhoService.getDanhSachChotKho(params);
      this.totalElements.set(response.meta?.total || 0);
    } catch (error: any) {
      console.error('Error loading chot kho:', error);
      this._snackBar.open(error.message || 'Lỗi tải danh sách chốt kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  // Event handlers
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadChotKho();
  }

  onFilterChange() {
    this.pageIndex.set(0);
    this.loadChotKho();
  }

  clearFilters() {
    this.filters.set({
      trangThai: '',
      tuNgay: '',
      denNgay: '',
      search: ''
    });
    this.onFilterChange();
  }

  // Actions
  createChotKho() {
    this.selectedChotKho.set(null);
    this.drawerMode.set('create');
    this.drawer().open();
  }

  viewChotKho(chotKho: ChotKho) {
    this.selectedChotKho.set(chotKho);
    this.drawerMode.set('view');
    this.drawer().open();
  }

  async viewChiTietChotKho(chotKho: ChotKho) {
    try {
      // Load detail data
      await this._chotKhoService.getChiTietChotKho(chotKho.id);
      
      // Open dialog to show details
      const dialogRef = this._dialog.open(ChiTietChotKhoComponent, {
        width: '95%',
        maxWidth: '1400px',
        height: '90%',
        data: { chotKho, isReadonly: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'refresh') {
          this.loadChotKho();
        }
      });
    } catch (error: any) {
      this._snackBar.open(error.message || 'Lỗi tải chi tiết chốt kho', 'Đóng', { duration: 3000 });
    }
  }

  async thucHienChotKho(chotKho: ChotKho) {
    if (chotKho.trangThai === 'DA_CHOT') {
      this._snackBar.open('Chốt kho này đã được thực hiện', 'Đóng', { duration: 3000 });
      return;
    }

    try {
      // Confirm action
      const confirmed = await this.showConfirmDialog(
        'Xác nhận chốt kho',
        `Bạn có chắc chắn muốn thực hiện chốt kho "${chotKho.tenChotKho}"? Hành động này không thể hoàn tác.`
      );

      if (!confirmed) return;

      await this._chotKhoService.thucHienChotKho(chotKho.id);
      this._snackBar.open('Thực hiện chốt kho thành công', 'Đóng', { duration: 3000 });
      await this.loadChotKho();
    } catch (error: any) {
      this._snackBar.open(error.message || 'Lỗi thực hiện chốt kho', 'Đóng', { duration: 3000 });
    }
  }

  async xoaChotKho(chotKho: ChotKho) {
    if (chotKho.trangThai === 'DA_CHOT') {
      this._snackBar.open('Không thể xóa chốt kho đã được thực hiện', 'Đóng', { duration: 3000 });
      return;
    }

    try {
      // Confirm action
      const confirmed = await this.showConfirmDialog(
        'Xác nhận xóa',
        `Bạn có chắc chắn muốn xóa chốt kho "${chotKho.tenChotKho}"? Hành động này không thể hoàn tác.`
      );

      if (!confirmed) return;

      await this._chotKhoService.xoaChotKho(chotKho.id);
      this._snackBar.open('Xóa chốt kho thành công', 'Đóng', { duration: 3000 });
      await this.loadChotKho();
    } catch (error: any) {
      this._snackBar.open(error.message || 'Lỗi xóa chốt kho', 'Đóng', { duration: 3000 });
    }
  }

  async exportChotKho(chotKho: ChotKho) {
    if (chotKho.trangThai !== 'DA_CHOT') {
      this._snackBar.open('Chỉ có thể xuất báo cáo cho chốt kho đã thực hiện', 'Đóng', { duration: 3000 });
      return;
    }

    try {
      await this._chotKhoService.exportChotKhoToExcel(chotKho.id);
      this._snackBar.open('Xuất báo cáo thành công', 'Đóng', { duration: 3000 });
    } catch (error: any) {
      this._snackBar.open(error.message || 'Lỗi xuất báo cáo', 'Đóng', { duration: 3000 });
    }
  }

  // Helper methods
  private async showConfirmDialog(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const confirmed = confirm(`${title}\n\n${message}`);
      resolve(confirmed);
    });
  }

  // Utility methods
  getTrangThaiOption(value: string) {
    return this.trangThaiOptions.find(opt => opt.value === value);
  }

  formatCurrency(value: number): string {
    return this._chotKhoService.formatCurrency(value);
  }

  formatDate(date: Date | string): string {
    return this._chotKhoService.formatDate(date);
  }

  formatDateRange(tuNgay: Date | string, denNgay: Date | string): string {
    const tu = new Date(tuNgay).toLocaleDateString('vi-VN');
    const den = new Date(denNgay).toLocaleDateString('vi-VN');
    return `${tu} - ${den}`;
  }

  getUserName(user: any): string {
    if (!user) return 'Chưa có';
    return user.profile?.name || user.email || 'Người dùng';
  }

  getThongKeText(chotKho: ChotKho): string {
    const sanPham = chotKho.tongSanPham || 0;
    const giaTri = this.formatCurrency(Number(chotKho.tongGiaTri || 0));
    return `${sanPham} SP - ${giaTri}`;
  }

  canEdit(chotKho: ChotKho): boolean {
    return chotKho.trangThai === 'DANG_MO';
  }

  canDelete(chotKho: ChotKho): boolean {
    return chotKho.trangThai === 'DANG_MO';
  }

  canExecute(chotKho: ChotKho): boolean {
    return chotKho.trangThai === 'DANG_MO';
  }

  canExport(chotKho: ChotKho): boolean {
    return chotKho.trangThai === 'DA_CHOT';
  }

  // Drawer event handlers
  onDrawerClosed() {
    this.drawerOpened.set(false);
    this.selectedChotKho.set(null);
  }

  onChotKhoSaved() {
    this.drawer().close();
    this.loadChotKho();
  }
}
