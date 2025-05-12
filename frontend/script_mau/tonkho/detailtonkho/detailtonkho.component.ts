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
import { ListTonkhoComponent } from '../listtonkho/listtonkho.component';
import { TonkhoService } from '../tonkho.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailtonkho',
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
    templateUrl: './detailtonkho.component.html',
    styleUrl: './detailtonkho.component.scss'
  })
  export class DetailTonkhoComponent {
    _ListTonkhoComponent:ListTonkhoComponent = inject(ListTonkhoComponent)
    _TonkhoService:TonkhoService = inject(TonkhoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._TonkhoService.setTonkhoId(id);
      });
  
      effect(async () => {
        const id = this._TonkhoService.tonkhoId();
        if (!id){
          this._router.navigate(['/admin/tonkho']);
          this._ListTonkhoComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailTonkho.set({});
          this._ListTonkhoComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/tonkho', "new"]);
        }
        else{
            await this._TonkhoService.getTonkhoBy({id:id});
            this._ListTonkhoComponent.drawer.open();
            this._router.navigate(['/admin/tonkho', id]);
        }
      });
    }
    DetailTonkho: any = this._TonkhoService.DetailTonkho;
    isEdit = signal(false);
    isDelete = signal(false);  
    tonkhoId:any = this._TonkhoService.tonkhoId
    async ngOnInit() {       
    }
    async handleTonkhoAction() {
      if (this.tonkhoId() === 'new') {
        await this.createTonkho();
      }
      else {
        await this.updateTonkho();
      }
    }
    private async createTonkho() {
      try {
        await this._TonkhoService.CreateTonkho(this.DetailTonkho());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo tonkho:', error);
      }
    }

    private async updateTonkho() {
      try {
        await this._TonkhoService.updateTonkho(this.DetailTonkho());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật tonkho:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._TonkhoService.DeleteTonkho(this.DetailTonkho());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/tonkho']);
      } catch (error) {
        console.error('Lỗi khi xóa tonkho:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/tonkho'])
      this._ListTonkhoComponent.drawer.close();
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
      this.DetailTonkho.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }