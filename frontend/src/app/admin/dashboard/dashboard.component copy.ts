// import { Component, inject, OnInit } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { DonhangService } from '../donhang/donhang.service';
// import { SearchService } from '../../shared/services/search.service';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { DashboardService } from './dashboard.services';

// @Component({
//   selector: 'app-dashboard',
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     FormsModule,
//     CommonModule,
//     MatButtonModule,
//     MatCardModule,
//     MatIconModule,
//     MatMenuModule
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   _PhieugiaohangService: DonhangService = inject(DonhangService);
//   _DashboardService: DashboardService = inject(DashboardService);
//   _SearchService: SearchService = inject(SearchService);
  
//   selectedFile!: File;
//   ketqua: any = [];
//   isLoading = false;
//   uploadMessage = '';
//   public dashboardData: any = null;
  
//   // Date range properties
//   batdau: Date = new Date();
//   ketthuc: Date = new Date();
  
//   // Chart data cho TailwindCSS
//   public chartData: any = {
//     productChart: [],
//     comparisonChart: [],
//     topProducts: []
//   };

//   constructor() {
//     // Set default dates (last 30 days)
//     this.ketthuc = new Date();
//     this.batdau = new Date();
//     this.batdau.setDate(this.batdau.getDate() - 30);
//   }

//   async ngOnInit() {
//     await this.loadDashboardData();
//   }

//   // Load dashboard data method
//   async loadDashboardData() {
//     this.isLoading = true;
//     try {
//       const dashboardResult = await this._DashboardService.DonhangDashboard({ 
//         Batdau: this.batdau, 
//         Ketthuc: this.ketthuc 
//       });
//       console.log('Dashboard Data:', dashboardResult);
//       this.dashboardData = dashboardResult;
      
//       // Chuẩn bị dữ liệu cho biểu đồ
//       this.prepareChartData();
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   // Apply date filter
//   async applyDateFilter() {
//     await this.loadDashboardData();
//   }

//   // Quick date range setter
//   async setDateRange(range: string) {
//     const today = new Date();
    
//     switch (range) {
//       case 'today':
//         this.batdau = new Date(today);
//         this.ketthuc = new Date(today);
//         break;
//       case 'yesterday':
//         const yesterday = new Date(today);
//         yesterday.setDate(yesterday.getDate() - 1);
//         this.batdau = new Date(yesterday);
//         this.ketthuc = new Date(yesterday);
//         break;
//       case 'last7days':
//         this.ketthuc = new Date(today);
//         this.batdau = new Date(today);
//         this.batdau.setDate(this.batdau.getDate() - 6);
//         break;
//       case 'last30days':
//         this.ketthuc = new Date(today);
//         this.batdau = new Date(today);
//         this.batdau.setDate(this.batdau.getDate() - 29);
//         break;
//       case 'thisMonth':
//         this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
//         this.ketthuc = new Date(today);
//         break;
//       case 'lastMonth':
//         const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//         this.batdau = new Date(lastMonth);
//         this.ketthuc = new Date(today.getFullYear(), today.getMonth(), 0);
//         break;
//     }
    
//     await this.loadDashboardData();
//   }

//   // Chuẩn bị dữ liệu cho các biểu đồ TailwindCSS
//   prepareChartData(): void {
//     if (!this.dashboardData) return;

//     // Top 10 sản phẩm có số lượng cao nhất
//     this.chartData.topProducts = this.dashboardData.productQuantities?.donhang
//       ?.sort((a: any, b: any) => parseFloat(b.soluong) - parseFloat(a.soluong))
//       ?.slice(0, 10) || [];

//     // Dữ liệu so sánh hiện tại vs trước đó
//     this.chartData.comparisonChart = [
//       {
//         label: 'Đơn Hàng Hiện Tại',
//         current: this.dashboardData.donhang?.total || 0,
//         previous: this.dashboardData.donhang?.previousTotal || 0,
//         color: 'bg-blue-500'
//       },
//       {
//         label: 'Đặt Hàng Hiện Tại',
//         current: this.dashboardData.dathang?.total || 0,
//         previous: this.dashboardData.dathang?.previousTotal || 0,
//         color: 'bg-green-500'
//       }
//     ];

//     // Dữ liệu cho biểu đồ sản phẩm (top 8)
//     this.chartData.productChart = this.chartData.topProducts.slice(0, 8);
//   }

//   // Helper methods cho TailwindCSS charts
//   getBarHeight(value: number, maxValue: number): string {
//     if (maxValue === 0) return '2%';
//     const percentage = (value / maxValue) * 100;
//     return `${Math.max(percentage, 2)}%`;
//   }

//   getMaxValue(data: any[], field: string): number {
//     return Math.max(...data.map(item => parseFloat(item[field]) || 0));
//   }

//   getPercentageChange(current: number, previous: number): number {
//     if (previous === 0) return 0;
//     return Number(((current - previous) / previous * 100).toFixed(1));
//   }

//   getChangeColor(change: number): string {
//     return change >= 0 ? 'text-green-600' : 'text-red-600';
//   }

//   getChangeIcon(change: number): string {
//     return change >= 0 ? 'trending_up' : 'trending_down';
//   }

//   formatCurrency(value: number): string {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND'
//     }).format(value);
//   }

//   formatNumber(value: string | number): string {
//     return new Intl.NumberFormat('vi-VN').format(Number(value));
//   }

//   // Get color for each product bar
//   getProductColor(index: number): string {
//     const colors = [
//       'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
//       'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
//     ];
//     return colors[index % colors.length];
//   }

//   truncateText(text: string, length: number = 20): string {
//     return text.length > length ? text.substring(0, length) + '...' : text;
//   }

//   // Template helper methods for global functions
//   parseFloat(value: any): number {
//     return parseFloat(value);
//   }

//   mathMax(a: number, b: number): number {
//     return Math.max(a, b);
//   }

//   // Get days difference between start and end date
//   getDaysDifference(): number {
//     const diffTime = Math.abs(this.ketthuc.getTime() - this.batdau.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   }
// }
