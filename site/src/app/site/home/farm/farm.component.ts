// src/app/app.component.ts

import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core'; // Import Signal stuff and inject
import { FarmService, FarmPlot, Crop } from './farm.service';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common'; // Import CommonModule và directives
import { FormsModule } from '@angular/forms'; // Import FormsModule cho [(ngModel)]
import { FarmGridComponent } from './farm-grid/farm-grid.component';
@Component({
  selector: 'app-farm',
  standalone: true, // Đây là standalone component
  imports: [
    CommonModule,
    NgIf, NgFor, NgClass, // Import directives
    FormsModule, // Cần FormsModule cho Two-Way Binding với select
    FarmGridComponent // Import component con FarmGrid
  ],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit, OnDestroy {
  title = 'Nông Trại Cơ Bản - Angular (Standalone & Signals)';

  // Sử dụng inject để lấy instance của FarmService (cách hiện đại hơn)
  private farmService = inject(FarmService);

  // Dữ liệu lưới ô đất từ FarmService Signal
  // Truy cập signal bằng cách gọi nó như một hàm: this.farmService.plots()
  plots = this.farmService.plots; // Đây là signal

  availableCrops: Crop[] = []; // Danh sách cây trồng có thể gieo

  // Sử dụng Signal để theo dõi hành động mà người chơi đang chọn
  selectedAction = signal<'plant' | 'water' | 'harvest' | null>(null);
  selectedCropName = signal<string | null>('carrot'); // Mặc định gieo cà rốt

  // Computed signal để kiểm tra xem có đang ở chế độ gieo hạt không
  isPlanting = computed(() => this.selectedAction() === 'plant');


  constructor() {
     // Constructor giờ đây chỉ nên dùng để inject services
  }

  ngOnInit(): void {
     console.log('App Component initialized.');
    // FarmService đã tự khởi tạo farm và timer trong constructor của nó
    // Lấy danh sách cây trồng có sẵn
    this.availableCrops = this.farmService.getCrops();
  }

  // Xử lý hành động click từ FarmGridComponent
  handlePlotAction(event: { row: number; col: number; actionType: 'plant' | 'water' | 'harvest' | null }): void {
    const { row, col, actionType } = event;

    if (actionType === 'plant' && this.selectedCropName()) { // Lấy giá trị signal bằng cách gọi selectedCropName()
      this.farmService.plantCrop(row, col, this.selectedCropName()!); // Dùng ! vì đã kiểm tra null ở if
    } else if (actionType === 'water') {
      this.farmService.waterPlot(row, col);
    } else if (actionType === 'harvest') {
      this.farmService.harvestPlot(row, col);
    }
  }

  // Chọn hành động từ toolbar
  selectAction(action: 'plant' | 'water' | 'harvest' | null): void {
    this.selectedAction.set(action); // Cập nhật signal bằng set()
    console.log(`Selected action: ${action}`);
     // Reset loại cây nếu không chọn hành động Gieo
    if (action !== 'plant') {
         this.selectedCropName.set(null);
    } else {
         // Nếu chọn gieo, mặc định chọn loại cây đầu tiên
         if (this.availableCrops.length > 0) {
             this.selectedCropName.set(this.availableCrops[0].name);
         } else {
             this.selectedCropName.set(null);
         }
    }
  }

  // Chọn loại cây để gieo (nếu hành động là 'plant')
  selectCrop(event: Event): void {
       const selectElement = event.target as HTMLSelectElement;
       const cropName = selectElement.value;
       if (this.isPlanting()) { // Sử dụng computed signal
           this.selectedCropName.set(cropName);
           console.log(`Selected crop to plant: ${cropName}`);
       }
  }


  ngOnDestroy(): void {
    // Dừng timer game khi component bị hủy
    this.farmService.stopGameTick();
  }
}