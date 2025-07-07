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
import { ListQuanlydriveComponent } from '../listquanlydrive/listquanlydrive.component';
import { QuanlydriveService } from '../quanlydrive.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailquanlydrive',
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
    templateUrl: './detailquanlydrive.component.html',
    styleUrl: './detailquanlydrive.component.scss'
  })
  export class DetailQuanlydriveComponent {
    _ListquanlydriveComponent:ListQuanlydriveComponent = inject(ListQuanlydriveComponent)
    _QuanlydriveService:QuanlydriveService = inject(QuanlydriveService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._QuanlydriveService.setQuanlydriveId(id);
      });
  
      effect(async () => {
        const id = this._QuanlydriveService.quanlydriveId();
        if (!id){
          this._router.navigate(['/admin/quanlydrive']);
          this._ListquanlydriveComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailQuanlydrive.set({});
          this._ListquanlydriveComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/quanlydrive', "new"]);
        }
        else{
            await this._QuanlydriveService.getQuanlydriveBy({id:id});
            this._ListquanlydriveComponent.drawer.open();
            this._router.navigate(['/admin/quanlydrive', id]);
        }
      });
    }
    DetailQuanlydrive: any = this._QuanlydriveService.DetailQuanlydrive;
    isEdit = signal(false);
    isDelete = signal(false);  
    quanlydriveId:any = this._QuanlydriveService.quanlydriveId
    async ngOnInit() {       
    }
    async handleQuanlydriveAction() {
      if (this.quanlydriveId() === 'new') {
        await this.createQuanlydrive();
      }
      else {
        await this.updateQuanlydrive();
      }
    }
    private async createQuanlydrive() {
      try {
        await this._QuanlydriveService.CreateQuanlydrive(this.DetailQuanlydrive());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo quanlydrive:', error);
      }
    }

    private async updateQuanlydrive() {
      try {
        await this._QuanlydriveService.updateQuanlydrive(this.DetailQuanlydrive());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật quanlydrive:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._QuanlydriveService.DeleteQuanlydrive(this.DetailQuanlydrive());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/quanlydrive']);
      } catch (error) {
        console.error('Lỗi khi xóa quanlydrive:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/quanlydrive'])
      this._ListquanlydriveComponent.drawer.close();
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
      this.DetailQuanlydrive.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }