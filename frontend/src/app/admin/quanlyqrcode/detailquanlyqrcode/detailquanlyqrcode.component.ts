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
import { ListQuanlyqrcodeComponent } from '../listquanlyqrcode/listquanlyqrcode.component';
import { QuanlyqrcodeService } from '../quanlyqrcode.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailquanlyqrcode',
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
    templateUrl: './detailquanlyqrcode.component.html',
    styleUrl: './detailquanlyqrcode.component.scss'
  })
  export class DetailQuanlyqrcodeComponent {
    _ListquanlyqrcodeComponent:ListQuanlyqrcodeComponent = inject(ListQuanlyqrcodeComponent)
    _QuanlyqrcodeService:QuanlyqrcodeService = inject(QuanlyqrcodeService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._QuanlyqrcodeService.setQuanlyqrcodeId(id);
      });
  
      effect(async () => {
        const id = this._QuanlyqrcodeService.quanlyqrcodeId();
        if (!id){
          this._router.navigate(['/admin/quanlyqrcode']);
          this._ListquanlyqrcodeComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailQuanlyqrcode.set({});
          this._ListquanlyqrcodeComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/quanlyqrcode', "new"]);
        }
        else{
            await this._QuanlyqrcodeService.getQuanlyqrcodeBy({id:id});
            this._ListquanlyqrcodeComponent.drawer.open();
            this._router.navigate(['/admin/quanlyqrcode', id]);
        }
      });
    }
    DetailQuanlyqrcode: any = this._QuanlyqrcodeService.DetailQuanlyqrcode;
    isEdit = signal(false);
    isDelete = signal(false);  
    quanlyqrcodeId:any = this._QuanlyqrcodeService.quanlyqrcodeId
    async ngOnInit() {       
    }
    async handleQuanlyqrcodeAction() {
      if (this.quanlyqrcodeId() === 'new') {
        await this.createQuanlyqrcode();
      }
      else {
        await this.updateQuanlyqrcode();
      }
    }
    private async createQuanlyqrcode() {
      try {
        await this._QuanlyqrcodeService.CreateQuanlyqrcode(this.DetailQuanlyqrcode());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo quanlyqrcode:', error);
      }
    }

    private async updateQuanlyqrcode() {
      try {
        await this._QuanlyqrcodeService.updateQuanlyqrcode(this.DetailQuanlyqrcode());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật quanlyqrcode:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._QuanlyqrcodeService.DeleteQuanlyqrcode(this.DetailQuanlyqrcode());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/quanlyqrcode']);
      } catch (error) {
        console.error('Lỗi khi xóa quanlyqrcode:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/quanlyqrcode'])
      this._ListquanlyqrcodeComponent.drawer.close();
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
      this.DetailQuanlyqrcode.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }