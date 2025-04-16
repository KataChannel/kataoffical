// src/interfaces/fruit.interface.ts
export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FruitData {
  id: string;
  name: string;
  element: ElementType;
  growthTimeSeconds: number;
  harvestYield: number;
  seedCost?: number;
  // Thay thế color bằng spriteKey
  spriteKeySeed: string;    // Key của ảnh khi mới gieo/hạt giống
  spriteKeyGrowing: string; // Key của ảnh khi đang lớn
  spriteKeyReady: string;   // Key của ảnh khi chín
}

// Trạng thái ô đất để LƯU TRỮ
export interface StoredFarmPlotState {
    tileX: number;
    tileY: number;
    state: 'empty' | 'growing' | 'ready';
    fruitId: string | null;
    growthTimer: number;
}

// Trạng thái ô đất trong Scene (dùng Image thay Rectangle)
export interface FarmPlot extends StoredFarmPlotState {
     gameObject: Phaser.GameObjects.Image | null; // Đổi thành Image
}

// Kho đồ người chơi
export interface PlayerInventory {
    [fruitId: string]: number;
}