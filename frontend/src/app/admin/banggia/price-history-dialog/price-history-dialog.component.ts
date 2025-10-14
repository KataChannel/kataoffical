import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { PriceHistoryService, PriceHistory, PriceChange } from '../price-history.service';

export interface PriceHistoryDialogData {
  banggiaId: string;
  sanphamId: string;
  sanphamTitle?: string;
  banggiaTitle?: string;
}

@Component({
  selector: 'app-price-history-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './price-history-dialog.component.html',
  styleUrls: ['./price-history-dialog.component.scss']
})
export class PriceHistoryDialogComponent implements OnInit {
  loading = signal(true);
  priceHistory = signal<PriceHistory | null>(null);
  error = signal<string | null>(null);

  constructor(
    public dialogRef: MatDialogRef<PriceHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PriceHistoryDialogData,
    private priceHistoryService: PriceHistoryService
  ) {}

  async ngOnInit() {
    await this.loadPriceHistory();
  }

  async loadPriceHistory() {
    try {
      this.loading.set(true);
      this.error.set(null);
      
      const history = await this.priceHistoryService.getPriceHistory(
        this.data.banggiaId,
        this.data.sanphamId
      );
      
      this.priceHistory.set(history);
    } catch (err: any) {
      this.error.set(err.message || 'Không thể tải lịch sử giá');
      console.error('Error loading price history:', err);
    } finally {
      this.loading.set(false);
    }
  }

  getPriceChangeClass(change: PriceChange): string {
    if (change.difference > 0) return 'price-increase';
    if (change.difference < 0) return 'price-decrease';
    return 'price-no-change';
  }

  getPriceChangeIcon(change: PriceChange): string {
    if (change.difference > 0) return 'trending_up';
    if (change.difference < 0) return 'trending_down';
    return 'remove';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }

  formatPercentage(percent: number): string {
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  }

  formatPriceDifference(difference: number): string {
    return this.formatPrice(Math.abs(difference));
  }

  close() {
    this.dialogRef.close();
  }
}
