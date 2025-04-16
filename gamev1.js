// create_ts_project_files.js
const fs = require('fs');
const path = require('path');

// Lấy tên thư mục đích từ đối số dòng lệnh thứ 3 (index 2)
// Nếu không có đối số, mặc định là 'src'
const targetDirectory = process.argv[2] || 'src';

console.log(`Target directory set to: "${targetDirectory}"`);

// --- Định nghĩa cấu trúc file và nội dung (TypeScript) ---
// Đường dẫn filePath là tương đối so với targetDirectory
const fileStructure = [
    // --- Interfaces ---
    {
        filePath: 'interfaces/fruit.interface.ts',
        content: `
// ${targetDirectory}/interfaces/fruit.interface.ts
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
        `
    },
    // --- Config ---
    {
        filePath: 'config/gameConfig.ts',
        content: `
// ${targetDirectory}/config/gameConfig.ts
import Phaser from 'phaser';

export const PLOTS_STORAGE_KEY: string = 'phaserFarmGame_plots_v2';
export const INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_inventory_v2';
export const SEED_INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_seedInventory_v1';

export const TILE_SIZE: number = 100; // Kích thước ô đất logic
export const FARM_COLS: number = 5;
export const FARM_ROWS: number = 5;
export const EMPTY_PLOT_KEY: string = 'empty_plot';
export const PLOT_IMAGE_DISPLAY_SIZE: number = TILE_SIZE - 4;

export const UI_PADDING: number = 15;
export const SEED_ICON_SIZE: number = 50;
export const SEED_SPACING_VERTICAL: number = 15;
export const SEED_COUNT_TEXT_OFFSET_Y: number = 30;

export const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: { x: 3, y: 1 }
};
export const TIMER_TEXT_OFFSET_Y: number = - (TILE_SIZE / 2) + 15;

export const STATE_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: { x: 5, y: 2 },
    fontStyle: 'bold'
};

export const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#3498db',
    padding: { x: 12, y: 6 },
};
        `
    },
    // --- Data ---
    {
        filePath: 'data/fruits.ts',
        content: `
// ${targetDirectory}/data/fruits.ts
import { FruitData } from '../interfaces/fruit.interface'; // Đảm bảo import đúng

export const ALL_FRUITS: FruitData[] = [
     {
        id: 'kim_lan', name: 'Kim Lan', element: 'Kim', growthTimeSeconds: 10, harvestYield: 2,
        spriteKeySeed: 'seed_kim', spriteKeyGrowing: 'growing_kim', spriteKeyReady: 'ready_kim'
    },
    {
        id: 'moc_dao', name: 'Mộc Đào', element: 'Mộc', growthTimeSeconds: 15, harvestYield: 3,
        spriteKeySeed: 'seed_moc', spriteKeyGrowing: 'growing_moc', spriteKeyReady: 'ready_moc'
    },
    {
        id: 'thuy_le', name: 'Thủy Lê', element: 'Thủy', growthTimeSeconds: 20, harvestYield: 2,
        spriteKeySeed: 'seed_thuy', spriteKeyGrowing: 'growing_thuy', spriteKeyReady: 'ready_thuy'
    },
    {
        id: 'hoa_luu', name: 'Hỏa Lựu', element: 'Hỏa', growthTimeSeconds: 25, harvestYield: 1,
        spriteKeySeed: 'seed_hoa', spriteKeyGrowing: 'growing_hoa', spriteKeyReady: 'ready_hoa'
    },
    {
        id: 'tho_ngo', name: 'Thổ Ngô', element: 'Thổ', growthTimeSeconds: 30, harvestYield: 5,
        spriteKeySeed: 'seed_tho', spriteKeyGrowing: 'growing_tho', spriteKeyReady: 'ready_tho'
    },
];

export function getFruitDataById(id: string): FruitData | undefined {
    return ALL_FRUITS.find(fruit => fruit.id === id);
}
        `
    },
    // --- Services ---
    {
        filePath: 'services/storageService.ts',
        content: `
// ${targetDirectory}/services/storageService.ts
import * as config from '../config/gameConfig';
import { ALL_FRUITS } from '../data/fruits';
import { StoredFarmPlotState, PlayerInventory } from '../interfaces/fruit.interface';
import { FarmPlotGO } from '../gameObjects/FarmPlotGO'; // Import class sẽ tạo

/**
 * Lưu trạng thái các ô đất vào localStorage.
 * @param farmPlots Map chứa các đối tượng FarmPlotGO.
 */
export function savePlotState(farmPlots: Map<string, FarmPlotGO>): void {
    try {
        // Chuyển đổi từ FarmPlotGO sang StoredFarmPlotState để lưu trữ
        const plotsToStore: [string, StoredFarmPlotState][] = Array.from(farmPlots.entries())
            .map(([key, plotGO]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plotGO.tileX,
                    tileY: plotGO.tileY,
                    state: plotGO.getState(), // Lấy state từ getter nếu có
                    fruitId: plotGO.getFruitId(), // Lấy fruitId từ getter nếu có
                    growthTimer: plotGO.getGrowthTimer() // Lấy timer từ getter nếu có
                };
                return [key, storedState];
            });
        localStorage.setItem(config.PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
    } catch (e) {
        console.error("Error saving plot states:", e);
    }
}

/**
 * Tải trạng thái các ô đất từ localStorage.
 * @returns Map chứa trạng thái đã lưu (dạng StoredFarmPlotState).
 */
export function loadPlotState(): Map<string, StoredFarmPlotState> {
    const savedPlotsJson = localStorage.getItem(config.PLOTS_STORAGE_KEY);
    const plots = new Map<string, StoredFarmPlotState>();
    if (savedPlotsJson) {
        try {
            const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
            savedPlotDataArray.forEach(([key, storedState]) => {
                // Validate state data if necessary before adding
                if (['empty', 'growing', 'ready'].includes(storedState.state)) {
                   plots.set(key, storedState);
                } else {
                   console.warn(\`Invalid state "\${storedState.state}" found for plot \${key}. Skipping.\`)
                }
            });
            console.log(\`Loaded \${plots.size} valid plot states.\`);
        } catch (e) {
            console.error("Error parsing plot states:", e);
            plots.clear();
        }
    } else {
        console.log("No plot states found.");
    }
    return plots;
}

/**
 * Lưu kho đồ vào localStorage.
 * @param key Key của kho đồ.
 * @param inventory Đối tượng kho đồ.
 */
export function saveInventory(key: string, inventory: PlayerInventory): void {
    try {
        localStorage.setItem(key, JSON.stringify(inventory));
    } catch (e) {
        console.error(\`Error saving inventory [\${key}]:\`, e);
    }
}

/**
 * Tải kho đồ từ localStorage.
 * @param key Key của kho đồ.
 * @param initializeFunction Hàm khởi tạo nếu không có dữ liệu.
 * @returns Đối tượng kho đồ.
 */
export function loadInventory(key: string, initializeFunction: () => PlayerInventory): PlayerInventory {
    const savedJson = localStorage.getItem(key);
    if (savedJson) {
        try {
            // Basic type check after parsing
            const parsed = JSON.parse(savedJson);
            if (typeof parsed === 'object' && parsed !== null) {
                 // Further validation could be added here if needed
                 return parsed as PlayerInventory;
            } else {
                 console.error(\`Invalid inventory data type found for key [\${key}]:\`, typeof parsed);
                 return initializeFunction();
            }
        } catch (e) {
            console.error(\`Error parsing inventory [\${key}]:\`, e);
            return initializeFunction();
        }
    } else {
        return initializeFunction();
    }
}

/** Khởi tạo kho nông sản mặc định. */
export function initializeHarvestInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 0; });
    return inventory;
}

/** Khởi tạo kho hạt giống mặc định. */
export function initializeSeedInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 5; }); // Số lượng hạt giống ban đầu
    console.log("Initialized seed inventory:", inventory);
    return inventory;
}

/** Xóa tất cả dữ liệu game đã lưu. */
export function resetGameData(): void {
    localStorage.removeItem(config.PLOTS_STORAGE_KEY);
    localStorage.removeItem(config.INVENTORY_STORAGE_KEY);
    localStorage.removeItem(config.SEED_INVENTORY_STORAGE_KEY);
    console.log("Removed all game data from localStorage.");
}
        `
    },
    // --- UI ---
    {
        filePath: 'ui/UIManager.ts',
        content: `
// ${targetDirectory}/ui/UIManager.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById, ALL_FRUITS } from '../data/fruits';
import { PlayerInventory, FruitData } from '../interfaces/fruit.interface';

// Kiểu dữ liệu cho các thành phần UI của túi hạt giống
type SeedBagElement = { icon: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text };

export class UIManager {
    private scene: Phaser.Scene;
    private inventoryText: Phaser.GameObjects.Text | null = null;
    private seedBagUIElements: Map<string, SeedBagElement> = new Map();
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /** Tạo tất cả các thành phần UI chính */
    public createAllUI(playerInventory: PlayerInventory, playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;

        // Tiêu đề game
        this.scene.add.text(config.UI_PADDING, config.UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' })
            .setOrigin(0, 0).setData('isUiElement', true);

        // Text hiển thị kho nông sản
        const inventoryTextY = config.UI_PADDING * 3;
        this.inventoryText = this.scene.add.text(config.UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' })
            .setWordWrapWidth(screenWidth - config.UI_PADDING * 2).setOrigin(0, 0).setData('isUiElement', true);
        this.updateInventoryDisplay(playerInventory); // Cập nhật lần đầu

        // Nút Reset
        const resetButton = this.scene.add.text(screenWidth - config.UI_PADDING, config.UI_PADDING, 'Chơi Lại Từ Đầu', config.RESET_BUTTON_STYLE)
            .setOrigin(1, 0)
            .setInteractive({ useHandCursor: true })
            .setData('isUiElement', true)
            .setData('resetButton', true); // Thêm data để nhận diện dễ hơn trong Scene
        // Sự kiện click sẽ được xử lý trong FarmScene thông qua event listener chung

        // Tiêu đề túi hạt giống
        const seedBagTitleY = config.UI_PADDING * 3;
        this.scene.add.text(screenWidth - config.UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' })
            .setOrigin(1, 0).setData('isUiElement', true);

        // Tạo các icon và text cho túi hạt giống
        this.createSeedBagElements(playerSeedInventory);

        // Tạo hình chữ nhật highlight khi chọn hạt giống
        this.selectedSeedHighlight = this.scene.add.rectangle(0, 0, config.SEED_ICON_SIZE + 4, config.SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff)
            .setVisible(false)
            .setDepth(2);
    }

    /** Tạo các icon và text số lượng cho túi hạt giống */
    private createSeedBagElements(playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;
        const seedBagStartX = screenWidth - config.UI_PADDING - config.SEED_ICON_SIZE / 2;
        const seedBagTitleY = config.UI_PADDING * 3;
        const seedBagStartY = seedBagTitleY + 50;
        this.seedBagUIElements.clear(); // Xóa các element cũ nếu có

        ALL_FRUITS.forEach((fruit: FruitData, index: number) => {
            const iconX = seedBagStartX;
            const iconY = seedBagStartY + index * (config.SEED_ICON_SIZE + config.SEED_SPACING_VERTICAL);
            const count = playerSeedInventory[fruit.id] || 0;

            const seedIcon = this.scene.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive(count > 0 ? { useHandCursor: true } : undefined) // Chỉ set interactive nếu count > 0
                .setDisplaySize(config.SEED_ICON_SIZE, config.SEED_ICON_SIZE)
                .setData('seedId', fruit.id)
                .setData('isSeedIcon', true)
                .setData('isUiElement', true)
                .setAlpha(count > 0 ? 1 : 0.5); // Alpha dựa trên số lượng

            const countTextY = iconY + config.SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.scene.add.text(iconX, countTextY, \`x\${count}\`, { fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 } })
                .setOrigin(0.5)
                .setData('isUiElement', true);

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    /** Cập nhật hiển thị kho nông sản */
    public updateInventoryDisplay(playerInventory: PlayerInventory): void {
        let text = 'Kho nông sản: ';
        let items: string[] = [];
        for (const fruitId in playerInventory) {
            if (playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(\`\${fruitData?.name || fruitId}: \${playerInventory[fruitId]}\`);
            }
        }
        text += items.join(' | ') || 'Trống';

        const screenWidth = this.scene.cameras.main.width;
        const seedBagWidthEstimate = config.SEED_ICON_SIZE + config.UI_PADDING * 2;
        const availableWidth = screenWidth - seedBagWidthEstimate - config.UI_PADDING;

        if (this.inventoryText) {
            this.inventoryText.setText(text);
            // Đặt giới hạn chiều rộng để text tự xuống dòng
            this.inventoryText.setWordWrapWidth(availableWidth > 100 ? availableWidth : 100);
        }
    }

    /** Cập nhật hiển thị số lượng và trạng thái của túi hạt giống */
    public updateSeedBagDisplay(playerSeedInventory: PlayerInventory): void {
        this.seedBagUIElements.forEach((elements: SeedBagElement, fruitId: string) => {
            const count = playerSeedInventory[fruitId] || 0;
            elements.text.setText(\`x\${count}\`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
            // Cập nhật lại tương tác
            if (count > 0) {
                if (!elements.icon.input?.enabled) {
                    elements.icon.setInteractive({ useHandCursor: true });
                }
            } else {
                if (elements.icon.input?.enabled) {
                    elements.icon.disableInteractive();
                }
            }
        });
    }

    /** Hiển thị highlight khi chọn hạt giống */
    public selectSeed(icon: Phaser.GameObjects.Image): void {
        if (this.selectedSeedHighlight) {
            this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true);
        }
    }

    /** Ẩn highlight khi bỏ chọn hạt giống */
    public deselectSeed(): void {
        if (this.selectedSeedHighlight) {
            this.selectedSeedHighlight.setVisible(false);
        }
    }

    /** Hiển thị hộp thoại xác nhận (dùng DOM) */
    public showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void): void {
        // Logic tạo dialog DOM giữ nguyên như bản Javascript
        const dialogOverlay = document.createElement('div');
        dialogOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000;display:flex;justify-content:center;align-items:center;';

        const dialogBox = document.createElement('div');
        dialogBox.style.cssText = 'background-color:#fff;padding:25px;border-radius:8px;z-index:1001;text-align:center;box-shadow: 0 4px 15px rgba(0,0,0,0.2);max-width: 90%;width: 300px;';

        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.cssText = 'color:#333;margin-bottom:20px;font-size:16px;line-height:1.5;';
        dialogBox.appendChild(messageElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '15px';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Xác nhận';
        confirmButton.style.cssText = 'margin:0 10px;background-color:#3498db;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        confirmButton.onmouseover = () => confirmButton.style.backgroundColor = '#2980b9';
        confirmButton.onmouseout = () => confirmButton.style.backgroundColor = '#3498db';
        confirmButton.onclick = () => {
            onConfirm();
            if (document.body.contains(dialogOverlay)) {
                 document.body.removeChild(dialogOverlay);
            }
        };
        buttonContainer.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.cssText = 'margin:0 10px;background-color:#e74c3c;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#c0392b';
        cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#e74c3c';
        cancelButton.onclick = () => {
            onCancel();
             if (document.body.contains(dialogOverlay)) {
                 document.body.removeChild(dialogOverlay);
            }
        };
        buttonContainer.appendChild(cancelButton);

        dialogBox.appendChild(buttonContainer);
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
    }

    /** (Optional) Hủy các đối tượng UI được quản lý */
    public destroy(): void {
        this.inventoryText?.destroy();
        this.selectedSeedHighlight?.destroy();
        this.seedBagUIElements.forEach(element => {
            element.icon.destroy();
            element.text.destroy();
        });
        this.seedBagUIElements.clear();
        console.log("UIManager elements destroyed.");
    }
}
        `
    },
    // --- GameObjects ---
    {
        filePath: 'gameObjects/FarmPlotGO.ts',
        content: `
// ${targetDirectory}/gameObjects/FarmPlotGO.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById, FruitData } from '../data/fruits';
import { StoredFarmPlotState } from '../interfaces/fruit.interface';

type PlotState = 'empty' | 'growing' | 'ready';

export class FarmPlotGO {
    private scene: Phaser.Scene;
    public readonly tileX: number; // Tọa độ logic không đổi
    public readonly tileY: number; // Tọa độ logic không đổi

    private state: PlotState = 'empty';
    private fruitId: string | null = null;
    private growthTimer: number = 0; // Đơn vị: giây

    // Game Objects được quản lý bởi class này
    public gameObject: Phaser.GameObjects.Image;
    private timerTextObject: Phaser.GameObjects.Text;
    private stateTextObject: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, tileX: number, tileY: number, initialState?: StoredFarmPlotState) {
        this.scene = scene;
        this.tileX = tileX;
        this.tileY = tileY;

        const initialPlotX = tileX * config.TILE_SIZE + config.TILE_SIZE / 2; // Vị trí tạm thời
        const initialPlotY = tileY * config.TILE_SIZE + config.TILE_SIZE / 2; // Vị trí tạm thời

        // Áp dụng trạng thái ban đầu nếu có (từ localStorage)
        if (initialState) {
            this.state = initialState.state;
            this.fruitId = initialState.fruitId;
            this.growthTimer = initialState.growthTimer;
        }

        // Tạo Image
        this.gameObject = scene.add.image(initialPlotX, initialPlotY, this.getTextureKey())
            .setInteractive()
            .setDisplaySize(config.PLOT_IMAGE_DISPLAY_SIZE, config.PLOT_IMAGE_DISPLAY_SIZE)
            .setData('plotKey', \`\${tileX}-\${tileY}\`) // Lưu key để dễ truy xuất trong Scene
            .setData('isPlot', true)
            .setDepth(0);

        // Tạo Text Timer
        this.timerTextObject = scene.add.text(initialPlotX, initialPlotY + config.TIMER_TEXT_OFFSET_Y, '', config.TIMER_TEXT_STYLE)
            .setOrigin(0.5)
            .setVisible(this.state === 'growing' && this.growthTimer > 0)
            .setDepth(1);

        // Tạo Text State
        this.stateTextObject = scene.add.text(initialPlotX, initialPlotY, '', config.STATE_TEXT_STYLE)
            .setOrigin(0.5)
            .setVisible(this.state === 'empty' || this.state === 'ready')
            .setDepth(1);

        // Cập nhật nội dung text và hình ảnh ban đầu
        this.updateVisual();
        // Vị trí chính xác sẽ được đặt bởi updatePosition() trong FarmScene
    }

    /** Cập nhật vị trí của tất cả GameObjects liên quan đến ô đất này */
    public updatePosition(farmGridX: number, farmGridY: number): void {
        const plotX = farmGridX + this.tileX * config.TILE_SIZE + config.TILE_SIZE / 2;
        const plotY = farmGridY + this.tileY * config.TILE_SIZE + config.TILE_SIZE / 2;

        this.gameObject.setPosition(plotX, plotY);
        this.timerTextObject.setPosition(plotX, plotY + config.TIMER_TEXT_OFFSET_Y);
        this.stateTextObject.setPosition(plotX, plotY);
    }

    /** Xác định texture key dựa trên trạng thái hiện tại */
    private getTextureKey(): string {
        let textureKey = config.EMPTY_PLOT_KEY;
        const fruitData = this.fruitId ? getFruitDataById(this.fruitId) : undefined;

        switch (this.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    textureKey = (this.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || config.EMPTY_PLOT_KEY;
                break;
            case 'empty': default:
                textureKey = config.EMPTY_PLOT_KEY;
                break;
        }
        return textureKey;
    }

    /** Cập nhật hình ảnh và nội dung/hiển thị của các text */
    private updateVisual(): void {
        // Cập nhật ảnh
        this.gameObject.setTexture(this.getTextureKey());

        // Cập nhật text
        switch (this.state) {
            case 'empty':
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setText('Đất trống').setVisible(true);
                break;
            case 'growing':
                this.stateTextObject.setVisible(false);
                if (this.growthTimer > 0) {
                    const remainingTime = Math.ceil(this.growthTimer);
                    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                    const seconds = (remainingTime % 60).toString().padStart(2, '0');
                    this.timerTextObject.setText(\`\${minutes}:\${seconds}\`).setVisible(true);
                } else {
                    this.timerTextObject.setVisible(false);
                }
                break;
            case 'ready':
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setText('Thu hoạch').setVisible(true);
                break;
            default:
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setVisible(false);
                break;
        }
    }

    /**
     * Cập nhật bộ đếm thời gian và trạng thái.
     * @param delta Thời gian trôi qua (giây).
     * @returns boolean Trả về true nếu trạng thái thay đổi (cần lưu game).
     */
    public updateTimer(delta: number): boolean {
        if (this.state !== 'growing' || this.growthTimer <= 0) {
            return false; // Không có gì để cập nhật
        }

        // const previousGrowthRatio = this.getGrowthRatio(); // Nếu cần dùng tỉ lệ
        this.growthTimer -= delta;
        let stateChanged = true; // Mặc định là true vì timer giảm
        let visualNeedsUpdate = false;

        // Kiểm tra xem texture có cần thay đổi không (ví dụ: từ seed -> growing)
        const newTexture = this.getTextureKey();
        if (this.gameObject.texture.key !== newTexture) {
            visualNeedsUpdate = true;
        }

        // Kiểm tra cây chín
        if (this.growthTimer <= 0) {
            this.growthTimer = 0;
            this.state = 'ready';
            const fruitData = getFruitDataById(this.fruitId!); // Dùng non-null assertion vì state là growing
            console.log(\`Fruit \${fruitData?.name} at (\${this.tileX}, \${this.tileY}) is ready!\`);
            visualNeedsUpdate = true; // Cần cập nhật visual khi chín
        }

        // Cập nhật visual nếu cần (đổi ảnh hoặc cây chín)
        if (visualNeedsUpdate) {
            this.updateVisual();
        } else {
            // Nếu không đổi ảnh/state, chỉ cập nhật text timer nếu nó đang hiển thị
            if (this.timerTextObject.visible && this.growthTimer > 0) { // Chỉ cập nhật nếu còn lớn
                const remainingTime = Math.ceil(this.growthTimer);
                const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                const seconds = (remainingTime % 60).toString().padStart(2, '0');
                this.timerTextObject.setText(\`\${minutes}:\${seconds}\`);
            } else if (this.timerTextObject.visible && this.growthTimer <= 0) {
                 this.timerTextObject.setVisible(false); // Ẩn timer khi vừa hết giờ nhưng chưa chuyển state xong
            }
        }

        return stateChanged; // Luôn trả về true nếu timer giảm hoặc state đổi
    }

    /** Trồng cây mới */
    public plant(newFruitId: string): boolean {
        if (this.state === 'empty') {
            const fruitData = getFruitDataById(newFruitId);
            if (fruitData) {
                this.state = 'growing';
                this.fruitId = newFruitId;
                this.growthTimer = fruitData.growthTimeSeconds;
                console.log(\`Planted \${fruitData.name} at (\${this.tileX}, \${this.tileY}).\`);
                this.updateVisual(); // Cập nhật hiển thị sau khi trồng
                return true; // Trồng thành công
            }
        }
        return false; // Không thể trồng
    }

    /** Thu hoạch cây */
    public harvest(): { harvestedAmount: number; fruitId: string | null; seedReward: boolean } {
        if (this.state === 'ready' && this.fruitId) {
            const fruitData = getFruitDataById(this.fruitId);
            if (fruitData) {
                const harvestedAmount = fruitData.harvestYield;
                const harvestedFruitId = this.fruitId;
                console.log(\`Harvested \${harvestedAmount} \${fruitData.name} from (\${this.tileX}, \${this.tileY}).\`);

                // Reset ô đất
                this.state = 'empty';
                this.fruitId = null;
                this.growthTimer = 0;
                this.updateVisual(); // Cập nhật hiển thị sau khi thu hoạch

                // Tính tỉ lệ nhận hạt giống bonus
                const seedRewardChance = 0.25; // 25%
                const seedReward = Math.random() < seedRewardChance;
                if (seedReward) {
                    console.log(\`Bonus! Received 1 \${fruitData.name} seed.\`);
                }

                return { harvestedAmount, fruitId: harvestedFruitId, seedReward };
            }
        }
        // Trả về giá trị mặc định nếu không thể thu hoạch
        return { harvestedAmount: 0, fruitId: null, seedReward: false };
    }

     /** Hủy các GameObjects được quản lý bởi instance này */
    public destroy(): void {
        this.gameObject.destroy();
        this.timerTextObject.destroy();
        this.stateTextObject.destroy();
    }

    // --- Getters để lấy trạng thái (hữu ích cho storageService và scene) ---
    public getState(): PlotState { return this.state; }
    public getFruitId(): string | null { return this.fruitId; }
    public getGrowthTimer(): number { return this.growthTimer; }
    // private getGrowthRatio(): number { // Ví dụ getter tỉ lệ phát triển
    //      const fruitData = getFruitDataById(this.fruitId ?? '');
    //      if (!fruitData || this.state !== 'growing') return 0;
    //      return Math.max(0, 1 - (this.growthTimer / fruitData.growthTimeSeconds));
    // }
}
        `
    },
    // --- Scenes ---
    {
        filePath: 'scenes/FarmScene.ts',
        content: `
// ${targetDirectory}/scenes/FarmScene.ts
import Phaser from 'phaser';
// Import các thành phần đã tách
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import * as config from '../config/gameConfig';
import * as storage from '../services/storageService';
import { PlayerInventory, StoredFarmPlotState } from '../interfaces/fruit.interface';
import { UIManager } from '../ui/UIManager';
import { FarmPlotGO } from '../gameObjects/FarmPlotGO';

export class FarmScene extends Phaser.Scene {
    // Sử dụng Map để lưu các đối tượng ô đất FarmPlotGO
    private farmPlots: Map<string, FarmPlotGO> = new Map();
    private playerInventory: PlayerInventory = {};
    private playerSeedInventory: PlayerInventory = {};
    private selectedSeedId: string | null = null;

    // Khai báo UIManager, sẽ được khởi tạo trong create()
    private uiManager!: UIManager; // Dùng definite assignment assertion

    // Tọa độ bắt đầu của lưới farm
    private farmGridX: number = 0;
    private farmGridY: number = 100;

    constructor() {
        super('FarmScene');
    }

    preload(): void {
        console.log('FarmScene preload: Loading images...');
        // Giả định thư mục assets nằm cùng cấp với thư mục targetDirectory (vd: src)
        const assetsPath = '../assets'; // Đường dẫn tương đối từ scene -> targetDir -> assets
        this.load.image(config.EMPTY_PLOT_KEY, \`\${assetsPath}/\${config.EMPTY_PLOT_KEY}.png\`);
        ALL_FRUITS.forEach(fruit => {
            this.load.image(fruit.spriteKeySeed, \`\${assetsPath}/\${fruit.spriteKeySeed}.jpg\`);
            this.load.image(fruit.spriteKeyGrowing, \`\${assetsPath}/\${fruit.spriteKeyGrowing}.jpg\`);
            this.load.image(fruit.spriteKeyReady, \`\${assetsPath}/\${fruit.spriteKeyReady}.jpg\`);
            console.log(\`  Loading assets for \${fruit.name}\`);
        });
        console.log('Image loading scheduled.');
    }

    create(): void {
        console.log('FarmScene create');
        this.calculateLayout(); // Tính layout trước

        // Load trạng thái game từ storage
        this.loadState();

        // Khởi tạo UIManager và tạo các thành phần UI
        this.uiManager = new UIManager(this);
        this.uiManager.createAllUI(this.playerInventory, this.playerSeedInventory);

        // Tạo lưới farm và các đối tượng FarmPlotGO
        this.createFarmGrid();

        // Lắng nghe sự kiện input toàn cục
        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.onGameObjectDown, this);

        // Timer cập nhật logic game mỗi giây
        this.time.addEvent({
            delay: 1000, // 1000ms = 1 giây
            callback: this.updateGrowthTimers,
            callbackScope: this,
            loop: true
        });

        // (Optional) Lắng nghe sự kiện resize để cập nhật layout
        // this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);

         // Dọn dẹp khi scene bị shutdown
         this.events.on(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
    }

    /** Tính toán vị trí bắt đầu của lưới farm */
    private calculateLayout(): void {
        const screenWidth = this.cameras.main.width;
        const farmGridWidth = config.FARM_COLS * config.TILE_SIZE;
        this.farmGridX = (screenWidth - farmGridWidth) / 2;
        if (this.farmGridX < config.UI_PADDING) {
            this.farmGridX = config.UI_PADDING;
        }
        this.farmGridY = 100; // Hoặc giá trị khác
        console.log(\`Calculated Layout: ScreenW=\${screenWidth}, GridX=\${this.farmGridX}\`);
    }

    /** Load trạng thái game */
    private loadState(): void {
        console.log("Attempting to load state from localStorage...");
        this.playerInventory = storage.loadInventory(config.INVENTORY_STORAGE_KEY, storage.initializeHarvestInventory);
        this.playerSeedInventory = storage.loadInventory(config.SEED_INVENTORY_STORAGE_KEY, storage.initializeSeedInventory);
        // Trạng thái plot sẽ được load trong createFarmGrid
    }

    /** Lưu trạng thái game */
    private saveState(): void {
        storage.savePlotState(this.farmPlots);
        storage.saveInventory(config.INVENTORY_STORAGE_KEY, this.playerInventory);
        storage.saveInventory(config.SEED_INVENTORY_STORAGE_KEY, this.playerSeedInventory);
        // console.log("Game state saved."); // Bỏ comment nếu cần log thường xuyên
    }

    /** Tạo lưới farm và các đối tượng FarmPlotGO */
    private createFarmGrid(): void {
        console.log("Creating farm grid GameObjects...");
        const savedPlotStates: Map<string, StoredFarmPlotState> = storage.loadPlotState();

        // Dọn dẹp plot cũ nếu có (quan trọng khi restart scene)
        this.farmPlots.forEach(plot => plot.destroy());
        this.farmPlots.clear();

        for (let y = 0; y < config.FARM_ROWS; y++) {
            for (let x = 0; x < config.FARM_COLS; x++) {
                const plotKey = \`\${x}-\${y}\`;
                const initialState = savedPlotStates.get(plotKey);

                // Tạo đối tượng FarmPlotGO mới
                const plotGO = new FarmPlotGO(this, x, y, initialState);
                // Cập nhật vị trí dựa trên layout đã tính
                plotGO.updatePosition(this.farmGridX, this.farmGridY);

                this.farmPlots.set(plotKey, plotGO);
            }
        }
        console.log(\`Farm grid created with \${this.farmPlots.size} plots.\`);
    }

    /** Xử lý sự kiện click vào GameObject */
    private onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject): void {
        // Sử dụng type guards để kiểm tra kiểu an toàn hơn
        const isPlot = gameObject.getData('isPlot') === true;
        const isSeedIcon = gameObject.getData('isSeedIcon') === true;
        const isResetButton = gameObject.getData('resetButton') === true;

        if (isResetButton) {
            this.handleResetButtonClick();
        } else if (isSeedIcon && gameObject instanceof Phaser.GameObjects.Image) {
            const seedId = gameObject.getData('seedId') as string;
            if (this.playerSeedInventory[seedId] > 0) {
                this.handleSeedSelection(seedId, gameObject); // Truyền cả icon vào
            } else {
                console.log(\`Hết hạt \${getFruitDataById(seedId)?.name || seedId}!\`);
                this.deselectSeed();
            }
        } else if (isPlot) {
            const plotKey = gameObject.getData('plotKey') as string;
            const plot = this.farmPlots.get(plotKey);
            if (!plot) return;

            console.log(\`Clicked plot (\${plot.tileX}, \${plot.tileY}), state: \${plot.getState()}\`);

            if (plot.getState() === 'empty' && this.selectedSeedId) {
                this.handlePlanting(plot);
            } else if (plot.getState() === 'growing') {
                const fruitName = plot.getFruitId() ? getFruitDataById(plot.getFruitId()!)?.name : 'Không rõ';
                console.log(\`Đang trồng \${fruitName}. Còn lại: \${Math.ceil(plot.getGrowthTimer())}s\`);
                this.deselectSeed();
            } else if (plot.getState() === 'ready') {
                this.handleHarvesting(plot);
                this.deselectSeed();
            } else { // Click ô trống khi chưa chọn hạt
                this.deselectSeed();
                console.log("Ô đất trống. Chọn một hạt giống từ túi để trồng.");
            }
        } else {
            // Click ra ngoài hoặc UI khác không có data đặc biệt
             if(gameObject.getData('isUiElement') !== true) { // Chỉ bỏ chọn nếu không phải UI element khác
                 this.deselectSeed();
             }
        }
    }

    /** Xử lý chọn hạt giống */
    private handleSeedSelection(seedId: string, icon: Phaser.GameObjects.Image): void {
        if (this.selectedSeedId !== seedId) {
             console.log(\`Selected seed: \${getFruitDataById(seedId)?.name || seedId}\`);
             this.selectedSeedId = seedId;
             this.uiManager.selectSeed(icon);
        } else {
             this.deselectSeed(); // Click lại hạt đã chọn -> bỏ chọn
        }
    }

    /** Xử lý bỏ chọn hạt giống */
    private deselectSeed(): void {
        if (this.selectedSeedId) {
            console.log("Deselected seed");
            this.selectedSeedId = null;
            this.uiManager.deselectSeed();
        }
    }

    /** Xử lý trồng cây */
    private handlePlanting(plot: FarmPlotGO): void {
        if (!this.selectedSeedId) return; // Đảm bảo đã chọn hạt

        const seedCount = this.playerSeedInventory[this.selectedSeedId] || 0;
        if (seedCount > 0) {
            if (plot.plant(this.selectedSeedId)) { // Gọi hàm plant của FarmPlotGO
                this.playerSeedInventory[this.selectedSeedId]--; // Trừ hạt giống
                this.uiManager.updateSeedBagDisplay(this.playerSeedInventory); // Cập nhật UI
                this.saveState(); // Lưu game
                this.deselectSeed(); // Bỏ chọn hạt sau khi trồng
            }
        } else {
            // Trường hợp hiếm gặp: dữ liệu không đồng bộ
            console.error("Attempted to plant seed with count 0!");
            this.deselectSeed();
            this.uiManager.updateSeedBagDisplay(this.playerSeedInventory); // Cập nhật lại UI
        }
    }

    /** Xử lý thu hoạch */
    private handleHarvesting(plot: FarmPlotGO): void {
        const harvestResult = plot.harvest(); // Gọi hàm harvest của FarmPlotGO

        if (harvestResult.harvestedAmount > 0 && harvestResult.fruitId) {
            // Cộng nông sản
            this.playerInventory[harvestResult.fruitId] = (this.playerInventory[harvestResult.fruitId] || 0) + harvestResult.harvestedAmount;
            this.uiManager.updateInventoryDisplay(this.playerInventory);

            // Cộng hạt giống nếu có thưởng
            if (harvestResult.seedReward) {
                this.playerSeedInventory[harvestResult.fruitId] = (this.playerSeedInventory[harvestResult.fruitId] || 0) + 1;
                this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
            }

            this.saveState(); // Lưu game
        }
    }

    /** Cập nhật timer cho tất cả các ô đang trồng */
    private updateGrowthTimers(): void {
        let stateNeedsSaving = false;
        this.farmPlots.forEach(plot => {
            // Gọi updateTimer của FarmPlotGO, nó sẽ trả về true nếu có thay đổi cần lưu
            if (plot.updateTimer(1)) { // delta = 1 giây
                stateNeedsSaving = true;
            }
        });

        // Chỉ lưu nếu có ít nhất một ô đất thay đổi trạng thái (timer giảm hoặc cây chín)
        if (stateNeedsSaving) {
            this.saveState();
        }
    }

    /** Xử lý click nút Reset */
    private handleResetButtonClick(): void {
        this.uiManager.showConfirmationDialog(
            "Bạn có chắc chắn muốn reset toàn bộ dữ liệu game không? Hành động này không thể hoàn tác.",
            () => { // onConfirm
                console.log("Resetting game data...");
                storage.resetGameData();
                this.scene.restart(); // Restart lại Scene này
            },
            () => { // onCancel
                console.log("Game reset cancelled.");
            }
        );
    }

    /** (Optional) Xử lý resize */
    private handleResize(gameSize: Phaser.Structs.Size): void {
         console.log("Resize event triggered. Updating layout.");
         this.calculateLayout(); // Tính lại vị trí lưới
         // Cập nhật vị trí các ô đất
         this.farmPlots.forEach(plot => plot.updatePosition(this.farmGridX, this.farmGridY));
         // Cập nhật lại vị trí các UI elements (cần thêm logic trong UIManager nếu cần)
         // this.uiManager.updateLayout(gameSize.width, gameSize.height);
         // Ví dụ: tạo lại toàn bộ UI nếu cần
         // this.uiManager.destroy();
         // this.uiManager.createAllUI(this.playerInventory, this.playerSeedInventory);
    }

     /** Dọn dẹp khi Scene shutdown */
    shutdown(): void {
        console.log("FarmScene shutdown");
        // Hủy các đối tượng plot để tránh memory leak
        this.farmPlots.forEach(plot => plot.destroy());
        this.farmPlots.clear();
        // Hủy các đối tượng UI nếu cần
        this.uiManager?.destroy(); // Dùng optional chaining
        // Hủy các listeners của scene này
        this.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
        this.input.off(Phaser.Input.Events.GAMEOBJECT_DOWN, this.onGameObjectDown, this);
        // this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    }
}
        `
    },
    // --- Game Entry Point ---
    {
        filePath: 'game.ts', // Đặt file này trong thư mục targetDirectory luôn cho đơn giản
        content: `
// ${targetDirectory}/game.ts
import Phaser from 'phaser';
// Import FarmScene từ cùng cấp hoặc thư mục con
import { FarmScene } from './scenes/FarmScene'; // Giả định FarmScene.ts nằm trong scenes/

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#2d2d2d',
    scale: { // Cân nhắc thêm cấu hình scale nếu muốn responsive
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [FarmScene] // Đưa scene đã refactor vào
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (TypeScript Modular Version)');
        `
    }
];

// --- Hàm tạo file và thư mục ---
function createFiles() {
    console.log(`Starting to create TypeScript project files in directory: "${targetDirectory}"...`);

    // Tạo thư mục gốc nếu chưa có
    try {
         if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
            console.log(`Created base directory: ${targetDirectory}`);
        }
    } catch(err) {
        console.error(`Error creating base directory ${targetDirectory}:`, err);
        return; // Dừng nếu không tạo được thư mục gốc
    }

    fileStructure.forEach(fileInfo => {
        // Nối tên thư mục đích với đường dẫn tương đối của file
        const fullPath = path.resolve(path.join(targetDirectory, fileInfo.filePath));
        const dirName = path.dirname(fullPath);

        try {
            // Tạo thư mục cha nếu chưa tồn tại
            fs.mkdirSync(dirName, { recursive: true });

            // Ghi nội dung vào file
            fs.writeFileSync(fullPath, fileInfo.content.trim());
            console.log(`Created file: ${fullPath}`);

        } catch (err) {
            console.error(`Error creating file/directory ${fullPath}:`, err);
        }
    });
    console.log(`Finished creating TypeScript project files in "${targetDirectory}".`);
    console.log("\nNext steps:");
    console.log(`1. cd ${targetDirectory}`);
    console.log("2. Run 'npm init -y' (if you haven't already)");
    console.log("3. Run 'npm install phaser typescript'");
    console.log("4. Configure your tsconfig.json (target, module, moduleResolution, outDir, etc.)");
    console.log("5. Set up a build tool (like Vite, Webpack, or Parcel) or use 'tsc' to compile.");
    console.log("6. Create an index.html file to load the compiled game.");
    console.log("7. Remember to create the 'assets' directory and add your images.");
}

// --- Chạy hàm tạo file ---
createFiles();