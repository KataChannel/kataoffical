const fs = require('fs');
const path = require('path');

// Dữ liệu file (đường dẫn gốc và nội dung)
// Nội dung file được lấy từ các tệp bạn đã cung cấp.
const fileDefinitions = [
    {
        originalPath: "sanpham/sanpham.route.ts",
        content: `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSanphamComponent } from './listsanpham/listsanpham.component';
const routes: Routes = [
  // {
  //       path: 'sanpham',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'sanpham.view' },
  //       loadChildren: () =>
  //          import('./admin/sanpham/sanpham.route').then(m => m.SanphamRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarsanpham/dashboarsanpham.component').then(
        (c) => c.DashboarsanphamComponent
      ),
  },
  {
    path: '',
    component: ListSanphamComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailsanpham/detailsanpham.component').then(
            (c) => c.DetailSanphamComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SanphamRoutingModule {}`
    },
    {
        originalPath: "sanpham/sanpham.service.ts",
        content: `import { inject, Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenSanphamUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10); // Mặc định 10 mục mỗi trang
  sanphamId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('SanphamDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('sanphams', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('sanphams')) {
            db.deleteObjectStore('sanphams');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('sanphams', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveSanphams(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('sanphams', 'readwrite');
    const store = tx.objectStore('sanphams');
    await store.clear();
    await store.put({ id: 'data', sanphams: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('sanphams', 'data');
    if (cached && cached.sanphams) {
      return {
        sanphams: cached.sanphams,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.sanphams.length, pageSize: 10 }
      };
    }
    return { sanphams: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setSanphamId(id: string | null) {
    this.sanphamId.set(id);
  }

  async CreateSanpham(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham\`, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const data = await response.json();
      this.getAllSanpham(this.pageSize());
      this.sanphamId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateSanpham', error);
      console.error(error);
    }
  }

  async getAllSanpham(pageSize: number = this.pageSize(), forceRefresh: boolean = false) {
    this.pageSize.set(pageSize);
    const cached = await this.getCachedData();   
    const updatedAtCache = this._StorageService.getItem('sanphams_updatedAt') || '0';    
    
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.sanphams.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) {
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.sanphams;
    }

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
      };

      // Kiểm tra thời gian cập nhật từ server, trừ khi được yêu cầu forceRefresh
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(\`\${environment.APIURL}/sanpham/lastupdated\`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListSanpham.set(cached.sanphams);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.sanphams;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();

        // Nếu cache còn mới, trả về cache
        if (updatedAtServer <= updatedAtCache) {
          this.ListSanpham.set(cached.sanphams);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.sanphams;
        }
      }

      // Tải dữ liệu mới từ server
      const query = new URLSearchParams({
        page: this.page().toString(),
        limit: pageSize.toString()
      });
      const response = await fetch(\`\${environment.APIURL}/sanpham?\${query}\`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListSanpham.set(cached.sanphams);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.sanphams;
      }

      const data = await response.json();
      await this.saveSanphams(data.data, {
        page: data.page || 1,
        pageCount: data.pageCount || 1,
        total: data.total || data.data.length,
        pageSize
      });
      // Với forceRefresh, cập nhật luôn với thời gian mới từ server, nếu không thì sử dụng thời gian lấy từ lastUpdatedResponse
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(\`\${environment.APIURL}/sanpham/lastupdated\`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('sanphams_updatedAt', updatedAtServer);
      } else {
        this._StorageService.setItem('sanphams_updatedAt', new Date().toISOString());
      }
      this.ListSanpham.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(pageSize);
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAllSanpham', error);
      console.error(error);
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.sanphams;
    }
  }

  async getUpdatedCodeIds() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/updateCodeIds\`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllSanpham(this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getUpdatedCodeIds', error);
      console.error(error);
    }
  }

  listenSanphamUpdates() {
    this.socket.off('sanpham-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('sanpham-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('sanphams_updatedAt');
      await this.getAllSanpham();
    });
  }

  async getSanphamBy(param: any, pageSize: number = this.pageSize()) {
    this.pageSize.set(pageSize); // Cập nhật pageSize
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
        body: JSON.stringify({ ...param, page: this.page(), limit: pageSize }),
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/findby\`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailSanpham.set(data);
      } else {
        await this.saveSanphams(data.data, {
          page: data.page || 1,
          pageCount: data.pageCount || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('sanphams_updatedAt', new Date().toISOString());
        this.ListSanpham.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      this._ErrorLogService.logError('Failed to getSanphamBy', error);
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListSanpham.set(cached.sanphams);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateSanpham(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/\${dulieu.id}\`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllSanpham(this.pageSize());
      this.getSanphamBy({ id: data.id, isOne: true }, this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateSanpham', error);
      console.error(error);
    }
  }

  async DeleteSanpham(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/\${item.id}\`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllSanpham(this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to DeleteSanpham', error);
      console.error(error);
    }
  }

  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại';
        break;
      case 401:
      case 404:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
    this._snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}`
    },
    {
        originalPath: "sanpham/sanpham.ts",
        content: `export const ListSanpham:any[]=[]`
    },
    {
        originalPath: "sanpham/dashboarsanpham/dashboarsanpham.component.html",
        content: `<div class="w-full flex flex-col gap-4 mx-auto p-8">
    <div class="grid lg:grid-cols-3 gap-4">
        <app-dashboardblock [title]="'Tổng Doanh Thu'" [value]="123456789" [type]="'value'"></app-dashboardblock>
        <app-dashboardblock [title]="'Tổng Số Đơn Hàng'" [value]="1500" [type]="'percent'"></app-dashboardblock>
        <app-dashboardblock [title]="'Khách Hàng Mới'" [value]="300" [type]="'percent'"></app-dashboardblock>
    </div>
    <div class="grid lg:grid-cols-2 gap-4">
        <app-revenuechart [title]="'Doanh Thu Tháng Này'" [chartOptions]="sampleAreaChartOptions2"></app-revenuechart>
        <app-revenuechart [title]="'Trạng Thái Đơn hàng'" [chartOptions]="sampleAreaChartOptions2"></app-revenuechart>
    </div>
</div>`
    },
    {
        originalPath: "sanpham/dashboarsanpham/dashboarsanpham.component.ts",
        content: `import { Component } from '@angular/core';
import { DashboardblockComponent } from '../../../shared/common/chart/dashboardblock/dashboardblock.component';
import { ChartOptions, RevenuechartComponent } from '../../../shared/common/chart/revenuechart/revenuechart.component';

@Component({
  selector: 'app-dashboarsanpham',
  imports: [
    DashboardblockComponent,
    RevenuechartComponent
  ],
  templateUrl: './dashboarsanpham.component.html',
  styleUrl: './dashboarsanpham.component.scss'
})
export class DashboarsanphamComponent {
  public sampleAreaChartOptions2!: ChartOptions;
  public sampleAreaChartOptions!: ChartOptions;
  public sampleCategories!: string[];
  constructor() {

  }
  generateRandomData(count: number, min = 10, max = 100): number[] {
    const data: number[] = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }
}`
    },
    {
        originalPath: "sanpham/detailsanpham/detailsanpham.component.html",
        content: `<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
    <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{ DetailSanpham()?.title || 'Không có dữ liệu' }}</div>
  <div class="flex flex-row space-x-2 items-center">
    <mat-slide-toggle [(ngModel)]="DetailSanpham().isActive" [disabled]="!isEdit()">{{DetailSanpham().isActive?'Hiển Thị':'Ẩn'}}</mat-slide-toggle>
    <button mat-icon-button color="primary" *ngIf="isEdit()" (click)="handleSanphamAction()">
      <mat-icon>save</mat-icon>
    </button>
    <button mat-icon-button color="primary" *ngIf="!isEdit()" (click)="toggleEdit()">
      <mat-icon>edit</mat-icon>
    </button>
  </div>
</div>

<div class="relative flex flex-col w-full p-4 overflow-auto">
  <ng-container *ngIf="isDelete()">
    <div class="flex flex-col space-y-4 items-center justify-center">
      <div class="font-bold text-2xl">Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" (click)="DeleteData()">Đồng Ý</button>
        <button mat-flat-button color="warn" (click)="toggleDelete()">Huỷ Bỏ</button>
      </div>
    </div>
  </ng-container>

  <ng-container *ngIf="!isDelete()">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-form-field appearance="outline">
        <mat-label>Tiêu Đề</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().name" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Nhóm</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().group" [disabled]="!isEdit()" placeholder="Vui lòng nhập Nhóm"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Mã Sản Phẩm</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().codeId" [disabled]="true" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
      </mat-form-field>
      <mat-form-field class="lg:col-span-2" appearance="outline">
        <mat-label>Mô Tả</mat-label>
        <textarea matInput [(ngModel)]="DetailSanpham().description" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mô Tả"></textarea>
      </mat-form-field>
    </div>
  </ng-container>
</div>`
    },
    {
        originalPath: "sanpham/detailsanpham/detailsanpham.component.ts",
        content: `import { Component, effect, inject, signal } from '@angular/core';
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
import { ListSanphamComponent } from '../listsanpham/listsanpham.component';
import { SanphamService } from '../sanpham.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailsanpham',
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
    templateUrl: './detailsanpham.component.html',
    styleUrl: './detailsanpham.component.scss'
  })
  export class DetailSanphamComponent {
    _ListSanphamComponent:ListSanphamComponent = inject(ListSanphamComponent)
    _SanphamService:SanphamService = inject(SanphamService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._SanphamService.setSanphamId(id);
      });
  
      effect(async () => {
        const id = this._SanphamService.sanphamId();
        if (!id){
          this._router.navigate(['/admin/sanpham']);
          this._ListSanphamComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailSanpham.set({});
          this._ListSanphamComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/sanpham', "new"]);
        }
        else{
            await this._SanphamService.getSanphamBy({id:id,isOne:true});
            this._ListSanphamComponent.drawer.open();
            this._router.navigate(['/admin/sanpham', id]);
        }
      });
    }
    DetailSanpham: any = this._SanphamService.DetailSanpham;
    isEdit = signal(false);
    isDelete = signal(false);  
    sanphamId:any = this._SanphamService.sanphamId
    async ngOnInit() {       
    }
    async handleSanphamAction() {
      if (this.sanphamId() === 'new') {
        await this.createSanpham();
      }
      else {
        await this.updateSanpham();
      }
    }
    private async createSanpham() {
      try {
        await this._SanphamService.CreateSanpham(this.DetailSanpham());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo sanpham:', error);
      }
    }

    private async updateSanpham() {
      try {
        await this._SanphamService.updateSanpham(this.DetailSanpham());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật sanpham:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._SanphamService.DeleteSanpham(this.DetailSanpham());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/sanpham']);
      } catch (error) {
        console.error('Lỗi khi xóa sanpham:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/sanpham'])
      this._ListSanphamComponent.drawer.close();
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
      this.DetailSanpham.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }`
    },
    {
        originalPath: "sanpham/listsanpham/listsanpham.component.html",
        content: `<mat-drawer-container class="w-full h-full" autosize>
  <mat-drawer #drawer class="flex flex-col lg:!w-1/2 !w-full h-full" [position]="'end'" mode="over">
    <router-outlet></router-outlet>
  </mat-drawer>
  <div class="flex flex-col space-y-2 h-screen-16 w-full p-2">
    <div class="p-4 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg">
      <div class="w-full flex flex-col gap-2  lg:flex-row lg:items-center lg:justify-between">

        <div class="flex flex-row space-x-2 items-center">
          <div class="relative w-full">
            <input type="text" placeholder="Tìm Kiếm..." (keyup)="applyFilter($event)"
              class="block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span class="material-symbols-outlined text-gray-500">search</span>
            </div>
          </div>
          <button class="flex flex-row items-center" color="primary" matTooltip="Thêm mới" (click)="create()"
            mat-flat-button>
            <mat-icon>add_circle</mat-icon>
            <span class="whitespace-nowrap">Tạo Mới</span>
          </button>
          <button *ngIf="EditList.length > 0" (click)="openDeleteDialog(DeleteDialog)"
            class="flex flex-row items-center" color="warn" matTooltip="Xoá" mat-flat-button>
            <mat-icon>delete</mat-icon>
            <span class="whitespace-nowrap">Xoá</span>
          </button>
          </div>

        <div class="flex flex-row space-x-2 items-center">
          <button matTooltip="Ẩn hiện cột" mat-icon-button color="primary" [matMenuTriggerFor]="menu">
            <mat-icon>tune</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <div class="p-4">
              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput
                  placeholder="Tìm Kiếm" />
                <mat-icon matPrefix>search</mat-icon>
              </mat-form-field>
            </div>
            <div class="flex flex-col max-h-80 overflow-auto">
              @for (item of FilterColumns; track item.key) {
              <button mat-menu-item (click)="toggleColumn(item);$event.stopPropagation()">
                <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>
                <span>{{item.value}}</span>
              </button>
              }
            </div>
          </mat-menu>
          <button matTooltip="Tải file excel Mẫu" (click)="ExportExcel(Listsanpham(),'sanpham')" color="primary"
            mat-icon-button>
            <mat-icon>file_download</mat-icon>
          </button>
          <button matTooltip="Tải lên file excel" (click)="uploadfile.click()" color="primary" mat-icon-button>
            <mat-icon>file_upload</mat-icon>
          </button>
          <input class="hidden" (change)="ImporExcel($event)" type="file" #uploadfile>
          <button matTooltip="Tải dữ liệu từ drive" (click)="OpenLoadDrive(LoadDriveDialog)" color="primary"
            mat-icon-button>
            <mat-icon>cloud_download</mat-icon>
          </button>
         <button mat-icon-button color="primary" matTooltip="Cập Nhật Lại Code" (click)="getUpdatedCodeIds()">
          <mat-icon>cached</mat-icon>
        </button>
        </div>


      </div>
    </div>
    <div class="w-full h-full overflow-auto">
      <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
        @for (column of displayedColumns; track column) {
        <ng-container [matColumnDef]="column">
          @if (column == 'stt') {
          <th class="!border !bg-slate-100" mat-header-cell *matHeaderCellDef>
            <span>{{ ColumnName[column] }}</span>
          </th>
          }
          @else {
          <th class="!border whitespace-nowrap !bg-slate-100" mat-header-cell *matHeaderCellDef mat-sort-header>
            <span class="max-w-40 line-clamp-4 me-4">
              {{ ColumnName[column] }}
            </span>
            <app-searchfilter [icon]="'filter_alt'" [ListItem]="this.Listsanpham()" [fieldsearch]="column"
              [ListFilter]="ListFilter" [filterItem]="FilterHederColumn(dataSource.filteredData,column)"
              (OutFilter)="onOutFilter($event)"></app-searchfilter>
          </th>
          }
          <td class="border" mat-cell *matCellDef="let row; let idx = index">
            @switch (column) {
            @case ('codeId') {
            <span (click)="goToDetail(row);" class="max-w-40 line-clamp-4 font-bold text-blue-600">
              {{ row[column] }}
            </span>
            }
            @case ('stt') {
            <span class="">
              {{ idx + 1 }}
            </span>
            }
            @case ('createdAt') {
            <span class="max-w-40 line-clamp-4">
              {{ row[column]|date:'dd/MM/yyyy'}}
            </span>
            }
            @case ('haohut') {
            <span class="max-w-40 line-clamp-4">
              {{ row[column]}}%
            </span>
            }
            @case ('isActive') {
            <span class="max-w-40 line-clamp-4">
              @if (row[column]) {
              <mat-icon class="text-green-500">check_circle</mat-icon>
              }
              @else {
              <mat-icon class="text-red-500">cancel</mat-icon>
              }
            </span>
            }
            @case ('updatedAt') {
            <span class="max-w-40 line-clamp-4">
              {{ row[column]|date:'dd/MM/yyyy'}}
            </span>
            }
            @default {
            <span class="max-w-40 line-clamp-4">
              {{ row[column] }}
            </span>
            }
            }
          </td>
        </ng-container>
        }
        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr class="border" mat-row *matRowDef="let row; columns: displayedColumns;"
          class="hover:bg-slate-50 {{CheckItemInEdit(row)?'!bg-blue-50':''}}" (click)="AddToEdit(row);">
        </tr>
        <tr class="mat-row border" *matNoDataRow>
          <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
        </tr>
      </table>
    </div>
    <div class="cursor-pointer border rounded-lg px-3 p-1 flex flex-row space-x-2 items-center justify-between">
      <div
        class="w-full flex lg:p-0 p-2 lg:flex-row lg:space-x-2 lg:items-center lg:justify-between flex-col justify-center">
        <span class="w-full text-center">Đang Xem <strong>{{ (page() - 1) * pageSize() + 1 }}</strong> -
          <strong>{{ page() * pageSize() > total() ? total() : page() * pageSize() }}</strong>
          trong số {{ total() }} mục, {{ page() }}/{{pageCount()}} Trang</span>
        <div class="w-full flex flex-row space-x-2 items-center lg:justify-end justify-center">
          <span class="font-bold text-blue-600" [matMenuTriggerFor]="menu1" #menuHienthi="matMenuTrigger">Hiện
            Thị : {{pageSize()}} mục</span>
          <mat-menu #menu1="matMenu">
            <div class="w-full flex flex-col space-y-2 p-4" (click)="$event.stopPropagation()">
              <span>Số Lượng</span>
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <input matInput [(ngModel)]="pageSize" [ngModelOptions]="{ standalone: true }"
                  placeholder="Vui lòng Nhập Số Lượng" />
              </mat-form-field>
              <button mat-flat-button color="primary" (click)="onPageSizeChange(pageSize(),menuHienthi)">Áp
                Dụng</button>
            </div>
          </mat-menu>
          <div class="pagination-controls">
            <button mat-icon-button color="primary" [disabled]="page() === 1" (click)="onPreviousPage()">
              <mat-icon>keyboard_arrow_left</mat-icon>
            </button>
            <button mat-icon-button color="primary" [disabled]="page() === pageCount()" (click)="onNextPage()">
              <mat-icon>keyboard_arrow_right</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</mat-drawer-container>

<ng-template #DeleteDialog>
  <mat-dialog-content>
    <div class="flex flex-col space-y-8 items-center justify-center">
      <div class="font-bold">Xác Nhận</div>
      <div>Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" mat-dialog-close="true">Đồng Ý</button>
        <button mat-flat-button color="warn" mat-dialog-close="false">Huỷ Bỏ</button>
      </div>
    </div>
  </mat-dialog-content>
</ng-template>


<ng-template #LoadDriveDialog>
  <mat-dialog-content
    class="!w-screen !h-screen !max-h-screen !relative !flex flex-col space-y-8 items-center justify-center">
    <div class="relative flex flex-row space-x-2 items-center">
      <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
        <mat-label>IdSheet</mat-label>
        <input matInput [(ngModel)]="IdSheet" [ngModelOptions]="{ standalone: true }"
          placeholder="Vui lòng Nhập IdSheet" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
        <mat-label>SheetName</mat-label>
        <input matInput [(ngModel)]="SheetName" [ngModelOptions]="{ standalone: true }"
          placeholder="Vui lòng Nhập SheetName" />
      </mat-form-field>
    </div>
    <div class="relative h-full w-full overflow-auto">

    </div>

    <div class="relative flex flex-row space-x-2 items-center justify-center">
      <button mat-flat-button color="primary" mat-dialog-close="true">Đồng Ý</button>
      <button mat-flat-button color="warn" mat-dialog-close="false">Huỷ Bỏ</button>
    </div>
  </mat-dialog-content>
</ng-template>`
    },
    {
        originalPath: "sanpham/listsanpham/listsanpham.component.ts",
        content: `import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanphamService } from '../sanpham.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';

@Component({
  selector: 'app-listsanpham',
  templateUrl: './listsanpham.component.html',
  styleUrls: ['./listsanpham.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    SearchfilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSanphamComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    codeId: 'Code',
    name: 'Tiêu Đề',
    group: 'Nhóm',
    description: 'Mô Tả',
    status: 'Trạng Thái',
    order: 'Thứ Tự',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật'
  };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('SanphamColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listsanpham = this._SanphamService.ListSanpham;
  page = this._SanphamService.page;
  pageCount = this._SanphamService.pageCount;
  total = this._SanphamService.total;
  pageSize = this._SanphamService.pageSize;
  sanphamId = this._SanphamService.sanphamId;
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.dataSource.data = this.Listsanpham();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this._SanphamService.listenSanphamUpdates();
    await this._SanphamService.getAllSanpham(this.pageSize(),true);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
  }

  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('SanphamColFilter', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUpdatedCodeIds() {
    await this._SanphamService.getUpdatedCodeIds();
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
        } else {
          this.drawer.mode = 'side';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listsanpham().filter((v: any) => 
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter((v: any) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v: any) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }

  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    this.ListFilter = this.Listsanpham();
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listsanpham().filter((v: any) => 
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  onOutFilter(event: any) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('SanphamColFilter', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/sanpham', 'new']);
  }

  openDeleteDialog(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }

  DeleteListItem(): void {
    this.EditList.forEach((item: any) => {
      this._SanphamService.DeleteSanpham(item);
    });
    this.EditList = [];
    this._snackBar.open('Xóa Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }

  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }

  goToDetail(item: any): void {
    this.drawer.open();
    this._SanphamService.setSanphamId(item.id);
    this._router.navigate(['admin/sanpham', item.id]);
  }

  OpenLoadDrive(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // Handle action if needed
      }
    });
  }

  IdSheet: any = '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk';
  SheetName: any = 'SPImport';
  ImportIteam: any[] = [];
  ImportColumnName: any = {};
  ImportdisplayedColumns: any[] = [];

  async LoadDrive() {
    const DriveInfo = {
      IdSheet: this.IdSheet,
      SheetName: this.SheetName,
      ApiKey: environment.GSApiKey,
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    this.ImportIteam = ConvertDriveData(result.values);
    this.ImportColumnName = Object.fromEntries(result.values[0].map((key: any, i: any) => [key, result.values[1][i]]));
    this.ImportdisplayedColumns = result.values[0];
  }

  async DoImportData(data: any) {
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt?.trim() || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      haohut: Number(v.haohut) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));

    const uniqueData = Array.from(new Map(transformedData.map((item: any) => [item.masp, item])).values());
    const existingSanpham = this._SanphamService.ListSanpham();
    const existingMasp = existingSanpham.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingSanpham.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._SanphamService.updateSanpham(updatedItem);
      } else {
        await this._SanphamService.CreateSanpham(v);
      }
    }));
    await Promise.all(existingSanpham
      .filter(sp => !uniqueData.some((item: any) => item.masp === sp.masp))
      .map(sp => this._SanphamService.updateSanpham({ ...sp, isActive: false }))
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }

  ExportExcel(data: any, title: any) {
    const dulieu = data.map((v: any) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu,
    }));
    writeExcelFile(dulieu, title);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.total()) {
      this._snackBar.open(\`Số lượng tối đa \${this.total()}\`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      size = this.total();
    }
    this._SanphamService.page.set(1);
    this._SanphamService.getAllSanpham(size, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._SanphamService.page.set(this.page() - 1);
      this._SanphamService.getAllSanpham(this.pageSize(), true);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._SanphamService.page.set(this.page() + 1);
      this._SanphamService.getAllSanpham(this.pageSize(), true);
    }
  }
}`
    },
    {
        originalPath: "sanpham/sharedsanpham/sharedsanpham.component.html",
        content: `<p>sharedsanpham works!</p>`
    },
    {
        originalPath: "sanpham/sharedsanpham/sharedsanpham.component.ts",
        content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-sharedsanpham',
  imports: [],
  templateUrl: './sharedsanpham.component.html',
  styleUrl: './sharedsanpham.component.scss'
})
export class SharedsanphamComponent {

}`
    },
    // Thêm các file .scss nếu có nội dung
    {
        originalPath: "sanpham/dashboarsanpham/dashboarsanpham.component.scss",
        content: `` // Thêm nội dung scss nếu có
    },
    {
        originalPath: "sanpham/detailsanpham/detailsanpham.component.scss",
        content: `` // Thêm nội dung scss nếu có
    },
    {
        originalPath: "sanpham/listsanpham/listsanpham.component.scss",
        content: `` // Thêm nội dung scss nếu có
    },
    {
        originalPath: "sanpham/sharedsanpham/sharedsanpham.component.scss",
        content: `` // Thêm nội dung scss nếu có
    }
];

function createModuleFiles(moduleNameInput) {
    if (!moduleNameInput || typeof moduleNameInput !== 'string' || moduleNameInput.trim() === "") {
        console.error("Lỗi: Vui lòng cung cấp tên module hợp lệ.");
        process.exit(1);
    }

    const lowerModuleName = moduleNameInput.toLowerCase().replace(/\s+/g, '_');
    const capitalizedModuleName = lowerModuleName.charAt(0).toUpperCase() + lowerModuleName.slice(1);

    console.log(`Đang tạo tệp cho module: ${lowerModuleName}`);
    console.log(`Sử dụng dạng viết hoa chữ cái đầu: ${capitalizedModuleName}`);

    fileDefinitions.forEach(fileDef => {
        // 1. Thay đổi đường dẫn tệp
        // Giữ nguyên thư mục gốc là 'sanpham' nếu originalPath bắt đầu bằng 'sanpham/'
        // và chỉ thay thế 'sanpham' trong tên file hoặc các thư mục con sâu hơn.
        let newPathString = fileDef.originalPath;
        newPathString = fileDef.originalPath.replace(/sanpham/g, lowerModuleName);
        const absolutePath = path.resolve(__dirname, newPathString);

        // 2. Thay đổi nội dung tệp
        let newContent = fileDef.content;
        
        // Thay thế "Sanpham" (viết hoa chữ cái đầu) trước
        const capitalizedRegex = new RegExp('Sanpham', 'g');
        newContent = newContent.replace(capitalizedRegex, capitalizedModuleName);

        // Sau đó thay thế "sanpham" (viết thường)
        const lowerCaseRegex = new RegExp('sanpham', 'g');
        newContent = newContent.replace(lowerCaseRegex, lowerModuleName);
        
        try {
            const directoryPath = path.dirname(absolutePath);
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
                console.log(`Đã tạo thư mục: ${directoryPath}`);
            }

            fs.writeFileSync(absolutePath, newContent, 'utf8');
            console.log(`Đã tạo tệp: ${absolutePath}`);

        } catch (error) {
            console.error(`Lỗi khi tạo tệp ${absolutePath}:`, error);
        }
    });

    console.log(`\nHoàn tất tạo các tệp cho module '${lowerModuleName}'.`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Cách sử dụng: node <tên_file_script>.js <TênModule>");
    console.log("Ví dụ: node create_module_from_sanpham.js product");
    process.exit(1);
}

const dynamicModuleNameInput = args[0];
createModuleFiles(dynamicModuleNameInput);