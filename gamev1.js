// create_full_ts_project.js
const fs = require('fs');
const path = require('path');

// Lấy tên thư mục đích từ đối số dòng lệnh, mặc định là 'src'
const targetDirectory = process.argv[2] || 'src';

console.log(`Target directory set to: "${targetDirectory}"`);

// --- Định nghĩa cấu trúc file và nội dung (TypeScript) ---
const fileStructure = [
    // --- Interfaces ---
    {
        filePath: 'interfaces/fruit.interface.ts',
        content: `
// ${targetDirectory}/interfaces/fruit.interface.ts
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

export const TILE_SIZE: number = 100;
export const FARM_COLS: number = 5;
export const FARM_ROWS: number = 5;
export const EMPTY_PLOT_KEY: string = 'empty_plot';
export const PLOT_IMAGE_DISPLAY_SIZE: number = TILE_SIZE - 4;

export const UI_PADDING: number = 15;
export const SEED_ICON_SIZE: number = 50;
export const SEED_SPACING_VERTICAL: number = 15;
export const SEED_COUNT_TEXT_OFFSET_Y: number = 30;

// Giá hạt giống ví dụ (đơn vị TON) - Quản lý giá ở đây hoặc lấy từ API/Contract
export const SEED_PRICES: { [key: string]: number } = {
    'kim_lan': 0.1,
    'moc_dao': 0.15,
    'thuy_le': 0.2,
    'hoa_luu': 0.25,
    'tho_ngo': 0.3
};

export const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 3, y: 1 }
};
export const TIMER_TEXT_OFFSET_Y: number = - (TILE_SIZE / 2) + 15;

export const STATE_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px', color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: { x: 5, y: 2 }, fontStyle: 'bold'
};

export const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px', color: '#ffffff', backgroundColor: '#3498db', padding: { x: 12, y: 6 },
};

export const CONNECT_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
     ...RESET_BUTTON_STYLE, backgroundColor: '#0088cc'
};

export const BUY_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
     fontSize: '10px', color: '#000', backgroundColor: '#f1c40f', padding: {x:3, y:1}
};
        `
    },
    // --- Data ---
    {
        filePath: 'data/fruits.ts',
        content: `
// ${targetDirectory}/data/fruits.ts
import { FruitData } from '../interfaces/fruit.interface';

export const ALL_FRUITS: FruitData[] = [
     { id: 'kim_lan', name: 'Kim Lan', element: 'Kim', growthTimeSeconds: 10, harvestYield: 2, spriteKeySeed: 'seed_kim', spriteKeyGrowing: 'growing_kim', spriteKeyReady: 'ready_kim' },
     { id: 'moc_dao', name: 'Mộc Đào', element: 'Mộc', growthTimeSeconds: 15, harvestYield: 3, spriteKeySeed: 'seed_moc', spriteKeyGrowing: 'growing_moc', spriteKeyReady: 'ready_moc' },
     { id: 'thuy_le', name: 'Thủy Lê', element: 'Thủy', growthTimeSeconds: 20, harvestYield: 2, spriteKeySeed: 'seed_thuy', spriteKeyGrowing: 'growing_thuy', spriteKeyReady: 'ready_thuy' },
     { id: 'hoa_luu', name: 'Hỏa Lựu', element: 'Hỏa', growthTimeSeconds: 25, harvestYield: 1, spriteKeySeed: 'seed_hoa', spriteKeyGrowing: 'growing_hoa', spriteKeyReady: 'ready_hoa' },
     { id: 'tho_ngo', name: 'Thổ Ngô', element: 'Thổ', growthTimeSeconds: 30, harvestYield: 5, spriteKeySeed: 'seed_tho', spriteKeyGrowing: 'growing_tho', spriteKeyReady: 'ready_tho' },
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
import { FarmPlotGO } from '../gameObjects/FarmPlotGO';

/** Lưu trạng thái các ô đất */
export function savePlotState(farmPlots: Map<string, FarmPlotGO>): void {
    try {
        const plotsToStore: [string, StoredFarmPlotState][] = Array.from(farmPlots.entries())
            .map(([key, plotGO]) => ({
                tileX: plotGO.tileX,
                tileY: plotGO.tileY,
                state: plotGO.getState(),
                fruitId: plotGO.getFruitId(),
                growthTimer: plotGO.getGrowthTimer()
            }))
            .map((state, index) => [Array.from(farmPlots.keys())[index], state]); // Giữ key gốc

        localStorage.setItem(config.PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
    } catch (e) {
        console.error("Error saving plot states:", e);
    }
}

/** Tải trạng thái các ô đất */
export function loadPlotState(): Map<string, StoredFarmPlotState> {
    const savedPlotsJson = localStorage.getItem(config.PLOTS_STORAGE_KEY);
    const plots = new Map<string, StoredFarmPlotState>();
    if (savedPlotsJson) {
        try {
            const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
            savedPlotDataArray.forEach(([key, storedState]) => {
                if (storedState && ['empty', 'growing', 'ready'].includes(storedState.state) && typeof storedState.tileX === 'number' && typeof storedState.tileY === 'number') {
                   plots.set(key, storedState);
                } else {
                   console.warn(\`Invalid state data found for plot \${key}. Skipping.\`, storedState);
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

/** Lưu kho đồ */
export function saveInventory(key: string, inventory: PlayerInventory): void {
    try {
        localStorage.setItem(key, JSON.stringify(inventory));
    } catch (e) {
        console.error(\`Error saving inventory [\${key}]:\`, e);
    }
}

/** Tải kho đồ */
export function loadInventory(key: string, initializeFunction: () => PlayerInventory): PlayerInventory {
    const savedJson = localStorage.getItem(key);
    if (savedJson) {
        try {
            const parsed = JSON.parse(savedJson);
            if (typeof parsed === 'object' && parsed !== null) {
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

/** Khởi tạo kho nông sản */
export function initializeHarvestInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 0; });
    return inventory;
}

/** Khởi tạo kho hạt giống */
export function initializeSeedInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 5; });
    console.log("Initialized seed inventory:", inventory);
    return inventory;
}

/** Reset dữ liệu game */
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
import { TonConnectUI, THEME, WalletInfo } from '@tonconnect/ui';
import { Address } from 'ton-core';

type SeedBagElement = {
    icon: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;
    buyButton?: Phaser.GameObjects.Text;
};

export class UIManager {
    private scene: Phaser.Scene;
    private inventoryText: Phaser.GameObjects.Text | null = null;
    private seedBagUIElements: Map<string, SeedBagElement> = new Map();
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;

    private tonConnectUI: TonConnectUI | null = null;
    private walletAddress: string | null = null; // raw hex address
    private walletText: Phaser.GameObjects.Text | null = null;
    private connectWalletButton: Phaser.GameObjects.Text | null = null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public async initializeTonConnect(): Promise<void> {
        if (this.tonConnectUI) {
            console.warn("TonConnectUI already initialized.");
            return;
        }
        try {
            this.tonConnectUI = new TonConnectUI({
                manifestUrl: 'https://your-game-url.com/tonconnect-manifest.json', // <<< THAY URL MANIFEST CỦA BẠN
                uiPreferences: { theme: THEME.DARK, borderRadius: 'm' }
            });

            this.tonConnectUI.onStatusChange(
                 (walletInfo: WalletInfo | null) => {
                     this.walletAddress = walletInfo?.account?.address || null; // Lấy địa chỉ raw
                     console.log(this.walletAddress ? \`Wallet connected: \${this.walletAddress}\` : 'Wallet disconnected.');
                     this.updateWalletDisplay(this.walletAddress);
                     this.updatePurchaseButtons();
                 },
                 (error: unknown) => { // Use 'unknown' for better error handling practice
                      console.error("TON Connect status change error:", error);
                 }
             );

            console.log("TonConnectUI initialized, checking for restored connection...");

            // Quan trọng: Đợi và kiểm tra kết nối đã được khôi phục
            const restoredConnection = await this.tonConnectUI.connectionRestored;
             if (restoredConnection) {
                  console.log('Connection was restored.', this.tonConnectUI.wallet);
                  this.walletAddress = this.tonConnectUI.account?.address || null;
                  // Cập nhật UI ngay sau khi khôi phục thành công
                   this.updateWalletDisplay(this.walletAddress);
                   this.updatePurchaseButtons();
             } else {
                  console.log('Connection was not restored.');
             }


        } catch (error) {
            console.error("Failed to initialize TonConnectUI:", error);
        }
    }

    public createAllUI(playerInventory: PlayerInventory, playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;

        this.scene.add.text(config.UI_PADDING, config.UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' })
            .setOrigin(0, 0).setData('isUiElement', true);

        const inventoryTextY = config.UI_PADDING * 3;
        this.inventoryText = this.scene.add.text(config.UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' })
            .setWordWrapWidth(screenWidth * 0.5).setOrigin(0, 0).setData('isUiElement', true);
        this.updateInventoryDisplay(playerInventory);

        this.scene.add.text(screenWidth - config.UI_PADDING, config.UI_PADDING, 'Chơi Lại Từ Đầu', config.RESET_BUTTON_STYLE)
            .setOrigin(1, 0).setInteractive({ useHandCursor: true })
            .setData('isUiElement', true).setData('resetButton', true);

        const seedBagTitleY = config.UI_PADDING * 3;
        this.scene.add.text(screenWidth - config.UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' })
            .setOrigin(1, 0).setData('isUiElement', true);

        this.createSeedBagElements(playerSeedInventory);

        this.selectedSeedHighlight = this.scene.add.rectangle(0, 0, config.SEED_ICON_SIZE + 4, config.SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff).setVisible(false).setDepth(2);

        // --- TON Connect UI ---
        this.connectWalletButton = this.scene.add.text(screenWidth / 2, config.UI_PADDING + 10, 'Kết nối Ví TON', config.CONNECT_BUTTON_STYLE)
             .setOrigin(0.5, 0).setInteractive({ useHandCursor: true })
             .setData('connectWalletButton', true).setData('isUiElement', true);

        this.connectWalletButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (!this.tonConnectUI) {
                 console.error("TonConnectUI not initialized yet!");
                 return;
            }
            if (this.tonConnectUI.connected) { // Dùng thuộc tính 'connected'
                 this.tonConnectUI.disconnect().catch(e => console.error("Disconnect error:", e));
            } else {
                this.tonConnectUI.openModal();
            }
        });

        this.walletText = this.scene.add.text(screenWidth / 2, config.UI_PADDING + 50, 'Đang kiểm tra ví...', { fontSize: '12px', color: '#cccccc', align: 'center' })
             .setOrigin(0.5, 0).setData('isUiElement', true);

        // Cập nhật hiển thị ví và nút mua dựa trên trạng thái ban đầu (có thể đã restore)
        this.updateWalletDisplay(this.walletAddress);
        this.updatePurchaseButtons();
    }

    private createSeedBagElements(playerSeedInventory: PlayerInventory): void {
        const screenWidth = this.scene.cameras.main.width;
        const seedBagStartX = screenWidth - config.UI_PADDING - config.SEED_ICON_SIZE / 2;
        const seedBagTitleY = config.UI_PADDING * 3;
        const seedBagStartY = seedBagTitleY + 50;

        // Xóa các element cũ trước khi tạo mới
        this.seedBagUIElements.forEach(el => {
            el.icon.destroy();
            el.text.destroy();
            el.buyButton?.destroy();
        });
        this.seedBagUIElements.clear();


        ALL_FRUITS.forEach((fruit: FruitData, index: number) => {
            const iconX = seedBagStartX;
            const iconY = seedBagStartY + index * (config.SEED_ICON_SIZE + config.SEED_SPACING_VERTICAL);
            const count = playerSeedInventory[fruit.id] || 0;
            const seedPrice = config.SEED_PRICES[fruit.id];

            const seedIcon = this.scene.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive(count > 0 ? { useHandCursor: true } : undefined)
                .setDisplaySize(config.SEED_ICON_SIZE, config.SEED_ICON_SIZE)
                .setData('seedId', fruit.id).setData('isSeedIcon', true).setData('isUiElement', true)
                .setAlpha(count > 0 ? 1 : 0.5);

            const countTextY = iconY + config.SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.scene.add.text(iconX, countTextY, \`x\${count}\`, { fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 } })
                .setOrigin(0.5).setData('isUiElement', true);

            let buyButton: Phaser.GameObjects.Text | undefined = undefined;
            if (seedPrice !== undefined) {
                 buyButton = this.scene.add.text(seedIcon.x + config.SEED_ICON_SIZE / 2 + 5, seedIcon.y, \`Mua (\${seedPrice} TON)\`, config.BUY_BUTTON_STYLE)
                    .setOrigin(0, 0.5).setInteractive({useHandCursor: true})
                    .setData('buySeedButton', fruit.id).setData('seedPrice', seedPrice)
                    .setData('isUiElement', true).setVisible(!!this.walletAddress); // Hiển thị dựa trên trạng thái kết nối ban đầu
            }

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText, buyButton });
        });
    }

    public updateInventoryDisplay(playerInventory: PlayerInventory): void {
        let text = 'Kho nông sản: ';
        let items: string[] = Object.entries(playerInventory)
            .filter(([_, count]) => count > 0)
            .map(([fruitId, count]) => {
                const fruitData = getFruitDataById(fruitId);
                return \`\${fruitData?.name || fruitId}: \${count}\`;
            });
        text += items.join(' | ') || 'Trống';
        this.inventoryText?.setText(text);
    }

    public updateSeedBagDisplay(playerSeedInventory: PlayerInventory): void {
        this.seedBagUIElements.forEach((elements: SeedBagElement, fruitId: string) => {
            const count = playerSeedInventory[fruitId] || 0;
            elements.text.setText(\`x\${count}\`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
            if (count > 0) {
                if (!elements.icon.input?.enabled) elements.icon.setInteractive({ useHandCursor: true });
            } else {
                if (elements.icon.input?.enabled) elements.icon.disableInteractive();
            }
        });
    }

    public updateWalletDisplay(rawAddress: string | null): void {
        if (!this.walletText || !this.connectWalletButton) return; // Đảm bảo UI đã sẵn sàng

        if (rawAddress) {
            try {
                const friendlyAddress = Address.parse(rawAddress).toString({ testOnly: false }); // << CHỈNH testOnly=true NẾU DÙNG TESTNET
                const shortAddress = \`\${friendlyAddress.substring(0, 6)}...\${friendlyAddress.substring(friendlyAddress.length - 4)}\`;
                this.walletText.setText(\`Ví: \${shortAddress}\`);
                this.connectWalletButton.setText('Ngắt kết nối');
            } catch (e) {
                console.error("Error parsing wallet address:", e);
                this.walletText.setText('Lỗi địa chỉ ví');
                this.connectWalletButton.setText('Kết nối Ví TON');
            }
        } else {
            this.walletText.setText('Chưa kết nối ví');
            this.connectWalletButton.setText('Kết nối Ví TON');
        }
    }

    public updatePurchaseButtons(): void {
        const isConnected = !!this.walletAddress;
        this.seedBagUIElements.forEach((elements: SeedBagElement) => {
            elements.buyButton?.setVisible(isConnected);
        });
    }

    public selectSeed(icon: Phaser.GameObjects.Image): void {
        this.selectedSeedHighlight?.setPosition(icon.x, icon.y).setVisible(true);
    }

    public deselectSeed(): void {
        this.selectedSeedHighlight?.setVisible(false);
    }

    public showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void): void {
        // Logic DOM dialog giữ nguyên
        const existingDialog = document.getElementById('game-confirmation-dialog');
         if (existingDialog) document.body.removeChild(existingDialog); // Xóa dialog cũ nếu còn sót

        const dialogOverlay = document.createElement('div');
         dialogOverlay.id = 'game-confirmation-dialog'; // Thêm ID để quản lý
        dialogOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.6);z-index:1000;display:flex;justify-content:center;align-items:center;padding:15px;';
        const dialogBox = document.createElement('div');
        dialogBox.style.cssText = 'background-color:#fff;padding:25px;border-radius:8px;z-index:1001;text-align:center;box-shadow: 0 4px 15px rgba(0,0,0,0.2);max-width: 400px;width: 100%;';
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.cssText = 'color:#333;margin-bottom:20px;font-size:16px;line-height:1.5;word-wrap:break-word;';
        dialogBox.appendChild(messageElement);
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '15px';
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Xác nhận';
        confirmButton.style.cssText = 'margin:5px 10px;background-color:#3498db;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;';
        confirmButton.onmouseover = () => confirmButton.style.backgroundColor = '#2980b9';
        confirmButton.onmouseout = () => confirmButton.style.backgroundColor = '#3498db';
        confirmButton.onclick = () => { onConfirm(); if (document.body.contains(dialogOverlay)) document.body.removeChild(dialogOverlay); };
        buttonContainer.appendChild(confirmButton);
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.cssText = 'margin:5px 10px;background-color:#aaa;color:#fff;border:none;padding:10px 18px;border-radius:5px;cursor:pointer;font-size:14px;transition: background-color 0.2s;'; // Màu nút Hủy
        cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#888';
        cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#aaa';
        cancelButton.onclick = () => { onCancel(); if (document.body.contains(dialogOverlay)) document.body.removeChild(dialogOverlay); };
        buttonContainer.appendChild(cancelButton);
        dialogBox.appendChild(buttonContainer);
        dialogOverlay.appendChild(dialogBox);
        document.body.appendChild(dialogOverlay);
    }

    public getTonConnectInstance(): TonConnectUI | null { return this.tonConnectUI; }
    public getCurrentWalletAddress(): string | null { return this.walletAddress; }

    public destroy(): void {
        this.inventoryText?.destroy();
        this.selectedSeedHighlight?.destroy();
        this.walletText?.destroy();
        this.connectWalletButton?.destroy();
        this.seedBagUIElements.forEach(element => {
            element.icon.destroy(); element.text.destroy(); element.buyButton?.destroy();
        });
        this.seedBagUIElements.clear();
        // Không tự động disconnect khi UI bị hủy, để người dùng quản lý
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
    public readonly tileX: number;
    public readonly tileY: number;

    private state: PlotState = 'empty';
    private fruitId: string | null = null;
    private growthTimer: number = 0; // seconds

    public gameObject: Phaser.GameObjects.Image;
    private timerTextObject: Phaser.GameObjects.Text;
    private stateTextObject: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, tileX: number, tileY: number, initialState?: StoredFarmPlotState) {
        this.scene = scene;
        this.tileX = tileX;
        this.tileY = tileY;

        const initialPlotX = tileX * config.TILE_SIZE + config.TILE_SIZE / 2;
        const initialPlotY = tileY * config.TILE_SIZE + config.TILE_SIZE / 2;

        if (initialState) {
            this.state = initialState.state;
            this.fruitId = initialState.fruitId;
            this.growthTimer = initialState.growthTimer;
        }

        this.gameObject = scene.add.image(initialPlotX, initialPlotY, this.getTextureKey())
            .setInteractive().setDisplaySize(config.PLOT_IMAGE_DISPLAY_SIZE, config.PLOT_IMAGE_DISPLAY_SIZE)
            .setData('plotKey', \`\${tileX}-\${tileY}\`).setData('isPlot', true).setDepth(0);

        this.timerTextObject = scene.add.text(initialPlotX, initialPlotY + config.TIMER_TEXT_OFFSET_Y, '', config.TIMER_TEXT_STYLE)
            .setOrigin(0.5).setVisible(this.state === 'growing' && this.growthTimer > 0).setDepth(1);

        this.stateTextObject = scene.add.text(initialPlotX, initialPlotY, '', config.STATE_TEXT_STYLE)
            .setOrigin(0.5).setVisible(this.state === 'empty' || this.state === 'ready').setDepth(1);

        this.updateVisual();
        // Final position set by updatePosition in FarmScene
    }

    public updatePosition(farmGridX: number, farmGridY: number): void {
        const plotX = farmGridX + this.tileX * config.TILE_SIZE + config.TILE_SIZE / 2;
        const plotY = farmGridY + this.tileY * config.TILE_SIZE + config.TILE_SIZE / 2;
        this.gameObject.setPosition(plotX, plotY);
        this.timerTextObject.setPosition(plotX, plotY + config.TIMER_TEXT_OFFSET_Y);
        this.stateTextObject.setPosition(plotX, plotY);
    }

    private getTextureKey(): string {
        const fruitData = this.fruitId ? getFruitDataById(this.fruitId) : undefined;
        switch (this.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    return (this.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                } return config.EMPTY_PLOT_KEY; // Fallback if no fruit data
            case 'ready': return fruitData?.spriteKeyReady || config.EMPTY_PLOT_KEY;
            case 'empty': default: return config.EMPTY_PLOT_KEY;
        }
    }

    private updateVisual(): void {
        this.gameObject.setTexture(this.getTextureKey());
        switch (this.state) {
            case 'empty':
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setText('Đất trống').setVisible(true); break;
            case 'growing':
                this.stateTextObject.setVisible(false);
                this.updateTimerText(); // Update timer text visibility and content
                break;
            case 'ready':
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setText('Thu hoạch').setVisible(true); break;
            default:
                this.timerTextObject.setVisible(false);
                this.stateTextObject.setVisible(false); break;
        }
    }

    private updateTimerText(): void {
         if (this.state === 'growing' && this.growthTimer > 0) {
            const remainingTime = Math.ceil(this.growthTimer);
            const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
            const seconds = (remainingTime % 60).toString().padStart(2, '0');
            this.timerTextObject.setText(\`\${minutes}:\${seconds}\`).setVisible(true);
        } else {
            this.timerTextObject.setVisible(false);
        }
    }


    public updateTimer(delta: number): boolean {
        if (this.state !== 'growing' || this.growthTimer <= 0) return false;

        this.growthTimer -= delta;
        let stateChanged = true; // Timer changed, needs saving
        let visualNeedsUpdate = false;

        const newTexture = this.getTextureKey();
        if (this.gameObject.texture.key !== newTexture) visualNeedsUpdate = true;

        if (this.growthTimer <= 0) {
            this.growthTimer = 0;
            this.state = 'ready';
            const fruitData = getFruitDataById(this.fruitId!);
            console.log(\`Fruit \${fruitData?.name} at (\${this.tileX}, \${this.tileY}) is ready!\`);
            visualNeedsUpdate = true; // Need full visual update on state change
        }

        if (visualNeedsUpdate) {
            this.updateVisual(); // Handles texture and text visibility/content
        } else {
            this.updateTimerText(); // Just update timer text content if visible
        }
        return stateChanged;
    }

    public plant(newFruitId: string): boolean {
        if (this.state === 'empty') {
            const fruitData = getFruitDataById(newFruitId);
            if (fruitData) {
                this.state = 'growing'; this.fruitId = newFruitId;
                this.growthTimer = fruitData.growthTimeSeconds;
                console.log(\`Planted \${fruitData.name} at (\${this.tileX}, \${this.tileY}).\`);
                this.updateVisual(); return true;
            }
        } return false;
    }

    public harvest(): { harvestedAmount: number; fruitId: string | null; seedReward: boolean } {
        if (this.state === 'ready' && this.fruitId) {
            const fruitData = getFruitDataById(this.fruitId);
            if (fruitData) {
                const harvestedAmount = fruitData.harvestYield;
                const harvestedFruitId = this.fruitId;
                console.log(\`Harvested \${harvestedAmount} \${fruitData.name} from (\${this.tileX}, \${this.tileY}).\`);
                this.state = 'empty'; this.fruitId = null; this.growthTimer = 0;
                this.updateVisual();
                const seedReward = Math.random() < 0.25;
                if (seedReward) console.log(\`Bonus! Received 1 \${fruitData.name} seed.\`);
                return { harvestedAmount, fruitId: harvestedFruitId, seedReward };
            }
        } return { harvestedAmount: 0, fruitId: null, seedReward: false };
    }

    public destroy(): void {
        this.gameObject.destroy();
        this.timerTextObject.destroy();
        this.stateTextObject.destroy();
    }

    // Getters
    public getState(): PlotState { return this.state; }
    public getFruitId(): string | null { return this.fruitId; }
    public getGrowthTimer(): number { return this.growthTimer; }
}
        `
    },
    // --- Scenes ---
    {
        filePath: 'scenes/FarmScene.ts',
        content: `
// ${targetDirectory}/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import * as config from '../config/gameConfig';
import * as storage from '../services/storageService';
import { PlayerInventory, StoredFarmPlotState } from '../interfaces/fruit.interface';
import { UIManager } from '../ui/UIManager';
import { FarmPlotGO } from '../gameObjects/FarmPlotGO';
import { Address, toNano, Cell, beginCell } from 'ton-core';
import { SendTransactionRequest, TonConnectUI } from '@tonconnect/ui'; // Correct import

export class FarmScene extends Phaser.Scene {
    private farmPlots: Map<string, FarmPlotGO> = new Map();
    private playerInventory: PlayerInventory = {};
    private playerSeedInventory: PlayerInventory = {};
    private selectedSeedId: string | null = null;
    private uiManager!: UIManager;
    private farmGridX: number = 0;
    private farmGridY: number = 100;

    // !!! THAY THẾ BẰNG ĐỊA CHỈ VÍ TON CỦA BẠN (MAINNET HOẶC TESTNET) !!!
    private readonly GAME_TREASURY_ADDRESS = 'UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD'; // <<< THAY ĐỊA CHỈ VÍ CỦA BẠN

    constructor() { super('FarmScene'); }

    preload(): void {
        console.log('FarmScene preload: Loading images...');
        const assetsPath = '../assets'; // Giả định assets/ ngang cấp với targetDirectory
        this.load.image(config.EMPTY_PLOT_KEY, \`\${assetsPath}/\${config.EMPTY_PLOT_KEY}.png\`);
        ALL_FRUITS.forEach(fruit => {
            if (fruit.spriteKeySeed) this.load.image(fruit.spriteKeySeed, \`\${assetsPath}/\${fruit.spriteKeySeed}.jpg\`);
            if (fruit.spriteKeyGrowing) this.load.image(fruit.spriteKeyGrowing, \`\${assetsPath}/\${fruit.spriteKeyGrowing}.jpg\`);
            if (fruit.spriteKeyReady) this.load.image(fruit.spriteKeyReady, \`\${assetsPath}/\${fruit.spriteKeyReady}.jpg\`);
        });
    }

    async create(): Promise<void> {
        console.log('FarmScene create');
        this.calculateLayout();
        this.loadState();

        this.uiManager = new UIManager(this);
        await this.uiManager.initializeTonConnect(); // Đợi khởi tạo xong
        this.uiManager.createAllUI(this.playerInventory, this.playerSeedInventory);

        this.createFarmGrid();

        this.input.on(Phaser.Input.Events.GAMEOBJECT_DOWN, this.onGameObjectDown, this);
        this.time.addEvent({ delay: 1000, callback: this.updateGrowthTimers, callbackScope: this, loop: true });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
        // this.scale.on(Phaser.Scale.Events.RESIZE, this.handleResize, this);
    }

    private calculateLayout(): void {
        const screenWidth = this.cameras.main.width;
        const farmGridWidth = config.FARM_COLS * config.TILE_SIZE;
        this.farmGridX = (screenWidth - farmGridWidth) / 2;
        if (this.farmGridX < config.UI_PADDING) this.farmGridX = config.UI_PADDING;
        this.farmGridY = 100;
    }

    private loadState(): void {
        console.log("Loading state...");
        this.playerInventory = storage.loadInventory(config.INVENTORY_STORAGE_KEY, storage.initializeHarvestInventory);
        this.playerSeedInventory = storage.loadInventory(config.SEED_INVENTORY_STORAGE_KEY, storage.initializeSeedInventory);
    }

    private saveState(): void {
        storage.savePlotState(this.farmPlots);
        storage.saveInventory(config.INVENTORY_STORAGE_KEY, this.playerInventory);
        storage.saveInventory(config.SEED_INVENTORY_STORAGE_KEY, this.playerSeedInventory);
    }

    private createFarmGrid(): void {
        console.log("Creating farm grid...");
        const savedPlotStates = storage.loadPlotState();
        this.farmPlots.forEach(plot => plot.destroy());
        this.farmPlots.clear();
        for (let y = 0; y < config.FARM_ROWS; y++) {
            for (let x = 0; x < config.FARM_COLS; x++) {
                const plotKey = \`\${x}-\${y}\`;
                const initialState = savedPlotStates.get(plotKey);
                const plotGO = new FarmPlotGO(this, x, y, initialState);
                plotGO.updatePosition(this.farmGridX, this.farmGridY);
                this.farmPlots.set(plotKey, plotGO);
            }
        }
    }

    private onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject): void {
        const isPlot = gameObject.getData('isPlot') === true;
        const isSeedIcon = gameObject.getData('isSeedIcon') === true;
        const isResetButton = gameObject.getData('resetButton') === true;
        const isConnectButton = gameObject.getData('connectWalletButton') === true;
        const buySeedId = gameObject.getData('buySeedButton') as string | undefined;
        const seedPrice = gameObject.getData('seedPrice') as number | undefined;

        if (isResetButton) this.handleResetButtonClick();
        else if (isConnectButton) { /* Handled by UIManager */ }
        else if (isSeedIcon && gameObject instanceof Phaser.GameObjects.Image) this.handleSeedSelection(gameObject.getData('seedId'), gameObject);
        else if (isPlot) this.handlePlotClick(gameObject.getData('plotKey'));
        else if (buySeedId && seedPrice !== undefined) this.handleBuySeedClick(buySeedId, seedPrice);
        else if (gameObject.getData('isUiElement') !== true) this.deselectSeed();
    }

     private handlePlotClick(plotKey: string): void {
         const plot = this.farmPlots.get(plotKey);
         if (!plot) return;
         const plotState = plot.getState();
         console.log(\`Clicked plot (\${plot.tileX}, \${plot.tileY}), state: \${plotState}\`);

         if (plotState === 'empty' && this.selectedSeedId) this.handlePlanting(plot);
         else if (plotState === 'growing') this.deselectSeed();
         else if (plotState === 'ready') { this.handleHarvesting(plot); this.deselectSeed(); }
         else this.deselectSeed();
    }

    private handleSeedSelection(seedId: string | undefined, icon: Phaser.GameObjects.Image): void {
         if (!seedId) return;
         if ((this.playerSeedInventory[seedId] ?? 0) > 0) {
            if (this.selectedSeedId !== seedId) {
                const fruitName = getFruitDataById(seedId)?.name || seedId;
                console.log(\`Selected seed: \${fruitName}\`);
                this.selectedSeedId = seedId;
                this.uiManager.selectSeed(icon);
            } else { this.deselectSeed(); }
        } else {
             const fruitName = getFruitDataById(seedId)?.name || seedId;
             console.log(\`Hết hạt \${fruitName}!\`);
             this.deselectSeed();
        }
    }

    private deselectSeed(): void {
        if (this.selectedSeedId) {
            console.log("Deselected seed");
            this.selectedSeedId = null;
            this.uiManager.deselectSeed();
        }
    }

    private handlePlanting(plot: FarmPlotGO): void {
        if (!this.selectedSeedId) return;
        if ((this.playerSeedInventory[this.selectedSeedId] ?? 0) > 0) {
            if (plot.plant(this.selectedSeedId)) {
                this.playerSeedInventory[this.selectedSeedId]--;
                this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
                this.saveState(); this.deselectSeed();
            }
        } else {
            console.error("Attempted to plant seed with count 0!"); this.deselectSeed();
            this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
        }
    }

    private handleHarvesting(plot: FarmPlotGO): void {
        const { harvestedAmount, fruitId, seedReward } = plot.harvest();
        if (harvestedAmount > 0 && fruitId) {
            this.playerInventory[fruitId] = (this.playerInventory[fruitId] || 0) + harvestedAmount;
            this.uiManager.updateInventoryDisplay(this.playerInventory);
            if (seedReward) {
                this.playerSeedInventory[fruitId] = (this.playerSeedInventory[fruitId] || 0) + 1;
                this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
            }
            this.saveState();
        }
    }

    private async handleBuySeedClick(seedId: string, priceTON: number): Promise<void> {
        const tc = this.uiManager.getTonConnectInstance();
        const walletAddress = this.uiManager.getCurrentWalletAddress(); // Raw address

        if (!tc || !walletAddress) {
            this.uiManager.showConfirmationDialog("Vui lòng kết nối ví TON để mua.", ()=>{}, ()=>{});
            return;
        }
        try { Address.parse(this.GAME_TREASURY_ADDRESS); } catch (e) {
             console.error("Lỗi: Địa chỉ ví game (GAME_TREASURY_ADDRESS) không hợp lệ!", this.GAME_TREASURY_ADDRESS);
             this.uiManager.showConfirmationDialog("Lỗi cấu hình game. Không thể mua.", ()=>{}, ()=>{}); return;
        }

        const amountNano = toNano(priceTON);
        const fruitData = getFruitDataById(seedId);
        const fruitName = fruitData?.name || seedId;

        console.log(\`Attempting to buy \${fruitName} for \${priceTON} TON\`);
        this.uiManager.showConfirmationDialog(\`Xác nhận mua hạt \${fruitName} (\${priceTON} TON)?\`, async () => {
            const body = beginCell().storeUint(0, 32).storeStringTail(\`Buy \${seedId}\`).endCell();
            const transaction: SendTransactionRequest = {
                validUntil: Math.floor(Date.now() / 1000) + 300, // 5 mins
                messages: [{
                    address: this.GAME_TREASURY_ADDRESS,
                    amount: amountNano.toString(),
                    payload: body.toBoc({ idx: false }).toString("base64") // Use idx: false for standard BOC
                }]
            };

            try {
                console.log("Sending transaction request...");
                const result = await tc.sendTransaction(transaction);
                console.log('Transaction sent! BOC:', result.boc);

                // !!!!! CẢNH BÁO AN TOÀN !!!!!
                // Cần cơ chế xác nhận giao dịch đáng tin cậy thay vì giả định thành công.
                // Ví dụ: Theo dõi backend, indexer, hoặc sự kiện từ Smart Contract.
                this.uiManager.showConfirmationDialog(
                     \`Giao dịch mua \${fruitName} đã gửi. Vui lòng chờ xác nhận trên mạng TON. Hạt giống sẽ được cộng sau.\`,
                     ()=>{}, ()=>{}
                 );

                 // ---------> PHẦN GIẢ ĐỊNH (CHỈ DEMO) <---------
                 setTimeout(() => {
                     console.warn(\`(DEMO ONLY - ASSUMPTION) Transaction confirmed for \${seedId}. Adding seed.\`);
                     this.playerSeedInventory[seedId] = (this.playerSeedInventory[seedId] || 0) + 1;
                     this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
                     this.saveState();
                     this.uiManager.showConfirmationDialog(\`Đã nhận được hạt giống \${fruitName}!\`, ()=>{}, ()=>{});
                 }, 20000); // Chờ 20s (ví dụ)
                 // ---------> KẾT THÚC PHẦN GIẢ ĐỊNH <---------

            } catch (error: unknown) { // Use unknown for type safety
                console.error('Transaction failed:', error);
                 let message = 'Giao dịch mua hạt giống thất bại.';
                 if (error instanceof Error) { message += \` \${error.message}\`; }
                 // Check for specific TON Connect error structures if needed
                this.uiManager.showConfirmationDialog(message, ()=>{}, ()=>{});
            }
        }, () => { console.log("Purchase cancelled."); });
    }


    private updateGrowthTimers(): void {
        let stateNeedsSaving = false;
        this.farmPlots.forEach(plot => {
            if (plot.updateTimer(1)) stateNeedsSaving = true;
        });
        if (stateNeedsSaving) this.saveState();
    }

    private handleResetButtonClick(): void {
        this.uiManager.showConfirmationDialog(
            "Reset toàn bộ dữ liệu game? Hành động này không thể hoàn tác.",
            () => { storage.resetGameData(); this.scene.restart(); },
            () => { console.log("Reset cancelled."); }
        );
    }

    // private handleResize(gameSize: Phaser.Structs.Size): void { /* ... Implement if needed ... */ }

    shutdown(): void {
        console.log("FarmScene shutdown");
        this.farmPlots.forEach(plot => plot.destroy());
        this.farmPlots.clear();
        this.uiManager?.destroy();
        this.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
        this.input.off(Phaser.Input.Events.GAMEOBJECT_DOWN, this.onGameObjectDown, this);
        // this.scale.off(Phaser.Scale.Events.RESIZE, this.handleResize, this);
        // Consider disconnecting wallet on shutdown?
        // this.uiManager?.getTonConnectInstance()?.disconnect();
    }
}
        `
    },
    // --- Game Entry Point ---
    {
        filePath: 'game.ts', // File này nằm trong targetDirectory
        content: `
// ${targetDirectory}/game.ts
import Phaser from 'phaser';
import { FarmScene } from './scenes/FarmScene'; // Import từ thư mục con

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [FarmScene]
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (TypeScript Modular + TON Connect)');
        `
    }
];

// --- Hàm tạo file và thư mục ---
function createFiles() {
    console.log(`Starting to create TypeScript project files in directory: "${targetDirectory}"...`);

    try {
         if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
            console.log(`Created base directory: ${targetDirectory}`);
        }
    } catch(err) {
        console.error(`Error creating base directory ${targetDirectory}:`, err);
        return;
    }

    fileStructure.forEach(fileInfo => {
        const fullPath = path.resolve(path.join(targetDirectory, fileInfo.filePath));
        const dirName = path.dirname(fullPath);
        try {
            fs.mkdirSync(dirName, { recursive: true });
            fs.writeFileSync(fullPath, fileInfo.content.trim());
            console.log(`Created file: ${fullPath}`);
        } catch (err) {
            console.error(`Error creating file/directory ${fullPath}:`, err);
        }
    });

    console.log(`\nFinished creating TypeScript project files in "${targetDirectory}".`);
    console.log("\n==================== IMPORTANT NEXT STEPS ====================");
    console.log(`1. Navigate into the project: cd ${targetDirectory}`);
    console.log("2. Initialize npm/yarn: npm init -y  OR  yarn init -y");
    console.log("3. Install dependencies: npm install phaser @tonconnect/ui @tonconnect/sdk ton ton-core ton-crypto buffer typescript");
    console.log("   OR: yarn add phaser @tonconnect/ui @tonconnect/sdk ton ton-core ton-crypto buffer typescript");
    console.log("4. Create and configure tsconfig.json (set 'target', 'module', 'moduleResolution', 'outDir', 'rootDir', etc.)");
    console.log("5. Set up a build tool (Vite, Webpack, Parcel recommended) or use 'tsc' directly.");
    console.log("6. Create an index.html file in your project root (outside the target directory).");
    console.log("7. Create the 'assets' directory (sibling to your target directory) and add game images.");
    console.log("8. Create your tonconnect-manifest.json, host it publicly, and update the URL in ui/UIManager.ts.");
    console.log("9. IMPORTANT: Replace the placeholder GAME_TREASURY_ADDRESS in scenes/FarmScene.ts with your actual TON wallet address.");
    console.log("10. WARNING: The transaction confirmation logic in FarmScene.ts is for DEMO ONLY. Implement a secure backend/indexer/contract solution for production.");
    console.log("==============================================================");
}

// --- Chạy hàm tạo file ---
createFiles();