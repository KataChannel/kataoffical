    // src/app/constants.ts

    export const MAP_SIZE = 5;
    export const TILE_SIZE_PX = 32;

    export const RESOURCE_TYPES = ['metal', 'wood', 'water', 'fire', 'earth'];

    export const RESOURCE_ICONS: { [key: string]: string } = {
      metal: '💰', // Kim
      wood: '🌳', // Mộc
      water: '💧', // Thủy
      fire: '🔥', // Hỏa
      earth: '⛰️', // Thổ
    };

    export const SPIRIT_BEAST_ICONS: { [key: string]: string } = {
      spirit_metal: '🐉', // Kim Long
      spirit_wood: '🦌', // Mộc Lộc
      spirit_water: '🐢', // Thủy Quy
      spirit_fire: '🦅', // Hỏa Ưng
      spirit_earth: '🐻', // Thổ Hùng
    };

    export const SOURCE_ICONS: { [key: string]: string } = {
      metal_mine: '⛏️', // Mỏ Kim Loại
      wood_forest: '🌲', // Rừng Mộc
      water_spring: '🌊', // Suối Thủy
      fire_forge: '🌋', // Lò Hỏa
      earth_field: '🌾', // Đất Thổ
    };

    export const NGU_HANH_RELATIONS = {
      generates: {
        wood: 'fire',
        fire: 'earth',
        earth: 'metal',
        metal: 'water',
        water: 'wood',
      },
      overcomes: {
        metal: 'wood',
        wood: 'earth',
        earth: 'water',
        water: 'fire',
        fire: 'metal',
      },
      elementMap: {
        metal_mine: 'metal',
        wood_forest: 'wood',
        water_spring: 'water',
        fire_forge: 'fire',
        earth_field: 'earth',
        spirit_metal: 'metal',
        spirit_wood: 'wood',
        spirit_water: 'water',
        spirit_fire: 'fire',
        spirit_earth: 'earth',
      }
    };

    export const BASE_RESOURCE_YIELD = 10;
    export const BASE_HARVEST_COOLDOWN_MS = 10 * 1000; // 10 giây

    export const UPGRADE_COSTS = {
      source: {
        basePrimary: 50,
        baseOpposite: 20,
        multiplier: 1.5,
      },
      spiritBeast: {
        basePrimary: 40,
        baseGenerates: 15,
        multiplier: 1.4,
      }
    };

    export const SPIRIT_BEAST_BONUS_PER_LEVEL = 0.05; // 5% tăng sản lượng mỗi cấp

    // Interfaces for Game State
    export interface ResourceState {
      metal: number;
      wood: number;
      water: number;
      fire: number;
      earth: number;
    }

    export interface Tile {
      id: string;
      row: number;
      col: number;
      type: string; // 'empty', 'metal_mine', 'spirit_metal', etc.
      isDiscovered: boolean;
      isActive: boolean;
    }

    export interface Source {
      type: string; // e.g., 'metal_mine'
      level: number;
      lastHarvestTime: number; // timestamp
      cooldown: number; // in ms
      yield: number;
      isActive: boolean;
      row: number;
      col: number;
    }

    export interface SpiritBeast {
      type: string; // e.g., 'spirit_metal'
      level: number;
      bonus: number; // passive production bonus
      isActive: boolean;
      row: number;
      col: number;
    }

    export interface GameState {
      map: Tile[][];
      resources: ResourceState;
      sources: { [key: string]: Source };
      spiritBeasts: { [key: string]: SpiritBeast };
      canHarvestOtherSources: boolean;
    }

    export interface LogEntry {
      timestamp: number;
      message: string;
      type: 'info' | 'success' | 'error';
    }
    