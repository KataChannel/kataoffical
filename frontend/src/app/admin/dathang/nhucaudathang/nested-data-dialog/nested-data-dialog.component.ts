import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimezoneService } from '../../../../shared/services/timezone.service';

export interface NestedDataDialogData {
  product: any;
  dathangData: any[];
  donhangData: any[];
  phieukhoData: any[];
  loading: boolean;
  triggerChangeDetection?: () => void; // Add callback for triggering change detection
}

@Component({
  selector: 'app-nested-data-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nested-data-dialog.component.html',
  styleUrls: ['./nested-data-dialog.component.scss']
})
export class NestedDataDialogComponent implements OnInit {

  private timezoneService = inject(TimezoneService);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private dialogRef: MatDialogRef<NestedDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NestedDataDialogData
  ) {}

  ngOnInit(): void {
    console.log('Dialog initialized with data:', this.data);
    
    // Set up the triggerChangeDetection callback
    if (this.data) {
      this.data.triggerChangeDetection = () => {
        console.log('Triggering change detection, loading:', this.data.loading);
        this.cdr.detectChanges();
      };
    }
  }

  /**
   * Manual trigger for change detection (can be called externally)
   */
  triggerChangeDetection(): void {
    this.cdr.detectChanges();
  }

  /**
   * Close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Format date for display
   */
  formatDateForDisplay(utcDate: any, format: string = 'DD/MM/YYYY'): string {
    return this.timezoneService.formatForDisplay(utcDate, format);
  }

  /**
   * Get status color class for dathang
   */
  getDathangStatusClass(status: string): { [key: string]: boolean } {
    return {
      'bg-green-50 text-green-700 border-green-200': status === 'completed',
      'bg-yellow-50 text-yellow-700 border-yellow-200': status === 'pending',
      'bg-blue-50 text-blue-700 border-blue-200': status === 'processing',
      'bg-gray-50 text-gray-700 border-gray-200': !status || status === 'unknown'
    };
  }

  /**
   * Get status color class for donhang
   */
  getDonhangStatusClass(status: string): { [key: string]: boolean } {
    return {
      'bg-green-50 text-green-700 border-green-200': status === 'delivered',
      'bg-blue-50 text-blue-700 border-blue-200': status === 'shipping',
      'bg-yellow-50 text-yellow-700 border-yellow-200': status === 'pending',
      'bg-orange-50 text-orange-700 border-orange-200': status === 'processing',
      'bg-gray-50 text-gray-700 border-gray-200': !status || status === 'unknown'
    };
  }

  /**
   * Get translated status text
   */
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'completed': 'Hoàn thành',
      'pending': 'Chờ xử lý',
      'processing': 'Đang xử lý',
      'delivered': 'Đã giao',
      'shipping': 'Đang giao',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status || 'Không xác định';
  }

  /**
   * Get type text for phieukho
   */
  getPhieukhoTypeText(pk: any): string {
    if (pk.isChotkho) return 'Chốt kho (Cân bằng)';
    return pk.type === 'nhap' ? 'Nhập kho' : 'Xuất kho';
  }

  /**
   * Get CSS class for phieukho type
   */
  getPhieukhoTypeClass(pk: any): { [key: string]: boolean } {
    if (pk.isChotkho) return { 'bg-purple-50 text-purple-700 border-purple-200': true };
    return {
      'bg-blue-50 text-blue-700 border-blue-200': pk.type === 'nhap',
      'bg-red-50 text-red-700 border-red-200': pk.type === 'xuat'
    };
  }
}
