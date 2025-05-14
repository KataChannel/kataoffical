import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploadresource',
  imports: [
    CommonModule
  ],
  templateUrl: './uploadresource.component.html',
  styleUrls: ['./uploadresource.component.scss']
})
export class UploadresourceComponent implements OnInit, OnChanges {

  @Input() allowedFileTypes: string[] = [];
  @Input() maxFileSizeMB: number = 5;
  @Input() uploadUrl: string = '';
  @Input() category: string = 'default';
  @Input() group: string = 'default';

  @Output() filesSelectedEvent = new EventEmitter<File[]>();
  @Output() uploadSuccessEvent = new EventEmitter<any>();
  @Output() uploadErrorEvent = new EventEmitter<any>();

  isDragOver: boolean = false;
  selectedFiles: File[] = [];
  fileErrors: { [fileName: string]: string } = {};

  uploadProgress: number = 0;
  uploadMessage: string = '';
  isUploading: boolean = false;
  isUploadSuccess: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowedFileTypes'] || changes['maxFileSizeMB']) {
      console.log('Validation rules (allowedFileTypes or maxFileSizeMB) have changed.');
      // Cân nhắc re-validate các file đã chọn nếu cần thiết:
      // this.revalidateSelectedFiles();
    }
    if (changes['category']) {
      console.log('Category changed to:', this.category);
    }
    if (changes['group']) {
      console.log('Group changed to:', this.group);
    }
  }

  // private revalidateSelectedFiles(): void {
  //   const currentSelectedFiles = [...this.selectedFiles];
  //   this.selectedFiles = []; // Xóa selectedFiles hiện tại để handleFiles xử lý lại
  //   this.fileErrors = {};    // Xóa các lỗi cũ
  //   this.handleFiles(currentSelectedFiles, true); // Gọi handleFiles với cờ revalidation
  // }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    this.uploadMessage = '';

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.uploadMessage = '';
    if (inputElement.files && inputElement.files.length > 0) {
      this.handleFiles(Array.from(inputElement.files));
    }
    inputElement.value = '';
  }

  private handleFiles(files: File[], isRevalidation: boolean = false): void {
    // Nếu không phải là re-validation, thì đây là file mới được thêm
    // Ta sẽ không xóa các file đã chọn trước đó, mà chỉ thêm file mới vào
    const newlyProcessedFiles: File[] = [];
    const tempFileErrors: { [fileName: string]: string } = {};

    files.forEach(file => {
      // Kiểm tra trùng lặp với các file đã có trong selectedFiles (nếu không phải revalidation)
      if (!isRevalidation && this.selectedFiles.find(existingFile => existingFile.name === file.name && existingFile.size === file.size)) {
        tempFileErrors[file.name] = 'File đã tồn tại trong danh sách.';
        // Nếu file đã tồn tại và đang revalidate, ta vẫn giữ nó và lỗi của nó (nếu có)
        if (isRevalidation) newlyProcessedFiles.push(file);
        return;
      }

      // Validate loại file
      if (this.allowedFileTypes && this.allowedFileTypes.length > 0 && !this.allowedFileTypes.includes(file.type) && file.type !== '') { // Thêm điều kiện file.type !== '' để bỏ qua thư mục
         // Đôi khi kéo thả thư mục vào file.type sẽ là rỗng
        if (file.size > 0 || file.type !== '') { // Chỉ báo lỗi nếu nó thực sự là file hoặc có type
            tempFileErrors[file.name] = `Loại file không hợp lệ. Chỉ chấp nhận: ${this.allowedFileTypes.join(', ')}`;
        } else if (file.size === 0 && file.type === '') {
             // Có thể là thư mục, bỏ qua không báo lỗi
             console.log(`Skipping directory or empty file: ${file.name}`);
             return; // Bỏ qua không xử lý
        }

      }

      // Validate kích thước file
      const maxSizeBytes = this.maxFileSizeMB * 1024 * 1024;
      if (this.maxFileSizeMB > 0 && file.size > maxSizeBytes) {
        tempFileErrors[file.name] = `Kích thước file vượt quá giới hạn ${this.maxFileSizeMB}MB.`;
      }

      newlyProcessedFiles.push(file);
    });

    if (isRevalidation) {
        this.selectedFiles = newlyProcessedFiles;
        this.fileErrors = tempFileErrors;
    } else {
        // Chỉ thêm các file mới chưa có và không bị lỗi ngay từ đầu
        newlyProcessedFiles.forEach(nf => {
            if (!this.selectedFiles.some(sf => sf.name === nf.name && sf.size === nf.size)) {
                 this.selectedFiles.push(nf);
            }
            // Cập nhật lỗi cho file mới này
            if(tempFileErrors[nf.name]) {
                this.fileErrors[nf.name] = tempFileErrors[nf.name];
            } else {
                delete this.fileErrors[nf.name]; // Xóa lỗi nếu file này trở nên hợp lệ
            }
        });
    }

    if (this.selectedFiles.length > 0 || isRevalidation) {
      this.filesSelectedEvent.emit(this.selectedFiles);
    }
  }


  removeFile(index: number, event: MouseEvent): void {
    event.stopPropagation();
    const removedFile = this.selectedFiles.splice(index, 1)[0];
    if (removedFile) {
      delete this.fileErrors[removedFile.name];
    }
    this.uploadMessage = '';
    if (this.selectedFiles.length === 0) {
        this.filesSelectedEvent.emit([]);
    } else {
        this.filesSelectedEvent.emit(this.selectedFiles);
    }
  }

  formatFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0 && !Number.isInteger(bytes)) return 'N/A'; // Handle potential non-file entries
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  hasErrors(): boolean {
    return Object.keys(this.fileErrors).some(fileName => {
        return this.selectedFiles.some(sf => sf.name === fileName) && this.fileErrors[fileName];
    });
  }
  validFilesCount(): number {
    return this.selectedFiles.filter(file => !this.fileErrors[file.name] && file.size > 0).length;
  }
  async onUpload(event?: MouseEvent): Promise<void> {
    if (event) {
      event.stopPropagation();
    }

    const filesToUpload = this.selectedFiles.filter(
      file => !this.fileErrors[file.name] && file.size > 0
    );

    if (filesToUpload.length === 0) {
      if (!this.uploadUrl) {
        this.uploadMessage = 'Chưa cấu hình URL để upload.';
      } else if (this.selectedFiles.length > 0) {
        this.uploadMessage = 'Không có file hợp lệ để upload.';
      } else {
        this.uploadMessage = 'Chưa chọn file nào.';
      }
      this.isUploadSuccess = false;
      this.isUploading = false;
      return;
    }

    if (!this.uploadUrl) {
      this.uploadMessage = 'Chưa cấu hình URL để upload.';
      this.isUploadSuccess = false;
      console.error('Upload URL is not configured.');
      return;
    }
    if (this.isUploading) return;

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadMessage = `Đang chuẩn bị upload ${filesToUpload.length} file...`;
    this.isUploadSuccess = false;

    let uploadedCount = 0;
    const totalCount = filesToUpload.length;

    // Helper function to upload a single file and return a promise that resolves on completion.
    const uploadFile = (file: File): Promise<void> => {
      return new Promise<void>(resolve => {
        const fileFormData = new FormData();
        fileFormData.append('file', file, file.name);
        if (this.category) {
          fileFormData.append('category', this.category);
        }
        if (this.group) {
          fileFormData.append('group', this.group);
        }

        this.http.post(this.uploadUrl, fileFormData, {
          reportProgress: true,
          observe: 'events'
        }).subscribe({
          next: (httpEvent: any) => {
            if (httpEvent.type === HttpEventType.UploadProgress && httpEvent.total) {
              const progress = Math.round(100 * httpEvent.loaded / httpEvent.total);
              this.uploadProgress = progress;
              this.uploadMessage = `Đang upload ${file.name}... ${progress}%`;
            } else if (httpEvent instanceof HttpResponse) {
              uploadedCount++;
              this.uploadSuccessEvent.emit(httpEvent.body);
              // Loại bỏ file đã upload khỏi danh sách selectedFiles và cập nhật lỗi liên quan
              this.selectedFiles = this.selectedFiles.filter(existingFile => existingFile !== file);
              delete this.fileErrors[file.name];
              resolve();
            }
          },
          error: (err: any) => {
            this.uploadMessage = `Upload ${file.name} thất bại.`;
            this.uploadErrorEvent.emit(err);
            console.error('Upload error:', err);
            // Tiếp tục với file tiếp theo ngay cả khi gặp lỗi.
            resolve();
          }
        });
      });
    };

    // Upload các file một cách tuần tự bằng async/await
    for (let i = 0; i < totalCount; i++) {
      await uploadFile(filesToUpload[i]);
    }

    this.isUploading = false;
    this.uploadMessage = `Upload thành công ${uploadedCount} file!`;
    this.isUploadSuccess = uploadedCount === totalCount;

    // Cập nhật lại selectedFiles cho component
    this.filesSelectedEvent.emit(this.selectedFiles.length === 0 ? [] : this.selectedFiles);
  }
}