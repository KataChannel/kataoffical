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
import { ListUserComponent } from '../listuser/listuser.component';
import { UserGraphQLService, User } from '../user-graphql.service';
import { RoleGraphQLService, Role } from '../../role/role-graphql.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { DrawerService } from '../shared/drawer.service';
  @Component({
    selector: 'app-detailuser',
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
      MatMenuModule
    ],
    templateUrl: './detailuser.component.html',
    styleUrl: './detailuser.component.scss'
  })
  export class DetailUserComponent {
    _ListuserComponent:ListUserComponent = inject(ListUserComponent)
    _UserGraphQLService:UserGraphQLService = inject(UserGraphQLService)
    _RoleGraphQLService:RoleGraphQLService = inject(RoleGraphQLService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      // Handle route parameter changes for new user or direct navigation
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id === 'new') {
          this.userId.set(id);
        } else if (id && !this._UserGraphQLService.currentUser()) {
          // Only set from route if no current user is set (direct navigation)
          this.userId.set(id);
        }
      });

      // // React to currentUser changes from service
      // effect(() => {
      //   const currentUser = this._UserGraphQLService.currentUser();
      //   if (currentUser) {
      //     this.DetailUser.set({
      //       ...currentUser,
      //       sdt: currentUser.sdt || '' // Ensure sdt field exists
      //     });
      //     this.userId.set(currentUser.id);
      //     this.isEdit.set(false);
      //   }
      // });
  
      // effect(async () => {
      //   const id = this.userId();
      //   if (!id){
      //     this._router.navigate(['/admin/user']);
      //     this._ListuserComponent.drawer.close();
      //     return;        
      //   }
      //   if(id === 'new'){
      //     this.DetailUser.set({ 
      //       email: '', 
      //       password: '',
      //       SDT: '',
      //       isActive: true,
      //       roles: [],
      //       profile: {
      //         name: '',
      //         avatar: '',
      //         bio: ''
      //       }
      //     });
      //     this._ListuserComponent?.drawer?.open();
      //     this.isEdit.update(value => !value);
      //     // this._router.navigate(['/admin/user', 'new']);
      //   }
      //   else if(id){
      //       await this.getUserById(id);
      //       this._ListuserComponent?.drawer?.open();
      //       this._router.navigate(['/admin/user', id]);
      //   }
      // });
    }
    
    DetailUser = signal<any>({});
    isEdit = signal(false);
    isDelete = signal(false);
    isLoading = signal(false);
    isAddingRole = signal(false);
    isRemovingRole = signal(false);  
    userId = signal<string | null>(null);
    ListRole = signal<Role[]>([]);
    FilterRole = signal<Role[]>([]);

    async getUserById(id: string): Promise<void> {
      try {
        const user = await this._UserGraphQLService.getUserById(id);
        if (user) {
          this.DetailUser.set({
            ...user,
            SDT: user.SDT || ''
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        this._snackBar.open('Lỗi khi tải thông tin người dùng', 'Đóng', { duration: 3000 });
      }
    }
    async ngOnInit() {    
     const id = this.userId();
        if (!id){
          this._router.navigate(['/admin/user']);
          this._ListuserComponent.drawer.close();
          return;        
        }
        if(id === 'new'){
          this.DetailUser.set({ 
            email: '', 
            password: '',
            SDT: '',
            isActive: true,
            roles: [],
            profile: {
              name: '',
              avatar: '',
              bio: ''
            }
          });
          this._ListuserComponent?.drawer?.open();
          this.isEdit.update(value => !value);
          // this._router.navigate(['/admin/user', 'new']);
        }
        else if(id){
            await this.getUserById(id);
            this._ListuserComponent?.drawer?.open();
            this._router.navigate(['/admin/user', id]);
        }

      await this._RoleGraphQLService.loadAllRoles();
      this.ListRole.set(this._RoleGraphQLService.allRoles());
      this.updateFilterRole();
    }

    updateFilterRole() {
      const allRoles = this.ListRole() || [];
      const userRoles = this.DetailUser()?.roles || [];
      
      if (allRoles.length === 0) {
        this.FilterRole.set([]);
        return;
      }
      
      const filteredRoles = allRoles.filter((role: Role) => {
        if (!role || !role.id) return false;
        
        return !userRoles.some((userRole: any) => {
          if (!userRole) return false;
          return userRole.roleId === role.id || userRole.role?.id === role.id;
        });
      });
      
      this.FilterRole.set(filteredRoles);
    }
    async handleUserAction() {
      if (this.userId() === 'new') {
        await this.createUser();
      }
      else {
        await this.updateUser();
      }
    }
    private async createUser() {
      try {
        if (!this.DetailUser().password || this.DetailUser().password.trim() === '') {
          this._snackBar.open('Vui lòng nhập password', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }

        if (!this.DetailUser().SDT || this.DetailUser().SDT.trim() === '') {
          this._snackBar.open('Vui lòng nhập SDT', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }
        
        await this._UserGraphQLService.createUser(this.DetailUser());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo user:', error);
      }
    }

    private async updateUser() {
      try {
        await this._UserGraphQLService.updateUser(this.DetailUser().id, this.DetailUser());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật user:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._UserGraphQLService.deleteUser(this.DetailUser().id);
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/user']);
      } catch (error) {
        console.error('Lỗi khi xóa user:', error);
      }
    }
    FillSlug(){
      this.DetailUser.update((v:any)=>{
        // Create a copy of the user object to avoid "object is not extensible" error
        return {
          ...v,
          slug: convertToSlug(v.title)
        };
      })
    }
    doFilterHederColumn(event:any){
      const allRoles = this.ListRole();
      this.FilterRole.set(allRoles.filter((v:any)=>v.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }
    
    async handleAddRole(item: any) {
      if (!item || !item.id || this.isAddingRole()) {
        if (!item || !item.id) {
          this._snackBar.open('Dữ liệu vai trò không hợp lệ', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        }
        return;
      }

      this.isAddingRole.set(true);
      
      try {
        // Check if role already exists
        const userRoles = this.DetailUser()?.roles || [];
        const roleExists = userRoles.some((userRole: any) => 
          userRole.roleId === item.id || userRole.role?.id === item.id
        );

        if (roleExists) {
          this._snackBar.open('Vai trò đã được thêm', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-warning'],
          });
          return;
        }

        await this._UserGraphQLService.assignRolesToUser(this.DetailUser().id, [item.id]);
        
        this.DetailUser.update((v: any) => {
          // Create a copy of the user object with a new roles array to avoid extensibility issues
          return {
            ...v,
            roles: [
              ...(v.roles || []),
              {
                id: GenId(8, false),
                userId: this.DetailUser().id,
                roleId: item.id,
                role: item
              }
            ]
          };
        });
        
        this.updateFilterRole();
        this._snackBar.open('Thêm vai trò thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      } catch (error) {
        console.error('Error adding role:', error);
        this._snackBar.open('Lỗi khi thêm vai trò', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } finally {
        this.isAddingRole.set(false);
      }
    }
    
    async handleRemoveRole(item: any) {
      if (!item || this.isRemovingRole()) {
        if (!item) {
          this._snackBar.open('Dữ liệu vai trò không hợp lệ', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        }
        return;
      }

      this.isRemovingRole.set(true);

      try {
        const roleId = item.role?.id || item.roleId;
        if (!roleId) {
          this._snackBar.open('Không thể xác định ID vai trò', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          return;
        }

        await this._UserGraphQLService.removeRoleFromUser(this.DetailUser().id, roleId);
        
        this.DetailUser.update((v: any) => {
          // Create a copy of the user object with filtered roles array to avoid extensibility issues
          return {
            ...v,
            roles: (v.roles || []).filter((r: any) => 
              (r.role?.id || r.roleId) !== roleId
            )
          };
        });
        
        this.updateFilterRole();
        this._snackBar.open('Xóa vai trò thành công', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      } catch (error) {
        console.error('Error removing role:', error);
        this._snackBar.open('Lỗi khi xóa vai trò', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      } finally {
        this.isRemovingRole.set(false);
      }
    }

    goBack(){
      this._UserGraphQLService.clearCurrentUser();
      this._ListuserComponent.drawer.close();
      this._router.navigate(['/admin/user'])
    }
    
    trackByFn(index: number, item: any): any {
      return item.id;
    }
    
    toggleEdit() {
      this.isEdit.update(value => !value);
    }
    
    toggleDelete() {
      this.isDelete.update(value => !value);
    }
  }