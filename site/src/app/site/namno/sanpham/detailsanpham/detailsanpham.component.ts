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
import { ListSanphamComponent } from '../listsanpham/listsanpham.component';
import { SanphamService } from '../sanpham.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';
import { DanhmucService } from '../../danhmuc/danhmuc.service';
  @Component({
    selector: 'app-detailsanpham',
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
    templateUrl: './detailsanpham.component.html',
    styleUrl: './detailsanpham.component.scss'
  })
  export class DetailSanphamComponent {
    _ListSanphamComponent:ListSanphamComponent = inject(ListSanphamComponent)
    _SanphamService:SanphamService = inject(SanphamService)
    _DanhmucService:DanhmucService = inject(DanhmucService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    DetailSanpham: any = this._SanphamService.DetailSanpham;
    isEdit = signal(false);
    isDelete = signal(false);  
    sanphamId:any = this._SanphamService.sanphamId;
    ListDanhmuc = this._DanhmucService.ListDanhmuc;
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._SanphamService.setSanphamId(id);
      });
  
      effect(async () => {
        const id = this._SanphamService.sanphamId();
        await this._DanhmucService.getAllDanhmuc();
        if (!id){
          this._router.navigate(['sanpham']);
          this._ListSanphamComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailSanpham.set({});
          this._ListSanphamComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['sanpham', "new"]);
        }
        else{
            await this._SanphamService.getSanphamBy({id:id,isOne:true});
            this._ListSanphamComponent.drawer.open();
            this._router.navigate(['sanpham', id]);
        }
      });
    }
    async ngOnInit() {    
      await this._DanhmucService.getAllDanhmuc();   
    }
    async handleSanphamAction() {
      if (this.sanphamId() === 'new') {
        await this.createSanpham();
      }
      else {
        await this.updateSanpham();
      }
    }
    private async createSanpham() {
      try {
        await this._SanphamService.CreateSanpham(this.DetailSanpham());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo sanpham:', error);
      }
    }

    private async updateSanpham() {
      try {
        await this._SanphamService.updateSanpham(this.DetailSanpham());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật sanpham:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._SanphamService.DeleteSanpham(this.DetailSanpham());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['sanpham']);
      } catch (error) {
        console.error('Lỗi khi xóa sanpham:', error);
      }
    }
    goBack(){
      this._router.navigate(['sanpham'])
      this._ListSanphamComponent.drawer.close();
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
      this.DetailSanpham.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }