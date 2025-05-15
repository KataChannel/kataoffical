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
import { ListHoadonComponent } from '../listhoadon/listhoadon.component';
import { HoadonService } from '../hoadon.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailhoadon',
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
    templateUrl: './detailhoadon.component.html',
    styleUrl: './detailhoadon.component.scss'
  })
  export class DetailHoadonComponent {
    _ListHoadonComponent:ListHoadonComponent = inject(ListHoadonComponent)
    _HoadonService:HoadonService = inject(HoadonService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._HoadonService.setHoadonId(id);
      });
  
      effect(async () => {
        const id = this._HoadonService.hoadonId();
        if (!id){
          this._router.navigate(['/admin/hoadon']);
          this._ListHoadonComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailHoadon.set({});
          this._ListHoadonComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/hoadon', "new"]);
        }
        else{
            await this._HoadonService.getHoadonBy({id:id,isOne:true});
            this._ListHoadonComponent.drawer.open();
            this._router.navigate(['/admin/hoadon', id]);
        }
      });
    }
    DetailHoadon: any = this._HoadonService.DetailHoadon;
    isEdit = signal(false);
    isDelete = signal(false);  
    hoadonId:any = this._HoadonService.hoadonId
    async ngOnInit() {       
    }
    async handleHoadonAction() {
      if (this.hoadonId() === 'new') {
        await this.createHoadon();
      }
      else {
        await this.updateHoadon();
      }
    }
    private async createHoadon() {
      try {
        await this._HoadonService.CreateHoadon(this.DetailHoadon());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo hoadon:', error);
      }
    }

    private async updateHoadon() {
      try {
        await this._HoadonService.updateHoadon(this.DetailHoadon());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật hoadon:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._HoadonService.DeleteHoadon(this.DetailHoadon());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/hoadon']);
      } catch (error) {
        console.error('Lỗi khi xóa hoadon:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/hoadon'])
      this._ListHoadonComponent.drawer.close();
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
      this.DetailHoadon.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }