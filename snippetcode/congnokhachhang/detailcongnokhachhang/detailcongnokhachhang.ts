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
import { ListCongnokhachhangComponent } from '../listcongnokhachhang/listcongnokhachhang';
import { CongnokhachhangService } from '../congnokhachhang.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailcongnokhachhang',
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
    templateUrl: './detailcongnokhachhang.html',
    styleUrl: './detailcongnokhachhang.scss'
  })
  export class DetailCongnokhachhangComponent {
    _ListCongnokhachhangComponent:ListCongnokhachhangComponent = inject(ListCongnokhachhangComponent)
    _CongnokhachhangService:CongnokhachhangService = inject(CongnokhachhangService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._CongnokhachhangService.setCongnokhachhangId(id);
      });
  
      effect(async () => {
        const id = this._CongnokhachhangService.congnokhachhangId();
        if (!id){
          this._router.navigate(['/admin/congnokhachhang']);
          this._ListCongnokhachhangComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailCongnokhachhang.set({});
          this._ListCongnokhachhangComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/congnokhachhang', "new"]);
        }
        else{
            await this._CongnokhachhangService.getCongnokhachhangBy({id:id,isOne:true});
            this._ListCongnokhachhangComponent.drawer.open();
            this._router.navigate(['/admin/congnokhachhang', id]);
        }
      });
    }
    DetailCongnokhachhang: any = this._CongnokhachhangService.DetailCongnokhachhang;
    isEdit = signal(false);
    isDelete = signal(false);  
    congnokhachhangId:any = this._CongnokhachhangService.congnokhachhangId
    async ngOnInit() {       
    }
    async handleCongnokhachhangAction() {
      if (this.congnokhachhangId() === 'new') {
        await this.createCongnokhachhang();
      }
      else {
        await this.updateCongnokhachhang();
      }
    }
    private async createCongnokhachhang() {
      try {
        await this._CongnokhachhangService.CreateCongnokhachhang(this.DetailCongnokhachhang());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo congnokhachhang:', error);
      }
    }

    private async updateCongnokhachhang() {
      try {
        await this._CongnokhachhangService.updateCongnokhachhang(this.DetailCongnokhachhang());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật congnokhachhang:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._CongnokhachhangService.DeleteCongnokhachhang(this.DetailCongnokhachhang());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/congnokhachhang']);
      } catch (error) {
        console.error('Lỗi khi xóa congnokhachhang:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/congnokhachhang'])
      this._ListCongnokhachhangComponent.drawer.close();
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
      this.DetailCongnokhachhang.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }