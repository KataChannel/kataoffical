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
import { ListTrackingeventComponent } from '../listtrackingevent/listtrackingevent.component';
import { TrackingeventService } from '../trackingevent.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailtrackingevent',
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
    templateUrl: './detailtrackingevent.component.html',
    styleUrl: './detailtrackingevent.component.scss'
  })
  export class DetailTrackingeventComponent {
    _ListTrackingeventComponent:ListTrackingeventComponent = inject(ListTrackingeventComponent)
    _TrackingeventService:TrackingeventService = inject(TrackingeventService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._TrackingeventService.setTrackingeventId(id);
      });
  
      effect(async () => {
        const id = this._TrackingeventService.trackingeventId();
        if (!id){
          this._router.navigate(['/admin/trackingevent']);
          this._ListTrackingeventComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailTrackingevent.set({});
          this._ListTrackingeventComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/trackingevent', "new"]);
        }
        else{
            await this._TrackingeventService.getTrackingeventBy({id:id});
            this._ListTrackingeventComponent.drawer.open();
            this._router.navigate(['/admin/trackingevent', id]);
        }
      });
    }
    DetailTrackingevent: any = this._TrackingeventService.DetailTrackingevent;
    isEdit = signal(false);
    isDelete = signal(false);  
    trackingeventId:any = this._TrackingeventService.trackingeventId
    async ngOnInit() {       
    }
    async handleTrackingeventAction() {
      if (this.trackingeventId() === 'new') {
        await this.createTrackingevent();
      }
      else {
        await this.updateTrackingevent();
      }
    }
    private async createTrackingevent() {
      try {
        await this._TrackingeventService.CreateTrackingevent(this.DetailTrackingevent());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo trackingevent:', error);
      }
    }

    private async updateTrackingevent() {
      try {
        await this._TrackingeventService.updateTrackingevent(this.DetailTrackingevent());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật trackingevent:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._TrackingeventService.DeleteTrackingevent(this.DetailTrackingevent());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/trackingevent']);
      } catch (error) {
        console.error('Lỗi khi xóa trackingevent:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/trackingevent'])
      this._ListTrackingeventComponent.drawer.close();
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
      this.DetailTrackingevent.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }