import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {
    BadgeComponent,
    ButtonComponent,
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
    BadgeComponent,
    ButtonComponent,
    SkeletonComponent,
    MatIconModule
  ],
  template: `
    <div class="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
            <span class="text-xl">📦</span>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-base leading-tight">Đơn chờ xác nhận</h3>
            <p class="text-xs text-gray-500 font-medium" *ngIf="!loading()">Bạn có {{ total() }} đơn hàng mới</p>
          </div>
        </div>
        <button (click)="refresh()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-blue-600">
          <mat-icon class="text-lg w-5 h-5">refresh</mat-icon>
        </button>
      </div>
      
      <div class="p-4">
        <!-- Loading State -->
        <div *ngIf="loading()" class="space-y-4">
          <div *ngFor="let _ of [1,2,3]" class="p-4 border border-gray-50 rounded-xl space-y-3">
            <div class="flex justify-between">
              <ui-skeleton variant="text" width="30%"></ui-skeleton>
              <ui-skeleton variant="text" width="20%"></ui-skeleton>
            </div>
            <ui-skeleton variant="title" width="60%"></ui-skeleton>
            <div class="flex gap-2">
              <ui-skeleton variant="text" width="40%"></ui-skeleton>
              <ui-skeleton variant="text" width="30%"></ui-skeleton>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="error()" class="py-8 text-center">
          <div class="text-4xl mb-3">⚠️</div>
          <p class="text-sm text-gray-600 mb-4">{{ errorMessage() }}</p>
          <ui-button variant="outline" size="sm" (click)="refresh()">Thử lại</ui-button>
        </div>

        <!-- Empty State -->
        <div *ngIf="!loading() && !error() && total() === 0" class="py-12 text-center">
          <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✅
          </div>
          <h4 class="font-bold text-gray-900 mb-1">Xong việc rồi!</h4>
          <p class="text-sm text-gray-500">Tất cả đơn đã được xác nhận</p>
        </div>

        <!-- Data List -->
        <div *ngIf="!loading() && !error() && total() > 0" class="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          <div
            *ngFor="let donhang of list(); let i = index"
            class="group relative bg-white border border-gray-100 rounded-xl p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5"
          >
            <!-- Status Sidebar Indicator -->
            <div class="absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-colors"
                 [ngClass]="{
                   'bg-red-500': !donhang.xacNhanLan1 && !donhang.xacNhanLan2,
                   'bg-yellow-500': donhang.xacNhanLan1 && !donhang.xacNhanLan2,
                   'bg-green-500': donhang.xacNhanLan1 && donhang.xacNhanLan2
                 }">
            </div>

            <div class="flex justify-between items-start mb-2">
              <div>
                <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">{{ donhang.madonhang }}</span>
                <h4 class="font-bold text-gray-900 text-sm truncate max-w-[150px] mt-0.5">
                  {{ donhang.khachhang?.ten || 'Khách lẻ' }}
                </h4>
              </div>
              <ui-badge 
                [variant]="getXacNhanBadge(donhang).variant"
                class="text-[10px] px-2 py-0.5"
              >
                {{ getXacNhanBadge(donhang).text }}
              </ui-badge>
            </div>

            <div class="flex items-end justify-between mt-3">
              <div class="space-y-1">
                <div class="flex items-center gap-1.5 text-gray-500">
                  <mat-icon class="text-[14px] w-3.5 h-3.5">schedule</mat-icon>
                  <span class="text-[11px] font-medium">{{ formatDate(donhang.createdAt) }}</span>
                </div>
                <div class="text-sm font-black text-gray-900">
                  {{ donhang.tongTien | currency:'VND':'symbol':'1.0-0' }}
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <button 
                   (click)="confirmSingle(donhang.id)"
                   class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                   matTooltip="Xác nhận nhanh"
                >
                  <mat-icon class="text-sm w-4 h-4 text-center">content_paste_search</mat-icon>
                </button>
                <button 
                  (click)="viewDetail(donhang.id)"
                  class="p-1 px-3 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
                >
                  Chi tiết
                  <mat-icon class="text-sm w-4 h-4">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Footer -->
        <div *ngIf="!loading() && !error() && total() > 0" class="mt-4 pt-3 border-t border-gray-50 text-center">
          <button (click)="viewAll()" class="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
            Xem toàn bộ danh sách
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DonhangChoXacNhanWidgetComponent implements OnInit {
  list = signal<DonhangChoXacNhan[]>([]);
  loading = signal(true);
  error = signal(false);
  errorMessage = signal('');
  total = computed(() => this.list().length);

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.apollo
      .query({
        query: GET_DONHANG_CHO_XACNHAN,
        fetchPolicy: 'network-only',
      })
      .subscribe({
        next: (result: any) => {
          this.list.set(result.data.donhangChoXacNhan || []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(true);
          this.errorMessage.set(err.message || 'Lỗi tải danh sách xác nhận');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.loadData();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  }

  getXacNhanBadge(donhang: DonhangChoXacNhan): { text: string; variant: any } {
    if (!donhang.xacNhanLan1 && !donhang.xacNhanLan2) {
      return { text: 'CHỜ XÁC NHẬN', variant: 'destructive' };
    }
    if (donhang.xacNhanLan1 && !donhang.xacNhanLan2) {
      return { text: 'XÁC NHẬN LẦN 1', variant: 'warning' };
    }
    return { text: 'ĐÃ XÁC NHẬN', variant: 'success' };
  }

  viewAll(): void {
    this.router.navigate(['/admin/donhang/cho-xac-nhan']);
  }

  viewDetail(id: string): void {
    this.router.navigate(['/admin/donhang', id]);
  }

  confirmSingle(id: string): void {
    // Navigate to detail for confirmation UI or handle directly here
    this.viewDetail(id);
  }
}
