import { Component, input, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Permission, UserPermissionDetailsService } from './user-permission-details.service';

interface PermissionSummary {
  totalRolePermissions: number;
  grantedPermissions: number;
  deniedPermissions: number;
  effectivePermissions: Permission[];
  rolePermissions: Permission[];
  userGranted: any[];
  userDenied: any[];
}

@Component({
  selector: 'app-user-permission-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="permission-summary">
      <mat-card-header>
        <mat-card-title class="text-sm font-medium flex items-center">
          <mat-icon class="mr-2 text-purple-500">security</mat-icon>
          Tóm Tắt Quyền Hạn
          @if (isLoading()) {
            <mat-spinner diameter="16" class="ml-2"></mat-spinner>
          }
        </mat-card-title>
        <mat-card-subtitle class="text-xs">
          Quyền cuối cùng = Quyền role + Quyền cấp - Quyền từ chối
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (isLoading()) {
          <div class="text-center py-4">
            <mat-spinner diameter="32"></mat-spinner>
            <p class="mt-2 text-sm text-gray-600">Đang tải quyền...</p>
          </div>
        } @else if (error()) {
          <div class="text-center py-4 text-red-500">
            <mat-icon class="text-red-400">error</mat-icon>
            <p class="mt-1 text-sm">{{ error() }}</p>
            <button 
              class="mt-2 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              (click)="loadPermissionSummary()">
              Thử lại
            </button>
          </div>
        } @else if (currentSummary()) {
          <!-- Statistics -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div class="text-center p-2 bg-blue-50 rounded">
              <div class="text-lg font-bold text-blue-600">{{ currentSummary()!.totalRolePermissions }}</div>
              <div class="text-xs text-gray-600">Từ Roles</div>
            </div>
            <div class="text-center p-2 bg-green-50 rounded">
              <div class="text-lg font-bold text-green-600">{{ currentSummary()!.grantedPermissions }}</div>
              <div class="text-xs text-gray-600">Được Cấp</div>
            </div>
            <div class="text-center p-2 bg-red-50 rounded">
              <div class="text-lg font-bold text-red-600">{{ currentSummary()!.deniedPermissions }}</div>
              <div class="text-xs text-gray-600">Bị Từ Chối</div>
            </div>
            <div class="text-center p-2 bg-purple-50 rounded">
              <div class="text-lg font-bold text-purple-600">{{ currentSummary()!.effectivePermissions.length }}</div>
              <div class="text-xs text-gray-600">Cuối Cùng</div>
            </div>
          </div>

          <!-- Permission Details -->
          <div class="space-y-3">
            <!-- Role Permissions -->
            @if (currentSummary()!.rolePermissions.length > 0) {
              <div>
                <div class="text-sm font-medium text-blue-600 mb-1 flex items-center">
                  <mat-icon class="mr-1 text-sm">groups</mat-icon>
                  Quyền từ Roles ({{ currentSummary()!.rolePermissions.length }})
                </div>
                <div class="flex flex-wrap gap-1">
                  @for (perm of currentSummary()!.rolePermissions.slice(0, showAllRolePerms() ? currentSummary()!.rolePermissions.length : 5); track perm.id || perm.name) {
                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded" [title]="perm.description">{{ perm.name }}</span>
                  }
                  @if (currentSummary()!.rolePermissions.length > 5) {
                    <button 
                      class="px-2 py-1 text-xs text-blue-600 hover:text-blue-800"
                      (click)="toggleShowAllRolePerms()">
                      {{ showAllRolePerms() ? 'Thu gọn' : '...' + (currentSummary()!.rolePermissions.length - 5) + ' nữa' }}
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Granted Permissions -->
            @if (currentSummary()!.userGranted.length > 0) {
              <div>
                <div class="text-sm font-medium text-green-600 mb-1 flex items-center">
                  <mat-icon class="mr-1 text-sm">add_circle</mat-icon>
                  Quyền Được Cấp ({{ currentSummary()!.userGranted.length }})
                </div>
                <div class="flex flex-wrap gap-1">
                  @for (up of currentSummary()!.userGranted; track up.id) {
                    <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded" [title]="up.permission.description">{{ up.permission.name }}</span>
                  }
                </div>
              </div>
            }

            <!-- Denied Permissions -->
            @if (currentSummary()!.userDenied.length > 0) {
              <div>
                <div class="text-sm font-medium text-red-600 mb-1 flex items-center">
                  <mat-icon class="mr-1 text-sm">remove_circle</mat-icon>
                  Quyền Bị Từ Chối ({{ currentSummary()!.userDenied.length }})
                </div>
                <div class="flex flex-wrap gap-1">
                  @for (up of currentSummary()!.userDenied; track up.id) {
                    <span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded" [title]="up.permission.description">{{ up.permission.name }}</span>
                  }
                </div>
              </div>
            }

            <!-- Effective Permissions -->
            <div class="border-t pt-3">
              <div class="text-sm font-medium text-purple-600 mb-1 flex items-center">
                <mat-icon class="mr-1 text-sm">verified_user</mat-icon>
                Quyền Cuối Cùng ({{ currentSummary()!.effectivePermissions.length }})
              </div>
              @if (currentSummary()!.effectivePermissions.length > 0) {
                <div class="flex flex-wrap gap-1">
                  @for (perm of currentSummary()!.effectivePermissions.slice(0, showAllEffective() ? currentSummary()!.effectivePermissions.length : 8); track perm.id || perm.name) {
                    <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded font-medium" [title]="perm.description">{{ perm.name }}</span>
                  }
                  @if (currentSummary()!.effectivePermissions.length > 8) {
                    <button 
                      class="px-2 py-1 text-xs text-purple-600 hover:text-purple-800"
                      (click)="toggleShowAllEffective()">
                      {{ showAllEffective() ? 'Thu gọn' : '...' + (currentSummary()!.effectivePermissions.length - 8) + ' nữa' }}
                    </button>
                  }
                </div>
              } @else {
                <div class="text-center py-2 text-gray-500 text-sm">
                  <mat-icon class="text-gray-400">block</mat-icon>
                  <p>Không có quyền nào</p>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="text-center py-4 text-gray-500">
            <mat-icon class="text-gray-400">info</mat-icon>
            <p class="mt-1 text-sm">Không có dữ liệu quyền</p>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .permission-summary {
      border-left: 4px solid #9c27b0;
    }
    
    .permission-summary mat-card-header {
      padding-bottom: 8px;
    }
    
    .permission-summary mat-card-content {
      font-size: 12px;
    }
    
    button:hover {
      text-decoration: underline;
    }
  `]
})
export class UserPermissionSummaryComponent {
  private userPermissionService = inject(UserPermissionDetailsService);
  
  userId = input.required<string>();
  user = input<any>();
  
  isLoading = signal(false);
  summary = signal<PermissionSummary | null>(null);
  error = signal<string | null>(null);
  showAllRolePerms = signal(false);
  showAllEffective = signal(false);
  
  // Computed signal để dễ access trong template
  currentSummary = computed(() => this.summary());
  
  constructor() {
    // Load permissions when userId changes - using proper effect syntax
    effect(() => {
      const id = this.userId();
      if (id && id !== 'new') {
        // Clear previous state
        this.error.set(null);
        this.summary.set(null);
        // Use setTimeout to avoid synchronous effect execution
        setTimeout(() => {
          this.loadPermissionSummary();
        }, 0);
      } else {
        this.summary.set(null);
        this.error.set(null);
      }
    });
  }
  
  async loadPermissionSummary() {
    const userId = this.userId();
    if (!userId || userId === 'new') {
      this.summary.set(null);
      this.error.set(null);
      return;
    }
    
    this.isLoading.set(true);
    this.error.set(null);
    
    try {
      const userDetails = await new Promise<any>((resolve, reject) => {
        this.userPermissionService.getUserPermissionDetails(userId).subscribe({
          next: (data) => resolve(data),
          error: (error) => reject(error)
        });
      });
      
      if (userDetails) {
        const summaryData = this.userPermissionService.getPermissionSummary(userDetails);
        this.summary.set(summaryData);
        this.error.set(null);
      } else {
        this.summary.set(null);
        this.error.set('Không tìm thấy dữ liệu người dùng');
      }
    } catch (error) {
      console.error('Error loading permission summary:', error);
      this.summary.set(null);
      this.error.set('Lỗi khi tải thông tin quyền. Vui lòng thử lại.');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  toggleShowAllRolePerms() {
    this.showAllRolePerms.update(show => !show);
  }
  
  toggleShowAllEffective() {
    this.showAllEffective.update(show => !show);
  }
}