import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  signal,
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DonhangService } from '../../donhang/donhang.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { environment } from '../../../../environments/environment.development';
import { SearchService } from '../../../shared/services/search.service';
import { StorageService } from '../../../shared/utils/storage.service';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import { DateHelpers } from '../../../shared/utils/date-helpers';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listphieuchiahang',
  templateUrl: './listphieuchiahang.component.html',
  styleUrls: ['./listphieuchiahang.component.scss'],
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
    MatButtonToggleModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  // providers: [provideNativeDateAdapter()],
})
export class ListPhieuchiahangComponent {
  DateHelpers = DateHelpers;
  Detail: any = {};
  displayedColumns: string[] = [
    'madonhang',
    'name',
    'nhanvienchiahang',
    'sanpham',
    'ngaygiao',
    'ghichu',
    'printCount',
    'status',
    'createdAt',
    'updatedAt',
  ];
  ColumnName: any = {
    madonhang: 'Mã Đơn Hàng',
    name: 'Khách Hàng',
    nhanvienchiahang: 'Nhân Viên Chia Hàng',
    sanpham: 'Sản Phẩm',
    ngaygiao: 'Ngày Giao',
    ghichu: 'Ghi Chú',
    printCount: 'Số Lượng In',
    status: 'Trạng Thái',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DonhangColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon: any = TrangThaiDon;
  
  // Track edit mode for nhanvienchiahang
  editingNhanvienId: string | null = null;
  tempNhanvienValue: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _SearchService: SearchService = inject(SearchService);
  private _StorageService: StorageService = inject(StorageService);
  private _router: Router = inject(Router);
  Listdonhang: any = this._DonhangService.ListDonhang;
  dataSource = new MatTableDataSource<any>([]);
  donhangId: any = this._DonhangService.donhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().startOf('day').toDate(),  // 00:00:00 ngày hiện tại
    Ketthuc: moment().endOf('day').toDate(),   // 23:59:59 ngày hiện tại
    Type: 'all',
    pageSize: 99999,
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
    const timeFrames: { [key: string]: () => void } = {
      day: () => {
        this.SearchParams.Batdau = moment().startOf('day').format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment()
          .endOf('day')
          .add(1, 'day')
          .format('YYYY-MM-DD');
      },
      week: () => {
        this.SearchParams.Batdau = moment()
          .startOf('week')
          .format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('week').format('YYYY-MM-DD');
      },
      month: () => {
        this.SearchParams.Batdau = moment()
          .startOf('month')
          .format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment()
          .endOf('month')
          .format('YYYY-MM-DD');
      },
      year: () => {
        this.SearchParams.Batdau = moment()
          .startOf('year')
          .format('YYYY-MM-DD');
        this.SearchParams.Ketthuc = moment().endOf('year').format('YYYY-MM-DD');
      },
    };

    timeFrames[event.value]?.();
    // Chỉ update SearchParams, không load data tự động
    // User cần nhấn nút Tìm Kiếm để load data
  }
  
  onDateChange(event: any): void {
    // Chỉ update SearchParams, không load data tự động
    // User cần nhấn nút Tìm Kiếm để load data
  }
  
  async onTypeChange(value: string): Promise<void> {
    this.SearchParams.Type = value;
    this.SearchParams.pageNumber = 1; // Reset to first page
    // 🔥 Auto-load data when type changes for better UX
    await this.loadData();
  }
  
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  async searchData(): Promise<void> {
    await this.loadData();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async ngOnInit(): Promise<void> {
    // 🔥 AUTO-LOAD: Tự động load dữ liệu trong ngày khi vào trang
    this.initializeColumns();
    this.setupDrawer();
    
    // Setup paginator
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      this.paginator._intl.previousPageLabel = 'Về Trước';
      this.paginator._intl.firstPageLabel = 'Trang Đầu';
      this.paginator._intl.lastPageLabel = 'Trang Cuối';
    }
    
    // 🔥 Load dữ liệu trong ngày khi khởi tạo
    await this.loadData();
  }
  
  async loadData(): Promise<void> {
    this.isLoading.set(true);  // 🔥 Bắt đầu loading
    try {
      await this._DonhangService.searchDonhang(this.SearchParams);
      this.CountItem = this.Listdonhang().length;
      this.dataSource = new MatTableDataSource(this.Listdonhang());
      console.log(this.dataSource.data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    } catch (error) {
      console.error('Error loading data:', error);
      this._snackBar.open('❌ Lỗi khi tải dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);  // 🔥 Dừng loading
    }
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
        'DonhangColFilter',
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
      'DonhangColFilter',
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
  FilterHederColumn(list: any, column: any) {
    // Handle special columns with objects
    if (column === 'sanpham') {
      // Group by product count
      const uniqueList = list.filter(
        (obj: any, index: number, self: any) =>
          index === self.findIndex((t: any) => 
            (t[column]?.length || 0) === (obj[column]?.length || 0)
          )
      );
      return uniqueList;
    } else {
      // Standard comparison for primitive values
      const uniqueList = list.filter(
        (obj: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t[column] === obj[column])
      );
      return uniqueList;
    }
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    const query = event.target.value.toLowerCase();
    this.dataSource.filteredData = this.Listdonhang().filter((v: any) => {
      let value: any;
      
      // Handle special columns with objects
      if (column === 'sanpham') {
        value = `${v[column]?.length || 0} sản phẩm`;
      } else {
        value = v[column];
      }
      
      if (value) {
        return (
          removeVietnameseAccents(value.toString())
            .toLowerCase()
            .includes(query) || value.toString().toLowerCase().includes(query)
        );
      }
      return false;
    });
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    let CheckItem: any[] = [];
    let CheckItem1: any[] = [];
    
    // Handle special columns with objects
    if (column === 'sanpham') {
      // Filter by product count
      CheckItem = this.dataSource.filteredData.filter(
        (v: any) => (v[column]?.length || 0) === (item[column]?.length || 0)
      );
      CheckItem1 = this.ListFilter.filter(
        (v: any) => (v[column]?.length || 0) === (item[column]?.length || 0)
      );
    } else {
      // Standard comparison for primitive values
      CheckItem = this.dataSource.filteredData.filter(
        (v: any) => v[column] === item[column]
      );
      CheckItem1 = this.ListFilter.filter(
        (v: any) => v[column] === item[column]
      );
    }
    
    if (CheckItem1.length > 0) {
      // Remove items with matching column value
      if (column === 'sanpham') {
        this.ListFilter = this.ListFilter.filter(
          (v) => (v[column]?.length || 0) !== (item[column]?.length || 0)
        );
      } else {
        this.ListFilter = this.ListFilter.filter(
          (v) => v[column] !== item[column]
        );
      }
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
    this.ListFilter = this.Listdonhang();
    this.dataSource.data = this.Listdonhang();
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
    this.dataSource.data = this.Listdonhang().filter((v: any) =>
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/donhang', 0]);
  }
  goToDetail(item: any): void {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/donhang', item.id]);
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

  dialog = inject(MatDialog);
  dialogCreateRef: any;
  Phieuchia: any[] = [];
  openCreateDialog(teamplate: TemplateRef<any>) {
    console.log(this.editDonhang);
    this.Phieuchia = this.editDonhang.map((v: any) => ({
      makh: v.khachhang?.makh,
      name: v.khachhang?.name,
      madonhang: v.madonhang,
      sanpham: v.sanpham.map((v1: any) => ({
        title: v1.title,
        masp: v1.masp,
        dvt: v1.dvt,
        slgiao: v1.slgiao,
      })),
    }));
    console.log(this.Phieuchia);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
  }
  ListBillXuly: any[] = [];
  openXembillDialog(teamplate: TemplateRef<any>) {
    this.ListBillXuly = this.ListBill;
    this.ListBillXuly.forEach((v: any) => {
      v.sanpham.forEach((v1: any) => {
        v1.slgiao = v1.sltt ? v1.sltt : v1.sld;
      });
    });
    console.log(this.ListBillXuly);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
  }

  getUniqueProducts(list: any[]): string[] {
    const products = new Set<string>();
    list.forEach((kh) =>
      kh.sanpham.forEach((sp: { title: string; masp: string }) =>
        products.add(sp.title)
      )
    );
    return Array.from(products).sort((a, b) => a.localeCompare(b, 'vi'));
  }

  getProductQuantity(list: any[], product: string, makh: string,madonhang:string) {
    const customer = list.find((kh) => kh.makh === makh && kh.madonhang === madonhang);
    const item = customer?.sanpham.find((sp: any) => sp.title === product);
    // console.log('list',list);
    // console.log('customer',customer);
    // console.log('item',item);
    
    return item ? item : '';
  }
  getDvtForProduct(list: any[], product: string) {
    const uniqueProducts = Array.from(
      new Map(
        list
          .flatMap((c) =>
            c.sanpham.map((sp: any) => ({ ...sp, makh: c.makh, name: c.name }))
          )
          .map((p) => [p.title, p])
      ).values()
    );
    const item = uniqueProducts.find((sp: any) => sp.title === product);
    return item ? item : '';
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
    writeExcelFile(data, title);
  }
  async printContent() {
    const printContent = document.getElementById('printContent');
    if (printContent) {
      // 🔥 CẬP NHẬT printCount cho tất cả đơn hàng được chọn
      console.log('🔍 [printContent] Bắt đầu kiểm tra editDonhang:', this.editDonhang);
      console.log('🔍 [printContent] Số đơn được chọn:', this.editDonhang?.length || 0);
      
      if (this.editDonhang && this.editDonhang.length > 0) {
        console.log('✅ [printContent] Đang cập nhật printCount cho', this.editDonhang.length, 'đơn hàng');
        
        try {
          for (const order of this.editDonhang) {
            const oldPrintCount = order.printCount || 0;
            // Tăng printCount
            order.printCount = oldPrintCount + 1;
            
            console.log(`📝 [printContent] Đơn ${order.madonhang}: printCount ${oldPrintCount} → ${order.printCount}`);
            
            // Update lên server
            const updateData = {
              id: order.id,
              printCount: order.printCount
            };
            console.log('🚀 [printContent] Gửi update lên server:', updateData);
            
            const result = await this._DonhangService.updateDonhang(updateData);
            console.log('✅ [printContent] Server response:', result);
          }
          
          // Refresh dataSource để update màu nền
          console.log('🔄 [printContent] Refresh dataSource');
          this.dataSource.data = [...this.dataSource.data];
          
          this._snackBar.open(`✅ Đã cập nhật trạng thái in cho ${this.editDonhang.length} đơn hàng`, '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        } catch (error) {
          console.error('❌ [printContent] Error updating printCount:', error);
          this._snackBar.open('⚠️ Lỗi khi cập nhật trạng thái in', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        }
      } else {
        console.warn('⚠️ [printContent] Không có đơn hàng nào được chọn để cập nhật printCount');
      }
      
      // Tiếp tục in
      const newWindow = window.open('', '_blank');
      const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    </script>
  `;
      if (newWindow) {
        newWindow.document.write(`
        <html>
        <head>
          <title>In Bảng</title>
                 ${tailwindCSS}
          <style>
            body { font-size: 10px!important; font-family: Arial, sans-serif; }
            table { width: auto;
            padding: 1px !important;
              border-collapse: collapse;
              margin-left: auto;
              margin-right: auto; }
            th, td { border: 1px solid #000; padding: 1px!important; text-align: left; }
            @media print { 
            body { margin: 0; } 
          table { width: auto;
            padding: 1px !important;
            border-collapse: collapse;
            margin-left: auto;
            margin-right: auto; }
            th, td { border: 1px solid #000; padding: 1px!important; text-align: left; }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
        </html>
      `);
        newWindow.document.close();
      } else {
        console.error('Không thể mở cửa sổ in');
      }
    } else {
      console.error('Không tìm thấy phần tử printContent');
    }

    // html2canvas(element,
    //   {
    //     scale: 1.5,
    //     useCORS: true,
    //     allowTaint: true,
    //     scrollX: 0,
    //     scrollY: 0,
    //     y:10,
    //     windowWidth: document.documentElement.offsetWidth,
    //     windowHeight: document.documentElement.offsetHeight+100,
    //    }
    // ).then(canvas => {
    //   const imageData = canvas.toDataURL('image/png');

    //   // Mở cửa sổ mới và in ảnh
    //   const printWindow = window.open('', '_blank');
    //   if (!printWindow) return;

    //   printWindow.document.write(`
    //     <html>
    //       <head>
    //         <title>Phiếu Chia Hàng ${moment().format("DD/MM/YYYY")}</title>
    //       </head>
    //       <body style="text-align: center;">
    //         <img src="${imageData}" style="max-width: 100%;"/>
    //         <script>
    //           window.onload = function() {
    //             window.print();
    //             window.onafterprint = function() { window.close(); };
    //           };
    //         </script>
    //       </body>
    //     </html>
    //   `);

    //   printWindow.document.close();
    // });
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }

  selectedFile!: File;
  ListBill: any = this._StorageService.getItem('ListBill') || [];
  isLoading = signal<boolean>(false); // 🔥 Loading indicator (signal)
  uploadMessage = ''; // Hiển thị thông báo sau khi upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Lấy file từ input
    this.uploadMessage = ''; // Reset thông báo cũ
    this.uploadFile();
  }

  async uploadFile() {
    if (!this.selectedFile) {
      alert('Chọn file trước khi upload!');
      return;
    }
    this.isLoading.set(true); // Bắt đầu loading
    this.uploadMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile); // 'file' phải khớp với tên bên NestJS

    try {
      const response = await fetch(`${environment.APIURL}/googledrive/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Lỗi upload: ${response.statusText}`);
      }

      const data = await response.json();

      this.ListBill = data.jsonData;
      this._StorageService.setItem('ListBill', this.ListBill);
      //  const uniqueMadonhang = Array.from(new Set(data.jsonData.map((item:any) => item.madonhang)));
      //  this.ListBill = await this.GetDonhang(uniqueMadonhang);
      console.log(this.ListBill);
      this.uploadMessage = 'Upload thành công!';
      console.log('Upload thành công', data);
    } catch (error) {
      this.uploadMessage = 'Lỗi khi upload file!';
      console.error('Lỗi upload file', error);
    } finally {
      this.isLoading.set(false); // Dừng loading dù có lỗi hay không
    }
  }
  async GetDonhang(items: any) {
    const query = {
      model: 'donhang',
      filters: {
        madonhang: { value: items, type: 'in' },
      },
      relations: {
        sanpham: { include: { sanpham: true } },
        khachhang: {
          include: true,
        },
      },
      orderBy: { field: 'createdAt', direction: 'desc' },
      take: 10,
    };
    return await this._SearchService.Search(query);
  }

  updateValue(
    event: Event,
    j: any,
    i: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    const newValue =
      type === 'number'
        ? Number((event.target as HTMLElement).innerText.trim()) || 0
        : (event.target as HTMLElement).innerText.trim();
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      event.preventDefault();
    }
    if (type === 'number') {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];
      // Chặn nếu không phải số và không thuộc danh sách phím cho phép
      if (
        !/^\d$/.test(keyboardEvent.key) &&
        !allowedKeys.includes(keyboardEvent.key)
      ) {
        event.preventDefault();
      }
    }
    this.ListBillXuly[j].sanpham[i][field] = newValue;
    const inputs = document.querySelectorAll(
      '.slgiao-input-' + j
    ) as NodeListOf<HTMLInputElement>;
    console.log(inputs);

    if (i < this.getUniqueProducts(this.ListBillXuly).length - 1) {
      const nextInput = inputs[i + 1] as HTMLInputElement;
      if (nextInput) {
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
          nextInput.select();
        }
        // Then select text using a different method that works on more element types
        setTimeout(() => {
          if (document.createRange && window.getSelection) {
            const range = document.createRange();
            range.selectNodeContents(nextInput);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 10);
      }
    }
  }
  /**
   * Update hàng loạt từ Excel Template
   * File Excel cần có sheet "data" với columns: id, nhanvienchiahang, trangthaiin
   */
  async UpdateListBill(event?: any): Promise<void> {
    try {
      // 🔥 Nếu có event (upload file Excel), đọc file
      if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        
        if (!file) {
          this._snackBar.open('⚠️ Vui lòng chọn file Excel', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }

        console.log('📁 [UpdateListBill] Reading file:', file.name);
        this.isLoading.set(true);

        // 2️⃣ Parse Excel file
        const reader = new FileReader();
        
        reader.onload = async (e: any) => {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            
            // 3️⃣ Read from "data" sheet
            const worksheetName = 'data';
            const worksheet = workbook.Sheets[worksheetName];
            
            if (!worksheet) {
              throw new Error(`Sheet "${worksheetName}" không tồn tại trong file Excel`);
            }

            // 4️⃣ Convert to JSON
            const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
            console.log('📊 [UpdateListBill] Parsed data:', jsonData);
            console.log('📊 [UpdateListBill] Total rows:', jsonData.length);

            if (jsonData.length === 0) {
              throw new Error('File Excel không có dữ liệu');
            }

            // 5️⃣ Validate required columns
            const firstRow = jsonData[0];
            const hasId = 'id' in firstRow;
            const hasNhanvien = 'nhanvienchiahang' in firstRow;
            const hasTrangthaiin = 'trangthaiin' in firstRow;
            
            console.log('✅ [UpdateListBill] Columns found:', {
              id: hasId,
              nhanvienchiahang: hasNhanvien,
              trangthaiin: hasTrangthaiin
            });

            if (!hasId) {
              throw new Error('File Excel thiếu cột "id"');
            }

            // 6️⃣ Update từng đơn hàng
            let successCount = 0;
            let errorCount = 0;
            const errors: string[] = [];

            for (const row of jsonData) {
              try {
                // Fetch full order data
                console.log(`🔍 [UpdateListBill] Searching order: ${row['id']}`);
                const orderData = await this._DonhangService.SearchField({
                  id: row['id']
                });

                if (!orderData) {
                  const errorMsg = `Không tìm thấy đơn hàng: ${row['id']}`;
                  console.warn(`⚠️ [UpdateListBill] ${errorMsg}`);
                  errors.push(errorMsg);
                  errorCount++;
                  continue;
                }

                // Update nhanvienchiahang if provided
                if (hasNhanvien && row['nhanvienchiahang'] !== undefined && row['nhanvienchiahang'] !== null) {
                  orderData.nhanvienchiahang = String(row['nhanvienchiahang']).trim();
                  console.log(`📝 [UpdateListBill] Updating order ${orderData.madonhang}: nhanvienchiahang = "${orderData.nhanvienchiahang}"`);
                }

                // Update trangthaiin if provided
                if (hasTrangthaiin && row['trangthaiin'] !== undefined && row['trangthaiin'] !== null) {
                  orderData.trangthaiin = String(row['trangthaiin']).trim();
                  console.log(`📝 [UpdateListBill] Updating order ${orderData.madonhang}: trangthaiin = "${orderData.trangthaiin}"`);
                }

                // Update to server
                await this._DonhangService.updateDonhang(orderData);
                successCount++;
                console.log(`✅ [UpdateListBill] Updated order ${orderData.madonhang}`);

              } catch (err) {
                const errorMsg = `Lỗi cập nhật ${row['id']}: ${err instanceof Error ? err.message : 'Unknown error'}`;
                console.error(`❌ [UpdateListBill] ${errorMsg}`, err);
                errors.push(errorMsg);
                errorCount++;
              }
            }

            // 7️⃣ Show result
            console.log('📈 [UpdateListBill] Summary:', { successCount, errorCount, errors });
            
            let message = `✅ Cập nhật thành công ${successCount}/${jsonData.length} đơn hàng`;
            if (errorCount > 0) {
              message += ` (${errorCount} lỗi)`;
              if (errors.length > 0 && errors.length <= 3) {
                message += `\n${errors.join('\n')}`;
              }
            }
            
            this._snackBar.open(message, '', {
              duration: errorCount > 0 ? 5000 : 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: successCount > 0 ? ['snackbar-success'] : ['snackbar-error'],
            });

            // 8️⃣ Reload data
            if (successCount > 0) {
              await this.loadData();
            }

          } catch (error) {
            console.error('❌ [UpdateListBill] Error processing Excel:', error);
            this._snackBar.open(
              `❌ Lỗi: ${error instanceof Error ? error.message : 'Không thể xử lý file Excel'}`,
              '',
              {
                duration: 4000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['snackbar-error'],
              }
            );
          } finally {
            this.isLoading.set(false);
          }
        };

        reader.onerror = () => {
          this._snackBar.open('❌ Lỗi khi đọc file Excel', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.isLoading.set(false);
        };

        reader.readAsBinaryString(file);

      } else {
        // 🔥 Không có event - update từ ListBillXuly (logic cũ)
        console.log('📋 [UpdateListBill] Updating from ListBillXuly:', this.ListBillXuly);
        
        const updatePromises = this.ListBillXuly.map(async (v) => {
          const v1 = await this._DonhangService.SearchField({
            madonhang: v.madonhang,
          });
          
          // Update sản phẩm
          v1.sanpham.forEach((v2: any) => {
            const item = v.sanpham.find((v3: any) => v3.masp === v2.masp);
            if (item) {
              v2.slgiao = item.slgiao;
            }
          });
          
          // ✅ Update nhân viên chia hàng nếu có trong template
          if (v.nhanvienchiahang !== undefined && v.nhanvienchiahang !== null) {
            v1.nhanvienchiahang = v.nhanvienchiahang;
          }
          
          console.log('📝 [UpdateListBill] Updating:', v1);
          await this._DonhangService.updateDonhang(v1);
        });

        await Promise.all(updatePromises);
        
        this._snackBar.open('✅ Cập Nhật Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      }

    } catch (error) {
      console.error('❌ [UpdateListBill] Error:', error);
      this._snackBar.open('❌ Lỗi khi cập nhật đơn hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      this.isLoading.set(false);
    }
  }
  
  /**
   * Start editing nhân viên chia hàng (double-click mode)
   */
  startEditNhanvien(row: any): void {
    this.editingNhanvienId = row.id;
    this.tempNhanvienValue = row.nhanvienchiahang || '';
  }
  
  /**
   * Confirm and save nhân viên chia hàng
   */
  async confirmEditNhanvien(row: any): Promise<void> {
    try {
      // ✅ Fetch full order data first to avoid sending partial/invalid data
      const fullOrder = await this._DonhangService.SearchField({
        madonhang: row.madonhang
      });
      
      if (!fullOrder) {
        throw new Error('Không tìm thấy đơn hàng');
      }
      
      // ✅ Update only the nhanvienchiahang field on the full order object
      fullOrder.nhanvienchiahang = this.tempNhanvienValue;
      
      // ✅ Send the complete order object to avoid undefined/invalid fields
      await this._DonhangService.updateDonhang(fullOrder);
      
      // Update local row
      row.nhanvienchiahang = this.tempNhanvienValue;
      
      this.editingNhanvienId = null;
      this.tempNhanvienValue = '';
      
      this._snackBar.open('Cập nhật nhân viên chia hàng thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Error updating nhanvienchiahang:', error);
      this._snackBar.open('Lỗi khi cập nhật nhân viên', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  
  /**
   * Cancel editing nhân viên chia hàng
   */
  cancelEditNhanvien(): void {
    this.editingNhanvienId = null;
    this.tempNhanvienValue = '';
  }
  
  /**
   * Get trạng thái in based on printCount
   */
  getTrangthaiIn(row: any): boolean {
    return (row.printCount || 0) > 0;
  }
  
  /**
   * Get trạng thái in label
   */
  getTrangthaiInLabel(row: any): string {
    return this.getTrangthaiIn(row) ? 'Đã in' : 'Chưa in';
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
