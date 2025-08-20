import { AfterViewInit, Component, computed, effect, inject, TemplateRef, ViewChild } from '@angular/core';
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
import moment from 'moment';
import { PhieukhoService } from '../phieukho/phieukho.service';
import { KhoService } from '../kho/kho.service';
import { removeVietnameseAccents } from '../../shared/utils/texttransfer.utils';
import { SanphamService } from '../sanpham/sanpham.service';
import { readExcelFile, readExcelFileNoWorker, writeExcelFileWithSheets, writeExcelMultiple } from '../../shared/utils/exceldrive.utils';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { memoize, Debounce } from '../../shared/utils/decorators';
import { DathangService } from '../dathang/dathang.service';
import { DonhangService } from '../donhang/donhang.service';
import { TrangThaiDon } from '../../shared/utils/trangthai';
import { ChotkhoService } from '../chotkho/chotkho.service';
import { DetaildexuatComponent } from './detaildexuat/detaildexuat';
import { TimezoneService } from '../../shared/services/timezone.service';

@Component({
  selector: 'app-xuatnhapton',
  templateUrl: './xuatnhapton.component.html',
  styleUrls: ['./xuatnhapton.component.scss'],
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
    MatDialogModule,
    DetaildexuatComponent
  ],
})
export class XuatnhaptonComponent {
  isDexuat: boolean = true;
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
    'title',
    'ngay',
    'actions'
  ];

  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu đề chốt kho',
    ngay: 'Ngày chốt',
    actions: 'Thao tác'
  };

  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('ChotkhoColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  
  private _PhieukhoService: PhieukhoService = inject(PhieukhoService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _DathangService: DathangService = inject(DathangService);
  private _DonhangService: DonhangService = inject(DonhangService);
  private _KhoService: KhoService = inject(KhoService);
  private _ChotkhoService: ChotkhoService = inject(ChotkhoService);
  private _timezoneService: TimezoneService = inject(TimezoneService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  
  // Update to use chot kho data
  Xuatnhapton: any = this._ChotkhoService.ListChotkho;
  ListChotkho: any = this._ChotkhoService.ListChotkho;
  
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  
  SearchParams: any = {
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    page: 1,
    limit: 20
  };

  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'week';
  isSearch: boolean = false;
  ListKho: any = [];

  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource?.paginator?.firstPage();
    }
  }

  async LoadDondathang() {
    try {
      // Load chot kho data with date range
      const result = await this._ChotkhoService.getChotkhoByDateRange(this.SearchParams);
      console.log('Chot kho result:', result);
      
      if (result && result.data) {
        this.ListChotkho.set(result.data);
        this.dataSource.data = result.data;
        this.CountItem = result.total || result.data.length;
        
        // Update paginator if result has pagination info
        if (this.paginator) {
          this.paginator.length = result.total || result.data.length;
          this.paginator.pageIndex = (result.page || 1) - 1;
          this.paginator.pageSize = result.limit || 20;
        }
      }
      
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Error loading chot kho data:', error);
      this._snackBar.open('Lỗi khi tải dữ liệu chốt kho', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      // Load initial chot kho data
      const result = await this._ChotkhoService.getChotkhoByDateRange(this.SearchParams);
      console.log('Initial chot kho result:', result);
      
      if (result && result.data) {
        this.ListChotkho.set(result.data);
        this.dataSource.data = result.data;
        this.CountItem = result.total || result.data.length;
      }
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
      
      // Set up paginator labels
      if (this.paginator) {
        this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
        this.paginator._intl.nextPageLabel = 'Tiếp Theo';
        this.paginator._intl.previousPageLabel = 'Về Trước';
        this.paginator._intl.firstPageLabel = 'Trang Đầu';
        this.paginator._intl.lastPageLabel = 'Trang Cuối';
      }
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      this._snackBar.open('Lỗi khi khởi tạo dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  createchotkho() {
    this.drawer.open();
    this._router.navigate(['admin/xuatnhapton', 'new']);
  }

  // Method to view chot kho details
  viewChotkhoDetail(row: any) {
    this.drawer.open();
    window.location.href = `/admin/xuatnhapton/${row.id}`;
    // this._router.navigate(['admin/xuatnhapton', this._timezoneService.formatForDisplay(row.ngay, 'YYYY-MM-DD')]);
  }

  // Method to edit chot kho
  editChotkho(row: any) {
    this.drawer.open();
    window.location.href = `/admin/xuatnhapton/${row.id}`;
    // this._router.navigate(['admin/xuatnhapton', this._timezoneService.formatForDisplay(row.ngay, 'YYYY-MM-DD')]);
  }

  // Method to delete chot kho
  async deleteChotkho(row: any) {
    // if (confirm('Bạn có chắc chắn muốn xóa chốt kho này?')) {
      try {
        await this._ChotkhoService.DeleteChotkho(row);
        this._snackBar.open('Xóa chốt kho thành công', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        // Reload data
        // await this.LoadDondathang();
      } catch (error) {
        console.error('Error deleting chot kho:', error);
        this._snackBar.open('Lỗi khi xóa chốt kho', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    // }
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
      localStorage.setItem('ChotkhoColFilter', JSON.stringify(this.FilterColumns));
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
          if (this.paginator) {
            this.paginator.hidePageSize = true;
          }
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
    localStorage.setItem('ChotkhoColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
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
    const query = event.target.value.toLowerCase();
    console.log(query);
    console.log(column);

    this.dataSource.filteredData = this.ListChotkho().filter((v: any) => 
      removeVietnameseAccents(v[column]?.toString() || '').includes(query) || 
      (v[column]?.toString() || '').toLowerCase().includes(query)
    );
  }

  trackByFn(index: number, item: any): any {
    return item.id;
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
        this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    this.ListFilter = this.ListChotkho();
    this.dataSource.data = this.ListChotkho();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.ListChotkho().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  async ExportExcel(data: any, title: any) {
   await this._SanphamService.getAllSanpham() 
    const SP = this._SanphamService.ListSanpham().map((v: any) => ({
      subtitle: v.subtitle,
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
    }));
    const XNT = this.Xuatnhapton().map((v: any) => ({
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
      slton: v.slton,
    }))
    writeExcelMultiple({SP, XNT}, title);
  }

  async ImporExcel(event: any) {
    const files = Array.from(event.target.files) as File[];
    const data = await readExcelFileNoWorker(files[0], 'XNT');

    const phieuNhapDetails: any[] = [];
    const phieuXuatDetails: any[] = [];

    data.forEach((v: any) => {
      const exitItem = this.Xuatnhapton().find((item: any) => item.masp === v.masp);
      if (exitItem) {
        if (v.slton > exitItem.slton) {
          // Tính chênh lệch cho phiếu nhập
          phieuNhapDetails.push({
          sanphamId:this._SanphamService.ListSanpham().find((item:any)=>item.masp===v.masp).id, 
          soluong: v.slton - exitItem.slton,
          // thêm các trường cần thiết
          });
        } else if (v.slton < exitItem.slton) {
          // Tính chênh lệch cho phiếu xuất
          phieuXuatDetails.push({
          sanphamId:this._SanphamService.ListSanpham().find((item:any)=>item.masp===v.masp).id,
          soluong: exitItem.slton - v.slton,
          // thêm các trường cần thiết
          });
        }
      }
    });

    if (phieuNhapDetails.length > 0) {
      // Tạo phiếu nhập một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${this._timezoneService.nowLocal('DD/MM/YYYY ')}`, 
        type:'nhap',
        sanpham: phieuNhapDetails, 
        ghichu: `Cập nhật tồn kho lúc ${this._timezoneService.nowLocal('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: new Date()
      });
    }
    if (phieuXuatDetails.length > 0) {
      // Tạo phiếu xuất một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${this._timezoneService.nowLocal('DD/MM/YYYY ')}`, 
        type:'xuat',
        sanpham: phieuXuatDetails, 
        ghichu: `Cập nhật tồn kho lúc ${this._timezoneService.nowLocal('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: new Date()
      });
    }
    if (phieuNhapDetails.length > 0) {
      this._snackBar.open(`Điều chỉnh nhập kho với ${phieuNhapDetails.length} sản phẩm`, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
          });
    }
    if (phieuXuatDetails.length > 0) {
      this._snackBar.open(`Điều chỉnh xuất kho với ${phieuXuatDetails.length} sản phẩm`, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
    if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
            this._snackBar.open('Kho không thay đổi', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
  }

  private _dialog: MatDialog = inject(MatDialog);
  Trangthaidon: any = TrangThaiDon;
  ListDathang: any[] = [];
  ListDonhang: any[] = [];

  async XemDathang(row: any, template: TemplateRef<any>) {
    this.ListDathang = await this._DathangService.findbysanpham(row.sanphamId);
    console.log(this.ListDathang);

    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // Handle result
      }
    });
  }

  async XemDonhang(row: any, template: TemplateRef<any>) {
    this.ListDonhang = await this._DonhangService.findbysanpham(row.sanphamId);
    console.log(this.ListDonhang);
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // Handle result
      }
    });
  }

  TinhTong(items: any, fieldTong: any) {
    return (
      items?.reduce((sum: any, item: any) => sum + (Number(item?.sanpham[fieldTong]) || 0), 0) || 0
    );
  }

  // Date formatting helper methods for templates
  formatDate(date: any, format: string = 'DD/MM/YYYY'): string {
    if (!date) return '';
    return this._timezoneService.formatForDisplay(date, format);
  }

  formatDateTime(date: any): string {
    if (!date) return '';
    return this._timezoneService.formatForDisplay(date, 'DD/MM/YYYY HH:mm');
  }

  formatDateTimeSeconds(date: any): string {
    if (!date) return '';
    return this._timezoneService.formatForDisplay(date, 'HH:mm:ss DD/MM/YYYY');
  }
}