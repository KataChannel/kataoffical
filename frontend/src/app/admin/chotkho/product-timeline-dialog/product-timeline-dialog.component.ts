import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChotkhoService } from '../chotkho.service';

export interface ProductTimelineDialogData {
  sanphamId: string;
  masp: string;
  title: string; // Product name
  dvt: string;   // Unit
  khoId?: string;
}

@Component({
  selector: 'app-product-timeline-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="product-timeline-dialog bg-slate-50 text-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col h-full max-h-[92vh]">
      <!-- Header (Sleek & Compact) -->
      <div class="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-sm border-b border-slate-800">
        <div class="flex items-center gap-2.5">
          <div class="bg-blue-500/10 p-1.5 rounded-lg text-blue-400 flex items-center justify-center border border-blue-500/20">
            <mat-icon class="scale-90 !w-5 !h-5 text-[18px]">history</mat-icon>
          </div>
          <div>
            <h2 class="text-sm font-bold m-0 tracking-tight text-white uppercase">Tiến trình biến động Xuất - Nhập - Tồn</h2>
            <p class="text-[11px] text-slate-400 m-0 mt-0.5 flex items-center gap-1.5">
              <span class="font-bold text-blue-400">{{ data.title }}</span>
              <span class="text-slate-600">|</span>
              <span>Mã: <strong class="font-mono text-white bg-slate-850 px-1.5 py-0.5 rounded border border-slate-800 text-[10px]">{{ data.masp }}</strong></span>
              <span class="text-slate-600">|</span>
              <span>ĐVT: <strong class="text-slate-200">{{ data.dvt || '-' }}</strong></span>
            </p>
          </div>
        </div>
        <button (click)="onClose()" class="p-1 hover:bg-white/10 active:bg-white/15 rounded-md text-slate-400 hover:text-white transition-all cursor-pointer">
          <mat-icon class="scale-95 !w-5 !h-5 text-[18px]">close</mat-icon>
        </button>
      </div>

      <!-- Filters & Stats Area (Highly Compact & Space Optimized) -->
      <div class="px-4 py-2 bg-white border-b border-slate-200/60 flex flex-col gap-2 shadow-sm shrink-0">
        <!-- Date Selector Filter Row (Inline design to save space) -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/50">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Từ</span>
              <input 
                type="date" 
                [(ngModel)]="fromDate" 
                class="h-7 px-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none transition-all cursor-pointer shadow-sm">
            </div>
            
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đến</span>
              <input 
                type="date" 
                [(ngModel)]="toDate" 
                class="h-7 px-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none transition-all cursor-pointer shadow-sm">
            </div>

            <button 
              (click)="loadTimeline()" 
              [disabled]="isLoading"
              class="h-7 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white font-bold text-[11px] px-3.5 rounded-md shadow-sm transition-all flex items-center gap-1 cursor-pointer">
              <mat-icon class="scale-75 !w-3.5 !h-3.5 text-[14px] !m-0">{{ isLoading ? 'sync' : 'search' }}</mat-icon>
              <span>Lọc</span>
            </button>
          </div>

          <!-- Warehouse quick info badge -->
          <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <mat-icon class="text-slate-400 scale-75 !w-3.5 !h-3.5 text-[14px]">store</mat-icon>
            <span>Kho: <strong class="text-slate-700">Kho chính HCM</strong></span>
          </div>
        </div>

        <!-- Summary Statistics Grid (Horizontal split to optimize height) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-0.5">
          <!-- Tồn đầu kỳ -->
          <div class="bg-blue-50/20 border border-blue-100/70 rounded-lg px-3 py-1.5 hover:bg-blue-50/30 transition-all flex items-center justify-between">
            <div>
              <span class="text-[9px] font-bold text-blue-600/90 uppercase tracking-wider block">Tồn Đầu Kỳ</span>
              <span class="text-[8px] text-slate-400 block mt-0.5">Trước {{ fromDate | date:'dd/MM' }}</span>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-base font-extrabold text-blue-800 font-mono">{{ startQty | number:'1.0-3' }}</span>
              <span class="text-[9px] font-bold text-slate-400">{{ data.dvt }}</span>
            </div>
          </div>

          <!-- Tổng Nhập -->
          <div class="bg-emerald-50/20 border border-emerald-100/70 rounded-lg px-3 py-1.5 hover:bg-emerald-50/30 transition-all flex items-center justify-between">
            <div>
              <span class="text-[9px] font-bold text-emerald-600/90 uppercase tracking-wider block">Tổng Nhập</span>
              <span class="text-[8px] text-slate-400 block mt-0.5">Lũy kế nhập</span>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-base font-extrabold text-emerald-800 font-mono">+{{ totalImport | number:'1.0-3' }}</span>
              <span class="text-[9px] font-bold text-slate-400">{{ data.dvt }}</span>
            </div>
          </div>

          <!-- Tổng Xuất -->
          <div class="bg-rose-50/20 border border-rose-100/70 rounded-lg px-3 py-1.5 hover:bg-rose-50/30 transition-all flex items-center justify-between">
            <div>
              <span class="text-[9px] font-bold text-rose-600/90 uppercase tracking-wider block">Tổng Xuất</span>
              <span class="text-[8px] text-slate-400 block mt-0.5">Lũy kế xuất</span>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-base font-extrabold text-rose-800 font-mono">-{{ totalExport | number:'1.0-3' }}</span>
              <span class="text-[9px] font-bold text-slate-400">{{ data.dvt }}</span>
            </div>
          </div>

          <!-- Tồn Cuối Kỳ -->
          <div class="bg-indigo-50/20 border border-indigo-100/70 rounded-lg px-3 py-1.5 hover:bg-indigo-50/30 transition-all flex items-center justify-between">
            <div>
              <span class="text-[9px] font-bold text-indigo-600/90 uppercase tracking-wider block">Tồn Cuối Kỳ</span>
              <span class="text-[8px] text-slate-400 block mt-0.5">Đến cuối {{ toDate | date:'dd/MM' }}</span>
            </div>
            <div class="flex items-baseline gap-1">
              <span class="text-base font-extrabold text-indigo-800 font-mono">{{ endQty | number:'1.0-3' }}</span>
              <span class="text-[9px] font-bold text-slate-400">{{ data.dvt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Table (Scrollable Area with Minimized Padding) -->
      <div class="flex-1 overflow-auto px-4 py-3 relative">
        @if (isLoading) {
          <!-- Beautiful Glassmorphism Loading Spinner -->
          <div class="absolute inset-0 bg-slate-50/60 backdrop-blur-[1px] z-20 flex items-center justify-center flex-col gap-2">
            <div class="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đang lấy dữ liệu...</span>
          </div>
        }

        @if (!isLoading && timelineData.length === 0) {
          <!-- Empty State -->
          <div class="flex flex-col items-center justify-center py-8 text-slate-400">
            <mat-icon class="scale-150 mb-3 text-slate-300">history_toggle_off</mat-icon>
            <p class="text-xs font-semibold m-0">Không có biến động nào trong khoảng thời gian này</p>
            <p class="text-[10px] text-slate-400 m-0 mt-0.5">Vui lòng thay đổi khoảng lọc ngày</p>
          </div>
        } @else {
          <!-- Table -->
          <div class="overflow-hidden border border-slate-200/60 rounded-lg bg-white shadow-sm">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th class="py-2 px-3 w-[140px]">Thời Gian</th>
                  <th class="py-2 px-3 w-[100px] text-center">Hành Động</th>
                  <th class="py-2 px-3 w-[180px]">Số Chứng Từ / Mã</th>
                  <th class="py-2 px-3 text-right w-[110px]">Số Lượng</th>
                  <th class="py-2 px-3 text-right w-[120px]">Tồn Lũy Kế</th>
                  <th class="py-2 px-3">Ghi Chú</th>
                </tr>
              </thead>
              <tbody>
                @for (item of timelineData; track item.id || $index) {
                  <tr 
                    [ngClass]="{
                      'bg-slate-50/40 font-semibold border-y border-slate-100/80': item.type === 'TỒN ĐẦU KỲ',
                      'border-b border-slate-100/60 hover:bg-slate-50/30 transition-all': item.type !== 'TỒN ĐẦU KỲ'
                    }">
                    
                    <!-- Time -->
                    <td class="py-1.5 px-3 text-[11px] font-medium text-slate-500">
                      @if (item.type === 'TỒN ĐẦU KỲ') {
                        <span>-</span>
                      } @else {
                        <span>{{ item.time | date:'HH:mm:ss dd/MM/yyyy' }}</span>
                      }
                    </td>

                    <!-- Type Tag -->
                    <td class="py-1.5 px-2 text-center">
                      <span 
                        [ngClass]="{
                          'bg-slate-100 text-slate-600 border-slate-200': item.type === 'TỒN ĐẦU KỲ',
                          'bg-emerald-50 text-emerald-700 border-emerald-200': item.type === 'NHẬP',
                          'bg-rose-50 text-rose-700 border-rose-200': item.type === 'XUẤT',
                          'bg-indigo-50 text-indigo-700 border-indigo-200': item.type === 'CHỐT KHO'
                        }"
                        class="px-2 py-0.5 rounded-full text-[9px] font-bold border inline-block text-center uppercase tracking-wide min-w-[70px]">
                        {{ item.type }}
                      </span>
                    </td>

                    <!-- Voucher/Code -->
                    <td class="py-1.5 px-3 text-[11px] font-mono font-bold text-slate-700">
                      @if (item.type === 'TỒN ĐẦU KỲ') {
                        <span class="text-slate-400 font-normal italic">-</span>
                      } @else if (item.type === 'CHỐT KHO') {
                        <span class="text-indigo-600 bg-indigo-50/40 px-1.5 py-0.5 rounded border border-indigo-100/50">{{ item.code }}</span>
                      } @else {
                        <span class="text-slate-800">{{ item.code }}</span>
                      }
                    </td>

                    <!-- Quantity -->
                    <td class="py-1.5 px-3 text-xs text-right font-mono font-bold">
                      @if (item.type === 'NHẬP') {
                        <span class="text-emerald-600">+{{ item.qty | number:'1.0-3' }}</span>
                      } @else if (item.type === 'XUẤT') {
                        <span class="text-rose-600">-{{ item.qty | number:'1.0-3' }}</span>
                      } @else if (item.type === 'CHỐT KHO') {
                        <span class="text-indigo-600" title="Số lượng chốt thực tế">{{ item.qty | number:'1.0-3' }}</span>
                      } @else {
                        <span class="text-slate-400 font-normal">-</span>
                      }
                    </td>

                    <!-- Running Balance -->
                    <td class="py-1.5 px-3 text-xs text-right font-mono font-bold text-slate-800">
                      {{ item.balance | number:'1.0-3' }}
                    </td>

                    <!-- Notes -->
                    <td class="py-1.5 px-3 text-[11px] text-slate-500 max-w-[280px] truncate" [title]="item.ghichu || ''">
                      @if (item.type === 'CHỐT KHO') {
                        <div class="flex items-center gap-1.5">
                          <span class="text-slate-600 font-medium truncate max-w-[120px]">{{ item.ghichu || 'Chốt điều chỉnh' }}</span>
                          <span class="text-[9px] text-slate-400 font-mono">
                            (Hệ:{{ item.sltonhethong | number:'1.0-2' }}|Thực:{{ item.qty | number:'1.0-2' }}|Lệch:{{ item.chenhlech | number:'1.0-2' }})
                          </span>
                        </div>
                      } @else {
                        <span>{{ item.ghichu || '-' }}</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- Footer (Compact) -->
      <div class="flex items-center justify-end gap-3 px-4 py-2 bg-white border-t border-slate-200 shrink-0">
        <button 
          (click)="onClose()" 
          class="px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95">
          Đóng
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: transparent;
      height: 100%;
    }
    .product-timeline-dialog {
      height: 100%;
    }
  `]
})
export class ProductTimelineDialogComponent implements OnInit {
  fromDate!: string;
  toDate!: string;
  timelineData: any[] = [];
  startQty: number = 0;
  totalImport: number = 0;
  totalExport: number = 0;
  endQty: number = 0;
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ProductTimelineDialogComponent>,
    private chotkhoService: ChotkhoService,
    @Inject(MAT_DIALOG_DATA) public data: ProductTimelineDialogData
  ) {}

  ngOnInit(): void {
    // Default to last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    // Format local timezone dates YYYY-MM-DD
    this.fromDate = this.formatLocalDate(sevenDaysAgo);
    this.toDate = this.formatLocalDate(now);

    this.loadTimeline();
  }

  formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async loadTimeline(): Promise<void> {
    if (!this.data.sanphamId) return;

    this.isLoading = true;
    try {
      const defaultKhoId = '4cc01811-61f5-4bdc-83de-a493764e9258';
      const khoId = this.data.khoId || defaultKhoId;

      // Pass absolute date strings (starts of fromDate, end of toDate) to match query bounds
      const fromStr = `${this.fromDate}T00:00:00.000Z`;
      const toStr = `${this.toDate}T23:59:59.999Z`;

      const result = await this.chotkhoService.getProductTimeline(
        this.data.sanphamId,
        khoId,
        fromStr,
        toStr
      );

      if (result) {
        this.startQty = Number(result.startQty || 0);
        this.timelineData = result.timeline || [];
        
        // Calculate Statistics
        this.totalImport = 0;
        this.totalExport = 0;
        
        this.timelineData.forEach((item: any) => {
          if (item.type === 'NHẬP') {
            this.totalImport += Number(item.qty || 0);
          } else if (item.type === 'XUẤT') {
            this.totalExport += Number(item.qty || 0);
          }
        });

        // End qty is the balance of the last event, or startQty if no events
        if (this.timelineData.length > 0) {
          this.endQty = this.timelineData[this.timelineData.length - 1].balance;
        } else {
          this.endQty = this.startQty;
        }
      }
    } catch (error) {
      console.error('Error loading product timeline:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
