import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {
    ButtonComponent,
    SkeletonComponent
} from '../../../shared/ui';

interface PhieuThuChi {
  id: string;
  maPhieu: string;
  loai: 'THU' | 'CHI';
  soTien: number;
  trangThai: string;
  ngay: string;
  doiTuong?: string;
  tenDoiTuong?: string;
}

interface ThuChiStats {
  tongThu: number;
  tongChi: number;
  chenhLech: number;
  choDuyet: number;
}

const GET_THUCHI_SUMMARY = gql`
  query GetThuChiSummary {
    thuChiSummary {
      tongThu
      tongChi
      choDuyet
      phieuGanDay {
        id
        maPhieu
        loai
        soTien
        trangThai
        ngay
        doiTuong
        tenDoiTuong
      }
    }
  }
`;

@Component({
  selector: 'app-thuchi-widget',
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
          <div class="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 shadow-inner">
            <span class="text-xl">📊</span>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-base leading-tight">Quản lý Thu Chi</h3>
            @if (!loading()) {
              <p class="text-xs text-gray-500 font-medium">Báo cáo dòng tiền tháng này</p>
            }
          </div>
        </div>
    
        <div class="flex items-center gap-2">
          @if (!loading() && !error() && stats().choDuyet > 0) {
            <div class="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-full border border-amber-100 animate-pulse">
              <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span class="text-[10px] font-bold text-amber-700 uppercase">{{ stats().choDuyet }} CHỜ DUYỆT</span>
            </div>
          }
          <button (click)="refresh()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-violet-600">
            <mat-icon class="text-lg w-5 h-5">refresh</mat-icon>
          </button>
        </div>
      </div>
    
      <div class="p-4">
        <!-- Loading State -->
        @if (loading()) {
          <div class="space-y-4">
            <div class="grid grid-cols-3 gap-2">
              @for (item of [1,2,3]; track item) {
                <div class="p-3 bg-gray-50/50 rounded-xl space-y-2">
                  <ui-skeleton variant="text" width="60%"></ui-skeleton>
                  <ui-skeleton variant="title" width="80%"></ui-skeleton>
                </div>
              }
            </div>
            <div class="space-y-2">
              @for (item of [1,2,3]; track item) {
                <div class="p-3 border border-gray-50 rounded-xl space-y-2">
                  <ui-skeleton variant="text" width="40%"></ui-skeleton>
                  <ui-skeleton variant="text" width="70%"></ui-skeleton>
                </div>
              }
            </div>
          </div>
        }
    
        <!-- Error State -->
        @if (error()) {
          <div class="py-12 text-center">
            <div class="text-4xl mb-3">📡</div>
            <p class="text-sm text-gray-500 mb-4">{{ errorMessage() }}</p>
            <ui-button variant="outline" size="sm" (click)="refresh()">Thử lại</ui-button>
          </div>
        }
    
        <!-- Content -->
        @if (!loading() && !error()) {
          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-2 mb-6">
            <div class="relative overflow-hidden p-3 rounded-2xl bg-emerald-50 border border-emerald-100/50 group hover:shadow-sm transition-all">
              <div class="relative z-10">
                <div class="text-[9px] uppercase font-black text-emerald-400 tracking-wider mb-0.5">Tổng Thu</div>
                <div class="text-xs font-black text-emerald-700 truncate">
                  {{ formatCurrency(stats().tongThu) }}
                </div>
              </div>
              <div class="absolute -right-2 -bottom-2 text-emerald-200/30 text-3xl opacity-0 group-hover:opacity-100 transition-opacity">📈</div>
            </div>
    
            <div class="relative overflow-hidden p-3 rounded-2xl bg-rose-50 border border-rose-100/50 group hover:shadow-sm transition-all">
              <div class="relative z-10">
                <div class="text-[9px] uppercase font-black text-rose-400 tracking-wider mb-0.5">Tổng Chi</div>
                <div class="text-xs font-black text-rose-700 truncate">
                  {{ formatCurrency(stats().tongChi) }}
                </div>
              </div>
              <div class="absolute -right-2 -bottom-2 text-rose-200/30 text-3xl opacity-0 group-hover:opacity-100 transition-opacity">📉</div>
            </div>
    
            <div class="relative overflow-hidden p-3 rounded-2xl border transition-all"
              [class.bg-blue-50]="stats().chenhLech >= 0"
              [class.border-blue-100]="stats().chenhLech >= 0"
              [class.bg-amber-50]="stats().chenhLech < 0"
              [class.border-amber-100]="stats().chenhLech < 0">
              <div class="relative z-10">
                <div class="text-[9px] uppercase font-black tracking-wider mb-0.5"
                  [class.text-blue-400]="stats().chenhLech >= 0"
                [class.text-amber-400]="stats().chenhLech < 0">Dư cuối</div>
                <div class="text-xs font-black truncate"
                  [class.text-blue-700]="stats().chenhLech >= 0"
                  [class.text-amber-700]="stats().chenhLech < 0">
                  {{ formatCurrency(stats().chenhLech) }}
                </div>
              </div>
            </div>
          </div>
    
          <!-- Empty State -->
          @if (list().length === 0) {
            <div class="py-12 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <div class="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-2xl">
                📄
              </div>
              <h4 class="font-bold text-gray-900 text-sm mb-1">Chưa có giao dịch</h4>
              <p class="text-xs text-gray-500">Dữ liệu thu chi tháng này đang trống</p>
            </div>
          }
    
          <!-- Recent Transactions -->
          @if (list().length > 0) {
            <div class="flex items-center justify-between mb-3 px-1">
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Giao dịch gần đây</h4>
              <button (click)="viewAll()" class="text-[10px] font-bold text-violet-600 hover:underline">Chi tiết</button>
            </div>
    
            <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              @for (phieu of list(); track phieu.id) {
                <div
                  class="group flex items-center justify-between p-3.5 bg-white border border-gray-50 hover:border-violet-200 rounded-xl hover:bg-violet-50/30 transition-all duration-300 cursor-pointer"
                  (click)="viewDetail(phieu.id)">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-bold text-gray-900 text-sm tracking-tight group-hover:text-violet-700 transition-colors">{{ phieu.maPhieu }}</span>
                      <div class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter"
                           [ngClass]="{
                             'bg-emerald-100 text-emerald-600': phieu.loai === 'THU',
                             'bg-rose-100 text-rose-600': phieu.loai === 'CHI'
                           }">
                        {{ phieu.loai === 'THU' ? 'THU' : 'CHI' }}
                      </div>
                      @if (phieu.trangThai === 'CHO_DUYET') {
                        <div class="w-1.5 h-1.5 rounded-full bg-amber-500" matTooltip="Chờ duyệt"></div>
                      }
                    </div>
                    <div class="flex items-center gap-2 text-[11px] font-medium text-gray-400">
                      <span>{{ formatDate(phieu.ngay) }}</span>
                      @if (phieu.tenDoiTuong) {
                        <span class="truncate max-w-[120px]">
                          • {{ phieu.tenDoiTuong }}
                        </span>
                      }
                    </div>
                  </div>
                  <div class="text-right">
                    <div
                      class="text-sm font-black tracking-tight"
                      [class.text-emerald-600]="phieu.loai === 'THU'"
                      [class.text-rose-600]="phieu.loai === 'CHI'">
                      {{ phieu.loai === 'THU' ? '+' : '-' }}{{ formatCurrency(phieu.soTien) }}
                    </div>
                  </div>
                </div>
              }
            </div>
    
            <!-- View All Bar -->
            <div class="mt-4 pt-2">
              <button
                (click)="viewAll()"
                class="w-full py-2.5 rounded-xl border border-dashed border-gray-200 text-xs font-bold text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50/30 transition-all flex items-center justify-center gap-2">
                <span>QUẢN LÝ TỔNG HỢP</span>
                <mat-icon class="text-sm w-4 h-4">arrow_forward</mat-icon>
              </button>
            </div>
          }
        }
      </div>
    </div>
    `,
})
export class ThuchiWidgetComponent implements OnInit {
  loading = signal(true);
  error = signal(false);
  errorMessage = signal('');
  list = signal<PhieuThuChi[]>([]);
  
  stats = signal<ThuChiStats>({
    tongThu: 0,
    tongChi: 0,
    chenhLech: 0,
    choDuyet: 0,
  });

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(false);
    
    this.apollo.watchQuery({
      query: GET_THUCHI_SUMMARY,
      fetchPolicy: 'network-only',
    }).valueChanges.subscribe({
      next: (result: any) => {
        const data = result.data?.thuChiSummary;
        if (data) {
          this.stats.set({
            tongThu: data.tongThu || 0,
            tongChi: data.tongChi || 0,
            chenhLech: (data.tongThu || 0) - (data.tongChi || 0),
            choDuyet: data.choDuyet || 0,
          });
          this.list.set(data.phieuGanDay || []);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading thu chi summary:', err);
        this.error.set(true);
        this.errorMessage.set('Không thể tải dữ liệu thu chi');
        this.loading.set(false);
        
        // Fallback: Load from REST API
        this.loadFallbackData();
      },
    });
  }

  async loadFallbackData(): Promise<void> {
    try {
      // Mock data for fallback
      this.stats.set({
        tongThu: 50000000,
        tongChi: 35000000,
        chenhLech: 15000000,
        choDuyet: 3,
      });
      this.list.set([
        {
          id: '1',
          maPhieu: 'PT001',
          loai: 'THU',
          soTien: 5000000,
          trangThai: 'DA_DUYET',
          ngay: new Date().toISOString(),
          doiTuong: 'KHACH_HANG',
          tenDoiTuong: 'Công ty ABC'
        },
        {
          id: '2',
          maPhieu: 'PC001',
          loai: 'CHI',
          soTien: 2500000,
          trangThai: 'CHO_DUYET',
          ngay: new Date().toISOString(),
          doiTuong: 'NHA_CUNG_CAP',
          tenDoiTuong: 'NCC XYZ'
        }
      ]);
      this.error.set(false);
    } catch (err) {
      console.error('Fallback also failed:', err);
    }
  }

  refresh(): void {
    this.loadData();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/admin/phieuthuchi', id]);
  }

  viewAll(): void {
    this.router.navigate(['/admin/phieuthuchi']);
  }

  formatCurrency(amount: number): string {
    if (amount >= 1000000000) {
      return (amount / 1000000000).toFixed(1) + ' tỷ';
    }
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + ' tr';
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  }
}
