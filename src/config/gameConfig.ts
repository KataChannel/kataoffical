// abc/config/gameConfig.ts
import Phaser from 'phaser';

export const PLOTS_STORAGE_KEY: string = 'phaserFarmGame_plots_v2';
export const INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_inventory_v2';
export const SEED_INVENTORY_STORAGE_KEY: string = 'phaserFarmGame_seedInventory_v1';

export const TILE_SIZE: number = 100;
export const FARM_COLS: number = 5;
export const FARM_ROWS: number = 5;
export const EMPTY_PLOT_KEY: string = 'empty_plot';
export const PLOT_IMAGE_DISPLAY_SIZE: number = TILE_SIZE - 4;

export const UI_PADDING: number = 15;
export const SEED_ICON_SIZE: number = 50;
export const SEED_SPACING_VERTICAL: number = 15;
export const SEED_COUNT_TEXT_OFFSET_Y: number = 30;

// Giá hạt giống ví dụ (đơn vị TON) - Quản lý giá ở đây hoặc lấy từ API/Contract
export const SEED_PRICES: { [key: string]: number } = {
    'kim_lan': 0.1,
    'moc_dao': 0.15,
    'thuy_le': 0.2,
    'hoa_luu': 0.25,
    'tho_ngo': 0.3
};

export const TIMER_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '14px', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 3, y: 1 }
};
export const TIMER_TEXT_OFFSET_Y: number = - (TILE_SIZE / 2) + 15;

export const STATE_TEXT_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px', color: '#000000', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: { x: 5, y: 2 }, fontStyle: 'bold'
};

export const RESET_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '16px', color: '#ffffff', backgroundColor: '#3498db', padding: { x: 12, y: 6 },
};

export const CONNECT_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
     ...RESET_BUTTON_STYLE, backgroundColor: '#0088cc'
};

export const BUY_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
     fontSize: '10px', color: '#000', backgroundColor: '#f1c40f', padding: {x:3, y:1}
};