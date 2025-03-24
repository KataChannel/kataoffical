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
import { ListLeadComponent } from '../listlead/listlead.component';
import { LeadService } from '../lead.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detaillead',
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
    templateUrl: './detaillead.component.html',
    styleUrl: './detaillead.component.scss'
  })
  export class DetailLeadComponent {
    _ListleadComponent:ListLeadComponent = inject(ListLeadComponent)
    _LeadService:LeadService = inject(LeadService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._LeadService.setLeadId(id);
      });
  
      effect(async () => {
        const id = this._LeadService.leadId();
        if (!id){
          this._router.navigate(['/admin/lead']);
          this._ListleadComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailLead.set({});
          this._ListleadComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/lead', "new"]);
        }
        else{
            await this._LeadService.getLeadBy({id:id});
            this._ListleadComponent.drawer.open();
            this._router.navigate(['/admin/lead', id]);
        }
      });
    }
    DetailLead: any = this._LeadService.DetailLead;
    isEdit = signal(false);
    isDelete = signal(false);  
    leadId:any = this._LeadService.leadId
    async ngOnInit() {       
    }
    async handleLeadAction() {
      if (this.leadId() === 'new') {
        await this.createLead();
      }
      else {
        await this.updateLead();
      }
    }
    private async createLead() {
      try {
        await this._LeadService.CreateLead(this.DetailLead());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo lead:', error);
      }
    }

    private async updateLead() {
      try {
        await this._LeadService.updateLead(this.DetailLead());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật lead:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._LeadService.DeleteLead(this.DetailLead());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/lead']);
      } catch (error) {
        console.error('Lỗi khi xóa lead:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/lead'])
      this._ListleadComponent.drawer.close();
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
      this.DetailLead.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }