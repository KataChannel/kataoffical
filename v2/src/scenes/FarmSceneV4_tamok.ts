// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2';
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';
const SEED_INVENTORY_STORAGE_KEY = 'phaserFarmGame_seedInventory_v1';

const TILE_SIZE = 90; // Kích thước ô đất logic
const FARM_COLS = 5;
const FARM_ROWS = 5;
// Không dùng FARM_GRID_X, Y cố định nữa
// const FARM_GRID_X = 100;
// const FARM_GRID_Y = 100;
const EMPTY_PLOT_KEY = 'empty_plot';
const PLOT_IMAGE_DISPLAY_SIZE = TILE_SIZE - 4;

// --- Cấu hình UI động ---
const UI_PADDING = 15; // Khoảng cách từ mép màn hình
const SEED_ICON_SIZE = 50;
const SEED_SPACING_VERTICAL = 15; // Khoảng cách dọc giữa các icon hạt giống
const SEED_COUNT_TEXT_OFFSET_Y = 30; // Offset Y cho text số lượng (so với tâm icon)

const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: { x: 3, y: 1 }
};
const TIMER_TEXT_OFFSET_Y = - (TILE_SIZE / 2) + 5;

// --- Style cho nút Reset ---
const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#3498db', // Màu xanh da trời
    padding: { x: 12, y: 6 },

};


export class FarmScene extends Phaser.Scene {
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
    // --- Biến lưu vị trí lưới động ---
    private farmGridX: number = 0;
    private farmGridY: number = 100; // Giữ Y tương đối cố định hoặc điều chỉnh thêm nếu cần


    constructor() {
        super('FarmScene');
    }

    preload() {
        // ... (preload không đổi)
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
        console.log('FarmScene create');
        // --- Tính toán vị trí động ---
        this.calculateLayout();

        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI();
        this.createUIElements(); // Tạo UI sau khi có layout
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
            .setDepth(1); // Đảm bảo nằm trên icon

        // --- Lắng nghe sự kiện resize (nếu muốn cập nhật layout khi xoay màn hình) ---
        // this.scale.on('resize', this.handleResize, this); // Bỏ comment nếu muốn layout tự cập nhật khi resize/xoay
    }

    // --- Hàm tính toán vị trí động ---
    calculateLayout() {
        const screenWidth = this.cameras.main.width;
        // const screenHeight = this.cameras.main.height; // Dùng nếu cần căn chỉnh theo chiều dọc

        // Căn giữa lưới nông trại theo chiều ngang
        const farmGridWidth = FARM_COLS * TILE_SIZE;
        this.farmGridX = (screenWidth - farmGridWidth) / 2;
        // Đảm bảo lưới không bị đẩy ra quá sát lề trái nếu màn hình quá hẹp
        if (this.farmGridX < UI_PADDING) {
            this.farmGridX = UI_PADDING;
        }

        this.farmGridY = 100; // Giữ Y cố định hoặc tính toán dựa trên screenHeight nếu muốn

        console.log(`Calculated Layout: ScreenW=${screenWidth}, GridX=${this.farmGridX}`);
    }

    // --- Hàm xử lý khi màn hình resize (tùy chọn) ---
    handleResize(gameSize: Phaser.Structs.Size) {
         console.log("Resizing...");
         this.cameras.main.centerOn(gameSize.width / 2, gameSize.height / 2); // Có thể cần thiết

         // Tính toán lại layout
         this.calculateLayout();

         // Hủy và vẽ lại toàn bộ UI (cách đơn giản nhất)
         // Hoặc cập nhật vị trí từng element (phức tạp hơn)
         // Ví dụ hủy và vẽ lại:
         // this.children.list.forEach(child => {
         //     // Lọc ra các element UI cần vẽ lại (ví dụ: dựa vào tên hoặc data)
         //     if (child.getData && (child.getData('isUiElement') || child.getData('isPlot'))) {
         //         child.destroy();
         //     }
         // });
         // this.farmPlots.forEach(plot => { plot.gameObject = null; plot.timerTextObject = null; }); // Reset ref
         // this.seedBagUIElements.clear();
         // this.createFarmGridAndUI();
         // this.createUIElements();
         // this.updateInventoryDisplay();
         // this.updateSeedBagDisplay();

         // Cách tốt hơn là cập nhật vị trí từng element, nhưng cần quản lý cẩn thận
         // Ví dụ: this.resetButton.setPosition(this.cameras.main.width - UI_PADDING, UI_PADDING);
         // ... cập nhật vị trí các element khác ...
    }


    loadStateFromLocalStorage() { /* ... (không đổi) ... */
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
                this.farmPlots.clear();
                savedPlotDataArray.forEach(([key, storedState]) => {
                     this.farmPlots.set(key, { ...storedState, gameObject: null, timerTextObject: null });
                });
                console.log(`Loaded ${this.farmPlots.size} plot states.`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
    }

    saveStateToLocalStorage() { /* ... (không đổi) ... */
        try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
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
    initializeHarvastInventory() { /* ... (không đổi) ... */ this.playerInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; }); }
    initializeSeedInventory() { /* ... (không đổi) ... */ this.playerSeedInventory = {}; ALL_FRUITS.forEach(fruit => { this.playerSeedInventory[fruit.id] = 5; }); console.log("Initialized seed inventory:", this.playerSeedInventory); }

    // --- Sử dụng this.farmGridX, this.farmGridY ---
    createFarmGridAndUI() {
        console.log("Creating farm grid visuals and timers...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                // *** SỬ DỤNG VỊ TRÍ ĐỘNG ***
                const plotX = this.farmGridX + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = this.farmGridY + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = `${x}-${y}`;

                let plotState = this.farmPlots.get(plotKey);
                // Nếu plotState đã tồn tại từ localStorage nhưng chưa có gameObject (do scene restart/load lại)
                if (plotState && (!plotState.gameObject || !plotState.timerTextObject)) {
                     // Chỉ cần tạo gameObject và timerTextObject, không cần tạo plotState mới
                } else if (!plotState) {
                     // Tạo plotState mới nếu không có trong localStorage
                    plotState = {
                        tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0,
                        gameObject: null, timerTextObject: null
                    };
                    this.farmPlots.set(plotKey, plotState);
                }

                // Tạo hoặc lấy lại ảnh (tránh tạo thừa nếu đã có từ trước)
                if (!plotState.gameObject) {
                     plotState.gameObject = this.add.image(plotX, plotY, EMPTY_PLOT_KEY)
                        .setInteractive()
                        .setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE)
                        .setData('plotKey', plotKey)
                        .setData('isPlot', true)
                        .setDepth(0);
                } else {
                    plotState.gameObject.setPosition(plotX, plotY).setActive(true).setVisible(true); // Cập nhật vị trí nếu resize
                }


                // Tạo hoặc lấy lại text timer
                 if (!plotState.timerTextObject) {
                    plotState.timerTextObject = this.add.text(
                        plotX,
                        plotY + TIMER_TEXT_OFFSET_Y,
                        '',
                        TIMER_TEXT_STYLE
                    )
                    .setOrigin(0.5)
                    .setVisible(false)
                    .setDepth(1);
                 } else {
                     plotState.timerTextObject.setPosition(plotX, plotY + TIMER_TEXT_OFFSET_Y).setActive(true).setVisible(false); // Cập nhật vị trí, ẩn đi ban đầu
                 }


                this.updatePlotVisual(plotState);
            }
        }
        console.log(`Farm grid visuals created/updated for ${this.farmPlots.size} plots.`);
    }

    // --- Tạo UI dựa trên vị trí động ---
    createUIElements() {
        const screenWidth = this.cameras.main.width;
        // const screenHeight = this.cameras.main.height;

        // --- Tiêu đề Game (Top Left) ---
        this.add.text(UI_PADDING, UI_PADDING, 'Nông Trại Ngũ Hành', { fontSize: '20px', color: '#ffffff' })
            .setOrigin(0, 0)
            .setData('isUiElement', true); // Đánh dấu để quản lý nếu cần resize phức tạp

        // --- Kho Nông Sản (Dưới tiêu đề) ---
        const inventoryTextY = UI_PADDING * 3;
        this.inventoryText = this.add.text(UI_PADDING, inventoryTextY, 'Kho: ', { fontSize: '16px', color: '#ffffff' })
            .setWordWrapWidth(screenWidth - UI_PADDING * 2) // Giới hạn chiều rộng
            .setOrigin(0, 0)
            .setData('isUiElement', true);


        // --- NÚT RESET (Top Right) ---
        const resetButton = this.add.text(
            UI_PADDING + 300, // Căn phải
            UI_PADDING, // Căn trên
            'Chơi Lại Từ Đầu',
            RESET_BUTTON_STYLE
            )
            .setOrigin(0, 0) // Origin (1,0) để căn góc trên bên phải
            .setInteractive({ useHandCursor: true }) // Thêm hiệu ứng con trỏ
            .setData('isUiElement', true);

        resetButton.on('pointerdown', () => {
            this.handleResetButtonClick();
        });


        // --- TÚI HẠT GIỐNG (Dọc Bên Phải) ---
        const seedBagTitleY = UI_PADDING * 3; // Đặt dưới nút Reset hoặc vị trí khác tùy ý
        this.add.text(screenWidth - UI_PADDING, seedBagTitleY, 'Hạt Giống', { fontSize: '18px', color: '#ffffff' })
             .setOrigin(1, 0) // Căn phải trên
             .setData('isUiElement', true);

        const seedBagStartX = screenWidth - UI_PADDING - SEED_ICON_SIZE / 2; // X cố định cho cột hạt giống
        const seedBagStartY = seedBagTitleY + 50; // Y bắt đầu cho icon đầu tiên

        this.seedBagUIElements.clear(); // Xóa UI cũ nếu có

        ALL_FRUITS.forEach((fruit, index) => {
            const iconX = seedBagStartX;
            // *** TÍNH Y DỌC ***
            const iconY = seedBagStartY + index * (SEED_ICON_SIZE + SEED_SPACING_VERTICAL);

            // Icon hạt giống
            const seedIcon = this.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive({ useHandCursor: true })
                .setDisplaySize(SEED_ICON_SIZE, SEED_ICON_SIZE)
                .setData('seedId', fruit.id)
                .setData('isSeedIcon', true)
                .setData('isUiElement', true); // Đánh dấu là UI element

            // Text hiển thị số lượng (đặt dưới icon)
            const countTextY = iconY + SEED_COUNT_TEXT_OFFSET_Y;
            const countText = this.add.text(iconX, countTextY, `x${this.playerSeedInventory[fruit.id] || 0}`, {
                fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 }
            })
            .setOrigin(0.5) // Canh giữa text
            .setData('isUiElement', true); // Đánh dấu là UI element

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    // --- Hàm xử lý khi nhấn nút Reset ---
    handleResetButtonClick() {
        // Hiển thị dialog xác nhận
        this.showConfirmationDialog("Bạn có chắc chắn muốn reset toàn bộ dữ liệu game không? Hành động này không thể hoàn tác.", () => {
            console.log("Resetting game data...");
            // Xóa dữ liệu khỏi localStorage
            localStorage.removeItem(PLOTS_STORAGE_KEY);
            localStorage.removeItem(INVENTORY_STORAGE_KEY);
            localStorage.removeItem(SEED_INVENTORY_STORAGE_KEY);

            // Khởi động lại Scene hiện tại để áp dụng thay đổi
            this.scene.restart();
        }, () => {
            console.log("Game reset cancelled.");
        });
    }

    // --- Hàm hiển thị dialog xác nhận tùy chỉnh ---
    showConfirmationDialog(message: string, onConfirm: () => void, onCancel: () => void) {
        // Tạo một div làm nền mờ
        const dialogOverlay = document.createElement('div');
        dialogOverlay.style.position = 'fixed';
        dialogOverlay.style.top = '0';
        dialogOverlay.style.left = '0';
        dialogOverlay.style.width = '100%';
        dialogOverlay.style.height = '100%';
        dialogOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Màu đen trong suốt
        dialogOverlay.style.zIndex = '1000'; // Đảm bảo hiển thị trên cùng

        // Tạo một div làm hộp thoại
        const dialogBox = document.createElement('div');
        dialogBox.style.position = 'absolute';
        dialogBox.style.top = '50%';
        dialogBox.style.left = '50%';
        dialogBox.style.transform = 'translate(-50%, -50%)';
        dialogBox.style.backgroundColor = '#fff';
        dialogBox.style.padding = '20px';
        dialogBox.style.borderRadius = '5px';
        dialogBox.style.zIndex = '1001'; // Đảm bảo hiển thị trên nền mờ

        // Tạo nội dung tin nhắn
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        dialogBox.appendChild(messageElement);

        // Tạo nút xác nhận
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center'; // Để căn giữa các nút

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Xác nhận';
        confirmButton.style.margin = '0 5px'; // Khoảng cách giữa các nút
        confirmButton.style.backgroundColor = '#3498db';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = 'none';
        confirmButton.style.padding = '8px 12px';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.onclick = () => {
            onConfirm();
            document.body.removeChild(dialogOverlay);
        };
        buttonContainer.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Hủy';
        cancelButton.style.margin = '0 5px'; // Khoảng cách giữa các nút
        cancelButton.style.backgroundColor = '#e74c3c';
        cancelButton.style.color = '#fff';
        cancelButton.style.border = 'none';
        cancelButton.style.padding = '8px 12px';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.onclick = () => {
            onCancel();
            document.body.removeChild(dialogOverlay);
        };
        buttonContainer.appendChild(cancelButton);

        dialogBox.appendChild(buttonContainer);

        // Thêm hộp thoại vào nền mờ
        dialogOverlay.appendChild(dialogBox);

        // Thêm nền mờ vào body
        document.body.appendChild(dialogOverlay);
    }


    updateInventoryDisplay() { /* ... (không đổi) ... */
        let text = 'Kho nông sản: ';
        let items = [];
        for (const fruitId in this.playerInventory) {
            if (this.playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(`${fruitData?.name || fruitId}: ${this.playerInventory[fruitId]}`);
            }
        }
        text += items.join(' | ') || 'Trống';
        // Cập nhật lại width wrap nếu cần thiết (đặc biệt nếu layout thay đổi)
        const seedBagWidthEstimate = SEED_ICON_SIZE + UI_PADDING * 2;
        const availableWidth = this.cameras.main.width - seedBagWidthEstimate - UI_PADDING;
        if (this.inventoryText) {
             this.inventoryText.setText(text);
             this.inventoryText.setWordWrapWidth(availableWidth > 100 ? availableWidth : 100); // Đặt giới hạn tối thiểu
        }
    }

    updateSeedBagDisplay() { /* ... (không đổi) ... */
        this.seedBagUIElements.forEach((elements, fruitId) => {
            const count = this.playerSeedInventory[fruitId] || 0;
            elements.text.setText(`x${count}`);
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
            // Tắt tương tác nếu hết hạt
            elements.icon.setInteractive(count > 0 ? { useHandCursor: true } : false);
        });
    }
    updatePlotVisual(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) { /* ... (logic không đổi) ... */
        if (!plotState.gameObject) return;
        let textureKey = EMPTY_PLOT_KEY;
        let isGrowing = false;
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;

        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    textureKey = (plotState.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                    isGrowing = true;
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || EMPTY_PLOT_KEY;
                break;
            case 'empty': default: textureKey = EMPTY_PLOT_KEY; break;
        }
        plotState.gameObject.setTexture(textureKey).setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE);

        if (plotState.timerTextObject) {
            if (isGrowing && plotState.growthTimer > 0) {
                const remainingTime = Math.ceil(plotState.growthTimer);
                const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                const seconds = (remainingTime % 60).toString().padStart(2, '0');
                plotState.timerTextObject.setText(`${minutes}:${seconds}`).setVisible(true);
            } else {
                plotState.timerTextObject.setVisible(false);
            }
        } else { if (isGrowing) console.warn(`Timer text object missing for plot ${plotState.tileX}-${plotState.tileY}`); }
    }
    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) { /* ... (logic không đổi) ... */
        const isPlot = gameObject.getData('isPlot') === true;
        const isSeedIcon = gameObject.getData('isSeedIcon') === true;
        // Bỏ qua nếu click vào nút reset trong handler này (vì đã xử lý riêng)
        if (gameObject.getData('isUiElement') && gameObject instanceof Phaser.GameObjects.Text && gameObject.text === 'Reset Game') {
             return;
        }

        if (isSeedIcon) {
            const seedId = gameObject.getData('seedId');
            if (this.playerSeedInventory[seedId] > 0) { // Chỉ chọn nếu còn hạt
                 this.handleSeedSelection(seedId, gameObject as Phaser.GameObjects.Image);
            } else {
                 console.log(`Hết hạt ${getFruitDataById(seedId)?.name || seedId}!`);
                 this.deselectSeed();
            }
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
             // Click vào nền hoặc các UI khác không tương tác (title, inventory text...)
             this.deselectSeed();
        }
     }
    handleSeedSelection(seedId: string, icon: Phaser.GameObjects.Image) { /* ... (logic không đổi) ... */
        // Đã kiểm tra còn hạt ở onGameObjectDown
        console.log(`Selected seed: ${getFruitDataById(seedId)?.name || seedId}`);
        this.selectedSeedId = seedId;
        if (this.selectedSeedHighlight) {
             // Cập nhật vị trí highlight theo icon được chọn
             this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true);
        }
     }
    deselectSeed() { /* ... (logic không đổi) ... */
        if (this.selectedSeedId) { console.log("Deselected seed"); this.selectedSeedId = null; }
        if (this.selectedSeedHighlight) { this.selectedSeedHighlight.setVisible(false); }
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
    handleHarvesting(plotState: FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null }) { /* ... (logic không đổi, có thể thêm bonus seed) ... */
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
        this.updatePlotVisual(plotState);
        console.log(`Harvested ${addedAmount} ${fruitData.name} from (${plotState.tileX}, ${plotState.tileY}).`);
        this.updateInventoryDisplay();
        this.saveStateToLocalStorage();
     }
    updateGrowthTimers() { /* ... (logic không đổi) ... */
        let stateChanged = false;
        this.farmPlots.forEach(plot => {
            const currentPlot = plot as FarmPlot & { timerTextObject?: Phaser.GameObjects.Text | null };
            if (currentPlot.state === 'growing' && currentPlot.fruitId) {
                if (currentPlot.growthTimer > 0) {
                    currentPlot.growthTimer -= 1;
                    stateChanged = true;
                    const fruitData = getFruitDataById(currentPlot.fruitId); if (!fruitData) return;
                    if (currentPlot.timerTextObject) {
                         const remainingTime = Math.ceil(currentPlot.growthTimer);
                         if (remainingTime > 0) {
                             const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
                             const seconds = (remainingTime % 60).toString().padStart(2, '0');
                             currentPlot.timerTextObject.setText(`${minutes}:${seconds}`);
                         } else { currentPlot.timerTextObject.setVisible(false); }
                    }
                    const halfway = fruitData.growthTimeSeconds / 2;
                    const expectedKey = (currentPlot.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                    let visualNeedsUpdate = false;
                    if (currentPlot.gameObject?.texture.key !== expectedKey) { visualNeedsUpdate = true; }
                    if (currentPlot.growthTimer <= 0) {
                        currentPlot.state = 'ready'; visualNeedsUpdate = true;
                        console.log(`Fruit ${fruitData.name} at (${currentPlot.tileX}, ${currentPlot.tileY}) is ready!`);
                    }
                    if (visualNeedsUpdate) { this.updatePlotVisual(currentPlot); }
                }
            }
        });
        if (stateChanged) { this.saveStateToLocalStorage(); }
    }
}