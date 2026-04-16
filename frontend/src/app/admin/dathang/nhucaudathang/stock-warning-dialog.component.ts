import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface StockWarningItem {
  masp: string;
  title: string;
  sltonCu: number;        // Tồn chốt kho cũ (sltontt)
  sltonMoi: number;        // Giá trị import mới
  chenhLech: number;       // Mức chênh lệch
  loaiDieuChinh: 'tang' | 'giam' | 'khong_doi'; // Tăng hay giảm
  lyDoCanhBao: string;     // Lý do cảnh báo
  mucDoNghiemTrong: 'cao' | 'trung_binh' | 'thap';
  isLate?: boolean;        // 🚩 Bổ sung: Cảnh báo trễ chứng từ > 24h
  oldestPendingDate?: Date | null; // Ngày chứng từ trễ nhất
  slchonhap?: number;
  slchogiao?: number;
  pendingList?: { id: string; code: string; date: Date; type: 'dathang' | 'donhang'; status?: string }[];
}

export interface StockWarningData {
  title: string;
  tongSanPham: number;           // Tổng SP import
  spBinhThuong: number;          // SP bình thường (không cảnh báo)
  spKhongThayDoi: number;        // SP không thay đổi
  danhSachCanhBao: StockWarningItem[];   // Danh sách cảnh báo
  danhSachNhap: { sanphamId: string; soluong: number }[];
  danhSachXuat: { sanphamId: string; soluong: number }[];
}

@Component({
  selector: 'app-stock-warning-dialog',
  template: `
    <div class="flex flex-col h-full w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
      <!-- HEADER: Compact NY Style -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-0.5">
            <h2 class="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <mat-icon class="text-amber-500 scale-110">auto_graph</mat-icon>
              {{ data.title }}
            </h2>
            <p class="text-[12px] text-slate-500 font-medium italic">Đối soát dữ liệu nhập từ Excel - Phát hiện các điểm cần lưu ý</p>
          </div>
          <button (click)="onCancel()" class="p-1.5 hover:bg-slate-200/50 rounded-full transition-colors font-bold text-slate-500">
            <mat-icon class="text-slate-400 scale-90">close</mat-icon>
          </button>
        </div>

        <!-- STATS CARDS: Smaller & Slimmer -->
        <div class="grid grid-cols-4 gap-3 mt-4">
          <div class="bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm cursor-pointer hover:bg-slate-50 transition-colors" (click)="setFilter('all')">
            <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">Tổng sản phẩm</p>
            <div class="text-lg font-black text-slate-800">{{ data.tongSanPham }}</div>
          </div>
          <div class="bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm border-l-4 border-l-green-500 opacity-60">
            <p class="text-[9px] font-bold uppercase tracking-wider text-green-600">Bình thường</p>
            <div class="text-lg font-black text-slate-800">{{ data.spBinhThuong }}</div>
          </div>
          <div class="bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm border-l-4 border-l-slate-300 opacity-60">
            <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">Không đổi</p>
            <div class="text-lg font-black text-slate-800">{{ data.spKhongThayDoi }}</div>
          </div>
          <div class="bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm border-l-4 border-l-rose-500 ring-2 transition-all cursor-pointer hover:bg-rose-50/30" 
               [class.ring-rose-200]="selectedFilter === 'all' || selectedFilter === 'cao' || selectedFilter === 'late' || selectedFilter === 'tb'"
               [class.ring-transparent]="!(selectedFilter === 'all' || selectedFilter === 'cao' || selectedFilter === 'late' || selectedFilter === 'tb')"
               (click)="setFilter('all')">
            <p class="text-[9px] font-bold uppercase tracking-wider text-rose-600">⚠️ Cảnh báo</p>
            <div class="text-lg font-black text-rose-600">{{ data.danhSachCanhBao.length }}</div>
          </div>
        </div>
        <!-- QUICK FILTER BADGES: NY Style -->
        <div class="flex items-center gap-2 mt-4 px-1 overflow-x-auto pb-1 no-scrollbar">
           <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Phân loại:</span>
           
           <button (click)="setFilter('all')" 
                   matTooltip="Hiển thị tất cả các mã hàng có cảnh báo"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'all' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 shadow-sm')">
              Tất cả ({{ data.danhSachCanhBao.length }})
           </button>

           <button (click)="setFilter('late')" 
                   matTooltip="Các sản phẩm có chứng từ treo chưa xử lý quá 24h"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'late' ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white text-rose-600 border-rose-100 hover:bg-rose-50 shadow-sm')">
              🚩 Trễ (>24h)
           </button>

           <button (click)="setFilter('cao')" 
                   matTooltip="Các lỗi nghiêm trọng: Rủi ro đếm lặp, sai lệch lớn, hoặc tồn cũ bằng 0"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'cao' ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50 shadow-sm')">
              🔴 Cấp bách (Cao)
           </button>

           <button (click)="setFilter('tb')" 
                   matTooltip="Các sản phẩm có mức chênh lệch cao (>500%)"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'tb' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50 shadow-sm')">
              🟡 Chênh lệch (TB)
           </button>

           <div class="w-px h-4 bg-slate-200 mx-1"></div>

           <button (click)="setFilter('tang')" 
                   matTooltip="Các mã hàng sẽ được điều chỉnh TĂNG số lượng tồn"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'tang' ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-green-700 border-green-100 hover:bg-green-50 shadow-sm')">
              📥 Điều chỉnh Tăng
           </button>

           <button (click)="setFilter('giam')" 
                   matTooltip="Các mã hàng sẽ được điều chỉnh GIẢM số lượng tồn"
                   [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 ' + 
                            (selectedFilter === 'giam' ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-rose-700 border-rose-100 hover:bg-rose-50 shadow-sm')">
              📤 Điều chỉnh Giảm
           </button>
        </div>
      </div>

      <!-- CONTENT: Scrollable with better spacing -->
      <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-slate-50/30 shadow-inner">
        @if (filteredList.length === 0) {
          <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
             <div class="bg-slate-100 p-4 rounded-full mb-4">
                <mat-icon class="text-slate-400 scale-150">search_off</mat-icon>
             </div>
             <p class="font-bold text-slate-600 capitalize">Không có sản phẩm nào cho mục này</p>
             <button (click)="setFilter('all')" class="mt-4 text-xs text-blue-600 font-bold hover:underline underline-offset-4">Xem tất cả cảnh báo</button>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            @for (item of filteredList; track item.masp) {
              <div class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-slate-300 transition-all duration-200">
                <div class="absolute left-0 top-0 bottom-0 w-1" 
                     [class.bg-rose-500]="item.mucDoNghiemTrong === 'cao' || item.isLate"
                     [class.bg-amber-400]="item.mucDoNghiemTrong === 'trung_binh' && !item.isLate"
                     [class.bg-slate-200]="item.mucDoNghiemTrong === 'thap'"></div>

                <div class="p-3 pl-5">
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2 overflow-hidden">
                       <span class="px-1.5 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded border border-slate-200 whitespace-nowrap">{{ item.masp }}</span>
                       <h4 class="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">{{ item.title }}</h4>
                    </div>
                    <div class="flex gap-1 shrink-0">
                       @if (item.isLate) {
                          <span class="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase bg-rose-600 text-white animate-pulse">TRỄ</span>
                       }
                       <span class="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase"
                             [class.bg-rose-50]="item.mucDoNghiemTrong === 'cao'" [class.text-rose-700]="item.mucDoNghiemTrong === 'cao'"
                             [class.bg-amber-50]="item.mucDoNghiemTrong === 'trung_binh'" [class.text-amber-700]="item.mucDoNghiemTrong === 'trung_binh'">
                         {{ item.mucDoNghiemTrong === 'cao' ? '🔴 CAO' : '🟡 TB' }}
                       </span>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded border border-slate-100 mb-2">
                     <div class="flex flex-col">
                        <span class="text-[8px] uppercase font-bold text-slate-400 leading-tight tracking-wider">Tồn cũ</span>
                        <span class="text-xs font-bold text-slate-500">{{ item.sltonCu | number:'1.0-3' }}</span>
                     </div>
                     <div class="flex flex-col border-l border-slate-200 pl-2">
                        <span class="text-[8px] uppercase font-bold text-slate-400 leading-tight tracking-wider">Nhập</span>
                        <span class="text-xs font-black text-slate-900">{{ item.sltonMoi | number:'1.0-3' }}</span>
                     </div>
                     <div class="flex flex-col border-l border-slate-200 pl-2">
                        <span class="text-[8px] uppercase font-bold text-slate-400 leading-tight tracking-wider">Lệch</span>
                        <div class="flex items-center gap-1">
                           <span class="text-xs font-black" [class.text-green-600]="item.loaiDieuChinh === 'tang'" [class.text-rose-600]="item.loaiDieuChinh === 'giam'" [class.text-slate-400]="item.loaiDieuChinh === 'khong_doi'">
                              {{ item.loaiDieuChinh === 'tang' ? '+' : (item.loaiDieuChinh === 'giam' ? '-' : '') }}{{ item.chenhLech | number:'1.0-3' }}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div class="flex flex-col gap-2 p-2 rounded italic" 
                       [class.bg-rose-50]="item.isLate || item.mucDoNghiemTrong === 'cao'"
                       [class.bg-amber-50]="!item.isLate && item.mucDoNghiemTrong === 'trung_binh'">
                    <div class="flex gap-2 items-start">
                      <mat-icon class="scale-75 shrink-0" 
                                [class.text-rose-500]="item.isLate || item.mucDoNghiemTrong === 'cao'" 
                                [class.text-amber-500]="!item.isLate && item.mucDoNghiemTrong === 'trung_binh'"
                                style="width: 16px; height: 16px; font-size: 16px">info</mat-icon>
                      <p class="text-[10px] leading-tight font-medium"
                         [class.text-rose-800]="item.isLate || item.mucDoNghiemTrong === 'cao'" 
                         [class.text-amber-800]="!item.isLate && item.mucDoNghiemTrong === 'trung_binh'">
                         {{ item.lyDoCanhBao }}
                      </p>
                    </div>

                    @if ((item.slchonhap ?? 0) > 0 || (item.slchogiao ?? 0) > 0) {
                       <div class="mt-2 border-t border-slate-200/50 pt-2">
                          <p class="text-[9px] uppercase font-bold text-slate-500 mb-2">Đơn hàng cần xử lý:</p>
                          <div class="flex gap-2 overflow-x-auto custom-scrollbar pb-2" style="white-space: nowrap;">
                             @for (order of item.pendingList; track order.id) {
                                <button mat-button (click)="goToDetail(order)" class="!bg-white !border !border-slate-200 !rounded-lg !px-3 !py-1 !flex !items-center !gap-1 hover:!bg-slate-50 transition-all shadow-sm">
                                  <mat-icon class="scale-50 !m-0" 
                                            [class.text-blue-600]="order.type === 'dathang'" 
                                            [class.text-orange-600]="order.type === 'donhang'">
                                    {{ order.type === 'dathang' ? 'arrow_downward' : 'arrow_upward' }}
                                  </mat-icon>
                                  <div class="flex flex-col items-start leading-none">
                                    <span class="text-[10px] font-black" [class.text-blue-800]="order.type === 'dathang'" [class.text-orange-800]="order.type === 'donhang'">{{ order.code }}</span>
                                    @if (order.status) {
                                      <span class="text-[7px] uppercase font-bold px-1 rounded-sm mt-0.5"
                                            [class.bg-green-100]="order.status === 'danhan' || order.status === 'hoanthanh'"
                                            [class.text-green-700]="order.status === 'danhan' || order.status === 'hoanthanh'"
                                            [class.bg-amber-100]="order.status === 'dadat' || order.status === 'dagiao'"
                                            [class.text-amber-700]="order.status === 'dadat' || order.status === 'dagiao'">
                                        {{ order.status === 'dadat' ? 'Đã đặt' : 
                                           order.status === 'dagiao' ? 'Đang giao' : 
                                           order.status === 'danhan' ? 'Đã nhận' : order.status }}
                                      </span>
                                    }
                                  </div>
                                </button>
                             }
                          </div>
                          @if (!item.pendingList?.length) {
                             <span class="text-[10px] text-slate-400 italic">Không tìm thấy mã đơn</span>
                          }
                       </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <!-- FOOTER: Slimmer -->
      <div class="px-6 py-3 border-t border-slate-100 bg-white flex justify-between items-center shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <div class="flex items-center gap-4 text-[11px]">
           <p class="font-medium text-slate-500">Sẽ thực hiện: 
             <span class="font-black text-green-600 ml-1">Nhập +{{ data.danhSachNhap.length }}</span>, 
             <span class="font-black text-rose-600 ml-1">Xuất -{{ data.danhSachXuat.length }}</span> mã hàng
           </p>
        </div>

        <div class="flex gap-2.5">
          <button (click)="onCancel()" class="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all border border-slate-200">
            Hủy lệnh
          </button>
          <button (click)="onConfirm()" 
                  class="px-6 py-2 text-xs font-black text-white rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
                  [class.bg-slate-900]="!hasCriticalWarnings" [class.bg-rose-600]="hasCriticalWarnings">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px">check_circle</mat-icon>
            {{ hasCriticalWarnings ? 'Vẫn xác nhận cập nhật' : 'Xác nhận cập nhật' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
       width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
       background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
       background: #e2e8f0;
       border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
       background: #cbd5e1;
    }
  `],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  standalone: true
})
export class StockWarningDialogComponent {
  hasCriticalWarnings: boolean;
  selectedFilter: string = 'all';

  get filteredList() {
    let list = this.data.danhSachCanhBao;
    
    switch (this.selectedFilter) {
      case 'late':
        return list.filter(item => item.isLate);
      case 'cao':
        return list.filter(item => item.mucDoNghiemTrong === 'cao');
      case 'tb':
        return list.filter(item => item.mucDoNghiemTrong === 'trung_binh');
      case 'tang':
        return list.filter(item => item.loaiDieuChinh === 'tang');
      case 'giam':
        return list.filter(item => item.loaiDieuChinh === 'giam');
      default:
        return list;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<StockWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockWarningData
  ) {
    this.hasCriticalWarnings = data.danhSachCanhBao.some(w => w.mucDoNghiemTrong === 'cao');
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  goToDetail(order: any) {
    const url = order.type === 'dathang' 
      ? `/admin/dathang/${order.id}` 
      : `/admin/phieugiaohang/${order.id}`;
    window.open(url, '_blank');
  }
}
