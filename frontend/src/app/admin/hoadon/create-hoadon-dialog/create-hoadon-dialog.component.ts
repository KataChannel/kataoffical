import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  DialogTitleComponent
} from '../../../shared/ui';
import { DonhangService } from '../../donhang/donhang.service';
import { HoadonService } from '../hoadon.service';

@Component({
  selector: 'app-create-hoadon-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogFooterComponent
  ],
  template: `
    <ui-dialog [isOpen]="isOpen" (closed)="onClose()">
      <ui-dialog-header>
        <ui-dialog-title>Tạo hóa đơn mới</ui-dialog-title>
      </ui-dialog-header>
    
      <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <!-- Step 1: Chọn đơn hàng -->
        @if (!selectedOrder()) {
          <div>
            <label class="block text-sm font-medium mb-2">Tìm kiếm đơn hàng chưa xuất hóa đơn</label>
            <div class="flex gap-2 mb-4">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                placeholder="Mã đơn hàng hoặc tên khách hàng..."
                class="flex-1 h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                (keyup.enter)="searchOrders()"
                />
              <ui-button (click)="searchOrders()" [loading]="isSearching()">Tìm</ui-button>
            </div>
            <!-- Search Results -->
            <div class="space-y-2">
              @if (orders().length === 0 && !isSearching() && hasSearched) {
                <div class="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                  Không tìm thấy đơn hàng nào phù hợp hoặc đã xuất hóa đơn hết.
                </div>
              }
              @for (order of orders(); track order) {
                <div
                  (click)="selectOrder(order)"
                  class="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div class="flex justify-between items-start mb-1">
                    <span class="font-bold text-primary group-hover:underline">{{ order.madonhang }}</span>
                    <span class="text-xs text-muted-foreground">{{ formatDate(order.ngaygiao) }}</span>
                  </div>
                  <div class="text-sm font-medium">{{ order.khachhang?.name }}</div>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-xs text-muted-foreground">{{ order.sanpham?.length }} sản phẩm</span>
                    <span class="font-bold text-slate-900">{{ formatCurrency(order.tongtien) }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }
    
        <!-- Step 2: Xem chi tiết & Điền thông tin hóa đơn -->
        @if (selectedOrder()) {
          <div class="space-y-6">
            <div class="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold text-primary">Thông tin đơn hàng</span>
                <button (click)="selectedOrder.set(null)" class="text-xs text-primary hover:underline">Thay đổi</button>
              </div>
              <div class="grid grid-cols-2 gap-y-2 text-sm">
                <span class="text-muted-foreground">Mã đơn:</span>
                <span class="font-medium">{{ selectedOrder()?.madonhang }}</span>
                <span class="text-muted-foreground">Khách hàng:</span>
                <span class="font-medium">{{ selectedOrder()?.khachhang?.name }}</span>
                <span class="text-muted-foreground">Tổng tiền:</span>
                <span class="font-bold">{{ formatCurrency(selectedOrder()?.tongtien) }}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1.5">Mẫu số</label>
                <input
                  type="text"
                  [(ngModel)]="hoadonData.mauSo"
                  class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="01GTKT"
                  />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5">Ký hiệu</label>
                <input
                  type="text"
                  [(ngModel)]="hoadonData.kyHieu"
                  class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="AA/25E"
                  />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5">Ghi chú</label>
              <textarea
                [(ngModel)]="hoadonData.ghichu"
                rows="3"
                class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập ghi chú hóa đơn (nếu có)..."
              ></textarea>
            </div>
            <!-- Items Preview -->
            <div>
              <label class="block text-sm font-medium mb-2">Sản phẩm trong hóa đơn</label>
              <div class="border rounded-lg overflow-hidden">
                <table class="w-full text-xs text-left">
                  <thead class="bg-slate-50 border-b">
                    <tr>
                      <th class="px-3 py-2 font-semibold">Tên sản phẩm</th>
                      <th class="px-3 py-2 text-right font-semibold">SL</th>
                      <th class="px-3 py-2 text-right font-semibold">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    @for (sp of selectedOrder()?.sanpham; track sp) {
                      <tr>
                        <td class="px-3 py-2">
                          <div class="font-medium">{{ sp.title }}</div>
                          <div class="text-[10px] text-muted-foreground">{{ sp.masp }}</div>
                        </td>
                        <td class="px-3 py-2 text-right">{{ sp.slnhan || sp.slgiao || sp.sldat | number }}</td>
                        <td class="px-3 py-2 text-right font-medium">{{ formatCurrency((sp.slnhan || sp.slgiao || sp.sldat) * sp.giaban) }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
      </div>
    
      <ui-dialog-footer>
        <ui-button variant="outline" (click)="onClose()" [disabled]="isCreating()">
          Hủy
        </ui-button>
        @if (selectedOrder()) {
          <ui-button
            (click)="createHoadon()"
            [loading]="isCreating()"
            >
            Xác nhận tạo
          </ui-button>
        }
      </ui-dialog-footer>
    </ui-dialog>
    `
})
export class CreateHoadonDialogComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<boolean>();

  searchQuery = '';
  isSearching = signal(false);
  isCreating = signal(false);
  hasSearched = false;
  orders = signal<any[]>([]);
  selectedOrder = signal<any>(null);

  hoadonData = {
    mauSo: '01GTKT',
    kyHieu: 'AA/25E',
    ghichu: ''
  };

  constructor(
    private donhangService: DonhangService,
    private hoadonService: HoadonService
  ) {}

  onClose() {
    this.closed.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.selectedOrder.set(null);
    this.orders.set([]);
    this.searchQuery = '';
    this.hasSearched = false;
    this.hoadonData = {
        mauSo: '01GTKT',
        kyHieu: 'AA/25E',
        ghichu: ''
    };
  }

  async searchOrders() {
    if (this.isSearching()) return;
    
    this.isSearching.set(true);
    this.hasSearched = true;
    
    try {
      const res = await this.donhangService.searchDonhang({
        query: this.searchQuery,
        xuatHoaDon: false,
        Status: ['dagiao', 'danhan', 'hoanthanh'], // Chỉ đơn hàng đã giao hoặc hoàn thành mới được xuất HĐ
        pageSize: 10
      });
      
      this.orders.set(res.data || []);
    } catch (err) {
      console.error('Error searching orders:', err);
    } finally {
      this.isSearching.set(false);
    }
  }

  selectOrder(order: any) {
    this.selectedOrder.set(order);
    this.hoadonData.ghichu = order.ghichu || '';
  }

  createHoadon() {
    if (this.isCreating() || !this.selectedOrder()) return;
    
    this.isCreating.set(true);
    
    const payload = {
        donhangId: this.selectedOrder().id,
        mauSo: this.hoadonData.mauSo,
        kyHieu: this.hoadonData.kyHieu,
        ghichu: this.hoadonData.ghichu
    };

    this.hoadonService.create(payload).subscribe({
        next: (res) => {
            this.isCreating.set(false);
            this.closed.emit(true); // emit true for success/refresh
            this.resetForm();
        },
        error: (err) => {
            console.error('Error creating hoadon:', err);
            alert('Lỗi: ' + (err.message || 'Không thể tạo hóa đơn'));
            this.isCreating.set(false);
        }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
