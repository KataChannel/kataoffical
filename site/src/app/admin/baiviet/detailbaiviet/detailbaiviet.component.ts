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

import { ListBaivietComponent } from '../listbaiviet/listbaiviet.component';
import { BaivietService } from '../baiviet.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailbaiviet',
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
    templateUrl: './detailbaiviet.component.html',
    styleUrl: './detailbaiviet.component.scss'
  })
  export class DetailBaivietComponent {
    _ListBaivietComponent:ListBaivietComponent = inject(ListBaivietComponent)
    _BaivietService:BaivietService = inject(BaivietService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._BaivietService.setBaivietId(id);
      });
  
      effect(async () => {
        const id = this._BaivietService.baivietId();
        if (!id){
          this._router.navigate(['/admin/baiviet']);
          this._ListBaivietComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailBaiviet.set({});
          this._ListBaivietComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/baiviet', "new"]);
        }
        else{
            await this._BaivietService.getBaivietBy({id:id,isOne:true});
            this._ListBaivietComponent.drawer.open();
            this._router.navigate(['/admin/baiviet', id]);
        }
      });
    }
    DetailBaiviet: any = this._BaivietService.DetailBaiviet;
    isEdit = signal(false);
    isDelete = signal(false);  
    baivietId:any = this._BaivietService.baivietId
    async ngOnInit() {       
    }
    async handleBaivietAction() {
      if (this.baivietId() === 'new') {
        await this.createBaiviet();
      }
      else {
        await this.updateBaiviet();
      }
    }
    private async createBaiviet() {
      try {
        await this._BaivietService.CreateBaiviet(this.DetailBaiviet());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo baiviet:', error);
      }
    }

    private async updateBaiviet() {
      try {
        await this._BaivietService.updateBaiviet(this.DetailBaiviet());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật baiviet:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._BaivietService.DeleteBaiviet(this.DetailBaiviet());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/baiviet']);
      } catch (error) {
        console.error('Lỗi khi xóa baiviet:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/baiviet'])
      this._ListBaivietComponent.drawer.close();
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
      this.DetailBaiviet.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
