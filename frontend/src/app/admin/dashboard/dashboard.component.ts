import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DashboardService, ComprehensiveDashboardData, DailyMonthlyReport, TopProductsResponse } from './dashboard.service';

// Chart.js types
declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('columnChart', { static: false }) columnChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart', { static: false }) donutChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: false }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  // Data properties
  comprehensiveData: ComprehensiveDashboardData | null = null;
  dailyMonthlyData: DailyMonthlyReport[] = [];
  topProductsData: TopProductsResponse | null = null;

  // Chart instances
  columnChart: any = null;
  donutChart: any = null;
  pieChart: any = null;

  // UI state
  isLoading = false;
  dateMenuOpen = false;

  // Date filter
  batdau: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of current month
  ketthuc: Date = new Date(); // Today

  // Report group options
  reportGroupBy: 'day' | 'month' | 'year' = 'day';
  reportGroupOptions = [
    { value: 'day' as const, label: 'Theo Ngày' },
    { value: 'month' as const, label: 'Theo Tháng' },
    { value: 'year' as const, label: 'Theo Năm' }
  ];

  private subscriptions: Subscription[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    // Charts will be created after data is loaded
  }

  ngOnDestroy(): void {
    // Destroy chart instances
    this.destroyCharts();
    
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Data loading methods
  loadAllData(): void {
    this.isLoading = true;
    
    const batdauStr = this.batdau.toISOString();
    const ketthucStr = this.ketthuc.toISOString();

    // Load comprehensive data
    const comprehensiveSub = this.dashboardService.getComprehensiveDashboard(batdauStr, ketthucStr)
      .subscribe({
        next: (data) => {
          this.comprehensiveData = data;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading comprehensive data:', error);
          this.isLoading = false;
        }
      });

    // Load daily/monthly report
    const reportSub = this.dashboardService.getDailyMonthlyReport(batdauStr, ketthucStr, this.reportGroupBy)
      .subscribe({
        next: (data) => {
          this.dailyMonthlyData = data;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading daily/monthly data:', error);
          this.isLoading = false;
        }
      });

    // Load top products
    const topProductsSub = this.dashboardService.getTopProducts(batdauStr, ketthucStr, 10)
      .subscribe({
        next: (data) => {
          this.topProductsData = data;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading top products:', error);
          this.isLoading = false;
        }
      });

    this.subscriptions.push(comprehensiveSub, reportSub, topProductsSub);
  }

  private checkLoadingComplete(): void {
    // ✅ Check if all required data is loaded
    if (this.comprehensiveData && this.dailyMonthlyData && this.topProductsData) {
      this.isLoading = false;
      
      // ✅ Create charts after all data is loaded to ensure consistency
      setTimeout(() => {
        this.createAllCharts();
      }, 100);
    }
  }

  // ✅ Create all charts in one method to ensure proper sequencing
  private createAllCharts(): void {
    try {
      this.createColumnChart();
      this.createDonutChart();
      this.createPieChart();
    } catch (error) {
      console.error('Error creating charts:', error);
    }
  }

  // Chart creation methods
  createColumnChart(): void {
    if (!this.columnChartCanvas) {
      console.warn('Column chart canvas not available');
      return;
    }

    // Destroy existing chart
    if (this.columnChart) {
      this.columnChart.destroy();
      this.columnChart = null;
    }

    const ctx = this.columnChartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context for column chart');
      return;
    }

    // ✅ Check if we have valid data
    if (!this.dailyMonthlyData?.length) {
      console.warn('No column chart data available');
      return;
    }

    // ✅ Filter and validate data
    const validData = this.dailyMonthlyData.filter(item => 
      item && 
      item.period && 
      typeof item.totalDonhang === 'number' && 
      typeof item.totalRevenue === 'number'
    );

    if (!validData.length) {
      console.warn('No valid column chart data after filtering');
      return;
    }

    const config = {
      type: 'bar',
      data: {
        labels: validData.map(item => item.period || 'N/A'),
        datasets: [
          {
            label: 'Số Đơn Hàng',
            data: validData.map(item => item.totalDonhang || 0),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            yAxisID: 'y',
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
            hoverBorderColor: 'rgb(59, 130, 246)',
            hoverBorderWidth: 2
          },
          {
            label: 'Doanh Thu (triệu đồng)',
            data: validData.map(item => (item.totalRevenue || 0) / 1000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
            yAxisID: 'y1',
            hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)',
            hoverBorderColor: 'rgb(16, 185, 129)',
            hoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Số Đơn Hàng',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Doanh Thu (triệu đồng)',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              beginAtZero: true,
              precision: 1
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                
                if (label.includes('Doanh Thu')) {
                  const originalValue = value * 1000000;
                  return `${label}: ${this.formatCurrency(originalValue)}`;
                } else {
                  return `${label}: ${value.toLocaleString()} đơn`;
                }
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.columnChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating column chart:', error);
    }
  }

  createDonutChart(): void {
    if (!this.donutChartCanvas) return;

    // Destroy existing chart
    if (this.donutChart) {
      this.donutChart.destroy();
      this.donutChart = null;
    }

    const ctx = this.donutChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // ✅ Check if we have valid data
    if (!this.topProductsData?.byQuantity?.length) {
      console.warn('No donut chart data available');
      return;
    }

    // ✅ Filter out invalid data and prepare chart data
    const validData = this.topProductsData.byQuantity.filter(item => 
      item && 
      item.sanpham && 
      item.sanpham.title && 
      item.totalQuantity && 
      item.totalQuantity > 0
    );

    if (!validData.length) {
      console.warn('No valid donut chart data after filtering');
      return;
    }

    // ✅ Generate dynamic colors based on data length
    const generateColors = (count: number) => {
      const baseColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#4BC0C0', '#36A2EB', '#FF6384'
      ];
      
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    const colors = generateColors(validData.length);

    const config = {
      type: 'doughnut',
      data: {
        labels: validData.map(item => item.sanpham.title || 'N/A'),
        datasets: [{
          data: validData.map(item => item.totalQuantity || 0),
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => color + 'CC'), // Add transparency on hover
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels: (chart: any) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label: string, i: number) => {
                    const value = data.datasets[0].data[i];
                    const formattedValue = this.formatNumber(value);
                    return {
                      text: `${label}: ${formattedValue}`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const formattedValue = this.formatNumber(value);
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                return `${label}: ${formattedValue} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.donutChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating donut chart:', error);
    }
  }

  createPieChart(): void {
    if (!this.pieChartCanvas) return;

    // Destroy existing chart
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }

    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // ✅ Check if we have valid data
    if (!this.topProductsData?.byValue?.length) {
      console.warn('No pie chart data available');
      return;
    }

    // ✅ Filter out invalid data and prepare chart data
    const validData = this.topProductsData.byValue.filter(item => 
      item && 
      item.sanpham && 
      item.sanpham.title && 
      item.totalValue && 
      item.totalValue > 0
    );

    if (!validData.length) {
      console.warn('No valid pie chart data after filtering');
      return;
    }

    // ✅ Generate dynamic colors based on data length
    const generateColors = (count: number) => {
      const baseColors = [
        '#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6',
        '#10B981', '#F97316', '#EC4899', '#6366F1', '#84CC16'
      ];
      
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    const colors = generateColors(validData.length);

    const config = {
      type: 'pie',
      data: {
        labels: validData.map(item => item.sanpham.title || 'N/A'),
        datasets: [{
          data: validData.map(item => item.totalValue || 0),
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => color + 'CC'), // Add transparency on hover
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels: (chart: any) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label: string, i: number) => {
                    const value = data.datasets[0].data[i];
                    const formattedValue = this.formatCurrency(value);
                    return {
                      text: `${label}: ${formattedValue}`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const formattedValue = this.formatCurrency(value);
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                return `${label}: ${formattedValue} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.pieChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating pie chart:', error);
    }
  }

  private destroyCharts(): void {
    if (this.columnChart) {
      this.columnChart.destroy();
      this.columnChart = null;
    }
    if (this.donutChart) {
      this.donutChart.destroy();
      this.donutChart = null;
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
  }

  // Event handlers
  applyDateFilter(): void {
    this.dateMenuOpen = false;
    this.loadAllData();
  }

  applyGroupByFilter(): void {
    const batdauStr = this.batdau.toISOString();
    const ketthucStr = this.ketthuc.toISOString();

    const reportSub = this.dashboardService.getDailyMonthlyReport(batdauStr, ketthucStr, this.reportGroupBy)
      .subscribe({
        next: (data) => {
          this.dailyMonthlyData = data;
          this.createAllCharts();
        },
        error: (error) => {
          console.error('Error loading daily/monthly data:', error);
        }
      });

    this.subscriptions.push(reportSub);
  }

  // Additional methods for HTML template
  loadAllDashboardData(): void {
    this.loadAllData();
  }

  setDateRange(range: string): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (range) {
      case 'today':
        this.batdau = new Date(today);
        this.ketthuc = new Date(today);
        break;
      case 'yesterday':
        this.batdau = new Date(yesterday);
        this.ketthuc = new Date(yesterday);
        break;
      case 'last7days':
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 7);
        this.ketthuc = new Date(today);
        break;
      case 'last30days':
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 30);
        this.ketthuc = new Date(today);
        break;
      case 'thisMonth':
        this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
        this.ketthuc = new Date(today);
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        this.batdau = lastMonth;
        this.ketthuc = lastDayOfLastMonth;
        break;
    }
    this.loadAllData();
  }

  getSelectedGroupLabel(): string {
    const found = this.reportGroupOptions.find(option => option.value === this.reportGroupBy);
    return found ? found.label : 'Theo Ngày';
  }

  // Helper methods
  getDaysDifference(): number {
    const timeDiff = this.ketthuc.getTime() - this.batdau.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }
}
