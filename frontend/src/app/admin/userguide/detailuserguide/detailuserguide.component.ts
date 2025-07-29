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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ListUserguideComponent } from '../listuserguide/listuserguide.component';
import { UserguideService } from '../userguide.service';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
@Component({
  selector: 'app-detailuserguide',
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
    MatProgressBarModule,
  ],
  templateUrl: './detailuserguide.component.html',
  styleUrl: './detailuserguide.component.scss',
})
export class DetailUserguideComponent {
  _ListUserguideComponent: ListUserguideComponent = inject(
    ListUserguideComponent
  );
  _UserguideService: UserguideService = inject(UserguideService);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);
  _http: HttpClient = inject(HttpClient);
  
  // Upload progress tracking
  uploadProgress: { [key: number]: number } = {};
  
  // MinIO configuration
  private readonly minioApiUrl = environment.APIURL + '/minio/upload';
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._UserguideService.setUserguideId(id);
    });

    effect(async () => {
      const id = this._UserguideService.userguideId();
      if (!id) {
        this._router.navigate(['/admin/userguide']);
        this._ListUserguideComponent.drawer.close();
      }
      if (id === 'new') {
        this.DetailUserguide.set({});
        this._ListUserguideComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(['/admin/userguide', 'new']);
      } else {
        await this._UserguideService.getUserguideBy({ id: id });
        this._ListUserguideComponent.drawer.open();
        this._router.navigate(['/admin/userguide', id]);
      }
    });
  }
  DetailUserguide: any = this._UserguideService.DetailUserguide;
  isEdit = signal(false);
  isDelete = signal(false);
  userguideId: any = this._UserguideService.userguideId;
  async ngOnInit() {}
  async handleUserguideAction() {
    if (this.userguideId() === 'new') {
      await this.createUserguide();
    } else {
      await this.updateUserguide();
    }
  }
  private async createUserguide() {
    try {
      await this._UserguideService.CreateUserguide(this.DetailUserguide());
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi tạo userguide:', error);
    }
  }

  private async updateUserguide() {
    try {
      await this._UserguideService.updateUserguide(this.DetailUserguide());
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.update((value) => !value);
    } catch (error) {
      console.error('Lỗi khi cập nhật userguide:', error);
    }
  }
  async DeleteData() {
    try {
      await this._UserguideService.DeleteUserguide(this.DetailUserguide());

      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });

      this._router.navigate(['/admin/userguide']);
    } catch (error) {
      console.error('Lỗi khi xóa userguide:', error);
    }
  }
  goBack() {
    this._router.navigate(['/admin/userguide']);
    this._ListUserguideComponent.drawer.close();
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }

  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailUserguide.update((v: any) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  addBlock() {
    this.DetailUserguide.update((v: any) => {
      if (!v.UserguidBlocks) {
        v.UserguidBlocks = [];
      }
      v.UserguidBlocks.push({
        title: '',
        type: 'text',
        description: '',
      });
      return v;
    });
  }

  removeBlock(item: any) {
    this.DetailUserguide.update((v: any) => {
      if (v.UserguidBlocks && v.UserguidBlocks.length > 0) {
        const index = v.UserguidBlocks.findIndex((block: any) => block.id === item.id);
        if (index > -1) {
          v.UserguidBlocks.splice(index, 1);
        }
      }
      return v;
    });
  }

  // Media Upload Methods
  onImageSelected(event: any, blockIndex: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImageToMinio(file, blockIndex);
    }
    // Reset input
    event.target.value = '';
  }

  onVideoSelected(event: any, blockIndex: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploadVideoToMinio(file, blockIndex);
    }
    // Reset input
    event.target.value = '';
  }

  private async uploadImageToMinio(file: File, blockIndex: number) {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this._snackBar.open('Chỉ được upload file hình ảnh', '', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this._snackBar.open('File quá lớn. Tối đa 10MB', '', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        return;
      }

      const uploadResult = await this.uploadFileToMinio(file, 'userguide/images', blockIndex);
      
      if (uploadResult) {
        this.DetailUserguide.update((v: any) => {
          v.UserguidBlocks[blockIndex].imageUrl = uploadResult.filePath;
          v.UserguidBlocks[blockIndex].imageAlt = v.UserguidBlocks[blockIndex].imageAlt || file.name;
          return v;
        });

        this._snackBar.open('Upload hình ảnh thành công', '', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      this._snackBar.open('Lỗi upload hình ảnh: ' + (error.message || 'Unknown error'), '', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
    } finally {
      delete this.uploadProgress[blockIndex];
    }
  }

  private async uploadVideoToMinio(file: File, blockIndex: number) {
    try {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        this._snackBar.open('Chỉ được upload file video', '', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Validate file size (max 100MB for videos)
      if (file.size > 100 * 1024 * 1024) {
        this._snackBar.open('File quá lớn. Tối đa 100MB', '', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        return;
      }

      const uploadResult = await this.uploadFileToMinio(file, 'userguide/videos', blockIndex);
      
      if (uploadResult) {
        this.DetailUserguide.update((v: any) => {
          v.UserguidBlocks[blockIndex].videoUrl = uploadResult.filePath;
          v.UserguidBlocks[blockIndex].videoType = file.type;
          return v;
        });

        this._snackBar.open('Upload video thành công', '', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    } catch (error: any) {
      console.error('Error uploading video:', error);
      this._snackBar.open('Lỗi upload video: ' + (error.message || 'Unknown error'), '', {
        duration: 5000,
        panelClass: ['snackbar-error'],
      });
    } finally {
      delete this.uploadProgress[blockIndex];
    }
  }

  private uploadFileToMinio(file: File, folder: string, blockIndex: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('originalName', file.name);

      // Initialize progress
      this.uploadProgress[blockIndex] = 0;

      this._http.post(this.minioApiUrl, formData, {
        observe: 'events',
        reportProgress: true
      }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress[blockIndex] = Math.round(100 * event.loaded / event.total);
            }
          } else if (event.type === HttpEventType.Response) {
            resolve(event.body);
          }
        },
        error: (error) => {
          console.error('Upload error:', error);
          reject(error);
        }
      });
    });
  }

  removeMedia(blockIndex: number, mediaType: 'image' | 'video') {
    this.DetailUserguide.update((v: any) => {
      if (mediaType === 'image') {
        v.UserguidBlocks[blockIndex].imageUrl = '';
        v.UserguidBlocks[blockIndex].imageAlt = '';
      } else if (mediaType === 'video') {
        v.UserguidBlocks[blockIndex].videoUrl = '';
        v.UserguidBlocks[blockIndex].videoType = '';
      }
      return v;
    });

    this._snackBar.open(`Đã xóa ${mediaType === 'image' ? 'hình ảnh' : 'video'}`, '', {
      duration: 2000,
      panelClass: ['snackbar-success'],
    });
  }

  getMediaUrl(filePath: string): string {
    if (!filePath) return '';
    
    // If it's already a full URL, return as is
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    // Construct MinIO URL
    return `${environment.APIURL}/files/${filePath}`;
  }
}
