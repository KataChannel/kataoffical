import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { HoahongService } from '../../../../admin/hoahong/hoahong.service';

@Component({
  selector: 'app-hoahong',
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
  templateUrl: './hoahong.component.html',
  styleUrl: './hoahong.component.scss'
})
export class HoahongComponent {
  displayedColumns: string[] = ['courseName', 'registrations', 'conversionRate', 'source'];
  dataSource = [
    { courseName: 'Khóa Trang Điểm Chuyên Nghiệp', registrations: 500, conversionRate: '16%', source: 'Facebook' },
    { courseName: 'Khóa Chăm Sóc Da Cao Cấp', registrations: 350, conversionRate: '12%', source: 'Website' },
    { courseName: 'Khóa Nghệ Thuật Làm Móng', registrations: 250, conversionRate: '10%', source: 'Instagram' }
  ];

  // Bar Chart Data
  barChartSeries: any[] = [
    {
      name: 'Lượt Đăng Ký',
      data: [100, 130, 160, 180, 200, 230]
    }
  ];

  barChartOptions: Partial<any> = {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#4CAF50'],
    xaxis: {
      categories: ['Tháng 1/2025', 'Tháng 2/2025', 'Tháng 3/2025', 'Tháng 4/2025', 'Tháng 5/2025', 'Tháng 6/2025'],
      title: { text: 'Tháng' }
    },
    yaxis: {
      title: { text: 'Số Lượt Đăng Ký' },
      min: 0
    },
    title: {
      text: 'Lượt Đăng Ký Theo Thời Gian',
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
    labels: ['Website', 'Facebook', 'Instagram', 'Referral'],
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
    title: {
      text: 'Phân Bố Nguồn Đăng Ký',
      align: 'center'
    },
    legend: {
      position: 'bottom'
    }
  };
  _UserService: UserService = inject(UserService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _HoahongService: HoahongService = inject(HoahongService);
  profile: any = this._UserService.profile;
  Hoahongs:any  = {data: []};
  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile()
     this.Hoahongs = await this._HoahongService.SearchBy({userId:this.profile()?.id,pageSize:9999})
    console.log('Hoahongs:', this.Hoahongs);
  }
}
