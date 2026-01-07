import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {
    ButtonComponent,
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
    SkeletonComponent,
    MatIconModule
  ],
  template: `
    <div class="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-inner">
            <span class="text-xl">💰</span>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-base leading-tight">Công nợ khách hàng</h3>
            <p class="text-xs text-gray-500 font-medium" *ngIf="!loading()">{{ stats().soKhachNo }} khách hàng còn nợ</p>
          </div>
        </div>
        <button (click)="refresh()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-amber-600">
          <mat-icon class="text-lg w-5 h-5">refresh</mat-icon>
        </button>
      </div>
      
      <div class="p-4">
        <!-- Loading State -->
        <div *ngIf="loading()" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div *ngFor="let _ of [1,2,3,4]" class="p-3 bg-gray-50/50 rounded-xl space-y-2">
              <ui-skeleton variant="text" width="60%"></ui-skeleton>
              <ui-skeleton variant="title" width="80%"></ui-skeleton>
            </div>
          </div>
          <div class="space-y-3">
            <div *ngFor="let _ of [1,2,3]" class="p-4 border border-gray-100 rounded-xl space-y-2">
              <ui-skeleton variant="text" width="40%"></ui-skeleton>
              <ui-skeleton variant="text" width="70%"></ui-skeleton>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="error()" class="py-8 text-center text-red-500">
          <div class="text-4xl mb-3">❌</div>
          <p class="text-sm mb-4">{{ errorMessage() }}</p>
          <ui-button variant="outline" size="sm" (click)="refresh()">Thử lại</ui-button>
        </div>

        <!-- Stats Grid -->
        <div *ngIf="!loading() && !error()" class="grid grid-cols-2 gap-3 mb-5">
          <div class="p-3 rounded-2xl bg-red-50/50 border border-red-100/50">
            <div class="text-[10px] uppercase font-bold text-red-400 tracking-wider mb-1">Tổng nợ</div>
            <div class="text-base font-black text-red-600 tracking-tight">
              {{ formatCurrency(stats().tongCongNo) }}
            </div>
          </div>
          
          <div class="p-3 rounded-2xl bg-amber-50/50 border border-amber-100/50">
            <div class="text-[10px] uppercase font-bold text-amber-500 tracking-wider mb-1">Khách nợ</div>
            <div class="text-base font-black text-amber-600 tracking-tight">
              {{ stats().soKhachNo }} <span class="text-xs font-normal">người</span>
            </div>
          </div>
          
          <div class="p-3 rounded-2xl bg-rose-50/50 border border-rose-100/50">
            <div class="text-[10px] uppercase font-bold text-rose-400 tracking-wider mb-1">Quá hạn</div>
            <div class="text-base font-black text-rose-600 tracking-tight">
              {{ stats().soKhachQuaHan }} <span class="text-xs font-normal text-rose-400">cảnh báo</span>
            </div>
          </div>
          
          <div class="p-3 rounded-2xl bg-blue-50/50 border border-blue-100/50">
            <div class="text-[10px] uppercase font-bold text-blue-400 tracking-wider mb-1">Trung bình</div>
            <div class="text-base font-black text-blue-600 tracking-tight">
              {{ formatCurrency(stats().trungBinhNo) }}
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!loading() && !error() && topKhachNo().length === 0" class="py-12 text-center">
          <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✨
          </div>
          <p class="text-sm text-gray-500">Tuyệt vời! Không có nợ xấu</p>
        </div>

        <!-- Top Customers List -->
        <div *ngIf="!loading() && !error() && topKhachNo().length > 0">
          <div class="flex items-center justify-between mb-3 px-1">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Khách nợ cao nhất</h4>
            <span class="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">TOP 5</span>
          </div>
          
          <div class="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
            <div
              *ngFor="let khach of topKhachNo(); let i = index"
              class="group bg-white hover:bg-gray-50/80 border border-gray-50 hover:border-amber-200 rounded-xl p-3.5 transition-all duration-300"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <h5 class="font-bold text-gray-900 text-sm truncate group-hover:text-amber-700 transition-colors">
                      {{ khach.ten }}
                    </h5>
                    <span class="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                       {{ khach.soDonNo }} đơn
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <mat-icon class="text-[12px] w-3 h-3">phone</mat-icon>
                    {{ khach.sdt || '---' }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-black text-red-600">
                    {{ formatCurrency(khach.tongNo) }}
                  </div>
                  <div class="text-[10px] text-gray-400 font-medium" *ngIf="khach.ngayMuaGanNhat">
                    {{ formatDate(khach.ngayMuaGanNhat) }}
                  </div>
                </div>
              </div>

              <div class="flex gap-2 mt-3 pt-3 border-t border-gray-50 group-hover:border-amber-100 transition-colors">
                <button
                  (click)="viewCustomerDetail(khach.khachhangId)"
                  class="flex-1 h-8 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all"
                >
                  Hồ sơ
                </button>
                <button
                  (click)="createPhieuThu(khach.khachhangId)"
                  class="flex-1 h-8 rounded-lg bg-gray-900 text-[11px] font-bold text-white hover:bg-amber-600 transition-all shadow-sm"
                >
                  Thu tiền
                </button>
              </div>
            </div>
          </div>

          <!-- View All Button -->
          <div class="mt-4 pt-2">
            <button
              (click)="viewAllCongNo()"
              class="w-full py-2.5 rounded-xl border border-dashed border-gray-200 text-xs font-bold text-gray-500 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/30 transition-all flex items-center justify-center gap-2"
            >
              <span>XEM TẤT CẢ DANH SÁCH</span>
              <mat-icon class="text-sm w-4 h-4">arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
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
    this.loading.set(true);
    this.apollo
      .query({
        query: GET_CONG_NO_SUMMARY,
        fetchPolicy: 'network-only',
      })
      .subscribe({
        next: (result: any) => {
          const data = result.data.congNoSummary;
          this.stats.set({
            tongCongNo: data.tongCongNo,
            soKhachNo: data.soKhachNo,
            soKhachQuaHan: data.soKhachQuaHan,
            trungBinhNo: data.trungBinhNo
          });
          this.topKhachNo.set(data.topKhachNo || []);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(true);
          this.errorMessage.set(err.message || 'Lỗi tải thống kê công nợ');
          this.loading.set(false);
        },
      });
  }

  refresh(): void {
    this.loadData();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('vi-VN');
  }

  viewCustomerDetail(id: string): void {
    this.router.navigate(['/admin/khachhang', id]);
  }

  createPhieuThu(id: string): void {
    this.router.navigate(['/admin/thuchi/phieu-thu/create'], {
      queryParams: { khachhangId: id }
    });
  }

  viewAllCongNo(): void {
    this.router.navigate(['/admin/baocao/congno-khachhang']);
  }
}
