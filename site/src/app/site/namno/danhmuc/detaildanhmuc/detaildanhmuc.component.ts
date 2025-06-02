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
import { ListDanhmucComponent } from '../listdanhmuc/listdanhmuc.component';
import { DanhmucService } from '../danhmuc.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';

  @Component({
    selector: 'app-detaildanhmuc',
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
    templateUrl: './detaildanhmuc.component.html',
    styleUrl: './detaildanhmuc.component.scss'
  })
  export class DetailDanhmucComponent {
    _ListDanhmucComponent:ListDanhmucComponent = inject(ListDanhmucComponent)
    _DanhmucService:DanhmucService = inject(DanhmucService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DanhmucService.setDanhmucId(id);
      });
  
      effect(async () => {
        const id = this._DanhmucService.danhmucId();
        if (!id){
          this._router.navigate(['danhmuc']);
          this._ListDanhmucComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDanhmuc.set({});
          this._ListDanhmucComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['danhmuc', "new"]);
        }
        else{
            await this._DanhmucService.getDanhmucBy({id:id,isOne:true});
            this._ListDanhmucComponent.drawer.open();
            this._router.navigate(['danhmuc', id]);
        }
      });
    }
    DetailDanhmuc: any = this._DanhmucService.DetailDanhmuc;
    isEdit = signal(false);
    isDelete = signal(false);  
    danhmucId:any = this._DanhmucService.danhmucId
    async ngOnInit() {       
    }
    async handleDanhmucAction() {
      if (this.danhmucId() === 'new') {
        await this.createDanhmuc();
      }
      else {
        await this.updateDanhmuc();
      }
    }
    private async createDanhmuc() {
      try {
        await this._DanhmucService.CreateDanhmuc(this.DetailDanhmuc());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo danhmuc:', error);
      }
    }

    private async updateDanhmuc() {
      try {
        await this._DanhmucService.updateDanhmuc(this.DetailDanhmuc());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật danhmuc:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DanhmucService.DeleteDanhmuc(this.DetailDanhmuc());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['danhmuc']);
      } catch (error) {
        console.error('Lỗi khi xóa danhmuc:', error);
      }
    }
    goBack(){
      this._router.navigate(['danhmuc'])
      this._ListDanhmucComponent.drawer.close();
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
      this.DetailDanhmuc.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }