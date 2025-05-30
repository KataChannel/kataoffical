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
import { ListDoanhsoComponent } from '../listdoanhso/listdoanhso.component';
import { DoanhsoService } from '../doanhso.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detaildoanhso',
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
    templateUrl: './detaildoanhso.component.html',
    styleUrl: './detaildoanhso.component.scss'
  })
  export class DetailDoanhsoComponent {
    _ListDoanhsoComponent:ListDoanhsoComponent = inject(ListDoanhsoComponent)
    _DoanhsoService:DoanhsoService = inject(DoanhsoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DoanhsoService.setDoanhsoId(id);
      });
  
      effect(async () => {
        const id = this._DoanhsoService.doanhsoId();
        if (!id){
          this._router.navigate(['/admin/doanhso']);
          this._ListDoanhsoComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDoanhso.set({});
          this._ListDoanhsoComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/doanhso', "new"]);
        }
        else{
            await this._DoanhsoService.getDoanhsoBy({id:id,isOne:true});
            this._ListDoanhsoComponent.drawer.open();
            this._router.navigate(['/admin/doanhso', id]);
        }
      });
    }
    DetailDoanhso: any = this._DoanhsoService.DetailDoanhso;
    isEdit = signal(false);
    isDelete = signal(false);  
    doanhsoId:any = this._DoanhsoService.doanhsoId
    async ngOnInit() {       
    }
    async handleDoanhsoAction() {
      if (this.doanhsoId() === 'new') {
        await this.createDoanhso();
      }
      else {
        await this.updateDoanhso();
      }
    }
    private async createDoanhso() {
      try {
        await this._DoanhsoService.CreateDoanhso(this.DetailDoanhso());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo doanhso:', error);
      }
    }

    private async updateDoanhso() {
      try {
        await this._DoanhsoService.updateDoanhso(this.DetailDoanhso());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật doanhso:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DoanhsoService.DeleteDoanhso(this.DetailDoanhso());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/doanhso']);
      } catch (error) {
        console.error('Lỗi khi xóa doanhso:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/doanhso'])
      this._ListDoanhsoComponent.drawer.close();
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
      this.DetailDoanhso.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }