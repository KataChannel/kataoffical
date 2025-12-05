import { 
  Component, 
  OnInit, 
  ViewChild, 
  inject, 
  signal, 
  computed 
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule,
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
export class ListNhanvienComponent implements OnInit {
  private nhanvienService = inject(NhanvienService);
  private phongbanService = inject(PhongbanService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Data source
  dataSource = new MatTableDataSource<Nhanvien>([]);
  displayedColumns: string[] = [
    'maNV',
    'hoTen',
    'gioiTinh',
    'soDienThoai',
    'email',
    'phongban',
    'chucVu',
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
      
      if (this.paginator) {
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
        this.snackBar.open(`Đã xóa nhân viên "${nhanvien.hoTen}" thành công`, 'Đóng', { duration: 3000 });
        this.loadData();
        this.loadStatistics();
      } catch (error) {
        console.error('Error deleting nhanvien:', error);
        this.snackBar.open('Có lỗi xảy ra khi xóa nhân viên', 'Đóng', { duration: 3000 });
      }
    }
  }

  createNew() {
    this.router.navigate(['/admin/nhanvien/create']);
  }

  exportExcel() {
    this.snackBar.open('Chức năng xuất Excel đang phát triển', 'Đóng', { duration: 3000 });
  }

  importExcel() {
    this.snackBar.open('Chức năng nhập Excel đang phát triển', 'Đóng', { duration: 3000 });
  }
}
