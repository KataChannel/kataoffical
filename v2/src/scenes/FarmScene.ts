// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
// *** CẬP NHẬT INTERFACE ĐỂ CÓ THỂ CHỨA CẢ STATE TEXT ***
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

// Thêm stateTextObject vào interface (nếu bạn có file interface riêng)
/*
export interface FarmPlot extends StoredFarmPlotState {
    gameObject: Phaser.GameObjects.Image | null;
    timerTextObject?: Phaser.GameObjects.Text | null;
    stateTextObject?: Phaser.GameObjects.Text | null; // Thêm dòng này
}
*/


const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2';
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';
const SEED_INVENTORY_STORAGE_KEY = 'phaserFarmGame_seedInventory_v1';

const TILE_SIZE = 100; // Kích thước ô đất logic
const FARM_COLS = 5;
const FARM_ROWS = 5;
const EMPTY_PLOT_KEY = 'empty_plot';
const PLOT_IMAGE_DISPLAY_SIZE = TILE_SIZE - 4;

const UI_PADDING = 15;
const SEED_ICON_SIZE = 50;
const SEED_SPACING_VERTICAL = 15;
const SEED_COUNT_TEXT_OFFSET_Y = 30;

const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: { x: 3, y: 1 }
};
const TIMER_TEXT_OFFSET_Y = - (TILE_SIZE / 2) + 15; // Đẩy timer lên cao hơn một chút

// *** STYLE CHO TEXT TRẠNG THÁI (Đất trống, Thu hoạch) ***
const STATE_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px', // To hơn timer một chút
    color: '#000000', // Màu đen
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Nền trắng mờ
    padding: { x: 5, y: 2 },
    fontStyle: 'bold'
};

const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#3498db',
    padding: { x: 12, y: 6 },
};


export class FarmScene extends Phaser.Scene {
    // *** Đảm bảo FarmPlot có thể chứa cả hai loại text ***
    private farmPlots: Map<string, FarmPlot & {
        timerTextObject?: Phaser.GameObjects.Text | null,
        stateTextObject?: Phaser.GameObjects.Text | null
    }> = new Map();
    private playerInventory: PlayerInventory = {};
    private playerSeedInventory: PlayerInventory = {};
    private inventoryText!: Phaser.GameObjects.Text;
    private selectedSeedId: string | null = null;
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null;
    private seedBagUIElements: Map<string, {
        icon: Phaser.GameObjects.Image,
        text: Phaser.GameObjects.Text
    }> = new Map();
    private farmGridX: number = 0;
    private farmGridY: number = 100;


    constructor() {
        super('FarmScene');
    }

    preload() {
        // ... (preload không đổi)
        console.log('FarmScene preload: Loading images...');
        this.load.image(EMPTY_PLOT_KEY, `assets/${EMPTY_PLOT_KEY}.png`); // Đảm bảo file ảnh đất trống tồn tại
        ALL_FRUITS.forEach(fruit => {
            this.load.image(fruit.spriteKeySeed, `assets/${fruit.spriteKeySeed}.jpg`);
            this.load.image(fruit.spriteKeyGrowing, `assets/${fruit.spriteKeyGrowing}.jpg`);
            this.load.image(fruit.spriteKeyReady, `assets/${fruit.spriteKeyReady}.jpg`);
            console.log(`  Loading assets for ${fruit.name}`);
        });
        console.log('Image loading scheduled.');
    }

    create() {
        // ... (create không đổi)
        console.log('FarmScene create');
        this.calculateLayout();
        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI(); // Sẽ tạo cả text timer và text state
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
            .setDepth(2); // Đặt depth cao hơn text một chút
    }

    calculateLayout() { /* ... (không đổi) ... */
        const screenWidth = this.cameras.main.width;
        const farmGridWidth = FARM_COLS * TILE_SIZE;
        this.farmGridX = (screenWidth - farmGridWidth) / 2;
        if (this.farmGridX < UI_PADDING) { this.farmGridX = UI_PADDING; }
        this.farmGridY = 100;
        console.log(`Calculated Layout: ScreenW=${screenWidth}, GridX=${this.farmGridX}`);
     }
    handleResize(gameSize: Phaser.Structs.Size) { /* ... (không đổi) ... */ }

    loadStateFromLocalStorage() { /* ... (không đổi) ... */
        console.log("Attempting to load state from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);
        const savedSeedInventoryJson = localStorage.getItem(SEED_INVENTORY_STORAGE_KEY);

        if (savedInventoryJson) { try { this.playerInventory = JSON.parse(savedInventoryJson); } catch (e) { this.initializeHarvastInventory(); } } else { this.initializeHarvastInventory(); }
        if (savedSeedInventoryJson) { try { this.playerSeedInventory = JSON.parse(savedSeedInventoryJson); } catch (e) { this.initializeSeedInventory(); } } else { this.initializeSeedInventory(); }

        if (savedPlotsJson) {
            try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                this.farmPlots.clear();
                savedPlotDataArray.forEach(([key, storedState]) => {
                    // Khởi tạo cả timer và state text là null khi load
                    this.farmPlots.set(key, { ...storedState, gameObject: null, timerTextObject: null, stateTextObject: null });
                });
                console.log(`Loaded ${this.farmPlots.size} plot states.`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
     }

    saveStateToLocalStorage() { /* ... (không đổi) ... */
        try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                const storedState: StoredFarmPlotState = { tileX: plot.tileX, tileY: plot.tileY, state: plot.state, fruitId: plot.fruitId, growthTimer: plot.growthTimer };
                return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));
            localStorage.setItem(SEED_INVENTORY_STORAGE_KEY, JSON.stringify(this.playerSeedInventory));
        } catch (e) { console.error("Error saving state:", e); }
    }

    initializeHarvastInventory() { /* ... (không đổi) ... */ this.playerInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; }); }
    initializeSeedInventory() { /* ... (không đổi) ... */ this.playerSeedInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerSeedInventory[fruit.id] = 5; }); console.log("Initialized seed inventory:", this.playerSeedInventory); }


    createFarmGridAndUI() {
        console.log("Creating farm grid visuals, timers, and state texts...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                const plotX = this.farmGridX + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = this.farmGridY + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = `${x}-${y}`;

                let plotState = this.farmPlots.get(plotKey);
                 // Khởi tạo plotState nếu chưa có
                 if (!plotState) {
                    plotState = {
                        tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0,
                        gameObject: null, timerTextObject: null, stateTextObject: null // Khởi tạo cả state text
                    };
                    this.farmPlots.set(plotKey, plotState);
                 } else {
                     // Nếu plotState đã có, đảm bảo các object game được reset để tạo lại hoặc cập nhật vị trí
                     // (Quan trọng nếu dùng hàm resize phức tạp)
                     // plotState.gameObject = null;
                     // plotState.timerTextObject = null;
                     // plotState.stateTextObject = null;
                 }

                // Tạo hoặc cập nhật ảnh
                if (!plotState.gameObject) {
                     plotState.gameObject = this.add.image(plotX, plotY, EMPTY_PLOT_KEY)
                        .setInteractive()
                        .setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE)
                        .setData('plotKey', plotKey).setData('isPlot', true).setDepth(0);
                } else { plotState.gameObject.setPosition(plotX, plotY).setActive(true).setVisible(true); }

                // Tạo hoặc cập nhật text timer
                 if (!plotState.timerTextObject) {
                    plotState.timerTextObject = this.add.text(plotX, plotY + TIMER_TEXT_OFFSET_Y, '', TIMER_TEXT_STYLE)
                        .setOrigin(0.5).setVisible(false).setDepth(1);
                 } else { plotState.timerTextObject.setPosition(plotX, plotY + TIMER_TEXT_OFFSET_Y).setActive(true).setVisible(false); }

                // *** TẠO HOẶC CẬP NHẬT TEXT TRẠNG THÁI ***
                 if (!plotState.stateTextObject) {
                    plotState.stateTextObject = this.add.text(
                        plotX, // Đặt ở giữa ô
                        plotY, // Đặt ở giữa ô
                        '',
                        STATE_TEXT_STYLE // Sử dụng style mới
                    )
                    .setOrigin(0.5) // Canh giữa text
                    .setVisible(false) // Ban đầu ẩn
                    .setDepth(1); // Cùng depth với timer hoặc cao hơn chút
                 } else {
                    plotState.stateTextObject.setPosition(plotX, plotY).setActive(true).setVisible(false); // Cập nhật vị trí, ẩn đi ban đầu
                 }

                this.updatePlotVisual(plotState); // Cập nhật visual ban đầu
            }
        }
        console.log(`Farm grid visuals created/updated for ${this.farmPlots.size} plots.`);
    }

    createUIElements() { /* ... (không đổi) ... */
        const screenWidth = this.cameras.main.width;
        this.add.text(UI_PADDING, UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' }).setOrigin(0, 0).setData('isUiElement', true);
        const inventoryTextY = UI_PADDING * 3;
        this.inventoryText = this.add.text(UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' }).setWordWrapWidth(screenWidth - UI_PADDING * 2).setOrigin(0, 0).setData('isUiElement', true);
        const resetButton = this.add.text( screenWidth - UI_PADDING, UI_PADDING, 'Chơi Lại Từ Đầu', RESET_BUTTON_STYLE ).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setData('isUiElement', true);
        resetButton.on('pointerdown', () => { this.handleResetButtonClick(); });
        const seedBagTitleY = UI_PADDING * 3;
        this.add.text(screenWidth - UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' }).setOrigin(1, 0).setData('isUiElement', true);
        const seedBagStartX = screenWidth - UI_PADDING - SEED_ICON_SIZE / 2;
        const seedBagStartY = seedBagTitleY + 50;
        this.seedBagUIElements.clear();
        ALL_FRUITS.forEach((fruit, index) => {
            const iconX = seedBagStartX;
            const iconY = seedBagStartY + index * (SEED_ICON_SIZE + SEED_SPACING_VERTICAL);
            const seedIcon = this.add.image(iconX, iconY, fruit.spriteKeySeed).setInteractive({ useHandCursor: true }).setDisplaySize(SEED_ICON_SIZE, SEED_ICON_SIZE).setData('seedId', fruit.id).setData('isSeedIcon', true).setData('isUiElement', true);
            const countTextY = iconY + SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.add.text(iconX, countTextY, `x${this.playerSeedInventory[fruit.id] || 0}`, { fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 } }).setOrigin(0.5).setData('isUiElement', true);
            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    handleResetButtonClick() { /* ... (không đổi) ... */
        this.showConfirmationDialog("Bạn có chắc chắn muốn reset toàn bộ dữ liệu game không? Hành động này không thể hoàn tác.", () => {
            console.log("Resetting game data...");
            localStorage.removeItem(PLOTS_STORAGE_KEY);
            localStorage.removeItem(INVENTORY_STORAGE_KEY);
            localStorage.removeItem(SEED_INVENTORY_STORAGE_KEY);
            this.scene.restart();
        }, () => {
            console.log("Game reset cancelled.");
        });
    }

    showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void) { /* ... (không đổi) ... */
        const dialogOverlay = document.createElement('div'); dialogOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000;';
        const dialogBox = document.createElement('div'); dialogBox.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#fff;padding:20px;border-radius:5px;z-index:1001;text-align:center;';
        const messageElement = document.createElement('p'); messageElement.textContent = message; messageElement.style.color = '#000'; dialogBox.appendChild(messageElement);
        const buttonContainer = document.createElement('div'); buttonContainer.style.marginTop = '15px';
        const confirmButton = document.createElement('button'); confirmButton.textContent = 'Xác nhận'; confirmButton.style.cssText='margin:0 5px;background-color:#3498db;color:#fff;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;';
        confirmButton.onclick = () => { onConfirm(); document.body.removeChild(dialogOverlay); }; buttonContainer.appendChild(confirmButton);
        const cancelButton = document.createElement('button'); cancelButton.textContent = 'Hủy'; cancelButton.style.cssText='margin:0 5px;background-color:#e74c3c;color:#fff;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;';
        cancelButton.onclick = () => { onCancel(); document.body.removeChild(dialogOverlay); }; buttonContainer.appendChild(cancelButton);
        dialogBox.appendChild(buttonContainer); dialogOverlay.appendChild(dialogBox); document.body.appendChild(dialogOverlay);
    }

    updateInventoryDisplay() { /* ... (không đổi) ... */
        let text = 'Kho nông sản: '; let items = [];
        for (const fruitId in this.playerInventory) { if (this.playerInventory[fruitId] > 0) { const fruitData = getFruitDataById(fruitId); items.push(`${fruitData?.name || fruitId}: ${this.playerInventory[fruitId]}`); } }
        text += items.join(' | ') || 'Trống';
        const seedBagWidthEstimate = SEED_ICON_SIZE + UI_PADDING * 2; const availableWidth = this.cameras.main.width - seedBagWidthEstimate - UI_PADDING;
        if (this.inventoryText) { this.inventoryText.setText(text); this.inventoryText.setWordWrapWidth(availableWidth > 100 ? availableWidth : 100); }
    }

    updateSeedBagDisplay() { /* ... (không đổi) ... */
        this.seedBagUIElements.forEach((elements, fruitId) => {
            const count = this.playerSeedInventory[fruitId] || 0; elements.text.setText(`x${count}`); elements.icon.setAlpha(count > 0 ? 1 : 0.5); elements.icon.setInteractive(count > 0 ? { useHandCursor: true } : false);
        });
    }


    // *** CẬP NHẬT VISUAL: QUẢN LÝ CẢ TIMER TEXT VÀ STATE TEXT ***
    updatePlotVisual(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null, stateTextObject?: Phaser.GameObjects.Text | null }) {
        if (!plotState.gameObject) return;

        let textureKey = EMPTY_PLOT_KEY;
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;
        const timerText = plotState.timerTextObject; // Lấy tham chiếu text timer
        const stateText = plotState.stateTextObject; // Lấy tham chiếu text state

        // Xác định texture dựa trên state
        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    textureKey = (plotState.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || EMPTY_PLOT_KEY;
                break;
            case 'empty': default: textureKey = EMPTY_PLOT_KEY; break;
        }
        // Cập nhật ảnh
        plotState.gameObject.setTexture(textureKey).setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE);


        // *** QUẢN LÝ HIỂN THỊ TEXT DỰA TRÊN STATE ***
        if (timerText && stateText) { // Chỉ thực hiện nếu cả hai text object tồn tại
             switch (plotState.state) {
                 case 'empty':
                     timerText.setVisible(false); // Ẩn timer
                     stateText.setText('Đất trống').setVisible(true); // Hiện text "Đất trống"
                     break;
                 case 'growing':
                     stateText.setVisible(false); // Ẩn text state
                     // Hiển thị và cập nhật timer nếu còn thời gian
                     if (plotState.growthTimer > 0) {
                         const remainingTime = Math.ceil(plotState.growthTimer);
                         const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                         const seconds = (remainingTime % 60).toString().padStart(2, '0');
                         timerText.setText(`${minutes}:${seconds}`).setVisible(true);
                     } else {
                         timerText.setVisible(false); // Ẩn timer nếu hết giờ (trước khi chuyển sang ready)
                     }
                     break;
                 case 'ready':
                     timerText.setVisible(false); // Ẩn timer
                     stateText.setText('Thu hoạch').setVisible(true); // Hiện text "Thu hoạch"
                     break;
                 default:
                     // Trạng thái không xác định, ẩn cả hai
                     timerText.setVisible(false);
                     stateText.setVisible(false);
                     break;
             }
        } else {
             console.warn(`Text objects missing for plot ${plotState.tileX}-${plotState.tileY}`);
        }
    }

    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) { /* ... (không đổi) ... */
        const isPlot = gameObject.getData('isPlot') === true; const isSeedIcon = gameObject.getData('isSeedIcon') === true;
        if (gameObject.getData('isUiElement') && gameObject instanceof Phaser.GameObjects.Text && gameObject.text === 'Chơi Lại Từ Đầu') { return; } // Đổi text check nút Reset
        if (isSeedIcon) { const seedId = gameObject.getData('seedId'); if (this.playerSeedInventory[seedId] > 0) { this.handleSeedSelection(seedId, gameObject as Phaser.GameObjects.Image); } else { console.log(`Hết hạt ${getFruitDataById(seedId)?.name || seedId}!`); this.deselectSeed(); } }
        else if (isPlot) { const plotKey = gameObject.getData('plotKey'); const plotState = this.farmPlots.get(plotKey); if (!plotState) return; console.log(`Clicked plot (${plotState.tileX}, ${plotState.tileY}), state: ${plotState.state}`);
            if (plotState.state === 'empty' && this.selectedSeedId) { this.handlePlantingWithSelection(plotState); }
            else if (plotState.state === 'growing') { const fruitName = plotState.fruitId ? getFruitDataById(plotState.fruitId)?.name : 'Không rõ'; console.log(`Đang trồng ${fruitName}. Còn lại: ${Math.ceil(plotState.growthTimer)}s`); this.deselectSeed(); }
            else if (plotState.state === 'ready') { 
                this.handleHarvesting(plotState); 

                this.deselectSeed(); 
            }
            else { this.deselectSeed(); console.log("Ô đất trống. Chọn một hạt giống từ túi để trồng."); } }
        else { this.deselectSeed(); }
    }

    handleSeedSelection(seedId: string, icon: Phaser.GameObjects.Image) { /* ... (không đổi) ... */
        console.log(`Selected seed: ${getFruitDataById(seedId)?.name || seedId}`); this.selectedSeedId = seedId; if (this.selectedSeedHighlight) { this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true); }
    }
    deselectSeed() { /* ... (không đổi) ... */
        if (this.selectedSeedId) { console.log("Deselected seed"); this.selectedSeedId = null; } if (this.selectedSeedHighlight) { this.selectedSeedHighlight.setVisible(false); }
    }
    handlePlantingWithSelection(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) { /* ... (logic không đổi) ... */
        if (!this.selectedSeedId) { return; }
        const selectedFruit = getFruitDataById(this.selectedSeedId);
        if (!selectedFruit) { this.deselectSeed(); return; }
        if (this.playerSeedInventory[this.selectedSeedId] > 0) {
            this.playerSeedInventory[this.selectedSeedId]--;
            plotState.state = 'growing';
            plotState.fruitId = selectedFruit.id;
            plotState.growthTimer = selectedFruit.growthTimeSeconds;
            this.updatePlotVisual(plotState);
            console.log(`Planted ${selectedFruit.name} at (${plotState.tileX}, ${plotState.tileY}). Seeds left: ${this.playerSeedInventory[this.selectedSeedId]}`);
            this.updateSeedBagDisplay();
            this.deselectSeed();
            this.saveStateToLocalStorage();
        } else { this.deselectSeed(); this.updateSeedBagDisplay(); }
    }

    handleHarvesting(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null, stateTextObject?: Phaser.GameObjects.Text | null }) { /* ... (không đổi) ... */
        if (!plotState.fruitId) return; const fruitData = getFruitDataById(plotState.fruitId); if (!fruitData) return; const addedAmount = fruitData.harvestYield; this.playerInventory[fruitData.id] = (this.playerInventory[fruitData.id] || 0) + addedAmount; const seedRewardChance = 0.25; if (Math.random() < seedRewardChance) { this.playerSeedInventory[fruitData.id] = (this.playerSeedInventory[fruitData.id] || 0) + 1; console.log(`Bonus! Received 1 ${fruitData.name} seed.`); this.updateSeedBagDisplay(); }
        plotState.state = 'empty'; plotState.fruitId = null; plotState.growthTimer = 0; this.updatePlotVisual(plotState); console.log(`Harvested ${addedAmount} ${fruitData.name} from (${plotState.tileX}, ${plotState.tileY}).`); this.updateInventoryDisplay(); this.saveStateToLocalStorage();
    }

    // *** CẬP NHẬT GROWTH TIMER: CHỈ CẦN GỌI updatePlotVisual KHI CẦN ***
    updateGrowthTimers() {
        let stateChanged = false; // Chỉ lưu khi timer giảm hoặc state đổi

        this.farmPlots.forEach(plot => {
            const currentPlot = plot as FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null, stateTextObject?: Phaser.GameObjects.Text | null };

            if (currentPlot.state === 'growing' && currentPlot.fruitId) {
                if (currentPlot.growthTimer > 0) {
                    currentPlot.growthTimer -= 1;
                    stateChanged = true; // Timer giảm -> cần lưu
                    const fruitData = getFruitDataById(currentPlot.fruitId);
                    if (!fruitData) return;

                    let visualNeedsUpdate = false;

                    // Kiểm tra nếu cần đổi ảnh seed -> growing
                    const halfway = fruitData.growthTimeSeconds / 2;
                    const expectedTextureKey = (currentPlot.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                    if (currentPlot.gameObject?.texture.key !== expectedTextureKey) {
                        visualNeedsUpdate = true;
                    }

                    // Kiểm tra cây chín
                    if (currentPlot.growthTimer <= 0) {
                        currentPlot.state = 'ready'; // Đổi state ở đây
                        visualNeedsUpdate = true; // Cần update visual (ảnh + text)
                        console.log(`Fruit ${fruitData.name} at (${currentPlot.tileX}, ${currentPlot.tileY}) is ready!`);
                    } else {
                         // Nếu chưa chín, chỉ cần cập nhật text timer (nếu đang hiển thị)
                         if (currentPlot.timerTextObject?.visible) {
                             const remainingTime = Math.ceil(currentPlot.growthTimer);
                             const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                             const seconds = (remainingTime % 60).toString().padStart(2, '0');
                             currentPlot.timerTextObject.setText(`${minutes}:${seconds}`);
                         }
                    }

                    // Gọi updatePlotVisual nếu cần đổi ảnh hoặc khi cây chín
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