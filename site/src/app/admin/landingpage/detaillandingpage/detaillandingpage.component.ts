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
import { ListLandingpageComponent } from '../listlandingpage/listlandingpage.component';
import { LandingpageService } from '../landingpage.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { EditorComponent } from '../editor/editor.component';
  @Component({
    selector: 'app-detaillandingpage',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule,
      EditorComponent
    ],
    templateUrl: './detaillandingpage.component.html',
    styleUrl: './detaillandingpage.component.scss'
  })
  export class DetailLandingpageComponent {
    _ListlandingpageComponent:ListLandingpageComponent = inject(ListLandingpageComponent)
    _LandingpageService:LandingpageService = inject(LandingpageService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._LandingpageService.setLandingpageId(id);
      });
  
      effect(async () => {
        const id = this._LandingpageService.landingpageId();
        if (!id){
          this._router.navigate(['/admin/landingpage']);
          this._ListlandingpageComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailLandingpage.set({});
          this._ListlandingpageComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/landingpage', "new"]);
        }
        else{
            await this._LandingpageService.getLandingpageBy({id:id});
            this._ListlandingpageComponent.drawer.open();
            this._router.navigate(['/admin/landingpage', id]);
        }
      });
    }
    DetailLandingpage: any = this._LandingpageService.DetailLandingpage;
    isEdit = signal(false);
    isDelete = signal(false);  
    landingpageId:any = this._LandingpageService.landingpageId
    async ngOnInit() {       
    }
    async handleLandingpageAction() {
      if (this.landingpageId() === 'new') {
        await this.createLandingpage();
      }
      else {
        await this.updateLandingpage();
      }
    }
    private async createLandingpage() {
      try {
        await this._LandingpageService.CreateLandingpage(this.DetailLandingpage());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo landingpage:', error);
      }
    }

    private async updateLandingpage() {
      try {
        await this._LandingpageService.updateLandingpage(this.DetailLandingpage());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật landingpage:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._LandingpageService.DeleteLandingpage(this.DetailLandingpage());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/landingpage']);
      } catch (error) {
        console.error('Lỗi khi xóa landingpage:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/landingpage'])
      this._ListlandingpageComponent.drawer.close();
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
      this.DetailLandingpage.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }