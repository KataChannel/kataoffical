import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

interface RecentPriceChange {
  sanphamTitle: string;
  banggiaTitle: string;
  oldPrice: number;
  newPrice: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

@Component({
  selector: 'app-price-alerts-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule
  ],
  template: `
    <mat-card class="price-alerts-widget">
      <mat-card-header>
        <mat-card-title>
          <mat-icon [matBadge]="unreadCount()" matBadgeColor="warn" [matBadgeHidden]="unreadCount() === 0">
            notifications_active
          </mat-icon>
          Thay Đổi Giá Gần Đây
        </mat-card-title>
        <button mat-icon-button (click)="viewAll()">
          <mat-icon>open_in_new</mat-icon>
        </button>
      </mat-card-header>
      <mat-card-content>
        <mat-list *ngIf="recentChanges().length > 0">
          <mat-list-item *ngFor="let change of recentChanges().slice(0, 5)">
            <mat-icon matListItemIcon [class.increase]="change.change > 0" [class.decrease]="change.change < 0">
              {{ change.change > 0 ? 'trending_up' : 'trending_down' }}
            </mat-icon>
            <div matListItemTitle>
              <strong>{{ change.sanphamTitle }}</strong>
            </div>
            <div matListItemLine class="price-info">
              <span class="old-price">{{ formatCurrency(change.oldPrice) }}</span>
              <mat-icon class="arrow">arrow_forward</mat-icon>
              <span class="new-price" [class.increase]="change.change > 0" [class.decrease]="change.change < 0">
                {{ formatCurrency(change.newPrice) }}
              </span>
              <span class="percent" [class.increase]="change.change > 0" [class.decrease]="change.change < 0">
                ({{ change.changePercent > 0 ? '+' : '' }}{{ change.changePercent.toFixed(1) }}%)
              </span>
            </div>
            <div matListItemLine class="time">
              {{ formatRelativeTime(change.timestamp) }}
            </div>
          </mat-list-item>
        </mat-list>
        <div class="empty-state" *ngIf="recentChanges().length === 0">
          <mat-icon>notifications_none</mat-icon>
          <p>Chưa có thay đổi nào</p>
        </div>
      </mat-card-content>
      <mat-card-actions *ngIf="recentChanges().length > 5">
        <button mat-button color="primary" (click)="viewAll()">
          Xem tất cả ({{ recentChanges().length }})
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .price-alerts-widget {
      height: 100%;

      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        mat-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
        }
      }

      mat-card-content {
        max-height: 400px;
        overflow-y: auto;

        mat-list-item {
          border-bottom: 1px solid #f0f0f0;
          padding: 10px 0;

          &:last-child {
            border-bottom: none;
          }

          mat-icon {
            &.increase {
              color: #f44336;
            }

            &.decrease {
              color: #4caf50;
            }

            &.arrow {
              font-size: 16px;
              width: 16px;
              height: 16px;
              color: #999;
              margin: 0 5px;
            }
          }

          .price-info {
            display: flex;
            align-items: center;
            font-size: 13px;
            margin-top: 4px;

            .old-price {
              color: #999;
              text-decoration: line-through;
            }

            .new-price {
              font-weight: 600;

              &.increase {
                color: #f44336;
              }

              &.decrease {
                color: #4caf50;
              }
            }

            .percent {
              font-size: 12px;
              margin-left: 5px;

              &.increase {
                color: #f44336;
              }

              &.decrease {
                color: #4caf50;
              }
            }
          }

          .time {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
          }
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #999;

          mat-icon {
            font-size: 48px;
            width: 48px;
            height: 48px;
            margin-bottom: 10px;
            color: #bdbdbd;
          }

          p {
            margin: 0;
            font-size: 14px;
          }
        }
      }

      mat-card-actions {
        display: flex;
        justify-content: center;
        padding: 8px;
        border-top: 1px solid #f0f0f0;
      }
    }
  `]
})
export class PriceAlertsWidgetComponent implements OnInit {
  recentChanges = signal<RecentPriceChange[]>([]);
  unreadCount = signal(0);

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadRecentChanges();
  }

  async loadRecentChanges() {
    // Mock data - replace with actual API
    const mockChanges: RecentPriceChange[] = [
      {
        sanphamTitle: 'Rau xanh',
        banggiaTitle: 'Bảng giá bán lẻ',
        oldPrice: 10000,
        newPrice: 12000,
        change: 2000,
        changePercent: 20,
        timestamp: new Date()
      },
      {
        sanphamTitle: 'Rau cải',
        banggiaTitle: 'Bảng giá bán sỉ',
        oldPrice: 15000,
        newPrice: 13500,
        change: -1500,
        changePercent: -10,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        sanphamTitle: 'Cà chua',
        banggiaTitle: 'Bảng giá VIP',
        oldPrice: 8000,
        newPrice: 9200,
        change: 1200,
        changePercent: 15,
        timestamp: new Date(Date.now() - 7200000)
      }
    ];

    this.recentChanges.set(mockChanges);
    this.unreadCount.set(mockChanges.length);
  }

  viewAll() {
    this.router.navigate(['/admin/price-alerts']);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  }
}
