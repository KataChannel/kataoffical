import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Permission } from '../permission/permission-graphql.service';

export interface PermissionSelectorData {
  availablePermissions: Permission[];
  currentUserPermissions: any[];
  currentRolePermissions: Permission[];
}

export interface PermissionSelectorResult {
  selectedPermissions: Permission[];
  grantType: 'grant' | 'deny';
  reason?: string;
}

/**
 * PermissionSelectorDialogComponent - Enhanced Permission Management Interface
 * 
 * Updated Features:
 * - Flat list display (no grouping) for easier navigation
 * - Master checkbox to select/deselect all permissions
 * - Click anywhere on permission row to toggle selection
 * - Enhanced search with group filtering capability
 * - Quick action buttons for individual permissions
 * - Improved visual hierarchy and spacing
 * - Better mobile responsiveness
 * - Enhanced tooltips and interactive elements
 * - Comprehensive status badges with icons
 * - Advanced CSS animations and hover effects
 * 
 * UI Improvements:
 * - Modern card-based layout with shadows
 * - Radio button selection for Grant/Deny operations
 * - Advanced search with clear button functionality  
 * - Larger clickable areas for better usability
 * - Permission codes and group badges display
 * - Enhanced visual feedback for selected items
 * - Smooth animations and transitions
 * - Custom scrollbars for better aesthetics
 * - Professional color scheme and typography
 */
@Component({
  selector: 'app-permission-selector-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule
  ],
  template: `
<div mat-dialog-title class="w-full !flex !items-center !bg-gradient-to-r !from-blue-50 !to-indigo-50 !p-6 !rounded-t-lg">
   <mat-icon class="mr-3 text-blue-600 text-2xl">security</mat-icon>
   <div>
     <h2 class="text-xl font-semibold text-gray-800">Quản Lý Quyền Người Dùng</h2>
     <p class="text-sm text-gray-600 mt-1">Cấp hoặc thu hồi quyền truy cập</p>
   </div>
 </div>
<mat-dialog-content class="mat-typography !p-6 !max-h-[70vh] !overflow-y-auto">
        <div class="space-y-6">
          <!-- Grant Type Selection Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div class="flex items-center mb-3">
              <mat-icon class="mr-2 text-indigo-500">tune</mat-icon>
              <label class="text-base font-medium text-gray-800">Loại thao tác:</label>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="relative">
                <input type="radio" 
                       id="grant" 
                       name="grantType" 
                       value="grant" 
                       [(ngModel)]="grantType"
                       class="sr-only peer">
                <label for="grant" 
                       class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 hover:border-green-300 hover:bg-green-25">
                  <div class="text-center">
                    <mat-icon class="text-green-500 mb-2">add_circle_outline</mat-icon>
                    <div class="font-medium text-gray-800">Cấp Quyền</div>
                    <div class="text-xs text-gray-500">Cho phép truy cập</div>
                  </div>
                </label>
              </div>
              <div class="relative">
                <input type="radio" 
                       id="deny" 
                       name="grantType" 
                       value="deny" 
                       [(ngModel)]="grantType"
                       class="sr-only peer">
                <label for="deny" 
                       class="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-red-300 hover:bg-red-25">
                  <div class="text-center">
                    <mat-icon class="text-red-500 mb-2">remove_circle_outline</mat-icon>
                    <div class="font-medium text-gray-800">Thu Hồi</div>
                    <div class="text-xs text-gray-500">Từ chối truy cập</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Search Filter Card -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <mat-form-field appearance="outline" class="w-full !mb-0">
              <input matInput 
                     [(ngModel)]="searchTerm"
                     (ngModelChange)="filterPermissions()"
                     placeholder="Nhập tên quyền, mô tả hoặc nhóm quyền...">
              <mat-icon matPrefix class="!mr-2">search</mat-icon>
              @if (searchTerm) {
                <button matSuffix mat-icon-button (click)="clearSearch()">
                  <mat-icon>clear</mat-icon>
                </button>
              }
            </mat-form-field>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-2 items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div class="flex flex-wrap gap-2">
              <button mat-stroked-button 
                      size="small" 
                      (click)="selectAllVisible()"
                      class="!text-blue-600 !border-blue-300">
                <mat-icon class="!text-sm mr-1">select_all</mat-icon>
                Chọn tất cả
              </button>
              <button mat-stroked-button 
                      size="small" 
                      (click)="clearSelection()"
                      class="!text-gray-600 !border-gray-300">
                <mat-icon class="!text-sm mr-1">deselect</mat-icon>
                Bỏ chọn
              </button>
            </div>
            <div class="text-sm font-medium text-gray-600">
              Đã chọn: <span class="text-blue-600">{{ selectedPermissions().length }}</span> quyền
            </div>
          </div>

          <!-- All Permissions List -->
          <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <!-- Header with total count -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <mat-checkbox 
                    [checked]="isAllSelected()"
                    [indeterminate]="isAllIndeterminate()"
                    (change)="toggleAll($event.checked)"
                    class="mr-3">
                  </mat-checkbox>
                  <div class="flex items-center">
                    <mat-icon class="mr-2 text-blue-600">security</mat-icon>
                    <h4 class="font-semibold text-gray-800 text-lg">Tất cả quyền hệ thống</h4>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                    {{ selectedPermissions().length }}/{{ filteredPermissions().length }} đã chọn
                  </span>
                  <span class="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {{ filteredPermissions().length }} quyền
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Permissions List -->
            <div class="bg-white">
              @if (filteredPermissions().length === 0) {
                <div class="text-center py-12 text-gray-500">
                  <mat-icon class="text-5xl mb-3 text-gray-300">search_off</mat-icon>
                  <p class="text-lg font-medium">Không tìm thấy quyền nào</p>
                  <p class="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
                </div>
              } @else {
                <div class="max-h-[50vh] overflow-y-auto">
                  @for (permission of filteredPermissions(); track permission.id) {
                    <div class="border-b border-gray-100 last:border-b-0 hover:bg-blue-25 transition-all duration-200 cursor-pointer"
                         [class.bg-blue-50]="isPermissionSelected(permission)"
                         [class.border-l-4]="isPermissionSelected(permission)"
                         [class.border-l-blue-500]="isPermissionSelected(permission)"
                         [class.shadow-sm]="isPermissionSelected(permission)"
                         (click)="togglePermissionByClick(permission)">
                      <div class="p-4 flex items-start space-x-4">
                        <mat-checkbox 
                          [checked]="isPermissionSelected(permission)"
                          [disabled]="isPermissionDisabled(permission)"
                          (change)="togglePermission(permission, $event.checked)"
                          (click)="$event.stopPropagation()"
                          class="!mt-1 flex-shrink-0">
                        </mat-checkbox>
                        
                        <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between">
                            <div class="flex-1 min-w-0">
                              <h5 class="font-semibold text-gray-900 text-base truncate hover:text-blue-600 transition-colors">
                                {{ permission.name }}
                              </h5>
                              @if (permission.description) {
                                <p class="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                                  {{ permission.description }}
                                </p>
                              }
                              
                              <!-- Permission Code/ID if available -->
                              @if (getPermissionCode(permission)) {
                                <p class="text-xs text-gray-500 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                                  ID: {{ getPermissionCode(permission) }}
                                </p>
                              }
                            </div>
                          </div>
                          
                          <!-- Status and Info Row -->
                          <div class="flex items-center justify-between mt-3">
                            <!-- Status Badges -->
                            <div class="flex flex-wrap gap-2">
                              @if (getPermissionStatus(permission); as status) {
                                @if (status === 'role') {
                                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-fade-in">
                                    <mat-icon class="!text-xs mr-1">group</mat-icon>
                                    Từ vai trò
                                  </span>
                                } @else if (status === 'granted') {
                                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-fade-in">
                                    <mat-icon class="!text-xs mr-1">check_circle</mat-icon>
                                    Đã cấp riêng
                                  </span>
                                } @else if (status === 'denied') {
                                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-fade-in">
                                    <mat-icon class="!text-xs mr-1">block</mat-icon>
                                    Đã từ chối
                                  </span>
                                }
                              } @else {
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  <mat-icon class="!text-xs mr-1">radio_button_unchecked</mat-icon>
                                  Chưa thiết lập
                                </span>
                              }
                              
                              <!-- Permission Group Badge -->
                              @if (getPermissionGroup(permission)) {
                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                                  <mat-icon class="!text-xs mr-1">folder</mat-icon>
                                  {{ getPermissionGroup(permission) }}
                                </span>
                              }
                            </div>
                            
                            <!-- Quick Action Buttons -->
                            <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              @if (!isPermissionSelected(permission)) {
                                <button mat-icon-button 
                                        size="small"
                                        (click)="togglePermission(permission, true); $event.stopPropagation()"
                                        matTooltip="Chọn quyền này"
                                        class="!text-green-600 !w-8 !h-8">
                                  <mat-icon class="!text-lg">add_circle_outline</mat-icon>
                                </button>
                              } @else {
                                <button mat-icon-button 
                                        size="small"
                                        (click)="togglePermission(permission, false); $event.stopPropagation()"
                                        matTooltip="Bỏ chọn quyền này"
                                        class="!text-red-600 !w-8 !h-8">
                                  <mat-icon class="!text-lg">remove_circle_outline</mat-icon>
                                </button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Reason Field -->
          <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div class="flex items-center mb-3">
              <mat-icon class="mr-2 text-amber-500">note_add</mat-icon>
              <label class="text-base font-medium text-gray-800">Ghi chú (tùy chọn):</label>
            </div>
            <mat-form-field appearance="outline" class="w-full !mb-0">
              <textarea matInput 
                        [(ngModel)]="reason"
                        rows="3"
                        placeholder="Nhập lý do cấp hoặc thu hồi quyền này để dễ theo dõi..."></textarea>
              <mat-icon matPrefix class="!mr-2 !mt-3">edit_note</mat-icon>
            </mat-form-field>
          </div>
        </div>
</mat-dialog-content>

      <mat-dialog-actions class="!p-6 !border-t !border-gray-200 !bg-gray-50">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600 flex items-center">
              <mat-icon class="!text-sm mr-1">info</mat-icon>
              Sẽ thực hiện <strong class="text-blue-600">{{ grantType === 'grant' ? 'cấp' : 'thu hồi' }}</strong> 
              <strong class="text-blue-600 mx-1">{{ selectedPermissions().length }}</strong> quyền
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button mat-stroked-button 
                    (click)="onCancel()" 
                    class="!border-gray-300 !text-gray-700 !px-6">
              <mat-icon class="mr-1">close</mat-icon>
              Hủy bỏ
            </button>
            <button mat-raised-button 
                    color="primary" 
                    [disabled]="selectedPermissions().length === 0"
                    (click)="onConfirm()"
                    class="!px-6 !py-2 !shadow-lg">
              <mat-icon class="mr-1">
                {{ grantType === 'grant' ? 'check_circle' : 'cancel' }}
              </mat-icon>
              {{ grantType === 'grant' ? 'Cấp Quyền' : 'Thu Hồi' }} 
              @if (selectedPermissions().length > 0) {
                <span class="ml-1 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                  {{ selectedPermissions().length }}
                </span>
              }
            </button>
          </div>
        </div>
      </mat-dialog-actions>
  `,
  styles: [`
    /* Custom radio button styles */
    .peer:checked ~ label {
      transform: scale(1.02);
    }
    
    .peer:checked ~ label::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: currentColor;
      border-radius: 50%;
      opacity: 0.1;
    }
    
    /* Smooth transitions */
    .transition-all {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 200ms;
    }
    
    /* Custom checkbox colors */
    .mat-mdc-checkbox.mat-primary .mdc-checkbox__native-control:enabled ~ .mdc-checkbox__background .mdc-checkbox__checkmark {
      color: white;
    }
    
    /* Hover effects */
    .hover\\:bg-blue-25:hover {
      background-color: rgb(239 246 255);
    }
    
    .hover\\:bg-green-25:hover {
      background-color: rgb(240 253 244);
    }
    
    .hover\\:bg-red-25:hover {
      background-color: rgb(254 242 242);
    }
    
    /* Custom scrollbar */
    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
        
    /* Badge animations */
    .animate-fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Group header gradient */
    .bg-gradient-to-r {
      background: linear-gradient(to right, var(--tw-gradient-stops));
    }
    
    /* Enhanced focus states */
    .mat-mdc-form-field:focus-within {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    /* Button enhancements */
    .mat-mdc-raised-button {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .mat-mdc-raised-button:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }
    
    /* Permission list enhancements */
    .permission-item {
      transition: all 0.2s ease-in-out;
    }
    
    .permission-item:hover {
      transform: translateX(4px);
    }
    
    .permission-item.selected {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.1) 100%);
    }
    
    /* Line clamp utility */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    /* Checkbox enhancement */
    .mat-mdc-checkbox {
      --mdc-checkbox-state-layer-size: 48px;
    }
    
    .mat-mdc-checkbox:hover .mdc-checkbox__ripple {
      background: rgba(59, 130, 246, 0.1);
    }
    
    /* Quick action buttons */
    .group:hover .opacity-0 {
      opacity: 1 !important;
    }
    
    /* Permission row hover effect */
    .permission-row {
      position: relative;
    }
    
    .permission-row::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
      transition: width 0.3s ease;
    }
    
    .permission-row:hover::before {
      width: 100%;
    }
    
    /* Status badge enhancements */
    .status-badge {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.9);
    }
    
    /* Enhanced selection states */
    .border-l-blue-500 {
      border-left-width: 4px;
      border-left-color: rgb(59 130 246);
    }
    
    /* Mobile responsive improvements */
    @media (max-width: 640px) {
      :host {
        max-width: 95vw;
      }
      
      .permission-item {
        padding: 12px;
      }
      
      .grid-cols-2 {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PermissionSelectorDialogComponent {
  private dialogRef = inject(MatDialogRef<PermissionSelectorDialogComponent>);
  data = inject<PermissionSelectorData>(MAT_DIALOG_DATA);
  
  searchTerm = '';
  grantType: 'grant' | 'deny' = 'grant';
  reason = '';
  selectedPermissions = signal<Permission[]>([]);
  filteredPermissions = signal<Permission[]>([]);
  
  permissionGroups = signal<{name: string, permissions: Permission[]}[]>([]);
  
  constructor() {
    this.filteredPermissions.set(this.data.availablePermissions);
    // No need to call filterPermissions() here since we start with all permissions
  }
  
  filterPermissions() {
    const term = this.searchTerm.toLowerCase();
    let filtered = this.data.availablePermissions;
    
    if (term) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term)) ||
        this.getPermissionGroup(p).toLowerCase().includes(term)
      );
    }
    
    this.filteredPermissions.set(filtered);
    // Since we're not using groups anymore, we can remove the updatePermissionGroups call
  }
  
  // Remove the updatePermissionGroups method since we're not using groups
  
  getPermissionCode(permission: Permission): string {
    return (permission as any).code || '';
  }
  
  getPermissionGroup(permission: Permission): string {
    return (permission as any).group || 'Khác';
  }
  
  isPermissionSelected(permission: Permission): boolean {
    return this.selectedPermissions().some(p => p.id === permission.id);
  }
  
  isPermissionDisabled(permission: Permission): boolean {
    // Don't disable any permissions - allow override
    return false;
  }
  
  getPermissionStatus(permission: Permission): string | null {
    // Check if user already has this permission from roles
    const hasFromRole = this.data.currentRolePermissions.some(p => p.id === permission.id);
    if (hasFromRole) return 'role';
    
    // Check current user permissions
    const userPerm = this.data.currentUserPermissions.find(up => up.permission.id === permission.id);
    if (userPerm) {
      return userPerm.isGranted ? 'granted' : 'denied';
    }
    
    return null;
  }
  
  togglePermission(permission: Permission, checked: boolean) {
    const current = this.selectedPermissions();
    
    if (checked) {
      if (!this.isPermissionSelected(permission)) {
        this.selectedPermissions.set([...current, permission]);
      }
    } else {
      this.selectedPermissions.set(current.filter(p => p.id !== permission.id));
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterPermissions();
  }

  selectAllVisible() {
    const allVisiblePermissions: Permission[] = [];
    this.filteredPermissions().forEach(permission => {
      if (!this.isPermissionDisabled(permission) && !this.isPermissionSelected(permission)) {
        allVisiblePermissions.push(permission);
      }
    });
    
    this.selectedPermissions.set([...this.selectedPermissions(), ...allVisiblePermissions]);
  }

  clearSelection() {
    this.selectedPermissions.set([]);
  }

  // New methods for "select all" functionality in the flat list
  isAllSelected(): boolean {
    const enabledPermissions = this.filteredPermissions().filter(p => !this.isPermissionDisabled(p));
    return enabledPermissions.length > 0 && 
           enabledPermissions.every(p => this.isPermissionSelected(p));
  }

  isAllIndeterminate(): boolean {
    const enabledPermissions = this.filteredPermissions().filter(p => !this.isPermissionDisabled(p));
    const selectedCount = enabledPermissions.filter(p => this.isPermissionSelected(p)).length;
    return selectedCount > 0 && selectedCount < enabledPermissions.length;
  }

  toggleAll(checked: boolean) {
    const enabledPermissions = this.filteredPermissions().filter(p => !this.isPermissionDisabled(p));
    
    if (checked) {
      // Add all non-selected permissions
      const toAdd = enabledPermissions.filter(p => !this.isPermissionSelected(p));
      this.selectedPermissions.set([...this.selectedPermissions(), ...toAdd]);
    } else {
      // Remove all visible permissions
      const visibleIds = enabledPermissions.map(p => p.id);
      this.selectedPermissions.set(
        this.selectedPermissions().filter(p => !visibleIds.includes(p.id))
      );
    }
  }

  togglePermissionByClick(permission: Permission) {
    if (!this.isPermissionDisabled(permission)) {
      this.togglePermission(permission, !this.isPermissionSelected(permission));
    }
  }

  // Group-related methods removed since we're using a flat list
  // These methods are kept for backward compatibility but simplified
  
  onCancel() {
    this.dialogRef.close();
  }
  
  onConfirm() {
    const result: PermissionSelectorResult = {
      selectedPermissions: this.selectedPermissions(),
      grantType: this.grantType,
      reason: this.reason.trim() || undefined
    };
    
    this.dialogRef.close(result);
  }
}