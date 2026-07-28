import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KhachhangGraphqlService } from '../khachhang-graphql.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';

@Component({
  selector: 'app-listkhachhang',
  templateUrl: './listkhachhang.component.html',
  styleUrls: ['./listkhachhang.component.scss'],
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
    SearchfilterComponent,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListKhachhangComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    makh: 'Mã KH',
    name: 'Tên KH',
    banggia: 'Bảng Giá',
    diachi: 'Địa Chỉ',
    quan: 'Quận',
    email: 'Email',
    sdt: 'SDT',
    mst: 'MST',
    gionhanhang: 'Giờ Nhận Hàng',
    loaikh: 'Loại KH',
    ghichu: 'Ghi Chú',
    isActive: 'Trạng Thái',
    createdAt: 'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('KhachhangColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  // Updated to use GraphQL service
  private _KhachhangService: KhachhangGraphqlService = inject(KhachhangGraphqlService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  // GraphQL reactive signals
  Listkhachhang = this._KhachhangService.ListKhachhang;
  page = this._KhachhangService.page;
  totalPages = this._KhachhangService.totalPages;
  total = this._KhachhangService.total;
  pageSize = this._KhachhangService.pageSize;
  khachhangId = this._KhachhangService.khachhangId;
  loading = this._KhachhangService.loading;
  error = this._KhachhangService.error;
  
  dataSource: any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  searchParam: any = {};

  // Client-side pagination info
  paginationInfo = computed(() => {
    const paginator = this.paginator;
    if (!paginator) return null;
    
    return {
      currentPage: paginator.pageIndex + 1,
      totalPages: Math.ceil(paginator.length / paginator.pageSize),
      pageSize: paginator.pageSize,
      totalRecords: paginator.length,
      displayStart: paginator.length === 0 ? 0 : paginator.pageIndex * paginator.pageSize + 1,
      displayEnd: Math.min((paginator.pageIndex + 1) * paginator.pageSize, paginator.length)
    };
  });

  constructor() {
    // Reactive updates with GraphQL signals
    effect(() => {
      const data = this.Listkhachhang();
      if (data && data.length > 0) {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        
        // Setup client-side pagination với toàn bộ data
        if (this.paginator) {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 50; // Default page size
          this.paginator.length = data.length;
          
          // Set page size options
          this.paginator.pageSizeOptions = [25, 50, 100, 200, 500];
          this.paginator.showFirstLastButtons = true;
        }
      }
    });

    // Handle errors reactively
    effect(() => {
      const errorMessage = this.error();
      if (errorMessage) {
        this._snackBar.open(errorMessage, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    });

    // Handle loading state
    effect(() => {
      const isLoading = this.loading();
      if (isLoading) {
        // Có thể thêm loading indicator nếu cần
        console.log('Loading khách hàng...');
      }
    });
  }

  async ngOnInit(): Promise<void> {
    // Initialize columns first
    this.initializeColumns();
    this.setupDrawer();
    
    // Load tất cả data với GraphQL (không pagination)
    try {
      await this._KhachhangService.getAllKhachhang(this.searchParam);
      
      // Setup datasource với toàn bộ data
      const data = this.Listkhachhang();
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; // Client-side pagination
      
      // Custom sort accessor for nested properties
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
        switch (sortHeaderId) {
          case 'banggia':
            return data.banggia?.title || '';
          case 'createdAt':
          case 'updatedAt':
            return new Date(data[sortHeaderId]);
          default:
            return data[sortHeaderId] || '';
        }
      };
      
    } catch (error) {
      console.error('Lỗi khi load dữ liệu khách hàng:', error);
      this._snackBar.open('Không thể tải dữ liệu khách hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('KhachhangColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }
  @Debounce(300)
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    // Clear filter if search is empty
    if (filterValue.length === 0) {
      this.dataSource.filter = '';
      return;
    }
    
    try {
      const normalizedFilter = removeVietnameseAccents(filterValue.trim().toLowerCase());
      
      // Enhanced filter predicate for better Vietnamese text search
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        // Create searchable string from all relevant fields
        const searchFields = ['makh', 'name', 'email', 'sdt', 'diachi', 'quan', 'loaikh', 'ghichu'];
        
        const dataStr = searchFields
          .map(field => {
            if (field === 'banggia') {
              return data.banggia?.title || '';
            }
            return data[field] ? data[field].toString() : '';
          })
          .join(' ').toLowerCase();
        
        const normalizedDataStr = removeVietnameseAccents(dataStr);
        
        // Search in both original and normalized text
        return dataStr.includes(filter) || normalizedDataStr.includes(filter);
      };
      
      this.dataSource.filter = normalizedFilter;
      
      // Reset to first page when filtering
      if (this.paginator) {
        this.paginator.firstPage();
      }
      
    } catch (error) {
      console.error('Error applying filter:', error);
      this._snackBar.open('Lỗi khi tìm kiếm', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async getUpdatedCodeIds() {
    try {
      await this._KhachhangService.getUpdatedCodeIds();
      this._snackBar.open('Cập nhật thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      this._snackBar.open('Lỗi khi cập nhật', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Method để refresh toàn bộ dữ liệu
  async refreshData() {
    try {
      await this._KhachhangService.getAllKhachhang({});
      this._snackBar.open('Dữ liệu đã được cập nhật', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Lỗi khi refresh dữ liệu:', error);
      this._snackBar.open('Không thể refresh dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
        } else {
          this.drawer.mode = 'side';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listkhachhang().filter((v: any) => 
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter((v: any) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v: any) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }

  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    this.ListFilter = this.Listkhachhang();
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listkhachhang().filter((v: any) => 
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  onOutFilter(event: any) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('KhachhangColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/khachhang', 'new']);
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
      this._KhachhangService.deleteKhachhang(item.id);
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
    this._KhachhangService.setKhachhangId(item.id);
    this._router.navigate(['admin/khachhang', item.id]);
  }

  OpenLoadDrive(template: TemplateRef<any>) {

  }

  IdSheet: any = '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk';
  SheetName: any = 'SPImport';
  ImportIteam: any[] = [];
  ImportColumnName: any = {};
  ImportdisplayedColumns: any[] = [];

  async LoadDrive() {
    const DriveInfo = {
      IdSheet: this.IdSheet,
      SheetName: this.SheetName,
      ApiKey: environment.GSApiKey,
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    this.ImportIteam = ConvertDriveData(result.values);
    this.ImportColumnName = Object.fromEntries(result.values[0].map((key: any, i: any) => [key, result.values[1][i]]));
    this.ImportdisplayedColumns = result.values[0];
  }

  async DoImportData(data: any) {
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt?.trim() || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      haohut: Number(v.haohut) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));

    const uniqueData = Array.from(new Map(transformedData.map((item: any) => [item.masp, item])).values());
    const existingKhachhang = this._KhachhangService.ListKhachhang();
    const existingMasp = existingKhachhang.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingKhachhang.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._KhachhangService.updateKhachhang(updatedItem.id, updatedItem);
      } else {
        await this._KhachhangService.createKhachhang(v);
      }
    }));
    await Promise.all(existingKhachhang
      .filter((sp: any) => !uniqueData.some((item: any) => item.masp === sp.masp))
      .map((sp: any) => this._KhachhangService.updateKhachhang(sp.id, { ...sp, isActive: false }))
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }

  ExportExcel(data: any, title: any) {
    const dulieu = data.map((v: any) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu,
    }));
    writeExcelFile(dulieu, title);
  }

  trackByFn(index: number, item: any): string {
    return item.id || index.toString();
  }

  // Performance optimization: Track by cho filtered data
  trackByFilteredFn = (index: number, item: any): string => {
    return `${item.id}-${item.updatedAt || item.createdAt}`;
  };

  // Client-side pagination methods
  getCurrentPage(): number {
    return this.paginator ? this.paginator.pageIndex + 1 : 1;
  }

  getTotalPages(): number {
    return this.paginator ? Math.ceil(this.paginator.length / this.paginator.pageSize) : 1;
  }

  getCurrentPageSize(): number {
    return this.paginator ? this.paginator.pageSize : 50;
  }

  getDisplayStart(): number {
    if (!this.paginator || this.paginator.length === 0) return 0;
    return this.paginator.pageIndex * this.paginator.pageSize + 1;
  }

  getDisplayEnd(): number {
    if (!this.paginator || this.paginator.length === 0) return 0;
    const end = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    return Math.min(end, this.paginator.length);
  }

  getTotalRecords(): number {
    return this.paginator ? this.paginator.length : 0;
  }

  canGoToPrevious(): boolean {
    return this.paginator ? this.paginator.hasPreviousPage() : false;
  }

  canGoToNext(): boolean {
    return this.paginator ? this.paginator.hasNextPage() : false;
  }

  async onPageSizeChange(size: number, menuHienthi: any) {
    // Validate page size
    if (size < 1) {
      this._snackBar.open('Số lượng phải lớn hơn 0', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // Với việc load tất cả data, chỉ cần thay đổi pageSize của MatPaginator
    if (this.paginator) {
      this.paginator.pageSize = size;
      this.paginator.firstPage(); // Reset về trang đầu
    }
    
    this._snackBar.open(`Hiển thị ${size} items mỗi trang`, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
    
    menuHienthi.closeMenu();
  }
  
  async onPreviousPage(){
    // Client-side pagination - không cần gọi API
    if (this.paginator && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  async onNextPage(){
    // Client-side pagination - không cần gọi API  
    if (this.paginator && this.paginator.hasNextPage()) {
      this.paginator.nextPage();
    }
  }
}