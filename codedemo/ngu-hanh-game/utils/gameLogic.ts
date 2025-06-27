import { GameState, MapData } from '../types/game';
import { generateMapContent } from './mapUtils';
import {
  MAP_SIZE,
  GAME_PHASE_INITIAL,
  GAME_PHASE_ADVANCED,
  RESOURCE_TYPES,
} from './constants';

export const initializeGame = (): GameState => {
  const initialResources: Record<string, number> = {};
  RESOURCE_TYPES.forEach((type) => {
    initialResources[type] = type === 'wood' ? 10 : 0;
  });

  const initialMapContent = generateMapContent(MAP_SIZE);
  const woodForestType = 'wood_forest';
  let woodForestTile = null;

  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      if (initialMapContent.map[r][c].hiddenType === woodForestType) {
        woodForestTile = initialMapContent.map[r][c];
        break;
      }
    }
    if (woodForestTile) break;
  }

  if (woodForestTile) {
    woodForestTile.isDiscovered = true;
    woodForestTile.isActive = true;
    woodForestTile.type = woodForestTile.hiddenType;
    initialMapContent.sources[woodForestType].isActive = true;
  }

  return {
    resources: initialResources,
    currentMapId: GAME_PHASE_INITIAL,
    maps: {
      [GAME_PHASE_INITIAL]: initialMapContent,
      [GAME_PHASE_ADVANCED]: null,
    },
    canHarvestOtherSources: false,
    unlockedTier2Upgrades: false,
    logs: [],
    lastPlayedTime: Date.now(),
    isAutoHarvestingOnLoad: false,
  };
};

export const saveGame = (gameState: GameState, isAutoHarvesting: boolean): void => {
  try {
    const serializedState = JSON.stringify({
      ...gameState,
      lastPlayedTime: Date.now(),
      isAutoHarvestingOnLoad: isAutoHarvesting,
    });
    localStorage.setItem('nguHanhGame', serializedState);
  } catch (error) {
    console.error('Lỗi khi lưu trò chơi vào localStorage:', error);
  }
};

export const loadGame = (): GameState | undefined => {
  try {
    const serializedState = localStorage.getItem('nguHanhGame');
    if (!serializedState) return undefined;

    const loadedState: GameState = JSON.parse(serializedState);
    if (!loadedState.maps[GAME_PHASE_ADVANCED]) {
      loadedState.maps[GAME_PHASE_ADVANCED] = null;
    }
    if (typeof loadedState.unlockedTier2Upgrades === 'undefined') {
      loadedState.unlockedTier2Upgrades = false;
    }

    const currentMapSources = loadedState.maps[loadedState.currentMapId]?.sources;
    if (
      currentMapSources &&
      currentMapSources.wood_forest &&
      currentMapSources.wood_forest.lastHarvestTime > 0
    ) {
      loadedState.canHarvestOtherSources = true;
    } else {
      loadedState.canHarvestOtherSources = false;
    }

    loadedState.logs = loadedState.logs || [];
    loadedState.lastPlayedTime = loadedState.lastPlayedTime || Date.now();
    loadedState.isAutoHarvestingOnLoad = loadedState.isAutoHarvestingOnLoad || false;

    return loadedState;
  } catch (error) {
    console.error('Lỗi khi tải trò chơi từ localStorage:', error);
    return undefined;
  }
};