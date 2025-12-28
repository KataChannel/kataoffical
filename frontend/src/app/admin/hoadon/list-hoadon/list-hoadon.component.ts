import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-hoadon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid p-4">
      <div class="card">
        <div class="card-header">
          <h4 class="mb-0">🧾 Quản lý Hóa đơn điện tử</h4>
        </div>
        <div class="card-body">
          <div class="alert alert-info">
            <i class="bi bi-info-circle"></i>
            Module Hóa đơn điện tử đang trong quá trình phát triển.
            <br>
            Sẽ có đầy đủ tính năng: Xuất hóa đơn, In PDF, Quản lý trạng thái hóa đơn.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ListHoadonComponent {}
