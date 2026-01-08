import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    SkeletonComponent
} from '../../../shared/ui';
import { HoaDonDienTu, HoadonService } from '../hoadon.service';

@Component({
  selector: 'app-detail-hoadon',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    BadgeComponent,
    SkeletonComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
      <!-- Header -->
      <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <ui-button variant="outline" size="sm" (click)="goBack()">
            <span class="mr-1">←</span> Quay lại
          </ui-button>
          <div>
            <h1 class="text-xl font-bold tracking-tight sm:text-2xl">Chi tiết Hóa Đơn</h1>
            @if (hoadon()) {
              <p class="text-xs text-muted-foreground">
                Số: {{ hoadon()?.soHoaDon }} | Đơn: {{ hoadon()?.donhang?.madonhang }}
              </p>
            }
          </div>
        </div>
    
        @if (hoadon()) {
          <div class="flex gap-2">
            @if (hoadon()?.pdfUrl) {
              <ui-button variant="default" (click)="viewPDF()">
                📄 Xem PDF
              </ui-button>
            }
            @if (hoadon()?.trangThai === 'NHAP') {
              <ui-button variant="success" (click)="approve()">
                ✅ Duyệt & Xuất
              </ui-button>
            }
          </div>
        }
      </div>
    
      <!-- Loading State -->
      @if (loading()) {
        <div class="space-y-6">
          <ui-card>
            <ui-card-content class="p-6 space-y-4">
              <ui-skeleton variant="title" width="40%"></ui-skeleton>
              <div class="grid grid-cols-2 gap-4">
                <ui-skeleton variant="text" width="80%"></ui-skeleton>
                <ui-skeleton variant="text" width="80%"></ui-skeleton>
              </div>
            </ui-card-content>
          </ui-card>
          <ui-skeleton variant="card" height="300px" width="100%"></ui-skeleton>
        </div>
      }
    
      <!-- Main Content -->
      @if (!loading() && hoadon()) {
        <div class="space-y-6">
          <!-- Info Card -->
          <ui-card>
            <ui-card-content class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left: Customer & General Info -->
                <div class="space-y-4">
                  <div>
                    <label class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Khách hàng</label>
                    <p class="text-lg font-bold text-slate-900">{{ hoadon()?.donhang?.khachhang?.name }}</p>
                    <p class="text-sm text-slate-500">{{ hoadon()?.donhang?.khachhang?.diachi }}</p>
                    <p class="text-sm font-medium mt-1">MST: {{ hoadon()?.donhang?.khachhang?.mst || '---' }}</p>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex gap-10">
                    <div>
                      <label class="text-xs font-medium text-muted-foreground uppercase">Mẫu số</label>
                      <p class="font-medium">{{ hoadon()?.mauSo }}</p>
                    </div>
                    <div>
                      <label class="text-xs font-medium text-muted-foreground uppercase">Ký hiệu</label>
                      <p class="font-medium">{{ hoadon()?.kyHieu }}</p>
                    </div>
                  </div>
                </div>
                <!-- Right: Status & Dates -->
                <div class="space-y-4 bg-slate-50 p-4 rounded-lg">
                  <div class="flex justify-between items-center">
                    <label class="text-xs font-medium text-muted-foreground uppercase">Trạng thái</label>
                    <ui-badge [variant]="getStatusBadgeVariant(hoadon()?.trangThai!)">
                      {{ getStatusLabel(hoadon()?.trangThai!) }}
                    </ui-badge>
                  </div>
                  <div class="flex justify-between items-center">
                    <label class="text-xs font-medium text-muted-foreground uppercase">Ngày lập</label>
                    <p class="font-medium">{{ formatDate(hoadon()?.ngayLap!) }}</p>
                  </div>
                  @if (hoadon()?.ngayDuyet) {
                    <div class="flex justify-between items-center">
                      <label class="text-xs font-medium text-muted-foreground uppercase">Ngày xuất</label>
                      <p class="font-medium text-success">{{ formatDate(hoadon()?.ngayDuyet!) }}</p>
                    </div>
                  }
                  <div class="pt-2 border-t border-slate-200">
                    <label class="text-xs font-medium text-muted-foreground uppercase block mb-1">Ghi chú</label>
                    <p class="text-sm italic text-slate-600">{{ hoadon()?.ghichu || 'Không có ghi chú' }}</p>
                  </div>
                </div>
              </div>
            </ui-card-content>
          </ui-card>
          <!-- Products Table -->
          <ui-card>
            <ui-card-content class="p-0 overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-slate-50 border-b">
                  <tr>
                    <th class="px-4 py-3 text-left font-semibold text-slate-700">STT</th>
                    <th class="px-4 py-3 text-left font-semibold text-slate-700">Tên hàng hóa, dịch vụ</th>
                    <th class="px-4 py-3 text-center font-semibold text-slate-700">ĐVT</th>
                    <th class="px-4 py-3 text-right font-semibold text-slate-700">Số lượng</th>
                    <th class="px-4 py-3 text-right font-semibold text-slate-700">Đơn giá</th>
                    <th class="px-4 py-3 text-right font-semibold text-slate-700">Thành tiền</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @for (item of hoadon()?.details; track item; let i = $index) {
                    <tr>
                      <td class="px-4 py-3 text-slate-500">{{ i + 1 }}</td>
                      <td class="px-4 py-3">
                        <p class="font-medium text-slate-900">{{ item.tenSanPham }}</p>
                        <p class="text-xs text-slate-500 font-mono">{{ item.maSanPham }}</p>
                      </td>
                      <td class="px-4 py-3 text-center">{{ item.dvt }}</td>
                      <td class="px-4 py-3 text-right">{{ item.soluong | number }}</td>
                      <td class="px-4 py-3 text-right">{{ formatCurrency(item.dongia) }}</td>
                      <td class="px-4 py-3 text-right font-medium">{{ formatCurrency(item.thanhtien) }}</td>
                    </tr>
                  }
                </tbody>
                <tfoot class="bg-slate-50 font-medium">
                  <tr>
                    <td colspan="5" class="px-4 py-2 text-right text-slate-500 uppercase text-xs">Tổng tiền chưa thuế</td>
                    <td class="px-4 py-2 text-right">{{ formatCurrency(hoadon()?.tongTien!) }}</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="px-4 py-2 text-right text-slate-500 uppercase text-xs">Tiền thuế VAT</td>
                    <td class="px-4 py-2 text-right">{{ formatCurrency(hoadon()?.tongVAT!) }}</td>
                  </tr>
                  <tr class="text-lg bg-primary/5 text-primary border-t-2 border-primary/20">
                    <td colspan="5" class="px-4 py-4 text-right font-bold uppercase text-sm">Tổng tiền thanh toán</td>
                    <td class="px-4 py-4 text-right font-bold">{{ formatCurrency(hoadon()?.tongThanhToan!) }}</td>
                  </tr>
                </tfoot>
              </table>
            </ui-card-content>
          </ui-card>
        </div>
      }
    </div>
    `
})
export class DetailHoadonComponent implements OnInit {
  hoadon = signal<HoaDonDienTu | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hoadonService: HoadonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetail(id);
    } else {
      this.router.navigate(['/admin/hoadon']);
    }
  }

  loadDetail(id: string): void {
    this.loading.set(true);
    this.hoadonService.getDetail(id).subscribe({
      next: (data) => {
        this.hoadon.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading hoadon detail:', err);
        alert('Không thể tải chi tiết hóa đơn');
        this.router.navigate(['/admin/hoadon']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/hoadon']);
  }

  viewPDF(): void {
    if (this.hoadon()?.pdfUrl) {
      window.open(this.hoadon()!.pdfUrl, '_blank');
    }
  }

  approve(): void {
    if (!confirm('Bạn có chắc muốn duyệt và xuất hóa đơn này?')) return;
    
    const id = this.hoadon()?.id;
    if (id) {
       this.hoadonService.xuatHoaDon(id).subscribe({
         next: (res) => {
           this.loadDetail(id);
           alert('Đã xuất hóa đơn thành công!');
         },
         error: (err) => {
           alert('Lỗi khi xuất hóa đơn: ' + err.message);
         }
       });
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('vi-VN');
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
}
