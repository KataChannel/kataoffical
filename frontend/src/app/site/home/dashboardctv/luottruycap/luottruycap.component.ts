import { Component, effect, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-luottruycap',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    NgApexchartsModule
  ],
  templateUrl: './luottruycap.component.html',
  styleUrl: './luottruycap.component.scss'
})
export class LuottruycapComponent implements OnInit {
  _TrackingService:TrackingService = inject(TrackingService);
  _UserService:UserService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  
  profile = this._UserService.profile;
  ListTracking = this._TrackingService.ListTracking;
  Unique:any = 0
  BounceRate:any = 0
  groupedByPlatform:any[]=[]
  groupByPages:any[]=[]
  startDay: Date = new Date(new Date().setDate(new Date().getDate() - 7)); // 7 days ago
  endDay: Date = new Date();
  ThoigianTruycap:any = {};

  barChartSeries: any[] = [
    {
      name: 'Lượt Truy Cập',
      data: []
    }
  ];

  barChartOptions: Partial<any> = {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#2196F3'],
    xaxis: {
      categories: [],
      title: { text: 'Ngày' }
    },
    yaxis: {
      title: { text: 'Số Lượt Truy Cập' },
      min: 0
    },
    title: {
      text: 'Lượt Truy Cập Theo Thời Gian',
      align: 'center'
    },
    legend: {
      position: 'top'
    }
  };

  // Pie Chart Data for Platform Distribution
  pieChartSeries: number[] = [];
  pieChartOptions: Partial<any> = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: [],
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336'],
    title: {
      text: 'Phân Bố Nguồn Truy Cập',
      align: 'center'
    },
    legend: {
      position: 'bottom'
    }
  };

  constructor() {
    effect(async () => {
       try {
         await this._UserService.getProfile();
         await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'page_view'});
         
         // Process data after getting tracking info
         this.processTrackingData();
         
         // Update charts
         setTimeout(() => {
           this.updateChartData();
         }, 100);
       } catch (error) {
         console.error('Error loading tracking data:', error);
       }
    });
  }

  async ngOnInit(): Promise<void> {
    // Initialize chart with empty data
    this.updateChartData();
  }

  processTrackingData(): void {
    const trackingData = this.ListTracking();
    
    // Calculate unique visitors
    this.Unique = trackingData.reduce((acc, item) => {
      if (!acc.includes(item.ipAddress)) {
        acc.push(item.ipAddress);
      }
      return acc;
    }, []).length;

    // Calculate bounce rate
    this.BounceRate = this.calculateBounceRate(trackingData);

    // Group by time (for chart)
    this.ThoigianTruycap = trackingData.reduce((acc, item) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      if (acc[formattedDate]) {
        acc[formattedDate]++;
      } else {
        acc[formattedDate] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    // Group by platform
    const totalCount = trackingData.length;
    const groupedData = trackingData.reduce((acc, item) => {
      const platform = item.sharePlatform || 'Website';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.groupedByPlatform = Object.entries(groupedData).map(([platform, count]:any) => ({
      key: platform,
      value: {
        count,
        ratio: totalCount ? ((count / totalCount) * 100).toFixed(2) + '%' : '0%'
      }
    }));

    // Group by pages
    const groupedPages = trackingData.reduce((acc, item) => {
      const pageIdentifier = item.pageIdentifier || 'Unknown';
      acc[pageIdentifier] = (acc[pageIdentifier] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.groupByPages = Object.entries(groupedPages).map(([pageIdentifier, count]) => ({
      pageIdentifier,
      count
    }));
  }

  updateChartData(): void {
    // Generate date range from startDay to endDay
    const dateRange: string[] = [];
    const data: number[] = [];
    
    const currentDate = new Date(this.startDay);
    const end = new Date(this.endDay);
    
    while (currentDate <= end) {
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
      dateRange.push(formattedDate);
      data.push(this.ThoigianTruycap[formattedDate] || 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Update bar chart options and series
    this.barChartOptions = {
      ...this.barChartOptions,
      xaxis: {
        ...this.barChartOptions['xaxis'],
        categories: dateRange
      }
    };
    
    this.barChartSeries = [
      {
        name: 'Lượt Truy Cập',
        data: data
      }
    ];

    // Update pie chart data
    this.updatePieChartData();
    
    // Trigger change detection
    this.cdr.detectChanges();
  }

  updatePieChartData(): void {
    if (this.groupedByPlatform.length > 0) {
      const labels = this.groupedByPlatform.map(item => item.key);
      const data = this.groupedByPlatform.map(item => item.value.count);
      
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

      const colors = labels.map(label => colorMap[label] || '#9E9E9E');

      this.pieChartSeries = data;
      this.pieChartOptions = {
        ...this.pieChartOptions,
        labels: labels,
        colors: colors
      };
    }
  }

  calculateBounceRate(events:any) {
    // Sắp xếp sự kiện theo thời gian tạo
    events.sort((a:any, b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    // Nhóm sự kiện thành các session
    const sessions:any = [];
    let currentSession:any = [];
    let lastEventTime:any = null;
    const sessionTimeout = 30 * 60 * 1000; // 30 phút tính bằng milliseconds

    // Hàm kiểm tra xem sự kiện có thuộc cùng user không
    const isSameUser = (event1:any, event2:any) => {
        return event1.ipAddress === event2.ipAddress && event1.userAgent === event2.userAgent;
    };

    events.forEach((event:any) => {
        const eventTime = new Date(event.createdAt);
        if (
            !lastEventTime ||
            (eventTime.getTime() - lastEventTime.getTime() <= sessionTimeout && 
             currentSession.length > 0 && isSameUser(event, events[currentSession[0]]))
        ) {
            // Thêm vào session hiện tại
            currentSession.push(events.indexOf(event));
        } else {
            // Kết thúc session hiện tại và bắt đầu session mới
            if (currentSession.length > 0) {
                sessions.push(currentSession);
            }
            currentSession = [events.indexOf(event)];
        }

        lastEventTime = eventTime;
    });

    // Đừng quên thêm session cuối cùng
    if (currentSession.length > 0) {
        sessions.push(currentSession);
    }

    // Đếm số session bị bounce (chỉ có 1 page view)
    const bouncedSessions = sessions.filter((session:any) => session.length === 1).length;
    const totalSessions = sessions.length;

    // Tính bounce rate
    const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;

    return {
        totalSessions,
        bouncedSessions,
        bounceRate: bounceRate.toFixed(2) // Làm tròn đến 2 chữ số thập phân
    };
  }
}
