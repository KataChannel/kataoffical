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

import { ListGooglesheetComponent } from '../listgooglesheet/listgooglesheet.component';
import { GooglesheetService } from '../googlesheet.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailgooglesheet',
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
    templateUrl: './detailgooglesheet.component.html',
    styleUrl: './detailgooglesheet.component.scss'
  })
  export class DetailGooglesheetComponent {
    _ListgooglesheetComponent:ListGooglesheetComponent = inject(ListGooglesheetComponent)
    _GooglesheetService:GooglesheetService = inject(GooglesheetService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._GooglesheetService.setGooglesheetId(id);
      });
  
      effect(async () => {
        const id = this._GooglesheetService.googlesheetId();
        if (!id){
          this._router.navigate(['/admin/googlesheet']);
          this._ListgooglesheetComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailGooglesheet.set({});
          this._ListgooglesheetComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/googlesheet', "new"]);
        }
        else{
            await this._GooglesheetService.getGooglesheetBy({id:id});
            this._ListgooglesheetComponent.drawer.open();
            this._router.navigate(['/admin/googlesheet', id]);
        }
      });
    }
    DetailGooglesheet: any = this._GooglesheetService.DetailGooglesheet;
    isEdit = signal(false);
    isDelete = signal(false);  
    googlesheetId:any = this._GooglesheetService.googlesheetId
    async ngOnInit() {       
    }
    async handleGooglesheetAction() {
      if (this.googlesheetId() === 'new') {
        await this.createGooglesheet();
      }
      else {
        await this.updateGooglesheet();
      }
    }
    private async createGooglesheet() {
      try {
        await this._GooglesheetService.CreateGooglesheet(this.DetailGooglesheet());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo googlesheet:', error);
      }
    }

    private async updateGooglesheet() {
      try {
        await this._GooglesheetService.updateGooglesheet(this.DetailGooglesheet());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật googlesheet:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._GooglesheetService.DeleteGooglesheet(this.DetailGooglesheet());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/googlesheet']);
      } catch (error) {
        console.error('Lỗi khi xóa googlesheet:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/googlesheet'])
      this._ListgooglesheetComponent.drawer.close();
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
      this.DetailGooglesheet.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }