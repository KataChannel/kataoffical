import { CommonModule } from '@angular/common';
import { Component, effect, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResourceService } from '../../../admin/resource/resource.service';
import { environment } from '../../../../environments/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Debounce } from '../../../shared/utils/decorators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tainguyenctv',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './tainguyenctv.component.html',
  styleUrls: ['./tainguyenctv.component.scss'],
})
export class TainguyenctvComponent {
  Listfilters:any= [
    { label: 'All Types', active: true },
    { label: 'Banners', active: false },
    { label: 'Social Media', active: false },
    { label: 'Email', active: false },
    { label: 'Video', active: false },
  ]
_ResourceService: ResourceService = inject(ResourceService);
_snackBar: MatSnackBar = inject(MatSnackBar);
ImageURL = environment.ImageURL;
Listresource = this._ResourceService.ListResource;
page = this._ResourceService.page;
pageCount = this._ResourceService.pageCount;
total = this._ResourceService.total;
pageSize = this._ResourceService.pageSize;
resourceId = this._ResourceService.resourceId;
DetailCopyCode = {
  title: '',
  content: '',
};
constructor() {
    effect(async () => {
      await this._ResourceService.getAllResource(this.pageSize(),true);
    });
  }
async ngOnInit(): Promise<void> {
    this._ResourceService.listenResourceUpdates();
    await this._ResourceService.getAllResource(this.pageSize(),true);
  }
  @Debounce(300)
  async Applyfilter(event: any) {
    console.log(event.target.value);
    const filter = event.target.value;
    await this._ResourceService.getResourceBy({ title: filter.toLowerCase() });
    if (filter === '') {
      await this._ResourceService.getAllResource(this.pageSize(), true);
    }
  }

downloadFile(file:any) {
    const fileURL = file;
    const fileName = fileURL.split('/').pop() || 'download.png';

    // Sử dụng fetch để lấy file dưới dạng Blob
    fetch(fileURL)
        .then(response => response.blob())
        .then(blob => {
            // Tạo URL tạm thời cho Blob
            const blobURL = window.URL.createObjectURL(blob);
            
            // Tạo thẻ <a> để tải xuống
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = fileName; // Đặt tên file tải xuống
            document.body.appendChild(link);
            link.click();
            
            // Dọn dẹp
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobURL); // Giải phóng URL
        })
        .catch(error => {
            console.error('Lỗi khi tải file:', error);
            // Fallback: Nếu fetch thất bại, thử tải trực tiếp
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      this._snackBar.open('Sao Chép Thành Công', '', {
        duration: 1000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
        panelClass: ['snackbar-success'],
      });
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  }

  private _dialog: MatDialog = inject(MatDialog);
  openCopycodeDialog(item:any, template: TemplateRef<any>) {
    const imageUrl = this.ImageURL +'/'+item.url
    this.DetailCopyCode.title = item.title;
    this.DetailCopyCode.content = `<a href="${imageUrl}"> <img src="${imageUrl}" alt="${item.title}" /> </a>`;

    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.copyCode(this.DetailCopyCode.content);
      }
    });
  }
}
