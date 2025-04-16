// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2'; // Đổi key để tránh xung đột với phiên bản cũ
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';

const TILE_SIZE = 64;
const FARM_COLS = 5;
const FARM_ROWS = 5;
const FARM_GRID_X = 100;
const FARM_GRID_Y = 100;
const EMPTY_PLOT_KEY = 'empty_plot'; // Key cho ảnh ô đất trống
const PLOT_IMAGE_DISPLAY_SIZE = TILE_SIZE - 4; // Kích thước hiển thị cho ảnh ô đất/cây trồng

export class FarmScene extends Phaser.Scene {
    private farmPlots: Map<string, FarmPlot> = new Map();
    private playerInventory: PlayerInventory = {};
    private inventoryText!: Phaser.GameObjects.Text;

    constructor() {
        super('FarmScene');
    }

    preload() {
        console.log('FarmScene preload: Loading images...');
        // Load ảnh ô đất trống
        this.load.image(EMPTY_PLOT_KEY, `assets/${EMPTY_PLOT_KEY}.png`);

        // Load ảnh cho từng loại cây và giai đoạn
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
        this.createUIElements();
        this.input.on('gameobjectdown', this.onGameObjectDown, this);
        this.time.addEvent({
            delay: 1000, callback: this.updateGrowthTimers,
            callbackScope: this, loop: true
        });
        this.updateInventoryDisplay();
    }

    loadStateFromLocalStorage() {
        console.log("Attempting to load state v2 from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);

        if (savedInventoryJson) {
            try { this.playerInventory = JSON.parse(savedInventoryJson); console.log("Loaded inventory:", this.playerInventory); }
            catch (e) { console.error("Error parsing inventory:", e); this.initializeInventory(); }
        } else { console.log("No inventory found, initializing..."); this.initializeInventory(); }

        if (savedPlotsJson) {
             try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                this.farmPlots = new Map(savedPlotDataArray.map(([key, storedState]) => [key, { ...storedState, gameObject: null }]));
                console.log(`Loaded ${this.farmPlots.size} plot states.`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
    }

    saveStateToLocalStorage() {
        // console.log("Saving state v2 to localStorage..."); // Bớt log để đỡ rối
         try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plot.tileX, tileY: plot.tileY, state: plot.state,
                    fruitId: plot.fruitId, growthTimer: plot.growthTimer,
                }; return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));
            // console.log("State v2 saved.");
         } catch (e) { console.error("Error saving state v2:", e); }
    }

    initializeInventory() {
        this.playerInventory = {};
        ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; });
    }

    createFarmGridAndUI() {
        console.log("Creating farm grid visuals with images...");
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

                // Tạo GameObject là Image thay vì Rectangle
                // Texture ban đầu sẽ được đặt trong updatePlotVisual
                 const plotImage = this.add.image(plotX, plotY, EMPTY_PLOT_KEY) // Tạm đặt ảnh đất trống
                           .setInteractive() // Cho phép click
                           .setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE); // *** SET KÍCH THƯỚC CHUNG ***

                plotState.gameObject = plotImage;
                plotImage.setData('plotKey', plotKey);
                this.updatePlotVisual(plotState); // Cập nhật hình ảnh đúng ngay từ đầu
            }
        }
         console.log(`Farm grid visuals created/updated for ${this.farmPlots.size} plots.`);
    }

    createUIElements() {
        this.add.text(10, 10, 'Nông Trại Ngũ Hành (Ảnh)', { fontSize: '24px', color: '#ffffff' });
        this.inventoryText = this.add.text(10, 40, 'Kho: ', { fontSize: '16px', color: '#ffffff', wordWrap: { width: 780 } });
    }

    updateInventoryDisplay() {
        let text = 'Kho: ';
        let items = [];
        for (const fruitId in this.playerInventory) {
            if (this.playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(`${fruitData?.name || fruitId}: ${this.playerInventory[fruitId]}`);
            }
        }
        text += items.join(' | ') || 'Trống';
        if(this.inventoryText) { this.inventoryText.setText(text); }
    }

     // Cập nhật HÌNH ẢNH ô đất dựa trên trạng thái
    updatePlotVisual(plotState: FarmPlot) {
        if (!plotState.gameObject) return;

        let textureKey = EMPTY_PLOT_KEY; // Ảnh đất trống mặc định
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;

        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    // Sửa logic: Hiển thị ảnh hạt giống ban đầu, ảnh lớn lên sau nửa thời gian
                    const halfway = fruitData.growthTimeSeconds / 2;
                     textureKey = (plotState.growthTimer > halfway)
                           ? fruitData.spriteKeySeed     // Còn > nửa thời gian -> hạt giống
                           : fruitData.spriteKeyGrowing; // Còn <= nửa thời gian -> đang lớn
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || EMPTY_PLOT_KEY; // Ảnh chín hoặc đất trống nếu lỗi
                break;
            case 'empty':
            default:
                textureKey = EMPTY_PLOT_KEY;
                break;
        }
        // Đặt texture mới và đảm bảo kích thước hiển thị
        plotState.gameObject.setTexture(textureKey);
        plotState.gameObject.setDisplaySize(PLOT_IMAGE_DISPLAY_SIZE, PLOT_IMAGE_DISPLAY_SIZE); // *** ĐẢM BẢO KÍCH THƯỚC ***
    }

    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        const plotKey = gameObject.getData('plotKey');
        if (!plotKey) return;
        const plotState = this.farmPlots.get(plotKey);
        if (!plotState) return;
        console.log(`Clicked plot (${plotState.tileX}, ${plotState.tileY}), state: ${plotState.state}`);
        switch (plotState.state) {
            case 'empty': this.handlePlanting(plotState); break;
            case 'growing':
                 const fruitName = plotState.fruitId ? getFruitDataById(plotState.fruitId)?.name : 'Không rõ';
                 console.log(`Đang trồng ${fruitName}. Còn lại: ${Math.ceil(plotState.growthTimer)}s`);
                 break;
            case 'ready': this.handleHarvesting(plotState); break;
        }
    }

    handlePlanting(plotState: FarmPlot) {
        let choiceMessage = "Chọn cây muốn trồng:\n";
        ALL_FRUITS.forEach((fruit, index) => {
            choiceMessage += `${index + 1}. ${fruit.name} (${fruit.element} - ${fruit.growthTimeSeconds}s)\n`;
        });
        const choice = prompt(choiceMessage, "1");
        if (choice === null) return;
        const choiceIndex = parseInt(choice) - 1;
        if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= ALL_FRUITS.length) {
            alert("Lựa chọn không hợp lệ!"); return;
        }
        const selectedFruit = ALL_FRUITS[choiceIndex];
        plotState.state = 'growing';
        plotState.fruitId = selectedFruit.id;
        plotState.growthTimer = selectedFruit.growthTimeSeconds;
        this.updatePlotVisual(plotState); // Cập nhật HÌNH ẢNH (bao gồm cả set size)
        console.log(`Planted ${selectedFruit.name} at (${plotState.tileX}, ${plotState.tileY}).`);
        this.saveStateToLocalStorage();
    }

    handleHarvesting(plotState: FarmPlot) {
        if (!plotState.fruitId) return;
        const fruitData = getFruitDataById(plotState.fruitId);
        if (!fruitData) return;
        const addedAmount = fruitData.harvestYield;
        this.playerInventory[fruitData.id] = (this.playerInventory[fruitData.id] || 0) + addedAmount;
        plotState.state = 'empty';
        plotState.fruitId = null;
        plotState.growthTimer = 0;
        this.updatePlotVisual(plotState); // Cập nhật HÌNH ẢNH (bao gồm cả set size)
        console.log(`Harvested ${addedAmount} ${fruitData.name} from (${plotState.tileX}, ${plotState.tileY}).`);
        this.updateInventoryDisplay();
        this.saveStateToLocalStorage();
    }

    updateGrowthTimers() {
        let stateChanged = false;
        this.farmPlots.forEach(plot => {
            if (plot.state === 'growing' && plot.fruitId) {
                plot.growthTimer -= 1;
                stateChanged = true; // Đánh dấu có thay đổi để lưu
                const fruitData = getFruitDataById(plot.fruitId);
                if (!fruitData) return;

                // Xác định texture mong đợi dựa trên thời gian còn lại
                const halfway = fruitData.growthTimeSeconds / 2;
                 const expectedKey = (plot.growthTimer > halfway)
                       ? fruitData.spriteKeySeed
                       : fruitData.spriteKeyGrowing;

                // Chỉ cập nhật hình ảnh nếu texture hiện tại khác với mong đợi HOẶC khi cây chín
                let needsVisualUpdate = false;
                if (plot.gameObject?.texture.key !== expectedKey) {
                    needsVisualUpdate = true;
                }

                if (plot.growthTimer <= 0) {
                    plot.state = 'ready';
                    needsVisualUpdate = true; // Cần cập nhật sang ảnh 'ready'
                    console.log(`Fruit ${fruitData.name} at (${plot.tileX}, ${plot.tileY}) is ready!`);
                }

                // Thực hiện cập nhật hình ảnh nếu cần
                if (needsVisualUpdate) {
                    this.updatePlotVisual(plot);
                }
            }
        });
        if (stateChanged) {
             this.saveStateToLocalStorage();
        }
    }
}