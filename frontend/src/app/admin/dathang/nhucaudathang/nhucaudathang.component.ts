import {
  Component,
  effect,
  inject,
  TemplateRef,
  ViewChild,
  signal,
  ChangeDetectionStrategy,
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
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import {
  readExcelFile,
  readExcelFileNoWorker,
  readExcelFileNoWorkerArray,
  writeExcelFile,
  writeExcelFileSheets,
} from '../../../shared/utils/exceldrive.utils';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SanphamService } from '../../sanpham/sanpham.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { GenId } from '../../../shared/utils/shared.utils';
import { TimezoneService } from '../../../shared/services/timezone.service';
import { DathangService } from '../dathang.service';
import { DonhangService } from '../../donhang/donhang.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  NestedDataDialogComponent,
  NestedDataDialogData,
} from './nested-data-dialog/nested-data-dialog.component';
import moment from 'moment';

@Component({
  selector: 'app-nhucaudathang',
  templateUrl: './nhucaudathang.component.html',
  styleUrls: [
    './nhucaudathang.component.scss',
    './nhucaudathang.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
})
export class NhucaudathangComponent {
  displayedColumns: string[] = [
    'expand', // Add expansion column
    'title',
    'masp',
    'dvt',
    'mancc',
    'name',
    // 'slchonhap',
    'ghichu',
    'xSLDat',
    // 'SLDat',
    'goiy',
    // 'slchogiao',
    // 'SLGiao',
    'khachdat',
    'khachgiao',
    // 'sltontt',
    'tongkho',
    'sltontt',
    'kho1',
    'kho2',
    'kho3',
    'kho4',
    'kho5',
    'kho6',
    'haohut',
    'slhaohut',
  ];
  ColumnName: any = {
    expand: '', // No header for expansion column
    title: 'Tên Sản Phẩm',
    masp: 'Mã Sản Phẩm',
    dvt: 'ĐVT',
    mancc: 'Mã NCC',
    name: 'Tên Nhà Cung Cấp',
    ghichu: 'Ghi Chú',
    // slchonhap: 'SL Đặt (Chờ Nhập)',
    xSLDat: 'SL Đặt (Nhà CC)',
    // SLDat: 'SL Đã Đặt',
    goiy: 'SL Cần Đặt (Gợi Ý)',
    // slchogiao: 'SL Bán (Chờ Giao)',
    // SLGiao: 'SL Giao (Khách)',
    khachdat: 'TỔNG SL KHÁCH ĐẶT',
    khachgiao: 'TỔNG SL BÁN',
    // sltontt: 'Tồn Kho (Thực Tế)',
    tongkho: 'Tổng Kho',
    sltontt: 'Tồn Kho tt',
    kho1: 'TG-LONG AN',
    kho2: 'Bổ Sung',
    kho3: 'TG-ĐÀ LẠT',
    kho4: 'KHO TỔNG - HCM',
    kho5: 'SG1',
    kho6: 'SG2',
    haohut: 'Tỉ Lệ Hao Hụt',
    slhaohut: 'SL Hao Hụt',
  };
  // ColumnName: any = {
  //   title: 'Tên Sản Phẩm',
  //   masp: 'Mã Sản Phẩm',
  //   mancc: 'Mã NCC',
  //   name: 'Tên Nhà Cung Cấp',
  //   makho: 'Mã Kho',
  //   namekho: 'Tên Kho',
  //   slton: 'Tồn Kho',
  //   slchogiao: 'Chờ Giao',
  //   slchonhap: 'Chờ Nhập',
  //   SLDat: 'SL Đặt (Nhà CC)',
  //   SLGiao: 'SL Giao (Khách)',
  //   goiy: 'Gợi Ý',
  // };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('NhucauColFilter') || '[]'
  );
  Columns: any[] = [];

  // Pagination
  totalItems = 0;
  pageSize = 50;
  currentPage = 1;
  totalPages = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _SanphamService = inject(SanphamService);
  private _breakpointObserver = inject(BreakpointObserver);
  private _GraphqlService = inject(GraphqlService);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  private _timezoneService = inject(TimezoneService);
  private _DathangService = inject(DathangService);
  private _DonhangService = inject(DonhangService);
  _snackBar = inject(MatSnackBar);

  Listsanpham: any = this._SanphamService.ListSanpham;
  TonghopsFinal: any[] = [];
  TonghopsExportFinal: any[] = [];
  EditList: any = [];
  dataSource = new MatTableDataSource<any>();
  ListFilter: any[] = [];
  ListDathang: any[] = [];
  isSubmit = false;
  quickFilter: string = 'all';
  globalFilterValue: string = '';

  // Nested table properties
  expandedElementId: string | null = null;
  dathangDataMap: Map<string, any[]> = new Map();
  donhangDataMap: Map<string, any[]> = new Map();
  loadingDathang: Set<string> = new Set();
  loadingDonhang: Set<string> = new Set();

  // Loading states
  isLoading = false;
  isExportingExcel = false;
  isImportingExcel = false;
  isUpdatingStock = false;
  isRefreshing = false;
  loadingMessage = '';
  progressPercentage = 0;

  // Date range properties
  batdau: Date = new Date(); // Start date
  ketthuc: Date = new Date(); // End date
  isDateRangeEnabled: boolean = false;
  hasUnappliedDateChanges: boolean = false; // Track if there are changes not yet applied

  // Inline edit properties
  editingRows: Map<string, any> = new Map(); // Track editing state for each row
  tempStorage: Map<string, any> = new Map(); // Store temporary edits
  STORAGE_KEY = 'nhucau_temp_edits'; // LocalStorage key for temporary edits

  constructor() {
    effect(() => {
      const currentData =
        this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
      this.dataSource.data = currentData;
      this.totalItems = currentData.length;
      this.calculateTotalPages();
    });
  }

  async ngOnInit(): Promise<void> {
    // ✅ Initialize date range to today
    const today = new Date();
    this.batdau = new Date(today);
    this.ketthuc = new Date(today);

    // Load temporary edits from localStorage
    this.loadTempEditsFromStorage();

    this.updateDisplayData();
    this.loadDonhangWithRelations();
    await this._SanphamService.getNhucau();
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom sorting for specific columns
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'slton':
        case 'slchogiao':
        case 'slchonhap':
        case 'SLDat':
        case 'SLGiao':
        case 'kho1':
        case 'kho2':
        case 'kho3':
        case 'kho4':
        case 'kho5':
        case 'kho6':
        case 'haohut':
        case 'slhaohut':
          return Number(item[property]) || 0;
        case 'goiy':
          return parseFloat(this.GetGoiy(item));
        case 'title':
        case 'masp':
        case 'dvt':
        case 'mancc':
        case 'name':
        case 'makho':
        case 'namekho':
          return item[property]?.toLowerCase() || '';
        default:
          return item[property]?.toString().toLowerCase() || '';
      }
    };

    this.initializeColumns();
    this.setupDrawer();
  }

  GetGoiy(item: any) {
    const suggestion = Number(item.khachdat) + Number(this.GetSLHaohut(item)) - Number(item.tongkho);
    return suggestion.toFixed(3);
    // if (item.SLGiao > item.SLDat) {
    //   const suggestion = Math.abs(
    //     Number(item.khachdat) + Number(this.GetSLHaohut(item)) - Number(item.tongkho)
    //   );
    //   return suggestion.toFixed(0);
    // }
    // else {
    //   return '0';
    // }
  }
  GetAbs(value: any) {
    return Math.abs(Number(value) || 0).toFixed(3);
  }
  GetSLHaohut(item: any) {
    // if(item.SLGiao > item.SLDat) {
    //   const demand = item.SLGiao - item.SLDat;
    //   const wastageAmount = demand * (item.haohut || 0) / 100;
    //   return wastageAmount.toFixed(0);
    // }
    if (item.khachdat > 0) {
      const wastageAmount = (item.khachdat * (item.haohut || 0)) / 100;
      return wastageAmount.toFixed(3);
    } else {
      return 0;
    }
  }

  async loadDonhangWithRelations() {
    try {
      this.isLoading = false;
      this.loadingMessage = 'Đang tải dữ liệu đơn hàng...';
      this.progressPercentage = 0;

      // ✅ Sử dụng TimezoneService để xử lý date range đúng cách
      let startDate: string;
      let endDate: string;

      if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
        // ✅ Sử dụng getAPIDateRange để đảm bảo consistent timezone handling
        const dateRange = this._timezoneService.getAPIDateRange(
          this.batdau,
          this.ketthuc
        );
        startDate = dateRange.Batdau;
        endDate = dateRange.Ketthuc;
      } else {
        // Default to today if no date range is set
        const today = new Date();
        const todayRange = this._timezoneService.getAPIDateRange(today, today);
        startDate = todayRange.Batdau;
        endDate = todayRange.Ketthuc;
      }

      this.progressPercentage = 25;
      this.loadingMessage = 'Đang xử lý dữ liệu...';

      const [Donhangs, Dathangs, Tonkhos, Sanphams] = await Promise.all([
        this._GraphqlService.findAll('donhang', {
          enableParallelFetch: true,
          batchSize: 1000,
          take: 999999,
          aggressiveCache: true,
          orderBy: { createdAt: 'desc' },
          where: {
            ngaygiao: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            status:true,
            sanpham: {
              select: {
                giaban: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                sanpham: { select: { masp: true } },
              },
            },
          },
        }),

        this._GraphqlService.findAll('dathang', {
          enableParallelFetch: true,
          batchSize: 1000,
          take: 999999,
          aggressiveCache: true,
          orderBy: { createdAt: 'desc' },
          where: {
            ngaynhan: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            id: true,
            madncc: true,
            ngaynhan: true,
            nhacungcap: {
              select: {
                name: true,
                mancc: true,
              },
            },
            sanpham: {
              select: {
                sldat: true,
                slgiao: true,
                slnhan: true,
                sanpham: { select: { masp: true } },
              },
            },
            kho: {
              select: {
                name: true,
                makho: true,
              },
            },
          },
        }),

        this._GraphqlService.findAll('tonkho', {
          enableParallelFetch: true,
          aggressiveCache: true,
          batchSize: 1000,
          take: 999999,
          select: {
            id: true,
            sanphamId: true,
            slton: true,
            sltontt: true,
            slchogiao: true,
            slchonhap: true,
            sanpham: {
              select: {
                title: true,
                masp: true,
                dvt: true,
                haohut: true,
              },
            },
          },
        }),

        this._GraphqlService.findAll('sanpham', {
          enableParallelFetch: true,
          aggressiveCache: true,
          batchSize: 1000,
          take: 999999,
          select: {
            id: true,
            title: true,
            masp: true,
            dvt: true,
            haohut: true,
            Nhacungcap:{
              select:{mancc:true,name:true}
            },
          }
        }),
        
      ]);


      const DonhangsTranfer = Donhangs.data.flatMap((order: any) =>
        order.sanpham.map((sp: any) => ({
          type: 'donhang',
          status: order.status,
          madonhang: order.madonhang,
          ngaygiao: order.ngaygiao,
          masp: sp.sanpham.masp,
          giaban: Number(sp.giaban) || 0,
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
        }))
      );
      const DathangsTranfer = Dathangs.data.flatMap((order: any) => {
        return order.sanpham.map((sp: any) => ({
          type: 'dathang',
          madncc: order.madncc,
          mancc: order.nhacungcap.mancc,
          name: order.nhacungcap.name,
          ngaynhan: order.ngaynhan,
          masp: sp.sanpham.masp,

          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,

          makho: order.kho.makho,
          namekho: order.kho.name,
        }));
      });
      const TonkhosTranfer = Tonkhos.data.map((sp: any) => ({
        type: 'tonkho',
        masp: sp.sanpham.masp,
        title: sp.sanpham.title,
        dvt: sp.sanpham.dvt,
        haohut: sp.sanpham.haohut || 0,
        slton: Number(sp.slton) || 0,
        sltontt: Number(sp.sltontt) || 0,
        slchogiao: Number(sp.slchogiao) || 0,
        slchonhap: Number(sp.slchonhap) || 0,
      }));
      const tonghopMap = new Map<string, any>();
      TonkhosTranfer.forEach((tonkho: any) => {
        tonghopMap.set(tonkho.masp, {
          id: GenId(8, false),
          ngaynhan: tonkho.ngaynhan,
          mancc: tonkho.mancc,
          name: tonkho.name,
          masp: tonkho.masp,
          title: tonkho.title,
          dvt: tonkho.dvt,
          haohut: tonkho.haohut || 0,
          slton: tonkho.slton,
          sltontt: tonkho.sltontt,
          slchogiao: tonkho.slchogiao,
          slchonhap: tonkho.slchonhap,
          SLDat: 0,
          SLGiao: 0,
        });
      });

      DathangsTranfer.forEach((dathang: any) => {
        // console.log(dathang);
        if (tonghopMap.has(dathang.masp)) {
          const item = tonghopMap.get(dathang.masp);
          item.SLDat += dathang.sldat;
          item.ngaynhan = dathang.ngaynhan;
          item.mancc = dathang.mancc;
          item.name = dathang.name;
          item.makho = dathang.makho;
          item.namekho = dathang.namekho;
        }
      });

      DonhangsTranfer.forEach((donhang: any) => {
        if (tonghopMap.has(donhang.masp)) {
          const item = tonghopMap.get(donhang.masp);
          item.SLGiao += donhang.slnhan;
        }
      });
      const SanphamsTranfer = Sanphams.data;

      // Create efficient lookup maps for better performance
      const dathangMap = new Map<string, number>();
      const donhangMap = new Map<string, number>();
      const tonkhoMap = new Map<string, any>();

      // Build lookup maps in single pass
      DathangsTranfer.forEach((dh: any) => {
        const currentSum = dathangMap.get(dh.masp) || 0;
        dathangMap.set(dh.masp, currentSum + dh.sldat);
      });

      DonhangsTranfer.forEach((dh: any) => {
        const currentSum = donhangMap.get(dh.masp) || 0;
        donhangMap.set(dh.masp, currentSum + dh.slnhan); // Fixed: use slnhan instead of sldat
      });

      TonkhosTranfer.forEach((tk: any) => {
        tonkhoMap.set(tk.masp, tk);
      });

      // Transform data efficiently using maps
      const transformFinalData = SanphamsTranfer.map((sp: any) => {
        const tonkho = tonkhoMap.get(sp.masp);
        const slDat = dathangMap.get(sp.masp) || 0;
        const slGiao = donhangMap.get(sp.masp) || 0;

        const transformedItem = {
          ...sp,
          id: sp.id || GenId(8, false),
          mancc: sp.Nhacungcap?.[0]?.mancc || '',
          name: sp.Nhacungcap?.[0]?.name || '',
          SLDat: slDat,
          SLGiao: slGiao,
          slton: tonkho?.slton || 0,
          sltontt: tonkho?.sltontt || 0,
          slchogiao: tonkho?.slchogiao || 0,
          slchonhap: tonkho?.slchonhap || 0,
          haohut: tonkho?.haohut || sp.haohut || 0,
          slhaohut: 0,
          Dathangs: DathangsTranfer.filter((dh: any) => dh.masp === sp.masp),
          Donhangs: DonhangsTranfer.filter((dh: any) => dh.masp === sp.masp),
        };
        // Calculate suggestion immediately
        transformedItem.goiy = this.GetGoiy(transformedItem);
        transformedItem.slhaohut = this.GetSLHaohut(transformedItem);
        return transformedItem;
      })
        .filter((sp) => sp.masp)
        .sort(
          (a, b) =>
            parseFloat(b.Dathangs.length) - parseFloat(a.Dathangs.length)
        ); // Sort by Dathangs length descending

      // SanphamsTranfer.

      this.progressPercentage = 75;
      this.loadingMessage = 'Đang tổng hợp dữ liệu...';
      const Khos = await this._GraphqlService.findAll('kho', {
        enableParallelFetch: true,
        batchSize: 1000,
        take: 999999,
        aggressiveCache: true,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          makho: true,
        },
      });

      this.TonghopsFinal = this.transformFinalData(transformFinalData, Khos.data);
      console.log('transformFinalData', transformFinalData);
      console.log('this.TonghopsFinal', this.TonghopsFinal);

      this.TonghopsFinal.forEach((item) => {
        item.tongkho = parseFloat((
          (Number(item.kho1) || 0) +
          (Number(item.kho2) || 0) +
          (Number(item.kho3) || 0) +
          (Number(item.kho4) || 0) +
          (Number(item.kho5) || 0) +
          (Number(item.kho6) || 0) +
          (Number(item.sltontt) || 0)
        ).toFixed(3));
        item.goiy = this.GetGoiy(item);
        item.slhaohut = this.GetSLHaohut(item);
      });

      // Sort by goiy from large to small
      this.TonghopsFinal.sort((a, b) => parseFloat(b.goiy) - parseFloat(a.goiy));

      console.log('this.transformFinalData', transformFinalData);

      const tranferTonghop = (await this.convertData(transformFinalData)).flat();
      this.TonghopsExportFinal = this.convertKhoData(tranferTonghop);
      this.progressPercentage = 90;
      this.loadingMessage = 'Hoàn tất...';

      this.dataSource.data = this.TonghopsFinal;
      this.totalItems = this.TonghopsFinal.length;
      this.calculateTotalPages();
      this.updateDisplayData();

      this.progressPercentage = 100;

      // Short delay to show completion
      setTimeout(() => {
        this.isLoading = false;
        this.loadingMessage = '';
        this.progressPercentage = 0;
      }, 500);
    } catch (error) {
      console.error('Error loading data:', error);
      this.isLoading = false;
      this.loadingMessage = '';
      this.progressPercentage = 0;

      this._snackBar.open('Lỗi khi tải dữ liệu', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  async refresh() {
    this.isRefreshing = true;
    this.loadingMessage = 'Đang làm mới dữ liệu...';

    try {
      // Clear expanded state when refreshing data
      this.expandedElementId = null;
      await this._SanphamService.getAllSanpham();
      await this.loadDonhangWithRelations();

      this._snackBar.open('Làm mới dữ liệu thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      this._snackBar.open('Lỗi khi làm mới dữ liệu', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isRefreshing = false;
      this.loadingMessage = '';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
        'NhucauColFilter',
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

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.filteredData = currentData.filter((v: any) =>
      v[column]
        ?.toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
  }

  @Debounce(300)
  applyAdvancedColumnFilter(event: any, column: any): void {
    const filterValue = event.target.value.toLowerCase();
    if (!filterValue) {
      this.getCurrentFilteredData(column);
      return;
    }

    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const filteredItems = currentData.filter((item: any) =>
      item[column]?.toString().toLowerCase().includes(filterValue)
    );

    // Update temporary filter for this column
    this.dataSource.filteredData = filteredItems;
  }

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
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id);
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.ListFilter = currentData;
    this.dataSource.data = currentData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.masp === item.masp || v.id === item.id)
      ? true
      : false;
  }

  ApplyFilterColum(menu: MatMenuTrigger) {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = currentData.filter((v: any) =>
      this.ListFilter.some((v1) => v1.masp === v.masp)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('NhucauColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find(
      (v: any) => v.masp === item.masp || v.id === item.id
    );
    if (existingItem) {
      this.EditList = this.EditList.filter(
        (v: any) => v.masp !== item.masp && v.id !== item.id
      );
    } else {
      this.EditList.push(item);
    }
  }

  ChoseAllEdit(): void {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.EditList = currentData;
  }

  CheckItemInEdit(item: any): boolean {
    return this.EditList.some(
      (v: any) => v.masp === item.masp || v.id === item.id
    );
  }

  onListDathangChange(event: any) {
    this.isSubmit = event.isSubmit;
    this.ListDathang = event.ListDathang;
  }

  async ImporExcel(event: any) {
    const data = await readExcelFileNoWorker(event);
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt?.trim() || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      haohut: Number(v.haohut) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));

    const uniqueData = Array.from(
      new Map(transformedData.map((item: any) => [item.masp, item])).values()
    );

    const existingSanpham = this._SanphamService.ListSanpham();

    await Promise.all(
      uniqueData.map(async (v: any) => {
        const existingItem = existingSanpham.find(
          (v1: any) => v1.masp === v.masp
        );
        if (existingItem) {
          const updatedItem = { ...existingItem, ...v };
          await this._SanphamService.updateSanpham(updatedItem);
        } else {
          await this._SanphamService.CreateSanpham(v);
        }
      })
    );

    await Promise.all(
      existingSanpham
        .filter((sp) => !uniqueData.some((item: any) => item.masp === sp.masp))
        .map((sp) =>
          this._SanphamService.updateSanpham({ ...sp, isActive: false })
        )
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async ExportExcel(data: any, title: any) {
    try {
      this.isExportingExcel = true;
      const dulieu = this.TonghopsFinal.map((v: any) => ({
        title: v.title || '',
        masp: v.masp || '',
        dvt: v.dvt || '',
        ghichu: v.ghichu || '',
        haohut: Number(v.haohut || 0),
        xSLDat: v.xSLDat || 0,
        // SLDat: v.SLDat || 0,
        // SLGiao: Number(v.SLGiao || 0),
        sltontt: Number(v.sltontt || 0),
        ngaynhan: moment(v.ngaynhan).format('YYYY-MM-DD') || '',
        mancc: v.mancc || '',
        name: v.name || '',
        goiy: v.goiy || 0,
        khachdat: Number(v.khachdat || 0),
        khachgiao: Number(v.khachgiao || 0),
        tongkho: Number(v.tongkho || 0),
        kho1: Number(v.kho1 || 0),
        kho2: Number(v.kho2 || 0),
        kho3: Number(v.kho3 || 0),
        kho4: Number(v.kho4 || 0),
        kho5: Number(v.kho5 || 0),
        kho6: Number(v.kho6 || 0),
        slhaohut: Number(v.slhaohut || 0),
      }));
      const mapping: any = {
        ngaynhan: 'NGÀY',
        mancc : 'MÃ NCC',
        name: 'TÊN NHÀ CUNG CẤP',
        title: 'TÊN SẢN PHẨM',
        masp: 'MÃ SẢN PHẨM',
        dvt: 'ĐVT',
        ghichu: 'GHI CHÚ',
        xSLDat: 'SL ĐẶT (NHÀ CC)',
        // SLDat: 'SL Đã Đặt',
        goiy: 'SL CẦN ĐẶT (GỢI Ý)',
        khachdat: 'TỔNG SL KHÁCH ĐẶT',
        khachgiao: 'TỔNG SL BÁN',
        // SLGiao: 'SL GIAO (KHÁCH)',
        tongkho: 'TỔNG KHO',
        sltontt: 'TỒN KHO',
        kho1: 'TG-LONG AN',
        kho2: 'BỔ SUNG',
        kho3: 'TG-ĐÀ LẠT',
        kho4: 'KHO TỔNG - HCM',
        kho5: 'SG1',
        kho6: 'SG2',
        haohut: 'TỈ LỆ HAO HỤT (%)',
        slhaohut: 'SL HAO HỤT',
      };

      const dulieu2 = this.TonghopsExportFinal.map((v: any) => ({
        title: v.title || '',
        masp: v.masp || '',
        dvt: v.dvt || '',
        haohut: v.haohut || 0,
        sldat: v.sldat || 0,
        SLDat: v.SLDat || 0,
        SLGiao: v.SLGiao || 0,
        sltontt: v.sltontt || 0,
        mancc: v.mancc || '',
        name: v.name || '',
        ngaynhan: moment(v.ngaynhan).format('YYYY-MM-DD') || '',
        goiy: v.goiy || 0,
        kho1: v.kho1 || 0,
        kho2: v.kho2 || 0,
        kho3: v.kho3 || 0,
        kho4: v.kho4 || 0,
        kho5: v.kho5 || 0,
        kho6: v.kho6 || 0,
        slhaohut: v.slhaohut || 0,
      }));

      const mapping2: any = {
        ngaynhan: 'Ngày Nhận',
        title: 'Tên Sản Phẩm',
        masp: 'Mã Sản Phẩm',
        dvt: 'ĐVT',
        mancc: 'Mã NCC',
        name: 'Tên Nhà Cung Cấp',
        sldat: 'SL Đặt (Nhà CC)',
        SLDat: 'Tổng Đặt',
        goiy: 'SL Cần Đặt (Gợi Ý)',
        SLGiao: 'SL Giao (Khách)',
        sltontt: 'Tồn Kho',
        kho1: 'TG-LONG AN',
        kho2: 'Bổ Sung',
        kho3: 'TG-ĐÀ LẠT',
        kho4: 'KHO TỔNG - HCM',
        kho5: 'SG1',
        kho6: 'SG2',
        haohut: 'Tỉ Lệ Hao Hụt (%)',
        slhaohut: 'SL Hao Hụt',
      };

      // const result1 = dulieu.sort((a: any, b: any) => parseFloat(b.goiy) - parseFloat(a.goiy));
      const result2 = dulieu2.sort((a: any, b: any) => parseFloat(b.masp) - parseFloat(a.masp));
      // Chuẩn bị dữ liệu cho 2 sheets
      const sheetsData = {
        sheet1: {
          data: dulieu,
          headers: Object.values(mapping) as string[],
          mapping: mapping,
        },
        sheet2: {
          data: result2,
          headers: Object.values(mapping2) as string[],
          mapping: mapping2,
        },
      };

      // Export file Excel với multiple sheets
      writeExcelFileSheets(sheetsData, title);

      this._snackBar.open('Export Excel thành công!', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      this._snackBar.open('Lỗi khi export Excel', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isExportingExcel = false;
    }
  }

  // Cập nhật tồn kho từ file Excel
  async Capnhattonkho() {
    this.isUpdatingStock = true;

    // Tạo input file element động
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';

    fileInput.onchange = async (event: any) => {
      try {
        const file = event.target.files[0];
        if (!file) {
          this._snackBar.open('Không có file được chọn', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.isUpdatingStock = false;
          return;
        }

        // Hiển thị loading
        this._snackBar.open('Đang xử lý file Excel...', '', {
          duration: 0,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-info'],
        });

        // Đọc file Excel (không sử dụng worker)
        const excelData = await readExcelFileNoWorkerArray(event);

        if (!excelData || excelData.length === 0) {
          this._snackBar.dismiss();
          this._snackBar.open('File Excel trống hoặc không hợp lệ', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }

        // Validate và transform dữ liệu
        const validData: Array<{ masp: string; slton: number }> = [];
        const errors: string[] = [];
        console.log(excelData);

        excelData.forEach((row: any, index: number) => {
          const masp = row.masp?.toString().trim() || row.ITEMCODE?.toString().trim();
          let slton = parseFloat(row.slton || row.QUANTITY || '0');

          // Validate required fields
          if (!masp) {
            errors.push(`Dòng ${index + 1}: Thiếu mã sản phẩm`);
            return;
          }

          // Xử lý slton: nếu NaN, null, undefined hoặc <= 0 thì set về 0
          if (isNaN(slton) || slton == null || slton <= 0) {
            slton = 0;
            console.log(
              `Dòng ${index + 1} - ${masp}: slton được set về 0 (giá trị gốc: ${
                row.slton
              })`
            );
          }

          validData.push({ masp, slton });
        });

        if (errors.length > 0) {
          this._snackBar.dismiss();
          this._snackBar.open(
            `Có ${errors.length} lỗi trong file. Xem console để biết chi tiết.`,
            'Đóng',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            }
          );
          console.error('Validation errors:', errors);
          return;
        }

        // Get all existing TonKho and Sanpham data
        const [tonkhoResponse, sanphamResponse] = await Promise.all([
          this._GraphqlService.findAll('tonkho', {
            take: 999999,
            select: {
              id: true,
              sanphamId: true,
              slton: true,
              sltontt: true,
              slchogiao: true,
              slchonhap: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                },
              },
            },
          }),
          this._GraphqlService.findAll('sanpham', {
            take: 999999,
            select: {
              id: true,
              masp: true,
              title: true,
            },
          }),
        ]);

        const allTonkho = tonkhoResponse.data || [];
        const allSanpham = sanphamResponse.data || [];

        // Create maps for quick lookup
        const tonkhoMap = new Map(
          allTonkho.map((tk: any) => [tk.sanpham?.masp, tk])
        );
        const sanphamMap = new Map(allSanpham.map((sp: any) => [sp.masp, sp]));

        let updatedCount = 0;
        let createdCount = 0;
        const processErrors: string[] = [];

        // Process each item từ Excel file
        for (const item of validData) {
          try {
            // Tìm sản phẩm theo mã sản phẩm
            const sanpham = sanphamMap.get(item.masp);
            if (!sanpham) {
              processErrors.push(
                `Không tìm thấy sản phẩm với mã: ${item.masp}`
              );
              continue;
            }

            // Kiểm tra xem TonKho đã tồn tại chưa
            const existingTonkho = tonkhoMap.get(item.masp);

            if (existingTonkho) {
              // Cập nhật TonKho đã có - bao gồm cả trường hợp slton = 0
              await this._GraphqlService.updateOne(
                'tonkho',
                { id: (existingTonkho as any).id },
                { slton: item.slton, sltontt: item.slton }
              );
              updatedCount++;
              console.log(
                `Updated TonKho for ${item.masp}: slton = ${item.slton}`
              );
            } else {
              // Tạo mới TonKho record - bao gồm cả trường hợp slton = 0
              await this._GraphqlService.createOne('tonkho', {
                sanphamId: (sanpham as any).id,
                slton: item.slton,
                sltontt: item.slton,
                slchogiao: 0,
                slchonhap: 0,
              });
              createdCount++;
              console.log(
                `Created new TonKho for ${item.masp}: slton = ${item.slton}`
              );
            }
          } catch (error: any) {
            processErrors.push(`Lỗi xử lý ${item.masp}: ${error.message}`);
          }
        }

        this._snackBar.dismiss();

        // Show results
        if (processErrors.length > 0) {
          console.error('Process errors:', processErrors);
          this._snackBar.open(
            `Hoàn thành với ${processErrors.length} lỗi. Xem console để biết chi tiết.`,
            'Đóng',
            {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-warning'],
            }
          );
        } else {
          this._snackBar.open(
            `Cập nhật TonKho thành công: ${updatedCount} cập nhật, ${createdCount} tạo mới (bao gồm cả slton = 0)`,
            'Đóng',
            {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
          console.log(
            `TonKho update summary: Updated ${updatedCount}, Created ${createdCount}`
          );
        }

        // Reload data to reflect changes
        this.ngOnInit();
      } catch (error: any) {
        this._snackBar.dismiss();
        this._snackBar.open(`Lỗi xử lý file: ${error.message}`, 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        console.error('Error processing Excel file:', error);
      } finally {
        this.isUpdatingStock = false;
      }
    };

    // Trigger file selection
    fileInput.oncancel = () => {
      this.isUpdatingStock = false;
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  // Tải file Excel mẫu để cập nhật tồn kho
  async downloadTonkhoTemplate() {
    const mapping = {
      masp: 'masp',
      title: 'title',
      slton: 'slton',
    };
    const Sanphams = await this._GraphqlService.findAll('sanpham', {
      take: 999999,
      select: {
        id: true,
        masp: true,
        TonKho: {
          select: {
            slton: true,
          },
        },
      },
    });
    const sampleData = Sanphams.data.map((sp: any) => ({
      masp: sp.masp || '',
      title: sp.title || '',
      slton: sp.TonKho?.slton || 0,
    }));
    // Tạo file Excel với dữ liệu mẫu
    writeExcelFile(
      sampleData,
      'MauCapNhatTonKho',
      Object.values(mapping),
      mapping
    );

    this._snackBar.open('Đã tải file Excel mẫu', 'Đóng', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  convertKhoData(inputData: any) {
    const warehouses = [
      { name: 'kho1', label: 'TG-LONG AN' },
      { name: 'kho2', label: 'Bổ Sung' },
      { name: 'kho3', label: 'TG-ĐÀ LẠT' },
      { name: 'kho4', label: 'KHO TỔNG - HCM' },
      { name: 'kho5', label: 'SG1' },
      { name: 'kho6', label: 'SG2' },
    ];

    return inputData.map((item: any) => {
      // Create a new object with all original fields
      const newItem = { ...item };

      // Initialize all warehouse fields with 0
      warehouses.forEach((warehouse) => {
        newItem[warehouse.name] = '0';
      });

      // Find the matching warehouse by label and set the value
      const matchingWarehouse = warehouses.find(
        (warehouse) => warehouse.label === item.namekho
      );

      if (matchingWarehouse) {
        newItem[matchingWarehouse.name] = item.sldat || '0';
      }
      return newItem;
    });
  }

  transformFinalData(data1: any[], ListKho: any[]) {
    ListKho = [
      {
        id: 'a118c322-ddca-444e-9e41-40602d955e93',
        value: 'kho5',
        name: 'SG1',
        makho: 'TG-SG1',
      },
      {
        id: '3344758e-c0bc-4562-9390-d58fc5717d03',
        value: 'kho6',
        name: 'SG2',
        makho: 'TG-SG2',
      },
      {
        id: '75933b1d-2906-4591-8a46-30db60ce9258',
        value: 'kho2',
        name: 'Bổ Sung',
        makho: 'TG-BS',
      },
      {
        id: '4cc01811-61f5-4bdc-83de-a493764e9258',
        value: 'kho4',
        name: 'KHO TỔNG - HCM',
        makho: 'TG-HCM',
      },
      {
        id: '929d94e9-9b05-4820-aadb-0c48b991c96c',
        value: 'kho1',
        name: 'TG-LONG AN',
        makho: 'TG-LA',
      },
      {
        id: 'a24363f8-2218-4f80-b2f9-0641ace1b245',
        value: 'kho3',
        name: 'TG-ĐÀ LẠT',
        makho: 'TG-ĐL',
      },
    ];
    return data1.map((item) => {
      // Start with the base item, removing Dathangs
      const { Dathangs, Donhangs, ...baseItem } = item;

      // Initialize all kho values to 0
      const khoValues: any = {};
      ListKho.forEach((kho: any) => {
        khoValues[kho.value] = 0;
      });

      // Add ngaynhan from first Dathang if exists
      const ngaynhan =
        Dathangs && Dathangs.length > 0 ? Dathangs[0].ngaynhan : null;

      // Sum sldat by makho
      if (Dathangs) {
        Dathangs.forEach((dathang: any) => {
          const matchingKho = ListKho.find(
            (kho: any) => kho.makho === dathang.makho
          );
          if (matchingKho) {
            khoValues[matchingKho.value] += dathang.sldat;
          }
        });
      }

      const khachdat = Donhangs.filter((v: any) => v.status === 'dadat').reduce(
        (acc: number, curr: any) => {
          return Number((acc + Number(curr.sldat || 0)).toFixed(3)) || 0;
        },
        0
      );
      console.log('Donhangs', Donhangs);
      
      const khachgiao = Donhangs.filter(
        (v: any) => v.status !== 'dadat'
      ).reduce((acc: number, curr: any) => {
        return Number((acc + Number(curr.sldat || 0)).toFixed(2)) || 0;
      }, 0);

      return {
        khachdat,
        khachgiao,
        ...baseItem,
        ...(ngaynhan && { ngaynhan }),
        ...khoValues,
      };
    });
  }

  transformFinalDataTachDathang(data1: any[], ListKho: any[]) {
    ListKho = [
      {
        id: 'a118c322-ddca-444e-9e41-40602d955e93',
        value: 'kho5',
        name: 'SG1',
        makho: 'TG-SG1',
      },
      {
        id: '3344758e-c0bc-4562-9390-d58fc5717d03',
        value: 'kho6',
        name: 'SG2',
        makho: 'TG-SG2',
      },
      {
        id: '75933b1d-2906-4591-8a46-30db60ce9258',
        value: 'kho2',
        name: 'Bổ Sung',
        makho: 'TG-BS',
      },
      {
        id: '4cc01811-61f5-4bdc-83de-a493764e9258',
        value: 'kho4',
        name: 'KHO TỔNG - HCM',
        makho: 'TG-HCM',
      },
      {
        id: '929d94e9-9b05-4820-aadb-0c48b991c96c',
        value: 'kho1',
        name: 'TG-LONG AN',
        makho: 'TG-LA',
      },
      {
        id: 'a24363f8-2218-4f80-b2f9-0641ace1b245',
        value: 'kho3',
        name: 'TG-ĐÀ LẠT',
        makho: 'TG-ĐL',
      },
    ];
    return data1.map((item) => {
      // Start with the base item, removing Dathangs
      const { Dathangs, Donhangs, ...baseItem } = item;

      // Initialize all kho values to 0
      const khoValues: any = {};
      ListKho.forEach((kho: any) => {
        khoValues[kho.value] = 0;
      });

      // Add ngaynhan from first Dathang if exists
      const ngaynhan =
        Dathangs && Dathangs.length > 0 ? Dathangs[0].ngaynhan : null;

      // Sum sldat by makho
      if (Dathangs) {
        Dathangs.forEach((dathang: any) => {
          const matchingKho = ListKho.find(
            (kho: any) => kho.makho === dathang.makho
          );
          if (matchingKho) {
            khoValues[matchingKho.value] += dathang.sldat;
          }
        });
      }

      return {
        ...baseItem,
        ...(ngaynhan && { ngaynhan }),
        ...khoValues,
        Dathangs,
      };
    });
  }

  async convertData(inputData: any) {
    const Khos = await this._GraphqlService.findAll('kho', {
      enableParallelFetch: true,
      batchSize: 1000,
      take: 999999,
      aggressiveCache: true,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        makho: true,
      },
    });

    const warehouses = Khos.data;
    return inputData.map((item: any) => {
      const result = [...this.transformItemData(warehouses, item)];
      return result;
    });
  }

  transformItemData(warehouses: any[], item: any): any[] {
    const result: any[] = [];
    // Get warehouse lookup map for faster access
    const warehouseMap: { [key: string]: string } = {};
    warehouses.forEach((warehouse: any) => {
      warehouseMap[warehouse.makho] = warehouse.name;
    });
    // Process each order in Dathangs array
    item.Dathangs.forEach((order: any) => {
      const transformedItem = {
        id: item.id,
        title: item.title,
        masp: item.masp,
        dvt: item.dvt,
        haohut: item.haohut,
        slhaohut: item.slhaohut,
        SLDat: item.SLDat,
        SLGiao: item.SLGiao,
        sltontt: item.sltontt,
        slton: item.slton,
        slchogiao: item.slchogiao,
        slchonhap: item.slchonhap,
        mancc: order.mancc,
        name: order.name,
        ngaynhan: order.ngaynhan,
        sldat: order.sldat,
        makho: order.makho,
        namekho: warehouseMap[order.makho] || order.namekho,
        goiy: item.goiy,
      };
      result.push(transformedItem);
    });
    return result;
  }

  trackByFn(index: number, item: any): any {
    return item.masp || item.id;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  onPageSizeChange(size: number, menuTrigger: MatMenuTrigger) {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    if (size > currentData.length) {
      this.pageSize = currentData.length;
      this._snackBar.open(`Số lượng tối đa ${currentData.length}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } else {
      this.pageSize = size;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateDisplayData();

    menuTrigger.closeMenu();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }

  updateDisplayData() {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = currentData.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }

  getCurrentFilteredData(column: string): any[] {
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();

    // Get unique values for the column
    const uniqueValues = new Map();
    currentData.forEach((item: any) => {
      const key = item[column];
      if (!uniqueValues.has(key)) {
        uniqueValues.set(key, item);
      }
    });

    return Array.from(uniqueValues.values());
  }

  parseFloat(value: string): number {
    return parseFloat(value) || 0;
  }

  applyQuickFilter(filterType: string) {
    this.quickFilter = filterType;
    let filteredData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();

    switch (filterType) {
      case 'lowStock':
        filteredData = filteredData.filter(
          (item: any) => (item.slton || 0) <= 10
        );
        break;
      case 'needOrder':
        filteredData = filteredData.filter((item: any) => {
          const suggestion = parseFloat(this.GetGoiy(item));
          return suggestion > 0;
        });
        break;
      case 'pendingDelivery':
        filteredData = filteredData.filter(
          (item: any) => (item.slchogiao || 0) > 0
        );
        break;
      case 'all':
      default:
        // No additional filtering for 'all'
        break;
    }

    // Apply global filter if exists
    if (this.globalFilterValue) {
      filteredData = this.applyGlobalFilterToData(
        filteredData,
        this.globalFilterValue
      );
    }

    this.dataSource.data = filteredData;
    this.totalItems = filteredData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();
  }

  applyGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.globalFilterValue = filterValue;

    let filteredData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();

    // Apply quick filter first
    if (this.quickFilter !== 'all') {
      this.applyQuickFilter(this.quickFilter);
      return; // applyQuickFilter will handle global filter too
    }

    // Apply global filter
    if (filterValue) {
      filteredData = this.applyGlobalFilterToData(filteredData, filterValue);
    }

    this.dataSource.data = filteredData;
    this.totalItems = filteredData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();
  }

  private applyGlobalFilterToData(data: any[], filterValue: string): any[] {
    const searchTerm = filterValue.trim().toLowerCase();
    return data.filter(
      (item: any) =>
        item.title?.toLowerCase().includes(searchTerm) ||
        item.masp?.toLowerCase().includes(searchTerm) ||
        item.name?.toLowerCase().includes(searchTerm) ||
        item.mancc?.toLowerCase().includes(searchTerm)
    );
  }

  // Enhanced sorting methods
  sortData(sort: any) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
        case 'masp':
          return this.compareStrings(a[sort.active], b[sort.active], isAsc);
        case 'slton':
        case 'slchogiao':
        case 'slchonhap':
        case 'SLDat':
        case 'SLGiao':
          return this.compareNumbers(
            Number(a[sort.active]) || 0,
            Number(b[sort.active]) || 0,
            isAsc
          );
        case 'goiy':
          return this.compareNumbers(
            parseFloat(this.GetGoiy(a)),
            parseFloat(this.GetGoiy(b)),
            isAsc
          );
        default:
          return this.compareStrings(a[sort.active], b[sort.active], isAsc);
      }
    });
  }

  private compareStrings(a: string, b: string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareNumbers(a: number, b: number, isAsc: boolean): number {
    return (a - b) * (isAsc ? 1 : -1);
  }

  // Clear all filters
  clearAllFilters() {
    this.quickFilter = 'all';
    this.globalFilterValue = '';
    this.ListFilter = [];
    const currentData =
      this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = currentData;
    this.totalItems = currentData.length;
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayData();

    // Clear search inputs
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach((input: any) => {
      if (input.placeholder.includes('Tìm kiếm')) {
        input.value = '';
      }
    });
  }

  /**
   * Toggle date range filter functionality
   */
  toggleDateRangeFilter(): void {
    this.isDateRangeEnabled = !this.isDateRangeEnabled;
    this.hasUnappliedDateChanges = false;

    if (this.isDateRangeEnabled) {
      // ✅ Set default date range to today when enabling
      const today = new Date();
      this.batdau = new Date(today);
      this.ketthuc = new Date(today);
      this.loadDonhangWithRelations();
    } else {
      // When disabled, reload data without date filter
      this.loadDonhangWithRelations();
    }
  }

  /**
   * Apply date range filter - called by user action
   */
  applyDateFilter(dateMenuTrigger: MatMenuTrigger): void {
    // ✅ Enable date range filtering if not already enabled
    if (!this.isDateRangeEnabled) {
      this.isDateRangeEnabled = true;
    }

    // ✅ Validate date range
    if (!this.batdau || !this.ketthuc) {
      this._snackBar.open('Vui lòng chọn khoảng thời gian hợp lệ', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // ✅ Ensure start date is not after end date
    if (this.batdau > this.ketthuc) {
      this._snackBar.open('Ngày bắt đầu không thể sau ngày kết thúc', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // ✅ Apply the filter
    this.hasUnappliedDateChanges = false;
    this.loadDonhangWithRelations();

    this._snackBar.open('Đã áp dụng bộ lọc ngày', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });

    // Close the date menu
    dateMenuTrigger.closeMenu();
  }

  /**
   * Handle start date change
   */
  onStartDateChange(event: any): void {
    this.batdau = event.value;
    if (this.batdau > this.ketthuc) {
      this.ketthuc = new Date(this.batdau);
    }
    // Mark that there are unapplied changes
    this.hasUnappliedDateChanges = true;
  }

  /**
   * Handle end date change
   */
  onEndDateChange(event: any): void {
    this.ketthuc = event.value;
    if (this.ketthuc < this.batdau) {
      this.batdau = new Date(this.ketthuc);
    }
    // Mark that there are unapplied changes
    this.hasUnappliedDateChanges = true;
  }

  /**
   * Set date range to today
   */
  setToday(dateMenuTrigger: MatMenuTrigger): void {
    const today = new Date();
    this.batdau = new Date(today);
    this.ketthuc = new Date(today);
    // Auto apply when using quick buttons
    this.applyDateFilter(dateMenuTrigger);
  }

  /**
   * Set date range to this week
   */
  setThisWeek(dateMenuTrigger: MatMenuTrigger): void {
    const today = new Date();
    // ✅ Fix: Calculate week dates properly
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    this.batdau = new Date(firstDayOfWeek);
    this.ketthuc = new Date(lastDayOfWeek);

    // Auto apply when using quick buttons
    this.applyDateFilter(dateMenuTrigger);
  }

  /**
   * Set date range to this month
   */
  setThisMonth(dateMenuTrigger: MatMenuTrigger): void {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    this.batdau = new Date(firstDayOfMonth);
    this.ketthuc = new Date(lastDayOfMonth);
    // Auto apply when using quick buttons
    this.applyDateFilter(dateMenuTrigger);
  }

  /**
   * Clear date filter and reload all data
   */
  clearDateFilter(): void {
    this.isDateRangeEnabled = false;
    this.hasUnappliedDateChanges = false;

    // ✅ Reset dates to today
    const today = new Date();
    this.batdau = new Date(today);
    this.ketthuc = new Date(today);

    this.loadDonhangWithRelations();

    this._snackBar.open('Đã xóa bộ lọc ngày', '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  /**
   * Format ngày từ UTC database để hiển thị local time
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị (default: DD/MM/YYYY)
   * @returns Formatted string theo timezone local
   */
  formatDateForDisplay(utcDate: any, format: string = 'DD/MM/YYYY'): string {
    return this._timezoneService.formatForDisplay(utcDate, format);
  }

  /**
   * Chuyển đổi date input từ form sang UTC để gửi API
   * @param formDate Date từ form input
   * @returns UTC ISO string
   */
  convertFormDateToUTC(formDate: any): string {
    return this._timezoneService.formDateToUTC(formDate);
  }

  /**
   * Parse ngày tháng từ input user
   * @param userInput Input từ user
   * @param format Format của input
   * @returns UTC ISO string để lưu database
   */
  parseUserDateInput(userInput: string, format: string = 'YYYY-MM-DD'): string {
    try {
      return this._timezoneService.parseUserInputToUTC(userInput, format);
    } catch (error) {
      console.error('Invalid date format:', error);
      return '';
    }
  }

  // ====== NESTED TABLE METHODS ======

  /**
   * Toggle expanded state for a row and load nested data if needed
   */
  toggleExpanded(element: any): void {
    this.openNestedDataDialog(element);
  }

  /**
   * Open dialog to show nested data
   */
  async openNestedDataDialog(element: any): Promise<void> {
    // Prepare dialog data
    const dialogData: NestedDataDialogData = {
      product: element,
      dathangData: [],
      donhangData: [],
      loading: true,
    };

    // Open the dialog
    const dialogRef = this._dialog.open(NestedDataDialogComponent, {
      width: '95vw',
      maxWidth: '1200px',
      height: '90vh',
      maxHeight: '90vh',
      data: dialogData,
      disableClose: false,
      autoFocus: false,
      panelClass: ['nested-data-dialog-panel'],
    });

    try {
      // Load nested data after dialog opens
      await this.loadNestedData(element);

      // Update dialog data
      dialogData.dathangData = this.getDathangData(element.masp);
      dialogData.donhangData = this.getDonhangData(element.masp);
      dialogData.loading = false;

      // Trigger change detection in dialog component
      if (dialogData.triggerChangeDetection) {
        dialogData.triggerChangeDetection();
      }
    } catch (error) {
      console.error('Error loading nested data:', error);
      dialogData.loading = false;

      // Trigger change detection even on error
      if (dialogData.triggerChangeDetection) {
        dialogData.triggerChangeDetection();
      }

      // Show error message to user
      this._snackBar.open('Lỗi khi tải dữ liệu. Vui lòng thử lại.', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Load nested data for both dathang and donhang
   */
  async loadNestedData(element: any): Promise<void> {
    const masp = element.masp || element.id;
    if (!masp) {
      console.warn('Cannot load nested data: masp is missing', element);
      return;
    }

    // Load both dathang and donhang data in parallel
    await Promise.all([this.loadDathangData(masp), this.loadDonhangData(masp)]);
  }

  /**
   * Load dathang data for a specific product using GraphQL
   */
  async loadDathangData(masp: string): Promise<void> {
    if (this.dathangDataMap.has(masp) || this.loadingDathang.has(masp)) {
      return; // Data already loaded or loading
    }

    this.loadingDathang.add(masp);

    try {
      let startDate: string;
      let endDate: string;

      if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
        // ✅ Sử dụng getAPIDateRange để đảm bảo consistent timezone handling
        const dateRange = this._timezoneService.getAPIDateRange(
          this.batdau,
          this.ketthuc
        );
        startDate = dateRange.Batdau;
        endDate = dateRange.Ketthuc;
      } else {
        // Default to today if no date range is set
        const today = new Date();
        const todayRange = this._timezoneService.getAPIDateRange(today, today);
        startDate = todayRange.Batdau;
        endDate = todayRange.Ketthuc;
      }
      // Use GraphQL to find dathang data by product code
      const dathangResult = await this._GraphqlService.findAll('dathang', {
        enableParallelFetch: true,
        batchSize: 500,
        take: 999999,
        aggressiveCache: true,
        orderBy: { createdAt: 'desc' },
        where: {
          sanpham: {
            some: {
              sanpham: {
                masp: {
                  equals: masp,
                },
              },
            },
          },
          ngaynhan: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          madncc: true,
          ngaynhan: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true,
              diachi: true,
              sdt: true,
            },
          },
          sanpham: {
            where: {
              sanpham: {
                masp: {
                  equals: masp,
                },
              },
            },
            select: {
              id: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              ttgiao: true,
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true,
                },
              },
            },
          },
          kho: {
            select: {
              id: true,
              name: true,
              makho: true,
              diachi: true,
            },
          },
        },
      });

      // Transform the data to match the expected format
      const transformedData = dathangResult.data.flatMap((dathang: any) =>
        dathang.sanpham.map((sp: any) => ({
          id: dathang.id,
          madncc: dathang.madncc,
          ngaynhan: dathang.ngaynhan,
          createdAt: dathang.createdAt,
          updatedAt: dathang.updatedAt,
          status: dathang.status,

          // Product information
          sanphamId: sp.sanpham.id,
          title: sp.sanpham.title,
          masp: sp.sanpham.masp,
          dvt: sp.sanpham.dvt,

          // Quantities and pricing
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          giaban: Number(sp.giaban) || 0,
          ttgiao: Number(sp.ttgiao) || 0,
          // Supplier information
          nhacungcap: dathang.nhacungcap,
          mancc: dathang.nhacungcap?.mancc || '',
          name: dathang.nhacungcap?.name || '',

          // Warehouse information
          // Type identifier
          type: 'dathang',
        }))
      );
      this.dathangDataMap.set(masp, transformedData);
    } catch (error) {
      console.error('Error loading dathang data:', error);
      this.dathangDataMap.set(masp, []);

      // Show error to user
      this._snackBar.open(`Lỗi tải dữ liệu đặt hàng cho ${masp}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.loadingDathang.delete(masp);
    }
  }

  /**
   * Load donhang data for a specific product using GraphQL
   */
  async loadDonhangData(masp: string): Promise<void> {
    if (this.donhangDataMap.has(masp) || this.loadingDonhang.has(masp)) {
      return; // Data already loaded or loading
    }

    this.loadingDonhang.add(masp);

    try {
      let startDate: string;
      let endDate: string;

      if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
        // ✅ Sử dụng getAPIDateRange để đảm bảo consistent timezone handling
        const dateRange = this._timezoneService.getAPIDateRange(
          this.batdau,
          this.ketthuc
        );
        startDate = dateRange.Batdau;
        endDate = dateRange.Ketthuc;
      } else {
        // Default to today if no date range is set
        const today = new Date();
        const todayRange = this._timezoneService.getAPIDateRange(today, today);
        startDate = todayRange.Batdau;
        endDate = todayRange.Ketthuc;
      }
      // Use GraphQL to find donhang data by product code
      const donhangResult = await this._GraphqlService.findAll('donhang', {
        enableParallelFetch: true,
        batchSize: 500,
        take: 999999,
        aggressiveCache: true,
        orderBy: { createdAt: 'desc' },
        where: {
          sanpham: {
            some: {
              sanpham: {
                masp: {
                  equals: masp,
                },
              },
            },
          },
          ngaygiao: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true,
              makh: true,
            },
          },
          sanpham: {
            where: {
              sanpham: {
                masp: {
                  equals: masp,
                },
              },
            },
            select: {
              id: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              giaban: true,
              ttgiao: true,
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true,
                },
              },
            },
          },
        },
      });

      // Transform the data to match the expected format
      const transformedData = donhangResult.data.flatMap((donhang: any) =>
        donhang.sanpham.map((sp: any) => ({
          id: donhang.id,
          madonhang: donhang.madonhang,
          ngaygiao: donhang.ngaygiao,
          createdAt: donhang.createdAt,
          updatedAt: donhang.updatedAt,
          status: donhang.status,

          // Product information
          sanphamId: sp.sanpham.id,
          title: sp.sanpham.title,
          masp: sp.sanpham.masp,
          dvt: sp.sanpham.dvt,

          // Quantities and pricing
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          giaban: Number(sp.giaban) || 0,
          ttgiao: Number(sp.ttgiao) || 0,

          // Customer information
          khachhang: donhang.khachhang,
          makh: donhang.khachhang?.makh || '',
          name: donhang.khachhang?.name || '',
          // Type identifier
          type: 'donhang',
        }))
      );

      this.donhangDataMap.set(masp, transformedData);
    } catch (error) {
      console.error('Error loading donhang data:', error);
      this.donhangDataMap.set(masp, []);

      // Show error to user
      this._snackBar.open(`Lỗi tải dữ liệu đơn hàng cho ${masp}`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.loadingDonhang.delete(masp);
    }
  }

  /**
   * Get dathang data for a specific product
   */
  getDathangData(masp: string): any[] {
    return this.dathangDataMap.get(masp) || [];
  }

  /**
   * Get donhang data for a specific product
   */
  getDonhangData(masp: string): any[] {
    return this.donhangDataMap.get(masp) || [];
  }

  /**
   * Check if dathang data is loading for a specific product
   */
  isDathangLoading(masp: string): boolean {
    return this.loadingDathang.has(masp);
  }

  /**
   * Check if donhang data is loading for a specific product
   */
  isDonhangLoading(masp: string): boolean {
    return this.loadingDonhang.has(masp);
  }

  /**
   * Clear cached nested data (useful for refresh)
   */
  clearNestedData(): void {
    this.dathangDataMap.clear();
    this.donhangDataMap.clear();
    this.loadingDathang.clear();
    this.loadingDonhang.clear();
    this.expandedElementId = null;
    // Note: Dialogs are closed automatically when user dismisses them
  }

  /**
   * Check if a row is expanded (for expanded detail row)
   */
  isExpanded = (index: number, row: any) => {
    const elementId = row.id || row.masp;
    return elementId === this.expandedElementId;
  };

  /**
   * Check if element is expanded by ID - Legacy method for compatibility
   */
  isElementExpanded(element: any): boolean {
    return false; // Always return false since we're using overlay now
  }

  /**
   * Expand element by ID - Now opens dialog
   */
  expandById(id: string, masp?: string): void {
    const element = this.dataSource.data.find(
      (item) => (item.id || item.masp) === id || item.masp === masp
    );
    if (element) {
      this.openNestedDataDialog(element);
    }
  }

  /**
   * Collapse expanded element
   */
  collapseExpanded(): void {
    this.expandedElementId = null;
    // Note: Dialogs are closed automatically when user dismisses them
  }

  /**
   * Check if any data is currently loading for a product
   */
  isAnyDataLoading(masp: string): boolean {
    return this.isDathangLoading(masp) || this.isDonhangLoading(masp);
  }

  /**
   * Get total count of all nested data for a product
   */
  getTotalNestedDataCount(masp: string): number {
    return this.getDathangData(masp).length + this.getDonhangData(masp).length;
  }

  /**
   * Check if nested data exists for a product
   */
  hasNestedData(masp: string): boolean {
    return this.getTotalNestedDataCount(masp) > 0;
  }

  /**
   * Get loading state summary for debugging
   */
  getLoadingStateSummary(): any {
    return {
      expandedElementId: this.expandedElementId,
      loadingDathang: Array.from(this.loadingDathang),
      loadingDonhang: Array.from(this.loadingDonhang),
      cachedDathang: Array.from(this.dathangDataMap.keys()),
      cachedDonhang: Array.from(this.donhangDataMap.keys()),
    };
  }

  // ====== INLINE EDIT METHODS ======

  /**
   * Load temporary edits from localStorage
   */
  loadTempEditsFromStorage(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.tempStorage = new Map(Object.entries(parsedData));
      }
    } catch (error) {
      console.error('Error loading temp edits from storage:', error);
      this.tempStorage = new Map();
    }
  }

  /**
   * Save temporary edits to localStorage
   */
  saveTempEditsToStorage(): void {
    try {
      const dataToStore = Object.fromEntries(this.tempStorage);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving temp edits to storage:', error);
    }
  }

  /**
   * Start editing a row
   */
  startEdit(row: any, field: string): void {
    const key = this.getRowKey(row);
    if (!this.editingRows.has(key)) {
      this.editingRows.set(key, {});
    }
    this.editingRows.get(key)[field] = true;
  }

  /**
   * Stop editing a row
   */
  stopEdit(row: any, field: string): void {
    const key = this.getRowKey(row);
    if (this.editingRows.has(key)) {
      delete this.editingRows.get(key)[field];
      if (Object.keys(this.editingRows.get(key)).length === 0) {
        this.editingRows.delete(key);
      }
    }
  }

  /**
   * Check if a field is being edited
   */
  isEditing(row: any, field: string): boolean {
    const key = this.getRowKey(row);
    return this.editingRows.has(key) && this.editingRows.get(key)[field] === true;
  }

  /**
   * Save field value to temporary storage
   */
  saveFieldValue(row: any, field: string, value: any): void {
    const key = this.getRowKey(row);
    
    if (!this.tempStorage.has(key)) {
      this.tempStorage.set(key, {
        masp: row.masp,
        title: row.title,
        changes: {}
      });
    }
    
    const tempData = this.tempStorage.get(key);
    tempData.changes[field] = value;
    tempData.lastModified = new Date().toISOString();
    
    this.saveTempEditsToStorage();
    this.stopEdit(row, field);
    
    this._snackBar.open(`Đã lưu tạm ${field}`, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  /**
   * Get value from temp storage or original row
   */
  getFieldValue(row: any, field: string): any {
    const key = this.getRowKey(row);
    if (this.tempStorage.has(key) && this.tempStorage.get(key).changes[field] !== undefined) {
      return this.tempStorage.get(key).changes[field];
    }
    return row[field] || '';
  }

  /**
   * Check if field has temporary changes
   */
  hasFieldChanged(row: any, field: string): boolean {
    const key = this.getRowKey(row);
    return this.tempStorage.has(key) && 
           this.tempStorage.get(key).changes[field] !== undefined;
  }

  /**
   * Get row key for tracking
   */
  getRowKey(row: any): string {
    return row.masp || row.id || '';
  }

  /**
   * Get count of items with temporary changes
   */
  getTempChangesCount(): number {
    return this.tempStorage.size;
  }

  /**
   * Export temp data to Excel
   */
  async exportTempChanges(): Promise<void> {
    if (this.tempStorage.size === 0) {
      this._snackBar.open('Không có dữ liệu tạm thời để xuất', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    try {
      const tempData = Array.from(this.tempStorage.values()).map((item: any) => ({
        masp: item.masp || '',
        title: item.title || '',
        ghichu_moi: item.changes.ghichu || '',
        xSLDat_moi: item.changes.xSLDat || '',
        lastModified: item.lastModified || '',
      }));

      const mapping = {
        masp: 'Mã Sản Phẩm',
        title: 'Tên Sản Phẩm',
        ghichu_moi: 'Ghi Chú Mới',
        xSLDat_moi: 'SL Đặt (NCC) Mới',
        lastModified: 'Thời Gian Sửa',
      };

      // Use existing writeExcelFile function
      (window as any).writeExcelFile(
        tempData,
        'DuLieuTamThoi_' + new Date().toISOString().split('T')[0],
        Object.values(mapping),
        mapping
      );

      this._snackBar.open('Xuất dữ liệu tạm thời thành công!', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

    } catch (error) {
      console.error('Error exporting temp changes:', error);
      this._snackBar.open('Lỗi khi xuất dữ liệu tạm thời', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Apply temp changes to main data and clear storage
   */
  async applyTempChanges(): Promise<void> {
    if (this.tempStorage.size === 0) {
      this._snackBar.open('Không có thay đổi tạm thời để áp dụng', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    try {
      const tempCount = this.tempStorage.size;
      
      // Apply changes to dataSource.data (synchronize with tempStorage)
      const currentData = [...this.dataSource.data];
      
      for (const [key, tempData] of this.tempStorage.entries()) {
        const rowIndex = currentData.findIndex((item: any) => this.getRowKey(item) === key);
        if (rowIndex !== -1) {
          // Apply changes to the row in dataSource
          Object.assign(currentData[rowIndex], tempData.changes);
        }
      }

      // Update data source with synchronized data
      this.dataSource.data = currentData;

      // Clear temp storage after successful sync
      this.tempStorage.clear();
      this.editingRows.clear();
      // localStorage.removeItem(this.STORAGE_KEY);

      this._snackBar.open(`Đã áp dụng ${tempCount} thay đổi vào dữ liệu chính!`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

    } catch (error) {
      console.error('Error applying temp changes:', error);
      this._snackBar.open('Lỗi khi áp dụng thay đổi', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Clear all temporary storage and restore original data
   */
  clearTempStorage(): void {
    if (this.tempStorage.size === 0) {
      this._snackBar.open('Không có dữ liệu tạm thời để xóa', '', {
        duration: 1500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });
      return;
    }

    const tempCount = this.tempStorage.size;

    // Clear temp storage
    this.tempStorage.clear();
    this.editingRows.clear();
    localStorage.removeItem(this.STORAGE_KEY);

    // Restore dataSource.data to original data (remove temp changes)
    const originalData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = [...originalData];

    this._snackBar.open(`Đã xóa ${tempCount} thay đổi tạm thời và khôi phục dữ liệu gốc`, '', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-info'],
    });
  }

  /**
   * Handle Enter key for inline editing
   */
  onFieldKeyDown(event: KeyboardEvent, row: any, field: string): void {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      this.saveFieldValue(row, field, target.value);
    } else if (event.key === 'Escape') {
      this.stopEdit(row, field);
    }
  }

  /**
   * Handle blur for inline editing
   */
  onFieldBlur(event: FocusEvent, row: any, field: string): void {
    const target = event.target as HTMLInputElement;
    this.saveFieldValue(row, field, target.value);
  }
}

// Debounce decorator để tối ưu hiệu suất
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
