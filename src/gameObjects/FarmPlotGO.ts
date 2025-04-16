// abc/gameObjects/FarmPlotGO.ts
import Phaser from 'phaser';
import * as config from '../config/gameConfig';
import { getFruitDataById } from '../data/fruits';
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
            .setData('plotKey', `${tileX}-${tileY}`).setData('isPlot', true).setDepth(0);

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
            this.timerTextObject.setText(`${minutes}:${seconds}`).setVisible(true);
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
            console.log(`Fruit ${fruitData?.name} at (${this.tileX}, ${this.tileY}) is ready!`);
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
                console.log(`Planted ${fruitData.name} at (${this.tileX}, ${this.tileY}).`);
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
                console.log(`Harvested ${harvestedAmount} ${fruitData.name} from (${this.tileX}, ${this.tileY}).`);
                this.state = 'empty'; this.fruitId = null; this.growthTimer = 0;
                this.updateVisual();
                const seedReward = Math.random() < 0.25;
                if (seedReward) console.log(`Bonus! Received 1 ${fruitData.name} seed.`);
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