import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface StockWarningItem {
  masp: string;
  title: string;
  sltonCu: number;        // Tồn chốt kho cũ (sltontt)
  sltonMoi: number;        // Giá trị import mới
  chenhLech: number;       // Mức chênh lệch
  loaiDieuChinh: 'tang' | 'giam' | 'khong_doi'; // Tăng hay giảm
  lyDoCanhBao: string;     // Lý do cảnh báo
  mucDoNghiemTrong: 'cao' | 'trung_binh' | 'thap';
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
    <div class="p-0 max-w-[700px]">
      <!-- Header -->
      <div class="bg-amber-50 border-b border-amber-200 px-6 py-4">
        <div class="flex items-center gap-3">
          <mat-icon class="text-amber-600 text-3xl" style="font-size: 32px; width: 32px; height: 32px">warning</mat-icon>
          <div>
            <h2 class="text-lg font-bold text-amber-800 m-0">{{ data.title }}</h2>
            <p class="text-sm text-amber-600 m-0 mt-1">Vui lòng xem xét kỹ trước khi xác nhận</p>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="px-6 py-4 bg-gray-50 border-b">
        <div class="grid grid-cols-4 gap-3 text-center">
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="text-2xl font-bold text-gray-800">{{ data.tongSanPham }}</div>
            <div class="text-xs text-gray-500">Tổng SP</div>
          </div>
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="text-2xl font-bold text-green-600">{{ data.spBinhThuong }}</div>
            <div class="text-xs text-gray-500">Bình thường</div>
          </div>
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="text-2xl font-bold text-gray-400">{{ data.spKhongThayDoi }}</div>
            <div class="text-xs text-gray-500">Không đổi</div>
          </div>
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="text-2xl font-bold text-red-600">{{ data.danhSachCanhBao.length }}</div>
            <div class="text-xs text-gray-500">⚠️ Cảnh báo</div>
          </div>
        </div>
      </div>

      <!-- Warning List -->
      <div class="px-6 py-4 max-h-[400px] overflow-auto">
        @if (data.danhSachCanhBao.length === 0) {
          <div class="text-center py-8 text-green-600">
            <mat-icon style="font-size: 48px; width: 48px; height: 48px">check_circle</mat-icon>
            <p class="mt-2 font-medium">Tất cả số liệu hợp lệ, không có cảnh báo bất thường.</p>
          </div>
        } @else {
          <div class="text-sm font-semibold text-red-700 mb-3 flex items-center gap-1">
            <mat-icon class="text-red-600" style="font-size: 18px; width: 18px; height: 18px">error</mat-icon>
            Phát hiện {{ data.danhSachCanhBao.length }} sản phẩm có số liệu bất thường:
          </div>
          
          @for (item of data.danhSachCanhBao; track item.masp) {
            <div class="border rounded-lg mb-3 overflow-hidden" 
                 [class.border-red-300]="item.mucDoNghiemTrong === 'cao'"
                 [class.bg-red-50]="item.mucDoNghiemTrong === 'cao'"
                 [class.border-amber-300]="item.mucDoNghiemTrong === 'trung_binh'"
                 [class.bg-amber-50]="item.mucDoNghiemTrong === 'trung_binh'"
                 [class.border-yellow-300]="item.mucDoNghiemTrong === 'thap'"
                 [class.bg-yellow-50]="item.mucDoNghiemTrong === 'thap'">
              <div class="px-4 py-3">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="font-bold text-sm text-gray-800">{{ item.masp }}</span>
                    <span class="text-xs text-gray-500 ml-2">{{ item.title }}</span>
                  </div>
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium"
                        [class.bg-red-200]="item.mucDoNghiemTrong === 'cao'"
                        [class.text-red-800]="item.mucDoNghiemTrong === 'cao'"
                        [class.bg-amber-200]="item.mucDoNghiemTrong === 'trung_binh'"
                        [class.text-amber-800]="item.mucDoNghiemTrong === 'trung_binh'"
                        [class.bg-yellow-200]="item.mucDoNghiemTrong === 'thap'"
                        [class.text-yellow-800]="item.mucDoNghiemTrong === 'thap'">
                    {{ item.mucDoNghiemTrong === 'cao' ? '🔴 Cao' : item.mucDoNghiemTrong === 'trung_binh' ? '🟡 TB' : '🟢 Thấp' }}
                  </span>
                </div>
                <div class="mt-2 flex gap-4 text-xs">
                  <div>
                    <span class="text-gray-500">Cũ:</span>
                    <span class="font-semibold ml-1">{{ item.sltonCu | number:'1.0-1' }}</span>
                  </div>
                  <div class="font-bold">→</div>
                  <div>
                    <span class="text-gray-500">Mới:</span>
                    <span class="font-semibold ml-1" 
                          [class.text-red-600]="item.mucDoNghiemTrong === 'cao'"
                          [class.text-amber-600]="item.mucDoNghiemTrong === 'trung_binh'">
                      {{ item.sltonMoi | number:'1.0-1' }}
                    </span>
                  </div>
                  <div>
                    <span class="text-gray-500">Chênh lệch:</span>
                    <span class="font-bold ml-1"
                          [class.text-green-600]="item.loaiDieuChinh === 'tang'"
                          [class.text-red-600]="item.loaiDieuChinh === 'giam'"
                          [class.text-gray-600]="item.loaiDieuChinh === 'khong_doi'">
                      {{ item.loaiDieuChinh === 'tang' ? '+' : (item.loaiDieuChinh === 'giam' ? '-' : '') }}{{ item.chenhLech | number:'1.0-1' }}
                    </span>
                  </div>
                </div>
                <div class="mt-1.5 text-xs text-gray-600 italic">
                  💡 {{ item.lyDoCanhBao }}
                </div>
              </div>
            </div>
          }
        }
      </div>

      <!-- Actions -->
      <div class="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
        <div class="text-xs text-gray-500">
          Tăng: <span class="font-bold text-blue-600">{{ data.danhSachNhap.length }}</span> SP | 
          Giảm: <span class="font-bold text-orange-600">{{ data.danhSachXuat.length }}</span> SP
        </div>
        <div class="flex gap-3">
          <button mat-button (click)="onCancel()" class="text-gray-600">
            <mat-icon class="mr-1" style="font-size: 18px">close</mat-icon>
            Hủy bỏ
          </button>
          <button mat-flat-button 
                  [color]="hasCriticalWarnings ? 'warn' : 'primary'" 
                  (click)="onConfirm()">
            <mat-icon class="mr-1" style="font-size: 18px">check</mat-icon>
            {{ hasCriticalWarnings ? 'Vẫn xác nhận cập nhật' : 'Xác nhận cập nhật' }}
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  standalone: true
})
export class StockWarningDialogComponent {
  hasCriticalWarnings: boolean;

  constructor(
    public dialogRef: MatDialogRef<StockWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockWarningData
  ) {
    this.hasCriticalWarnings = data.danhSachCanhBao.some(w => w.mucDoNghiemTrong === 'cao');
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
