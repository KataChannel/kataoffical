import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  template: `
    <!-- Mobile-First Header -->
    <div class="min-h-screen bg-slate-50">
      <!-- Sticky Header -->
      <header class="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div class="px-4 py-3 sm:px-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 class="text-xl font-semibold text-slate-900 sm:text-2xl">Hỗ trợ kỹ thuật</h1>
            <button 
              [routerLink]="['/admin/support/new']"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 
                     bg-primary text-white rounded-lg font-medium
                     hover:bg-primary/90 active:scale-[0.98] transition-all
                     shadow-sm hover:shadow w-full sm:w-auto">
              <mat-icon class="text-[20px]">add</mat-icon>
              <span>Tạo vấn đề mới</span>
            </button>
          </div>

          <!-- Filter Tabs - Mobile Scrollable -->
          <div class="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            @for (filter of statusFilters; track filter.value) {
              <button 
                (click)="filterByStatus(filter.value)"
                [class]="selectedStatus() === filter.value 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                class="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap 
                       transition-colors flex items-center gap-1.5 shrink-0">
                <span>{{filter.label}}</span>
                @if (filter.value === '') {
                  <span class="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                    {{tickets().length}}
                  </span>
                }
              </button>
            }
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="px-4 py-4 sm:px-6 sm:py-6 max-w-4xl mx-auto">
        @if (loading()) {
          <div class="flex flex-col items-center justify-center py-12 gap-3">
            <mat-spinner diameter="40"></mat-spinner>
            <span class="text-sm text-slate-500">Đang tải...</span>
          </div>
        } @else {
          <!-- Ticket List -->
          <div class="space-y-3">
            @for (ticket of filteredTickets(); track ticket.id) {
              <article 
                [routerLink]="['/admin/support', ticket.id]"
                class="bg-white rounded-xl border border-slate-200 p-4 
                       hover:border-primary/30 hover:shadow-md
                       active:scale-[0.99] transition-all cursor-pointer">
                <!-- Top Row: Status + Priority -->
                <div class="flex items-center gap-2 mb-2">
                  <span [class]="getStatusBadgeClass(ticket.status)"
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" 
                          [class]="getStatusDotClass(ticket.status)"></span>
                    {{getStatusLabel(ticket.status)}}
                  </span>
                  <span [class]="getPriorityBadgeClass(ticket.priority)"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium">
                    {{getPriorityLabel(ticket.priority)}}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="font-medium text-slate-900 text-base leading-snug mb-1.5 line-clamp-2">
                  {{ticket.title}}
                </h3>

                <!-- Description Preview -->
                <p class="text-sm text-slate-500 line-clamp-2 mb-3">
                  {{ticket.description}}
                </p>

                <!-- Footer: Meta Info -->
                <div class="flex items-center justify-between text-xs text-slate-400">
                  <div class="flex items-center gap-1">
                    <mat-icon class="text-[14px]">person</mat-icon>
                    <span>{{ticket.user?.name || 'N/A'}}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    @if (ticket.responses?.length) {
                      <div class="flex items-center gap-1">
                        <mat-icon class="text-[14px]">chat_bubble_outline</mat-icon>
                        <span>{{ticket.responses.length}}</span>
                      </div>
                    }
                    @if (ticket.attachments?.length) {
                      <div class="flex items-center gap-1">
                        <mat-icon class="text-[14px]">attach_file</mat-icon>
                        <span>{{ticket.attachments.length}}</span>
                      </div>
                    }
                    <span>{{ticket.createdAt | date:'dd/MM'}}</span>
                  </div>
                </div>
              </article>
            }
          </div>

          <!-- Empty State -->
          @if (filteredTickets().length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-center">
              <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <mat-icon class="text-4xl text-slate-400">support_agent</mat-icon>
              </div>
              <h3 class="text-lg font-medium text-slate-900 mb-1">Chưa có vấn đề nào</h3>
              <p class="text-sm text-slate-500 mb-4 max-w-xs">
                Tạo yêu cầu hỗ trợ để được phòng Kỹ thuật giải đáp
              </p>
              <button 
                [routerLink]="['/admin/support/new']"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white 
                       rounded-lg font-medium hover:bg-primary/90 transition-colors">
                <mat-icon>add</mat-icon>
                Tạo vấn đề mới
              </button>
            </div>
          }
        }
      </main>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .bg-primary {
      background-color: #3b82f6;
    }
    .text-primary {
      color: #3b82f6;
    }
    .border-primary\\/30 {
      border-color: rgb(59 130 246 / 0.3);
    }
    .hover\\:bg-primary\\/90:hover {
      background-color: rgb(59 130 246 / 0.9);
    }
  `],
})
export class SupportListComponent implements OnInit {
  tickets = signal<any[]>([]);
  filteredTickets = signal<any[]>([]);
  loading = signal(true);
  selectedStatus = signal<string>('');

  statusFilters = [
    { label: 'Tất cả', value: '' },
    { label: 'Mới', value: 'open' },
    { label: 'Đang xử lý', value: 'inProgress' },
    { label: 'Đã giải quyết', value: 'resolved' },
    { label: 'Đã đóng', value: 'closed' },
  ];

  constructor(private supportService: SupportService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading.set(true);
    this.supportService.tickets().subscribe({
      next: (res: any) => {
        const data = res.data?.tickets || [];
        this.tickets.set(data);
        this.filteredTickets.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  filterByStatus(status: string) {
    this.selectedStatus.set(status);
    if (!status) {
      this.filteredTickets.set(this.tickets());
    } else {
      this.filteredTickets.set(
        this.tickets().filter(t => t.status === status)
      );
    }
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      open: 'bg-blue-50 text-blue-700',
      inProgress: 'bg-amber-50 text-amber-700',
      resolved: 'bg-emerald-50 text-emerald-700',
      closed: 'bg-slate-100 text-slate-600',
    };
    return classes[status] || 'bg-slate-100 text-slate-600';
  }

  getStatusDotClass(status: string): string {
    const classes: any = {
      open: 'bg-blue-500',
      inProgress: 'bg-amber-500',
      resolved: 'bg-emerald-500',
      closed: 'bg-slate-400',
    };
    return classes[status] || 'bg-slate-400';
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      open: 'Mới',
      inProgress: 'Đang xử lý',
      resolved: 'Đã giải quyết',
      closed: 'Đã đóng',
    };
    return labels[status] || status;
  }

  getPriorityBadgeClass(priority: string): string {
    const classes: any = {
      low: 'bg-slate-100 text-slate-600',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return classes[priority] || 'bg-slate-100';
  }

  getPriorityLabel(priority: string): string {
    const labels: any = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao',
      urgent: 'Khẩn cấp',
    };
    return labels[priority] || priority;
  }
}
