import { Component, inject, signal, ViewChild } from '@angular/core';
import { SwiperComponent } from '../../shared/common/swiper/swiper.component';
import { KeyfiguresComponent } from './keyfigures/keyfigures.component';
import { Sanphams } from '../../shared/mockdata/sanpham';
import { Reviews } from '../../shared/mockdata/review';
import { Baiviets } from '../../shared/mockdata/baiviet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { StorageService } from '../../shared/utils/storage.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../admin/user/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { title } from 'process';
import { ThanhtoanhoahongService } from '../../admin/thanhtoanhoahong/thanhtoanhoahong.service';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  _StorageService: StorageService = inject(StorageService);
  _UserService: UserService = inject(UserService);
  constructor() {}
  ListSanpham: any[] = Sanphams;
  ListReview: any[] = Reviews;
  ListBaiviet: any[] = Baiviets;
  token: string | null = this._StorageService.getItem('token');
  ListMenu: any[] = [
    { id: 1, title: 'Tổng Quan', icon: 'home', link: '/dashboardctv' },
    // { id: 2, title: 'Phân Tích', icon: 'info', link: '/thongkectv' },
    { id: 3, title: 'Liên Kết', icon: 'link', link: '/affiliatectv' },
    { id: 4, title: 'Khóa Học', icon: 'web', link: '/ladictv' },
    // {
    //   id: 5,
    //   title: 'Tài Nguyên',
    //   icon: 'photo_library',
    //   link: '/tainguyenctv',
    // },
  ];
  drawerMode = signal<any>('side');
  drawerOpened = signal<any>(true);
  _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  _ThanhtoanhoahongService: ThanhtoanhoahongService = inject(ThanhtoanhoahongService);
  profile: any = this._UserService.profile;
  TotalThanhtoanhoahong: any = 0;
  async ngOnInit() {
      await this._UserService.getProfile()
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawerMode.set('over');
          this.drawerOpened.set(false);
        } else {
          if (!this.token) {
            this.drawer.close();
            this.drawerOpened.set(false);
          } else {
            this.drawerMode.set('side');
            this.drawerOpened.set(true);
          }
        }
      });
     this.TotalThanhtoanhoahong = await this._ThanhtoanhoahongService.getTotalThanhtoanhoahongByUserId(this.profile().id);
  }
  ChosenMenu() {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.close();
        } else {
          // this.drawerOpened.set(false);
        }
      });
  }
  logout() {
    console.log('logout');
    this._UserService.logout().then((res: any) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
}
