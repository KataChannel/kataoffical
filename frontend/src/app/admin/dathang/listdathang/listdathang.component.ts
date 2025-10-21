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
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Debounce, memoize } from '../../../shared/utils/decorators';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  readExcelFile,
  readExcelFileNoWorker,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { GenId } from '../../../shared/utils/shared.utils';
import * as XLSX from 'xlsx';
import { KhoService } from '../../kho/kho.service';
import { TimezoneService } from '../../../shared/services/timezone.service';
import { CancelOrderService } from '../../../shared/services/cancel-order.service';
@Component({
  selector: 'app-listdathang',
  templateUrl: './listdathang.component.html',
  styleUrls: ['./listdathang.component.scss'],  imports: [
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    // 'actions',
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
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật',
    // actions: 'Thao Tác',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DathangColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon: any = TrangThaiDon;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('dialogImportExcel') dialogImportExcel!: TemplateRef<any>;
  @ViewChild('dialogImportExcelCu') dialogImportExcelCu!: TemplateRef<any>;

  filterValues: { [key: string]: string } = {};
  private _DathangService: DathangService = inject(DathangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _KhoService: KhoService = inject(KhoService);
  private _router: Router = inject(Router);
  private _timezoneService: TimezoneService = inject(TimezoneService);
  cancelOrderService = inject(CancelOrderService);
  Listdathang: any = this._DathangService.ListDathang;
  page = this._DathangService.page;
  pageCount = this._DathangService.pageCount;
  total = this._DathangService.total;
  pageSize = this._DathangService.pageSize;
  dathangId = this._DathangService.dathangId;
  dataSource = new MatTableDataSource([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  suppliers: any[] = []; // List of suppliers for import
  dialog: MatDialog = inject(MatDialog);
  ListImportExcel: any[] = []; // Import data from Excel
  searchParam: any = {
    Batdau: moment().toDate(), // These are for datepicker - keep as Date objects
    Ketthuc: moment().toDate(), // These are for datepicker - keep as Date objects
    page: this.page(),
    pageSize: this.pageSize(),
  };
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
  onPreviousPage() {
    if (this.page() > 1) {
      this._DathangService.page.set(this.page() - 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }

  onNextPage() {
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
    this.setupDrawer();    // Initialize FilterNhacungcap for import dialog
    await this._NhacungcapService.getAllNhacungcap();
    this.FilterNhacungcap = Array(20)
      .fill(null)
      .map(() => this._NhacungcapService.ListNhacungcap());
    
    // Initialize Kho data for import dialog
    await this._KhoService.getAllKho();
    this.ImportConfig.ListKho = this._KhoService.ListKho();
    this.FilterKho = Array(20)
      .fill(null)
      .map(() => this._KhoService.ListKho());
  }
  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({
      key,
      value,
      isShow: true,
    }));
    this.FilterColumns = this.FilterColumns.length
      ? this.FilterColumns
      : this.Columns;
    localStorage.setItem(
      'DathangColFilter',
      JSON.stringify(this.FilterColumns)
    );
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map(
      (col) => col.key
    );
    this.ColumnName = this.FilterColumns.reduce(
      (acc, { key, value, isShow }) =>
        isShow ? { ...acc, [key]: value } : acc,
      {} as Record<string, string>
    );
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
    const uniqueList = list.filter(
      (obj: any, index: number, self: any) =>
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
    localStorage.setItem(
      'DathangColFilter',
      JSON.stringify(this.FilterColumns)
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
  UpdateDathang(item: any) {
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
    // Use existing data if no specific data provided
    this.searchParam.pageSize = 99999;
    await this._DathangService.getDathangBy(this.searchParam);
    const exportData = this.Listdathang();
    const exportTitle = `Danh Sách Đặt Hàng ${this._timezoneService.formatForDisplay(new Date(), 'DD-MM-YYYY')}`;

    await this._NhacungcapService.getAllNhacungcap();
    await this._SanphamService.getAllSanpham({ pageSize: 99999 });
    await this._BanggiaService.getAllBanggia();

    const ListDathang =
      Array.isArray(exportData) && exportData.length > 0
        ? exportData.flatMap((record: any) => {
            if (!Array.isArray(record.sanpham)) return [];
            return record.sanpham.map((sp: any) => ({
              ngaynhan: this._timezoneService.formatForDisplay(record.ngaynhan, 'DD/MM/YYYY'),
              mancc: record.nhacungcap?.mancc,
              name: record.nhacungcap?.name,
              masp: sp?.sanpham?.masp,
              tensp: sp?.sanpham?.title,
              sldat: Number(sp?.sldat) || 0,
              slgiao: Number(sp?.slgiao) || 0,
              slnhan: Number(sp?.slnhan) || 0,
              ghichu: sp?.ghichu,
              makho: record?.kho?.makho,
            }));
          })
        : [
            {
              ngaynhan: this._timezoneService.nowLocal('DD/MM/YYYY'),
              mancc: '',
              name: '',
              masp: '',
              tensp: '',
              sldat: 0,
              slgiao: 0,
              slnhan: 0,
              ghichu: '',
              makho: '',
            },
          ];
    console.log(ListDathang);
    console.log(this.Listdathang());

    // const NCC = this._NhacungcapService.ListNhacungcap().map((v: any) => ({
    //   mancc: v.mancc,
    //   name: v.name,
    //   diachi: v.diachi,
    //   email: v.email,
    //   sdt: v.sdt,
    // }));
    // const SP = this._SanphamService.ListSanpham().map((v: any) => ({
    //   subtitle: v.subtitle,
    //   masp: v.masp,
    //   title: v.title,
    //   dvt: v.dvt,
    // }));
    // const BG = this._BanggiaService.ListBanggia().map((v: any) => ({
    //   mabanggia: v.mabanggia,
    //   title: v.title,
    // }));

    // let index = 1;
    // const dataExport = exportData.flatMap((item: any) =>
    //   item.sanpham.map((sanpham: any) => {
    //     return {
    //       'STT': index++,
    //       'Nhà Cung Cấp': item.nhacungcap?.name || '',
    //       'Tên Sản Phẩm': sanpham.sanpham?.title || '',
    //       'DVT': sanpham.sanpham?.dvt || '',
    //       'SL Đặt': Number(sanpham.sldat) || 0,
    //       'Ghi Chú': item.ghichu || '',
    //     };
    //   })
    // );

    writeExcelFile(ListDathang, exportTitle);
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
  DoDanhan() {
    Promise.all(
      this.EditList.map((item: any) => {
        item.status = 'danhan';
        return this._DathangService.updateDathang(item);
      })
    ).then(() => {
      this.EditList = [];
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    });
  }
  dialogCreateRef: any;

  openDeleteDialog(template: TemplateRef<any>, item?: any) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe(async (result) => {
      if (result == 'true') {
        if (item) {
          await this._DathangService.DeleteDathang(item);
          return;
        }
        this.DeleteListItem();
      }
    });
  }

  openDathangDialog(template: TemplateRef<any>) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe(async (result) => {
      if (result == 'true') {
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
      const result: any = await this._DathangService.DeleteBulkDathang(
        this.EditList.map((v: any) => v.id)
      );
      this._snackBar.open(
        `Xóa thành công ${result.success} đặt hàng ${result.fail} lỗi`,
        '',
        {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
    } catch (error: any) {
      console.error('Lỗi khi xóa đặt hàng:', error);
      this._snackBar.open('Có lỗi xảy ra khi xóa đặt hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.EditList = [];
      await this.ngOnInit();
    }
  }
  // Excel Import functionality for Dathang - similar to Donhang
  statusDetails: any[] = [];
  ListImportData: any[] = [];
  FilterNhacungcap: any = [];
  FilterKho: any[] = []; // For kho filtering in dialog
  ImportConfig = {
    selectedDate: new Date(), // This stays as Date object for date picker
    selectedKho: '',
    ListKho: [] as any[],
  };

  async ImporExcel(event: any) {
    const files = Array.from(event.target.files) as File[];
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Reset arrays
    this.ListImportData = [];
    this.statusDetails = [];
    this.ListImportExcel = [];

    // Get suppliers and products for processing
    await this._NhacungcapService.getAllNhacungcap({ pageSize: 99999 });
    await this._SanphamService.getAllSanpham({ pageSize: 99999 });
    await this._KhoService.getAllKho();


    // Process files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const data = await readExcelFileNoWorker(file);
        console.log('Excel data:', data);

        // Check for either Sheet1 or dathang sheet
        const sheetData = data.Sheet1 || data.dathang;
        
        if (sheetData && sheetData.length > 0) {
          const processedData = this.processImportData(sheetData, file.name);

          if (processedData.length > 0) {
            this.ListImportExcel.push(...processedData);
            processedCount++;
          } else {
            skippedCount++;
          }
        } else {
          skippedCount++;
          this.statusDetails.push({
            fileName: file.name,
            status: 'Skipped',
            message: 'No valid data found in Sheet1 or dathang sheet',
          });
        }
      } catch (error: any) {
        console.error('Error processing file:', error);
        errorCount++;
        this.statusDetails.push({
          fileName: file.name,
          status: 'Error',
          message: error.message,
        });
      }
    }    // Show import dialog if we have processed data
    if (this.ListImportExcel.length > 0) {
      // Set default date to today
      this.ImportConfig.selectedDate = new Date(); // This stays as Date object for date picker
      
      // Set default kho for orders without specific kho
      this.setDefaultKhoForOrders();

      this.dialog.open(this.dialogImportExcel, {
        width: '95vw',
        maxWidth: '1400px',
        height: '95vh',
        disableClose: true,
      });
    } else {
      // Show status dialog for errors/skipped files
      this.dialog.open(this.dialogImportExcelCu, {
        width: '90vw',
        maxWidth: '1200px',
        height: '90vh',
      });
    }

    this._snackBar.open(
      `Xử lý ${files.length} file: ${processedCount} thành công, ${skippedCount} bỏ qua, ${errorCount} lỗi`,
      '',
      {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      }
    );

    // Reset file input
    event.target.value = '';
  }
  // Method mới để xử lý dữ liệu import theo format mới
  private processImportData(data: any[], fileName: string): any[] {
    const suppliers: any[] = this._NhacungcapService.ListNhacungcap();
    const products: any[] = this._SanphamService.ListSanpham();
    const khoList: any[] = this._KhoService.ListKho();
    const processedOrders: any[] = [];
    try {
      // Group data by mancc (unique supplier codes)
      const groupedBySupplier: Record<string, any[]> = {};

      // First, group all rows by mancc
      for (const row of data) {
        if (!row.mancc || !row.masp) continue;
        if (!groupedBySupplier[row.mancc]) {
          groupedBySupplier[row.mancc] = [];
        }
        groupedBySupplier[row.mancc].push(row);
      }
      // Process each supplier group
      for (const [mancc, rows] of Object.entries(groupedBySupplier)) {
        // Find supplier
        const supplier = suppliers.find((s) => s.mancc === mancc);
        if (!supplier) {
          this.statusDetails.push({
            fileName,
            status: 'Error',
            message: `Không tìm thấy nhà cung cấp: ${mancc}`,
            mancc: mancc,
          });
          continue;
        }

        // Process products for this supplier
        const validProducts: any[] = [];
        let hasErrors = false;

        for (const row of rows) {
          // Find product
          const product = products.find((p) => p.masp === row.masp);

          if (!product) {
            this.statusDetails.push({
              fileName,
              status: 'Error',
              message: `Không tìm thấy sản phẩm: ${row.masp}`,
              mancc: mancc,
              masp: row.masp,
            });
            hasErrors = true;
            continue;
          }

          validProducts.push({
            sanpham: {
              id: product.id,
              masp: product.masp,
              title: product.title,
              dvt: product.dvt || '',
            },
            sldat: Number(row.sldat) || 0,
            slgiao: Number(row.sldat) || 0,
            slnhan: Number(row.sldat) || 0,
            ghichu: row.ghichu || '',
            // Preserve original row data for reference
            originalData: row,
          });

          this.statusDetails.push({
            fileName,
            status: 'Processed',
            message: `Đã xử lý: ${product.title} - SL: ${row.sldat}`,
            mancc: mancc,
            masp: row.masp,
          });
        }

        // Only create order if we have valid products
        if (validProducts.length > 0) {
          // Get ngaynhan from first row (should be same for all rows of same supplier)
          const firstRow = rows[0];
          let ngaynhan = new Date(); // Default to current date

          if (firstRow.ngaynhan) {
            try {
              // Parse date from DD/MM/YYYY format
              const [day, month, year] = firstRow.ngaynhan.split('/');
              ngaynhan = moment(
                `${year}-${month}-${day}`,
                'YYYY-MM-DD'
              ).toDate();
            } catch (dateError) {
              console.warn(
                'Error parsing date, using current date:',
                dateError
              );
            }
          }          const dathangOrder = {
            id: `temp_${mancc}_${Date.now()}`, // Temporary ID for tracking
            title: `Đơn hàng ${
              firstRow.ngaynhan || this._timezoneService.nowLocal('DD/MM/YYYY')
            } - ${supplier.name}`,
            ngaynhan: ngaynhan,
            nhacungcapId: supplier.id,
            nhacungcap: supplier,
            makho: this.autoSelectKho(firstRow.makho, khoList), // Auto-select kho
            khoSelected: this.getKhoByMakho(firstRow.makho, khoList), // Selected kho object
            originalMakho: firstRow.makho || '', // Preserve original makho from Excel
            status: 'dadat',
            sanpham: validProducts,
            ghichu: '',
            fileName: fileName,
            // Config options for user to modify
            configOptions: {
              canChangeDate: true,
              canChangeKho: true,
              selectedDate: ngaynhan,
              selectedKho: this.autoSelectKho(firstRow.makho, khoList),
              confirmed: false,
              khoMatchStatus: this.getKhoMatchStatus(firstRow.makho, khoList),
            },
            // Summary info
            summary: {
              totalProducts: validProducts.length,
              totalQuantity: validProducts.reduce((sum, p) => sum + p.sldat, 0),
              supplierCode: mancc,
              supplierName: supplier.name,
            },
          };
          processedOrders.push(dathangOrder);
        }
      }
    } catch (error: any) {
      console.error('Error processing import data:', error);
      this.statusDetails.push({
        fileName,
        status: 'Error',
        message: error.message,
      });
    }

    return processedOrders;
  }

  // Generate order code
  private generateOrderCode(mancc: string): string {
    const today = this._timezoneService.formatForDisplay(new Date(), 'YYYYMMDD');
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `DH${mancc}-${today}-${random}`;
  }

  // Update date for specific order
  updateOrderDate(order: any, newDate: Date) {
    order.ngaynhan = newDate;
    order.configOptions.selectedDate = newDate;
    order.title = `Đơn hàng ${this._timezoneService.formatForDisplay(newDate, 'DD/MM/YYYY')} - ${
      order.nhacungcap.name
    }`;
  }

  // Update makho for specific order
  updateOrderKho(order: any, newKho: string) {
    order.makho = newKho;
    order.configOptions.selectedKho = newKho;
  }

  // Method to update kho selection for order
  updateOrderKhoSelection(order: any, newKho: any) {
    order.makho = newKho.makho;
    order.khoSelected = newKho;
    order.configOptions.selectedKho = newKho.makho;
    order.configOptions.khoMatchStatus = 'manual'; // Mark as manually selected
  }

  // Update global date for all orders
  updateAllOrdersDate(newDate: Date) {
    this.ImportConfig.selectedDate = newDate;
    this.ListImportExcel.forEach((order) => {
      this.updateOrderDate(order, newDate);
    });
  }
  // Update global kho for all orders
  updateAllOrdersKho(newKhoMakho: string) {
    this.ImportConfig.selectedKho = newKhoMakho;
    const selectedKho = this.ImportConfig.ListKho.find(k => k.makho === newKhoMakho);
    
    this.ListImportExcel.forEach((order) => {
      if (selectedKho) {
        this.updateOrderKhoSelection(order, selectedKho);
      }
    });
  }

  // Toggle confirmation for specific order
  toggleOrderConfirmation(order: any) {
    order.configOptions.confirmed = !order.configOptions.confirmed;
  }

  // Toggle confirmation for all orders
  toggleAllOrdersConfirmation() {
    const allConfirmed = this.ListImportExcel.every(
      (order) => order.configOptions.confirmed
    );
    this.ListImportExcel.forEach((order) => {
      order.configOptions.confirmed = !allConfirmed;
    });
  }

  // Get confirmed orders count
  getConfirmedOrdersCount(): number {
    return this.ListImportExcel.filter((order) => order.configOptions.confirmed)
      .length;
  }

  // Method to get kho match status display text
  getKhoMatchStatusText(status: string): string {
    switch (status) {
      case 'exact': return 'Khớp chính xác';
      case 'partial': return 'Khớp một phần';
      case 'name': return 'Khớp theo tên';
      case 'default': return 'Mặc định';
      case 'manual': return 'Đã chỉnh sửa';
      default: return 'Không tìm thấy';
    }
  }

  // Method to get kho match status color
  getKhoMatchStatusColor(status: string): string {
    switch (status) {
      case 'exact': return 'success';
      case 'partial': return 'warn';
      case 'name': return 'accent';
      case 'manual': return 'primary';
      default: return 'warn';
    }
  }

  // Import only confirmed orders
  async ImportConfirmedDathang(): Promise<void> {
    const confirmedOrders = this.ListImportExcel.filter(
      (order) => order.configOptions.confirmed
    );

    if (confirmedOrders.length === 0) {
      this._snackBar.open('Vui lòng xác nhận ít nhất một đơn hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }
    await this._KhoService.getAllKho();

    try {
      // Prepare data for import with product merging for duplicate masp
      const ordersToImport = confirmedOrders.map((order) => {
        const Kho = this._KhoService.ListKho().find(
          (k) => k.makho === order.makho);

        // Group and merge products with same masp
        const mergedProducts = this.mergeProductsByMasp(order.sanpham);

        return {
          ngaynhan: moment(order.ngaynhan).format('YYYY-MM-DD'),
          mancc: order?.nhacungcap.mancc,
          makho: order.makho,
          khoId: Kho?.id,
          status: order.status,
          sanpham: mergedProducts.map((sp: any) => ({
            masp: sp.masp,
            sldat: Number(sp.sldat),
            slgiao: Number(sp.slgiao),
            slnhan: Number(sp.slnhan),
            ghichu: sp.ghichu,
          })),
          ghichu: order.ghichu,
        };
      });
                            
      const result = await this._DathangService.ImportDathang(ordersToImport);

      this._snackBar.open(
        `Import thành công: ${result.success} đơn hàng, ${result.fail} lỗi`,
        '',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );

      this.dialog.closeAll();

      // Refresh data
      await this.ngOnInit();
    } catch (error: any) {
      console.error('Lỗi khi import đặt hàng:', error);
      this._snackBar.open(`Lỗi khi import: ${error.message}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Remove order from import list
  removeOrderFromImport(order: any) {
    this.ListImportExcel = this.ListImportExcel.filter(
      (o) => o.id !== order.id
    );

    if (this.ListImportExcel.length === 0) {
      this.dialog.closeAll();
    }
  }

  // Handle date selection for import
  DoChonNgaynhan(event: any, detail?: any) {
    const selectedDate = event.value;
    if (detail && detail !== 'All') {
      detail.ngaynhan = this._timezoneService.formatForDisplay(selectedDate, 'YYYY-MM-DD');
    } else {
      // Apply to all items
      this.ListImportExcel.forEach((item) => {
        item.details?.forEach((d: any) => {
          d.ngaynhan = this._timezoneService.formatForDisplay(selectedDate, 'YYYY-MM-DD');
        });
      });
    }
  }

  // Remove item from import list
  removeItemImport(detail: any) {
    this.ListImportExcel.forEach((order) => {
      if (order.details) {
        order.details = order.details.filter((d: any) => d !== detail);
      }
    });
    // Remove empty orders
    this.ListImportExcel = this.ListImportExcel.filter(
      (order) => order.details && order.details.length > 0
    );
  }

  // Select supplier for item
  SelectNhacungcap(detail: any, event: any) {
    const selectedSupplier = event.value;
    detail.nhacungcap = selectedSupplier;
    detail.manhacungcap =
      selectedSupplier?.id || selectedSupplier?.manhacungcap;
  }

  // Find supplier by typing
  DoFindNhacungcap(event: any, index: number) {
    const searchTerm = event.target.value.toLowerCase();
    // Filter suppliers based on search term
    this.suppliers = this.suppliers.filter(
      (supplier) =>
        supplier.name?.toLowerCase().includes(searchTerm) ||
        supplier.manhacungcap?.toLowerCase().includes(searchTerm)
    );
  }

  // Import existing supplier orders
  DoImportNhacungcapCu() {
    // Process import for existing suppliers
    this.ImportConfirmedDathang();
  }

  // Merge products with same masp by summing quantities
  mergeProductsByMasp(sanphamArray: any[]): any[] {
    const mergedMap = new Map<string, any>();

    sanphamArray.forEach((sp: any) => {
      const masp = sp.sanpham?.masp || sp.masp;
      
      if (mergedMap.has(masp)) {
        // Product already exists, merge quantities
        const existing = mergedMap.get(masp);
        existing.sldat = (Number(existing.sldat) || 0) + (Number(sp.sldat) || 0);
        existing.slgiao = (Number(existing.slgiao) || 0) + (Number(sp.slgiao) || 0);
        existing.slnhan = (Number(existing.slnhan) || 0) + (Number(sp.slnhan) || 0);
        
        // Combine notes if they exist and are different
        const existingNote = existing.ghichu || '';
        const newNote = sp.ghichu || '';
        if (newNote && existingNote !== newNote) {
          existing.ghichu = existingNote ? `${existingNote}; ${newNote}` : newNote;
        }
      } else {
        // First occurrence of this product
        mergedMap.set(masp, {
          masp: masp,
          sanpham: sp.sanpham || { masp: masp },
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          ghichu: sp.ghichu || '',
          title: sp.sanpham?.title || sp.title || '',
          dvt: sp.sanpham?.dvt || sp.dvt || ''
        });
      }
    });

    return Array.from(mergedMap.values());
  }

  // Get total quantity for an order
  getTotalQuantity(order: any): number {
    if (!order.details || !Array.isArray(order.details)) {
      return 0;
    }
    return order.details.reduce((total: number, detail: any) => {
      return total + (parseFloat(detail.soluong || '0') || 0);
    }, 0);
  }

  // Helper methods for kho auto-selection
  private autoSelectKho(makho: string, khoList: any[]): string {
    if (!makho || !khoList?.length) {
      return khoList?.[0]?.makho || ''; // Default to first kho if available
    }

    // 1. Exact match
    const exactMatch = khoList.find(k => k.makho === makho);
    if (exactMatch) {
      return exactMatch.makho;
    }

    // 2. Partial match (case insensitive)
    const partialMatch = khoList.find(k => 
      k.makho?.toLowerCase().includes(makho.toLowerCase()) ||
      makho.toLowerCase().includes(k.makho?.toLowerCase())
    );
    if (partialMatch) {
      return partialMatch.makho;
    }

    // 3. Match by name (warehouse name)
    const nameMatch = khoList.find(k => 
      k.name?.toLowerCase().includes(makho.toLowerCase()) ||
      makho.toLowerCase().includes(k.name?.toLowerCase())
    );
    if (nameMatch) {
      return nameMatch.makho;
    }

    // 4. Default to first kho if no match
    return khoList[0]?.makho || '';
  }

  private getKhoByMakho(makho: string, khoList: any[]): any {
    const selectedMakho = this.autoSelectKho(makho, khoList);
    return khoList.find(k => k.makho === selectedMakho) || khoList[0] || null;
  }

  private getKhoMatchStatus(makho: string, khoList: any[]): 'exact' | 'partial' | 'name' | 'default' | 'none' {
    if (!makho || !khoList?.length) {
      return khoList?.length ? 'default' : 'none';
    }

    // Exact match
    if (khoList.find(k => k.makho === makho)) {
      return 'exact';
    }

    // Partial match
    if (khoList.find(k => 
      k.makho?.toLowerCase().includes(makho.toLowerCase()) ||
      makho.toLowerCase().includes(k.makho?.toLowerCase())
    )) {
      return 'partial';
    }

    // Name match
    if (khoList.find(k => 
      k.name?.toLowerCase().includes(makho.toLowerCase()) ||
      makho.toLowerCase().includes(k.name?.toLowerCase())
    )) {
      return 'name';
    }

    return 'default';
  }

  // Set default kho for orders that don't have kho selection
  private setDefaultKhoForOrders() {
    const defaultKho = this.ImportConfig.ListKho?.[0];
    if (!defaultKho) return;

    this.ListImportExcel.forEach((order) => {
      if (!order.khoSelected && order.configOptions.khoMatchStatus === 'default') {
        order.khoSelected = defaultKho;
        order.makho = defaultKho.makho;
        order.configOptions.selectedKho = defaultKho.makho;
      }
    });
  }

  // Get orders statistics
  getOrdersStatistics() {
    const total = this.ListImportExcel.length;
    const confirmed = this.getConfirmedOrdersCount();
    const exactMatch = this.ListImportExcel.filter(o => o.configOptions?.khoMatchStatus === 'exact').length;
    const partialMatch = this.ListImportExcel.filter(o => o.configOptions?.khoMatchStatus === 'partial').length;
    const nameMatch = this.ListImportExcel.filter(o => o.configOptions?.khoMatchStatus === 'name').length;
    const defaultMatch = this.ListImportExcel.filter(o => o.configOptions?.khoMatchStatus === 'default').length;
    const manualMatch = this.ListImportExcel.filter(o => o.configOptions?.khoMatchStatus === 'manual').length;

    return {
      total,
      confirmed,
      exactMatch,
      partialMatch,
      nameMatch,
      defaultMatch,
      manualMatch,
    };
  }

  /**
   * Xử lý hủy đơn đặt hàng
   * Sử dụng CancelOrderService để mở dialog và xử lý toàn bộ flow
   */
  async handleCancelDathang(order: any): Promise<void> {
    const success = await this.cancelOrderService.cancelDathang(order);
    
    if (success) {
      // Service đã tự động refresh danh sách
      console.log('Đơn đặt hàng đã được hủy thành công');
    }
  }

  /**
   * Lấy label hiển thị cho status
   */
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'choxuly': 'Chờ xử lý',
      'dangxuly': 'Đang xử lý',
      'hoanthanh': 'Hoàn thành',
      'huy': 'Đã hủy',
      'dahuy': 'Đã hủy'
    };
    return labels[status] || status;
  }

  /**
   * Lấy class CSS cho status badge
   */
  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'hoanthanh': 'bg-green-100 text-green-800',
      'dangxuly': 'bg-blue-100 text-blue-800',
      'choxuly': 'bg-yellow-100 text-yellow-800',
      'huy': 'bg-red-100 text-red-800',
      'dahuy': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  /**
   * Mở dialog so sánh giá từ các nhà cung cấp
   */
  @ViewChild('dialogComparePrice') dialogComparePrice!: TemplateRef<any>;
  comparePriceData: any[] = [];
  comparePriceColumns: string[] = [];
  comparePriceTotalRecords = 0;
  
  async openComparePriceDialog() {
    try {
      console.log('[COMPARE-PRICE] Opening dialog...');
      console.log('[COMPARE-PRICE] Date range:', this.searchParam.Batdau, '->', this.searchParam.Ketthuc);
      
      // Show loading
      const loadingSnackBar = this._snackBar.open('Đang tải dữ liệu so sánh giá...', '', {
        duration: 0,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

      // Fetch all data trong khoảng thời gian
      const allData = await this.fetchComparePriceData();
      
      loadingSnackBar.dismiss();
      
      if (!allData || allData.length === 0) {
        this._snackBar.open('Không có dữ liệu trong khoảng thời gian này', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      // Store full data for export
      this.comparePriceData = allData;
      this.comparePriceTotalRecords = allData.length;
      
      // Build dynamic columns
      this.buildComparePriceColumns(allData);
      
      console.log('[COMPARE-PRICE] Data loaded:', allData.length, 'products');
      
      // Open dialog
      this.dialog.open(this.dialogComparePrice, {
        width: '95vw',
        maxWidth: '95vw',
        height: '90vh',
        maxHeight: '90vh',
        panelClass: 'compare-price-dialog',
      });
      
    } catch (error) {
      console.error('[COMPARE-PRICE] Error:', error);
      this._snackBar.open('Lỗi tải dữ liệu so sánh giá', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }

  /**
   * Fetch data cho so sánh giá
   */
  private async fetchComparePriceData(): Promise<any[]> {
    // Fetch tất cả đơn hàng trong khoảng thời gian
    const originalPageSize = this.searchParam.pageSize;
    this.searchParam.pageSize = 99999; // Get all
    
    await this._DathangService.getDathangBy(this.searchParam);
    
    // Restore
    this.searchParam.pageSize = originalPageSize;
    
    const dathangList = this._DathangService.ListDathang();
    
    // Group theo sản phẩm
    const productMap = new Map<string, any>();
    
    dathangList.forEach((dathang: any) => {
      const nhacungcap = dathang.nhacungcap?.name || 'N/A';
      const nhacungcapCode = dathang.nhacungcap?.mancc || 'N/A';
      const ngaynhan = dathang.ngaynhan ? moment(dathang.ngaynhan).format('DD/MM/YYYY') : 'N/A';
      
      dathang.sanpham?.forEach((sp: any) => {
        const masp = sp.sanpham?.masp || sp.masp || 'N/A';
        const title = sp.sanpham?.title || sp.title || 'N/A';
        const dvt = sp.sanpham?.dvt || sp.dvt || '';
        
        const key = masp; // Group by product code
        
        if (!productMap.has(key)) {
          productMap.set(key, {
            masp,
            title,
            dvt,
            suppliers: {}
          });
        }
        
        const product = productMap.get(key);
        const supplierKey = `${nhacungcapCode}_${ngaynhan}`;
        
        if (!product.suppliers[supplierKey]) {
          product.suppliers[supplierKey] = {
            nhacungcap,
            nhacungcapCode,
            ngaynhan,
            sldat: 0,
            gianhap: sp.gianhap || 0,
            count: 0
          };
        }
        
        product.suppliers[supplierKey].sldat += (sp.sldat || 0);
        product.suppliers[supplierKey].count += 1;
      });
    });
    
    // Convert Map to Array
    return Array.from(productMap.values());
  }

  /**
   * Build dynamic columns for compare table
   */
  private buildComparePriceColumns(data: any[]) {
    const supplierSet = new Set<string>();
    
    data.forEach(product => {
      Object.keys(product.suppliers || {}).forEach(key => {
        supplierSet.add(key);
      });
    });
    
    this.comparePriceColumns = ['stt', 'masp', 'title', 'dvt', ...Array.from(supplierSet)];
  }

  /**
   * Get displayed data (first 10 for demo)
   */
  getDisplayedComparePriceData(): any[] {
    return this.comparePriceData.slice(0, 10);
  }

  /**
   * Export Excel with full data
   */
  async exportComparePriceExcel() {
    try {
      console.log('[EXPORT] Exporting', this.comparePriceData.length, 'products...');
      
      // Prepare data for Excel
      const excelData: any[] = [];
      
      // Get all unique supplier keys
      const supplierKeys = new Set<string>();
      this.comparePriceData.forEach(product => {
        Object.keys(product.suppliers || {}).forEach(key => supplierKeys.add(key));
      });
      
      const sortedSupplierKeys = Array.from(supplierKeys).sort();
      
      // Header row 1: Supplier names
      const headerRow1: any = {
        'STT': 'STT',
        'Mã SP': 'Mã SP',
        'Tên sản phẩm': 'Tên sản phẩm',
        'ĐVT': 'ĐVT'
      };
      
      sortedSupplierKeys.forEach(key => {
        const supplier = this.comparePriceData[0]?.suppliers[key];
        if (supplier) {
          headerRow1[key] = `${supplier.nhacungcap} (${supplier.nhacungcapCode}) - ${supplier.ngaynhan}`;
        }
      });
      
      // Header row 2: Column names
      const headerRow2: any = {
        'STT': '',
        'Mã SP': '',
        'Tên sản phẩm': '',
        'ĐVT': ''
      };
      
      sortedSupplierKeys.forEach(key => {
        headerRow2[key] = 'SL Đặt | Giá nhập';
      });
      
      excelData.push(headerRow1);
      excelData.push(headerRow2);
      
      // Data rows
      this.comparePriceData.forEach((product, index) => {
        const row: any = {
          'STT': index + 1,
          'Mã SP': product.masp,
          'Tên sản phẩm': product.title,
          'ĐVT': product.dvt
        };
        
        sortedSupplierKeys.forEach(key => {
          const supplier = product.suppliers[key];
          if (supplier) {
            row[key] = `${supplier.sldat} | ${supplier.gianhap.toLocaleString('vi-VN')} đ`;
          } else {
            row[key] = '-';
          }
        });
        
        excelData.push(row);
      });
      
      // Create workbook
      const worksheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'So sánh giá');
      
      // Auto column width
      const maxWidths: any = {};
      excelData.forEach(row => {
        Object.keys(row).forEach(key => {
          const value = String(row[key] || '');
          maxWidths[key] = Math.max(maxWidths[key] || 10, value.length);
        });
      });
      
      worksheet['!cols'] = Object.keys(excelData[0] || {}).map(key => ({
        wch: Math.min(maxWidths[key] || 10, 50)
      }));
      
      // Export
      const fileName = `So_sanh_gia_${moment(this.searchParam.Batdau).format('DDMMYYYY')}_${moment(this.searchParam.Ketthuc).format('DDMMYYYY')}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      this._snackBar.open('✓ Xuất Excel thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      
    } catch (error) {
      console.error('[EXPORT] Error:', error);
      this._snackBar.open('Lỗi xuất Excel', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
