import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { KhachhangService } from '../../../../admin/khachhang/khachhang.service';
import { LichhenService } from '../../../../admin/lichhen/lichhen.service';
import { UserService } from '../../../../admin/user/user.service';
import { KhoahocService } from '../../../../admin/khoahoc/khoahoc.service';
import { CustomchartComponent, ChartData, ChartConfig } from '../customchart/customchart.component';

@Component({
  selector: 'app-khoahoc',
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
  templateUrl: './khoahoc.component.html',
  styleUrls: ['./khoahoc.component.scss']
})
export class KhoahocComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  
  // Chart configuration for CustomchartComponent
  chartConfig: ChartConfig = {
    barChartTitle: 'Đăng Ký Khóa Học Theo Thời Gian',
    pieChartTitle: 'Phân Bố Khóa Học',
    barChart: {
      title: 'Đăng Ký Khóa Học Theo Thời Gian',
      yAxisTitle: 'Số Lượt Đăng Ký',
      seriesName: 'Học Viên Đăng Ký',
      color: '#4CAF50'
    },
    pieChart: {
      title: 'Phân Bố Theo Khóa Học',
      colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336', '#00BCD4', '#3F51B5']
    },
    labels: {
      dashboard: 'Bảng điều khiển',
      analytics: 'Phân tích khóa học',
      totalCount: 'Tổng đăng ký',
      daysActive: 'Ngày có đăng ký',
      dailyAverage: 'Trung bình/ngày',
      peakValue: 'Cao nhất trong ngày',
      timeRange: 'Khoảng thời gian',
      from: 'Từ ngày',
      to: 'Đến ngày',
      refreshData: 'Làm mới dữ liệu',
      exportData: 'Xuất dữ liệu',
      loadingAnalytics: 'Đang tải dữ liệu khóa học...',
      errorLoadingData: 'Lỗi khi tải dữ liệu khóa học',
      noDataAvailable: 'Không có đăng ký khóa học',
      noDataMessage: 'Không có đăng ký khóa học trong khoảng thời gian đã chọn. Thử điều chỉnh bộ lọc hoặc làm mới dữ liệu.',
      categoryDistribution: 'Phân bổ theo khóa học',
      temporalAnalysis: 'Phân tích theo thời gian',
      categoryBreakdown: 'Chi tiết khóa học',
      peakDay: 'Ngày đăng ký nhiều nhất',
      timeAnalytics: 'Phân tích thời gian',
      activeDays: 'Ngày có hoạt động',
      peakPerformanceDay: 'Ngày hiệu suất cao nhất',
      highestValue: 'Số đăng ký cao nhất',
      dataInsights: 'Thông tin chi tiết khóa học',
      detailedBreakdown: 'Phân tích chi tiết và thống kê đăng ký'
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
  _KhoahocService: KhoahocService = inject(KhoahocService);
  profile: any = this._UserService.profile;
  pageSize: any = this._KhoahocService.pageSize;
  Khoahocs: any = { data: [], totalRegistrations: 0, activeCourses: 0, conversionRate: 0 };

  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile()
    const listphone = this.profile()?.referrals?.map((item: any) => item.phone);
    this.Khoahocs = await this._KhoahocService.SearchBy({ listphone, pageSize: 9999 })
    console.log('Khoahocs:', this.Khoahocs);
    
    // Calculate statistics
    this.calculateStatistics();
    
    // Process data for CustomchartComponent
    this.processKhoahocDataForChart();
    
    this.cdr.detectChanges();
  }

  calculateStatistics(): void {
    this.Khoahocs.totalRegistrations = this.Khoahocs.data.length;
    this.Khoahocs.activeCourses = [...new Set(this.Khoahocs.data.map((item: any) => item.serviceName))].length;
    
    // Calculate conversion rate (example: successful registrations / total views * 100)
    // You might need to adjust this based on your actual data structure
    const successfulRegistrations = this.Khoahocs.data.filter((item: any) => item.status === 'active' || !item.isCancelled).length;
    this.Khoahocs.conversionRate = this.Khoahocs.totalRegistrations > 0 
      ? ((successfulRegistrations / this.Khoahocs.totalRegistrations) * 100).toFixed(1)
      : '0';
  }

  processKhoahocDataForChart(): void {
    const khoahocData = this.Khoahocs.data;
    
    // Process time data
    const timeData = khoahocData.reduce((acc: any, item: any) => {
      const date = new Date(item.createdDate || item.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Process category data (by course/service)
    const categoryData = khoahocData.reduce((acc: any, item: any) => {
      const course = item.serviceName || 'Không xác định';
      acc[course] = (acc[course] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Update chart data
    this.chartData = {
      timeData: timeData,
      categoryData: categoryData,
      totalCount: khoahocData.length
    };
  }

  // Get summary statistics for display
  getSummaryStats() {
    return {
      totalRegistrations: this.Khoahocs.totalRegistrations,
      activeCourses: this.Khoahocs.activeCourses,
      conversionRate: this.Khoahocs.conversionRate,
      averagePerDay: this.Khoahocs.totalRegistrations > 0 ? Math.round(this.Khoahocs.totalRegistrations / 30) : 0
    };
  }

  // Get top performing courses
  getTopCourses(limit: number = 5): any[] {
    const courseStats = this.Khoahocs.data.reduce((acc: any, item: any) => {
      const courseName = item.serviceName || 'Không xác định';
      if (!acc[courseName]) {
        acc[courseName] = {
          name: courseName,
          total: 0,
          branch: item.branchName || 'Không xác định'
        };
      }
      acc[courseName].total++;
      return acc;
    }, {});

    return Object.values(courseStats)
      .sort((a: any, b: any) => b.total - a.total)
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
      courses: this.Khoahocs.data,
      chartData: this.chartData,
      config: this.chartConfig,
      topCourses: this.getTopCourses()
    };
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }
}