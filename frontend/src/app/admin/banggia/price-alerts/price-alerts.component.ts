import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

interface PriceAlert {
  id: string;
  type: 'increase' | 'decrease' | 'change' | 'threshold';
  banggiaId: string;
  banggiaTitle: string;
  sanphamId?: string;
  sanphamTitle?: string;
  threshold?: number;
  percentThreshold?: number;
  enabled: boolean;
  notifyEmail: boolean;
  notifySMS: boolean;
  notifyInApp: boolean;
  createdAt: Date;
}

interface PriceChangeNotification {
  id: string;
  alertId: string;
  sanphamTitle: string;
  banggiaTitle: string;
  oldPrice: number;
  newPrice: number;
  change: number;
  changePercent: number;
  reason: string;
  changedBy: string;
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-price-alerts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule
  ],
  templateUrl: './price-alerts.component.html',
  styleUrls: ['./price-alerts.component.scss']
})
export class PriceAlertsComponent implements OnInit {
  alertForm!: FormGroup;
  
  // Signals
  loading = signal(false);
  alerts = signal<PriceAlert[]>([]);
  notifications = signal<PriceChangeNotification[]>([]);
  unreadCount = signal(0);
  
  // Data
  banggiaList = signal<any[]>([]);
  sanphamList = signal<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.alertForm = this.fb.group({
      type: ['change', Validators.required],
      banggiaId: ['', Validators.required],
      sanphamId: [''],
      threshold: [0],
      percentThreshold: [10],
      notifyEmail: [true],
      notifySMS: [false],
      notifyInApp: [true]
    });
  }

  async loadData() {
    this.loading.set(true);
    try {
      // TODO: Replace with actual API calls
      await this.loadAlerts();
      await this.loadNotifications();
      await this.loadBanggiaList();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async loadAlerts() {
    // Mock data - replace with actual API
    const mockAlerts: PriceAlert[] = [
      {
        id: 'alert-1',
        type: 'increase',
        banggiaId: 'bg-1',
        banggiaTitle: 'Bảng giá bán lẻ',
        threshold: 10,
        percentThreshold: 15,
        enabled: true,
        notifyEmail: true,
        notifySMS: false,
        notifyInApp: true,
        createdAt: new Date()
      },
      {
        id: 'alert-2',
        type: 'change',
        banggiaId: 'bg-2',
        banggiaTitle: 'Bảng giá bán sỉ',
        sanphamId: 'sp-1',
        sanphamTitle: 'Rau xanh',
        enabled: true,
        notifyEmail: false,
        notifySMS: false,
        notifyInApp: true,
        createdAt: new Date()
      }
    ];
    
    this.alerts.set(mockAlerts);
  }

  async loadNotifications() {
    // Mock data - replace with actual API
    const mockNotifications: PriceChangeNotification[] = [
      {
        id: 'notif-1',
        alertId: 'alert-1',
        sanphamTitle: 'Rau xanh',
        banggiaTitle: 'Bảng giá bán lẻ',
        oldPrice: 10000,
        newPrice: 12000,
        change: 2000,
        changePercent: 20,
        reason: 'Tăng giá theo thị trường',
        changedBy: 'admin',
        timestamp: new Date(),
        read: false
      },
      {
        id: 'notif-2',
        alertId: 'alert-2',
        sanphamTitle: 'Rau cải',
        banggiaTitle: 'Bảng giá bán sỉ',
        oldPrice: 15000,
        newPrice: 13500,
        change: -1500,
        changePercent: -10,
        reason: 'Khuyến mãi',
        changedBy: 'manager',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ];
    
    this.notifications.set(mockNotifications);
    this.unreadCount.set(mockNotifications.filter(n => !n.read).length);
  }

  async loadBanggiaList() {
    // Mock data
    this.banggiaList.set([
      { id: 'bg-1', title: 'Bảng giá bán lẻ' },
      { id: 'bg-2', title: 'Bảng giá bán sỉ' },
      { id: 'bg-3', title: 'Bảng giá khách VIP' }
    ]);
  }

  async createAlert() {
    if (!this.alertForm.valid) {
      this.snackBar.open('Vui lòng điền đầy đủ thông tin', 'Đóng', { duration: 3000 });
      return;
    }

    const formValue = this.alertForm.value;
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      type: formValue.type,
      banggiaId: formValue.banggiaId,
      banggiaTitle: this.banggiaList().find(b => b.id === formValue.banggiaId)?.title || '',
      sanphamId: formValue.sanphamId || undefined,
      threshold: formValue.threshold || undefined,
      percentThreshold: formValue.percentThreshold || undefined,
      enabled: true,
      notifyEmail: formValue.notifyEmail,
      notifySMS: formValue.notifySMS,
      notifyInApp: formValue.notifyInApp,
      createdAt: new Date()
    };

    this.alerts.update(alerts => [...alerts, newAlert]);
    this.snackBar.open('Đã tạo cảnh báo thành công', 'Đóng', { duration: 3000 });
    this.alertForm.reset({ type: 'change', notifyEmail: true, notifyInApp: true });
  }

  toggleAlert(alert: PriceAlert) {
    this.alerts.update(alerts => 
      alerts.map(a => a.id === alert.id ? { ...a, enabled: !a.enabled } : a)
    );
    
    const message = alert.enabled ? 'Đã tắt cảnh báo' : 'Đã bật cảnh báo';
    this.snackBar.open(message, 'Đóng', { duration: 2000 });
  }

  deleteAlert(alertId: string) {
    if (!confirm('Bạn có chắc chắn muốn xóa cảnh báo này?')) return;
    
    this.alerts.update(alerts => alerts.filter(a => a.id !== alertId));
    this.snackBar.open('Đã xóa cảnh báo', 'Đóng', { duration: 2000 });
  }

  markAsRead(notification: PriceChangeNotification) {
    this.notifications.update(notifications =>
      notifications.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    this.updateUnreadCount();
  }

  markAllAsRead() {
    this.notifications.update(notifications =>
      notifications.map(n => ({ ...n, read: true }))
    );
    this.unreadCount.set(0);
    this.snackBar.open('Đã đánh dấu tất cả là đã đọc', 'Đóng', { duration: 2000 });
  }

  deleteNotification(notificationId: string) {
    this.notifications.update(notifications =>
      notifications.filter(n => n.id !== notificationId)
    );
    this.updateUnreadCount();
  }

  updateUnreadCount() {
    const unread = this.notifications().filter(n => !n.read).length;
    this.unreadCount.set(unread);
  }

  getAlertTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      increase: 'Tăng giá',
      decrease: 'Giảm giá',
      change: 'Thay đổi bất kỳ',
      threshold: 'Vượt ngưỡng'
    };
    return labels[type] || type;
  }

  getAlertTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      increase: 'trending_up',
      decrease: 'trending_down',
      change: 'notifications_active',
      threshold: 'warning'
    };
    return icons[type] || 'notifications';
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
