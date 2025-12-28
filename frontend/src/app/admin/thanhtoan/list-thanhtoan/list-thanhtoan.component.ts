import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-thanhtoan',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid p-4">
      <div class="card">
        <div class="card-header">
          <h4 class="mb-0">💳 Quản lý Thanh toán</h4>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <i class="bi bi-info-circle"></i>
            Module Thanh toán đang trong quá trình phát triển.
            <br>
            Sẽ có đầy đủ tính năng: Tạo thanh toán, Báo cáo thanh toán, Tích hợp với đơn hàng.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ListThanhtoanComponent {}
