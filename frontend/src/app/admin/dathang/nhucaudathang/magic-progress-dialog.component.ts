import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DathangService } from '../dathang.service';

export interface MagicProgressData {
  items: any[];
}

@Component({
  selector: 'app-magic-progress-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="flex items-center gap-3 mb-6">
        <div class="bg-blue-100 p-2 rounded-full relative">
          <mat-icon class="text-blue-600 animate-pulse">auto_fix_high</mat-icon>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-800 m-0">Xử lý Khớp lệnh Hàng loạt</h2>
          <p class="text-sm text-gray-500 m-0">Đang tối ưu hóa dữ liệu kho...</p>
        </div>
      </div>

      <div class="space-y-4 mb-6">
        <div class="flex justify-between text-sm font-medium text-gray-700">
          <span>Tiến trình xử lý</span>
          <span>{{ progress }}%</span>
        </div>
        <mat-progress-bar mode="determinate" [value]="progress" class="h-3 rounded-full"></mat-progress-bar>
        
        <div class="bg-gray-50 p-3 rounded border border-gray-100 max-h-32 overflow-y-auto">
          <div *ngIf="currentItem" class="text-sm text-blue-700 font-semibold mb-1">
            🚀 Đang xử lý: [{{ currentItem.masp }}] {{ currentItem.title }}
          </div>
          <div class="text-xs text-gray-500">
            Đã hoàn thành: {{ completedCount }} / {{ totalCount }} sản phẩm
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button mat-button (click)="onCancel()" *ngIf="!isFinished" class="text-gray-500">
          Dừng lại
        </button>
        <button mat-raised-button color="primary" (click)="onDone()" *ngIf="isFinished" 
                class="bg-blue-600 text-white px-8 font-bold">
          Xong
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    mat-progress-bar { --mdc-linear-progress-active-indicator-color: #2563eb; }
  `]
})
export class MagicProgressDialogComponent implements OnInit {
  progress = 0;
  completedCount = 0;
  totalCount = 0;
  currentItem: any = null;
  isFinished = false;
  private isCancelled = false;

  constructor(
    public dialogRef: MatDialogRef<MagicProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MagicProgressData,
    private _DathangService: DathangService
  ) {
    this.totalCount = data.items.length;
  }

  async ngOnInit() {
    await this.startProcessing();
  }

  async startProcessing() {
    const itemsToProcess = [...this.data.items];
    const batchSize = 10; // Process in chunks via Bulk API
    const ids = itemsToProcess.map(it => it.id);
    
    for (let i = 0; i < ids.length && !this.isCancelled; i += batchSize) {
      const currentBatchIds = ids.slice(i, i + batchSize);
      
      // Update UI for current batch
      const firstItem = itemsToProcess[i];
      const count = currentBatchIds.length;
      this.currentItem = count > 1 
        ? { masp: `Nhóm ${i/batchSize + 1}`, title: `${count} sản phẩm...` }
        : firstItem;

      try {
        // ✅ DÙNG BULK API CỦA BACKEND CHO NHANH
        await this._DathangService.confirmReceiptBulk(currentBatchIds);
        this.completedCount += count;
      } catch (error) {
        console.error(`Error processing batch:`, error);
      }
      
      this.progress = Math.round((this.completedCount / this.totalCount) * 100);
    }

    this.progress = 100;
    this.isFinished = true;
    this.currentItem = null;
  }

  onCancel() {
    this.isCancelled = true;
    this.dialogRef.close({ cancelled: true, completedCount: this.completedCount });
  }

  onDone() {
    this.dialogRef.close({ finished: true, completedCount: this.completedCount });
  }
}
