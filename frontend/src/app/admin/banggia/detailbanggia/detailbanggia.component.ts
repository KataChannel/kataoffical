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
  EffectRef,
  untracked,
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
import { PriceHistoryService } from '../price-history.service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailBanggiaComponent implements AfterViewInit, OnDestroy {
  _ListbanggiaComponent: ListBanggiaComponent = inject(ListBanggiaComponent);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _PriceHistoryService: PriceHistoryService = inject(PriceHistoryService);
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
  
  // Price update state
  updatingPriceForRow = signal<number | null>(null);
  CountItem = computed(() => this.dataSource().data.length);
  
  // Search functionality
  searchText = signal<string>('');
  filteredCount = computed(() => this.dataSource().filteredData?.length || 0);
  
  // Performance optimization properties
  private pendingChanges = new Map<number, any>(); // Cache changes
  private debounceTimer: any = null;
  private batchUpdateTimer: any = null;
  private readonly DEBOUNCE_TIME = 300; // ms
  private readonly BATCH_UPDATE_TIME = 1000; // ms
  
  // UI state indicators
  public hasUnsavedChanges = signal(false);
  
  // Loading state to prevent concurrent operations
  private isLoadingBanggia = signal(false);
  private isComponentInitialized = signal(false);
  private effectRef?: EffectRef;
  private routeSubscription?: any;
  private lastProcessedId: string | null = null; // Track đã xử lý ID nào
  
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
  
  // DetailBanggia - Chỉ là getter, KHÔNG tạo dependency
  get DetailBanggia() {
    return this._BanggiaService.DetailBanggia;
  }
  
  /**
   * Helper method để update DetailBanggia KHÔNG trigger effect
   * TẤT CẢ updates phải dùng method này thay vì trực tiếp .update()
   */
  private updateDetailBanggiaUntracked(updateFn: (banggia: any) => any) {
    untracked(() => {
      this._BanggiaService.DetailBanggia.update(updateFn);
    });
  }
  
  constructor() {
    // Effect ĐƠN GIẢN - CHỈ trigger bởi banggiaId, KHÔNG bao giờ track DetailBanggia
    this.effectRef = effect(() => {
      // CHỈ đọc banggiaId trong tracked context
      const id = this._BanggiaService.banggiaId();
      
      // TẤT CẢ logic khác chạy trong untracked() để KHÔNG tạo dependencies
      untracked(() => {
        this.handleBanggiaIdChange(id);
      });
    });
  }
  
  /**
   * Xử lý thay đổi banggiaId - chạy trong untracked context
   * QUAN TRỌNG: Method này KHÔNG BAO GIỜ được gọi trực tiếp từ tracked context
   */
  private async handleBanggiaIdChange(id: string | null) {
    console.log('[EFFECT-HANDLER] Processing ID:', id, 'lastProcessed:', this.lastProcessedId);
    
    // Guard: Chờ component init
    if (!this.isComponentInitialized()) {
      console.log('[EFFECT-HANDLER] Component not initialized, skipping...');
      return;
    }
    
    // Guard: Ngăn xử lý duplicate ID
    if (this.lastProcessedId === id) {
      console.log('[EFFECT-HANDLER] ID already processed, skipping:', id);
      return;
    }
    
    // Guard: Ngăn concurrent loading
    if (this.isLoadingBanggia()) {
      console.log('[EFFECT-HANDLER] Already loading, skipping...');
      return;
    }
    
    // Đánh dấu đã xử lý ID này
    this.lastProcessedId = id;
    
    if (!id) {
      console.log('[EFFECT-HANDLER] No ID, navigating to list...');
      this._router.navigate(['/admin/banggia']);
      this._ListbanggiaComponent.drawer.close();
      return;
    }
    
    if (id === 'new') {
      console.log('[EFFECT-HANDLER] Creating new banggia...');
      this.handleNewBanggia();
    } else {
      console.log('[EFFECT-HANDLER] Loading banggia:', id);
      await this.loadBanggiaData(id);
    }
    
    console.log('[EFFECT-HANDLER] Completed for ID:', id);
  }
  
  /**
   * Xử lý tạo mới banggia
   */
  private handleNewBanggia() {
    // Set data mới TRONG untracked context - KHÔNG trigger effect
    this._BanggiaService.DetailBanggia.set({
      title: `BG - ${moment().format('DD/MM/YYYY')}`,
      status: 'baogia',
      type: 'bansi',
      batdau: moment().startOf('month').toDate(),
      ketthuc: moment().endOf('month').toDate(),
    });
    
    this._ListbanggiaComponent.drawer.open();
    this.isEdit.set(true);
    
    if (this._router.url !== '/admin/banggia/new') {
      this._router.navigate(['/admin/banggia', 'new']);
    }
  }
  isEdit = signal(false);
  isDelete = signal(false);
  banggiaId: any = this._BanggiaService.banggiaId;
  
  async ngOnInit(): Promise<void> {
    console.log('[INIT] ===== Component Initialization Started =====');
    
    // Load danh sách song song
    console.log('[INIT] Loading lists in parallel...');
    await Promise.all([
      this.LoadListKhachhang(),
      this.LoadListSanpham()
    ]);
    console.log('[INIT] Lists loaded successfully');
    
    // Đánh dấu init xong - effect sẽ active từ đây
    this.isComponentInitialized.set(true);
    console.log('[INIT] Component initialized - effect is now active');
    
    // Subscribe route params
    this.routeSubscription = this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const currentId = this._BanggiaService.banggiaId();
      
      console.log('[ROUTE] Param changed:', { from: currentId, to: id });
      
      // Reset lastProcessedId khi route thay đổi để cho phép xử lý lại
      if (currentId !== id) {
        console.log('[ROUTE] ID changed - resetting lastProcessedId');
        this.lastProcessedId = null; // Cho phép effect xử lý ID mới
        this._BanggiaService.setBanggiaId(id);
      } else {
        console.log('[ROUTE] Same ID - no action needed');
      }
    });
    
    console.log('[INIT] ===== Component Initialization Completed =====');
  }
  
  /**
   * Load dữ liệu banggia - CHẠY TRONG UNTRACKED CONTEXT
   */
  private async loadBanggiaData(id: string) {
    console.log('[LOAD] ===== Starting Load Process =====');
    console.log('[LOAD] Target ID:', id);
    
    this.isLoadingBanggia.set(true);
    
    try {
      console.log('[LOAD] Calling service.getBanggiaByid...');
      await this._BanggiaService.getBanggiaByid(id);
      
      console.log('[LOAD] Data loaded, updating UI (in untracked)...');
      // Đọc DetailBanggia trong untracked context
      untracked(() => {
        const banggia = this._BanggiaService.DetailBanggia();
        
        // CRITICAL: Tạo MatTableDataSource MỚI thay vì mutate
        const newDataSource = new MatTableDataSource<any>(banggia?.sanpham || []);
        
        // Bind paginator và sort vào instance mới
        if (this.paginator && this.sort) {
          newDataSource.paginator = this.paginator;
          newDataSource.sort = this.sort;
        }
        
        // Set instance mới vào signal - trigger complete refresh
        this.dataSource.set(newDataSource);
        console.log('[LOAD] DataSource updated with', banggia?.sanpham?.length || 0, 'items');
      });
      
      this._ListbanggiaComponent.drawer.open();
      
      // Navigation check
      const targetUrl = `/admin/banggia/${id}`;
      if (this._router.url !== targetUrl) {
        console.log('[LOAD] Navigating to:', targetUrl);
        await this._router.navigate(['/admin/banggia', id]);
      } else {
        console.log('[LOAD] Already at target URL');
      }
      
      console.log('[LOAD] ===== Load Completed Successfully =====');
    } catch (error) {
      console.error('[LOAD] ===== Load Failed =====');
      console.error('[LOAD] Error:', error);
      this._snackBar.open('Lỗi tải bảng giá', 'Đóng', { duration: 3000 });
      
      // Reset lastProcessedId on error để cho phép retry
      this.lastProcessedId = null;
    } finally {
      console.log('[LOAD] Resetting loading state');
      this.isLoadingBanggia.set(false);
    }
  }
  async LoadListSanpham(){
    try{
      console.log('Loading danh sách sản phẩm...');
      
      // Tối ưu: Chỉ load các field cần thiết, giảm payload
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
      
      console.log('Danh sách sản phẩm từ GraphQL:', ListSanpham?.data?.length || 0, 'items');
      
      // Tối ưu: Không freeze, chỉ assign trực tiếp
      this.ListSanpham = ListSanpham.data || [];
    }catch(error){
      console.error('Lỗi load danh sách sản phẩm:', error);
      this._snackBar.open('Lỗi tải danh sách sản phẩm', 'Đóng', { duration: 3000 });
    }
  }
  async LoadListKhachhang(){
    try{
      console.log('Loading danh sách khách hàng...');
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
      console.log('Danh sách khách hàng từ GraphQL:', Khachhangs?.data?.length || 0, 'items');
      
      // Tối ưu: Assign trực tiếp
      this.filterKhachhang = this.ListKhachhang = Khachhangs.data || [];
    }catch(error){
      console.error('Lỗi load danh sách khách hàng:', error);
      this._snackBar.open('Lỗi tải danh sách khách hàng', 'Đóng', { duration: 3000 });
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator && this.sort) {
        // Lấy instance của dataSource từ signal
        const ds = this.dataSource();
        ds.paginator = this.paginator;
        ds.sort = this.sort;
        
        // Setup custom filter predicate cho search
        ds.filterPredicate = (data: any, filter: string) => {
          const searchStr = filter.toLowerCase().trim();
          if (!searchStr) return true;
          
          // Tìm kiếm trên nhiều fields
          const title = (data.title || '').toLowerCase();
          const masp = (data.masp || '').toLowerCase();
          const dvt = (data.dvt || '').toLowerCase();
          
          return title.includes(searchStr) || 
                 masp.includes(searchStr) || 
                 dvt.includes(searchStr);
        };
        
        // CRITICAL: Trigger signal update
        this.dataSource.set(ds);
        console.log('[PAGINATION] Paginator, Sort, and Filter initialized');
      }
    }, 100);
  }

  ngOnDestroy() {
    console.log('[DESTROY] Cleaning up component...');
    
    // Cleanup route subscription
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      console.log('[DESTROY] Route subscription unsubscribed');
    }
    
    // Cleanup effect
    if (this.effectRef) {
      this.effectRef.destroy();
      console.log('[DESTROY] Effect destroyed');
    }
    
    // Cleanup timers
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.batchUpdateTimer) {
      clearTimeout(this.batchUpdateTimer);
    }
    
    // Flush pending changes
    if (this.pendingChanges.size > 0) {
      this.flushPendingChanges();
    }
    
    // Reset states
    this.isComponentInitialized.set(false);
    this.isLoadingBanggia.set(false);
    this.lastProcessedId = null;
    
    console.log('[DESTROY] Component destroyed');
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
      // Update trong untracked context
      untracked(() => {
        this._BanggiaService.DetailBanggia.update((banggia: any) => {
          this.pendingChanges.forEach((changes, index) => {
            Object.assign(banggia.sanpham[index], changes);
          });
          return banggia;
        });
        
        this.pendingChanges.clear();
        
        // Update dataSource cũng trong untracked
        const banggia = this._BanggiaService.DetailBanggia();
        const ds = this.dataSource();
        ds.data = [...(banggia?.sanpham || [])];
        if (this.paginator && this.sort) {
          ds.paginator = this.paginator;
          ds.sort = this.sort;
        }
        this.dataSource.set(ds);
      });
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
    
    console.log('[UPDATE] Updating banggia...');
    try {
      // Get data trong untracked context
      const banggiaData = untracked(() => this._BanggiaService.DetailBanggia());
      console.log('[UPDATE] Data to update:', banggiaData);
      console.log('[UPDATE] Banggia ID:', banggiaData?.id);
      
      if (!banggiaData?.id) {
        throw new Error('Banggia ID is missing! Cannot update.');
      }
      
      await this._BanggiaService.updateBanggia(banggiaData);
      
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      this.isEdit.set(false);
      this.hasUnsavedChanges.set(false);
    } catch (error) {
      console.error('[UPDATE] Error:', error);
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
    
    // Apply trong untracked context
    untracked(() => {
      this._BanggiaService.DetailBanggia.update((banggia: any) => {
        this.pendingChanges.forEach((changes, index) => {
          Object.assign(banggia.sanpham[index], changes);
        });
        return banggia;
      });
    });
    
    // Clear pending changes
    this.pendingChanges.clear();
    this.hasUnsavedChanges.set(true);
    
    // Update data source trong untracked
    untracked(() => {
      const banggia = this._BanggiaService.DetailBanggia();
      const ds = this.dataSource();
      ds.data = [...(banggia?.sanpham || [])];
      if (this.paginator && this.sort) {
        ds.paginator = this.paginator;
        ds.sort = this.sort;
      }
      this.dataSource.set(ds);
    });
    
    console.log(`[BATCH] Updated ${changeCount} items - Manual save required`);
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
    this.updateDetailBanggiaUntracked((v: any) => {
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
      
      // Tối ưu: Cập nhật giá tức thì lên server khi nhấn Enter
      if (index !== null && field === 'giaban' && element) {
        this.updatePriceToServer(index, element, Number(newValue));
        this.moveToNextInput(index);
      }
      return;
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
      // Update local state immediately for responsive UI
      this.addPendingChange(index, field, newValue);
    } else {
      // For non-giaban fields, update immediately TRONG UNTRACKED
      this.updateDetailBanggiaUntracked((v: any) => {
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

  /**
   * Cập nhật giá tức thì lên server khi nhấn Enter
   */
  private async updatePriceToServer(index: number, element: any, newPrice: number) {
    const banggiaId = this.banggiaId();
    // FIX: element.id là ID của Banggiasanpham, cần dùng element.sanphamId
    const sanphamId = element.sanphamId || element.id;
    const oldPrice = element.giaban || 0;
    
    console.log('[UPDATE-PRICE] Debug:', {
      banggiaId,
      elementId: element.id,
      sanphamId: element.sanphamId,
      usingSanphamId: sanphamId,
      element
    });
    
    if (!banggiaId || !sanphamId) {
      console.error('[UPDATE-PRICE] Missing banggiaId or sanphamId');
      this._snackBar.open(
        '✗ Lỗi: Thiếu thông tin bảng giá hoặc sản phẩm',
        'Đóng',
        {
          duration: 3000,
          panelClass: ['snackbar-error']
        }
      );
      return;
    }
    
    if (newPrice === oldPrice) {
      console.log('[UPDATE-PRICE] Price unchanged, skipping');
      return;
    }
    
    // Set loading state
    this.updatingPriceForRow.set(index);
    
    try {
      console.log(`[UPDATE-PRICE] Updating price for ${element.title}: ${oldPrice} → ${newPrice}`);
      
      // Calculate percentage change
      const percentChange = oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;
      const reason = percentChange > 20 || percentChange < -20
        ? `Thay đổi giá ${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`
        : 'Cập nhật giá từ bảng giá';
      
      // Call API to update price with audit trail
      await this._PriceHistoryService.updateSinglePrice(
        banggiaId,
        sanphamId,
        newPrice,
        reason,
      );
      
      // Update local state in untracked context
      this.updateDetailBanggiaUntracked((v: any) => {
        if (v.sanpham && v.sanpham[index]) {
          v.sanpham[index].giaban = newPrice;
        }
        return v;
      });
      
      // Update dataSource
      untracked(() => {
        const banggia = this._BanggiaService.DetailBanggia();
        const ds = this.dataSource();
        ds.data = [...(banggia?.sanpham || [])];
        // Re-assign paginator
        if (this.paginator && this.sort) {
          ds.paginator = this.paginator;
          ds.sort = this.sort;
        }
        // Trigger signal update
        this.dataSource.set(ds);
      });
      
      // Remove from pending changes
      this.pendingChanges.delete(index);
      
      // Show success notification
      this._snackBar.open(
        `✓ Đã cập nhật giá: ${newPrice.toLocaleString('vi-VN')} VND`,
        '',
        {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
      
      console.log('[UPDATE-PRICE] Success');
    } catch (error) {
      console.error('[UPDATE-PRICE] Failed:', error);
      
      // Revert to old price on error
      this.updateDetailBanggiaUntracked((v: any) => {
        if (v.sanpham && v.sanpham[index]) {
          v.sanpham[index].giaban = oldPrice;
        }
        return v;
      });
      
      untracked(() => {
        const banggia = this._BanggiaService.DetailBanggia();
        const ds = this.dataSource();
        ds.data = [...(banggia?.sanpham || [])];
        if (this.paginator && this.sort) {
          ds.paginator = this.paginator;
          ds.sort = this.sort;
        }
        this.dataSource.set(ds);
      });
      
      const errorMessage = error instanceof Error ? error.message : 'Vui lòng thử lại';
      this._snackBar.open(
        `✗ Lỗi cập nhật giá: ${errorMessage}`,
        'Đóng',
        {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
    } finally {
      this.updatingPriceForRow.set(null);
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
    this.updateDetailBanggiaUntracked((v: any) => {
      v.sanpham = [];
      return v;
    });
    
    untracked(() => {
      const banggia = this._BanggiaService.DetailBanggia();
      const ds = this.dataSource();
      ds.data = banggia?.sanpham || [];
      if (this.paginator && this.sort) {
        ds.paginator = this.paginator;
        ds.sort = this.sort;
      }
      this.dataSource.set(ds);
    });
  }
  RemoveSanpham(item: any) {
    this.updateDetailBanggiaUntracked((v: any) => {
      v.sanpham = v.sanpham.filter((v1: any) => v1.id !== item.id);
      return v;
    });
    
    untracked(() => {
      const banggia = this._BanggiaService.DetailBanggia();
      const ds = this.dataSource();
      ds.data = banggia?.sanpham || [];
      if (this.paginator && this.sort) {
        ds.paginator = this.paginator;
        ds.sort = this.sort;
      }
      this.dataSource.set(ds);
    });
  }
  CoppyDon() {
    this._snackBar.open('Đang Coppy Đơn Hàng', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning'],
    });
    
    this.updateDetailBanggiaUntracked((v: any) => {
      delete v.id;
      v.title = `${v.title} - Coppy`;
      return v;
    });
    
    // Get data trong untracked
    const dataToCopy = untracked(() => this._BanggiaService.DetailBanggia());
    
    this._BanggiaService
      .CreateBanggia(dataToCopy)
      .then((data: any) => {
        this._snackBar.open('Coppy Đơn Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this._router.navigate(['/admin/banggia', this.banggiaId()]);
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
      .filter((v: any) => v.masp);

    this.updateDetailBanggiaUntracked((v: any) => {
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
    
    console.log('[IMPORT] Imported data');

    untracked(() => {
      const banggia = this._BanggiaService.DetailBanggia();
      const ds = this.dataSource();
      ds.data = banggia?.sanpham || [];
      if (this.paginator && this.sort) {
        ds.paginator = this.paginator;
        ds.sort = this.sort;
      }
      this.dataSource.set(ds);
    });
    
    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async DoOutFilter(event: any) {
    console.log('[FILTER] Updating products for banggia:', event);

    try {
      this.updateDetailBanggiaUntracked((v: any) => {
        v.sanpham = event.map((sp: any) => ({
          sanphamId: sp.sanphamId || sp.id,
          giaban: Number(sp.giaban) || 0,
          title: sp.title,
          masp: sp.masp,
          dvt: sp.dvt,
          order: sp.order || 1,
        }));
        return v;
      });
      
      untracked(() => {
        const banggia = this._BanggiaService.DetailBanggia();
        this.filterSanpham = banggia?.sanpham || [];
        const ds = this.dataSource();
        ds.data = banggia?.sanpham || [];
        if (this.paginator && this.sort) {
          ds.paginator = this.paginator;
          ds.sort = this.sort;
        }
        this.dataSource.set(ds);
        console.log('[FILTER] Updated banggia:', banggia);
      });

      this._snackBar.open('Cập nhật sản phẩm thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('[FILTER] Error updating products:', error);
      this._snackBar.open('Lỗi cập nhật sản phẩm', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  async DoOutKhachhang(event: any) {
    console.log('[CUSTOMER] Updating customers for banggia:', event);
    try {
      // Update DetailBanggia trong untracked context
      this.updateDetailBanggiaUntracked((v: any) => {
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
      console.error('[CUSTOMER] Error updating customers:', error);
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
        sanphamId: sanpham.sanphamId || sanpham.id,  // ✅ Use sanphamId first, fallback to id
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

  /**
   * Apply search filter to table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText.set(filterValue);
    
    const ds = this.dataSource();
    ds.filter = filterValue.trim().toLowerCase();
    
    // Reset về trang đầu khi search
    if (ds.paginator) {
      ds.paginator.firstPage();
    }
    
    // Update signal để trigger change detection
    this.dataSource.set(ds);
    
    console.log(`[SEARCH] Filtered: ${this.filteredCount()} / ${this.CountItem()} items`);
  }

  /**
   * Clear search filter
   */
  clearFilter() {
    this.searchText.set('');
    const ds = this.dataSource();
    ds.filter = '';
    
    if (ds.paginator) {
      ds.paginator.firstPage();
    }
    
    this.dataSource.set(ds);
    console.log('[SEARCH] Filter cleared');
  }
}
