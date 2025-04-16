// abc/scenes/FarmScene.ts
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
        this.load.image(config.EMPTY_PLOT_KEY, `${assetsPath}/${config.EMPTY_PLOT_KEY}.png`);
        ALL_FRUITS.forEach(fruit => {
            if (fruit.spriteKeySeed) this.load.image(fruit.spriteKeySeed, `${assetsPath}/${fruit.spriteKeySeed}.jpg`);
            if (fruit.spriteKeyGrowing) this.load.image(fruit.spriteKeyGrowing, `${assetsPath}/${fruit.spriteKeyGrowing}.jpg`);
            if (fruit.spriteKeyReady) this.load.image(fruit.spriteKeyReady, `${assetsPath}/${fruit.spriteKeyReady}.jpg`);
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
                const plotKey = `${x}-${y}`;
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
         console.log(`Clicked plot (${plot.tileX}, ${plot.tileY}), state: ${plotState}`);

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
                console.log(`Selected seed: ${fruitName}`);
                this.selectedSeedId = seedId;
                this.uiManager.selectSeed(icon);
            } else { this.deselectSeed(); }
        } else {
             const fruitName = getFruitDataById(seedId)?.name || seedId;
             console.log(`Hết hạt ${fruitName}!`);
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

        console.log(`Attempting to buy ${fruitName} for ${priceTON} TON`);
        this.uiManager.showConfirmationDialog(`Xác nhận mua hạt ${fruitName} (${priceTON} TON)?`, async () => {
            const body = beginCell().storeUint(0, 32).storeStringTail(`Buy ${seedId}`).endCell();
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
                     `Giao dịch mua ${fruitName} đã gửi. Vui lòng chờ xác nhận trên mạng TON. Hạt giống sẽ được cộng sau.`,
                     ()=>{}, ()=>{}
                 );

                 // ---------> PHẦN GIẢ ĐỊNH (CHỈ DEMO) <---------
                 setTimeout(() => {
                     console.warn(`(DEMO ONLY - ASSUMPTION) Transaction confirmed for ${seedId}. Adding seed.`);
                     this.playerSeedInventory[seedId] = (this.playerSeedInventory[seedId] || 0) + 1;
                     this.uiManager.updateSeedBagDisplay(this.playerSeedInventory);
                     this.saveState();
                     this.uiManager.showConfirmationDialog(`Đã nhận được hạt giống ${fruitName}!`, ()=>{}, ()=>{});
                 }, 20000); // Chờ 20s (ví dụ)
                 // ---------> KẾT THÚC PHẦN GIẢ ĐỊNH <---------

            } catch (error: unknown) { // Use unknown for type safety
                console.error('Transaction failed:', error);
                 let message = 'Giao dịch mua hạt giống thất bại.';
                 if (error instanceof Error) { message += ` ${error.message}`; }
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