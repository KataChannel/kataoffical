// src/app/farm-plot/farm-plot.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FarmPlot, PlotState } from '../farm.service';
import { CommonModule, NgClass, NgIf } from '@angular/common'; // Import cần thiết cho standalone component

@Component({
  selector: 'app-farm-plot',
  standalone: true, // Đây là standalone component
  imports: [
    CommonModule, // Cung cấp NgIf, NgClass, v.v.
  ],
  templateUrl: './farm-plot.component.html',
  styleUrls: ['./farm-plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Vẫn nên dùng OnPush với Input để tối ưu
})
export class FarmPlotComponent {
  // Input nhận dữ liệu ô đất. Có thể dùng cú pháp mới Input() nếu muốn (Angular 16+)
  @Input() plot!: FarmPlot;
  @Input() selectedAction: 'plant' | 'water' | 'harvest' | null = null;

  // Output phát ra sự kiện click
  @Output() plotAction = new EventEmitter<{ row: number; col: number; actionType: 'plant' | 'water' | 'harvest' | null }>();

  onClick(): void {
    console.log(`Plot clicked: (${this.plot.row}, ${this.plot.col}), State: ${this.plot.state}, Action: ${this.selectedAction}`);
    this.plotAction.emit({
      row: this.plot.row,
      col: this.plot.col,
      actionType: this.selectedAction
    });
  }

  // Helper để lấy class CSS dựa trên trạng thái
  get plotClass(): string {
    let classes = `plot plot-${this.plot.state}`;
    if (this.plot.watered) {
        classes += ' watered';
    }
     if (this.plot.cropType) {
        classes += ` crop-${this.plot.cropType}`;
     }
    return classes;
  }

  // Helper để hiển thị tiến độ
  get growthProgressDisplay(): string {
      if (this.plot.state === 'growing' || this.plot.state === 'ready') {
          return `${Math.floor(this.plot.growthProgress)}%`;
      }
      return '';
  }
}