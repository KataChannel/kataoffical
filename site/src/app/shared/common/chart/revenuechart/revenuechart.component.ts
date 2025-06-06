import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';

import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

export type ChartOptions = Partial<{
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  yaxis: ApexYAxis | ApexYAxis[]; // Có thể là một hoặc nhiều trục Y
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
}>;
@Component({
  selector: 'app-revenuechart',
  imports: [
    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule
],
  templateUrl: './revenuechart.component.html',
  styleUrls: ['./revenuechart.component.scss'],
})
export class RevenuechartComponent {
  @ViewChild("chart") chartInstance: ChartComponent | undefined;
  @Input() chartOptions: ChartOptions = {};
  @Input() seriesData: ApexAxisChartSeries = [];
  @Input() categories: any[] = [];
  @Input() chartHeight: string | number = 350; // Chiều cao mặc định
  @Input() chartTitle: string = '';
  @Input() title: string = 'Tiêu Đề';
  public finalChartOptions: ChartOptions;
  constructor() {
    this.finalChartOptions = this.getDefaultOptions();
  }
  startDate: string = new Date().toISOString().split('T')[0]; // Ngày bắt đầu
  endDate: string = new Date().toISOString().split('T')[0]; // Ngày kết thúc
  applyDateRange(menu:any){
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    menu.closeMenu();
  }
  ngOnInit(): void {
    // ngOnInit chạy một lần sau khi các @Input được gán lần đầu
    this.prepareChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {

    // Kiểm tra xem các Input liên quan có thay đổi không
    if (changes['chartOptions'] || changes['seriesData'] || changes['categories'] || changes['chartHeight'] || changes['chartTitle']) {
       this.prepareChartOptions();
    }
  }

  private getDefaultOptions(): ChartOptions {
    return {
      series: [{
        name: 'Dữ liệu Mặc định',
        data: []
      }],
      chart: {
        type: 'area', // Quan trọng: Loại biểu đồ là area
        height: this.chartHeight,
        zoom: {
          enabled: false // Tắt zoom mặc định cho gọn
        },
        toolbar: {
          show: true // Hiển thị thanh công cụ (download, zoom...)
        }
      },
      dataLabels: {
        enabled: false // Tắt nhãn dữ liệu trên các điểm cho đỡ rối
      },
      stroke: {
        curve: 'smooth', // Vẽ đường cong mượt mà
        width: 2
      },
      xaxis: {
        // type: 'datetime', // Phổ biến cho area chart theo thời gian
        categories: []
      },
      yaxis: {
        title: {
          text: 'Giá trị'
        }
      },
      tooltip: {
        // x: {
        //   format: 'dd MMM yyyy' // Định dạng hiển thị tooltip trục X (nếu là datetime)
        // }
      },
      fill: {
        type: 'gradient', // Tô màu kiểu gradient cho đẹp
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      title: {
        text: 'Biểu đồ Area',
        align: 'left'
      },
      legend: {
         position: 'top',
         horizontalAlign: 'right',
         floating: true,
         offsetY: -25,
         offsetX: -5
      }
    };
  }

  // Hàm chuẩn bị cấu hình cuối cùng dựa trên Input
  private prepareChartOptions(): void {
    // Ưu tiên lấy chartOptions từ Input nếu có và nó không phải là object rỗng
    if (this.chartOptions && Object.keys(this.chartOptions).length > 0) {
      // Kiểm tra và đảm bảo các thuộc tính cơ bản tồn tại nếu cần
      this.finalChartOptions = {
        ...this.getDefaultOptions(), // Lấy mặc định làm nền
        ...this.chartOptions // Ghi đè bằng cấu hình từ cha
      };
      this.finalChartOptions.xaxis = { ...this.getDefaultOptions().xaxis, ...this.chartOptions.xaxis };
      // ... tương tự cho các thuộc tính khác nếu muốn merge sâu hơn
    } else {
      // Nếu không có chartOptions hoặc nó rỗng, xây dựng từ các Input riêng lẻ
      const defaultOpts = this.getDefaultOptions();
      this.finalChartOptions = {
        ...defaultOpts, // Bắt đầu với mặc định
        series: this.seriesData && this.seriesData.length > 0 ? this.seriesData : defaultOpts.series,
        chart: {
          ...defaultOpts.chart,
          height: this.chartHeight || defaultOpts.chart?.height, // Cập nhật chiều cao
          type: defaultOpts.chart?.type || 'area' // Đảm bảo luôn có giá trị type hợp lệ
        },
        xaxis: {
          ...defaultOpts.xaxis,
          categories: this.categories && this.categories.length > 0 ? this.categories : defaultOpts.xaxis?.categories // Cập nhật categories
        },
        title: {
          ...defaultOpts.title,
          text: this.chartTitle || defaultOpts.title?.text // Cập nhật tiêu đề
        }
      };
    }

    // Kiểm tra lại lần cuối, ví dụ nếu không có series thì phải gán cái gì đó để không lỗi
    if (!this.finalChartOptions.series || this.finalChartOptions.series.length === 0) {
        this.finalChartOptions.series = [{ name: 'Không có dữ liệu', data: [] }];
    }
  }
}
