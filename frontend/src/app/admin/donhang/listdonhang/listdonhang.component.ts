import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
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
import { DonhangService } from '../donhang.service';
import { MatMenuModule } from '@angular/material/menu';
import {
  readExcelFile,
  readExcelFileNoWorker,
  writeExcelFile,
  writeExcelFileWithSheets,
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
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { MatTabsModule } from '@angular/material/tabs';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { BanggiaService } from '../../banggia/banggia.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import { SharepaginationComponent } from '../../../shared/common/sharepagination/sharepagination.component';
@Component({
  selector: 'app-listdonhang',
  templateUrl: './listdonhang.component.html',
  styleUrls: ['./listdonhang.component.scss'],
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
    MatTabsModule,
    SharepaginationComponent,
  ],
})
export class ListDonhangComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'madonhang',
    'name',
    'sanpham',
    'ngaygiao',
    'ghichu',
    'status',
    'createdAt',
    'updatedAt',
  ];
  ColumnName: any = {
    madonhang: 'Mã Đơn Hàng',
    name: 'Khách Hàng',
    sanpham: 'Sản Phẩm',
    ngaygiao: 'Ngày Giao',
    ghichu: 'Ghi Chú',
    status: 'Trạng Thái',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DonhangColFilter') || '[]'
  );
  totalItems = 0;
  currentPage = 1;
  totalPages = 1;
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('dialogImportExcel') dialogImportExcel!: TemplateRef<any>;
  @ViewChild('dialogImportExcelCu') dialogImportExcelCu!: TemplateRef<any>;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _KhachhangService: KhachhangService = inject(KhachhangService);
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _router: Router = inject(Router);
  Listdonhang: any = signal<any>({});
  dataSource = new MatTableDataSource([]);
  donhangId: any = this._DonhangService.donhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  pageIndex: any = 1;
  Trangthaidon: any = TrangThaiDon;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Type: 'donsi',
    pageSize: 100,
    pageNumber: 1,
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  isSearch: boolean = false;
  pageSize = signal<number>(10);
  page = signal<number>(1);
  total = signal<number>(0);
  pageCount = signal<number>(0);
  FilterKhachhang: any[] = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
    effect(async () => {
      await this.LoadData();
    });
  }
  async onPageChange(event: any): Promise<void> {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize;
    this.SearchParams.pageNumber = event.page;
    await this.LoadData();
  }
  async LoadData() {
    await this._KhachhangService.getKhachhangBy({ page: 1, pageSize: 9999 });
    const data = await this._DonhangService.searchDonhang(this.SearchParams);
    this.Listdonhang.set(data);
    if (data.data) {
      this.total.set(Number(data.total));
      this.pageSize.set(Number(data.pageSize));
      this.page.set(Number(data.pageNumber));
      this.pageCount.set(data.totalPages);
      this.dataSource = new MatTableDataSource(this.Listdonhang().data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  async onSelectionChange(event: MatSelectChange): Promise<void> {
    const timeFrames: { [key: string]: () => void } = {
      day: () => {
        this.SearchParams.Batdau = moment();
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
    await this.LoadData();
    //  this.ngOnInit();
  }
  onDateChange(event: any): void {
    this.ngOnInit();
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
    await this.LoadData();
    this.initializeColumns();
    this.setupDrawer();

    // this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    // this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    // this.paginator._intl.previousPageLabel = 'Về Trước';
    // this.paginator._intl.firstPageLabel = 'Trang Đầu';
    // this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }

  // async onPageChange(event: any): Promise<void> {
  //   console.log(event);
  //   this.SearchParams.pageSize = event.pageSize;
  //   this.SearchParams.pageNumber = event.pageIndex + 1;
  //   const data = await this._DonhangService.searchDonhang(this.SearchParams);
  //   this.Listdonhang.set(data);
  //   this.dataSource = new MatTableDataSource(this.Listdonhang().data);
  //   this.dataSource.sort = this.sort;
  // }

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
    const uniqueList = list.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listdonhang().data.filter(
      (v: any) =>
        removeVietnameseAccents(v[column]).includes(
          event.target.value.toLowerCase()
        ) || v[column].toLowerCase().includes(event.target.value.toLowerCase())
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
    this.ListFilter = this.Listdonhang().data;
    this.dataSource.data = this.Listdonhang().data;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listdonhang().data.filter((v: any) =>
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/donhang', 'new']);
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
      sanpham: v.sanpham.map((v1: any) => ({
        title: v1.title,
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

  getUniqueProducts(): string[] {
    const products = new Set<string>();
    this.Phieuchia.forEach((kh) =>
      kh.sanpham.forEach((sp: any) => products.add(sp.title))
    );
    return Array.from(products);
  }

  getProductQuantity(product: string, makh: string): number | string {
    const customer = this.Phieuchia.find((kh) => kh.makh === makh);
    const item = customer?.sanpham.find((sp: any) => sp.title === product);
    return item ? item.slgiao : '';
  }
  getDvtForProduct(product: string) {
    const uniqueProducts = Array.from(
      new Map(
        this.Phieuchia.flatMap((c) =>
          c.sanpham.map((sp: any) => ({ ...sp, makh: c.makh, name: c.name }))
        ).map((p) => [p.title, p])
      ).values()
    );
    console.log(uniqueProducts);

    const item = uniqueProducts.find((sp: any) => sp.title === product);
    return item ? item.dvt : '';
  }

  CheckItemInDonhang(item: any): boolean {
    return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDonhang(): void {}

  ListImportExcel: any[] = [];
  statusDetails: any[] = [];
  ListImportData: any[] = [];

  async ImporExcel(event: any) {
    const files = Array.from(event.target.files) as File[];
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Skip files with "~$" in the filename
      if (file.name.includes('~$')) {
        console.log(`Skipping temporary file: ${file.name}`);
        this._snackBar.open(`Bỏ qua file tạm: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        skippedCount++;
        this.statusDetails.push({
          fileName: file.name,
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Skipped',
          message: 'File tạm thời, không xử lý',
        });
        continue;
      }
      try {
        this._snackBar.open(`Đang xử lý file: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        const TenKH = removeVietnameseAccents(file.name.replace('.xlsx', ''));
        let data = await readExcelFileNoWorker(file, 'TEM');
        if (!data || !Array.isArray(data)) {
          data = await readExcelFileNoWorker(file, 'TEMPLATE');
        }
        const editdata = data
          .filter((item: any) => {
            const validItemCode =
              typeof item?.ItemCode === 'string' && item.ItemCode.trim() !== '';
            const validQuantity =
              item?.Quantity != null &&
              item.Quantity !== '' &&
              item.Quantity !== 0;
            return validItemCode && validQuantity;
          })
          .map((item: any) => ({
            // tenfile: file.name.replace('.xlsx', ''),
            // tenkh: TenKH,
            ItemCode: item.ItemCode ?? '',
            Quantity: item.Quantity ?? '',
          }));
        const itemEdit = {
          tenfile: file.name.replace('.xlsx', ''),
          tenkh: TenKH,
          sanpham: editdata,
          ngaygiao: moment().format('YYYY-MM-DD'),
        };
        this.ListImportData.push(itemEdit);
        processedCount++;
        this._snackBar.open(`Xử lý thành công file: ${file.name}`, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        this.statusDetails.push({
          fileName: file.name,
          ngaygiao: moment().format('YYYY-MM-DD'),
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Processed',
          message: 'Xử lý thành công',
        });
      } catch (error: any) {
        console.error(`Error processing file ${file.name}:`, error);
        this._snackBar.open(
          `Lỗi xử lý file ${file.name}: ${error.message}`,
          '',
          {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
        errorCount++;
        this.statusDetails.push({
          fileName: file.name,
          tenkhongdau: removeVietnameseAccents(file.name.replace('.xlsx', '')),
          status: 'Error',
          message: error.message,
        });
        continue;
      }
      console.log(this.ListImportData);
    }
    // this._snackBar.open(
    //     `Nhập đơn hàng thành công. Files xử lý: ${processedCount}, Bỏ qua: ${skippedCount}, Lỗi: ${errorCount}`,
    //     '',
    //     {
    //       duration: 5000,
    //       horizontalPosition: 'end',
    //       verticalPosition: 'top',
    //       panelClass: ['snackbar-success']
    //     }
    //   );
    this.statusDetails.push({
      fileName: 'Overall',
      status: 'Success',
      message: `Files processed: ${processedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`,
    });
    // After all files have been processed, perform the import
    this.dialog.open(this.dialogImportExcelCu, {});
    this.statusDetails.forEach((v: any, k: any) => {
      this.FilterKhachhang[k] = this._KhachhangService.ListKhachhang();
    });
    // Sort to put 'Processed' status items at the top
    this.statusDetails.sort((a, b) => {
      if (a.status === 'Processed' && b.status !== 'Processed') return -1;
      if (a.status !== 'Processed' && b.status === 'Processed') return 1;
      return 0;
    });
  }
  removeItemImport(index: number) {
    this.statusDetails.splice(index, 1);
  }

  async DoImportKhachhangCu() {
    try {
      console.log('ListImportData', this.ListImportData);
      const invalidItems = this.ListImportData.filter(
        (item) => !item.khachhangId || !item.ngaygiao
      );
      console.log('invalidItems', invalidItems);

      if (invalidItems.length > 0) {
        const invalidFiles = Array.from(
          new Set(invalidItems.map((item) => item.tenfile || 'Unknown'))
        );
        this._snackBar.open(
          `Các Khách hàng sau không đủ dữ liệu : ${invalidFiles.join(', ')}`,
          '',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
        return;
      }
      console.log('ListImportData', this.ListImportData);

      const result = await this._DonhangService.ImportDonhangCu(
        this.ListImportData
      );
      this.dialog.closeAll();
      this._snackBar.open(
        `Nhập đơn hàng : Thành công ${result.success}, Thất bại ${result.fail}, Bỏ qua ${result.skip}. Reload Lại sau 3s`,
        '',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
    } catch (importError: any) {
      console.error('Lỗi khi nhập đơn hàng:', importError);
      this._snackBar.open(`Lỗi khi nhập đơn hàng: ${importError.message}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      this.statusDetails.push({
        fileName: 'Overall',
        status: 'Error',
        message: importError.message,
      });
      return;
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  async ImportDonhang(items: any[]): Promise<void> {
    // items = items.slice(1); // Remove the first row (header)
    if (!items || !items.length) {
      this._snackBar.open('Không có dữ liệu để nhập', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    try {
      // Validate required field in first item
      const firstItem = items[0];
      if (!firstItem.makh) {
        throw new Error('Mã khách hàng không được để trống');
      }

      // Find customer
      const khachhang = await this._KhachhangService.getKhachhangBy({
        makh: firstItem.makh,
        isOne: true,
      });
      if (!khachhang) {
        throw new Error(`Không tìm thấy khách hàng với mã ${firstItem.makh}`);
      }

      // Process products with error handling
      const sanpham = await Promise.all(
        items.map(async (item) => {
          if (!item.masp) {
            throw new Error('Mã sản phẩm không được để trống');
          }

          const sp = await this._SanphamService.getSanphamBy({
            masp: item.masp,
          });
          if (!sp) {
            throw new Error(`Không tìm thấy sản phẩm với mã ${item.masp}`);
          }

          return {
            ...sp,
            sldat: parseFloat(Number(item.sldat).toFixed(2)) || 0,
            slgiao: parseFloat(Number(item.slgiao).toFixed(2)) || 0,
            slnhan: parseFloat(Number(item.slnhan).toFixed(2)) || 0,
          };
        })
      );

      // Create order data
      const donhangData = {
        title: `Đơn hàng ${GenId(4, false)}`,
        type: 'donsi',
        ngaygiao: firstItem.ngay || moment().format('YYYY-MM-DD'),
        khachhangId: khachhang.id,
        khachhang: khachhang,
        sanpham: sanpham,
        status: 'new',
        createdAt: new Date(),
      };

      console.log(donhangData);
      await this._DonhangService.CreateDonhang(donhangData);

      this._snackBar.open('Nhập đơn hàng thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      // Refresh data
      this.ngOnInit();
    } catch (error: any) {
      console.error('Error importing order:', error);
      this._snackBar.open(
        `Lỗi: ${error.message || 'Không thể nhập đơn hàng'}`,
        '',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
    }
  }

  async ExportExcel(data: any, title: any) {
    await this._KhachhangService.getAllKhachhang();
    await this._SanphamService.getAllSanpham();
    await this._BanggiaService.getAllBanggia();
    const KH = this._KhachhangService.ListKhachhang().map((v: any) => ({
      makhold: v.makhold,
      name: v.name,
      makh: v.makh,
      banggia: v.banggia[0]?.mabanggia,
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
    writeExcelFileWithSheets({ SP, KH, BG }, title);
  }
  printContent() {
    const element = document.getElementById('printContent');
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');

      // Mở cửa sổ mới và in ảnh
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Phiếu Chia Hàng ${moment().format('DD/MM/YYYY')}</title>
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
  
  @Debounce(300)
  async SelectKhachhang(item: any, event: any) {
    const value = event.value;
    const checkItem = this.ListImportData.find(
      (v: any) => v.khachhangId === value
    );
    if (checkItem) {
      // Reset giá trị của select về null/undefined
      event.source.value = null;
      event.source._value = null;
      
      // Xóa khachhangId của item hiện tại
      this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach(
        (v1: any) => {
          delete v1.khachhangId;
        }
      );      
      this._snackBar.open('Khách hàng đã tồn tại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }
    this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach(
      (v1: any) => {
        v1.khachhangId = value;
      }
    );
  }

  @Debounce(500)
  async DoFindKhachhang(event: any, index: any) {
    const value = event.target.value;
    if (!value) {
      this.FilterKhachhang[index] = this._KhachhangService.ListKhachhang();
      return;
    }
    this.FilterKhachhang[index] = this._KhachhangService
      .ListKhachhang()
      .filter((v: any) => v.subtitle.includes(removeVietnameseAccents(value)));
  }

  DoChonNgaygiao(event: any, item: any) {
    const value = event.target.value;
    if (!value) {
      this.SearchParams.ngaygiao = '';
      return;
    }
    if (item === 'All') {
      this.ListImportData.forEach((v: any) => {
        v.ngaygiao = value;
      });
      this.statusDetails.forEach((v: any) => {
        if (v.status === 'Processed') {
          v.ngaygiao = value;
        }
      });
      return;
    }
    this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach(
      (v1: any) => {
        v1.ngaygiao = value;
      }
    );
  }

  EditList: any = [];
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
  openDeleteDialog(template: TemplateRef<any>) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.DeleteListItem();
      }
    });
  }
  async DeleteListItem(): Promise<void> {
    if (!this.EditList?.length) {
      this._snackBar.open('Không có mục nào được chọn để xóa', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    try {
      const deletionPromises = this.EditList.map((item: any) =>
        this._DonhangService.DeleteDonhang(item)
      );
      
      const results = await Promise.allSettled(deletionPromises);
      
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;
      
      if (failed === 0) {
        this._snackBar.open(`Xóa thành công ${successful} đơn hàng`, '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      } else {
        this._snackBar.open(`Xóa thành công ${successful}, thất bại ${failed} đơn hàng`, '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
      }
    } catch (error: any) {
      console.error('Batch deletion error:', error);
      this._snackBar.open('Có lỗi xảy ra khi xóa đơn hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.EditList = [];
      await this.LoadData();
    }
  }
  ToggleAll() {
    if (this.EditList.length === this.Listdonhang().data.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.Listdonhang().data];
    }
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
