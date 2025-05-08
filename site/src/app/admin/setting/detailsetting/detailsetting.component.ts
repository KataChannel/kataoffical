import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
import { ListSettingComponent } from '../listsetting/listsetting.component';
import { SettingService } from '../setting.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailsetting',
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
    templateUrl: './detailsetting.component.html',
    styleUrls: ['./detailsetting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class DetailSettingComponent {
    _ListSettingComponent:ListSettingComponent = inject(ListSettingComponent)
    _SettingService:SettingService = inject(SettingService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe(async (params) => {
        const id = params.get('id');
        const Detail = await this._SettingService.getSettingBy({id:id});
        this.DetailSetting.set(Detail[0]);  
      });
  
      effect(async () => {
        const id = this._SettingService.settingId();
        if (!id){
          this._router.navigate(['/admin/setting']);
          this._ListSettingComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailSetting.set({});
          this._ListSettingComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/setting', "new"]);
        }
        else{
           const Detail = await this._SettingService.getSettingBy({id:id});
           this.DetailSetting.set(Detail[0]); 
            this._ListSettingComponent.drawer.open();
            this._router.navigate(['/admin/setting', id]);
        }
      });
    }
    DetailSetting: any =  signal<any>({});
    isEdit = signal(false);
    isDelete = signal(false);  
    settingId:any = this._SettingService.settingId
    async handleSettingAction() {
      if (this.settingId() === 'new') {
        await this.createSetting();
      }
      else {
        await this.updateSetting();
      }
    }
    private async createSetting() {
      try {
        await this._SettingService.CreateSetting(this.DetailSetting());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo setting:', error);
      }
    }

    private async updateSetting() {
      try {
        await this._SettingService.updateSetting(this.DetailSetting());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật setting:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._SettingService.DeleteSetting(this.DetailSetting());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/setting']);
      } catch (error) {
        console.error('Lỗi khi xóa setting:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/setting'])
      this._ListSettingComponent.drawer.close();
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
      this.DetailSetting.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }