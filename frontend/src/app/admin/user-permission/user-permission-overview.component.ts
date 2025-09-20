import { Component, input, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { UserPermissionDetailsService } from './user-permission-details.service';
import { Permission } from '../permission/permission-graphql.service'; // Use base Permission
import { UserPermissionGraphQLService } from './user-permission-graphql.service';
import { UserRolesInfoComponent } from '../user/detailuser/user-roles-info.component';

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
  selector: 'app-user-permission-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    UserRolesInfoComponent
  ],
  template: `
    <div class="permission-overview">
      <!-- Main Card -->
      <mat-card class="permission-main-card">
        <mat-card-header>
          <mat-card-title class="text-lg font-medium flex items-center">
            <mat-icon class="mr-2 text-indigo-500">admin_panel_settings</mat-icon>
            Quản Lý Quyền Hạn
            @if (isLoading()) {
              <mat-spinner diameter="16" class="ml-2"></mat-spinner>
            }
          </mat-card-title>
          <mat-card-subtitle class="text-sm">
            Tóm tắt và quản lý quyền chi tiết cho người dùng
          </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          @if (isLoading()) {
            <div class="text-center py-8">
              <mat-spinner diameter="48"></mat-spinner>
              <p class="mt-4 text-gray-600">Đang tải thông tin quyền...</p>
            </div>
          } @else if (error()) {
            <div class="text-center py-8 text-red-500">
              <mat-icon class="text-4xl text-red-400">error</mat-icon>
              <p class="mt-2 font-medium">{{ error() }}</p>
              <button 
                mat-raised-button 
                color="primary" 
                class="mt-4"
                (click)="loadPermissionData()">
                <mat-icon>refresh</mat-icon>
                Thử lại
              </button>
            </div>
          } @else if (currentSummary()) {
            <!-- Tabs for different sections -->
            <mat-tab-group animationDuration="300ms">
              <!-- Roles Info Tab -->
              <mat-tab>
                <ng-template mat-tab-label>
                  <mat-icon class="mr-2">groups</mat-icon>
                  Roles & Nhóm Quyền
                </ng-template>
                <div class="py-4">
                  <app-user-roles-info 
                    [user]="user()" 
                    *ngIf="user()">
                  </app-user-roles-info>
                </div>
              </mat-tab>

              <!-- Summary Tab -->
              <mat-tab>
                <ng-template mat-tab-label>
                  <mat-icon class="mr-2">dashboard</mat-icon>
                  Tổng Quan
                </ng-template>
                <div class="py-4">
                  <!-- Statistics Cards -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div class="text-2xl font-bold text-blue-600">{{ currentSummary()!.totalRolePermissions }}</div>
                      <div class="text-sm text-blue-800 font-medium">Từ Roles</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div class="text-2xl font-bold text-green-600">{{ currentSummary()!.grantedPermissions }}</div>
                      <div class="text-sm text-green-800 font-medium">Được Cấp</div>
                    </div>
                    <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <div class="text-2xl font-bold text-red-600">{{ currentSummary()!.deniedPermissions }}</div>
                      <div class="text-sm text-red-800 font-medium">Bị Từ Chối</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div class="text-2xl font-bold text-purple-600">{{ currentSummary()!.effectivePermissions.length }}</div>
                      <div class="text-sm text-purple-800 font-medium">Cuối Cùng</div>
                    </div>
                  </div>

                  <!-- Permission Breakdown -->
                  <div class="space-y-6">
                    <!-- Role Permissions -->
                    <mat-expansion-panel class="permission-section" [expanded]="true">
                      <mat-expansion-panel-header>
                        <mat-panel-title class="flex items-center">
                          <mat-icon class="mr-2 text-blue-500">groups</mat-icon>
                          Quyền từ Roles ({{ currentSummary()!.rolePermissions.length }})
                        </mat-panel-title>
                      </mat-expansion-panel-header>
                      <div class="pt-4">
                        @if (currentSummary()!.rolePermissions.length > 0) {
                          <div class="flex flex-wrap gap-2">
                            @for (perm of currentSummary()!.rolePermissions; track perm.id) {
                              <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full border border-blue-200" 
                                    [title]="perm.description || perm.name">
                                {{ perm.name }}
                              </span>
                            }
                          </div>
                        } @else {
                          <p class="text-gray-500 text-center py-4">Không có quyền từ roles</p>
                        }
                      </div>
                    </mat-expansion-panel>

                    <!-- Effective Permissions -->
                    <mat-expansion-panel class="permission-section">
                      <mat-expansion-panel-header>
                        <mat-panel-title class="flex items-center">
                          <mat-icon class="mr-2 text-purple-500">verified_user</mat-icon>
                          Quyền Cuối Cùng ({{ currentSummary()!.effectivePermissions.length }})
                        </mat-panel-title>
                      </mat-expansion-panel-header>
                      <div class="pt-4">
                        @if (currentSummary()!.effectivePermissions.length > 0) {
                          <div class="flex flex-wrap gap-2">
                            @for (perm of currentSummary()!.effectivePermissions; track perm.id) {
                              <span class="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full border border-purple-200 font-medium" 
                                    [title]="perm.description || perm.name">
                                {{ perm.name }}
                              </span>
                            }
                          </div>
                        } @else {
                          <div class="text-center py-8 text-gray-500">
                            <mat-icon class="text-4xl text-gray-400">block</mat-icon>
                            <p class="mt-2">Người dùng không có quyền nào</p>
                          </div>
                        }
                      </div>
                    </mat-expansion-panel>
                  </div>
                </div>
              </mat-tab>

              <!-- Management Tab -->
              <mat-tab>
                <ng-template mat-tab-label>
                  <mat-icon class="mr-2">settings</mat-icon>
                  Quản Lý
                </ng-template>
                <div class="py-4">
                  <div class="space-y-6">
                    <!-- Granted Permissions Section -->
                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                          <mat-icon class="mr-2 text-green-600">add_circle</mat-icon>
                          <h3 class="text-lg font-medium text-green-800">Quyền Được Cấp Riêng</h3>
                        </div>
                        <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                          {{ currentSummary()!.userGranted.length }}
                        </span>
                      </div>
                      @if (currentSummary()!.userGranted.length > 0) {
                        <div class="flex flex-wrap gap-2">
                          @for (up of currentSummary()!.userGranted; track up.id) {
                            <div class="flex items-center bg-white rounded-lg px-3 py-2 border border-green-300">
                              <span class="text-sm text-green-800 font-medium">{{ up.permission.name }}</span>
                              <button 
                                mat-icon-button 
                                class="ml-2 w-6 h-6" 
                                color="warn"
                                [disabled]="isUpdatingPermission()"
                                (click)="revokePermission(up)"
                                title="Thu hồi quyền">
                                <mat-icon class="text-sm">close</mat-icon>
                              </button>
                            </div>
                          }
                        </div>
                      } @else {
                        <p class="text-green-700 text-center py-4">Chưa có quyền nào được cấp riêng</p>
                      }
                    </div>

                    <!-- Denied Permissions Section -->
                    <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                          <mat-icon class="mr-2 text-red-600">remove_circle</mat-icon>
                          <h3 class="text-lg font-medium text-red-800">Quyền Bị Từ Chối</h3>
                        </div>
                        <span class="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium">
                          {{ currentSummary()!.userDenied.length }}
                        </span>
                      </div>
                      @if (currentSummary()!.userDenied.length > 0) {
                        <div class="flex flex-wrap gap-2">
                          @for (up of currentSummary()!.userDenied; track up.id) {
                            <div class="flex items-center bg-white rounded-lg px-3 py-2 border border-red-300">
                              <span class="text-sm text-red-800 font-medium">{{ up.permission.name }}</span>
                              <button 
                                mat-icon-button 
                                class="ml-2 w-6 h-6" 
                                color="primary"
                                [disabled]="isUpdatingPermission()"
                                (click)="restorePermission(up)"
                                title="Khôi phục quyền">
                                <mat-icon class="text-sm">refresh</mat-icon>
                              </button>
                            </div>
                          }
                        </div>
                      } @else {
                        <p class="text-red-700 text-center py-4">Không có quyền nào bị từ chối</p>
                      }
                    </div>

                    <!-- Add New Permission Section -->
                    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div class="flex items-center mb-4">
                        <mat-icon class="mr-2 text-gray-600">add_task</mat-icon>
                        <h3 class="text-lg font-medium text-gray-800">Cấp Quyền Mới</h3>
                      </div>
                      <div class="space-y-3">
                        <p class="text-sm text-gray-600">Chọn quyền để cấp riêng cho người dùng này (override quyền từ roles)</p>
                        <!-- This would be a permission selector - simplified for now -->
                        <button 
                          mat-raised-button 
                          color="primary" 
                          [disabled]="isUpdatingPermission()"
                          (click)="openPermissionSelector()">
                          <mat-icon>add</mat-icon>
                          Thêm Quyền
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-tab>
            </mat-tab-group>
          } @else {
            <div class="text-center py-8 text-gray-500">
              <mat-icon class="text-4xl text-gray-400">info</mat-icon>
              <p class="mt-2">Không có dữ liệu quyền</p>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .permission-overview {
      width: 100%;
    }
    
    .permission-main-card {
      border-left: 4px solid #4f46e5;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .permission-section {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .permission-section mat-expansion-panel-header {
      background-color: #f8fafc;
    }
    
    ::ng-deep .mat-mdc-tab-group {
      .mat-mdc-tab-header {
        border-bottom: 2px solid #e2e8f0;
      }
    }
  `]
})
export class UserPermissionOverviewComponent {
  private userPermissionService = inject(UserPermissionDetailsService);
  private userPermissionGraphQLService = inject(UserPermissionGraphQLService);
  
  userId = input.required<string>();
  user = input<any>();
  
  isLoading = signal(false);
  isUpdatingPermission = signal(false);
  summary = signal<PermissionSummary | null>(null);
  error = signal<string | null>(null);
  
  // Computed signal để dễ access trong template
  currentSummary = computed(() => this.summary());
  
  constructor() {
    // Load permissions when userId changes
    effect(() => {
      const id = this.userId();
      if (id && id !== 'new') {
        this.error.set(null);
        this.summary.set(null);
        setTimeout(() => {
          this.loadPermissionData();
        }, 0);
      } else {
        this.summary.set(null);
        this.error.set(null);
      }
    });
  }
  
  async loadPermissionData() {
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
        console.log('summaryData', summaryData);
        
        this.summary.set(summaryData);
        this.error.set(null);
      } else {
        this.summary.set(null);
        this.error.set('Không tìm thấy dữ liệu người dùng');
      }
    } catch (error) {
      console.error('Error loading permission data:', error);
      this.summary.set(null);
      this.error.set('Lỗi khi tải thông tin quyền. Vui lòng thử lại.');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async revokePermission(userPermission: any) {
    if (!userPermission || this.isUpdatingPermission()) return;
    
    this.isUpdatingPermission.set(true);
    
    try {
      // Update to set isGranted to false instead of deleting
      await this.userPermissionGraphQLService.updateUserPermission(
        userPermission.id, 
        { 
          isGranted: false,
          grantedBy: 'system',
          reason: 'Revoked by admin'
        }
      );
      
      // Reload data
      await this.loadPermissionData();
    } catch (error) {
      console.error('Error revoking permission:', error);
      this.error.set('Lỗi khi thu hồi quyền');
    } finally {
      this.isUpdatingPermission.set(false);
    }
  }
  
  async restorePermission(userPermission: any) {
    if (!userPermission || this.isUpdatingPermission()) return;
    
    this.isUpdatingPermission.set(true);
    
    try {
      // Update to set isGranted to true
      await this.userPermissionGraphQLService.updateUserPermission(
        userPermission.id, 
        { 
          isGranted: true,
          grantedBy: 'system',
          reason: 'Restored by admin'
        }
      );
      
      // Reload data
      await this.loadPermissionData();
    } catch (error) {
      console.error('Error restoring permission:', error);
      this.error.set('Lỗi khi khôi phục quyền');
    } finally {
      this.isUpdatingPermission.set(false);
    }
  }
  
  openPermissionSelector() {
    // TODO: Implement permission selector dialog
    console.log('Open permission selector dialog');
  }
}