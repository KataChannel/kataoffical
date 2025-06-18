import React, { useState, useEffect, useCallback, useRef } from "react";

// --- Constants (utils/constants.js) ---
const MAP_SIZE = 10; // Updated: Map size 10x10
const TILE_SIZE_PX = 32; // Each tile is 32x32 pixels

const RESOURCE_TYPES = ["metal", "wood", "water", "fire", "earth"];

const RESOURCE_ICONS = {
  metal: "💰", // Kim
  wood: "🌳", // Mộc
  water: "💧", // Thủy
  fire: "🔥", // Hỏa
  earth: "⛰️", // Thổ
};

const SPIRIT_BEAST_ICONS = {
  spirit_metal: "🐉", // Kim Long
  spirit_wood: "🦌", // Mộc Lộc
  spirit_water: "🐢", // Thủy Quy
  spirit_fire: "🦅", // Hỏa Ưng
  spirit_earth: "🐻", // Thổ Hùng
};

const SOURCE_ICONS = {
  metal_mine: "⛏️", // Mỏ Kim Loại
  wood_forest: "🌲", // Rừng Mộc
  water_spring: "🌊", // Suối Thủy
  fire_forge: "🌋", // Lò Hỏa
  earth_field: "🌾", // Đất Thổ
};

const NGU_HANH_RELATIONS = {
  // Tương Sinh (Generates)
  generates: {
    wood: "fire", // Mộc sinh Hỏa
    fire: "earth", // Hỏa sinh Thổ
    earth: "metal", // Thổ sinh Kim
    metal: "water", // Kim sinh Thủy
    water: "wood", // Thủy sinh Mộc
  },
  // Tương Khắc (Overcomes)
  overcomes: {
    metal: "wood", // Kim khắc Mộc
    wood: "earth", // Mộc khắc Thổ
    earth: "water", // Thổ khắc Thủy
    water: "fire", // Thủy khắc Hỏa
    fire: "metal", // Hỏa khắc Kim
  },
  // Element mapping for sources/spirit beasts to resource types
  elementMap: {
    metal_mine: "metal",
    wood_forest: "wood",
    water_spring: "water",
    fire_forge: "fire",
    earth_field: "earth",
    spirit_metal: "metal",
    spirit_wood: "wood",
    spirit_water: "water",
    spirit_fire: "fire",
    spirit_earth: "earth",
  },
};

// New constant for tile background colors based on element
const ELEMENT_TILE_BG_COLORS = {
  metal: "bg-gray-500", // Kim
  wood: "bg-lime-700", // Mộc
  water: "bg-blue-700", // Thủy
  fire: "bg-red-700", // Hỏa
  earth: "bg-amber-700", // Thổ
  empty: "bg-gray-800", // Default for discovered empty tile
};

const BASE_RESOURCE_YIELD = 10;
const BASE_HARVEST_COOLDOWN_MS = 10 * 1000; // 10 giây

const UPGRADE_COSTS = {
  source: {
    basePrimary: 50, // Tài nguyên chính
    baseOpposite: 20, // Tài nguyên khắc
    multiplier: 1.5,
    tier2Multiplier: 1.8, // Higher multiplier for levels 11-20
  },
  spiritBeast: {
    basePrimary: 40, // Tài nguyên chính
    baseGenerates: 15, // Tài nguyên sinh
    multiplier: 1.4,
    tier2Multiplier: 1.7, // Higher multiplier for levels 11-20
  },
};

const SPIRIT_BEAST_BONUS_PER_LEVEL = 0.05; // 5% tăng sản lượng mỗi cấp

// New constants for discovery and activation costs
const DISCOVERY_COST_AMOUNT = 5; // Số lượng tài nguyên cần để khám phá ô

const ACTIVATION_COST_AMOUNT = 5; // Số lượng tài nguyên tương sinh cần để kích hoạt nguồn

// New game progression constants
const MAX_LEVEL_INITIAL_TIER = 10;
const MAX_LEVEL_FINAL = 20;
const GAME_PHASE_INITIAL = 'initial';
const GAME_PHASE_ADVANCED = 'advanced';


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
  return ""; // default empty
};

// Helper function to generate map content (map grid, sources, spirit beasts)
const generateMapContent = (size) => {
  const newMap = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => ({
      id: `${r}-${c}`,
      row: r,
      col: c,
      type: "undiscovered",
      isDiscovered: false,
      isActive: false,
      hiddenType: "empty",
    }))
  );

  const availablePositions = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      availablePositions.push({ r, c });
    }
  }

  const typesToPlace = [
    "metal_mine", "wood_forest", "water_spring", "fire_forge", "earth_field",
    "spirit_metal", "spirit_wood", "spirit_water", "spirit_fire", "spirit_earth",
  ];

  const sources = {};
  const spiritBeasts = {};

  // Place initial sources and spirit beasts randomly
  typesToPlace.forEach((type) => {
    if (availablePositions.length === 0) return; // Prevent error if map is too small
    const randomIndex = getRandomInt(0, availablePositions.length - 1);
    const { r, c } = availablePositions.splice(randomIndex, 1)[0];

    newMap[r][c].hiddenType = type;

    if (type.includes("_mine") || type.includes("_forest") || type.includes("_spring") || type.includes("_forge") || type.includes("_field")) {
      sources[type] = {
        type: type,
        level: 1,
        lastHarvestTime: 0,
        cooldown: BASE_HARVEST_COOLDOWN_MS,
        yield: BASE_RESOURCE_YIELD,
        isActive: false,
        row: r,
        col: c,
      };
    } else if (type.includes("spirit_")) {
      spiritBeasts[type] = {
        type: type,
        level: 1,
        bonus: SPIRIT_BEAST_BONUS_PER_LEVEL,
        isActive: false,
        row: r,
        col: c,
      };
    }
  });

  return { map: newMap, sources, spiritBeasts };
};

// --- Initial Game State ---
const initializeGame = () => {
  const initialResources = { metal: 0, wood: 10, water: 0, fire: 0, earth: 0 };

  const initialMapContent = generateMapContent(MAP_SIZE);

  // Pre-discover and activate Wood Forest for the initial map
  const woodForestType = "wood_forest";
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

  // Fallback if woodForestType wasn't placed initially (shouldn't happen with 10x10 map and 10 items)
  if (!woodForestTile && initialMapContent.availablePositions && initialMapContent.availablePositions.length > 0) {
    const { r, c } = initialMapContent.availablePositions.splice(0, 1)[0];
    initialMapContent.map[r][c].hiddenType = woodForestType;
    woodForestTile = initialMapContent.map[r][c];
    initialMapContent.sources[woodForestType] = {
      type: woodForestType,
      level: 1,
      lastHarvestTime: 0,
      cooldown: BASE_HARVEST_COOLDOWN_MS,
      yield: BASE_RESOURCE_YIELD,
      isActive: false,
      row: r,
      col: c,
    };
  }

  if (woodForestTile) {
    woodForestTile.isDiscovered = true;
    woodForestTile.isActive = true;
    initialMapContent.sources[woodForestType].isActive = true;
    woodForestTile.type = woodForestTile.hiddenType;
  } else {
    console.error("Wood Forest still not found after fallback placement!");
  }

  return {
    resources: initialResources,
    currentMapId: GAME_PHASE_INITIAL,
    maps: {
      [GAME_PHASE_INITIAL]: {
        map: initialMapContent.map,
        sources: initialMapContent.sources,
        spiritBeasts: initialMapContent.spiritBeasts,
      },
      [GAME_PHASE_ADVANCED]: null, // Advanced map is initially null
    },
    canHarvestOtherSources: false, // Player must first harvest the Wood Forest
    unlockedTier2Upgrades: false, // Initially false
    logs: [],
    lastPlayedTime: Date.now(), // Thêm thời gian chơi cuối cùng
    isAutoHarvestingOnLoad: false, // Trạng thái auto harvest khi lưu game
  };
};

// --- Local Storage Functions ---
const saveGame = (gameState, isAutoHarvesting) => { // Thêm isAutoHarvesting làm tham số
  try {
    const serializedState = JSON.stringify({
      ...gameState,
      lastPlayedTime: Date.now(), // Cập nhật thời gian chơi cuối cùng
      isAutoHarvestingOnLoad: isAutoHarvesting, // Lưu trạng thái auto harvest
    });
    localStorage.setItem("nguHanhGame", serializedState);
  } catch (error) {
    console.error("Lỗi khi lưu trò chơi vào localStorage:", error);
  }
};

const loadGame = () => {
  try {
    const serializedState = localStorage.getItem("nguHanhGame");
    if (serializedState === null) {
      return undefined; // Không có trạng thái đã lưu
    }
    const loadedState = JSON.parse(serializedState);

    // Ensure `maps.advanced` is initialized to null if not present in old save
    if (!loadedState.maps[GAME_PHASE_ADVANCED]) {
      loadedState.maps[GAME_PHASE_ADVANCED] = null;
    }
    // Ensure `unlockedTier2Upgrades` is initialized to false if not present in old save
    if (typeof loadedState.unlockedTier2Upgrades === 'undefined') {
      loadedState.unlockedTier2Upgrades = false;
    }

    // Đảm bảo canHarvestOtherSources ban đầu là false nếu đang tải một trò chơi mà Rừng Mộc đã được thu hoạch
    const currentMapSources = loadedState.maps[loadedState.currentMapId]?.sources;
    if (currentMapSources && currentMapSources.wood_forest && currentMapSources.wood_forest.lastHarvestTime > 0) {
      loadedState.canHarvestOtherSources = true;
    } else {
      loadedState.canHarvestOtherSources = false;
    }
    loadedState.logs = loadedState.logs || []; // Ensure logs array exists, even if empty
    loadedState.lastPlayedTime = loadedState.lastPlayedTime || Date.now(); // Khởi tạo nếu không có
    loadedState.isAutoHarvestingOnLoad = loadedState.isAutoHarvestingOnLoad || false; // Khởi tạo nếu không có

    return loadedState;
  } catch (error) {
    console.error("Lỗi khi tải trò chơi từ localStorage:", error);
    return undefined; // Trạng thái bị hỏng hoặc không thể phân tích
  }
};

// --- Game Actions ---

const discoverTile = (gameState, row, col) => {
  const { currentMapId, maps, resources } = gameState;
  const currentMapData = maps[currentMapId];
  
  const newMap = currentMapData.map.map((rowArr) =>
    rowArr.map((tile) => ({ ...tile }))
  );
  const newResources = { ...resources };
  const tile = newMap[row][col];

  if (tile.isDiscovered) {
    return { success: false, message: "Ô này đã được khám phá." };
  }

  let costType;
  if (tile.hiddenType === "empty") {
    costType = "wood";
  } else {
    const primaryElement = NGU_HANH_RELATIONS.elementMap[tile.hiddenType];
    costType = NGU_HANH_RELATIONS.generates[primaryElement];
    if (!costType) {
      costType = "wood";
    }
  }
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

const activateTile = (gameState, row, col) => {
  const { currentMapId, maps, resources } = gameState;
  const currentMapData = {
    map: currentMapId === GAME_PHASE_INITIAL ? maps[GAME_PHASE_INITIAL].map.map(r => r.map(t => ({...t}))) : maps[GAME_PHASE_ADVANCED].map.map(r => r.map(t => ({...t}))),
    sources: { ...maps[currentMapId].sources },
    spiritBeasts: { ...maps[currentMapId].spiritBeasts },
  }; // Deep copy
  const newResources = { ...resources };

  const tile = currentMapData.map[row][col];

  if (!tile.isDiscovered || tile.isActive || tile.type === "empty") {
    return { success: false, message: "Không thể kích hoạt ô này." };
  }

  let message = "";
  let newUnlockedTier2Upgrades = gameState.unlockedTier2Upgrades;

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
      .replace("_", " ")
      .replace("mine", "Mỏ")
      .replace("forest", "Rừng")
      .replace("spring", "Suối")
      .replace("forge", "Lò")
      .replace("field", "Đất")}! Mất ${ACTIVATION_COST_AMOUNT} ${generatingResource}.`;
  } else if (currentMapData.spiritBeasts[tile.type]) {
    currentMapData.spiritBeasts[tile.type].isActive = true;
    tile.isActive = true;
    message = `Đã kích hoạt linh thú ${tile.type.replace("spirit_", "Linh Thú ")}!`;

    // Check if all spirit beasts on the advanced map are now active
    if (currentMapId === GAME_PHASE_ADVANCED && !newUnlockedTier2Upgrades) {
        const allAdvancedSpiritBeastsActive = Object.values(currentMapData.spiritBeasts)
            .every(sb => sb.isActive);
        if (allAdvancedSpiritBeastsActive) {
            newUnlockedTier2Upgrades = true;
            message += " Đã mở khóa nâng cấp cấp độ tiếp theo (Lên đến cấp 20)!";
        }
    }
  }

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: {
        ...maps,
        [currentMapId]: currentMapData,
      },
      unlockedTier2Upgrades: newUnlockedTier2Upgrades,
    },
    message: message,
  };
};

const harvestSource = (gameState, sourceKey, isOffline = false) => { // Thêm tham số isOffline
  const { currentMapId, maps, resources } = gameState;
  const currentMapData = {
    map: maps[currentMapId].map,
    sources: { ...maps[currentMapId].sources },
    spiritBeasts: maps[currentMapId].spiritBeasts,
  };
  const newResources = { ...resources };
  const source = currentMapData.sources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: "Nguồn này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const now = Date.now();
  if (!isOffline && source.lastHarvestTime + source.cooldown > now) { // Kiểm tra cooldown chỉ khi không phải offline
    const remainingTime = Math.ceil(
      (source.lastHarvestTime + source.cooldown - now) / 1000
    );
    return {
      success: false,
      message: `Nguồn này đang hồi chiêu. Chờ ${remainingTime} giây.`,
    };
  }

  let canHarvestOthers = gameState.canHarvestOtherSources;
  if (currentMapId === GAME_PHASE_ADVANCED) {
    canHarvestOthers = true;
  } else {
    if (sourceKey !== "wood_forest" && !canHarvestOthers) {
      return { success: false, message: "Bạn phải thu hoạch 'Rừng Mộc' trước." };
    }
    if (sourceKey === "wood_forest" && !canHarvestOthers) {
      canHarvestOthers = true;
    }
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const generatedResourceType =
    NGU_HANH_RELATIONS.generates[primaryResourceType];

  let actualYield = source.yield;
  const spiritBeastType = `spirit_${primaryResourceType}`;
  if (
    currentMapData.spiritBeasts[spiritBeastType] &&
    currentMapData.spiritBeasts[spiritBeastType].isActive
  ) {
    actualYield += actualYield * currentMapData.spiritBeasts[spiritBeastType].bonus;
  }
  actualYield = Math.floor(actualYield);

  const generatedYield = Math.floor(actualYield / 5);

  newResources[primaryResourceType] =
    (newResources[primaryResourceType] || 0) + actualYield;
  newResources[generatedResourceType] =
    (newResources[generatedResourceType] || 0) + generatedYield;

  source.lastHarvestTime = now; // Cập nhật lastHarvestTime khi thu hoạch

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: {
        ...maps,
        [currentMapId]: currentMapData,
      },
      canHarvestOtherSources: canHarvestOthers,
    },
    message: `Đã thu hoạch ${actualYield} ${primaryResourceType} và ${generatedYield} ${generatedResourceType} từ ${source.type
      .replace("_", " ")
      .replace("mine", "Mỏ")
      .replace("forest", "Rừng")
      .replace("spring", "Suối")
      .replace("forge", "Lò")
      .replace("field", "Đất")}!`,
    yieldedAmounts: {
      [primaryResourceType]: actualYield,
      [generatedResourceType]: generatedYield,
    },
  };
};

const upgradeSource = (gameState, sourceKey) => {
  const { currentMapId, maps, resources, unlockedTier2Upgrades } = gameState;
  const currentMapData = {
    map: maps[currentMapId].map,
    sources: { ...maps[currentMapId].sources },
    spiritBeasts: maps[currentMapId].spiritBeasts,
  };
  const newResources = { ...resources };
  const source = currentMapData.sources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: "Nguồn này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
  if (source.level >= maxLevelForThisUpgrade) {
    return {
      success: false,
      message: `Nguồn này đã đạt cấp tối đa (${source.level}). ${source.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.' : ''}`
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];

  // Adjust multiplier based on tier
  const currentMultiplier = source.level < MAX_LEVEL_INITIAL_TIER ? UPGRADE_COSTS.source.multiplier : UPGRADE_COSTS.source.tier2Multiplier;

  const primaryCost = Math.floor(
    UPGRADE_COSTS.source.basePrimary * Math.pow(currentMultiplier, source.level - 1)
  );
  const oppositeCost = Math.floor(
    UPGRADE_COSTS.source.baseOpposite * Math.pow(currentMultiplier, source.level - 1)
  );

  if (
    newResources[primaryResourceType] < primaryCost ||
    newResources[oppositeResourceType] < oppositeCost
  ) {
    return {
      success: false,
      message: `Không đủ tài nguyên để nâng cấp. Cần ${primaryCost} ${primaryResourceType} và ${oppositeCost} ${oppositeResourceType}.`,
    };
  }

  newResources[primaryResourceType] -= primaryCost;
  newResources[oppositeResourceType] -= oppositeCost;

  source.level += 1;
  source.yield += BASE_RESOURCE_YIELD * 0.5;
  source.cooldown = Math.max(
    BASE_HARVEST_COOLDOWN_MS * 0.8,
    source.cooldown * 0.9
  );

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      maps: {
        ...maps,
        [currentMapId]: currentMapData,
      },
    },
    message: `Đã nâng cấp ${source.type
      .replace("_", " ")
      .replace("mine", "Mỏ")
      .replace("forest", "Rừng")
      .replace("spring", "Suối")
      .replace("forge", "Lò")
      .replace("field", "Đất")} lên cấp ${source.level}!`,
  };
};

const upgradeSpiritBeast = (gameState, spiritBeastKey) => {
  const { currentMapId, maps, resources, unlockedTier2Upgrades } = gameState;
  const currentMapData = {
    map: maps[currentMapId].map,
    sources: maps[currentMapId].sources,
    spiritBeasts: { ...maps[currentMapId].spiritBeasts },
  };
  const newResources = { ...resources };
  const spiritBeast = currentMapData.spiritBeasts[spiritBeastKey]; // Fixed typo here: spiritBe beastKey -> spiritBeastKey

  if (!spiritBeast || !spiritBeast.isActive) {
    return {
      success: false,
      message: "Linh thú này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
  if (spiritBeast.level >= maxLevelForThisUpgrade) {
    return {
      success: false,
      message: `Linh thú này đã đạt cấp tối đa (${spiritBeast.level}). ${spiritBeast.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.' : ''}`
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[spiritBeast.type];
  const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

  // Adjust multiplier based on tier
  const currentMultiplier = spiritBeast.level < MAX_LEVEL_INITIAL_TIER ? UPGRADE_COSTS.spiritBeast.multiplier : UPGRADE_COSTS.spiritBeast.tier2Multiplier;

  const primaryCost = Math.floor(
    UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(currentMultiplier, spiritBeast.level - 1)
  );
  const generatesCost = Math.floor(
    UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(currentMultiplier, spiritBeast.level - 1)
  );

  if (
    newResources[primaryResourceType] < primaryCost ||
    newResources[generatesResourceType] < generatesCost
  ) {
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
      maps: {
        ...maps,
        [currentMapId]: currentMapData,
      },
    },
    message: `Đã nâng cấp ${spiritBeast.type.replace(
      "spirit_",
      "Linh Thú "
    )} lên cấp ${spiritBeast.level}!`,
  };
};

// --- Components ---

// NotificationSystem.js (for temporary pop-up notifications)
const NotificationSystem = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1)); // Xóa thông báo đầu tiên sau một thời gian
      }, 0); // Thông báo biến mất ngay lập tức
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg shadow-md text-sm ${
            notif.type === "error" ? "bg-red-600" : "bg-green-600"
          } text-white animate-fade-in-up`}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
};

// New Component: ResourceItem for individual resource display and animation
const ResourceItem = ({ type, amount, icon, lastChange, hasBonus }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  // Use a ref to store the value to animate, preventing re-renders from state changes
  const animationValueRef = useRef(0);

  useEffect(() => {
    if (lastChange > 0) {
      animationValueRef.current = lastChange; // Set the value to animate
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        animationValueRef.current = 0; // Reset after animation
      }, 700); // Should match CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [lastChange]); // Trigger when lastChange prop updates

  return (
    <div className="relative flex flex-col justify-center items-center gap-2 p-1 bg-gray-600 rounded-md overflow-hidden">
      <span className="text-2xl">{icon}</span>
      <span className="font-bold text-green-300">{amount}</span>
      {hasBonus && (
        <span className="text-green-400 font-bold ml-1 text-sm">+</span>
      )}{" "}
      {showAnimation && animationValueRef.current > 0 && (
        <span className="absolute text-green-400 font-bold text-xl opacity-0 animate-resource-gain">
          +{animationValueRef.current}
        </span>
      )}
    </div>
  );
};

// ResourcePanel.js
const ResourcePanel = ({
  resources,
  animatedResourceChanges,
  activeSpiritBeastBonuses,
  toggleAutoHarvest,
  isAutoHarvesting,
}) => {
  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-3">
        {" "}
        <h3 className="text-xl font-semibold text-yellow-300">Tài Nguyên</h3>
        <button
          onClick={toggleAutoHarvest}
          className={`p-2 rounded-lg text-sm font-bold transition-colors duration-200 shadow-lg
                      ${
                        isAutoHarvesting
                          ? "bg-red-700 hover:bg-red-800"
                          : "bg-green-700 hover:bg-green-800"
                      } text-white`}
        >
          {isAutoHarvesting ? "🤖" : "🤖"}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2 text-xs">
        {RESOURCE_TYPES.map((type) => (
          <ResourceItem
            key={type}
            type={type}
            amount={resources[type]}
            icon={RESOURCE_ICONS[type]}
            lastChange={animatedResourceChanges[type] || 0}
            hasBonus={activeSpiritBeastBonuses[type] || false}
          />
        ))}
      </div>
    </div>
  );
};

// Tile.js
const Tile = ({ tile, onClick }) => {
  const { row, col, type, isDiscovered, isActive } = tile;

  const icon = getIconForType(type);
  const isSpecialTile = type !== "empty" && type !== "undiscovered";

  let tileBgClass = "bg-gray-700 hover:bg-gray-600";

  if (isDiscovered) {
    if (isActive && isSpecialTile) {
      tileBgClass = "bg-green-700";
    } else {
      const elementType =
        NGU_HANH_RELATIONS.elementMap[type] ||
        (type === "empty" ? "empty" : null);
      tileBgClass = ELEMENT_TILE_BG_COLORS[elementType] || "bg-gray-800";
    }
  }

  return (
    <div
      className={`relative border border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-200
                  ${tileBgClass}
                  rounded-md`}
      style={{ width: TILE_SIZE_PX, height: TILE_SIZE_PX }}
      onClick={() => onClick(row, col)}
    >
      {isDiscovered ? (
        isSpecialTile && (
          <span
            className="text-xl"
            style={{ filter: isActive ? "grayscale(0%)" : "grayscale(100%)" }}
          >
            {icon}
          </span>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-200">
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
      {map.map((row) =>
        row.map((tile) => (
          <Tile key={tile.id} tile={tile} onClick={onTileClick} />
        ))
      )}
    </div>
  );
};

// SourcePanel.js
const SourcePanel = ({
  sources,
  onHarvest,
  onUpgrade,
  canHarvestOtherSources,
  resources,
  unlockedTier2Upgrades,
}) => {
  const sortedSources = Object.values(sources).sort((a, b) =>
    a.type.localeCompare(b.type)
  );

  const getUpgradeCosts = useCallback((source) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
    const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];

    const currentMultiplier = source.level < MAX_LEVEL_INITIAL_TIER ? UPGRADE_COSTS.source.multiplier : UPGRADE_COSTS.source.tier2Multiplier;

    const primaryCost = Math.floor(
      UPGRADE_COSTS.source.basePrimary * Math.pow(currentMultiplier, source.level - 1)
    );
    const oppositeCost = Math.floor(
      UPGRADE_COSTS.source.baseOpposite * Math.pow(currentMultiplier, source.level - 1)
    );
    return {
      primaryResourceType,
      oppositeResourceType,
      primaryCost,
      oppositeCost,
    };
  }, []);

  return (
    <div className="p-3 bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-2 text-cyan-300">
        Nguồn Tài Nguyên
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {sortedSources.map((source) => {
          const {
            primaryResourceType,
            oppositeResourceType,
            primaryCost,
            oppositeCost,
          } = getUpgradeCosts(source);

          const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
          const canUpgrade =
            source.level < maxLevelForThisUpgrade &&
            resources[primaryResourceType] >= primaryCost &&
            resources[oppositeResourceType] >= oppositeCost;

          const now = Date.now();
          const cooldownRemaining =
            source.lastHarvestTime + source.cooldown > now
              ? Math.ceil(
                  (source.lastHarvestTime + source.cooldown - now) / 1000
                )
              : 0;
          const canHarvest =
            cooldownRemaining === 0 &&
            source.isActive &&
            (source.type === "wood_forest" || canHarvestOtherSources);

          return (
            <div
              key={source.type}
              className="bg-gray-600 p-2 rounded-md flex flex-col gap-1"
            >
              <div className="flex flex-col gap-1">
                <span className="text-base font-bold flex items-center gap-1">
                  {SOURCE_ICONS[source.type]}{" "}
                  ({source.level})
                </span>
                <span
                  className={`text-xs ${
                    source.isActive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {source.isActive ? "Kích hoạt" : "Chưa Kích hoạt"}
                </span>
              </div>
              <div className="flex flex-col text-xs">
                <span>
                  + {Math.floor(source.yield)} {RESOURCE_ICONS[primaryResourceType]}
                </span>
                <span>
                  + {Math.floor(source.yield / 5)}{" "}
                  {RESOURCE_ICONS[NGU_HANH_RELATIONS.generates[primaryResourceType]]}
                </span>
                <span>🕒 {Math.ceil(source.cooldown / 1000)}s</span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <button
                  onClick={() => onHarvest(source.type)}
                  disabled={!canHarvest}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200
                                ${
                                  canHarvest
                                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow"
                                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                  title="Thu Hoạch"
                >
                  {cooldownRemaining > 0 ? `(${cooldownRemaining}s)` : "👐"}
                </button>

                <button
                  onClick={() => onUpgrade(source.type)}
                  disabled={!canUpgrade || !source.isActive}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200
                                ${
                                  canUpgrade && source.isActive
                                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow"
                                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                }`}
                  title="Nâng Cấp"
                >
                  ⬆️
                </button>
              </div>
              {!canUpgrade && source.isActive && source.level < maxLevelForThisUpgrade && (
                <p className="text-xs text-red-300 mt-0.5">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {oppositeCost}{" "}
                  {RESOURCE_ICONS[oppositeResourceType]}
                </p>
              )}
              {source.level >= maxLevelForThisUpgrade && (
                  <p className="text-xs text-blue-300 mt-0.5">Cấp tối đa!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// SpiritBeastPanel.js
const SpiritBeastPanel = ({ spiritBeasts, onUpgrade, resources, unlockedTier2Upgrades }) => {
  const sortedSpiritBeasts = Object.values(spiritBeasts).sort((a, b) =>
    a.type.localeCompare(b.type)
  );

  const getUpgradeCosts = useCallback((beast) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
    const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

    const currentMultiplier = beast.level < MAX_LEVEL_INITIAL_TIER ? UPGRADE_COSTS.spiritBeast.multiplier : UPGRADE_COSTS.spiritBeast.tier2Multiplier;

    const primaryCost = Math.floor(
      UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(currentMultiplier, beast.level - 1)
    );
    const generatesCost = Math.floor(
      UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(currentMultiplier, beast.level - 1)
    );
    return {
      primaryResourceType,
      generatesResourceType,
      primaryCost,
      generatesCost,
    };
  }, []);

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <div className="grid grid-cols-5 gap-2">
        {sortedSpiritBeasts.map((beast) => {
          const {
            primaryResourceType,
            generatesResourceType,
            primaryCost,
            generatesCost,
          } = getUpgradeCosts(beast);

          const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
          const canUpgrade =
            beast.level < maxLevelForThisUpgrade &&
            resources[primaryResourceType] >= primaryCost &&
            resources[generatesResourceType] >= generatesCost;

          return (
            <div
              key={beast.type}
              className="bg-gray-600 p-3 rounded-md flex flex-col gap-2"
            >
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-lg font-bold flex items-center gap-1">
                  {SPIRIT_BEAST_ICONS[beast.type]}{" "}
                  ({beast.level})
                </span>
                {beast.isActive ? (
                  <span className="text-green-400">Kích hoạt</span>
                ) : (
                  <span className="text-red-400">Chưa Kích hoạt</span>
                )}
              </div>
              <button
                onClick={() => onUpgrade(beast.type)}
                disabled={!canUpgrade || !beast.isActive}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 mt-2
                            ${
                              canUpgrade && beast.isActive
                                ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                            }`}
              >
                ⬆️
              </button>
              {!canUpgrade && beast.isActive && beast.level < maxLevelForThisUpgrade && (
                <p className="text-xs text-red-300 mt-1">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {generatesCost}{" "}
                  {RESOURCE_ICONS[generatesResourceType]}
                </p>
              )}
              {beast.level >= maxLevelForThisUpgrade && (
                  <p className="text-xs text-blue-300 mt-0.5">Cấp tối đa!</p>
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
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-48 overflow-auto  w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-white">
        Nhật Ký Hoạt Động
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {" "}
        {logs.map((log, index) => (
          <p
            key={index}
            className={`text-xs mb-1 ${
              log.type === "error"
                ? "text-red-300"
                : log.type === "success"
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            <span className="text-gray-500">
              [{new Date(log.timestamp).toLocaleTimeString()}]
            </span>{" "}
            {log.message}
          </p>
        ))}
        <div ref={logEndRef} />
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
    const savedState = loadGame();
    return savedState || initializeGame();
  });

  // Destructure for easier access
  const { currentMapId, maps, resources, canHarvestOtherSources, unlockedTier2Upgrades } = gameState;
  const currentMapData = maps[currentMapId];

  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState(() => {
    const savedState = loadGame();
    return savedState ? savedState.logs : [];
  });
  const [isAutoHarvesting, setIsAutoHarvesting] = useState(
    gameState.isAutoHarvestingOnLoad || false // Load auto-harvesting state
  );
  const [animatedResourceChanges, setAnimatedResourceChanges] = useState({});
  const [activeSpiritBeastBonuses, setActiveSpiritBeastBonuses] = useState({});

  const addLog = useCallback((message, type = "info") => {
    const logEntry = { timestamp: Date.now(), message, type };
    setNotifications((prev) => [...prev, logEntry]);
    setLogs((prev) => [...prev, logEntry]);
  }, []);

  // Effect để lưu game và xử lý offline progress khi tải game
  useEffect(() => {
    // Save game state
    saveGame(gameState, isAutoHarvesting);

    // Xử lý thu hoạch ngoại tuyến khi tải game
    if (gameState.lastPlayedTime && gameState.isAutoHarvestingOnLoad) {
      const offlineDuration = Date.now() - gameState.lastPlayedTime;
      if (offlineDuration > 0) {
        setGameState(prevGameState => {
          let updatedGameState = { ...prevGameState };
          let totalOfflineYield = {};
          let harvestedAnyOffline = false;

          const currentMap = updatedGameState.maps[updatedGameState.currentMapId];
          const sourcesToProcess = { ...currentMap.sources }; // Deep copy for modifications

          for (const sourceKey in sourcesToProcess) {
            const source = sourcesToProcess[sourceKey];
            if (source.isActive) {
              const elapsedTimeSinceLastHarvest = Date.now() - source.lastHarvestTime;
              const numHarvests = Math.floor(elapsedTimeSinceLastHarvest / source.cooldown);

              if (numHarvests > 0) {
                const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
                const generatedResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];

                let actualYield = source.yield;
                const spiritBeastType = `spirit_${primaryResourceType}`;
                if (
                  currentMap.spiritBeasts[spiritBeastType] &&
                  currentMap.spiritBeasts[spiritBeastType].isActive
                ) {
                  actualYield += actualYield * currentMap.spiritBeasts[spiritBeastType].bonus;
                }
                actualYield = Math.floor(actualYield);

                const generatedYield = Math.floor(actualYield / 5);

                const totalPrimaryYield = numHarvests * actualYield;
                const totalGeneratedYield = numHarvests * generatedYield;

                updatedGameState.resources[primaryResourceType] = (updatedGameState.resources[primaryResourceType] || 0) + totalPrimaryYield;
                updatedGameState.resources[generatedResourceType] = (updatedGameState.resources[generatedResourceType] || 0) + totalGeneratedYield;

                // Update lastHarvestTime for offline harvests
                sourcesToProcess[sourceKey].lastHarvestTime += numHarvests * source.cooldown;
                
                // Aggregate yields for notification
                totalOfflineYield[primaryResourceType] = (totalOfflineYield[primaryResourceType] || 0) + totalPrimaryYield;
                totalOfflineYield[generatedResourceType] = (totalOfflineYield[generatedResourceType] || 0) + totalGeneratedYield;
                harvestedAnyOffline = true;
              }
            }
          }

          if (harvestedAnyOffline) {
            addLog(`Đã thu hoạch ngoại tuyến: ${Object.entries(totalOfflineYield).map(([type, amount]) => `${amount} ${type}`).join(', ')}`, 'success');
            updatedGameState.maps[updatedGameState.currentMapId].sources = sourcesToProcess; // Cập nhật nguồn
          }

          // Cập nhật lastPlayedTime trong gameState để phù hợp với thời điểm hiện tại
          updatedGameState.lastPlayedTime = Date.now();
          return updatedGameState;
        });
      }
    }

    const handleBeforeUnload = () => {
      saveGame(gameState, isAutoHarvesting);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameState, isAutoHarvesting, addLog]);


  useEffect(() => {
    const newActiveBonuses = {};
    if (currentMapData && currentMapData.spiritBeasts) {
      for (const key in currentMapData.spiritBeasts) {
        const beast = currentMapData.spiritBeasts[key];
        if (beast.isActive) {
          const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
          if (primaryResourceType) {
            newActiveBonuses[primaryResourceType] = true;
          }
        }
      }
    }
    setActiveSpiritBeastBonuses(newActiveBonuses);
  }, [currentMapData?.spiritBeasts]); // Listen to active spirit beasts on the current map

  // Logic to check and unlock new map
  useEffect(() => {
    if (currentMapId === GAME_PHASE_INITIAL && maps[GAME_PHASE_INITIAL]) {
      const initialSources = maps[GAME_PHASE_INITIAL].sources;
      const initialSpiritBeasts = maps[GAME_PHASE_INITIAL].spiritBeasts;

      const allSourcesMaxedInitialTier = Object.values(initialSources)
        .every(s => s.level >= MAX_LEVEL_INITIAL_TIER);
      const allSpiritBeastsMaxedInitialTier = Object.values(initialSpiritBeasts)
        .every(sb => sb.level >= MAX_LEVEL_INITIAL_TIER);

      if (allSourcesMaxedInitialTier && allSpiritBeastsMaxedInitialTier && !maps[GAME_PHASE_ADVANCED]) {
        addLog("Tất cả nguồn và linh thú đã đạt cấp tối đa ban đầu! Đang mở khóa bản đồ mới...", "info");

        const advancedMapContent = generateMapContent(MAP_SIZE);

        setGameState(prev => ({
          ...prev,
          currentMapId: GAME_PHASE_ADVANCED,
          maps: {
            ...prev.maps,
            [GAME_PHASE_ADVANCED]: { // Populate the advanced map data
              map: advancedMapContent.map,
              sources: advancedMapContent.sources,
              spiritBeasts: advancedMapContent.spiritBeasts,
            }
          },
          canHarvestOtherSources: true, // Assuming new map starts with this enabled for all sources
        }));
        addLog("Bản đồ mới đã được mở khóa! Hãy khám phá và kích hoạt các Linh Thú trên bản đồ này để mở khóa nâng cấp cấp độ tiếp theo (lên đến cấp 20)!", "success");
      }
    }
  }, [currentMapId, maps, addLog]);


  const performAutoHarvest = useCallback(() => {
    setGameState((prevGameState) => {
      let currentGameState = { ...prevGameState };
      let harvestedCount = 0;
      let totalYieldedAmounts = {};

      const currentSources = currentGameState.maps[currentGameState.currentMapId].sources;

      for (const sourceKey in currentSources) {
        const source = currentSources[sourceKey];
        const now = Date.now();

        let canHarvest = source.isActive && source.lastHarvestTime + source.cooldown <= now;
        if (currentGameState.currentMapId === GAME_PHASE_INITIAL && sourceKey !== "wood_forest" && !currentGameState.canHarvestOtherSources) {
          canHarvest = false;
        }

        if (canHarvest) {
          const harvestResult = harvestSource(currentGameState, sourceKey);
          if (harvestResult.success) {
            currentGameState = harvestResult.newState;
            addLog(harvestResult.message, "success");
            harvestedCount++;

            for (const resType in harvestResult.yieldedAmounts) {
              totalYieldedAmounts[resType] =
                (totalYieldedAmounts[resType] || 0) +
                harvestResult.yieldedAmounts[resType];
            }
          }
        }
      }

      if (Object.keys(totalYieldedAmounts).length > 0) {
        setAnimatedResourceChanges(totalYieldedAmounts);
        setTimeout(() => {
          setAnimatedResourceChanges({});
        }, 800);
      }

      return harvestedCount > 0 ? currentGameState : prevGameState;
    });
  }, [addLog]);

  useEffect(() => {
    let intervalId;
    if (isAutoHarvesting) {
      intervalId = setInterval(() => {
        performAutoHarvest();
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoHarvesting, performAutoHarvest]);

  const handleTileClick = useCallback(
    (row, col) => {
      const tile = currentMapData.map[row][col];

      if (!tile.isDiscovered) {
        const result = discoverTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, "info");
        } else {
          addLog(result.message, "error");
        }
      } else if (tile.isDiscovered && !tile.isActive && tile.type !== "empty") {
        const result = activateTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, "success");
        } else {
          addLog(result.message, "error");
        }
      }
    },
    [gameState, currentMapData, addLog]
  );

  const handleHarvest = useCallback(
    (sourceId) => {
      const result = harvestSource(gameState, sourceId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, "success");
        setAnimatedResourceChanges(result.yieldedAmounts);
        setTimeout(() => {
          setAnimatedResourceChanges({});
        }, 800);
      } else {
        addLog(result.message, "error");
      }
    },
    [gameState, addLog]
  );

  const handleUpgradeSource = useCallback(
    (sourceId) => {
      const result = upgradeSource(gameState, sourceId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, "success");
      } else {
        addLog(result.message, "error");
      }
    },
    [gameState, addLog]
  );

  const handleUpgradeSpiritBeast = useCallback(
    (spiritBeastId) => {
      const result = upgradeSpiritBeast(gameState, spiritBeastId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, "success");
      } else {
        addLog(result.message, "error");
      }
    },
    [gameState, addLog]
  );

  const toggleAutoHarvest = () => {
    setIsAutoHarvesting((prev) => !prev);
    addLog(
      isAutoHarvesting
        ? "Đã tắt chế độ thu hoạch tự động."
        : "Đã bật chế độ thu hoạch tự động.",
      "info"
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* CSS for jumping number animation */
        @keyframes resource-gain {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          20% {
            transform: translateY(-15px);
            opacity: 1;
          }
          80% {
            transform: translateY(-25px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-30px);
            opacity: 0;
          }
        }
        .animate-resource-gain {
          animation: resource-gain 0.7s ease-out forwards;
        }
      `}</style>
      <h1 className="text-5xl font-extrabold mb-4 text-yellow-500 drop-shadow-lg text-center">
        Ngũ Hành Khám Phá
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-4 mx-auto">
        {/* Middle Column: Map and Instructions */}
        <div className="w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">
            Bản Đồ Khám Phá ({currentMapId === GAME_PHASE_INITIAL ? 'Ban Đầu' : 'Nâng Cao'})
          </h2>
          {currentMapData && <Map map={currentMapData.map} onTileClick={handleTileClick} />}
          <p className="text-sm text-gray-400 mt-4 text-center">
            Nhấp vào ô chưa khám phá để lộ diện. Nhấp lần thứ hai vào ô đã khám
            phá để kích hoạt nguồn/linh thú.
          </p>
           <ActivityLog logs={logs} />
        </div>

        {/* Right Column: Source and Spirit Beast Panels */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700">
              <ResourcePanel
                resources={resources}
                animatedResourceChanges={animatedResourceChanges}
                activeSpiritBeastBonuses={activeSpiritBeastBonuses}
                toggleAutoHarvest={toggleAutoHarvest}
                isAutoHarvesting={isAutoHarvesting}
              />
            </div>
            <div className="bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 overflow-y-auto">
              {currentMapData && (
                <SourcePanel
                  sources={currentMapData.sources}
                  onHarvest={handleHarvest}
                  onUpgrade={handleUpgradeSource}
                  canHarvestOtherSources={canHarvestOtherSources}
                  resources={resources}
                  unlockedTier2Upgrades={unlockedTier2Upgrades}
                />
              )}
            </div>
          <div className="bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 overflow-y-auto">
            {currentMapData && (
              <SpiritBeastPanel
                spiritBeasts={currentMapData.spiritBeasts}
                onUpgrade={handleUpgradeSpiritBeast}
                resources={resources}
                unlockedTier2Upgrades={unlockedTier2Upgrades}
              />
            )}
          </div>
          </div>
        </div>
      </div>

      <NotificationSystem
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
}

export default App;
