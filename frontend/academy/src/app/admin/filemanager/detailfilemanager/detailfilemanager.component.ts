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
import { ListFilemanagerComponent } from '../listfilemanager/listfilemanager.component';
import { FilemanagerService } from '../filemanager.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailfilemanager',
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
    templateUrl: './detailfilemanager.component.html',
    styleUrl: './detailfilemanager.component.scss'
  })
  export class DetailFilemanagerComponent {
    _ListFilemanagerComponent:ListFilemanagerComponent = inject(ListFilemanagerComponent)
    _FilemanagerService:FilemanagerService = inject(FilemanagerService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._FilemanagerService.setFilemanagerId(id);
      });
  
      effect(async () => {
        const id = this._FilemanagerService.filemanagerId();
        if (!id){
          this._router.navigate(['/admin/filemanager']);
          this._ListFilemanagerComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailFilemanager.set({});
          this._ListFilemanagerComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/filemanager', "new"]);
        }
        else{
            await this._FilemanagerService.getFilemanagerBy({id:id,isOne:true});
            this._ListFilemanagerComponent.drawer.open();
            this._router.navigate(['/admin/filemanager', id]);
        }
      });
    }
    DetailFilemanager: any = this._FilemanagerService.DetailFilemanager;
    isEdit = signal(false);
    isDelete = signal(false);  
    filemanagerId:any = this._FilemanagerService.filemanagerId
    async ngOnInit() {       
    }
    async handleFilemanagerAction() {
      if (this.filemanagerId() === 'new') {
        await this.createFilemanager();
      }
      else {
        await this.updateFilemanager();
      }
    }
    private async createFilemanager() {
      try {
        await this._FilemanagerService.CreateFilemanager(this.DetailFilemanager());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo filemanager:', error);
      }
    }

    private async updateFilemanager() {
      try {
        await this._FilemanagerService.updateFilemanager(this.DetailFilemanager());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật filemanager:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._FilemanagerService.DeleteFilemanager(this.DetailFilemanager());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/filemanager']);
      } catch (error) {
        console.error('Lỗi khi xóa filemanager:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/filemanager'])
      this._ListFilemanagerComponent.drawer.close();
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
      this.DetailFilemanager.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }