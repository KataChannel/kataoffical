import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-namno',
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './namno.component.html',
  styleUrl: './namno.component.scss'
})
export class NamnoComponent {
  ListMenu: any[] = [
    // {
    //   name: 'Danh Mục',
    //   icon: 'category',
    //   slug: 'danhmuc'
    // },
    {
      name: 'Sản Phẩm',
      icon: 'inventory_2',
      slug: 'sanpham'
    },
    {
      name: 'Đơn Hàng',
      icon: 'dashboard',
      slug: 'donhang'
    },
    {
      name: 'Đặt Hàng',
      icon: 'shopping_cart',
      slug: 'dathang'
    },
    {
      name: 'Báo Giá',
      icon: 'price_change',
      slug: 'baogia'
    },
    {
      name: 'Kho',
      icon: 'inventory',
      slug: 'kho'
    },
    {
      name: 'Vận Chuyển',
      icon: 'local_shipping',
      slug: 'vanchuyen'
    },
    {
      name: 'Khách Hàng',
      icon: 'people',
      slug: 'khachhang'
    },
    {
      name: 'Nhà Cung Cấp',
      icon: 'business',
      slug: 'nhacungcap'
    }
  ];
  isOpen = true;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
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
  }

}
