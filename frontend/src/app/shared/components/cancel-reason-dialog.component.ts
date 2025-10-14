import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-reason-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title class="text-red-600 font-bold">
      <mat-icon class="align-middle mr-2">warning</mat-icon>
      Xác Nhận Hủy Đơn Hàng
    </h2>
    
    <mat-dialog-content class="mt-4">
      <div class="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p class="text-sm">
          <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác. 
          {{ hasInventory ? 'Tồn kho sẽ được điều chỉnh tự động.' : '' }}
        </p>
      </div>

      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Lý do hủy đơn hàng</mat-label>
        <textarea 
          matInput 
          [(ngModel)]="lydohuy" 
          rows="5"
          placeholder="Vui lòng nhập lý do hủy đơn hàng (tối thiểu 10 ký tự)"
          required
          maxlength="500"
          (input)="onInputChange()">
        </textarea>
        <mat-hint align="start">
          <span [class.text-red-500]="lydohuy.length < 10">
            {{ lydohuy.length }}/10 ký tự tối thiểu
          </span>
        </mat-hint>
        <mat-hint align="end">{{ lydohuy.length }}/500</mat-hint>
        <mat-error *ngIf="showError">Lý do hủy phải có ít nhất 10 ký tự</mat-error>
      </mat-form-field>

      <div *ngIf="orderInfo" class="mt-4 p-3 bg-gray-50 rounded">
        <p class="text-sm text-gray-600 mb-2"><strong>Thông tin đơn hàng:</strong></p>
        <div class="text-sm space-y-1">
          <p><strong>Mã đơn:</strong> {{ orderInfo.madonhang || orderInfo.madncc }}</p>
          <p *ngIf="orderInfo.khachhang">
            <strong>Khách hàng:</strong> {{ orderInfo.khachhang.name }}
          </p>
          <p *ngIf="orderInfo.nhacungcap">
            <strong>Nhà cung cấp:</strong> {{ orderInfo.nhacungcap.name }}
          </p>
          <p><strong>Trạng thái:</strong> 
            <span class="px-2 py-1 rounded text-xs" [class]="getStatusClass(orderInfo.status)">
              {{ getStatusLabel(orderInfo.status) }}
            </span>
          </p>
        </div>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end" class="mt-4 gap-2">
      <button mat-button (click)="onCancel()" type="button">
        <mat-icon>close</mat-icon>
        Hủy Bỏ
      </button>
      <button 
        mat-raised-button 
        color="warn" 
        [disabled]="!isValid()"
        (click)="onConfirm()"
        type="button">
        <mat-icon>check</mat-icon>
        Xác Nhận Hủy Đơn
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
    }
    mat-dialog-content {
      min-width: 500px;
      max-width: 600px;
    }
  `]
})
export class CancelReasonDialogComponent {
  lydohuy = '';
  showError = false;
  orderInfo: any = null;
  hasInventory = false;

  private dialogRef = inject(MatDialogRef<CancelReasonDialogComponent>);

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.lydohuy.trim());
    } else {
      this.showError = true;
    }
  }

  onInputChange(): void {
    if (this.lydohuy.length >= 10) {
      this.showError = false;
    }
  }

  isValid(): boolean {
    return this.lydohuy.trim().length >= 10;
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      'dadat': 'Đã Đặt',
      'dagiao': 'Đã Giao',
      'danhan': 'Đã Nhận',
      'huy': 'Đã Hủy',
      'hoanthanh': 'Hoàn Thành'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'dadat': 'bg-blue-100 text-blue-800',
      'dagiao': 'bg-green-100 text-green-800',
      'danhan': 'bg-purple-100 text-purple-800',
      'huy': 'bg-red-100 text-red-800',
      'hoanthanh': 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
}
