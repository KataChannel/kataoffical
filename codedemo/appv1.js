import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Constants (utils/constants.js) ---
const MAP_SIZE = 5; // Updated: Changed map size to 5x5
const TILE_SIZE_PX = 32; // Mỗi ô 32x32 pixel

const RESOURCE_TYPES = ['metal', 'wood', 'water', 'fire', 'earth'];

const RESOURCE_ICONS = {
  metal: '💰', // Kim
  wood: '🌳', // Mộc
  water: '💧', // Thủy
  fire: '🔥', // Hỏa
  earth: '⛰️', // Thổ
};

const SPIRIT_BEAST_ICONS = {
  spirit_metal: '🐉', // Kim Long
  spirit_wood: '🦌', // Mộc Lộc
  spirit_water: '🐢', // Thủy Quy
  spirit_fire: '🦅', // Hỏa Ưng
  spirit_earth: '🐻', // Thổ Hùng
};

const SOURCE_ICONS = {
  metal_mine: '⛏️', // Mỏ Kim Loại
  wood_forest: '🌲', // Rừng Mộc
  water_spring: '🌊', // Suối Thủy
  fire_forge: '🌋', // Lò Hỏa
  earth_field: '🌾', // Đất Thổ
};

const NGU_HANH_RELATIONS = {
  // Tương Sinh (Generates)
  generates: {
    wood: 'fire',   // Mộc sinh Hỏa
    fire: 'earth',  // Hỏa sinh Thổ
    earth: 'metal', // Thổ sinh Kim
    metal: 'water', // Kim sinh Thủy
    water: 'wood',  // Thủy sinh Mộc
  },
  // Tương Khắc (Overcomes)
  overcomes: {
    metal: 'wood',  // Kim khắc Mộc
    wood: 'earth',  // Mộc khắc Thổ
    earth: 'water', // Thổ khắc Thủy
    water: 'fire',  // Thủy khắc Hỏa
    fire: 'metal',  // Hỏa khắc Kim
  },
  // Element mapping for sources/spirit beasts to resource types
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

const BASE_RESOURCE_YIELD = 10;
const BASE_HARVEST_COOLDOWN_MS = 10 * 1000; // 10 giây

const UPGRADE_COSTS = {
  source: {
    basePrimary: 50, // Tài nguyên chính
    baseOpposite: 20, // Tài nguyên khắc
    multiplier: 1.5,
  },
  spiritBeast: {
    basePrimary: 40, // Tài nguyên chính
    baseGenerates: 15, // Tài nguyên sinh
    multiplier: 1.4,
  }
};

const SPIRIT_BEAST_BONUS_PER_LEVEL = 0.05; // 5% tăng sản lượng mỗi cấp

// --- Game Logic (utils/gameLogic.js) ---

// Helper function to get random integer
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to get icon based on tile type
const getIconForType = (type) => {
  if (RESOURCE_ICONS[type]) return RESOURCE_ICONS[type];
  if (SPIRIT_BEAST_ICONS[type]) return SPIRIT_BEAST_ICONS[type];
  if (SOURCE_ICONS[type]) return SOURCE_ICONS[type];
  return ''; // default empty
};

// --- Initial Game State ---
const initializeGame = () => {
  // Updated: Set initial resources to 50 for easier start
  const initialResources = { metal: 50, wood: 50, water: 50, fire: 50, earth: 50 };
  const initialMap = Array.from({ length: MAP_SIZE }, (_, r) =>
    Array.from({ length: MAP_SIZE }, (_, c) => ({
      id: `${r}-${c}`,
      row: r,
      col: c,
      type: 'empty',
      isDiscovered: false,
      isActive: false,
    }))
  );

  const availablePositions = [];
  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      availablePositions.push({ r, c });
    }
  }

  // Randomly place sources and spirit beasts
  const typesToPlace = [
    'metal_mine', 'wood_forest', 'water_spring', 'fire_forge', 'earth_field',
    'spirit_metal', 'spirit_wood', 'spirit_water', 'spirit_fire', 'spirit_earth'
  ];

  // Filter typesToPlace to only include types that can fit on the map (MAP_SIZE * MAP_SIZE)
  // Ensure we don't try to place more items than available tiles
  const actualTypesToPlace = typesToPlace.slice(0, Math.min(typesToPlace.length, MAP_SIZE * MAP_SIZE));


  const placedItems = {}; // To store actual items with level and cooldown
  const sources = {};
  const spiritBeasts = {};

  actualTypesToPlace.forEach(type => {
    const randomIndex = getRandomInt(0, availablePositions.length - 1);
    const { r, c } = availablePositions.splice(randomIndex, 1)[0];

    initialMap[r][c].type = type;

    if (type.includes('_mine') || type.includes('_forest') || type.includes('_spring') || type.includes('_forge') || type.includes('_field')) {
      sources[type] = {
        type: type,
        level: 1,
        lastHarvestTime: 0, // Timestamp of last harvest
        cooldown: BASE_HARVEST_COOLDOWN_MS,
        yield: BASE_RESOURCE_YIELD,
        isActive: false,
        row: r,
        col: c
      };
    } else if (type.includes('spirit_')) {
      spiritBeasts[type] = {
        type: type,
        level: 1,
        bonus: SPIRIT_BEAST_BONUS_PER_LEVEL,
        isActive: false,
        row: r,
        col: c
      };
    }
  });

  // Pre-discover and activate Metal Mine
  const metalMineType = 'metal_mine';
  let metalMineTile = null; // Initialize to null
  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      if (initialMap[r][c].type === metalMineType) {
        metalMineTile = initialMap[r][c];
        break;
      }
    }
    if (metalMineTile) break;
  }

  // If Metal Mine wasn't placed because map is too small for all 10 items,
  // find an empty spot and place it.
  if (!metalMineTile) {
      if (availablePositions.length > 0) {
          const { r, c } = availablePositions.splice(0, 1)[0];
          initialMap[r][c].type = metalMineType;
          metalMineTile = initialMap[r][c];
          sources[metalMineType] = {
              type: metalMineType,
              level: 1,
              lastHarvestTime: 0,
              cooldown: BASE_HARVEST_COOLDOWN_MS,
              yield: BASE_RESOURCE_YIELD,
              isActive: false,
              row: r,
              col: c
          };
      } else {
          // This case implies the map is so small that not even 1 tile is available after other placements
          // For a 5x5 map, this should not happen as there are 25 tiles and only 10 items.
          console.error("No available positions for Metal Mine! This indicates a problem with map generation.");
          // As a last resort, we could force place it, but for now, just log an error.
      }
  }


  if (metalMineTile) {
    metalMineTile.isDiscovered = true;
    metalMineTile.isActive = true;
    sources[metalMineType].isActive = true;
  } else {
    // Fallback if metal mine not found (should not happen with current logic for 5x5 map)
    console.error("Metal Mine still not found after fallback placement!");
  }


  return {
    map: initialMap,
    resources: initialResources,
    sources: sources,
    spiritBeasts: spiritBeasts,
    canHarvestOtherSources: false, // Player must first harvest the Metal Mine
  };
};

// --- Local Storage Functions ---
const saveGame = (gameState) => {
  try {
    const serializedState = JSON.stringify(gameState);
    localStorage.setItem('nguHanhGame', serializedState);
  } catch (error) {
    console.error("Error saving game to localStorage:", error);
  }
};

const loadGame = () => {
  try {
    const serializedState = localStorage.getItem('nguHanhGame');
    if (serializedState === null) {
      return undefined; // No saved state
    }
    const loadedState = JSON.parse(serializedState);

    // Ensure initial canHarvestOtherSources is false if loading a game where Metal Mine was already harvested
    // Or set it based on if the metal mine was ever harvested.
    if (loadedState.sources && loadedState.sources.metal_mine && loadedState.sources.metal_mine.lastHarvestTime > 0) {
      loadedState.canHarvestOtherSources = true;
    } else {
      loadedState.canHarvestOtherSources = false;
    }
    return loadedState;
  } catch (error) {
    console.error("Error loading game from localStorage:", error);
    return undefined; // Corrupted or unparseable state
  }
};

// --- Game Actions ---

const discoverTile = (gameState, row, col) => {
  const newMap = gameState.map.map(rowArr => rowArr.map(tile => ({ ...tile })));
  const newResources = { ...gameState.resources };
  const tile = newMap[row][col];

  if (tile.isDiscovered) {
    return { success: false, message: "Ô này đã được khám phá." };
  }

  let hasEnoughResources = true;
  const cost = getRandomInt(1, 5); // Chi phí ngẫu nhiên từ 1 đến 5 đơn vị cho tất cả tài nguyên

  RESOURCE_TYPES.forEach(type => {
    if (newResources[type] < cost) {
      hasEnoughResources = false;
    }
  });

  if (!hasEnoughResources) {
    return { success: false, message: `Không đủ tài nguyên để khám phá ô này. Cần ${cost} của mỗi loại.` };
  }

  RESOURCE_TYPES.forEach(type => {
    newResources[type] -= cost;
  });

  tile.isDiscovered = true;

  return {
    success: true,
    newState: {
      ...gameState,
      map: newMap,
      resources: newResources,
    },
    message: `Đã khám phá ô tại (${row}, ${col}). Mất ${cost} tài nguyên mỗi loại.`,
  };
};

const activateTile = (gameState, row, col) => {
  const newMap = gameState.map.map(rowArr => rowArr.map(tile => ({ ...tile })));
  const newSources = { ...gameState.sources };
  const newSpiritBeasts = { ...gameState.spiritBeasts };
  const tile = newMap[row][col];

  if (!tile.isDiscovered || tile.isActive || tile.type === 'empty') {
    return { success: false, message: "Không thể kích hoạt ô này." };
  }

  tile.isActive = true;
  let message = '';

  if (gameState.sources[tile.type]) { // Check against gameState.sources
    newSources[tile.type].isActive = true;
    message = `Đã kích hoạt nguồn ${tile.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')}!`;
  } else if (gameState.spiritBeasts[tile.type]) { // Check against gameState.spiritBeasts
    newSpiritBeasts[tile.type].isActive = true;
    message = `Đã kích hoạt linh thú ${tile.type.replace('spirit_', 'Linh Thú ')}!`;
  }

  return {
    success: true,
    newState: {
      ...gameState,
      map: newMap,
      sources: newSources,
      spiritBeasts: newSpiritBeasts,
    },
    message: message,
  };
};

const harvestSource = (gameState, sourceKey) => {
  const newSources = { ...gameState.sources };
  const newResources = { ...gameState.resources };
  const source = newSources[sourceKey];

  if (!source || !source.isActive) {
    return { success: false, message: "Nguồn này chưa được kích hoạt hoặc không tồn tại." };
  }

  const now = Date.now();
  if (source.lastHarvestTime + source.cooldown > now) {
    const remainingTime = Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000);
    return { success: false, message: `Nguồn này đang hồi chiêu. Chờ ${remainingTime} giây.` };
  }

  // Check if Metal Mine has been harvested if it's not the metal mine itself
  let canHarvestOthers = gameState.canHarvestOtherSources;
  if (sourceKey !== 'metal_mine' && !canHarvestOthers) {
    return { success: false, message: "Bạn phải thu hoạch 'Mỏ Kim Loại' trước." };
  }
  
  if (sourceKey === 'metal_mine' && !canHarvestOthers) {
    canHarvestOthers = true; // Set to true after the first metal mine harvest
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const generatedResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

  // Calculate yield including spirit beast bonus
  let actualYield = source.yield;
  const spiritBeastType = `spirit_${primaryResourceType}`;
  if (gameState.spiritBeasts[spiritBeastType] && gameState.spiritBeasts[spiritBeastType].isActive) {
    actualYield += actualYield * gameState.spiritBeasts[spiritBeastType].bonus;
  }
  actualYield = Math.floor(actualYield); // Ensure integer yield

  newResources[primaryResourceType] = (newResources[primaryResourceType] || 0) + actualYield;
  newResources[generatedResourceType] = (newResources[generatedResourceType] || 0) + Math.floor(actualYield / 5); // 20% sinh ra

  source.lastHarvestTime = now;

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      sources: newSources,
      canHarvestOtherSources: canHarvestOthers,
    },
    message: `Đã thu hoạch ${actualYield} ${primaryResourceType} và ${Math.floor(actualYield / 5)} ${generatedResourceType} từ ${source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')}!`,
  };
};

const upgradeSource = (gameState, sourceKey) => {
  const newSources = { ...gameState.sources };
  const newResources = { ...gameState.resources };
  const source = newSources[sourceKey];

  if (!source || !source.isActive) {
    return { success: false, message: "Nguồn này chưa được kích hoạt hoặc không tồn tại." };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];

  const primaryCost = Math.floor(UPGRADE_COSTS.source.basePrimary * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));
  const oppositeCost = Math.floor(UPGRADE_COSTS.source.baseOpposite * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));

  if (newResources[primaryResourceType] < primaryCost || newResources[oppositeResourceType] < oppositeCost) {
    return { success: false, message: `Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${oppositeCost} ${oppositeResourceType}.` };
  }

  newResources[primaryResourceType] -= primaryCost;
  newResources[oppositeResourceType] -= oppositeCost;

  source.level += 1;
  source.yield += BASE_RESOURCE_YIELD * 0.5; // Tăng 50% sản lượng mỗi cấp
  source.cooldown = Math.max(BASE_HARVEST_COOLDOWN_MS * 0.8, source.cooldown * 0.9); // Giảm 10% cooldown, tối thiểu 80% ban đầu

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      sources: newSources,
    },
    message: `Đã nâng cấp ${source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')} lên cấp ${source.level}!`,
  };
};

const upgradeSpiritBeast = (gameState, spiritBeastKey) => {
  const newSpiritBeasts = { ...gameState.spiritBeasts };
  const newResources = { ...gameState.resources };
  const spiritBeast = newSpiritBeasts[spiritBeastKey];

  if (!spiritBeast || !spiritBeast.isActive) {
    return { success: false, message: "Linh thú này chưa được kích hoạt hoặc không tồn tại." };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[spiritBeast.type];
  const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

  const primaryCost = Math.floor(UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1));
  const generatesCost = Math.floor(UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1));

  if (newResources[primaryResourceType] < primaryCost || newResources[generatesResourceType] < generatesCost) {
    return { success: false, message: `Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${generatesCost} ${generatesResourceType}.` };
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
      spiritBeasts: newSpiritBeasts,
    },
    message: `Đã nâng cấp ${spiritBeast.type.replace('spirit_', 'Linh Thú ')} lên cấp ${spiritBeast.level}!`,
  };
};

// --- Components ---

// NotificationSystem.js (for temporary pop-up notifications)
const NotificationSystem = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1)); // Remove the first notification after some time
      }, 3000); // Notifications disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg shadow-md text-sm ${
            notif.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          } text-white animate-fade-in-up`}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
};

// ResourcePanel.js
const ResourcePanel = ({ resources }) => {
  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold mb-3 text-yellow-300">Tài Nguyên</h3>
      <div className="grid grid-cols-2 gap-2 text-lg">
        {RESOURCE_TYPES.map(type => (
          <div key={type} className="flex items-center space-x-2 p-1 bg-gray-600 rounded-md">
            <span className="text-2xl">{RESOURCE_ICONS[type]}</span>
            <span className="capitalize font-medium">{type}:</span>
            <span className="font-bold text-green-300">{resources[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tile.js
const Tile = ({ tile, onClick }) => {
  const { row, col, type, isDiscovered, isActive } = tile;

  const icon = getIconForType(type);
  const isSpecialTile = type !== 'empty'; // Check if it's a resource or spirit beast

  return (
    <div
      className={`relative border border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-200
                  ${isDiscovered ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'}
                  ${isActive && isSpecialTile ? 'bg-green-700' : ''}
                  rounded-md`}
      style={{ width: TILE_SIZE_PX, height: TILE_SIZE_PX }}
      onClick={() => onClick(row, col)}
    >
      {isDiscovered ? (
        isSpecialTile && (
          <span
            className="text-xl"
            style={{ filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)' }}
          >
            {icon}
          </span>
        )
      ) : (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center text-xs text-gray-400">
          ?
        </div>
      )}
    </div>
  );
};

// Map.js
const Map = ({ map, onTileClick }) => {
  return (
    <div
      className="grid gap-0.5 p-2 bg-gray-700 rounded-lg shadow-inner"
      style={{
        gridTemplateColumns: `repeat(${MAP_SIZE}, ${TILE_SIZE_PX}px)`,
        gridTemplateRows: `repeat(${MAP_SIZE}, ${TILE_SIZE_PX}px)`,
      }}
    >
      {map.map(row => (
        row.map(tile => (
          <Tile key={tile.id} tile={tile} onClick={onTileClick} />
        ))
      ))}
    </div>
  );
};

// SourcePanel.js
const SourcePanel = ({ sources, onHarvest, onUpgrade, canHarvestOtherSources, resources }) => {
  const sortedSources = Object.values(sources).sort((a, b) => a.type.localeCompare(b.type));

  const getUpgradeCosts = useCallback((source) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
    const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];
    const primaryCost = Math.floor(UPGRADE_COSTS.source.basePrimary * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));
    const oppositeCost = Math.floor(UPGRADE_COSTS.source.baseOpposite * Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1));
    return { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost };
  }, []);


  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold mb-3 text-cyan-300">Nguồn Tài Nguyên</h3>
      <div className="flex flex-col gap-3">
        {sortedSources.map(source => {
          const { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost } = getUpgradeCosts(source);
          const canUpgrade = resources[primaryResourceType] >= primaryCost && resources[oppositeResourceType] >= oppositeCost;
          const now = Date.now();
          const cooldownRemaining = source.lastHarvestTime + source.cooldown > now ?
            Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000) : 0;
          const canHarvest = cooldownRemaining === 0 && source.isActive && (source.type === 'metal_mine' || canHarvestOtherSources);

          return (
            <div key={source.type} className="bg-gray-600 p-3 rounded-md flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold flex items-center gap-1">
                  {SOURCE_ICONS[source.type]} {source.type.replace('_', ' ').replace('mine', 'Mỏ').replace('forest', 'Rừng').replace('spring', 'Suối').replace('forge', 'Lò').replace('field', 'Đất')} (Cấp {source.level})
                </span>
                {source.isActive ? (
                  <span className="text-green-400 text-sm">Kích hoạt</span>
                ) : (
                  <span className="text-red-400 text-sm">Chưa Kích hoạt</span>
                )}
              </div>
              <p className="text-sm">Sản lượng: {Math.floor(source.yield)} {primaryResourceType} + {Math.floor(source.yield / 5)} {NGU_HANH_RELATIONS.generates[primaryResourceType]}</p>
              <p className="text-sm">Hồi chiêu: {Math.ceil(source.cooldown / 1000)} giây</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onHarvest(source.type)}
                  disabled={!canHarvest}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200
                              ${canHarvest ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                >
                  {cooldownRemaining > 0 ? `Thu hoạch (${cooldownRemaining}s)` : 'Thu hoạch'}
                </button>
                <button
                  onClick={() => onUpgrade(source.type)}
                  disabled={!canUpgrade || !source.isActive}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200
                              ${canUpgrade && source.isActive ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
                >
                  Nâng cấp
                </button>
              </div>
              {!canUpgrade && source.isActive && (
                <p className="text-xs text-red-300 mt-1">
                  Cần: {primaryCost} {primaryResourceType}, {oppositeCost} {oppositeResourceType}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// SpiritBeastPanel.js
const SpiritBeastPanel = ({ spiritBeasts, onUpgrade, resources }) => {
  const sortedSpiritBeasts = Object.values(spiritBeasts).sort((a, b) => a.type.localeCompare(b.type));

  const getUpgradeCosts = useCallback((beast) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
    const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];
    const primaryCost = Math.floor(UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, beast.level - 1));
    const generatesCost = Math.floor(UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, beast.level - 1));
    return { primaryResourceType, generatesResourceType, primaryCost, generatesCost };
  }, []);

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold mb-3 text-orange-300">Linh Thú</h3>
      <div className="flex flex-col gap-3">
        {sortedSpiritBeasts.map(beast => {
          const { primaryResourceType, generatesResourceType, primaryCost, generatesCost } = getUpgradeCosts(beast);
          const canUpgrade = resources[primaryResourceType] >= primaryCost && resources[generatesResourceType] >= generatesCost;

          return (
            <div key={beast.type} className="bg-gray-600 p-3 rounded-md flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold flex items-center gap-1">
                  {SPIRIT_BEAST_ICONS[beast.type]} {beast.type.replace('spirit_', 'Linh Thú ')} (Cấp {beast.level})
                </span>
                {beast.isActive ? (
                  <span className="text-green-400 text-sm">Kích hoạt</span>
                ) : (
                  <span className="text-red-400 text-sm">Chưa Kích hoạt</span>
                )}
              </div>
              <p className="text-sm">Thưởng sản lượng: {(beast.bonus * 100).toFixed(0)}% {primaryResourceType}</p>
              <button
                onClick={() => onUpgrade(beast.type)}
                disabled={!canUpgrade || !beast.isActive}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 mt-2
                            ${canUpgrade && beast.isActive ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
              >
                Nâng cấp
              </button>
              {!canUpgrade && beast.isActive && (
                <p className="text-xs text-red-300 mt-1">
                  Cần: {primaryCost} {primaryResourceType}, {generatesCost} {generatesResourceType}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ActivityLog.js (New Component for real-time logs)
const ActivityLog = ({ logs }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new logs are added
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    // FIX: Removed max-h-64 and lg:max-h-96 to allow flex-grow to manage height dynamically.
    // Added flex-1 to allow it to take up available space in the flex column.
    <div className="w-full lg:w-1/4 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-white">Nhật Ký Hoạt Động</h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar"> {/* Updated classes here */}
        {logs.map((log, index) => (
          <p key={index} className={`text-xs mb-1 ${
            log.type === 'error' ? 'text-red-300' :
            log.type === 'success' ? 'text-green-300' : 'text-gray-300'
          }`}>
            <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
          </p>
        ))}
        <div ref={logEndRef} /> {/* Dummy div to scroll to */}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
    </div>
  );
};


// --- App.js ---
function App() {
  const [gameState, setGameState] = useState(() => {
    // Tải trạng thái từ localStorage khi khởi động, nếu không có thì khởi tạo mới
    const savedState = loadGame();
    return savedState || initializeGame();
  });
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isAutoHarvesting, setIsAutoHarvesting] = useState(false);

  // Hàm để thêm thông báo tạm thời và log vào nhật ký
  const addLog = useCallback((message, type = 'info') => {
    const logEntry = { timestamp: Date.now(), message, type };
    setNotifications(prev => [...prev, logEntry]); // For temporary notifications
    setLogs(prev => [...prev, logEntry]); // For persistent activity log
  }, []);

  useEffect(() => {
    // Lưu trạng thái vào localStorage mỗi khi gameState thay đổi
    saveGame(gameState);
  }, [gameState]);

  // Logic tự động thu hoạch
  const performAutoHarvest = useCallback(() => {
    setGameState(prevGameState => {
      let currentGameState = { ...prevGameState };
      let harvestedCount = 0;

      for (const sourceKey in currentGameState.sources) {
        const source = currentGameState.sources[sourceKey];
        const now = Date.now();

        const canHarvest = source.isActive &&
                           (source.lastHarvestTime + source.cooldown <= now) &&
                           (source.type === 'metal_mine' || currentGameState.canHarvestOtherSources);

        if (canHarvest) {
          const harvestResult = harvestSource(currentGameState, sourceKey);
          if (harvestResult.success) {
            currentGameState = harvestResult.newState; // Update state with harvest results
            addLog(harvestResult.message, 'success');
            harvestedCount++;
          }
        }
      }

      // Return new state only if changes occurred to avoid unnecessary renders
      return harvestedCount > 0 ? currentGameState : prevGameState;
    });
  }, [addLog]);

  // Effect để khởi tạo/hủy interval tự động thu hoạch
  useEffect(() => {
    let intervalId;
    if (isAutoHarvesting) {
      intervalId = setInterval(() => {
        performAutoHarvest();
      }, 1000); // Thử thu hoạch tự động mỗi 1 giây
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoHarvesting, performAutoHarvest]);


  const handleTileClick = useCallback((row, col) => {
    const tile = gameState.map[row][col];

    if (!tile.isDiscovered) {
      // Khám phá ô mới
      const result = discoverTile(gameState, row, col);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, 'info');
      } else {
        addLog(result.message, 'error');
      }
    } else if (tile.isDiscovered && !tile.isActive && (tile.type !== 'empty')) {
      // Kích hoạt nguồn/linh thú đã khám phá
      const result = activateTile(gameState, row, col);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, 'success');
      } else {
        addLog(result.message, 'error');
      }
    }
  }, [gameState, addLog]);

  const handleHarvest = useCallback((sourceId) => {
    const result = harvestSource(gameState, sourceId);
    if (result.success) {
      setGameState(result.newState);
      addLog(result.message, 'success');
    } else {
      addLog(result.message, 'error');
    }
  }, [gameState, addLog]);

  const handleUpgradeSource = useCallback((sourceId) => {
    const result = upgradeSource(gameState, sourceId);
    if (result.success) {
      setGameState(result.newState);
      addLog(result.message, 'success');
    } else {
      addLog(result.message, 'error');
    }
  }, [gameState, addLog]);

  const handleUpgradeSpiritBeast = useCallback((spiritBeastId) => {
    const result = upgradeSpiritBeast(gameState, spiritBeastId);
    if (result.success) {
      setGameState(result.newState);
      addLog(result.message, 'success');
    } else {
      addLog(result.message, 'error');
    }
  }, [gameState, addLog]);

  const toggleAutoHarvest = () => {
    setIsAutoHarvesting(prev => !prev);
    addLog(isAutoHarvesting ? "Đã tắt chế độ thu hoạch tự động." : "Đã bật chế độ thu hoạch tự động.", "info");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      <style>{`
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <h1 className="text-5xl font-extrabold mb-8 text-yellow-500 drop-shadow-lg">Ngũ Hành Khám Phá</h1>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
        {/* Resource Panel & Auto Harvest Button */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <ResourcePanel resources={gameState.resources} />
            <button
              onClick={toggleAutoHarvest}
              className={`mt-4 w-full px-4 py-2 rounded-lg text-lg font-bold transition-colors duration-200 shadow-lg
                          ${isAutoHarvesting ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'} text-white`}
            >
              {isAutoHarvesting ? 'Tắt Thu Hoạch Tự Động' : 'Bật Thu Hoạch Tự Động'}
            </button>
          </div>
          {/* Activity Log */}
          <ActivityLog logs={logs} />
        </div>

        {/* Map and Game Area */}
        <div className="w-full lg:w-2/4 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">Bản Đồ Khám Phá</h2>
          <Map map={gameState.map} onTileClick={handleTileClick} />
          <p className="text-sm text-gray-400 mt-4 text-center">
            Nhấp vào ô chưa khám phá để lộ diện. Nhấp lần thứ hai vào ô đã khám phá để kích hoạt nguồn/linh thú.
          </p>
        </div>

        {/* Source and Spirit Beast Panels */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <SourcePanel
              sources={gameState.sources}
              onHarvest={handleHarvest}
              onUpgrade={handleUpgradeSource}
              canHarvestOtherSources={gameState.canHarvestOtherSources}
              resources={gameState.resources}
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <SpiritBeastPanel
              spiritBeasts={gameState.spiritBeasts}
              onUpgrade={handleUpgradeSpiritBeast}
              resources={gameState.resources}
            />
          </div>
        </div>
      </div>

      <NotificationSystem notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}

export default App;
