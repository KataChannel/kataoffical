import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Hỗ trợ kỹ thuật</h1>
        <button mat-raised-button color="primary" [routerLink]="['/support/new']">
          <mat-icon>add</mat-icon>
          Tạo vấn đề mới
        </button>
      </div>

      @if (loading()) {
        <div class="flex justify-center p-8">
          <mat-spinner></mat-spinner>
        </div>
      } @else {
        <div class="grid gap-4">
          @for (ticket of tickets(); track ticket.id) {
            <mat-card class="cursor-pointer hover:shadow-lg transition-shadow" 
                      [routerLink]="['/support', ticket.id]">
              <mat-card-header>
                <mat-card-title>
                  <div class="flex items-center justify-between">
                    <span>{{ticket.title}}</span>
                    <mat-chip [class]="getStatusClass(ticket.status)">
                      {{getStatusLabel(ticket.status)}}
                    </mat-chip>
                  </div>
                </mat-card-title>
                <mat-card-subtitle>
                  <div class="flex items-center gap-2 mt-2">
                    <mat-chip [class]="getPriorityClass(ticket.priority)">
                      {{getPriorityLabel(ticket.priority)}}
                    </mat-chip>
                    <span>•</span>
                    <span>{{ticket.createdAt | date:'dd/MM/yyyy HH:mm'}}</span>
                  </div>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="text-gray-600 line-clamp-2">{{ticket.description}}</p>
                @if (ticket.responses?.length) {
                  <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <mat-icon class="text-sm">comment</mat-icon>
                    <span>{{ticket.responses.length}} phản hồi</span>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          }
        </div>

        @if (tickets().length === 0) {
          <div class="text-center p-12 text-gray-500">
            <mat-icon class="text-6xl mb-4">inbox</mat-icon>
            <p>Chưa có vấn đề nào được tạo</p>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class SupportListComponent implements OnInit {
  tickets = signal<any[]>([]);
  loading = signal(true);

  constructor(private supportService: SupportService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading.set(true);
    this.supportService.tickets().subscribe({
      next: (res: any) => {
        this.tickets.set(res.data.tickets || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      open: 'bg-blue-100 text-blue-800',
      inProgress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return classes[status] || 'bg-gray-100';
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

  getPriorityClass(priority: string): string {
    const classes: any = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return classes[priority] || 'bg-gray-100';
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
