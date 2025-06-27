// import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
// import { Router, RouterLink, RouterOutlet } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { CommonModule } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormsModule } from '@angular/forms';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { SanphamService } from '../sanpham.service';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { environment } from '../../../../../environments/environment.development';
// import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
// import { GoogleSheetService } from '../../../../shared/googlesheets/googlesheets.service';
// import { memoize, Debounce } from '../../../../shared/utils/decorators';
// import { readExcelFile, writeExcelFile } from '../../../../shared/utils/exceldrive.utils';
// import { ConvertDriveData } from '../../../../shared/utils/shared.utils';
// @Component({
//   selector: 'app-listsanpham',
//   templateUrl: './listsanpham.component.html',
//   styleUrls: ['./listsanpham.component.scss'],
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatTableModule,
//     MatSortModule,
//     MatPaginatorModule,
//     MatMenuModule,
//     MatSidenavModule,
//     RouterOutlet,
//     MatIconModule,
//     MatButtonModule,
//     MatSelectModule,
//     CommonModule,
//     FormsModule,
//     MatTooltipModule,
//     MatDialogModule,
//     SearchfilterComponent
//   ],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ListSanphamComponent implements OnInit {
//   displayedColumns: string[] = [];
//   ColumnName: any = {
//     stt: '#',
//     codeId: 'Code',
//     title: 'Tên sản phẩm',
//     danhmuc: 'Danh mục',
//     bacgia: 'Bậc Giá',
//     donvitinh: 'Đơn vị tính',
//     giagoc: 'Giá Gốc',
//     status: 'Trạng thái',
//     order: 'Thứ tự',
//     createdAt: 'Ngày tạo',
//   };
//   FilterColumns: any[] = JSON.parse(localStorage.getItem('SanphamColFilter') || '[]');
//   Columns: any[] = [];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

//   private _SanphamService: SanphamService = inject(SanphamService);
//   private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
//   private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
//   private _router: Router = inject(Router);
//   private _dialog: MatDialog = inject(MatDialog);
//   private _snackBar: MatSnackBar = inject(MatSnackBar);

//   Listsanpham = this._SanphamService.ListSanpham;
//   page = this._SanphamService.page;
//   pageCount = this._SanphamService.pageCount;
//   total = this._SanphamService.total;
//   pageSize = this._SanphamService.pageSize;
//   sanphamId = this._SanphamService.sanphamId;
//   dataSource:any = new MatTableDataSource([]);
//   EditList: any[] = [];
//   isSearch = signal<boolean>(false);

//   constructor() {
//     effect(() => {
//       this.dataSource.data = this.Listsanpham();
//       this.dataSource.sort = this.sort;
//       if (this.paginator) {
//         this.paginator.pageIndex = this.page() - 1;
//         this.paginator.pageSize = this.pageSize();
//         this.paginator.length = this.total();
//       }
//     });
//   }

//   async ngOnInit(): Promise<void> {
//     await this._SanphamService.getAllSanpham();
//     this.displayedColumns = Object.keys(this.ColumnName);
//     this.dataSource = new MatTableDataSource(this.Listsanpham());
//     this.dataSource.sort = this.sort;
//     this.initializeColumns();
//     this.setupDrawer();
//   }

//   private initializeColumns(): void {
//     this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
//     this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
//     localStorage.setItem('SanphamColFilter', JSON.stringify(this.FilterColumns));
//     this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
//     this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
//       isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   async getUpdatedCodeIds() {
//     await this._SanphamService.getUpdatedCodeIds();
//   }

//   private setupDrawer(): void {
//     this._breakpointObserver
//       .observe([Breakpoints.Handset])
//       .subscribe((result) => {
//         if (result.matches) {
//           this.drawer.mode = 'over';
//         } else {
//           this.drawer.mode = 'side';
//         }
//       });
//   }

//   toggleColumn(item: any): void {
//     const column = this.FilterColumns.find((v) => v.key === item.key);
//     if (column) {
//       column.isShow = !column.isShow;
//       this.updateDisplayedColumns();
//     }
//   }

//   @memoize()
//   FilterHederColumn(list: any, column: any) {
//     const uniqueList = list.filter((obj: any, index: number, self: any) => 
//       index === self.findIndex((t: any) => t[column] === obj[column])
//     );
//     return uniqueList;
//   }

//   @Debounce(300)
//   doFilterHederColumn(event: any, column: any): void {
//     this.dataSource.filteredData = this.Listsanpham().filter((v: any) => 
//       v[column].toLowerCase().includes(event.target.value.toLowerCase())
//     );
//   }

//   ListFilter: any[] = [];
//   ChosenItem(item: any, column: any) {
//     const CheckItem = this.dataSource.filteredData.filter((v: any) => v[column] === item[column]);
//     const CheckItem1 = this.ListFilter.filter((v: any) => v[column] === item[column]);
//     if (CheckItem1.length > 0) {
//       this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
//     } else {
//       this.ListFilter = [...this.ListFilter, ...CheckItem];
//     }
//   }

//   ChosenAll(list: any) {
//     list.forEach((v: any) => {
//       const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
//       if (CheckItem) {
//         this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
//       } else {
//         this.ListFilter.push(v);
//       }
//     });
//   }

//   ResetFilter() {
//     this.ListFilter = this.Listsanpham();
//   }

//   EmptyFiter() {
//     this.ListFilter = [];
//   }

//   CheckItem(item: any) {
//     return this.ListFilter.find((v) => v.id === item.id) ? true : false;
//   }

//   ApplyFilterColum(menu: any) {
//     this.dataSource.data = this.Listsanpham().filter((v: any) => 
//       this.ListFilter.some((v1) => v1.id === v.id)
//     );
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     menu.closeMenu();
//   }

//   onOutFilter(event: any) {
//     this.dataSource.data = event;
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   private updateDisplayedColumns(): void {
//     this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
//     this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//       if (item.isShow) obj[item.key] = item.value;
//       return obj;
//     }, {} as Record<string, string>);
//     localStorage.setItem('SanphamColFilter', JSON.stringify(this.FilterColumns));
//   }

//   doFilterColumns(event: any): void {
//     const query = event.target.value.toLowerCase();
//     this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
//   }

//   create(): void {
//     this.drawer.open();
//     this._router.navigate(['sanpham', 'new']);
//   }

//   openDeleteDialog(template: TemplateRef<any>) {
//     const dialogDeleteRef = this._dialog.open(template, {
//       hasBackdrop: true,
//       disableClose: true,
//     });
//     dialogDeleteRef.afterClosed().subscribe((result) => {
//       if (result === "true") {
//         this.DeleteListItem();
//       }
//     });
//   }

//   DeleteListItem(): void {
//     this.EditList.forEach((item: any) => {
//       this._SanphamService.DeleteSanpham(item);
//     });
//     this.EditList = [];
//     this._snackBar.open('Xóa Thành Công', '', {
//       duration: 1000,
//       horizontalPosition: 'end',
//       verticalPosition: 'top',
//       panelClass: ['snackbar-success'],
//     });
//   }

//   AddToEdit(item: any): void {
//     const existingItem = this.EditList.find((v: any) => v.id === item.id);
//     if (existingItem) {
//       this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
//     } else {
//       this.EditList.push(item);
//     }
//   }

//   CheckItemInEdit(item: any): boolean {
//     return this.EditList.some((v: any) => v.id === item.id);
//   }

//   goToDetail(item: any): void {
//     this.drawer.open();
//     this._SanphamService.setSanphamId(item.id);
//     this._router.navigate(['sanpham', item.id]);
//   }

//   OpenLoadDrive(template: TemplateRef<any>) {
//     const dialogDeleteRef = this._dialog.open(template, {
//       hasBackdrop: true,
//       disableClose: true,
//     });
//     dialogDeleteRef.afterClosed().subscribe((result) => {
//       if (result === "true") {
//         // Handle action if needed
//       }
//     });
//   }

//   IdSheet: any = '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk';
//   SheetName: any = 'SPImport';
//   ImportIteam: any[] = [];
//   ImportColumnName: any = {};
//   ImportdisplayedColumns: any[] = [];

//   async LoadDrive() {
//     const DriveInfo = {
//       IdSheet: this.IdSheet,
//       SheetName: this.SheetName,
//       ApiKey: environment.GSApiKey,
//     };
//     const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
//     this.ImportIteam = ConvertDriveData(result.values);
//     this.ImportColumnName = Object.fromEntries(result.values[0].map((key: any, i: any) => [key, result.values[1][i]]));
//     this.ImportdisplayedColumns = result.values[0];
//   }

//   async DoImportData(data: any) {
//     const transformedData = data.map((v: any) => ({
//       title: v.title?.trim() || '',
//       masp: v.masp?.trim() || '',
//       giagoc: Number(v.giagoc) || 0,
//       dvt: v.dvt?.trim() || '',
//       soluong: Number(v.soluong) || 0,
//       soluongkho: Number(v.soluongkho) || 0,
//       haohut: Number(v.haohut) || 0,
//       ghichu: v.ghichu?.trim() || '',
//     }));

//     const uniqueData = Array.from(new Map(transformedData.map((item: any) => [item.masp, item])).values());
//     const existingSanpham = this._SanphamService.ListSanpham();
//     const existingMasp = existingSanpham.map((v: any) => v.masp);
//     const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

//     await Promise.all(uniqueData.map(async (v: any) => {
//       const existingItem = existingSanpham.find((v1: any) => v1.masp === v.masp);
//       if (existingItem) {
//         const updatedItem = { ...existingItem, ...v };
//         await this._SanphamService.updateSanpham(updatedItem);
//       } else {
//         await this._SanphamService.CreateSanpham(v);
//       }
//     }));
//     await Promise.all(existingSanpham
//       .filter(sp => !uniqueData.some((item: any) => item.masp === sp.masp))
//       .map(sp => this._SanphamService.updateSanpham({ ...sp, isActive: false }))
//     );

//     this._snackBar.open('Cập Nhật Thành Công', '', {
//       duration: 1000,
//       horizontalPosition: 'end',
//       verticalPosition: 'top',
//       panelClass: ['snackbar-success'],
//     });
//   }

//   async ImporExcel(event: any) {
//     const data = await readExcelFile(event);
//     this.DoImportData(data);
//   }

//   ExportExcel(data: any, title: any) {
//     const dulieu = data.map((v: any) => ({
//       title: v.title,
//       masp: v.masp,
//       giagoc: v.giagoc,
//       dvt: v.dvt,
//       soluong: v.soluong,
//       soluongkho: v.soluongkho,
//       haohut: v.haohut,
//       ghichu: v.ghichu,
//     }));
//     writeExcelFile(dulieu, title);
//   }

//   trackByFn(index: number, item: any): any {
//     return item.id;
//   }

//   onPageSizeChange(size: number, menuHienthi: any) {
//     if (size > this.total()) {
//       this._snackBar.open(`Số lượng tối đa ${this.total()}`, '', {
//         duration: 1000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-success'],
//       });
//       size = this.total();
//     }
//     this._SanphamService.page.set(1);
//     this._SanphamService.getAllSanpham();
//     menuHienthi.closeMenu();
//   }
//   onPreviousPage(){
//     if (this.page() > 1) {
//       this._SanphamService.page.set(this.page() - 1);
//       this._SanphamService.getAllSanpham();
//     }
//   }

//   onNextPage(){
//     if (this.page() < this.pageCount()) {
//       this._SanphamService.page.set(this.page() + 1);
//       this._SanphamService.getAllSanpham();
//     }
//   }
// }