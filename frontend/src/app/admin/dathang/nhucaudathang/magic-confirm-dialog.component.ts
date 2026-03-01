import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface MagicConfirmData {
  masp: string;
  title: string;
  incomingStock: number;
  customMessage?: string;
}

@Component({
  selector: 'app-magic-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-xl border-t-2 border-blue-500 max-w-md">
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-blue-50 p-2 rounded-full border border-blue-100">
          <mat-icon class="text-blue-500">auto_fix_high</mat-icon>
        </div>
        <h2 class="text-lg font-bold text-gray-800 m-0">Xử lý Khớp lệnh & Đồng bộ</h2>
      </div>

      <div class="space-y-4 text-gray-600 mb-6">
        <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p class="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Sản phẩm đang xử lý</p>
          <p class="m-0 font-medium text-blue-900 leading-tight">
            <strong>[{{ data.masp }}]</strong> {{ data.title }}
          </p>
        </div>

        @if (data.customMessage) {
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm italic text-blue-800">
             {{ data.customMessage }}
          </div>
        } @else {
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 italic">
            <p class="m-0 text-sm">
              <mat-icon class="text-[14px] h-4 w-4 align-middle mr-1">info</mat-icon>
              Hệ thống sẽ tự động nhấn <strong class="text-green-700">"Đã nhận"</strong> cho 
              <strong class="text-lg">{{ data.incomingStock | number:'1.0-2' }} kg</strong> hàng đang về.
            </p>
          </div>
        }

        <p class="text-xs text-gray-500 leading-relaxed bg-amber-50 p-2 rounded border border-amber-100">
          <mat-icon class="text-[14px] leading-none mb-1 mr-1 text-amber-600">tips_and_updates</mat-icon>
          <b>Mẹo:</b> Hành động này sẽ triệt tiêu <b>Chênh lệch ảo</b> và khớp sổ sách ngay lập tức.
        </p>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button mat-button (click)="onNoClick()" class="uppercase text-xs tracking-widest text-gray-400 font-bold">
          Quay lại
        </button>
        <button mat-flat-button color="primary" (click)="onConfirm()" 
                class="bg-blue-600 hover:bg-blue-700 text-white uppercase text-xs tracking-widest px-6 font-bold py-2">
          Đồng ý thực hiện
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
