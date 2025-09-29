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
import { ListHoahongComponent } from '../listhoahong/listhoahong';
import { HoahongService } from '../hoahong.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailhoahong',
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
    templateUrl: './detailhoahong.html',
    styleUrl: './detailhoahong.scss'
  })
  export class DetailHoahongComponent {
    _ListHoahongComponent:ListHoahongComponent = inject(ListHoahongComponent)
    _HoahongService:HoahongService = inject(HoahongService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._HoahongService.setHoahongId(id);
      });
  
      effect(async () => {
        const id = this._HoahongService.hoahongId();
        if (!id){
          this._router.navigate(['/admin/hoahong']);
          this._ListHoahongComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailHoahong.set({});
          this._ListHoahongComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/hoahong', "new"]);
        }
        else{
            await this._HoahongService.getHoahongBy({id:id,isOne:true});
            this._ListHoahongComponent.drawer.open();
            this._router.navigate(['/admin/hoahong', id]);
        }
      });
    }
    DetailHoahong: any = this._HoahongService.DetailHoahong;
    isEdit = signal(false);
    isDelete = signal(false);  
    hoahongId:any = this._HoahongService.hoahongId
    async ngOnInit() {       
    }
    async handleHoahongAction() {
      if (this.hoahongId() === 'new') {
        await this.createHoahong();
      }
      else {
        await this.updateHoahong();
      }
    }
    private async createHoahong() {
      try {
        await this._HoahongService.CreateHoahong(this.DetailHoahong());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo hoahong:', error);
      }
    }

    private async updateHoahong() {
      try {
        await this._HoahongService.updateHoahong(this.DetailHoahong());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật hoahong:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._HoahongService.DeleteHoahong(this.DetailHoahong());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/hoahong']);
      } catch (error) {
        console.error('Lỗi khi xóa hoahong:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/hoahong'])
      this._ListHoahongComponent.drawer.close();
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
      this.DetailHoahong.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }