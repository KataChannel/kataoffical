# User Management Component - Hướng dẫn sử dụng

## Tổng quan
Component `ListUserComponent` là một hệ thống quản lý user chuyên nghiệp với đầy đủ tính năng CRUD, table editable, tìm kiếm nâng cao, pagination và nhiều tính năng khác.

## Tính năng chính

### 🔍 Tìm kiếm và Lọc
- **Tìm kiếm toàn văn**: Tìm kiếm theo email, tên, số điện thoại
- **Lọc theo trạng thái**: Hoạt động/Không hoạt động
- **Lọc theo vai trò**: Chọn một hoặc nhiều vai trò
- **Bộ lọc cột**: Lọc dữ liệu theo từng cột cụ thể
- **Xóa bộ lọc**: Nút xóa tất cả bộ lọc

### 📊 Bảng dữ liệu nâng cao
- **Sắp xếp**: Sắp xếp theo các cột
- **Ẩn/hiện cột**: Tùy chỉnh các cột hiển thị
- **Responsive**: Tự động điều chỉnh trên mobile
- **Sticky header**: Header cố định khi scroll
- **Row selection**: Chọn một hoặc nhiều hàng

### ✏️ Chỉnh sửa inline
- **Edit mode**: Bật/tắt chế độ chỉnh sửa
- **Inline editing**: Chỉnh sửa trực tiếp trên bảng
- **Auto-save**: Lưu/hủy thay đổi
- **Field validation**: Validate dữ liệu nhập

### 📄 Phân trang thông minh
- **Client-side pagination**: Phân trang phía client
- **Tùy chỉnh kích thước trang**: 25, 50, 100, 200, 500
- **Điều hướng nhanh**: Trang đầu/cuối
- **Thông tin trang**: Hiển thị thông tin chi tiết

### 🔧 Thao tác CRUD
- **Tạo mới**: Tạo user mới
- **Xem chi tiết**: Xem thông tin chi tiết
- **Chỉnh sửa**: Cập nhật thông tin user
- **Xóa đơn lẻ**: Xóa một user
- **Xóa hàng loạt**: Xóa nhiều user cùng lúc

### 📤 Xuất dữ liệu
- **Xuất Excel**: Xuất danh sách user ra Excel
- **Lọc trước khi xuất**: Áp dụng bộ lọc hiện tại

## Cấu trúc Component

### Files chính
- `listuser.component.ts` - Logic component chính
- `listuser.component.html` - Template HTML
- `listuser.component.scss` - Styling CSS
- `confirm-dialog.component.ts` - Dialog xác nhận
- `user-graphql.service.ts` - Service GraphQL

### Dependencies
```typescript
// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// ... other imports
```

## Cách sử dụng

### 1. Khởi tạo component
```html
<app-listuser></app-listuser>
```

### 2. Cấu hình cột hiển thị
```typescript
// Trong component
readonly AllColumn: string[] = [
  'select', 'stt', 'email', 'username', 'fullName', 
  'phone', 'isActive', 'roles', 'createdAt', 'actions'
];
```

### 3. Tùy chỉnh pagination
```typescript
// Kích thước trang mặc định
currentPageSize = signal<number>(50);

// Tùy chọn kích thước trang
readonly pageSizeOptions = [25, 50, 100, 200, 500];
```

### 4. Cấu hình GraphQL Service
```typescript
// Load dữ liệu
await this.userGraphQLService.loadAllUsers();

// Tìm kiếm
this.userGraphQLService.setSearchTerm('search term');

// Lọc trạng thái
this.userGraphQLService.setStatusFilter('active');
```

## API Methods

### Component Methods

#### Pagination
- `getCurrentPage()` - Lấy trang hiện tại
- `getTotalPages()` - Lấy tổng số trang
- `onPageSizeChange(size: number)` - Thay đổi kích thước trang
- `onNextPage()` - Trang tiếp theo
- `onPreviousPage()` - Trang trước
- `goToFirstPage()` - Trang đầu
- `goToLastPage()` - Trang cuối

#### Selection
- `isSelected(userId: string)` - Kiểm tra user đã chọn
- `toggleSelection(userId: string, event: any)` - Chọn/bỏ chọn user
- `clearSelection()` - Bỏ chọn tất cả

#### Edit Mode
- `toggleEditMode()` - Bật/tắt chế độ chỉnh sửa
- `startEditing(user: User)` - Bắt đầu chỉnh sửa user
- `saveUser(userId: string)` - Lưu thay đổi
- `cancelEditing(userId: string)` - Hủy chỉnh sửa

#### CRUD Operations
- `create()` - Tạo user mới
- `goToDetail(user: User)` - Xem chi tiết user
- `deleteUser(user: User)` - Xóa user
- `openBulkDeleteDialog()` - Xóa hàng loạt

### Service Methods

#### Data Loading
- `loadAllUsers(forceRefresh?: boolean)` - Load tất cả users
- `refreshData()` - Refresh dữ liệu

#### Search & Filter
- `setSearchTerm(term: string)` - Đặt từ khóa tìm kiếm
- `setStatusFilter(status: 'all' | 'active' | 'inactive')` - Lọc trạng thái

#### CRUD
- `createUser(data: Partial<User>)` - Tạo user mới
- `updateUser(id: string, data: Partial<User>)` - Cập nhật user
- `deleteUser(id: string)` - Xóa user

## Styling

### CSS Classes
- `.user-list-container` - Container chính
- `.toolbar-section` - Thanh công cụ
- `.data-table-container` - Container bảng dữ liệu
- `.pagination-info` - Thông tin phân trang
- `.bulk-actions` - Thao tác hàng loạt
- `.status-badge` - Badge trạng thái
- `.role-badges` - Badge vai trò

### Responsive
- Mobile-first design
- Tự động ẩn/hiện các element
- Touch-friendly controls
- Optimized table layout

## Performance

### Optimization Features
- **Client-side pagination**: Giảm tải server
- **Virtual scrolling**: Xử lý large datasets
- **Debounced search**: Giảm API calls
- **Memoized computations**: Cache calculations
- **OnPush change detection**: Tối ưu render

### Best Practices
- Load data một lần và cache
- Filter/sort trên client
- Lazy load chi tiết user
- Optimize GraphQL queries

## Troubleshooting

### Common Issues

1. **Loading slow**: Kiểm tra GraphQL query optimization
2. **Search không hoạt động**: Verify search term binding
3. **Pagination lỗi**: Check pagination calculations
4. **Edit mode issues**: Verify signal updates

### Debug Tips
- Sử dụng Angular DevTools
- Check console errors
- Verify service method calls
- Test responsive breakpoints

## Future Enhancements

### Planned Features
- [ ] Virtual scrolling cho large datasets
- [ ] Advanced filtering UI
- [ ] Bulk edit operations
- [ ] Real-time updates via WebSocket
- [ ] Export to multiple formats
- [ ] Column resizing
- [ ] Saved filter presets
- [ ] Audit trail
