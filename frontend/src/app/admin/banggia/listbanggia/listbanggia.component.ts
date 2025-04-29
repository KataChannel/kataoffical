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
import { BanggiaService } from '../banggia.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import moment from 'moment';
import { SanphamService } from '../../sanpham/sanpham.service';
@Component({
  selector: 'app-listbanggia',
  templateUrl: './listbanggia.component.html',
  styleUrls: ['./listbanggia.component.scss'],
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
export class ListBanggiaComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'title',
    'type',
    'sanpham',
    'khachhang',
    'batdau',
    'ketthuc',
    //  'order',
    'status',
    // 'isActive',
    'createdAt',
  ];
  ColumnName: any = {
    title: 'Tiêu Đề',
    type: 'Loại',
    sanpham: 'Sản Phẩm',
    khachhang: 'Khách Hàng',
    batdau: 'Bắt Đầu',
    ketthuc: 'Kết Thúc',
    status: 'Tình Trạng',
    createdAt:'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('BanggiaColFilter') || '[]'
  );
  Columns: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  Listbanggia:any = this._BanggiaService.ListBanggia;
  dataSource = new MatTableDataSource([]);
  banggiaId:any = this._BanggiaService.banggiaId;
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
    await this._BanggiaService.getAllBanggia();
    this.CountItem = this.Listbanggia().length;
    this.dataSource = new MatTableDataSource(this.Listbanggia());
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
   await this._BanggiaService.getAllBanggia();
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
      localStorage.setItem('BanggiaColFilter',JSON.stringify(this.FilterColumns)
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
    this.dataSource.filteredData = this.Listbanggia().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.Listbanggia();
    this.dataSource.data = this.Listbanggia();
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

    this.dataSource.data = this.Listbanggia().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
    localStorage.setItem('BanggiaColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/banggia', 0]);
  }
  goToDetail(item: any): void {
     this._BanggiaService.setBanggiaId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/banggia', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'DSBanggiaImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
  this.DoImportData(data);
  }
  DoImportData(data:any)
  {
    console.log(data);
    
    const transformedData = data.map((v: any) => ({
      mabanggia: v.mabanggia?.trim()||'',
      title: v.title?.trim()||'',
      batdau: moment(v.batdau,"DD/MM/YYYY").toDate()||moment().toDate(),
      ketthuc: moment(v.ketthuc,"DD/MM/YYYY").toDate()||moment().toDate(),
      ghichu: v.ghichu?.trim()||'',
      status: v.status?.trim()||'',
   }));
   console.log(transformedData);
   
   // Filter out duplicate mabanggia values
   const uniqueData = transformedData.filter((value:any, index:any, self:any) => 
      index === self.findIndex((t:any) => (
        t.mabanggia === value.mabanggia
      ))
   )
    const listId2 = uniqueData.map((v: any) => v.mabanggia);
    const listId1 = this._BanggiaService.ListBanggia().map((v: any) => v.mabanggia);
    const listId3 = listId2.filter((item:any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
        const item = this._BanggiaService.ListBanggia().find((v1) => v1.mabanggia === v.mabanggia);
        if (item) {
          const item1 = { ...item, ...v };
          // await this._BanggiaService.updateBanggia(item1);
        }
        else{
          await this._BanggiaService.CreateBanggia(v);
        }
      });
     const disableItem = listId3.map(async (v: any) => {
        const item = this._BanggiaService.ListBanggia().find((v1) => v1.mabanggia === v);
        // item.isActive = false;
        await this._BanggiaService.updateBanggia(item);
      });
      Promise.all([...createuppdateitem, ...disableItem]).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
       // window.location.reload();
      });
  }
  async ImporExcel(event: any) {
  const data = await readExcelFile(event)
  this.DoImportData(data);
  }   
  async ExportExcel(data:any,title:any) {
    await this._SanphamService.getAllSanpham()
    const ListSP = this._SanphamService.ListSanpham()
    const result = this.convertToData3(data,ListSP)
    writeExcelFile(result,title);
  }

  convertToData3(data: any, data2: any) {
    const pricingTables = new Set(data.map((item: any) => item.mabanggia));
    return data2.map((product: any) => ({
      masp: product.masp,
      title: product.title,
      giagoc: product.giagoc.toString(),
      ...Array.from(pricingTables).reduce((acc: Record<string, string>, table:any) => {
        acc[table] = product.giagoc.toString();
        return acc;
      }, {} as Record<string, string>)
    }));
  }

// // Execute conversion
// const data3 = convertToData3(data, data2);

// // Output result (for demonstration)
// console.log(JSON.stringify(data3, null, 2));


  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }
    ListStatus: any[] = [
    { value: 'baogia', title: 'Báo Giá' },
    { value: 'dangban', title: 'Đang Bán' },
    { value: 'ngungban', title: 'Ngừng Bán' },
  ];
  getName(list:any,field:any,value:any){    
    return list.find((v:any)=>v[field]===value);
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