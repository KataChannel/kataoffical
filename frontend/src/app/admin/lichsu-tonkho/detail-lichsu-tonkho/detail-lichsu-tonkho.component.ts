import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ListLichSuTonKhoComponent } from '../list-lichsu-tonkho/list-lichsu-tonkho.component';
import { LichSuTonKhoService } from '../lichsu-tonkho.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { UserService } from '../../user/user.service';
import { PhieukhoService } from '../../phieukho/phieukho.service';
import { DonhangService } from '../../donhang/donhang.service';
import { GenId } from '../../../shared/utils/shared.utils';
import moment from 'moment';

@Component({
  selector: 'app-detail-lichsu-tonkho',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './detail-lichsu-tonkho.component.html',
  styleUrl: './detail-lichsu-tonkho.component.scss'
})
export class DetailLichSuTonKhoComponent {
  // Injected services
  private _listComponent = inject(ListLichSuTonKhoComponent);
  private _lichSuTonKhoService = inject(LichSuTonKhoService);
  private _sanphamService = inject(SanphamService);
  private _userService = inject(UserService);
  private _phieukhoService = inject(PhieukhoService);
  private _donhangService = inject(DonhangService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  // Form data
  detail = signal<any>({
    sanphamId: '',
    loaiGiaoDich: '',
    soLuongThayDoi: 0,
    donGia: 0,
    phieuKhoId: '',
    donhangId: '',
    userId: '',
    lyDo: '',
    ghichu: '',
    soChungTu: ''
  });

  // UI states
  isEdit = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  lichSuId = signal<string>('');

  // Filter options
  filterSanpham: any[] = [];
  filterUsers: any[] = [];
  filterPhieuKho: any[] = [];
  filterDonhang: any[] = [];
  
  loaiGiaoDichOptions = [
    { value: 'NHAP', label: 'Nhập kho', icon: 'add_circle', color: 'primary' },
    { value: 'XUAT', label: 'Xuất kho', icon: 'remove_circle', color: 'warn' },
    { value: 'KIEM_KE', label: 'Kiểm kê', icon: 'fact_check', color: 'accent' },
    { value: 'DIEU_CHINH', label: 'Điều chỉnh', icon: 'tune', color: 'primary' },
    { value: 'CHUYEN_KHO', label: 'Chuyển kho', icon: 'swap_horiz', color: 'accent' },
    { value: 'HUY_HANG', label: 'Hủy hàng', icon: 'cancel', color: 'warn' }
  ];

  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.lichSuId.set(id || '');
      this.isEdit.set(id === '0');
      
      if (id && id !== '0') {
        await this.loadLichSuDetail(id);
      } else {
        this.resetForm();
      }
      
      this._listComponent.drawer.open();
    });
  }

  async ngOnInit() {
    await this.loadInitialData();
  }

  async loadInitialData() {
    try {
      // Load products
      await this._sanphamService.getAllSanpham();
      this.filterSanpham = this._sanphamService.ListSanpham().filter((sp: any) => sp.isActive);

      // Load users
      await this._userService.getAllUser();
      this.filterUsers = this._userService.ListUser().filter((user: any) => user.isActive);

      // Load phieu kho
      await this._phieukhoService.getAllPhieukho();
      this.filterPhieuKho = this._phieukhoService.ListPhieukho().filter((pk: any) => pk.isActive);

      // Load don hang
      await this._donhangService.getAllDonhang();
      this.filterDonhang = this._donhangService.ListDonhang().filter((dh: any) => dh.isActive);

    } catch (error) {
      console.error('Error loading initial data:', error);
      this._snackBar.open('Lỗi tải dữ liệu ban đầu', 'Đóng', { duration: 3000 });
    }
  }

  async loadLichSuDetail(id: string) {
    try {
      this.isLoading.set(true);
      // In a real app, you'd load the specific record
      // For now, we'll just show the form for viewing
      this._snackBar.open('Đang xem chi tiết lịch sử tồn kho', 'Đóng', { duration: 2000 });
    } catch (error) {
      console.error('Error loading lich su detail:', error);
      this._snackBar.open('Lỗi tải chi tiết lịch sử', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  resetForm() {
    this.detail.set({
      sanphamId: '',
      loaiGiaoDich: '',
      soLuongThayDoi: 0,
      donGia: 0,
      phieuKhoId: '',
      donhangId: '',
      userId: '',
      lyDo: '',
      ghichu: '',
      soChungTu: this.generateSoChungTu()
    });
  }

  generateSoChungTu(): string {
    return `CT${moment().format('YYYYMMDD')}${this.genId()}`;
  }

  private genId(): string {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  async saveData() {
    try {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading.set(true);
      const formData = this.detail();

      if (this.isEdit() && this.lichSuId() === '0') {
        // Create new record
        await this._lichSuTonKhoService.createLichSuTonKho(formData);
        this._snackBar.open('Tạo lịch sử giao dịch thành công', 'Đóng', { duration: 3000 });
      } else {
        // Update existing record (if supported)
        this._snackBar.open('Cập nhật không được hỗ trợ cho lịch sử tồn kho', 'Đóng', { duration: 3000 });
        return;
      }

      this.closeDrawer();
      await this._listComponent.loadLichSuTonKho();

    } catch (error: any) {
      console.error('Error saving data:', error);
      this._snackBar.open(error.message || 'Lỗi lưu dữ liệu', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  validateForm(): boolean {
    const data = this.detail();
    
    if (!data.sanphamId) {
      this._snackBar.open('Vui lòng chọn sản phẩm', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.loaiGiaoDich) {
      this._snackBar.open('Vui lòng chọn loại giao dịch', 'Đóng', { duration: 3000 });
      return false;
    }

    if (!data.soLuongThayDoi || data.soLuongThayDoi === 0) {
      this._snackBar.open('Vui lòng nhập số lượng thay đổi', 'Đóng', { duration: 3000 });
      return false;
    }

    return true;
  }

  closeDrawer() {
    this._listComponent.drawer.close();
    this._router.navigate(['/admin/lichsu-tonkho']);
  }

  // Utility methods
  getLoaiGiaoDichOption(value: string) {
    return this.loaiGiaoDichOptions.find(opt => opt.value === value);
  }

  getSanphamName(sanphamId: string): string {
    const sanpham = this.filterSanpham.find(sp => sp.id === sanphamId);
    return sanpham ? `${sanpham.masp} - ${sanpham.title}` : '';
  }

  getUserName(userId: string): string {
    const user = this.filterUsers.find(u => u.id === userId);
    return user ? (user.profile?.name || user.email) : '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value || 0);
  }

  onSanphamChange(sanphamId: string) {
    this.detail.update(current => ({ ...current, sanphamId }));
    
    // Auto-fill some fields based on selected product
    const sanpham = this.filterSanpham.find(sp => sp.id === sanphamId);
    if (sanpham) {
      this.detail.update(current => ({ 
        ...current, 
        donGia: sanpham.giaban || 0 
      }));
    }
  }

  onLoaiGiaoDichChange(loaiGiaoDich: string) {
    this.detail.update(current => ({ ...current, loaiGiaoDich }));
  }

  onSoLuongChange(soLuong: number) {
    this.detail.update(current => {
      const newDetail = { ...current, soLuongThayDoi: soLuong };
      // Auto-calculate thanh tien
      if (current.donGia) {
        // This would be displayed but not stored as it's calculated
      }
      return newDetail;
    });
  }

  calculateThanhTien(): number {
    const data = this.detail();
    return Math.abs(data.soLuongThayDoi) * (data.donGia || 0);
  }
}
