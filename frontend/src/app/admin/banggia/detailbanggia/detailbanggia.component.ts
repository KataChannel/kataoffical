import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListBanggiaComponent } from '../listbanggia/listbanggia.component';
import { PriceHistoryDialogComponent } from '../price-history-dialog/price-history-dialog.component';
import { BanggiaService } from '../banggia-graphql.service'; // Sử dụng GraphQL service
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ConvertDriveData,
  GenId,
  convertToSlug,
} from '../../../shared/utils/shared.utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { SanphamService } from '../../sanpham/sanpham.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import html2canvas from 'html2canvas';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { SearchfilterComponent } from '../../../shared/common/searchfilter123/searchfilter.component';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-detailbanggia',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    SearchfilterComponent,
  ],
  // providers: [provideNativeDateAdapter()],
  templateUrl: './detailbanggia.component.html',
  styleUrl: './detailbanggia.component.scss',
})
export class DetailBanggiaComponent implements AfterViewInit, OnDestroy {
  _ListbanggiaComponent: ListBanggiaComponent = inject(ListBanggiaComponent);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _SanphamService: SanphamService = inject(SanphamService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  _GraphqlService: GraphqlService = inject(GraphqlService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _dialog: MatDialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['STT', 'title', 'masp', 'dvt', 'giaban', 'actions'];
  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu Đề',
    masp: 'Mã SP',
    dvt: 'Đơn Vị Tính',
    giaban: 'Giá Bán',
    actions: 'Thao tác',
  };
  dataSource = signal(new MatTableDataSource<any>([]));
  CountItem = computed(() => this.dataSource().data.length);
  
  // Performance optimization properties
  private pendingChanges = new Map<number, any>(); // Cache changes
  private debounceTimer: any = null;
  private batchUpdateTimer: any = null;
  private readonly DEBOUNCE_TIME = 300; // ms
  private readonly BATCH_UPDATE_TIME = 1000; // ms
  
  // UI state indicators
  public hasUnsavedChanges = signal(false);
  
  filterSanpham: any[] = [];
  ListSanpham: any[] = [];
  ListKhachhang: any[] = [];
  ListStatus: any[] = [
    { value: 'baogia', title: 'Báo Giá' },
    { value: 'dangban', title: 'Đang Bán' },
    { value: 'ngungban', title: 'Ngừng Bán' },
  ];
  filterKhachhang: any[] = [];
  CheckListKhachhang: any[] = [];
  constructor() {
    
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this._BanggiaService.setBanggiaId(id);
    });
    effect(async () => {
      const id = this._BanggiaService.banggiaId();
      // await this.LoadListSanpham();
      // await this.LoadListKhachhang();
      console.log('Detected banggiaId change:', id);
      if (!id) {
        this._router.navigate(['/admin/banggia']);
        this._ListbanggiaComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailBanggia.set({
          title: `BG - ${moment().format('DD/MM/YYYY')}`,
          status: 'baogia',
          type: 'bansi',
          batdau: moment().startOf('month').toDate(),
          ketthuc: moment().endOf('month').toDate(),
        });
        this._ListbanggiaComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/admin/banggia', 'new']);
      } else {
        await this._BanggiaService.getBanggiaByid(id);
        this.dataSource().data = this.DetailBanggia().sanpham || [];
        this._ListbanggiaComponent.drawer.open();
        this._router.navigate(['/admin/banggia', id]);
      }
    });
  }
  DetailBanggia: any = this._BanggiaService.DetailBanggia;
  isEdit = signal(false);
  isDelete = signal(false);
  banggiaId: any = this._BanggiaService.banggiaId;
  async ngOnInit(): Promise<void> {
    await this.LoadListKhachhang();
    await this.LoadListSanpham(); 
  }
  async LoadListSanpham(){
    try{
      const ListSanpham = await this._GraphqlService.findAll('sanpham', {
        select: {
          id: true,
          title: true,
          masp: true,
          dvt: true,
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
        orderBy: { title: 'asc' },
      });
      console.log('Danh sách sản phẩm từ GraphQL:', ListSanpham);
      this.ListSanpham = ListSanpham.data;
    }catch(error){
      console.error('Lỗi load danh sách sản phẩm:', error);
    }
  }
  async LoadListKhachhang(){
    try{
      const Khachhangs = await this._GraphqlService.findAll('khachhang', {
        select: {
          id: true,
          name: true,
          makh: true,
          diachi: true,
          sdt: true,
          email: true,
          loaikh: true,
          isActive: true,
        },
        where: { isActive: true },
        orderBy: { name: 'asc' },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
      });
      console.log('Danh sách khách hàng từ GraphQL:', Khachhangs);
      this.filterKhachhang = this.ListKhachhang = Khachhangs.data;
    }catch(error){
      console.error('Lỗi load danh sách sản phẩm:', error);
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        //this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
      }
    }, 0);
  }

  ngOnDestroy() {
    // Cleanup timers to prevent memory leaks
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.batchUpdateTimer) {
      clearTimeout(this.batchUpdateTimer);
    }
    
    // Process any remaining pending changes before destroying (local only, no save)
    if (this.pendingChanges.size > 0) {
      this.flushPendingChanges();
    }
  }

  // Force apply all pending changes immediately (useful before save)
  public flushPendingChanges() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.batchUpdateTimer) {
      clearTimeout(this.batchUpdateTimer);
    }
    
    if (this.pendingChanges.size > 0) {
      // Just apply changes locally without saving
      this.DetailBanggia.update((banggia: any) => {
        this.pendingChanges.forEach((changes, index) => {
          Object.assign(banggia.sanpham[index], changes);
        });
        return banggia;
      });
      
      this.pendingChanges.clear();
      this.dataSource().data = [...this.DetailBanggia().sanpham];
    }
  }

  async handleBanggiaAction() {
    // this.DetailBanggia.update((v: any) => {
    //   v.sanpham?.forEach((item: any) => {
    //     item.sanphamId = item.id;
    //   });
    //   return v;
    // });
    if (this.banggiaId() === 'new') {
      await this.createBanggia();
    } else {
      await this.updateBanggia();
    }
  }
  private async createBanggia() {
    console.log(this.DetailBanggia());
    
    // try {
    //   await this._BanggiaService.CreateBanggia(this.DetailBanggia());
    //   this._snackBar.open('Tạo Mới Thành Công', '', {
    //     duration: 1000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     panelClass: ['snackbar-success'],
    //   });
    //   this.isEdit.update((value) => !value);
    // } catch (error) {
    //   console.error('Lỗi khi tạo banggia:', error);
    // }
  }

  private async updateBanggia() {
    // Flush any pending changes before saving
    this.flushPendingChanges();
    
    console.log(this.DetailBanggia());
    try {
      await this._BanggiaService.updateBanggia(this.DetailBanggia());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
      this.hasUnsavedChanges.set(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật banggia:', error);
      this._snackBar.open('Lỗi khi cập nhật!', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }

  // Performance optimization methods
  private debounceUpdate(callback: () => void, delay: number = this.DEBOUNCE_TIME) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(callback, delay);
  }

  private scheduleBatchUpdate() {
    if (this.batchUpdateTimer) {
      clearTimeout(this.batchUpdateTimer);
    }
    
    this.batchUpdateTimer = setTimeout(() => {
      this.processBatchUpdate();
    }, this.BATCH_UPDATE_TIME);
  }

  private processBatchUpdate() {
    if (this.pendingChanges.size === 0) return;
    
    const changeCount = this.pendingChanges.size;
    
    // Apply all pending changes at once
    this.DetailBanggia.update((banggia: any) => {
      this.pendingChanges.forEach((changes, index) => {
        Object.assign(banggia.sanpham[index], changes);
      });
      return banggia;
    });
    
    // Clear pending changes but keep unsaved flag
    this.pendingChanges.clear();
    this.hasUnsavedChanges.set(true); // Mark as having unsaved changes
    
    // Update data source
    this.dataSource().data = [...this.DetailBanggia().sanpham];
    
    console.log(`Batch update completed for ${changeCount} items - Manual save required`);
  }

  private addPendingChange(index: number, field: string, value: any) {
    if (!this.pendingChanges.has(index)) {
      this.pendingChanges.set(index, {});
    }
    
    const existingChanges = this.pendingChanges.get(index);
    existingChanges[field] = value;
    
    // Update UI state indicator - will be set to true after batch update
    // this.hasUnsavedChanges.set(true);
    
    // Schedule batch update
    this.scheduleBatchUpdate();
  }

  async DeleteData() {
    try {
      await this._BanggiaService.DeleteBanggia(this.DetailBanggia());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/banggia']);
    } catch (error) {
      console.error('Lỗi khi xóa banggia:', error);
    }
  }
  goBack() {
    this._router.navigate(['/admin/banggia']);
    this._ListbanggiaComponent.drawer.close();
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailBanggia.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }

  updateValue(
    event: Event,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    const newValue =
      type === 'number'
        ? Number(
            (event.target as HTMLElement).innerText
              .trim()
              .replace(/[^0-9]/g, '')
          ) || 0
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

    // Optimized update logic
    if (index !== null && field === 'giaban') {
      // Use debounced update for better performance
      this.debounceUpdate(() => {
        // Add to pending changes instead of immediate update
        this.addPendingChange(index, field, newValue);
        
        // Handle keyboard navigation without heavy DOM manipulation
        if (keyboardEvent.key === 'Enter') {
          this.moveToNextInput(index);
        }
      });
    } else {
      // For non-giaban fields, update immediately
      this.DetailBanggia.update((v: any) => {
        if (index !== null) {
          v.sanpham[index][field] = newValue;
        } else {
          v[field] = newValue;
        }
        return v;
      });
    }

    // Reduced logging for better performance
    if (console && console.log) {
      console.log(`Updated ${String(field)}:`, newValue);
    }
  }

  private moveToNextInput(currentIndex: number) {
    const inputs = document.querySelectorAll('.giaban-input') as NodeListOf<HTMLElement>;
    if (currentIndex < inputs.length - 1) {
      const nextInput = inputs[currentIndex + 1];
      if (nextInput) {
        // Simplified focus logic
        requestAnimationFrame(() => {
          nextInput.focus();
          if (nextInput instanceof HTMLInputElement) {
            nextInput.select();
          }
        });
      }
    }
  }

  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'BGImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    const data = ConvertDriveData(result.values);
    this.DoImportData(data);
  }
  AddSanpham() {}
  EmptyCart() {
    this.DetailBanggia.update((v: any) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource().data = this.DetailBanggia().sanpham;
    this.dataSource().sort = this.sort;
  }
  RemoveSanpham(item: any) {
    this.DetailBanggia.update((v: any) => {
      v.sanpham = v.sanpham.filter((v1: any) => v1.id !== item.id);
      return v;
    });
    this.dataSource().data = this.DetailBanggia().sanpham;
    this.dataSource().sort = this.sort;
  }
  CoppyDon() {
    this._snackBar.open('Đang Coppy Đơn Hàng', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning'],
    });
    this.DetailBanggia.update((v: any) => {
      delete v.id;
      v.title = `${v.title} - Coppy`;
      return v;
    });
    this._BanggiaService
      .CreateBanggia(this.DetailBanggia())
      .then((data: any) => {
        this._snackBar.open('Coppy Đơn Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this._router.navigate(['/admin/banggia', this.banggiaId()]);
        //  setTimeout(() => {
        //   window.location.href = `admin/donhang/donsi/${data.id}`;
        //  }, 1000);
      });
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
                <title>${this.DetailBanggia()?.title}</title>
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

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }
  ExportExcel(data: any, title: any) {
    const transformedData = data.data.map((v: any) => ({
      masp: v.masp?.trim() || '',
      giaban: Number(v.giaban) || 0,
    }));
    writeExcelFile(transformedData, title);
  }
  DoImportData(data: any) {
    const transformedData = data
      .map((v: any) => ({
        masp: v.masp?.trim() || '',
        giaban: Number(v.giaban) || 0,
      }))
      .filter((v: any) => v.masp); // Loại bỏ các mục có masp trống

    this.DetailBanggia.update((v: any) => {
      const listdata = transformedData.map((item: any) => {
        item.masp = item.masp?.trim() || '';
        item.giaban = Number(item.giaban) || 0;
        const item1 = this._SanphamService
          .ListSanpham()
          .find((v1) => v1.masp === item.masp);
        if (item1) {
          return { ...item1, ...item };
        }
        return item;
      });
      v.sanpham = listdata;
      return v;
    });
    console.log(this.DetailBanggia().sanpham);

    this.dataSource().data = this.DetailBanggia().sanpham;
    //this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async DoOutFilter(event: any) {
    console.log('Cập nhật sản phẩm cho bảng giá:', event);

    try {
      this.DetailBanggia.update((v: any) => {
        v.sanpham = event.map((sp: any) => ({
        sanphamId: sp.sanphamId || sp.id,
        giaban: Number(sp.giaban) || 0,
        title:sp.title,
        masp:sp.masp,
        dvt:sp.dvt,
        order: sp.order || 1,
      }));;
        return v;
      }); 
      this.filterSanpham = this.DetailBanggia().sanpham;
      this.dataSource().data = this.DetailBanggia().sanpham;
      this.dataSource().sort = this.sort;
      console.log(this.DetailBanggia());
      

      this._snackBar.open('Cập nhật sản phẩm thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
      this._snackBar.open('Lỗi cập nhật sản phẩm', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  async DoOutKhachhang(event: any) {
    console.log('Cập nhật khách hàng cho bảng giá:', event);
    try {
      // Cập nhật danh sách khách hàng cho bảng giá sử dụng GraphQL
      const updateData = {
        khachhang: {
          set: event.map((kh: any) => ({ id: kh.id })),
        },
      };
      console.log('Dữ liệu cập nhật khách hàng:', updateData);
      // console.log(this.banggiaId());      
      // await this._GraphqlService.updateOne('banggia',{ id: this.banggiaId() },
      //   updateData,
      //   {
      //     include: {
      //       khachhang: {
      //         select: {
      //           id: true,
      //           name: true,
      //           makh: true,
      //           diachi: true,
      //           sdt: true,
      //           email: true,
      //           loaikh: true,
      //           isActive: true,
      //         },
      //       },
      //     },
      //   }
      // );

      // Cập nhật DetailBanggia với dữ liệu mới
      this.DetailBanggia.update((v: any) => {
        v.khachhang = event;
        return v;
      });

      this._snackBar.open('Cập nhật khách hàng thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Lỗi cập nhật khách hàng:', error);
      this._snackBar.open('Lỗi cập nhật khách hàng', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Mở dialog lịch sử giá cho sản phẩm
   */
  showPriceHistory(sanpham: any) {
    this._dialog.open(PriceHistoryDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      data: {
        banggiaId: this.banggiaId(),
        sanphamId: sanpham.id,
        sanphamTitle: sanpham.title,
        currentPrice: sanpham.giaban
      }
    });
  }

  /**
   * Navigate to bulk price update
   */
  goToBulkUpdate() {
    this._router.navigate(['/admin/bulk-price-update']);
  }

  /**
   * Navigate to price analytics
   */
  goToPriceAnalytics() {
    this._router.navigate(['/admin/price-analytics']);
  }

  /**
   * Navigate to price comparison
   */
  goToPriceComparison() {
    this._router.navigate(['/admin/price-comparison']);
  }
}
