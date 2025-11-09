import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewChild,
  OnDestroy,
} from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import {
  ConvertDriveData,
} from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { DonhangService } from '../../donhang/donhang.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateHelpers } from '../../../shared/utils/date-helpers';
import moment from 'moment';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import { SharepaginationComponent } from '../../../shared/common/sharepagination/sharepagination.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { LoadingUtils } from '../../../shared/utils/loading.utils';
@Component({
  selector: 'app-listphieugiaohang',
  templateUrl: './listphieugiaohang.component.html',
  styleUrls: ['./listphieugiaohang.component.scss'],
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
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    SharepaginationComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [provideNativeDateAdapter()],
})
export class ListPhieugiaohangComponent implements AfterViewInit, OnDestroy {
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
    'madonhang',
    'khachhang',
    'sanpham',
    'ngaygiao',
    'status',
    'ghichu',
    'createdAt',
    'updatedAt',
  ];
  ColumnName: any = {
    STT: 'STT',
    madonhang: 'Mã Đơn Hàng',
    khachhang: 'Khách Hàng',
    sanpham: 'Sản Phẩm',
    ngaygiao: 'Ngày Giao',
    status: 'Trạng Thái',
    ghichu: 'Ghi Chú',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('PhieugiaohangColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  isLoading = signal<boolean>(false);
  isBulkUpdating = signal<boolean>(false);
  isSearching = signal<boolean>(false);
  isExporting = signal<boolean>(false);
  isImporting = signal<boolean>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  Listphieugiaohang: any = signal<any>({});
  dataSource = new MatTableDataSource<any>([]);
  donhangId: any = this._DonhangService.donhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  isSearch: boolean = false;
  CountItem: any = 0;
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);  pageSize = signal<number>(10);
  Trangthaidon: any = TrangThaiDon;
  SearchParams: any = {
    Batdau: moment().startOf('day').toDate(),  // 00:00:00 ngày hiện tại
    Ketthuc: moment().endOf('day').toDate(),   // 23:59:59 ngày hiện tại
    Type: 'all',
    Status: ['dadat', 'dagiao','danhan','hoanthanh'],
    pageSize: 10,
    pageNumber: 1,
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column]
            ? data[column].toString().toLowerCase()
            : '';
          isMatch =
            isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  async searchData(): Promise<void> {
    await this.LoadData();
  }
  
  async ngOnInit(): Promise<void> {
    // 🔥 AUTO-LOAD: Tự động load dữ liệu trong ngày khi vào trang
    this.initializeColumns();
    this.setupDrawer();
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      this.paginator._intl.previousPageLabel = 'Về Trước';
      this.paginator._intl.firstPageLabel = 'Trang Đầu';
      this.paginator._intl.lastPageLabel = 'Trang Cuối';
    }
    
    // 🔥 Load dữ liệu trong ngày khi khởi tạo
    await this.LoadData();
  }

  ngAfterViewInit(): void {
    // Kết nối MatSort với dataSource sau khi view đã init
    if (this.sort) {
      this.dataSource.sort = this.sort;
      
      // Configure custom sort accessor for complex fields
      this.dataSource.sortingDataAccessor = (item: any, property: string) => {
        switch (property) {
          case 'khachhang':
            return item.khachhang?.name || '';
          case 'sanpham':
            return item.sanpham?.length || 0;
          case 'ngaygiao':
          case 'createdAt':
          case 'updatedAt':
            return new Date(item[property]).getTime();
          default:
            return item[property];
        }
      };
    }
  }

  async onPageChange(event: any): Promise<void> {
    console.log('Page change event:', event);

    // Show loading indicator during page change
    this.isLoading.set(true);

    try {
      this.SearchParams.pageSize = event.pageSize;
      this.SearchParams.pageNumber = event.page;
      await this.LoadData();
    } catch (error) {
      console.error('Error changing page:', error);
      this._snackBar.open('Lỗi khi chuyển trang', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async LoadData() {
    const loadDataKey = `${this.COMPONENT_KEY}_loadData`;
    
    return LoadingUtils.queueRequest(loadDataKey, async () => {
      this.isLoading.set(true);
      try {
        // Fetch paginated data from server
        const data: any = await this.searchDonhang();
        console.log(data);
        
        this.Listphieugiaohang.set(data);
        this.total.set(Number(data.length || 0));
        this.pageSize.set(10);
        this.page.set(1);
        this.pageCount.set(1);
        
        // Set data to table without client-side pagination since we're using server-side
        this.dataSource = new MatTableDataSource(data);
        // Keep sorting enabled for client-side, but disable pagination
        this.dataSource.paginator = null;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        
        // Configure custom sort accessor for complex fields
        this.dataSource.sortingDataAccessor = (item: any, property: string) => {
          switch (property) {
            case 'khachhang':
              return item.khachhang?.name || '';
            case 'sanpham':
              return item.sanpham?.length || 0;
            case 'ngaygiao':
            case 'createdAt':
            case 'updatedAt':
              return new Date(item[property]).getTime();
            default:
              return item[property];
          }
        };
      } catch (error) {
        console.error('Error loading data:', error);
        this._snackBar.open('Lỗi khi tải dữ liệu', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });

        // Set empty state on error
        this.total.set(0);
        this.pageSize.set(10);
        this.page.set(1);
        this.pageCount.set(0);
        this.dataSource = new MatTableDataSource<any>([]);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  async searchDonhang(){
    const where: any = {
      ngaygiao: { 
        gte: moment(this.SearchParams.Batdau).startOf('day').toISOString(),
        lte: moment(this.SearchParams.Ketthuc).endOf('day').toISOString()
      },
      status: { in: this.SearchParams.Status}
    };

    if (this.SearchParams.Type && this.SearchParams.Type !== 'all') {
      where.khachhang = { loaikh: this.SearchParams.Type };
    }

    const Donhangs = await this._GraphqlService.findAll('donhang', {
      aggressiveCache: true,
      enableParallelFetch: true,
      take:999999,
      where,
      select:{
        id:true,
        madonhang:true,
        ngaygiao:true,
        status:true,
        ghichu:true,
        createdAt:true,
        updatedAt:true,
        khachhang:{
          select:{
            id:true,
            name:true,
          }
        },
        sanpham:{
          select:{
            id:true,
          }
        }
      }
    });
    console.log(Donhangs);
    return Donhangs.data;
  }
  
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue.trim()) {
      // If filter is empty, show all data
      this.dataSource.filter = '';
      return;
    }

    this.isSearching.set(true);
    
    // Apply filter to current data source with Vietnamese accent removal and case insensitive search
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchText = removeVietnameseAccents(filter.toLowerCase().trim());
      
      // Search across all displayed columns with proper handling of nested objects
      return this.displayedColumns.some(column => {
        let value;
        
        // Handle special cases for nested objects
        switch (column) {
          case 'khachhang':
            value = data.khachhang?.name || '';
            break;
          case 'sanpham':
            value = data.sanpham?.length ? `${data.sanpham.length} sản phẩm` : '';
            break;
          case 'ngaygiao':
          case 'createdAt':
          case 'updatedAt':
            value = data[column] ? moment(data[column]).format('DD/MM/YYYY HH:mm') : '';
            break;
          case 'status':
            value = this.Trangthaidon[data[column]] || data[column] || '';
            break;
          default:
            value = data[column] || '';
        }
        
        if (value) {
          const normalizedValue = removeVietnameseAccents(value.toString().toLowerCase());
          return normalizedValue.includes(searchText);
        }
        return false;
      });
    };
    
    this.dataSource.filter = filterValue.trim();
    this.isSearching.set(false);
  }
  
  private searchTimeout: any;
  private readonly COMPONENT_KEY = 'listphieugiaohang';

  // Debounced search function
  private debouncedSearch = LoadingUtils.debounce(
    async () => {
      try {
        this.SearchParams.pageNumber = 1;
        await this.LoadData();
      } finally {
        this.isSearching.set(false);
      }
    },
    500,
    `${this.COMPONENT_KEY}_search`
  );
  onSelectionChange(event: MatSelectChange): void {
    this.SearchParams.pageNumber = 1; // Reset to first page
    this.LoadData();
  }

  async onTypeChange(value: string): Promise<void> {
    this.SearchParams.Type = value;
    this.SearchParams.pageNumber = 1; // Reset to first page
    // 🔥 Auto-load data when type changes for better UX
    await this.LoadData();
  }

  onDateChange(event: any): void {
    // Chỉ update SearchParams, không load data tự động
    this.SearchParams.pageNumber = 1; // Reset to first page
    // User cần nhấn nút Tìm Kiếm để load data
  }
  
  private initializeColumns(): void {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true,
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem(
        'PhieugiaohangColFilter',
        JSON.stringify(this.FilterColumns)
      );
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
          // this.paginator.hidePageSize = true;
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
  FilterHederColumn(list: any, column: any) {
    // Use the current data source data instead of the full list for filtering
    const dataToFilter = this.dataSource.data || [];
    
    // Handle special columns with objects
    if (column === 'sanpham') {
      // Group by product count
      const uniqueList = dataToFilter.filter(
        (obj: any, index: number, self: any) =>
          index === self.findIndex((t: any) => 
            (t[column]?.length || 0) === (obj[column]?.length || 0)
          )
      );
      return uniqueList;
    } else if (column === 'khachhang') {
      // Group by customer name
      const uniqueList = dataToFilter.filter(
        (obj: any, index: number, self: any) =>
          index === self.findIndex((t: any) => 
            (t[column]?.name || '') === (obj[column]?.name || '')
          )
      );
      return uniqueList;
    } else {
      // Standard comparison for primitive values
      const uniqueList = dataToFilter.filter(
        (obj: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t[column] === obj[column])
      );
      return uniqueList;
    }
  }
  doFilterHederColumn(event: any, column: any): void {
    // Since we're using server-side pagination, this should filter within current page data
    const query = event.target.value.toLowerCase();
    const filteredData = this.dataSource.data.filter((v: any) => {
      let value: any;
      
      // Handle special columns with objects
      if (column === 'sanpham') {
        value = `${v[column]?.length || 0} sản phẩm`;
      } else if (column === 'khachhang') {
        value = v[column]?.name || '';
      } else {
        value = v[column];
      }
      
      if (value) {
        return (
          removeVietnameseAccents(value.toString())
            .toLowerCase()
            .includes(query) || value.toString().toLowerCase().includes(query)
        );
      }
      return false;
    });

    // Update the displayed data temporarily for the filter menu
    this.dataSource.filteredData = filteredData;
    console.log(query, column, filteredData);
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    let CheckItem: any[] = [];
    let CheckItem1: any[] = [];
    
    // Handle special columns with objects
    if (column === 'sanpham') {
      // Filter by product count
      CheckItem = this.dataSource.data.filter(
        (v: any) => (v[column]?.length || 0) === (item[column]?.length || 0)
      );
      CheckItem1 = this.ListFilter.filter(
        (v: any) => (v[column]?.length || 0) === (item[column]?.length || 0)
      );
    } else if (column === 'khachhang') {
      // Filter by customer name
      CheckItem = this.dataSource.data.filter(
        (v: any) => (v[column]?.name || '') === (item[column]?.name || '')
      );
      CheckItem1 = this.ListFilter.filter(
        (v: any) => (v[column]?.name || '') === (item[column]?.name || '')
      );
    } else {
      // Standard comparison for primitive values
      CheckItem = this.dataSource.data.filter(
        (v: any) => v[column] === item[column]
      );
      CheckItem1 = this.ListFilter.filter(
        (v: any) => v[column] === item[column]
      );
    }
    
    if (CheckItem1.length > 0) {
      // Remove items with matching column value
      if (column === 'sanpham') {
        this.ListFilter = this.ListFilter.filter(
          (v) => (v[column]?.length || 0) !== (item[column]?.length || 0)
        );
      } else if (column === 'khachhang') {
        this.ListFilter = this.ListFilter.filter(
          (v) => (v[column]?.name || '') !== (item[column]?.name || '')
        );
      } else {
        this.ListFilter = this.ListFilter.filter(
          (v) => v[column] !== item[column]
        );
      }
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id)
        ? true
        : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    // Reset to original data from signal
    const originalData = this.Listphieugiaohang() || [];
    console.log('ResetFilter - Original data length:', originalData.length);
    this.ListFilter = [...originalData];
    this.dataSource.data = [...originalData];
    this.dataSource.filteredData = [...originalData];
    console.log('ResetFilter - After reset, dataSource.data length:', this.dataSource.data.length);
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  EditList: any = [];

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
    console.log(this.EditList);
  }
  ToggleAll(): void {
    this.EditList.length == this.dataSource.data.length
      ? (this.EditList = [])
      : (this.EditList = [...this.dataSource.data]);
  }

  togglePhieugiaohang(row: any): void {
    this.AddToEdit(row);
  }
  CheckItemInPhieugiaohang(item: any): boolean {
    return this.CheckItemInEdit(item);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  async UpdateBulk() {
    if (!this.EditList?.length) {
      this._snackBar.open('Không có mục nào được chọn để cập nhật', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    this.isBulkUpdating.set(true);
    try {
      const result: any = await this._DonhangService.UpdateBulkDonhang(
        this.EditList.map((v: any) => v.id)
      );
      this._snackBar.open(
        `Cập nhật thành công ${result.success} đơn hàng${result.fail ? `, ${result.fail} lỗi` : ''}`,
        '',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
    } catch (error: any) {
      console.error('Lỗi khi cập nhật đơn hàng:', error);
      this._snackBar.open('Có lỗi xảy ra khi cập nhật đơn hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.EditList = [];
      this.isBulkUpdating.set(false);
      await this.LoadData();
    }
  }
  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  // Kiểm tra trạng thái đã in (printCount > 0)
  getTrangthaiIn(item: any): boolean {
    return item.printCount && item.printCount > 0;
  }

  /**
   * Count delivered orders (danhan, hoanthanh)
   * Safely handles signal value and ensures array type
   */
  countDagiao(): number {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders)) return 0;
    return orders.filter((item: any) => 
      ['danhan', 'hoanthanh', 'dagiao'].includes(item.status)
    ).length;
  }
  
  /**
   * Count undelivered orders (dadat, dagiao)
   * Safely handles signal value and ensures array type
   */
  countChuagiao(): number {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders)) return 0;
    return orders.filter((item: any) => 
      ['dadat', 'huy'].includes(item.status)
    ).length;
  }

  /**
   * Filter by delivered status (danhan, hoanthanh)
   */
  filterDagiao(): void {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders)) return;
    
    this.dataSource.data = orders.filter((item: any) => 
      ['danhan','dagiao', 'hoanthanh'].includes(item.status)
    );
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  /**
   * Filter by undelivered status (dadat, dagiao)
   */
  filterChuagiao(): void {
    const orders = this.Listphieugiaohang();
    console.log('Filtering undelivered orders', orders);
    if (!Array.isArray(orders)) return;
    
    this.dataSource.data = orders.filter((item: any) => 
      ['dadat', 'huy'].includes(item.status)
    );
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Reset filter to show all orders
   */
  resetStatusFilter(): void {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders)) return;
    
    this.dataSource.data = orders;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ApplyFilterColum(menu: any) {
    // Filter based on selected items in ListFilter
    const originalData = this.Listphieugiaohang() || [];
    this.dataSource.data = originalData.filter((v: any) =>
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    console.log('ApplyFilterColum - Filtered data length:', this.dataSource.data.length, 'from', originalData.length);
    menu.closeMenu();
  }
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem(
      'PhieugiaohangColFilter',
      JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/phieugiaohang', 0]);
  }
  goToDetail(item: any): void {
    this._DonhangService.setDonhangId(item.id);
    // this.drawer.open();
    // this._router.navigate(['admin/phieugiaohang', item.id], { queryParams: { openInNewTab: true } });
    window.open(
      this._router.serializeUrl(
        this._router.createUrlTree(['admin/phieugiaohang', item.id])
      ),
      '_blank'
    );
  }
  async LoadDrive() {
    this.isImporting.set(true);
    try {
      const DriveInfo = {
        IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
        SheetName: 'PGHImport',
        ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
      };
      const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      console.log(data);
      await this.DoImportData(data);
      
      this._snackBar.open('Tải dữ liệu từ Drive thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Error loading from drive:', error);
      this._snackBar.open('Lỗi khi tải dữ liệu từ Drive', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isImporting.set(false);
    }
  }
  
  async DoImportData(data: any) {
    // Implementation for importing data
    return Promise.resolve();
  }
  
  async ImporExcel(event: any) {
    this.isImporting.set(true);
    try {
      const data = await readExcelFile(event);
      await this.DoImportData(data);
      
      this._snackBar.open('Import Excel thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      // Clear the input to allow re-importing the same file
      (event.target as HTMLInputElement).value = '';
    } catch (error) {
      console.error('Error importing excel:', error);
      this._snackBar.open('Lỗi khi import Excel', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isImporting.set(false);
    }
  }
  
  ExportExcel(data: any, title: any) {
    this.isExporting.set(true);
    try {
      writeExcelFile(data, title);
      this._snackBar.open('Export Excel thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Error exporting excel:', error);
      this._snackBar.open('Lỗi khi export Excel', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isExporting.set(false);
    }
  }
  
  ngOnDestroy(): void {
    // Cleanup loading utils timers
    LoadingUtils.cleanup(this.COMPONENT_KEY);
  }
}
