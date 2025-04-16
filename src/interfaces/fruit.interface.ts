// abc/interfaces/fruit.interface.ts
import Phaser from 'phaser'; // Import Phaser nếu cần dùng kiểu dữ liệu của nó

export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FruitData {
    id: string;
    name: string;
    element: ElementType;
    growthTimeSeconds: number;
    harvestYield: number;
    seedCost?: number; // Giá mua off-chain (tùy chọn)
    spriteKeySeed: string;
    spriteKeyGrowing: string;
    spriteKeyReady: string;
}

export interface StoredFarmPlotState {
    tileX: number;
    tileY: number;
    state: 'empty' | 'growing' | 'ready';
    fruitId: string | null;
    growthTimer: number;
}

export interface FarmPlotRuntimeState extends StoredFarmPlotState {
    gameObject: Phaser.GameObjects.Image | null;
    timerTextObject?: Phaser.GameObjects.Text | null;
    stateTextObject?: Phaser.GameObjects.Text | null;
}

export interface PlayerInventory {
    [fruitId: string]: number;
}