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
import { ListQuanlyctvComponent } from '../listquanlyctv/listquanlyctv.component';
import { QuanlyctvService } from '../quanlyctv.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailquanlyctv',
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
    templateUrl: './detailquanlyctv.component.html',
    styleUrl: './detailquanlyctv.component.scss'
  })
  export class DetailQuanlyctvComponent {
    _ListQuanlyctvComponent:ListQuanlyctvComponent = inject(ListQuanlyctvComponent)
    _QuanlyctvService:QuanlyctvService = inject(QuanlyctvService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
         this._QuanlyctvService.setQuanlyctvId(id);
      });
  
      effect(async () => {
        const id = this._QuanlyctvService.quanlyctvId();
        if (!id){
          this._router.navigate(['/admin/quanlyctv']);
          this._ListQuanlyctvComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailQuanlyctv.set({});
          this._ListQuanlyctvComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/quanlyctv', "new"]);
        }
        else{
            await this._QuanlyctvService.getQuanlyctvBy({id:id});
            this._ListQuanlyctvComponent.drawer.open();
            this._router.navigate(['/admin/quanlyctv', id]);
        }
      });
    }
    DetailQuanlyctv: any = this._QuanlyctvService.DetailQuanlyctv;
    isEdit = signal(false);
    isDelete = signal(false);  
    quanlyctvId:any = this._QuanlyctvService.quanlyctvId
    async ngOnInit() {  
       await this._QuanlyctvService.getQuanlyctvBy({id:this.quanlyctvId()});            
    }
    async handleQuanlyctvAction() {
      if (this.quanlyctvId() === 'new') {
        await this.createQuanlyctv();
      }
      else {
        await this.updateQuanlyctv();
      }
    }
    private async createQuanlyctv() {
      try {
        await this._QuanlyctvService.CreateQuanlyctv(this.DetailQuanlyctv());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo quanlyctv:', error);
      }
    }

    private async updateQuanlyctv() {
      try {
        await this._QuanlyctvService.updateQuanlyctv(this.DetailQuanlyctv());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật quanlyctv:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._QuanlyctvService.DeleteQuanlyctv(this.DetailQuanlyctv());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/quanlyctv']);
      } catch (error) {
        console.error('Lỗi khi xóa quanlyctv:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/quanlyctv'])
      this._ListQuanlyctvComponent.drawer.close();
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
      this.DetailQuanlyctv.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }