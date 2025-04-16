// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
// *** CẬP NHẬT INTERFACE ĐỂ CÓ THỂ CHỨA TIMER TEXT ***
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

// Thêm timerTextObject vào interface (nếu bạn có file interface riêng)
// Hoặc chúng ta sẽ thêm trực tiếp vào đối tượng plotState trong code
/*
export interface FarmPlot extends StoredFarmPlotState {
    gameObject: Phaser.GameObjects.Image | null;
    timerTextObject?: Phaser.GameObjects.Text | null; // Thêm dòng này
}
*/

const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2';
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';
const SEED_INVENTORY_STORAGE_KEY = 'phaserFarmGame_seedInventory_v1';

const TILE_SIZE = 64;
const FARM_COLS = 5;
const FARM_ROWS = 5;
const FARM_GRID_X = 100;
const FARM_GRID_Y = 100;
const EMPTY_PLOT_KEY = 'empty_plot';
const PLOT_IMAGE_DISPLAY_SIZE = TILE_SIZE - 4;

const SEED_BAG_X = FARM_GRID_X + FARM_COLS * TILE_SIZE + 30;
const SEED_BAG_Y = FARM_GRID_Y;
const SEED_ICON_SIZE = 50;
const SEED_SPACING = 10;
const SEED_COUNT_TEXT_OFFSET_Y = 30;

// *** STYLE CHO TIMER TEXT ***
const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.6)', // Nền hơi đen để dễ đọc
    padding: { x: 3, y: 1 }
};
const TIMER_TEXT_OFFSET_Y = - (TILE_SIZE / 2) + 5; // Vị trí Y so với tâm ô đất (phía trên)

export class FarmScene extends Phaser.Scene {
    // *** Đảm bảo FarmPlot có thể chứa timerTextObject ***
    private farmPlots: Map<string, FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }> = new Map();
    private playerInventory: PlayerInventory = {};
    private playerSeedInventory: PlayerInventory = {};
    private inventoryText!: Phaser.GameObjects.Text;
    private selectedSeedId: string | null = null;
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;
    private seedBagUIElements: Map<string, {
        icon: Phaser.GameObjects.Image,
        text: Phaser.GameObjects.Text
    }> = new Map();


    constructor() {
        super('FarmScene');
    }

    preload() {
        // ... (preload không thay đổi)
        console.log('FarmScene preload: Loading images...');
        this.load.image(EMPTY_PLOT_KEY, `assets/${EMPTY_PLOT_KEY}.png`);
        ALL_FRUITS.forEach(fruit => {
            this.load.image(fruit.spriteKeySeed, `assets/${fruit.spriteKeySeed}.jpg`);
            this.load.image(fruit.spriteKeyGrowing, `assets/${fruit.spriteKeyGrowing}.jpg`);
            this.load.image(fruit.spriteKeyReady, `assets/${fruit.spriteKeyReady}.jpg`);
            console.log(`  Loading assets for ${fruit.name}`);
        });
        console.log('Image loading scheduled.');
    }

    create() {
        // ... (create không thay đổi nhiều)
        console.log('FarmScene create');
        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI(); // Sẽ tạo cả text timer
        this.createUIElements();
        this.updateInventoryDisplay();
        this.updateSeedBagDisplay();

        this.input.on('gameobjectdown', this.onGameObjectDown, this);
        this.time.addEvent({
            delay: 1000, callback: this.updateGrowthTimers,
            callbackScope: this, loop: true
        });

        this.selectedSeedHighlight = this.add.rectangle(0, 0, SEED_ICON_SIZE + 4, SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff)
            .setVisible(false)
            .setDepth(1);
    }

    loadStateFromLocalStorage() {
        // ... (loadState không thay đổi)
        console.log("Attempting to load state from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);
        const savedSeedInventoryJson = localStorage.getItem(SEED_INVENTORY_STORAGE_KEY);

        if (savedInventoryJson) {
            try { this.playerInventory = JSON.parse(savedInventoryJson); console.log("Loaded harvested inventory:", this.playerInventory); }
            catch (e) { console.error("Error parsing harvested inventory:", e); this.initializeHarvastInventory(); }
        } else { console.log("No harvested inventory found, initializing..."); this.initializeHarvastInventory(); }

        if (savedSeedInventoryJson) {
            try { this.playerSeedInventory = JSON.parse(savedSeedInventoryJson); console.log("Loaded seed inventory:", this.playerSeedInventory); }
            catch (e) { console.error("Error parsing seed inventory:", e); this.initializeSeedInventory(); }
        } else { console.log("No seed inventory found, initializing..."); this.initializeSeedInventory(); }


        if (savedPlotsJson) {
            try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                // Reset map trước khi load
                this.farmPlots.clear();
                savedPlotDataArray.forEach(([key, storedState]) => {
                     // Khi load, gameObject và timerTextObject sẽ là null ban đầu
                     this.farmPlots.set(key, { ...storedState, gameObject: null, timerTextObject: null });
                });
                console.log(`Loaded ${this.farmPlots.size} plot states.`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
    }

    saveStateToLocalStorage() {
        // ... (saveState không thay đổi)
        try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                // Chỉ lưu các thuộc tính cơ bản, không lưu gameObject hay timerTextObject
                const storedState: StoredFarmPlotState = {
                    tileX: plot.tileX, tileY: plot.tileY, state: plot.state,
                    fruitId: plot.fruitId, growthTimer: plot.growthTimer,
                }; return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));
            localStorage.setItem(SEED_INVENTORY_STORAGE_KEY, JSON.stringify(this.playerSeedInventory));
        } catch (e) { console.error("Error saving state:", e); }
    }

    initializeHarvastInventory() { /*...*/ this.playerInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; }); }
    initializeSeedInventory() { /*...*/ this.playerSeedInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerSeedInventory[fruit.id] = 5; }); console.log("Initialized seed inventory:", this.playerSeedInventory); }


    createFarmGridAndUI() {
        console.log("Creating farm grid visuals and timers...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                const plotX = FARM_GRID_X + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = FARM_GRID_Y + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = `${x}-${y}`;

                let plotState = this.farmPlots.get(plotKey);
                if (!plotState) {
                    // Tạo plot state mới nếu chưa có (khi load lần đầu hoặc không có save)
                    plotState = {
                         tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0,
                         gameObject: null, timerTextObject: null // Khởi tạo là null
                    };
                    this.farmPlots.set(plotKey, plotState);
                }

                // Tạo ảnh cho ô đất
                const plotImage = this.add.image(plotX, plotY, EMPTY_PLOT_KEY)
                    .setInteractive()
                    .setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE)
                    .setData('plotKey', plotKey)
                    .setData('isPlot', true)
                    .setDepth(0); // Ảnh ở dưới

                // *** TẠO TEXT HIỂN THỊ THỜI GIAN ***
                const timerText = this.add.text(
                    plotX,
                    plotY + TIMER_TEXT_OFFSET_Y, // Đặt phía trên ảnh
                    '', // Nội dung ban đầu rỗng
                    TIMER_TEXT_STYLE
                )
                .setOrigin(0.5) // Canh giữa text
                .setVisible(false) // Ban đầu ẩn đi
                .setDepth(1); // Text nằm trên ảnh

                // Lưu tham chiếu vào plotState
                plotState.gameObject = plotImage;
                plotState.timerTextObject = timerText; // *** LƯU TEXT OBJECT ***

                this.updatePlotVisual(plotState); // Cập nhật hình ảnh và timer text ban đầu
            }
        }
        console.log(`Farm grid visuals created/updated for ${this.farmPlots.size} plots.`);
    }

    createUIElements() { /*...*/
        this.add.text(10, 10, 'Nông Trại Ngũ Hành (Ảnh)', { fontSize: '24px', color: '#ffffff' });
        this.inventoryText = this.add.text(10, 40, 'Kho: ', { fontSize: '16px', color: '#ffffff', wordWrap: { width: this.cameras.main.width - 20 } });

        this.add.text(SEED_BAG_X, SEED_BAG_Y - 25, 'Túi Hạt Giống:', { fontSize: '18px', color: '#ffffff' });
        this.seedBagUIElements.clear();

        ALL_FRUITS.forEach((fruit, index) => {
            const iconX = SEED_BAG_X + (SEED_ICON_SIZE + SEED_SPACING) * index + SEED_ICON_SIZE / 2;
            const iconY = SEED_BAG_Y + SEED_ICON_SIZE / 2;
            const seedIcon = this.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive()
                .setDisplaySize(SEED_ICON_SIZE, SEED_ICON_SIZE)
                .setData('seedId', fruit.id)
                .setData('isSeedIcon', true);
            const countText = this.add.text(iconX, iconY + SEED_COUNT_TEXT_OFFSET_Y, `x${this.playerSeedInventory[fruit.id] || 0}`, {
                fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 }
            }).setOrigin(0.5);
            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    updateInventoryDisplay() { /*...*/
        let text = 'Kho nông sản: ';
        let items = [];
        for (const fruitId in this.playerInventory) {
            if (this.playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(`${fruitData?.name || fruitId}: ${this.playerInventory[fruitId]}`);
            }
        }
        text += items.join(' | ') || 'Trống';
        if (this.inventoryText) { this.inventoryText.setText(text); }
    }

    updateSeedBagDisplay() { /*...*/
        this.seedBagUIElements.forEach((elements, fruitId) => {
            const count = this.playerSeedInventory[fruitId] || 0;
            elements.text.setText(`x${count}`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
        });
    }


    // *** CẬP NHẬT VISUAL BAO GỒM CẢ TIMER TEXT ***
    updatePlotVisual(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) {
        if (!plotState.gameObject) return; // Cần kiểm tra cả gameObject

        let textureKey = EMPTY_PLOT_KEY;
        let isGrowing = false; // Cờ để xác định có hiển thị timer không
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;

        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    textureKey = (plotState.growthTimer > halfway)
                        ? fruitData.spriteKeySeed
                        : fruitData.spriteKeyGrowing;
                    isGrowing = true; // Đang lớn -> cần hiện timer
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || EMPTY_PLOT_KEY;
                break;
            case 'empty':
            default:
                textureKey = EMPTY_PLOT_KEY;
                break;
        }

        // Cập nhật ảnh
        plotState.gameObject.setTexture(textureKey);
        plotState.gameObject.setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE);

        // *** CẬP NHẬT TIMER TEXT ***
        if (plotState.timerTextObject) { // Kiểm tra text object có tồn tại không
            if (isGrowing && plotState.growthTimer > 0) {
                const remainingTime = Math.ceil(plotState.growthTimer);
                // Format thời gian (ví dụ: MM:SS) - bạn có thể đổi thành chỉ giây nếu muốn
                const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                const seconds = (remainingTime % 60).toString().padStart(2, '0');
                plotState.timerTextObject.setText(`${minutes}:${seconds}`);
                // plotState.timerTextObject.setText(`${remainingTime}s`); // Chỉ hiển thị giây
                plotState.timerTextObject.setVisible(true);
            } else {
                plotState.timerTextObject.setVisible(false); // Ẩn timer nếu không phải growing hoặc timer <= 0
            }
        } else {
             // Thêm log nếu timerTextObject không tồn tại khi cần
             if (isGrowing) console.warn(`Timer text object missing for plot ${plotState.tileX}-${plotState.tileY}`);
        }
    }

    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) { /*...*/
        const isPlot = gameObject.getData('isPlot') === true;
        const isSeedIcon = gameObject.getData('isSeedIcon') === true;

        if (isSeedIcon) {
            const seedId = gameObject.getData('seedId');
            this.handleSeedSelection(seedId, gameObject as Phaser.GameObjects.Image);
        } else if (isPlot) {
            const plotKey = gameObject.getData('plotKey');
            const plotState = this.farmPlots.get(plotKey);
            if (!plotState) return;
            console.log(`Clicked plot (${plotState.tileX}, ${plotState.tileY}), state: ${plotState.state}`);
            if (plotState.state === 'empty' && this.selectedSeedId) {
                this.handlePlantingWithSelection(plotState);
            } else if (plotState.state === 'growing') {
                 const fruitName = plotState.fruitId ? getFruitDataById(plotState.fruitId)?.name : 'Không rõ';
                 console.log(`Đang trồng ${fruitName}. Còn lại: ${Math.ceil(plotState.growthTimer)}s`);
                 this.deselectSeed();
            } else if (plotState.state === 'ready') {
                this.handleHarvesting(plotState);
                 this.deselectSeed();
            } else {
                 this.deselectSeed();
                 console.log("Ô đất trống. Chọn một hạt giống từ túi để trồng.");
            }
        } else {
             this.deselectSeed();
        }
    }

    handleSeedSelection(seedId: string, icon: Phaser.GameObjects.Image) { /*...*/
        if (this.playerSeedInventory[seedId] > 0) {
            console.log(`Selected seed: ${getFruitDataById(seedId)?.name || seedId}`);
            this.selectedSeedId = seedId;
            if (this.selectedSeedHighlight) {
                this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true);
            }
        } else {
            console.log(`Out of ${getFruitDataById(seedId)?.name || seedId} seeds!`);
            this.deselectSeed();
        }
     }
    deselectSeed() { /*...*/
        if (this.selectedSeedId) { console.log("Deselected seed"); this.selectedSeedId = null; }
        if (this.selectedSeedHighlight) { this.selectedSeedHighlight.setVisible(false); }
     }

    handlePlantingWithSelection(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) { /*...*/
        if (!this.selectedSeedId) { /*...*/ return; }
        const selectedFruit = getFruitDataById(this.selectedSeedId);
        if (!selectedFruit) { /*...*/ this.deselectSeed(); return; }

        if (this.playerSeedInventory[this.selectedSeedId] > 0) {
            this.playerSeedInventory[this.selectedSeedId]--;
            plotState.state = 'growing';
            plotState.fruitId = selectedFruit.id;
            plotState.growthTimer = selectedFruit.growthTimeSeconds;
            // *** updatePlotVisual SẼ HIỂN THỊ TIMER BAN ĐẦU ***
            this.updatePlotVisual(plotState);
            console.log(`Planted ${selectedFruit.name} at (${plotState.tileX}, ${plotState.tileY}). Seeds left: ${this.playerSeedInventory[this.selectedSeedId]}`);
            this.updateSeedBagDisplay();
            this.deselectSeed();
            this.saveStateToLocalStorage();
        } else { /*...*/ this.deselectSeed(); this.updateSeedBagDisplay(); }
    }


    handleHarvesting(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) { /*...*/
        if (!plotState.fruitId) return;
        const fruitData = getFruitDataById(plotState.fruitId);
        if (!fruitData) return;
        const addedAmount = fruitData.harvestYield;
        this.playerInventory[fruitData.id] = (this.playerInventory[fruitData.id] || 0) + addedAmount;
        const seedRewardChance = 0.25;
        if (Math.random() < seedRewardChance) {
             this.playerSeedInventory[fruitData.id] = (this.playerSeedInventory[fruitData.id] || 0) + 1;
             console.log(`Bonus! Received 1 ${fruitData.name} seed.`);
             this.updateSeedBagDisplay();
        }
        plotState.state = 'empty';
        plotState.fruitId = null;
        plotState.growthTimer = 0;
        // *** updatePlotVisual SẼ ẨN TIMER ĐI ***
        this.updatePlotVisual(plotState);
        console.log(`Harvested ${addedAmount} ${fruitData.name} from (${plotState.tileX}, ${plotState.tileY}).`);
        this.updateInventoryDisplay();
        this.saveStateToLocalStorage();
    }

    // *** CẬP NHẬT TIMER TEXT MỖI GIÂY ***
    updateGrowthTimers() {
        let stateChanged = false;

        this.farmPlots.forEach(plot => {
            // Ép kiểu để truy cập timerTextObject
            const currentPlot = plot as FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null };

            if (currentPlot.state === 'growing' && currentPlot.fruitId) {
                if (currentPlot.growthTimer > 0) {
                    currentPlot.growthTimer -= 1;
                    stateChanged = true;
                    const fruitData = getFruitDataById(currentPlot.fruitId);
                    if (!fruitData) return;

                    // *** CẬP NHẬT TEXT CỦA TIMER ***
                    if (currentPlot.timerTextObject) {
                         const remainingTime = Math.ceil(currentPlot.growthTimer);
                         if (remainingTime > 0) {
                             const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                             const seconds = (remainingTime % 60).toString().padStart(2, '0');
                             currentPlot.timerTextObject.setText(`${minutes}:${seconds}`);
                             // currentPlot.timerTextObject.setText(`${remainingTime}s`); // Chỉ giây
                         } else {
                              // Timer về 0 -> cây chuẩn bị ready, ẩn text trước khi updateVisual
                              currentPlot.timerTextObject.setVisible(false);
                         }
                    }

                    // Kiểm tra xem có cần đổi ảnh seed -> growing không
                    const halfway = fruitData.growthTimeSeconds / 2;
                    const expectedKey = (currentPlot.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                    let visualNeedsUpdate = false;
                    if (currentPlot.gameObject?.texture.key !== expectedKey) {
                        visualNeedsUpdate = true;
                    }

                    // Kiểm tra cây chín
                    if (currentPlot.growthTimer <= 0) {
                        currentPlot.state = 'ready';
                        visualNeedsUpdate = true; // Cần update sang ảnh ready (và ẩn timer)
                        console.log(`Fruit ${fruitData.name} at (${currentPlot.tileX}, ${currentPlot.tileY}) is ready!`);
                    }

                    // Gọi updatePlotVisual nếu cần đổi ảnh (hoặc khi cây chín)
                    if (visualNeedsUpdate) {
                        this.updatePlotVisual(currentPlot);
                    }
                }
            }
        });

        if (stateChanged) {
            this.saveStateToLocalStorage();
        }
    }
}