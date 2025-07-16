import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../admin/user/user.service';
import { StorageService } from '../../../shared/utils/storage.service';
import { TrackingService } from '../../../admin/tracking/tracking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dangkyctv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './dangkyctv.component.html',
  styleUrls: ['./dangkyctv.component.scss']
})
export class DangkyctvComponent implements OnInit {
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private trackingService = inject(TrackingService);
  private _snackbar = inject(MatSnackBar);

  isRegister = false;
  refCode: string | undefined = this.storageService.getItem('refCode') ?? undefined;
  Dangky:any = { affiliateCode: '',isCTV:true };

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      this.Dangky.affiliateCode = ref;
      if (!this.refCode) {
        this.storageService.setItem('refCode', ref);
      }
    }
  }

  async onDangky(): Promise<void> {
    // Validate phone
    if (!this.Dangky.phone || this.Dangky.phone.trim() === '') {
      this._snackbar.open('Số điện thoại không được để trống', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
      return;
    }
    
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(this.Dangky.phone)) {
      this._snackbar.open('Số điện thoại không hợp lệ', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // Validate email
    if (!this.Dangky.email || this.Dangky.email.trim() === '') {
      this._snackbar.open('Email không được để trống', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.Dangky.email)) {
      this._snackbar.open('Email không hợp lệ', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
      return;
    }

    try {
      const res = await this.userService.registerctv(this.Dangky);
      if (res.statusCode === 201) {
        this.isRegister = true;
        this.trackingService.CreateTracking({
          eventType: 'register',
          pageUrl: window.location.href,
          pageType: 'DangkyCTV',
          pageIdentifier: '',
          refCode: this.Dangky.affiliateCode,
          referrer: document.referrer || undefined,
        });
        this.storageService.removeItem('refCode');
        this._snackbar.open('Đăng ký thành công!', '', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
      } else {
        // this._snackbar.open('Đăng ký thất bại: ' + res.message, '', {
        //   duration: 3000,
        //   horizontalPosition: "end",
        //   verticalPosition: "top",
        //   panelClass: ['snackbar-error'],
        // });
      }
    } catch (error) {
      console.error('Registration error:', error);
      this._snackbar.open('Có lỗi xảy ra khi đăng ký', '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
    }
  }
}