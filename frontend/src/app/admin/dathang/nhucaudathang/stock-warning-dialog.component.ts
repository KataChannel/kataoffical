import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChotkhoService } from '../../chotkho/chotkho.service';
import { ProductTimelineDialogComponent } from '../../chotkho/product-timeline-dialog/product-timeline-dialog.component';

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
  pendingList?: { id: string; code: string; date: Date; type: 'dathang' | 'donhang'; status?: string; soluong?: number }[];
}

export interface StockWarningData {
  title: string;
  tongSanPham: number;           // Tổng SP import
  spBinhThuong: number;          // SP bình thường (không cảnh báo)
  spKhongThayDoi: number;        // SP không thay đổi
  danhSachCanhBao: StockWarningItem[];   // Danh sách cảnh báo
  danhSachNhap: { sanphamId: string; soluong: number }[];
  danhSachXuat: { sanphamId: string; soluong: number }[];
  danhSachLoi?: string[];        // 🚩 Bổ sung: Danh sách mã SP không tồn tại trong hệ thống
  danhSachExcel?: { sanphamId: string; soluong: number }[]; // 🚩 Bổ sung để hỗ trợ Tab 1
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
              {{ data.title || 'Đối soát tồn kho' }}
            </h2>
            <p class="text-[12px] text-slate-500 font-medium italic">Đối soát dữ liệu nhập từ Excel - Phát hiện các điểm cần lưu ý</p>
          </div>
          <button (click)="onCancel()" class="p-1.5 hover:bg-slate-200/50 rounded-full transition-colors font-bold text-slate-500">
            <mat-icon class="text-slate-400 scale-90">close</mat-icon>
          </button>
        </div>

        <!-- Sleek Modern Tabs Switcher -->
        <div class="flex border-b border-slate-200 mt-4">
          <button (click)="activeTab = 1" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight ' + 
                           (activeTab === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">trending_down</mat-icon>
            TỒN ÂM HỆ THỐNG ({{ negativeStockList.length }})
          </button>
          <button (click)="activeTab = 2" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight ' + 
                           (activeTab === 2 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">warning</mat-icon>
            CẢNH BÁO & ĐỐI SOÁT ({{ data.danhSachCanhBao.length + (data.danhSachLoi?.length || 0) }})
          </button>
        </div>

        @if (activeTab === 1) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="tab1SearchTerm"
                     (input)="tab1SearchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm theo mã hàng, tên sản phẩm bị âm..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (tab1SearchTerm) {
                <button (click)="tab1SearchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        } @else {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-center gap-2 px-1 overflow-x-auto pb-1 no-scrollbar shrink-0">
               <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Phân loại:</span>
               <button (click)="setFilter('all')" 
                       matTooltip="Hiển thị tất cả các mã hàng có cảnh báo"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'all' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 shadow-sm')">
                  Tất cả ({{ data.danhSachCanhBao.length }})
               </button>
               @if (data.danhSachLoi && data.danhSachLoi.length > 0) {
                 <button (click)="setFilter('error')" 
                         matTooltip="Các mã sản phẩm trong Excel nhưng không tồn tại trong hệ thống"
                         [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                  (selectedFilter === 'error' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white text-red-600 border-red-100 hover:bg-red-50 shadow-sm')">
                    ❌ Mã SP Lỗi ({{ data.danhSachLoi.length }})
                 </button>
               }
               <button (click)="setFilter('late')" 
                       matTooltip="Các sản phẩm có chứng từ treo chưa xử lý quá 24h"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'late' ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white text-rose-600 border-rose-100 hover:bg-rose-50 shadow-sm')">
                  🚩 Trễ (>24h)
               </button>
               <button (click)="setFilter('cao')" 
                       matTooltip="Các lỗi nghiêm trọng: Rủi ro đếm lặp, sai lệch lớn, hoặc tồn cũ bằng 0"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'cao' ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-rose-500 border-rose-100 hover:bg-rose-50 shadow-sm')">
                  🔴 Cấp bách (Cao)
               </button>
               <button (click)="setFilter('tb')" 
                       matTooltip="Các sản phẩm có mức chênh lệch cao (>500%)"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'tb' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50 shadow-sm')">
                  🟡 Chênh lệch (TB)
               </button>
               <div class="w-px h-4 bg-slate-200 mx-1"></div>
               <button (click)="setFilter('tang')" 
                       matTooltip="Các mã hàng sẽ được điều chỉnh TĂNG số lượng tồn"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'tang' ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white text-green-700 border-green-100 hover:bg-green-50 shadow-sm')">
                  📥 Điều chỉnh Tăng
               </button>
               <button (click)="setFilter('giam')" 
                       matTooltip="Các mã hàng sẽ được điều chỉnh GIẢM số lượng tồn"
                       [class]="'px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ' + 
                                (selectedFilter === 'giam' ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-rose-700 border-rose-100 hover:bg-rose-50 shadow-sm')">
                  📤 Điều chỉnh Giảm
               </button>
            </div>
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="searchTerm"
                     (input)="searchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm mã hàng, tên sản phẩm..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (searchTerm) {
                <button (click)="searchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        }
      </div>

      <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-slate-50/30 shadow-inner">
        @if (activeTab === 1) {
          @if (isLoadingNegativeStock) {
            <div class="flex flex-col items-center justify-center py-20 gap-3">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="text-xs text-slate-500 font-bold">Đang tính toán dữ liệu tồn âm từ đợt chốt kho Excel gần nhất...</p>
            </div>
          } @else if (filteredTab1List.length === 0) {
            <div class="flex flex-col items-center justify-center py-20 text-slate-400">
              <div class="bg-slate-100 p-4 rounded-full mb-4">
                <mat-icon class="text-slate-400 scale-150">check_circle_outline</mat-icon>
              </div>
              <p class="font-bold text-slate-600">Không có sản phẩm nào bị tồn âm hệ thống trong ngày!</p>
              @if (latestChotkhoInfo) {
                <p class="text-[11px] text-slate-400 mt-1 italic">Được đối soát từ: {{ latestChotkhoInfo.title }} ({{ latestChotkhoInfo.ngaychot | date:'HH:mm dd/MM/yyyy' }})</p>
              }
            </div>
          } @else {
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              @if (latestChotkhoInfo) {
                <div class="bg-amber-50/50 px-4 py-2.5 border-b border-slate-100 text-[11px] text-slate-600 font-semibold italic flex items-center gap-1.5 shrink-0">
                  <mat-icon class="text-amber-500 scale-90" style="width: 16px; height: 16px; font-size: 16px">history</mat-icon>
                  Tính từ phiên chốt kho Excel gần nhất: <span class="font-black text-slate-900">{{ latestChotkhoInfo.title }}</span> ({{ latestChotkhoInfo.ngaychot | date:'HH:mm:ss dd/MM/yyyy' }})
                </div>
              }
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left">
                  <thead>
                    <tr class="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th class="py-3.5 px-4">Sản Phẩm</th>
                      <th class="py-3.5 px-4 text-center">Tồn Đầu</th>
                      <th class="py-3.5 px-4 text-center">Nhập</th>
                      <th class="py-3.5 px-4 text-center">Xuất</th>
                      <th class="py-3.5 px-4 text-center">Hệ Thống</th>
                      <th class="py-3.5 px-4 text-center bg-blue-50/30 text-blue-700">Thực Tế Từ Excel</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs">
                    @for (item of filteredTab1List; track item.id) {
                      <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="py-3.5 px-4 font-bold text-slate-800">
                          <div class="flex flex-col gap-0.5">
                            <span class="text-slate-800 text-sm font-semibold">{{ item.title }}</span>
                            <span class="text-[10px] text-slate-400 font-medium leading-none">{{ item.masp }} - {{ item.dvt }}</span>
                            <div class="flex flex-wrap gap-1 mt-1.5 shrink-0">
                              <button (click)="openTimeline(item)" class="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60 hover:bg-slate-200 hover:text-slate-850 text-[9px] font-black cursor-pointer transition-all shadow-sm">
                                <mat-icon style="font-size: 11px; width: 11px; height: 11px" class="text-slate-500 scale-90 !m-0">history</mat-icon>
                                Lịch sử
                              </button>
                              
                              @for (order of item.pendingList || []; track order.id) {
                                <button (click)="goToDetail(order)" 
                                        [class]="'flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[9px] font-black cursor-pointer transition-all shadow-sm ' + 
                                                 (order.type === 'dathang' ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100' : 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100')">
                                  <mat-icon style="font-size: 11px; width: 11px; height: 11px" 
                                            [class]="order.type === 'dathang' ? 'text-blue-500' : 'text-orange-500'" class="!m-0">
                                    {{ order.type === 'dathang' ? 'shopping_cart' : 'local_shipping' }}
                                  </mat-icon>
                                  {{ order.code }} ({{ order.soluong | number:'1.0-2' }} kg)
                                </button>
                              }
                            </div>
                          </div>
                        </td>
                        <td class="py-3.5 px-4 text-center text-slate-500 font-medium">{{ item.initialQty | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center text-green-600 font-semibold">+{{ item.receivedQty | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center text-rose-600 font-semibold">-{{ item.shippedQty | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center">
                          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 text-rose-600 border border-rose-100 shadow-sm">
                            {{ item.systemQty | number:'1.0-3' }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 text-center bg-blue-50/10 font-black text-blue-700">
                          @if (item.excelQty > 0) {
                            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                              {{ item.excelQty | number:'1.0-3' }}
                            </span>
                          } @else {
                            <span class="text-slate-400">0</span>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        } @else {
          @if (selectedFilter === 'error') {
            <div class="grid grid-cols-1 gap-3">
              @for (masp of data.danhSachLoi || []; track masp) {
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
                  <div class="flex items-center gap-3">
                    <div class="bg-red-100 p-2 rounded-full">
                      <mat-icon class="text-red-600">error</mat-icon>
                    </div>
                    <div>
                      <h4 class="font-bold text-red-900 text-sm">Mã sản phẩm không tồn tại: <span class="text-rose-600 underline">{{ masp }}</span></h4>
                      <p class="text-xs text-red-700 mt-0.5">Vui lòng kiểm tra lại file Excel hoặc thêm mới sản phẩm này vào hệ thống trước khi chốt kho.</p>
                    </div>
                  </div>
                  <button (click)="onConfirm()" class="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-md hover:bg-red-700 transition-colors shadow-sm">
                    OK, Bỏ qua mã này
                  </button>
                </div>
              }
            </div>
          } @else if (filteredList.length === 0) {
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
                               @for (order of item.pendingList || []; track order.id) {
                                  <div (click)="goToDetail(order)" class="flex-shrink-0 flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-all shadow-sm cursor-pointer select-none">
                                     <mat-icon class="scale-75 !m-0 -ml-1" 
                                               [class.text-blue-600]="order.type === 'dathang'" 
                                               [class.text-orange-600]="order.type === 'donhang'"
                                               style="width: 18px; height: 18px; font-size: 18px">
                                       {{ order.type === 'dathang' ? 'shopping_cart' : 'local_shipping' }}
                                     </mat-icon>
                                     <div class="flex flex-col items-start leading-tight">
                                        <div class="flex items-center gap-1.5">
                                           <span class="text-[10px] font-black" [class.text-blue-800]="order.type === 'dathang'" [class.text-orange-800]="order.type === 'donhang'">{{ order.code }}</span>
                                           @if (order.soluong) {
                                              <span class="text-[9px] font-bold text-slate-400">({{ order.soluong | number:'1.0-2' }} kg)</span>
                                           }
                                        </div>
                                       @if (order.status) {
                                         <span class="text-[8px] uppercase font-bold px-1 rounded-sm mt-0.5"
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
                                   </div>
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
        }
      </div>

      <!-- FOOTER: Responsive -->
      <div class="px-6 py-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <div class="flex items-center gap-4 text-[11px] text-center sm:text-left">
           <p class="font-medium text-slate-500 leading-relaxed">Sẽ thực hiện: 
             <span class="font-black text-green-600">Nhập +{{ data.danhSachNhap.length }}</span>, 
             <span class="font-black text-rose-600">Xuất -{{ data.danhSachXuat.length }}</span> mã hàng
           </p>
        </div>
        <div class="flex w-full sm:w-auto gap-2.5">
          <button (click)="onCancel()" class="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all border border-slate-200">
            Hủy lệnh
          </button>
          <button (click)="onConfirm()" 
                  class="flex-1 sm:flex-none px-6 py-2 text-xs font-black text-white rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  [class.bg-slate-900]="!hasCriticalWarnings" [class.bg-rose-600]="hasCriticalWarnings">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px">check_circle</mat-icon>
            {{ hasCriticalWarnings ? 'Vẫn xác nhận' : 'Xác nhận' }}
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
export class StockWarningDialogComponent implements OnInit {
  hasCriticalWarnings: boolean;
  searchTerm: string = '';
  tab1SearchTerm: string = '';
  selectedFilter: string = 'all';
  
  // Tab properties
  activeTab: number = 1;
  isLoadingNegativeStock: boolean = false;
  negativeStockList: any[] = [];
  latestChotkhoInfo: any = null;

  private chotkhoService = inject(ChotkhoService);
  private dialog = inject(MatDialog);

  get filteredList() {
    let list = this.data.danhSachCanhBao || [];
    if (this.selectedFilter !== 'all') {
      switch (this.selectedFilter) {
        case 'error': return [];
        case 'late': list = list.filter(item => item.isLate); break;
        case 'cao': list = list.filter(item => item.mucDoNghiemTrong === 'cao'); break;
        case 'tb': list = list.filter(item => item.mucDoNghiemTrong === 'trung_binh'); break;
        case 'tang': list = list.filter(item => item.loaiDieuChinh === 'tang'); break;
        case 'giam': list = list.filter(item => item.loaiDieuChinh === 'giam'); break;
      }
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  get filteredTab1List() {
    let list = this.negativeStockList || [];
    if (this.tab1SearchTerm.trim()) {
      const term = this.tab1SearchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  constructor(
    public dialogRef: MatDialogRef<StockWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockWarningData
  ) {
    this.hasCriticalWarnings = data.danhSachCanhBao.some(w => w.mucDoNghiemTrong === 'cao');
    if (data.danhSachLoi && data.danhSachLoi.length > 0) {
      this.selectedFilter = 'error';
      this.activeTab = 2;
    }
  }

  async ngOnInit() {
    await this.loadNegativeStockReport();
  }

  async loadNegativeStockReport() {
    try {
      this.isLoadingNegativeStock = true;
      const response = await this.chotkhoService.getNegativeStockReport();
      if (response && response.products) {
        this.latestChotkhoInfo = response.latestChotkho;
        const excelQtyMap = new Map<string, number>();
        if (this.data.danhSachExcel && this.data.danhSachExcel.length > 0) {
          this.data.danhSachExcel.forEach(item => {
            excelQtyMap.set(item.sanphamId, Number(item.soluong || 0));
          });
        }
        this.negativeStockList = response.products.map((p: any) => {
          const excelQty = excelQtyMap.has(p.id) ? excelQtyMap.get(p.id) : 0;
          return { ...p, excelQty: excelQty };
        });
      }
    } catch (error) {
      console.error('Error loading negative stock report:', error);
    } finally {
      this.isLoadingNegativeStock = false;
    }
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.activeTab = 2;
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
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }

  openTimeline(item: any) {
    this.dialog.open(ProductTimelineDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '92vh',
      data: {
        sanphamId: item.id || item.sanphamId,
        masp: item.masp,
        title: item.title,
        dvt: item.dvt
      }
    });
  }
}
