import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { KhachhangService } from '../../../../admin/khachhang/khachhang.service';
import { UserService } from '../../../../admin/user/user.service';
import { LichhenService } from '../../../../admin/lichhen/lichhen.service';
import { CustomchartComponent, ChartData, ChartConfig } from '../customchart/customchart.component';

@Component({
  selector: 'app-luotden',
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
  templateUrl: './luotden.component.html',
  styleUrl: './luotden.component.scss'
})
export class LuotdenComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  
  displayedColumns: string[] = ['branchName', 'appointments', 'successRate', 'source'];
  
  // Date range for filtering
  startDay: Date = new Date(new Date().setDate(new Date().getDate() - 7)); // 7 days ago
  endDay: Date = new Date();
  
  // Chart configuration for CustomchartComponent
  chartConfig: ChartConfig = {
    barChartTitle: 'Lượt Hẹn Theo Thời Gian',
    pieChartTitle: 'Phân Bố Nguồn Hẹn',
    barChart: {
      title: 'Lượt Hẹn Theo Thời Gian',
      yAxisTitle: 'Số Lượt Hẹn',
      seriesName: 'Lượt Hẹn Đến',
      color: '#4CAF50'
    },
    pieChart: {
      title: 'Phân Bố Nguồn Hẹn',
      colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336', '#00BCD4', '#3F51B5']
    },
    labels: {
      dashboard: 'Bảng điều khiển',
      analytics: 'Phân tích lượt hẹn',
      totalCount: 'Tổng lượt hẹn',
      daysActive: 'Ngày có lượt hẹn',
      dailyAverage: 'Trung bình/ngày',
      peakValue: 'Cao nhất trong ngày',
      timeRange: 'Khoảng thời gian',
      from: 'Từ ngày',
      to: 'Đến ngày',
      refreshData: 'Làm mới dữ liệu',
      exportData: 'Xuất dữ liệu',
      loadingAnalytics: 'Đang tải dữ liệu lượt hẹn...',
      errorLoadingData: 'Lỗi khi tải dữ liệu lượt hẹn',
      noDataAvailable: 'Không có lượt hẹn',
      noDataMessage: 'Không có lượt hẹn trong khoảng thời gian đã chọn. Thử điều chỉnh bộ lọc hoặc làm mới dữ liệu.',
      categoryDistribution: 'Phân bổ theo nguồn',
      temporalAnalysis: 'Phân tích theo thời gian',
      categoryBreakdown: 'Chi tiết nguồn hẹn',
      peakDay: 'Ngày có nhiều hẹn nhất',
      timeAnalytics: 'Phân tích thời gian',
      activeDays: 'Ngày có hoạt động',
      peakPerformanceDay: 'Ngày hiệu suất cao nhất',
      highestValue: 'Số lượt hẹn cao nhất',
      dataInsights: 'Thông tin chi tiết lượt hẹn',
      detailedBreakdown: 'Phân tích chi tiết và thống kê lượt hẹn'
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
  _LichhenService: LichhenService = inject(LichhenService);
  profile: any = this._UserService.profile;
  pageSize: any = this._LichhenService.pageSize;
  Lichhens: any = {data:[],Thanhcong:0,Tonglich:0,Chinhanh:0}

  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile()
    const listphone = this.profile()?.referrals?.map((item: any) => item.phone);
    this.Lichhens = await this._LichhenService.SearchBy({listphone,pageSize:9999})
    console.log('Lichhens:', this.Lichhens);
    
    this.Lichhens.Thanhcong = this.Lichhens.data.filter((item: any) => item.isCancel === false).length;
    this.Lichhens.Tonglich = this.Lichhens.data.length;
    this.Lichhens.Chinhanh = [...new Set(this.Lichhens.data.map((item: any) => item.branchName))].length;
    
    // Process data for CustomchartComponent
    this.processLichhenDataForChart();
    
    this.cdr.detectChanges();
  }

  processLichhenDataForChart(): void {
    const lichhenData = this.Lichhens.data;
    
    // Process time data
    const timeData = lichhenData.reduce((acc: any, item: any) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Process category data (by source/branch)
    const categoryData = lichhenData.reduce((acc: any, item: any) => {
      const source = item.sourceName || item.branchName || 'Không xác định';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Update chart data
    this.chartData = {
      timeData: timeData,
      categoryData: categoryData,
      totalCount: lichhenData.length
    };
  }

  // Get summary statistics for display
  getSummaryStats() {
    return {
      totalAppointments: this.Lichhens.Tonglich,
      successfulAppointments: this.Lichhens.Thanhcong,
      successRate: this.Lichhens.Tonglich > 0 ? ((this.Lichhens.Thanhcong / this.Lichhens.Tonglich) * 100).toFixed(1) : '0',
      activeBranches: this.Lichhens.Chinhanh,
      dateRange: `${this.formatDate(this.startDay)} - ${this.formatDate(this.endDay)}`
    };
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Method to refresh data
  async refreshData(): Promise<void> {
    await this.ngOnInit();
  }

  // Method to export data
  exportData(): any {
    return {
      summary: this.getSummaryStats(),
      appointments: this.Lichhens.data,
      chartData: this.chartData,
      config: this.chartConfig
    };
  }

  // Get top performing branches
  getTopBranches(limit: number = 5): any[] {
    const branchStats = this.Lichhens.data.reduce((acc: any, item: any) => {
      const branchName = item.branchName || 'Không xác định';
      if (!acc[branchName]) {
        acc[branchName] = {
          name: branchName,
          total: 0,
          successful: 0,
          cancelled: 0
        };
      }
      acc[branchName].total++;
      if (!item.isCancel) {
        acc[branchName].successful++;
      } else {
        acc[branchName].cancelled++;
      }
      return acc;
    }, {});

    return Object.values(branchStats)
      .map((branch: any) => ({
        ...branch,
        successRate: branch.total > 0 ? ((branch.successful / branch.total) * 100).toFixed(1) : '0'
      }))
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, limit);
  }
}



