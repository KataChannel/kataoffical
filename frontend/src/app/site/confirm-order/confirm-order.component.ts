
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import {
    CardComponent,
    CardContentComponent,
    ErrorStateComponent,
    SkeletonComponent,
} from '../../shared/ui';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    FormsModule,
    CardComponent,
    CardContentComponent,
    SkeletonComponent,
    ErrorStateComponent
],
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  token = signal<string>('');
  donhang = signal<any>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');
  ghiChuKH = signal<string>('');
  successMessage = signal<string>('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.token.set(token);
      this.loadDonhang();
    }
  }

  async loadDonhang() {
    try {
      this.loading.set(true);
      this.error.set('');
      
      const response = await fetch(
        `${environment.APIURL}/confirm/${this.token()}`,
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
      }

      const data = await response.json();
      this.donhang.set(data);
    } catch (err: any) {
      this.error.set(err.message || 'Có lỗi xảy ra');
    } finally {
      this.loading.set(false);
    }
  }

  async xacNhanLan1() {
    if (!confirm('Bạn có chắc muốn xác nhận đơn hàng này?')) return;

    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/confirm/${this.token()}/xac-nhan-lan-1`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ghiChuKH: this.ghiChuKH() })
        }
      );

      if (!response.ok) throw new Error('Có lỗi xảy ra');

      const data = await response.json();
      this.donhang.set(data);
      this.successMessage.set('✅ Đã xác nhận lần 1 thành công!');
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra');
    } finally {
      this.loading.set(false);
    }
  }

  async xacNhanLan2() {
    if (!confirm('Bạn có chắc muốn xác nhận lần 2?')) return;

    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/confirm/${this.token()}/xac-nhan-lan-2`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ghiChuKH: this.ghiChuKH() })
        }
      );

      if (!response.ok) throw new Error('Có lỗi xảy ra');

      const data = await response.json();
      this.donhang.set(data);
      this.successMessage.set('✅ Đã xác nhận lần 2 thành công!');
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra');
    } finally {
      this.loading.set(false);
    }
  }

  async tuChoi() {
    if (!confirm('Bạn có chắc muốn từ chối đơn hàng này?')) return;

    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/confirm/${this.token()}/tu-choi`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ghiChuKH: this.ghiChuKH() })
        }
      );

      if (!response.ok) throw new Error('Có lỗi xảy ra');

      const data = await response.json();
      this.donhang.set(data);
      this.successMessage.set('❌ Đã từ chối đơn hàng');
    } catch (err: any) {
      alert(err.message || 'Có lỗi xảy ra');
    } finally {
      this.loading.set(false);
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
