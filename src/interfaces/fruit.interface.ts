// abc/interfaces/fruit.interface.ts
export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FruitData {
    id: string;
    name: string;
    element: ElementType;
    growthTimeSeconds: number;
    harvestYield: number;
    seedCost?: number;
    spriteKeySeed: string;      // Key của ảnh khi mới gieo/hạt giống
    spriteKeyGrowing: string;   // Key của ảnh khi đang lớn
    spriteKeyReady: string;     // Key của ảnh khi chín
}

// Trạng thái ô đất để LƯU TRỮ (không đổi)
export interface StoredFarmPlotState {
    tileX: number;
    tileY: number;
    state: 'empty' | 'growing' | 'ready';
    fruitId: string | null;
    growthTimer: number;
}

// Mô tả trạng thái runtime và tham chiếu GameObjects
export interface FarmPlotRuntimeState extends StoredFarmPlotState {
    gameObject: Phaser.GameObjects.Image | null;
    timerTextObject?: Phaser.GameObjects.Text | null;
    stateTextObject?: Phaser.GameObjects.Text | null;
}

// Kho đồ người chơi (không đổi)
export interface PlayerInventory {
    [fruitId: string]: number;
}