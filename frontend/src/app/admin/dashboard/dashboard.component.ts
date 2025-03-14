import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedFile!: File;
  ketqua:any = [];
  isLoading = false; // Biến để kiểm tra trạng thái loading
  uploadMessage = ''; // Hiển thị thông báo sau khi upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Lấy file từ input
    this.uploadMessage = ''; // Reset thông báo cũ
  }

  async uploadFile() {
    if (!this.selectedFile) {
      alert('Chọn file trước khi upload!');
      return;
    }
    this.isLoading = true; // Bắt đầu loading
    this.uploadMessage = '';

    const formData = new FormData();
    formData.append('file', this.selectedFile); // 'file' phải khớp với tên bên NestJS
  
    try {
      const response = await fetch(`${environment.APIURL}/googledrive/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Lỗi upload: ${response.statusText}`);
      }

      const data = await response.json();
      this.ketqua  = data.jsonData;
      this.uploadMessage = 'Upload thành công!';
      console.log('Upload thành công', data);
    } catch (error) {
      this.uploadMessage = 'Lỗi khi upload file!';
      console.error('Lỗi upload file', error);
    } finally {
      this.isLoading = false; // Dừng loading dù có lỗi hay không
    }
  }
 
}
