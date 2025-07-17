
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomchartComponent, ChartData, ChartConfig } from './customchart/customchart.component';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';

@Component({
  selector: 'app-example-usage',
  imports: [
    CommonModule,
    CustomchartComponent
  ],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Ví Dụ Sử Dụng Custom Chart</h1>
      
      <!-- Chart cho Lượt Đăng Ký -->
      <div class="mb-8">
        <app-customchart 
          [chartData]="registrationChartData" 
          [config]="registrationChartConfig">
        </app-customchart>
      </div>
      
      <!-- Chart cho Lượt Truy Cập -->
      <div class="mb-8">
        <app-customchart 
          [chartData]="visitChartData" 
          [config]="visitChartConfig">
        </app-customchart>
      </div>
      
      <!-- Chart cho Doanh Thu -->
      <div class="mb-8">
        <app-customchart 
          [chartData]="revenueChartData" 
          [config]="revenueChartConfig">
        </app-customchart>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ExampleUsageComponent implements OnInit {
  private trackingService = inject(TrackingService);
  private userService = inject(UserService);

  // Chart data cho Lượt Đăng Ký
  registrationChartData: ChartData = {
    timeData: {},
    categoryData: {},
    totalCount: 0
  };

  registrationChartConfig: ChartConfig = {
    title: 'Thống Kê Lượt Đăng Ký Affiliate',
    barChartTitle: 'Lượt Đăng Ký Theo Thời Gian',
    pieChartTitle: 'Phân Bố Nguồn Đăng Ký',
    barChartYAxisTitle: 'Số Lượt Đăng Ký',
    barChartSeriesName: 'Lượt Đăng Ký Thành Công',
    barChartColor: '#4CAF50',
    pieChartColors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336']
  };

  // Chart data cho Lượt Truy Cập
  visitChartData: ChartData = {
    timeData: {},
    categoryData: {},
    totalCount: 0
  };

  visitChartConfig: ChartConfig = {
    title: 'Thống Kê Lượt Truy Cập Website',
    barChartTitle: 'Lượt Truy Cập Theo Thời Gian',
    pieChartTitle: 'Phân Bố Nguồn Truy Cập',
    barChartYAxisTitle: 'Số Lượt Truy Cập',
    barChartSeriesName: 'Lượt Truy Cập',
    barChartColor: '#2196F3',
    pieChartColors: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#E91E63', '#F44336']
  };

  // Chart data cho Doanh Thu
  revenueChartData: ChartData = {
    timeData: {},
    categoryData: {},
    totalCount: 0
  };

  revenueChartConfig: ChartConfig = {
    title: 'Thống Kê Doanh Thu',
    barChartTitle: 'Doanh Thu Theo Thời Gian',
    pieChartTitle: 'Phân Bố Doanh Thu Theo Khóa Học',
    barChartYAxisTitle: 'Doanh Thu (VNĐ)',
    barChartSeriesName: 'Doanh Thu',
    barChartColor: '#FF9800',
    pieChartColors: ['#FF9800', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63', '#F44336']
  };

  async ngOnInit(): Promise<void> {
    await this.loadRegistrationData();
    await this.loadVisitData();
    await this.loadRevenueData();
  }

  async loadRegistrationData(): Promise<void> {
    try {
      await this.userService.getProfile();
      const profile = this.userService.profile();
      
      await this.trackingService.getTrackingBy({
        refCode: profile.phone,
        eventType: 'register',
        pageType: 'DangkyHV'
      });

      const trackingData = this.trackingService.ListTracking();
      
      // Xử lý dữ liệu theo thời gian
      const timeData = trackingData.reduce((acc: any, item: any) => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        acc[formattedDate] = (acc[formattedDate] || 0) + 1;
        return acc;
      }, {});

      // Xử lý dữ liệu theo danh mục (platform)
      const categoryData = trackingData.reduce((acc: any, item: any) => {
        const platform = item.sharePlatform || 'Website';
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
      }, {});

      this.registrationChartData = {
        timeData,
        categoryData,
        totalCount: trackingData.length
      };
    } catch (error) {
      console.error('Error loading registration data:', error);
    }
  }

  async loadVisitData(): Promise<void> {
    try {
      await this.userService.getProfile();
      const profile = this.userService.profile();
      
      await this.trackingService.getTrackingBy({
        refCode: profile.phone,
        eventType: 'page_view'
      });

      const trackingData = this.trackingService.ListTracking();
      
      // Xử lý dữ liệu theo thời gian
      const timeData = trackingData.reduce((acc: any, item: any) => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        acc[formattedDate] = (acc[formattedDate] || 0) + 1;
        return acc;
      }, {});

      // Xử lý dữ liệu theo danh mục (platform)
      const categoryData = trackingData.reduce((acc: any, item: any) => {
        const platform = item.sharePlatform || 'Website';
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
      }, {});

      this.visitChartData = {
        timeData,
        categoryData,
        totalCount: trackingData.length
      };
    } catch (error) {
      console.error('Error loading visit data:', error);
    }
  }

  async loadRevenueData(): Promise<void> {
    // Tạo dữ liệu mẫu cho doanh thu
    // Trong thực tế, bạn sẽ load từ service tương ứng
    
    const sampleTimeData = {
      '10/07/2025': 5000000,
      '11/07/2025': 7500000,
      '12/07/2025': 3200000,
      '13/07/2025': 9800000,
      '14/07/2025': 6400000,
      '15/07/2025': 8100000,
      '16/07/2025': 4700000,
      '17/07/2025': 12000000
    };

    const sampleCategoryData = {
      'Khóa Trang Điểm Chuyên Nghiệp': 45000000,
      'Khóa Chăm Sóc Da Cao Cấp': 32000000,
      'Khóa Nghệ Thuật Làm Móng': 28000000,
      'Khóa Làm Tóc Cơ Bản': 19000000,
      'Khóa Massage': 15000000
    };

    this.revenueChartData = {
      timeData: sampleTimeData,
      categoryData: sampleCategoryData,
      totalCount: Object.values(sampleTimeData).reduce((sum, val) => sum + val, 0)
    };
  }
}
