import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

interface PriceVolatility {
  sanphamId: string;
  sanphamTitle: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  volatility: number; // Độ biến động (%)
  changeCount: number;
  lastChange: Date;
}

interface OrderImpact {
  donhangId: string;
  donhangCode: string;
  priceChangeDate: Date;
  orderDate: Date;
  totalBefore: number;
  totalAfter: number;
  difference: number;
  differencePercent: number;
  itemsAffected: number;
}

interface RevenueImpact {
  month: string;
  actualRevenue: number;
  projectedRevenue: number;
  difference: number;
  priceIncreases: number;
  priceDecreases: number;
}

@Component({
  selector: 'app-price-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './price-analytics.component.html',
  styleUrls: ['./price-analytics.component.scss']
})
export class PriceAnalyticsComponent implements OnInit {
  // Signals
  loading = signal(false);
  selectedBanggiaId = signal<string>('');
  selectedPeriod = signal<string>('30days');
  dateFrom = signal<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  dateTo = signal<Date>(new Date());
  
  // Data
  banggiaList = signal<any[]>([]);
  volatilityData = signal<PriceVolatility[]>([]);
  orderImpacts = signal<OrderImpact[]>([]);
  revenueImpacts = signal<RevenueImpact[]>([]);
  
  // Summary Stats
  summaryStats = signal({
    totalPriceChanges: 0,
    avgVolatility: 0,
    ordersAffected: 0,
    revenueImpact: 0,
    mostVolatileProduct: '',
    highestImpactOrder: ''
  });

  // Table columns
  volatilityColumns = ['sanphamTitle', 'avgPrice', 'minPrice', 'maxPrice', 'volatility', 'changeCount', 'lastChange'];
  orderImpactColumns = ['donhangCode', 'orderDate', 'totalBefore', 'totalAfter', 'difference', 'differencePercent', 'itemsAffected'];
  revenueImpactColumns = ['month', 'actualRevenue', 'projectedRevenue', 'difference', 'priceIncreases', 'priceDecreases'];

  constructor() {}

  ngOnInit() {
    this.loadBanggiaList();
    this.loadAnalytics();
  }

  async loadBanggiaList() {
    // Mock data
    this.banggiaList.set([
      { id: 'all', title: 'Tất cả bảng giá' },
      { id: 'bg-1', title: 'Bảng giá bán lẻ' },
      { id: 'bg-2', title: 'Bảng giá bán sỉ' },
      { id: 'bg-3', title: 'Bảng giá khách VIP' }
    ]);
    this.selectedBanggiaId.set('all');
  }

  async loadAnalytics() {
    this.loading.set(true);
    try {
      await Promise.all([
        this.loadVolatilityData(),
        this.loadOrderImpacts(),
        this.loadRevenueImpacts(),
        this.calculateSummaryStats()
      ]);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async loadVolatilityData() {
    // Mock data - replace with actual API
    const mockData: PriceVolatility[] = [
      {
        sanphamId: 'sp-1',
        sanphamTitle: 'Rau xanh',
        avgPrice: 11000,
        minPrice: 9000,
        maxPrice: 13000,
        volatility: 44.4,
        changeCount: 5,
        lastChange: new Date()
      },
      {
        sanphamId: 'sp-2',
        sanphamTitle: 'Rau cải',
        avgPrice: 14000,
        minPrice: 12000,
        maxPrice: 16000,
        volatility: 33.3,
        changeCount: 3,
        lastChange: new Date(Date.now() - 86400000)
      },
      {
        sanphamId: 'sp-3',
        sanphamTitle: 'Cà chua',
        avgPrice: 8500,
        minPrice: 8000,
        maxPrice: 9500,
        volatility: 18.8,
        changeCount: 2,
        lastChange: new Date(Date.now() - 172800000)
      }
    ];

    this.volatilityData.set(mockData);
  }

  async loadOrderImpacts() {
    // Mock data - replace with actual API
    const mockData: OrderImpact[] = [
      {
        donhangId: 'dh-1',
        donhangCode: 'DH0001',
        priceChangeDate: new Date(Date.now() - 86400000),
        orderDate: new Date(),
        totalBefore: 500000,
        totalAfter: 520000,
        difference: 20000,
        differencePercent: 4,
        itemsAffected: 3
      },
      {
        donhangId: 'dh-2',
        donhangCode: 'DH0002',
        priceChangeDate: new Date(Date.now() - 172800000),
        orderDate: new Date(Date.now() - 86400000),
        totalBefore: 750000,
        totalAfter: 735000,
        difference: -15000,
        differencePercent: -2,
        itemsAffected: 2
      }
    ];

    this.orderImpacts.set(mockData);
  }

  async loadRevenueImpacts() {
    // Mock data - replace with actual API
    const mockData: RevenueImpact[] = [
      {
        month: 'Tháng 1/2025',
        actualRevenue: 45000000,
        projectedRevenue: 42000000,
        difference: 3000000,
        priceIncreases: 12,
        priceDecreases: 5
      },
      {
        month: 'Tháng 12/2024',
        actualRevenue: 38000000,
        projectedRevenue: 40000000,
        difference: -2000000,
        priceIncreases: 4,
        priceDecreases: 8
      },
      {
        month: 'Tháng 11/2024',
        actualRevenue: 42000000,
        projectedRevenue: 41000000,
        difference: 1000000,
        priceIncreases: 7,
        priceDecreases: 6
      }
    ];

    this.revenueImpacts.set(mockData);
  }

  async calculateSummaryStats() {
    const volatilityData = this.volatilityData();
    const orderImpacts = this.orderImpacts();
    const revenueImpacts = this.revenueImpacts();

    const totalPriceChanges = volatilityData.reduce((sum, item) => sum + item.changeCount, 0);
    const avgVolatility = volatilityData.length > 0
      ? volatilityData.reduce((sum, item) => sum + item.volatility, 0) / volatilityData.length
      : 0;
    
    const mostVolatile = volatilityData.reduce((max, item) => 
      item.volatility > max.volatility ? item : max, 
      { volatility: 0, sanphamTitle: '' }
    );

    const highestImpact = orderImpacts.reduce((max, item) => 
      Math.abs(item.difference) > Math.abs(max.difference) ? item : max,
      { difference: 0, donhangCode: '' }
    );

    const totalRevenueImpact = revenueImpacts.reduce((sum, item) => sum + item.difference, 0);

    this.summaryStats.set({
      totalPriceChanges,
      avgVolatility: Math.round(avgVolatility * 10) / 10,
      ordersAffected: orderImpacts.length,
      revenueImpact: totalRevenueImpact,
      mostVolatileProduct: mostVolatile.sanphamTitle,
      highestImpactOrder: highestImpact.donhangCode
    });
  }

  onPeriodChange() {
    const period = this.selectedPeriod();
    const now = new Date();
    
    switch (period) {
      case '7days':
        this.dateFrom.set(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
        break;
      case '30days':
        this.dateFrom.set(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
        break;
      case '90days':
        this.dateFrom.set(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000));
        break;
      case '1year':
        this.dateFrom.set(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000));
        break;
    }
    
    this.dateTo.set(now);
    this.loadAnalytics();
  }

  onCustomDateChange() {
    this.loadAnalytics();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date));
  }

  getVolatilityClass(volatility: number): string {
    if (volatility >= 40) return 'high-volatility';
    if (volatility >= 20) return 'medium-volatility';
    return 'low-volatility';
  }

  exportToExcel() {
    // TODO: Implement Excel export
    console.log('Exporting to Excel...');
  }

  downloadReport() {
    // TODO: Implement PDF report download
    console.log('Downloading report...');
  }
}
