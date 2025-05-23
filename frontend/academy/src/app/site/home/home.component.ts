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
    { id: 2, title: 'Phân Tích', icon: 'info', link: '/thongkectv' },
    { id: 3, title: 'Liên Kết', icon: 'support_agent', link: '/ladictv' },
    {
      id: 3,
      title: 'Tài Nguyên',
      icon: 'photo_library',
      link: '/tainguyenctv',
    },
  ];
  drawerMode = signal<any>('side');
  drawerOpened = signal<any>(true);
  ChuyenGiaConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
  };

  SanphamNoibatConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  };

  BaivietConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };
  _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  ngOnInit() {
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
  }
  ChosenMenu() {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        console.log(result.matches);
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
