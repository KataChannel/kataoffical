import {
  ChangeDetectionStrategy,
  Component,
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
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonhangService } from '../donhang.service';
import { MatMenuModule } from '@angular/material/menu';
import {
  readExcelFileNoWorker,
  writeExcelFileWithSheets,
} from '../../../shared/utils/exceldrive.utils';
import { GenId } from '../../../shared/utils/shared.utils';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { BanggiaService } from '../../banggia/banggia.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import { SharepaginationComponent } from '../../../shared/common/sharepagination/sharepagination.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { CancelOrderService } from '../../../shared/services/cancel-order.service';
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
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    // SharepaginationComponent,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDonhangComponent {
  displayedColumns: string[] = [
    'madonhang',
    'name',
    'sanpham',
    'ngaygiao',
    'ghichu',
    'status',
    'createdAt',
    'updatedAt',
    'actions',
    'lydohuy',
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
    actions: 'Thao Tác',
    lydohuy: 'Lý Do Hủy',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('DonhangColFilter') || '[]'
  );
  Columns: any[] = [];
  isLoading = signal<boolean>(false);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('dialogImportExcelCu') dialogImportExcelCu!: TemplateRef<any>;
  @ViewChild('ConfirmDongboDialog') confirmDongboDialog!: TemplateRef<any>;
  @ViewChild('ConfirmDuplicateDialog') confirmDuplicateDialog!: TemplateRef<any>;
  @ViewChild('DuplicateMergeDialog') duplicateMergeDialog!: TemplateRef<any>;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _KhachhangService: KhachhangService = inject(KhachhangService);
  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  cancelOrderService = inject(CancelOrderService);
  Listdonhang = signal<any[]>([]);
  dataSource = new MatTableDataSource<any>([]);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  Trangthaidon: any = TrangThaiDon;
  SearchParams: any = {
    Batdau: moment().startOf('day').toDate(),
    Ketthuc: moment().endOf('day').toDate(),
    Type: 'all',
    pageSize: 10,
    pageNumber: 1,
  };
  pageSize = signal<number>(10);
  page = signal<number>(1);
  total = signal<number>(0);
  pageCount = signal<number>(0);
  FilterKhachhang: any[] = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
    this.LoadData()
  }
  async onPageChange(event: any): Promise<void> {
    console.log('Page change event:', event);

    // Show loading indicator during page change
    this.isLoading.set(true);

    try {
      this.SearchParams.pageSize = event.pageSize;
      this.SearchParams.pageNumber = event.page;
      await this.LoadData();
    } catch (error) {
      console.error('Error changing page:', error);
      this._snackBar.open('Lỗi khi chuyển trang', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  ListKhachhang:any[] =[]

  async LoadListKhachhang(){
      const result = await this._GraphqlService.findAll('khachhang', {
        enableParallelFetch: true,
        take: 999999,
        enableStreaming: true,
        aggressiveCache: true,
        select: {
          id: true,
          tenfile: true,
          tenkh: true,
          name: true,
          namenn: true,
          subtitle: true,
          makh: true,
          makhold: true,
          diachi: true,
          sdt: true,
          mst: true,
          gionhanhang: true,
          quan: true,
          email: true,
          phone: true,
          address: true,
          loaikh: true,
          ghichu: true,
          hiengia: true,
          isActive: true,
          istitle2: true,
          isshowvat: true,
          banggiaId: true,
          createdAt: true,
          updatedAt: true,
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true,
              type: true,
              batdau: true,
              ketthuc: true,
              order: true,
              ghichu: true,
              status: true,
              isActive: true,
              isDefault: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      this.ListKhachhang = result.data;
  }
  async LoadData() {
    // await this._KhachhangService.getAllKhachhang();
    this.LoadListKhachhang();    
    this.isLoading.set(true);
    try {
       this._GraphqlService.clearCache('donhang');
      const result = await this._GraphqlService.findAll('donhang', {
        enableParallelFetch: true,
        maxConcurrency: 4,
        batchSize: 3000,
        take: 999999,
        enableStreaming: true,
        aggressiveCache: true,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          ghichu: true,
          isshowvat: true,
          status: true,
          createdAt: true,
          tongvat: true,
          tongtien: true,
          vat: true,
          type: true,
          lydohuy: true,
          sanpham: {
            select: {
              sanpham: { select: { masp: true } },
            },
          },
          khachhang: {
            select: {
              makh: true,
              name: true,
              loaikh: true,
            },
          }
        },
        where: {
          ngaygiao: {
            gte: this.SearchParams.Batdau,
            lte: this.SearchParams.Ketthuc,
          },
          ...(this.SearchParams.Type !== 'all' && {
            khachhang: {
              loaikh: this.SearchParams.Type,
            },
          }),
        },
      })
        
      const donhangs = result.data.map((v: any) => ({
          id: v.id,
          madonhang: v.madonhang,
          name: v.khachhang?.name || '',
          sanpham: v.sanpham?.length,
          ngaygiao: v.ngaygiao,
          ghichu: v.ghichu || '',
          status: v.status,
          createdAt: v.createdAt,
          updatedAt: v.updatedAt || v.createdAt,
          tongtien:v.tongtien,
          vat:v.vat,
          tongvat:v.tongvat,
          lydohuy: v.lydohuy || ''
        }));
      this.Listdonhang.set(donhangs);
      if (donhangs) {
        this.dataSource = new MatTableDataSource(donhangs);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        this.total.set(donhangs.length);
        this.pageCount.set(Math.ceil(donhangs.length / this.pageSize()));
      } else {
        // Handle empty or invalid response
        this.total.set(0);
        this.pageSize.set(10);
        this.page.set(1);
        this.pageCount.set(0);
        this.dataSource = new MatTableDataSource<any>([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this._snackBar.open('Lỗi tải dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      this.total.set(0);
      this.pageCount.set(0);
       this.dataSource = new MatTableDataSource<any>([]);
    } finally {
      this.isLoading.set(false);
    }
  }  
  async getAllKhachhang(){
    const result = await this._GraphqlService.findAll('khachhang', {
      enableParallelFetch: true,
      take: 999999,
      enableStreaming: true,
      aggressiveCache: true,
      })
      console.log(result);
  }
  async onSelectionChange(event: MatSelectChange): Promise<void> {
    this.isLoading.set(true);
    try {
      this.SearchParams.Type = event.value;
      await this.LoadData();
    } catch (error) {
      console.error('Error changing time selection:', error);
      this._snackBar.open('Lỗi khi thay đổi thời gian', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async onTypeChange(value: string): Promise<void> {
    this.isLoading.set(true);
    try {
      this.SearchParams.Type = value;
      await this.LoadData();
    } catch (error) {
      console.error('Error changing type selection:', error);
      this._snackBar.open('Lỗi khi thay đổi loại đơn hàng', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  onDateChange(event: any): void {
    // Show loading indicator during date change
    this.isLoading.set(true);

    try {
      // Reset to first page when changing date
      this.SearchParams.pageNumber = 1;
      this.LoadData();
    } catch (error) {
      console.error('Error changing date:', error);
      this._snackBar.open('Lỗi khi thay đổi ngày', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
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
  @Debounce(100)
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    // Clear filter if search is empty
    if (filterValue.length === 0) {
      this.dataSource.filter = '';
      return;
    }
    
    // Show loading indicator
    this.isLoading.set(true);
    
    try {
      // Use setTimeout to ensure UI updates before heavy computation
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const normalizedFilter = removeVietnameseAccents(filterValue.trim().toLowerCase());
      
      // Custom filter predicate to handle Vietnamese text search
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
          return currentTerm + (data[key] ? data[key].toString().toLowerCase() : '') + '◬';
        }, '').toLowerCase();
        
        const normalizedDataStr = removeVietnameseAccents(dataStr);
        
        // Search in both original and normalized text
        return dataStr.includes(filter) || normalizedDataStr.includes(filter);
      };
      
      this.dataSource.filter = normalizedFilter;
      
      // Reset to first page when filtering
      if (this.paginator) {
        this.paginator.firstPage();
      }
      
    } catch (error) {
      console.error('Error applying filter:', error);
      this._snackBar.open('Lỗi khi tìm kiếm', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      // Hide loading indicator after filter is applied
      this.isLoading.set(false);
    }
  }

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.initializeColumns();
      this.setupDrawer();
      await this.LoadData();
    } catch (error) {
      console.error('Error initializing component:', error);
      this._snackBar.open('Lỗi khởi tạo trang', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
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
          // this.paginator.hidePageSize = true;
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
  async doFilterHederColumn(event: any, column: any): Promise<void> {
    const query = event.target.value.toLowerCase();

    // Show loading indicator during column filtering
    this.isLoading.set(true);

    try {
      // Reset to first page when filtering
      this.SearchParams.pageNumber = 1;
      this.SearchParams[`${column}Filter`] = query;

      // Load data from server with column filter
      await this.LoadData();
    } catch (error) {
      console.error('Error filtering column:', error);
      this._snackBar.open('Lỗi khi lọc dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.data.filter(
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
    this.ListFilter = this.Listdonhang() || [];
    this.dataSource.data = this.Listdonhang() || [];
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

  // async Dongbogia() {
  //   // Kiểm tra có đơn hàng nào được chọn không
  //   if (this.Listdonhang().length === 0) {
  //     this._snackBar.open('Không có đơn hàng nào để đồng bộ giá', '', {
  //       duration: 3000,
  //       horizontalPosition: 'end',
  //       verticalPosition: 'top',
  //       panelClass: ['snackbar-warning'],
  //     });
  //     return;
  //   }

  //   // Hiển thị dialog xác nhận với thông tin về batch processing
  //   const batchSize = 5;
  //   const totalBatches = Math.ceil(this.Listdonhang().length / batchSize);
    
  //   const confirmDialog = confirm(`Bạn có chắc chắn muốn đồng bộ giá cho ${this.Listdonhang().length} đơn hàng không?\n\nThao tác sẽ được thực hiện theo ${totalBatches} lần (mỗi lần ${batchSize} đơn hàng) để đảm bảo hiệu suất.\n\nLưu ý: Thao tác này sẽ cập nhật giá bán từ bảng giá tương ứng và tính lại tổng tiền của tất cả đơn hàng.`);
    
  //   if (!confirmDialog) {
  //     return;
  //   }

  //   this.isLoading.set(true);
    
  //   // Hiển thị progress snackbar
  //   let progressSnackbar = this._snackBar.open(`Đang đồng bộ giá cho ${this.Listdonhang().length} đơn hàng...`, 'Đang xử lý', {
  //     duration: 0, // Không tự động đóng
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: ['snackbar-success'],
  //   });

  //   try {
  //     const result = await this._DonhangService.DongboGia(this.Listdonhang());

  //     // Đóng progress snackbar
  //     progressSnackbar.dismiss();

  //     if (result && result.status === 'success') {
  //       let message = result.message || 'Đồng bộ giá thành công';
        
  //       // Thêm thông tin chi tiết nếu có
  //       if (result.updatedCount !== undefined) {
  //         const successRate = Math.round((result.updatedCount / result.totalProcessed) * 100);
  //         message = `✅ Đồng bộ giá hoàn tất!\n📊 Kết quả: ${result.updatedCount}/${result.totalProcessed} đơn hàng (${successRate}%)`;
          
  //         if (result.errorCount > 0) {
  //           message += `\n⚠️ Lỗi: ${result.errorCount} đơn hàng không thể cập nhật`;
  //         }
  //       }

  //       this._snackBar.open(message, '✅ Thành công', {
  //         duration: 6000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: ['snackbar-success'],
  //       });

  //       // Reload data sau khi sync thành công
  //       await this.LoadData();
  //       this.EditList = [];
  //     } else {
  //       this._snackBar.open(result?.message || 'Đồng bộ giá thất bại', '❌ Lỗi', {
  //         duration: 4000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: ['snackbar-error'],
  //       });
  //     }
  //   } catch (error: any) {
  //     console.error('Error syncing prices:', error);
      
  //     // Đóng progress snackbar nếu còn mở
  //     progressSnackbar.dismiss();
      
  //     let errorMessage = 'Lỗi khi đồng bộ giá';
      
  //     // Xử lý các loại lỗi phổ biến
  //     if (error?.error?.message) {
  //       errorMessage = error.error.message;
  //       if (error.error.message.includes('Transaction already closed')) {
  //         errorMessage = '⏱️ Thao tác mất quá nhiều thời gian. Vui lòng thử lại với ít đơn hàng hơn.';
  //       }
  //     } else if (error?.message) {
  //       errorMessage = error.message;
  //       if (error.message.includes('timeout')) {
  //         errorMessage = '⏱️ Hết thời gian chờ. Hệ thống đang xử lý quá nhiều đơn hàng cùng lúc.';
  //       }
  //     }

  //     this._snackBar.open(`❌ ${errorMessage}`, 'Đóng', {
  //       duration: 6000,
  //       horizontalPosition: 'end',
  //       verticalPosition: 'top',
  //       panelClass: ['snackbar-error'],
  //     });
  //   } finally {
  //     this.isLoading.set(false);
  //   }
  // }


  /**
   * Format date for display
   */
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  /**
   * Open duplicate confirmation dialog
   */
  openDuplicateDialog(duplicateData: any): Promise<string> {
    return new Promise((resolve) => {
      this.duplicateDialogData = duplicateData;
      
      const dialogRef = this.dialog.open(this.confirmDuplicateDialog, {
        hasBackdrop: true,
        disableClose: true,
        width: '700px',
        maxWidth: '95vw',
        maxHeight: '90vh'
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        this.duplicateDialogData = null;
        resolve(result || 'skip');
      });
    });
  }

  async DongboVat() {
    this.openDongboDialog();
  }

  /**
   * Open sync confirmation dialog
   */
  openDongboDialog() {
    if (this.EditList.length === 0) {
      this._snackBar.open('Không có đơn hàng nào để đồng bộ', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    const dialogRef = this.dialog.open(this.confirmDongboDialog, {
      hasBackdrop: true,
      disableClose: true,
      width: '600px',
      maxWidth: '90vw'
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.executeDongboVat();
      }
    });
  }

  /**
   * Execute the actual sync operation
   */
  async executeDongboVat() {
    this.isLoading.set(true);
    
    // Hiển thị progress snackbar
    let progressSnackbar = this._snackBar.open(
      `Đang đồng bộ giá và VAT cho ${this.EditList.length} đơn hàng...`, 
      'Đang xử lý', 
      {
        duration: 0, // Không tự động đóng
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      }
    );

    try {
      // Bước 1: Đồng bộ giá từ bảng giá
      const priceResult = await this._DonhangService.DongboGia(this.EditList);
      
      if (!priceResult || priceResult.status !== 'success') {
        throw new Error(priceResult?.message || 'Lỗi đồng bộ giá');
      }

      // Bước 2: Tính VAT cho các đơn hàng đã cập nhật giá
      let vatUpdatedCount = 0;
      let vatErrorCount = 0;
      const vatErrors: string[] = [];

      // Lấy lại dữ liệu đơn hàng mới nhất sau khi đồng bộ giá
      await this.LoadData();

      // Xử lý VAT cho từng đơn hàng trong EditList
      for (const order of this.EditList) {
        try {
          // Tìm đơn hàng đã được cập nhật giá
          const updatedOrder = this.dataSource.data.find(o => o.id === order.id);
          const tongtien = Number(updatedOrder?.tongtien || order.tongtien) || 0;
          const vatRate = Number(updatedOrder?.vat || order.vat) || 0.05; // Mặc định 5% nếu không có
          const tongvat = tongtien * vatRate;

          // Cập nhật VAT qua GraphQL
          await this._GraphqlService.updateOne('donhang', 
            { id: order.id }, 
            { 
              tongvat: Math.round(tongvat * 100) / 100, // Làm tròn 2 chữ số thập phân
              vat: vatRate 
            }
          );

          // Cập nhật trong danh sách local
          order.tongvat = Math.round(tongvat * 100) / 100;
          order.tongtien = tongtien;
          vatUpdatedCount++;

        } catch (error: any) {
          console.error(`Error updating VAT for order ${order.madonhang}:`, error);
          vatErrorCount++;
          vatErrors.push(`${order.madonhang}: ${error.message || 'Lỗi không xác định'}`);
        }
      }

      // Đóng progress snackbar
      progressSnackbar.dismiss();

      // Hiển thị kết quả tổng hợp
      if (priceResult.updatedCount > 0 || vatUpdatedCount > 0) {
        let message = `✅ Đồng bộ hoàn tất!\n`;
        
        // Thông tin đồng bộ giá
        if (priceResult.updatedCount !== undefined) {
          const priceSuccessRate = Math.round((priceResult.updatedCount / priceResult.totalProcessed) * 100);
          message += `📊 Giá: ${priceResult.updatedCount}/${priceResult.totalProcessed} đơn hàng (${priceSuccessRate}%)\n`;
          
          if (priceResult.errorCount > 0) {
            message += `⚠️ Lỗi giá: ${priceResult.errorCount} đơn hàng\n`;
          }
        }

        // Thông tin đồng bộ VAT
        const vatSuccessRate = Math.round((vatUpdatedCount / this.EditList.length) * 100);
        message += `💰 VAT: ${vatUpdatedCount}/${this.EditList.length} đơn hàng (${vatSuccessRate}%)`;
        
        if (vatErrorCount > 0) {
          message += `\n⚠️ Lỗi VAT: ${vatErrorCount} đơn hàng`;
          console.warn('VAT sync errors:', vatErrors);
        }

        this._snackBar.open(message, '✅ Thành công', {
          duration: 8000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Refresh data để đồng bộ với server
        await this.LoadData();
        
        // Clear selection sau khi hoàn thành
        this.EditList = [];
      } else {
        this._snackBar.open('❌ Không có đơn hàng nào được cập nhật', 'Đóng', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }

    } catch (error: any) {
      console.error('Error syncing prices and VAT:', error);
      
      // Đóng progress snackbar nếu còn mở
      progressSnackbar.dismiss();
      
      let errorMessage = 'Lỗi khi đồng bộ giá và VAT';
      
      // Xử lý các loại lỗi phổ biến
      if (error?.error?.message) {
        errorMessage = error.error.message;
        if (error.error.message.includes('Transaction already closed')) {
          errorMessage = '⏱️ Thao tác mất quá nhiều thời gian. Vui lòng thử lại với ít đơn hàng hơn.';
        }
      } else if (error?.message) {
        errorMessage = error.message;
        if (error.message.includes('timeout')) {
          errorMessage = '⏱️ Hết thời gian chờ. Hệ thống đang xử lý quá nhiều đơn hàng cùng lúc.';
        }
      }

      this._snackBar.open(`❌ ${errorMessage}`, 'Đóng', {
        duration: 6000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
    }
  }
  
  dialog = inject(MatDialog);
  statusDetails: any[] = [];
  ListImportData: any[] = [];
  EditList: any[] = [];
  duplicateDialogData: any = null;
  duplicateMergeData: { totalCount: number; details: any[] } | null = null;

  async ImporExcel(event: any) {
    this.isLoading.set(true);
    const files = Array.from(event.target.files) as File[];
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    try {
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
            Quantity: Number(item.Quantity) ?? 0,
            Remark: item.Remark ?? '',
          }));
        const itemEdit = {
          tenfile: removeVietnameseAccents(file.name.replace('.xlsx', '')),
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
    }
    await this._SanphamService.getAllSanpham({ pageSize: 99999 });
    this.dialog.open(this.dialogImportExcelCu, {
      disableClose: true,
    });
    this.statusDetails.forEach((v: any, k: any) => {
      this.FilterKhachhang[k] = this.ListKhachhang;
    });
    // Sort to put 'Processed' status items at the top
    this.statusDetails.sort((a, b) => {
      if (a.status === 'Processed' && b.status !== 'Processed') return -1;
      if (a.status !== 'Processed' && b.status === 'Processed') return 1;
      return 0;
    });

      // Auto-select customers based on filename matching
      this.autoSelectCustomersFromFilename();
    } catch (error) {
      console.error('Error processing Excel files:', error);
      this._snackBar.open('Lỗi khi xử lý file Excel', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
    }
  }
  removeItemImport(item: any) {
    this.statusDetails = this.statusDetails.filter(
      (v) => v.tenkhongdau !== item.tenkhongdau
    );
    this.ListImportData = this.ListImportData.filter(
      (v) => v.tenkh !== item.tenkhongdau
    );
  }

  async DoImportKhachhangCu(ListImportData: any[]) {
    this.isLoading.set(true);
    try {
      console.log('ListImportData', ListImportData);
      const invalidItems = ListImportData.filter(
        (item) => !item.khachhangId || !item.ngaygiao
      );
      console.log(ListImportData);
      
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
      
      const result = await this._DonhangService.ImportDonhangCu(ListImportData);
      
      // 🎯 NEW LOGIC: Handle duplicate confirmation
      if (result.needsConfirmation) {
        this.isLoading.set(false); // Stop loading while waiting for user input
        
        // Show confirmation dialog for duplicates
        const userChoice = await this.openDuplicateDialog({
          message: result.message,
          duplicates: result.duplicates
        });
        
        this.isLoading.set(true); // Resume loading for processing
        const confirmedResult = await this._DonhangService.ImportDonhangCuConfirmed(result.pendingOrders, userChoice as 'proceed' | 'skip');
        
        // Combine results from initial processing and confirmed processing
        const finalResult = {
          success: result.processResults.success + confirmedResult.success,
          fail: result.processResults.fail + confirmedResult.fail,
          skip: result.processResults.skip + confirmedResult.skip,
          message: confirmedResult.message
        };
        
        this.dialog.closeAll();
        this._snackBar.open(
          `${finalResult.message} - Tổng kết: Thành công ${finalResult.success}, Thất bại ${finalResult.fail}, Bỏ qua ${finalResult.skip}`,
          '',
          {
            duration: 6000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } else {
        // Normal processing without duplicates
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
      }
    } catch (importError: any) {
      console.error('Lỗi khi nhập đơn hàng:', importError);
      this._snackBar.open(`Lỗi khi nhập đơn hàng: ${importError.message}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    } finally {
      this.isLoading.set(false);
    }
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  }

  async ImportDonhang(items: any[]) {
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
    console.log('Importing items:', items);

    this.isLoading.set(true);
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
            sldat: parseFloat(Number(item.sldat).toFixed(3)) || 0,
            slgiao: parseFloat(Number(item.sldat).toFixed(3)) || 0,
            slnhan: parseFloat(Number(item.sldat).toFixed(3)) || 0,
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
        status: 'dadat',
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
    } finally {
      this.isLoading.set(false);
    }
  }
  async ExportExcel(data: any, title: any) {
    await this._KhachhangService.getAllKhachhang();
    await this._SanphamService.getAllSanpham();
    await this._BanggiaService.getAllBanggia();
    const KH = this.ListKhachhang.map((v: any) => ({
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

  /**
   * Auto-select customers based on filename matching
   * Matches filename (tenkhongdau) with customer data fields like name, subtitle, makh
   */
  autoSelectCustomersFromFilename(): void {
    if (
      !this.statusDetails?.length ||
      !this.ListKhachhang?.length
    ) {
      return;
    }

    const customers = this.ListKhachhang;
    console.log(customers);
    
    let matchedCount = 0;
    let skippedCount = 0;

    this.statusDetails.forEach((detail: any, index: number) => {
      if (detail.status !== 'Processed' || !detail.tenkhongdau) {
        return;
      }

      // Check if customer is already selected for this detail
      const existingImportData = this.ListImportData.find(
        (v) => v.tenkh === detail.tenkhongdau
      );
      if (existingImportData?.khachhangId) {
        skippedCount++;
        return;
      }

      const filename = detail.tenkhongdau.toLowerCase();

      // Try to match with customer data using multiple strategies
      let matchedCustomer = null;

      // Strategy 1: Exact match with customer name (without accents)
      matchedCustomer = customers.find((customer: any) => {
        const customerNameNoAccent = removeVietnameseAccents(
          customer.name || ''
        ).toLowerCase();
        return customerNameNoAccent === filename;
      });

      // Strategy 2: Exact match with customer subtitle (without accents)
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer: any) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(
            customer.subtitle || ''
          ).toLowerCase();
          return customerSubtitleNoAccent === filename;
        });
      }

      // Strategy 3: Exact match with customer code (makh)
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer: any) => {
          const customerCode = (customer.makh || '').toLowerCase();
          return customerCode === filename;
        });
      }

      // Strategy 4: Partial match - filename contains customer name
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer: any) => {
          const customerNameNoAccent = removeVietnameseAccents(
            customer.name || ''
          ).toLowerCase();
          return (
            customerNameNoAccent && filename.includes(customerNameNoAccent)
          );
        });
      }

      // Strategy 5: Partial match - customer name contains filename
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer: any) => {
          const customerNameNoAccent = removeVietnameseAccents(
            customer.name || ''
          ).toLowerCase();
          return (
            customerNameNoAccent && customerNameNoAccent.includes(filename)
          );
        });
      }

      // Strategy 6: Partial match with subtitle
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer: any) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(
            customer.subtitle || ''
          ).toLowerCase();
          return (
            customerSubtitleNoAccent &&
            (filename.includes(customerSubtitleNoAccent) ||
              customerSubtitleNoAccent.includes(filename))
          );
        });
      }

      // If we found a match, auto-select it
      if (matchedCustomer) {
        // Check if this customer is already selected for another import
        const existingSelection = this.ListImportData.find(
          (v: any) => v.khachhangId === matchedCustomer.id
        );

        if (existingSelection) {
          console.warn(
            `Customer ${matchedCustomer.name} is already selected for another import`
          );
          skippedCount++;
          return;
        } // Auto-select the customer
        this.ListImportData.filter(
          (v) => v.tenkh === detail.tenkhongdau
        ).forEach((v1: any) => {
          v1.khachhangId = matchedCustomer.id;
        });

        // Mark as auto-selected for visual indication
        detail.autoSelected = true;
        matchedCount++;
        console.log(
          `Auto-selected customer "${matchedCustomer.name}" for file "${detail.fileName}"`
        );
      }
    });
    console.log(matchedCount, skippedCount);

    // Show notification about auto-selection results
    if (matchedCount > 0 || skippedCount > 0) {
      let message = '';
      if (matchedCount > 0) {
        message += `Đã tự động chọn ${matchedCount} khách hàng`;
      }
      if (skippedCount > 0) {
        if (message) message += `, `;
        message += `${skippedCount} File Chưa Có Khách Hàng`;
      }

      this._snackBar.open(message, '', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }

  /**
   * Get selected customer for a specific order detail
   */
  getSelectedCustomer(detail: any): any {
    const importData = this.ListImportData.find(
      (v) => v.tenkh === detail.tenkhongdau
    );
    if (!importData?.khachhangId) {
      return null;
    }

    return this.ListKhachhang.find((customer: any) => customer.id === importData.khachhangId);
  }

  /**
   * Check if customer was auto-selected (for visual indication)
   */
  isCustomerAutoSelected(detail: any): boolean {
    const selectedCustomer = this.getSelectedCustomer(detail);
    return selectedCustomer && detail.autoSelected === true;
  }

  /**
   * Toggle confirmation for all orders
   */
  toggleAllOrderConfirmation(): void {
    const processedOrders = this.statusDetails.filter(
      (detail) => detail.status === 'Processed'
    );
    const allConfirmed = processedOrders.every(
      (detail) => detail.configOptions?.confirmed
    );

    processedOrders.forEach((detail) => {
      if (!detail.configOptions) {
        detail.configOptions = {};
      }
      detail.configOptions.confirmed = !allConfirmed;
    });
  }

  /**
   * Toggle confirmation for a specific order
   */
  toggleOrderConfirmation(index: number): void {
    const detail = this.statusDetails[index];
    if (!detail.configOptions) {
      detail.configOptions = {};
    }
    detail.configOptions.confirmed = !detail.configOptions.confirmed;
  }

  /**
   * Get count of confirmed orders
   */
  getConfirmedOrdersCount(): number {
    return this.statusDetails.filter(
      (detail) =>
        detail.status === 'Processed' && detail.configOptions?.confirmed
    ).length;
  }

  /**
   * Get count of processed orders
   */
  getProcessedOrdersCount(): number {
    return this.statusDetails.filter((detail) => detail.status === 'Processed')
      .length;
  }

  /**
   * Show duplicate merge dialog with detailed information
   */
  async showDuplicateMergeDialog(totalCount: number, details: any[]): Promise<void> {
    return new Promise((resolve) => {
      this.duplicateMergeData = { totalCount, details };
      
      const dialogRef = this.dialog.open(this.duplicateMergeDialog, {
        hasBackdrop: true,
        disableClose: false,
        maxWidth: '95vw',
        maxHeight: '95vh',
        width: '80vw',
        height: '95vh',
      });
      
      dialogRef.afterClosed().subscribe(() => {
        this.duplicateMergeData = null;
        resolve();
      });
    });
  }

  /**
   * Toggle expansion for all orders
   */
  toggleAllOrdersExpansion(): void {
    const allExpanded = this.allOrdersExpanded();
    this.statusDetails.forEach((detail) => {
      if (detail.status === 'Processed') {
        detail.expanded = !allExpanded;
      }
    });
  }

  /**
   * Check if all orders are expanded
   */
  allOrdersExpanded(): boolean {
    const processedOrders = this.statusDetails.filter(
      (detail) => detail.status === 'Processed'
    );
    return (
      processedOrders.length > 0 &&
      processedOrders.every((detail) => detail.expanded)
    );
  }

  /**
   * Toggle expansion for a specific order
   */
  toggleOrderExpansion(index: number): void {
    const detail = this.statusDetails[index];
    detail.expanded = !detail.expanded;
  }

  /**
   * Get products for an order
   */
  getOrderProducts(detail: any): any[] {
    const orderData = this.ListImportData.filter(
      (item) => item.tenkh === detail.tenkhongdau
    );
    const transformedData = orderData.map((v: any) => {
      const sanphamList = v.sanpham
        .map((item: any) => {
          const sanpham = this._SanphamService
            .ListSanpham()
            .find((sp) => sp.masp === item.ItemCode);
          if (sanpham) {
            return {
              id: sanpham.id,
              title: sanpham.title,
              masp: sanpham.masp,
              dvt: sanpham.dvt,
              sldat: Number(item.Quantity),
              slgiao: Number(item.Quantity),
              slnhan: Number(item.Quantity),
              ghichu: item.Remark || '',
            };
          } else {
            return null;
          }
        })
        .filter((item: any) => item !== null);
      return {
        ...v,
        sanpham: sanphamList,
      };
    });
    return transformedData.flatMap((item) => item.sanpham) || [];
  }

  /**
   * Get total quantity for an order
   */
  getTotalQuantity(detail: any): number {
    const products = this.getOrderProducts(detail);
    return products.reduce(
      (total, product) => Number(total) + (Number(product.sldat) || 0),
      0
    );
  }

  /**
   * Toggle all items selection
   */
  ToggleAll(): void {
    if (this.EditList.length === this.dataSource.filteredData.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.dataSource.filteredData];
    }
  }

  /**
   * Add item to edit list
   */
  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }

  /**
   * Check if item is in edit list
   */
  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  /**
   * Open delete confirmation dialog
   */
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

  /**
   * Delete selected items
   */
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

    this.isLoading.set(true);
    try {
      const result: any = await this._DonhangService.DeleteBulkDonhang(
        this.EditList.map((v: any) => v.id)
      );
      this._snackBar.open(
        `Xóa thành công ${result.success} đơn hàng ${result.fail} lỗi`,
        '',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
      this.EditList = [];
      await this.LoadData();
    } catch (error: any) {
      console.error('Error deleting items:', error);
      this._snackBar.open(`Lỗi khi xóa: ${error.message}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get total products count
   */
  getTotalProducts(): number {
    return this.statusDetails
      .filter(
        (detail) =>
          detail.status === 'Processed' && detail.configOptions?.confirmed
      )
      .reduce(
        (total, detail) => total + this.getOrderProducts(detail).length,
        0
      );
  }

  /**
   * Get total amount (placeholder - needs implementation based on pricing logic)
   */
  getTotalAmount(): number {
    // This would need to be implemented based on your pricing calculation logic
    return 0;
  }
  
  /**
   * Count delivered orders (dagiao, danhan, hoanthanh)
   * Safely handles signal value and ensures array type
   */
  countDagiao(): number {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders)) return 0;
    return orders.filter((item: any) => 
      ['dagiao', 'danhan', 'hoanthanh'].includes(item.status)
    ).length;
  }
  
  /**
   * Count undelivered orders (dadat)
   * Safely handles signal value and ensures array type
   */
  countChuagiao(): number {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders)) return 0;
    return orders.filter((item: any) => item.status === 'dadat').length;
  }
  
  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  /**
   * Import confirmed orders
   */
  async ImportConfirmedDonhang(): Promise<void> {
    this.isLoading.set(true);
    
    try {
      // ✅ BƯỚC 1: Match đúng giữa statusDetails và ListImportData
      // Lọc các order đã được confirmed dựa trên tenkhongdau (tên file)
      const confirmedDetails = this.statusDetails.filter(
        (detail) => detail.status === 'Processed' && detail.configOptions?.confirmed
      );

      if (confirmedDetails.length === 0) {
        this._snackBar.open('Không có đơn hàng nào được xác nhận để nhập', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        this.isLoading.set(false);
        return;
      }

      // Match với ListImportData dựa trên tenkh (tên khách hàng không dấu)
      const confirmedOrders = this.ListImportData.filter((order) =>
        confirmedDetails.some((detail) => detail.tenkhongdau === order.tenkh)
      );

      console.log('📋 Confirmed orders matched:', {
        confirmedDetailsCount: confirmedDetails.length,
        confirmedOrdersCount: confirmedOrders.length,
        confirmedOrders: confirmedOrders.map(o => ({ tenkh: o.tenkh, khachhangId: o.khachhangId }))
      });

      // ✅ BƯỚC 2: Gộp duplicate products trong TỪNG đơn hàng
      let totalDuplicatesFound = 0;
      const mergeDetails: Array<{
        orderName: string;
        duplicates: Array<{ productCode: string; originalQty: number; mergedQty: number; count: number }>;
      }> = [];

      const processedOrders = confirmedOrders.map((order) => {
        if (!order.sanpham || !Array.isArray(order.sanpham)) {
          return order;
        }

        // Group products by ItemCode
        const productMap = new Map<string, { 
          ItemCode: string; 
          Quantity: number; 
          Remark: string;
          count: number; // Số lần xuất hiện
          originalQuantities: number[]; // Lưu các số lượng gốc
        }>();

        order.sanpham.forEach((item: any) => {
          const itemCode = item.ItemCode?.trim();
          if (!itemCode) return;

          if (productMap.has(itemCode)) {
            const existing = productMap.get(itemCode)!;
            existing.Quantity += Number(item.Quantity) || 0;
            existing.count += 1;
            existing.originalQuantities.push(Number(item.Quantity) || 0);
            
            // Merge remarks if different
            if (item.Remark && !existing.Remark.includes(item.Remark)) {
              existing.Remark = existing.Remark 
                ? `${existing.Remark}; ${item.Remark}` 
                : item.Remark;
            }
          } else {
            productMap.set(itemCode, {
              ItemCode: itemCode,
              Quantity: Number(item.Quantity) || 0,
              Remark: item.Remark || '',
              count: 1,
              originalQuantities: [Number(item.Quantity) || 0]
            });
          }
        });

        // Identify duplicates for this order
        const orderDuplicates: Array<{ 
          productCode: string; 
          originalQty: number; 
          mergedQty: number; 
          count: number;
        }> = [];

        productMap.forEach((value, key) => {
          if (value.count > 1) {
            totalDuplicatesFound += (value.count - 1);
            orderDuplicates.push({
              productCode: key,
              originalQty: value.originalQuantities.reduce((a, b) => a + b, 0) / value.count, // Average
              mergedQty: value.Quantity,
              count: value.count
            });
          }
        });

        if (orderDuplicates.length > 0) {
          mergeDetails.push({
            orderName: order.tenfile || order.tenkh,
            duplicates: orderDuplicates
          });
        }

        // Convert Map back to array (deduplicated products)
        const mergedProducts = Array.from(productMap.values()).map(item => ({
          ItemCode: item.ItemCode,
          Quantity: item.Quantity,
          Remark: item.Remark
        }));

        console.log(`🔄 Order "${order.tenkh}": ${order.sanpham.length} products → ${mergedProducts.length} products (removed ${order.sanpham.length - mergedProducts.length} duplicates)`);

        return {
          ...order,
          sanpham: mergedProducts
        };
      });

      // ✅ BƯỚC 3: Hiển thị thông báo chi tiết về sản phẩm trùng
      if (totalDuplicatesFound > 0) {
        // Prepare detailed message for console
        let detailMessage = `🔄 Đã gộp ${totalDuplicatesFound} sản phẩm trùng lặp:\n\n`;
        
        mergeDetails.forEach((detail, index) => {
          detailMessage += `📦 ${detail.orderName}:\n`;
          detail.duplicates.forEach(dup => {
            detailMessage += `   • ${dup.productCode}: ${dup.count} lần → Tổng SL: ${dup.mergedQty}\n`;
          });
          if (index < mergeDetails.length - 1) {
            detailMessage += '\n';
          }
        });

        console.log(detailMessage);

        // ✅ Show detailed dialog to user
        this.isLoading.set(false); // Tạm dừng loading để hiển thị dialog
        await this.showDuplicateMergeDialog(totalDuplicatesFound, mergeDetails);
        this.isLoading.set(true); // Tiếp tục loading
      } else {
        console.log('✅ Không có sản phẩm trùng lặp');
      }

      // ✅ BƯỚC 4: Import các đơn hàng đã được gộp duplicate
      await this.DoImportKhachhangCu(processedOrders);

    } catch (error: any) {
      console.error('Error importing confirmed orders:', error);
      this._snackBar.open(`Lỗi khi nhập đơn hàng: ${error.message}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  @Debounce(100)
  async DoFindKhachhang(event: any, index: any) {
    const value = event.target.value;

    if (!value) {
      this.FilterKhachhang[index] = this.ListKhachhang;
      return;
    }
    console.log(this.ListKhachhang);

    this.FilterKhachhang[index] = this.ListKhachhang.filter((v: any) =>
      v?.subtitle?.includes(removeVietnameseAccents(value))
    );
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

  /**
   * Xử lý hủy đơn hàng
   * Sử dụng CancelOrderService để mở dialog và xử lý toàn bộ flow
   */
  async handleCancelOrder(order: any): Promise<void> {
    const success = await this.cancelOrderService.cancelDonhang(order);
    
    if (success) {
      // Refresh lại danh sách sau khi hủy thành công
      await this.LoadData();
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
