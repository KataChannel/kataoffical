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
import { ListTaskComponent } from '../listtask/listtask.component';
import { TaskService } from '../task.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailtask',
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
    templateUrl: './detailtask.component.html',
    styleUrl: './detailtask.component.scss'
  })
  export class DetailTaskComponent {
    _ListtaskComponent:ListTaskComponent = inject(ListTaskComponent)
    _TaskService:TaskService = inject(TaskService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._TaskService.setTaskId(id);
      });
  
      effect(async () => {
        const id = this._TaskService.taskId();
        if (!id){
          this._router.navigate(['/admin/task']);
          this._ListtaskComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailTask.set({});
          this._ListtaskComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/task', "new"]);
        }
        else{
            await this._TaskService.getTaskBy({id:id});
            this._ListtaskComponent.drawer.open();
            this._router.navigate(['/admin/task', id]);
        }
      });
    }
    DetailTask: any = this._TaskService.DetailTask;
    isEdit = signal(false);
    isDelete = signal(false);  
    taskId:any = this._TaskService.taskId
    async ngOnInit() {       
    }
    async handleTaskAction() {
      if (this.taskId() === 'new') {
        await this.createTask();
      }
      else {
        await this.updateTask();
      }
    }
    private async createTask() {
      try {
        await this._TaskService.CreateTask(this.DetailTask());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo task:', error);
      }
    }

    private async updateTask() {
      try {
        await this._TaskService.updateTask(this.DetailTask());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật task:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._TaskService.DeleteTask(this.DetailTask());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/task']);
      } catch (error) {
        console.error('Lỗi khi xóa task:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/task'])
      this._ListtaskComponent.drawer.close();
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
      this.DetailTask.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }