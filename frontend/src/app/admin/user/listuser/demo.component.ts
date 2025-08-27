import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListUserComponent } from './listuser.component';

@Component({
  selector: 'app-user-management-demo',
  template: `
    <div class="demo-container p-4">
      <h1 class="text-2xl font-bold mb-4">User Management System Demo</h1>
      
      <!-- Feature Showcase -->
      <div class="feature-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="feature-card bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div class="flex items-center gap-2 mb-2">
            <mat-icon class="text-blue-600">search</mat-icon>
            <h3 class="font-semibold text-blue-800">Tìm kiếm nâng cao</h3>
          </div>
          <p class="text-sm text-blue-600">Tìm kiếm toàn văn, lọc theo trạng thái và vai trò</p>
        </div>
        
        <div class="feature-card bg-green-50 p-4 rounded-lg border border-green-200">
          <div class="flex items-center gap-2 mb-2">
            <mat-icon class="text-green-600">edit</mat-icon>
            <h3 class="font-semibold text-green-800">Chỉnh sửa inline</h3>
          </div>
          <p class="text-sm text-green-600">Chỉnh sửa trực tiếp trên bảng, auto-save</p>
        </div>
        
        <div class="feature-card bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div class="flex items-center gap-2 mb-2">
            <mat-icon class="text-purple-600">pages</mat-icon>
            <h3 class="font-semibold text-purple-800">Phân trang thông minh</h3>
          </div>
          <p class="text-sm text-purple-600">Client-side pagination, tùy chỉnh kích thước</p>
        </div>
        
        <div class="feature-card bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div class="flex items-center gap-2 mb-2">
            <mat-icon class="text-orange-600">cloud_download</mat-icon>
            <h3 class="font-semibold text-orange-800">Xuất dữ liệu</h3>
          </div>
          <p class="text-sm text-orange-600">Export Excel, áp dụng bộ lọc hiện tại</p>
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="stats-cards grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="stat-card bg-white p-4 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Tổng Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalUsers }}</p>
            </div>
            <mat-icon class="text-blue-500 text-3xl">people</mat-icon>
          </div>
        </div>
        
        <div class="stat-card bg-white p-4 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Users hoạt động</p>
              <p class="text-2xl font-bold text-green-600">{{ activeUsers }}</p>
            </div>
            <mat-icon class="text-green-500 text-3xl">check_circle</mat-icon>
          </div>
        </div>
        
        <div class="stat-card bg-white p-4 rounded-lg shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Đã chọn</p>
              <p class="text-2xl font-bold text-purple-600">{{ selectedCount }}</p>
            </div>
            <mat-icon class="text-purple-500 text-3xl">check_box</mat-icon>
          </div>
        </div>
      </div>
      
      <!-- Main Component -->
      <div class="main-component">
        <app-listuser></app-listuser>
      </div>
      
      <!-- Usage Instructions -->
      <div class="instructions mt-6 bg-gray-50 p-6 rounded-lg">
        <h2 class="text-lg font-semibold mb-4">Hướng dẫn sử dụng</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-medium mb-2">Tìm kiếm & Lọc:</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Nhập từ khóa trong ô tìm kiếm</li>
              <li>• Chọn trạng thái từ dropdown</li>
              <li>• Lọc theo vai trò (có thể chọn nhiều)</li>
              <li>• Sử dụng bộ lọc cột cho tìm kiếm chi tiết</li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-2">Thao tác:</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Click checkbox để chọn user</li>
              <li>• Bật "Edit mode" để chỉnh sửa inline</li>
              <li>• Click vào email để xem chi tiết</li>
              <li>• Sử dụng nút thao tác ở cột cuối</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [ListUserComponent, MatIconModule],
  standalone: true
})
export class UserManagementDemoComponent {
  totalUsers = 150;
  activeUsers = 142;
  selectedCount = 0;
  
  constructor() {
    // Demo data initialization
  }
}
