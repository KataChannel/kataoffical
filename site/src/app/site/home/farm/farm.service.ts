// src/app/farm.service.ts

import { Injectable, signal, computed, WritableSignal, Signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

// Định nghĩa trạng thái của ô đất
export type PlotState = 'empty' | 'planted' | 'growing' | 'ready';

// Định nghĩa một ô đất
export interface FarmPlot {
  id: number; // ID duy nhất
  row: number;
  col: number;
  state: PlotState;
  cropType: string | null; // Loại cây trồng (ví dụ: 'carrot', 'wheat')
  growthProgress: number; // Từ 0 đến 100
  watered: boolean; // Đã tưới nước chưa? (đơn giản)
}

// Định nghĩa loại cây trồng (có thể mở rộng sau)
export interface Crop {
  name: string;
  growthTime: number; // Thời gian để lớn (ví dụ: số tick game)
  harvestValue: number; // Giá trị khi thu hoạch (nếu có kinh tế)
  color: string; // Màu sắc của cây trồng
}

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  // Sử dụng Signal để quản lý trạng thái lưới đất
  private farmPlots: WritableSignal<FarmPlot[][]> = signal([]);
  plots: Signal<FarmPlot[][]> = this.farmPlots.asReadonly(); // Public readonly signal

  private rows = 5;
  private cols = 5;
  private gameTickInterval = 1000; // 1 giây mỗi tick game
  private gameSubscription: Subscription | null = null;

  // Định nghĩa 5 loại cây với màu sắc tương ứng:
  private crops: Crop[] = [
    { name: 'carrot', growthTime: 10, harvestValue: 5, color: 'yellow' }, // vàng
    { name: 'lettuce', growthTime: 8, harvestValue: 4, color: 'green' }, // xanh lá cây
    { name: 'blueberry', growthTime: 12, harvestValue: 6, color: 'blue' }, // xanh nước biển
    { name: 'tomato', growthTime: 9, harvestValue: 5, color: 'red' }, // đỏ
    { name: 'potato', growthTime: 11, harvestValue: 7, color: 'brown' }, // nâu
  ];

  constructor() {
    console.log('FarmService initialized');
    this.initializeFarm(this.rows, this.cols);
    this.startGameTick();
  }

  // Khởi tạo nông trại
  initializeFarm(rows: number, cols: number): void {
    this.rows = rows;
    this.cols = cols;
    const initialPlots: FarmPlot[][] = [];
    let id = 0;
    for (let i = 0; i < rows; i++) {
      initialPlots[i] = [];
      for (let j = 0; j < cols; j++) {
        initialPlots[i][j] = {
          id: id++,
          row: i,
          col: j,
          state: 'empty',
          cropType: null,
          growthProgress: 0,
          watered: false
        };
      }
    }
    // Cập nhật signal
    this.farmPlots.set(initialPlots);
    console.log(`Farm initialized with ${rows}x${cols} grid`);
  }

  // Lấy danh sách cây trồng
  getCrops(): Crop[] {
    return this.crops;
  }

  // Gieo hạt
  plantCrop(row: number, col: number, cropName: string): boolean {
    const currentPlots = this.farmPlots(); // Lấy giá trị hiện tại của signal
    const plot = currentPlots?.[row]?.[col];
    const crop = this.crops.find(c => c.name === cropName);

    if (plot && plot.state === 'empty' && crop) {
      // Sử dụng mutate để thay đổi trực tiếp mảng bên trong signal
      const newPlots = this.farmPlots().map(rowArr => rowArr.map(plot => ({ ...plot })));
      const p = newPlots[row][col];
      p.state = 'planted';
      p.cropType = crop.name;
      p.growthProgress = 0;
      p.watered = false;

      // Log thêm thông tin về màu của cây được gieo
      console.log(`Planted ${crop.name} (${crop.color}) at (${row}, ${col})`);

      this.farmPlots.set(newPlots);
      return true;
    }
    return false;
  }

  // Tưới nước
  waterPlot(row: number, col: number): boolean {
    const currentPlots = this.farmPlots();
    const plot = currentPlots?.[row]?.[col];

    if (plot && (plot.state === 'planted' || plot.state === 'growing') && !plot.watered) {
      const newPlots = this.farmPlots().map(rowArr => rowArr.map(plot => ({ ...plot })));
      newPlots[row][col].watered = true;
      this.farmPlots.set(newPlots);
      console.log(`Watered plot at (${row}, ${col})`);
      return true;
    }
    return false;
  }

  // Thu hoạch
  harvestPlot(row: number, col: number): boolean {
    const currentPlots = this.farmPlots();
    const plot = currentPlots?.[row]?.[col];

    if (plot && plot.state === 'ready') {
      const harvestedCrop = plot.cropType;
      console.log(`Harvested ${harvestedCrop} from (${row}, ${col})`);

      const newPlots = this.farmPlots().map(rowArr => rowArr.map(plot => ({ ...plot })));
      const p = newPlots[row][col];
      p.state = 'empty';
      p.cropType = null;
      p.growthProgress = 0;
      p.watered = false;
      this.farmPlots.set(newPlots);
      return true;
    }
    return false;
  }

  // Bắt đầu vòng lặp game tick
  private startGameTick(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.gameSubscription = interval(this.gameTickInterval).subscribe(() => {
      this.updateGrowth();
    });
    console.log('Game tick started');
  }

  // Cập nhật sự phát triển của cây sau mỗi tick
  private updateGrowth(): void {
    let changed = false;
    // Sử dụng mutate để thay đổi trực tiếp mảng, Angular sẽ phát hiện sự thay đổi trong signal
    const newPlots = this.farmPlots().map(rowArr => rowArr.map(plot => ({ ...plot })));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const plot = newPlots[i][j];
        const crop = this.crops.find(c => c.name === plot.cropType);

        if (plot.cropType && (plot.state === 'planted' || plot.state === 'growing') && crop) {
          if (plot.state === 'planted' && plot.growthProgress > 0) {
            plot.state = 'growing';
            changed = true;
          }

          // Reset trạng thái tưới sau khi cây lớn 1 bước
          plot.watered = false; // Uncomment dòng này nếu muốn tưới mỗi tick

          if (plot.growthProgress < 100) { // Đánh dấu thay đổi nếu cây vẫn đang lớn
            changed = true;
          }
        }
        // Logic cây không lớn nếu không tưới có thể thêm ở đây
      }
    }
    this.farmPlots.set(newPlots);

    // Log hoặc kiểm tra changed nếu cần
    // console.log('Growth update tick. Changed:', changed);

    // Không cần emitPlots() nữa, Signal tự động thông báo khi mutate/set
  }

  // Dừng vòng lặp game tick
  stopGameTick(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
      this.gameSubscription = null;
      console.log('Game tick stopped');
    }
  }

  // Dọn dẹp khi Service không còn dùng nữa
  ngOnDestroy(): void {
    this.stopGameTick();
  }
}