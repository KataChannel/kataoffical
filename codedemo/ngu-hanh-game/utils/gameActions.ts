import { GameState, ActionResult, Tile, ResourceChanges } from '../types/game';
import {
  NGU_HANH_RELATIONS,
  DISCOVERY_COST_AMOUNT,
  ACTIVATION_COST_AMOUNT,
  UPGRADE_COSTS,
  MAX_LEVEL_INITIAL_TIER,
  MAX_LEVEL_FINAL,
  GAME_PHASE_INITIAL,
  GAME_PHASE_ADVANCED,
  BASE_RESOURCE_YIELD,
  BASE_HARVEST_COOLDOWN_MS,
  SPIRIT_BEAST_BONUS_PER_LEVEL,
} from './constants';

export const discoverTile = (gameState: GameState, row: number, col: number): ActionResult => {
  const { currentMapId, maps, resources } = gameState;
  const currentMapData = maps[currentMapId]!;
  const newMap = currentMapData.map.map((rowArr) => rowArr.map((tile) => ({ ...tile })));
  const newResources = { ...resources };
  const tile = newMap[row][col];

  if (tile.isDiscovered) {
    return { success: false, message: 'Ô này đã được khám phá.' };
  }

  let costType = tile.hiddenType === 'empty' ? 'wood' : NGU_HANH_RELATIONS.generates[NGU_HANH_RELATIONS.elementMap[tile.hiddenType]] || 'wood';
  const costAmount = DISCOVERY_COST_AMOUNT;

  if (newResources[costType] < costAmount) {
    return {
      success: false,
      message: `Không đủ tài nguyên để khám phá ô này. Cần ${costAmount} ${costType}.`,
    };
  }

  newResources[costType] -= costAmount;
  tile.isDiscovered = true;
  tile.type = tile.hiddenType;

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: {
        ...maps,
        [currentMapId]: { ...currentMapData, map: newMap },
      },
    },
    message: `Đã khám phá ô tại (${row}, ${col}). Mất ${costAmount} ${costType}.`,
  };
};

export const activateTile = (gameState: GameState, row: number, col: number): ActionResult => {
  const { currentMapId, maps, resources, unlockedTier2Upgrades } = gameState;
  const currentMapData = {
    map: maps[currentMapId]!.map.map((r) => r.map((t) => ({ ...t }))),
    sources: { ...maps[currentMapId]!.sources },
    spiritBeasts: { ...maps[currentMapId]!.spiritBeasts },
  };
  const newResources = { ...resources };
  const tile = currentMapData.map[row][col];

  if (!tile.isDiscovered || tile.isActive || tile.type === 'empty') {
    return { success: false, message: 'Không thể kích hoạt ô này.' };
  }

  let message = '';
  let newUnlockedTier2Upgrades = unlockedTier2Upgrades;

  if (currentMapData.sources[tile.type]) {
    const sourceResourceType = NGU_HANH_RELATIONS.elementMap[tile.type];
    const generatingResource = NGU_HANH_RELATIONS.generates[sourceResourceType];

    if (newResources[generatingResource] < ACTIVATION_COST_AMOUNT) {
      return {
        success: false,
        message: `Không đủ tài nguyên để kích hoạt. Cần ${ACTIVATION_COST_AMOUNT} ${generatingResource}.`,
      };
    }

    newResources[generatingResource] -= ACTIVATION_COST_AMOUNT;
    currentMapData.sources[tile.type].isActive = true;
    tile.isActive = true;
    message = `Đã kích hoạt nguồn ${tile.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')}! Mất ${ACTIVATION_COST_AMOUNT} ${generatingResource}.`;
  } else if (currentMapData.spiritBeasts[tile.type]) {
    currentMapData.spiritBeasts[tile.type].isActive = true;
    tile.isActive = true;
    message = `Đã kích hoạt linh thú ${tile.type.replace('spirit_', 'Linh Thú ')}!`;

    if (currentMapId === GAME_PHASE_ADVANCED && !newUnlockedTier2Upgrades) {
      const allAdvancedSpiritBeastsActive = Object.values(currentMapData.spiritBeasts).every((sb) => sb.isActive);
      if (allAdvancedSpiritBeastsActive) {
        newUnlockedTier2Upgrades = true;
        message += ' Đã mở khóa nâng cấp cấp độ tiếp theo (Lên đến cấp 20)!';
      }
    }
  }

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: { ...maps, [currentMapId]: currentMapData },
      unlockedTier2Upgrades: newUnlockedTier2Upgrades,
    },
    message,
  };
};

export const harvestSource = (gameState: GameState, sourceKey: string, isOffline: boolean = false): ActionResult => {
  const { currentMapId, maps, resources, canHarvestOtherSources } = gameState;
  const currentMapData = {
    map: maps[currentMapId]!.map,
    sources: { ...maps[currentMapId]!.sources },
    spiritBeasts: maps[currentMapId]!.spiritBeasts,
  };
  const newResources = { ...resources };
  const source = currentMapData.sources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: 'Nguồn này chưa được kích hoạt hoặc không tồn tại.',
    };
  }

  const now = Date.now();
  if (!isOffline && source.lastHarvestTime + source.cooldown > now) {
    const remainingTime = Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000);
    return {
      success: false,
      message: `Nguồn này đang hồi chiêu. Chờ ${remainingTime} giây.`,
    };
  }

  let newCanHarvestOtherSources = canHarvestOtherSources;
  if (currentMapId === GAME_PHASE_INITIAL) {
    if (sourceKey !== 'wood_forest' && !canHarvestOtherSources) {
      return { success: false, message: "Bạn phải thu hoạch 'Rừng Mộc' trước." };
    }
    if (sourceKey === 'wood_forest' && !canHarvestOtherSources) {
      newCanHarvestOtherSources = true;
    }
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const generatedResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

  let actualYield = source.yield;
  const spiritBeastType = `spirit_${primaryResourceType}`;
  if (currentMapData.spiritBeasts[spiritBeastType]?.isActive) {
    actualYield += actualYield * currentMapData.spiritBeasts[spiritBeastType].bonus;
  }
  actualYield = Math.floor(actualYield);

  const generatedYield = Math.floor(actualYield / 5);

  newResources[primaryResourceType] = (newResources[primaryResourceType] || 0) + actualYield;
  newResources[generatedResourceType] = (newResources[generatedResourceType] || 0) + generatedYield;

  source.lastHarvestTime = now;

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: { ...maps, [currentMapId]: currentMapData },
      canHarvestOtherSources: newCanHarvestOtherSources,
    },
    message: `Đã thu hoạch ${actualYield} ${primaryResourceType} và ${generatedYield} ${generatedResourceType} từ ${source.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')}!`,
    yieldedAmounts: {
      [primaryResourceType]: actualYield,
      [generatedResourceType]: generatedYield,
    },
  };
};

export const upgradeSource = (gameState: GameState, sourceKey: string): ActionResult => {
  const { currentMapId, maps, resources, unlockedTier2Upgrades } = gameState;
  const currentMapData = {
    map: maps[currentMapId]!.map,
    sources: { ...maps[currentMapId]!.sources },
    spiritBeasts: maps[currentMapId]!.spiritBeasts,
  };
  const newResources = { ...resources };
  const source = currentMapData.sources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: 'Nguồn này chưa được kích hoạt hoặc không tồn tại.',
    };
  }

  const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
  if (source.level >= maxLevelForThisUpgrade) {
    return {
      success: false,
      message: `Nguồn này đã đạt cấp tối đa (${source.level}). ${
        source.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades
          ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.'
          : ''
      }`,
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];
  const currentMultiplier =
    source.level < MAX_LEVEL_INITIAL_TIER
      ? UPGRADE_COSTS.source.multiplier
      : UPGRADE_COSTS.source.tier2Multiplier;

  const primaryCost = Math.floor(UPGRADE_COSTS.source.basePrimary * Math.pow(currentMultiplier, source.level - 1));
  const oppositeCost = Math.floor(UPGRADE_COSTS.source.baseOpposite * Math.pow(currentMultiplier, source.level - 1));

  if (newResources[primaryResourceType] < primaryCost || newResources[oppositeResourceType] < oppositeCost) {
    return {
      success: false,
      message: `Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${oppositeCost} ${oppositeResourceType}.`,
    };
  }

  newResources[primaryResourceType] -= primaryCost;
  newResources[oppositeResourceType] -= oppositeCost;

  source.level += 1;
  source.yield += BASE_RESOURCE_YIELD * 0.5;
  source.cooldown = Math.max(BASE_HARVEST_COOLDOWN_MS * 0.8, source.cooldown * 0.9);

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: { ...maps, [currentMapId]: currentMapData },
    },
    message: `Đã nâng cấp ${source.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')} lên cấp ${source.level}!`,
  };
};

export const upgradeSpiritBeast = (gameState: GameState, spiritBeastKey: string): ActionResult => {
  const { currentMapId, maps, resources, unlockedTier2Upgrades } = gameState;
  const currentMapData = {
    map: maps[currentMapId]!.map,
    sources: maps[currentMapId]!.sources,
    spiritBeasts: { ...maps[currentMapId]!.spiritBeasts },
  };
  const newResources = { ...resources };
  const spiritBeast = currentMapData.spiritBeasts[spiritBeastKey];

  if (!spiritBeast || !spiritBeast.isActive) {
    return {
      success: false,
      message: 'Linh thú này chưa được kích hoạt hoặc không tồn tại.',
    };
  }

  const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
  if (spiritBeast.level >= maxLevelForThisUpgrade) {
    return {
      success: false,
      message: `Linh thú này đã đạt cấp tối đa (${spiritBeast.level}). ${
        spiritBeast.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades
          ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.'
          : ''
      }`,
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[spiritBeast.type];
  const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];
  const currentMultiplier =
    spiritBeast.level < MAX_LEVEL_INITIAL_TIER
      ? UPGRADE_COSTS.spiritBeast.multiplier
      : UPGRADE_COSTS.spiritBeast.tier2Multiplier;

  const primaryCost = Math.floor(UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(currentMultiplier, spiritBeast.level - 1));
  const generatesCost = Math.floor(UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(currentMultiplier, spiritBeast.level - 1));

  if (newResources[primaryResourceType] < primaryCost || newResources[generatesResourceType] < generatesCost) {
    return {
      success: false,
      message: `Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${generatesCost} ${generatesResourceType}.`,
    };
  }

  newResources[primaryResourceType] -= primaryCost;
  newResources[generatesResourceType] -= generatesCost;

  spiritBeast.level += 1;
  spiritBeast.bonus += SPIRIT_BEAST_BONUS_PER_LEVEL;

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: { ...maps, [currentMapId]: currentMapData },
    },
    message: `Đã nâng cấp ${spiritBeast.type.replace('spirit_', 'Linh Thú ')} lên cấp ${spiritBeast.level}!`,
  };
};