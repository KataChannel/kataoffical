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
import { ListThanhtoanhoahongComponent } from '../listthanhtoanhoahong/listthanhtoanhoahong';
import { ThanhtoanhoahongService } from '../thanhtoanhoahong.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailthanhtoanhoahong',
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
    templateUrl: './detailthanhtoanhoahong.html',
    styleUrl: './detailthanhtoanhoahong.scss'
  })
  export class DetailThanhtoanhoahongComponent {
    _ListThanhtoanhoahongComponent:ListThanhtoanhoahongComponent = inject(ListThanhtoanhoahongComponent)
    _ThanhtoanhoahongService:ThanhtoanhoahongService = inject(ThanhtoanhoahongService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._ThanhtoanhoahongService.setThanhtoanhoahongId(id);
      });
  
      effect(async () => {
        const id = this._ThanhtoanhoahongService.thanhtoanhoahongId();
        if (!id){
          this._router.navigate(['/admin/thanhtoanhoahong']);
          this._ListThanhtoanhoahongComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailThanhtoanhoahong.set({});
          this._ListThanhtoanhoahongComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/thanhtoanhoahong', "new"]);
        }
        else{
            await this._ThanhtoanhoahongService.getThanhtoanhoahongBy({id:id,isOne:true});
            this._ListThanhtoanhoahongComponent.drawer.open();
            this._router.navigate(['/admin/thanhtoanhoahong', id]);
        }
      });
    }
    DetailThanhtoanhoahong: any = this._ThanhtoanhoahongService.DetailThanhtoanhoahong;
    isEdit = signal(false);
    isDelete = signal(false);  
    thanhtoanhoahongId:any = this._ThanhtoanhoahongService.thanhtoanhoahongId
    async ngOnInit() {       
    }
    async handleThanhtoanhoahongAction() {
      if (this.thanhtoanhoahongId() === 'new') {
        await this.createThanhtoanhoahong();
      }
      else {
        await this.updateThanhtoanhoahong();
      }
    }
    private async createThanhtoanhoahong() {
      try {
        await this._ThanhtoanhoahongService.CreateThanhtoanhoahong(this.DetailThanhtoanhoahong());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo thanhtoanhoahong:', error);
      }
    }

    private async updateThanhtoanhoahong() {
      try {
        await this._ThanhtoanhoahongService.updateThanhtoanhoahong(this.DetailThanhtoanhoahong());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật thanhtoanhoahong:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._ThanhtoanhoahongService.DeleteThanhtoanhoahong(this.DetailThanhtoanhoahong());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/thanhtoanhoahong']);
      } catch (error) {
        console.error('Lỗi khi xóa thanhtoanhoahong:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/thanhtoanhoahong'])
      this._ListThanhtoanhoahongComponent.drawer.close();
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
      this.DetailThanhtoanhoahong.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }