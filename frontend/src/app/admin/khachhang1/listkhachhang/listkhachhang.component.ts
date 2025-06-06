import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, ViewChild } from '@angular/core';
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
import { KhachhangService } from '../khachhang.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, readExcelFileNoWorker, writeExcelMultiple } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
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
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListKhachhangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'makh',
    'name',
    'diachi',
    'quan',
    'email',
    'sdt',
    'mst',
    'gionhanhang',
    'loaikh',
    'ghichu',
    'isActive',
    'createdAt',
  ];

  ColumnName: any = {
    makh: 'Mã Khách Hàng',
    name: 'Tên Khách Hàng',
    diachi: 'Địa Chỉ',
    quan: 'Quận',
    email: 'Email',
    sdt: 'Số Điện Thoại',
    mst: 'Mã Số Thuế',
    gionhanhang: 'Giờ Nhận Hàng',
    loaikh: 'Loại Khách Hàng',
    ghichu: 'Ghi Chú',
    isActive: 'Trạng Thái',
    createdAt: 'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('KhachhangColFilter') || '[]'
  );
  Columns: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _KhachhangService: KhachhangService = inject(KhachhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  Listkhachhang:any = this._KhachhangService.ListKhachhang;
  dataSource = new MatTableDataSource([]);
  khachhangId:any = this._KhachhangService.khachhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  isSearch: boolean = false;
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async ngOnInit(): Promise<void> {    
    await this._KhachhangService.getAllKhachhang();
    this.CountItem = this.Listkhachhang().length;
    this.dataSource = new MatTableDataSource(this.Listkhachhang());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }
  async refresh() {
   await this._KhachhangService.getAllKhachhang();
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
      localStorage.setItem('KhachhangColFilter',JSON.stringify(this.FilterColumns)
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
    this.dataSource.filteredData = this.Listkhachhang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
    const query = event.target.value.toLowerCase();  
  }
  ListFilter:any[] =[]
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
    this.ListFilter = this.Listkhachhang();
    this.dataSource.data = this.Listkhachhang();
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

    this.dataSource.data = this.Listkhachhang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    localStorage.setItem('KhachhangColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/khachhang', 0]);
  }
  goToDetail(item: any): void {
     this._KhachhangService.setKhachhangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/khachhang', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'KHImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   console.log(data);
   this.DoImportData(data);
  }
  async DoImportData(data:any)
  {
    const transformedData = data.map((v: any) => ({
      name: v.name?.trim()||'',
      makh: v.makh?.trim()||'',
      namenn: v.namenn?.trim()||'',
      diachi: v.diachi?.trim()||'',
      quan: v.quan?.trim()||'',
      email: v.email?.trim()||'',
      sdt: v.sdt?.trim()||'',
      mst: v.mst?.trim()||'',
      gionhanhang: v.gionhanhang?.trim()||'',
      loaikh: v.loaikh?.trim()||'khachsi',
      hiengia:true,
      ghichu: v.ghichu?.trim()||'', 
   }));
    await this._KhachhangService.ImportKhachhang(transformedData);
    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  async ImportExcel(event: any) {
    const data = await readExcelFileNoWorker(event, 'khachhang');
    if (!Array.isArray(data) || data.some(item => typeof item !== 'object' || item === null)) {
      this._snackBar.open('Dữ liệu không đúng định dạng. Vui lòng kiểm tra file Excel.', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }
    this.DoImportData(data);
  }   
  ExportExcel(data:any,title:any) {
    let khachhang = [];
    if(!data || data.length === 0) {
      khachhang =[
        {
          name: '',
          makh: '',
          namenn: '',
          diachi: '',
          quan: '',
          email: '',
          sdt: '',
          mst: '',
          gionhanhang: '',
          loaikh: 'khachsi',
          hiengia: true,
          ghichu: ''
        }
      ]
    }
    else {
      khachhang = data.map((v: any) => ({
          name: v.name?.trim()||'',
          makh: v.makh?.trim()||'',
          namenn: v.namenn?.trim()||'',
          diachi: v.diachi?.trim()||'',
          quan: v.quan?.trim()||'',
          email: v.email?.trim()||'',
          sdt: v.sdt?.trim()||'',
          mst: v.mst?.trim()||'',
          gionhanhang: v.gionhanhang?.trim()||'',
          loaikh: v.loaikh?.trim()||'khachsi',
          hiengia:true,
          ghichu: v.ghichu?.trim()||''
        }))
    }   
    writeExcelMultiple({khachhang},title);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
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