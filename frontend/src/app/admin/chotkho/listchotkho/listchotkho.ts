import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChotkhoService } from '../chotkho.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-listchotkho',
  standalone: true,
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
    MatDialogModule,
    MatChipsModule,
    SearchfilterComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './listchotkho.html',
  styleUrl: './listchotkho.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChotkhoComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    codeId: 'Mã chốt kho',
    title: 'Tiêu đề',
    khoId: 'Kho',
    ngaychot: 'Ngày chốt',
    ghichu: 'Ghi chú',
    isActive: 'Trạng thái',
    createdAt: 'Ngày tạo',
    order: 'Thứ tự',
    details: 'Số SP'
  };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('ChotkhoColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _ChotkhoService: ChotkhoService = inject(ChotkhoService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listchotkho = this._ChotkhoService.ListChotkho;
  page = this._ChotkhoService.page;
  totalPages = this._ChotkhoService.totalPages;
  total = this._ChotkhoService.total;
  pageSize = this._ChotkhoService.pageSize;
  chotkhoId = this._ChotkhoService.chotkhoId;
  isLoading = this._ChotkhoService.isLoading;
  isRefreshing = this._ChotkhoService.isRefreshing;
  lastUpdated = this._ChotkhoService.lastUpdated;
  
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  searchParam:any={};
  
  // Performance tracking
  performanceMetrics = signal({
    loadTime: 0,
    renderTime: 0,
    totalItems: 0,
    lastRefresh: null as Date | null
  });

  // Dialog-related properties
  selectedFile: File | null = null;
  selectedBackupFile: File | null = null;
  exportType = 'all';
  backupType = 'full';
  backupName = '';
  isRestoreMode = false;
  importProgress = 0;
  exportProgress = 0;
  backupProgress = 0;
  healthCheck: any = null;

  constructor() {
    effect(() => {
      const startTime = performance.now();
      this.dataSource.data = this.Listchotkho();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
      const endTime = performance.now();
      this.performanceMetrics.update(metrics => ({
        ...metrics,
        renderTime: endTime - startTime,
        totalItems: this.Listchotkho().length,
        lastRefresh: new Date()
      }));
    });
  }

  async ngOnInit(): Promise<void> {
    const startTime = performance.now();
    await this._ChotkhoService.getAllChotkho(this.searchParam);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listchotkho());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
    
    const endTime = performance.now();
    this.performanceMetrics.update(metrics => ({
      ...metrics,
      loadTime: endTime - startTime
    }));
  }

  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('ChotkhoColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }
  @Debounce(500)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUpdatedCodeIds() {
    await this._ChotkhoService.getUpdatedCodeIds();
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
        } else {
          this.drawer.mode = 'over';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
    }
  }
  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  ListFilter: any[] = [];
  onOutFilter(event: any) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('ChotkhoColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/chotkho', 'new']);
  }
  CheckSelect(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id)? true : false;
  }
  openDeleteDialog(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }

  DeleteListItem(): void {
    this.EditList.forEach((item: any) => {
      this._ChotkhoService.DeleteChotkho(item);
    });
    this.EditList = [];
    this._snackBar.open('Xóa Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }

  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  goToDetail(item: any): void {
    this.drawer.open();
    this._ChotkhoService.setChotkhoId(item.id);
    this._router.navigate(['admin/chotkho', item.id]);
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }

  // Phương thức xuất báo cáo
  async generateReport() {
    const statistics = await this._ChotkhoService.getStatistics();
    if (statistics) {
      const report = await this._ChotkhoService.generateReport({
        dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        dateTo: new Date().toISOString(),
        format: 'json'
      });
      
      if (report) {
        this._snackBar.open('Báo cáo đã được tạo thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Tạo file download
        const blob = new Blob([JSON.stringify(report, null, 2)], { 
          type: 'application/json' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bao-cao-chot-kho-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    }
  }

  // Phương thức cập nhật hàng loạt trạng thái
  async bulkUpdateStatus(status: string) {
    if (this.EditList.length === 0) {
      this._snackBar.open('Vui lòng chọn ít nhất một mục', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    const ids = this.EditList.map(item => item.id);
    const success = await this._ChotkhoService.bulkUpdateStatus(ids, status);
    
    if (success) {
      this.EditList = [];
      this._snackBar.open(`Cập nhật trạng thái thành công cho ${ids.length} mục`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }

  // Phương thức hiển thị thống kê
  async showStatistics() {
    const stats = await this._ChotkhoService.getStatistics();
    if (stats) {
      const message = `
        Tổng số: ${stats.total}
        Đang hoạt động: ${stats.active}
        Không hoạt động: ${stats.inactive}
        Chênh lệch trung bình: ${stats.averageChenhLech?.toFixed(3) || 0}
      `;
      
      this._snackBar.open(message, 'Đóng', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });
    }
  }

  // Phương thức tìm kiếm nâng cao
  async advancedSearch(criteria: any) {
    this.searchParam = { ...this.searchParam, ...criteria };
    await this._ChotkhoService.getAllChotkho(this.searchParam);
  }

  // Phương thức refresh dữ liệu
  async refreshData() {
    this.isSearch.set(false);
    this.searchParam = {};
    this.EditList = [];
    await this._ChotkhoService.getAllChotkho();
    
    this._snackBar.open('Dữ liệu đã được làm mới', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  // Phương thức làm mới dữ liệu thông minh
  async smartRefresh() {
    this.isSearch.set(false);
    this.searchParam = {};
    this.EditList = [];
    
    // Hiển thị loading state
    const loadingSnackBar = this._snackBar.open('Đang cập nhật dữ liệu...', '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      await this._ChotkhoService.getAllChotkho();
      loadingSnackBar.dismiss();
      
      this._snackBar.open('Dữ liệu đã được cập nhật', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      loadingSnackBar.dismiss();
      this._snackBar.open('Lỗi cập nhật dữ liệu', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức import Excel
  async importExcel(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    
    const loadingSnackBar = this._snackBar.open('Đang import dữ liệu...', '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      const result = await this._ChotkhoService.importFromExcel(file, {
        validateData: true,
        skipDuplicates: true
      });
      
      loadingSnackBar.dismiss();
      
      if (result) {
        this._snackBar.open(`Import thành công ${result.successCount}/${result.totalCount} bản ghi`, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error) {
      loadingSnackBar.dismiss();
      this._snackBar.open('Lỗi import file', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
    
    // Reset input
    event.target.value = '';
  }

  // Phương thức backup
  async createBackup(type: 'full' | 'incremental' = 'full') {
    const loadingSnackBar = this._snackBar.open('Đang tạo backup...', '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      const success = await this._ChotkhoService.backupData(type);
      loadingSnackBar.dismiss();
      
      if (success) {
        this._snackBar.open('Backup thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error) {
      loadingSnackBar.dismiss();
      this._snackBar.open('Lỗi tạo backup', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức tối ưu hóa
  async optimizeSystem() {
    const loadingSnackBar = this._snackBar.open('Đang tối ưu hóa hệ thống...', '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      const result = await this._ChotkhoService.optimizePerformance();
      loadingSnackBar.dismiss();
      
      if (result) {
        this._snackBar.open(`Tối ưu hóa thành công! Cải thiện hiệu suất`, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error) {
      loadingSnackBar.dismiss();
      this._snackBar.open('Lỗi tối ưu hóa', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức kiểm tra sức khỏe hệ thống
  async checkSystemHealth() {
    try {
      const health = await this._ChotkhoService.getSystemHealth();
      if (health) {
        const message = `
🏥 SỨC KHỎE HỆ THỐNG:
━━━━━━━━━━━━━━━━━━━━━━
💾 Database: ${health.database?.status || 'OK'}
🔄 API: ${health.api?.responseTime || '< 100'}ms
📊 Memory: ${health.memory?.usage || '< 80'}%
🔋 CPU: ${health.cpu?.usage || '< 60'}%
━━━━━━━━━━━━━━━━━━━━━━
        `;
        
        this._snackBar.open(message, 'Đóng', {
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-info'],
        });
      }
    } catch (error) {
      this._snackBar.open('Không thể kiểm tra sức khỏe hệ thống', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức tạo mẫu import
  async downloadImportTemplate(type: 'standard' | 'advanced' = 'standard') {
    try {
      const success = await this._ChotkhoService.generateImportTemplate(type);
      if (success) {
        this._snackBar.open('Đã tải xuống mẫu import', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error) {
      this._snackBar.open('Lỗi tải mẫu import', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức export dữ liệu nâng cao
  async exportAdvanced(format: 'excel' | 'pdf' | 'csv' = 'excel') {
    const loadingSnackBar = this._snackBar.open(`Đang export ${format.toUpperCase()}...`, '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      const success = await this._ChotkhoService.exportData(format, {
        ...this.searchParam,
        selectedIds: this.EditList.map(item => item.id),
        includeDetails: true
      });
      
      loadingSnackBar.dismiss();
      
      if (success) {
        this._snackBar.open(`Export ${format.toUpperCase()} thành công`, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error) {
      loadingSnackBar.dismiss();
      this._snackBar.open(`Lỗi export ${format.toUpperCase()}`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Phương thức kiểm tra chênh lệch thông minh
  async smartCheckChenhLech() {
    if (!this.validateBeforeAction(this.EditList, 'kiểm tra chênh lệch')) {
      return;
    }

    const loadingSnackBar = this._snackBar.open('Đang kiểm tra chênh lệch...', '', {
      duration: 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });

    try {
      const results = [];
      for (const item of this.EditList) {
        const result = await this._ChotkhoService.smartCheckChenhLech(item.id);
        if (result) {
          results.push(result);
        }
      }
      
      loadingSnackBar.dismiss();
      
      const totalChenhLech = results.reduce((sum, r) => sum + (r.chenhLech || 0), 0);
      
      this._snackBar.open(`Kiểm tra hoàn tất. Tổng chênh lệch: ${totalChenhLech}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: totalChenhLech === 0 ? ['snackbar-success'] : ['snackbar-warning'],
      });
      
      // Refresh data
      await this.smartRefresh();
    } catch (error) {
      loadingSnackBar.dismiss();
      this.handleOperationError('kiểm tra chênh lệch', error);
    }
  }

  // Phương thức xử lý lỗi thông minh
  private handleOperationError(operation: string, error: any) {
    console.error(`Lỗi ${operation}:`, error);
    this._snackBar.open(`Có lỗi xảy ra khi ${operation}`, 'Thử lại', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    }).onAction().subscribe(() => {
      // Retry logic có thể được thêm vào đây
      this.smartRefresh();
    });
  }

  // Phương thức validate before action
  private validateBeforeAction(items: any[], action: string): boolean {
    if (items.length === 0) {
      this._snackBar.open(`Vui lòng chọn ít nhất một mục để ${action}`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return false;
    }
    return true;
  }

  // Phương thức cập nhật pageSize thông minh
  onPageSizeChange(size: number, menuHienthi: any) {
    const maxSize = this.total();
    const finalSize = size > maxSize ? maxSize : size;
    
    if (size > maxSize) {
      this._snackBar.open(`Số lượng tối đa ${maxSize}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
    }
    
    this._ChotkhoService.pageSize.set(finalSize);
    this._ChotkhoService.page.set(1);
    this._ChotkhoService.getAllChotkho(this.searchParam);
    menuHienthi.closeMenu();
  }
  
  // Phương thức chuyển trang được tối ưu
  async onPreviousPage() {
    if (this.page() > 1) {
      this._ChotkhoService.page.set(this.page() - 1);
      await this._ChotkhoService.getAllChotkho(this.searchParam);
    }
  }

  async onNextPage() {
    if (this.page() < this.totalPages()) {
      this._ChotkhoService.page.set(this.page() + 1);
      await this._ChotkhoService.getAllChotkho(this.searchParam);
    }
  }

  // Enhanced dialog methods for template compatibility
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      this.selectedFile = file;
    } else {
      this._snackBar.open('Please select a valid Excel file (.xlsx or .xls)', 'Close', { duration: 3000 });
    }
  }

  onBackupFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.backup')) {
      this.selectedBackupFile = file;
    } else {
      this._snackBar.open('Please select a valid backup file (.backup)', 'Close', { duration: 3000 });
    }
  }

  // Enhanced import method with progress
  async startImport() {
    if (!this.selectedFile) return;
    
    this.importProgress = 0;
    const progressInterval = setInterval(() => {
      this.importProgress += 5;
      if (this.importProgress >= 95) {
        clearInterval(progressInterval);
      }
    }, 100);

    try {
      await this._ChotkhoService.importFromExcel(this.selectedFile, {});
      this.importProgress = 100;
      setTimeout(() => {
        this.importProgress = 0;
        this.selectedFile = null;
        this._dialog.closeAll();
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      this.importProgress = 0;
      this.handleOperationError('Import failed', error);
    }
  }

  // Enhanced export method with progress  
  async startExport() {
    this.exportProgress = 0;
    const progressInterval = setInterval(() => {
      this.exportProgress += 8;
      if (this.exportProgress >= 95) {
        clearInterval(progressInterval);
      }
    }, 150);

    try {
      await this.exportExcel();
      this.exportProgress = 100;
      setTimeout(() => {
        this.exportProgress = 0;
        this._dialog.closeAll();
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      this.exportProgress = 0;
      this.handleOperationError('Export failed', error);
    }
  }

  // Enhanced backup method with progress
  async startBackup() {
    if (!this.backupName) {
      this._snackBar.open('Please enter a backup name', 'Close', { duration: 3000 });
      return;
    }
    
    this.backupProgress = 0;
    const progressInterval = setInterval(() => {
      this.backupProgress += 6;
      if (this.backupProgress >= 95) {
        clearInterval(progressInterval);
      }
    }, 200);

    try {
      await this._ChotkhoService.backupData(this.backupType as 'full' | 'incremental');
      this.backupProgress = 100;
      setTimeout(() => {
        this.backupProgress = 0;
        this.backupName = '';
        this._dialog.closeAll();
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      this.backupProgress = 0;
      this.handleOperationError('Backup failed', error);
    }
  }

  // Enhanced restore method with progress
  async startRestore() {
    if (!this.selectedBackupFile) {
      this._snackBar.open('Please select a backup file', 'Close', { duration: 3000 });
      return;
    }
    
    this.backupProgress = 0;
    const progressInterval = setInterval(() => {
      this.backupProgress += 7;
      if (this.backupProgress >= 95) {
        clearInterval(progressInterval);
      }
    }, 180);

    try {
      await this._ChotkhoService.restoreFromBackup(this.selectedBackupFile);
      this.backupProgress = 100;
      setTimeout(() => {
        this.backupProgress = 0;
        this.selectedBackupFile = null;
        this._dialog.closeAll();
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      this.backupProgress = 0;
      this.handleOperationError('Restore failed', error);
    }
  }

  // Export method implementation
  async exportExcel() {
    try {
      let dataToExport = [];
      
      switch (this.exportType) {
        case 'all':
          dataToExport = this.Listchotkho();
          break;
        case 'filtered':
          dataToExport = this.dataSource.filteredData;
          break;
        case 'selected':
          dataToExport = this.EditList;
          break;
        default:
          dataToExport = this.Listchotkho();
      }

      await this._ChotkhoService.exportData('excel', { data: dataToExport });
      this._snackBar.open('Export completed successfully', 'Close', { duration: 3000 });
    } catch (error) {
      this.handleOperationError('Export failed', error);
    }
  }

  // Clear cache method implementation
  async clearAllCacheMethod() {
    try {
      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear localStorage related to chotkho
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('chotkho') || key.includes('Chotkho')) {
          localStorage.removeItem(key);
        }
      });
      
      // Force refresh data
      await this.smartRefresh();
      this._snackBar.open('Cache cleared successfully', 'Close', { duration: 3000 });
    } catch (error) {
      this.handleOperationError('Clear cache failed', error);
    }
  }

  // Method aliases for template compatibility  
  importFromExcel() {
    // Trigger file input click
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls';
    fileInput.onchange = (event) => this.importExcel(event);
    fileInput.click();
  }

  exportToExcel() {
    this.exportAdvanced('excel');
  }

  restoreFromBackup() {
    this.isRestoreMode = true;
    // Trigger file input click for backup files
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.backup';
    fileInput.onchange = (event) => {
      this.onBackupFileSelected(event);
      if (this.selectedBackupFile) {
        this.startRestore();
      }
    };
    fileInput.click();
  }

  clearAllCache() {
    this.clearAllCacheMethod();
  }
}