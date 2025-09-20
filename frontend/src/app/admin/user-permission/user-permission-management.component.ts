import { Component, inject, signal, effect, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserPermissionGraphQLService, UserPermission } from './user-permission-graphql.service';
import { PermissionGraphQLService, Permission } from '../permission/permission-graphql.service';

@Component({
  selector: 'app-user-permission-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="user-permission-management p-4">
      <div class="header mb-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Quản Lý Quyền Đặc Biệt</h2>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="openAssignDialog()"
            [disabled]="!userId() || isLoading()">
            <mat-icon>add</mat-icon>
            Thêm Quyền
          </button>
        </div>
        <p class="text-gray-600 mt-2">
          Quản lý các quyền đặc biệt cho user này (sẽ ghi đè quyền từ roles)
        </p>
      </div>

      <!-- Filters -->
      <div class="filters mb-4 p-4 bg-gray-50 rounded">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Tìm kiếm quyền</mat-label>
            <input matInput 
              [(ngModel)]="searchTerm"
              (input)="onSearchChange()"
              placeholder="Tên quyền...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Loại quyền</mat-label>
            <mat-select [(ngModel)]="selectedType" (selectionChange)="loadUserPermissions()">
              <mat-option value="">Tất cả</mat-option>
              <mat-option value="granted">Được cấp</mat-option>
              <mat-option value="denied">Bị từ chối</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Trạng thái</mat-label>
            <mat-select [(ngModel)]="selectedStatus" (selectionChange)="loadUserPermissions()">
              <mat-option value="">Tất cả</mat-option>
              <mat-option value="active">Hoạt động</mat-option>
              <mat-option value="expired">Đã hết hạn</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="flex items-end">
            <button mat-stroked-button (click)="clearFilters()">
              <mat-icon>clear</mat-icon>
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading()" class="text-center py-8">
        <mat-spinner class="mx-auto"></mat-spinner>
        <p class="mt-4 text-gray-600">Đang tải dữ liệu...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error()" class="text-center py-8">
        <mat-icon class="text-red-500 text-4xl">error</mat-icon>
        <p class="mt-2 text-red-600">{{ error() }}</p>
        <button mat-raised-button color="primary" (click)="loadUserPermissions()" class="mt-4">
          Thử lại
        </button>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading() && !error()" class="table-container">
        <table mat-table [dataSource]="displayedPermissions()" matSort class="w-full">
          <!-- Permission Name Column -->
          <ng-container matColumnDef="permission">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="font-bold">Quyền</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              <div class="flex flex-col">
                <span class="font-medium">{{ element.permission?.name }}</span>
                <span class="text-sm text-gray-500">{{ element.permission?.description }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Loại</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              <span [class]="element.isGranted ? 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs' : 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs'">
                {{ element.isGranted ? 'Được cấp' : 'Bị từ chối' }}
              </span>
            </td>
          </ng-container>

          <!-- Granted By Column -->
          <ng-container matColumnDef="grantedBy">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Người cấp</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              {{ element.grantedByUser?.name || element.grantedByUser?.email || 'N/A' }}
            </td>
          </ng-container>

          <!-- Granted Date Column -->
          <ng-container matColumnDef="grantedAt">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="font-bold">Ngày cấp</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              {{ element.grantedAt | date:'dd/MM/yyyy HH:mm' }}
            </td>
          </ng-container>

          <!-- Expires At Column -->
          <ng-container matColumnDef="expiresAt">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Hết hạn</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              <div *ngIf="element.expiresAt; else noExpiry">
                <span [class]="isExpired(element.expiresAt) ? 'text-red-600 font-medium' : 'text-gray-700'">
                  {{ element.expiresAt | date:'dd/MM/yyyy HH:mm' }}
                </span>
                <span *ngIf="isExpired(element.expiresAt)" class="block text-xs text-red-500">Đã hết hạn</span>
              </div>
              <ng-template #noExpiry>
                <span class="text-green-600 text-sm">Vĩnh viễn</span>
              </ng-template>
            </td>
          </ng-container>

          <!-- Reason Column -->
          <ng-container matColumnDef="reason">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Lý do</th>
            <td mat-cell *matCellDef="let element" class="py-3 max-w-xs">
              <span class="text-sm text-gray-700 line-clamp-2" [title]="element.reason">
                {{ element.reason || 'Không có ghi chú' }}
              </span>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="font-bold">Thao tác</th>
            <td mat-cell *matCellDef="let element" class="py-3">
              <button mat-icon-button 
                [matMenuTriggerFor]="actionMenu"
                [disabled]="processingPermission() === element.id">
                <mat-icon *ngIf="processingPermission() !== element.id">more_vert</mat-icon>
                <mat-spinner *ngIf="processingPermission() === element.id" diameter="20"></mat-spinner>
              </button>
              
              <mat-menu #actionMenu="matMenu">
                <button mat-menu-item (click)="editPermission(element)">
                  <mat-icon>edit</mat-icon>
                  Chỉnh sửa
                </button>
                <button mat-menu-item (click)="revokePermission(element)" class="text-red-600">
                  <mat-icon>delete</mat-icon>
                  Thu hồi quyền
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
              [class.opacity-50]="isExpired(row.expiresAt)"></tr>
        </table>

        <!-- No Data State -->
        <div *ngIf="displayedPermissions().length === 0" class="text-center py-8">
          <mat-icon class="text-gray-400 text-4xl">assignment_ind</mat-icon>
          <p class="mt-2 text-gray-600">Không có quyền đặc biệt nào được cấp</p>
          <button mat-raised-button color="primary" (click)="openAssignDialog()" class="mt-4">
            Thêm quyền đầu tiên
          </button>
        </div>

        <!-- Pagination -->
        <mat-paginator 
          *ngIf="displayedPermissions().length > 0"
          [length]="totalCount()"
          [pageSize]="pageSize()"
          [pageSizeOptions]="[5, 10, 25, 50]"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>

      <!-- Statistics -->
      <div *ngIf="!isLoading() && !error()" class="statistics mt-6 p-4 bg-blue-50 rounded">
        <h3 class="font-semibold mb-2">Thống kê</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-gray-600">Tổng quyền:</span>
            <span class="font-semibold ml-1">{{ statistics().total }}</span>
          </div>
          <div>
            <span class="text-gray-600">Được cấp:</span>
            <span class="font-semibold ml-1 text-green-600">{{ statistics().granted }}</span>
          </div>
          <div>
            <span class="text-gray-600">Bị từ chối:</span>
            <span class="font-semibold ml-1 text-red-600">{{ statistics().denied }}</span>
          </div>
          <div>
            <span class="text-gray-600">Đã hết hạn:</span>
            <span class="font-semibold ml-1 text-orange-600">{{ statistics().expired }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Permission Dialog -->
    <div *ngIf="showAssignDialog()" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
         (click)="closeAssignDialog()">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" (click)="$event.stopPropagation()">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">{{ editingPermission() ? 'Chỉnh sửa quyền' : 'Thêm quyền mới' }}</h3>
          <button mat-icon-button (click)="closeAssignDialog()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <form (ngSubmit)="handleAssignPermission()">
          <div class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Chọn quyền</mat-label>
              <mat-select [(ngModel)]="assignForm.permissionId" name="permissionId" required>
                <mat-option value="">-- Chọn quyền --</mat-option>
                <mat-option *ngFor="let permission of availablePermissions()" [value]="permission.id">
                  {{ permission.name }} - {{ permission.description }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Loại quyền</mat-label>
              <mat-select [(ngModel)]="assignForm.isGranted" name="isGranted" required>
                <mat-option [value]="true">Cấp quyền</mat-option>
                <mat-option [value]="false">Từ chối quyền</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Ngày hết hạn (tùy chọn)</mat-label>
              <input matInput [matDatepicker]="picker" [(ngModel)]="assignForm.expiresAt" name="expiresAt">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Lý do</mat-label>
              <textarea matInput 
                [(ngModel)]="assignForm.reason" 
                name="reason"
                rows="3"
                placeholder="Nhập lý do cấp/từ chối quyền này..."></textarea>
            </mat-form-field>
          </div>

          <div class="flex justify-end space-x-2 mt-6">
            <button type="button" mat-stroked-button (click)="closeAssignDialog()">
              Hủy
            </button>
            <button type="submit" 
              mat-raised-button 
              color="primary"
              [disabled]="!assignForm.permissionId || isAssigning()">
              <mat-spinner *ngIf="isAssigning()" diameter="20" class="mr-2"></mat-spinner>
              {{ editingPermission() ? 'Cập nhật' : 'Thêm quyền' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: []
})
export class UserPermissionManagementComponent {
  private userPermissionService = inject(UserPermissionGraphQLService);
  private permissionService = inject(PermissionGraphQLService);
  private snackBar = inject(MatSnackBar);

  // Input - User ID to manage permissions for
  userId = input.required<string>();

  // UI State
  isLoading = signal(false);
  error = signal<string | null>(null);
  processingPermission = signal<string | null>(null);
  showAssignDialog = signal(false);
  isAssigning = signal(false);
  editingPermission = signal<UserPermission | null>(null);

  // Data
  userPermissions = signal<UserPermission[]>([]);
  availablePermissions = signal<Permission[]>([]);

  // Filters
  searchTerm = signal('');
  selectedType = signal('');
  selectedStatus = signal('');

  // Pagination
  pageSize = signal(10);
  currentPage = signal(0);
  totalCount = signal(0);

  // Assign form
  assignForm = {
    permissionId: '',
    isGranted: true,
    expiresAt: null as Date | null,
    reason: ''
  };

  displayedColumns = ['permission', 'type', 'grantedBy', 'grantedAt', 'expiresAt', 'reason', 'actions'];

  // Computed properties
  displayedPermissions = computed(() => {
    let filtered = this.userPermissions();

    // Apply search filter
    if (this.searchTerm()) {
      const search = this.searchTerm().toLowerCase();
      filtered = filtered.filter(up => 
        up.permission?.name?.toLowerCase().includes(search) ||
        up.permission?.description?.toLowerCase().includes(search)
      );
    }

    // Apply type filter
    if (this.selectedType()) {
      const isGranted = this.selectedType() === 'granted';
      filtered = filtered.filter(up => up.isGranted === isGranted);
    }

    // Apply status filter
    if (this.selectedStatus()) {
      const now = new Date();
      if (this.selectedStatus() === 'expired') {
        filtered = filtered.filter(up => up.expiresAt && new Date(up.expiresAt) < now);
      } else if (this.selectedStatus() === 'active') {
        filtered = filtered.filter(up => !up.expiresAt || new Date(up.expiresAt) >= now);
      }
    }

    // Apply pagination
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    
    this.totalCount.set(filtered.length);
    return filtered.slice(start, end);
  });

  statistics = computed(() => {
    const permissions = this.userPermissions();
    const now = new Date();
    
    return {
      total: permissions.length,
      granted: permissions.filter(p => p.isGranted).length,
      denied: permissions.filter(p => !p.isGranted).length,
      expired: permissions.filter(p => p.expiresAt && new Date(p.expiresAt) < now).length
    };
  });

  constructor() {
    // Load data when userId changes
    effect(() => {
      if (this.userId()) {
        this.loadUserPermissions();
        this.loadAvailablePermissions();
      }
    });
  }

  async loadUserPermissions() {
    if (!this.userId()) return;

    try {
      this.isLoading.set(true);
      this.error.set(null);

      const result = await this.userPermissionService.getUserPermissions(
        this.userId()
      );

      this.userPermissions.set(result);
    } catch (error) {
      console.error('Error loading user permissions:', error);
      this.error.set('Không thể tải danh sách quyền');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadAvailablePermissions() {
    try {
      const permissions = await this.permissionService.loadAllPermissions();
      this.availablePermissions.set(permissions);
    } catch (error) {
      console.error('Error loading available permissions:', error);
    }
  }

  onSearchChange() {
    this.currentPage.set(0); // Reset to first page when searching
  }

  onPageChange(event: any) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedType.set('');
    this.selectedStatus.set('');
    this.currentPage.set(0);
  }

  isExpired(expiresAt: string | null): boolean {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  }

  openAssignDialog() {
    this.editingPermission.set(null);
    this.resetAssignForm();
    this.showAssignDialog.set(true);
  }

  closeAssignDialog() {
    this.showAssignDialog.set(false);
    this.editingPermission.set(null);
    this.resetAssignForm();
  }

  editPermission(permission: UserPermission) {
    this.editingPermission.set(permission);
    this.assignForm = {
      permissionId: permission.permissionId,
      isGranted: permission.isGranted,
      expiresAt: permission.expiresAt ? new Date(permission.expiresAt) : null,
      reason: permission.reason || ''
    };
    this.showAssignDialog.set(true);
  }

  async handleAssignPermission() {
    if (!this.userId() || !this.assignForm.permissionId) return;

    try {
      this.isAssigning.set(true);

      if (this.editingPermission()) {
        // Update existing permission
        await this.userPermissionService.updateUserPermission(this.editingPermission()!.id, {
          isGranted: this.assignForm.isGranted,
          grantedBy: 'current-user', // TODO: Get current user ID
          expiresAt: this.assignForm.expiresAt || undefined,
          reason: this.assignForm.reason || undefined
        });
        this.snackBar.open('Cập nhật quyền thành công', 'Đóng', { duration: 3000 });
      } else {
        // Create new permission
        await this.userPermissionService.assignPermissionToUser({
          userId: this.userId(),
          permissionId: this.assignForm.permissionId,
          isGranted: this.assignForm.isGranted,
          expiresAt: this.assignForm.expiresAt || undefined,
          reason: this.assignForm.reason || undefined,
          grantedBy: 'current-user' // TODO: Get current user ID
        });
        this.snackBar.open('Thêm quyền thành công', 'Đóng', { duration: 3000 });
      }

      await this.loadUserPermissions();
      this.closeAssignDialog();
    } catch (error: any) {
      console.error('Error assigning permission:', error);
      this.snackBar.open(
        error.message || 'Có lỗi xảy ra khi xử lý quyền', 
        'Đóng', 
        { duration: 5000 }
      );
    } finally {
      this.isAssigning.set(false);
    }
  }

  async revokePermission(permission: UserPermission) {
    if (!confirm('Bạn có chắc chắn muốn thu hồi quyền này không?')) {
      return;
    }

    try {
      this.processingPermission.set(permission.id);
      
      await this.userPermissionService.deleteUserPermission(permission.id);
      
      this.snackBar.open('Thu hồi quyền thành công', 'Đóng', { duration: 3000 });
      await this.loadUserPermissions();
    } catch (error: any) {
      console.error('Error revoking permission:', error);
      this.snackBar.open(
        error.message || 'Có lỗi xảy ra khi thu hồi quyền', 
        'Đóng', 
        { duration: 5000 }
      );
    } finally {
      this.processingPermission.set(null);
    }
  }

  private resetAssignForm() {
    this.assignForm = {
      permissionId: '',
      isGranted: true,
      expiresAt: null,
      reason: ''
    };
  }
}