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

  isRegister = false;
  refCode: string | undefined = this.storageService.getItem('refCode') ?? undefined;
  Dangky:any = { affiliateCode: '' };

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
    try {
      const res = await this.userService.register(this.Dangky);
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
        // Optionally notify user or redirect here
      } else {
        // Optionally handle registration failure here
      }
    } catch (error) {
      // Optionally handle error here
      console.error('Registration error:', error);
    }
  }
}