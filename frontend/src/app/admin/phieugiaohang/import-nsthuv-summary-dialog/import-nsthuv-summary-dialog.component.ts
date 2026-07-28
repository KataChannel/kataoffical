import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ImportSummaryItem {
  madonhang: string;
  nsThuVeExcel: string;
  status: 'updated' | 'no_change' | 'not_found';
  message: string;
}

@Component({
  selector: 'app-import-nsthuv-summary-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title class="sticky-header">
      <mat-icon color="primary" style="vertical-align: middle; margin-right: 8px;">assessment</mat-icon>
      Kết quả cập nhật NS Thu Về
    </h2>

    <mat-dialog-content class="summary-container">
      <div class="summary-stats">
        <span class="stat-item updated">Đã cập nhật: {{stats.updated}}</span>
        <span class="stat-item no-change">Không thay đổi: {{stats.no_change}}</span>
        <span class="stat-item not-found">Không tìm thấy: {{stats.not_found}}</span>
      </div>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z1">
        
        <!-- Mã Đơn Hàng Column -->
        <ng-container mat-columnDef="madonhang">
          <th mat-header-cell *matHeaderCellDef> Mã Đơn Hàng </th>
          <td mat-cell *matCellDef="let element"> 
            <span style="font-family: monospace; font-weight: 600;">{{element.madonhang}}</span>
          </td>
        </ng-container>

        <!-- Giá trị NS Column -->
        <ng-container mat-columnDef="nsThuVeExcel">
          <th mat-header-cell *matHeaderCellDef> NS Thu Về (Excel) </th>
          <td mat-cell *matCellDef="let element"> {{element.nsThuVeExcel || '(Trống)'}} </td>
        </ng-container>

        <!-- Trạng thái Column -->
        <ng-container mat-columnDef="status">
          <th mat-header-cell *matHeaderCellDef> Trạng thái </th>
          <td mat-cell *matCellDef="let element">
            <span class="status-label" [ngClass]="element.status">
              {{getStatusLabel(element.status)}}
            </span>
          </td>
        </ng-container>

        <!-- Chi tiết Column -->
        <ng-container mat-columnDef="message">
          <th mat-header-cell *matHeaderCellDef> Chi tiết </th>
          <td mat-cell *matCellDef="let element"> {{element.message}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
            [class.not-found-row]="row.status === 'not_found'"></tr>
      </table>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" [mat-dialog-close]="true">Đóng</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .summary-container {
      max-height: 65vh;
      overflow-y: auto;
      padding: 0;
      margin: 0;
    }
    .summary-stats {
      padding: 12px 24px;
      background: #f8f9fa;
      display: flex;
      gap: 20px;
      font-size: 0.9rem;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      z-index: 101;
    }
    .stat-item {
      padding: 4px 12px;
      border-radius: 16px;
      font-weight: 500;
    }
    .stat-item.updated { background: #e8f5e9; color: #2e7d32; }
    .stat-item.no-change { background: #e3f2fd; color: #1565c0; }
    .stat-item.not-found { background: #ffebee; color: #c62828; }

    table {
      width: 100%;
    }
    .status-label {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      white-space: nowrap;
    }
    .status-label.updated { background: #e8f5e9; color: #2e7d32; }
    .status-label.no_change { background: #e3f2fd; color: #1565c0; }
    .status-label.not_found { background: #ffebee; color: #c62828; }

    tr.not-found-row {
      background-color: #fffde7;
    }
    .sticky-header {
      padding: 20px 24px;
      margin: 0;
      background: white;
    }
    th.mat-header-cell {
      background: #fafafa;
      font-weight: 600;
      color: #555;
    }
    td.mat-cell {
      padding: 12px 16px;
      font-size: 0.9rem;
    }
  `]
})
export class ImportNSThuVeSummaryDialogComponent {
  displayedColumns: string[] = ['madonhang', 'nsThuVeExcel', 'status', 'message'];
  dataSource: ImportSummaryItem[];
  stats = {
    updated: 0,
    no_change: 0,
    not_found: 0
  };

  constructor(
    public dialogRef: MatDialogRef<ImportNSThuVeSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: ImportSummaryItem[] }
  ) {
    this.dataSource = [...data.items].sort((a, b) => {
      if (a.status === 'not_found' && b.status !== 'not_found') return -1;
      if (a.status !== 'not_found' && b.status === 'not_found') return 1;
      return 0;
    });

    this.stats.updated = data.items.filter(i => i.status === 'updated').length;
    this.stats.no_change = data.items.filter(i => i.status === 'no_change').length;
    this.stats.not_found = data.items.filter(i => i.status === 'not_found').length;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'updated': return 'Đã cập nhật';
      case 'not_found': return 'Không tìm thấy';
      case 'no_change': return 'Không thay đổi';
      default: return status;
    }
  }
}
