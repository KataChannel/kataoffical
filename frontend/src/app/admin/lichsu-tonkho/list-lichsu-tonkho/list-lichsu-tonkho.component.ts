import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  computed, 
  effect, 
  inject, 
  signal, 
  ViewChild 
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { LichSuTonKhoService } from '../lichsu-tonkho.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { UserService } from '../../user/user.service';
import moment from 'moment';

@Component({
  selector: 'app-list-lichsu-tonkho',
  templateUrl: './list-lichsu-tonkho.component.html',
  styleUrls: ['./list-lichsu-tonkho.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListLichSuTonKhoComponent implements AfterViewInit {
  // Services
  private _lichSuTonKhoService = inject(LichSuTonKhoService);
  private _sanphamService = inject(SanphamService);
  private _userService = inject(UserService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  // ViewChild
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  // Table configuration
  displayedColumns: string[] = [
    'stt',
    'sanpham',
    'loaiGiaoDich',
    'soLuongTruoc',
    'soLuongThayDoi', 
    'soLuongSau',
    'donGia',
    'thanhTien',
    'nguoiThucHien',
    'ngayGiaoDich',
    'lyDo',
    'actions'
  ];

  columnNames: any = {
    stt: 'STT',
    sanpham: 'Sản phẩm',
    loaiGiaoDich: 'Loại giao dịch',
    soLuongTruoc: 'SL trước',
    soLuongThayDoi: 'SL thay đổi',
    soLuongSau: 'SL sau',
    donGia: 'Đơn giá',
    thanhTien: 'Thành tiền',
    nguoiThucHien: 'Người thực hiện',
    ngayGiaoDich: 'Ngày giao dịch',
    lyDo: 'Lý do',
    actions: 'Thao tác'
  };

  // Data
  dataSource = new MatTableDataSource<any>([]);
  countItem = computed(() => this.dataSource.data.length);

  // Filter options
  filterSanpham: any[] = [];
  filterUsers: any[] = [];
  
  loaiGiaoDichOptions = [
    { value: 'NHAP', label: 'Nhập kho' },
    { value: 'XUAT', label: 'Xuất kho' },
    { value: 'KIEM_KE', label: 'Kiểm kê' },
    { value: 'DIEU_CHINH', label: 'Điều chỉnh' },
    { value: 'CHUYEN_KHO', label: 'Chuyển kho' },
    { value: 'HUY_HANG', label: 'Hủy hàng' }
  ];

  // Filter values
  filterValues = signal({
    page: 1,
    limit: 10,
    sanphamId: '',
    loaiGiaoDich: '',
    tuNgay: '',
    denNgay: '',
    userId: ''
  });

  // Loading state
  isLoading = this._lichSuTonKhoService.isLoading;
  
  // Statistics
  thongKeGiaoDich = this._lichSuTonKhoService.ThongKeGiaoDich;

  constructor() {
    // Effect to reload data when filters change
    effect(() => {
      const filters = this.filterValues();
      this.loadLichSuTonKho();
    }, { allowSignalWrites: true });
  }

  async ngOnInit() {
    await this.loadInitialData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Load initial data
  async loadInitialData() {
    try {
      // Load products for filter
      await this._sanphamService.getAllSanpham();
      this.filterSanpham = this._sanphamService.ListSanpham().filter((sp: any) => sp.isActive);

      // Load users for filter
      await this._userService.getAllUser();
      this.filterUsers = this._userService.ListUser().filter((user: any) => user.isActive);

      // Load inventory history
      await this.loadLichSuTonKho();
      
      // Load statistics
      await this.loadThongKe();
    } catch (error) {
      console.error('Error loading initial data:', error);
      this._snackBar.open('Lỗi tải dữ liệu ban đầu', 'Đóng', { duration: 3000 });
    }
  }

  // Load inventory history
  async loadLichSuTonKho() {
    try {
      const filters = this.filterValues();
      const response = await this._lichSuTonKhoService.getLichSuTonKho(filters);
      
      if (response?.data) {
        this.dataSource.data = response.data;
        if (this.paginator) {
          this.paginator.length = response.meta?.total || 0;
          this.paginator.pageIndex = (response.meta?.page || 1) - 1;
          this.paginator.pageSize = response.meta?.limit || 10;
        }
      }
    } catch (error) {
      console.error('Error loading lich su ton kho:', error);
      this._snackBar.open('Lỗi tải lịch sử tồn kho', 'Đóng', { duration: 3000 });
    }
  }

  // Load statistics
  async loadThongKe() {
    try {
      const filters = this.filterValues();
      await this._lichSuTonKhoService.getThongKeGiaoDich({
        tuNgay: filters.tuNgay,
        denNgay: filters.denNgay,
        sanphamId: filters.sanphamId
      });
    } catch (error) {
      console.error('Error loading thong ke:', error);
    }
  }

  // Filter methods
  onFilterChange(field: string, value: any) {
    this.filterValues.update(current => ({
      ...current,
      [field]: value,
      page: 1 // Reset to first page when filter changes
    }));
  }

  onPageChange(event: any) {
    this.filterValues.update(current => ({
      ...current,
      page: event.pageIndex + 1,
      limit: event.pageSize
    }));
  }

  clearFilters() {
    this.filterValues.set({
      page: 1,
      limit: 10,
      sanphamId: '',
      loaiGiaoDich: '',
      tuNgay: '',
      denNgay: '',
      userId: ''
    });
  }

  // Utility methods
  getLoaiGiaoDichLabel(value: string): string {
    const option = this.loaiGiaoDichOptions.find(opt => opt.value === value);
    return option?.label || value;
  }

  getLoaiGiaoDichColor(value: string): string {
    const colorMap: any = {
      'NHAP': 'primary',
      'XUAT': 'warn', 
      'KIEM_KE': 'accent',
      'DIEU_CHINH': 'primary',
      'CHUYEN_KHO': 'accent',
      'HUY_HANG': 'warn'
    };
    return colorMap[value] || '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  formatDateTime(dateString: string): string {
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  }

  // Navigation
  goToDetail(item: any) {
    this._router.navigate(['/admin/lichsu-tonkho', item.id]);
  }

  openCreateDialog() {
    this.drawer.open();
    this._router.navigate(['/admin/lichsu-tonkho', '0']);
  }

  // Export functionality
  exportToExcel() {
    // Implementation for Excel export
    this._snackBar.open('Chức năng xuất Excel đang được phát triển', 'Đóng', { duration: 3000 });
  }
}
