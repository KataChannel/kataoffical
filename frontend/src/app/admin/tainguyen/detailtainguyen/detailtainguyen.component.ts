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
import { ListTainguyenComponent } from '../listtainguyen/listtainguyen.component';
import { TainguyenService } from '../tainguyen.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailtainguyen',
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
    templateUrl: './detailtainguyen.component.html',
    styleUrl: './detailtainguyen.component.scss'
  })
  export class DetailTainguyenComponent {
    _ListTainguyenComponent:ListTainguyenComponent = inject(ListTainguyenComponent)
    _TainguyenService:TainguyenService = inject(TainguyenService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._TainguyenService.setTainguyenId(id);
      });
  
      effect(async () => {
        const id = this._TainguyenService.tainguyenId();
        if (!id){
          this._router.navigate(['/admin/tainguyen']);
          this._ListTainguyenComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailTainguyen.set({});
          this._ListTainguyenComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/tainguyen', "new"]);
        }
        else{
            await this._TainguyenService.getTainguyenBy({id:id});
            this._ListTainguyenComponent.drawer.open();
            this._router.navigate(['/admin/tainguyen', id]);
        }
      });
    }
    DetailTainguyen: any = this._TainguyenService.DetailTainguyen;
    isEdit = signal(false);
    isDelete = signal(false);  
    tainguyenId:any = this._TainguyenService.tainguyenId
    async ngOnInit() {       
    }
    async handleTainguyenAction() {
      if (this.tainguyenId() === 'new') {
        await this.createTainguyen();
      }
      else {
        await this.updateTainguyen();
      }
    }
    private async createTainguyen() {
      try {
        await this._TainguyenService.CreateTainguyen(this.DetailTainguyen());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo tainguyen:', error);
      }
    }

    private async updateTainguyen() {
      try {
        await this._TainguyenService.updateTainguyen(this.DetailTainguyen());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật tainguyen:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._TainguyenService.DeleteTainguyen(this.DetailTainguyen());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/tainguyen']);
      } catch (error) {
        console.error('Lỗi khi xóa tainguyen:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/tainguyen'])
      this._ListTainguyenComponent.drawer.close();
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
      this.DetailTainguyen.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }