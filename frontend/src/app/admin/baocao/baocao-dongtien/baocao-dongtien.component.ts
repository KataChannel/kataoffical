import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import {
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardTitleComponent,
} from '../../../shared/ui';

interface DongTienData {
  ngay: string;
  thu: number;
  chi: number;
  ton: number;
  chenhLech?: number;
}

interface BaoCaoResponse {
  tongThu: number;
  tongChi: number;
  tonDauKy: number;
  tonCuoiKy: number;
  data: DongTienData[];
}

const GET_BAO_CAO_DONG_TIEN = gql`
  query GetBaoCaoDongTien($tuNgay: String, $denNgay: String, $groupBy: String) {
    baoCaoDongTien(tuNgay: $tuNgay, denNgay: $denNgay, groupBy: $groupBy) {
      tongThu
      tongChi
      tonDauKy
      tonCuoiKy
      data {
        ngay
        thu
        chi
        ton
      }
    }
  }
`;

@Component({
  selector: 'app-baocao-dongtien',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
  ],
  template: `
    <!-- Mobile-First Báo cáo dòng tiền -->
    <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Báo Cáo Dòng Tiền</h1>
          <p class="text-sm text-muted-foreground mt-1">Phân tích thu chi theo thời gian</p>
        </div>
        <div class="flex gap-2">
          <ui-button variant="outline" (click)="exportExcel()">
            📊 Excel
          </ui-button>
          <ui-button variant="outline" (click)="exportPDF()">
            📄 PDF
          </ui-button>
        </div>
      </div>

      <!-- Filters -->
      <ui-card class="mb-6">
        <ui-card-content>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label class="block text-sm font-medium mb-2">Từ ngày</label>
              <input
                type="date"
                [(ngModel)]="tuNgay"
                (change)="loadData()"
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Đến ngày</label>
              <input
                type="date"
                [(ngModel)]="denNgay"
                (change)="loadData()"
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Nhóm theo</label>
              <select
                [(ngModel)]="groupBy"
                (change)="loadData()"
                class="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              >
                <option value="day">Ngày</option>
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
              </select>
            </div>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ui-card>
          <ui-card-content class="p-6">
            <p class="text-sm font-medium text-muted-foreground">Tổng thu</p>
            <h3 class="text-3xl font-bold text-success mt-2">{{ formatCurrency(summary().tongThu) }}</h3>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-content class="p-6">
            <p class="text-sm font-medium text-muted-foreground">Tổng chi</p>
            <h3 class="text-3xl font-bold text-destructive mt-2">{{ formatCurrency(summary().tongChi) }}</h3>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-content class="p-6">
            <p class="text-sm font-medium text-muted-foreground">Chênh lệch</p>
            <h3 class="text-3xl font-bold mt-2"
                [class.text-success]="summary().chenhLech >= 0"
                [class.text-destructive]="summary().chenhLech < 0">
              {{ formatCurrency(summary().chenhLech) }}
            </h3>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Chart -->
      <ui-card class="mb-6">
        <ui-card-header>
          <ui-card-title>Biểu đồ dòng tiền</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <div class="h-64 sm:h-96 flex items-end justify-around gap-2 border-b border-l p-4">
            <div *ngFor="let item of data()" class="flex-1 flex flex-col items-center gap-2">
              <!-- Thu bar -->
              <div class="w-full relative">
                <div 
                  class="w-full bg-success rounded-t transition-all duration-300"
                  [style.height.px]="getBarHeight(item.thu)"
                  [title]="'Thu: ' + formatCurrency(item.thu)"
                ></div>
              </div>
              
              <!-- Chi bar -->
              <div class="w-full relative">
                <div 
                  class="w-full bg-destructive rounded-t transition-all duration-300"
                  [style.height.px]="getBarHeight(item.chi)"
                  [title]="'Chi: ' + formatCurrency(item.chi)"
                ></div>
              </div>
              
              <!-- Label -->
              <span class="text-xs text-muted-foreground text-center">
                {{ formatDate(item.ngay) }}
              </span>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="flex justify-center gap-6 mt-4">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-success rounded"></div>
              <span class="text-sm">Thu</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-destructive rounded"></div>
              <span class="text-sm">Chi</span>
            </div>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Table -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Chi tiết dòng tiền</ui-card-title>
        </ui-card-header>
        <ui-card-content class="p-0">
          <!-- Mobile view -->
          <div class="md:hidden divide-y">
            <div *ngFor="let item of data()" class="p-4">
              <div class="font-medium mb-2">{{ formatDate(item.ngay) }}</div>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-muted-foreground">Thu:</span>
                  <span class="font-semibold text-success ml-2">{{ formatCurrency(item.thu) }}</span>
                </div>
                <div>
                  <span class="text-muted-foreground">Chi:</span>
                  <span class="font-semibold text-destructive ml-2">{{ formatCurrency(item.chi) }}</span>
                </div>
              </div>
              <div class="mt-2 pt-2 border-t">
                <span class="text-muted-foreground text-sm">Chênh lệch:</span>
                <span class="font-bold ml-2"
                      [class.text-success]="getChenhLech(item) >= 0"
                      [class.text-destructive]="getChenhLech(item) < 0">
                  {{ formatCurrency(getChenhLech(item)) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Desktop table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full">
              <thead class="border-b bg-slate-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Ngày</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Thu</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Chi</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold">Chênh lệch</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold">% Thu/Chi</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr *ngFor="let item of data()" class="hover:bg-slate-50">
                  <td class="px-4 py-3 text-sm font-medium">{{ formatDate(item.ngay) }}</td>
                  <td class="px-4 py-3 text-sm text-right text-success font-semibold">
                    {{ formatCurrency(item.thu) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-destructive font-semibold">
                    {{ formatCurrency(item.chi) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right font-bold"
                      [class.text-success]="getChenhLech(item) >= 0"
                      [class.text-destructive]="getChenhLech(item) < 0">
                    {{ formatCurrency(getChenhLech(item)) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-center">
                    <span class="inline-block px-2 py-1 rounded-full text-xs"
                          [ngClass]="getRatioClass(item)">
                      {{ getRatioText(item) }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot class="border-t-2 bg-slate-50 font-semibold">
                <tr>
                  <td class="px-4 py-3 text-sm">Tổng cộng</td>
                  <td class="px-4 py-3 text-sm text-right text-success">
                    {{ formatCurrency(summary().tongThu) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right text-destructive">
                    {{ formatCurrency(summary().tongChi) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right"
                      [class.text-success]="summary().chenhLech >= 0"
                      [class.text-destructive]="summary().chenhLech < 0">
                    {{ formatCurrency(summary().chenhLech) }}
                  </td>
                  <td class="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </ui-card-content>
      </ui-card>
    </div>
  `
})
export class BaocaoDongtienComponent implements OnInit {
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  errorMessage = signal<string>('');

  tuNgay: string = '';
  denNgay: string = '';
  groupBy: 'day' | 'week' | 'month' = 'day';
  
  baoCao = signal<BaoCaoResponse | null>(null);
  
  data = computed(() => {
    const d = this.baoCao()?.data || [];
    return d.map(item => ({
      ...item,
      chenhLech: item.thu - item.chi
    }));
  });
  
  summary = computed(() => {
    const bc = this.baoCao();
    if (!bc) {
      return { tongThu: 0, tongChi: 0, tonDauKy: 0, tonCuoiKy: 0, chenhLech: 0 };
    }
    return {
      tongThu: bc.tongThu,
      tongChi: bc.tongChi,
      tonDauKy: bc.tonDauKy,
      tonCuoiKy: bc.tonCuoiKy,
      chenhLech: bc.tongThu - bc.tongChi,
    };
  });

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    const today = new Date();
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);
    
    this.tuNgay = last30Days.toISOString().split('T')[0];
    this.denNgay = today.toISOString().split('T')[0];
    
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(false);

      const result = await this.apollo
        .query<{ baoCaoDongTien: BaoCaoResponse }>({
          query: GET_BAO_CAO_DONG_TIEN,
          variables: {
            tuNgay: this.tuNgay,
            denNgay: this.denNgay,
            groupBy: this.groupBy,
          },
          fetchPolicy: 'network-only',
        })
        .toPromise();

      if (result?.data?.baoCaoDongTien) {
        this.baoCao.set(result.data.baoCaoDongTien);
      }
    } catch (err: any) {
      console.error('Error loading báo cáo:', err);
      this.error.set(true);
      this.errorMessage.set(err.message || 'Có lỗi khi tải báo cáo');
    } finally {
      this.loading.set(false);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('vi-VN');
  }

  getChenhLech(item: DongTienData): number {
    return item.thu - item.chi;
  }

  getRatioClass(item: DongTienData): string {
    if (item.chi <= 0) return 'bg-slate-100 text-slate-600';
    const ratio = item.thu / item.chi;
    if (ratio > 1.2) return 'bg-green-100 text-green-700';
    if (ratio >= 0.8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }

  getRatioText(item: DongTienData): string {
    if (item.chi <= 0) return 'N/A';
    return ((item.thu / item.chi) * 100).toFixed(0) + '%';
  }

  getBarHeight(value: number): number {
    const max = Math.max(
      ...this.data().map(d => Math.max(d.thu, d.chi))
    );
    return max > 0 ? (value / max) * 200 : 0;
  }

  exportExcel(): void {
    alert('Chức năng xuất Excel đang được phát triển');
  }

  exportPDF(): void {
    alert('Chức năng xuất PDF đang được phát triển');
  }
}
