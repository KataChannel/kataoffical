import { AfterViewInit, Component, computed, effect, inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DonhangGraphqlService } from '../donhang-graphql.service';
import { DonhangService } from '../donhang.service';
import { readExcelFile, readExcelFileNoWorker, readExcelFileNoWorkerArray, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import moment from 'moment';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
@Component({
  selector: 'app-vandon',
  templateUrl: './vandon.component.html',
  styleUrls: ['./vandon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    MatProgressBarModule
  ]
})
export class VandonComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'madonhang',
    'khachhang',
    'title',
    'dvt',
    'sldat',
    'slgiao',
    'slnhan',
    'ngaygiao',
    'status'
  ];
  ColumnName: any = {
    madonhang: 'Mã Đơn Hàng',
    khachhang: 'Khách Hàng',
    diachi: 'Địa Chỉ',
    sdt: 'Số Điện Thoại',
    status: 'Trạng Thái',
    masp: 'Mã Sản Phẩm',
    title: 'Tên Sản Phẩm',
    giagoc: 'Giá Gốc',
    giaban: 'Giá Bán',
    dvt: 'Đơn Vị Tính',
    sldat: 'SL Đặt',
    slgiao: 'SL Giao',
    slnhan: 'SL Nhận',
    slhuy: 'SL Hủy',
    ttdat: 'TT Đặt',
    ttgiao: 'TT Giao',
    ttnhan: 'TT Nhận',
    ttsauvat: 'TT Sau VAT',
    vat: 'VAT (%)',
    order: 'Thứ Tự',
    ghichu: 'Ghi Chú',
    ngaygiao: 'Ngày Giao',
    shipper: 'Shipper',
    phieuve: 'Phiếu Về',
    giodi: 'Giờ Đi',
    giove: 'Giờ Về',
    kynhan: 'Ký Nhận'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('VandonColFilter') || '[]'
  );
  Columns: any[] = [];
  Trangthaidon: any = TrangThaiDon;
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  
  // GraphQL Service injection
  private _DonhangGraphqlService: DonhangGraphqlService = inject(DonhangGraphqlService);
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  // Computed data source using GraphQL service với lazy loading
  dataSource = computed(() => {   
    const ds = new MatTableDataSource(this.Listvandon);
    ds.filterPredicate = this.createFilter();
    // Cấu hình sort với cache
    if (this.sort) {
      ds.sort = this.sort;
    }
    return ds;
  });

  // Get signals from GraphQL service
  donhangId = this._DonhangGraphqlService.donhangId;
  loading = this._DonhangGraphqlService.loading;
  error = this._DonhangGraphqlService.error;
  
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    pageSize: 9999,
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  isSearch: boolean = false;
  
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }

  // Get vandon list from GraphQL service
  get Listvandon() {
    return this._DonhangGraphqlService.ListVandon();
  }
  onSelectionChange(event: MatSelectChange): void {
    this.ngOnInit()
  }
  
  onDateChange(event: any): void {
    this.ngOnInit()
  }
  
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach(column => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : '';
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
    if (this.dataSource().paginator) {
      this.dataSource()?.paginator?.firstPage();
    }
  }
  
  async ngOnInit(): Promise<void> {    
    try {
      // Khởi tạo columns trước để tránh delay UI
      this.initializeColumns();
      this.setupDrawer();
      
      // Dùng setTimeout để tránh blocking UI thread
      setTimeout(async () => {
        // Load dữ liệu vận đơn với GraphQL
        await this._DonhangGraphqlService.searchDonhang(this.SearchParams);
        
        // Load dữ liệu phiếu chuyển để xuất Excel
        await this._DonhangService.Phieuchuyen(this.SearchParams);
        
        this.CountItem = this._DonhangGraphqlService.ListDonhang().length;
        
        // Sử dụng requestAnimationFrame để smooth update
        requestAnimationFrame(() => {
          const dataSource = this.dataSource();
          dataSource.data = this.Listvandon;
          dataSource.paginator = this.paginator;
          
          // Cấu hình paginator
          this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
          this.paginator._intl.nextPageLabel = 'Tiếp Theo';
          this.paginator._intl.previousPageLabel = 'Về Trước';
          this.paginator._intl.firstPageLabel = 'Trang Đầu';
          this.paginator._intl.lastPageLabel = 'Trang Cuối';
        });
      }, 0);
      
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  }
  
  async refresh() {
    await this._DonhangGraphqlService.searchDonhang(this.SearchParams);
    await this._DonhangService.Phieuchuyen(this.SearchParams);
  }
  private initializeColumns(): void {
    // Chỉ tạo columns cho các trường được hiển thị để tối ưu performance
    const allowedColumns = [
      'madonhang', 'khachhang', 'title', 'dvt', 
      'sldat', 'slgiao', 'slnhan', 'ngaygiao', 'status'
    ];
    
    this.Columns = allowedColumns.map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: this.displayedColumns.includes(key),
    }));
    
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      // Lọc FilterColumns chỉ giữ các columns được phép
      this.FilterColumns = this.FilterColumns.filter(col => allowedColumns.includes(col.key));
      localStorage.setItem('VandonColFilter',JSON.stringify(this.FilterColumns));
    }
    
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.paginator.hidePageSize = true;
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
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('VandonColFilter',JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'SPImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   console.log(data);
   this.DoImportData(data);
    // const updatePromises = data.map(async (v: any) => {
    //   const item = this._KhachhangsService
    //     .ListKhachhang()
    //     .find((v1) => v1.MaKH === v.MaKH);
    //   if (item) {
    //     const item1 = { ...item, ...v };
    //     console.log(item1);

    //     await this._KhachhangsService.updateOneKhachhang(item1);
    //   }
    // });
    // Promise.all(updatePromises).then(() => {
    //   this._snackBar.open('Cập Nhật Thành Công', '', {
    //     duration: 1000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     panelClass: ['snackbar-success'],
    //   });
    //   //  window.location.reload();
    // });
  }
  DoImportData(data: any) {
    console.log(data);
    
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      slug: `${convertToSlug(v?.title?.trim() || '')}_${GenId(5, false)}`,
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      ghichu: v.ghichu || '',
      order: Number(v.order) || 0,
    }));
    
    // Filter out duplicate masp values
    const uniqueData = transformedData.filter((value: any, index: any, self: any) =>
      index === self.findIndex((t: any) => (
        t.masp === value.masp
      ))
    );
    
    const listId2 = uniqueData.map((v: any) => v.masp);
    const listId1 = this._DonhangGraphqlService.ListDonhang().map((v: any) => v.masp);
    const listId3 = listId2.filter((item: any) => !listId1.includes(item));
    
    const createuppdateitem = uniqueData.map(async (v: any) => {
      const item = this._DonhangGraphqlService.ListDonhang().find((v1: any) => v1.masp === v.masp);
      if (item) {
        const item1 = { ...item, ...v };
        await this._DonhangGraphqlService.updateDonhang(item1);
      } else {
        await this._DonhangGraphqlService.CreateDonhang(v);
      }
    });
    
    const disableItem = listId3.map(async (v: any) => {
      const item = this._DonhangGraphqlService.ListDonhang().find((v1: any) => v1.masp === v);
      if (item) {
        item.isActive = false;
        await this._DonhangGraphqlService.updateDonhang(item);
      }
    });
    
    Promise.all([...createuppdateitem, ...disableItem]).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    });
  }
  async ImporExcel(event: any) {
    const data = await readExcelFile(event)
    this.DoImportData(data);
  }

  /**
   * Import Excel phiếu chuyển - Update shipper, phieuve, giodi, giove, kynhan
   */
  async ImportPhieuChuyenExcel(event: any) {
    const startTime = Date.now();
    
    try {
      // Show loading immediately
      this._snackBar.open('📂 Đang đọc file Excel...', '', {
        duration: undefined,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info']
      });

      const data = await readExcelFileNoWorkerArray(event, 'Phiếu Chuyển');
      
      if (!data || data.length === 0) {
        this._snackBar.open('⚠️ File không có dữ liệu', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      console.log(`[IMPORT] Đọc được ${data.length} dòng từ Excel`);

      // Process import with progress
      const result = await this._DonhangGraphqlService.importPhieuChuyenFromExcel(data);

      // Calculate duration
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      // Refresh UI
      await this.refresh();

      // Show detailed result
      console.log(`[IMPORT] Hoàn thành trong ${duration}s:`, result);

    } catch (error: any) {
      console.error('[IMPORT] Error:', error);
      this._snackBar.open(`❌ ${error.message || 'Lỗi import'}`, 'Đóng', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    } finally {
      // Reset file input để có thể import lại cùng file
      event.target.value = '';
    }
  }
  
  ExportExcel(data: any, title: any) {
    writeExcelFile(data, title);
  }

  /**
   * Xuất Excel danh sách vận đơn với loading
   */
  async exportVandonToExcel() {
    await this._DonhangGraphqlService.exportVandonToExcel(this.dataSource().filteredData || this.Listvandon);
  }

  /**
   * Xuất Excel toàn bộ danh sách
   */
  async exportAllToExcel() {
    await this._DonhangGraphqlService.exportVandonToExcel();
  }






  @memoize()
  FilterHederColumn(list: any, column: any) {
    if (!list || list.length === 0) return [];
    // Tối ưu với weakmap cache và giới hạn kết quả
    const uniqueList = list
      .filter((obj: any, index: number, self: any) => 
        index === self.findIndex((t: any) => t[column] === obj[column])
      )
      .slice(0, 100); // Giới hạn 100 items để tăng performance
    return uniqueList;
  }
  
  @Debounce(500) // Tăng debounce để giảm số lần gọi
  doFilterHederColumn(event: any, column: any): void {
    if (!this.Listvandon || this.Listvandon.length === 0) return;
    
    const query = event.target.value.toLowerCase();
    if (query.length < 2 && query.length > 0) return; // Chỉ filter khi >= 2 ký tự
    
    // Sử dụng requestAnimationFrame để tránh block UI
    requestAnimationFrame(() => {
      this.dataSource().filteredData = this.Listvandon.filter((v: any) => 
        removeVietnameseAccents(v[column] || '').toLowerCase().includes(query) ||
        (v[column] || '').toString().toLowerCase().includes(query)
      );
    });
  }
  
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  
  ListFilter: any[] = [];
  
  ChosenItem(item: any, column: any) {
    if (!this.dataSource().filteredData) return;
    
    const CheckItem = this.dataSource().filteredData.filter((v: any) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v: any) => v[column] === item[column]);
    
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }    
  }
  
  ChosenAll(list: any) {
    if (!list) return;
    
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((item) => item.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  
  ResetFilter() {
    this.ListFilter = this.Listvandon || [];
    this.dataSource().data = this.Listvandon || [];
    this.dataSource().sort = this.sort;
  }
  
  EmptyFiter() {
    this.ListFilter = [];
  }
  
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  
  ApplyFilterColum(menu: any) {    
    if (this.ListFilter.length === 0) {
      this.dataSource().data = [];
    } else {
      this.dataSource().data = this.Listvandon.filter((v: any) => 
        this.ListFilter.some((v1) => v1.id === v.id)
      );
    }
    this.dataSource().sort = this.sort;
    menu.closeMenu();
  }
}



function memoize() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };

    return descriptor;
  };
}

function Debounce(delay: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timeoutId: any;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}