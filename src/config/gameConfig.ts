// abc/config/gameConfig.ts
import Phaser from 'phaser';

export const PLOTS_STORAGE_KEY: string = 'phaserFarmGame_plots_v2';
export const INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_inventory_v2';
export const SEED_INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_seedInventory_v1';

export const TILE_SIZE: number = 100; // Kích thước ô đất logic
export const FARM_COLS: number = 5;
export const FARM_ROWS: number = 5;
export const EMPTY_PLOT_KEY: string = 'empty_plot';
export const PLOT_IMAGE_DISPLAY_SIZE: number = TILE_SIZE - 4;

export const UI_PADDING: number = 15;
export const SEED_ICON_SIZE: number = 50;
export const SEED_SPACING_VERTICAL: number = 15;
export const SEED_COUNT_TEXT_OFFSET_Y: number = 30;

export const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: { x: 3, y: 1 }
};
export const TIMER_TEXT_OFFSET_Y: number = - (TILE_SIZE / 2) + 15;

export const STATE_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: { x: 5, y: 2 },
    fontStyle: 'bold'
};

export const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#3498db',
    padding: { x: 12, y: 6 },
};