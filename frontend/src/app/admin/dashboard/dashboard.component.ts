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
          this.createColumnChart();
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
          this.createDonutChart();
          this.createPieChart();
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
    if (this.comprehensiveData && this.dailyMonthlyData && this.topProductsData) {
      this.isLoading = false;
    }
  }

  // Chart creation methods
  createColumnChart(): void {
    if (!this.columnChartCanvas || !this.dailyMonthlyData?.length) return;

    // Destroy existing chart
    if (this.columnChart) {
      this.columnChart.destroy();
    }

    const ctx = this.columnChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = {
      type: 'bar',
      data: {
        labels: this.dailyMonthlyData.map(item => item.period),
        datasets: [
          {
            label: 'Số Đơn Hàng',
            data: this.dailyMonthlyData.map(item => item.totalDonhang),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Doanh Thu (triệu đồng)',
            data: this.dailyMonthlyData.map(item => item.totalRevenue / 1000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
            yAxisID: 'y1'
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
              text: 'Số Đơn Hàng'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Doanh Thu (triệu đồng)'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    };

    this.columnChart = new Chart(ctx, config);
  }

  createDonutChart(): void {
    if (!this.donutChartCanvas || !this.topProductsData?.byQuantity?.length) return;

    // Destroy existing chart
    if (this.donutChart) {
      this.donutChart.destroy();
    }

    const ctx = this.donutChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = {
      type: 'doughnut',
      data: {
        labels: this.topProductsData.byQuantity.map(item => item.sanpham.title),
        datasets: [{
          data: this.topProductsData.byQuantity.map(item => item.totalQuantity),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#36A2EB'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    };

    this.donutChart = new Chart(ctx, config);
  }

  createPieChart(): void {
    if (!this.pieChartCanvas || !this.topProductsData?.byValue?.length) return;

    // Destroy existing chart
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = {
      type: 'pie',
      data: {
        labels: this.topProductsData.byValue.map(item => item.sanpham.title),
        datasets: [{
          data: this.topProductsData.byValue.map(item => item.totalValue),
          backgroundColor: [
            '#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6',
            '#10B981', '#F97316', '#8B5CF6', '#06D6A0', '#F59E0B'
          ],
          hoverBackgroundColor: [
            '#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6',
            '#10B981', '#F97316', '#8B5CF6', '#06D6A0', '#F59E0B'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    };

    this.pieChart = new Chart(ctx, config);
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
          this.createColumnChart();
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
