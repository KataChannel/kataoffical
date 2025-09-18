import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
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
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImportdataService } from '../importdata.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  excelSerialDateToJSDate,
  readExcelFile,
  readExcelFileNoWorker,
  writeExcelFile,
  writeExcelFileSheets,
} from '../../../shared/utils/exceldrive.utils';
import {
  ConvertDriveData,
  convertToSlug,
  GenId,
} from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { BanggiaService } from '../../banggia/banggia.service';
import { DathangService } from '../../dathang/dathang.service';
import { DonhangService } from '../../donhang/donhang.service';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import moment from 'moment';
import { PhieukhoService } from '../../phieukho/phieukho.service';
import { KhoService } from '../../kho/kho.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { UserService } from '../../user/user.service';
import {
  ImportConfirmationDialogComponent,
  ImportConfirmationData,
} from '../import-confirmation-dialog.component';
import {
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
  MatDatepickerToggle,
  MatDatepickerActions,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImportDataValidationService } from '../../../shared/services/import-data-validation.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-listimportdata',
  standalone: true,
  templateUrl: './listimportdata.component.html',
  styleUrls: ['./listimportdata.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatDatepickerActions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListImportdataComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    codeId: 'Code',
    name: 'Tiêu Đề',
    group: 'Nhóm',
    description: 'Mô Tả',
    status: 'Trạng Thái',
    order: 'Thứ Tự',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('ImportdataColFilter') || '[]'
  );
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _KhachhangService: KhachhangService = inject(KhachhangService);
  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _DonhangService: DonhangService = inject(DonhangService);
  private _DathangService: DathangService = inject(DathangService);
  private _PhieukhoService: PhieukhoService = inject(PhieukhoService);
  private _UserService: UserService = inject(UserService);
  private _KhoService: KhoService = inject(KhoService);
  private _ImportdataService: ImportdataService = inject(ImportdataService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  // Loading states using signals
  isLoading = signal<boolean>(false);
  isImporting = signal<boolean>(false);
  isExporting = signal<boolean>(false);
  loadingMessage = signal<string>('');

  // Date range properties
  batdau: Date = new Date();
  ketthuc: Date = new Date();

  ListImportType = signal<any[]>([
    { id: 1, title: 'Sản Phẩm', value: 'sanpham', status: true },
    { id: 2, title: 'Khách Hàng', value: 'khachhang', status: true },
    { id: 3, title: 'Nhà Cung Cấp', value: 'nhacungcap', status: true },
    { id: 4, title: 'Bảng Giá', value: 'banggia', status: true },
    { id: 5, title: 'Đơn Hàng', value: 'donhang', status: true },
    { id: 6, title: 'Đặt Hàng', value: 'dathang', status: true },
    {
      id: 7,
      title: 'Bảng Giá Khách Hàng',
      value: 'banggiakhachhang',
      status: true,
    },
    {
      id: 8,
      title: 'Bảng Giá Sản Phẩm',
      value: 'banggiasanpham',
      status: true,
    },
    {
      id: 9,
      title: 'Nhà Cung Cấp Sản Phẩm',
      value: 'nhacungcapsanpham',
      status: true,
    },
    { id: 10, title: 'Xuất Nhập Tồn', value: 'xuatnhapton', status: true },
    { id: 11, title: 'Kho', value: 'kho', status: true },
  ]);
  ListEdit = signal<any[]>([]);
  ListImportdata: any = this._ImportdataService.ListImportdata;
  TitleExport = 'export';
  rawListSP: any[] = [];
  rawListKH: any[] = [];
  rawListNCC: any[] = [];
  rawListBG: any[] = [];
  rawListDH: any[] = [];
  rawListDathang: any[] = [];
  rawListTonkho: any[] = [];
  rawListKho: any[] = [];

  constructor() {
    // Initialize date range (current date as default)
    const today = new Date();
    this.ketthuc = new Date(today);
    this.batdau = new Date(today);

    effect(async () => {
      this.isLoading.set(true);
      this.loadingMessage.set('Đang tải dữ liệu...');

      try {
        await this._ImportdataService.getAllImportdata(1000, true);

        // Load data with date parameters
        await this.loadDataWithDateRange();

        this.loadingMessage.set('Đang kiểm tra quyền...');
        await this._UserService.getProfile();
        const permissions =
          this._UserService
            .profile()
            ?.permissions?.map((item: any) => item.name) || [];
        this.ListImportType.update((items) =>
          items.map((item) => ({
            ...item,
            status: permissions.includes('importdata.' + item.value),
          }))
        );
      } catch (error) {
        console.error('Error loading data:', error);
        this._snackBar.open('Có lỗi xảy ra khi tải dữ liệu', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } finally {
        this.isLoading.set(false);
        this.loadingMessage.set('');
      }
    });
  }

  // Date filtering methods
  async loadDataWithDateRange() {
    try {
      // Create date parameters object for services that support it
      const dateParams = {
        Batdau: this.batdau,
        Ketthuc: this.ketthuc,
        pageSize: 9999,
      };

      this.loadingMessage.set('Đang tải danh sách sản phẩm...');
      await this._SanphamService.getSanphamBy({ pageSize: 99999 });
      this.rawListSP = this._SanphamService.ListSanpham();

      this.loadingMessage.set('Đang tải danh sách khách hàng...');
      await this._KhachhangService.getKhachhangBy({ pageSize: 99999 });
      this.rawListKH = this._KhachhangService.ListKhachhang();

      this.loadingMessage.set('Đang tải danh sách nhà cung cấp...');
      // await this._NhacungcapService.getNhacungcapBy({ pageSize: 99999 });
      // this.rawListNCC = this._NhacungcapService.ListNhacungcap();

     const Nhacungcaps = await this._GraphqlService.findAll('nhacungcap',{
        take:99999,
        enableParallelFetch:true,
        aggressiveCache:true,
        select : {
          id:true,
          name:true,   
          mancc:true,
          Sanpham:{
            select:{masp:true}
          }     
      }})
      this.rawListNCC = Nhacungcaps.data   
         
      this.loadingMessage.set('Đang tải bảng giá...');
      await this._BanggiaService.getAllBanggia();
      this.rawListBG = this._BanggiaService.ListBanggia();

      this.loadingMessage.set('Đang tải đơn hàng...');
      await this._DonhangService.searchDonhang(dateParams);
      this.rawListDH = this._DonhangService.ListDonhang();

      this.loadingMessage.set('Đang tải đặt hàng...');
      await this._DathangService.searchDathang(dateParams);
      this.rawListDathang = this._DathangService.ListDathang();

      this.loadingMessage.set('Đang tải tồn kho...');
      await this._KhoService.getTonKho('1', '1000').then((res: any) => {
        this.rawListTonkho = res.data;
      });

      this.loadingMessage.set('Đang tải danh sách kho...');
      await this._KhoService.getAllKho();
      this.rawListKho = this._KhoService.ListKho();
    } catch (error) {
      console.error('Error loading data with date range:', error);
      throw error;
    }
  }

  // Date change handler
  async onDateChange() {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.loadingMessage.set('Đang cập nhật dữ liệu theo ngày...');

      try {
        await this.loadDataWithDateRange();
      } catch (error) {
        console.error('Error updating data with new date range:', error);
        this._snackBar.open('Có lỗi xảy ra khi cập nhật dữ liệu', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } finally {
        this.isLoading.set(false);
        this.loadingMessage.set('');
      }
    }
  }

  // Apply date filter
  async applyDateFilter() {
    await this.onDateChange();
  }

  // Quick date range methods
  async setDateRange(range: string) {
    const today = new Date();

    switch (range) {
      case 'today':
        this.batdau = new Date(today);
        this.ketthuc = new Date(today);
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        this.batdau = new Date(yesterday);
        this.ketthuc = new Date(yesterday);
        break;
      case 'last7days':
        this.ketthuc = new Date(today);
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 6);
        break;
      case 'last30days':
        this.ketthuc = new Date(today);
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 29);
        break;
      case 'thisMonth':
        this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
        this.ketthuc = new Date(today);
        break;
      case 'lastMonth':
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        this.batdau = new Date(lastMonth);
        this.ketthuc = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'thisWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        this.batdau = new Date(startOfWeek);
        this.ketthuc = new Date(today);
        break;
    }

    await this.applyDateFilter();
  }

  async ngOnInit(): Promise<void> {
    this.loadDataWithDateRange();
  }

  applyFilter(event: Event) {}

  toggleAll() {
    const allSelected = this.ListEdit().length === this.ListImportType().length;
    if (allSelected) {
      this.ListEdit.set([]);
      this.TitleExport = 'export';
    } else {
      this.ListEdit.set(this.ListImportType());
      this.TitleExport = 'export_all';
    }
  }
  toggleItem(item: any) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
      this.TitleExport += '_' + item.value;
      this.ListEdit.update((prev) => [...prev, item]);
    } else {
      this.TitleExport = this.TitleExport.replace('_' + item.value, '');
      this.ListEdit.update((prev) => prev.filter((i) => i.id !== item.id));
    }
  }
  CheckItem(item: any) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
  async ExportExcel(title: any) {
    if (this.isExporting()) return;

    this.isExporting.set(true);
    this.loadingMessage.set(
      'Đang chuẩn bị dữ liệu xuất theo khoảng thời gian...'
    );

    try {
      // Get filtered data based on date range
      const filteredData = this.getFilteredExportData();

      const ListSP =
        Array.isArray(filteredData.ListSP) && filteredData.ListSP.length
          ? filteredData.ListSP.map((item: any) => ({
              masp: item.masp,
              subtitle: item.subtitle,
              title: item.title,
              title2: item.title2,
              giaban: item.giaban,
              giagoc: item.giagoc,
              vat: item.vat,
              dvt: item.dvt,
              haohut: item.haohut,
              loadpoint: item.loadpoint,
              ghichu: item.ghichu,
            }))
          : [
              {
                masp: '',
                subtitle: '',
                title: '',
                title2: '',
                giaban: '',
                giagoc: '',
                vat: '',
                dvt: '',
                haohut: '',
                ghichu: '',
              },
            ];
      const ListKH =
        Array.isArray(filteredData.ListKH) && filteredData.ListKH.length
          ? filteredData.ListKH.map((v: any) => ({
              name: v.name?.trim() || '',
              tenfile: v.tenfile?.trim() || '',
              makh: v.makh?.trim() || '',
              namenn: v.namenn?.trim() || '',
              mabanggia: v.banggia?.mabanggia?.trim() || '',
              diachi: v.diachi?.trim() || '',
              quan: v.quan?.trim() || '',
              email: v.email?.trim() || '',
              sdt: v.sdt?.toString().trim() || '',
              mst: v.mst?.toString().trim() || '',
              gionhanhang: v.gionhanhang?.toString().trim() || '',
              loaikh: v.loaikh?.toString().trim() || 'khachsi',
              hiengia: v.hiengia || true,
              ishowvat: v.ishowvat || false,
              ghichu: v.ghichu?.toString().trim() || '',
            }))
          : [
              {
                name: '',
                tenfile: '',
                makh: '',
                namenn: '',
                diachi: '',
                quan: '',
                email: '',
                sdt: '',
                mst: '',
                gionhanhang: '',
                loaikh: 'khachsi',
                hiengia: true,
                ishowvat: false,
                ghichu: '',
              },
            ];

      const ListNCC =
        Array.isArray(filteredData.ListNCC) && filteredData.ListNCC.length > 0
          ? filteredData.ListNCC.map((v: any) => ({
              name: v.name?.trim() || '',
              tenfile: v.tenfile?.trim() || '',
              mancc: v.mancc?.trim() || '',
              diachi: v.diachi?.trim() || '',
              email: v.email?.trim() || '',
              sdt: v.sdt?.toString().trim() || '',
              ghichu: v.ghichu?.toString().trim() || '',
            }))
          : [
              {
                name: '',
                tenfile: '',
                mancc: '',
                diachi: '',
                email: '',
                sdt: '',
                ghichu: '',
              },
            ];

      const ListBG =
        Array.isArray(filteredData.ListBG) && filteredData.ListBG.length > 0
          ? filteredData.ListBG.map((v: any) => ({
              title: v.title?.trim() || '',
              mabanggia: v.mabanggia?.trim() || '',
              type: v.type?.trim() || '',
              batdau: moment(v.batdau).format('DD/MM/YYYY') || '',
              ketthuc: moment(v.ketthuc).format('DD/MM/YYYY') || '',
              ghichu: v.ghichu?.trim() || '',
              status: v.status?.trim() || '',
            }))
          : [
              {
                title: '',
                mabanggia: '',
                type: '',
                batdau: '',
                ketthuc: '',
                ghichu: '',
                status: '',
              },
            ];

      // Flatten donhang items from nested 'sanpham' with date filtering applied
      const ListDH =
        Array.isArray(filteredData.ListDH) && filteredData.ListDH.length > 0
          ? filteredData.ListDH.flatMap((record: any) => {
              if (!Array.isArray(record.sanpham)) return [];
              return record.sanpham.map((sp: any) => ({
                ngaygiao: moment(record.ngaygiao).format('DD/MM/YYYY'),
                makh: record.khachhang?.makh,
                name: record.khachhang?.name,
                mabanggia: record.khachhang?.banggia?.[0]?.mabanggia,
                masp: sp.masp,
                tensp: sp.title,
                sldat: sp.sldat,
                slgiao: sp.slgiao,
                slnhan: sp.slnhan,
                ghichu: sp.ghichu,
              }));
            })
          : [
              {
                ngaygiao: moment().format('DD/MM/YYYY'),
                makh: '',
                mabanggia: '',
                masp: '',
                tensp: '',
                sldat: 0,
                slgiao: 0,
                slnhan: 0,
                ghichu: '',
              },
            ];
      const ListDathang =
        Array.isArray(filteredData.ListDathang) &&
        filteredData.ListDathang.length > 0
          ? filteredData.ListDathang.flatMap((record: any) => {
              if (!Array.isArray(record.sanpham)) return [];
              return record.sanpham.map((sp: any) => ({
                ngaynhan: moment(record.ngaynhan).format('DD/MM/YYYY'),
                mancc: record.nhacungcap?.mancc,
                name: record.nhacungcap?.name,
                mabanggia: record.banggia?.[0]?.mabanggia,
                masp: sp.masp,
                tensp: sp.title,
                sldat: Number(sp.sldat) || 0,
                slgiao: Number(sp.slgiao) || 0,
                slnhan: Number(sp.slnhan) || 0,
                gianhap: Number(sp.gianhap) || 0,
                ghichu: sp.ghichu,
                makho: record?.kho?.makho || '',
              }));
            })
          : [
              {
                ngaynhan: moment().format('DD/MM/YYYY'),
                mancc: '',
                name: '',
                mabanggia: '',
                masp: '',
                tensp: '',
                sldat: 0,
                slgiao: 0,
                slnhan: 0,
                gianhap:0,
                ghichu: '',
                makho: '',
              },
            ];

      const ListBGSP = this.convertBGSPToExport(
        filteredData.ListBG,
        filteredData.ListSP
      );

      const ListBGKH: any[] = filteredData.ListKH.map((v: any) => {
        const result: any = {
          makh: v.makh || '',
          name: v.name || '',
          mabanggia: v.banggia?.mabanggia || '',
        };
        return result;
      });

      const dynamicKeys = filteredData.ListSP.reduce(
        (acc: Record<string, string>, v: any) => {
          if (v && v.masp) {
            acc[v.masp] = '';
          }
          return acc;
        },
        {}
      );
      // Build ListNCCSP dynamically using filtered NCC data and up to 5 product codes from dynamicKeys.
      const ListNCCSP: any[] = filteredData.ListNCC.map((supplier: any) => {
        const result: any = {
          mancc: supplier.mancc || '',
          name: supplier.name || '',
        };
        let i = 1;
        for (const masp of Object.keys(dynamicKeys)) {
          const productExists = supplier.Sanpham?.some(
            (sp: any) => sp.masp === masp
          );
          if (productExists) {
            result[i] = masp;
            i++;
          }
        }
        return result;
      });
      console.log('dynamicKeys', dynamicKeys);
      console.log('ListNCCSP1123', ListNCCSP);
      
      const ListTonkho = filteredData.ListTonkho.map((v: any) => ({
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
        slton: v.slton,
      }));

      const ListKho =
        Array.isArray(filteredData.ListKho) && filteredData.ListKho.length
          ? filteredData.ListKho.map((item: any) => ({
              makho: item.makho || '',
              tenkho: item.tenkho || '',
              diachi: item.diachi || '',
              ghichu: item.ghichu || '',
              status: item.status || 'active',
            }))
          : [
              {
                makho: '',
                tenkho: '',
                diachi: '',
                ghichu: '',
                status: 'active',
              },
            ];

      const Exportdata: any = {};
      if (this.ListEdit().some((item: any) => item.value === 'sanpham')) {
        Exportdata['sanpham'] = { data: ListSP };
      }
      if (this.ListEdit().some((item: any) => item.value === 'khachhang')) {
        Exportdata['khachhang'] = { data: ListKH };
      }
      if (this.ListEdit().some((item: any) => item.value === 'nhacungcap')) {
        Exportdata['nhacungcap'] = { data: ListNCC };
      }
      if (this.ListEdit().some((item: any) => item.value === 'banggia')) {
        Exportdata['banggia'] = { data: ListBG };
      }
      if (this.ListEdit().some((item: any) => item.value === 'donhang')) {
        Exportdata['donhang'] = { data: ListDH };
      }
      if (this.ListEdit().some((item: any) => item.value === 'dathang')) {
        Exportdata['dathang'] = { data: ListDathang };
      }
      if (
        this.ListEdit().some((item: any) => item.value === 'banggiasanpham')
      ) {
        Exportdata['banggiasanpham'] = { data: ListBGSP };
      }
      if (
        this.ListEdit().some((item: any) => item.value === 'banggiakhachhang')
      ) {
        Exportdata['banggiakhachhang'] = { data: ListBGKH };
      }
      if (
        this.ListEdit().some((item: any) => item.value === 'nhacungcapsanpham')
      ) {
        Exportdata['nhacungcapsanpham'] = { data: ListNCCSP };
        console.log('ListNCCSP', ListNCCSP);
        
      }
      if (this.ListEdit().some((item: any) => item.value === 'xuatnhapton')) {
        Exportdata['xuatnhapton'] = { data: ListTonkho };
      }
      if (this.ListEdit().some((item: any) => item.value === 'kho')) {
        Exportdata['kho'] = { data: ListKho };
      }
      if (Object.keys(Exportdata).length === 0) {
        this._snackBar.open('Không có dữ liệu để xuất', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      this.loadingMessage.set('Đang tạo file Excel...');

      // Include date range in filename
      const dateRangeStr = `${this.batdau
        .toLocaleDateString('vi-VN')
        .replace(/\//g, '-')}_${this.ketthuc
        .toLocaleDateString('vi-VN')
        .replace(/\//g, '-')}`;
      const exportFileName = `${title}_${dateRangeStr}`;

      writeExcelFileSheets(Exportdata, exportFileName);

      this._snackBar.open('Xuất dữ liệu thành công!', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Error exporting Excel:', error);
      this._snackBar.open('Có lỗi xảy ra khi xuất dữ liệu', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isExporting.set(false);
      this.loadingMessage.set('');
    }
  }

  convertBGSPToExport(listbanggia: any, listsp: any) {
    const pricingTables = new Set(
      listbanggia.map((item: any) => item.mabanggia)
    );
    return listsp.map((product: any) => ({
      masp: product.masp,
      title: product.title,
      giaban: product.giaban.toString(),
      ...Array.from(pricingTables).reduce(
        (acc: Record<string, string>, table: any) => {
          acc[table] = product.giaban.toString();
          return acc;
        },
        {} as Record<string, string>
      ),
    }));
  }
  convertBGSPToImport(
    data: Array<{
      masp: string;
      title: string;
      giagoc: any;
      [key: string]: any;
    }>
  ): Array<{
    mabanggia: string;
    title: string;
    sanpham: Array<{ masp: string; title: string; giagoc: any }>;
  }> {
    if (!data || data.length === 0) {
      return [];
    }

    // Extract keys representing price boards (excluding masp, title, giagoc)
    const boardKeys = Object.keys(data[0]).filter(
      (key) => !['masp', 'title', 'giagoc'].includes(key)
    );

    // For each board key, create an object with a list of products
    const data1 = boardKeys.map((boardKey) => ({
      mabanggia: boardKey,
      title: `Bảng giá ${boardKey.replace('BG', '')}`,
      sanpham: data.map((sp) => ({
        masp: sp.masp?.toString().trim() || '',
        title: sp.title?.toString().trim() || '',
        giagoc: sp.giagoc || 0,
        giaban: sp[boardKey] || 0,
      })),
    }));
    return data1;
  }

  // convertBGKHToImport(data: any){
  //   if (!data || data.length === 0) {
  //     return [];
  //   }
  //   // Extract keys representing price boards (excluding makh, name)
  //   const boardKeys = Object.keys(data[0]).filter(
  //     (key) => !['makh', 'name'].includes(key)
  //   );
  //   data.forEach((v:any) => {
  //     v.banggia = [];
  //     for (const key of boardKeys) {
  //       if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
  //         v.banggia.push(v[key]);
  //       }
  //       delete v[key];
  //     }
  //   });
  //   return data;
  // }

  convertNCCSPToImport(data: any) {
    if (!data || data.length === 0) {
      return [];
    }
    // Extract keys representing price boards (excluding mancc, name)
    const boardKeys = Object.keys(data[0]).filter(
      (key) => !['mancc', 'name'].includes(key)
    );
    data.forEach((v: any) => {
      v.Sanpham = [];
      for (const key of boardKeys) {
        if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
          v.Sanpham.push(v[key]);
        }
        delete v[key];
      }
    });
    return data;
  }

  async ImportExcel(event: any) {
    if (this.isImporting()) return;

    this.isImporting.set(true);
    this.loadingMessage.set('Đang đọc file Excel...');

    try {
      const data = await readExcelFileNoWorker(event);
      this.loadingMessage.set('Đang xử lý dữ liệu...');
      await this.DoImportData(data);
    } catch (error) {
      console.error('Error importing Excel:', error);
      this._snackBar.open('Có lỗi xảy ra khi đọc file Excel', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isImporting.set(false);
      this.loadingMessage.set('');
    }
  }

  // Method để hiển thị dialog xác nhận import
  private async showImportConfirmDialog(
    dataType: string,
    existingCount: number,
    newCount: number,
    duplicateItems: any[]
  ): Promise<{ confirmed: boolean; overwrite: boolean }> {
    return new Promise((resolve) => {
      const dialogData: ImportConfirmationData = {
        dataType,
        existingCount,
        newCount,
        duplicateItems,
        isOverwrite: false,
      };

      const dialogRef = this._dialog.open(ImportConfirmationDialogComponent, {
        width: '500px',
        data: dialogData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        resolve(result || { confirmed: false, overwrite: false });
      });
    });
  }

  async DoImportData(data: any) {
    if (Object.keys(this.ListEdit()).length === 0) {
      this._snackBar.open('Chưa Chọn Loại Dữ Liệu', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }
    if (Object.keys(data).length === 0) {
      this._snackBar.open('Không có dữ liệu để nhập', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    // Import Sản phẩm với xác nhận
    if (
      data.sanpham &&
      data.sanpham.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'sanpham')
    ) {
      // Transform and validate data
      const transformedData =
        ImportDataValidationService.transformDataForImport(
          data.sanpham,
          'sanpham'
        );

      const validData = ImportDataValidationService.filterValidData(
        transformedData,
        ImportDataValidationService.getRequiredFields('sanpham')
      );

      // Kiểm tra trùng lặp
      const duplicates = ImportDataValidationService.checkDuplicates(
        validData,
        this.rawListSP,
        ImportDataValidationService.getUniqueField('sanpham')
      );
      const result = await this.showImportConfirmDialog(
        'Sản Phẩm',
        this.rawListSP.length,
        validData.length,
        duplicates
      );

      if (!result.confirmed) return;

      const finalData = ImportDataValidationService.prepareSanphamData(
        validData,
        this.rawListSP,
        result.overwrite
      );
      if (finalData.length === 0) {
        this._snackBar.open('Không có dữ liệu mới để import', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      const importSnackbar = this._snackBar.open(
        `Đang import ${finalData.length} sản phẩm...`,
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );

      try {
        await this._SanphamService.ImportSanpham(finalData);

        importSnackbar.dismiss();
        this._snackBar.open(
          `Import thành công ${finalData.length} sản phẩm${
            result.overwrite ? ' (ghi đè)' : ' (thêm mới)'
          }!`,
          '',
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error) {
        importSnackbar.dismiss();
        this._snackBar.open('Có lỗi xảy ra khi import sản phẩm', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    // Import Khách hàng với xác nhận
    if (
      data.khachhang &&
      data.khachhang.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'khachhang')
    ) {
      // Transform and validate data
      const transformedData =
        ImportDataValidationService.transformDataForImport(
          data.khachhang,
          'khachhang'
        );

      const validData = ImportDataValidationService.filterValidData(
        transformedData,
        ImportDataValidationService.getRequiredFields('khachhang')
      );

      // Kiểm tra trùng lặp
      const duplicates = ImportDataValidationService.checkDuplicates(
        validData,
        this.rawListKH,
        ImportDataValidationService.getUniqueField('khachhang')
      );
      const result = await this.showImportConfirmDialog(
        'Khách Hàng',
        this.rawListKH.length,
        validData.length,
        duplicates
      );

      if (!result.confirmed) return;

      const finalData = ImportDataValidationService.prepareKhachhangData(
        validData,
        this.rawListKH,
        result.overwrite
      );
      if (finalData.length === 0) {
        this._snackBar.open('Không có dữ liệu mới để import', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      const importSnackbar = this._snackBar.open(
        `Đang import ${finalData.length} khách hàng...`,
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );

      try {
        await this._KhachhangService.ImportKhachhang(finalData);
        importSnackbar.dismiss();
        this._snackBar.open(
          `Import thành công ${finalData.length} khách hàng${
            result.overwrite ? ' (ghi đè)' : ' (thêm mới)'
          }!`,
          '',
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error) {
        importSnackbar.dismiss();
        this._snackBar.open('Có lỗi xảy ra khi import khách hàng', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    // Import Nhà cung cấp với xác nhận
    if (
      data.nhacungcap &&
      data.nhacungcap.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'nhacungcap')
    ) {
      const ListNCC = (data.nhacungcap || [])
        .map((v: any) => ({
          name: v.name,
          tenfile: removeVietnameseAccents(
            v.tenfile.toString() || v.name || ''
          ),
          mancc: v.mancc,
          diachi: v.diachi,
          email: v.email,
          sdt: v.sdt.toString(),
          ghichu: v.ghichu,
        }))
        .filter(
          (v: any) =>
            v.mancc !== undefined && v.mancc !== null && v.mancc !== ''
        );

      // Kiểm tra trùng lặp
      const duplicates = ImportDataValidationService.checkDuplicates(
        ListNCC,
        this.rawListNCC,
        'mancc'
      );
      const result = await this.showImportConfirmDialog(
        'Nhà Cung Cấp',
        this.rawListNCC.length,
        ListNCC.length,
        duplicates
      );

      if (!result.confirmed) return;

      const finalData = ImportDataValidationService.prepareNhacungcapData(
        ListNCC,
        this.rawListNCC,
        result.overwrite
      );
      if (finalData.length === 0) {
        this._snackBar.open('Không có dữ liệu mới để import', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      const importSnackbar = this._snackBar.open(
        `Đang import ${finalData.length} nhà cung cấp...`,
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );

      try {
        await this._NhacungcapService.ImportNhacungcap(finalData);
        importSnackbar.dismiss();
        this._snackBar.open(
          `Import thành công ${finalData.length} nhà cung cấp${
            result.overwrite ? ' (ghi đè)' : ' (thêm mới)'
          }!`,
          '',
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error) {
        importSnackbar.dismiss();
        this._snackBar.open('Có lỗi xảy ra khi import nhà cung cấp', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    // Import Bảng giá với xác nhận
    if (
      data.banggia &&
      data.banggia.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'banggia')
    ) {
      const ListBG = (data.banggia || [])
        .map((v: any) => ({
          title: 'Bảng Giá ' + v.mabanggia,
          mabanggia: v.mabanggia,
          type: v.type,
          batdau: moment(excelSerialDateToJSDate(v.batdau)).toDate(),
          ketthuc: moment(excelSerialDateToJSDate(v.ketthuc)).toDate(),
          ghichu: v.ghichu,
          status: v.status,
        }))
        .filter(
          (v: any) =>
            v.mabanggia !== undefined &&
            v.mabanggia !== null &&
            v.mabanggia !== ''
        );

      // Kiểm tra trùng lặp
      const duplicates = ImportDataValidationService.checkDuplicates(
        ListBG,
        this.rawListBG,
        'mabanggia'
      );
      const result = await this.showImportConfirmDialog(
        'Bảng Giá',
        this.rawListBG.length,
        ListBG.length,
        duplicates
      );

      if (!result.confirmed) return;

      const finalData = ImportDataValidationService.prepareBanggiaData(
        ListBG,
        this.rawListBG,
        result.overwrite
      );
      if (finalData.length === 0) {
        this._snackBar.open('Không có dữ liệu mới để import', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      const importSnackbar = this._snackBar.open(
        `Đang import ${finalData.length} bảng giá...`,
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );

      try {
        await this._BanggiaService.ImportBanggia(finalData);
        importSnackbar.dismiss();
        this._snackBar.open(
          `Import thành công ${finalData.length} bảng giá${
            result.overwrite ? ' (ghi đè)' : ' (thêm mới)'
          }!`,
          '',
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error) {
        importSnackbar.dismiss();
        this._snackBar.open('Có lỗi xảy ra khi import bảng giá', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    // Import Kho với xác nhận
    if (
      data.kho &&
      data.kho.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'kho')
    ) {
      const ListKho = (data.kho || [])
        .map((v: any) => ({
          makho: v.makho?.toString().trim() || '',
          tenkho: v.tenkho?.toString().trim() || '',
          diachi: v.diachi?.toString().trim() || '',
          ghichu: v.ghichu?.toString().trim() || '',
          status: v.status?.toString().trim() || 'active',
        }))
        .filter(
          (v: any) =>
            v.makho !== undefined && v.makho !== null && v.makho !== ''
        );

      // Kiểm tra trùng lặp
      const duplicates = ImportDataValidationService.checkDuplicates(
        ListKho,
        this.rawListKho,
        'makho'
      );
      const result = await this.showImportConfirmDialog(
        'Kho',
        this.rawListKho.length,
        ListKho.length,
        duplicates
      );

      if (!result.confirmed) return;

      const finalData = ImportDataValidationService.prepareKhoData(
        ListKho,
        this.rawListKho,
        result.overwrite
      );
      if (finalData.length === 0) {
        this._snackBar.open('Không có dữ liệu mới để import', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return;
      }

      const importSnackbar = this._snackBar.open(
        `Đang import ${finalData.length} kho...`,
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );

      try {
        // Process warehouse data using individual create/update operations
        const createUpdatePromises = finalData.map(async (v: any) => {
          const existingItem = this.rawListKho.find(
            (v1: any) => v1.makho === v.makho
          );
          if (existingItem) {
            const updatedItem = { ...existingItem, ...v };
            await this._KhoService.updateKho(updatedItem);
          } else {
            await this._KhoService.CreateKho(v);
          }
        });

        await Promise.all(createUpdatePromises);

        // Refresh the warehouse list
        await this._KhoService.getAllKho();
        this.rawListKho = this._KhoService.ListKho();

        importSnackbar.dismiss();
        this._snackBar.open(
          `Import thành công ${finalData.length} kho${
            duplicates.length > 0 ? ` (${duplicates.length} trùng lặp)` : ''
          }!`,
          '',
          {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );
      } catch (error) {
        importSnackbar.dismiss();
        this._snackBar.open('Có lỗi xảy ra khi import kho', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }

    // Phần còn lại giữ nguyên cho đơn hàng và các dữ liệu khác
    if (
      data.donhang &&
      data.donhang.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'donhang')
    ) {
      const ListDH = (data.donhang || [])
        .map((v: any) => ({
          ngay: v.ngay,
          makh: v.makh,
          mabangia: v.mabangia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.slgiao),
          slnhan: Number(v.slnhan),
          ghichu: v.ghichu,
        }))
        .filter(
          (v: any) =>
            v.makh !== undefined &&
            v.makh !== null &&
            v.makh !== '' &&
            v.masp !== undefined &&
            v.masp !== null &&
            v.masp !== ''
        );
      const importSnackbar = this._snackBar.open(
        'Đang import Đơn hàng...',
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );
      await this._DonhangService.ImportDonhang(ListDH);
      importSnackbar.dismiss();
      this._snackBar.open('Import Đơn hàng thành công!', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }

    if (
      data.banggiasanpham &&
      data.banggiasanpham.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'banggiasanpham')
    ) {
      const listBGSP = this.convertBGSPToImport(data.banggiasanpham);
      const giabanList = listBGSP.find((item) => item.mabanggia === 'giaban');
      if (!giabanList) {
        // Optionally handle missing 'giaban' list
        return;
      }
      const fixedListBGSP = listBGSP.map((banggia) => {
        if (banggia.mabanggia === 'giaban') {
          return banggia;
        }

        const fixedSanpham = banggia.sanpham.map((sp: any) => {
          if (sp.giaban === '0') {
            const match: any = giabanList.sanpham.find(
              (giabanSp) => giabanSp.masp === sp.masp
            );
            return {
              ...sp,
              giaban: match ? match.giaban : sp.giaban,
            };
          }
          return sp;
        });
        return { ...banggia, sanpham: fixedSanpham };
      });
      await this._BanggiaService.importSPBG(fixedListBGSP);
    }
    if (
      data.banggiakhachhang &&
      data.banggiakhachhang.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'banggiakhachhang')
    ) {
      console.log('Importing banggiakhachhang data:', data.banggiakhachhang);

      const ListBGKH = (data.banggiakhachhang || [])
        .map((v: any) => ({
          makh: v.makh,
          name: v.name,
          mabanggia: v.mabanggia,
        }))
        .filter(
          (v: any) =>
            v.mabanggia !== undefined &&
            v.mabanggia !== null &&
            v.mabanggia !== ''
        );
      console.log('Importing ListBGKH data:', ListBGKH);
      await this._KhachhangService.ImportKhachhang(ListBGKH);
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
    if (
      data.nhacungcapsanpham &&
      data.nhacungcapsanpham.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'nhacungcapsanpham')
    ) {
      const convertedSuppliers = this.convertNCCSPToImport(
        data.nhacungcapsanpham
      );
      console.log(convertedSuppliers);

      const ListNCCSP = convertedSuppliers
        .filter((supplier: any) => supplier?.Sanpham?.length > 0)
        .map((supplier: any) => ({
          ...supplier,
          Sanpham: supplier?.Sanpham?.map((spId: any) =>
            this.rawListSP.find((product) => product?.masp === spId)
          ),
        }));
      const importSnackbar = this._snackBar.open(
        'Đang import Nhà cung cấp sản phẩm...',
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );
      console.log('ListNCCSP for import:', ListNCCSP);
      
      await this._NhacungcapService.ImportNhacungcap(ListNCCSP);
      importSnackbar.dismiss();
      this._snackBar.open('Import Nhà cung cấp sản phẩm thành công!', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
    if (
      data.xuatnhapton &&
      data.xuatnhapton.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'xuatnhapton')
    ) {
      const phieuNhapDetails: any[] = [];
      const phieuXuatDetails: any[] = [];
      
      console.log('Processing xuatnhapton import data:', data.xuatnhapton.length, 'items');
      
      data.xuatnhapton.forEach((v: any) => {
        // Validate input data
        if (!v.masp || v.slton === undefined || v.slton === null) {
          console.warn('Invalid xuatnhapton item:', v);
          return;
        }

        const exitItem = this.rawListTonkho.find(
          (item: any) => item.masp === v.masp
        );
        
        if (exitItem) {
          const newQuantity = Number(v.slton) || 0;
          const currentQuantity = Number(exitItem.slton) || 0;
          const difference = newQuantity - currentQuantity;
          
          if (difference > 0) {
            // Tính chênh lệch cho phiếu nhập
            const sanpham = this.rawListSP.find(
              (item: any) => item.masp === v.masp
            );
            
            if (sanpham && sanpham.id) {
              phieuNhapDetails.push({
                sanphamId: sanpham.id,
                soluong: difference,
                ghichu: `Điều chỉnh tăng từ ${currentQuantity} lên ${newQuantity}`,
              });
            } else {
              console.warn(`Sản phẩm không tìm thấy cho mã: ${v.masp}`);
            }
          } else if (difference < 0) {
            // Tính chênh lệch cho phiếu xuất
            const sanpham = this.rawListSP.find(
              (item: any) => item.masp === v.masp
            );
            
            if (sanpham && sanpham.id) {
              phieuXuatDetails.push({
                sanphamId: sanpham.id,
                soluong: Math.abs(difference),
                ghichu: `Điều chỉnh giảm từ ${currentQuantity} xuống ${newQuantity}`,
              });
            } else {
              console.warn(`Sản phẩm không tìm thấy cho mã: ${v.masp}`);
            }
          }
        } else {
          console.warn(`Tồn kho không tìm thấy cho mã sản phẩm: ${v.masp}`);
        }
      });

      console.log(`Phiếu nhập: ${phieuNhapDetails.length} items, Phiếu xuất: ${phieuXuatDetails.length} items`);

      try {
        // Validate phieuNhapDetails and phieuXuatDetails before creating
        if (phieuNhapDetails.length > 0) {
          // Validate all sanphamId exist
          const invalidNhapItems = phieuNhapDetails.filter(item => !item.sanphamId);
          if (invalidNhapItems.length > 0) {
            console.warn('Invalid phieuNhapDetails items:', invalidNhapItems);
            throw new Error(`${invalidNhapItems.length} sản phẩm nhập không hợp lệ`);
          }
        }
        
        if (phieuXuatDetails.length > 0) {
          // Validate all sanphamId exist  
          const invalidXuatItems = phieuXuatDetails.filter(item => !item.sanphamId);
          if (invalidXuatItems.length > 0) {
            console.warn('Invalid phieuXuatDetails items:', invalidXuatItems);
            throw new Error(`${invalidXuatItems.length} sản phẩm xuất không hợp lệ`);
          }
        }

        // Tạo phiếu nhập trước nếu có
        if (phieuNhapDetails.length > 0) {
          console.log('Creating phieu nhap with details:', phieuNhapDetails);
          
          const phieuNhapData = {
            title: `Điều Chỉnh Nhập Kho ${moment().format('DD/MM/YYYY')}`,
            type: 'nhap',
            sanpham: phieuNhapDetails,
            ghichu: `Cập nhật tồn kho tăng lúc ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
            ngay: moment().toDate(),
            khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
            isActive: true
          };

          await this._PhieukhoService.CreatePhieukho(phieuNhapData);
          
          this._snackBar.open(
            `Tạo phiếu nhập thành công với ${phieuNhapDetails.length} sản phẩm`,
            '',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
          
          // Delay để tránh conflict transaction
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Tạo phiếu xuất sau nếu có  
        if (phieuXuatDetails.length > 0) {
          console.log('Creating phieu xuat with details:', phieuXuatDetails);
          
          const phieuXuatData = {
            title: `Điều Chỉnh Xuất Kho ${moment().format('DD/MM/YYYY')}`,
            type: 'xuat',
            sanpham: phieuXuatDetails,
            ghichu: `Cập nhật tồn kho giảm lúc ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
            ngay: moment().toDate(),
            khoId: '4cc01811-61f5-4bdc-83de-a493764e9258',
            isActive: true
          };

          await this._PhieukhoService.CreatePhieukho(phieuXuatData);
          
          this._snackBar.open(
            `Tạo phiếu xuất thành công với ${phieuXuatDetails.length} sản phẩm`,
            '',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            }
          );
        }

        if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
          this._snackBar.open('Không có thay đổi tồn kho nào cần xử lý', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-info'],
          });
        }
        
      } catch (error: any) {
        console.error('Error creating phieukho during xuatnhapton import:', error);
        this._snackBar.open(
          `Lỗi khi tạo phiếu kho: ${error?.message || 'Unknown error'}`,
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

    if (
      data.dathang &&
      this.ListEdit().some((item: any) => item.value === 'dathang')
    ) {
      const ListDH = (data.dathang || [])
        .filter((v: any) => v.mancc && v.masp)
        .map((v: any) => ({
          ngaynhan: moment(excelSerialDateToJSDate(v.ngaynhan)).toDate(),
          mancc: v.mancc,
          mabanggia: v.mabanggia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.sldat),
          slnhan: Number(v.sldat),
          gianhap: Number(v.gianhap),
          ghichu: v.ghichu,
        }));

      const importSnackbar = this._snackBar.open(
        'Đang import Đặt hàng...',
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );
      await this._DathangService.ImportDathang(ListDH);
      importSnackbar.dismiss();
      this._snackBar.open('Import Đặt hàng thành công!', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
    if (
      data.donhang &&
      this.ListEdit().some((item: any) => item.value === 'donhang')
    ) {
      const ListDH = (data.donhang || [])
        .filter((v: any) => v.makh && v.masp)
        .map((v: any) => ({
          ngaygiao: moment(excelSerialDateToJSDate(v.ngaygiao)).toDate(),
          makh: v.makh,
          mabanggia: v.mabangia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.slgiao),
          slnhan: Number(v.slnhan),
          ghichu: v.ghichu,
        }));
      const importSnackbar = this._snackBar.open(
        'Đang import Đơn hàng...',
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        }
      );
      await this._DonhangService.ImportDonhang(ListDH);
      importSnackbar.dismiss();
      this._snackBar.open('Import Đơn hàng thành công!', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }
  // TrackBy function for performance optimization
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // Filter data based on selected date range
  filterDataByDateRange(data: any[], dateField: string = 'createdAt'): any[] {
    if (!data || !Array.isArray(data)) return [];

    const startDate = new Date(this.batdau);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.ketthuc);
    endDate.setHours(23, 59, 59, 999);

    return data.filter((item) => {
      if (!item[dateField]) return true; // Include items without date

      let itemDate: Date;
      if (typeof item[dateField] === 'string') {
        itemDate = new Date(item[dateField]);
      } else if (item[dateField] instanceof Date) {
        itemDate = item[dateField];
      } else {
        return true; // Include items with invalid date format
      }

      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  // Get filtered export data with date range applied
  getFilteredExportData() {
    const dateInfo = {
      batdau: this.batdau,
      ketthuc: this.ketthuc,
      dateRange: `${this.batdau.toLocaleDateString(
        'vi-VN'
      )} - ${this.ketthuc.toLocaleDateString('vi-VN')}`,
    };

    return {
      ListSP: this.rawListSP,
      ListKH: this.rawListKH,
      ListNCC: this.rawListNCC,
      ListBG: this.rawListBG,
      ListDH: this.filterDataByDateRange(this.rawListDH, 'ngaygiao'),
      ListDathang: this.filterDataByDateRange(this.rawListDathang, 'ngaynhan'),
      ListTonkho: this.filterDataByDateRange(this.rawListTonkho, 'createdAt'),
      ListKho: this.filterDataByDateRange(this.rawListKho, 'createdAt'),
      dateInfo,
    };
  }
}
