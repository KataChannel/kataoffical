import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../admin/user/user.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TrackingService } from '../../../admin/tracking/tracking.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-taikhoanctv',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatTabsModule
  ],
  templateUrl: './taikhoanctv.component.html',
  styleUrl: './taikhoanctv.component.scss'
})
export class TaikhoanctvComponent {
  _UserService:UserService = inject(UserService);
  _TrackingService:TrackingService = inject(TrackingService);
  _snackbar:MatSnackBar = inject(MatSnackBar);
  profile:any = signal<any>({
    payment: {
      bankName: '',
      bankAccount: '',
      bankAccountName: ''
    }
  });
  passwords: any = signal<any>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  isShowPassword: boolean = false;
  inviteLink:any = '';
  Views:any = signal<any>(0);
  constructor() {}
  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile().then((res: any) => {
      const data = { ...this.profile(), ...res };
      console.log(data);
      this.profile.set(data);
      const domain = window.location.origin;
      this.inviteLink = `${domain}/dangkyctv?ref=${this.profile().phone}`;
    });
    await this._TrackingService.getTrackingBy({ eventType: 'page_view', refCode: this.profile().inviteCode, isCount: true }).then((res: any) => {
      this.Views.set(res.count);
    });
  }
  getCoppyLink(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      this._snackbar.open('Đã Coppy', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }).catch(err => {
      this._snackbar.open('Coppy Lỗi', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
    });
  }
  doUpdate() {
      this.profile.update((v: any) => {
        const { payment, referrals, referrerId, referrer, ...rest } = v;
        return rest;
      });
    this._UserService.updateUser(this.profile()).then((res: any) => {
      if (res) {
        this._snackbar.open('Cập nhật thành công', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    }).catch((err: any) => {
      this._snackbar.open('Cập nhật thất bại', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
    });
  }
  doUpdatePayment() {
    this._UserService.getProfile().then((res: any) => {
      console.log(res);
      this.profile.set(res);
    });
  }
  changePassword() {
    if (this.passwords().newPassword !== this.passwords().confirmPassword) {
      this._snackbar.open('Mật khẩu không khớp', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    // this._UserService.changePassword(this.passwords()).then((res: any) => {
    //   if (res) {
    //     this._snackbar.open('Đổi mật khẩu thành công', 'Close', {
    //       duration: 2000,
    //       panelClass: ['snackbar-success'],
    //     });
    //     this.passwords.set({
    //       oldPassword: '',
    //       newPassword: '',
    //       confirmPassword: ''
    //     });
    //   }
    // }).catch((err: any) => {
    //   this._snackbar.open('Đổi mật khẩu thất bại', 'Close', {
    //     duration: 2000,
    //     panelClass: ['snackbar-error'],
    //   });
    // });
  }
  logout() {    
    console.log('logout');
    this._UserService.logout().then((res: any) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }

}
