import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DanhmucsService } from '../../listdanhmuc/listdanhmuc.service';
import { LichSuTonKhoService } from '../lichsu-tonkho.service';

@Component({
  selector: 'app-ton-kho-hien-tai',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDividerModule
  ],
  templateUrl: './ton-kho-hien-tai.component.html',
  styleUrl: './ton-kho-hien-tai.component.scss'
})
export class TonKhoHienTaiComponent implements OnInit {
  // Injected services
  private _sanphamService = inject(SanphamService);
  private _danhmucsService = inject(DanhmucsService);
  private _lichSuTonKhoService = inject(LichSuTonKhoService);
  public _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  // ViewChild references
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table configuration
  displayedColumns: string[] = [
    'sanpham',
    'tonKhoHienTai',
    'giaTriTonKho',
    'tonKhoMin',
    'tonKhoMax',
    'trangThaiTonKho',
    'ngayCapNhatCuoi',
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
    trangThaiTonKho: '',
    danhMucId: ''
  });

  // Statistics
  statistics = signal({
    tongSanPham: 0,
    tongGiaTriTonKho: 0,
    sanPhamSapHet: 0,
    sanPhamQuaMuc: 0,
    sanPhamBinhThuong: 0
  });

  // UI states
  isLoading = signal<boolean>(false);
  
  // Filter options
  trangThaiTonKhoOptions = [
    { value: '', label: 'Tất cả trạng thái', color: 'basic' },
    { value: 'BINH_THUONG', label: 'Bình thường', color: 'primary', icon: 'check_circle' },
    { value: 'SAP_HET', label: 'Sắp hết hàng', color: 'warn', icon: 'warning' },
    { value: 'HET_HANG', label: 'Hết hàng', color: 'warn', icon: 'error' },
    { value: 'QUA_MUC', label: 'Quá mức', color: 'accent', icon: 'trending_up' }
  ];

  danhMucOptions: any[] = [];

  constructor() {
    // Auto-load data when filter changes
    // effect(() => {
    //   this.loadTonKhoHienTai();
    // });
  }

  async ngOnInit() {
    await this.loadInitialData();
    await this.loadTonKhoHienTai();
    await this.loadStatistics();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadInitialData() {
    try {
      // Load categories for filter
      await this._danhmucsService.getAllDanhmuc();
      this.danhMucOptions = this._danhmucsService.ListDanhmuc() || [];
    } catch (error: any) {
      console.error('Error loading initial data:', error);
    }
  }

  async loadTonKhoHienTai() {
    try {
      this.isLoading.set(true);
      
      // Load products with current inventory
      await this._sanphamService.getAllSanpham();
      const products = this._sanphamService.ListSanpham() || [];
      
      // Process inventory data
      const inventoryData = products.map((product: any) => ({
        ...product,
        tonKhoHienTai: this.getTonKhoHienTai(product),
        giaTriTonKho: this.getGiaTriTonKho(product),
        trangThaiTonKho: this.getTrangThaiTonKho(product),
        ngayCapNhatCuoi: this.getNgayCapNhatCuoi(product)
      }));

      // Apply filters
      const filteredData = this.applyFilters(inventoryData);
      
      this.dataSource.data = filteredData;
      this.totalItems.set(filteredData.length);
      
    } catch (error: any) {
      console.error('Error loading ton kho hien tai:', error);
      this._snackBar.open('Lỗi tải dữ liệu tồn kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadStatistics() {
    try {
      const data = this.dataSource.data;
      
      const stats = {
        tongSanPham: data.length,
        tongGiaTriTonKho: data.reduce((sum, item) => sum + (item.giaTriTonKho || 0), 0),
        sanPhamSapHet: data.filter(item => item.trangThaiTonKho === 'SAP_HET').length,
        sanPhamQuaMuc: data.filter(item => item.trangThaiTonKho === 'QUA_MUC').length,
        sanPhamBinhThuong: data.filter(item => item.trangThaiTonKho === 'BINH_THUONG').length
      };

      this.statistics.set(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }

  applyFilters(data: any[]): any[] {
    const params = this.filterParams();
    let filtered = [...data];

    // Search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.masp?.toLowerCase().includes(searchTerm) ||
        item.title?.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (params.trangThaiTonKho) {
      filtered = filtered.filter(item => item.trangThaiTonKho === params.trangThaiTonKho);
    }

    // Category filter
    if (params.danhMucId) {
      filtered = filtered.filter(item => item.danhmucId === params.danhMucId);
    }

    return filtered;
  }

  // Inventory calculation methods
  getTonKhoHienTai(product: any): number {
    // This should come from actual inventory tracking
    // For now, return a mock value based on product data
    return product.tonkho || 0;
  }

  getGiaTriTonKho(product: any): number {
    const tonKho = this.getTonKhoHienTai(product);
    const giaNhap = product.gianhap || product.giaban || 0;
    return tonKho * giaNhap;
  }

  getTrangThaiTonKho(product: any): string {
    const tonKho = this.getTonKhoHienTai(product);
    const tonKhoMin = product.tonkhomin || 10;
    const tonKhoMax = product.tonkhomax || 100;

    if (tonKho === 0) return 'HET_HANG';
    if (tonKho <= tonKhoMin) return 'SAP_HET';
    if (tonKho >= tonKhoMax) return 'QUA_MUC';
    return 'BINH_THUONG';
  }

  getNgayCapNhatCuoi(product: any): string {
    return product.updatedAt || product.createdAt;
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
    const search = (event.target as HTMLInputElement)?.value || '';
    this.filterParams.update(current => ({
      ...current,
      search: search.trim(),
      page: 0
    }));
    this.loadTonKhoHienTai();
  }

  onTrangThaiChange(trangThai: string) {
    this.filterParams.update(current => ({
      ...current,
      trangThaiTonKho: trangThai,
      page: 0
    }));
    this.loadTonKhoHienTai();
  }

  onDanhMucChange(danhMucId: string) {
    this.filterParams.update(current => ({
      ...current,
      danhMucId,
      page: 0
    }));
    this.loadTonKhoHienTai();
  }

  resetFilters() {
    this.filterParams.set({
      page: 0,
      limit: 10,
      search: '',
      trangThaiTonKho: '',
      danhMucId: ''
    });
    this.loadTonKhoHienTai();
  }

  // Navigation methods
  viewLichSuTonKho(productId: string) {
    this._router.navigate(['/admin/lichsu-tonkho'], { 
      queryParams: { sanphamId: productId } 
    });
  }

  createGiaoDichTonKho(productId: string) {
    this._router.navigate(['/admin/lichsu-tonkho/0'], { 
      queryParams: { sanphamId: productId } 
    });
  }

  // Utility methods
  getTrangThaiOption(value: string) {
    return this.trangThaiTonKhoOptions.find(opt => opt.value === value);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('vi-VN');
  }

  getProgressValue(current: number, min: number, max: number): number {
    if (max <= min) return 0;
    return Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));
  }

  getProgressColor(trangThai: string): string {
    switch (trangThai) {
      case 'BINH_THUONG': return 'primary';
      case 'SAP_HET': return 'warn';
      case 'HET_HANG': return 'warn';
      case 'QUA_MUC': return 'accent';
      default: return 'basic';
    }
  }

  getDanhMucName(danhMucId: string): string {
    const danhMuc = this.danhMucOptions.find(dm => dm.id === danhMucId);
    return danhMuc?.title || 'N/A';
  }

  async refreshData() {
    await this.loadTonKhoHienTai();
    await this.loadStatistics();
    this._snackBar.open('Dữ liệu đã được cập nhật', 'Đóng', { duration: 2000 });
  }
}
