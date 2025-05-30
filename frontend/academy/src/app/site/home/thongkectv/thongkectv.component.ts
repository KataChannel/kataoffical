import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TrackingService } from '../../../admin/tracking/tracking.service';
import { UserService } from '../../../admin/user/user.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-thongkectv',
  imports: [
    // RouterLink, 
    MatIconModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './thongkectv.component.html',
  styleUrl: './thongkectv.component.scss'
})
export class ThongkectvComponent {
  profile: any = signal<any>({});
  Views: any = signal<any>(0);
  _UserService: UserService = inject(UserService);
  _TrackingService: TrackingService = inject(TrackingService);
  _snackbar: MatSnackBar = inject(MatSnackBar);
  @ViewChild('chart') chart!: ChartComponent;
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
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 350,
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
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val:any) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
  async ngOnInit(): Promise<void> {
    await this._UserService.getProfile().then((res: any) => {
      console.log(res);
      this.profile.set(res);
    });
    await this._TrackingService
      .getTrackingBy({
        eventType: 'page_view',
        refCode: this.profile().inviteCode,
        isCount: true,
      })
      .then((res: any) => {
        this.Views.set(res.count);
      });
  }
}
