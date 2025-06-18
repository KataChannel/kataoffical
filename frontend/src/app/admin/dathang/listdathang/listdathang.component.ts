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
import { readExcelFile, UploadDathang, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
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
    'action'
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
    action: 'Hành Động'
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


  onDateChange(event: any): void {
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
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'SPImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   console.log(data);
   this.DoImportData(data);
    // const updatePromises = data.map(async (v: any) => {
    //   const item = this._KhachhangsService
    //     .ListKhachhang()
    //     .find((v1) => v1.MaKH === v.MaKH);
    //   if (item) {
    //     const item1 = { ...item, ...v };
    //     console.log(item1);

    //     await this._KhachhangsService.updateOneKhachhang(item1);
    //   }
    // });
    // Promise.all(updatePromises).then(() => {
    //   this._snackBar.open('Cập Nhật Thành Công', '', {
    //     duration: 1000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     panelClass: ['snackbar-success'],
    //   });
    //   //  window.location.reload();
    // });
  }
  DoImportData(data:any)
  {
    console.log(data);
    
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim()||'',
      masp: v.masp?.trim()||'',
      slug:`${convertToSlug(v?.title?.trim()||'')}_${GenId(5,false)}`,
      giagoc: Number(v.giagoc)||0,
      dvt: v.dvt||'',
      soluong: Number(v.soluong)||0,
      soluongkho: Number(v.soluongkho)||0,
      ghichu: v.ghichu||'',
      order: Number(v.order)||0,
   }));
   // Filter out duplicate masp values
   const uniqueData = transformedData.filter((value:any, index:any, self:any) => 
      index === self.findIndex((t:any) => (
        t.masp === value.masp
      ))
   )
    const listId2 = uniqueData.map((v: any) => v.masp);
    const listId1 = this._DathangService.ListDathang().map((v: any) => v.masp);
    const listId3 = listId2.filter((item:any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
        const item = this._DathangService.ListDathang().find((v1) => v1.masp === v.masp);
        if (item) {
          const item1 = { ...item, ...v };
          await this._DathangService.updateDathang(item1);
        }
        else{
          await this._DathangService.CreateDathang(v);
        }
      });
     const disableItem = listId3.map(async (v: any) => {
        const item = this._DathangService.ListDathang().find((v1) => v1.masp === v);
        item.isActive = false;
        await this._DathangService.updateDathang(item);
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

  async ImporExcel(event: any) {
  const data = await readExcelFile(event)
  this.DoImportData(data);
  }   

 async ExportExcel(data: any, title: any) {
     await this._NhacungcapService.getAllNhacungcap()
     await this._SanphamService.getAllSanpham()
     await this._BanggiaService.getAllBanggia() 
    const ListNhucau = await this._SanphamService.getNhucau();
     console.log(ListNhucau);
      const NCC = this._NhacungcapService.ListNhacungcap().map((v: any) => ({
        manccold: v.manccold,
        name: v.name,
        mancc: v.mancc,
        // banggia: v.banggia[0]?.mabanggia,
      }));
      const SP = this._SanphamService.ListSanpham().map((v: any) => ({
        subtitle: v.subtitle,
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
      }));
      const BG = this._BanggiaService.ListBanggia().map((v: any) => ({
        mabanggia: v.mabanggia,
        title: v.title,
      }));
      UploadDathang({SP, NCC, BG}, title);
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