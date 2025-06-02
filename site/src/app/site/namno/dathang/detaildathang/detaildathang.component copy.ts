// import { Component, effect, inject, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { ActivatedRoute, Route, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatDialogModule } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { ListDathangComponent } from '../listdathang/listdathang.component';
// import { DathangService } from '../dathang.service';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import { GenId, convertToSlug } from '../../../../shared/utils/shared.utils';
//   @Component({
//     selector: 'app-detaildathang',
//     imports: [
//       MatFormFieldModule,
//       MatInputModule,
//       FormsModule,
//       MatIconModule,
//       MatButtonModule,
//       MatSelectModule,
//       MatDialogModule,
//       CommonModule,
//       MatSlideToggleModule
//     ],
//     templateUrl: './detaildathang.component.html',
//     styleUrl: './detaildathang.component.scss'
//   })
//   export class DetailDathangComponent {
//     _ListDathangComponent:ListDathangComponent = inject(ListDathangComponent)
//     _DathangService:DathangService = inject(DathangService)
//     _route:ActivatedRoute = inject(ActivatedRoute)
//     _router:Router = inject(Router)
//     _snackBar:MatSnackBar = inject(MatSnackBar)
//     constructor(){
//       this._route.paramMap.subscribe((params) => {
//         const id = params.get('id');
//         this._DathangService.setDathangId(id);
//       });
//       effect(async () => {
//         const id = this._DathangService.dathangId();
//         if (!id){
//           this._router.navigate(['dathang']);
//           this._ListDathangComponent.drawer.close();
//         }
//         if(id === 'new'){
//           this.DetailDathang.set({});
//           this._ListDathangComponent.drawer.open();
//           this.isEdit.update(value => !value);
//           this._router.navigate(['dathang', "new"]);
//         }
//         else{
//             await this._DathangService.getDathangBy({id:id,isOne:true});
//             this._ListDathangComponent.drawer.open();
//             this._router.navigate(['dathang', id]);
//         }
//       });
//     }
//     DetailDathang: any = this._DathangService.DetailDathang;
//     isEdit = signal(false);
//     isDelete = signal(false);  
//     dathangId:any = this._DathangService.dathangId
//     async ngOnInit() {       
//     }
//     async handleDathangAction() {
//       if (this.dathangId() === 'new') {
//         await this.createDathang();
//       }
//       else {
//         await this.updateDathang();
//       }
//     }
//     private async createDathang() {
//       try {
//         await this._DathangService.CreateDathang(this.DetailDathang());
//         this._snackBar.open('Tạo Mới Thành Công', '', {
//           duration: 1000,
//           horizontalPosition: 'end',
//           verticalPosition: 'top',
//           panelClass: ['snackbar-success'],
//         });
//         this.isEdit.update(value => !value);
//       } catch (error) {
//         console.error('Lỗi khi tạo dathang:', error);
//       }
//     }

//     private async updateDathang() {
//       try {
//         await this._DathangService.updateDathang(this.DetailDathang());
//         this._snackBar.open('Cập Nhật Thành Công', '', {
//           duration: 1000,
//           horizontalPosition: 'end',
//           verticalPosition: 'top',
//           panelClass: ['snackbar-success'],
//         });
//         this.isEdit.update(value => !value);
//       } catch (error) {
//         console.error('Lỗi khi cập nhật dathang:', error);
//       }
//     }
//     async DeleteData()
//     {
//       try {
//         await this._DathangService.DeleteDathang(this.DetailDathang());
  
//         this._snackBar.open('Xóa Thành Công', '', {
//           duration: 1000,
//           horizontalPosition: 'end',
//           verticalPosition: 'top',
//           panelClass: ['snackbar-success'],
//         });
  
//         this._router.navigate(['dathang']);
//       } catch (error) {
//         console.error('Lỗi khi xóa dathang:', error);
//       }
//     }
//     goBack(){
//       this._router.navigate(['dathang'])
//       this._ListDathangComponent.drawer.close();
//     }
//     trackByFn(index: number, item: any): any {
//       return item.id;
//     }
//     toggleEdit() {
//       this.isEdit.update(value => !value);
//     }
    
//     toggleDelete() {
//       this.isDelete.update(value => !value);
//     }
//     FillSlug(){
//       this.DetailDathang.update((v:any)=>{
//         v.slug = convertToSlug(v.title);
//         return v;
//       })
//     }
//   }