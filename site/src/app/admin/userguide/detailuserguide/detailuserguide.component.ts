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

import { ListUserguideComponent } from '../listuserguide/listuserguide.component';
import { UserguideService } from '../userguide.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailuserguide',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
],
    templateUrl: './detailuserguide.component.html',
    styleUrl: './detailuserguide.component.scss'
  })
  export class DetailUserguideComponent {
    _ListUserguideComponent:ListUserguideComponent = inject(ListUserguideComponent)
    _UserguideService:UserguideService = inject(UserguideService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._UserguideService.setUserguideId(id);
      });
  
      effect(async () => {
        const id = this._UserguideService.userguideId();
        if (!id){
          this._router.navigate(['/admin/userguide']);
          this._ListUserguideComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailUserguide.set({});
          this._ListUserguideComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/userguide', "new"]);
        }
        else{
            await this._UserguideService.getUserguideBy({id:id});
            this._ListUserguideComponent.drawer.open();
            this._router.navigate(['/admin/userguide', id]);
        }
      });
    }
    DetailUserguide: any = this._UserguideService.DetailUserguide;
    isEdit = signal(false);
    isDelete = signal(false);  
    userguideId:any = this._UserguideService.userguideId
    async ngOnInit() {       
    }
    async handleUserguideAction() {
      if (this.userguideId() === 'new') {
        await this.createUserguide();
      }
      else {
        await this.updateUserguide();
      }
    }
    private async createUserguide() {
      try {
        await this._UserguideService.CreateUserguide(this.DetailUserguide());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo userguide:', error);
      }
    }

    private async updateUserguide() {
      try {
        await this._UserguideService.updateUserguide(this.DetailUserguide());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật userguide:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._UserguideService.DeleteUserguide(this.DetailUserguide());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/userguide']);
      } catch (error) {
        console.error('Lỗi khi xóa userguide:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/userguide'])
      this._ListUserguideComponent.drawer.close();
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
      this.DetailUserguide.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }