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
export type TileType = 'grass' | 'soil' | 'pen';

export interface MapTile {
  id: number;
  row: number;
  col: number;
  type: TileType;
  soilType?: number; // 0..4, for 'soil'
  state?: PlotState; // For 'soil'
  cropId: number | null; // Crop ID, for 'soil'
  growthProgress: number;
  effectiveGrowthTime: number;
  effectiveHarvestValue: number;
  isPenTopLeft?: boolean; // For 'pen' to mark 2x2 area
}

export interface Crop {
  id: number;
  name: string;
  element: Elemental;
  growthTime: number; // in seconds
  harvestValue: number; // money value
  color: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface InventoryItem {
  id: string; // e.g., 'crop1', 'fruit3', 'mat201', 'soil', 'pen'
  name: string;
  quantity: number;
  type: 'seed' | 'fruit' | 'material' | 'tool'; // Added 'tool' for placeable items
  color?: string; // Optional color for display
}
// --- End Interfaces ---

// --- Tool Type Definition ---
export type ToolType = 'harvest' | 'plant' | 'place_soil' | 'place_pen';

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule, DecimalPipe], // Added DecimalPipe for number formatting
  templateUrl: './farm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, // For performance with signals
})
export class FarmComponent implements OnInit, OnDestroy, AfterViewInit {
  rows = 50; // New map size
  cols = 50; // New map size
  baseTileSize = 48; // Base size of a tile (w-12 in Tailwind = 3rem = 48px if 1rem=16px)

  private mapTilesSignal: WritableSignal<MapTile[][]> = signal([]);
  private tickSub!: Subscription;
  lastHarvestInfo: string = '';
  private materialDropRate: number = 0.8;
  private seedDropRate: number = 0.5;
  showInventoryDialog: boolean = false;

  // --- Signals for Zoom & Pan ---
  zoomLevel = signal(1);
  panX = signal(0);
  panY = signal(0);
  isPanning = signal(false);
  private lastPanCoords = { x: 0, y: 0 };
  viewportWidth = signal(0);
  viewportHeight = signal(0);

  // --- Signal for actively growing plots ---
  private growingPlots: WritableSignal<MapTile[]> = signal([]);

  // --- Reference to the map container for viewport dimensions ---
  @ViewChild('mapContainer') mapContainerRef!: ElementRef<HTMLDivElement>;

  // --- Selected tool ---
  selectedTool: WritableSignal<ToolType> = signal('harvest'); // Default tool

  // --- Game Data ---
  crops: Crop[] = [
    { id: 1, name: 'chanh vàng', element: 'kim', growthTime: 10, harvestValue: 5, color: 'yellow' },
    { id: 2, name: 'ổi', element: 'moc', growthTime: 8, harvestValue: 4, color: 'green' },
    { id: 3, name: 'mận', element: 'thuy', growthTime: 12, harvestValue: 6, color: 'blue' },
    { id: 4, name: 'đào', element: 'hoa', growthTime: 9, harvestValue: 5, color: 'red' },
    { id: 5, name: 'nhãn', element: 'tho', growthTime: 11, harvestValue: 7, color: 'brown' },
  ];

  private cropMaterials: Record<number, Material[]> = {
    1: [{ id: 101, name: 'Sợi chanh vàng' }, { id: 102, name: 'Nhựa chanh' }],
    2: [{ id: 201, name: 'Sợi ổi' }, { id: 202, name: 'Lá ổi' }, { id: 203, name: 'Gỗ ổi' }],
    3: [{ id: 301, name: 'Sợi mận' }, { id: 302, name: 'Nhựa mận' }],
    4: [{ id: 401, name: 'Sợi đào' }, { id: 402, name: 'Hoa đào' }, { id: 403, name: 'Gỗ đào' }],
    5: [{ id: 501, name: 'Sợi nhãn' }, { id: 502, name: 'Vỏ nhãn' }, { id: 503, name: 'Gỗ nhãn' }],
  };

  soilColors: Record<Elemental, string> = {
    kim: '#EFEFEF', moc: '#A0522D', thuy: '#2F4F4F', hoa: '#B22222', tho: '#DEB887',
  };

  birthMap: Record<Elemental, Elemental> = {
    kim: 'thuy', thuy: 'moc', moc: 'hoa', hoa: 'tho', tho: 'kim',
  };
  killMap: Record<Elemental, Elemental> = {
    kim: 'moc', moc: 'tho', tho: 'thuy', thuy: 'hoa', hoa: 'kim',
  };

  // --- Updated Inventory with placeable items ---
  inventory: WritableSignal<Record<string, number>> = signal({
    'crop1': 5, 'crop2': 5, 'crop3': 5, 'crop4': 5, 'crop5': 5,
    'fruit1': 0, 'fruit2': 0, 'fruit3': 0, 'fruit4': 0, 'fruit5': 0,
    'mat101': 0, 'mat102': 0, 'mat201': 0, 'mat202': 0, 'mat203': 0,
    'mat301': 0, 'mat302': 0, 'mat401': 0, 'mat402': 0, 'mat403': 0,
    'mat501': 0, 'mat502': 0, 'mat503': 0,
    'soil': 50, // Initial soil plots
    'pen': 20,  // Initial pens
  });

  money = signal(0);
  playerLevel = signal(1);
  playerXP = signal(0);
  selectedCropId: WritableSignal<number> = signal(this.crops[0].id);

  // --- Computed Signals ---
  inventoryItems: Signal<InventoryItem[]> = computed(() => {
    const inv = this.inventory();
    const items: InventoryItem[] = [];
    // Seeds
    this.crops.forEach(crop => {
        const key = `crop${crop.id}`;
        if (inv[key] > 0) items.push({ id: key, name: `${crop.name} Seed`, quantity: inv[key], type: 'seed', color: crop.color });
    });
    // Fruits
    this.crops.forEach(crop => {
        const key = `fruit${crop.id}`;
        if (inv[key] > 0) items.push({ id: key, name: crop.name, quantity: inv[key], type: 'fruit', color: crop.color });
    });
    // Materials
    Object.values(this.cropMaterials).flat().forEach(mat => {
         const key = `mat${mat.id}`;
        if (inv[key] > 0) items.push({ id: key, name: mat.name, quantity: inv[key], type: 'material' });
    });
    // Placeable Tools
    if (inv['soil'] > 0) items.push({ id: 'soil', name: `Đất`, quantity: inv['soil'], type: 'tool', color: '#A0522D' }); // Brownish for soil
    if (inv['pen'] > 0) items.push({ id: 'pen', name: `Chuồng`, quantity: inv['pen'], type: 'tool', color: '#D2B48C' }); // Tan for pen
    return items;
  });

  visibleTiles: Signal<MapTile[]> = computed(() => {
    const zoom = this.zoomLevel();
    const currentTileSize = this.baseTileSize * zoom;
    const px = this.panX();
    const py = this.panY();
    const vw = this.viewportWidth();
    const vh = this.viewportHeight();
    const allTiles = this.mapTilesSignal();

    if (allTiles.length === 0 || vw === 0 || vh === 0) return [];

    const buffer = 2; // Buffer tiles around viewport for smoother panning
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

   mapTransform: Signal<string> = computed(() => {
       return `translate(${this.panX()}px, ${this.panY()}px) scale(${this.zoomLevel()})`;
   });

  // --- Lifecycle Hooks ---
  ngOnInit() {
    this.initMap();
    this.tickSub = interval(500).subscribe(() => this.updateGrowthOptimized()); // Game tick every 0.5s
    window.addEventListener('keydown', this.onKey);
  }

  ngAfterViewInit(): void {
      this.updateViewportSize(); // Get initial viewport size
  }

  ngOnDestroy() {
    this.tickSub.unsubscribe();
    window.removeEventListener('keydown', this.onKey);
  }

  // --- Event Listeners ---
  @HostListener('window:resize')
  updateViewportSize() {
      if (this.mapContainerRef) {
          this.viewportWidth.set(this.mapContainerRef.nativeElement.clientWidth);
          this.viewportHeight.set(this.mapContainerRef.nativeElement.clientHeight);
      }
  }

  // --- Map Initialization ---
  private initMap() {
    const grid: MapTile[][] = [];
    let id = 0;
    for (let r = 0; r < this.rows; r++) {
      grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        // All tiles are initially grass
        grid[r][c] = {
          id: id++, row: r, col: c, type: 'grass',
          cropId: null, growthProgress: 0, effectiveGrowthTime: 0,
          effectiveHarvestValue: 0, state: undefined, soilType: undefined,
          isPenTopLeft: false,
        };
      }
    }
    this.mapTilesSignal.set(grid);
    this.growingPlots.set([]); // Clear any previous growing plots
  }

  // --- Utility to update a single tile ---
  private updateTile(row: number, col: number, changes: Partial<MapTile>) {
      this.mapTilesSignal.update(currentTiles => {
          // Create a deep copy to ensure change detection
          const newTiles = currentTiles.map(r => r.map(c => ({ ...c })));
          newTiles[row][col] = { ...newTiles[row][col], ...changes };
          return newTiles;
      });
  }

  // --- Placing Logic ---
  private placeSoil(tile: MapTile) {
      if (tile.type === 'grass' && this.inventory()['soil'] > 0) {
          this.inventory.update(inv => ({ ...inv, soil: inv['soil'] - 1 }));
          this.updateTile(tile.row, tile.col, {
              type: 'soil',
              state: 'empty',
              soilType: (tile.row * this.cols + tile.col) % 5 // Assign a soil type
          });
          this.lastHarvestInfo = `Đặt 1 ô đất tại (${tile.row}, ${tile.col}).`;
      } else if (tile.type !== 'grass') {
          this.lastHarvestInfo = `Chỉ có thể đặt đất trên cỏ!`;
      } else {
           this.lastHarvestInfo = `Hết đất trong túi!`;
      }
  }

  private canPlacePen(r: number, c: number): boolean {
      const tiles = this.mapTilesSignal();
      // Check if the 2x2 area is within map bounds
      if (r + 1 >= this.rows || c + 1 >= this.cols) return false;
      // Check if all 4 tiles are grass
      for (let i = r; i < r + 2; i++) {
          for (let j = c; j < c + 2; j++) {
              if (!tiles[i]?.[j] || tiles[i][j].type !== 'grass') return false;
          }
      }
      return true;
  }

  private placePen(tile: MapTile) {
      if (this.inventory()['pen'] > 0 && this.canPlacePen(tile.row, tile.col)) {
          this.inventory.update(inv => ({ ...inv, pen: inv['pen'] - 1 }));
          for (let r_offset = 0; r_offset < 2; r_offset++) {
              for (let c_offset = 0; c_offset < 2; c_offset++) {
                  this.updateTile(tile.row + r_offset, tile.col + c_offset, {
                      type: 'pen',
                      isPenTopLeft: (r_offset === 0 && c_offset === 0) // Mark top-left for 2x2 visual
                  });
              }
          }
           this.lastHarvestInfo = `Đặt 1 chuồng tại (${tile.row}, ${tile.col}).`;
      } else if (!this.canPlacePen(tile.row, tile.col)) {
          this.lastHarvestInfo = `Không đủ chỗ (cần 2x2 cỏ) hoặc đã ra rìa bản đồ!`;
      } else {
          this.lastHarvestInfo = `Hết chuồng trong túi!`;
      }
  }

  // --- Tile Click Handler ---
  onTileClick(tile: MapTile) {
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

  // --- Planting and Harvesting Logic ---
  private handlePlantHarvestClick(plot: MapTile) {
      const tool = this.selectedTool();
      if (plot.type !== 'soil') {
          this.lastHarvestInfo = "Chỉ có thể trồng/thu hoạch trên đất!";
          return;
      }

      // Use a local copy for modifications within this function scope
      const currentMapState = this.mapTilesSignal();
      const targetPlotInMap = currentMapState[plot.row][plot.col]; // Get the latest state

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
            state: 'seed',
            cropId: crop.id,
            effectiveGrowthTime: Math.ceil(crop.growthTime * growthFactor),
            effectiveHarvestValue: Math.ceil(crop.harvestValue * harvestFactor),
            growthProgress: 0,
          };
          this.updateTile(plot.row, plot.col, updatedPlotData);
          // Add to growing list - ensure it's the updated object from the map signal if possible, or a complete new one
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
            state: 'empty',
            cropId: null,
            growthProgress: 0,
            effectiveGrowthTime: 0,
            effectiveHarvestValue: 0,
          });
          this.growingPlots.update(plots => plots.filter(p => p.id !== plot.id));
      } else if (tool === 'plant' && targetPlotInMap.state !== 'empty') {
          this.lastHarvestInfo = `Ô đất này chưa sẵn sàng để trồng!`;
      } else if (tool === 'harvest' && targetPlotInMap.state !== 'ready') {
           this.lastHarvestInfo = `Cây chưa chín để thu hoạch!`;
      }
  }

  // --- Game Tick (Optimized) ---
  private updateGrowthOptimized() {
      const growing = this.growingPlots();
      if (growing.length === 0) return;

      const currentMap = this.mapTilesSignal(); // Get the latest map state
      let mapChangedInTick = false;
      const stillGrowingAfterTick: MapTile[] = [];

      growing.forEach(plotRef => {
          // Always refer to the plot from the main map signal for current state
          const plotOnMap = currentMap[plotRef.row][plotRef.col];

          if ((plotOnMap.state === 'seed' || plotOnMap.state === 'growing') && plotOnMap.cropId) {
               const newProgress = plotOnMap.growthProgress + 1;
               let newState:any = plotOnMap.state;

               if (newProgress >= plotOnMap.effectiveGrowthTime) {
                  newState = 'ready';
               } else {
                  newState = 'growing';
                  stillGrowingAfterTick.push({...plotOnMap, growthProgress: newProgress, state: newState }); // Keep for next tick
               }
               // Update the tile on the main map
               this.updateTile(plotOnMap.row, plotOnMap.col, { growthProgress: newProgress, state: newState });
               mapChangedInTick = true;
          }
          // If plot state changed (e.g. harvested manually), it won't be added to stillGrowingAfterTick
      });

      if (mapChangedInTick) {
          this.growingPlots.set(stillGrowingAfterTick);
      }
  }

  // --- Zoom and Pan Handlers ---
  handleWheel(event: WheelEvent) {
    event.preventDefault();
    const zoomFactor = 1.1;
    const oldZoom = this.zoomLevel();
    let newZoom;

    if (event.deltaY < 0) { // Zoom in
        newZoom = Math.min(3, oldZoom * zoomFactor);
    } else { // Zoom out
        newZoom = Math.max(0.2, oldZoom / zoomFactor);
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

   zoomIn() {
        const map = this.mapContainerRef.nativeElement;
        const mouseX = map.clientWidth / 2;
        const mouseY = map.clientHeight / 2;
        // Simulate a wheel event
        this.handleWheel({ deltaY: -100, clientX: mouseX + map.getBoundingClientRect().left, clientY: mouseY + map.getBoundingClientRect().top, preventDefault: () => {} } as WheelEvent);
   }

   zoomOut() {
        const map = this.mapContainerRef.nativeElement;
        const mouseX = map.clientWidth / 2;
        const mouseY = map.clientHeight / 2;
        this.handleWheel({ deltaY: 100, clientX: mouseX + map.getBoundingClientRect().left, clientY: mouseY + map.getBoundingClientRect().top, preventDefault: () => {} } as WheelEvent);
   }

   private clampPan(value: number, viewportDim: number, mapDimScaled: number): number {
        const maxPan = 0;
        const minPan = Math.min(0, viewportDim - mapDimScaled);
        return Math.max(minPan, Math.min(maxPan, value));
   }

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

      this.panX.update(px => this.clampPan(px + dx, this.viewportWidth(), mapWidth));
      this.panY.update(py => this.clampPan(py + dy, this.viewportHeight(), mapHeight));
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
       if (event.relatedTarget === null && this.isPanning()) { // Mouse left the window
           this.onMouseUp(event);
       }
   }

  // --- Helper Methods ---
  getRemainingTime = (plot: MapTile) => Math.max(0, plot.effectiveGrowthTime - plot.growthProgress);
  getCropById = (cropId: number | null) => this.crops.find((c) => c.id === cropId);
  getSoilColor = (plot: MapTile) => this.soilColors[(['kim', 'moc', 'thuy', 'hoa', 'tho'] as Elemental[])[plot.soilType!]];

  selectSeed(cropId: number) {
      this.selectedCropId.set(cropId);
      this.selectedTool.set('plant'); // Auto-select plant tool when a seed is chosen
  }

  toggleInventoryDialog = () => this.showInventoryDialog = !this.showInventoryDialog;

  increasePlayerXP(amount: number) {
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

  private onKey = (e: KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '5') {
      const index = +e.key - 1;
      if (this.crops[index]) {
          this.selectSeed(this.crops[index].id); // Use selectSeed to also change tool
      }
    }
    if (e.key.toLowerCase() === 'i') {
        this.toggleInventoryDialog();
    }
  };

  // --- trackBy function for *ngFor performance ---
  trackTileById = (index: number, tile: MapTile) => tile.id;
}