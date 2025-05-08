// src/app/farm-grid/farm-grid.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Signal } from '@angular/core';
import { FarmPlot } from '../farm.service';
import { CommonModule, NgFor, NgStyle } from '@angular/common'; // Import cần thiết
import { FarmPlotComponent } from '../farm-plot/farm-plot.component'; // Import FarmPlotComponent

@Component({
  selector: 'app-farm-grid',
  standalone: true, // Đây là standalone component
  imports: [
    CommonModule, // Cung cấp NgFor, NgStyle, v.v.
    FarmPlotComponent // Import component con mà nó sử dụng
  ],
  templateUrl: './farm-grid.component.html',
  styleUrls: ['./farm-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Tối ưu hiệu suất
})
export class FarmGridComponent {
   // Nhận dữ liệu lưới (giá trị từ signal)
   // Không cần là Observable nữa, chỉ là mảng dữ liệu
  @Input() plots: FarmPlot[][] | null = null;

   // Nhận hành động đang chọn
   @Input() selectedAction: 'plant' | 'water' | 'harvest' | null = null;

   // Phát lại sự kiện khi một ô đất được click
  @Output() plotAction = new EventEmitter<{ row: number; col: number; actionType: 'plant' | 'water' | 'harvest' | null }>();

   // Hàm xử lý sự kiện từ FarmPlotComponent con
   handlePlotAction(event: { row: number; col: number; actionType: 'plant' | 'water' | 'harvest' | null }): void {
      // Đơn giản chỉ phát lại sự kiện lên component cha (AppComponent)
      this.plotAction.emit(event);
   }

   // Helper để tạo style cho grid (vẫn dựa vào kích thước mảng plots)
   get gridStyles(): any {
       // Sử dụng toán tử ? để kiểm tra nullish
       const numRows = this.plots?.length ?? 0;
       const numCols = this.plots?.[0]?.length ?? 0;
       if (numRows > 0 && numCols > 0) {
            return {
                'grid-template-rows': `repeat(${numRows}, 60px)`,
                'grid-template-columns': `repeat(${numCols}, 60px)`
            };
       }
       return {};
   }
}