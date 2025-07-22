// import { Component, inject } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { DonhangService } from '../donhang/donhang.service';
// import { SearchService } from '../../shared/services/search.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { DashboardblockComponent } from './dashboardblock/dashboardblock.component';
// import { ChartOptions, RevenuechartComponent } from './revenuechart/revenuechart.component';
// import { DashboardService } from './dashboard.services';
// @Component({
//   selector: 'app-dashboard',
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     CommonModule,
//     MatButtonModule,
//     MatIconModule,
//     MatMenuModule,
//     DashboardblockComponent,
//     RevenuechartComponent
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent {
//    _PhieugiaohangService: DonhangService = inject(DonhangService);
//    _DashboardService: DashboardService = inject(DashboardService);
//    _SearchService: SearchService = inject(SearchService);
//   selectedFile!: File;
//   ketqua:any = [];
//   isLoading = false; // Biến để kiểm tra trạng thái loading
//   uploadMessage = ''; // Hiển thị thông báo sau khi upload
//   public sampleAreaChartOptions: ChartOptions;
//   public sampleAreaChartOptions2: ChartOptions;
//   public sampleSeriesData: ApexAxisChartSeries;
//   public sampleCategories: string[];
//   public donhangSummary: any = null;
//   public statusChartOptions!: ChartOptions;
//   constructor() {
//     // ---- Ví dụ 1: Truyền toàn bộ cấu hình qua chartOptions ----
//     this.sampleAreaChartOptions = {
//       series: [
//         {
//           name: "Doanh số Miền Bắc",
//           data: this.generateRandomData(12) // Hàm tạo dữ liệu ngẫu nhiên ví dụ
//         },
//         {
//           name: "Doanh số Miền Nam",
//           data: this.generateRandomData(12)
//         }
//       ],
//       chart: {
//         height: 400,
//         type: "area",
//         // Thêm các tùy chỉnh khác ở đây nếu muốn
//         events: {
//           // Ví dụ xử lý sự kiện click vào điểm dữ liệu
//           dataPointSelection: (event, chartContext, config) => {
//              console.log("Click vào điểm:", config.w.globals.labels[config.dataPointIndex], config.w.globals.series[config.seriesIndex][config.dataPointIndex]);
//           }
//         }
//       },
//       dataLabels: { enabled: false },
//       stroke: { curve: "smooth", width: 3 },
//       xaxis: {
//         type: "category", // Dùng category cho các tháng
//         categories: [
//           "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
//           "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
//         ]
//       },
//       yaxis: {
//         title: { text: 'Triệu đồng' },
//         min: 0 // Bắt đầu trục Y từ 0
//       },
//       tooltip: {
//         x: {
//           format: "MMMM" // Chỉ hiển thị tên tháng trong tooltip
//         },
//         y: {
//           formatter: function (val) {
//             return val + " triệu"; // Định dạng giá trị tooltip trục Y
//           }
//         }
//       },
//       title: {
//         text: "Biểu đồ Doanh số Vùng Miền Năm 2025",
//         align: "center",
//         style: { fontSize: '16px', fontWeight: 'bold', color: '#263238'}
//       },
//       legend: { position: 'top'}
//     };

//     // ---- Ví dụ 2: Truyền dữ liệu qua các Input riêng lẻ ----
//     this.sampleSeriesData = [
//        { name: 'Lưu lượng truy cập', data: this.generateRandomData(7, 1000, 5000) }
//     ];
//     this.sampleCategories = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

//     // Cũng có thể tạo một ChartOptions riêng cho ví dụ 2 nếu muốn tùy chỉnh sâu hơn
//     this.sampleAreaChartOptions2 = {
//       series: this.sampleSeriesData,
//       xaxis: { categories: this.sampleCategories },
//       yaxis: { title: { text: 'Lượt truy cập'}},
//       title: { text: 'Truy cập Website Tuần Này' },
//       chart: { height: 300, type: 'area' },
//       // Các cấu hình khác sẽ lấy từ mặc định của component con
//     };

//   }

//   // Hàm tiện ích tạo dữ liệu ngẫu nhiên (chỉ để minh họa)
//   generateRandomData(count: number, min = 10, max = 100): number[] {
//     const data: number[] = [];
//     for (let i = 0; i < count; i++) {
//       data.push(Math.floor(Math.random() * (max - min + 1)) + min);
//     }
//     return data;
//   }

//   // Hàm tiện ích để format số liệu
//   getPercentageChangeColor(): string {
//     if (!this.donhangSummary?.summary?.percentageChange) return '#6B7280';
//     return this.donhangSummary.summary.percentageChange >= 0 ? '#10B981' : '#EF4444';
//   }

//   getPercentageChangeIcon(): string {
//     if (!this.donhangSummary?.summary?.percentageChange) return 'trending_flat';
//     return this.donhangSummary.summary.percentageChange >= 0 ? 'trending_up' : 'trending_down';
//   }

//   // Hàm ví dụ để thay đổi dữ liệu sau một khoảng thời gian
//   updateChartData(): void {
//     console.log("Cập nhật dữ liệu biểu đồ 1...");
//     // Tạo dữ liệu mới
//     const newSeries = [
//       { name: "Doanh số Miền Bắc", data: this.generateRandomData(12) },
//       { name: "Doanh số Miền Nam", data: this.generateRandomData(12) }
//     ];
//     // Gán lại vào object options. Angular sẽ phát hiện thay đổi và truyền xuống component con
//     // Quan trọng: Tạo một object mới để Angular change detection hoạt động hiệu quả
//     this.sampleAreaChartOptions = {
//       ...this.sampleAreaChartOptions, // Giữ lại các cấu hình khác
//       series: newSeries // Chỉ cập nhật series
//     };
//   }

//   // Cập nhật biểu đồ trạng thái đơn hàng
//   updateStatusChart(): void {
//     if (!this.donhangSummary?.summary?.statusCounts) return;

//     const statusLabels = this.donhangSummary.summary.statusCounts.map((item: any) => {
//       const statusNames: { [key: string]: string } = {
//         'dadat': 'Đã đặt',
//         'dagiao': 'Đã giao',
//         'danhan': 'Đã nhận',
//         'huy': 'Đã hủy',
//         'hoanthanh': 'Hoàn thành'
//       };
//       return statusNames[item.status] || item.status;
//     });

//     const statusData = this.donhangSummary.summary.statusCounts.map((item: any) => item.count);

//     this.statusChartOptions = {
//       series: statusData,
//       chart: {
//         type: 'donut',
//         height: 300
//       },
//       labels: statusLabels,
//       title: {
//         text: 'Phân bố trạng thái đơn hàng',
//         align: 'center',
//         style: { fontSize: '16px', fontWeight: 'bold', color: '#263238'}
//       },
//       colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
//       legend: {
//         position: 'bottom'
//       },
//       plotOptions: {
//         pie: {
//           donut: {
//             size: '65%',
//             labels: {
//               show: true,
//               total: {
//                 show: true,
//                 label: 'Tổng',
//                 formatter: () => this.donhangSummary?.total?.toString() || '0'
//               }
//             }
//           }
//         }
//       }
//     };
//   }

//   // Cập nhật biểu đồ xu hướng đơn hàng
//   updateTrendChart(): void {
//     if (!this.donhangSummary?.summary) return;

//     const currentCount = this.donhangSummary.summary.totalCount;
//     const previousCount = this.donhangSummary.summary.previousCount;
//     const percentageChange = this.donhangSummary.summary.percentageChange;

//     this.sampleAreaChartOptions2 = {
//       series: [
//         {
//           name: 'Kỳ hiện tại',
//           data: [currentCount]
//         },
//         {
//           name: 'Kỳ trước',
//           data: [previousCount]
//         }
//       ],
//       chart: {
//         type: 'bar',
//         height: 300
//       },
//       xaxis: {
//         categories: ['Số đơn hàng']
//       },
//       yaxis: {
//         title: { text: 'Số lượng đơn hàng' }
//       },
//       title: {
//         text: `Xu hướng đơn hàng (${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(1)}%)`,
//         align: 'center',
//         style: { 
//           fontSize: '16px', 
//           fontWeight: 'bold', 
//           color: percentageChange >= 0 ? '#27AE60' : '#E74C3C'
//         }
//       },
//       colors: ['#3498DB', '#95A5A6'],
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '55%',
//         },
//       },
//       dataLabels: {
//         enabled: true
//       }
//     };
//   }

  
//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0]; // Lấy file từ input
//     this.uploadMessage = ''; // Reset thông báo cũ
//     this.uploadFile()
//   }

//   async uploadFile() {
//     if (!this.selectedFile) {
//       alert('Chọn file trước khi upload!');
//       return;
//     }
//     this.isLoading = true; // Bắt đầu loading
//     this.uploadMessage = '';

//     const formData = new FormData();
//     formData.append('file', this.selectedFile); // 'file' phải khớp với tên bên NestJS
  
//     try {
//       const response = await fetch(`${environment.APIURL}/googledrive/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Lỗi upload: ${response.statusText}`);
//       }

//       const data = await response.json();
//       this.ketqua  = data.jsonData;
//       // const query = {
//       //   "model": "donhang",
//       //   "filters": {
//       //     "madonhang": { "value": value, "type": "contains" }
//       //   },
//       //   "relations": {
//       //     "banggia": {
//       //       "include": true
//       //     }
//       //   },
//       //   "orderBy": { "field": "createdAt", "direction": "desc" },
//       //   "take": 10
//       // };
//       // await this._SearchService.Search(query).then((data) => {
//       //   this.filterKhachhang = data;
//       // });
//       this.uploadMessage = 'Upload thành công!';
//       console.log('Upload thành công', data);
//     } catch (error) {
//       this.uploadMessage = 'Lỗi khi upload file!';
//       console.error('Lỗi upload file', error);
//     } finally {
//       this.isLoading = false; // Dừng loading dù có lỗi hay không
//     }
//   }
//   async ngOnInit() {
//    const DonhangSumary = await this._DashboardService.DonhangDashboard({ Batdau: new Date(), Ketthuc: new Date()})
//     console.log('DonhangSumary', DonhangSumary);
//     this.donhangSummary = DonhangSumary;
    
//     // Cập nhật biểu đồ trạng thái đơn hàng
//     this.updateStatusChart();
    
//     // Cập nhật biểu đồ xu hướng
//     this.updateTrendChart();
//       // const query = {
//       //   "model": "donhang",
//       //   "filters": {
//       //     "madonhang": { "value": value, "type": "contains" }
//       //   },
//       //   "relations": {
//       //     "banggia": {
//       //       "include": true
//       //     }
//       //   },
//       //   "orderBy": { "field": "createdAt", "direction": "desc" },
//       //   "take": 10
//       // };
//       // await this._SearchService.Search(query)
    
//   }
// }
