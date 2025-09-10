import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  TemplateRef,
  ViewChild,
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
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import {
  ConvertDriveData,
  convertToSlug,
  GenId,
} from '../../../shared/utils/shared.utils';
import * as XLSX from 'xlsx-js-style'; 
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DathangService } from '../../dathang/dathang.service'; // Thay đổi từ DonhangService
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-listcongnoncc',
  templateUrl: './listcongnoncc.component.html',
  styleUrls: ['./listcongnoncc.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    MatAutocompleteModule,
    RouterOutlet
  ],
  // providers: [provideNativeDateAdapter()],
})
export class ListcongnonccComponent {
  Detail: any = {};
  
  // Loading states
  isLoading = false;
  isSearching = false;
  isExporting = false;
  
  displayedColumns: string[] = [
    'ngaygiao',
    'madathang', // Thay đổi từ madonhang
    'mancc',     // Thay đổi từ makh
    'name',
    'soluong',
    'tong',
    'tongvat',
    'tongtien',
  ];
  ColumnName: any = {
    ngaygiao: 'Ngày Giao',
    madathang: 'Mã Đặt Hàng', // Thay đổi từ 'Mã Đơn Hàng'
    mancc: 'Mã Nhà Cung Cấp', // Thay đổi từ 'Mã Khách Hàng'
    name: 'Tên Nhà Cung Cấp', // Thay đổi từ 'Tên Khách Hàng'
    soluong: 'Số Lượng',
    tong: 'Tổng',
    tongvat: 'Tổng VAT',
    tongtien: 'Tổng Tiền',
  };

  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('CongnonccColFilter') || '[]' // Thay đổi key storage
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon:any = TrangThaiDon;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _DathangService: DathangService = inject(DathangService); // Thay đổi từ DonhangService
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  Listdathang: any = this._DathangService.ListDathang; // Thay đổi từ Listdonhang
  ListNhacungcap:any = []; // Thay đổi từ ListKhachhang
  ListCongno:any = [];
  dataSource = new MatTableDataSource([]);
  dathangId: any = this._DathangService.dathangId; // Thay đổi từ donhangId
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Type: 'datmua', // Thay đổi từ 'donsi'
    Status:['danhan','hoanthanh'],
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
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
  }
  
  onSelectionChange(event: MatSelectChange): void {
     this.ngOnInit();
  }
  
  onDateChange(event: any): void {
    // this.ngOnInit()
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
  
  @Debounce(300)
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.SearchParams = {
      ...this.SearchParams,
      query: filterValue
    };
   this.loadData(this.SearchParams);
  }

  async ngOnInit(): Promise<void> {
    this.initializeColumns();
    this.setupDrawer();
    this.loadData(this.SearchParams);
  }
  
  async doSearch(){
    this.isSearching = true;
    try {
      await this.loadData(this.SearchParams); 
      // Create a Map to track unique suppliers (nhà cung cấp)
      const uniqueSuppliers = new Map();
      this.Listdathang().forEach((v: any) => {
        const mancc = v.manhacungcap; // Thay đổi từ makhachhang
        const tenncc = v.tennhacungcap; // Thay đổi từ tenkhachhang
        if (mancc && !uniqueSuppliers.has(mancc)) {
        uniqueSuppliers.set(mancc, tenncc);
        }
      });
      // Convert Map to array
      this.ListNhacungcap = this.filterListNhacungcap = Array.from(uniqueSuppliers.values());
      console.log('ListNhacungcap', this.ListNhacungcap);
    } finally {
      this.isSearching = false;
    }
  }
  
  ListExport:any = []
  onNhacungcapChange(event: MatAutocompleteSelectedEvent){ // Thay đổi từ onKhachhangChange
    const selectedValue = event.option.value;
    // Update dataSource and ListExport based on selection
    if (selectedValue && selectedValue !== '') {
      // Filter by supplier name
      this.dataSource.data = this.ListExport = this.ListCongno.filter((item: any) =>
        item.tennhacungcap === selectedValue // Thay đổi từ tenkhachhang
      );
    } else {
      // Reset to show all data
      this.dataSource.data = this.ListExport = this.ListCongno;
    }
    this.dataSource.sort = this.sort;
  }
  
  filterListNhacungcap:any = [] // Thay đổi từ filterListKhachhang
  @Debounce(100)
  doFilterNhacungcap(event: Event){ // Thay đổi từ doFilterKhachhang
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('query', query);
    
    if(!query) {
      this.filterListNhacungcap = this.ListNhacungcap;
      return;
    }
   this.filterListNhacungcap = this.ListNhacungcap.filter((item: any) =>
     item.toLowerCase().includes(query) || removeVietnameseAccents(item).toLowerCase().includes(removeVietnameseAccents(query))
   );
  }
  
  async loadData(query:any): Promise<void> {
    this.isLoading = true;
    try {
      await this._DathangService.searchCongno(query); // Thay đổi method tương ứng
      console.log(this.Listdathang());
      
      this.CountItem = this.Listdathang().length||0;
      // Nhóm dữ liệu theo nhà cung cấp để tính tổng tiền sau thuế
      const supplierTotals = new Map(); // Thay đổi từ customerTotals
      // Tính tổng tiền sau thuế cho từng nhà cung cấp
      this.ListCongno = this.Listdathang()
      this.dataSource = new MatTableDataSource(this.ListCongno);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      this.paginator._intl.previousPageLabel = 'Về Trước';
      this.paginator._intl.firstPageLabel = 'Trang Đầu';
      this.paginator._intl.lastPageLabel = 'Trang Cuối';
    } finally {
      this.isLoading = false;
    }
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
        'CongnonccColFilter', // Thay đổi key storage
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
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = 'side';
        }
      });
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
      'CongnonccColFilter', // Thay đổi key storage
      JSON.stringify(this.FilterColumns)
    );
  }
  
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  
  @memoize()
  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listdathang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
    const query = event.target.value.toLowerCase();  
  }
  
  ListFilter:any[] = []
  ChosenItem(item:any,column:any)
  {
    const CheckItem = this.dataSource.filteredData.filter((v:any)=>v[column]===item[column]);
    const CheckItem1 = this.ListFilter.filter((v:any)=>v[column]===item[column]);
    if(CheckItem1.length>0)
    {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    }
    else{
      this.ListFilter = [...this.ListFilter,...CheckItem];
    }
  }
  
  ChosenAll(list:any)
  {
    list.forEach((v:any) => {
      const CheckItem = this.ListFilter.find((v1)=>v1.id===v.id)?true:false;
      if(CheckItem)
        {
          this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
        }
        else{
          this.ListFilter.push(v);
        }
    });
  }
  
  ResetFilter()
  {
    this.ListFilter = this.Listdathang();
    this.dataSource.data = this.Listdathang();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  EmptyFiter()
  {
    this.ListFilter = [];
  }
  
  CheckItem(item:any)
  {
    return this.ListFilter.find((v)=>v.id===item.id)?true:false;
  }
  
  ApplyFilterColum(menu:any)
  {    
    this.dataSource.data = this.Listdathang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/congnoncc', 0]);
  }
  
  goToDetail(item: any): void {
    this._DathangService.setDathangId(item.id); // Thay đổi từ setDonhangId
    this.drawer.open();
    this._router.navigate(['admin/congnoncc', item.id]);
  }
  
  editDathang: any[] = []; // Thay đổi từ editDonhang
  ToggleAll(): void {
    if (this.editDathang.length === this.dataSource.filteredData.length) {
      this.editDathang = [];
    } else {
      this.editDathang = [...this.dataSource.filteredData];
    }
  }

  async ExportExcel(data: any[], filename: string = 'CongnoNCC'): Promise<void> {
    this.isExporting = true;
    try {
      if (!data || data.length === 0) {
        this._snackBar.open('Không có dữ liệu để xuất', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-warning']
        });
        return;
      }

      // Chuyển đổi dữ liệu cho Excel
      const excelData = data.map((item, index) => ({
        'STT': index + 1,
        'Ngày Giao': item.ngaygiao ? new Date(item.ngaygiao).toLocaleDateString('vi-VN') : '',
        'Mã Đặt Hàng': item.madathang || '',
        'Mã Nhà Cung Cấp': item.manhacungcap || '',
        'Tên Nhà Cung Cấp': item.tennhacungcap || '',
        'Số Lượng': item.soluong || 0,
        'Tổng': item.tong || 0,
        'Tổng VAT': item.tongvat || 0,
        'Tổng Tiền': item.tongtien || 0
      }));

      await writeExcelFile(excelData, `${filename}_${new Date().toISOString().split('T')[0]}`);
      
      this._snackBar.open('Xuất Excel thành công', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      this._snackBar.open('Lỗi khi xuất Excel', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    } finally {
      this.isExporting = false;
    }
  }

  // Các method khác giữ nguyên logic nhưng thay đổi naming theo nhà cung cấp/đặt hàng
}

function memoize() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const cache = new Map();
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };
}

function Debounce(delay: number = 300) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout: any;
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => originalMethod.apply(this, args), delay);
    };
  };
}
