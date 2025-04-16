// abc/services/storageService.ts
import * as config from '../config/gameConfig';
import { ALL_FRUITS } from '../data/fruits';
import { StoredFarmPlotState, PlayerInventory } from '../interfaces/fruit.interface';
import { FarmPlotGO } from '../gameObjects/FarmPlotGO';

/** Lưu trạng thái các ô đất */
export function savePlotState(farmPlots: Map<string, FarmPlotGO>): void {
    try {
        const plotsToStore: [string, StoredFarmPlotState][] = Array.from(farmPlots.entries())
            .map(([key, plotGO]) => ({
                tileX: plotGO.tileX,
                tileY: plotGO.tileY,
                state: plotGO.getState(),
                fruitId: plotGO.getFruitId(),
                growthTimer: plotGO.getGrowthTimer()
            }))
            .map((state, index) => [Array.from(farmPlots.keys())[index], state]); // Giữ key gốc

        localStorage.setItem(config.PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
    } catch (e) {
        console.error("Error saving plot states:", e);
    }
}

/** Tải trạng thái các ô đất */
export function loadPlotState(): Map<string, StoredFarmPlotState> {
    const savedPlotsJson = localStorage.getItem(config.PLOTS_STORAGE_KEY);
    const plots = new Map<string, StoredFarmPlotState>();
    if (savedPlotsJson) {
        try {
            const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
            savedPlotDataArray.forEach(([key, storedState]) => {
                if (storedState && ['empty', 'growing', 'ready'].includes(storedState.state) && typeof storedState.tileX === 'number' && typeof storedState.tileY === 'number') {
                   plots.set(key, storedState);
                } else {
                   console.warn(`Invalid state data found for plot ${key}. Skipping.`, storedState);
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

/** Lưu kho đồ */
export function saveInventory(key: string, inventory: PlayerInventory): void {
    try {
        localStorage.setItem(key, JSON.stringify(inventory));
    } catch (e) {
        console.error(`Error saving inventory [${key}]:`, e);
    }
}

/** Tải kho đồ */
export function loadInventory(key: string, initializeFunction: () => PlayerInventory): PlayerInventory {
    const savedJson = localStorage.getItem(key);
    if (savedJson) {
        try {
            const parsed = JSON.parse(savedJson);
            if (typeof parsed === 'object' && parsed !== null) {
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

/** Khởi tạo kho nông sản */
export function initializeHarvestInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 0; });
    return inventory;
}

/** Khởi tạo kho hạt giống */
export function initializeSeedInventory(): PlayerInventory {
    const inventory: PlayerInventory = {};
    ALL_FRUITS.forEach(fruit => { inventory[fruit.id] = 5; });
    console.log("Initialized seed inventory:", inventory);
    return inventory;
}

/** Reset dữ liệu game */
export function resetGameData(): void {
    localStorage.removeItem(config.PLOTS_STORAGE_KEY);
    localStorage.removeItem(config.INVENTORY_STORAGE_KEY);
    localStorage.removeItem(config.SEED_INVENTORY_STORAGE_KEY);
    console.log("Removed all game data from localStorage.");
}