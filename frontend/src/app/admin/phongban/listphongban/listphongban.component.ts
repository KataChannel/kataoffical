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
import { Router, RouterLink } from '@angular/router';

// Material imports
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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

// Services & Models
import { PhongbanService } from '../phongban.service';
import { 
  Phongban, 
  LoaiPhongban, 
  LoaiPhongbanLabels,
  PhongbanQueryOptions 
} from '../../../models/phongban.model';

@Component({
  selector: 'app-listphongban',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    MatDialogModule
  ],
  templateUrl: './listphongban.component.html',
  styleUrls: ['./listphongban.component.scss']
})
export class ListPhongbanComponent implements OnInit {
  // Inject services
  private phongbanService = inject(PhongbanService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // ViewChild for table features
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table configuration
  displayedColumns: string[] = [
    'stt',
    'ma',
    'ten',
    'loai',
    'level',
    'parent',
    'nhanvienCount',
    'childrenCount',
    'actions'
  ];

  columnLabels: { [key: string]: string } = {
    stt: '#',
    ma: 'Mã',
    ten: 'Tên Phòng Ban',
    loai: 'Loại',
    level: 'Cấp',
    parent: 'Thuộc',
    nhanvienCount: 'Nhân viên',
    childrenCount: 'Bộ phận con',
    actions: 'Hành động'
  };

  // Data source
  dataSource = new MatTableDataSource<Phongban>([]);

  // Reactive signals from service
  loading = this.phongbanService.loading;
  error = this.phongbanService.error;
  phongbans = this.phongbanService.ListPhongban;

  // Filter options
  loaiPhongbanOptions = Object.values(LoaiPhongban);
  loaiPhongbanLabels = LoaiPhongbanLabels;
  
  // Filter states
  searchText = signal<string>('');
  selectedLoai = signal<LoaiPhongban | ''>('');
  selectedLevel = signal<number | ''>('');
  
  // Computed filtered data
  filteredData = computed(() => {
    let data = this.phongbans();
    const search = this.searchText().toLowerCase();
    const loai = this.selectedLoai();
    const level = this.selectedLevel();

    if (search) {
      data = data.filter(pb => 
        pb.ma.toLowerCase().includes(search) ||
        pb.ten.toLowerCase().includes(search)
      );
    }

    if (loai) {
      data = data.filter(pb => pb.loai === loai);
    }

    if (level !== '') {
      data = data.filter(pb => pb.level === level);
    }

    return data;
  });

  // Statistics
  stats = computed(() => {
    const data = this.phongbans();
    return {
      total: data.length,
      byLevel: this.groupByLevel(data),
      totalNhanvien: data.reduce((sum, pb) => sum + (pb._count?.nhanviens || 0), 0)
    };
  });

  async ngOnInit() {
    await this.loadPhongbans();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Load phòng ban list
   */
  async loadPhongbans() {
    try {
      await this.phongbanService.getAllPhongban({ includeChildren: false });
      this.updateDataSource();
    } catch (error) {
      console.error('Error loading phongbans:', error);
    }
  }

  /**
   * Update table data source
   */
  updateDataSource() {
    this.dataSource.data = this.filteredData();
  }

  /**
   * Search handler
   */
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.updateDataSource();
  }

  /**
   * Filter by loại
   */
  onLoaiChange() {
    this.updateDataSource();
  }

  /**
   * Filter by level
   */
  onLevelChange() {
    this.updateDataSource();
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.searchText.set('');
    this.selectedLoai.set('');
    this.selectedLevel.set('');
    this.updateDataSource();
  }

  /**
   * Navigate to create form
   */
  onCreate() {
    this.router.navigate(['/admin/phongban/create']);
  }

  /**
   * Navigate to detail view
   */
  onView(phongban: Phongban) {
    this.router.navigate(['/admin/phongban/detail', phongban.id]);
  }

  /**
   * Navigate to edit form
   */
  onEdit(phongban: Phongban) {
    this.router.navigate(['/admin/phongban/edit', phongban.id]);
  }

  /**
   * Delete phòng ban
   */
  async onDelete(phongban: Phongban) {
    const hasChildren = (phongban._count?.children || 0) > 0;
    const hasNhanvien = (phongban._count?.nhanviens || 0) > 0;

    let message = `Xác nhận xóa phòng ban "${phongban.ten}"?`;
    
    if (hasChildren) {
      this.snackBar.open(
        'Không thể xóa phòng ban có bộ phận con. Vui lòng xóa các bộ phận con trước.',
        'Đóng',
        { duration: 5000 }
      );
      return;
    }

    if (hasNhanvien) {
      this.snackBar.open(
        `Không thể xóa phòng ban có ${phongban._count?.nhanviens} nhân viên. Vui lòng chuyển nhân viên trước.`,
        'Đóng',
        { duration: 5000 }
      );
      return;
    }

    if (confirm(message)) {
      try {
        await this.phongbanService.deletePhongban(phongban.id);
        this.updateDataSource();
      } catch (error) {
        console.error('Error deleting phongban:', error);
      }
    }
  }

  /**
   * Navigate to tree view
   */
  onViewTree() {
    this.router.navigate(['/admin/phongban/tree']);
  }

  /**
   * Refresh data
   */
  async onRefresh() {
    await this.loadPhongbans();
  }

  /**
   * Export to Excel
   */
  onExport() {
    // TODO: Implement Excel export
    this.snackBar.open('Tính năng xuất Excel đang được phát triển', 'Đóng', { duration: 3000 });
  }

  /**
   * Get level badge color
   */
  getLevelColor(level: number): string {
    const colors = ['primary', 'accent', 'warn'];
    return colors[Math.min(level - 1, colors.length - 1)];
  }

  /**
   * Get loại badge color
   */
  getLoaiColor(loai: LoaiPhongban): string {
    const colorMap: { [key in LoaiPhongban]: string } = {
      [LoaiPhongban.PHONGBAN]: 'primary',
      [LoaiPhongban.BOPHAN]: 'accent',
      [LoaiPhongban.PHONG]: 'primary',
      [LoaiPhongban.BAN]: 'primary',
      [LoaiPhongban.TO]: 'accent',
      [LoaiPhongban.NHOM]: 'accent',
      [LoaiPhongban.KHAC]: 'warn'
    };
    return colorMap[loai] || 'primary';
  }

  /**
   * Group phongbans by level for statistics
   */
  private groupByLevel(data: Phongban[]): { [level: number]: number } {
    return data.reduce((acc, pb) => {
      acc[pb.level] = (acc[pb.level] || 0) + 1;
      return acc;
    }, {} as { [level: number]: number });
  }

  /**
   * Track by function for ngFor optimization
   */
  trackById(index: number, item: Phongban): string {
    return item.id;
  }
}
