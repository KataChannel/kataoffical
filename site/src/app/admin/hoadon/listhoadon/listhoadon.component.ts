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
import { HoadonService } from '../hoadon.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { StorageService } from '../../../shared/utils/storage.service';

@Component({
  selector: 'app-listhoadon',
  templateUrl: './listhoadon.component.html',
  styleUrls: ['./listhoadon.component.scss'],
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
    SearchfilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListHoadonComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    khhdon: 'Ký hiệu hóa đơn',
    nbmst: 'Người bán MST',
    khmshdon: 'KHMS Hóa Đơn',
    shdon: 'Số Hóa Đơn',
    thlap: 'Tháng Lập',
  };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('HoadonColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _HoadonService: HoadonService = inject(HoadonService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _StorageService: StorageService = inject(StorageService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listhoadon = this._HoadonService.ListHoadon;
  page = this._HoadonService.page;
  pageCount = this._HoadonService.pageCount;
  total = this._HoadonService.total;
  pageSize = this._HoadonService.pageSize;
  hoadonId = this._HoadonService.hoadonId;
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  Detail: any=this._StorageService.getItem('Hoadon') || {type:'banra'};
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listhoadon();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this._HoadonService.listenHoadonUpdates();
    await this._HoadonService.getAllHoadon(this.pageSize(),true);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listhoadon());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
  }

  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('HoadonColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }

    async fetchData(startMonth?: number) {
      this._StorageService.setItem('Hoadon', this.Detail);
      for (let m = startMonth ?? 0; m < 12; m++) {
        const startDay = 1;
        const daysInMonth = new Date(Number(this.Detail.nam), m + 1, 0).getDate();
        const batdau = `${String(startDay).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${this.Detail.nam}T00:00:00`;
        const ketthuc = `${String(daysInMonth).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${this.Detail.nam}T23:59:59`;
        this.Detail.batdau = batdau;
        this.Detail.ketthuc = ketthuc;
        let shouldContinue = true;
        while (shouldContinue) {
          const fetchData = await this._HoadonService.fetchData({ ...this.Detail });
          if (fetchData.datas.length === 50) {
            this.Detail.state = fetchData.state;
            this._StorageService.setItem('Hoadon', this.Detail);
            // continue the loop to fetch again
          } else {
            this.Detail.state = '';
            this._StorageService.setItem('Hoadon', this.Detail);
            shouldContinue = false; // exit the loop for this month
          }
          // Tăng thời gian chờ lên 1500ms để tránh treo server
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
      // Sau khi chạy xong 12 tháng, thực hiện các bước tiếp theo ở đây
      await this.refresh();
      this._snackBar.open('Đã hoàn thành lấy dữ liệu 12 tháng', '', {
        duration: 1500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }




   async refresh() {
     await this._HoadonService.getAllHoadon();
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUpdatedCodeIds() {
    await this._HoadonService.getUpdatedCodeIds();
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
    this.dataSource.filteredData = this.Listhoadon().filter((v: any) => 
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
    this.ListFilter = this.Listhoadon();
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listhoadon().filter((v: any) => 
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
    localStorage.setItem('HoadonColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/hoadon', 'new']);
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
      this._HoadonService.DeleteHoadon(item);
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
    this._HoadonService.setHoadonId(item.id);
    this._router.navigate(['admin/hoadon', item.id]);
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
    const existingHoadon = this._HoadonService.ListHoadon();
    const existingMasp = existingHoadon.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingHoadon.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._HoadonService.updateHoadon(updatedItem);
      } else {
        await this._HoadonService.CreateHoadon(v);
      }
    }));
    await Promise.all(existingHoadon
      .filter(sp => !uniqueData.some((item: any) => item.masp === sp.masp))
      .map(sp => this._HoadonService.updateHoadon({ ...sp, isActive: false }))
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
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu,
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
    this._HoadonService.page.set(1);
    this._HoadonService.getAllHoadon(size, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._HoadonService.page.set(this.page() - 1);
      this._HoadonService.getAllHoadon(this.pageSize(), true);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._HoadonService.page.set(this.page() + 1);
      this._HoadonService.getAllHoadon(this.pageSize(), true);
    }
  }
}