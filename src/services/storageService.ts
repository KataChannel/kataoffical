// abc/services/storageService.ts
import * as config from '../config/gameConfig';
import { ALL_FRUITS } from '../data/fruits';
import { StoredFarmPlotState, PlayerInventory } from '../interfaces/fruit.interface';
import { FarmPlotGO } from '../gameObjects/FarmPlotGO'; // Import class sẽ tạo

/**
 * Lưu trạng thái các ô đất vào localStorage.
 * @param farmPlots Map chứa các đối tượng FarmPlotGO.
 */
export function savePlotState(farmPlots: Map<string, FarmPlotGO>): void {
    try {
        // Chuyển đổi từ FarmPlotGO sang StoredFarmPlotState để lưu trữ
        const plotsToStore: [string, StoredFarmPlotState][] = Array.from(farmPlots.entries())
            .map(([key, plotGO]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plotGO.tileX,
                    tileY: plotGO.tileY,
                    state: plotGO.getState(), // Lấy state từ getter nếu có
                    fruitId: plotGO.getFruitId(), // Lấy fruitId từ getter nếu có
                    growthTimer: plotGO.getGrowthTimer() // Lấy timer từ getter nếu có
                };
                return [key, storedState];
            });
        localStorage.setItem(config.PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
    } catch (e) {
        console.error("Error saving plot states:", e);
    }
}

/**
 * Tải trạng thái các ô đất từ localStorage.
 * @returns Map chứa trạng thái đã lưu (dạng StoredFarmPlotState).
 */
export function loadPlotState(): Map<string, StoredFarmPlotState> {
    const savedPlotsJson = localStorage.getItem(config.PLOTS_STORAGE_KEY);
    const plots = new Map<string, StoredFarmPlotState>();
    if (savedPlotsJson) {
        try {
            const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
            savedPlotDataArray.forEach(([key, storedState]) => {
                // Validate state data if necessary before adding
                if (['empty', 'growing', 'ready'].includes(storedState.state)) {
                   plots.set(key, storedState);
                } else {
                   console.warn(`Invalid state "${storedState.state}" found for plot ${key}. Skipping.`)
                }
            });
            console.log(`Loaded ${plots.size} valid plot states.`);
        } catch (e) {
            console.error("Error parsing plot states:", e);
            plots.clear();
        }
    } else {
        console.log("No plot states found.");
    }
    return plots;
}

/**
 * Lưu kho đồ vào localStorage.
 * @param key Key của kho đồ.
 * @param inventory Đối tượng kho đồ.
 */
export function saveInventory(key: string, inventory: PlayerInventory): void {
    try {
        localStorage.setItem(key, JSON.stringify(inventory));
    } catch (e) {
        console.error(`Error saving inventory [${key}]:`, e);
    }
}

/**
 * Tải kho đồ từ localStorage.
 * @param key Key của kho đồ.
 * @param initializeFunction Hàm khởi tạo nếu không có dữ liệu.
 * @returns Đối tượng kho đồ.
 */
export function loadInventory(key: string, initializeFunction: () => PlayerInventory): PlayerInventory {
    const savedJson = localStorage.getItem(key);
    if (savedJson) {
        try {
            // Basic type check after parsing
            const parsed = JSON.parse(savedJson);
            if (typeof parsed === 'object' && parsed !== null) {
                 // Further validation could be added here if needed
                 return parsed as PlayerInventory;
            } else {
                 console.error(`Invalid inventory data type found for key [${key}]:`, typeof parsed);
                 return initializeFunction();
            }
        } catch (e) {
            console.error(`Error parsing inventory [${key}]:`, e);
            return initializeFunction();
        }
    } else {
        return initializeFunction();
    }
}

/** Khởi tạo kho nông sản mặc định. */
export function initializeHarvestInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 0; });
    return inventory;
}

/** Khởi tạo kho hạt giống mặc định. */
export function initializeSeedInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 5; }); // Số lượng hạt giống ban đầu
    console.log("Initialized seed inventory:", inventory);
    return inventory;
}

/** Xóa tất cả dữ liệu game đã lưu. */
export function resetGameData(): void {
    localStorage.removeItem(config.PLOTS_STORAGE_KEY);
    localStorage.removeItem(config.INVENTORY_STORAGE_KEY);
    localStorage.removeItem(config.SEED_INVENTORY_STORAGE_KEY);
    console.log("Removed all game data from localStorage.");
}