import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingService } from '../../admin/setting/setting.service';
import { StorageService } from '../../shared/utils/storage.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { UserService } from '../../admin/user/user.service';
@Component({
  selector: 'app-namno',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
],
  templateUrl: './namno.component.html',
  styleUrl: './namno.component.scss'
})
export class NamnoComponent {
  ListMenu: any[] = [
    {
      name: 'Danh Mục',
      icon: 'category',
      slug: 'danhmuc'
    },
    {
      name: 'Sản Phẩm',
      icon: 'inventory_2',
      slug: 'sanpham'
    },
        {
      name: 'Khách Hàng',
      icon: 'people',
      slug: 'khachhang'
    },
    {
      name: 'Bảng Giá',
      icon: 'price_change',
      slug: 'banggia'
    },
    {
      name: 'Đơn Hàng',
      icon: 'dashboard',
      slug: 'donhang'
    },
    {
      name: 'Nhà Cung Cấp',
      icon: 'business',
      slug: 'nhacungcap'
    },
    {
      name: 'Đặt Hàng',
      icon: 'shopping_cart',
      slug: 'dathang'
    },
    {
      name: 'Kho',
      icon: 'inventory',
      slug: 'kho'
    }
    // {
    //   name: 'Vận Chuyển',
    //   icon: 'local_shipping',
    //   slug: 'vanchuyen'
    // }
  ];
  filterMenu: any[] = [];
  isOpen = true;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  _snackBar:MatSnackBar = inject(MatSnackBar)
  _StorageService:StorageService = inject(StorageService)
  _SettingService:SettingService = inject(SettingService)
  _ErrorLogService:ErrorLogService = inject(ErrorLogService)
  _UserService:UserService = inject(UserService)
  User:any ={}
  isFullscreen:boolean=false
  showFiller = false;
  isShowBottomBar:boolean = false;
  constructor(private _breakpointObserver: BreakpointObserver) {

  }
  async ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
    this.filterMenu = this.ListMenu
  }
  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();    
    this.filterMenu = this.ListMenu.filter(menu =>
      menu.name.toLowerCase().includes(filterValue) ||
      menu.slug.toLowerCase().includes(filterValue)
    );
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
 async ClearCache(): Promise<void> {
    const token = this._StorageService.getItem('token');
    const permissions = this._StorageService.getItem('permissions');
    this._StorageService.clearAllIndexedDB()
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
}
