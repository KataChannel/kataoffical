import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {NgApexchartsModule} from 'ng-apexcharts';
@Component({
  selector: 'app-luotdangky',
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    NgApexchartsModule
  ],
  templateUrl: './luotdangky.component.html',
  styleUrls: ['./luotdangky.component.scss']
})
export class LuotdangkyComponent implements OnInit {
  // Table data
  displayedColumns: string[] = ['campaignName', 'registrations', 'conversionRate', 'platform'];
  dataSource = new MatTableDataSource([
    { campaignName: 'Khuyến Mãi Mùa Hè', registrations: 450, conversionRate: '15%', platform: 'TikTok' },
    { campaignName: 'Quay Lại Trường Học', registrations: 320, conversionRate: '10%', platform: 'Website' },
    { campaignName: 'Khuyến Mãi Lễ Hội', registrations: 280, conversionRate: '12%', platform: 'Facebook' }
  ]);

  // Bar Chart Data
  barChartSeries: any[] = [
    {
      name: 'Lượt Đăng Ký Thành Công',
      data: [120, 150, 180, 200, 220, 250]
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

  ngOnInit(): void {}

}
