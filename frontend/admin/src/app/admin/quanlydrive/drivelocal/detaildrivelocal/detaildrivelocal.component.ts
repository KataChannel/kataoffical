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
import { ListDrivelocalComponent } from '../listdrivelocal/listdrivelocal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';
import { QuanlydriveService } from '../../quanlydrive.service';

  @Component({
    selector: 'app-detaildrivelocal',
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
    templateUrl: './detaildrivelocal.component.html',
    styleUrl: './detaildrivelocal.component.scss'
  })
  export class DetailDrivelocalComponent {
    _ListDrivelocalComponent:ListDrivelocalComponent = inject(ListDrivelocalComponent)
    _DrivelocalService:QuanlydriveService = inject(QuanlydriveService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DrivelocalService.setQuanlydriveId(id);
      });
  
      effect(async () => {
        const id = this._DrivelocalService.quanlydriveId();
        if (!id){
          this._router.navigate(['/admin/drivelocal']);
          this._ListDrivelocalComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDrivelocal.set({});
          this._ListDrivelocalComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/drivelocal', "new"]);
        }
        else{
            await this._DrivelocalService.getQuanlydriveBy({id:id});
            this._ListDrivelocalComponent.drawer.open();
            this._router.navigate(['/admin/drivelocal', id]);
        }
      });
    }
    DetailDrivelocal: any = this._DrivelocalService.DetailQuanlydrive;
    isEdit = signal(false);
    isDelete = signal(false);  
    drivelocalId:any = this._DrivelocalService.quanlydriveId
    async ngOnInit() {       
    }
    async handleDrivelocalAction() {
      if (this.drivelocalId() === 'new') {
        await this.createDrivelocal();
      }
      else {
        await this.updateDrivelocal();
      }
    }
    private async createDrivelocal() {

    }

    private async updateDrivelocal() {
      try {
        await this._DrivelocalService.updateQuanlydrive(this.DetailDrivelocal());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật drivelocal:', error);
      }
    }
    async DeleteData()
    {

    }
    goBack(){
      this._router.navigate(['/admin/drivelocal'])
      this._ListDrivelocalComponent.drawer.close();
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
      this.DetailDrivelocal.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }