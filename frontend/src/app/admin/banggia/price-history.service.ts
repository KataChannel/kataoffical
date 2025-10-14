import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PriceChange {
  timestamp: string;
  oldPrice: number;
  newPrice: number;
  difference: number;
  percentChange: number;
  userId: string;
  reason: string;
  banggiaCode?: string;
  sanphamCode?: string;
  sanphamTitle?: string;
}

export interface PriceHistory {
  sanphamId: string;
  banggiaId: string;
  history: PriceChange[];
}

export interface CurrentPrice {
  id: string;
  banggiaId: string;
  sanphamId: string;
  giaban: number;
  isActive: boolean;
  banggia: {
    mabanggia: string;
    title: string;
  };
  sanpham: {
    masp: string;
    title: string;
  };
}

export interface PriceDiscrepancy {
  sanphamId: string;
  sanphamCode: string;
  sanphamTitle?: string;
  issue: 'PRICE_CHANGED' | 'NO_PRICE_METADATA' | 'PRICE_NOT_FOUND' | 'VERIFICATION_ERROR';
  orderPrice?: number;
  currentPrice?: number;
  difference?: number;
  percentChange?: number;
  capturedAt?: string;
  message: string;
}

export interface PriceVerificationResult {
  donhangId: string;
  madonhang: string;
  verifiedAt: string;
  totalItems: number;
  discrepancies: PriceDiscrepancy[];
  hasDiscrepancies: boolean;
}

export interface BulkUpdateRequest {
  updates: Array<{
    banggiaId: string;
    sanphamId: string;
    newPrice: number;
    reason?: string;
  }>;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PriceHistoryService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private baseUrl = environment.APIURL;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getItem('token')
    });
  }

  /**
   * Get price history for a product in a banggia
   */
  async getPriceHistory(banggiaId: string, sanphamId: string): Promise<PriceHistory> {
    try {
      const url = `${this.baseUrl}/banggia/${banggiaId}/sanpham/${sanphamId}/price-history`;
      return await firstValueFrom(
        this.http.get<PriceHistory>(url, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error('Error fetching price history:', error);
      throw error;
    }
  }

  /**
   * Get current price for a product in a banggia
   */
  async getCurrentPrice(banggiaId: string, sanphamId: string): Promise<CurrentPrice> {
    try {
      const url = `${this.baseUrl}/banggia/${banggiaId}/sanpham/${sanphamId}/current-price`;
      return await firstValueFrom(
        this.http.get<CurrentPrice>(url, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }

  /**
   * Bulk update prices with audit trail
   */
  async bulkUpdatePrices(request: BulkUpdateRequest): Promise<any> {
    try {
      const url = `${this.baseUrl}/banggia/bulk-update-prices`;
      return await firstValueFrom(
        this.http.post(url, request, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error('Error bulk updating prices:', error);
      throw error;
    }
  }

  /**
   * Verify order prices against current banggia prices
   */
  async verifyOrderPrices(donhangId: string): Promise<PriceVerificationResult> {
    try {
      const url = `${this.baseUrl}/donhang/verify-prices/${donhangId}`;
      return await firstValueFrom(
        this.http.get<PriceVerificationResult>(url, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error('Error verifying order prices:', error);
      throw error;
    }
  }

  /**
   * Get price at specific date from history
   */
  async getPriceAtDate(banggiaId: string, sanphamId: string, date: Date): Promise<any> {
    try {
      const dateStr = date.toISOString();
      const url = `${this.baseUrl}/donhang/price-at-date?banggiaId=${banggiaId}&sanphamId=${sanphamId}&date=${dateStr}`;
      return await firstValueFrom(
        this.http.get(url, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error('Error fetching price at date:', error);
      throw error;
    }
  }
}
