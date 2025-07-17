import { Component, effect, inject } from '@angular/core';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-luottruycap',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './luottruycap.component.html',
  styleUrl: './luottruycap.component.scss'
})
export class LuottruycapComponent {
  _TrackingService:TrackingService = inject(TrackingService);
  _UserService:UserService = inject(UserService);
  profile = this._UserService.profile;
  ListTracking = this._TrackingService.ListTracking;
  Unique:any = 0
  BounceRate:any = 0
  groupedByPlatform:any[]=[]
  groupByPages:any[]=[]
  constructor() {
    effect(async () => {
       await this._UserService.getProfile();
       await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'page_view'});
    });
  }
  async ngOnInit(): Promise<void> {
    await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'page_view'});
    console.log(this.ListTracking());
    this.Unique = this.ListTracking().reduce((acc, item) => {
      if (!acc.includes(item.ipAddress)) {
        acc.push(item.ipAddress);
      }
      return acc;
    }
    , []).length;
    console.log('Unique IPs:', this.Unique);
    this.BounceRate = this.calculateBounceRate(this.ListTracking());
    console.log('Bounce Rate:', this.BounceRate);

    const totalCount = this.ListTracking().length;
    const groupedData = this.ListTracking().reduce((acc, item) => {
      const platform = item.sharePlatform || 'Unknown';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.groupedByPlatform = Object.entries(groupedData as Record<string, number>).reduce((acc, [platform, count]: [string, number]) => {
      acc.push({
        key: platform,
        value: {
          count,
          ratio: totalCount ? ((count / totalCount) * 100).toFixed(2) + '%' : '0%'
        }
      });
      return acc;
    }, [] as { key: string; value: { count: number; ratio: string } }[]);

    const groupedPages = this.ListTracking().reduce((acc, item) => {
      const pageIdentifier = item.pageIdentifier || 'Unknown';
      acc[pageIdentifier] = (acc[pageIdentifier] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.groupByPages = Object.entries(groupedPages).map(([pageIdentifier, count]) => ({
      pageIdentifier,
      count
    }));
    console.log('Tracking events grouped by pages:', this.groupByPages);
    console.log('Tracking events grouped by sharePlatform with counts and ratios:', this.groupedByPlatform);
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
            (eventTime.getTime() - lastEventTime.getTime() <= sessionTimeout && isSameUser(event, events[currentSession[0]]))
        ) {
            // Thêm vào session hiện tại
            currentSession.push(events.indexOf(event));
        } else {
            // Kết thúc session hiện tại và bắt đầu session mới
            sessions.push(currentSession);
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
