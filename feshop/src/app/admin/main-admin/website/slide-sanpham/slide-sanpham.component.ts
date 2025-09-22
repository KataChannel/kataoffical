import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { GiohangService } from '../giohang/giohang.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SanphamblockComponent } from '../../../../sanpham/sanphamblock/sanphamblock.component';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MatIconModule } from '@angular/material/icon';
/**
 * SlideSanphamComponent - Product slide component với kiểm tra hình ảnh tự động
 * 
 * Tính năng:
 * - Tự động kiểm tra và validate URL hình ảnh sản phẩm
 * - Ưu tiên hiển thị: Main image -> Hinhchinh.src -> placeholder
 * - Loading states cho từng hình sản phẩm
 * - Error handling và fallback tự động
 * - Responsive design cho mobile/desktop
 * - Swiper integration với navigation controls
 */
Swiper.use([Navigation, Pagination, Autoplay]); // Khai báo các module đã import

@Component({
  selector: 'app-slide-sanpham',
  standalone: true,
  imports: [
    DecimalPipe,
    MatButtonModule,
    SanphamblockComponent,
    MatTooltipModule,
    MatIconModule,
  //  NgOptimizedImage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-sanpham.component.html',
  styleUrls: ['./slide-sanpham.component.css'],
})
export class SlideSanphamComponent implements OnInit, AfterViewInit {
  @Input() Title: any = '';
  @Input() Sohang = 1;
  @Input() Socot = 4;
  @Input() Soluong = 8;
  @Input() Filter = '';
  @Input() idDM = 0;
  @Input() Danhmuc: any = {};
  @Input() Type = 'NGANG';
  @Input() Ordering = 0;
  _SanphamService: SanphamService = inject(SanphamService);
  Lists: any = {};
  FilterLists: any[] = [];
  FilterListsDesk: any[] = [];
  SearchParams: any = {
    pageSize: 8,
    pageNumber: 0,
    Status: 1,
  };
  isLoading: boolean = false;
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  swiper?: Swiper;
  @Input() Config: any;
  
  // Image validation properties
  private placeholderImage = 'https://placehold.co/600x400?text=NoImage';
  public imageLoadingStates: { [key: string]: boolean } = {};

  constructor(
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  // Kiểm tra và trả về src hình ảnh hợp lệ cho sản phẩm
  getProductImageSrc(item: any): string {
    // Ưu tiên: Main -> Hinhchinh.src -> placeholder
    let imageSrc: string | null = null;

    // Kiểm tra hình Main trước
    if (item?.Image?.Main && item.Image.Main.trim() !== '') {
      imageSrc = `assets/images/sanpham/${item.Image.Main}`;
    }
    // Nếu không có Main, kiểm tra Hinhchinh.src
    else if (item?.Image?.Hinhchinh?.src && item.Image.Hinhchinh.src.trim() !== '') {
      imageSrc = item.Image.Hinhchinh.src;
    }

    // Nếu không có src hoặc src rỗng, trả về placeholder
    if (!imageSrc || imageSrc.trim() === '') {
      return this.placeholderImage;
    }

    // Kiểm tra xem src có phải là URL hợp lệ không (cho Hinhchinh.src)
    if (!imageSrc.startsWith('assets/')) {
      try {
        new URL(imageSrc);
        return imageSrc;
      } catch (error) {
        // Nếu không phải URL hợp lệ, kiểm tra đường dẫn tương đối
        if (imageSrc.startsWith('/') || imageSrc.startsWith('./') || imageSrc.startsWith('../')) {
          return imageSrc;
        }
        // Nếu không hợp lệ, trả về placeholder
        return this.placeholderImage;
      }
    }

    return imageSrc;
  }

  // Xử lý khi hình ảnh load thành công
  onImageLoad(event: any, itemId: string): void {
    this.imageLoadingStates[itemId] = false;
  }

  // Xử lý khi hình ảnh load bị lỗi
  onImageError(event: any, itemId?: string): void {
    // Thay thế hình bị lỗi bằng placeholder
    event.target.src = this.placeholderImage;
    
    // Cập nhật trạng thái loading
    if (itemId) {
      this.imageLoadingStates[itemId] = false;
    }
    
    // Log lỗi để debug (có thể remove trong production)
    console.warn('Product image failed to load, using placeholder:', event.target.src);
  }

  // Kiểm tra xem hình có đang loading không
  isImageLoading(itemId: string): boolean {
    return this.imageLoadingStates[itemId] || false;
  }

  // Initialize loading states cho sản phẩm
  initializeImageLoadingStates(items: any[]): void {
    items.forEach((item: any) => {
      if (item?.id) {
        this.imageLoadingStates[item.id] = true;
      }
    });
  }

  // Helper method để lấy thông tin giá sản phẩm an toàn
  getProductPrice(item: any): { price: number, unit: string, weight: string } {
    const defaultPrice = { price: 0, unit: '', weight: '' };
    
    if (!item?.Giagoc || !Array.isArray(item.Giagoc) || item.Giagoc.length === 0) {
      return defaultPrice;
    }

    const priceInfo = item.Giagoc[0];
    return {
      price: priceInfo?.gia || 0,
      unit: priceInfo?.dvt || '',
      weight: priceInfo?.khoiluong || ''
    };
  }

  async ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe(async (breakpoints:any) => {
      // console.log(breakpoints.matches);
      if (breakpoints.matches) {
        this.Sohang = 2
        this.SearchParams.Filter = this.Filter    
        if(this.Danhmuc.hasOwnProperty('id')){ this.SearchParams.idDM = this.Danhmuc.id}
       if(this.Type=='DOC')
       {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.Lists.items
         // Initialize image loading states
         this.initializeImageLoadingStates(this.Lists.items);
       }
       else if(this.Soluong==999)
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,4)
         // Initialize image loading states for flattened items
         this.initializeImageLoadingStates(this.Lists.items);
         // console.log(this.FilterLists);
        }
        else 
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang).slice(0,8)  
         // Initialize image loading states for flattened items
         this.initializeImageLoadingStates(this.Lists.items);
         // console.log(this.FilterLists);
         
        }
      } else {
        this.Sohang = 1
        this.SearchParams.Filter = this.Filter    
        if(this.Danhmuc.hasOwnProperty('id')){ this.SearchParams.idDM = this.Danhmuc.id}
       if(this.Type=='DOC')
       {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.Lists.items
         // Initialize image loading states
         this.initializeImageLoadingStates(this.Lists.items);
       }
       else if(this.Soluong==999)
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,4)
         // Initialize image loading states for flattened items
         this.initializeImageLoadingStates(this.Lists.items);
         // console.log(this.FilterLists);
        }
        else 
        {
         this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
         this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang).slice(0,8)  
         // Initialize image loading states for flattened items
         this.initializeImageLoadingStates(this.Lists.items);
         // console.log(this.FilterLists);
         
        }
      }
    });
  }
  SanphamColumn(data: any, n: any) {
    const chunkSize = n; // Number of elements per subarray
    const newArray = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      newArray.push(data.slice(i, i + chunkSize));
    }
    return newArray;
  }
  LitmitSanpham(items: any, soluong: any) {
    return items?.slice(0, soluong);
  }
  ngAfterViewInit() {
    if (this.isLoading == false) {
      setTimeout(() => {
        if (!this.Config) {
          this.Config = {
            // Các tùy chọn của Swiper
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            // pagination: {
            //   el: '.swiper-pagination',
            //   clickable: true,
            // },
            navigation: {
              nextEl: '.button-next',
              prevEl: '.button-prev',
            },
            breakpoints: {
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 5,
              },
            },
            autoplay: false,
            // autoplay: {
            //   delay: 2500,
            //   disableOnInteraction: false,
            // },
          };
        } else {
          this.Config = this.Config;
        }
        if (this.swiperRef) {
          this.swiper = new Swiper(this.swiperRef.nativeElement, this.Config);
        } else {
          console.error('Element reference is not available.');
        }
      }, 1000);
    }
  }
}
