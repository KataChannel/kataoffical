import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DonhangService } from '../../donhang/donhang.service';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateHelpers } from '../../../shared/utils/date-helpers';
@Component({
  selector: 'app-listphieuchuyen',
  templateUrl: './listphieuchuyen.component.html',
  styleUrls: ['./listphieuchuyen.component.scss'],
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
    MatDatepickerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPhieuchuyenComponent {
  displayedColumns: string[] = [
    'ngaygiao',
    'name',
    'soluong',
    'chuyen',
    'diachi',
    'sdt',
    'gionhanhang',
    'tongsomon',
    'soluongtt',
    'shipper',
    'giodi',
    'giove',
    'kynhan',
  ];
  ColumnName: any = {
    ngaygiao: 'Ngày giao',
    name: 'Tên khách hàng',
    soluong: 'Số lượng',
    chuyen: 'Chuyến',
    sdt: 'Số điện thoại',
    gionhanhang: 'Giờ nhận hàng',
    tongsomon: 'Tổng số món',
    soluongtt: 'Số lượng TT',
    diachi: 'Địa chỉ',
    shipper: 'Shipper',
    giodi: 'Giờ đi',
    giove: 'Giờ về',
    kynhan: 'Ký nhận',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('PhieuchuyenColFilter') || '[]'
  );
  Columns: any[] = [];
  //pagination
  totalItems = 0;
  pageSize = 100;
  currentPage = 1;
  totalPages = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _PhieuchuyenService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  Listphieuchuyen:any = this._PhieuchuyenService.ListDonhang;
  EditList:any=[];
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  isSearch: boolean = false;  SearchParams: any = {
      Batdau: DateHelpers.now(),
      Ketthuc: DateHelpers.now(),
      Status:'dadat'
    };
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
    effect(() => {
      this.dataSource.data = this.Listphieuchuyen();
      this.totalItems = this.Listphieuchuyen().length;
      this.calculateTotalPages();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDateChange(event: any): void {
    this.ngOnInit()
  }
  async ngOnInit(): Promise<void> {    
    this.updateDisplayData();
    await this._PhieuchuyenService.Phieuchuyen(this.SearchParams);
    this.dataSource = new MatTableDataSource(this.Listphieuchuyen());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
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
      localStorage.setItem('PhieuchuyenColFilter',JSON.stringify(this.FilterColumns)
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
    this.dataSource.filteredData = this.Listphieuchuyen().filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.Listphieuchuyen();
    this.dataSource.data = this.Listphieuchuyen();
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
    this.dataSource.data = this.Listphieuchuyen().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
    localStorage.setItem('PhieuchuyenColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/phieuchuyen', 'new']);
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
  ExportExcel(data:any,title:any) {
    const dulieu = data.map((v: any) => ({
      ngaygiao: moment(v.ngaygiao).format('DD/MM/YYYY'),
      name: v.name,
      soluong: v.soluongtt,
      chuyen: v.chuyen,
      sdt: v.sdt,
      gionhanhang: v.gionhanhang,
      tongsomon: v.tongsomon,
      soluongtt: v.soluongtt,
      diachi: v.diachi,
      shipper: v.shipper,
      giodi: v.giodi,
      giove: v.giove,
      kynhan: v.kynhan,
    }));
    writeExcelFile(dulieu,title,Object.values(this.ColumnName),this.ColumnName);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }

calculateTotalPages() {
  this.totalPages = Math.ceil(this.totalItems / this.pageSize);
}

onPageSizeChange(size: number,menuHienthi:any) {
  if(size>this.Listphieuchuyen().length){
    this.pageSize = this.Listphieuchuyen().length;
    this._snackBar.open(`Số lượng tối đa ${this.Listphieuchuyen().length}`, '', {
      duration: 1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar-success'],
    });
  }
  else {
    this.pageSize = size;
  }
  this.currentPage = 1; // Reset to first page when changing page size
  this.calculateTotalPages();
  this.updateDisplayData();
  menuHienthi.closeMenu();
}

onPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayData();
  }
}

onNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayData();
  }
}

updateDisplayData() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  const pageData = this.Listphieuchuyen().slice(startIndex, endIndex);
  this.dataSource.data = pageData;
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