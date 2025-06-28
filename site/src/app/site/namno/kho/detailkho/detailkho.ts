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

import { ListKhoComponent } from '../listkho/listkho';
import { KhoService } from '../kho.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailkho',
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
    templateUrl: './detailkho.html',
    styleUrl: './detailkho.scss'
  })
  export class DetailKhoComponent {
    _ListKhoComponent:ListKhoComponent = inject(ListKhoComponent)
    _KhoService:KhoService = inject(KhoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._KhoService.setKhoId(id);
      });
  
      effect(async () => {
        const id = this._KhoService.khoId();
        if (!id){
          this._router.navigate(['kho']);
          this._ListKhoComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailKho.set({});
          this._ListKhoComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['kho', "new"]);
        }
        else{
            await this._KhoService.getKhoBy({id:id,isOne:true});
            this._ListKhoComponent.drawer.open();
            this._router.navigate(['kho', id]);
        }
      });
    }
    DetailKho: any = this._KhoService.DetailKho;
    isEdit = signal(false);
    isDelete = signal(false);  
    khoId:any = this._KhoService.khoId
    async ngOnInit() {       
    }
    async handleKhoAction() {
      if (this.khoId() === 'new') {
        await this.createKho();
      }
      else {
        await this.updateKho();
      }
    }
    private async createKho() {
      try {
        await this._KhoService.CreateKho(this.DetailKho());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo kho:', error);
      }
    }

    private async updateKho() {
      try {
        await this._KhoService.updateKho(this.DetailKho());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật kho:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._KhoService.DeleteKho(this.DetailKho());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['kho']);
      } catch (error) {
        console.error('Lỗi khi xóa kho:', error);
      }
    }
    goBack(){
      this._router.navigate(['kho'])
      this._ListKhoComponent.drawer.close();
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
      this.DetailKho.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }