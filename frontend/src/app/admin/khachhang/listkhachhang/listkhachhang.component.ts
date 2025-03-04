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
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry,ColDef, AllCommunityModule, ClientSideRowModelModule, ColumnAutoSizeModule, RowSelectionModule,
} from 'ag-grid-community';
ModuleRegistry.registerModules([
  AllCommunityModule,
  RowSelectionModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  ]);
const vietnameseLocaleText = {
  page: 'Trang',
  to: 'đến',
  of: 'của',
  first: 'Đầu tiên',
  previous: 'Trước',
  next: 'Tiếp',
  last: 'Cuối cùng',
  filterOoo: 'Lọc...',
  equals: 'Bằng',
  notEqual: 'Không bằng',
  lessThan: 'Nhỏ hơn',
  greaterThan: 'Lớn hơn',
  contains: 'Chứa',
  startsWith: 'Bắt đầu bằng',
  endsWith: 'Kết thúc bằng',
  applyFilter: 'Áp dụng',
  resetFilter: 'Đặt lại',
  clearFilter: 'Xóa bộ lọc',
  noRowsToShow: 'Không có hàng để hiển thị',
  loadingOoo: 'Đang tải...',
  pagesize:'Số Lượng'
};
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
    AgGridAngular,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListKhachhangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
    'name',
    'makh',
    'namenn',
    'diachi',
    'quan',
    'email',
    'sdt',
    'mst',
    'gionhanhang',
    'banggia',
    'loaikh',
    // 'order',
    'isActive',
    'createdAt',
    'updatedAt',
  ];
  
  ColumnName: any = {
    STT: 'STT',
    name: 'Tên',
    makh: 'Mã KH',
    namenn: 'Tên NN',
    diachi: 'Địa Chỉ',
    quan: 'Quận',
    email: 'Email',
    sdt: 'SĐT',
    mst: 'MST',
    gionhanhang: 'Giờ Nhận Hàng',
    banggia: 'Bảng Giá',
    loaikh: 'Loại KH',
   // order: 'Thứ Tự',
    isActive: 'Trạng Thái',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật'
  };

  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('KhachhangColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
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
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }
  


  @ViewChild('agGrid') agGrid!: AgGridAngular;
  // Column Definitions: Define the structure of the grid columns
  columnDefs: ColDef[] = 
  [
    { headerName: 'Name', field: 'name', sortable: true, filter: true},
    { headerName: 'Mã KH', field: 'makh', sortable: true, filter: true },
    { headerName: 'Tên NN', field: 'namenn', sortable: true, filter: true },
    { headerName: 'Địa Chỉ', field: 'diachi', sortable: true, filter: true },
    { headerName: 'Quận', field: 'quan', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'SĐT', field: 'sdt', sortable: true, filter: true },
    { headerName: 'MST', field: 'mst', sortable: true, filter: true },
    { headerName: 'Giờ Nhận Hàng', field: 'gionhanhang', sortable: true, filter: true },
    { headerName: 'Bảng Giá', field: 'banggia', sortable: true, filter: true },
    { headerName: 'Loại KH', field: 'loaikh', sortable: true, filter: true },
    { headerName: 'Order', field: 'order', sortable: true, filter: true },
    { headerName: 'Trạng Thái', field: 'isActive', sortable: true, filter: true },
    { headerName: 'Ngày Tạo', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'Ngày Cập Nhật', field: 'updatedAt', sortable: true, filter: true }
  ];
  // Row Data: Sample data to display in the grid
  rowData = []
  
  // [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxster', price: 72000 }
  // ];

  // Default Column Settings (applied to all columns unless overridden)
  defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  // Grid Options
  gridOptions = {
    pagination: true,
    paginationPageSize: 20,
    localeText: vietnameseLocaleText,
    rowSelection: 'single' as const, // Change this to 'single' or 'multiple'
    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit();
      console.log('Grid is ready!');
      if (params.api) {
        console.log('Total Rows:', params.api.getDisplayedRowCount());
        console.log('Pagination Total Items:', params.api.paginationGetRowCount());
        console.log('Current Page:', params.api.paginationGetCurrentPage());
        params.api.sizeColumnsToFit();
        setTimeout(() => {
          if (this.agGrid && this.agGrid.api) {
            console.log('Rows via ViewChild:', this.agGrid.api.getDisplayedRowCount());
          }
        }, 100);
      } else {
        console.log('Grid API is not available');
      }
    }
  };

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
  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log(this.dataSource.filter);
    
  }
  async ngOnInit(): Promise<void> {    
  //  await this._KhachhangService.getAllKhachhang();
    await this._KhachhangService.fetchKhachhangs();
    this._KhachhangService.listenKhachhangUpdates();
    this.dataSource = new MatTableDataSource(this.Listkhachhang());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
    this.CountItem = this.Listkhachhang().length;
    this.initializeColumns();
    this.setupDrawer();
    this.rowData =this.Listkhachhang()
    console.log(this.rowData);
    
    // this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    // this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    // this.paginator._intl.previousPageLabel = 'Về Trước';
    // this.paginator._intl.firstPageLabel = 'Trang Đầu';
    // this.paginator._intl.lastPageLabel = 'Trang Cuối';
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
    console.log(item);
    this.columnDefs = this.columnDefs.map(colDef => {
      if (colDef.field === item.key) {
        return { ...colDef, hide: !item.isShow };
      }
      return colDef;
    });
    // this.agGrid.api.setColumnDefs(this.columnDefs);
    console.log(this.columnDefs);
    
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
  DoImportData(data:any)
  {
    const transformedData = data.map((v: any) => ({
      makh: v.makh?.trim()||'',
      name: v.name?.trim()||'',
      namenn: v.namenn?.trim()||'',
      diachi: v.diachi?.trim()||'',
      quan: v.quan?.trim()||'',
      email: v.email?.trim()||'',
      sdt: v.sdt?.trim()||'',
      mst: v.mst?.trim()||'',
      gionhanhang: v.gionhanhang?.trim()||'',
      banggia: v.banggia?.trim()||'',
      loaikh: v.loaikh?.trim()||'',
   }));




   // Filter out duplicate makh values
   const uniqueData = transformedData.filter((value:any, index:any, self:any) => 
      index === self.findIndex((t:any) => (
        t.makh === value.makh
      ))
   )
    const listId2 = uniqueData.map((v: any) => v.makh);
    const listId1 = this._KhachhangService.ListKhachhang().map((v: any) => v.makh);
    const listId3 = listId2.filter((item:any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
        const item = this._KhachhangService.ListKhachhang().find((v1) => v1.makh === v.makh);
        if (item) {
          const item1 = { ...item, ...v };
          await this._KhachhangService.updateKhachhang(item1);
        }
        else{
          await this._KhachhangService.CreateKhachhang(v);
        }
      });
     const disableItem = listId3.map(async (v: any) => {
        const item = this._KhachhangService.ListKhachhang().find((v1) => v1.makh === v);
        item.isActive = false;
        await this._KhachhangService.updateKhachhang(item);
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
  ExportExcel(data:any,title:any) {
    writeExcelFile(data,title);
  }
}