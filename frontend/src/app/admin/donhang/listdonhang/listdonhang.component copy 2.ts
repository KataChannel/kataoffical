// import {
//   AfterViewInit,
//   Component,
//   computed,
//   effect,
//   inject,
//   TemplateRef,
//   ViewChild,
//   ViewEncapsulation,
// } from '@angular/core';
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
// import { MatSelectChange, MatSelectModule } from '@angular/material/select';
// import { CommonModule } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormsModule } from '@angular/forms';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { DonhangService } from '../donhang.service';
// import { MatMenuModule } from '@angular/material/menu';
// import {
//   readExcelFile,
//   writeExcelFile,
//   writeExcelFileWithSheets,
// } from '../../../shared/utils/exceldrive.utils';
// import {
//   ConvertDriveData,
//   convertToSlug,
//   GenId,
// } from '../../../shared/utils/shared.utils';
// import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import moment from 'moment';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import html2canvas from 'html2canvas';
// import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
// import { MatTabsModule } from '@angular/material/tabs';
// import { KhachhangService } from '../../khachhang/khachhang.service';
// import { BanggiaService } from '../../banggia/banggia.service';
// import { SanphamService } from '../../sanpham/sanpham.service';
// @Component({
//   selector: 'app-listdonhang',
//   templateUrl: './listdonhang.component.html',
//   styleUrls: ['./listdonhang.component.scss'],
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
//     MatDatepickerModule,
//     MatDialogModule,
//     MatTabsModule
//   ],
//   // providers: [provideNativeDateAdapter()],
// })
// export class ListDonhangComponent {
//   Detail: any = {};
//   displayedColumns: string[] = [
//     'madonhang',
//     'name',
//     'sanpham',
//     'ngaygiao',
//     'ghichu',
//     'status',
//     'createdAt',
//     'updatedAt',
//   ];
//   ColumnName: any = {
//     madonhang: 'Mã Đơn Hàng',
//     name: 'Khách Hàng',
//     sanpham: 'Sản Phẩm',
//     ngaygiao: 'Ngày Giao',
//     ghichu: 'Ghi Chú',
//     status: 'Trạng Thái',
//     createdAt: 'Ngày Tạo',
//     updatedAt: 'Ngày Cập Nhật',
//   };
//   FilterColumns: any[] = JSON.parse(
//     localStorage.getItem('DonhangColFilter') || '[]'
//   );
//   Columns: any[] = [];
//   isFilter: boolean = false;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
//   @ViewChild('dialogImportExcel') dialogImportExcel!: TemplateRef<any>;
//   filterValues: { [key: string]: string } = {};
//   private _DonhangService: DonhangService = inject(DonhangService);
//   private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
//   private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
//   private _KhachhangService: KhachhangService = inject(KhachhangService);
//   private _BanggiaService: BanggiaService = inject(BanggiaService);
//   private _SanphamService: SanphamService = inject(SanphamService);
//   private _router: Router = inject(Router);
//   Listdonhang: any = this._DonhangService.ListDonhang;
//   dataSource = new MatTableDataSource([]);
//   donhangId: any = this._DonhangService.donhangId;
//   _snackBar: MatSnackBar = inject(MatSnackBar);
//   CountItem: any = 0;
//   SearchParams: any = {
//     Batdau: moment().toDate(),
//     Ketthuc: moment().toDate(),
//     Type: 'donsi',
//     pageSize: 9999,
//     pageNumber: 0,
//   };
//   ListDate: any[] = [
//     { id: 1, Title: '1 Ngày', value: 'day' },
//     { id: 2, Title: '1 Tuần', value: 'week' },
//     { id: 3, Title: '1 Tháng', value: 'month' },
//     { id: 4, Title: '1 Năm', value: 'year' },
//   ];
//   Chonthoigian: any = 'day';
//   isSearch: boolean = false;
//   constructor() {
//     this.displayedColumns.forEach((column) => {
//       this.filterValues[column] = '';
//     });
//   }
//   onSelectionChange(event: MatSelectChange): void {
//     const timeFrames: { [key: string]: () => void } = {
//       day: () => {
//         this.SearchParams.Batdau = moment()
//         this.SearchParams.Ketthuc = moment()
//           .endOf('day')
//           .add(1, 'day')
//           .format('YYYY-MM-DD');
//       },
//       week: () => {
//         this.SearchParams.Batdau = moment()
//           .startOf('week')
//           .format('YYYY-MM-DD');
//         this.SearchParams.Ketthuc = moment().endOf('week').format('YYYY-MM-DD');
//       },
//       month: () => {
//         this.SearchParams.Batdau = moment()
//           .startOf('month')
//           .format('YYYY-MM-DD');
//         this.SearchParams.Ketthuc = moment()
//           .endOf('month')
//           .format('YYYY-MM-DD');
//       },
//       year: () => {
//         this.SearchParams.Batdau = moment()
//           .startOf('year')
//           .format('YYYY-MM-DD');
//         this.SearchParams.Ketthuc = moment().endOf('year').format('YYYY-MM-DD');
//       },
//     };
//      this.ngOnInit();
//   }
//   onDateChange(event: any): void {
//     this.ngOnInit();
//   }
//   createFilter(): (data: any, filter: string) => boolean {
//     return (data, filter) => {
//       const filterObject = JSON.parse(filter);
//       let isMatch = true;
//       this.displayedColumns.forEach((column) => {
//         if (filterObject[column]) {
//           const value = data[column]
//             ? data[column].toString().toLowerCase()
//             : '';
//           isMatch =
//             isMatch && value.includes(filterObject[column].toLowerCase());
//         }
//       });
//       return isMatch;
//     };
//   }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
//   async ngOnInit(): Promise<void> {
//     await this._DonhangService.searchDonhang(this.SearchParams);
//     this.CountItem = this.Listdonhang().length;    
//     this.initializeColumns();
//     this.setupDrawer();
//     this.dataSource = new MatTableDataSource(this.Listdonhang());
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     this.dataSource.filterPredicate = this.createFilter();
//     this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
//     this.paginator._intl.nextPageLabel = 'Tiếp Theo';
//     this.paginator._intl.previousPageLabel = 'Về Trước';
//     this.paginator._intl.firstPageLabel = 'Trang Đầu';
//     this.paginator._intl.lastPageLabel = 'Trang Cuối';
//   }
//   private initializeColumns(): void {
//     this.Columns = Object.keys(this.ColumnName).map((key) => ({
//       key,
//       value: this.ColumnName[key],
//       isShow: true,
//     }));
//     if (this.FilterColumns.length === 0) {
//       this.FilterColumns = this.Columns;
//     } else {
//       localStorage.setItem(
//         'DonhangColFilter',
//         JSON.stringify(this.FilterColumns)
//       );
//     }
//     this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
//       (item) => item.key
//     );
//     this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//       if (item.isShow) obj[item.key] = item.value;
//       return obj;
//     }, {} as Record<string, string>);
//   }

//   private setupDrawer(): void {
//     this._breakpointObserver
//       .observe([Breakpoints.Handset])
//       .subscribe((result) => {
//         if (result.matches) {
//           this.drawer.mode = 'over';
//           this.paginator.hidePageSize = true;
//         } else {
//           this.drawer.mode = 'side';
//         }
//       });
//   }

//   private updateDisplayedColumns(): void {
//     this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
//       (item) => item.key
//     );
//     this.ColumnName = this.FilterColumns.reduce((obj, item) => {
//       if (item.isShow) obj[item.key] = item.value;
//       return obj;
//     }, {} as Record<string, string>);
//     localStorage.setItem(
//       'DonhangColFilter',
//       JSON.stringify(this.FilterColumns)
//     );
//   }
//   doFilterColumns(event: any): void {
//     const query = event.target.value.toLowerCase();
//     this.FilterColumns = this.Columns.filter((v) =>
//       v.value.toLowerCase().includes(query)
//     );
//   }



//   toggleColumn(item: any): void {
//     const column = this.FilterColumns.find((v) => v.key === item.key);
//     if (column) {
//       column.isShow = !column.isShow;
//       this.updateDisplayedColumns();
//     }
//   }
//   @memoize()
//   FilterHederColumn(list:any,column:any)
//   {
//     const uniqueList = list.filter((obj: any, index: number, self: any) => 
//       index === self.findIndex((t: any) => t[column] === obj[column])
//     );
//     return uniqueList
//   }
//   @Debounce(300)
//   doFilterHederColumn(event: any, column: any): void {
//     this.dataSource.filteredData = this.Listdonhang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
//     const query = event.target.value.toLowerCase();  
//   }
//   ListFilter:any[] =[]
//   ChosenItem(item:any,column:any)
//   {
//     const CheckItem = this.dataSource.filteredData.filter((v:any)=>v[column]===item[column]);
//     const CheckItem1 = this.ListFilter.filter((v:any)=>v[column]===item[column]);
//     if(CheckItem1.length>0)
//     {
//       this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
//     }
//     else{
//       this.ListFilter = [...this.ListFilter,...CheckItem];
//     }
//   }
//   ChosenAll(list:any)
//   {
//     list.forEach((v:any) => {
//       const CheckItem = this.ListFilter.find((v1)=>v1.id===v.id)?true:false;
//       if(CheckItem)
//         {
//           this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
//         }
//         else{
//           this.ListFilter.push(v);
//         }
//     });
//   }
//   ResetFilter()
//   {
//     this.ListFilter = this.Listdonhang();
//     this.dataSource.data = this.Listdonhang();
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
//   EmptyFiter()
//   {
//     this.ListFilter = [];
//   }
//   CheckItem(item:any)
//   {
//     return this.ListFilter.find((v)=>v.id===item.id)?true:false;
//   }
//   ApplyFilterColum(menu:any)
//   {    

//     this.dataSource.data = this.Listdonhang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     menu.closeMenu();
//   }


//   create(): void {
//     this.drawer.open();
//     this._router.navigate(['admin/donhang', 0]);
//   }
//   goToDetail(item: any): void {
//     this._DonhangService.setDonhangId(item.id);
//     this.drawer.open();
//     this._router.navigate(['admin/donhang', item.id]);
//   }
//   editDonhang: any[] = [];
//   toggleDonhang(item: any): void {
//     const index = this.editDonhang.findIndex((v) => v.id === item.id);
//     if (index !== -1) {
//       this.editDonhang.splice(index, 1);
//     } else {
//       this.editDonhang.push(item);
//     }
//   }

//   dialog = inject(MatDialog);
//   dialogCreateRef: any;
//   Phieuchia:any[] = [];

//   openCreateDialog(teamplate: TemplateRef<any>) {
//     console.log(this.editDonhang);
//     this.Phieuchia = this.editDonhang.map((v: any) => ({
//       makh: v.khachhang?.makh,
//       name: v.khachhang?.name,
//       sanpham: v.sanpham.map((v1: any) => ({
//         title: v1.title,
//         dvt: v1.dvt,
//         slgiao: v1.slgiao,
//       })),
//     }));
//     console.log(this.Phieuchia);
//     this.dialogCreateRef = this.dialog.open(teamplate, {
//       hasBackdrop: true,
//       disableClose: true,
//     });
//   }

//   getUniqueProducts(): string[] {
//     const products = new Set<string>();
//     this.Phieuchia.forEach(kh => kh.sanpham.forEach((sp:any) => products.add(sp.title)));
//     return Array.from(products);
//   }

//   getProductQuantity(product: string, makh: string): number | string {
//     const customer = this.Phieuchia.find(kh => kh.makh === makh);
//     const item = customer?.sanpham.find((sp:any) => sp.title === product);
//     return item ? item.slgiao : '';
//   }
//   getDvtForProduct(product: string) {
//     const uniqueProducts = Array.from(
//       new Map(this.Phieuchia.flatMap(c => c.sanpham.map((sp:any) => ({ ...sp, makh: c.makh, name: c.name })))
//           .map(p => [p.title, p])
//       ).values()
//   );
//   console.log(uniqueProducts);
  
//     const item = uniqueProducts.find((sp:any) => sp.title === product);
//     return item ? item.dvt : '';
//   }
  
//   CheckItemInDonhang(item: any): boolean {
//     return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
//   }
//   DeleteDonhang(): void {}
//   async LoadDrive() {
//     const DriveInfo = {
//       IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
//       SheetName: 'SPImport',
//       ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
//     };
//     const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
//     const data = ConvertDriveData(result.values);
//     console.log(data);
//     this.DoImportData(data);
//     // const updatePromises = data.map(async (v: any) => {
//     //   const item = this._KhachhangsService
//     //     .ListKhachhang()
//     //     .find((v1) => v1.MaKH === v.MaKH);
//     //   if (item) {
//     //     const item1 = { ...item, ...v };
//     //     console.log(item1);

//     //     await this._KhachhangsService.updateOneKhachhang(item1);
//     //   }
//     // });
//     // Promise.all(updatePromises).then(() => {
//     //   this._snackBar.open('Cập Nhật Thành Công', '', {
//     //     duration: 1000,
//     //     horizontalPosition: 'end',
//     //     verticalPosition: 'top',
//     //     panelClass: ['snackbar-success'],
//     //   });
//     //   //  window.location.reload();
//     // });
//   }
//   DoImportData(data: any) {
//     console.log(data);

//     const transformedData = data.map((v: any) => ({
//       title: v.title?.trim() || '',
//       masp: v.masp?.trim() || '',
//       slug: `${convertToSlug(v?.title?.trim() || '')}_${GenId(5, false)}`,
//       giagoc: Number(v.giagoc) || 0,
//       dvt: v.dvt || '',
//       soluong: Number(v.soluong) || 0,
//       soluongkho: Number(v.soluongkho) || 0,
//       ghichu: v.ghichu || '',
//       order: Number(v.order) || 0,
//     }));
//     // Filter out duplicate masp values
//     const uniqueData = transformedData.filter(
//       (value: any, index: any, self: any) =>
//         index === self.findIndex((t: any) => t.masp === value.masp)
//     );
//     const listId2 = uniqueData.map((v: any) => v.masp);
//     const listId1 = this._DonhangService.ListDonhang().map((v: any) => v.masp);
//     const listId3 = listId2.filter((item: any) => !listId1.includes(item));
//     const createuppdateitem = uniqueData.map(async (v: any) => {
//       const item = this._DonhangService
//         .ListDonhang()
//         .find((v1) => v1.masp === v.masp);
//       if (item) {
//         const item1 = { ...item, ...v };
//         await this._DonhangService.updateDonhang(item1);
//       } else {

//         await this._DonhangService.CreateDonhang(v);
//       }
//     });
//     const disableItem = listId3.map(async (v: any) => {
//       const item = this._DonhangService
//         .ListDonhang()
//         .find((v1) => v1.masp === v);
//       item.isActive = false;
//       await this._DonhangService.updateDonhang(item);
//     });
//     Promise.all([...createuppdateitem, ...disableItem]).then(() => {
//       this._snackBar.open('Cập Nhật Thành Công', '', {
//         duration: 1000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-success'],
//       });
//       // window.location.reload();
//     });
//   }
//   ListImportExcel: any[] = []
//   async ImporExcel(event: any) {
//     const files = Array.from(event.target.files) as File[];
    
//     for (let i = 0; i < files.length; i++) {
//       try {
//       const file = files[i];
//       const data = await readExcelFile(file, 'Donhang');
      
//       // Import one file at a time and wait for it to complete
//       await this.ImporDonhang(data);
      
//       this._snackBar.open(`Đã Tạo Đơn ${i + 1}/${files.length}: ${file.name}`, '', {
//         duration: 2000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-success'],
//       });
//       } catch (error) {
//       console.error(`Lỗi khi Tạo Đơn ${i + 1}:`, error);
//       this._snackBar.open(`Lỗi khi Tạo Đơn ${i + 1}`, '', {
//         duration: 3000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-error'],
//       });
//       }
//     }
    
//     if (files.length > 0) {
//       this.dialogCreateRef?.close();
//       this.ngOnInit(); // Refresh the data after all imports
//     }
//   }

//   async ImporDonhang(items: any[]): Promise<void> {
//     items = items.slice(1); // Remove the first row (header)
//     console.log(items);
    
//     if (!items || !items.length) {
//       this._snackBar.open('Không có dữ liệu để nhập', '', {
//         duration: 3000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-error'],
//       });
//       return;
//     }

//     try {
//       // Validate required field in first item
//       const firstItem = items[0];
//       if (!firstItem.makh) {
//         throw new Error('Mã khách hàng không được để trống');
//       }

//       // Find customer
//       const khachhang = await this._KhachhangService.getKhachhangBy({ makh: firstItem.makh });
//       if (!khachhang) {
//         throw new Error(`Không tìm thấy khách hàng với mã ${firstItem.makh}`);
//       }

//       // Process products with error handling
//       const sanpham = await Promise.all(
//         items.map(async (item) => {
//           if (!item.masp) {
//             throw new Error('Mã sản phẩm không được để trống');
//           }

//           const sp = await this._SanphamService.getSanphamby({ masp: item.masp });
//           if (!sp) {
//             throw new Error(`Không tìm thấy sản phẩm với mã ${item.masp}`);
//           }

//           return {
//             ...sp,
//             sldat: Number(item.sldat) || 0,
//             slgiao: Number(item.slgiao) || 0,
//             slnhan: Number(item.slnhan) || 0,
//           };
//         })
//       );

//       // Create order data
//       const donhangData = {
//         title: `Đơn hàng ${GenId(4, false)}`,
//         type: 'donsi',
//         ngaygiao: firstItem.ngay || moment().format('YYYY-MM-DD'),
//         khachhangId: khachhang.id,
//         khachhang: khachhang,
//         sanpham: sanpham,
//         status: 'new',
//         createdAt: new Date(),
//       };

//       // Create order
//       await this._DonhangService.CreateDonhang(donhangData);
      
//       this._snackBar.open('Nhập đơn hàng thành công', '', {
//         duration: 3000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-success'],
//       });
      
//       // Refresh data
//       this.ngOnInit();
      
//     } catch (error: any) {
//       console.error('Error importing order:', error);
//       this._snackBar.open(`Lỗi: ${error.message || 'Không thể nhập đơn hàng'}`, '', {
//         duration: 5000,
//         horizontalPosition: 'end',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-error'],
//       });
//     }
//   }

//   async ExportExcel(data: any, title: any) {
//    await this._KhachhangService.getAllKhachhang()
//    await this._SanphamService.getAllSanpham()
//    await this._BanggiaService.getAllBanggia()  
//     const KH = this._KhachhangService.ListKhachhang().map((v: any) => ({
//       makh: v.makh,
//       name: v.name,
//       banggia: v.banggia[0]?.mabanggia,
//     }));
//     const SP = this._SanphamService.ListSanpham().map((v: any) => ({
//       subtitle: v.subtitle,
//       masp: v.masp,
//       title: v.title,
//       dvt: v.dvt,
//     }));
//     const BG = this._BanggiaService.ListBanggia().map((v: any) => ({
//       mabanggia: v.mabanggia,
//       title: v.title,
//     }));
//     writeExcelFileWithSheets({SP, KH, BG}, title);
//   }
//   printContent()
//   {
//     const element = document.getElementById('printContent');
//     if (!element) return;

//     html2canvas(element, { scale: 2 }).then(canvas => {
//       const imageData = canvas.toDataURL('image/png');

//       // Mở cửa sổ mới và in ảnh
//       const printWindow = window.open('', '_blank');
//       if (!printWindow) return;

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Phiếu Chia Hàng ${moment().format("DD/MM/YYYY")}</title>
//           </head>
//           <body style="text-align: center;">
//             <img src="${imageData}" style="max-width: 100%;"/>
//             <script>
//               window.onload = function() {
//                 window.print();
//                 window.onafterprint = function() { window.close(); };
//               };
//             </script>
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//     });
//   }
//   trackByFn(index: number, item: any): any {
//     return item.id; // Use a unique identifier
//   }
// }


// function memoize() {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;
//     const cache = new Map();

//     descriptor.value = function (...args: any[]) {
//       const key = JSON.stringify(args);
//       if (cache.has(key)) {
//         return cache.get(key);
//       }
//       const result = originalMethod.apply(this, args);
//       cache.set(key, result);
//       return result;
//     };

//     return descriptor;
//   };
// }

// function Debounce(delay: number = 300) {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;
//     let timeoutId: any;

//     descriptor.value = function (...args: any[]) {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         originalMethod.apply(this, args);
//       }, delay);
//     };

//     return descriptor;
//   };
// }