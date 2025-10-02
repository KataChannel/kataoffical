import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from '../listrole/listrole.component';
import { RoleService } from '../role.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { PermissionService } from '../../permission/permission.service';
@Component({
  selector: 'app-detailrole',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detailrole.component.html',
  styleUrl: './detailrole.component.scss',
})
export class DetailRoleComponent {
  _ListroleComponent: ListRoleComponent = inject(ListRoleComponent);
  _RoleService: RoleService = inject(RoleService);
  _PermissionService: PermissionService = inject(PermissionService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  ListPermission: any = [];
  filterPermission: any = [];
  idRole: any = 0;
  constructor() {
    this._route.paramMap.subscribe(async (params) => {
      this.idRole = params.get('id');
    });
    // effect(async () => {
    //   const id = this._RoleService.roleId();
    //   if (!id) {
    //     this._router.navigate(['/admin/nhomuser']);
    //     this._ListroleComponent.drawer.close();
    //   }
    //   if (id === '0') {
    //     this._ListroleComponent.drawer.open();
    //     this.isEdit.update((value) => !value);
    //     this._router.navigate(['/admin/nhomuser', '0']);
    //   } else {
    //     await this._RoleService.getRoleByid(id);
    //     this._ListroleComponent.drawer.open();
    //     this._router.navigate(['/admin/nhomuser', id]);
    //   }
    // });
  }
  DetailRole: any = {};
  isEdit = signal(false);
  isDelete = signal(false);
  isTogglingPermission = signal<string>('');
  groupedPermissions = signal<{[key: string]: any[]}>({});

  groupPermissionsByGroup(permissions: any[]) {
    const groups: {[key: string]: any[]} = {};
    permissions.forEach(permission => {
      const group = permission.group || 'Other';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(permission);
    });
    return groups;
  }

  async ngOnInit() {
    await this._PermissionService.getAllPermission(1000);
    this.ListPermission = this._PermissionService.ListPermission();

    if (!this.idRole) {
      this._router.navigate(['/admin/nhomuser']);
      this._ListroleComponent.drawer.close();
      return;
    } 

    if (this.idRole === 'new') {
      this._ListroleComponent.drawer.open();
      this.isEdit.update((value) => !value);
      this.filterPermission = this.ListPermission;
      this.groupedPermissions.set(this.groupPermissionsByGroup(this.filterPermission));
      this._router.navigate(['/admin/nhomuser', 'new']);
    } else {
      await this._RoleService.getRoleByid(this.idRole);
      this.DetailRole = this._RoleService.DetailRole();
      
      // Map permissions with hasPermission flag
      this.filterPermission = this.ListPermission.map((v: any) => ({
        ...v,
        hasPermission: this.DetailRole?.permissions?.some((p: any) => p.permissionId === v.id) || false
      }));
    }

    // Group permissions by their group property
    this.groupedPermissions.set(this.groupPermissionsByGroup(this.filterPermission));
    this._ListroleComponent.drawer.open();
  }
  async handleRoleAction() {
    if (this.idRole === 'new') {
      await this.createRole();
    } else {
      await this.updateRole();
    }
  }
  private async createRole() {
    console.log(this.DetailRole);
    try {
      await this._RoleService.CreateRole(this.DetailRole);
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo role:', error);
    }
  }

  private async updateRole() {
    try {
      await this._RoleService.updateRole(this.DetailRole);
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật role:', error);
    }
  }
  async DeleteData() {
    try {
      await this._RoleService.DeleteRole(this.DetailRole);

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/nhomuser']);
    } catch (error) {
      console.error('Lỗi khi xóa role:', error);
    }
  }
  goBack() {
    this._router.navigate(['/admin/nhomuser']);
    this._ListroleComponent.drawer.close();
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    // this.DetailRole.update((v: any) => {
    //   v.slug = convertToSlug(v.title);
    //   return v;
    // });
  }
  async togglePermission(item: any) {
    const originalState = item.hasPermission;
    const newState = !item.hasPermission;
    
    // Set loading state for this specific permission
    this.isTogglingPermission.set(item.id);
    
    // Optimistic update
    item.hasPermission = newState;
    
    // Update the grouped permissions
    const currentGroups = this.groupedPermissions();
    const updatedGroup = currentGroups[item.group || 'Other'].map(p => 
      p.id === item.id ? {...p, hasPermission: newState} : p
    );
    this.groupedPermissions.set({
      ...currentGroups,
      [item.group || 'Other']: updatedGroup
    });
    
    try {
      let result: boolean;
      
      if (newState) {
        // Assigning permission
        result = await this._RoleService.assignPermissionToRole({
          roleId: this.idRole,
          permissionId: item.id,
        });
      } else {
        // Removing permission
        result = await this._RoleService.removePermissionFromRole({
          roleId: this.idRole,
          permissionId: item.id,
        });
      }
      
      // If operation failed, rollback the optimistic update
      if (!result) {
        item.hasPermission = originalState;
        this._snackBar.open(
          `Lỗi khi ${newState ? 'gán' : 'xóa'} quyền. Vui lòng thử lại.`, 
          '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
      }
      
    } catch (error) {
      // Rollback on error
      item.hasPermission = originalState;
      console.error('Error toggling permission:', error);
      
      this._snackBar.open(
        `Lỗi khi ${newState ? 'gán' : 'xóa'} quyền: ${error}`, 
        '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        }
      );
    } finally {
      // Clear loading state
      this.isTogglingPermission.set('');
    }
  }
}
