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
    MatDividerModule
  ],
  template: `
<div mat-dialog-title class="!flex !items-center">
   <mat-icon class="mr-2 text-blue-500">add_task</mat-icon>
   <span>Cấp Quyền Mới</span>
 </div>
<mat-dialog-content class="mat-typography">
     <!-- <mat-dialog-content class="min-h-[90vh] max-h-[90vh] overflow-y-auto"> -->
        <div class="space-y-4">
          <!-- Grant Type Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Loại cấp quyền:</label>
            <mat-form-field appearance="outline" class="w-full">
              <mat-select [(value)]="grantType" placeholder="Chọn loại">
                <mat-option value="grant">
                  <div class="flex items-center">
                    <mat-icon class="mr-2 text-green-500">add_circle</mat-icon>
                    Cấp quyền (Grant)
                  </div>
                </mat-option>
                <mat-option value="deny">
                  <div class="flex items-center">
                    <mat-icon class="mr-2 text-red-500">remove_circle</mat-icon>
                    Từ chối quyền (Deny)
                  </div>
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Search Filter -->
          <div class="mb-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Tìm kiếm quyền</mat-label>
              <input matInput 
                     [(ngModel)]="searchTerm"
                     (ngModelChange)="filterPermissions()"
                     placeholder="Nhập tên quyền hoặc mô tả...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <!-- Permission Groups -->
          <div class="space-y-4">
            @for (group of permissionGroups(); track group.name) {
              <div class="border rounded-lg p-3">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-800 flex items-center">
                    <mat-icon class="mr-2 text-blue-500">folder</mat-icon>
                    {{ group.name || 'Khác' }}
                  </h4>
                  <span class="text-xs text-gray-500">{{ group.permissions.length }} quyền</span>
                </div>
                
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  @for (permission of group.permissions; track permission.id) {
                    <div class="flex items-center p-2 rounded hover:bg-gray-50"
                         [class.bg-blue-50]="isPermissionSelected(permission)"
                         [class.border-blue-200]="isPermissionSelected(permission)">
                      <mat-checkbox 
                        [checked]="isPermissionSelected(permission)"
                        [disabled]="isPermissionDisabled(permission)"
                        (change)="togglePermission(permission, $event.checked)"
                        class="mr-3">
                      </mat-checkbox>
                      
                      <div class="flex-1">
                        <div class="font-medium text-sm">{{ permission.name }}</div>
                        @if (permission.description) {
                          <div class="text-xs text-gray-600">{{ permission.description }}</div>
                        }
                        
                        <!-- Show current status -->
                        @if (getPermissionStatus(permission); as status) {
                          <div class="mt-1">
                            @if (status === 'role') {
                              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Từ Role
                              </span>
                            } @else if (status === 'granted') {
                              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Đã cấp riêng
                              </span>
                            } @else if (status === 'denied') {
                              <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Đã từ chối
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Reason Field -->
          <div class="mt-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Lý do (tùy chọn)</mat-label>
              <textarea matInput 
                        [(ngModel)]="reason"
                        rows="3"
                        placeholder="Nhập lý do cấp/từ chối quyền này..."></textarea>
            </mat-form-field>
          </div>
        </div>
</mat-dialog-content>

      <mat-dialog-actions class="flex justify-between">
        <div class="text-sm text-gray-600">
          Đã chọn: {{ selectedPermissions().length }} quyền
        </div>
        <div class="space-x-2">
          <button mat-button (click)="onCancel()">Hủy</button>
          <button mat-raised-button 
                  color="primary" 
                  [disabled]="selectedPermissions().length === 0"
                  (click)="onConfirm()">
            <mat-icon class="mr-1">
              {{ grantType === 'grant' ? 'add_circle' : 'remove_circle' }}
            </mat-icon>
            {{ grantType === 'grant' ? 'Cấp Quyền' : 'Từ Chối' }} 
            ({{ selectedPermissions().length }})
          </button>
        </div>
      </mat-dialog-actions>
  `,
  styles: []
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
    this.filterPermissions();
  }
  
  filterPermissions() {
    const term = this.searchTerm.toLowerCase();
    let filtered = this.data.availablePermissions;
    
    if (term) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
    
    this.filteredPermissions.set(filtered);
    this.updatePermissionGroups();
  }
  
  updatePermissionGroups() {
    const grouped = new Map<string, Permission[]>();
    
    this.filteredPermissions().forEach(permission => {
      const group = (permission as any).group || 'Khác';
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(permission);
    });
    
    const groups = Array.from(grouped.entries()).map(([name, permissions]) => ({
      name,
      permissions: permissions.sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.name.localeCompare(b.name));
    
    this.permissionGroups.set(groups);
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