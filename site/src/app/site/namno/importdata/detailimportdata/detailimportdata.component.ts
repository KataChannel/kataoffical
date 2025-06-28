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

import { ListImportdataComponent } from '../listimportdata/listimportdata.component';
import { ImportdataService } from '../importdata.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailimportdata',
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
    templateUrl: './detailimportdata.component.html',
    styleUrl: './detailimportdata.component.scss'
  })
  export class DetailImportdataComponent {
    _ListImportdataComponent:ListImportdataComponent = inject(ListImportdataComponent)
    _ImportdataService:ImportdataService = inject(ImportdataService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._ImportdataService.setImportdataId(id);
      });
  
      effect(async () => {
        const id = this._ImportdataService.importdataId();
        if (!id){
          this._router.navigate(['/admin/importdata']);
          this._ListImportdataComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailImportdata.set({});
          this._ListImportdataComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/importdata', "new"]);
        }
        else{
            await this._ImportdataService.getImportdataBy({id:id,isOne:true});
            this._ListImportdataComponent.drawer.open();
            this._router.navigate(['/admin/importdata', id]);
        }
      });
    }
    DetailImportdata: any = this._ImportdataService.DetailImportdata;
    isEdit = signal(false);
    isDelete = signal(false);  
    importdataId:any = this._ImportdataService.importdataId
    async ngOnInit() {       
    }
    async handleImportdataAction() {
      if (this.importdataId() === 'new') {
        await this.createImportdata();
      }
      else {
        await this.updateImportdata();
      }
    }
    private async createImportdata() {
      try {
        await this._ImportdataService.CreateImportdata(this.DetailImportdata());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo importdata:', error);
      }
    }

    private async updateImportdata() {
      try {
        await this._ImportdataService.updateImportdata(this.DetailImportdata());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật importdata:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._ImportdataService.DeleteImportdata(this.DetailImportdata());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/importdata']);
      } catch (error) {
        console.error('Lỗi khi xóa importdata:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/importdata'])
      this._ListImportdataComponent.drawer.close();
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
      this.DetailImportdata.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }