import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../environments/environment.development';
import { StorageService } from '../../../shared/utils/storage.service';

const DEFAULT_COMPANY_PROFILES = {
  company1: {
    companyName: 'CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA',
    subName: 'Hợp Tác Xã Nông Nghiệp Công Nghệ Cao Trần Gia Farm',
    addressHtx: 'Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An',
    addressOffice: 'Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, P. Võ Thị Sáu, Q. 3, TPHCM',
    addressKho1: '22 - 30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TPHCM',
    addressKho2: '61 Lạc Long Quân, TT. Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng',
    website: 'http://rausachtrangia.com',
    hotline: '0868614214 – 0902458081',
    logoUrl: '/images/logo-dark.svg',
    qrUrl: '/images/qrcodedonhang.svg',
  },
  company2: {
    companyName: 'CÔNG TY CỔ PHẦN NÔNG SẢN THỰC PHẨM TRẦN GIA',
    subName: 'Hợp Tác Xã Nông Nghiệp Công Nghệ Cao Trần Gia Farm',
    addressHtx: 'Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An',
    addressOffice: 'Tầng 3, An Phú Plaza, 117-119 Lý Chính Thắng, P. Võ Thị Sáu, Q. 3, TPHCM',
    addressKho1: '22 - 30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TPHCM',
    addressKho2: '61 Lạc Long Quân, TT. Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng',
    website: 'http://rausachtrangia.com',
    hotline: '0868614214 – 0902458081',
    logoUrl: '/images/logo-dark.svg',
    qrUrl: '/images/qrcodedonhang.svg',
  },
};

@Component({
  selector: 'app-company-settings',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySettingsComponent implements OnInit {
  private _storageService = inject(StorageService);
  private _snackBar = inject(MatSnackBar);
  private _cdr = inject(ChangeDetectorRef);

  activeTab = signal<'company1' | 'company2'>('company1');
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  profiles = signal<any>(JSON.parse(JSON.stringify(DEFAULT_COMPANY_PROFILES)));

  async ngOnInit() {
    await this.loadProfiles();
  }

  async loadProfiles() {
    this.isLoading.set(true);
    try {
      const res = await fetch(`${environment.APIURL}/settings/print-company-profiles`);
      if (res.ok) {
        const data = await res.json();
        if (data?.company1 && data?.company2) {
          this.profiles.set(data);
        }
      }
    } catch (e) {
      console.warn('Could not load company profiles from server:', e);
      this._snackBar.open('Không thể tải dữ liệu từ máy chủ, đang dùng cấu hình dự phòng', 'Đóng', {
        duration: 3000,
      });
    } finally {
      this.isLoading.set(false);
      this._cdr.markForCheck();
    }
  }

  async saveProfiles() {
    this.isSaving.set(true);
    try {
      const payload = this.profiles();
      const token = this._storageService.getItem('token');
      const res = await fetch(`${environment.APIURL}/settings/print-company-profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const saved = await res.json();
      this.profiles.set(saved);
      this._snackBar.open('✅ Đã lưu cấu hình thông tin 2 công ty thành công!', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });
    } catch (err: any) {
      console.error('Error saving company profiles:', err);
      this._snackBar.open('❌ Lỗi khi lưu cấu hình thông tin công ty', 'Đóng', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isSaving.set(false);
      this._cdr.markForCheck();
    }
  }

  resetToDefault() {
    this.profiles.set(JSON.parse(JSON.stringify(DEFAULT_COMPANY_PROFILES)));
    this._cdr.markForCheck();
    this._snackBar.open('Đã khôi phục thông tin về mẫu mặc định. Bấm "Lưu Cấu Hình" để xác nhận lưu.', 'Đóng', {
      duration: 3500,
    });
  }
}
