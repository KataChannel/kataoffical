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
import { UserService } from '../user.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
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
      MatSlideToggleModule
    ],
    templateUrl: './detailuser.component.html',
    styleUrl: './detailuser.component.scss'
  })
  export class DetailUserComponent {
    _ListUserComponent:ListUserComponent = inject(ListUserComponent)
    _UserService:UserService = inject(UserService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._UserService.setUserId(id);
      });
  
      effect(async () => {
        const id = this._UserService.userId();
        if (!id){
          this._router.navigate(['/admin/user']);
          this._ListUserComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailUser.set({});
          this._ListUserComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/user', "new"]);
        }
        else{
            await this._UserService.getUserBy({id:id});
            this._ListUserComponent.drawer.open();
            this._router.navigate(['/admin/user', id]);
        }
      });
    }
    DetailUser: any = this._UserService.DetailUser;
    isEdit = signal(false);
    isDelete = signal(false);  
    userId:any = this._UserService.userId
    async ngOnInit() {       
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
        await this._UserService.CreateUser(this.DetailUser());
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
        await this._UserService.updateUser(this.DetailUser());
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
        await this._UserService.DeleteUser(this.DetailUser());
  
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
    goBack(){
      this._router.navigate(['/admin/user'])
      this._ListUserComponent.drawer.close();
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
      this.DetailUser.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }