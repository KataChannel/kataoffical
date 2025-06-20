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
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DathangService } from '../dathang.service';
import { MatMenuModule } from '@angular/material/menu';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { BanggiaService } from '../../banggia/banggia.service';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Debounce, memoize } from '../../../shared/utils/decorators';
import { ChangeDetectionStrategy } from '@angular/core';
import { writeExcelFileSheets } from '../../../shared/utils/exceldrive.utils';
@Component({
  selector: 'app-listdathang',
  templateUrl: './listdathang.component.html',
  styleUrls: ['./listdathang.component.scss'],
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
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDathangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
   // 'title',
    'madncc',
    'nhacungcap',
    'sanpham',
    'ngaynhan',
    'status', 
    'ghichu',
    'createdAt',
    'updatedAt',
    // 'action'
  ];

  ColumnName: any = {
    STT: 'STT',
  //  title: 'Tiêu Đề',
    madncc: 'Mã Đơn Nhập',
    nhacungcap: 'Nhà Cung Cấp',
    sanpham: 'Sản Phẩm',
    ngaynhan: 'Ngày Nhận',
    status: 'Trạng Thái',
    ghichu: 'Ghi Chú',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật',
    // action: 'Hành Động'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DathangColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon:any = TrangThaiDon
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _DathangService: DathangService = inject(DathangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _router: Router = inject(Router);
  Listdathang:any = this._DathangService.ListDathang;
  page = this._DathangService.page;
  pageCount = this._DathangService.pageCount;
  total = this._DathangService.total;
  pageSize = this._DathangService.pageSize;
  dathangId = this._DathangService.dathangId;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  searchParam:any={
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    page: this.page(),
    pageSize: this.pageSize(),
  }
  totalItems: number = 0;
  constructor() {
    effect(async () => {
      this.dataSource.data = this.Listdathang();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }  
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
    this._DathangService.page.set(1);
    this._DathangService.getDathangBy(this.searchParam);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._DathangService.page.set(this.page() - 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._DathangService.page.set(this.page() + 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }


  onDateChange(): void {
    this.ngOnInit();
  }
  async ngOnInit(): Promise<void> {
    await this._DathangService.getDathangBy(this.searchParam);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listdathang());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();

  }
  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('DathangColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }
  @Debounce(500)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.searchParam = {
        page: this.page(),
        pageSize: this.pageSize(),
      };
      this._DathangService.getDathangBy(this.searchParam);
      return;
    }
    this.searchParam.subtitle = filterValue.trim().toLowerCase();
    this._DathangService.getDathangBy(this.searchParam);
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
    this.dataSource.filteredData = this.Listdathang().filter((v: any) => 
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('DathangColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/dathang', 'new']);
  }
  goToDetail(item: any): void {
     this._DathangService.setDathangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/dathang', item.id]);
  }
  UpdateDathang(item:any){
    item.status = 'dagiao';
    this._DathangService.updateDathang(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      // window.location.reload();
    });
  }

 async ExportExcel() {
  console.log(this.Listdathang());

let index = 1;
const data = this.Listdathang().flatMap((item: any) =>
  item.sanpham.map((sanpham: any) => {
    return {
      'STT': index++,
      'Nhà Cung Cấp': item.nhacungcap?.name || '',
      'Tên Sản Phẩm': sanpham.sanpham?.title || '',
      'DVT': sanpham.sanpham?.dvt || '',
      'SL Đặt': Number(sanpham.sldat) || 0,
      'Ghi Chú': item.ghichu || '',
    };
  })
);
writeExcelFileSheets({'Đơn Đặt hàng': { data: data }}, `Danh Sách Đặt Hàng ${moment().format('DD-MM-YYYY')}`);
}

EditList: any[] = [];
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
DoDanhan(){
    Promise.all(this.EditList.map((item: any) => 
      {
        item.status = 'danhan';
        return this._DathangService.updateDathang(item);
      }))
    .then(() => {
      this.EditList = [];
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    });
}
dialog = inject(MatDialog);
dialogCreateRef: any;
openDeleteDialog(template: TemplateRef<any>, item?: any) {
     const dialogDeleteRef = this.dialog.open(template, {
       hasBackdrop: true,
       disableClose: true,
     });
     dialogDeleteRef.afterClosed().subscribe(async (result) => {
       if (result=="true") {
        if(item){
         await this._DathangService.DeleteDathang(item)
         return;
        }
         this.DeleteListItem();
       }
     });
 }
DeleteListItem(): void {
  Promise.all(this.EditList.map((item: any) => this._DathangService.DeleteDathang(item)))
    .then(() => {
      this.EditList = [];
      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
}
  ToggleAll(){
    if (this.EditList.length === this.Listdathang().data.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.Listdathang().data];
    }
  }
}