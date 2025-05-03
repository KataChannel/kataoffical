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
    MatTabsModule
  ],
  templateUrl: './taikhoanctv.component.html',
  styleUrl: './taikhoanctv.component.scss'
})
export class TaikhoanctvComponent {
  _UserService:UserService = inject(UserService);
  _TrackingService:TrackingService = inject(TrackingService);
  profile:any = signal<any>({});
  inviteLink:any = '';
  Views:any = signal<any>(0);
  constructor() {}
  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile().then((res: any) => {
      console.log(res);
      this.profile.set(res);
      const domain = window.location.origin;
      this.inviteLink = `${domain}/dangkyctv?ref=${this.profile().phone}`;
    });
    await this._TrackingService.getTrackingBy({ eventType: 'page_view', refCode: this.profile().inviteCode, isCount: true }).then((res: any) => {
      this.Views.set(res.count);
    });
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
