import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';

/**
 * DanhmucsanphamsiteComponent - Danh mục sản phẩm với kiểm tra hình ảnh tự động
 * 
 * Tính năng:
 * - Tự động kiểm tra và validate URL hình ảnh danh mục
 * - Ưu tiên hiển thị: Thumb -> Hinhchinh.src -> placeholder
 * - Loading states và error handling
 * - Responsive design cho sidebar navigation
 */
@Component({
  selector: 'app-danhmucsanphamsite',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './danhmucsanphamsite.component.html',
  styleUrls: ['./danhmucsanphamsite.component.css']
})
export class DanhmucsanphamsiteComponent implements OnInit {
  SearchParams: any = {
    Status:1,
    pageSize: 50,
    pageNumber: 0,
    Type:'sanpham'
  };
  Danhmucs: any = {}
  _DanhmucService: DanhmucService = inject(DanhmucService);
  
  // Image validation properties
  private placeholderImage = 'assets/images/noimage.png';
  public imageLoadingStates: { [key: string]: boolean } = {};
  
  constructor() { }

  async ngOnInit() {
    this.Danhmucs = await this._DanhmucService.SearchDanhmuc(this.SearchParams)
    this.initializeImageLoadingStates();
  }

  // Khởi tạo trạng thái loading cho tất cả hình ảnh
  private initializeImageLoadingStates(): void {
    if (this.Danhmucs?.items) {
      this.Danhmucs.items.forEach((item: any) => {
        this.imageLoadingStates[item.id] = true;
      });
    }
  }

  // Kiểm tra và trả về src hình ảnh hợp lệ cho danh mục
  getCategoryImageSrc(item: any): string {
    // Ưu tiên: Thumb -> Hinhchinh.src -> placeholder
    let imageSrc: string | null = null;

    // Kiểm tra hình Thumb trước
    if (item?.Image?.Thumb && item.Image.Thumb.trim() !== '') {
      imageSrc = `assets/images/sanpham/${item.Image.Thumb}`;
    }
    // Nếu không có Thumb, kiểm tra Hinhchinh.src
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
  onImageLoad(itemId: string): void {
    this.imageLoadingStates[itemId] = false;
  }

  // Xử lý khi hình ảnh load bị lỗi
  onImageError(event: any, itemId: string): void {
    // Thay thế hình bị lỗi bằng placeholder
    event.target.src = this.placeholderImage;
    this.imageLoadingStates[itemId] = false;
    
    // Log lỗi để debug (có thể remove trong production)
    const item = this.Danhmucs?.items?.find((i: any) => i.id === itemId);
    console.warn('Category image failed to load, using placeholder:', item?.Title || 'Unknown category');
  }

}
