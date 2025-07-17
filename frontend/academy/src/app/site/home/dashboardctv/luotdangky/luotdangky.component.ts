import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {NgApexchartsModule} from 'ng-apexcharts';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';

@Component({
  selector: 'app-luotdangky',
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
    CommonModule
  ],
  templateUrl: './luotdangky.component.html',
  styleUrls: ['./luotdangky.component.scss']
})
export class LuotdangkyComponent implements OnInit {
  // Table data
  displayedColumns: string[] = ['campaignName', 'registrations', 'conversionRate', 'platform'];
  startDay: Date = new Date(new Date().setDate(new Date().getDate() - 7)); // 7 days ago
  endDay: Date = new Date();
  
  // Inject ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);
  
  // Bar Chart Data
  barChartSeries: any[] = [
    {
      name: 'Lượt Đăng Ký Thành Công',
      data: []
    }
  ];

  barChartOptions: Partial<any> = {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#4CAF50'],
    xaxis: {
      categories: [],
      title: { text: 'Ngày' }
    },
    yaxis: {
      title: { text: 'Số Lượt Đăng Ký' },
      min: 0
    },
    title: {
      text: 'Lượt Đăng Ký Thành Công Theo Thời Gian',
      align: 'center'
    },
    legend: {
      position: 'top'
    }
  };

  // Pie Chart Data
  pieChartSeries: number[] = [40, 30, 20, 10];

  pieChartOptions: Partial<any> = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: ['Website', 'TikTok', 'Facebook', 'Email'],
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
    title: {
      text: 'Phân Bố Nguồn Đăng Ký',
      align: 'center'
    },
    legend: {
      position: 'bottom'
    }
  };

  updateChartData(): void {
    // Generate date range from startDay to endDay
    const dateRange: string[] = [];
    const data: number[] = [];
    
    const currentDate = new Date(this.startDay);
    const end = new Date(this.endDay);
    
    while (currentDate <= end) {
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
      dateRange.push(formattedDate);
      data.push(this.ThoigianDangky[formattedDate] || 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Update chart options and series
    this.barChartOptions = {
      ...this.barChartOptions,
      xaxis: {
        ...this.barChartOptions['xaxis'],
        categories: dateRange
      }
    };
    
    this.barChartSeries = [
      {
        name: 'Lượt Đăng Ký Thành Công',
        data: data
      }
    ];
    
    // Update pie chart data from ListTracking sharePlatform
    this.updatePieChartData();
    
    // Trigger change detection
    this.cdr.detectChanges();
  }

  updatePieChartData(): void {
    // Count registrations by sharePlatform
    const platformCount = this.ListTracking().reduce((acc, item) => {
      const platform = item.sharePlatform || 'Website';
      if (acc[platform]) {
        acc[platform]++;
      } else {
        acc[platform] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    // Extract labels and data
    const labels = Object.keys(platformCount);
    const data = Object.values(platformCount) as number[];

    // Define colors for different platforms
    const colorMap: { [key: string]: string } = {
      'Website': '#4CAF50',
      'TikTok': '#2196F3',
      'Facebook': '#FF9800',
      'Email': '#9C27B0',
      'Instagram': '#E91E63',
      'YouTube': '#F44336',
      'Twitter': '#00BCD4',
      'LinkedIn': '#3F51B5'
    };

    // Generate colors based on platforms
    const colors = labels.map(label => colorMap[label] || '#9E9E9E');

    // Update pie chart data
    this.pieChartSeries = data;
    this.pieChartOptions = {
      ...this.pieChartOptions,
      labels: labels,
      colors: colors
    };
  }
  
  _TrackingService:TrackingService = inject(TrackingService);
  _UserService:UserService = inject(UserService);
  profile = this._UserService.profile;
  ListTracking = this._TrackingService.ListTracking;
  Tongdangky:number = 0;
  ThoigianDangky:any = {};
  
  constructor() {
    effect(async () => {
       try {
         await this._UserService.getProfile();
         await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'register',pageType:'DangkyHV'});
         this.Tongdangky = this.ListTracking().length;        
         
         this.ThoigianDangky = this.ListTracking().reduce((acc, item) => {
          const date = new Date(item.createdAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
          if (acc[formattedDate]) {
            acc[formattedDate]++;
          } else {
            acc[formattedDate] = 1;
          }
          return acc;
        }, {} as { [key: string]: number });
        
        // Use setTimeout to ensure data is ready before updating chart
        setTimeout(() => {
          this.updateChartData();
        }, 100);
       } catch (error) {
         console.error('Error loading data:', error);
       }
    });
  }
  
  ngOnInit(): void {
    // Initialize chart with empty data
    this.updateChartData();
  }
}
