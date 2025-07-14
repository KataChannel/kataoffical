import {
  AfterViewInit,
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
import * as XLSX from 'xlsx-js-style'; 
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DonhangService } from '../../donhang/donhang.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
@Component({
  selector: 'app-listcongnokhachhang',
  templateUrl: './listcongnokhachhang.component.html',
  styleUrls: ['./listcongnokhachhang.component.scss'],
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
  ],
  // providers: [provideNativeDateAdapter()],
})
export class ListcongnokhachhangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'ngay',
    'makhachhang',
    'tenkhachhang',
    'madonhang',
    'mahang',
    'tenhang',
    'dvt',
    'soluong',
    'dongia',
    'thanhtientruocvat',
    'vat',
    'dongiavathoadon',
    'thanhtiensauvat',
    'ghichu',
    'tongtiensauthue',
  ];
  ColumnName: any = {
    ngay: 'Ngày',
    makhachhang: 'Mã Khách Hàng',
    tenkhachhang: 'Tên Khách Hàng',
    madonhang: 'Mã Đơn Hàng',
    mahang: 'Mã Hàng',
    tenhang: 'Tên Hàng',
    dvt: 'ĐVT',
    soluong: 'Số Lượng',
    dongia: 'Đơn Giá',
    thanhtientruocvat: 'Thành Tiền Trước VAT',
    vat: 'VAT',
    dongiavathoadon: 'Đơn Giá VAT',
    thanhtiensauvat: 'Thành Tiền Sau VAT',
    ghichu: 'Ghi Chú',
    tongtiensauthue: 'Tổng Tiền Sau Thuế',
  };


  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('CongnoColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon:any = TrangThaiDon;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  Listdonhang: any = this._DonhangService.ListDonhang;
  ListCongno:any = [];
  dataSource = new MatTableDataSource([]);
  donhangId: any = this._DonhangService.donhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Type: 'donsi',
    Status:['danhan','hoanthanh'],
    pageSize: 1000,
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  isSearch: boolean = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
  }
  onSelectionChange(event: MatSelectChange): void {
     this.ngOnInit();
  }
  onDateChange(event: any): void {
    this.ngOnInit()
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column]
            ? data[column].toString().toLowerCase()
            : '';
          isMatch =
            isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  @Debounce(300)
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.SearchParams = {
      ...this.SearchParams,
      query: filterValue
    };
   this.loadData(this.SearchParams);
  }

  async ngOnInit(): Promise<void> {
    this.initializeColumns();
    this.setupDrawer();
    this.loadData(this.SearchParams);
  }
  async loadData(query:any): Promise<void> {
    await this._DonhangService.searchDonhang(query);
    this.CountItem = this.Listdonhang().length;
    // Nhóm dữ liệu theo khách hàng để tính tổng tiền sau thuế
    const customerTotals = new Map();
    
    // Tính tổng tiền sau thuế cho từng khách hàng
    this.Listdonhang().forEach((v: any) => {
      const makh = v.khachhang?.makh;
      if (makh) {
        v.sanpham.forEach((v1: any) => {
          const thanhtiensauvat = v1.slgiao * v1.giaban * 1.05;
          if (!customerTotals.has(makh)) {
            customerTotals.set(makh, 0);
          }
          customerTotals.set(makh, customerTotals.get(makh) + thanhtiensauvat);
        });
      }
    });
    
    this.ListCongno = this.Listdonhang().flatMap((v: any) =>
      v.sanpham.map((v1: any) => ({
        ngay: moment(v.ngay).format("DD/MM/YYYY"),
        tenkhachhang: v.khachhang?.name,
        makhachhang: v.khachhang?.makh,
        madonhang: v.madonhang,
        tenhang: v1.title,
        mahang: v1.masp,
        dvt: v1.dvt,
        soluong: v1.slgiao,
        dongia: v1.giaban,
        thanhtientruocvat: v1.slgiao * v1.giaban,
        vat: 5,
        dongiavathoadon: v1.giaban * 1.05,
        thanhtiensauvat: v1.slgiao * v1.giaban * 1.05,
        ghichu: v1.ghichu,
        tongtiensauthue: customerTotals.get(v.khachhang?.makh) || 0,
      }))
    )
    this.dataSource = new MatTableDataSource(this.ListCongno);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
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
        'CongnoColFilter',
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
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = 'side';
        }
      });
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem(
      'CongnoColFilter',
      JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
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
    this.dataSource.filteredData = this.Listdonhang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.Listdonhang();
    this.dataSource.data = this.Listdonhang();
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

    this.dataSource.data = this.Listdonhang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }


  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/congnokhachhang', 0]);
  }
  goToDetail(item: any): void {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/congnokhachhang', item.id]);
  }
  editDonhang: any[] = [];
  toggleDonhang(item: any): void {
    const index = this.editDonhang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDonhang.splice(index, 1);
    } else {
      this.editDonhang.push(item);
    }
  }
  TinhTong(items: any, fieldTong: any) {
    return (items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||0);
  }
  dialog = inject(MatDialog);
  dialogCreateRef: any;
  Phieuchia:any[] = [];
  openCreateDialog(teamplate: TemplateRef<any>) {
    console.log(this.editDonhang);
    this.Phieuchia = this.editDonhang.map((v: any) => ({
      makh: v.khachhang?.makh,
      name: v.khachhang?.name,
      madonhang:v.madonhang,
      ngaygiao:v.ngaygiao,
      sanpham: v.sanpham.map((v1: any) => ({
        masp:v1.masp,
        title: v1.title,
        dvt: v1.dvt,
        slgiao: v1.slgiao,
        giaban: v1.giaban,
        ttgiao: v1.ttgiao,
      })),
    }));
    console.log(this.Phieuchia);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
  }

  BackStatus()
  {
    this.editDonhang.forEach((v:any) => {
        v.status = 'dadat';
        this._DonhangService.updateDonhang(v);
    });
    this.ngOnInit();
  }


  Hoanthanh()
  {
    this.editDonhang.forEach((v:any) => {
        v.status = 'hoanthanh';
        this._DonhangService.updateDonhang(v);
    });
  }
  getUniqueProducts(): string[] {
    const products = new Set<string>();
    this.Phieuchia.forEach(kh => kh.sanpham.forEach((sp:any) => products.add(sp.title)));
    return Array.from(products);
  }

  getProductQuantity(product: string, makh: string): number | string {
    const customer = this.Phieuchia.find(kh => kh.makh === makh);
    const item = customer?.sanpham.find((sp:any) => sp.title === product);
    return item ? item.slgiao : '';
  }
  getDvtForProduct(product: string) {
    const uniqueProducts = Array.from(
      new Map(this.Phieuchia.flatMap(c => c.sanpham.map((sp:any) => ({ ...sp, makh: c.makh, name: c.name })))
          .map(p => [p.title, p])
      ).values()
  );
    const item = uniqueProducts.find((sp:any) => sp.title === product);
    return item ? item.dvt : '';
  }
  
  CheckItemInDonhang(item: any): boolean {
    return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDonhang(): void {}
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
  DoImportData(data: any) {
    console.log(data);

    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      slug: `${convertToSlug(v?.title?.trim() || '')}_${GenId(5, false)}`,
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      ghichu: v.ghichu || '',
      order: Number(v.order) || 0,
    }));
    // Filter out duplicate masp values
    const uniqueData = transformedData.filter(
      (value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.masp === value.masp)
    );
    const listId2 = uniqueData.map((v: any) => v.masp);
    const listId1 = this._DonhangService.ListDonhang().map((v: any) => v.masp);
    const listId3 = listId2.filter((item: any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
      const item = this._DonhangService
        .ListDonhang()
        .find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = { ...item, ...v };
        await this._DonhangService.updateDonhang(item1);
      } else {
        await this._DonhangService.CreateDonhang(v);
      }
    });
    const disableItem = listId3.map(async (v: any) => {
      const item = this._DonhangService
        .ListDonhang()
        .find((v1) => v1.masp === v);
      item.isActive = false;
      await this._DonhangService.updateDonhang(item);
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
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }
  ExportExcel(data: any, title: any) {
    const columns = [
      'Ngày',
      'Mã Khách Hàng',
      'Tên Khách Hàng',
      'Mã Đơn Hàng',
      'Mã Hàng',
      'Tên Hàng',
      'ĐVT',
      'Số Lượng', 
      'Đơn Giá',
      'Thành Tiền Trước VAT',
      'VAT',
      'Đơn Giá VAT',
      'Thành Tiền Sau VAT',
      'Ghi Chú',  
      'Tổng Tiền Sau Thuế',
    ];

    // Nhóm dữ liệu theo mã khách hàng và tính tổng tiền sau thuế
    const groupedData = this.groupDataByCustomer(data);
    
    this.writeExcelFileWithMergedCells(groupedData, title, columns);
  }

  private groupDataByCustomer(data: any[]): any[] {
    // Tạo map để nhóm theo mã khách hàng
    const customerGroups = new Map();
    
    data.forEach(item => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, []);
      }
      customerGroups.get(makh).push(item);
    });

    // Tính tổng tiền sau thuế cho từng khách hàng và chuẩn bị dữ liệu
    const result: any[] = [];
    
    customerGroups.forEach((items, makh) => {
      const totalAmount = items.reduce((sum: number, item: any) => 
        sum + (item.thanhtiensauvat || 0), 0
      );
      
      items.forEach((item: any, index: number) => {
        result.push({
          ...item,
          tongtiensauthue: index === 0 ? totalAmount : null // Chỉ hiển thị tổng ở dòng đầu tiên
        });
      });
    });

    return result;
  }

  private writeExcelFileWithMergedCells(data: any[], title: string, columns: string[]): void {    
    // Tạo dữ liệu cho worksheet
    const worksheetData = data.map(item => ({
      'Ngày': item.ngay,
      'Mã Khách Hàng': item.makhachhang,
      'Tên Khách Hàng': item.tenkhachhang,
      'Mã Đơn Hàng': item.madonhang,
      'Mã Hàng': item.mahang,
      'Tên Hàng': item.tenhang,
      'ĐVT': item.dvt,
      'Số Lượng': item.soluong,
      'Đơn Giá': item.dongia,
      'Thành Tiền Trước VAT': item.thanhtientruocvat,
      'VAT': item.vat,
      'Đơn Giá VAT': item.dongiavathoadon,
      'Thành Tiền Sau VAT': item.thanhtiensauvat,
      'Ghi Chú': item.ghichu,
      'Tổng Tiền Sau Thuế': item.tongtiensauthue
    }));

    // Tạo worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Tạo merge ranges cho cột "Tổng Tiền Sau Thuế"
    const mergeRanges = this.createMergeRanges(data);
    
    // Áp dụng merge ranges
    if (mergeRanges.length > 0) {
      worksheet['!merges'] = mergeRanges;
    }

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CongNo');

    // Xuất file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
  }

  private createMergeRanges(data: any[]): any[] {
    const mergeRanges: any[] = [];
    const customerGroups = new Map();
    
    // Nhóm theo mã khách hàng và lưu vị trí dòng
    data.forEach((item, index) => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, { start: index + 1, count: 0 }); // +1 vì có header
      }
      customerGroups.get(makh).count++;
    });

    // Tạo merge ranges cho cột "Tổng Tiền Sau Thuế" (cột thứ 15, index 14)
    const totalColumnIndex = 14; // Cột "Tổng Tiền Sau Thuế"
    
    customerGroups.forEach((group) => {
      if (group.count > 1) {
        mergeRanges.push({
          s: { r: group.start, c: totalColumnIndex }, // start row, column
          e: { r: group.start + group.count - 1, c: totalColumnIndex } // end row, column
        });
      }
    });

    return mergeRanges;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  printContent()
  {
    const element = document.getElementById('printContent');
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imageData = canvas.toDataURL('image/png');

      // Mở cửa sổ mới và in ảnh
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Phiếu Chia Hàng ${moment().format("DD/MM/YYYY")}</title>
          </head>
          <body style="text-align: center;">
            <img src="${imageData}" style="max-width: 100%;"/>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    });
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
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