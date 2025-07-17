import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { KhachhangService } from '../../../../admin/khachhang/khachhang.service';
import { KhoahocService } from '../../../../admin/khoahoc/khoahoc.service';
import { UserService } from '../../../../admin/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DoanhthuService } from '../../../../admin/doanhthu/doanhthu.service';
import { CustomchartComponent, ChartData, ChartConfig } from '../customchart/customchart.component';

@Component({
  selector: 'app-doanhthu',
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    NgApexchartsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    CustomchartComponent
  ],
  templateUrl: './doanhthu.component.html',
  styleUrl: './doanhthu.component.scss'
})
export class DoanhthuComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  // Chart configuration for CustomchartComponent
  chartConfig: ChartConfig = {
    barChartTitle: 'Doanh Thu Theo Thời Gian',
    pieChartTitle: 'Phân Bố Nguồn Doanh Thu',
    barChart: {
      title: 'Doanh Thu Theo Thời Gian',
      yAxisTitle: 'Doanh Thu (VNĐ)',
      seriesName: 'Doanh Thu',
      color: '#4CAF50'
    },
    pieChart: {
      title: 'Phân Bố Nguồn Doanh Thu',
      colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336', '#00BCD4', '#3F51B5']
    },
    labels: {
      dashboard: 'Bảng điều khiển',
      analytics: 'Phân tích doanh thu',
      totalCount: 'Tổng doanh thu',
      daysActive: 'Ngày có doanh thu',
      dailyAverage: 'Trung bình/ngày',
      peakValue: 'Cao nhất trong ngày',
      timeRange: 'Khoảng thời gian',
      from: 'Từ ngày',
      to: 'Đến ngày',
      refreshData: 'Làm mới dữ liệu',
      exportData: 'Xuất dữ liệu',
      loadingAnalytics: 'Đang tải dữ liệu doanh thu...',
      errorLoadingData: 'Lỗi khi tải dữ liệu doanh thu',
      noDataAvailable: 'Không có doanh thu',
      noDataMessage: 'Không có doanh thu trong khoảng thời gian đã chọn. Thử điều chỉnh bộ lọc hoặc làm mới dữ liệu.',
      categoryDistribution: 'Phân bổ theo nguồn',
      temporalAnalysis: 'Phân tích theo thời gian',
      categoryBreakdown: 'Chi tiết nguồn doanh thu',
      peakDay: 'Ngày doanh thu cao nhất',
      timeAnalytics: 'Phân tích thời gian',
      activeDays: 'Ngày có hoạt động',
      peakPerformanceDay: 'Ngày hiệu suất cao nhất',
      highestValue: 'Doanh thu cao nhất',
      dataInsights: 'Thông tin chi tiết doanh thu',
      detailedBreakdown: 'Phân tích chi tiết và thống kê doanh thu'
    }
  };

  // Chart data for CustomchartComponent
  chartData: ChartData = {
    timeData: {},
    categoryData: {},
    totalCount: 0
  };

  _UserService: UserService = inject(UserService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _DoanhthuService: DoanhthuService = inject(DoanhthuService);
  profile: any = this._UserService.profile;
  Doanhthus: any = { 
    data: [], 
    totalRevenue: 0, 
    totalCommission: 0, 
    averageRevenue: 0,
    activeCustomers: 0
  };

  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile()
    const listphone = this.profile()?.referrals?.map((item: any) => item.phone);
    this.Doanhthus = await this._DoanhthuService.getDoanhthuBy({listphone, pageSize: 9999})
    console.log('Doanhthus:', this.Doanhthus);
    
    // Calculate statistics
    this.calculateStatistics();
    
    // Process data for CustomchartComponent
    this.processRevenueDataForChart();
    
    this.cdr.detectChanges();
  }

  calculateStatistics(): void {
    const data = this.Doanhthus.data;
    
    // Calculate total revenue and commission
    this.Doanhthus.totalRevenue = data.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    this.Doanhthus.totalCommission = data.reduce((sum: number, item: any) => sum + (item.commission || 0), 0);
    
    // Calculate average revenue per transaction
    this.Doanhthus.averageRevenue = data.length > 0 ? this.Doanhthus.totalRevenue / data.length : 0;
    
    // Count unique customers
    this.Doanhthus.activeCustomers = [...new Set(data.map((item: any) => item.phone))].length;
  }

  processRevenueDataForChart(): void {
    const revenueData = this.Doanhthus.data;
    
    // Process time data (sum revenue by date)
    const timeData = revenueData.reduce((acc: any, item: any) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      acc[formattedDate] = (acc[formattedDate] || 0) + (item.amount || 0);
      return acc;
    }, {} as { [key: string]: number });

    // Process category data (by status or source)
    const categoryData = revenueData.reduce((acc: any, item: any) => {
      const category = item.status || item.source || 'Không xác định';
      acc[category] = (acc[category] || 0) + (item.amount || 0);
      return acc;
    }, {} as { [key: string]: number });

    // Update chart data
    this.chartData = {
      timeData: timeData,
      categoryData: categoryData,
      totalCount: this.Doanhthus.totalRevenue
    };
  }

  // Get summary statistics for display
  getSummaryStats() {
    return {
      totalRevenue: this.Doanhthus.totalRevenue,
      totalCommission: this.Doanhthus.totalCommission,
      averageRevenue: this.Doanhthus.averageRevenue,
      activeCustomers: this.Doanhthus.activeCustomers,
      totalTransactions: this.Doanhthus.data.length
    };
  }

  // Get top customers by revenue
  getTopCustomers(limit: number = 5): any[] {
    const customerStats = this.Doanhthus.data.reduce((acc: any, item: any) => {
      const phone = item.phone;
      if (!acc[phone]) {
        acc[phone] = {
          phone: phone,
          totalRevenue: 0,
          totalCommission: 0,
          transactions: 0
        };
      }
      acc[phone].totalRevenue += (item.amount || 0);
      acc[phone].totalCommission += (item.commission || 0);
      acc[phone].transactions++;
      return acc;
    }, {});

    return Object.values(customerStats)
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit);
  }

  // Method to refresh data
  async refreshData(): Promise<void> {
    await this.ngOnInit();
  }

  // Method to export data
  exportData(): any {
    return {
      summary: this.getSummaryStats(),
      revenue: this.Doanhthus.data,
      chartData: this.chartData,
      config: this.chartConfig,
      topCustomers: this.getTopCustomers()
    };
  }

  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }
}
