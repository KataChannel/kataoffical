
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../admin/course/course.service';
import { DoanhsoService } from '../../../../admin/doanhso/doanhso.service';
import { DoanhthuService } from '../../../../admin/doanhthu/doanhthu.service';
import { KhachhangService } from '../../../../admin/khachhang/khachhang.service';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';
import { HoahongService } from '../../../../admin/hoahong/hoahong.service';
import { ThanhtoanhoahongService } from '../../../../admin/thanhtoanhoahong/thanhtoanhoahong.service';
import { LichhenService } from '../../../../admin/lichhen/lichhen.service';
import { KhoahocService } from '../../../../admin/khoahoc/khoahoc.service';

@Component({
  imports: [
    RouterLink, 
    MatIconModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
  ],
  selector: 'app-maindb',
  templateUrl: './maindb.component.html',
  styleUrls: ['./maindb.component.scss']
})

export class MaindbComponent {
  _UserService: UserService = inject(UserService);
  _TrackingService: TrackingService = inject(TrackingService);
  _KhachhangService: KhachhangService = inject(KhachhangService);
  _CourseService: CourseService = inject(CourseService);
  _DoanhsoService: DoanhsoService = inject(DoanhsoService);
  _DoanhthuService: DoanhthuService = inject(DoanhthuService);
  _HoahongService: HoahongService = inject(HoahongService);
  _ThanhtoanhoahongService: ThanhtoanhoahongService = inject(ThanhtoanhoahongService);
  _LichhenService: LichhenService = inject(LichhenService);
  _KhoahocService: KhoahocService = inject(KhoahocService);
  _snackbar: MatSnackBar = inject(MatSnackBar);
  @ViewChild('chart') chart!: ChartComponent;
  profile: any = this._UserService.profile;
  Views: any = this._TrackingService.ListTracking;
  Doanhthu: any = []
  public chartOptions:any = {};
  private chartTypes = ['line', 'bar', 'area'];
  private dataSets = [
    [10, 41, 35, 51, 49, 62, 69],
    [20, 55, 39, 66, 45, 70, 80],
    [15, 30, 45, 60, 50, 65, 75],
  ];
  private currentDataIndex = 0;

  constructor() {
   this.chartOptions = {
      series: [
        {
          name: "Hoa Hồng",
          data: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }
      ],
      chart: {
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val:any) {
          return val + "tr";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12"
        ],
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        crosshairs: {
          fill: {
            type: "solid",
            color: "#B6B6B6"
            // gradient: {
            //   colorFrom: "#D8E3F0",
            //   colorTo: "#BED1E6",
            //   stops: [0, 100],
            //   opacityFrom: 0.4,
            //   opacityTo: 0.5
            // }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "solid",
        color: "#B6B6B6"
        // gradient: {
        //   shade: "light",
        //   type: "horizontal",
        //   shadeIntensity: 0.25,
        //   gradientToColors: undefined,
        //   inverseColors: true,
        //   opacityFrom: 1,
        //   opacityTo: 1,
        //   stops: [50, 0, 100, 100]
        // }
      },
      yaxis: {
        axisBorder: {
          show: false,
          color: "#474747",
          width: 0.1,
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: true,
          formatter: function(val:any) {
            return val + "tr";
          }
        }
      },
      title: {
        text: "Hoa Hồng Tháng (ĐVT: triệu đồng)",
        floating: true,
        offsetY: 0,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
   updateChartType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newType = selectElement.value as 'line' | 'bar' | 'area';
    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        ...this.chartOptions.chart,
        type: newType,
      },
    };
  }
  ListKhoahoc:any = []
// {
//                     name: 'Khóa Học 1',
//                     category: 'Cơ Bản',
//                     sales: 245,
//                     price: 24500000
//                 }, {
//                     name: 'Khóa Học 2',
//                     category: 'Nâng Cao',
//                     sales: 189,
//                     price: 56700000
//                 }, {
//                     name: 'Khóa Học 3',
//                     category: 'Nâng Cao',
//                     sales: 156,
//                     price: 15600000
//                 }, {
//                     name: 'Khóa Học 4',
//                     category: 'Chuyển Sâu',
//                     sales: 132,
//                     price: 39600000
//                 }, {
//                     name: 'Khóa Học 5',
//                     category: 'Nâng Cao',
//                     sales: 124,
//                     price: 12400000
//                 }
  updateData() {
    this.currentDataIndex = (this.currentDataIndex + 1) % this.dataSets.length;
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: `Series ${this.currentDataIndex + 1}`,
          data: this.dataSets[this.currentDataIndex],
        },
      ],
    };
  }
  TotalHoahong: any = 0;
  TotalThanhtoanhoahong: any = 0;
  TotalLichhen: any = 0;
  TotalKhoahoc: any = 0;
  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile()
    await this._TrackingService.getTrackingBy({
        eventType: 'page_view',
        refCode: this.profile().inviteCode,
        isCount: true,
      })
    const listphone = this.profile()?.referrals?.map((item: any) => item.phone);
    // this.Doanhthu = await this._KhachhangService.getKhachhangDoanhthu(listphone);
 
    // if(this.Doanhthu.dichvus.length > 0) {
    //     await this._CourseService.getSyncsCourse(this.Doanhthu.dichvus);
    //     await this._DoanhsoService.getSyncsDoanhso(this.Doanhthu.dichvus);
    //     await this._DoanhthuService.getSyncsDoanhthu(this.Doanhthu.doanhthus);
    //     await this._LichhenService.getSyncsLichhen(this.Doanhthu.lichhens);
    //     await this._KhoahocService.getSyncsKhoahoc(this.Doanhthu.dichvus);
    // }

    this.TotalHoahong = await this._HoahongService.getTotalHoahongByUserId(this.profile().id);
    this.TotalThanhtoanhoahong = await this._ThanhtoanhoahongService.getTotalThanhtoanhoahongByUserId(this.profile().id);
    this.TotalLichhen = await this._LichhenService.getTotalLichhenByUserId(this.profile().id);
    this.TotalKhoahoc = await this._KhoahocService.getTotalKhoahocByUserId(this.profile().id);

    // console.log('TotalLichhen',this.TotalLichhen);
    // console.log('TotalKhoahoc',this.TotalKhoahoc);
    // console.log('TotalThanhtoanhoahong',this.TotalThanhtoanhoahong);
    // console.log('TotalHoahong',this.TotalHoahong);
    
    // Uncomment the following line if you want to fetch doanhthu by doanhthus
    // await this._DoanhthuService.getDoanhthuBy(this.Doanhthu.doanhthus);
  }
}
