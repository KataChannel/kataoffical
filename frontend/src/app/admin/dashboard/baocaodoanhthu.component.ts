import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-baocaodoanhthu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="revenue-report-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Báo Cáo Doanh Thu Chi Tiết</mat-card-title>
          <mat-card-subtitle>Phân tích chi tiết doanh thu theo thời gian</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="report-info">
            <p><strong>Khoảng thời gian:</strong> {{ timeFrame }}</p>
            <p><strong>Từ ngày:</strong> {{ startDate }}</p>
            <p><strong>Đến ngày:</strong> {{ endDate }}</p>
          </div>
          
          <div class="under-development">
            <mat-icon>construction</mat-icon>
            <h3>Đang phát triển</h3>
            <p>Trang báo cáo doanh thu chi tiết đang được phát triển.</p>
            <p>Sẽ bao gồm:</p>
            <ul>
              <li>Báo cáo doanh thu theo sản phẩm</li>
              <li>Báo cáo doanh thu theo khách hàng</li>
              <li>Biểu đồ phân tích xu hướng</li>
              <li>Xuất báo cáo Excel/PDF</li>
            </ul>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Quay lại Dashboard
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .revenue-report-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .report-info {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    
    .under-development {
      text-align: center;
      padding: 48px 24px;
      color: #666;
    }
    
    .under-development mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ff9800;
      margin-bottom: 16px;
    }
    
    .under-development h3 {
      color: #333;
      margin-bottom: 16px;
    }
    
    .under-development ul {
      text-align: left;
      display: inline-block;
      margin-top: 16px;
    }
    
    .under-development li {
      margin-bottom: 8px;
    }
  `]
})
export class BaocaodoanhtuComponent implements OnInit {
  timeFrame: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.timeFrame = params['timeFrame'] || 'Không xác định';
      this.startDate = params['startDate'] || '';
      this.endDate = params['endDate'] || '';
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
