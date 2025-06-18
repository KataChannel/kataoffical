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
  },
  spiritBeast: {
    basePrimary: 40, // Tài nguyên chính
    baseGenerates: 15, // Tài nguyên sinh
    multiplier: 1.4,
  },
};

const SPIRIT_BEAST_BONUS_PER_LEVEL = 0.05; // 5% tăng sản lượng mỗi cấp

// New constants for discovery and activation costs
const DISCOVERY_COST_AMOUNT = 5; // Số lượng tài nguyên cần để khám phá ô

const ACTIVATION_COST_AMOUNT = 5; // Số lượng tài nguyên tương sinh cần để kích hoạt nguồn

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

// --- Initial Game State ---
const initializeGame = () => {
  // Cập nhật: Đặt tất cả các tài nguyên khác là 0, riêng Mộc là 10
  const initialResources = { metal: 0, wood: 10, water: 0, fire: 0, earth: 0 }; // Cập nhật: Các tài nguyên khác bằng 0
  const initialMap = Array.from({ length: MAP_SIZE }, (_, r) =>
    Array.from({ length: MAP_SIZE }, (_, c) => ({
      id: `${r}-${c}`,
      row: r,
      col: c,
      // The type shown initially (before discovery)
      type: "undiscovered", // Change: default type is 'undiscovered'
      isDiscovered: false,
      isActive: false,
      // The actual content type of the tile, hidden until discovered
      hiddenType: "empty", // This will be overwritten by placed items
    }))
  );

  const availablePositions = [];
  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      availablePositions.push({ r, c });
    }
  }

  // Đặt ngẫu nhiên các nguồn và linh thú
  const typesToPlace = [
    "metal_mine",
    "wood_forest",
    "water_spring",
    "fire_forge",
    "earth_field",
    "spirit_metal",
    "spirit_wood",
    "spirit_water",
    "spirit_fire",
    "spirit_earth",
  ];

  const actualTypesToPlace = typesToPlace.slice(
    0,
    Math.min(typesToPlace.length, MAP_SIZE * MAP_SIZE)
  );

  // const placedItems = {}; // Để lưu trữ các vật phẩm thực tế với cấp độ và thời gian hồi chiêu
  const sources = {};
  const spiritBeasts = {};

  actualTypesToPlace.forEach((type) => {
    const randomIndex = getRandomInt(0, availablePositions.length - 1);
    const { r, c } = availablePositions.splice(randomIndex, 1)[0];

    initialMap[r][c].hiddenType = type; // Store the actual type in hiddenType

    if (
      type.includes("_mine") ||
      type.includes("_forest") ||
      type.includes("_spring") ||
      type.includes("_forge") ||
      type.includes("_field")
    ) {
      sources[type] = {
        type: type,
        level: 1,
        lastHarvestTime: 0, // Thời gian thu hoạch cuối cùng
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

  // Pre-discover and activate Wood Forest
  const woodForestType = "wood_forest";
  let woodForestTile = null; // Initialize to null
  for (let r = 0; r < MAP_SIZE; r++) {
    for (let c = 0; c < MAP_SIZE; c++) {
      if (initialMap[r][c].hiddenType === woodForestType) {
        // Check hiddenType
        woodForestTile = initialMap[r][c];
        break;
      }
    }
    if (woodForestTile) break;
  }

  // If Wood Forest wasn't placed because map is too small for all 10 items,
  // find an empty spot and place it.
  if (!woodForestTile) {
    if (availablePositions.length > 0) {
      const { r, c } = availablePositions.splice(0, 1)[0];
      initialMap[r][c].hiddenType = woodForestType; // Place in hiddenType
      woodForestTile = initialMap[r][c];
      sources[woodForestType] = {
        type: woodForestType,
        level: 1,
        lastHarvestTime: 0,
        cooldown: BASE_HARVEST_COOLDOWN_MS,
        yield: BASE_RESOURCE_YIELD,
        isActive: false,
        row: r,
        col: c,
      };
    } else {
      // This case implies the map is so small that not even 1 tile is available after other placements
      console.error(
        "No available positions for Wood Forest! This indicates a problem with map generation."
      );
    }
  }

  if (woodForestTile) {
    woodForestTile.isDiscovered = true;
    woodForestTile.isActive = true;
    sources[woodForestType].isActive = true;
    // Set the visible type to the hidden type after discovery
    woodForestTile.type = woodForestTile.hiddenType;
  } else {
    // Fallback if wood forest not found (should not happen with current logic for 5x5 map)
    console.error("Wood Forest still not found after fallback placement!");
  }

  return {
    map: initialMap,
    resources: initialResources,
    sources: sources,
    spiritBeasts: spiritBeasts,
    canHarvestOtherSources: false, // Player must first harvest the Wood Forest
    logs: [], // Initialize logs for new game
  };
};

// --- Local Storage Functions ---
const saveGame = (gameState, logs) => { // Modified to accept logs
  try {
    const serializedState = JSON.stringify({ ...gameState, logs }); // Include logs in the saved state
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

    // Đảm bảo canHarvestOtherSources ban đầu là false nếu đang tải một trò chơi mà Rừng Mộc đã được thu hoạch
    // Hoặc đặt nó dựa trên việc Rừng Mộc đã được thu hoạch.
    if (
      loadedState.sources &&
      loadedState.sources.wood_forest &&
      loadedState.sources.wood_forest.lastHarvestTime > 0
    ) {
      loadedState.canHarvestOtherSources = true;
    } else {
      loadedState.canHarvestOtherSources = false;
    }
    loadedState.logs = loadedState.logs || []; // Ensure logs array exists, even if empty
    return loadedState;
  } catch (error) {
    console.error("Lỗi khi tải trò chơi từ localStorage:", error);
    return undefined; // Trạng thái bị hỏng hoặc không thể phân tích
  }
};

// --- Game Actions ---

const discoverTile = (gameState, row, col) => {
  const newMap = gameState.map.map((rowArr) =>
    rowArr.map((tile) => ({ ...tile }))
  );
  const newResources = { ...gameState.resources };
  const tile = newMap[row][col];

  if (tile.isDiscovered) {
    return { success: false, message: "Ô này đã được khám phá." };
  }

  let costType;
  // Xác định chi phí dựa trên loại ẩn của ô
  if (tile.hiddenType === "empty") {
    // Nếu là ô trống, sử dụng chi phí gỗ cố định như yêu cầu trước
    costType = "wood";
  } else {
    // Nếu là nguồn hoặc linh thú, tìm nguyên tố sinh ra cho nguyên tố chính của nó
    const primaryElement = NGU_HANH_RELATIONS.elementMap[tile.hiddenType];
    costType = NGU_HANH_RELATIONS.generates[primaryElement];
    if (!costType) {
      // Trường hợp dự phòng nếu không có quan hệ sinh cụ thể
      costType = "wood"; // Mặc định là gỗ nếu quan hệ bị thiếu vì lý do nào đó
    }
  }
  const costAmount = DISCOVERY_COST_AMOUNT; // Đây là 5

  if (newResources[costType] < costAmount) {
    return {
      success: false,
      message: `Không đủ tài nguyên để khám phá ô này. Cần ${costAmount} ${costType}.`,
    };
  }

  newResources[costType] -= costAmount;
  tile.isDiscovered = true;
  tile.type = tile.hiddenType; // Tiết lộ loại thực tế trên bản đồ

  return {
    success: true,
    newState: {
      ...gameState,
      map: newMap,
      resources: newResources,
    },
    message: `Đã khám phá ô tại (${row}, ${col}). Mất ${costAmount} ${costType}.`,
  };
};

const activateTile = (gameState, row, col) => {
  const newMap = gameState.map.map((rowArr) =>
    rowArr.map((tile) => ({ ...tile }))
  );
  const newSources = { ...gameState.sources };
  const newSpiritBeasts = { ...gameState.spiritBeasts };
  const newResources = { ...gameState.resources }; // Tạo bản sao của tài nguyên

  const tile = newMap[row][col];

  if (!tile.isDiscovered || tile.isActive || tile.type === "empty") {
    return { success: false, message: "Không thể kích hoạt ô này." };
  }

  let message = "";

  // Sử dụng tile.type trực tiếp vì nó đã là loại được tiết lộ
  if (gameState.sources[tile.type]) {
    const sourceResourceType = NGU_HANH_RELATIONS.elementMap[tile.type];
    const generatingResource = NGU_HANH_RELATIONS.generates[sourceResourceType];

    if (newResources[generatingResource] < ACTIVATION_COST_AMOUNT) {
      return {
        success: false,
        message: `Không đủ tài nguyên để kích hoạt. Cần ${ACTIVATION_COST_AMOUNT} ${generatingResource}.`,
      };
    }

    newResources[generatingResource] -= ACTIVATION_COST_AMOUNT; // Trừ chi phí

    newSources[tile.type].isActive = true;
    tile.isActive = true; // Đặt là hoạt động trên ô trong bản đồ
    message = `Đã kích hoạt nguồn ${tile.type
      .replace("_", " ")
      .replace("mine", "Mỏ")
      .replace("forest", "Rừng")
      .replace("spring", "Suối")
      .replace("forge", "Lò")
      .replace(
        "field",
        "Đất"
      )}! Mất ${ACTIVATION_COST_AMOUNT} ${generatingResource}.`;
  } else if (gameState.spiritBeasts[tile.type]) {
    // Nếu là một linh thú
    newSpiritBeasts[tile.type].isActive = true;
    tile.isActive = true; // Đặt là hoạt động trên ô trong bản đồ
    message = `Đã kích hoạt linh thú ${tile.type.replace(
      "spirit_",
      "Linh Thú "
    )}!`;
  }

  return {
    success: true,
    newState: {
      ...gameState,
      map: newMap,
      sources: newSources,
      spiritBeasts: newSpiritBeasts,
      resources: newResources, // Cập nhật tài nguyên sau khi trừ chi phí
    },
    message: message,
  };
};

const harvestSource = (gameState, sourceKey) => {
  const newSources = { ...gameState.sources };
  const newResources = { ...gameState.resources };
  const source = newSources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: "Nguồn này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const now = Date.now();
  if (source.lastHarvestTime + source.cooldown > now) {
    const remainingTime = Math.ceil(
      (source.lastHarvestTime + source.cooldown - now) / 1000
    );
    return {
      success: false,
      message: `Nguồn này đang hồi chiêu. Chờ ${remainingTime} giây.`
    };
  }

  // Kiểm tra xem Rừng Mộc đã được thu hoạch chưa nếu nó không phải là chính Rừng Mộc
  // Hoặc đặt nó dựa trên việc Rừng Mộc đã được thu hoạch.
  let canHarvestOthers = gameState.canHarvestOtherSources;
  if (sourceKey !== "wood_forest" && !canHarvestOthers) {
    return { success: false, message: "Bạn phải thu hoạch 'Rừng Mộc' trước." };
  }

  if (sourceKey === "wood_forest" && !canHarvestOthers) {
    canHarvestOthers = true;
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const generatedResourceType =
    NGU_HANH_RELATIONS.generates[primaryResourceType];

  // Tính toán sản lượng bao gồm thưởng linh thú
  let actualYield = source.yield;
  const spiritBeastType = `spirit_${primaryResourceType}`;
  if (
    gameState.spiritBeasts[spiritBeastType] &&
    gameState.spiritBeasts[spiritBeastType].isActive
  ) {
    // Fixed typo here
    actualYield += actualYield * gameState.spiritBeasts[spiritBeastType].bonus;
  }
  actualYield = Math.floor(actualYield); // Đảm bảo sản lượng là số nguyên

  const generatedYield = Math.floor(actualYield / 5); // 20% sinh ra

  newResources[primaryResourceType] =
    (newResources[primaryResourceType] || 0) + actualYield;
  newResources[generatedResourceType] =
    (newResources[generatedResourceType] || 0) + generatedYield;

  source.lastHarvestTime = now;

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      sources: newSources,
      canHarvestOtherSources: canHarvestOthers,
    },
    message: `Đã thu hoạch ${actualYield} ${primaryResourceType} và ${generatedYield} ${generatedResourceType} từ ${source.type
      .replace("_", " ")
      .replace("mine", "Mỏ")
      .replace("forest", "Rừng")
      .replace("spring", "Suối")
      .replace("forge", "Lò")
      .replace("field", "Đất")}!`,
    // Trả về số lượng đã thu hoạch cho mỗi loại tài nguyên để hiển thị animation
    yieldedAmounts: {
      [primaryResourceType]: actualYield,
      [generatedResourceType]: generatedYield,
    },
  };
};

const upgradeSource = (gameState, sourceKey) => {
  const newSources = { ...gameState.sources };
  const newResources = { ...gameState.resources };
  const source = newSources[sourceKey];

  if (!source || !source.isActive) {
    return {
      success: false,
      message: "Nguồn này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
  const oppositeResourceType =
    NGU_HANH_RELATIONS.overcomes[primaryResourceType];

  const primaryCost = Math.floor(
    UPGRADE_COSTS.source.basePrimary *
      Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1)
  );
  const oppositeCost = Math.floor(
    UPGRADE_COSTS.source.baseOpposite *
      Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1)
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
  source.yield += BASE_RESOURCE_YIELD * 0.5; // Tăng 50% sản lượng mỗi cấp
  source.cooldown = Math.max(
    BASE_HARVEST_COOLDOWN_MS * 0.8,
    source.cooldown * 0.9
  ); // Giảm 10% cooldown, tối thiểu 80% ban đầu

  return {
    success: true,
    newState: {
      ...gameState,
      resources: newResources,
      sources: newSources,
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
  const newSpiritBeasts = { ...gameState.spiritBeasts };
  const newResources = { ...gameState.resources };
  const spiritBeast = newSpiritBeasts[spiritBeastKey];

  if (!spiritBeast || !spiritBeast.isActive) {
    return {
      success: false,
      message: "Linh thú này chưa được kích hoạt hoặc không tồn tại.",
    };
  }

  const primaryResourceType = NGU_HANH_RELATIONS.elementMap[spiritBeast.type];
  const generatesResourceType =
    NGU_HANH_RELATIONS.generates[primaryResourceType];

  const primaryCost = Math.floor(
    UPGRADE_COSTS.spiritBeast.basePrimary *
      Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1)
  );
  const generatesCost = Math.floor(
    UPGRADE_COSTS.spiritBeast.baseGenerates *
      Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, spiritBeast.level - 1)
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
      spiritBeasts: newSpiritBeasts,
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
      {/* <span className="capitalize font-medium">{type}:</span> */}
      <span className="font-bold text-green-300">{amount}</span>
      {hasBonus && (
        <span className="text-green-400 font-bold ml-1 text-sm">+</span>
      )}{" "}
      {/* Hiển thị dấu '+' */}
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
        {/* Use flex to align items */}
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
            lastChange={animatedResourceChanges[type] || 0} // Truyền số lượng thay đổi gần nhất
            hasBonus={activeSpiritBeastBonuses[type] || false} // Truyền thông tin có bonus hay không
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
  const isSpecialTile = type !== "empty" && type !== "undiscovered"; // Kiểm tra xem đó có phải là tài nguyên hoặc linh thú không

  // Thay đổi màu nền mặc định cho ô chưa khám phá thành màu nhạt hơn (bg-gray-700)
  // và màu khi hover cũng nhạt hơn (bg-gray-600)
  let tileBgClass = "bg-gray-700 hover:bg-gray-600"; // Đã cập nhật: màu nhạt hơn

  if (isDiscovered) {
    if (isActive && isSpecialTile) {
      tileBgClass = "bg-green-700"; // Các nguồn/linh thú đang hoạt động có màu xanh lá cây
    } else {
      // Ô đã khám phá nhưng không hoạt động, hoặc ô trống đã khám phá
      const elementType =
        NGU_HANH_RELATIONS.elementMap[type] ||
        (type === "empty" ? "empty" : null);
      // Giữ nguyên các màu đã khám phá (có thể điều chỉnh nếu cần làm nổi bật hơn so với màu nhạt mới)
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
        isSpecialTile && ( // Chỉ hiển thị icon nếu đó là loại ô đặc biệt
          <span
            className="text-xl"
            style={{ filter: isActive ? "grayscale(0%)" : "grayscale(100%)" }} // Làm mờ nếu không hoạt động
          >
            {icon}
          </span>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-200">
          {" "}
          {/* Đã cập nhật: text-gray-200 để dễ nhìn hơn */}?
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
}) => {
  const sortedSources = Object.values(sources).sort((a, b) =>
    a.type.localeCompare(b.type)
  );

  const getUpgradeCosts = useCallback((source) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
    const oppositeResourceType =
      NGU_HANH_RELATIONS.overcomes[primaryResourceType];
    const primaryCost = Math.floor(
      UPGRADE_COSTS.source.basePrimary *
        Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1)
    );
    const oppositeCost = Math.floor(
      UPGRADE_COSTS.source.baseOpposite *
        Math.pow(UPGRADE_COSTS.source.multiplier, source.level - 1)
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
          const canUpgrade =
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
                  {/* {source.type
                    .replace("_", " ")
                    .replace("mine", "Mỏ")
                    .replace("forest", "Rừng")
                    .replace("spring", "Suối")
                    .replace("forge", "Lò")
                    .replace("field", "Đất"){" "}
                  */}
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
              {!canUpgrade && source.isActive && (
                <p className="text-xs text-red-300 mt-0.5">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {oppositeCost}{" "}
                  {RESOURCE_ICONS[oppositeResourceType]}
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
  const sortedSpiritBeasts = Object.values(spiritBeasts).sort((a, b) =>
    a.type.localeCompare(b.type)
  );

  const getUpgradeCosts = useCallback((beast) => {
    const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
    const generatesResourceType =
      NGU_HANH_RELATIONS.generates[primaryResourceType];
    const primaryCost = Math.floor(
      UPGRADE_COSTS.spiritBeast.basePrimary *
        Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, beast.level - 1)
    );
    const generatesCost = Math.floor(
      UPGRADE_COSTS.spiritBeast.baseGenerates *
        Math.pow(UPGRADE_COSTS.spiritBeast.multiplier, beast.level - 1)
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
      {/* Removed <h3>Linh Thú</h3> heading */}
      <div className="grid grid-cols-5 gap-2">
        {sortedSpiritBeasts.map((beast) => {
          const {
            primaryResourceType,
            generatesResourceType,
            primaryCost,
            generatesCost,
          } = getUpgradeCosts(beast);
          const canUpgrade =
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
                  {/* {beast.type.replace("spirit_", "Linh Thú ")}  */}
                  ({beast.level})
                </span>
                {beast.isActive ? (
                  <span className="text-green-400">Kích hoạt</span>
                ) : (
                  <span className="text-red-400">Chưa Kích hoạt</span>
                )}
              </div>
              {/* Removed <p className="text-sm">Thưởng sản lượng: {(beast.bonus * 100).toFixed(0)}% {primaryResourceType}</p> */}
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
              {!canUpgrade && beast.isActive && (
                <p className="text-xs text-red-300 mt-1">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {generatesCost}{" "}
                  {RESOURCE_ICONS[generatesResourceType]}
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
    // Cuộn xuống dưới khi có log mới được thêm vào
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    // FIX: Đã loại bỏ max-h-64 và lg:max-h-96 để cho phép flex-grow quản lý chiều cao động.
    // Đã thêm flex-1 để cho phép nó chiếm không gian có sẵn trong cột flex.
    <div className="h-48 overflow-auto  w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-white">
        Nhật Ký Hoạt Động
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {" "}
        {/* Cập nhật các lớp ở đây */}
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
        <div ref={logEndRef} /> {/* Phần tử giả để cuộn đến */}
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
  const [logs, setLogs] = useState(() => { // Initialize logs from loadedState
    const savedState = loadGame();
    return savedState ? savedState.logs : [];
  });
  const [isAutoHarvesting, setIsAutoHarvesting] = useState(false);
  // Thêm state mới để theo dõi các thay đổi tài nguyên để kích hoạt animation
  const [animatedResourceChanges, setAnimatedResourceChanges] = useState({});
  // State mới để theo dõi tài nguyên nào đang nhận bonus từ linh thú hoạt động
  const [activeSpiritBeastBonuses, setActiveSpiritBeastBonuses] = useState({});

  // Hàm để thêm thông báo tạm thời và log vào nhật ký
  const addLog = useCallback((message, type = "info") => {
    const logEntry = { timestamp: Date.now(), message, type };
    setNotifications((prev) => [...prev, logEntry]); // Dành cho thông báo tạm thời
    setLogs((prev) => [...prev, logEntry]); // Dành cho nhật ký hoạt động cố định
  }, []);

  useEffect(() => {
    // Lưu trạng thái vào localStorage mỗi khi gameState hoặc logs thay đổi
    saveGame(gameState, logs); // Pass logs to saveGame
  }, [gameState, logs]);

  // Cập nhật activeSpiritBeastBonuses mỗi khi spiritBeasts thay đổi
  useEffect(() => {
    const newActiveBonuses = {};
    for (const key in gameState.spiritBeasts) {
      const beast = gameState.spiritBeasts[key];
      if (beast.isActive) {
        const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
        if (primaryResourceType) {
          newActiveBonuses[primaryResourceType] = true;
        }
      }
    }
    setActiveSpiritBeastBonuses(newActiveBonuses);
  }, [gameState.spiritBeasts]);

  // Logic tự động thu hoạch
  const performAutoHarvest = useCallback(() => {
    setGameState((prevGameState) => {
      let currentGameState = { ...prevGameState };
      let harvestedCount = 0;
      let totalYieldedAmounts = {}; // Object để tổng hợp lượng tài nguyên đã thu được

      for (const sourceKey in currentGameState.sources) {
        const source = currentGameState.sources[sourceKey];
        const now = Date.now();

        const canHarvest =
          source.isActive &&
          source.lastHarvestTime + source.cooldown <= now &&
          (source.type === "wood_forest" ||
            currentGameState.canHarvestOtherSources);

        if (canHarvest) {
          const harvestResult = harvestSource(currentGameState, sourceKey);
          if (harvestResult.success) {
            currentGameState = harvestResult.newState; // Cập nhật trạng thái với kết quả thu hoạch
            addLog(harvestResult.message, "success");
            harvestedCount++;

            // Tổng hợp yieldedAmounts từ mỗi lần thu hoạch
            for (const resType in harvestResult.yieldedAmounts) {
              totalYieldedAmounts[resType] =
                (totalYieldedAmounts[resType] || 0) +
                harvestResult.yieldedAmounts[resType];
            }
          }
        }
      }

      // Chỉ cập nhật animatedResourceChanges nếu có tài nguyên được thu hoạch
      if (Object.keys(totalYieldedAmounts).length > 0) {
        setAnimatedResourceChanges(totalYieldedAmounts);
        setTimeout(() => {
          setAnimatedResourceChanges({}); // Đặt lại sau khi animation hoàn thành
        }, 800); // Đảm bảo thời gian đủ cho animation
      }

      // Trả về trạng thái mới chỉ khi có thay đổi xảy ra để tránh hiển thị không cần thiết
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

  const handleTileClick = useCallback(
    (row, col) => {
      const tile = gameState.map[row][col];

      if (!tile.isDiscovered) {
        // Khám phá ô mới
        const result = discoverTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, "info");
        } else {
          addLog(result.message, "error");
        }
      } else if (tile.isDiscovered && !tile.isActive && tile.type !== "empty") {
        // Kích hoạt nguồn/linh thú đã khám phá
        const result = activateTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, "success");
        } else {
          addLog(result.message, "error");
        }
      }
    },
    [gameState, addLog]
  );

  const handleHarvest = useCallback(
    (sourceId) => {
      const result = harvestSource(gameState, sourceId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, "success");
        // Cập nhật trạng thái animation với lượng tài nguyên thu hoạch được
        setAnimatedResourceChanges(result.yieldedAmounts);
        // Đặt lại trạng thái animation sau một khoảng thời gian ngắn
        setTimeout(() => {
          setAnimatedResourceChanges({});
        }, 800); // Thời gian này nên lớn hơn hoặc bằng thời gian animation CSS
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
            Bản Đồ Khám Phá
          </h2>
          <Map map={gameState.map} onTileClick={handleTileClick} />
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
                resources={gameState.resources}
                animatedResourceChanges={animatedResourceChanges}
                activeSpiritBeastBonuses={activeSpiritBeastBonuses}
                toggleAutoHarvest={toggleAutoHarvest} // Pass the toggle function
                isAutoHarvesting={isAutoHarvesting} // Pass the auto-harvesting state
              />
            </div>
            <div className="bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 overflow-y-auto">
              <SourcePanel
                sources={gameState.sources}
                onHarvest={handleHarvest}
                onUpgrade={handleUpgradeSource}
                canHarvestOtherSources={gameState.canHarvestOtherSources}
                resources={gameState.resources}
              />
            </div>
          <div className="bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 overflow-y-auto">
            <SpiritBeastPanel
              spiritBeasts={gameState.spiritBeasts}
              onUpgrade={handleUpgradeSpiritBeast}
              resources={gameState.resources}
            />
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
// --- Game Logic Functions ---