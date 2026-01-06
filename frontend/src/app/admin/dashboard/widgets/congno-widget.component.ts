import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent,
} from '../../../shared/ui';

interface CongNoKhachHang {
  khachhangId: string;
  ten: string;
  sdt?: string;
  email?: string;
  tongNo: number;
  soDonNo: number;
  ngayMuaGanNhat?: string;
}

interface CongNoStats {
  tongCongNo: number;
  soKhachNo: number;
  soKhachQuaHan: number;
  trungBinhNo: number;
}

const GET_CONG_NO_SUMMARY = gql`
  query GetCongNoSummary {
    congNoSummary {
      tongCongNo
      soKhachNo
      soKhachQuaHan
      trungBinhNo
      topKhachNo {
        khachhangId
        ten
        sdt
        email
        tongNo
        soDonNo
        ngayMuaGanNhat
      }
    }
  }
`;

@Component({
  selector: 'app-congno-widget',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent,
    SkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  template: `
    <ui-card class="h-full">
      <ui-card-header>
        <ui-card-title class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">💰 Công nợ khách hàng</span>
          </div>
          <ui-button variant="ghost" size="sm" (click)="refresh()">
            <span class="text-sm">🔄</span>
          </ui-button>
        </ui-card-title>
      </ui-card-header>
      
      <ui-card-content>
        <!-- Loading State -->
        <div *ngIf="loading()">
          <!-- Stats Skeleton -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div *ngFor="let _ of [1,2,3,4]" class="p-3 border border-border rounded-lg">
              <ui-skeleton variant="text" width="60%"></ui-skeleton>
              <ui-skeleton variant="title" width="80%" class="mt-2"></ui-skeleton>
            </div>
          </div>
          <!-- List Skeleton -->
          <div class="space-y-3">
            <div *ngFor="let _ of [1,2,3]" class="p-3 border border-border rounded-lg">
              <ui-skeleton variant="text" width="40%"></ui-skeleton>
              <ui-skeleton variant="text" width="60%" class="mt-2"></ui-skeleton>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <ui-error-state
          *ngIf="error()"
          [message]="errorMessage()"
          (retry)="refresh()"
        ></ui-error-state>

        <!-- Stats Cards -->
        <div *ngIf="!loading() && !error()" class="grid grid-cols-2 gap-3 mb-4">
          <div class="p-3 border border-border rounded-lg bg-card">
            <div class="text-xs text-muted-foreground mb-1">Tổng công nợ</div>
            <div class="text-lg font-bold text-destructive">
              {{ formatCurrency(stats().tongCongNo) }}
            </div>
          </div>
          
          <div class="p-3 border border-border rounded-lg bg-card">
            <div class="text-xs text-muted-foreground mb-1">Số khách nợ</div>
            <div class="text-lg font-bold text-warning">
              {{ stats().soKhachNo }}
            </div>
          </div>
          
          <div class="p-3 border border-border rounded-lg bg-card">
            <div class="text-xs text-muted-foreground mb-1">Quá hạn</div>
            <div class="text-lg font-bold text-destructive">
              {{ stats().soKhachQuaHan }}
            </div>
          </div>
          
          <div class="p-3 border border-border rounded-lg bg-card">
            <div class="text-xs text-muted-foreground mb-1">TB/Khách</div>
            <div class="text-lg font-bold">
              {{ formatCurrency(stats().trungBinhNo) }}
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <ui-empty-state
          *ngIf="!loading() && !error() && topKhachNo().length === 0"
          icon="✅"
          title="Không có công nợ"
          description="Tất cả khách hàng đã thanh toán đầy đủ"
        ></ui-empty-state>

        <!-- Top Customers List -->
        <div *ngIf="!loading() && !error() && topKhachNo().length > 0">
          <div class="text-sm font-medium mb-3">Top khách nợ cao nhất</div>
          <div class="space-y-3 max-h-80 overflow-y-auto">
            <div
              *ngFor="let khach of topKhachNo(); let i = index"
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <!-- Left: Customer Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold text-sm truncate">{{ khach.ten }}</span>
                  <ui-badge variant="destructive" class="text-xs">
                    {{ khach.soDonNo }} đơn
                  </ui-badge>
                </div>
                <p class="text-xs text-muted-foreground truncate" *ngIf="khach.sdt">
                  📞 {{ khach.sdt }}
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-bold text-destructive">
                    {{ formatCurrency(khach.tongNo) }}
                  </span>
                  <span class="text-xs text-muted-foreground" *ngIf="khach.ngayMuaGanNhat">
                    • {{ formatDate(khach.ngayMuaGanNhat) }}
                  </span>
                </div>
              </div>

              <!-- Right: Actions -->
              <div class="flex items-center gap-2">
                <ui-button
                  variant="outline"
                  size="sm"
                  (click)="viewCustomerDetail(khach.khachhangId)"
                  class="text-xs"
                >
                  Chi tiết
                </ui-button>
                <ui-button
                  variant="default"
                  size="sm"
                  (click)="createPhieuThu(khach.khachhangId)"
                  class="text-xs"
                >
                  Thu tiền
                </ui-button>
              </div>
            </div>
          </div>

          <!-- View All Button -->
          <div class="mt-4 pt-4 border-t border-border">
            <ui-button
              variant="ghost"
              size="sm"
              class="w-full"
              (click)="viewAllCongNo()"
            >
              Xem toàn bộ công nợ →
            </ui-button>
          </div>
        </div>
      </ui-card-content>
    </ui-card>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CongNoWidgetComponent implements OnInit {
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  stats = signal<CongNoStats>({
    tongCongNo: 0,
    soKhachNo: 0,
    soKhachQuaHan: 0,
    trungBinhNo: 0
  });
  
  topKhachNo = signal<CongNoKhachHang[]>([]);

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(false);
      this.errorMessage.set('');

      const result = await this.apollo.query<{
        congNoSummary: {
          tongCongNo: number;
          soKhachNo: number;
          soKhachQuaHan: number;
          trungBinhNo: number;
          topKhachNo: CongNoKhachHang[];
        }
      }>({
        query: GET_CONG_NO_SUMMARY,
        fetchPolicy: 'network-only'
      }).toPromise();

      if (result?.data?.congNoSummary) {
        const { topKhachNo, ...stats } = result.data.congNoSummary;
        this.stats.set(stats);
        this.topKhachNo.set(topKhachNo.slice(0, 5)); // Top 5
      }
    } catch (err: any) {
      console.error('Error loading cong no summary:', err);
      this.error.set(true);
      this.errorMessage.set(err.message || 'Không thể tải dữ liệu');
    } finally {
      this.loading.set(false);
    }
  }

  refresh(): void {
    this.loadData();
  }

  viewCustomerDetail(khachhangId: string): void {
    this.router.navigate(['/admin/congnokhachhang', khachhangId]);
  }

  createPhieuThu(khachhangId: string): void {
    this.router.navigate(['/admin/phieuthuchi/new'], {
      queryParams: { 
        loai: 'THU',
        doiTuong: 'KHACHHANG', // Added to match the logic in detail component
        doiTuongId: khachhangId
      }
    });
  }

  viewAllCongNo(): void {
    this.router.navigate(['/admin/congnokhachhang']);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatCurrency(value: number): string {
    if (value === 0) return '0đ';
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
