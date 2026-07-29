import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sync-data',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule, 
    MatProgressBarModule, 
    MatIconModule
  ],
  templateUrl: './sync-data.component.html',
  styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent implements OnInit, OnDestroy {
  progress = 0;
  message = '';
  isSyncing = false;
  hasError = false;
  timer: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkStatus();
  }

  checkStatus() {
    this.http.get<any>(`${environment.APIURL}/sync/status`).subscribe((res: any) => {
      this.isSyncing = res.isSyncing;
      this.progress = res.progress;
      this.message = res.message;
      this.hasError = res.error;

      if (this.isSyncing) {
        this.pollStatus();
      }
    });
  }

  pollStatus() {
    if (this.timer) clearTimeout(this.timer);
    if (!this.isSyncing) return;

    this.timer = setTimeout(() => {
      this.checkStatus();
    }, 2000);
  }

  startSyncFull() {
    if (this.isSyncing) return;
    
    if (confirm('Đồng bộ DATA MỚI từ máy chủ thực tế (116.118.49.243) về máy cục bộ: chỉ THÊM đơn hàng / khách hàng / NCC / đơn mua MỚI. KHÔNG ghi đè — dữ liệu go-live (rep, công nợ đầu kỳ, MST...) được giữ nguyên. Tiến hành?')) {
       this.isSyncing = true;
       this.progress = 1;
       this.message = 'Đang bắt đầu...';
       this.hasError = false;
       
       this.http.post<any>(`${environment.APIURL}/sync/full`, {}).subscribe((res: any) => {
          this.pollStatus();
       }, (err: any) => {
          this.hasError = true;
          this.message = 'Không thể kết nối đến máy chủ API Đồng bộ!';
          this.isSyncing = false;
       });
    }
  }

  syncPartial(type: string) {
    alert(`Do ràng buộc dữ liệu (Foreign Keys), chúng tôi khuyến nghị bạn nên CẬP NHẬT TOÀN BỘ. Tính năng cập nhật lẻ "${type}" tạm thời được khóa để tránh sai lệch Data! Vui lòng dùng nút TOÀN BỘ.`);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }
}
