const fs = require("fs");
const path = require("path");

// Dữ liệu file (đường dẫn gốc và nội dung)
// Nội dung file được lấy từ các tệp bạn đã cung cấp.
const fileDefinitions = [
  {
    originalPath: "sanpham/sanpham.route.ts",
    content: `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSanphamComponent } from './listsanpham/listsanpham';
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
      import('./dashboarsanpham/dashboarsanpham').then(
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
          import('./detailsanpham/detailsanpham').then(
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
export class SanphamRoutingModule {}`,
  },
  {
    originalPath: "sanpham/sanpham.service.ts",
    content: `import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenSanphamUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang
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
  private async saveSanphams(data: any[], pagination: { page: number, totalPages: number, total: number, pageSize: number }) {
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
        pagination: cached.pagination || { page: 1, totalPages: 1, total: cached.sanphams.length, pageSize: 10 }
      };
    }
    return { sanphams: [], pagination: { page: 1, totalPages: 1, total: 0, pageSize: 10 } };
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
        this.handleError(response.status);
        return;
      }
      const data = await response.json();
      this.getAllSanpham();
      this.sanphamId.set(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllSanpham(queryParams: any = {}, forceRefresh: boolean = false) {
    const cached = await this.getCachedData();
    const updatedAtCacheDate = this._StorageService.getItem('sanphams_updatedAt') || '0';
    const updatedAtCache = new Date(updatedAtCacheDate).getTime();
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.sanphams.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) {
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
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

      queryParams = {
        page: this.page().toString(),
        pageSize: this.pageSize().toString(),
        ...queryParams, // Thêm các tham số khác nếu cần
      };
      // Tạo query string từ queryParams, chỉ thêm các giá trị có nội dung
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          query.append(key, String(value));
        }
      });

      // Nếu forceRefresh = true thì bỏ qua cache và tải dữ liệu mới luôn
      const response = await fetch(\`\${environment.APIURL}/sanpham?\${query}\`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListSanpham.set(cached.sanphams);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.sanphams;
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      await this.saveSanphams(data.data, {
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        total: data.total || data.data.length,
        pageSize: this.pageSize()
      });

      // Cập nhật thời gian cache: với forceRefresh, sử dụng thời gian hiện tại
      if (forceRefresh) {
        this._StorageService.setItem('sanphams_updatedAt', new Date().toISOString());
      } else {
        const lastUpdatedResponse = await fetch(\`\${environment.APIURL}/sanpham/lastupdated\`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('sanphams_updatedAt', updatedAtServer);
      }
      this.ListSanpham.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(this.pageSize());
      return data.data;

    } catch (error) {
      console.error(error);
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
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
          totalPages: data.totalPages || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('sanphams_updatedAt', new Date().toISOString());
        this.ListSanpham.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListSanpham.set(cached.sanphams);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
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
      console.error(error);
    }
  }

  private handleError(status: number): void {
    let message = 'Lỗi không xác định';
    let panelClass = 'snackbar-error';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại hoặc không hợp lệ';
        break;
      case 401:
        message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền thực hiện thao tác này';
        break;
      case 404:
        message = 'Không tìm thấy dữ liệu yêu cầu';
        break;
      case 422:
        message = 'Dữ liệu không hợp lệ';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
      case 503:
        message = 'Dịch vụ tạm thời không khả dụng';
        break;
      default:
        message = \`Lỗi HTTP \${status}\`;
    }

    this._snackBar.open(message, 'Đóng', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}`,
  },
  {
    originalPath: "sanpham/sanpham.ts",
    content: `export const ListSanpham:any[]=[]`,
  },
  {
    originalPath: "sanpham/dashboarsanpham/dashboarsanpham.html",
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
</div>`,
  },
  {
    originalPath: "sanpham/dashboarsanpham/dashboarsanpham.ts",
    content: `import { Component } from '@angular/core';
import { DashboardblockComponent } from '../../../shared/common/chart/dashboardblock/dashboardblock';
import { ChartOptions, RevenuechartComponent } from '../../../shared/common/chart/revenuechart/revenuechart';

@Component({
  selector: 'app-dashboarsanpham',
  imports: [
    DashboardblockComponent,
    RevenuechartComponent
  ],
  templateUrl: './dashboarsanpham.html',
  styleUrl: './dashboarsanpham.scss'
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
}`,
  },
  {
    originalPath: "sanpham/detailsanpham/detailsanpham.html",
    content: `<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
    <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{ DetailSanpham()?.codeId || 'Không có dữ liệu' }}</div>
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
    <div class="grid grid-cols-1 gap-4">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Tiêu Đề</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().title" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Mô Tả</mat-label>
        <textarea matInput [(ngModel)]="DetailSanpham().description" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mô Tả"></textarea>
      </mat-form-field>
    </div>
  </ng-container>
</div>`,
  },
  {
    originalPath: "sanpham/detailsanpham/detailsanpham.ts",
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
import { ListSanphamComponent } from '../listsanpham/listsanpham';
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
    templateUrl: './detailsanpham.html',
    styleUrl: './detailsanpham.scss'
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
  }`,
  },
  {
    originalPath: "sanpham/listsanpham/listsanpham.html",
    content: `<mat-drawer-container class="w-full h-full" autosize>
  <mat-drawer #drawer class="flex flex-col lg:!w-2/3 !w-full h-full" [position]="'end'" mode="over">
    <router-outlet></router-outlet>
  </mat-drawer>
  <div class="flex flex-col space-y-2 h-screen-16 w-full p-2">
    <div class="p-2 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg">
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
      </div>
      <div class="w-full flex flex-row space-x-4 justify-end items-center">
        <div class="flex items-center text-center"><strong>{{ (page() - 1) * pageSize() + 1 }}</strong> -
          <strong>{{ page() * pageSize() > total() ? total() : page() * pageSize() }}</strong>
          / {{ total() }} mục
        </div>
        <div class="flex items-center justify-center">
         <span>{{ page() }}/{{totalPages()}} </span> 
         <span>Trang</span>
        </div>
        <div class="flex flex-row space-x-2 justify-center items-center">
          <span class="font-bold text-blue-600" [matMenuTriggerFor]="menu1" #menuHienthi="matMenuTrigger">{{pageSize()}} mục</span>
          <mat-menu #menu1="matMenu">
            <div class="w-full flex flex-row space-x-2 p-4" (click)="$event.stopPropagation()">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Số lượng</mat-label>
                <input matInput [(ngModel)]="pageSize" [ngModelOptions]="{ standalone: true }"
                  placeholder="Vui lòng Nhập Số Lượng" />
              </mat-form-field>
              <button mat-icon-button color="primary" (click)="onPageSizeChange(pageSize(),menuHienthi)">
                <mat-icon>published_with_changes</mat-icon>
              </button>
            </div>
          </mat-menu>
          <div class="flex flex-row items-center">
            <button mat-icon-button color="primary" [disabled]="page() === 1" (click)="onPreviousPage()">
              <mat-icon>keyboard_arrow_left</mat-icon>
            </button>
            <button mat-icon-button color="primary" [disabled]="page() === totalPages()" (click)="onNextPage()">
              <mat-icon>keyboard_arrow_right</mat-icon>
            </button>
          </div>
        </div>
      </div>

    </div>
    <div class="w-full h-full overflow-auto">
      <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
        @for (column of displayedColumns; track column) {
        <ng-container [matColumnDef]="column">
          @if (column == 'stt') {
          <th class="flex !border !bg-slate-100 justify-center" mat-header-cell *matHeaderCellDef>     
          <button matTooltip="Ẩn hiện cột" mat-icon-button color="primary" [matMenuTriggerFor]="menu">
            <mat-icon>tune</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <div class="flex flex-row space-x-2 items-center p-4">
              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput
                  placeholder="Tìm Kiếm" />
                <mat-icon matPrefix>search</mat-icon>
              </mat-form-field>
              <button (click)="updateDisplayedColumns()" mat-icon-button color="primary"><mat-icon>check_circle</mat-icon></button>
            </div>
            <div class="flex flex-col max-h-80 overflow-auto">
              @for (item of FilterColumns; track item.key) {
                @if(item.key == 'stt') {
                  <button [disabled]="true" mat-menu-item (click)="toggleColumn(item);$event.stopPropagation()">
                      <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>
                      <span>{{item.value}}</span>
                    </button>
                } @else {
                <button mat-menu-item (click)="toggleColumn(item);$event.stopPropagation()">
                  <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>
                  <span>{{item.value}}</span>
                </button>
                }
              }
            </div>
          </mat-menu>
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
            <span (click)="AddToEdit(row);" class="flex justify-center items-center font-bold text-blue-600">
              @if(CheckSelect(row)){
                <mat-icon>check</mat-icon>
              }
              @else {
                <span>{{ idx + 1 }}</span>
              }
            </span>
            }
            @case ('createdAt') {
            <span class="max-w-40 line-clamp-4">
              {{ row[column]|date:'dd/MM/yyyy'}}
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
          class="hover:bg-slate-50 {{CheckItemInEdit(row)?'!bg-blue-50':''}}">
        </tr>
        <tr class="mat-row border" *matNoDataRow>
          <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
        </tr>
      </table>
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
</ng-template>`,
  },
  {
    originalPath: "sanpham/listsanpham/listsanpham.ts",
    content: `import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanphamService } from '../sanpham.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
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
    title: 'Tiêu Đề',
    description: 'Mô Tả',
    status: 'Trạng Thái',
    order: 'Thứ Tự',
    createdAt: 'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(localStorage.getItem('SanphamColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listsanpham = this._SanphamService.ListSanpham;
  page = this._SanphamService.page;
  totalPages = this._SanphamService.totalPages;
  total = this._SanphamService.total;
  pageSize = this._SanphamService.pageSize;
  sanphamId = this._SanphamService.sanphamId;
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  searchParam:any={};
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
    await this._SanphamService.getAllSanpham(this.searchParam);
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
  @Debounce(500)
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
          this.drawer.mode = 'over';
        }
      });
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
    }
  }
  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  ListFilter: any[] = [];
  onOutFilter(event: any) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateDisplayedColumns(): void {
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
  CheckSelect(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id)? true : false;
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
    this._SanphamService.getAllSanpham(this.searchParam, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._SanphamService.page.set(this.page() - 1);
      this._SanphamService.getAllSanpham(this.searchParam, true);
    }
  }

  onNextPage(){
    if (this.page() < this.totalPages()) {
      this._SanphamService.page.set(this.page() + 1);
      this._SanphamService.getAllSanpham(this.searchParam, true);
    }
  }
}`,
  },
  {
    originalPath: "sanpham/sharedsanpham/sharedsanpham.html",
    content: `<p>sharedsanpham works!</p>`,
  },
  {
    originalPath: "sanpham/sharedsanpham/sharedsanpham.ts",
    content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-sharedsanpham',
  imports: [],
  templateUrl: './sharedsanpham.html',
  styleUrl: './sharedsanpham.scss'
})
export class SharedsanphamComponent {

}`,
  },
  // Thêm các file .scss nếu có nội dung
  {
    originalPath: "sanpham/dashboarsanpham/dashboarsanpham.scss",
    content: ``, // Thêm nội dung scss nếu có
  },
  {
    originalPath: "sanpham/detailsanpham/detailsanpham.scss",
    content: ``, // Thêm nội dung scss nếu có
  },
  {
    originalPath: "sanpham/listsanpham/listsanpham.scss",
    content: ``, // Thêm nội dung scss nếu có
  },
  {
    originalPath: "sanpham/sharedsanpham/sharedsanpham.scss",
    content: ``, // Thêm nội dung scss nếu có
  },
];

function createModuleFiles(moduleNameInput) {
  if (
    !moduleNameInput ||
    typeof moduleNameInput !== "string" ||
    moduleNameInput.trim() === ""
  ) {
    console.error("Lỗi: Vui lòng cung cấp tên module hợp lệ.");
    process.exit(1);
  }

  const lowerModuleName = moduleNameInput.toLowerCase().replace(/\s+/g, "_");
  const capitalizedModuleName =
    lowerModuleName.charAt(0).toUpperCase() + lowerModuleName.slice(1);

  console.log(`Đang tạo tệp cho module: ${lowerModuleName}`);
  console.log(`Sử dụng dạng viết hoa chữ cái đầu: ${capitalizedModuleName}`);

  fileDefinitions.forEach((fileDef) => {
    // 1. Thay đổi đường dẫn tệp
    // Giữ nguyên thư mục gốc là 'sanpham' nếu originalPath bắt đầu bằng 'sanpham/'
    // và chỉ thay thế 'sanpham' trong tên file hoặc các thư mục con sâu hơn.
    let newPathString = fileDef.originalPath;
    newPathString = fileDef.originalPath.replace(/sanpham/g, lowerModuleName);
    const absolutePath = path.resolve(__dirname, newPathString);

    // 2. Thay đổi nội dung tệp
    let newContent = fileDef.content;

    // Thay thế "Sanpham" (viết hoa chữ cái đầu) trước
    const capitalizedRegex = new RegExp("Sanpham", "g");
    newContent = newContent.replace(capitalizedRegex, capitalizedModuleName);

    // Sau đó thay thế "sanpham" (viết thường)
    const lowerCaseRegex = new RegExp("sanpham", "g");
    newContent = newContent.replace(lowerCaseRegex, lowerModuleName);

    try {
      const directoryPath = path.dirname(absolutePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Đã tạo thư mục: ${directoryPath}`);
      }

      fs.writeFileSync(absolutePath, newContent, "utf8");
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
