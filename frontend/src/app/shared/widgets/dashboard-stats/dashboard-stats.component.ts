import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent
} from '../../ui';

interface DashboardStats {
  donChoXacNhan: number;
  congNoKhachHang: number;
  thuTrongNgay: number;
  chiTrongNgay: number;
  hoaDonChuaXuat: number;
}

const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      donChoXacNhan: countDonhangByStatus(status: "CHO_XACNHAN")
      congNoKhachHang: totalCongNo
      thuTrongNgay: totalThuToday
      chiTrongNgay: totalChiToday
      hoaDonChuaXuat: countHoaDonByStatus(status: "NHAP")
    }
  }
`;

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
    SkeletonComponent
  ],
  template: `
    <!-- Mobile-First Dashboard Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <!-- Đơn chờ xác nhận -->
      <ui-card [hover]="true" class="cursor-pointer" (click)="navigateTo('/admin/donhang')">
        <ui-card-content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Chờ xác nhận</p>
              <h3 class="text-3xl font-bold mt-2">{{ stats().donChoXacNhan }}</h3>
            </div>
            <div class="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
              <span class="text-2xl">⏳</span>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4">Đơn hàng cần xác nhận</p>
        </ui-card-content>
      </ui-card>

      <!-- Công nợ -->
      <ui-card [hover]="true" class="cursor-pointer" (click)="navigateTo('/admin/congno')">
        <ui-card-content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Công nợ</p>
              <h3 class="text-2xl font-bold mt-2">{{ formatCurrency(stats().congNoKhachHang) }}</h3>
            </div>
            <div class="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <span class="text-2xl">💰</span>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4">Tổng công nợ khách hàng</p>
        </ui-card-content>
      </ui-card>

      <!-- Thu trong ngày -->
      <ui-card [hover]="true" class="cursor-pointer" (click)="navigateTo('/admin/phieuthuchi')">
        <ui-card-content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Thu hôm nay</p>
              <h3 class="text-2xl font-bold mt-2 text-success">
                {{ formatCurrency(stats().thuTrongNgay) }}
              </h3>
            </div>
            <div class="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
              <span class="text-2xl">📈</span>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4">Tổng thu trong ngày</p>
        </ui-card-content>
      </ui-card>

      <!-- Chi trong ngày -->
      <ui-card [hover]="true" class="cursor-pointer" (click)="navigateTo('/admin/phieuthuchi')">
        <ui-card-content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Chi hôm nay</p>
              <h3 class="text-2xl font-bold mt-2 text-destructive">
                {{ formatCurrency(stats().chiTrongNgay) }}
              </h3>
            </div>
            <div class="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <span class="text-2xl">📉</span>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4">Tổng chi trong ngày</p>
        </ui-card-content>
      </ui-card>

      <!-- Hóa đơn chưa xuất -->
      <ui-card [hover]="true" class="cursor-pointer" (click)="navigateTo('/admin/hoadon')">
        <ui-card-content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">HĐ chưa xuất</p>
              <h3 class="text-3xl font-bold mt-2">{{ stats().hoaDonChuaXuat }}</h3>
            </div>
            <div class="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
              <span class="text-2xl">📄</span>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mt-4">Hóa đơn đang nhập</p>
        </ui-card-content>
      </ui-card>
    </div>

    <!-- Dòng tiền 7 ngày -->
    <ui-card class="mt-6">
      <ui-card-header>
        <ui-card-title>Dòng tiền 7 ngày qua</ui-card-title>
      </ui-card-header>
      <ui-card-content>
        <div class="space-y-3">
          <div *ngFor="let day of dongTien7Ngay()" 
               class="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
            <div class="flex-1">
              <p class="font-medium text-sm">{{ day.ngay }}</p>
            </div>
            <div class="flex gap-4 items-center">
              <div class="text-right">
                <p class="text-xs text-muted-foreground">Thu</p>
                <p class="font-semibold text-success text-sm">{{ formatCurrency(day.thu) }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-muted-foreground">Chi</p>
                <p class="font-semibold text-destructive text-sm">{{ formatCurrency(day.chi) }}</p>
              </div>
              <div class="text-right min-w-[100px]">
                <p class="text-xs text-muted-foreground">Chênh lệch</p>
                <p class="font-bold text-sm" [class.text-success]="day.chenhLech >= 0" 
                   [class.text-destructive]="day.chenhLech < 0">
                  {{ formatCurrency(day.chenhLech) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ui-card-content>
    </ui-card>
  `
})
export class DashboardStatsComponent implements OnInit {
  stats = signal<DashboardStats>({
    donChoXacNhan: 0,
    congNoKhachHang: 0,
    thuTrongNgay: 0,
    chiTrongNgay: 0,
    hoaDonChuaXuat: 0
  });

  dongTien7Ngay = signal<Array<{
    ngay: string;
    thu: number;
    chi: number;
    chenhLech: number;
  }>>([]);

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadDongTien7Ngay();
  }

  loadStats(): void {
    // Mock data for demonstration
    // In production, uncomment Apollo query below
    this.stats.set({
      donChoXacNhan: 12,
      congNoKhachHang: 125000000,
      thuTrongNgay: 45000000,
      chiTrongNgay: 15000000,
      hoaDonChuaXuat: 8
    });

    /* Production GraphQL query:
    this.apollo
      .query<any>({
        query: GET_DASHBOARD_STATS,
        fetchPolicy: 'network-only'
      })
      .subscribe({
        next: (result) => {
          this.stats.set(result.data.dashboardStats);
        },
        error: (error) => {
          console.error('Error loading stats:', error);
        }
      });
    */
  }

  loadDongTien7Ngay(): void {
    // Mock data for demonstration
    const mockData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const thu = Math.random() * 50000000;
      const chi = Math.random() * 30000000;
      
      mockData.push({
        ngay: date.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }),
        thu: thu,
        chi: chi,
        chenhLech: thu - chi
      });
    }
    
    this.dongTien7Ngay.set(mockData);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  }

  navigateTo(path: string): void {
    // In production, use Router
    console.log('Navigate to:', path);
  }
}
