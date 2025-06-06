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

import { ListHoadonchitietComponent } from '../listhoadonchitiet/listhoadonchitiet.component';
import { HoadonchitietService } from '../hoadonchitiet.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailhoadonchitiet',
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
    templateUrl: './detailhoadonchitiet.component.html',
    styleUrl: './detailhoadonchitiet.component.scss'
  })
  export class DetailHoadonchitietComponent {
    _ListHoadonchitietComponent:ListHoadonchitietComponent = inject(ListHoadonchitietComponent)
    _HoadonchitietService:HoadonchitietService = inject(HoadonchitietService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._HoadonchitietService.setHoadonchitietId(id);
      });
  
      effect(async () => {
        const id = this._HoadonchitietService.hoadonchitietId();
        if (!id){
          this._router.navigate(['/admin/hoadonchitiet']);
          this._ListHoadonchitietComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailHoadonchitiet.set({});
          this._ListHoadonchitietComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/hoadonchitiet', "new"]);
        }
        else{
            await this._HoadonchitietService.getHoadonchitietBy({id:id});
            this._ListHoadonchitietComponent.drawer.open();
            this._router.navigate(['/admin/hoadonchitiet', id]);
        }
      });
    }
    DetailHoadonchitiet: any = this._HoadonchitietService.DetailHoadonchitiet;
    isEdit = signal(false);
    isDelete = signal(false);  
    hoadonchitietId:any = this._HoadonchitietService.hoadonchitietId
    async ngOnInit() {       
    }
    async handleHoadonchitietAction() {
      if (this.hoadonchitietId() === 'new') {
        await this.createHoadonchitiet();
      }
      else {
        await this.updateHoadonchitiet();
      }
    }
    private async createHoadonchitiet() {
      try {
        await this._HoadonchitietService.CreateHoadonchitiet(this.DetailHoadonchitiet());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo hoadonchitiet:', error);
      }
    }

    private async updateHoadonchitiet() {
      try {
        await this._HoadonchitietService.updateHoadonchitiet(this.DetailHoadonchitiet());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật hoadonchitiet:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._HoadonchitietService.DeleteHoadonchitiet(this.DetailHoadonchitiet());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/hoadonchitiet']);
      } catch (error) {
        console.error('Lỗi khi xóa hoadonchitiet:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/hoadonchitiet'])
      this._ListHoadonchitietComponent.drawer.close();
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
      this.DetailHoadonchitiet.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }