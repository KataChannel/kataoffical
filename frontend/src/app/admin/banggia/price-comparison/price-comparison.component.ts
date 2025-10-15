import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface PriceComparison {
  sanphamId: string;
  sanphamTitle: string;
  banggiaPrice: { [banggiaId: string]: number };
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  priceRange: number;
  priceRangePercent: number;
}

interface HistoricalData {
  date: Date;
  price: number;
}

interface TrendPrediction {
  sanphamId: string;
  sanphamTitle: string;
  currentPrice: number;
  predictedPrice30Days: number;
  predictedPrice60Days: number;
  predictedPrice90Days: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number; // 0-100%
}

@Component({
  selector: 'app-price-comparison',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  templateUrl: './price-comparison.component.html',
  styleUrls: ['./price-comparison.component.scss']
})
export class PriceComparisonComponent implements OnInit {
  // Signals
  loading = signal(false);
  selectedBanggiaIds = signal<string[]>([]);
  selectedSanphamIds = signal<string[]>([]);
  
  // Data
  banggiaList = signal<any[]>([]);
  sanphamList = signal<any[]>([]);
  priceComparisons = signal<PriceComparison[]>([]);
  historicalData = signal<{ [sanphamId: string]: HistoricalData[] }>({});
  trendPredictions = signal<TrendPrediction[]>([]);
  
  // Display columns (dynamic based on selected banggia)
  displayedColumns = signal<string[]>(['sanphamTitle']);
  
  // Selected product for chart view
  selectedProductForChart = signal<string>('');

  constructor() {}

  ngOnInit() {
    this.loadBanggiaList();
    this.loadSanphamList();
  }

  async loadBanggiaList() {
    // Mock data
    const mockBanggia = [
      { id: 'bg-1', title: 'Bảng giá bán lẻ', color: '#1976d2' },
      { id: 'bg-2', title: 'Bảng giá bán sỉ', color: '#388e3c' },
      { id: 'bg-3', title: 'Bảng giá khách VIP', color: '#f57c00' }
    ];
    
    this.banggiaList.set(mockBanggia);
    this.selectedBanggiaIds.set(['bg-1', 'bg-2']); // Default selection
    this.updateDisplayColumns();
  }

  async loadSanphamList() {
    // Mock data
    const mockSanpham = [
      { id: 'sp-1', title: 'Rau xanh' },
      { id: 'sp-2', title: 'Rau cải' },
      { id: 'sp-3', title: 'Cà chua' },
      { id: 'sp-4', title: 'Ớt' },
      { id: 'sp-5', title: 'Dưa leo' }
    ];
    
    this.sanphamList.set(mockSanpham);
    this.selectedSanphamIds.set(['sp-1', 'sp-2', 'sp-3']); // Default selection
    this.loadComparisons();
  }

  async loadComparisons() {
    this.loading.set(true);
    try {
      await Promise.all([
        this.loadPriceComparisons(),
        this.loadHistoricalData(),
        this.loadTrendPredictions()
      ]);
    } catch (error) {
      console.error('Error loading comparisons:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async loadPriceComparisons() {
    // Mock data - replace with actual API
    const mockComparisons: PriceComparison[] = [
      {
        sanphamId: 'sp-1',
        sanphamTitle: 'Rau xanh',
        banggiaPrice: {
          'bg-1': 12000,
          'bg-2': 10000,
          'bg-3': 11500
        },
        minPrice: 10000,
        maxPrice: 12000,
        avgPrice: 11167,
        priceRange: 2000,
        priceRangePercent: 20
      },
      {
        sanphamId: 'sp-2',
        sanphamTitle: 'Rau cải',
        banggiaPrice: {
          'bg-1': 15000,
          'bg-2': 13500,
          'bg-3': 14000
        },
        minPrice: 13500,
        maxPrice: 15000,
        avgPrice: 14167,
        priceRange: 1500,
        priceRangePercent: 11.1
      },
      {
        sanphamId: 'sp-3',
        sanphamTitle: 'Cà chua',
        banggiaPrice: {
          'bg-1': 9200,
          'bg-2': 8500,
          'bg-3': 9000
        },
        minPrice: 8500,
        maxPrice: 9200,
        avgPrice: 8900,
        priceRange: 700,
        priceRangePercent: 8.2
      }
    ];

    this.priceComparisons.set(mockComparisons);
  }

  async loadHistoricalData() {
    // Mock historical data for charts
    const mockData: { [sanphamId: string]: HistoricalData[] } = {
      'sp-1': this.generateMockHistoricalData(10000, 30),
      'sp-2': this.generateMockHistoricalData(14000, 30),
      'sp-3': this.generateMockHistoricalData(8500, 30)
    };

    this.historicalData.set(mockData);
  }

  generateMockHistoricalData(basePrice: number, days: number): HistoricalData[] {
    const data: HistoricalData[] = [];
    let price = basePrice;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Random price fluctuation
      price += (Math.random() - 0.5) * 500;
      
      data.push({
        date,
        price: Math.round(price)
      });
    }

    return data;
  }

  async loadTrendPredictions() {
    // Mock trend predictions
    const mockPredictions: TrendPrediction[] = [
      {
        sanphamId: 'sp-1',
        sanphamTitle: 'Rau xanh',
        currentPrice: 12000,
        predictedPrice30Days: 12500,
        predictedPrice60Days: 13000,
        predictedPrice90Days: 13200,
        trend: 'increasing',
        confidence: 85
      },
      {
        sanphamId: 'sp-2',
        sanphamTitle: 'Rau cải',
        currentPrice: 15000,
        predictedPrice30Days: 14800,
        predictedPrice60Days: 14500,
        predictedPrice90Days: 14300,
        trend: 'decreasing',
        confidence: 72
      },
      {
        sanphamId: 'sp-3',
        sanphamTitle: 'Cà chua',
        currentPrice: 9200,
        predictedPrice30Days: 9150,
        predictedPrice60Days: 9200,
        predictedPrice90Days: 9250,
        trend: 'stable',
        confidence: 68
      }
    ];

    this.trendPredictions.set(mockPredictions);
  }

  updateDisplayColumns() {
    const columns = ['sanphamTitle'];
    
    // Add columns for selected banggia
    this.selectedBanggiaIds().forEach(id => {
      columns.push(`price_${id}`);
    });
    
    // Add summary columns
    columns.push('minPrice', 'maxPrice', 'avgPrice', 'priceRange', 'actions');
    
    this.displayedColumns.set(columns);
  }

  toggleBanggiaSelection(banggiaId: string, checked: boolean) {
    if (checked) {
      this.selectedBanggiaIds.update(ids => [...ids, banggiaId]);
    } else {
      this.selectedBanggiaIds.update(ids => ids.filter(id => id !== banggiaId));
    }
    this.onBanggiaSelectionChange();
  }

  onBanggiaSelectionChange() {
    this.updateDisplayColumns();
    this.loadComparisons();
  }

  onSanphamSelectionChange() {
    this.loadComparisons();
  }

  getBanggiaTitle(banggiaId: string): string {
    return this.banggiaList().find(b => b.id === banggiaId)?.title || banggiaId;
  }

  getBanggiaColor(banggiaId: string): string {
    return this.banggiaList().find(b => b.id === banggiaId)?.color || '#666';
  }

  getPriceComparisonClass(price: number, comparison: PriceComparison): string {
    if (price === comparison.minPrice) return 'lowest-price';
    if (price === comparison.maxPrice) return 'highest-price';
    return '';
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'increasing': return 'trending_up';
      case 'decreasing': return 'trending_down';
      case 'stable': return 'trending_flat';
      default: return 'remove';
    }
  }

  getTrendClass(trend: string): string {
    switch (trend) {
      case 'increasing': return 'trend-up';
      case 'decreasing': return 'trend-down';
      case 'stable': return 'trend-stable';
      default: return '';
    }
  }

  showHistoricalChart(sanphamId: string) {
    this.selectedProductForChart.set(sanphamId);
    // TODO: Open chart dialog or expand inline chart
    console.log('Show chart for:', sanphamId);
  }

  exportComparison() {
    // TODO: Export to Excel
    console.log('Exporting comparison...');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  formatPercent(value: number): string {
    return `${value.toFixed(1)}%`;
  }
}
