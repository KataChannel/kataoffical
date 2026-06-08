import { ChangeDetectionStrategy, Component, inject, signal, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Config, User } from './adminmain';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuService } from '../menu/menu/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreemenuComponent } from '../../shared/common/treemenu/treemenu.component';
import { UserService } from '../user/user.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { StorageService } from '../../shared/utils/storage.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SwPush } from '@angular/service-worker';
import { removeVietnameseAccents } from '../../shared/utils/texttransfer.utils';
import { CommonuserguideComponent } from '../userguide/commonuserguide/commonuserguide.component';
import { UserguideService } from '../userguide/userguide.service';
import { MatDialog } from '@angular/material/dialog';
import { AdvancedSearchDialogComponent } from '../../components/advanced-search-dialog/advanced-search-dialog.component';
import { environment } from '../../../environments/environment.development';
import { QuytrinhDialogComponent } from './quytrinh-dialog/quytrinh-dialog.component';

@Component({
  selector: 'app-adminmain',
  imports: [
    MatTreeModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    RouterLink,
    // RouterLinkActive,
    TreemenuComponent,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.scss']
})
export class AdminmainComponent {
  isFullscreen:boolean=false
  showFiller = false;
  Config:any =Config
  User:any ={}
  isQuytrinh:any=false
  dbName: string = '';
  notifications: any[] = [];
  unreadCount: number = 0;
  isSubscribed: boolean = false;
  isTelegramEnabled: boolean = true;
  notificationSearchTerm: string = '';
  listQuytrinh: any[] = [
    {
      title: 'Quy Trình Order',
      url: '/assets/quytrinh/order.html',
      icon: 'shopping_cart',
      description: 'Quy trình lên đơn và kiểm soát đơn hàng'
    }
  ];
  readonly VAPID_PUBLIC_KEY = "BAvPai7WQsKJEriy6QzNwR8PilSz-BugoT221pgKAgXQb7CH55KLe8WbEP23a7GdNsppktd0IR9lTmpLPsgJuyE";

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      title: node.title,
      level: level,
      node:node,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node?.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  _MenuService:MenuService = inject(MenuService)
  constructor(
    private _breakpointObserver:BreakpointObserver,
    private _UserService:UserService,
    private _ErrorLogService:ErrorLogService,
    private swPush: SwPush,
    private router: Router,
  ) {}

  hasChild = (_: number, node: any) => node.expandable;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  _snackBar:MatSnackBar = inject(MatSnackBar)
  _StorageService:StorageService = inject(StorageService)
  _UserguideService:UserguideService = inject(UserguideService)
  private dialog = inject(MatDialog)
  ListMenu:any[] = []
  FilterListMenu:any[] = []
  DetailUserguide:any = signal<any>({});
  async ngOnInit() {
    await this._UserService.getProfile().then(async (res: any) => {
      if(res){
        // console.log('User profile:', res);
        
        this.User = res;  
        const permissions = this.User?.permissions?.map((v:any)=>v.name);     
        await this._MenuService.getTreeMenu(permissions)
        this.ListMenu = this.FilterListMenu = this._MenuService.ListMenu()    
        this.dataSource.data = this._MenuService.ListMenu()
        
        await this.fetchNotifications();
        this.checkSubscriptionStatus();
        await this.fetchTelegramStatus();
      } 
    });
    await this._UserguideService.getUserguideBy({codeId:'I100001'})
    this.DetailUserguide = this._UserguideService.DetailUserguide
    this.fetchDatabaseInfo();

    // Listen for push notifications while the app is open
    this.swPush.messages.subscribe(msg => {
      console.log('Push message received:', msg);
      this.fetchNotifications();
    });
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
  }
  logout() {    
    this._UserService.logout().then((res: any) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
  searchFunction(event: any) {
    
    this.FilterListMenu = this.ListMenu.filter((item: any) => {
      return removeVietnameseAccents(item.title).toLowerCase().includes(event.target.value.toLowerCase()) 
      || item.title.toLowerCase().includes(event.target.value.toLowerCase())
      || item?.children?.some((child: any) => 
        removeVietnameseAccents(child.title).toLowerCase().includes(event.target.value.toLowerCase())
      || child.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    })  
  }
  async ClearCache(): Promise<void> {
    const token = this._StorageService.getItem('token');
    const permissions = this._StorageService.getItem('permissions');
    this._StorageService.deleteAllIndexedDBs()
    this._StorageService.clear()
    if (token) {
      this._StorageService.setItem('token', token);
    }
    if (permissions) {
      this._StorageService.setItem('permissions', permissions);
    }
    await this._ErrorLogService.ClearRedisCache()
    this._snackBar.open('Xóa Cache Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(AdvancedSearchDialogComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'advanced-search-dialog-container',
      data: {
        initialKeyword: '' // Có thể truyền keyword từ input nếu có
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Search dialog closed with result:', result);
      }
    });
  }

  openQuytrinhDialog(item: any): void {
    const dialogRef = this.dialog.open(QuytrinhDialogComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      panelClass: 'quytrinh-dialog-container',
      data: {
        title: item.title,
        url: item.url
      }
    });
  }
  events = [
    { date: '2025-01-01', title: 'Project Start', description: 'Initiated the project with team.', icon: 'fa-circle' },
    { date: '2025-03-01', title: 'Milestone 1', description: 'Completed first phase.', icon: 'fa-check' },
    { date: '2025-06-01', title: 'Milestone 2', description: 'Launched beta version.', icon: 'fa-rocket' },
  ];

  async fetchDatabaseInfo() {
    try {
      const response = await fetch(`${environment.APIURL}/database-info`);
      const data = await response.json();
      if (data.success && data.database) {
        this.dbName = data.database.name;
      }
    } catch (error) {
      console.error('Error fetching database info:', error);
    }
  }

  async fetchNotifications() {
    if (!this.User?.id) return;
    try {
      let url = `${environment.APIURL}/notifications/user/${this.User.id}`;
      if (this.notificationSearchTerm) {
        url += `?search=${encodeURIComponent(this.notificationSearchTerm)}`;
      }
      const resp = await fetch(url);
    const data = await resp.json();
    this.notifications = Array.isArray(data) ? data : [];
    
    const countResp = await fetch(`${environment.APIURL}/notifications/user/${this.User.id}/unread-count`);
    const countData = await countResp.json();
    this.unreadCount = countData && typeof countData.count === 'number' ? countData.count : 0;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }

  onNotificationSearch() {
    this.fetchNotifications();
  }

  async checkSubscriptionStatus() {
    if (this.swPush.isEnabled) {
      this.swPush.subscription.subscribe(sub => {
        this.isSubscribed = !!sub;
      });
    }
  }

  async toggleNotifications(event: any) {
    if (!this.swPush.isEnabled) {
      const isSecureContext = window.isSecureContext;
      const message = isSecureContext 
        ? 'Tính năng thông báo đang bị tắt trong cấu hình hoặc Service Worker chưa sẵn sàng.' 
        : 'Thông báo đẩy yêu cầu kết nối bảo mật (HTTPS) hoặc Localhost.';
      
      this._snackBar.open(message, 'Đóng', { 
        duration: 5000,
        panelClass: ['snackbar-warning'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      return;
    }

    if (this.isSubscribed) {
      // Unsubscribe logic would go here if needed, but we can just toggle back
      // For simplicity, we just enable. If they want to disable, they'd have to use browser settings or we implement unsubscribe
      this._snackBar.open('Thông báo đang bật. Để tắt, vui lòng dùng cài đặt trình duyệt.', 'Đóng', { 
        duration: 3000,
        panelClass: ['snackbar-info'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    } else {
      try {
        const sub = await this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        });
        
        // Send subscription to backend
        await fetch(`${environment.APIURL}/notifications/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.User.id,
            subscription: sub
          })
        });
        
        this.isSubscribed = true;
        this._snackBar.open('Đã bật thông báo thành công!', 'Đóng', { 
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      } catch (err) {
        console.error('Could not subscribe to notifications', err);
        this.isSubscribed = false;
      }
    }
  }

  async fetchTelegramStatus() {
    try {
      const resp = await fetch(`${environment.APIURL}/notifications/telegram-settings`);
      const data = await resp.json();
      if (data && data.enabled !== undefined) {
        this.isTelegramEnabled = data.enabled;
      }
    } catch (error) {
      console.error('Error fetching Telegram status:', error);
    }
  }

  async toggleTelegramNotifications(event: any) {
    const originalState = this.isTelegramEnabled;
    this.isTelegramEnabled = event.checked;

    try {
      const resp = await fetch(`${environment.APIURL}/notifications/telegram-settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: this.isTelegramEnabled })
      });
      const data = await resp.json();
      
      if (data.success) {
        this._snackBar.open(
          this.isTelegramEnabled ? 'Đã bật gửi tin nhắn Telegram!' : 'Đã tắt gửi tin nhắn Telegram!', 
          'Đóng', 
          { 
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }
        );
      } else {
        throw new Error(data.message || 'Failed to update settings');
      }
    } catch (err) {
      console.error('Could not update Telegram settings', err);
      this.isTelegramEnabled = originalState;
      this._snackBar.open('Lỗi cấu hình Telegram, vui lòng thử lại.', 'Đóng', { 
        duration: 3000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  }

  async markAsRead(notification: any) {
    if (!notification.isRead) {
      try {
        await fetch(`${environment.APIURL}/notifications/${notification.id}/read`, { method: 'PATCH' });
        notification.isRead = true;
        if (this.unreadCount > 0) this.unreadCount--;
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
    
    // Navigate if there's a link
    if (notification.link) {
      // If link is internal (starts with /), use router
      if (notification.link.startsWith('/')) {
        this.router.navigateByUrl(notification.link);
      } else {
        window.open(notification.link, '_blank');
      }
    }
  }

  async markAllAsRead() {
    try {
      await fetch(`${environment.APIURL}/notifications/user/${this.User.id}/read-all`, { method: 'PATCH' });
      this.notifications.forEach(n => n.isRead = true);
      this.unreadCount = 0;
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }

  async deleteNotification(id: string) {
    try {
      await fetch(`${environment.APIURL}/notifications/${id}`, { method: 'DELETE' });
      this.notifications = this.notifications.filter(n => n.id !== id);
      await this.fetchNotifications(); // Refresh count properly
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  async testPushNotification() {
    try {
      this._snackBar.open('Đang gửi thông báo thử nghiệm...', '', { duration: 1000 });
      const resp = await fetch(`${environment.APIURL}/notifications/test-admin-push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Push Notification',
          body: 'Đây là thông báo test được gửi từ nút Test UI.'
        })
      });
      const data = await resp.json();
      if (data.success) {
        this._snackBar.open('Đã phát thông báo test cho Admin!', 'Đóng', { duration: 3000, panelClass: ['snackbar-success'] });
      }
    } catch (error) {
      console.error('Error testing push notification:', error);
      this._snackBar.open('Lỗi khi gửi thông báo test', 'Đóng', { duration: 3000, panelClass: ['snackbar-error'] });
    }
  }
}
