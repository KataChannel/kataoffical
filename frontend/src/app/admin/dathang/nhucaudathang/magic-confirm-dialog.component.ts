import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface MagicConfirmData {
  masp: string;
  title: string;
  incomingStock: number;
}

@Component({
  selector: 'app-magic-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-xl border-t-4 border-blue-500 max-w-md">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-blue-100 p-2 rounded-full">
          <mat-icon class="text-blue-600">auto_fix_high</mat-icon>
        </div>
        <h2 class="text-xl font-bold text-gray-800 m-0">Xác nhận Khớp lệnh Thông minh</h2>
      </div>

      <div class="space-y-4 text-gray-600 mb-6">
        <p>
          Bạn đang yêu cầu hệ thống tự động xử lý cho sản phẩm:
          <strong class="text-blue-700">[{{ data.masp }}] {{ data.title }}</strong>
        </p>

        <div class="bg-blue-50 p-4 rounded border border-blue-100 italic">
          <p class="m-0 text-sm">
            <mat-icon class="text-[14px] h-4 w-4 align-middle mr-1">info</mat-icon>
            Hệ thống sẽ tự động nhấn <strong class="text-green-700">"Đã nhận"</strong> cho 
            <strong class="text-lg">{{ data.incomingStock | number:'1.0-2' }} kg</strong> hàng đang về.
          </p>
        </div>

        <p class="text-sm">
          Hành động này sẽ giúp triệt tiêu chênh lệch ảo và làm sạch dữ liệu chốt kho ngay lập tức.
        </p>
      </div>

      <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button mat-button (click)="onNoClick()" class="uppercase tracking-wider text-gray-500 font-semibold">
          Hủy bỏ
        </button>
        <button mat-raised-button color="primary" (click)="onConfirm()" 
                class="bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider px-6 font-bold">
          Xác nhận Khớp lệnh
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .mat-mdc-dialog-container { padding: 0 !important; }
  `]
})
export class MagicConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MagicConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MagicConfirmData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
