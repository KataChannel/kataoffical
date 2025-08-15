import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  QueryList,
  signal,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListDonhangComponent } from '../listdonhang/listdonhang.component';
import { DonhangService } from '../donhang.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  ConvertDriveData,
  GenId,
  convertToSlug,
} from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BanggiaService } from '../../banggia/banggia.service';
import moment from 'moment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SanphamService } from '../../sanpham/sanpham.service';
import html2canvas from 'html2canvas';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import { SearchService } from '../../../shared/services/search.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { UserService } from '../../user/user.service';
import { Debounce } from '../../../shared/utils/decorators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedInputService } from '../../../shared/services/shared-input.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
import {
  DonhangcodeToNumber,
  DonhangnumberToCode,
} from '../../../shared/utils/madonhang.utils';
@Component({
  selector: 'app-detaildonhang',
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
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  // providers: [provideNativeDateAdapter()],
  templateUrl: './detaildonhang.component.html',
  styleUrl: './detaildonhang.component.scss',
})
export class DetailDonhangComponent {
  _ListdonhangComponent: ListDonhangComponent = inject(ListDonhangComponent);
  _DonhangService: DonhangService = inject(DonhangService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _BanggiaService: BanggiaService = inject(BanggiaService);
  _SanphamService: SanphamService = inject(SanphamService);
  _SearchService: SearchService = inject(SearchService);
  _UserService: UserService = inject(UserService);
  _SharedInputService: SharedInputService = inject(SharedInputService);
  _GraphqlService = inject(GraphqlService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  @ViewChild('BgHethanDialog') BgHethanDialog!: TemplateRef<any>;
  ListFilter: any[] = [];
  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this._DonhangService.setDonhangId(id);
    });
    effect(async () => {});
  }
  DetailDonhang: any = this._DonhangService.DetailDonhang;
  // ListKhachhang: any = this._KhachhangService.ListKhachhang;
  ListKhachhang: any[] = [];
  ListSanpham: any = this._SanphamService.ListSanpham;
  isEdit = signal(false);
  isDelete = signal(false);
  filterKhachhang: any = [];
  filterBanggia: any[] = [];
  filterSanpham: any[] = [];
  donhangId: any = this._DonhangService.donhangId;
  permissions: any = [];

  // Getter/Setter for khachhangId to avoid read-only property errors
  get selectedKhachhangId(): string | null {
    return this.DetailDonhang()?.khachhangId || null;
  }

  set selectedKhachhangId(value: string | null) {
    this.DetailDonhang.update((v: any) => ({
      ...v,
      khachhangId: value
    }));
  }

  // Getter/Setter for banggiaId to avoid read-only property errors
  get selectedBanggiaId(): string | null {
    return this.DetailDonhang()?.banggiaId || null;
  }

  set selectedBanggiaId(value: string | null) {
    this.DetailDonhang.update((v: any) => ({
      ...v,
      banggiaId: value
    }));
  }
  async ngOnInit() {
    await this._UserService.getProfile();
    this.permissions = this._UserService
      .profile()
      .permissions.map((v: any) => v.name);
    await this._BanggiaService.getAllBanggia();
    this.filterBanggia = this._BanggiaService.ListBanggia();

    const Sanphams = await this._GraphqlService.findAll('sanpham', {
      enableParallelFetch: true,
      maxConcurrency: 4,
      take: 999999,
      enableStreaming: true,
      aggressiveCache: true,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        masp: true,
        giagoc: true,
        giaban: true,
        dvt: true,
        vat: true,
        haohut: true,
        ghichu: true,
        order: true,
      },
    });
    this.filterSanpham = Sanphams.data;

    const Khachhangs = await this._GraphqlService.findAll('khachhang', {
      enableParallelFetch: true,
      maxConcurrency: 4,
      take: 999999,
      enableStreaming: true,
      aggressiveCache: true,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        makh: true,
        name: true,
        diachi:true,
        sdt:true,
        ghichu:true,
        banggia: {
          select: {
            id: true,
            mabanggia: true,
            title: true,
            batdau: true,
            ketthuc: true,
          },
        },
      },
    });
    this.filterKhachhang = Khachhangs.data;
    const id = this._DonhangService.donhangId();
    if (!id) {
      this._router.navigate(['/admin/donhang']);
      this._ListdonhangComponent.drawer.close();
    }
    if (id === 'new') {
      this.DetailDonhang.set({
        title: 'Đơn Hàng' + moment().format('DD_MM_YYYY'),
        ngaygiao: moment().add(1, 'days').format('YYYY-MM-DD'),
        type: 'donsi',
        status: 'dadat',
        isshowvat: false,
        isActive: true,
        printCount: 0,
        tongvat: 0,
        tongtien: 0,
        sanpham: []
      });
      this._ListdonhangComponent.drawer.open();
      this.isEdit.set(true);
      this.ListFilter = [];
      this._router.navigate(['/admin/donhang', 'new']);
    } else {
      await this._DonhangService.getDonhangByid(id);
      this.ListFilter = this.DetailDonhang().sanpham;
      this.dataSource().data = this.DetailDonhang().sanpham;
      this.dataSource().data.sort((a, b) => a.order - b.order);
      this._ListdonhangComponent.drawer.open();
      this._router.navigate(['/admin/donhang', id]);
    }
  }

  async handleDonhangAction() {
    // Validate dữ liệu trước khi xử lý
    const validationError = this.validateDonhang();
    if (validationError) {
      this._snackBar.open(validationError, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (this.donhangId() === 'new') {
      await this.createDonhang();
    } else {
      await this.updateDonhang();
    }
  }

  private validateDonhang(): string | null {
    const donhang = this.DetailDonhang();

    // Validate thông tin cơ bản
    if (!donhang.title || donhang.title.trim() === '') {
      return 'Vui lòng nhập tiêu đề đơn hàng';
    }

    if (!donhang.ngaygiao) {
      return 'Vui lòng chọn ngày giao';
    }

    // Validate khách hàng
    if (!donhang.khachhangId) {
      return 'Vui lòng chọn khách hàng';
    }

    // Validate sản phẩm
    if (!donhang.sanpham || donhang.sanpham.length === 0) {
      return 'Vui lòng thêm ít nhất một sản phẩm';
    }

    // Validate số lượng sản phẩm và ID
    for (const sp of donhang.sanpham) {
      if (!sp.id) {
        return `Sản phẩm "${sp.title || 'Không xác định'}" thiếu ID`;
      }

      if (!sp.sldat || sp.sldat <= 0) {
        return `Số lượng đặt của sản phẩm "${sp.title}" phải lớn hơn 0`;
      }

      if (sp.slgiao && sp.slgiao > sp.sldat) {
        return `Số lượng giao của sản phẩm "${sp.title}" không được lớn hơn số lượng đặt`;
      }

      if (sp.slnhan && sp.slnhan > sp.slgiao) {
        return `Số lượng nhận của sản phẩm "${sp.title}" không được lớn hơn số lượng giao`;
      }
    }

    // Validate ngày giao không được trong quá khứ cho đơn hàng mới
    if (this.donhangId() === 'new') {
      const ngayGiao = moment(donhang.ngaygiao);
      const today = moment().startOf('day');
      if (ngayGiao.isBefore(today)) {
        return 'Ngày giao không được trong quá khứ';
      }
    }

    return null; // Không có lỗi
  }

  private async createDonhang() {
    try {
      console.log('Creating Donhang:', this.DetailDonhang());

      // Get max order number for new order
      const maxOrderResult = await this._GraphqlService.findAll('donhang', {
        take: 1,
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      console.log('Max Order Result:', maxOrderResult);
      
      // Safely extract max order value with proper fallback
      let maxOrder = 0;
      if (maxOrderResult?.data && Array.isArray(maxOrderResult.data) && maxOrderResult.data.length > 0) {
        maxOrder = maxOrderResult.data[0]?.order || 0;
      }
      
      const newOrder = maxOrder + 1;
      console.log('Max Order:', maxOrder, 'New Order:', newOrder);
    
      // Update DetailDonhang with required fields
      this.DetailDonhang.update((v: any) => ({
        ...v,
        type: 'donsi',
        madonhang: DonhangnumberToCode(newOrder),
        status: 'dadat',
        order: newOrder,
        isActive: true,
      }));

      // Prepare data for GraphQL create mutation
      const { khachhang, banggia, id, createdAt, updatedAt, ...donhangData } = this.DetailDonhang();
      
      // Build correct payload structure for Prisma nested create
      const createData = {
        ...donhangData,
        // Convert Date to ISO string if needed
        ngaygiao: donhangData.ngaygiao,
        // Calculate totals
        tongvat: this.calculateTotalVat(),
        tongtien: this.calculateTotalAmount(),
        // Nested create for sanpham relation
        sanpham: {
          create: this.DetailDonhang().sanpham?.map((sp: any, index: number) => ({
            idSP: sp.id, // Use sp.id as the foreign key to Sanpham table
            giaban: parseFloat(sp.giaban?.toString() || '0'),
            sldat: parseFloat(sp.sldat?.toString() || '0'),
            slgiao: parseFloat(sp.slgiao?.toString() || '0'), 
            slnhan: parseFloat(sp.slnhan?.toString() || '0'),
            slhuy: parseFloat(sp.slhuy?.toString() || '0'),
            ttdat: parseFloat(sp.ttdat?.toString() || '0'),
            ttgiao: parseFloat(sp.ttgiao?.toString() || '0'),
            ttnhan: parseFloat(sp.ttnhan?.toString() || '0'),
            vat: parseFloat(sp.vat?.toString() || '0'),
            ttsauvat: parseFloat(sp.ttsauvat?.toString() || '0'),
            ghichu: sp.ghichu || null,
            order: index + 1,
            isActive: true
          })) || []
        }
      };
      console.log('GraphQL Create Data:', createData);
      // Create Donhang via GraphQL
      const result = await this._GraphqlService.createOne('donhang', createData);
      
      console.log('Created Donhang Result:', result);
      
      if (result && result.id) {
        this._snackBar.open('Tạo Đơn Hàng Thành Công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        
        // Navigate to the new donhang detail page
        this._router.navigate(['/admin/donhang', result.id]);
        this.isEdit.set(false);
      } else {
        throw new Error('Không nhận được kết quả từ server');
      }

    } catch (error: any) {
      console.error('Lỗi khi tạo donhang:', error);
      
      let errorMessage = 'Lỗi khi tạo đơn hàng';
      if (error?.message) {
        errorMessage = error.message.includes('sanpham') 
          ? 'Lỗi dữ liệu sản phẩm. Vui lòng kiểm tra lại.'
          : error.message;
      }
      
      this._snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }




  // Helper methods for calculations
  private calculateTotalVat(): number {
    return this.DetailDonhang().sanpham?.reduce((total: number, sp: any) => {
      return total + (parseFloat(sp.vat?.toString() || '0'));
    }, 0) || 0;
  }

  private calculateTotalAmount(): number {
    return this.DetailDonhang().sanpham?.reduce((total: number, sp: any) => {
      return total + (parseFloat(sp.ttsauvat?.toString() || '0'));
    }, 0) || 0;
  }

  // Debug method to test payload creation
  debugCreatePayload() {
    console.log('=== DEBUG CREATE PAYLOAD ===');
    console.log('Current DetailDonhang:', this.DetailDonhang());
    
    const { khachhang, banggia, id, createdAt, updatedAt, ...donhangData } = this.DetailDonhang();
    
    const createData = {
      ...donhangData,
      ngaygiao: donhangData.ngaygiao,
      tongvat: this.calculateTotalVat(),
      tongtien: this.calculateTotalAmount(),
      sanpham: {
        create: this.DetailDonhang().sanpham?.map((sp: any, index: number) => ({
          idSP: sp.id,
          giaban: parseFloat(sp.giaban?.toString() || '0'),
          sldat: parseFloat(sp.sldat?.toString() || '0'),
          slgiao: parseFloat(sp.slgiao?.toString() || '0'), 
          slnhan: parseFloat(sp.slnhan?.toString() || '0'),
          slhuy: parseFloat(sp.slhuy?.toString() || '0'),
          ttdat: parseFloat(sp.ttdat?.toString() || '0'),
          ttgiao: parseFloat(sp.ttgiao?.toString() || '0'),
          ttnhan: parseFloat(sp.ttnhan?.toString() || '0'),
          vat: parseFloat(sp.vat?.toString() || '0'),
          ttsauvat: parseFloat(sp.ttsauvat?.toString() || '0'),
          ghichu: sp.ghichu || null,
          order: index + 1,
          isActive: true
        })) || []
      }
    };
    
    console.log('Final GraphQL Create Payload:', createData);
    console.log('=== END DEBUG ===');
    return createData;
  }

  private async updateDonhang(status?: any) {
    try {
      console.log('Updating Donhang:', this.DetailDonhang());

      // Update status if provided
      this.DetailDonhang.update((v: any) => ({
        ...v,
        type: 'donsi',
        status: status || v.status,
      }));

      // Prepare data for GraphQL update mutation
      const currentDonhang = this.DetailDonhang();
      const { khachhang, banggia, createdAt, updatedAt, sanpham, ...donhangData } = currentDonhang;
      
      // Build update payload - KHÔNG bao gồm sanpham trong update chính
      const updateData = {
        ...donhangData,
        // Convert Date to ISO string if needed
        ngaygiao: donhangData.ngaygiao,
        // Calculate totals
        tongvat: this.calculateTotalVat(),
        tongtien: this.calculateTotalAmount(),
        // KHÔNG update sanpham ở đây - sẽ xử lý riêng
      };

      console.log('GraphQL Update Data (without sanpham):', updateData);

      // Update Donhang via GraphQL (không bao gồm sanpham)
      const result = await this._GraphqlService.updateOne('donhang', 
        { id: currentDonhang.id }, 
        updateData
      );
      
      console.log('Updated Donhang Result:', result);
      
      if (result && result.id) {
        // ALWAYS update sanpham when updating donhang
        // This handles all cases: thay đổi khách hàng, bảng giá, sản phẩm, số lượng, ghi chú
        await this.updateDonhangSanpham();

        // Update the local state with the result
        this.DetailDonhang.update((v: any) => ({
          ...v,
          ...result,
          sanpham: currentDonhang.sanpham, // Giữ nguyên sanpham local
          updatedAt: result.updatedAt || new Date().toISOString()
        }));

        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update((value) => !value);
      } else {
        throw new Error('Không nhận được kết quả từ server');
      }

    } catch (error: any) {
      console.error('Lỗi khi cập nhật donhang:', error);
      
      let errorMessage = 'Lỗi khi cập nhật đơn hàng';
      if (error?.message) {
        errorMessage = error.message.includes('sanpham') 
          ? 'Lỗi dữ liệu sản phẩm. Vui lòng kiểm tra lại.'
          : error.message;
      }
      
      this._snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Update sanpham in donhang - handles nested relation updates
   * This method should be called separately when sanpham data changes
   */
  /**
   * Comprehensive sanpham update with all change scenarios:
   * - Thay đổi khách hàng: Cập nhật lại giá theo bảng giá mới
   * - Thay đổi bảng giá: Áp dụng giá mới cho tất cả sản phẩm 
   * - Sửa sldat, ghichu: Cập nhật từng sản phẩm
   * - Thêm/bớt sản phẩm: Xử lý danh sách sản phẩm hoàn toàn mới
   */
  private async updateDonhangSanpham() {
    try {
      const currentDonhang = this.DetailDonhang();
      if (!currentDonhang.id) {
        console.log('No donhang ID found, skipping sanpham update');
        return;
      }

      console.log('Starting comprehensive sanpham update for donhang:', currentDonhang.id);

      // Get existing sanpham records to compare changes
      const existingSanpham = await this._GraphqlService.findMany('donhangsanpham', {
        where: { donhangId: currentDonhang.id },
        select: { 
          id: true, 
          idSP: true, 
          giaban: true, 
          sldat: true, 
          ghichu: true,
          order: true
        }
      });

      const currentSanphamList = currentDonhang.sanpham || [];

      // 1. SCENARIO: Thay đổi khách hàng hoặc bảng giá
      // Need to recalculate prices for all products
      if (this.hasCustomerOrPriceListChanged(currentDonhang)) {
        await this.updateAllSanphamPrices(currentDonhang, currentSanphamList);
        return; // Complete price recalculation, no need for other updates
      }

      // 2. SCENARIO: Thêm/bớt sản phẩm
      // Compare existing vs current product lists
      const { toAdd, toUpdate, toDelete } = this.compareSanphamLists(existingSanpham, currentSanphamList);

      console.log('Sanpham changes detected:', {
        toAdd: toAdd.length,
        toUpdate: toUpdate.length,
        toDelete: toDelete.length
      });

      // 3. DELETE: Remove products that are no longer in the list
      if (toDelete.length > 0) {
        const idsToDelete = toDelete.map(sp => sp.id);
        await this._GraphqlService.batchDelete('donhangsanpham', idsToDelete);
        console.log(`Deleted ${toDelete.length} sanpham records`);
      }

      // 4. UPDATE: Modify existing products (sldat, ghichu changes)
      if (toUpdate.length > 0) {
        await this.batchUpdateExistingSanpham(toUpdate);
        console.log(`Updated ${toUpdate.length} sanpham records`);
      }

      // 5. ADD: Create new products
      if (toAdd.length > 0) {
        const createData = toAdd.map((sp: any, index: number) => ({
          donhangId: currentDonhang.id,
          idSP: sp.id,
          giaban: this.parseNumericValue(sp.giaban),
          sldat: this.parseNumericValue(sp.sldat),
          slgiao: this.parseNumericValue(sp.slgiao),
          slnhan: this.parseNumericValue(sp.slnhan),
          slhuy: this.parseNumericValue(sp.slhuy),
          ttdat: this.parseNumericValue(sp.ttdat),
          ttgiao: this.parseNumericValue(sp.ttgiao),
          ttnhan: this.parseNumericValue(sp.ttnhan),
          vat: this.parseNumericValue(sp.vat),
          ttsauvat: this.parseNumericValue(sp.ttsauvat),
          ghichu: sp.ghichu || null,
          order: existingSanpham.length + index + 1,
          isActive: true
        }));

        await this._GraphqlService.batchCreate('donhangsanpham', createData);
        console.log(`Created ${toAdd.length} new sanpham records`);
      }

      console.log('Comprehensive sanpham update completed successfully');

      // Reset change flags after successful update
      this.sanphamDataChanged = false;
      
    } catch (error) {
      console.error('Lỗi khi cập nhật sanpham trong donhang:', error);
      throw error;
    }
  }

  /**
   * Check if customer or price list has changed
   */
  private hasCustomerOrPriceListChanged(currentDonhang: any): boolean {
    // This would compare with original values stored somewhere
    // For now, we'll assume this is determined by UI state
    return this.customerChanged || this.priceListChanged || false;
  }

  /**
   * Update all sanpham prices based on new customer or price list
   */
  private async updateAllSanphamPrices(donhang: any, sanphamList: any[]) {
    console.log('Recalculating all sanpham prices due to customer/price list change');
    
    // Delete all existing sanpham
    const existingSanpham = await this._GraphqlService.findMany('donhangsanpham', {
      where: { donhangId: donhang.id },
      select: { id: true }
    });

    if (existingSanpham.length > 0) {
      const idsToDelete = existingSanpham.map(sp => sp.id);
      await this._GraphqlService.batchDelete('donhangsanpham', idsToDelete);
    }

    // Recreate all sanpham with new prices
    if (sanphamList.length > 0) {
      const createData = sanphamList.map((sp: any, index: number) => ({
        donhangId: donhang.id,
        idSP: sp.id,
        giaban: this.parseNumericValue(sp.giaban),
        sldat: this.parseNumericValue(sp.sldat),
        slgiao: this.parseNumericValue(sp.slgiao),
        slnhan: this.parseNumericValue(sp.slnhan),
        slhuy: this.parseNumericValue(sp.slhuy),
        ttdat: this.parseNumericValue(sp.ttdat),
        ttgiao: this.parseNumericValue(sp.ttgiao),
        ttnhan: this.parseNumericValue(sp.ttnhan),
        vat: this.parseNumericValue(sp.vat),
        ttsauvat: this.parseNumericValue(sp.ttsauvat),
        ghichu: sp.ghichu || null,
        order: index + 1,
        isActive: true
      }));

      await this._GraphqlService.batchCreate('donhangsanpham', createData);
    }

    // Reset change flags
    this.customerChanged = false;
    this.priceListChanged = false;
    this.sanphamDataChanged = false;
  }

  /**
   * Compare existing vs current sanpham lists to determine changes
   */
  private compareSanphamLists(existing: any[], current: any[]) {
    const toAdd: any[] = [];
    const toUpdate: any[] = [];
    const toDelete: any[] = [];

    // Find products to add (in current but not in existing)
    current.forEach(currentSP => {
      const existingSP = existing.find(e => e.idSP === currentSP.id);
      if (!existingSP) {
        toAdd.push(currentSP);
      } else {
        // Check if product needs update (sldat, ghichu changes)
        const needsUpdate = 
          this.parseNumericValue(existingSP.sldat) !== this.parseNumericValue(currentSP.sldat) ||
          existingSP.ghichu !== (currentSP.ghichu || null) ||
          this.parseNumericValue(existingSP.giaban) !== this.parseNumericValue(currentSP.giaban);

        if (needsUpdate) {
          toUpdate.push({
            existingId: existingSP.id,
            currentData: currentSP
          });
        }
      }
    });

    // Find products to delete (in existing but not in current)
    existing.forEach(existingSP => {
      const currentSP = current.find(c => c.id === existingSP.idSP);
      if (!currentSP) {
        toDelete.push(existingSP);
      }
    });

    return { toAdd, toUpdate, toDelete };
  }

  /**
   * Batch update existing sanpham records
   */
  private async batchUpdateExistingSanpham(updateList: any[]) {
    for (const update of updateList) {
      const { existingId, currentData } = update;
      
      const updateData = {
        giaban: this.parseNumericValue(currentData.giaban),
        sldat: this.parseNumericValue(currentData.sldat),
        slgiao: this.parseNumericValue(currentData.slgiao),
        slnhan: this.parseNumericValue(currentData.slnhan),
        slhuy: this.parseNumericValue(currentData.slhuy),
        ttdat: this.parseNumericValue(currentData.ttdat),
        ttgiao: this.parseNumericValue(currentData.ttgiao),
        ttnhan: this.parseNumericValue(currentData.ttnhan),
        vat: this.parseNumericValue(currentData.vat),
        ttsauvat: this.parseNumericValue(currentData.ttsauvat),
        ghichu: currentData.ghichu || null
      };

      await this._GraphqlService.updateOne('donhangsanpham', 
        { id: existingId },
        updateData
      );
    }
  }

  /**
   * Helper method to parse numeric values safely
   */
  private parseNumericValue(value: any): number {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    const parsed = parseFloat(value.toString());
    return isNaN(parsed) ? 0 : parsed;
  }

  // Change tracking flags
  private customerChanged: boolean = false;
  private priceListChanged: boolean = false;
  private sanphamDataChanged: boolean = false;

  /**
   * Call this method when customer changes
   */
  onCustomerChange() {
    this.customerChanged = true;
    console.log('Customer change detected, will recalculate prices on next update');
  }

  /**
   * Call this method when price list changes
   */
  onPriceListChange() {
    this.priceListChanged = true;
    console.log('Price list change detected, will recalculate prices on next update');
  }

  /**
   * Update donhang WITH sanpham - comprehensive update
   * Use this method when you need to update both donhang and sanpham
   */
  private async updateDonhangWithSanpham(status?: any) {
    try {
      // First update the main donhang record
      await this.updateDonhang(status);
      
      // Then update sanpham separately
      await this.updateDonhangSanpham();
      
      console.log('Complete donhang with sanpham update successful');
      
    } catch (error) {
      console.error('Lỗi khi cập nhật donhang với sanpham:', error);
      throw error;
    }
  }

  UpdateStatus(status: any) {
    this.updateDonhang(status);
  }
  async DeleteData() {
    try {
      const currentDonhang = this.DetailDonhang();
      console.log('Deleting Donhang:', currentDonhang);

      // Delete Donhang via GraphQL
      const result = await this._GraphqlService.deleteOne('donhang', { id: currentDonhang.id });
      
      console.log('Deleted Donhang Result:', result);

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/donhang']);
    } catch (error: any) {
      console.error('Lỗi khi xóa donhang:', error);
      
      let errorMessage = 'Lỗi khi xóa đơn hàng';
      if (error?.message) {
        errorMessage = error.message.includes('constraint') 
          ? 'Không thể xóa đơn hàng do có ràng buộc dữ liệu'
          : error.message;
      }
      
      this._snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  goBack() {
    this._router.navigate(['/admin/donhang']);
    this._ListdonhangComponent.drawer.close();
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }

  // Method để auto-select text khi focus vào input - Using shared service
  onInputFocus(event: FocusEvent) {
    this._SharedInputService.onInputFocus(event);
  }

  // Method để validate keyboard input for decimal handling
  validateKeyInput(event: KeyboardEvent, type: 'number' | 'string') {
    return this._SharedInputService.handleKeyboardEvent(event, type);
  }

  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailDonhang.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  searchInput$ = new Subject<string>();
  isLoadingKhachhang = signal(false);
  async DoFindKhachhang(event: any) {
    const value = event.target.value.trim().toLowerCase();
    try {
      this.isLoadingKhachhang.set(true);

      if (value.length < 2) {
        this.filterKhachhang = this.ListKhachhang;
        return;
      }
      this.filterKhachhang = this.ListKhachhang.filter(
        (v: any) =>
          v.makh.toLowerCase().includes(value) ||
          v.name.toLowerCase().includes(value) ||
          removeVietnameseAccents(v.makh.toLowerCase()).includes(value) ||
          removeVietnameseAccents(v.name.toLowerCase()).includes(value)
      );
    } catch (error) {
      console.error('Lỗi khi tìm kiếm khách hàng:', error);
      this._snackBar.open('Lỗi khi tìm kiếm khách hàng', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoadingKhachhang.set(false);
    }
  }

  DoFindBanggia(event: any) {
    const query = event.target.value.toLowerCase();
    //  this.FilterBanggia = this.ListBanggia.filter(v => v.Title.toLowerCase().includes(query));
  }
  UpdateBangia() {
    // const Banggia = this.ListBanggia.find(v => v.id === this.Detail.idBanggia)
    // const valueMap = new Map(Banggia.ListSP.map(({ MaSP, giaban }:any) => [MaSP, giaban]));
    // this.Detail.Giohangs = this.Detail.Giohangs
    //     .filter(({ MaSP }:any) => valueMap.has(MaSP)) // Chỉ giữ lại phần tử có trong data2
    //     .map((item:any) => ({
    //         ...item,  // Giữ lại tất cả các thuộc tính từ data1
    //         gia: valueMap.get(item.MaSP)?? item.gia, // Cập nhật giá trị value từ data2
    //         Tongtien: valueMap.get(item.MaSP)?? item.gia // Cập nhật giá trị value từ data2
    //     }));
    //     this.UpdateListSanpham()
    // console.log(this.Detail.Giohangs);
  }
  SelectBanggia(event: any) {
    console.log('Selecting new banggia:', event.value);
    
    // Mark that price list has changed for comprehensive update
    this.onPriceListChange();
    
    // Update the donhang with new banggia
    this.DetailDonhang.update((v: any) => ({
      ...v,
      banggiaId: event.value
    }));
    
    console.log('Price list change detected, products will be repriced on next update');
  }
  Chonkhachhang(item: any) {
    this.DetailDonhang.update((v: any) => {
      // v.khachhangId = item.id;
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
    this._SharedInputService.updateValue(
      event,
      'donhang',
      index,
      element,
      field as string,
      type,
      this.DetailDonhang().sanpham || [],
      (updateFn: (v: any) => any) => this.DetailDonhang.update(updateFn),
      this.dataSource().filteredData.length
    );

    // Mark that sanpham data has changed
    this.sanphamDataChanged = true;
    console.log('Sanpham data changed, will be updated on next save');
  }

  updateBlurValue(
    event: Event,
    index: number | null,
    element: any,
    field: keyof any,
    type: 'number' | 'string'
  ) {
    this._SharedInputService.updateBlurValue(
      event,
      'donhang',
      index,
      element,
      field as string,
      type,
      this.DetailDonhang().sanpham || [],
      (updateFn: (v: any) => any) => this.DetailDonhang.update(updateFn)
    );

    // Mark that sanpham data has changed
    this.sanphamDataChanged = true;
    console.log('Sanpham data changed (blur event), will be updated on next save');

    // Update dataSource to reflect changes
    this.dataSource.update((ds) => {
      ds.data = [...this.DetailDonhang().sanpham];
      return ds;
    });
  }

  Tongcong: any = 0;
  Tong: any = 0;
  Tinhtongcong(value: any) {
    this.Tongcong = value.Tongcong;
    this.Tong = value.Tong;
  }
  TinhTong(items: any, fieldTong: any) {
    return (
      items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||
      0
    );
  }
  private _dialog: MatDialog = inject(MatDialog);
  SelectKhachhang(event: any) {
    const selectedKhachhang = this.filterKhachhang.find(
      (v: any) => v.id === event.value
    );
    console.log('Selected Khachhang:', selectedKhachhang);
    
    if (selectedKhachhang) {
      // Mark that customer has changed for comprehensive update
      this.onCustomerChange();
      
      // Check if banggia is expired
      const isExpired = selectedKhachhang?.banggia?.ketthuc
        ? moment().isAfter(moment(selectedKhachhang.banggia.ketthuc))
        : false;
        
      if (isExpired) {
        const dialogRef = this._dialog.open(this.BgHethanDialog, {
          hasBackdrop: true,
          disableClose: true,
        });
        
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'true') {
            this.updateKhachhangSelection(selectedKhachhang);
          }
        });
      } else {
        this.updateKhachhangSelection(selectedKhachhang);
      }
    }
  }

  private updateKhachhangSelection(selectedKhachhang: any) {
    // Mark that customer has changed for comprehensive update
    this.onCustomerChange();
    
    this.DetailDonhang.update((v: any) => ({
      ...v,
      khachhangId: selectedKhachhang.id,
      banggiaId: selectedKhachhang?.banggia?.id || null,
      khachhang: selectedKhachhang,
      banggia: selectedKhachhang?.banggia || null
    }));    
    console.log('Updated DetailDonhang with new customer:', this.DetailDonhang());
  }

  displayedColumns: string[] = [
    'STT',
    'title',
    'masp',
    'dvt',
    'sldat',
    'slgiao',
    'slnhan',
    'ghichu',
  ];
  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu Đề',
    masp: 'Mã SP',
    dvt: 'Đơn Vị Tính',
    sldat: 'SL Đặt',
    slgiao: 'SL Giao',
    slnhan: 'SL Nhận',
    ghichu: 'Ghi Chú',
  };
  dataSource = signal(new MatTableDataSource<any>([]));
  CountItem = computed(() => this.dataSource().data.length);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'GHImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    const data = ConvertDriveData(result.values);
    console.log(data);
    this.DetailDonhang.update((v: any) => {
      v.sanpham = data.map((v1: any) => {
        v1.sldat = Number(v1.sldat) || 0;
        v1.slgiao = Number(v1.slgiao) || 0;
        v1.slnhan = Number(v1.slnhan) || 0;
        v1.ttdat = Number(v1.ttdat) || 0;
        v1.ttgiao = Number(v1.ttgiao) || 0;
        v1.ttnhan = Number(v1.ttnhan) || 0;
        const item = this.ListSanpham().find((v2: any) => v2.masp === v1.masp);
        console.log(item);
        if (item) {
          return { ...item, ...v1 };
        }
        return v1;
      });
      return v;
    });
    console.log(this.DetailDonhang());

    //  this.DetailBanggia.update((v:any)=>{
    //   const listdata = data.map((item:any) => {
    //     item.masp = item.masp?.trim()||'';
    //     item.giaban = Number(item.giaban)||0;
    //     const item1 = this._SanphamService.ListSanpham().find((v1) => v1.masp === item.masp);
    //     if (item1) {
    //       return { ...item1, ...item };
    //     }
    //     return item;
    //   });
    //   v.sanpham = listdata
    //   return v;
    // })
    this.dataSource().data = this.DetailDonhang().sanpham;

    this.reloadfilter();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }
  EmptyCart() {
    this.DetailDonhang.update((v: any) => {
      v.sanpham = [];
      return v;
    });
    this.dataSource().data = this.DetailDonhang().sanpham;
    this.ListFilter = [];
    this.reloadfilter();
  }
  getName(id: any) {
    return this.ListKhachhang.find((v: any) => v.id === id);
  }

  reloadfilter() {
    this.filterSanpham = this.ListSanpham().filter(
      (v: any) =>
        !this.DetailDonhang().sanpham.some((v2: any) => v2.id === v.id)
    );
  }
  // RemoveSanpham(item:any){
  //   this.DetailBanggia.update((v:any)=>{
  //     v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailBanggia().sanpham;
  //
  //   this.dataSource().sort = this.sort;
  // }

  // SelectSanpham(event:any){
  //   const value = event.value;
  //   const item = this.ListSanpham().find((v:any) => v.id === value);
  //   this.DetailDonhang.update((v:any)=>{
  //     if(!v.sanpham){
  //       v.sanpham = [];
  //       item.sldat = item.slgiao = item.slnhan = 1;
  //       v.sanpham.push(item);
  //     }
  //     else{
  //         item.sldat = item.slgiao = item.slnhan = 1;
  //         v.sanpham.push(item);
  //     }
  //     this.reloadfilter();
  //     return v;
  //   })
  //   this.dataSource().data = this.DetailDonhang().sanpham;

  // }
  RemoveSanpham(item: any) {
    this.DetailDonhang.update((v: any) => {
      v.sanpham = v.sanpham.filter((v1: any) => v1.id !== item.id);
      this.reloadfilter();
      return v;
    });
    this.ListFilter = this.dataSource().data = this.DetailDonhang().sanpham;
  }

  async CoppyDon() {
    this._snackBar.open('Đang Coppy Đơn Hàng', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning'],
    });

    try {
      // Get max order number for new order
      const maxOrderResult = await this._GraphqlService.findAll('donhang', {
        take: 1,
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      let maxOrder = 0;
      if (maxOrderResult?.data && Array.isArray(maxOrderResult.data) && maxOrderResult.data.length > 0) {
        maxOrder = maxOrderResult.data[0]?.order || 0;
      }
      
      const newOrder = maxOrder + 1;

      // Prepare copy data
      const originalDonhang = this.DetailDonhang();
      const { id, khachhang, banggia, createdAt, updatedAt, ...donhangData } = originalDonhang;
      
      const copyData = {
        ...donhangData,
        title: `${originalDonhang.title} - Copy`,
        madonhang: DonhangnumberToCode(newOrder),
        order: newOrder,
        type: 'donsi',
        status: 'dadat',
        isActive: true,
        printCount: 0,
        // Convert Date to ISO string if needed
        ngaygiao: donhangData.ngaygiao,
        // Calculate totals
        tongvat: this.calculateTotalVat(),
        tongtien: this.calculateTotalAmount(),
        // Nested create for sanpham relation
        sanpham: {
          create: originalDonhang.sanpham?.map((sp: any, index: number) => ({
            idSP: sp.id,
            giaban: parseFloat(sp.giaban?.toString() || '0'),
            sldat: parseFloat(sp.sldat?.toString() || '0'),
            slgiao: parseFloat(sp.slgiao?.toString() || '0'), 
            slnhan: parseFloat(sp.slnhan?.toString() || '0'),
            slhuy: parseFloat(sp.slhuy?.toString() || '0'),
            ttdat: parseFloat(sp.ttdat?.toString() || '0'),
            ttgiao: parseFloat(sp.ttgiao?.toString() || '0'),
            ttnhan: parseFloat(sp.ttnhan?.toString() || '0'),
            vat: parseFloat(sp.vat?.toString() || '0'),
            ttsauvat: parseFloat(sp.ttsauvat?.toString() || '0'),
            ghichu: sp.ghichu || null,
            order: index + 1,
            isActive: true
          })) || []
        }
      };

      console.log('Copy Donhang Data:', copyData);

      // Create copy via GraphQL
      const result = await this._GraphqlService.createOne('donhang', copyData);
      
      console.log('Copy Donhang Result:', result);
      
      if (result && result.id) {
        this._snackBar.open('Coppy Đơn Hàng Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this._router.navigate(['/admin/donhang', result.id]);
      } else {
        throw new Error('Không nhận được kết quả từ server');
      }

    } catch (error: any) {
      console.error('Lỗi khi copy donhang:', error);
      
      let errorMessage = 'Lỗi khi copy đơn hàng';
      if (error?.message) {
        errorMessage = error.message.includes('sanpham') 
          ? 'Lỗi dữ liệu sản phẩm. Vui lòng kiểm tra lại.'
          : error.message;
      }
      
      this._snackBar.open(errorMessage, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  printContent() {
    const printContent = document.getElementById('printContent');
    if (printContent) {
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
              body { font-size: 12px; font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; }
              @media print { 
              body { margin: 0; } 
              img {height:80px}
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
        this.DetailDonhang.update((v: any) => {
          v.printCount = v.printCount + 1;
          return v;
        });
        
        // Update printCount via GraphQL
        this.updateDonhang(); // This will update printCount to server
      } else {
        console.error('Không thể mở cửa sổ in');
      }
    } else {
      console.error('Không tìm thấy phần tử printContent');
    }
  }
  GetGoiy(item: any) {
    return parseFloat(
      ((item.soluongkho - item.soluong) * (1 + item.haohut / 100)).toString()
    ).toFixed(2);
  }

  async doFilterSanpham(event: any): Promise<void> {
    const value = event.target.value.trim().toLowerCase();

    if (value.length < 2) {
      this.filterSanpham = [...this.ListSanpham()];
      return;
    }

    const normalizedValue = removeVietnameseAccents(value);

    this.filterSanpham = this.ListSanpham()
      .filter((product: any) => {
        const normalizedTitle = removeVietnameseAccents(
          product.title?.toLowerCase() || ''
        );
        const normalizedMasp = removeVietnameseAccents(
          product.masp?.toLowerCase() || ''
        );

        return (
          normalizedTitle.includes(normalizedValue) ||
          normalizedMasp.includes(normalizedValue) ||
          product.title?.toLowerCase().includes(value) ||
          product.masp?.toLowerCase().includes(value)
        );
      })
      .sort((a: any, b: any) => {
        // Prioritize exact matches
        const aExactMatch =
          a.masp?.toLowerCase() === value || a.title?.toLowerCase() === value;
        const bExactMatch =
          b.masp?.toLowerCase() === value || b.title?.toLowerCase() === value;

        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;

        // Then sort alphabetically by title
        const titleA = removeVietnameseAccents(a.title || '').toLowerCase();
        const titleB = removeVietnameseAccents(b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      });

    if (event.key === 'Enter') {
      if (this.filterSanpham.length > 0) {
        this.ChosenItem(this.filterSanpham[0]);
        // this.filterSanpham = [...this._SanphamService.ListSanpham()];
      }
    }
  }
  ChosenItem(item: any) {
    let CheckItem = this.filterSanpham.find((v: any) => v.id === item.id);
    let CheckItem1 = this.ListFilter.find((v: any) => v.id === item.id);
    if (CheckItem1) {
      this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id);
    } else {
      // Create a copy of the object to avoid read-only property error
      const itemCopy = { ...CheckItem };
      itemCopy.order = this.ListFilter.length + 1;
      this.ListFilter.push(itemCopy);
    }
  }

  ChosenAll(list: any) {
    this.ListFilter = list;
  }
  ResetFilter() {
    this.ListFilter = this.ListSanpham();
    this.dataSource().data = this.filterSanpham;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu: any) {
    this.ListFilter.forEach((v) => {
      const exists = this.dataSource().data.find((d: any) => d.id === v.id);
      v.sldat = exists?.sldat || 1;
      v.slgiao = exists?.slgiao || 1;
      v.slnhan = exists?.slnhan || 1;
    });
    this.DetailDonhang.update((v: any) => {
      v.sanpham = this.ListFilter;
      return v;
    });
    console.log(this.DetailDonhang());

    this.dataSource().data = this.ListFilter;
    this.dataSource().data.sort((a, b) => a.order - b.order);
    menu.closeMenu();
  }

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }
  ExportExcel(data: any, title: any) {
    const transformedData = data.map((v: any) => ({
      masp: v.masp?.trim() || '',
      giaban: Number(v.giaban) || 0,
      sldat: Number(v.sldat) || 0,
      slgiao: Number(v.slgiao) || 0,
      slnhan: Number(v.slnhan) || 0,
      ttdat: Number(v.ttdat) || 0,
      ttgiao: Number(v.ttgiao) || 0,
      ttnhan: Number(v.ttnhan) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));
    writeExcelFile(transformedData, title);
  }
  DoImportData(data: any) {
    const transformedData = data.map((v: any) => ({
      masp: v.masp?.trim() || '',
      giaban: Number(v.giaban) || 0,
      sldat: Number(v.sldat) || 0,
      slgiao: Number(v.slgiao) || 0,
      slnhan: Number(v.slnhan) || 0,
      ttdat: Number(v.ttdat) || 0,
      ttgiao: Number(v.ttgiao) || 0,
      ttnhan: Number(v.ttnhan) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));
    this.ListFilter = transformedData.map((item: any) => {
      const item1 = this.ListSanpham().find((v1: any) => v1.masp === item.masp);
      if (item1) {
        return { ...item1, ...item };
      }
      return item;
    });
    this.dataSource().data = this.ListFilter;
    this.DetailDonhang.update((v: any) => {
      v.sanpham = this.ListFilter;
      return v;
    });

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }
}
