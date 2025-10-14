import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PriceHistoryService, PriceVerificationResult, PriceDiscrepancy } from '../../banggia/price-history.service';

@Component({
  selector: 'app-price-verification',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  templateUrl: './price-verification.component.html',
  styleUrls: ['./price-verification.component.scss']
})
export class PriceVerificationComponent implements OnInit {
  @Input() donhangId!: string;
  @Input() autoLoad: boolean = false;

  loading = signal(false);
  verification = signal<PriceVerificationResult | null>(null);
  error = signal<string | null>(null);

  constructor(private priceHistoryService: PriceHistoryService) {}

  ngOnInit() {
    if (this.autoLoad && this.donhangId) {
      this.verifyPrices();
    }
  }

  async verifyPrices() {
    if (!this.donhangId) {
      this.error.set('Không có ID đơn hàng');
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);

      const result = await this.priceHistoryService.verifyOrderPrices(this.donhangId);
      this.verification.set(result);
    } catch (err: any) {
      this.error.set(err.message || 'Không thể xác minh giá');
      console.error('Error verifying prices:', err);
    } finally {
      this.loading.set(false);
    }
  }

  getDiscrepancyIcon(issue: string): string {
    switch (issue) {
      case 'PRICE_CHANGED': return 'warning';
      case 'NO_PRICE_METADATA': return 'info';
      case 'PRICE_NOT_FOUND': return 'error';
      case 'VERIFICATION_ERROR': return 'error';
      default: return 'help';
    }
  }

  getDiscrepancyColor(issue: string): string {
    switch (issue) {
      case 'PRICE_CHANGED': return 'warn';
      case 'NO_PRICE_METADATA': return 'accent';
      case 'PRICE_NOT_FOUND': return 'warn';
      case 'VERIFICATION_ERROR': return 'warn';
      default: return 'primary';
    }
  }

  getDiscrepancySeverity(discrepancy: PriceDiscrepancy): 'high' | 'medium' | 'low' {
    if (discrepancy.issue !== 'PRICE_CHANGED' || !discrepancy.percentChange) {
      return 'medium';
    }

    const absChange = Math.abs(discrepancy.percentChange);
    if (absChange > 20) return 'high';
    if (absChange > 10) return 'medium';
    return 'low';
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
      minute: '2-digit'
    }).format(date);
  }

  formatPercentage(percent: number): string {
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  }
}
