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
import { ListDexuatComponent } from '../listdexuat/listdexuat.component';
import { DexuatService } from '../dexuat.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListType } from '../../hotro/listhotro/listhotro';
  @Component({
    selector: 'app-detaildexuat',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule,
      MatDatepickerModule
    ],
    templateUrl: './detaildexuat.component.html',
    styleUrl: './detaildexuat.component.scss'
  })
  export class DetailDexuatComponent {
    _ListdexuatComponent:ListDexuatComponent = inject(ListDexuatComponent)
    _DexuatService:DexuatService = inject(DexuatService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)

    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DexuatService.setDexuatId(id);
      });
  
      effect(async () => {
        const id = this._DexuatService.dexuatId();
        if (!id){
          this._router.navigate(['/admin/dexuat']);
          this._ListdexuatComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDexuat.set({chitiet:[]});
          this._ListdexuatComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/dexuat', "new"]);
        }
        else{
            await this._DexuatService.getDexuatBy({id:id});
            this._ListdexuatComponent.drawer.open();
            this._router.navigate(['/admin/dexuat', id]);
        }
      });
    }
    DetailDexuat: any = this._DexuatService.DetailDexuat;
    isEdit = signal(false);
    isDelete = signal(false);  
    dexuatId:any = this._DexuatService.dexuatId
    async ngOnInit() {       
    }
    async handleDexuatAction() {
      if (this.dexuatId() === 'new') {
        await this.createDexuat();
      }
      else {
        await this.updateDexuat();
      }
    }
    private async createDexuat() {
      try {
        await this._DexuatService.CreateDexuat(this.DetailDexuat());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo dexuat:', error);
      }
    }
    RemoveItem(index: number) {
      this.DetailDexuat.Chitiet.splice(index, 1);
    }
    saveContent() {

    }
    printContent() {
      {
        const printContent = document.getElementById('printContent');
        if (printContent) {
          const newWindow = window.open('', '_blank');
        const tailwindCSS =  `
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: { extend: {} }
          };
        </script>
      `
          if (newWindow) {
            newWindow.document.write(`
              <html>
              <head>
                <title>In Bảng</title>
                 ${tailwindCSS}
                <style>
                  body { font-size: 12px; font-family: Arial, sans-serif; }
                  table { width: 100%; border-collapse: collapse; }
                  th, td { border: 1px solid #000; padding: 4px; text-align: left; }
                  @media print { 
                  body { margin: 0; } 
                  img {height:80px}
                  }
                </style>
              </head>
              <body>
                ${printContent.outerHTML}
                <script>
                  window.onload = function() { window.print(); window.close(); }
                </script>
              </body>
              </html>
            `);
            newWindow.document.close();
          } else {
            console.error('Không thể mở cửa sổ in');
          }
        } else {
          console.error('Không tìm thấy phần tử printContent');
        }
      }
    }
    CopyContent() {
      this._snackBar.open('Đang Coppy Đề Xuất', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      delete this.DetailDexuat().id;
      delete this.DetailDexuat().codeId;
      this.DetailDexuat().title = `Copy ${this.DetailDexuat().title}`;
      this._DexuatService.CreateDexuat(this.DetailDexuat()).then((data: any) => {
        setTimeout(() => {
          this._router.navigate(['/admin/dexuat', this.dexuatId()]);
          // window.location.href = `admin/hotro/${data.id}`;
        }, 1000);
      });
    }
    FilterListType: any[] = ListType;
    DoFindKhachhang(event: any) {
      const query = event.target.value.toLowerCase();
      this.FilterListType = ListType.filter((v) =>
        v.Title.toLowerCase().includes(query)
      );
    }
    private async updateDexuat() {
      try {
        await this._DexuatService.updateDexuat(this.DetailDexuat());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật dexuat:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DexuatService.DeleteDexuat(this.DetailDexuat());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/dexuat']);
      } catch (error) {
        console.error('Lỗi khi xóa dexuat:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/dexuat'])
      this._ListdexuatComponent.drawer.close();
    }
    trackByFn(index: number, item: any): any {
      return item.id;
    }
    toggleEdit() {
      this.isEdit.update(value => !value);
      this.DetailDexuat().tongtien = this.DetailDexuat().chitiet.reduce(
        (sum: any, item: any) => sum + item.thanhtien,
        0
      );
      this.DetailDexuat().tongchi = this.DetailDexuat().tongtien - this.DetailDexuat().tamung;
      this._DexuatService.updateDexuat(this.DetailDexuat()).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      });
      // this._hotrosService.updateOneHotro(this.Detail).then(() => {
      //   this.ngOnInit();
      // });
    }
    
    toggleDelete() {
      this.isDelete.update(value => !value);
    }
    FillSlug(){
      this.DetailDexuat.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }