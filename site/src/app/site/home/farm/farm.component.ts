import { CommonModule, DecimalPipe } from '@angular/common';
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

// --- Interfaces ---
type Elemental = 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho';
export type PlotState = 'empty' | 'seed' | 'growing' | 'ready';
export type TileType = 'grass' | 'soil' | 'pen' | 'water';

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
  type: 'seed' | 'fruit' | 'material' | 'tool';
  color?: string;
}

export type ToolType = 'harvest' | 'plant' | 'place_soil' | 'place_pen';

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './farm.component.html', //
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmComponent implements OnInit, OnDestroy, AfterViewInit {
  rows = 70; // MỚI: Kích thước bản đồ 70
  cols = 70; // MỚI: Kích thước bản đồ 70
  baseTileSize = 32;

  private mapTilesSignal: WritableSignal<MapTile[][]> = signal([]); //
  private tickSub!: Subscription; //
  lastHarvestInfo: string = 'Chào mừng đến Hòn Đảo Nông Trại!';
  private materialDropRate: number = 0.8; //
  private seedDropRate: number = 0.5; //
  showInventoryDialog: boolean = false; //

  zoomLevel = signal(1); //
  panX = signal(0); //
  panY = signal(0); //
  isPanning = signal(false); //
  private lastPanCoords = { x: 0, y: 0 }; //
  viewportWidth = signal(0); //
  viewportHeight = signal(0); //
  isMobileSidebarOpen = signal(false);
  private lastPinchDistance = 0;
  private touchStartTime = 0;
  private tapThreshold = 200;
  private tapMoveThreshold = 10;
  private growingPlots: WritableSignal<MapTile[]> = signal([]); //

  @ViewChild('mapContainer') mapContainerRef!: ElementRef<HTMLDivElement>; //

  selectedTool: WritableSignal<ToolType> = signal('harvest'); //

  crops: Crop[] = [ //
    { id: 1, name: 'chanh vàng', element: 'kim', growthTime: 10, harvestValue: 5, color: 'yellow' },
    { id: 2, name: 'ổi', element: 'moc', growthTime: 8, harvestValue: 4, color: 'green' },
    { id: 3, name: 'mận', element: 'thuy', growthTime: 12, harvestValue: 6, color: 'blue' },
    { id: 4, name: 'đào', element: 'hoa', growthTime: 9, harvestValue: 5, color: 'red' },
    { id: 5, name: 'nhãn', element: 'tho', growthTime: 11, harvestValue: 7, color: 'brown' },
  ];

  private cropMaterials: Record<number, Material[]> = { //
    1: [{ id: 101, name: 'Sợi chanh vàng' }, { id: 102, name: 'Nhựa chanh' }],
    2: [{ id: 201, name: 'Sợi ổi' }, { id: 202, name: 'Lá ổi' }, { id: 203, name: 'Gỗ ổi' }],
    3: [{ id: 301, name: 'Sợi mận' }, { id: 302, name: 'Nhựa mận' }],
    4: [{ id: 401, name: 'Sợi đào' }, { id: 402, name: 'Hoa đào' }, { id: 403, name: 'Gỗ đào' }],
    5: [{ id: 501, name: 'Sợi nhãn' }, { id: 502, name: 'Vỏ nhãn' }, { id: 503, name: 'Gỗ nhãn' }],
  };

  soilColors: Record<Elemental, string> = { //
    kim: '#EFEFEF', moc: '#A0522D', thuy: '#2F4F4F', hoa: '#B22222', tho: '#DEB887',
  };

  birthMap: Record<Elemental, Elemental> = { //
    kim: 'thuy', thuy: 'moc', moc: 'hoa', hoa: 'tho', tho: 'kim',
  };
  killMap: Record<Elemental, Elemental> = { //
    kim: 'moc', moc: 'tho', tho: 'thuy', thuy: 'hoa', hoa: 'kim',
  };

  inventory: WritableSignal<Record<string, number>> = signal({ //
    'crop1': 5, 'crop2': 5, 'crop3': 5, 'crop4': 5, 'crop5': 5,
    'fruit1': 0, 'fruit2': 0, 'fruit3': 0, 'fruit4': 0, 'fruit5': 0,
    'mat101': 0, 'mat102': 0, 'mat201': 0, 'mat202': 0, 'mat203': 0,
    'mat301': 0, 'mat302': 0, 'mat401': 0, 'mat402': 0, 'mat403': 0,
    'mat501': 0, 'mat502': 0, 'mat503': 0,
    'soil': 50, 'pen': 20,
  });

  money = signal(0); //
  playerLevel = signal(1); //
  playerXP = signal(0); //
  selectedCropId: WritableSignal<number> = signal(this.crops[0].id); //

  inventoryItems: Signal<InventoryItem[]> = computed(() => { //
    const inv = this.inventory();
    const items: InventoryItem[] = [];
    this.crops.forEach(crop => {
        const key = `crop${crop.id}`;
        if (inv[key] > 0) items.push({ id: key, name: `${crop.name} Seed`, quantity: inv[key], type: 'seed', color: crop.color });
    });
    this.crops.forEach(crop => {
        const key = `fruit${crop.id}`;
        if (inv[key] > 0) items.push({ id: key, name: crop.name, quantity: inv[key], type: 'fruit', color: crop.color });
    });
    Object.values(this.cropMaterials).flat().forEach(mat => {
         const key = `mat${mat.id}`;
        if (inv[key] > 0) items.push({ id: key, name: mat.name, quantity: inv[key], type: 'material' });
    });
    if (inv['soil'] > 0) items.push({ id: 'soil', name: `Đất`, quantity: inv['soil'], type: 'tool', color: '#A0522D' });
    if (inv['pen'] > 0) items.push({ id: 'pen', name: `Chuồng`, quantity: inv['pen'], type: 'tool', color: '#D2B48C' });
    return items;
  });

  visibleTiles: Signal<MapTile[]> = computed(() => { //
    const zoom = this.zoomLevel();
    const currentTileSize = this.baseTileSize * zoom;
    const px = this.panX();
    const py = this.panY();
    const vw = this.viewportWidth();
    const vh = this.viewportHeight();
    const allTiles = this.mapTilesSignal();

    if (allTiles.length === 0 || vw === 0 || vh === 0) return [];

    const buffer = 3;
    const startRow = Math.max(0, Math.floor(-py / currentTileSize) - buffer);
    const endRow = Math.min(this.rows - 1, Math.ceil((-py + vh) / currentTileSize) + buffer);
    const startCol = Math.max(0, Math.floor(-px / currentTileSize) - buffer);
    const endCol = Math.min(this.cols - 1, Math.ceil((-px + vw) / currentTileSize) + buffer);

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

   mapTransform: Signal<string> = computed(() => { //
       return `translate(${this.panX()}px, ${this.panY()}px) scale(${this.zoomLevel()})`;
   });

  ngOnInit() { //
    this.initMap();
    this.tickSub = interval(500).subscribe(() => this.updateGrowthOptimized());
    window.addEventListener('keydown', this.onKey);
  }

  ngAfterViewInit(): void { //
      this.updateViewportSize();
      const initialPanX = (this.viewportWidth() - this.cols * this.baseTileSize) / 2;
      const initialPanY = (this.viewportHeight() - this.rows * this.baseTileSize) / 2;
      this.panX.set(this.clampPan(initialPanX, this.viewportWidth(), this.cols * this.baseTileSize));
      this.panY.set(this.clampPan(initialPanY, this.viewportHeight(), this.rows * this.baseTileSize));
  }

  ngOnDestroy() { //
    this.tickSub.unsubscribe();
    window.removeEventListener('keydown', this.onKey);
  }

  @HostListener('window:resize') //
  updateViewportSize() {
      if (this.mapContainerRef) {
          this.viewportWidth.set(this.mapContainerRef.nativeElement.clientWidth);
          this.viewportHeight.set(this.mapContainerRef.nativeElement.clientHeight);
      }
  }

  // --- MỚI: initMap tạo đảo ở giữa ---
  private initMap() {
    const grid: MapTile[][] = [];
    let id = 0;
    const islandSize = 50;
    const startRow = (this.rows - islandSize) / 2; // (70 - 50) / 2 = 10
    const endRow = startRow + islandSize - 1;       // 10 + 50 - 1 = 59
    const startCol = (this.cols - islandSize) / 2; // (70 - 50) / 2 = 10
    const endCol = startCol + islandSize - 1;       // 10 + 50 - 1 = 59

    for (let r = 0; r < this.rows; r++) {
      grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        let type: TileType;

        // Kiểm tra xem ô có nằm trong khu vực đảo không
        if (r >= startRow && r <= endRow && c >= startCol && c <= endCol) {
          type = 'grass'; // Đất liền (đảo)
        } else {
          type = 'water'; // Nước bao quanh
        }

        grid[r][c] = {
          id: id++, row: r, col: c, type: type,
          cropId: null, growthProgress: 0, effectiveGrowthTime: 0,
          effectiveHarvestValue: 0, state: undefined, soilType: undefined,
          isPenTopLeft: false,
        };
      }
    }
    this.mapTilesSignal.set(grid);
    this.growingPlots.set([]);
  }

  private updateTile(row: number, col: number, changes: Partial<MapTile>) { //
      this.mapTilesSignal.update(currentTiles => {
          const newTiles = currentTiles.map(r => r.map(c => ({ ...c })));
          newTiles[row][col] = { ...newTiles[row][col], ...changes };
          return newTiles;
      });
  }

  private placeSoil(tile: MapTile) { //
      if (tile.type === 'water') {
          this.lastHarvestInfo = `Không thể đặt đất trên mặt nước!`;
          return;
      }
      if (tile.type === 'grass' && this.inventory()['soil'] > 0) {
          this.inventory.update(inv => ({ ...inv, soil: inv['soil'] - 1 }));
          this.updateTile(tile.row, tile.col, {
              type: 'soil',
              state: 'empty',
              soilType: (tile.row * this.cols + tile.col) % 5
          });
          this.lastHarvestInfo = `Đặt 1 ô đất tại (${tile.row}, ${tile.col}).`;
      } else if (tile.type !== 'grass') {
          this.lastHarvestInfo = `Chỉ có thể đặt đất trên cỏ!`;
      } else {
           this.lastHarvestInfo = `Hết đất trong túi!`;
      }
  }

  private canPlacePen(r: number, c: number): boolean { //
      const tiles = this.mapTilesSignal();
      if (r + 1 >= this.rows || c + 1 >= this.cols) return false;
      for (let i = r; i < r + 2; i++) {
          for (let j = c; j < c + 2; j++) {
              if (!tiles[i]?.[j] || tiles[i][j].type !== 'grass') return false;
          }
      }
      return true;
  }

  private placePen(tile: MapTile) { //
      if (this.inventory()['pen'] > 0 && this.canPlacePen(tile.row, tile.col)) {
          this.inventory.update(inv => ({ ...inv, pen: inv['pen'] - 1 }));
          for (let r_offset = 0; r_offset < 2; r_offset++) {
              for (let c_offset = 0; c_offset < 2; c_offset++) {
                  this.updateTile(tile.row + r_offset, tile.col + c_offset, {
                      type: 'pen',
                      isPenTopLeft: (r_offset === 0 && c_offset === 0)
                  });
              }
          }
           this.lastHarvestInfo = `Đặt 1 chuồng tại (${tile.row}, ${tile.col}).`;
      } else if (!this.canPlacePen(tile.row, tile.col)) {
          this.lastHarvestInfo = `Không đủ chỗ (cần 2x2 cỏ) hoặc đã ra rìa/trên nước!`;
      } else {
          this.lastHarvestInfo = `Hết chuồng trong túi!`;
      }
  }

  onTileClick(tile: MapTile) { //
      const tool = this.selectedTool();
      switch (tool) {
          case 'place_soil':
              this.placeSoil(tile);
              break;
          case 'place_pen':
              this.placePen(tile);
              break;
          case 'plant':
          case 'harvest':
              this.handlePlantHarvestClick(tile);
              break;
      }
  }

  private handlePlantHarvestClick(plot: MapTile) { //
      const tool = this.selectedTool();
      if (plot.type !== 'soil') {
          this.lastHarvestInfo = "Chỉ có thể trồng/thu hoạch trên đất trồng!";
          return;
      }

      const currentMapState = this.mapTilesSignal();
      const targetPlotInMap = currentMapState[plot.row][plot.col];

      if (tool === 'plant' && targetPlotInMap.state === 'empty') {
          const selectedCropId = this.selectedCropId();
          const crop = this.crops.find((x) => x.id === selectedCropId)!;
          const soilEl: Elemental = (['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[targetPlotInMap.soilType!];
          const inv = { ...this.inventory() };
          const seedKey = `crop${crop.id}`;

          if (!inv[seedKey] || inv[seedKey] <= 0) {
              this.lastHarvestInfo = `Không đủ hạt giống ${crop.name}!`;
              return;
          }
          inv[seedKey]--;
          this.inventory.set(inv);

          let harvestFactor = 1, growthFactor = 1;
          if (this.birthMap[crop.element] === soilEl) { harvestFactor = 1.5; growthFactor = 0.8; }
          else if (this.killMap[crop.element] === soilEl) { harvestFactor = 0.7; growthFactor = 1.3; }

          const updatedPlotData: Partial<MapTile> = {
            state: 'seed', cropId: crop.id,
            effectiveGrowthTime: Math.ceil(crop.growthTime * growthFactor),
            effectiveHarvestValue: Math.ceil(crop.harvestValue * harvestFactor),
            growthProgress: 0,
          };
          this.updateTile(plot.row, plot.col, updatedPlotData);
          this.growingPlots.update(plots => [...plots, {...targetPlotInMap, ...updatedPlotData} as MapTile]);
          this.lastHarvestInfo = `Trồng ${crop.name}.`;

      } else if (tool === 'harvest' && targetPlotInMap.state === 'ready' && targetPlotInMap.cropId !== null) {
          const harvestedCrop = this.crops.find(c => c.id === targetPlotInMap.cropId)!;
          const value = targetPlotInMap.effectiveHarvestValue;
          this.money.set(this.money() + value);
          this.increasePlayerXP(value);

          const inv = { ...this.inventory() };
          const droppedItems: string[] = [];
          inv[`fruit${harvestedCrop.id}`] = (inv[`fruit${harvestedCrop.id}`] || 0) + 1;
          droppedItems.push(`${harvestedCrop.name}: 1`);
          if (Math.random() < this.seedDropRate) {
              inv[`crop${harvestedCrop.id}`] = (inv[`crop${harvestedCrop.id}`] || 0) + 1;
              droppedItems.push(`${harvestedCrop.name} Seed: 1`);
          }
          (this.cropMaterials[harvestedCrop.id] || []).forEach((material) => {
              if (Math.random() < this.materialDropRate) {
                  inv[`mat${material.id}`] = (inv[`mat${material.id}`] || 0) + 1;
                  droppedItems.push(`${material.name}: 1`);
              }
          });
          this.inventory.set(inv);
          this.lastHarvestInfo = `Thu hoạch ${harvestedCrop.name} (+${value} Tiền, +${value} XP): ${droppedItems.join(', ')}`;

          this.updateTile(plot.row, plot.col, {
            state: 'empty', cropId: null, growthProgress: 0,
            effectiveGrowthTime: 0, effectiveHarvestValue: 0,
          });
          this.growingPlots.update(plots => plots.filter(p => p.id !== plot.id));
      } else if (tool === 'plant' && targetPlotInMap.state !== 'empty') {
          this.lastHarvestInfo = `Ô đất này chưa sẵn sàng để trồng!`;
      } else if (tool === 'harvest' && targetPlotInMap.state !== 'ready') {
           this.lastHarvestInfo = `Cây chưa chín để thu hoạch!`;
      }
  }

  private updateGrowthOptimized() { //
      const growing = this.growingPlots();
      if (growing.length === 0) return;

      const currentMap = this.mapTilesSignal();
      const stillGrowingAfterTick: MapTile[] = [];

      growing.forEach(plotRef => {
          const plotOnMap = currentMap[plotRef.row][plotRef.col];

          if ((plotOnMap.state === 'seed' || plotOnMap.state === 'growing') && plotOnMap.cropId) {
               const newProgress = plotOnMap.growthProgress + 1;
               let newState: PlotState = plotOnMap.state;

               if (newProgress >= plotOnMap.effectiveGrowthTime) {
                  newState = 'ready';
               } else {
                  newState = 'growing';
                  stillGrowingAfterTick.push({...plotOnMap, growthProgress: newProgress, state: newState });
               }
               if (newProgress !== plotOnMap.growthProgress || newState !== plotOnMap.state) {
                   this.updateTile(plotOnMap.row, plotOnMap.col, { growthProgress: newProgress, state: newState });
               } else {
                  if (newState === 'growing') stillGrowingAfterTick.push(plotOnMap);
               }
          }
      });

      this.growingPlots.set(stillGrowingAfterTick);
  }

  handleWheel(event: WheelEvent) { //
    event.preventDefault();
    const zoomFactor = 1.1;
    const oldZoom = this.zoomLevel();
    let newZoom;

    if (event.deltaY < 0) {
        newZoom = Math.min(4, oldZoom * zoomFactor);
    } else {
        newZoom = Math.max(0.1, oldZoom / zoomFactor);
    }

    if (newZoom !== oldZoom) {
        const map = this.mapContainerRef.nativeElement;
        const rect = map.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const worldX = (mouseX - this.panX()) / oldZoom;
        const worldY = (mouseY - this.panY()) / oldZoom;
        const newPanX = mouseX - worldX * newZoom;
        const newPanY = mouseY - worldY * newZoom;

        this.zoomLevel.set(newZoom);
        this.panX.set(this.clampPan(newPanX, this.viewportWidth(), this.cols * this.baseTileSize * newZoom));
        this.panY.set(this.clampPan(newPanY, this.viewportHeight(), this.rows * this.baseTileSize * newZoom));
    }
  }

   zoomIn() { //
        const map = this.mapContainerRef.nativeElement;
        const mouseX = map.clientWidth / 2;
        const mouseY = map.clientHeight / 2;
        this.handleWheel({ deltaY: -100, clientX: mouseX + map.getBoundingClientRect().left, clientY: mouseY + map.getBoundingClientRect().top, preventDefault: () => {} } as WheelEvent);
   }

   zoomOut() { //
        const map = this.mapContainerRef.nativeElement;
        const mouseX = map.clientWidth / 2;
        const mouseY = map.clientHeight / 2;
        this.handleWheel({ deltaY: 100, clientX: mouseX + map.getBoundingClientRect().left, clientY: mouseY + map.getBoundingClientRect().top, preventDefault: () => {} } as WheelEvent);
   }

   private clampPan(value: number, viewportDim: number, mapDimScaled: number): number { //
        const maxPan = 50;
        const minPan = Math.min(maxPan, viewportDim - mapDimScaled - 50);
        return Math.max(minPan, Math.min(maxPan, value));
   }

  onMouseDown(event: MouseEvent) { //
      event.preventDefault();
      this.isPanning.set(true);
      this.lastPanCoords = { x: event.clientX, y: event.clientY };
      this.mapContainerRef.nativeElement.style.cursor = 'grabbing';
  }

  @HostListener('window:mousemove', ['$event']) //
  onMouseMove(event: MouseEvent) {
      if (!this.isPanning()) return;
      event.preventDefault();
      const dx = event.clientX - this.lastPanCoords.x;
      const dy = event.clientY - this.lastPanCoords.y;
      this.lastPanCoords = { x: event.clientX, y: event.clientY };

      const currentZoom = this.zoomLevel();
      const mapWidth = this.cols * this.baseTileSize * currentZoom;
      const mapHeight = this.rows * this.baseTileSize * currentZoom;

      this.panX.update(px => this.clampPan(px + dx, this.viewportWidth(), mapWidth));
      this.panY.update(py => this.clampPan(py + dy, this.viewportHeight(), mapHeight));
  }

  @HostListener('window:mouseup', ['$event']) //
  onMouseUp(event: MouseEvent) {
      if (this.isPanning()) {
          this.isPanning.set(false);
          this.mapContainerRef.nativeElement.style.cursor = 'grab';
      }
  }

  @HostListener('window:mouseleave', ['$event']) //
   onMouseLeave(event: MouseEvent) {
       if (event.relatedTarget === null && this.isPanning()) {
           this.onMouseUp(event);
       }
   }

  handleTouchStart(event: TouchEvent) {
      event.preventDefault();
      this.touchStartTime = Date.now();
      const touches = event.touches;

      if (touches.length === 1) {
          this.isPanning.set(true);
          this.lastPanCoords = { x: touches[0].clientX, y: touches[0].clientY };
          this.lastPinchDistance = 0;
      } else if (touches.length === 2) {
          this.isPanning.set(false);
          this.lastPinchDistance = this.getPinchDistance(touches);
      }
  }

  handleTouchMove(event: TouchEvent) {
      event.preventDefault();
      const touches = event.touches;

      if (touches.length === 1 && this.isPanning()) {
          const dx = touches[0].clientX - this.lastPanCoords.x;
          const dy = touches[0].clientY - this.lastPanCoords.y;
          this.lastPanCoords = { x: touches[0].clientX, y: touches[0].clientY };

          const currentZoom = this.zoomLevel();
          const mapWidth = this.cols * this.baseTileSize * currentZoom;
          const mapHeight = this.rows * this.baseTileSize * currentZoom;

          this.panX.update(px => this.clampPan(px + dx, this.viewportWidth(), mapWidth));
          this.panY.update(py => this.clampPan(py + dy, this.viewportHeight(), mapHeight));
      } else if (touches.length === 2 && this.lastPinchDistance > 0) {
          const currentDistance = this.getPinchDistance(touches);
          const zoomFactor = currentDistance / this.lastPinchDistance;
          this.lastPinchDistance = currentDistance;

          const oldZoom = this.zoomLevel();
          let newZoom = oldZoom * zoomFactor;
          newZoom = Math.max(0.1, Math.min(4, newZoom));

          if (newZoom !== oldZoom) {
              const map = this.mapContainerRef.nativeElement;
              const rect = map.getBoundingClientRect();
              const centerX = (touches[0].clientX + touches[1].clientX) / 2 - rect.left;
              const centerY = (touches[0].clientY + touches[1].clientY) / 2 - rect.top;

              const worldX = (centerX - this.panX()) / oldZoom;
              const worldY = (centerY - this.panY()) / oldZoom;
              const newPanX = centerX - worldX * newZoom;
              const newPanY = centerY - worldY * newZoom;

              this.zoomLevel.set(newZoom);
              this.panX.set(this.clampPan(newPanX, this.viewportWidth(), this.cols * this.baseTileSize * newZoom));
              this.panY.set(this.clampPan(newPanY, this.viewportHeight(), this.rows * this.baseTileSize * newZoom));
          }
      }
  }

  handleTouchEnd(event: TouchEvent) {
      event.preventDefault();
      const touches = event.changedTouches;
      if (touches.length === 0) return;

      const touch = touches[0];
      const timeElapsed = Date.now() - this.touchStartTime;

      const startX = this.lastPanCoords.x;
      const startY = this.lastPanCoords.y;
      const endX = touch.clientX;
      const endY = touch.clientY;

      const dx = endX - startX;
      const dy = endY - startY;
      const distanceMoved = Math.sqrt(dx * dx + dy * dy);

      if (this.isPanning() && timeElapsed < this.tapThreshold && distanceMoved < this.tapMoveThreshold ) {
           const map = this.mapContainerRef.nativeElement;
           const rect = map.getBoundingClientRect();
           const touchX = touch.clientX - rect.left;
           const touchY = touch.clientY - rect.top;

           const zoom = this.zoomLevel();
           const worldX = (touchX - this.panX()) / zoom;
           const worldY = (touchY - this.panY()) / zoom;

           const col = Math.floor(worldX / this.baseTileSize);
           const row = Math.floor(worldY / this.baseTileSize);

           const clickedTile = this.mapTilesSignal()[row]?.[col];
           if(clickedTile) {
               this.onTileClick(clickedTile);
           }
      }

      this.isPanning.set(false);
      this.lastPinchDistance = 0;
      if (this.mapContainerRef) {
          this.mapContainerRef.nativeElement.style.cursor = 'grab';
      }
  }

  private getPinchDistance(touches: TouchList): number {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
  }

  getRemainingTime = (plot: MapTile) => Math.max(0, plot.effectiveGrowthTime - plot.growthProgress); //
  getCropById = (cropId: number | null) => this.crops.find((c) => c.id === cropId); //
  getSoilColor = (plot: MapTile) => this.soilColors[(['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[plot.soilType!]]; //
  getTileColor(type: TileType): string {
    switch (type) {
      case 'grass': return '#66bb6a';
      case 'water': return '#42a5f5';
      case 'soil': return '#A0522D';
      case 'pen': return '#D2B48C';
      default: return '#bdbdbd';
    }
  }

  selectSeed(cropId: number) { //
      this.selectedCropId.set(cropId);
      this.selectedTool.set('plant');
      this.isMobileSidebarOpen.set(false);
  }

  toggleInventoryDialog = () => this.showInventoryDialog = !this.showInventoryDialog; //

  increasePlayerXP(amount: number) { //
    let xp = this.playerXP();
    let level = this.playerLevel();
    xp += amount;
    while (xp >= level * 20) {
      xp -= level * 20;
      level++;
    }
    this.playerXP.set(xp);
    this.playerLevel.set(level);
  }

  private onKey = (e: KeyboardEvent) => { //
    if (e.key >= '1' && e.key <= '5') {
      const index = +e.key - 1;
      if (this.crops[index]) {
          this.selectSeed(this.crops[index].id);
      }
    }
    if (e.key.toLowerCase() === 'i') this.toggleInventoryDialog();
    if (e.key.toLowerCase() === 'h') this.selectedTool.set('harvest');
    if (e.key.toLowerCase() === 'p') this.selectedTool.set('plant');
    if (e.key.toLowerCase() === 'd') this.selectedTool.set('place_soil');
    if (e.key.toLowerCase() === 'c') this.selectedTool.set('place_pen');
  };

  trackTileById = (index: number, tile: MapTile) => tile.id; //

  toggleMobileSidebar() {
      this.isMobileSidebarOpen.update(v => !v);
  }
}