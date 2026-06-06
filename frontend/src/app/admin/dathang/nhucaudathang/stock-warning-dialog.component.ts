import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChotkhoService } from '../../chotkho/chotkho.service';
import { ProductTimelineDialogComponent } from '../../chotkho/product-timeline-dialog/product-timeline-dialog.component';

export interface StockWarningItem {
  id?: string;             // 🚩 Bổ sung: ID sản phẩm
  masp: string;
  title: string;
  dvt?: string;            // 🚩 Bổ sung: Đơn vị tính
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

        <!-- Sleek Modern Tabs Switcher (5 Tabs) -->
        <div class="flex border-b border-slate-200 mt-4 overflow-x-auto no-scrollbar shrink-0">
          <button (click)="activeTab = 1" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight whitespace-nowrap ' + 
                           (activeTab === 1 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">trending_down</mat-icon>
            TỒN ÂM HỆ THỐNG ({{ negativeStockList.length }})
          </button>
          <button (click)="activeTab = 2" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight whitespace-nowrap ' + 
                           (activeTab === 2 ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">update</mat-icon>
            TRỄ CHỨNG TỪ & ĐẾM LẶP ({{ lateAndDoubleCountingList.length }})
          </button>
          <button (click)="activeTab = 3" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight whitespace-nowrap ' + 
                           (activeTab === 3 ? 'border-rose-500 text-rose-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">warning</mat-icon>
            SAI LỆCH LỚN ({{ largeDiscrepancyList.length }})
          </button>
          <button (click)="activeTab = 4" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight whitespace-nowrap ' + 
                           (activeTab === 4 ? 'border-slate-600 text-slate-700' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">feedback</mat-icon>
            SẢN PHẨM BỎ SÓT ({{ missingStockList.length }})
          </button>
          <button (click)="activeTab = 5" 
                  [class]="'pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight whitespace-nowrap ' + 
                           (activeTab === 5 ? 'border-green-600 text-green-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300')">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">check_circle</mat-icon>
            KHỚP SỐ LIỆU ({{ matchedStockList.length }})
          </button>
        </div>

        <!-- Dynamic Warnings & Search inputs for each Tab -->
        @if (activeTab === 1) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg border bg-rose-50 border-rose-100 text-rose-800 text-[11px] font-medium leading-relaxed">
              <mat-icon class="text-rose-500 scale-90 shrink-0" style="width: 16px; height: 16px; font-size: 16px">info</mat-icon>
              <div>
                <span class="font-black">🔴 Nguyên nhân:</span> Do bán hàng vật lý đi trước khi xác nhận nhận hàng từ Nhà cung cấp trên phần mềm.
                <br>
                <span class="font-black">👉 Hướng xử lý:</span> Click chọn các đơn NCC bên dưới để hệ thống tự động làm thủ tục nhập kho bù chênh lệch trước khi chốt.
              </div>
            </div>
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
        }

        @if (activeTab === 2) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg border bg-amber-50 border-amber-100 text-amber-800 text-[11px] font-medium leading-relaxed">
              <mat-icon class="text-amber-500 scale-90 shrink-0" style="width: 16px; height: 16px; font-size: 16px">info</mat-icon>
              <div>
                <span class="font-black">🟡 Nguyên nhân:</span> Tồn kho sổ sách lệch và có đơn hàng mua/bán đang "trung chuyển" quá 24h chưa hoàn tất. Có rủi ro nhân viên đếm lặp cả hàng đang về.
                <br>
                <span class="font-black">👉 Hướng xử lý:</span> Kiểm tra hàng hóa vật lý thực tế đã nhập/xuất kho chưa để cập nhật trạng thái đơn tương ứng, tránh đếm lặp gây sai lệch kép.
              </div>
            </div>
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="searchTerm"
                     (input)="searchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm mã hàng, tên sản phẩm có đơn treo..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (searchTerm) {
                <button (click)="searchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        }

        @if (activeTab === 3) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg border bg-rose-50 border-rose-100 text-rose-800 text-[11px] font-medium leading-relaxed">
              <mat-icon class="text-rose-500 scale-90 shrink-0" style="width: 16px; height: 16px; font-size: 16px">info</mat-icon>
              <div>
                <span class="font-black">⚠️ Nguyên nhân:</span> Chênh lệch số liệu kiểm kê và sổ sách vượt ngưỡng bất thường (hao hụt lớn hoặc gõ nhầm số khi kiểm đếm).
                <br>
                <span class="font-black">👉 Hướng xử lý:</span> Yêu cầu kiểm đếm (đếm lại) thực tế sản phẩm này một lần nữa để xác nhận số liệu chính xác.
              </div>
            </div>
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="searchTerm"
                     (input)="searchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm mã hàng, tên sản phẩm lệch lớn..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (searchTerm) {
                <button (click)="searchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        }

        @if (activeTab === 4) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg border bg-slate-100 border-slate-200 text-slate-800 text-[11px] font-medium leading-relaxed">
              <mat-icon class="text-slate-500 scale-90 shrink-0" style="width: 16px; height: 16px; font-size: 16px">info</mat-icon>
              <div>
                <span class="font-black">⚠️ Cảnh báo mất tồn:</span> Các sản phẩm này hiện có tồn trên hệ thống nhưng không có mặt trong file Excel kiểm kho. Hệ thống sẽ **tự động reset tồn về 0** sau khi chốt kho!
                <br>
                <span class="font-black">👉 Hướng xử lý:</span> Vui lòng kiểm tra lại file Excel và bổ sung các mã hàng này nếu chúng thực tế vẫn còn tồn kho.
              </div>
            </div>
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="tab4SearchTerm"
                     (input)="tab4SearchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm mã sản phẩm, tên sản phẩm bỏ sót..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (tab4SearchTerm) {
                <button (click)="tab4SearchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        }

        @if (activeTab === 5) {
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg border bg-green-50 border-green-100 text-green-850 text-[11px] font-medium leading-relaxed">
              <mat-icon class="text-green-500 scale-90 shrink-0" style="width: 16px; height: 16px; font-size: 16px">check_circle</mat-icon>
              <div>
                <span class="font-black">✅ Trạng thái:</span> Số liệu thực tế đếm được từ Excel trùng khớp hoàn toàn với số tồn tính toán trên hệ thống. Không phát hiện sai lệch.
              </div>
            </div>
            <div class="relative w-full overflow-hidden">
              <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 scale-75" style="width: 18px; height: 18px; font-size: 18px">search</mat-icon>
              <input type="text" 
                     [value]="tab5SearchTerm"
                     (input)="tab5SearchTerm = $any($event.target).value"
                     placeholder="Tìm kiếm mã sản phẩm, tên sản phẩm trùng khớp..."
                     class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none shadow-sm">
              @if (tab5SearchTerm) {
                <button (click)="tab5SearchTerm = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <mat-icon style="width: 14px; height: 14px; font-size: 14px">cancel</mat-icon>
                </button>
              }
            </div>
          </div>
        }
      </div>

      <div class="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-slate-50/30 shadow-inner">
        <!-- TAB 1: TỒN ÂM HỆ THỐNG -->
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
        }

        <!-- TAB 2: TRỄ CHỨNG TỪ & ĐẾM LẶP (HIỂN THỊ DẠNG BẢNG NGANG GIỐNG TAB 1) -->
        @if (activeTab === 2) {
          @if (filteredTab2List.length === 0) {
            <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
               <div class="bg-slate-100 p-4 rounded-full mb-4">
                  <mat-icon class="text-slate-400 scale-150">check_circle_outline</mat-icon>
               </div>
               <p class="font-bold text-slate-600">Không có sản phẩm nào bị trễ chứng từ hoặc đếm lặp!</p>
            </div>
          } @else {
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left">
                  <thead>
                    <tr class="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th class="py-3.5 px-4">Sản Phẩm & Cảnh Báo</th>
                      <th class="py-3.5 px-4 text-center">Tồn Hệ Thống</th>
                      <th class="py-3.5 px-4 text-center bg-blue-50/30 text-blue-700">Thực Tế Từ Excel</th>
                      <th class="py-3.5 px-4 text-center">Chênh Lệch</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs">
                    @for (item of filteredTab2List; track item.masp) {
                      <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="py-3.5 px-4 font-bold text-slate-800">
                          <div class="flex flex-col gap-0.5">
                            <div class="flex items-center gap-2">
                              <span class="text-slate-800 text-sm font-semibold">{{ item.title }}</span>
                              @if (item.isLate) {
                                <span class="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-rose-600 text-white animate-pulse">TRỄ</span>
                              }
                            </div>
                            <span class="text-[10px] text-slate-400 font-medium leading-none">{{ item.masp }} - {{ item.dvt }}</span>
                            
                            <!-- Hộp cảnh báo nằm ngay dưới tên sản phẩm -->
                            <div class="mt-1 text-[10px] px-2 py-1 bg-amber-50 text-amber-850 rounded border border-amber-100/60 leading-tight font-medium max-w-xl">
                              ⚠️ {{ item.lyDoCanhBao }}
                            </div>

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
                        <td class="py-3.5 px-4 text-center text-slate-500 font-medium">{{ item.sltonCu | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center bg-blue-50/10 font-black text-blue-700">
                          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                            {{ item.sltonMoi | number:'1.0-3' }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 text-center">
                          <span class="px-2 py-0.5 rounded font-black text-[11px]" 
                                [class.text-green-600]="item.loaiDieuChinh === 'tang'" 
                                [class.text-rose-600]="item.loaiDieuChinh === 'giam'" 
                                [class.text-slate-400]="item.loaiDieuChinh === 'khong_doi'">
                            {{ item.loaiDieuChinh === 'tang' ? '+' : (item.loaiDieuChinh === 'giam' ? '-' : '') }}{{ item.chenhLech | number:'1.0-3' }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        }

        <!-- TAB 3: SAI LỆCH LỚN (HIỂN THỊ DẠNG BẢNG NGANG GIỐNG TAB 1) -->
        @if (activeTab === 3) {
          @if (filteredTab3List.length === 0) {
            <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
               <div class="bg-slate-100 p-4 rounded-full mb-4">
                  <mat-icon class="text-slate-400 scale-150">check_circle_outline</mat-icon>
               </div>
               <p class="font-bold text-slate-600">Không có sản phẩm nào bị cảnh báo sai lệch lớn!</p>
            </div>
          } @else {
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left">
                  <thead>
                    <tr class="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th class="py-3.5 px-4">Sản Phẩm & Cảnh Báo</th>
                      <th class="py-3.5 px-4 text-center">Tồn Hệ Thống</th>
                      <th class="py-3.5 px-4 text-center bg-blue-50/30 text-blue-700">Thực Tế Từ Excel</th>
                      <th class="py-3.5 px-4 text-center">Chênh Lệch</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs">
                    @for (item of filteredTab3List; track item.masp) {
                      <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="py-3.5 px-4 font-bold text-slate-800">
                          <div class="flex flex-col gap-0.5">
                            <div class="flex items-center gap-2">
                              <span class="text-slate-800 text-sm font-semibold">{{ item.title }}</span>
                              <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase"
                                    [class.bg-rose-50]="item.mucDoNghiemTrong === 'cao'" [class.text-rose-700]="item.mucDoNghiemTrong === 'cao'"
                                    [class.bg-amber-50]="item.mucDoNghiemTrong === 'trung_binh'" [class.text-amber-700]="item.mucDoNghiemTrong === 'trung_binh'">
                                {{ item.mucDoNghiemTrong === 'cao' ? '🔴 CAO' : '🟡 TB' }}
                              </span>
                            </div>
                            <span class="text-[10px] text-slate-400 font-medium leading-none">{{ item.masp }} - {{ item.dvt }}</span>
                            
                            <!-- Hộp cảnh báo nằm ngay dưới tên sản phẩm -->
                            <div class="mt-1 text-[10px] px-2 py-1 bg-rose-50 text-rose-800 rounded border border-rose-100/60 leading-tight font-medium max-w-xl">
                              ⚠️ {{ item.lyDoCanhBao }}
                            </div>

                            <div class="flex flex-wrap gap-1 mt-1.5 shrink-0">
                              <button (click)="openTimeline(item)" class="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60 hover:bg-slate-200 hover:text-slate-850 text-[9px] font-black cursor-pointer transition-all shadow-sm">
                                <mat-icon style="font-size: 11px; width: 11px; height: 11px" class="text-slate-500 scale-90 !m-0">history</mat-icon>
                                Lịch sử
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="py-3.5 px-4 text-center text-slate-500 font-medium">{{ item.sltonCu | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center bg-blue-50/10 font-black text-blue-700">
                          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                            {{ item.sltonMoi | number:'1.0-3' }}
                          </span>
                        </td>
                        <td class="py-3.5 px-4 text-center">
                          <span class="px-2 py-0.5 rounded font-black text-[11px]" 
                                [class.text-green-600]="item.loaiDieuChinh === 'tang'" 
                                [class.text-rose-600]="item.loaiDieuChinh === 'giam'" 
                                [class.text-slate-400]="item.loaiDieuChinh === 'khong_doi'">
                            {{ item.loaiDieuChinh === 'tang' ? '+' : (item.loaiDieuChinh === 'giam' ? '-' : '') }}{{ item.chenhLech | number:'1.0-3' }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        }

        <!-- TAB 4: SẢN PHẨM BỎ SÓT -->
        @if (activeTab === 4) {
          @if (filteredTab4List.length === 0) {
            <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
               <div class="bg-slate-100 p-4 rounded-full mb-4">
                  <mat-icon class="text-slate-400 scale-150">check_circle_outline</mat-icon>
               </div>
               <p class="font-bold text-slate-600">Không có sản phẩm nào bị bỏ sót trong file Excel!</p>
            </div>
          } @else {
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left">
                  <thead>
                    <tr class="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th class="py-3.5 px-4">Sản Phẩm</th>
                      <th class="py-3.5 px-4 text-center">Tồn Đầu Baseline</th>
                      <th class="py-3.5 px-4 text-center">Tồn Hệ Thống Hiện Tại</th>
                      <th class="py-3.5 px-4 text-center bg-rose-50/30 text-rose-700">Tồn Chốt Mới Dự Kiến</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs">
                    @for (item of filteredTab4List; track item.id) {
                      <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="py-3.5 px-4 font-bold text-slate-800">
                          <div class="flex flex-col gap-0.5">
                            <span class="text-slate-800 text-sm font-semibold">{{ item.title }}</span>
                            <span class="text-[10px] text-slate-400 font-medium leading-none">{{ item.masp }} - {{ item.dvt }}</span>
                          </div>
                        </td>
                        <td class="py-3.5 px-4 text-center text-slate-500 font-medium">{{ item.sltontt | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center text-slate-900 font-semibold">{{ item.slton | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center bg-rose-50/10 font-black text-rose-600">0.000 <span class="text-[9px] font-medium text-rose-400">(Tự động reset)</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        }

        <!-- TAB 5: KHỚP SỐ LIỆU -->
        @if (activeTab === 5) {
          @if (filteredTab5List.length === 0) {
            <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
               <div class="bg-slate-100 p-4 rounded-full mb-4">
                  <mat-icon class="text-slate-400 scale-150">search_off</mat-icon>
               </div>
               <p class="font-bold text-slate-600">Không có sản phẩm nào khớp số liệu hoàn toàn!</p>
            </div>
          } @else {
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse text-left">
                  <thead>
                    <tr class="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      <th class="py-3.5 px-4">Sản Phẩm</th>
                      <th class="py-3.5 px-4 text-center">Tồn Hệ Thống</th>
                      <th class="py-3.5 px-4 text-center bg-green-50/30 text-green-700">Tồn Kiểm Kê Excel</th>
                      <th class="py-3.5 px-4 text-center">Chênh Lệch</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-xs">
                    @for (item of filteredTab5List; track item.id) {
                      <tr class="hover:bg-slate-50/50 transition-colors">
                        <td class="py-3.5 px-4 font-bold text-slate-800">
                          <div class="flex flex-col gap-0.5">
                            <span class="text-slate-800 text-sm font-semibold">{{ item.title }}</span>
                            <span class="text-[10px] text-slate-400 font-medium leading-none">{{ item.masp }} - {{ item.dvt }}</span>
                          </div>
                        </td>
                        <td class="py-3.5 px-4 text-center text-slate-500 font-medium">{{ item.systemQty | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center bg-green-50/10 font-semibold text-green-700">{{ item.excelQty | number:'1.0-3' }}</td>
                        <td class="py-3.5 px-4 text-center text-slate-400">0.000</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
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
  tab4SearchTerm: string = '';
  tab5SearchTerm: string = '';
  selectedFilter: string = 'all';
  
  // Tab properties
  activeTab: number = 1;
  isLoadingNegativeStock: boolean = false;
  negativeStockList: any[] = [];
  latestChotkhoInfo: any = null;

  // New Tab lists
  allSystemProducts: any[] = [];
  lateAndDoubleCountingList: StockWarningItem[] = []; // Tab 2
  largeDiscrepancyList: StockWarningItem[] = []; // Tab 3
  missingStockList: any[] = []; // Tab 4
  matchedStockList: any[] = []; // Tab 5

  private chotkhoService = inject(ChotkhoService);
  private dialog = inject(MatDialog);

  get filteredList() {
    let list = this.data.danhSachCanhBao || [];
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

  get filteredTab2List() {
    let list = this.lateAndDoubleCountingList || [];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  get filteredTab3List() {
    let list = this.largeDiscrepancyList || [];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  get filteredTab4List() {
    let list = this.missingStockList || [];
    if (this.tab4SearchTerm.trim()) {
      const term = this.tab4SearchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  get filteredTab5List() {
    let list = this.matchedStockList || [];
    if (this.tab5SearchTerm.trim()) {
      const term = this.tab5SearchTerm.toLowerCase().trim();
      list = list.filter(item => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }

  constructor(
    public dialogRef: MatDialogRef<StockWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockWarningData
  ) {
    this.hasCriticalWarnings = data.danhSachCanhBao.some(w => w.mucDoNghiemTrong === 'cao');
  }

  async ngOnInit() {
    this.isLoadingNegativeStock = true;
    try {
      await Promise.all([
        this.loadNegativeStockReport(),
        this.loadAllSystemProducts()
      ]);
      this.categorizeLists();
    } catch (err) {
      console.error('Error on init stock warning dialog:', err);
    } finally {
      this.isLoadingNegativeStock = false;
    }
  }

  async loadNegativeStockReport() {
    try {
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
    }
  }

  async loadAllSystemProducts() {
    try {
      const response = await this.chotkhoService.getAllProducts();
      this.allSystemProducts = response || [];
    } catch (error) {
      console.error('Error loading all system products:', error);
    }
  }

  categorizeLists() {
    const warningList = this.data.danhSachCanhBao || [];
    
    // Tab 2: Trễ chứng từ hoặc Đếm lặp
    const rawLate = warningList.filter(item => 
      item.isLate || 
      item.lyDoCanhBao.includes('ĐẾM LẶP') || 
      item.lyDoCanhBao.includes('lặp') || 
      item.lyDoCanhBao.includes('trung chuyển')
    );
    this.lateAndDoubleCountingList = rawLate.map(item => {
      const p = this.allSystemProducts.find(sp => sp.masp === item.masp);
      return { ...item, dvt: p?.dvt || 'Kg', id: p?.id || '' };
    });

    // Tab 3: Sai lệch lớn (Các cảnh báo còn lại)
    const rawLarge = warningList.filter(item => 
      !rawLate.some(late => late.masp === item.masp)
    );
    this.largeDiscrepancyList = rawLarge.map(item => {
      const p = this.allSystemProducts.find(sp => sp.masp === item.masp);
      return { ...item, dvt: p?.dvt || 'Kg', id: p?.id || '' };
    });

    // Tab 4: Sản phẩm bị bỏ sót (Có tồn trong hệ thống nhưng không có trong Excel)
    const excelSpIds = new Set(this.data.danhSachExcel?.map(item => item.sanphamId) || []);
    this.missingStockList = this.allSystemProducts
      .filter(p => {
        const hasStock = (Number(p.tonkho?.slton) > 0 || Number(p.tonkho?.sltinhthucte) > 0);
        return hasStock && !excelSpIds.has(p.id);
      })
      .map(p => ({
        id: p.id,
        masp: p.masp,
        title: p.title,
        dvt: p.dvt,
        slton: Number(p.tonkho?.slton) || 0,
        sltontt: Number(p.tonkho?.sltinhthucte) || 0
      }));

    // Tab 5: Khớp số liệu (Có trong Excel nhưng không có cảnh báo)
    const warningMaspSet = new Set(warningList.map(w => w.masp));
    this.matchedStockList = (this.data.danhSachExcel || [])
      .map(item => {
        const p = this.allSystemProducts.find(sp => sp.id === item.sanphamId);
        return p ? {
          id: p.id,
          masp: p.masp,
          title: p.title,
          dvt: p.dvt,
          excelQty: item.soluong,
          systemQty: Number(p.tonkho?.slton) || 0
        } : null;
      })
      .filter(p => p !== null && !warningMaspSet.has(p.masp)) as any[];
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
