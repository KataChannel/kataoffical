import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
import { ListNhomkhachhangComponent } from '../listnhomkhachhang/listnhomkhachhang.component';
import { NhomkhachhangService } from '../nhomkhachhang.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailnhomkhachhang',
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
    templateUrl: './detailnhomkhachhang.component.html',
    styleUrl: './detailnhomkhachhang.component.scss',
  })
  export class DetailNhomkhachhangComponent {
    _ListnhomkhachhangComponent:ListNhomkhachhangComponent = inject(ListNhomkhachhangComponent)
    _NhomkhachhangService:NhomkhachhangService = inject(NhomkhachhangService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
          this._NhomkhachhangService.setNhomkhachhangId(id);       
      });
  
      effect(async () => {
        const id = this._NhomkhachhangService.nhomkhachhangId();
      
        if (!id){
          this._router.navigate(['/admin/nhomkhachhang']);
          this._ListnhomkhachhangComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailNhomkhachhang.update(()=>{return {}})
          this._ListnhomkhachhangComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/nhomkhachhang', "0"]);
        }
        else{
            await this._NhomkhachhangService.getNhomkhachhangByid(id);
            this._ListnhomkhachhangComponent.drawer.open();
            this._router.navigate(['/admin/nhomkhachhang', id]);
        }
      });
    }
    DetailNhomkhachhang: any = this._NhomkhachhangService.DetailNhomkhachhang;
    isEdit = signal(false);
    isDelete = signal(false);  
    nhomkhachhangId:any = this._NhomkhachhangService.nhomkhachhangId
    async ngOnInit() {       
    }
    async handleNhomkhachhangAction() {
      if (this.nhomkhachhangId() === '0') {
        await this.createNhomkhachhang();
      }
      else {
        await this.updateNhomkhachhang();
      }
    }
    private async createNhomkhachhang() {
      try {
        await this._NhomkhachhangService.CreateNhomkhachhang(this.DetailNhomkhachhang());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo nhomkhachhang:', error);
      }
    }

    private async updateNhomkhachhang() {
      try {
        await this._NhomkhachhangService.updateNhomkhachhang(this.DetailNhomkhachhang());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật nhomkhachhang:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._NhomkhachhangService.DeleteNhomkhachhang(this.DetailNhomkhachhang());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/nhomkhachhang']);
      } catch (error) {
        console.error('Lỗi khi xóa nhomkhachhang:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/nhomkhachhang'])
      this._ListnhomkhachhangComponent.drawer.close();
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
      this.DetailNhomkhachhang.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }