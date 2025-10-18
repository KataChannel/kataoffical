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
import { BanggiaService } from '../banggia-graphql.service'; // Sử dụng GraphQL service
import { MatMenuModule } from '@angular/material/menu';
import { excelSerialDateToJSDate, readExcelFile, readExcelFileNoWorker, writeExcelFile, writeExcelFileSheets } from '../../../shared/utils/exceldrive.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import moment from 'moment';
import { SanphamService } from '../../sanpham/sanpham.service';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { BanggiaService as BanggiaGraphqlService } from '../banggia-graphql.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { DonhangService } from '../../donhang/donhang.service';
import { DathangService } from '../../dathang/dathang.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { signal } from '@angular/core';
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
    MatTooltipModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBanggiaComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'mabanggia',
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
    mabanggia: 'Mã Bảng Giá',
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
  
  // New properties for EditList functionality
  EditList: any[] = [];
  isLoading = signal<boolean>(false);
  dialog = inject(MatDialog);

  private _BanggiaGraphqlService: BanggiaGraphqlService = inject(BanggiaGraphqlService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  dataSource = new MatTableDataSource<any>([]);
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
    try {
      // Lấy tất cả bảng giá sử dụng GraphQL
      const banggiaData = await this._GraphqlService.findMany('banggia', {
        include: {
          khachhang: {select : { id: true, name: true }},
          sanpham: {
            select : { id: true, sanphamId: true }
          },
        },
        take:99999,
        orderBy: { createdAt: 'desc' }
      });
      const result = banggiaData.map((v)=>{
        return {
          ...v,
          sanpham: v.sanpham.length,
          khachhang: v.khachhang.length
        }
      })  
      this.CountItem = result.length;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();

    } catch (error) {
      console.error('Lỗi khởi tạo danh sách bảng giá:', error);
    }
  }
  async refresh() {
    try {
      // Lấy tất cả bảng giá sử dụng GraphQL
      const banggiaData = await this._GraphqlService.findMany('banggia', {
        include: {
          banggiaKhachhang: {
            include: {
              khachhang: {
                select: { id: true, title: true, ma: true }
              }
            }
          },
          banggiaSanpham: {
            include: {
              sanpham: {
                select: { id: true, title: true, masp: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      this.dataSource.data = banggiaData;
      this.CountItem = banggiaData.length;

    } catch (error) {
      console.error('Lỗi làm mới danh sách bảng giá:', error);
      this._snackBar.open('Có lỗi xảy ra khi làm mới danh sách', 'Đóng', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
        duration: 3000
      });
    }
  }
  async Banggiamacdinh(item: any) {
    try {
      // Cập nhật giá bán mặc định cho tất cả sản phẩm từ bảng giá này sử dụng GraphQL
      const banggiaSanpham = await this._GraphqlService.findMany('banggiasanpham', {
        where: { banggiaId: item.id },
        include: {
          sanpham: {
            select: { id: true, masp: true, title: true }
          }
        }
      });

      // Batch update giá bán cho tất cả sản phẩm
      const updatePromises = banggiaSanpham.map((bgsp: any) => 
        this._GraphqlService.updateOne('sanpham', 
          { id: bgsp.sanphamId }, 
          { giaban: bgsp.giaban }
        )
      );

      await Promise.all(updatePromises);

      this._snackBar.open(
        `Đã cập nhật giá bán mặc định cho ${banggiaSanpham.length} sản phẩm từ bảng giá ${item.title}`, 
        'Đóng', 
        {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
          duration: 3000
        }
      );

    } catch (error) {
      console.error('Lỗi cập nhật giá bán mặc định:', error);
      this._snackBar.open('Có lỗi xảy ra khi cập nhật giá bán', 'Đóng', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
        duration: 3000
      });
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
    this.dataSource.filteredData = this.dataSource.data.filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.dataSource.data;
    this.dataSource.data = this.dataSource.data;
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
    this.dataSource.data = this.dataSource.data.filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
    this._router.navigate(['admin/banggia', 'new']);
  }
  goToDetail(item: any): void {
    // Don't pre-set ID here - let detailbanggia component handle it via route params
    // This prevents the "Same ID - no action needed" bug
    this.drawer.open();
    this._router.navigate(['admin/banggia', item.id]);
  }
convertDataToData1(
  data: Array<{ masp: string; title: string; giagoc: any; [key: string]: any }>
): Array<{
  mabanggia: string;
  title: string;
  sanpham: Array<{ masp: string; title: string; giagoc: any }>;
}> {
  if (!data || data.length === 0) {
    return [];
  }

  // Extract keys representing price boards (excluding masp, title, giagoc)
  const boardKeys = Object.keys(data[0]).filter(
    (key) => !['masp', 'title', 'giagoc'].includes(key)
  );

  // For each board key, create an object with a list of products
  const data1 = boardKeys.map((boardKey) => ({
    mabanggia: boardKey,
    title: `Bảng giá ${boardKey.replace('BG', '')}`,
    sanpham: data.map((sp) => ({
      masp: sp.masp,
      title: sp.title,
      giagoc: sp.giagoc,
      giaban: sp[boardKey] || 0,
    })),
  }));

  return data1;
}


  async DoImportData(data: any) {
    try {
      if (!data.SPBG || !data.BG || !data.BGKH) {
        this._snackBar.open('SPBG hoặc BG hoặc BGKH không tồn tại', '', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Import bảng giá mới
      const ListBG = (data.BG || []).map((v: any) => ({
        mabanggia: v.mabanggia,
        type: v.type,
        batdau: moment(excelSerialDateToJSDate(v.batdau)).toDate(),
        ketthuc: moment(excelSerialDateToJSDate(v.ketthuc)).toDate(),
        ghichu: v.ghichu,
        status: v.status,
      })).filter((v: any) => v.mabanggia !== undefined && v.mabanggia !== null && v.mabanggia !== '');

      // Tạo bảng giá mới sử dụng GraphQL
      for (const bg of ListBG) {
        await this._GraphqlService.createOne('banggia', {
          mabanggia: bg.mabanggia,
          type: bg.type,
          batdau: bg.batdau,
          ketthuc: bg.ketthuc,
          ghichu: bg.ghichu,
          status: bg.status
        });
      }

      // Import sản phẩm bảng giá
      const ListData = this.convertDataToData1(data.SPBG);
      for (const item of ListData) {
        await this._GraphqlService.createOne('banggiasanpham', item);
      }

      // Import khách hàng bảng giá
      const BGKH = (data.BGKH || []).map((v: any) => ({
        mabanggia: v.mabanggia,
        name: v.name,
        makh: v.makh,
      }));

      for (const kh of BGKH) {
        await this._GraphqlService.createOne('banggiaKhachhang', kh);
      }

      this._snackBar.open('Import Thành Công', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });

      // Refresh lại danh sách
      await this.refresh();

    } catch (error) {
      console.error('Lỗi import dữ liệu:', error);
      this._snackBar.open('Có lỗi xảy ra khi import dữ liệu', 'Đóng', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
        duration: 3000
      });
    }
  }

  async ImportExcel(event: any) {
    const data = await readExcelFileNoWorker(event);
    this.DoImportData(data);
  }
  async ExportExcel(data: any, title: any) {
    try {
      // Lấy tất cả sản phẩm sử dụng GraphQL
      const ListSP = await this._GraphqlService.findMany('sanpham', {
        select: { id: true, masp: true, title: true, giaban: true }
      });

      const result = this.convertToData3(data, ListSP);

      // Lấy tất cả bảng giá với khách hàng sử dụng GraphQL
      const Banggia = await this._GraphqlService.findMany('banggia', {
        include: {
          banggiaKhachhang: {
            include: {
              khachhang: {
                select: { id: true, ma: true, title: true }
              }
            }
          }
        }
      });

      const ListKH = Banggia.reduce((acc: any[], v: any) => {
        if (Array.isArray(v.banggiaKhachhang)) {
          v.banggiaKhachhang.forEach((bgkh: any) => {
            acc.push({
              mabanggia: v.mabanggia,
              makh: bgkh.khachhang.ma,
              name: bgkh.khachhang.title,
            });
          });
        }
        return acc;
      }, []);

      const BanggiaExport = Banggia.map((v: any) => {
        return {
          mabanggia: v.mabanggia,
          type: v.type,
          batdau: moment(v.batdau).format('DD/MM/YYYY'),
          ketthuc: moment(v.ketthuc).format('DD/MM/YYYY'),
          ghichu: v.ghichu,
          status: v.status,
        };
      });

      writeExcelFileSheets({ 
        'SPBG': { data: result }, 
        'BG': { data: BanggiaExport }, 
        'BGKH': { data: ListKH } 
      }, title);

    } catch (error) {
      console.error('Lỗi export Excel:', error);
      this._snackBar.open('Có lỗi xảy ra khi export dữ liệu', 'Đóng', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
        duration: 3000
      });
    }
  }
  convertToData3(data: any, data2: any) {
    const pricingTables = new Set(data.map((item: any) => item.mabanggia));
    return data2.map((product: any) => ({
      masp: product.masp,
      title: product.title,
      giaban: product.giaban.toString(),
      ...Array.from(pricingTables).reduce((acc: Record<string, string>, table:any) => {
        acc[table] = product.giaban.toString();
        return acc;
      }, {} as Record<string, string>)
    }));
  }
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

  /**
   * Toggle all items selection
   */
  ToggleAll(): void {
    if (this.EditList.length === this.dataSource.filteredData.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.dataSource.filteredData];
    }
  }

  /**
   * Add item to edit list
   */
  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }

  /**
   * Check if item is in edit list
   */
  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  /**
   * Open delete confirmation dialog
   */
  openDeleteDialog(template: any) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.DeleteListItem();
      }
    });
  }

  /**
   * Delete selected items using optimized bulk delete
   */
  async DeleteListItem(): Promise<void> {
    if (!this.EditList?.length) {
      this._snackBar.open('Không có mục nào được chọn để xóa', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    this.isLoading.set(true);
    try {
      // Use optimized bulk delete method
      const result = await this._BanggiaGraphqlService.DeleteBulkBanggia(this.EditList);

      this._snackBar.open(
        result.message || `Xóa thành công ${result.success} bảng giá${result.fail > 0 ? `, ${result.fail} lỗi` : ''}`,
        '',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: result.fail > 0 ? ['snackbar-warning'] : ['snackbar-success'],
        }
      );
      
      this.EditList = [];
      await this.ngOnInit();
    } catch (error: any) {
      console.error('Error deleting items:', error);
      this._snackBar.open(`Lỗi khi xóa: ${error.message}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
    }
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