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
import { ListHoahongctvComponent } from '../listhoahongctv/listhoahongctv';
import { HoahongctvService } from '../hoahongctv.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailhoahongctv',
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
    templateUrl: './detailhoahongctv.html',
    styleUrl: './detailhoahongctv.scss'
  })
  export class DetailHoahongctvComponent {
    _ListHoahongctvComponent:ListHoahongctvComponent = inject(ListHoahongctvComponent)
    _HoahongctvService:HoahongctvService = inject(HoahongctvService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._HoahongctvService.setHoahongctvId(id);
      });
  
      effect(async () => {
        const id = this._HoahongctvService.hoahongctvId();
        if (!id){
          this._router.navigate(['/admin/hoahongctv']);
          this._ListHoahongctvComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailHoahongctv.set({});
          this._ListHoahongctvComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/hoahongctv', "new"]);
        }
        else{
            await this._HoahongctvService.getHoahongctvBy({id:id,isOne:true});
            this._ListHoahongctvComponent.drawer.open();
            this._router.navigate(['/admin/hoahongctv', id]);
        }
      });
    }
    DetailHoahongctv: any = this._HoahongctvService.DetailHoahongctv;
    isEdit = signal(false);
    isDelete = signal(false);  
    hoahongctvId:any = this._HoahongctvService.hoahongctvId
    async ngOnInit() {       
    }
    async handleHoahongctvAction() {
      if (this.hoahongctvId() === 'new') {
        await this.createHoahongctv();
      }
      else {
        await this.updateHoahongctv();
      }
    }
    private async createHoahongctv() {
      try {
        await this._HoahongctvService.CreateHoahongctv(this.DetailHoahongctv());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo hoahongctv:', error);
      }
    }

    private async updateHoahongctv() {
      try {
        await this._HoahongctvService.updateHoahongctv(this.DetailHoahongctv());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật hoahongctv:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._HoahongctvService.DeleteHoahongctv(this.DetailHoahongctv());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/hoahongctv']);
      } catch (error) {
        console.error('Lỗi khi xóa hoahongctv:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/hoahongctv'])
      this._ListHoahongctvComponent.drawer.close();
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
      this.DetailHoahongctv.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }