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
import { ListLichhenComponent } from '../listlichhen/listlichhen';
import { LichhenService } from '../lichhen.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detaillichhen',
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
    templateUrl: './detaillichhen.html',
    styleUrl: './detaillichhen.scss'
  })
  export class DetailLichhenComponent {
    _ListLichhenComponent:ListLichhenComponent = inject(ListLichhenComponent)
    _LichhenService:LichhenService = inject(LichhenService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._LichhenService.setLichhenId(id);
      });
  
      effect(async () => {
        const id = this._LichhenService.lichhenId();
        if (!id){
          this._router.navigate(['/admin/lichhen']);
          this._ListLichhenComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailLichhen.set({});
          this._ListLichhenComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/lichhen', "new"]);
        }
        else{
            await this._LichhenService.getLichhenBy({id:id,isOne:true});
            this._ListLichhenComponent.drawer.open();
            this._router.navigate(['/admin/lichhen', id]);
        }
      });
    }
    DetailLichhen: any = this._LichhenService.DetailLichhen;
    isEdit = signal(false);
    isDelete = signal(false);  
    lichhenId:any = this._LichhenService.lichhenId
    async ngOnInit() {       
    }
    async handleLichhenAction() {
      if (this.lichhenId() === 'new') {
        await this.createLichhen();
      }
      else {
        await this.updateLichhen();
      }
    }
    private async createLichhen() {
      try {
        await this._LichhenService.CreateLichhen(this.DetailLichhen());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo lichhen:', error);
      }
    }

    private async updateLichhen() {
      try {
        await this._LichhenService.updateLichhen(this.DetailLichhen());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật lichhen:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._LichhenService.DeleteLichhen(this.DetailLichhen());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/lichhen']);
      } catch (error) {
        console.error('Lỗi khi xóa lichhen:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/lichhen'])
      this._ListLichhenComponent.drawer.close();
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
      this.DetailLichhen.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }