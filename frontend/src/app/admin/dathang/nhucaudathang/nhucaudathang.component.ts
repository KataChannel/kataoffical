import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { MatSelectModule } from '@angular/material/select';
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
  convertToSlug,
  GenId,
} from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SanphamService } from '../../sanpham/sanpham.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { DathangService } from '../dathang.service';
import { TablenhucaudathanhComponent } from './tablenhucaudathanh/tablenhucaudathanh.component';
import moment from 'moment';
import { KhoService } from '../../kho/kho.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-nhucaudathang',
  templateUrl: './nhucaudathang.component.html',
  styleUrls: ['./nhucaudathang.component.scss'],
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
    TablenhucaudathanhComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NhucaudathangComponent {
  displayedColumns: string[] = [
    'title',
    'masp',
    'giagoc',
    'dvt',
    'slton',
    'slchogiao',
    'slchonhap',
    'haohut',
    'goiy',
  ];
  ColumnName: any = {
    title: 'Tên Sản Phẩm',
    masp: 'Mã Sản Phẩm',
    giagoc: 'Giá Gốc',
    dvt: 'Đơn Vị Tính',
    slton: 'Tồn',
    slchogiao: 'Chờ Giao',
    slchonhap: 'Chờ Nhập',
    haohut: 'Hao Hụt',
    goiy: 'Gợi Ý',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('NhucauColFilter') || '[]'
  );
  Columns: any[] = [];
  //pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _DathangService: DathangService = inject(DathangService);
  private _KhoService: KhoService = inject(KhoService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  Listsanpham: any = this._SanphamService.ListSanpham;
  EditList: any = [];
  dataSource = new MatTableDataSource<any>();
  sanphamId: any = this._SanphamService.sanphamId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  isSearch: boolean = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
    effect(() => {
      this.dataSource.data = this.Listsanpham();
      this.totalItems = this.Listsanpham().length;
      this.calculateTotalPages();
    });
  }
  GetGoiy(item: any) {
    return parseFloat(
      ((item.soluongkho - item.soluong) * (1 + item.haohut / 100)).toString()
    ).toFixed(2);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async ngOnInit(): Promise<void> {
    this.updateDisplayData();
    this.getDathang();
    this.loadProducts();
    this._SanphamService.listenSanphamUpdates();
    await this._SanphamService.getNhucau();
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
  }
  async getDathang() {
    const result = await this._GraphqlService.getKhachhangs();
    console.log(result);
  }
  async loadProducts() {
    const result = await this._GraphqlService.findMany('Sanpham',{
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    
    if (result.data) {
      console.log('Products:', result.data.data);
    }
  }

  async refresh() {
    await this._SanphamService.getAllSanpham();
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
        'NhucauColFilter',
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
    const uniqueList = list.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listsanpham().filter((v: any) =>
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
    const query = event.target.value.toLowerCase();
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter(
      (v: any) => v[column] === item[column]
    );
    const CheckItem1 = this.ListFilter.filter(
      (v: any) => v[column] === item[column]
    );
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter(
        (v) => v[column] !== item[column]
      );
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
    this.ListFilter = this.Listsanpham();
    this.dataSource.data = this.Listsanpham();
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
    this.dataSource.data = this.Listsanpham().filter((v: any) =>
      this.ListFilter.some((v1) => v1.id === v.id)
    );
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
    localStorage.setItem('NhucauColFilter', JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/sanpham', 'new']);
  }
  ListSPNCC: any[] = [];
  async openDeleteDialog(teamplate: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.DeleteListItem();
      }
    });
  }
  DeleteListItem(): void {
    this.EditList.forEach((item: any) => {
      this._SanphamService.DeleteSanpham(item);
    });
    this.EditList = [];
    this._snackBar.open('Xóa Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }
  ListFindNCC: any[] = [];
  ListDathang: any[] = [];
  isSubmit: boolean = false;
  onListDathangChange(event: any) {
    console.log(event);
    this.isSubmit = event.isSubmit;
    this.ListDathang = event.ListDathang;
    console.log(this.ListDathang);
  }
  CheckSubmit() {
    // Kiểm tra nếu có sản phẩm nào có số lượng đặt âm thì báo lỗi, ngược lại isSubmit = true
    const hasNegative = this.ListDathang.some((ncc: any) =>
      (ncc.sanpham || []).some((sp: any) => Number(sp.sldat) < 0)
    );
    console.log(hasNegative);

    console.log(this.ListDathang);

    if (hasNegative) {
      this._snackBar.open('Có sản phẩm có số lượng đặt âm!', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      this.isSubmit = false;
      return false;
    } else {
      this.isSubmit = true;
      return true;
    }
  }
  async OpenTaodonDialog(teamplate: TemplateRef<any>) {
    this.ListFindNCC = await this._NhacungcapService.Findbyids(
      this.EditList.map((v: any) => v.id)
    );
    this.EditList = this.EditList.filter((v: any) =>
      this.ListFindNCC.some((v1: any) =>
        v1.Sanpham.some((v3: any) => v3.id === v.id)
      )
    );
    const dialogDeleteRef = this._dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        console.log(this.ListDathang);
        (async () => {
          for (const item of this.ListDathang) {
            await this._DathangService.CreateByNhucau(item);
            // Optional delay to allow data updates - adjust delay as needed
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        })()
          .then(() => {
            this._snackBar.open('Tạo Mới đặt hàng thành công', '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
            this._router.navigate(['/admin/dathang']);
          })
          .catch((error) => {
            this._snackBar.open('Có lỗi xảy ra khi Tạo Mới đặt hàng', '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
            console.error('Error creating orders:', error);
          });
      }
    });
  }
  CheckSanphaminNCC(NCC: any, item: any) {
    const existingItem = NCC.Sanpham?.find((v: any) => v.id === item.id);
    return existingItem ? true : false;
  }
  updateValue(Soluong: any, Sanpham: any, Nhacungcap: any) {
    const newValue =
      Number((Soluong.target as HTMLElement).innerText.trim()) || 0;
    const exitNCC = this.ListDathang.find((v: any) => v.id === Nhacungcap.id);
    console.log(exitNCC);

    if (exitNCC) {
      const exitSP = exitNCC.sanpham.find((v: any) => v.id === Sanpham.id);
      if (exitSP) {
        exitSP.sldat = newValue;
      } else {
        Sanpham.sldat = newValue;
        exitNCC.Sanpham.push(Sanpham);
      }
    } else {
      Sanpham.sldat = newValue;
      Nhacungcap.sanpham = [Sanpham];
      Nhacungcap.ngaynhan = new Date();
      this.ListDathang.push(Nhacungcap);
    }
    console.log(this.ListDathang);
  }

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  ChoseAllEdit(): void {
    this.EditList = this.Listsanpham();
  }
  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }
  goToDetail(item: any): void {
    this.drawer.open();
    this._SanphamService.setSanphamId(item.id);
    this._router.navigate(['admin/sanpham', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'SPImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    const data = ConvertDriveData(result.values);
    this.DoImportData(data);
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

    // Filter out duplicate masp values
    const uniqueData = Array.from(
      new Map(transformedData.map((item: any) => [item.masp, item])).values()
    );
    const existingSanpham = this._SanphamService.ListSanpham();
    const existingMasp = existingSanpham.map((v: any) => v.masp);
    const newMasp = uniqueData
      .map((v: any) => v.masp)
      .filter((item: any) => !existingMasp.includes(item));

    await Promise.all(
      uniqueData.map(async (v: any) => {
        const existingItem = existingSanpham.find(
          (v1: any) => v1.masp === v.masp
        );
        if (existingItem) {
          const updatedItem = { ...existingItem, ...v };
          await this._SanphamService.updateSanpham(updatedItem);
        } else {
          await this._SanphamService.CreateSanpham(v);
        }
      })
    );
    await Promise.all(
      existingSanpham
        .filter((sp) => !uniqueData.some((item: any) => item.masp === sp.masp))
        .map((sp) =>
          this._SanphamService.updateSanpham({ ...sp, isActive: false })
        )
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

  async ExportExcel(data: any, title: any) {
    const ListKho = await this._KhoService.getAllKho();
    console.log(data);

    const dulieu = data.map((v: any) => ({
      ngaynhan: moment().format('YYYY-MM-DD'),
      mancc: v.mancc || '',
      nhacungcap: v.nhacungcap || '',
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
      // giagoc: v.giagoc,
      slchogiao: v.slchogiao,
      goiy: v.goiy,
      slchonhap: v.slchonhap,
      slton: v.slton,
      haohut: v.haohut,
      ghichu: v.ghichu,
    }));

    const mapping: any = {
      ngaynhan: 'Ngày Nhận',
      mancc: 'Mã Nhà Cung Cấp',
      nhacungcap: 'Nhà Cung Cấp',
      masp: 'Mã Sản Phẩm',
      title: 'Tên Sản Phẩm',
      dvt: 'Đơn Vị Tính',
      // giagoc: 'Giá Gốc',
      slchogiao: 'Chờ Giao',
      goiy: 'Gợi Ý',
      slchonhap: 'Chờ Nhập',
      slton: 'Tồn Kho',
      haohut: 'Hao Hụt',
      ghichu: 'Ghi Chú',
    };
    ListKho.forEach((v: any) => {
      mapping[`makho_${v.makho}`] = v.makho;
    });

    writeExcelFile(dulieu, title, Object.values(mapping), mapping);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.Listsanpham().length) {
      this.pageSize = this.Listsanpham().length;
      this._snackBar.open(`Số lượng tối đa ${this.Listsanpham().length}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } else {
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
    const pageData = this.Listsanpham().slice(startIndex, endIndex);
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
