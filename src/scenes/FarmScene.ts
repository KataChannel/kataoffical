// abc/scenes/FarmScene.ts
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
        this.load.image(config.EMPTY_PLOT_KEY, `${assetsPath}/${config.EMPTY_PLOT_KEY}.png`);
        ALL_FRUITS.forEach(fruit => {
            this.load.image(fruit.spriteKeySeed, `${assetsPath}/${fruit.spriteKeySeed}.jpg`);
            this.load.image(fruit.spriteKeyGrowing, `${assetsPath}/${fruit.spriteKeyGrowing}.jpg`);
            this.load.image(fruit.spriteKeyReady, `${assetsPath}/${fruit.spriteKeyReady}.jpg`);
            console.log(`  Loading assets for ${fruit.name}`);
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
        console.log(`Calculated Layout: ScreenW=${screenWidth}, GridX=${this.farmGridX}`);
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
                const plotKey = `${x}-${y}`;
                const initialState = savedPlotStates.get(plotKey);

                // Tạo đối tượng FarmPlotGO mới
                const plotGO = new FarmPlotGO(this, x, y, initialState);
                // Cập nhật vị trí dựa trên layout đã tính
                plotGO.updatePosition(this.farmGridX, this.farmGridY);

                this.farmPlots.set(plotKey, plotGO);
            }
        }
        console.log(`Farm grid created with ${this.farmPlots.size} plots.`);
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
                console.log(`Hết hạt ${getFruitDataById(seedId)?.name || seedId}!`);
                this.deselectSeed();
            }
        } else if (isPlot) {
            const plotKey = gameObject.getData('plotKey') as string;
            const plot = this.farmPlots.get(plotKey);
            if (!plot) return;

            console.log(`Clicked plot (${plot.tileX}, ${plot.tileY}), state: ${plot.getState()}`);

            if (plot.getState() === 'empty' && this.selectedSeedId) {
                this.handlePlanting(plot);
            } else if (plot.getState() === 'growing') {
                const fruitName = plot.getFruitId() ? getFruitDataById(plot.getFruitId()!)?.name : 'Không rõ';
                console.log(`Đang trồng ${fruitName}. Còn lại: ${Math.ceil(plot.getGrowthTimer())}s`);
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
             console.log(`Selected seed: ${getFruitDataById(seedId)?.name || seedId}`);
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