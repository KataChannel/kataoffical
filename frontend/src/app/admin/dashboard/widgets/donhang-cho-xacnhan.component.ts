import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
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

interface DonhangChoXacNhan {
  id: string;
  madonhang: string;
  createdAt: string;
  tongTien: number;
  khachhang?: {
    ten: string;
    sdt?: string;
  };
  xacNhanLan1?: boolean;
  xacNhanLan2?: boolean;
  confirmToken?: string;
}

const GET_DONHANG_CHO_XACNHAN = gql`
  query GetDonhangChoXacNhan {
    donhangChoXacNhan {
      id
      madonhang
      createdAt
      tongTien
      khachhang {
        ten
        sdt
      }
      xacNhanLan1
      xacNhanLan2
      confirmToken
    }
  }
`;

@Component({
  selector: 'app-donhang-cho-xacnhan-widget',
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
            <span class="text-lg">🔔 Đơn chờ xác nhận</span>
            <ui-badge *ngIf="!loading() && !error()" [variant]="total() > 0 ? 'destructive' : 'secondary'">
              {{ total() }}
            </ui-badge>
          </div>
          <ui-button variant="ghost" size="sm" (click)="refresh()">
            <span class="text-sm">🔄</span>
          </ui-button>
        </ui-card-title>
      </ui-card-header>
      
      <ui-card-content>
        <!-- Loading State -->
        <div *ngIf="loading()" class="space-y-3">
          <div *ngFor="let _ of [1,2,3]" class="flex items-center justify-between p-3 border border-border rounded-lg">
            <div class="space-y-2 flex-1">
              <ui-skeleton variant="text" width="40%"></ui-skeleton>
              <ui-skeleton variant="text" width="60%"></ui-skeleton>
            </div>
            <ui-skeleton variant="custom" width="80px" height="32px"></ui-skeleton>
          </div>
        </div>

        <!-- Error State -->
        <ui-error-state
          *ngIf="error()"
          [message]="errorMessage()"
          (retry)="refresh()"
        ></ui-error-state>

        <!-- Empty State -->
        <ui-empty-state
          *ngIf="!loading() && !error() && total() === 0"
          icon="✅"
          title="Không có đơn chờ xác nhận"
          description="Tất cả đơn hàng đã được xác nhận"
        ></ui-empty-state>

        <!-- Data List -->
        <div *ngIf="!loading() && !error() && total() > 0" class="space-y-3 max-h-96 overflow-y-auto">
          <div
            *ngFor="let donhang of list(); let i = index"
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <!-- Left: Order Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-sm truncate">{{ donhang.madonhang }}</span>
                <ui-badge 
                  [variant]="getXacNhanBadge(donhang).variant"
                  class="text-xs"
                >
                  {{ getXacNhanBadge(donhang).text }}
                </ui-badge>
              </div>
              <p class="text-sm text-muted-foreground truncate">
                {{ donhang.khachhang?.ten || 'Khách lẻ' }}
              </p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs text-muted-foreground">
                  {{ formatDate(donhang.createdAt) }}
                </span>
                <span class="text-sm font-medium text-primary">
                  {{ formatCurrency(donhang.tongTien) }}
                </span>
              </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-2">
              <ui-button
                variant="outline"
                size="sm"
                (click)="viewDetail(donhang.id)"
                class="text-xs"
              >
                Chi tiết
              </ui-button>
              <ui-button
                *ngIf="donhang.confirmToken"
                variant="default"
                size="sm"
                (click)="copyLink(donhang.confirmToken)"
                class="text-xs"
              >
                📋 Link
              </ui-button>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div *ngIf="!loading() && !error() && total() > 0" class="mt-4 pt-4 border-t border-border">
          <ui-button
            variant="ghost"
            size="sm"
            class="w-full"
            (click)="viewAll()"
          >
            Xem tất cả {{ total() }} đơn →
          </ui-button>
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
export class DonhangChoXacNhanWidgetComponent implements OnInit {
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  data = signal<DonhangChoXacNhan[]>([]);
  
  // Computed values
  list = computed(() => this.data().slice(0, 5)); // Show top 5
  total = computed(() => this.data().length);

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

      const result = await this.apollo.query<{ donhangChoXacNhan: DonhangChoXacNhan[] }>({
        query: GET_DONHANG_CHO_XACNHAN,
        fetchPolicy: 'network-only'
      }).toPromise();

      if (result?.data?.donhangChoXacNhan) {
        this.data.set(result.data.donhangChoXacNhan);
      }
    } catch (err: any) {
      console.error('Error loading donhang cho xac nhan:', err);
      this.error.set(true);
      this.errorMessage.set(err.message || 'Không thể tải dữ liệu');
    } finally {
      this.loading.set(false);
    }
  }

  refresh(): void {
    this.loadData();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/admin/donhang', id]);
  }

  viewAll(): void {
    this.router.navigate(['/admin/donhang'], {
      queryParams: { filter: 'cho-xac-nhan' }
    });
  }

  copyLink(token: string): void {
    const link = `${window.location.origin}/confirm/${token}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('✅ Đã copy link xác nhận!');
    }).catch(() => {
      alert('❌ Không thể copy link');
    });
  }

  getXacNhanBadge(donhang: DonhangChoXacNhan): { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive', text: string } {
    if (donhang.xacNhanLan2) {
      return { variant: 'success', text: 'XN 2/2' };
    } else if (donhang.xacNhanLan1) {
      return { variant: 'warning', text: 'XN 1/2' };
    } else {
      return { variant: 'destructive', text: 'Chưa XN' };
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}
