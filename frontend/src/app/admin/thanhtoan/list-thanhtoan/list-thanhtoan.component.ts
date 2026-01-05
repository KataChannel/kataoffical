import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent
} from '../../../shared/ui';
import { CreateThanhToanDialogComponent } from '../create-thanhtoan-dialog/create-thanhtoan-dialog.component';
import { ThanhToan, ThanhtoanService } from '../thanhtoan.service';

@Component({
  selector: 'app-list-thanhtoan',
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
    EmptyStateComponent,
    ErrorStateComponent,
    MatDialogModule
  ],
  template: `
    <!-- Mobile-First ThanhToan List -->
    <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Thanh Toán</h1>
          <p class="text-sm text-muted-foreground mt-1">Quản lý thanh toán đơn hàng</p>
        </div>
        <ui-button class="w-full sm:w-auto" (click)="openCreateDialog()">
          <span class="mr-2">+</span> Tạo thanh toán công nợ
        </ui-button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Tổng TT</div>
            <div class="text-2xl font-bold mt-1">{{ total() }}</div>
          </ui-card-content>
        </ui-card>
        
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Chờ duyệt</div>
            <div class="text-2xl font-bold text-warning mt-1">{{ stats().choDuyet }}</div>
          </ui-card-content>
        </ui-card>
        
        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Đã duyệt</div>
            <div class="text-2xl font-bold text-success mt-1">{{ stats().daDuyet }}</div>
          </ui-card-content>
        </ui-card>

        <ui-card *ngIf="!loading() && !error()">
          <ui-card-content class="p-4">
            <div class="text-sm text-muted-foreground">Tổng số tiền</div>
            <div class="text-xl font-bold mt-1">{{ formatCurrency(stats().tongTien) }}</div>
          </ui-card-content>
        </ui-card>

        <!-- Skeleton for stats -->
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
      </div>

      <!-- Filters -->
      <ui-card class="mb-6" *ngIf="!error()">
        <ui-card-content>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium mb-2">Tìm kiếm</label>
              <input
                type="text"
                placeholder="Mã đơn, khách hàng..."
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (input)="onSearch($event)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Trạng thái</label>
              <select
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (change)="onFilterChange($event)"
              >
                <option value="ALL">Tất cả</option>
                <option value="CHO_DUYET">Chờ duyệt</option>
                <option value="DA_DUYET">Đã duyệt</option>
                <option value="TU_CHOI">Từ chối</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Phương thức</label>
              <select
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
                (change)="onMethodChange($event)"
              >
                <option value="ALL">Tất cả</option>
                <option value="TIEN_MAT">Tiền mặt</option>
                <option value="CHUYEN_KHOAN">Chuyển khoản</option>
                <option value="THE">Thẻ</option>
              </select>
            </div>

            <div class="flex items-end">
              <ui-button variant="outline" [fullWidth]="true" (click)="loadData()">
                🔄 Làm mới
              </ui-button>
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
        [icon]="'💳'"
        [title]="'Chưa có thanh toán'"
        [description]="'Chưa có giao dịch thanh toán nào được tạo'"
      >
        <ui-button>Tạo thanh toán đầu tiên</ui-button>
      </ui-empty-state>

      <!-- Mobile Cards -->
      <div *ngIf="!loading() && !error() && filteredList().length > 0" class="grid grid-cols-1 gap-4 md:hidden">
        <ui-card *ngFor="let tt of filteredList()" [hover]="true">
          <ui-card-content class="p-4">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="font-semibold">{{ tt.donhang?.madonhang }}</div>
                <div class="text-sm text-muted-foreground mt-1">
                  {{ tt.donhang?.khachhang?.name }}
                </div>
              </div>
              <ui-badge [variant]="getStatusBadgeVariant(tt.trangThai)">
                {{ getStatusLabel(tt.trangThai) }}
              </ui-badge>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Số tiền:</span>
                <span class="font-semibold">{{ formatCurrency(tt.soTien) }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Ngày TT:</span>
                <span class="text-sm">{{ formatDate(tt.ngayThanhToan) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Phương thức:</span>
                <span class="text-sm">{{ getMethodLabel(tt.phuongThuc) }}</span>
              </div>
            </div>

            <div class="flex gap-2 mt-4 pt-4 border-t">
              <ui-button 
                *ngIf="tt.trangThai === 'CHO_THANH_TOAN'"
                variant="default" 
                size="sm"
                [fullWidth]="true"
              >
                Duyệt
              </ui-button>
              <ui-button variant="outline" size="sm" (click)="viewDetail(tt.id)">
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
                  <th class="px-4 py-3 text-left text-sm font-semibold">Mã đơn</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Khách hàng</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Số tiền</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Ngày TT</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Phương thức</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Trạng thái</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr *ngFor="let tt of filteredList()" class="hover:bg-slate-50 transition-colors">
                  <td class="px-4 py-3 text-sm font-medium">{{ tt.donhang?.madonhang }}</td>
                  <td class="px-4 py-3 text-sm">{{ tt.donhang?.khachhang?.name }}</td>
                  <td class="px-4 py-3 text-sm text-right font-semibold text-primary">
                    {{ formatCurrency(tt.soTien) }}
                  </td>
                  <td class="px-4 py-3 text-sm">{{ formatDate(tt.ngayThanhToan) }}</td>
                  <td class="px-4 py-3 text-sm">{{ getMethodLabel(tt.phuongThuc) }}</td>
                  <td class="px-4 py-3">
                    <ui-badge [variant]="getStatusBadgeVariant(tt.trangThai)" size="sm">
                      {{ getStatusLabel(tt.trangThai) }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex gap-2 justify-center">
                      <ui-button
                        *ngIf="tt.trangThai === 'CHO_THANH_TOAN'"
                        size="sm"
                      >
                        Duyệt
                      </ui-button>
                      <ui-button variant="outline" size="sm" (click)="viewDetail(tt.id)">
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
  `
})
export class ListThanhtoanComponent implements OnInit {
  list = signal<ThanhToan[]>([]);
  loading = signal(false);
  error = signal(false);
  errorMessage = signal('');
  total = signal(0);
  
  searchTerm = signal('');
  filterStatus = signal<string>('ALL');
  filterMethod = signal<string>('ALL');

  stats = computed(() => {
    const items = this.list();
    return {
      choDuyet: items.filter(tt => tt.trangThai === 'CHO_THANH_TOAN').length,
      daDuyet: items.filter(tt => tt.trangThai === 'DA_THANH_TOAN').length,
      tongTien: items.reduce((sum, tt) => sum + Number(tt.soTien), 0),
    };
  });

  filteredList = computed(() => {
    let list = this.list();
    const search = this.searchTerm().toLowerCase();
    
    if (search) {
      list = list.filter(tt => 
        tt.donhang?.madonhang?.toLowerCase().includes(search) ||
        tt.donhang?.khachhang?.name?.toLowerCase().includes(search)
      );
    }

    if (this.filterStatus() !== 'ALL') {
      list = list.filter(tt => tt.trangThai === this.filterStatus());
    }

    if (this.filterMethod() !== 'ALL') {
      list = list.filter(tt => tt.phuongThuc === this.filterMethod());
    }

    return list;
  });

  constructor(
    private thanhtoanService: ThanhtoanService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    this.error.set(false);
    
    try {
      // Use service to fetch data
      const response = await firstValueFrom(this.thanhtoanService.getList({
        take: 100, // Fetch recent 100 payments
        orderBy: { createdAt: 'desc' }
      }));
      
      this.list.set(response.items);
      // Recalculate stats based on fetched data if needed or fetch separate stats
      this.loading.set(false);
    } catch (err: any) {
      console.error('Error loading payments', err);
      this.error.set(true);
      this.errorMessage.set(err.message || 'Không thể tải dữ liệu');
      this.loading.set(false);
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateThanhToanDialogComponent, {
      maxWidth: '100vw',
      width: 'auto',
      panelClass: 'responsive-dialog',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
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
      case 'DA_DUYET': return 'success';
      case 'CHO_DUYET': return 'warning';
      case 'TU_CHOI': return 'destructive';
      default: return 'default';
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'CHO_DUYET': 'Chờ duyệt',
      'DA_DUYET': 'Đã duyệt',
      'TU_CHOI': 'Từ chối'
    };
    return labels[status] || status;
  }

  getMethodLabel(method: string): string {
    const labels: Record<string, string> = {
      'TIEN_MAT': 'Tiền mặt',
      'CHUYEN_KHOAN': 'Chuyển khoản',
      'THE': 'Thẻ'
    };
    return labels[method] || method;
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onFilterChange(event: Event): void {
    this.filterStatus.set((event.target as HTMLSelectElement).value);
  }

  onMethodChange(event: Event): void {
    this.filterMethod.set((event.target as HTMLSelectElement).value);
  }

  viewDetail(id: string): void {
    this.router.navigate(['/admin/thanhtoan/detail', id]);
  }
}
