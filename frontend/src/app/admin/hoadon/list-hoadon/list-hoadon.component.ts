import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent
} from '../../../shared/ui';
import { CreateHoadonDialogComponent } from '../create-hoadon-dialog/create-hoadon-dialog.component';
import { HoaDonDienTu, HoadonService } from '../hoadon.service';

@Component({
  selector: 'app-list-hoadon',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    BadgeComponent,
    SkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    CreateHoadonDialogComponent
  ],
  template: `
    <!-- Mobile-First HoaDon List -->
    <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Hóa Đơn Điện Tử</h1>
          <p class="text-sm text-muted-foreground mt-1">Quản lý hóa đơn điện tử</p>
        </div>
        <ui-button (click)="createDialog.set(true)" class="w-full sm:w-auto">
          <span class="mr-2">+</span> Tạo hóa đơn
        </ui-button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Loading Skeletons for Stats -->
        <ui-card *ngIf="loading()">
          <ui-card-content class="p-4 space-y-2">
            <ui-skeleton variant="text" width="60%"></ui-skeleton>
            <ui-skeleton variant="title" width="80%"></ui-skeleton>
          </ui-card-content>
        </ui-card>
        <ui-card *ngIf="loading()">
          <ui-card-content class="p-4 space-y-2">
            <ui-skeleton variant="text" width="60%"></ui-skeleton>
            <ui-skeleton variant="title" width="80%"></ui-skeleton>
          </ui-card-content>
        </ui-card>
        <ui-card *ngIf="loading()">
          <ui-card-content class="p-4 space-y-2">
            <ui-skeleton variant="text" width="60%"></ui-skeleton>
            <ui-skeleton variant="title" width="80%"></ui-skeleton>
          </ui-card-content>
        </ui-card>
        <ui-card *ngIf="loading()">
          <ui-card-content class="p-4 space-y-2">
            <ui-skeleton variant="text" width="60%"></ui-skeleton>
            <ui-skeleton variant="title" width="80%"></ui-skeleton>
          </ui-card-content>
        </ui-card>

        <!-- Actual Stats Cards -->
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Tổng HĐ</div>
            <div class="text-2xl font-bold mt-1">{{ total() }}</div>
          </ui-card-content>
        </ui-card>
        
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Đã xuất</div>
            <div class="text-2xl font-bold text-success mt-1">{{ stats().daXuat }}</div>
          </ui-card-content>
        </ui-card>
        
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Đang nhập</div>
            <div class="text-2xl font-bold text-warning mt-1">{{ stats().nhap }}</div>
          </ui-card-content>
        </ui-card>

        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Tổng giá trị</div>
            <div class="text-xl font-bold mt-1">{{ formatCurrency(stats().tongGiaTri) }}</div>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Filters -->
      <ui-card class="mb-6" *ngIf="!error()">
        <ui-card-content>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium mb-2">Tìm kiếm</label>
              <input
                type="text"
                placeholder="Số HĐ, mã đơn..."
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (input)="onSearch($event)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Trạng thái</label>
              <select
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (change)="onFilterTrangThaiChange($event)"
              >
                <option value="ALL">Tất cả</option>
                <option value="NHAP">Đang nhập</option>
                <option value="DA_XUAT">Đã xuất</option>
                <option value="HUY">Đã hủy</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Từ ngày</label>
              <input
                type="date"
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (change)="onDateFromChange($event)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Đến ngày</label>
              <input
                type="date"
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (change)="onDateToChange($event)"
              />
            </div>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Loading Skeletons -->
      <div *ngIf="loading()" class="grid grid-cols-1 gap-4 md:hidden">
        <ui-card *ngFor="let i of [1,2,3,4,5]">
          <ui-card-content class="p-4 space-y-3">
            <div class="flex justify-between">
              <ui-skeleton variant="title" width="40%"></ui-skeleton>
              <ui-skeleton variant="button" width="80px"></ui-skeleton>
            </div>
            <ui-skeleton variant="text" width="60%"></ui-skeleton>
            <ui-skeleton variant="text" width="80%"></ui-skeleton>
            <ui-skeleton variant="text" width="50%"></ui-skeleton>
            <ui-skeleton variant="text" width="70%"></ui-skeleton>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Error State -->
      <ui-error-state 
        *ngIf="error() && !loading()"
        [title]="'Không thể tải dữ liệu'"
        [description]="errorMessage()"
        [onRetry]="loadData.bind(this)"
      ></ui-error-state>

      <!-- Empty State -->
      <ui-empty-state
        *ngIf="!loading() && !error() && filteredList().length === 0"
        [icon]="'📄'"
        [title]="'Chưa có hóa đơn'"
        [description]="'Chưa có hóa đơn điện tử nào được tạo'"
      >
        <ui-button (click)="createDialog.set(true)">Tạo hóa đơn đầu tiên</ui-button>
      </ui-empty-state>

      <!-- Mobile Cards -->
      <div *ngIf="!loading() && !error() && filteredList().length > 0" class="grid grid-cols-1 gap-4 md:hidden">
        <ui-card *ngFor="let hd of filteredList()" [hover]="true">
          <ui-card-content class="p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="font-semibold">{{ hd.soHoaDon }}</div>
                <div class="text-sm text-muted-foreground mt-1">
                  {{ hd.donhang?.madonhang }}
                </div>
              </div>
              <ui-badge [variant]="getStatusBadgeVariant(hd.trangThai)">
                {{ getStatusLabel(hd.trangThai) }}
              </ui-badge>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Khách hàng:</span>
                <span class="text-sm font-medium">{{ hd.donhang?.khachhang?.name }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Ngày lập:</span>
                <span class="text-sm">{{ formatDate(hd.ngayLap) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Tổng tiền:</span>
                <span class="font-semibold">{{ formatCurrency(hd.tongTien) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">VAT:</span>
                <span class="text-sm">{{ formatCurrency(hd.tongVAT) }}</span>
              </div>

              <div class="flex justify-between items-center pt-2 border-t">
                <span class="text-sm text-muted-foreground">Thành toán:</span>
                <span class="text-lg font-bold text-primary">
                  {{ formatCurrency(hd.tongThanhToan) }}
                </span>
              </div>
            </div>

            <div class="flex gap-2 mt-4 pt-4 border-t">
              <ui-button 
                *ngIf="hd.trangThai === 'NHAP'"
                variant="default" 
                size="sm"
                [fullWidth]="true"
                (click)="xuatHoaDon(hd.id)"
              >
                Xuất HĐ
              </ui-button>
              <ui-button 
                *ngIf="hd.pdfUrl"
                variant="outline" 
                size="sm"
                (click)="downloadPDF(hd.pdfUrl!)"
              >
                📄 PDF
              </ui-button>
              <ui-button variant="outline" size="sm" (click)="viewDetail(hd.id)">
                Chi tiết
              </ui-button>
            </div>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Desktop Table -->
      <ui-card *ngIf="!loading() && !error() && filteredList().length > 0" class="hidden md:block">
        <ui-card-content class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="border-b bg-slate-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Số HĐ</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Đơn hàng</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Khách hàng</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Ngày lập</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Tổng tiền</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">VAT</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Thành toán</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Trạng thái</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr *ngFor="let hd of filteredList()" class="hover:bg-slate-50 transition-colors">
                  <td class="px-4 py-3 text-sm font-medium">{{ hd.soHoaDon }}</td>
                  <td class="px-4 py-3 text-sm">{{ hd.donhang?.madonhang }}</td>
                  <td class="px-4 py-3 text-sm">{{ hd.donhang?.khachhang?.name }}</td>
                  <td class="px-4 py-3 text-sm">{{ formatDate(hd.ngayLap) }}</td>
                  <td class="px-4 py-3 text-sm text-right">{{ formatCurrency(hd.tongTien) }}</td>
                  <td class="px-4 py-3 text-sm text-right">{{ formatCurrency(hd.tongVAT) }}</td>
                  <td class="px-4 py-3 text-sm text-right font-semibold text-primary">
                    {{ formatCurrency(hd.tongThanhToan) }}
                  </td>
                  <td class="px-4 py-3">
                    <ui-badge [variant]="getStatusBadgeVariant(hd.trangThai)" size="sm">
                      {{ getStatusLabel(hd.trangThai) }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex gap-2 justify-center">
                      <ui-button
                        *ngIf="hd.trangThai === 'NHAP'"
                        size="sm"
                        (click)="xuatHoaDon(hd.id)"
                      >
                        Xuất
                      </ui-button>
                      <ui-button
                        *ngIf="hd.pdfUrl"
                        variant="outline"
                        size="sm"
                        (click)="downloadPDF(hd.pdfUrl!)"
                      >
                        PDF
                      </ui-button>
                      <ui-button variant="outline" size="sm" (click)="viewDetail(hd.id)">
                        Chi tiết
                      </ui-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <!-- Create Dialog -->
    <app-create-hoadon-dialog 
      [isOpen]="createDialog()" 
      (closed)="onCreateClosed($event)">
    </app-create-hoadon-dialog>
  `
})
export class ListHoadonComponent implements OnInit {
  list = signal<HoaDonDienTu[]>([]);
  loading = signal(false);
  error = signal(false);
  errorMessage = signal('');
  total = signal(0);
  
  searchTerm = signal('');
  filterTrangThai = signal<string>('ALL');
  filterDateFrom = signal<Date | null>(null);
  filterDateTo = signal<Date | null>(null);

  createDialog = signal(false);

  stats = computed(() => {
    const items = this.list();
    return {
      daXuat: items.filter(hd => hd.trangThai === 'DA_XUAT').length,
      nhap: items.filter(hd => hd.trangThai === 'NHAP').length,
      tongGiaTri: items.reduce((sum, hd) => sum + Number(hd.tongThanhToan), 0),
    };
  });

  filteredList = computed(() => {
    let list = this.list();
    const search = this.searchTerm().toLowerCase();
    
    if (search) {
      list = list.filter(hd => 
        hd.soHoaDon.toLowerCase().includes(search) ||
        hd.donhang?.madonhang?.toLowerCase().includes(search) ||
        hd.donhang?.khachhang?.name?.toLowerCase().includes(search)
      );
    }

    if (this.filterTrangThai() !== 'ALL') {
      list = list.filter(hd => hd.trangThai === this.filterTrangThai());
    }

    return list;
  });

  constructor(
    private hoadonService: HoadonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(false);
    this.hoadonService.getList({
      orderBy: [{ ngayLap: 'desc' }]
    }).subscribe({
      next: (res: any) => {
        this.list.set(res.items || []);
        this.total.set(res.total || 0);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set(true);
        this.errorMessage.set(err.message || 'Không thể tải dữ liệu hóa đơn');
        this.loading.set(false);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  getStatusBadgeVariant(status: string): 'default' | 'success' | 'warning' | 'destructive' {
    switch (status) {
      case 'DA_XUAT': return 'success';
      case 'NHAP': return 'warning';
      case 'HUY': return 'destructive';
      default: return 'default';
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'NHAP': 'Đang nhập',
      'DA_XUAT': 'Đã xuất',
      'HUY': 'Đã hủy'
    };
    return labels[status] || status;
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onFilterTrangThaiChange(event: Event): void {
    this.filterTrangThai.set((event.target as HTMLSelectElement).value);
  }

  onDateFromChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterDateFrom.set(value ? new Date(value) : null);
  }

  onDateToChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterDateTo.set(value ? new Date(value) : null);
  }

  viewDetail(id: string): void {
    this.router.navigate(['/admin/hoadon/detail', id]);
  }

  xuatHoaDon(id: string): void {
    if (!confirm('Xác nhận xuất hóa đơn?')) return;
    
    this.hoadonService.xuatHoaDon(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Có lỗi khi xuất hóa đơn');
      }
    });
  }

  downloadPDF(url: string): void {
    window.open(url, '_blank');
  }

  onCreateClosed(success: boolean): void {
    this.createDialog.set(false);
    if (success) {
      this.loadData();
    }
  }
}
