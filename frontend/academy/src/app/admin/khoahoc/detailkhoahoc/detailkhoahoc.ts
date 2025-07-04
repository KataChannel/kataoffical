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
import { ListKhoahocComponent } from '../listkhoahoc/listkhoahoc';
import { KhoahocService } from '../khoahoc.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailkhoahoc',
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
    templateUrl: './detailkhoahoc.html',
    styleUrl: './detailkhoahoc.scss'
  })
  export class DetailKhoahocComponent {
    _ListKhoahocComponent:ListKhoahocComponent = inject(ListKhoahocComponent)
    _KhoahocService:KhoahocService = inject(KhoahocService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._KhoahocService.setKhoahocId(id);
      });
  
      effect(async () => {
        const id = this._KhoahocService.khoahocId();
        if (!id){
          this._router.navigate(['/admin/khoahoc']);
          this._ListKhoahocComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailKhoahoc.set({});
          this._ListKhoahocComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/khoahoc', "new"]);
        }
        else{
            await this._KhoahocService.getKhoahocBy({id:id,isOne:true});
            this._ListKhoahocComponent.drawer.open();
            this._router.navigate(['/admin/khoahoc', id]);
        }
      });
    }
    DetailKhoahoc: any = this._KhoahocService.DetailKhoahoc;
    isEdit = signal(false);
    isDelete = signal(false);  
    khoahocId:any = this._KhoahocService.khoahocId
    async ngOnInit() {       
    }
    async handleKhoahocAction() {
      if (this.khoahocId() === 'new') {
        await this.createKhoahoc();
      }
      else {
        await this.updateKhoahoc();
      }
    }
    private async createKhoahoc() {
      try {
        await this._KhoahocService.CreateKhoahoc(this.DetailKhoahoc());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo khoahoc:', error);
      }
    }

    private async updateKhoahoc() {
      try {
        await this._KhoahocService.updateKhoahoc(this.DetailKhoahoc());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật khoahoc:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._KhoahocService.DeleteKhoahoc(this.DetailKhoahoc());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/khoahoc']);
      } catch (error) {
        console.error('Lỗi khi xóa khoahoc:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/khoahoc'])
      this._ListKhoahocComponent.drawer.close();
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
      this.DetailKhoahoc.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }