# Hướng Dẫn Sử Dụng Table Sort & Filter - Nhucaudathang Component

## Tổng Quan
Component `nhucaudathang` đã được nâng cấp với hệ thống sort và filter nâng cao sử dụng Angular Material Table, cung cấp trải nghiệm người dùng tối ưu cho việc quản lý dữ liệu nhu cầu đặt hàng.

## Tính Năng Chính

### 1. Material Table với Sort
- **Tự động sorting**: Click vào header cột để sắp xếp
- **Multi-level sorting**: Hỗ trợ sắp xếp theo nhiều tiêu chí
- **Custom sorting**: Sorting thông minh cho các loại dữ liệu khác nhau:
  - Số lượng (slton, slchogiao, slchonhap, SLDat, SLGiao)
  - Gợi ý (goiy) - tính toán động
  - Text (title, masp) - không phân biệt hoa thường

### 2. Quick Filter (Bộ Lọc Nhanh)
- **Tất cả**: Hiển thị toàn bộ dữ liệu
- **Tồn thấp**: Sản phẩm có tồn kho <= 10
- **Cần đặt hàng**: Sản phẩm có gợi ý > 0
- **Chờ giao**: Sản phẩm có số lượng chờ giao > 0

### 3. Global Search (Tìm Kiếm Toàn Cục)
- Tìm kiếm theo: tên sản phẩm, mã sản phẩm, tên nhà cung cấp, mã nhà cung cấp
- Real-time search với debounce 300ms
- Tích hợp với quick filter

### 4. Column Filter (Lọc Theo Cột)
- Filter menu cho từng cột với icon `filter_alt`
- Tìm kiếm trong từng cột
- Checkbox selection cho multiple values
- Nút "Chọn Tất Cả", "Xoá", "Reset"

### 5. Clear All Filters
- Nút xóa tất cả bộ lọc với icon `clear_all`
- Reset về trạng thái ban đầu

## Cấu Trúc Dữ Liệu

### TonghopsFinal
```typescript
{
  masp: string,           // Mã sản phẩm
  title: string,          // Tên sản phẩm  
  slton: number,          // Số lượng tồn kho
  slchogiao: number,      // Số lượng chờ giao
  slchonhap: number,      // Số lượng chờ nhập
  SLDat: number,          // Số lượng đặt (từ nhà cung cấp)
  SLGiao: number,         // Số lượng giao (cho khách)
  ngaynhan: Date,         // Ngày nhận
  mancc: string,          // Mã nhà cung cấp
  name: string            // Tên nhà cung cấp
}
```

### Computed Fields
- **goiy** (Gợi ý): `Math.max(0, SLGiao + slchogiao - slton - slchonhap)`

## Các Method Chính

### Filtering Methods
```typescript
applyQuickFilter(filterType: string)     // Áp dụng bộ lọc nhanh
applyGlobalFilter(event: Event)          // Tìm kiếm toàn cục
doFilterHederColumn(event, column)       // Lọc theo cột
getCurrentFilteredData(column: string)   // Lấy dữ liệu đã lọc cho cột
clearAllFilters()                        // Xóa tất cả bộ lọc
```

### Sorting Methods
```typescript
sortData(sort: any)                      // Sắp xếp dữ liệu
compareStrings(a, b, isAsc)             // So sánh chuỗi
compareNumbers(a, b, isAsc)             // So sánh số
```

### Data Management
```typescript
loadDonhangWithRelations()              // Tải dữ liệu với ultra-fast GraphQL
GetGoiy(item: any)                      // Tính toán gợi ý
getCurrentFilteredData(column)          // Dữ liệu unique cho filter column
```

## Optimizations

### Performance
- **Ultra-fast GraphQL**: Parallel fetching với aggressive caching
- **Debounced Search**: 300ms delay để tránh spam API
- **Virtual Scrolling**: Ready for large datasets
- **Change Detection**: OnPush strategy

### UX Improvements
- **Responsive Design**: Mobile-friendly layout
- **Visual Indicators**: Color coding cho status khác nhau
- **Tooltips**: Hướng dẫn sử dụng
- **Loading States**: Feedback cho user actions

## CSS Classes & Styling

### Status Colors
```css
.status-low-stock      { color: #dc2626; }  /* Đỏ - Tồn thấp */
.status-normal-stock   { color: #059669; }  /* Xanh lá - Bình thường */
.status-pending        { color: #d97706; }  /* Cam - Chờ xử lý */
.status-suggestion     { color: #7c3aed; }  /* Tím - Gợi ý */
```

### Responsive Breakpoints
- **Desktop**: Full functionality
- **Tablet**: Optimized layout
- **Mobile**: Compact view với scrolling

## Usage Examples

### 1. Tìm Sản Phẩm Cần Đặt Hàng
1. Click nút "Cần đặt" trong Quick Filter
2. Sử dụng Global Search để tìm sản phẩm cụ thể
3. Sort theo cột "Gợi Ý" để ưu tiên

### 2. Filter Theo Nhà Cung Cấp
1. Click icon filter ở cột "Nhà Cung Cấp"
2. Tìm kiếm trong filter menu
3. Select các nhà cung cấp cần thiết
4. Click "Áp Dụng"

### 3. Kiểm Tra Tồn Kho Thấp
1. Click "Tồn thấp" trong Quick Filter
2. Sort theo cột "Tồn Kho" từ thấp đến cao
3. Export Excel nếu cần

## Integration Notes

### GraphQL Performance
- Sử dụng `findAll()` với parallel fetching
- Aggressive caching cho repeated queries
- Batch processing để optimize network calls

### Data Aggregation
- TonkhoosTranfer + DonhangsTranfer + DathangsTranfer
- Real-time calculation của goiy
- Memory-efficient data mapping

### Backward Compatibility
- Fallback to Listsanpham() nếu TonghopsFinal empty
- Maintains existing component API
- Progressive enhancement approach

## Troubleshooting

### Common Issues
1. **Filter không hoạt động**: Check dataSource.data
2. **Sort không đúng**: Verify sortingDataAccessor
3. **Performance chậm**: Enable aggressive caching
4. **Mobile layout lỗi**: Check responsive CSS

### Debug Commands
```typescript
console.log('Current data:', this.dataSource.data);
console.log('Filter state:', this.quickFilter);
console.log('TonghopsFinal:', this.TonghopsFinal);
```

## Future Enhancements
- [ ] Advanced filter combinations (AND/OR logic)
- [ ] Saved filter presets
- [ ] Export filtered data
- [ ] Column customization
- [ ] Real-time data updates via WebSocket
