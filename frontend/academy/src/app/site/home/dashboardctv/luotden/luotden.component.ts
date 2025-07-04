import { Component, inject } from '@angular/core';
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
    CommonModule
  ],
  templateUrl: './luotden.component.html',
  styleUrl: './luotden.component.scss'
})
export class LuotdenComponent {
  displayedColumns: string[] = ['branchName', 'appointments', 'successRate', 'source'];
  dataSource = [
    { branchName: 'Chi Nhánh Hà Nội', appointments: 600, successRate: '18%', source: 'Online' },
    { branchName: 'Chi Nhánh TP.HCM', appointments: 450, successRate: '14%', source: 'Phone' },
    { branchName: 'Chi Nhánh Đà Nẵng', appointments: 300, successRate: '12%', source: 'Walk-in' }
  ];

  // Bar Chart Data
  barChartSeries: any[] = [
    {
      name: 'Lượt Hẹn Đến',
      data: [150, 180, 200, 220, 250, 300]
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
      title: { text: 'Số Lượt Hẹn' },
      min: 0
    },
    title: {
      text: 'Lượt Hẹn Đến Theo Thời Gian',
      align: 'center'
    },
    legend: {
      position: 'top'
    }
  };

  // Pie Chart Data
  pieChartSeries: number[] = [45, 30, 15, 10];

  pieChartOptions: Partial<any> = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: ['Online', 'Phone', 'Walk-in', 'Referral'],
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
    title: {
      text: 'Phân Bố Nguồn Hẹn',
      align: 'center'
    },
    legend: {
      position: 'bottom'
    }
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
    this.Lichhens.Thanhcong = this.Lichhens.data.filter((item: any) => item.isCancel ===false).length;
    this.Lichhens.Tonglich = this.Lichhens.data.length;
    this.Lichhens.Chinhanh = [...new Set(this.Lichhens.data.map((item: any) => item.branchName))].length;
    // this.Doanhthu = await this._KhachhangService.getKhachhangDoanhthu({listphone: listphone});
    // console.log('Doanhthu:', this.Doanhthu);
    
    // if(this.Doanhthu.dichvus.length > 0) {
    //     await this._CourseService.getSyncsCourse(this.Doanhthu.dichvus);
    //     await this._DoanhsoService.getSyncsDoanhso(this.Doanhthu.dichvus);
    //     await this._DoanhthuService.getSyncsDoanhthu(this.Doanhthu.doanhthus);    
    // }
  }
}