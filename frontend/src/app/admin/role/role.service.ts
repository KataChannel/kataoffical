import { Inject, Injectable, signal, Signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

export interface RoleData {
  id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions?: RolePermissionData[];
}

export interface RolePermissionData {
  id: string;
  roleId: string;
  permissionId: string;
  permission: PermissionData;
}

export interface PermissionData {
  id: string;
  name: string;
  description?: string;
  group?: string;
  codeId?: string;
  order?: number;
}

export interface RoleCreateData {
  name: string;
}

export interface RoleUpdateData {
  name?: string;
}

export interface PermissionAssignData {
  roleId: string;
  permissionId: string;
}
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private graphqlService = inject(GraphqlService);
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);
  private apollo = inject(Apollo);
  private router = inject(Router);

  private readonly modelName = 'Role';

  ListRole = signal<RoleData[]>([]);
  DetailRole = signal<RoleData | null>(null);
  roleId = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor() { }
  setRoleId(id: string | null) {
    this.roleId.set(id);
  }

  async CreateRole(dulieu: RoleCreateData): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.createOne(
        this.modelName,
        dulieu,
        {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        }
      );
      console.log(result);
      
      if (result) {
        this.showSuccessMessage('Tạo role thành công');
        
        // Update local cache instead of fetching from server
        const currentRoles = this.ListRole();
        this.ListRole.set([result, ...currentRoles]);
        this.roleId.set(result.id);
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error creating role:', error);
      this.handleCreateUpdateError(error, 'tạo');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAllRole(): Promise<RoleData[]> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.findMany(
        this.modelName,
        {
          orderBy: { createdAt: 'desc' },
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    group: true
                  }
                }
              }
            }
          }
        }
      );

      if (result) {
        this.ListRole.set(result);
        return result;
      }

      return [];
    } catch (error) {
      console.error('Error getting roles:', error);
      this.showErrorMessage('Lỗi khi tải danh sách role');
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }


  async getRoleByid(id: string): Promise<RoleData | null> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.findUnique(
        this.modelName,
        { id },
        {
          include: {
            permissions: {
              include: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    group: true,
                    codeId: true
                  }
                }
              }
            }
          }
        }
      );

      if (result) {
        this.DetailRole.set(result);
        return result;
      }

      return null;
    } catch (error) {
      console.error('Error getting role by id:', error);
      this.handleError(error);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }
  async updateRole(dulieu: RoleUpdateData & { id: string }): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.updateOne(
        this.modelName,
        { id: dulieu.id },
        {
          name: dulieu.name
        },
        {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true
          }
        }
      );

      if (result) {
        this.showSuccessMessage('Cập nhật role thành công');
        
        // Update local cache instead of fetching from server
        const currentRoles = this.ListRole();
        const updatedRoles = currentRoles.map(role => 
          role.id === result.id ? { ...role, ...result } : role
        );
        this.ListRole.set(updatedRoles);
        
        // Update detail if it's the current role
        const currentDetail = this.DetailRole();
        if (currentDetail?.id === result.id) {
          this.DetailRole.set({ ...currentDetail, ...result });
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error updating role:', error);
      this.handleCreateUpdateError(error, 'cập nhật');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async assignPermissionToRole(data: PermissionAssignData): Promise<boolean> {
    try {
      // Using universal GraphQL resolver for permission assignment
      const result = await this.graphqlService.createOne(
        'RolePermission',
        {
          roleId: data.roleId,
          permissionId: data.permissionId
        }
      );

      if (result) {
        this.showSuccessMessage('Gán quyền thành công');
        
        // Update local cache instead of fetching from server
        // Only refresh if user is viewing the role list or specific role details
        const currentDetail = this.DetailRole();
        if (currentDetail?.id === data.roleId) {
          // Refresh only the current role detail to get updated permissions
          await this.getRoleByid(data.roleId);
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error assigning permission:', error);
      this.handlePermissionError(error, 'gán');
      return false;
    }
  }

  async removePermissionFromRole(data: PermissionAssignData): Promise<boolean> {
    try {
      // Using universal GraphQL resolver for permission removal
      const result = await this.graphqlService.deleteOne(
        'RolePermission',
        {
          roleId: data.roleId,
          permissionId: data.permissionId
        }
      );

      if (result) {
        this.showSuccessMessage('Xóa quyền thành công');
        
        // Update local cache instead of fetching from server
        // Only refresh if user is viewing the role list or specific role details
        const currentDetail = this.DetailRole();
        if (currentDetail?.id === data.roleId) {
          // Refresh only the current role detail to get updated permissions
          await this.getRoleByid(data.roleId);
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error removing permission:', error);
      this.handlePermissionError(error, 'xóa');
      return false;
    }
  }



  async DeleteRole(item: { id: string }): Promise<boolean> {
    try {
      this.isLoading.set(true);

      const result = await this.graphqlService.deleteOne(
        this.modelName,
        { id: item.id }
      );

      if (result) {
        this.showSuccessMessage('Xóa role thành công');
        await this.getAllRole();
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error deleting role:', error);
      this.handleError(error);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Helper methods
  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  /**
   * Handle specific errors for Create and Update operations
   */
  private handleCreateUpdateError(error: any, operation: string): void {
    console.error(`Error ${operation} role:`, error);
    
    // Extract error message from different possible error structures
    let errorMessage = '';
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.graphQLErrors?.[0]?.message) {
      errorMessage = error.graphQLErrors[0].message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.log('Processed error message:', errorMessage);
     this.showErrorMessage(`Tên role này đã tồn tại. Vui lòng chọn tên khác.`);
    // Check for unique constraint violation on name field
    if (this.isUniqueConstraintError(errorMessage, 'name')) {
      this.showErrorMessage(`Tên role này đã tồn tại. Vui lòng chọn tên khác.`);
      return;
    }

    // Check for other unique constraint errors
    if (this.isUniqueConstraintError(errorMessage)) {
      this.showErrorMessage(`Thông tin này đã tồn tại trong hệ thống. Vui lòng kiểm tra lại.`);
      return;
    }

    // Check for validation errors
    if (this.isValidationError(errorMessage)) {
      this.showErrorMessage(`Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.`);
      return;
    }

    // Default error message
    this.showErrorMessage(`Lỗi khi ${operation} role. Vui lòng thử lại.`);
  }

  /**
   * Check if error is unique constraint violation
   */
  private isUniqueConstraintError(errorMessage: string, field?: string): boolean {
    const uniqueKeywords = [
      'Unique constraint failed',
      'unique constraint', 
      'UNIQUE constraint',
      'duplicate key',
      'already exists'
    ];

    const hasUniqueError = uniqueKeywords.some(keyword => 
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!hasUniqueError) return false;

    // If specific field is provided, check if error mentions that field
    if (field) {
      const fieldPattern = new RegExp(`\\(\`${field}\`\\)|${field}`, 'i');
      return fieldPattern.test(errorMessage);
    }

    return true;
  }

  /**
   * Check if error is validation error  
   */
  private isValidationError(errorMessage: string): boolean {
    const validationKeywords = [
      'validation failed',
      'invalid input',
      'required field',
      'field is required',
      'invalid value'
    ];

    return validationKeywords.some(keyword =>
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Handle specific errors for Permission operations
   */
  private handlePermissionError(error: any, operation: string): void {
    console.error(`Error ${operation} permission:`, error);
    
    // Extract error message
    let errorMessage = '';
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.graphQLErrors?.[0]?.message) {
      errorMessage = error.graphQLErrors[0].message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.log('Permission error message:', errorMessage);

    // Check for unique constraint violation (permission already assigned)
    if (this.isUniqueConstraintError(errorMessage)) {
      if (operation === 'gán') {
        this.showErrorMessage('Quyền này đã được gán cho role. Không thể gán lại.');
      } else {
        this.showErrorMessage('Lỗi trùng lặp khi thao tác với quyền.');
      }
      return;
    }

    // Check for foreign key constraint (role or permission not found)
    if (this.isForeignKeyError(errorMessage)) {
      this.showErrorMessage('Role hoặc Permission không tồn tại. Vui lòng kiểm tra lại.');
      return;
    }

    // Check for not found errors
    if (this.isNotFoundError(errorMessage)) {
      if (operation === 'xóa') {
        this.showErrorMessage('Quyền này chưa được gán cho role.');
      } else {
        this.showErrorMessage('Không tìm thấy thông tin cần thiết.');
      }
      return;
    }

    // Default error message
    this.showErrorMessage(`Lỗi khi ${operation} quyền. Vui lòng thử lại.`);
  }

  /**
   * Check if error is foreign key constraint violation
   */
  private isForeignKeyError(errorMessage: string): boolean {
    const foreignKeyKeywords = [
      'foreign key constraint',
      'foreign key',
      'reference constraint',
      'violates foreign key'
    ];

    return foreignKeyKeywords.some(keyword =>
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Check if error is not found error
   */
  private isNotFoundError(errorMessage: string): boolean {
    const notFoundKeywords = [
      'not found',
      'does not exist',
      'record not found',
      'no record found'
    ];

    return notFoundKeywords.some(keyword =>
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private handleError(error: any): void {
    console.error('Service error:', error);
    
    if (error.status === 401) {
      const result = JSON.stringify({ 
        code: error.status, 
        title: 'Vui lòng đăng nhập lại' 
      });
      this.router.navigate(['/errorserver'], { 
        queryParams: { data: result }
      });
    } else if (error.status === 403) {
      const result = JSON.stringify({ 
        code: error.status, 
        title: 'Bạn không có quyền truy cập' 
      });
      this.router.navigate(['/errorserver'], { 
        queryParams: { data: result }
      });
    } else if (error.status === 500) {
      const result = JSON.stringify({ 
        code: error.status, 
        title: 'Lỗi máy chủ, vui lòng thử lại sau' 
      });
      this.router.navigate(['/errorserver'], { 
        queryParams: { data: result }
      });
    } else {
      this.showErrorMessage('Lỗi không xác định');
    }
  }
}