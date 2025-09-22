import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Autoplay]); // Khai báo các module đã import
import { register } from 'swiper/element/bundle';
/**
 * SlidesiteComponent - Slide component với kiểm tra hình ảnh tự động
 * 
 * Tính năng:
 * - Tự động kiểm tra và validate URL hình ảnh
 * - Thay thế hình lỗi bằng placeholder
 * - Loading states cho từng hình
 * - Error handling và fallback
 * - Hỗ trợ cả URL tuyệt đối và tương đối
 */
@Component({
  selector: 'app-slidesite',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slidesite.component.html',
  styleUrls: ['./slidesite.component.css']
})
export class SlidesiteComponent implements OnInit {
  @Input() Config:any={}
  @Input() Detail:any={}
  
  private placeholderImage = 'https://placehold.co/600x400?text=NoImage';
  public imageLoadingStates: { [key: string]: boolean } = {};
  
  constructor() {
   }
   
   ngOnInit() {
    // Khởi tạo trạng thái loading cho các hình
    if (this.Detail?.Slides) {
      this.Detail.Slides.forEach((item: any) => {
        this.imageLoadingStates[item.id] = true;
      });
    }
  }
  
  ngAfterViewInit()
  {
    // console.log(this.Detail.Title,this.Config);
    register();
    //this.initializeSwiper();
  }
  
  GetID(item:any)
  {
    return item.slice(0,4)
  }
  
  // Kiểm tra và trả về src hình ảnh hợp lệ
  getImageSrc(item: any): string {
    // Kiểm tra xem có đường dẫn hình ảnh không
    const imageSrc = item?.Image?.Hinhchinh?.src;
    
    // Nếu không có src hoặc src rỗng, trả về placeholder
    if (!imageSrc || imageSrc.trim() === '') {
      return this.placeholderImage;
    }
    
    // Kiểm tra xem src có phải là URL hợp lệ không
    try {
      new URL(imageSrc);
      return imageSrc;
    } catch (error) {
      // Nếu không phải URL hợp lệ, kiểm tra xem có phải đường dẫn tương đối không
      if (imageSrc.startsWith('/') || imageSrc.startsWith('./') || imageSrc.startsWith('../')) {
        return imageSrc;
      }
      // Nếu không hợp lệ, trả về placeholder
      return this.placeholderImage;
    }
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
    console.warn('Image failed to load, using placeholder:', event.target.src);
  }
  
  // Kiểm tra xem hình có đang loading không
  isImageLoading(itemId: string): boolean {
    return this.imageLoadingStates[itemId] || false;
  }
  
  // Optional: Kiểm tra hình ảnh có tồn tại không (async)
  async checkImageExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  // Optional: Validate image URL trước khi hiển thị
  validateImageUrl(item: any): Promise<string> {
    return new Promise(async (resolve) => {
      const imageSrc = this.getImageSrc(item);
      
      // Nếu đã là placeholder, trả về luôn
      if (imageSrc === this.placeholderImage) {
        resolve(imageSrc);
        return;
      }
      
      // Kiểm tra xem hình có tồn tại không
      const exists = await this.checkImageExists(imageSrc);
      resolve(exists ? imageSrc : this.placeholderImage);
    });
  }
  getSwiperConfig() {
    return {
      modules: [Pagination,Navigation],
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      navigation:true,
      slidesPerView:this.Detail.Config.default,
      spaceBetween: 10,
      speed:1000,
      loop:true,
      autoplay:{
        delay:5000
      },
      breakpoints: {
        640: {
          slidesPerView:  this.Detail.Config.xs,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: this.Detail.Config.md,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: this.Detail.Config.lg,
          spaceBetween: 10,
        },
      },
    };
  }

  // initializeSwiper = () => {
  //   if (!this.Config || !this.Config.slidesPerView) {
  //     console.error('Config or slidesPerView is not defined');
  //     return;
  //   }
  //   const swiper = new Swiper('.mySwiper'+this.GetID(this.Detail.id), this.getSwiperConfig());
  //   // console.log(this.Detail.Title,this.getSwiperConfig());
    
  // }
}

