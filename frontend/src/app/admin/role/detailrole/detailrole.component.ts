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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
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
      MatSlideToggleModule
    ],
    templateUrl: './detailrole.component.html',
    styleUrl: './detailrole.component.scss'
  })
  export class DetailRoleComponent {
    _ListroleComponent:ListRoleComponent = inject(ListRoleComponent)
    _RoleService:RoleService = inject(RoleService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if(id === null||id === '0'){
          this._RoleService.setRoleId('0');
        }
        else
        this._RoleService.setRoleId(id);
      });
  
      effect(async () => {
        const id = this._RoleService.roleId();
      
        if (!id){
          this._router.navigate(['/admin/nhomuser']);
          this._ListroleComponent.drawer.close();
        }
        if(id === '0'){
          this._ListroleComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/nhomuser', "0"]);
        }
        else{
            await this._RoleService.getRoleByid(id);
            this._ListroleComponent.drawer.open();
            this._router.navigate(['/admin/nhomuser', id]);
        }
      });
    }
    DetailRole: any = this._RoleService.DetailRole;
    isEdit = signal(false);
    isDelete = signal(false);  
    roleId:any = this._RoleService.roleId
    async ngOnInit() {       
    }
    async handleRoleAction() {
      if (this.roleId() === '0') {
        await this.createRole();
      }
      else {
        await this.updateRole();
      }
    }
    private async createRole() {
      try {
        await this._RoleService.CreateRole(this.DetailRole());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo role:', error);
      }
    }

    private async updateRole() {
      try {
        await this._RoleService.updateRole(this.DetailRole());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật role:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._RoleService.DeleteRole(this.DetailRole());
  
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
    goBack(){
      this._router.navigate(['/admin/nhomuser'])
      this._ListroleComponent.drawer.close();
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
    FillSlug(){
      this.DetailRole.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }