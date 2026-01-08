import { 
  Component, 
  OnInit, 
  AfterViewInit,
  ViewChild, 
  inject, 
  signal, 
  computed 
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Material imports
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

// Services & Models
import { NhanvienService } from '../nhanvien.service';
import { PhongbanService } from '../../phongban/phongban.service';
import { ImportDataService } from '../../../shared/services/import-data.service';
import { 
  Nhanvien, 
  TrangThaiNhanvien, 
  TrangThaiNhanvienLabels,
  GioiTinh,
  GioiTinhLabels
} from '../../../models/nhanvien.model';
import { Phongban } from '../../../models/phongban.model';
import { ConfirmDialogComponent } from '../../user/listuser/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-listnhanvien',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule
],
  templateUrl: './listnhanvien.component.html',
  styleUrls: ['./listnhanvien.component.scss']
})
export class ListNhanvienComponent implements OnInit, AfterViewInit {
  private nhanvienService = inject(NhanvienService);
  private phongbanService = inject(PhongbanService);
  private importDataService = inject(ImportDataService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Data source
  dataSource = new MatTableDataSource<Nhanvien>([]);
  displayedColumns: string[] = [
    'maNV',
    'maLamViec',
    'hoTen',
    'gioiTinh',
    'soDienThoai',
    'email',
    'phongban',
    'chucVu',
    'viTri',
    'trangThai',
    'actions'
  ];

  // Signals
  loading = signal<boolean>(false);
  total = signal<number>(0);
  page = signal<number>(1);
  limit = signal<number>(50);
  searchTerm = signal<string>('');
  selectedPhongban = signal<string | null>(null);
  selectedTrangThai = signal<TrangThaiNhanvien | null>(null);
  
  // Statistics
  statistics = computed(() => {
    const stats = this.nhanvienService.Statistics();
    if (!stats) return null;
    
    // Calculate counts by status
    const byStatus = stats.byTrangThai || [];
    const dangLamViec = byStatus.find(s => s.trangThai === TrangThaiNhanvien.DANGLAMVIEC)?._count || 0;
    const thuViec = byStatus.find(s => s.trangThai === TrangThaiNhanvien.THUVIEC)?._count || 0;
    const daNghiViec = byStatus.find(s => s.trangThai === TrangThaiNhanvien.DANGHIVIEC)?._count || 0;
    
    return {
      ...stats,
      dangLamViec,
      thuViec,
      daNghiViec
    };
  });
  
  // Data
  phongbans = signal<Phongban[]>([]);
  
  // Enums for template
  trangThaiOptions = Object.entries(TrangThaiNhanvienLabels).map(([value, label]) => ({
    value,
    label
  }));

  ngOnInit() {
    this.loadData();
    this.loadPhongbans();
    this.loadStatistics();
  }

  ngAfterViewInit() {
    // Setup sorting data accessor
    this.dataSource.sortingDataAccessor = (item: Nhanvien, property: string) => {
      switch (property) {
        case 'phongban':
          return item.phongban?.ten?.toLowerCase() || '';
        case 'hoTen':
          return item.hoTen?.toLowerCase() || '';
        case 'maNV':
          return item.maNV?.toLowerCase() || '';
        case 'maLamViec':
          return item.maLamViec?.toLowerCase() || '';
        case 'chucVu':
          return item.chucVu?.toLowerCase() || '';
        case 'viTri':
          return item.viTri?.toLowerCase() || '';
        case 'email':
          return item.email?.toLowerCase() || '';
        case 'soDienThoai':
          return item.soDienThoai || '';
        case 'trangThai':
          return item.trangThai || '';
        case 'gioiTinh':
          return item.gioiTinh || '';
        default:
          return (item as any)[property] || '';
      }
    };

    // Setup filter predicate
    this.dataSource.filterPredicate = (data: Nhanvien, filter: string) => {
      const searchStr = filter.toLowerCase();
      return (
        (data.maNV?.toLowerCase().includes(searchStr) || false) ||
        (data.hoTen?.toLowerCase().includes(searchStr) || false) ||
        (data.email?.toLowerCase().includes(searchStr) || false) ||
        (data.soDienThoai?.includes(searchStr) || false) ||
        (data.chucVu?.toLowerCase().includes(searchStr) || false) ||
        (data.viTri?.toLowerCase().includes(searchStr) || false) ||
        (data.phongban?.ten?.toLowerCase().includes(searchStr) || false)
      );
    };

    // Connect sort and paginator to dataSource
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async loadData() {
    try {
      this.loading.set(true);
      const response = await this.nhanvienService.getAllNhanvien({
        page: this.page(),
        limit: this.limit(),
        search: this.searchTerm() || undefined,
        phongbanId: this.selectedPhongban() || undefined,
        trangThai: this.selectedTrangThai() || undefined
      });

      this.dataSource.data = response.data;
      this.total.set(response.total);
      
      // Re-assign sort and paginator after data changes
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.paginator.length = response.total;
      }
    } catch (error) {
      console.error('Error loading nhanvien:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async loadPhongbans() {
    try {
      const phongbans = await this.phongbanService.getAllPhongban({
        includeChildren: false
      });
      this.phongbans.set(phongbans);
    } catch (error) {
      console.error('Error loading phongbans:', error);
    }
  }

  async loadStatistics() {
    try {
      await this.nhanvienService.getStatistics();
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.page.set(1);
    this.loadData();
  }

  onPhongbanFilter(phongbanId: string | null) {
    this.selectedPhongban.set(phongbanId);
    this.page.set(1);
    this.loadData();
  }

  onTrangThaiFilter(trangThai: TrangThaiNhanvien | null) {
    this.selectedTrangThai.set(trangThai);
    this.page.set(1);
    this.loadData();
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedPhongban.set(null);
    this.selectedTrangThai.set(null);
    this.page.set(1);
    this.loadData();
  }

  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex + 1);
    this.limit.set(event.pageSize);
    this.loadData();
  }

  getTrangThaiLabel(trangThai: TrangThaiNhanvien): string {
    return TrangThaiNhanvienLabels[trangThai] || trangThai;
  }

  getTrangThaiColor(trangThai: TrangThaiNhanvien): string {
    const colors: Record<TrangThaiNhanvien, string> = {
      [TrangThaiNhanvien.DANGLAMVIEC]: '#4CAF50',
      [TrangThaiNhanvien.NGHIPHEP]: '#2196F3',
      [TrangThaiNhanvien.THUVIEC]: '#FFC107',
      [TrangThaiNhanvien.DANGHIVIEC]: '#9E9E9E',
      [TrangThaiNhanvien.TAMNGHI]: '#FF9800',
      [TrangThaiNhanvien.KHAC]: '#9C27B0'
    };
    return colors[trangThai] || '#757575';
  }

  getGioiTinhLabel(gioiTinh?: GioiTinh | null): string {
    if (!gioiTinh) return 'N/A';
    return GioiTinhLabels[gioiTinh] || gioiTinh;
  }

  viewDetail(id: string) {
    this.router.navigate(['/admin/nhanvien/detail', id]);
  }

  editNhanvien(id: string) {
    this.router.navigate(['/admin/nhanvien/edit', id]);
  }

  async deleteNhanvien(nhanvien: Nhanvien) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Xác nhận xóa nhân viên',
        message: `Bạn có chắc chắn muốn xóa nhân viên "${nhanvien.hoTen}" (${nhanvien.maNV})?\n\nHành động này không thể hoàn tác!`
      }
    });

    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    
    if (confirmed) {
      try {
        await this.nhanvienService.deleteNhanvien(nhanvien.id);
        this.snackBar.open(`Đã xóa nhân viên "${nhanvien.hoTen}" thành công`, 'Đóng', { duration: 3000, panelClass: 'snackbar-success' });
        this.loadData();
        this.loadStatistics();
      } catch (error) {
        console.error('Error deleting nhanvien:', error);
        this.snackBar.open('Có lỗi xảy ra khi xóa nhân viên', 'Đóng', {  duration: 3000, panelClass: 'snackbar-error' });
      }
    }
  }

  createNew() {
    this.router.navigate(['/admin/nhanvien/create']);
  }

  async exportExcel() {
    await this.nhanvienService.exportToExcel();
  }

  exportTemplate() {
    this.nhanvienService.exportImportTemplate();
  }

  async importExcel() {
    const result = await this.importDataService.openImportDialog({
      entityType: 'nhanvien',
      maxRows: 500,
      allowedFileTypes: ['.xlsx', '.xls'],
      requiredFields: ['Mã NV', 'Họ và Tên']
    });

    if (result && result.validData && result.validData.length > 0) {
      try {
        this.loading.set(true);
        const importResult = await this.nhanvienService.importFromExcel(result.validData);
        
        let message = `Import thành công: ${importResult.success} nhân viên`;
        if (importResult.failed > 0) {
          message += `, thất bại: ${importResult.failed}`;
        }
        
        this.snackBar.open(message, 'Đóng', { 
          duration: 5000,
          panelClass: importResult.failed > 0 ? 'snackbar-warning' : 'snackbar-success'
        });

        if (importResult.errors.length > 0) {
          console.error('Import errors:', importResult.errors);
        }

        // Refresh data
        this.loadData();
        this.loadStatistics();
      } catch (error) {
        console.error('Error importing:', error);
        this.snackBar.open('Lỗi khi import dữ liệu', 'Đóng', { duration: 3000, panelClass: 'snackbar-error' });
      } finally {
        this.loading.set(false);
      }
    }
  }
}
