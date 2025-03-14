import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedFile!: File;
  ketqua:any = [];
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Lấy file từ input
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Chọn file trước khi upload!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile); // 'file' phải khớp với tên bên NestJS
  
    fetch(`${environment.APIURL}/googledrive/upload`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      this.ketqua  = data.jsonData;
      console.log('Upload thành công', data);
    })
    .catch(error => {
      console.error('Lỗi upload file', error);
    });
  }
  
}
