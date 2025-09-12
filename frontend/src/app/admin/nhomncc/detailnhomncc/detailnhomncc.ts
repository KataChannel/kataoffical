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
import { ListNhomnccComponent } from '../listnhomncc/listnhomncc';
import { NhomnccService } from '../nhomncc.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailnhomncc',
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
    templateUrl: './detailnhomncc.html',
    styleUrl: './detailnhomncc.scss'
  })
  export class DetailNhomnccComponent {
    _ListNhomnccComponent:ListNhomnccComponent = inject(ListNhomnccComponent)
    _NhomnccService:NhomnccService = inject(NhomnccService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._NhomnccService.setNhomnccId(id);
      });
  
      effect(async () => {
        const id = this._NhomnccService.nhomnccId();
        if (!id){
          this._router.navigate(['/admin/nhomncc']);
          this._ListNhomnccComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailNhomncc.set({});
          this._ListNhomnccComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/nhomncc', "new"]);
        }
        else{
            await this._NhomnccService.getNhomnccBy({id:id,isOne:true});
            this._ListNhomnccComponent.drawer.open();
            this._router.navigate(['/admin/nhomncc', id]);
        }
      });
    }
    DetailNhomncc: any = this._NhomnccService.DetailNhomncc;
    isEdit = signal(false);
    isDelete = signal(false);  
    nhomnccId:any = this._NhomnccService.nhomnccId
    async ngOnInit() {       
    }
    async handleNhomnccAction() {
      if (this.nhomnccId() === 'new') {
        await this.createNhomncc();
      }
      else {
        await this.updateNhomncc();
      }
    }
    private async createNhomncc() {
      try {
        await this._NhomnccService.CreateNhomncc(this.DetailNhomncc());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo nhomncc:', error);
      }
    }

    private async updateNhomncc() {
      try {
        await this._NhomnccService.updateNhomncc(this.DetailNhomncc());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật nhomncc:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._NhomnccService.DeleteNhomncc(this.DetailNhomncc());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/nhomncc']);
      } catch (error) {
        console.error('Lỗi khi xóa nhomncc:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/nhomncc'])
      this._ListNhomnccComponent.drawer.close();
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
      this.DetailNhomncc.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }