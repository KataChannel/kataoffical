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
import { HoadonchitietService } from '../hoadonchitiet.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { StorageService } from '../../../shared/utils/storage.service';
import { HoadonService } from '../../hoadon/hoadon.service';
import { SharepaginationComponent } from '../../../shared/common/sharepagination/sharepagination.component';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatDialogModule,
    SearchfilterComponent,
    SharepaginationComponent,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XuatnhaptonComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    ngay: 'Ngày',
    ma: 'Mã SP',
    sanpham: 'Tên Sản Phẩm',
    donvi: 'Đơn Vị Tính',
    ttdauNgay: 'TT Đầu Ngày',
    dauNgay: 'SL Đầu Ngày',
    nhapNgay: 'SL Nhập Ngày',
    ttnhapNgay: 'TT Nhập Ngày',
    xuatNgay: 'SL Xuất Ngày',
    ttxuatNgay:'TT Xuất Ngày',
    cuoiNgay: 'SL Cuối Ngày',
    ttcuoiNgay:'TT Cuối Ngày',
    thang: 'Tháng',
    tongNhapThang: 'Tổng Nhập Tháng',
    tongXuatThang: 'Tổng Xuất Tháng',
    cuoiThang: 'SL Cuối Tháng',
    // nam: 'Năm', 
    // tongNhapNam: 'Tổng Nhập Năm',
    // tongXuatNam: 'Tổng Xuất Năm',
    // cuoiNam: 'SL Cuối Năm',
  };

  FilterColumns: any[] = JSON.parse(localStorage.getItem('xuatnhaptonColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _HoadonchitietService: HoadonchitietService = inject(HoadonchitietService);
  private _HoadonService: HoadonService = inject(HoadonService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _StorageService: StorageService = inject(StorageService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listhoadonchitiet = this._HoadonchitietService.ListHoadonchitiet;
  page = this._HoadonchitietService.page;
  pageCount = this._HoadonchitietService.pageCount;
  total = this._HoadonchitietService.total;
  pageSize = this._HoadonchitietService.pageSize;
  hoadonchitietId = this._HoadonchitietService.hoadonchitietId;
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  token: any= this._StorageService.getItem('token') || '';
  hoadon_token: any= this._StorageService.getItem('hoadon_token') || '';
  Detail:any={thang:'01', nam:'2025'};
  SearchParams: any = {
      batdau: moment().toDate(),
      ketthuc: moment().toDate(),
      sizesp:10,
  };
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listhoadonchitiet();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this._HoadonchitietService.listenHoadonchitietUpdates();
    await this._HoadonchitietService.getXuatnhapton(this.SearchParams);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listhoadonchitiet());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
  }

  async fetchData() {
    await this._HoadonchitietService.getXuatnhapton(this.SearchParams);
  }
  getTotal(list: any[],field:any): number {
    return list?.reduce((acc: number, item: any) => acc + item[field], 0);
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async onPageChange(event: any): Promise<void> {    
    await this._HoadonchitietService.getXuatnhapton(this.SearchParams,Number(event.pageSize));
  }
  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('xuatnhaptonColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUpdatedCodeIds() {
    await this._HoadonchitietService.getUpdatedCodeIds();
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
    this.dataSource.filteredData = this.Listhoadonchitiet().filter((v: any) => 
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
    this.ListFilter = this.Listhoadonchitiet();
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listhoadonchitiet().filter((v: any) => 
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
    localStorage.setItem('xuatnhaptonColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/hoadonchitiet', 'new']);
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
      this._HoadonchitietService.DeleteHoadonchitiet(item);
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
    this._HoadonchitietService.setHoadonchitietId(item.id);
    this._router.navigate(['admin/hoadonchitiet', item.id]);
  }

  OpenLoadDrive(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // Handle action if needed
      }
    });
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
    const existingHoadonchitiet = this._HoadonchitietService.ListHoadonchitiet();
    const existingMasp = existingHoadonchitiet.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingHoadonchitiet.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._HoadonchitietService.updateHoadonchitiet(updatedItem);
      } else {
        await this._HoadonchitietService.CreateHoadonchitiet(v);
      }
    }));
    await Promise.all(existingHoadonchitiet
      .filter(sp => !uniqueData.some((item: any) => item.masp === sp.masp))
      .map(sp => this._HoadonchitietService.updateHoadonchitiet({ ...sp, isActive: false }))
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
      ngay: v.ngay,
      masp: v.masp,
      sanpham: v.sanpham,
      donvi: v.donvi,
      ttdauNgay: v.ttdauNgay,
      dauNgay: v.dauNgay,
      nhapNgay: v.nhapNgay,
      ttnhapNgay: v.ttnhapNgay,
      xuatNgay: v.xuatNgay,
      ttxuatNgay: v.ttxuatNgay,
      cuoiNgay: v.cuoiNgay,
      ttcuoiNgay: v.ttcuoiNgay,
      thang: v.thang,
      tongNhapThang: v.tongNhapThang,
      tongXuatThang: v.tongXuatThang,
      tongCuoiThang: v.tongCuoiThang,
      ttnhapThang: v.ttnhapThang,
      ttxuatThang: v.ttxuatThang,
      ttcuoiThang: v.ttcuoiThang,
      nam: v.nam,
      tongNhapNam: v.tongNhapNam,
      tongXuatNam: v.tongXuatNam,
      tongCuoiNam: v.tongCuoiNam,
      ttnhapNam: v.ttnhapNam,
      ttxuatNam: v.ttxuatNam,
      ttcuoiNam: v.ttcuoiNam,
    }));
    writeExcelFile(dulieu, title);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.total()) {
      this._snackBar.open(`Số lượng tối đa ${this.total()}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      size = this.total();
    }
    this._HoadonchitietService.page.set(1);
    this._HoadonchitietService.getAllHoadonchitiet(size, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._HoadonchitietService.page.set(this.page() - 1);
      this._HoadonchitietService.getAllHoadonchitiet(this.pageSize(), true);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._HoadonchitietService.page.set(this.page() + 1);
      this._HoadonchitietService.getAllHoadonchitiet(this.pageSize(), true);
    }
  }
}