import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  Signal,
  WritableSignal,
  computed,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

// --- Giữ nguyên các Interface ---
type Elemental = 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho';
export type PlotState = 'empty' | 'seed' | 'growing' | 'ready';
export type TileType = 'grass' | 'soil' | 'pen';
export interface MapTile {
  id: number;
  row: number;
  col: number;
  type: TileType;
  soilType?: number;
  state?: PlotState;
  cropId: number | null;
  growthProgress: number;
  effectiveGrowthTime: number;
  effectiveHarvestValue: number;
  isPenTopLeft?: boolean;
}
export interface Crop {
  id: number;
  name: string;
  element: Elemental;
  growthTime: number;
  harvestValue: number;
  color: string;
}
export interface Material {
  id: number;
  name: string;
}
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  type: 'seed' | 'fruit' | 'material';
  color?: string;
}
// --- Hết Interface ---

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm.component.html',
  // ChangeDetectionStrategy.OnPush giúp tối ưu khi sử dụng signals
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmComponent implements OnInit, OnDestroy, AfterViewInit {
  rows = 100;
  cols = 100;
  baseTileSize = 48; // Kích thước cơ bản của 1 ô (w-12 * 4px)

  farmArea = { startRow: 10, endRow: 29, startCol: 10, endCol: 29 };
  animalArea = { startRow: 40, endRow: 79, startCol: 40, endCol: 79 };

  private mapTilesSignal: WritableSignal<MapTile[][]> = signal([]);
  private tickSub!: Subscription;
  lastHarvestInfo: string = '';
  private materialDropRate: number = 0.8;
  private seedDropRate: number = 0.5;
  showInventoryDialog: boolean = false;

  // --- Các WritableSignal cho Zoom & Pan ---
  zoomLevel = signal(1);
  panX = signal(0);
  panY = signal(0);
  isPanning = signal(false);
  private lastPanCoords = { x: 0, y: 0 };
  viewportWidth = signal(0);
  viewportHeight = signal(0);

  // --- WritableSignal cho các ô đang phát triển ---
  private growingPlots: WritableSignal<MapTile[]> = signal([]);

  // --- Lấy tham chiếu đến Map Container ---
  @ViewChild('mapContainer') mapContainerRef!: ElementRef<HTMLDivElement>;

  // --- Giữ nguyên Crops, Materials, Inventory, etc. ---
  crops: Crop[] = [
    {
      id: 1,
      name: 'chanh vàng',
      element: 'kim',
      growthTime: 10,
      harvestValue: 5,
      color: 'yellow',
    },
    {
      id: 2,
      name: 'ổi',
      element: 'moc',
      growthTime: 8,
      harvestValue: 4,
      color: 'green',
    },
    {
      id: 3,
      name: 'mận',
      element: 'thuy',
      growthTime: 12,
      harvestValue: 6,
      color: 'blue',
    },
    {
      id: 4,
      name: 'đào',
      element: 'hoa',
      growthTime: 9,
      harvestValue: 5,
      color: 'red',
    },
    {
      id: 5,
      name: 'nhãn',
      element: 'tho',
      growthTime: 11,
      harvestValue: 7,
      color: 'brown',
    },
  ];
  private cropMaterials: Record<number, Material[]> = {
    1: [
      { id: 101, name: 'Sợi chanh vàng' },
      { id: 102, name: 'Nhựa chanh' },
    ],
    2: [
      { id: 201, name: 'Sợi ổi' },
      { id: 202, name: 'Lá ổi' },
      { id: 203, name: 'Gỗ ổi' },
    ],
    3: [
      { id: 301, name: 'Sợi mận' },
      { id: 302, name: 'Nhựa mận' },
    ],
    4: [
      { id: 401, name: 'Sợi đào' },
      { id: 402, name: 'Hoa đào' },
      { id: 403, name: 'Gỗ đào' },
    ],
    5: [
      { id: 501, name: 'Sợi nhãn' },
      { id: 502, name: 'Vỏ nhãn' },
      { id: 503, name: 'Gỗ nhãn' },
    ],
  };
  soilColors: Record<Elemental, string> = {
    kim: '#EFEFEF',
    moc: '#A0522D',
    thuy: '#2F4F4F',
    hoa: '#B22222',
    tho: '#DEB887',
  };
  birthMap: Record<Elemental, Elemental> = {
    kim: 'thuy',
    thuy: 'moc',
    moc: 'hoa',
    hoa: 'tho',
    tho: 'kim',
  };
  killMap: Record<Elemental, Elemental> = {
    kim: 'moc',
    moc: 'tho',
    tho: 'thuy',
    thuy: 'hoa',
    hoa: 'kim',
  };
  inventory: WritableSignal<Record<string, number>> = signal({
    crop1: 5,
    crop2: 5,
    crop3: 5,
    crop4: 5,
    crop5: 5,
    fruit1: 0,
    fruit2: 0,
    fruit3: 0,
    fruit4: 0,
    fruit5: 0,
    mat101: 0,
    mat102: 0,
    mat201: 0,
    mat202: 0,
    mat203: 0,
    mat301: 0,
    mat302: 0,
    mat401: 0,
    mat402: 0,
    mat403: 0,
    mat501: 0,
    mat502: 0,
    mat503: 0,
  });
  money = signal(0);
  playerLevel = signal(1);
  playerXP = signal(0);
  selectedCropId: WritableSignal<number> = signal(this.crops[0].id);
  // --- Hết phần giữ nguyên ---

  // --- Computed Signal cho các ô hiển thị (Virtual Rendering) ---
  visibleTiles: Signal<MapTile[]> = computed(() => {
    const zoom = this.zoomLevel();
    const currentTileSize = this.baseTileSize * zoom;
    const px = this.panX();
    const py = this.panY();
    const vw = this.viewportWidth();
    const vh = this.viewportHeight();
    const allTiles = this.mapTilesSignal();

    if (allTiles.length === 0 || vw === 0 || vh === 0) return [];

    // Tính toán_khoảng_ô_nhìn_thấy (thêm buffer để không bị giật khi pan nhanh)
    const buffer = 2; // Số lượng ô buffer thêm ở mỗi cạnh
    const startRow = Math.max(0, Math.floor(-py / currentTileSize) - buffer);
    const endRow = Math.min(
      this.rows - 1,
      Math.ceil((-py + vh) / currentTileSize) + buffer
    );
    const startCol = Math.max(0, Math.floor(-px / currentTileSize) - buffer);
    const endCol = Math.min(
      this.cols - 1,
      Math.ceil((-px + vw) / currentTileSize) + buffer
    );

    const visible: MapTile[] = [];
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        if (allTiles[r]?.[c]) {
          visible.push(allTiles[r][c]);
        }
      }
    }
    return visible;
  });

  // --- Computed Signal cho Transform CSS ---
  mapTransform: Signal<string> = computed(() => {
    return `translate(${this.panX()}px, ${this.panY()}px) scale(${this.zoomLevel()})`;
  });

  // --- Computed Signal cho Inventory ---
  inventoryItems: Signal<InventoryItem[]> = computed(() => {
    /* ... giữ nguyên như trước ... */
    const inv = this.inventory();
    const items: InventoryItem[] = [];
    this.crops.forEach((crop) => {
      const key = `crop${crop.id}`;
      if (inv[key] > 0)
        items.push({
          id: key,
          name: `${crop.name} Seed`,
          quantity: inv[key],
          type: 'seed',
          color: crop.color,
        });
    });
    this.crops.forEach((crop) => {
      const key = `fruit${crop.id}`;
      if (inv[key] > 0)
        items.push({
          id: key,
          name: crop.name,
          quantity: inv[key],
          type: 'fruit',
          color: crop.color,
        });
    });
    Object.values(this.cropMaterials)
      .flat()
      .forEach((mat) => {
        const key = `mat${mat.id}`;
        if (inv[key] > 0)
          items.push({
            id: key,
            name: mat.name,
            quantity: inv[key],
            type: 'material',
          });
      });
    return items;
  });

  ngOnInit() {
    this.initMap();
    // Tăng tốc độ game tick lên 500ms (0.5 giây)
    this.tickSub = interval(500).subscribe(() => this.updateGrowthOptimized());
    window.addEventListener('keydown', this.onKey);
  }

  ngAfterViewInit(): void {
    this.updateViewportSize();
  }

  ngOnDestroy() {
    this.tickSub.unsubscribe();
    window.removeEventListener('keydown', this.onKey);
  }

  // --- Cập nhật kích thước Viewport khi resize ---
  @HostListener('window:resize')
  updateViewportSize() {
    if (this.mapContainerRef) {
      this.viewportWidth.set(this.mapContainerRef.nativeElement.clientWidth);
      this.viewportHeight.set(this.mapContainerRef.nativeElement.clientHeight);
    }
  }

  // --- Xử lý Zoom ---
  handleWheel(event: WheelEvent) {
    event.preventDefault();
    const zoomFactor = 1.1;
    const oldZoom = this.zoomLevel();
    let newZoom;

    if (event.deltaY < 0) {
      // Zoom in
      newZoom = Math.min(3, oldZoom * zoomFactor); // Giới hạn zoom max = 3x
    } else {
      // Zoom out
      newZoom = Math.max(0.2, oldZoom / zoomFactor); // Giới hạn zoom min = 0.2x
    }

    if (newZoom !== oldZoom) {
      const map = this.mapContainerRef.nativeElement;
      const rect = map.getBoundingClientRect();
      // Lấy vị trí chuột_tương_đối_với_map
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Tính_vị_trí_thế_giới_(world_coords)_của_chuột_trước_khi_zoom
      const worldX = (mouseX - this.panX()) / oldZoom;
      const worldY = (mouseY - this.panY()) / oldZoom;

      // Tính_pan_mới_để_giữ_world_coords_của_chuột_không_đổi
      const newPanX = mouseX - worldX * newZoom;
      const newPanY = mouseY - worldY * newZoom;

      this.zoomLevel.set(newZoom);
      this.panX.set(
        this.clampPan(
          newPanX,
          this.viewportWidth(),
          this.cols * this.baseTileSize * newZoom
        )
      );
      this.panY.set(
        this.clampPan(
          newPanY,
          this.viewportHeight(),
          this.rows * this.baseTileSize * newZoom
        )
      );
    }
  }

  zoomIn() {
    // Tương tự handleWheel nhưng mô phỏng zoom vào trung tâm
    const map = this.mapContainerRef.nativeElement;
    const mouseX = map.clientWidth / 2;
    const mouseY = map.clientHeight / 2;
    this.handleWheel({
      deltaY: -100,
      clientX: mouseX,
      clientY: mouseY,
      preventDefault: () => {},
    } as WheelEvent);
  }

  zoomOut() {
    const map = this.mapContainerRef.nativeElement;
    const mouseX = map.clientWidth / 2;
    const mouseY = map.clientHeight / 2;
    this.handleWheel({
      deltaY: 100,
      clientX: mouseX,
      clientY: mouseY,
      preventDefault: () => {},
    } as WheelEvent);
  }

  // Giới hạn_giá_trị_pan_để_không_kéo_map_ra_quá_xa
  private clampPan(value: number, viewportDim: number, mapDim: number): number {
    const maxPan = 0; // Không cho kéo qua góc trên-trái
    const minPan = Math.min(0, viewportDim - mapDim); // Không cho kéo qua góc dưới-phải
    return Math.max(minPan, Math.min(maxPan, value));
  }

  // --- Xử lý Pan ---
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isPanning.set(true);
    this.lastPanCoords = { x: event.clientX, y: event.clientY };
    this.mapContainerRef.nativeElement.style.cursor = 'grabbing';
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isPanning()) return;
    event.preventDefault();
    const dx = event.clientX - this.lastPanCoords.x;
    const dy = event.clientY - this.lastPanCoords.y;

    this.lastPanCoords = { x: event.clientX, y: event.clientY };

    const currentZoom = this.zoomLevel();
    const mapWidth = this.cols * this.baseTileSize * currentZoom;
    const mapHeight = this.rows * this.baseTileSize * currentZoom;

    this.panX.update((px) =>
      this.clampPan(px + dx, this.viewportWidth(), mapWidth)
    );
    this.panY.update((py) =>
      this.clampPan(py + dy, this.viewportHeight(), mapHeight)
    );
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isPanning()) {
      this.isPanning.set(false);
      this.mapContainerRef.nativeElement.style.cursor = 'grab';
    }
  }

  @HostListener('window:mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    // Nếu chuột_rời_khỏi_cửa_sổ_thì_dừng_pan
    if (event.relatedTarget === null && this.isPanning()) {
      this.onMouseUp(event);
    }
  }

  // --- Game Logic (Tối ưu) ---
  private initMap() {
    /* ... giữ nguyên như trước ... */
    const grid: MapTile[][] = [];
    let id = 0;
    for (let r = 0; r < this.rows; r++) {
      grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        let type: TileType = 'grass';
        let isPenTopLeft = false;

        if (
          r >= this.farmArea.startRow &&
          r <= this.farmArea.endRow &&
          c >= this.farmArea.startCol &&
          c <= this.farmArea.endCol
        ) {
          type = 'soil';
        } else if (
          r >= this.animalArea.startRow &&
          r <= this.animalArea.endRow &&
          c >= this.animalArea.startCol &&
          c <= this.animalArea.endCol
        ) {
          type = 'pen';
          if (
            (r - this.animalArea.startRow) % 2 === 0 &&
            (c - this.animalArea.startCol) % 2 === 0
          ) {
            isPenTopLeft = true;
          }
        }
        grid[r][c] = {
          id: id++,
          row: r,
          col: c,
          type: type,
          soilType: type === 'soil' ? id % 5 : undefined,
          state: type === 'soil' ? 'empty' : undefined,
          cropId: null,
          growthProgress: 0,
          effectiveGrowthTime: 0,
          effectiveHarvestValue: 0,
          isPenTopLeft: isPenTopLeft,
        };
      }
    }
    this.mapTilesSignal.set(grid);
  }

  onTileClick(tile: MapTile) {
    if (tile.type === 'soil') this.handlePlotClick(tile);
    // ...
  }

  private handlePlotClick(plot: MapTile) {
    const currentTiles = this.mapTilesSignal();
    const nextTiles = currentTiles.map((row) => row.map((p) => ({ ...p })));
    const selectedCropId = this.selectedCropId();
    const crop = this.crops.find((x) => x.id === selectedCropId)!;
    const soilEl: Elemental = (
      ['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[]
    )[plot.soilType!];

    if (plot.state === 'empty') {
      // ... (Phần logic trồng cây giữ nguyên) ...
      const inv = { ...this.inventory() };
      const seedKey = `crop${crop.id}`;
      if (!inv[seedKey] || inv[seedKey] <= 0) {
        this.lastHarvestInfo = `Không đủ hạt giống ${crop.name}!`;
        return;
      }
      inv[seedKey]--;
      this.inventory.set(inv);
      // ...
      const targetPlot = nextTiles[plot.row][plot.col];
      targetPlot.state = 'seed';
      targetPlot.cropId = crop.id;
      // ... (Tính_toán_growthFactor, harvestFactor) ...
      let harvestFactor = 1,
        growthFactor = 1;
      if (this.birthMap[crop.element] === soilEl) {
        harvestFactor = 1.5;
        growthFactor = 0.8;
      } else if (this.killMap[crop.element] === soilEl) {
        harvestFactor = 0.7;
        growthFactor = 1.3;
      }
      targetPlot.effectiveGrowthTime = Math.ceil(
        crop.growthTime * growthFactor
      );
      targetPlot.effectiveHarvestValue = Math.ceil(
        crop.harvestValue * harvestFactor
      );
      targetPlot.growthProgress = 0;

      this.mapTilesSignal.set(nextTiles);
      // Thêm vào danh sách đang_phát_triển
      this.growingPlots.update((plots) => [...plots, targetPlot]);
      this.lastHarvestInfo = '';
    } else if (plot.state === 'ready' && plot.cropId !== null) {
      // ... (Phần logic thu hoạch giữ nguyên) ...
      const harvestedCrop = this.crops.find((c) => c.id === plot.cropId)!;
      const value = plot.effectiveHarvestValue;
      this.money.set(this.money() + value);
      this.increasePlayerXP(value);
      const inv = { ...this.inventory() };
      const droppedItems: string[] = [];
      const fruitKey = `fruit${harvestedCrop.id}`;
      inv[fruitKey] = (inv[fruitKey] || 0) + 1;
      droppedItems.push(`${harvestedCrop.name}: 1`);
      if (Math.random() < this.seedDropRate) {
        /* ... */ inv[`crop${harvestedCrop.id}`] =
          (inv[`crop${harvestedCrop.id}`] || 0) + 1;
        droppedItems.push(`${harvestedCrop.name} Seed: 1`);
      }
      (this.cropMaterials[harvestedCrop.id] || []).forEach((material) => {
        if (Math.random() < this.materialDropRate) {
          /* ... */ inv[`mat${material.id}`] =
            (inv[`mat${material.id}`] || 0) + 1;
          droppedItems.push(`${material.name}: 1`);
        }
      });
      this.inventory.set(inv);
      this.lastHarvestInfo = `Thu hoạch ${
        harvestedCrop.name
      } (+${value} Tiền, +${value} XP): ${droppedItems.join(', ')}`;

      const targetPlot = nextTiles[plot.row][plot.col];
      targetPlot.state = 'empty';
      targetPlot.cropId = null;
      targetPlot.growthProgress = 0;
      targetPlot.effectiveGrowthTime = 0;
      targetPlot.effectiveHarvestValue = 0;

      this.mapTilesSignal.set(nextTiles);
      // Xóa khỏi danh sách đang_phát_triển
      this.growingPlots.update((plots) =>
        plots.filter((p) => p.id !== plot.id)
      );
    }
  }

  // --- Hàm update_growth_đã_tối_ưu ---
  private updateGrowthOptimized() {
    const growing = this.growingPlots();
    if (growing.length === 0) return; // Không_có_gì_để_update

    const currentMap = this.mapTilesSignal();
    const nextTiles = currentMap.map((row) => row.map((p) => ({ ...p })));
    const stillGrowing: MapTile[] = [];
    let mapChanged = false;

    growing.forEach((plotRef) => {
      // Lấy_ô_đất_từ_bản_đồ_mới_nhất_để_đảm_bảo_đồng_bộ
      const plot = nextTiles[plotRef.row][plotRef.col];

      // Chỉ_update_nếu_nó_vẫn_đang_lớn_trên_bản_đồ_chính
      if ((plot.state === 'seed' || plot.state === 'growing') && plot.cropId) {
        plot.growthProgress++;
        mapChanged = true;
        if (plot.growthProgress >= plot.effectiveGrowthTime) {
          plot.state = 'ready';
          // Không_thêm_vào_stillGrowing_nữa_vì_đã_chín
        } else {
          plot.state = 'growing';
          stillGrowing.push(plot); // Vẫn_còn_lớn,_giữ_lại
        }
      }
      // Nếu_trạng_thái_đã_thay_đổi_(ví_dụ:_bị_thu_hoạch_bởi_hành_động_khác)
      // nó_sẽ_tự_động_không_được_thêm_vào_stillGrowing
    });

    if (mapChanged) {
      this.mapTilesSignal.set(nextTiles);
      this.growingPlots.set(stillGrowing); // Cập_nhật_lại_danh_sách
    }
  }

  // --- Các hàm helper khác giữ nguyên ---
  getRemainingTime = (plot: MapTile) =>
    Math.max(0, plot.effectiveGrowthTime - plot.growthProgress);
  getCropById = (cropId: number | null) =>
    this.crops.find((c) => c.id === cropId);
  getSoilColor = (plot: MapTile) =>
    this.soilColors[
      (['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[plot.soilType!]
    ];
  selectSeed = (cropId: number) => this.selectedCropId.set(cropId);
  get cursorStyle(): string {
    /* ... */ return '';
  } // Con_trỏ_cũ_có_thể_không_cần_thiết_khi_có_pan
  toggleInventoryDialog = () =>
    (this.showInventoryDialog = !this.showInventoryDialog);
  increasePlayerXP = (amount: number) => {
    /* ... */
    let xp = this.playerXP();
    let level = this.playerLevel();
    xp += amount;
    while (xp >= level * 20) {
      xp -= level * 20;
      level++;
    }
    this.playerXP.set(xp);
    this.playerLevel.set(level);
  };
  private onKey = (e: KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '5') {
      const index = +e.key - 1;
      if (this.crops[index]) this.selectedCropId.set(this.crops[index].id);
    }
    if (e.key.toLowerCase() === 'i') this.toggleInventoryDialog();
  };
  trackTileById(index: number, tile: any): any {
    return tile.id;
  }
}
