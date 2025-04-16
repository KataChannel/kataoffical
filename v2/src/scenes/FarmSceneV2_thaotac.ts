// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2';
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';
// *** THÊM KEY CHO SEED INVENTORY ***
const SEED_INVENTORY_STORAGE_KEY = 'phaserFarmGame_seedInventory_v1';

const TILE_SIZE = 64;
const FARM_COLS = 5;
const FARM_ROWS = 5;
const FARM_GRID_X = 100;
const FARM_GRID_Y = 100;
const EMPTY_PLOT_KEY = 'empty_plot';
const PLOT_IMAGE_DISPLAY_SIZE = TILE_SIZE - 4;

// *** UI CHO TÚI HẠT GIỐNG ***
const SEED_BAG_X = FARM_GRID_X + FARM_COLS * TILE_SIZE + 30; // Vị trí X của túi hạt giống
const SEED_BAG_Y = FARM_GRID_Y;                            // Vị trí Y
const SEED_ICON_SIZE = 50;                                 // Kích thước icon hạt giống
const SEED_SPACING = 10;                                   // Khoảng cách giữa các icon
const SEED_COUNT_TEXT_OFFSET_Y = 30;                       // Offset Y cho text số lượng

export class FarmScene extends Phaser.Scene {
    private farmPlots: Map<string, FarmPlot> = new Map();
    private playerInventory: PlayerInventory = {}; // Kho chứa nông sản thu hoạch
    // *** THÊM KHO CHỨA HẠT GIỐNG ***
    private playerSeedInventory: PlayerInventory = {}; // fruitId -> count
    private inventoryText!: Phaser.GameObjects.Text;
    // *** LƯU TRẠNG THÁI HẠT GIỐNG ĐANG CHỌN ***
    private selectedSeedId: string | null = null;
    private selectedSeedHighlight: Phaser.GameObjects.Rectangle | null = null; // Viền highlight
    // *** LƯU CÁC ĐỐI TƯỢNG UI CỦA TÚI HẠT GIỐNG ***
    private seedBagUIElements: Map<string, {
        icon: Phaser.GameObjects.Image,
        text: Phaser.GameObjects.Text
    }> = new Map();


    constructor() {
        super('FarmScene');
    }

    preload() {
        console.log('FarmScene preload: Loading images...');
        this.load.image(EMPTY_PLOT_KEY, `assets/${EMPTY_PLOT_KEY}.jpg`);
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
        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI();
        this.createUIElements(); // Bao gồm cả túi hạt giống
        // *** CẬP NHẬT CẢ HIỂN THỊ TÚI HẠT GIỐNG ***
        this.updateInventoryDisplay();
        this.updateSeedBagDisplay(); // Gọi lần đầu

        this.input.on('gameobjectdown', this.onGameObjectDown, this);
        this.time.addEvent({
            delay: 1000, callback: this.updateGrowthTimers,
            callbackScope: this, loop: true
        });

        // Tạo viền highlight (ban đầu ẩn)
        this.selectedSeedHighlight = this.add.rectangle(0, 0, SEED_ICON_SIZE + 4, SEED_ICON_SIZE + 4)
            .setStrokeStyle(2, 0xffffff) // Viền trắng
            .setVisible(false)
            .setDepth(1); // Đảm bảo viền nằm trên icon
    }

    loadStateFromLocalStorage() {
        console.log("Attempting to load state from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);
        // *** LOAD SEED INVENTORY ***
        const savedSeedInventoryJson = localStorage.getItem(SEED_INVENTORY_STORAGE_KEY);

        // Load harvested inventory
        if (savedInventoryJson) {
            try { this.playerInventory = JSON.parse(savedInventoryJson); console.log("Loaded harvested inventory:", this.playerInventory); }
            catch (e) { console.error("Error parsing harvested inventory:", e); this.initializeHarvastInventory(); }
        } else { console.log("No harvested inventory found, initializing..."); this.initializeHarvastInventory(); }

        // *** LOAD SEED INVENTORY ***
        if (savedSeedInventoryJson) {
            try { this.playerSeedInventory = JSON.parse(savedSeedInventoryJson); console.log("Loaded seed inventory:", this.playerSeedInventory); }
            catch (e) { console.error("Error parsing seed inventory:", e); this.initializeSeedInventory(); }
        } else { console.log("No seed inventory found, initializing..."); this.initializeSeedInventory(); }


        // Load plot states
        if (savedPlotsJson) {
            try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                this.farmPlots = new Map(savedPlotDataArray.map(([key, storedState]) => [key, { ...storedState, gameObject: null }]));
                console.log(`Loaded ${this.farmPlots.size} plot states.`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
    }

    saveStateToLocalStorage() {
        try {
            // Save plots
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plot.tileX, tileY: plot.tileY, state: plot.state,
                    fruitId: plot.fruitId, growthTimer: plot.growthTimer,
                }; return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));

            // Save harvested inventory
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));

            // *** SAVE SEED INVENTORY ***
            localStorage.setItem(SEED_INVENTORY_STORAGE_KEY, JSON.stringify(this.playerSeedInventory));

        } catch (e) { console.error("Error saving state:", e); }
    }

    // Đổi tên để rõ ràng hơn
    initializeHarvastInventory() {
        this.playerInventory = {};
        ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; });
    }

    // *** KHỞI TẠO KHO HẠT GIỐNG ***
    initializeSeedInventory() {
        this.playerSeedInventory = {};
        // Cho người chơi một ít hạt giống ban đầu để bắt đầu
        ALL_FRUITS.forEach(fruit => {
            this.playerSeedInventory[fruit.id] = 5; // Ví dụ: 5 hạt mỗi loại
        });
        console.log("Initialized seed inventory:", this.playerSeedInventory);
    }


    createFarmGridAndUI() {
        console.log("Creating farm grid visuals...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                const plotX = FARM_GRID_X + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = FARM_GRID_Y + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = `${x}-${y}`;

                let plotState = this.farmPlots.get(plotKey);
                if (!plotState) {
                    plotState = { tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0, gameObject: null };
                    this.farmPlots.set(plotKey, plotState);
                }

                const plotImage = this.add.image(plotX, plotY, EMPTY_PLOT_KEY)
                    .setInteractive()
                    .setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE)
                    .setData('plotKey', plotKey) // *** QUAN TRỌNG: Đặt plotKey vào data ***
                    .setData('isPlot', true); // *** Đánh dấu đây là một ô đất ***

                plotState.gameObject = plotImage;
                this.updatePlotVisual(plotState);
            }
        }
        console.log(`Farm grid visuals created/updated for ${this.farmPlots.size} plots.`);
    }

    createUIElements() {
        this.add.text(10, 10, 'Nông Trại Ngũ Hành (Ảnh)', { fontSize: '24px', color: '#ffffff' });
        this.inventoryText = this.add.text(10, 40, 'Kho: ', { fontSize: '16px', color: '#ffffff', wordWrap: { width: this.cameras.main.width - 20 } });

        // *** TẠO UI TÚI HẠT GIỐNG ***
        this.add.text(SEED_BAG_X, SEED_BAG_Y - 25, 'Túi Hạt Giống:', { fontSize: '18px', color: '#ffffff' });
        this.seedBagUIElements.clear(); // Xóa UI cũ nếu có (phòng trường hợp gọi lại)

        ALL_FRUITS.forEach((fruit, index) => {
            const iconX = SEED_BAG_X + (SEED_ICON_SIZE + SEED_SPACING) * index + SEED_ICON_SIZE / 2;
            const iconY = SEED_BAG_Y + SEED_ICON_SIZE / 2;

            // Icon hạt giống
            const seedIcon = this.add.image(iconX, iconY, fruit.spriteKeySeed)
                .setInteractive()
                .setDisplaySize(SEED_ICON_SIZE, SEED_ICON_SIZE)
                .setData('seedId', fruit.id) // *** Lưu fruitId vào data của icon ***
                .setData('isSeedIcon', true); // *** Đánh dấu đây là icon hạt giống ***

            // Text hiển thị số lượng
            const countText = this.add.text(iconX, iconY + SEED_COUNT_TEXT_OFFSET_Y, `x${this.playerSeedInventory[fruit.id] || 0}`, {
                fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)', padding: { x: 2, y: 1 }
            }).setOrigin(0.5);

            this.seedBagUIElements.set(fruit.id, { icon: seedIcon, text: countText });
        });
    }

    // Cập nhật hiển thị kho nông sản
    updateInventoryDisplay() {
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

    // *** CẬP NHẬT HIỂN THỊ SỐ LƯỢNG HẠT GIỐNG ***
    updateSeedBagDisplay() {
        this.seedBagUIElements.forEach((elements, fruitId) => {
            const count = this.playerSeedInventory[fruitId] || 0;
            elements.text.setText(`x${count}`);
            // Làm mờ icon nếu hết hạt giống (tùy chọn)
            elements.icon.setAlpha(count > 0 ? 1 : 0.5);
        });
        // console.log("Seed bag display updated."); // Bớt log
    }


    updatePlotVisual(plotState: FarmPlot) {
        if (!plotState.gameObject) return;

        let textureKey = EMPTY_PLOT_KEY;
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;

        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    const halfway = fruitData.growthTimeSeconds / 2;
                    textureKey = (plotState.growthTimer > halfway)
                        ? fruitData.spriteKeySeed
                        : fruitData.spriteKeyGrowing;
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
        plotState.gameObject.setTexture(textureKey);
        plotState.gameObject.setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE);
    }

    // *** XỬ LÝ CLICK TỔNG QUÁT ***
    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        const isPlot = gameObject.getData('isPlot') === true;
        const isSeedIcon = gameObject.getData('isSeedIcon') === true;

        if (isSeedIcon) {
            // *** NGƯỜI DÙNG CLICK VÀO ICON HẠT GIỐNG TRONG TÚI ***
            const seedId = gameObject.getData('seedId');
            this.handleSeedSelection(seedId, gameObject as Phaser.GameObjects.Image);
        } else if (isPlot) {
            // *** NGƯỜI DÙNG CLICK VÀO Ô ĐẤT ***
            const plotKey = gameObject.getData('plotKey');
            const plotState = this.farmPlots.get(plotKey);
            if (!plotState) return;

            console.log(`Clicked plot (${plotState.tileX}, ${plotState.tileY}), state: ${plotState.state}`);

            if (plotState.state === 'empty' && this.selectedSeedId) {
                // Có hạt giống đang chọn và click vào ô trống -> Trồng cây
                this.handlePlantingWithSelection(plotState);
            } else if (plotState.state === 'growing') {
                 const fruitName = plotState.fruitId ? getFruitDataById(plotState.fruitId)?.name : 'Không rõ';
                 console.log(`Đang trồng ${fruitName}. Còn lại: ${Math.ceil(plotState.growthTimer)}s`);
                 // Có thể thêm chức năng hủy trồng ở đây nếu muốn
                 this.deselectSeed(); // Bỏ chọn hạt giống nếu click vào ô đang trồng
            } else if (plotState.state === 'ready') {
                // Click vào ô sẵn sàng -> Thu hoạch
                this.handleHarvesting(plotState);
                 this.deselectSeed(); // Bỏ chọn hạt giống sau khi thu hoạch
            } else {
                 // Click vào ô trống nhưng không chọn hạt giống
                 this.deselectSeed(); // Bỏ chọn hạt giống
                 console.log("Ô đất trống. Chọn một hạt giống từ túi để trồng.");
            }
        } else {
             // Click vào các đối tượng khác (nền, text...)
             this.deselectSeed(); // Bỏ chọn hạt giống
        }
    }

    // *** XỬ LÝ KHI CHỌN HẠT GIỐNG TỪ TÚI ***
    handleSeedSelection(seedId: string, icon: Phaser.GameObjects.Image) {
        if (this.playerSeedInventory[seedId] > 0) {
            console.log(`Selected seed: ${getFruitDataById(seedId)?.name || seedId}`);
            this.selectedSeedId = seedId;
            // Cập nhật vị trí viền highlight
            if (this.selectedSeedHighlight) {
                this.selectedSeedHighlight.setPosition(icon.x, icon.y).setVisible(true);
            }
        } else {
            console.log(`Out of ${getFruitDataById(seedId)?.name || seedId} seeds!`);
            this.deselectSeed(); // Hết hạt thì bỏ chọn luôn
        }
    }

    // *** BỎ CHỌN HẠT GIỐNG ***
    deselectSeed() {
        if (this.selectedSeedId) {
             console.log("Deselected seed");
             this.selectedSeedId = null;
        }
        if (this.selectedSeedHighlight) {
            this.selectedSeedHighlight.setVisible(false);
        }
    }


    // *** XỬ LÝ TRỒNG CÂY KHI ĐÃ CHỌN HẠT GIỐNG ***
    handlePlantingWithSelection(plotState: FarmPlot) {
        if (!this.selectedSeedId) {
            console.error("Planting attempted without selected seed.");
            return;
        }

        const selectedFruit = getFruitDataById(this.selectedSeedId);
        if (!selectedFruit) {
            console.error(`Invalid selected seed ID: ${this.selectedSeedId}`);
            this.deselectSeed();
            return;
        }

        // Kiểm tra xem còn hạt giống không
        if (this.playerSeedInventory[this.selectedSeedId] > 0) {
            // Giảm số lượng hạt giống
            this.playerSeedInventory[this.selectedSeedId]--;

            // Cập nhật trạng thái ô đất
            plotState.state = 'growing';
            plotState.fruitId = selectedFruit.id;
            plotState.growthTimer = selectedFruit.growthTimeSeconds;
            this.updatePlotVisual(plotState);

            console.log(`Planted ${selectedFruit.name} at (${plotState.tileX}, ${plotState.tileY}). Seeds left: ${this.playerSeedInventory[this.selectedSeedId]}`);

            // Cập nhật hiển thị túi hạt giống
            this.updateSeedBagDisplay();
            // Bỏ chọn hạt giống sau khi trồng thành công
            this.deselectSeed();
            // Lưu trạng thái game
            this.saveStateToLocalStorage();

        } else {
            console.log(`Cannot plant ${selectedFruit.name}, no seeds left!`);
            // Tự động bỏ chọn nếu hết hạt
            this.deselectSeed();
            // Cập nhật lại hiển thị (để icon mờ đi nếu chưa kịp)
            this.updateSeedBagDisplay();
        }
    }


    // handlePlanting cũ dùng prompt đã bị loại bỏ


    handleHarvesting(plotState: FarmPlot) {
        if (!plotState.fruitId) return;
        const fruitData = getFruitDataById(plotState.fruitId);
        if (!fruitData) return;

        const addedAmount = fruitData.harvestYield;
        this.playerInventory[fruitData.id] = (this.playerInventory[fruitData.id] || 0) + addedAmount;

        // *** CÓ THỂ THƯỞNG THÊM HẠT GIỐNG KHI THU HOẠCH (TÙY CHỌN) ***
        const seedRewardChance = 0.25; // 25% tỉ lệ nhận lại hạt giống
        if (Math.random() < seedRewardChance) {
             this.playerSeedInventory[fruitData.id] = (this.playerSeedInventory[fruitData.id] || 0) + 1;
             console.log(`Bonus! Received 1 ${fruitData.name} seed.`);
             this.updateSeedBagDisplay(); // Cập nhật hiển thị hạt giống
        }


        plotState.state = 'empty';
        plotState.fruitId = null;
        plotState.growthTimer = 0;
        this.updatePlotVisual(plotState);

        console.log(`Harvested ${addedAmount} ${fruitData.name} from (${plotState.tileX}, ${plotState.tileY}).`);
        this.updateInventoryDisplay(); // Cập nhật kho nông sản
        this.saveStateToLocalStorage();
    }

    updateGrowthTimers() {
        let stateChanged = false; // Chỉ lưu khi thực sự có thay đổi trạng thái hoặc timer
        let visualNeedsUpdate = false; // Chỉ cập nhật visual khi cần

        this.farmPlots.forEach(plot => {
            if (plot.state === 'growing' && plot.fruitId) {
                if (plot.growthTimer > 0) {
                     plot.growthTimer -= 1;
                     stateChanged = true; // Timer giảm -> state thay đổi
                     const fruitData = getFruitDataById(plot.fruitId);
                     if (!fruitData) return;

                     // Kiểm tra xem có cần đổi ảnh từ seed -> growing không
                     const halfway = fruitData.growthTimeSeconds / 2;
                     const expectedKey = (plot.growthTimer > halfway) ? fruitData.spriteKeySeed : fruitData.spriteKeyGrowing;
                     if (plot.gameObject?.texture.key !== expectedKey) {
                          visualNeedsUpdate = true;
                     }

                     // Kiểm tra xem cây đã chín chưa
                     if (plot.growthTimer <= 0) {
                          plot.state = 'ready';
                          visualNeedsUpdate = true; // Cần đổi sang ảnh ready
                          console.log(`Fruit ${fruitData.name} at (${plot.tileX}, ${plot.tileY}) is ready!`);
                     }
                }

                 // Thực hiện cập nhật hình ảnh nếu cần (chỉ gọi 1 lần nếu có thay đổi)
                 if (visualNeedsUpdate) {
                     this.updatePlotVisual(plot);
                     visualNeedsUpdate = false; // Reset cờ
                 }
            }
        });

        if (stateChanged) {
            this.saveStateToLocalStorage();
        }
    }
}