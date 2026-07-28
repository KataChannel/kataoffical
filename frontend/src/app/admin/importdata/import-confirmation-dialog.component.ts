import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

export interface ImportConfirmationData {
  dataType: string;
  existingCount: number;
  newCount: number;
  duplicateItems: any[];
  isOverwrite: boolean;
}

@Component({
  selector: 'app-import-confirmation-dialog',
  template: `
    <div class="p-6 min-w-96">
      <div class="flex items-center mb-4">
        <mat-icon class="text-orange-500 mr-2">warning</mat-icon>
        <h2 class="text-lg font-semibold">Xác nhận Import Dữ liệu</h2>
      </div>

      <div class="mb-4 text-gray-700">
        <p><strong>Loại dữ liệu:</strong> {{ data.dataType }}</p>
        <p><strong>Dữ liệu hiện tại:</strong> {{ data.existingCount }} mục</p>
        <p><strong>Dữ liệu mới:</strong> {{ data.newCount }} mục</p>
        
        <div *ngIf="data.duplicateItems.length > 0" class="mt-3">
          <p class="text-red-600 font-medium">
            <mat-icon class="text-red-500 text-sm">error</mat-icon>
            Phát hiện {{ data.duplicateItems.length }} mục trùng lặp:
          </p>
          <ul class="list-disc list-inside text-sm text-gray-600 mt-2 max-h-32 overflow-y-auto">
            <li *ngFor="let item of data.duplicateItems.slice(0, 5)">
              {{ getItemDisplayName(item) }}
            </li>
            <li *ngIf="data.duplicateItems.length > 5" class="text-blue-600">
              ... và {{ data.duplicateItems.length - 5 }} mục khác
            </li>
          </ul>
        </div>
      </div>

      <div *ngIf="data.duplicateItems.length > 0" class="mb-6">
        <mat-checkbox [(ngModel)]="data.isOverwrite" class="text-sm">
          <span class="ml-2">Ghi đè lên dữ liệu cũ (các mục trùng lặp sẽ được cập nhật)</span>
        </mat-checkbox>
        
        <div class="mt-2 text-sm text-gray-600">
          <div *ngIf="data.isOverwrite" class="text-orange-600">
            ⚠️ Dữ liệu cũ sẽ bị thay thế bởi dữ liệu mới
          </div>
          <div *ngIf="!data.isOverwrite" class="text-blue-600">
            ℹ️ Chỉ thêm mới các mục chưa tồn tại, bỏ qua các mục trùng lặp
          </div>
        </div>
      </div>

      <div *ngIf="data.duplicateItems.length === 0" class="mb-4 p-3 bg-green-50 border border-green-200 rounded">
        <div class="flex items-center text-green-700">
          <mat-icon class="text-green-500 mr-2">check_circle</mat-icon>
          <span>Không có dữ liệu trùng lặp. Tất cả sẽ được thêm mới.</span>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button mat-button color="warn" (click)="onCancel()">
          <mat-icon>cancel</mat-icon>
          Hủy bỏ
        </button>
        <button mat-flat-button color="primary" (click)="onConfirm()">
          <mat-icon>file_upload</mat-icon>
          {{ data.duplicateItems.length > 0 ? 
            (data.isOverwrite ? 'Import & Ghi đè' : 'Import & Bỏ qua trùng lặp') : 
            'Import' }}
        </button>
      </div>
    </div>
  `,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  standalone: true
})
export class ImportConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImportConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportConfirmationData
  ) {}

  getItemDisplayName(item: any): string {
    // Tùy thuộc vào loại dữ liệu, hiển thị thông tin phù hợp
    switch (this.data.dataType) {
      case 'Sản Phẩm':
        return `${item.masp} - ${item.title}`;
      case 'Khách Hàng':
        return `${item.makh} - ${item.name}`;
      case 'Nhà Cung Cấp':
        return `${item.mancc} - ${item.name}`;
      case 'Bảng Giá':
        return `${item.mabanggia} - ${item.title}`;
      default:
        return item.name || item.title || item.id || 'N/A';
    }
  }

  onConfirm(): void {
    this.dialogRef.close({
      confirmed: true,
      overwrite: this.data.isOverwrite
    });
  }

  onCancel(): void {
    this.dialogRef.close({
      confirmed: false,
      overwrite: false
    });
  }
}
