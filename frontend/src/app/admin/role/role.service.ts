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
        await this.getAllRole();
        this.roleId.set(result.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error creating role:', error);
      this.showErrorMessage('Lỗi khi tạo role');
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
        await this.getAllRole();
        await this.getRoleByid(dulieu.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error updating role:', error);
      this.showErrorMessage('Lỗi khi cập nhật role');
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
        await this.getAllRole();
        await this.getRoleByid(data.roleId);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error assigning permission:', error);
      this.showErrorMessage('Lỗi khi gán quyền');
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
        await this.getAllRole();
        await this.getRoleByid(data.roleId);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error removing permission:', error);
      this.showErrorMessage('Lỗi khi xóa quyền');
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