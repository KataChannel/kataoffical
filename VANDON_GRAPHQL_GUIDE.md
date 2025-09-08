# Vandon Component - GraphQL Integration Guide

## 📋 Tổng quan
Component Vandon đã được nâng cấp toàn diện với GraphQL integration, loading states, và Excel export functionality.

## 🚀 Tính năng mới

### 1. GraphQL Integration
- **Service**: `DonhangGraphqlService`
- **Tối ưu queries**: Chỉ lấy các field cần thiết
- **Real-time updates**: Socket integration
- **Error handling**: Comprehensive error management

### 2. Loading States
- **Progress Bar**: Hiển thị khi đang tải dữ liệu
- **Spinner**: Loading indicator cho table
- **Loading Signal**: Reactive loading state management
- **Disabled States**: Vô hiệu hóa buttons khi loading

### 3. Excel Export Features
- **Export Current Data**: Xuất dữ liệu đang hiển thị
- **Export All Data**: Xuất toàn bộ dữ liệu
- **Custom Formatting**: Format dữ liệu cho Excel
- **Progress Indicators**: Loading states cho export process

### 4. Client-side Pagination
- **Mat Paginator**: Pagination ở client
- **Performance**: Tối ưu UX/UI
- **Filtering**: Maintain filter state với pagination

## 🏗️ Cấu trúc code

### GraphQL Service Methods

```typescript
// Tìm kiếm đơn hàng với GraphQL
async searchDonhang(searchParams: any)

// Lấy chi tiết đơn hàng
async getOneDonhang(id: string)

// Tạo đơn hàng mới
async CreateDonhang(dulieu: any)

// Cập nhật đơn hàng
async updateDonhang(dulieu: any)

// Xóa đơn hàng
async deleteDonhang(id: string)

// Xuất Excel
async exportVandonToExcel(data?: any[])

// Thống kê
async getStatistics(searchParams?: any)

// Tìm kiếm nhanh
async quickSearch(searchTerm: string)
```

### Component Signals

```typescript
// Dữ liệu từ GraphQL service
get Listvandon() {
  return this._DonhangGraphqlService.ListVandon();
}

// Loading state
loading = this._DonhangGraphqlService.loading;

// Error state
error = this._DonhangGraphqlService.error;

// Đơn hàng ID
donhangId = this._DonhangGraphqlService.donhangId;
```

### Export Methods

```typescript
// Xuất Excel dữ liệu hiện tại
async exportVandonToExcel() {
  await this._DonhangGraphqlService.exportVandonToExcel(
    this.dataSource().filteredData || this.Listvandon
  );
}

// Xuất Excel toàn bộ
async exportAllToExcel() {
  await this._DonhangGraphqlService.exportVandonToExcel();
}
```

## 🎨 UI/UX Improvements

### Loading Indicators
```html
<!-- Progress Bar -->
<mat-progress-bar *ngIf="loading()" mode="indeterminate" color="primary"></mat-progress-bar>

<!-- Table Loading Overlay -->
<div *ngIf="loading()" class="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
  <div class="text-center">
    <mat-spinner diameter="40"></mat-spinner>
    <p class="mt-2 text-gray-600">Đang tải dữ liệu...</p>
  </div>
</div>
```

### Export Buttons
```html
<!-- Export Excel Buttons -->
<button matTooltip="Xuất Excel (Dữ liệu hiển thị)" mat-icon-button color="accent" 
        [disabled]="loading()" (click)="exportVandonToExcel()">
  <mat-icon>file_download</mat-icon>
</button>
<button matTooltip="Xuất Excel (Toàn bộ)" mat-icon-button color="warn" 
        [disabled]="loading()" (click)="exportAllToExcel()">
  <mat-icon>download</mat-icon>
</button>
```

### Error Display
```html
<!-- Error Display -->
<div *ngIf="error()" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
  <span class="font-bold">Lỗi:</span> {{error()}}
</div>
```

## 📊 GraphQL Query Optimization

### Optimized Fields Selection
```typescript
const result = await this._GraphqlService.findMany('donhang', {
  where: { /* filters */ },
  include: {
    khachhang: {
      select: {
        id: true,
        name: true,
        sdt: true,
        diachi: true
      }
    },
    sanpham: {
      select: {
        id: true,
        masp: true,
        title: true,
        giagoc: true,
        dvt: true,
        sldat: true,
        slgiao: true,
        slnhan: true,
        order: true
      }
    }
  },
  orderBy: { createdAt: 'desc' },
  take: searchParams.pageSize || 9999
});
```

## 🔧 Configuration

### Required Imports
```typescript
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DonhangGraphqlService } from '../donhang-graphql.service';
```

### Service Injection
```typescript
private _DonhangGraphqlService: DonhangGraphqlService = inject(DonhangGraphqlService);
```

## 📈 Performance Benefits

1. **GraphQL Optimization**: Chỉ lấy fields cần thiết
2. **Client-side Pagination**: Giảm server requests
3. **Loading States**: Better UX feedback
4. **Error Handling**: Robust error management
5. **Excel Export**: Efficient data export
6. **Signal-based Reactivity**: Optimized change detection

## 🎯 Cách sử dụng

### 1. Tải dữ liệu
```typescript
async ngOnInit() {
  await this._DonhangGraphqlService.searchDonhang(this.SearchParams);
}
```

### 2. Xuất Excel
```typescript
// Click nút xuất Excel trong template
// Automatically handles loading states và error handling
```

### 3. Filter và Search
```typescript
// Sử dụng existing filter methods
// Data được lấy từ GraphQL service signals
```

## 🚨 Error Handling

Service tự động xử lý errors và hiển thị thông báo cho user:
- Network errors
- GraphQL errors  
- Validation errors
- Export errors

## 🔄 Real-time Updates

Socket integration để cập nhật real-time:
```typescript
this.socket?.on('donhang:updated', (data: any) => {
  this.refreshDonhangData();
});
```

## 📱 Responsive Design

- Mobile-friendly loading indicators
- Responsive export buttons
- Adaptive table layout
- Touch-friendly interactions

## ✅ Testing

Sử dụng script test để verify functionality:
```bash
./test-vandon-graphql.sh
```

Kiểm tra:
- TypeScript compilation
- GraphQL service methods
- Component integration  
- Template features
- Loading states
- Export functionality

## 🎉 Kết luận

Component Vandon đã được nâng cấp toàn diện với:
- GraphQL integration hoàn chỉnh
- Loading states và error handling
- Excel export với progress indicators
- Client-side pagination tối ưu
- Real-time updates
- Better UX/UI experience
