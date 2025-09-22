import { Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonhangsService } from '../../admin/donhang/listdonhang/listdonhang.service';
/**
 * SanphamblockComponent - Product block component với kiểm tra hình ảnh tự động
 * 
 * Tính năng:
 * - Tự động kiểm tra và validate URL hình ảnh sản phẩm
 * - Ưu tiên hiển thị: Main image -> Hinhchinh.src -> placeholder
 * - Loading states và error handling
 * - Add to cart functionality với validation
 * - Responsive design với hover effects
 */
@Component({
  selector: 'app-sanphamblock',
  standalone:true,
  imports:[
    CommonModule,
    MatTooltipModule,
    //NgOptimizedImage
  ],
  templateUrl: './sanphamblock.component.html',
  styleUrls: ['./sanphamblock.component.css']
})
export class SanphamblockComponent implements OnInit {
  @Input() Detail:any={}
  @Input() isMuangay:boolean =true
  _SanphamService:SanphamService = inject(SanphamService)
  _DonhangsService: DonhangsService = inject(DonhangsService);
  
  // Image validation properties
  private placeholderImage = 'https://placehold.co/300x300?text=NoImage';
  public isImageLoading: boolean = true;
  
  constructor(
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit() {   
    // Initialize loading state
    this.isImageLoading = true;
  }

  // Kiểm tra và trả về src hình ảnh hợp lệ cho sản phẩm
  getProductImageSrc(): string {
    // Ưu tiên: Main -> Hinhchinh.src -> placeholder
    let imageSrc: string | null = null;

    // Kiểm tra hình Main trước
    if (this.Detail?.Image?.Main && this.Detail.Image.Main.trim() !== '') {
      imageSrc = `assets/images/sanpham/${this.Detail.Image.Main}`;
    }
    // Nếu không có Main, kiểm tra Hinhchinh.src
    else if (this.Detail?.Image?.Hinhchinh?.src && this.Detail.Image.Hinhchinh.src.trim() !== '') {
      imageSrc = this.Detail.Image.Hinhchinh.src;
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
  onImageLoad(event: any): void {
    this.isImageLoading = false;
  }

  // Xử lý khi hình ảnh load bị lỗi
  onImageError(event: any): void {
    // Thay thế hình bị lỗi bằng placeholder
    event.target.src = this.placeholderImage;
    this.isImageLoading = false;
    
    // Log lỗi để debug (có thể remove trong production)
    console.warn('Product image failed to load, using placeholder:', this.Detail?.Title || 'Unknown product');
  }

  // Helper method để lấy thông tin giá sản phẩm an toàn
  getProductPrice(): { price: number, unit: string } {
    return {
      price: this.Detail?.giagoc || 0,
      unit: this.Detail?.dvt || 'sản phẩm'
    };
  }
  AddtoCart(data:any)
  { 
    console.log(data);
    
    let item:any={}
    item = data.Giagoc.find((v:any)=>v.default == true)||data.Giagoc[0]
    // item.Giachon = data.Giagoc[0]
    // item.Giachon.SLTT = data.Giagoc[0].khoiluong
    item.Soluong=1
    item.Title = data.Title
    // Sử dụng logic kiểm tra hình ảnh an toàn thay vì truy cập trực tiếp
    item.Image = this.getProductImageSrc()
    this._DonhangsService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    })
  }
}
