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
import { ListCourseComponent } from '../listcourse/listcourse.component';
import { CourseService } from '../course.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailcourse',
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
    templateUrl: './detailcourse.component.html',
    styleUrl: './detailcourse.component.scss'
  })
  export class DetailCourseComponent {
    _ListCourseComponent:ListCourseComponent = inject(ListCourseComponent)
    _CourseService:CourseService = inject(CourseService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._CourseService.setCourseId(id);
      });
  
      effect(async () => {
        const id = this._CourseService.courseId();
        if (!id){
          this._router.navigate(['/admin/course']);
          this._ListCourseComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailCourse.set({});
          this._ListCourseComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/course', "new"]);
        }
        else{
            await this._CourseService.getCourseBy({id:id,isOne:true});
            this._ListCourseComponent.drawer.open();
            this._router.navigate(['/admin/course', id]);
        }
      });
    }
    DetailCourse: any = this._CourseService.DetailCourse;
    isEdit = signal(false);
    isDelete = signal(false);  
    courseId:any = this._CourseService.courseId
    async ngOnInit() {       
    }
    async handleCourseAction() {
      if (this.courseId() === 'new') {
        await this.createCourse();
      }
      else {
        await this.updateCourse();
      }
    }
    private async createCourse() {
      try {
        await this._CourseService.CreateCourse(this.DetailCourse());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo course:', error);
      }
    }

    private async updateCourse() {
      try {
        await this._CourseService.updateCourse(this.DetailCourse());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật course:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._CourseService.DeleteCourse(this.DetailCourse());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/course']);
      } catch (error) {
        console.error('Lỗi khi xóa course:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/course'])
      this._ListCourseComponent.drawer.close();
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
      this.DetailCourse.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }