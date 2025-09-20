import { Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-roles-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
  template: `
    <!-- Simple fallback to ensure component renders -->
    <div class="mb-2 p-2 bg-blue-50 border border-blue-200 rounded" *ngIf="user()">
      <small class="text-blue-700">✅ UserRolesInfoComponent loaded - User: {{ user()?.email || user()?.name || user()?.id }}</small>
    </div>
    
    <mat-card class="roles-info">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium flex items-center">
          <mat-icon class="mr-2 text-blue-500">groups</mat-icon>
          Vai Trò & Quyền
        </mat-card-title>
        <mat-card-subtitle class="text-xs">
          {{ user()?.roles?.length || 0 }} vai trò được gán
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (user()?.roles && user().roles.length > 0) {
          <div class="space-y-4">
            @for (userRole of user().roles; track userRole.id || userRole.roleId) {
              <div class="border rounded-lg p-3 bg-gray-50">
                <!-- Role Header -->
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <mat-icon class="mr-2 text-blue-600">
                      {{ getRoleIcon(userRole.role?.name || userRole.name) }}
                    </mat-icon>
                    <div>
                      <h4 class="font-medium text-sm text-gray-800">
                        {{ userRole.role?.name || userRole.name }}
                      </h4>
                      @if (userRole.role?.description || userRole.description) {
                        <p class="text-xs text-gray-600">
                          {{ userRole.role?.description || userRole.description }}
                        </p>
                      }
                    </div>
                  </div>
                  
                  <!-- Permission count badge -->
                  @if (getRolePermissions(userRole).length > 0) {
                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {{ getRolePermissions(userRole).length }} quyền
                    </span>
                  }
                </div>
                
                <!-- Role Permissions -->
                @if (getRolePermissions(userRole).length > 0) {
                  <div class="mt-2">
                    <div class="flex flex-wrap gap-1">
                      @for (permission of getRolePermissions(userRole).slice(0, showAllPermissions[userRole.id || userRole.roleId] ? getRolePermissions(userRole).length : 4); track permission.id || permission.name) {
                        <span 
                          class="px-2 py-1 text-xs bg-white border border-blue-200 text-blue-700 rounded"
                          [title]="permission.description || permission.name">
                          {{ permission.permission.name }}
                        </span>
                      }
                      @if (getRolePermissions(userRole).length > 4) {
                        <button 
                          mat-button 
                          class="!text-xs !p-1 !min-w-0 text-blue-600"
                          (click)="toggleShowPermissions(userRole.id || userRole.roleId)">
                          {{ showAllPermissions[userRole.id || userRole.roleId] 
                            ? 'Thu gọn' 
                            : '...' + (getRolePermissions(userRole).length - 4) + ' nữa' 
                          }}
                        </button>
                      }
                    </div>
                  </div>
                } @else {
                  <div class="text-center text-gray-400 text-xs py-2">
                    <mat-icon class="text-gray-300">block</mat-icon>
                    <p>Không có quyền</p>
                  </div>
                }
                
                <!-- Role assignment info -->
                @if (userRole.assignedAt || userRole.createdAt) {
                  <div class="flex items-center mt-2 pt-2 border-t border-gray-200">
                    <mat-icon class="mr-1 text-gray-400" style="font-size: 14px;">schedule</mat-icon>
                    <span class="text-xs text-gray-500">
                      Gán lúc: {{ formatDate(userRole.assignedAt || userRole.createdAt) }}
                    </span>
                  </div>
                }
              </div>
            }
          </div>
        } @else {
          <div class="text-center py-6 text-gray-500">
            <mat-icon class="text-4xl text-gray-300">person_outline</mat-icon>
            <p class="mt-2 text-sm">Chưa có vai trò nào</p>
            <p class="text-xs">User này chưa được gán vai trò nào</p>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .roles-info {
      border-left: 4px solid #2196f3;
    }
    
    .roles-info mat-card-header {
      padding-bottom: 8px;
    }
    
    .roles-info mat-card-content {
      font-size: 12px;
    }
    
    .roles-info .border:hover {
      border-color: #2196f3;
      background-color: #f3f4f6;
    }
  `]
})

export class UserRolesInfoComponent {
  user = input<any>();
  
  showAllPermissions: { [key: string]: boolean } = {};
  
  constructor() {
    // Debug effect to check user data
    effect(() => {
      console.log('🔍 UserRolesInfoComponent - user data:', this.user());
      console.log('🔍 UserRolesInfoComponent - user roles:', this.user()?.roles);
    });
  }
  
  getRolePermissions(userRole: any): any[] {
    // console.log('Extracting permissions for role:', userRole);
     const result = userRole.role?.permissions ||  userRole.permissions || userRole.role?.rolePermissions?.map((rp: any) => rp.permission) ||[];
     console.log('Extracting permissions for role result:', result);
     return result
}
  
  getRoleIcon(roleName: string): string {
    if (!roleName) return 'person';
    
    const name = roleName.toLowerCase();
    if (name.includes('admin')) return 'admin_panel_settings';
    if (name.includes('manager') || name.includes('quản lý')) return 'manage_accounts';
    if (name.includes('user') || name.includes('người dùng')) return 'person';
    if (name.includes('guest') || name.includes('khách')) return 'person_outline';
    if (name.includes('moderator')) return 'gavel';
    if (name.includes('editor')) return 'edit';
    if (name.includes('viewer')) return 'visibility';
    
    return 'group';
  }
  
  toggleShowPermissions(roleId: string) {
    this.showAllPermissions[roleId] = !this.showAllPermissions[roleId];
  }
  
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}