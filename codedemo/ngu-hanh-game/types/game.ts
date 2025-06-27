export interface Tile {
  id: string;
  row: number;
  col: number;
  type: string;
  isDiscovered: boolean;
  isActive: boolean;
  hiddenType: string;
}

export interface Source {
  type: string;
  level: number;
  lastHarvestTime: number;
  cooldown: number;
  yield: number;
  isActive: boolean;
  row: number;
  col: number;
}

export interface SpiritBeast {
  type: string;
  level: number;
  bonus: number;
  isActive: boolean;
  row: number;
  col: number;
}

export interface MapData {
  map: Tile[][];
  sources: Record<string, Source>;
  spiritBeasts: Record<string, SpiritBeast>;
}

export interface GameState {
  resources: Record<string, number>;
  currentMapId: string;
  maps: Record<string, MapData | null>;
  canHarvestOtherSources: boolean;
  unlockedTier2Upgrades: boolean;
  logs: LogEntry[];
  lastPlayedTime: number;
  isAutoHarvestingOnLoad: boolean;
}

export interface LogEntry {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface ResourceChanges {
  [key: string]: number;
}

export interface ActionResult {
  success: boolean;
  message: string;
  newState?: GameState;
  yieldedAmounts?: ResourceChanges;
}