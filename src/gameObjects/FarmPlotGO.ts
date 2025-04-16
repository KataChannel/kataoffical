// abc/gameObjects/FarmPlotGO.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById } from '../data/fruits';
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
            .setData('plotKey', `${tileX}-${tileY}`) // Lưu key để dễ truy xuất trong Scene
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
                    this.timerTextObject.setText(`${minutes}:${seconds}`).setVisible(true);
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
            console.log(`Fruit ${fruitData?.name} at (${this.tileX}, ${this.tileY}) is ready!`);
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
                this.timerTextObject.setText(`${minutes}:${seconds}`);
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
                console.log(`Planted ${fruitData.name} at (${this.tileX}, ${this.tileY}).`);
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
                console.log(`Harvested ${harvestedAmount} ${fruitData.name} from (${this.tileX}, ${this.tileY}).`);

                // Reset ô đất
                this.state = 'empty';
                this.fruitId = null;
                this.growthTimer = 0;
                this.updateVisual(); // Cập nhật hiển thị sau khi thu hoạch

                // Tính tỉ lệ nhận hạt giống bonus
                const seedRewardChance = 0.25; // 25%
                const seedReward = Math.random() < seedRewardChance;
                if (seedReward) {
                    console.log(`Bonus! Received 1 ${fruitData.name} seed.`);
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