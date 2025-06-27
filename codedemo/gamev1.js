const fs = require('fs');
const path = require('path');

// Define the project structure and file contents
const projectStructure = {
  'components': {
    'ActivityLog.tsx': `import { useEffect, useRef } from 'react';
import { LogEntry } from '../types/game';

interface ActivityLogProps {
  logs: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-48 overflow-auto w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col">
      <h3 className="text-xl font-semibold mb-3 text-white">Nhật Ký Hoạt Động</h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {logs.map((log, index) => (
          <p
            key={index}
            className={\`text-xs mb-1 \${
              log.type === 'error' ? 'text-red-300' : log.type === 'success' ? 'text-green-300' : 'text-gray-300'
            }\`}
          >
            <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
          </p>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActivityLog;`,
    'Map.tsx': `import { Tile } from '../types/game';
import { MAP_SIZE, TILE_SIZE_PX, ELEMENT_TILE_BG_COLORS, NGU_HANH_RELATIONS } from '../utils/constants';
import { getIconForType } from '../utils/mapUtils';

interface TileProps {
  tile: Tile;
  onClick: (row: number, col: number) => void;
}

const TileComponent: React.FC<TileProps> = ({ tile, onClick }) => {
  const { row, col, type, isDiscovered, isActive } = tile;
  const icon = getIconForType(type);
  const isSpecialTile = type !== 'empty' && type !== 'undiscovered';

  let tileBgClass = 'bg-gray-700 hover:bg-gray-600';
  if (isDiscovered) {
    if (isActive && isSpecialTile) {
      tileBgClass = 'bg-green-700';
    } else {
      const elementType = NGU_HANH_RELATIONS.elementMap[type] || (type === 'empty' ? 'empty' : null);
      tileBgClass = elementType ? ELEMENT_TILE_BG_COLORS[elementType] : 'bg-gray-800';
    }
  }

  return (
    <div
      className={\`relative border border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-200 \${tileBgClass} rounded-md\`}
      style={{ width: TILE_SIZE_PX, height: TILE_SIZE_PX }}
      onClick={() => onClick(row, col)}
    >
      {isDiscovered ? (
        isSpecialTile && (
          <span className="text-xl" style={{ filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)' }}>
            {icon}
          </span>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-200">?</div>
      )}
    </div>
  );
};

interface MapProps {
  map: Tile[][];
  onTileClick: (row: number, col: number) => void;
}

const Map: React.FC<MapProps> = ({ map, onTileClick }) => {
  return (
    <div
      className="grid gap-0.5 p-2 bg-gray-700 rounded-lg shadow-inner"
      style={{
        gridTemplateColumns: \`repeat(\${MAP_SIZE}, \${TILE_SIZE_PX}px)\`,
        gridTemplateRows: \`repeat(\${MAP_SIZE}, \${TILE_SIZE_PX}px)\`,
      }}
    >
      {map.map((row) =>
        row.map((tile) => (
          <TileComponent key={tile.id} tile={tile} onClick={onTileClick} />
        ))
      )}
    </div>
  );
};

export default Map;`,
    'NotificationSystem.tsx': `import { useEffect } from 'react';
import { LogEntry } from '../types/game';

interface NotificationSystemProps {
  notifications: LogEntry[];
  setNotifications: React.Dispatch<React.SetStateAction<LogEntry[]>>;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={\`p-3 rounded-lg shadow-md text-sm \${
            notif.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          } text-white animate-fade-in-up\`}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;`,
    'ResourcePanel.tsx': `import { useState, useEffect, useRef } from 'react';
import { RESOURCE_TYPES, RESOURCE_ICONS } from '../utils/constants';
import { ResourceChanges } from '../types/game';

interface ResourceItemProps {
  type: string;
  amount: number;
  icon: string;
  lastChange: number;
  hasBonus: boolean;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ type, amount, icon, lastChange, hasBonus }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const animationValueRef = useRef(0);

  useEffect(() => {
    if (lastChange > 0) {
      animationValueRef.current = lastChange;
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
        animationValueRef.current = 0;
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [lastChange]);

  return (
    <div className="relative flex flex-col justify-center items-center gap-2 p-1 bg-gray-600 rounded-md overflow-hidden">
      <span className="text-2xl">{icon}</span>
      <span className="font-bold text-green-300">{amount}</span>
      {hasBonus && <span className="text-green-400 font-bold ml-1 text-sm">+</span>}
      {showAnimation && animationValueRef.current > 0 && (
        <span className="absolute text-green-400 font-bold text-xl opacity-0 animate-resource-gain">
          +{animationValueRef.current}
        </span>
      )}
    </div>
  );
};

interface ResourcePanelProps {
  resources: Record<string, number>;
  animatedResourceChanges: ResourceChanges;
  activeSpiritBeastBonuses: Record<string, boolean>;
  toggleAutoHarvest: () => void;
  isAutoHarvesting: boolean;
}

const ResourcePanel: React.FC<ResourcePanelProps> = ({
  resources,
  animatedResourceChanges,
  activeSpiritBeastBonuses,
  toggleAutoHarvest,
  isAutoHarvesting,
}) => {
  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-yellow-300">Tài Nguyên</h3>
        <button
          onClick={toggleAutoHarvest}
          className={\`p-2 rounded-lg text-sm font-bold transition-colors duration-200 shadow-lg \${
            isAutoHarvesting ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'
          } text-white\`}
        >
          {isAutoHarvesting ? '🤖 Tắt Auto' : '🤖 Bật Auto'}
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2 text-xs">
        {RESOURCE_TYPES.map((type) => (
          <ResourceItem
            key={type}
            type={type}
            amount={resources[type] || 0}
            icon={RESOURCE_ICONS[type]}
            lastChange={animatedResourceChanges[type] || 0}
            hasBonus={activeSpiritBeastBonuses[type] || false}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel;`,
    'SourcePanel.tsx': `import { useCallback } from 'react';
import { Source } from '../types/game';
import {
  SOURCE_ICONS,
  NGU_HANH_RELATIONS,
  RESOURCE_ICONS,
  UPGRADE_COSTS,
  MAX_LEVEL_INITIAL_TIER,
  MAX_LEVEL_FINAL,
} from '../utils/constants';

interface SourcePanelProps {
  sources: Record<string, Source>;
  onHarvest: (sourceId: string) => void;
  onUpgrade: (sourceId: string) => void;
  canHarvestOtherSources: boolean;
  resources: Record<string, number>;
  unlockedTier2Upgrades: boolean;
}

const SourcePanel: React.FC<SourcePanelProps> = ({
  sources,
  onHarvest,
  onUpgrade,
  canHarvestOtherSources,
  resources,
  unlockedTier2Upgrades,
}) => {
  const getUpgradeCosts = useCallback(
    (source: Source) => {
      const primaryResourceType = NGU_HANH_RELATIONS.elementMap[source.type];
      const oppositeResourceType = NGU_HANH_RELATIONS.overcomes[primaryResourceType];
      const currentMultiplier =
        source.level < MAX_LEVEL_INITIAL_TIER
          ? UPGRADE_COSTS.source.multiplier
          : UPGRADE_COSTS.source.tier2Multiplier;

      const primaryCost = Math.floor(UPGRADE_COSTS.source.basePrimary * Math.pow(currentMultiplier, source.level - 1));
      const oppositeCost = Math.floor(UPGRADE_COSTS.source.baseOpposite * Math.pow(currentMultiplier, source.level - 1));

      return { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost };
    },
    []
  );

  const sortedSources = Object.values(sources).sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className="p-3 bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold mb-2 text-cyan-300">Nguồn Tài Nguyên</h3>
      <div className="grid grid-cols-5 gap-2">
        {sortedSources.map((source) => {
          const { primaryResourceType, oppositeResourceType, primaryCost, oppositeCost } = getUpgradeCosts(source);
          const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
          const canUpgrade =
            source.level < maxLevelForThisUpgrade &&
            resources[primaryResourceType] >= primaryCost &&
            resources[oppositeResourceType] >= oppositeCost;
          const now = Date.now();
          const cooldownRemaining =
            source.lastHarvestTime + source.cooldown > now
              ? Math.ceil((source.lastHarvestTime + source.cooldown - now) / 1000)
              : 0;
          const canHarvest =
            cooldownRemaining === 0 &&
            source.isActive &&
            (source.type === 'wood_forest' || canHarvestOtherSources);

          return (
            <div key={source.type} className="bg-gray-600 p-2 rounded-md flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <span className="text-base font-bold flex items-center gap-1">
                  {SOURCE_ICONS[source.type]} ({source.level})
                </span>
                <span className={\`text-xs \${source.isActive ? 'text-green-400' : 'text-red-400'}\`}>
                  {source.isActive ? 'Kích hoạt' : 'Chưa Kích hoạt'}
                </span>
              </div>
              <div className="flex flex-col text-xs">
                <span>+ {Math.floor(source.yield)} {RESOURCE_ICONS[primaryResourceType]}</span>
                <span>
                  + {Math.floor(source.yield / 5)} {RESOURCE_ICONS[NGU_HANH_RELATIONS.generates[primaryResourceType]]}
                </span>
                <span>🕒 {Math.ceil(source.cooldown / 1000)}s</span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <button
                  onClick={() => onHarvest(source.type)}
                  disabled={!canHarvest}
                  className={\`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200 \${
                    canHarvest
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }\`}
                  title="Thu Hoạch"
                >
                  {cooldownRemaining > 0 ? \`(\${cooldownRemaining}s)\` : '👐'}
                </button>
                <button
                  onClick={() => onUpgrade(source.type)}
                  disabled={!canUpgrade || !source.isActive}
                  className={\`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200 \${
                    canUpgrade && source.isActive
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }\`}
                  title="Nâng Cấp"
                >
                  ⬆️
                </button>
              </div>
              {!canUpgrade && source.isActive && source.level < maxLevelForThisUpgrade && (
                <p className="text-xs text-red-300 mt-0.5">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {oppositeCost}{' '}
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

export default SourcePanel;`,
    'SpiritBeastPanel.tsx': `import { useCallback } from 'react';
import { SpiritBeast } from '../types/game';
import {
  SPIRIT_BEAST_ICONS,
  NGU_HANH_RELATIONS,
  RESOURCE_ICONS,
  UPGRADE_COSTS,
  MAX_LEVEL_INITIAL_TIER,
  MAX_LEVEL_FINAL,
} from '../utils/constants';

interface SpiritBeastPanelProps {
  spiritBeasts: Record<string, SpiritBeast>;
  onUpgrade: (spiritBeastId: string) => void;
  resources: Record<string, number>;
  unlockedTier2Upgrades: boolean;
}

const SpiritBeastPanel: React.FC<SpiritBeastPanelProps> = ({ spiritBeasts, onUpgrade, resources, unlockedTier2Upgrades }) => {
  const getUpgradeCosts = useCallback(
    (beast: SpiritBeast) => {
      const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
      const generatesResourceType = NGU_HANH_RELATIONS.generates[primaryResourceType];
      const currentMultiplier =
        beast.level < MAX_LEVEL_INITIAL_TIER
          ? UPGRADE_COSTS.spiritBeast.multiplier
          : UPGRADE_COSTS.spiritBeast.tier2Multiplier;

      const primaryCost = Math.floor(UPGRADE_COSTS.spiritBeast.basePrimary * Math.pow(currentMultiplier, beast.level - 1));
      const generatesCost = Math.floor(UPGRADE_COSTS.spiritBeast.baseGenerates * Math.pow(currentMultiplier, beast.level - 1));

      return { primaryResourceType, generatesResourceType, primaryCost, generatesCost };
    },
    []
  );

  const sortedSpiritBeasts = Object.values(spiritBeasts).sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-inner">
      <div className="grid grid-cols-5 gap-2">
        {sortedSpiritBeasts.map((beast) => {
          const { primaryResourceType, generatesResourceType, primaryCost, generatesCost } = getUpgradeCosts(beast);
          const maxLevelForThisUpgrade = unlockedTier2Upgrades ? MAX_LEVEL_FINAL : MAX_LEVEL_INITIAL_TIER;
          const canUpgrade =
            beast.level < maxLevelForThisUpgrade &&
            resources[primaryResourceType] >= primaryCost &&
            resources[generatesResourceType] >= generatesCost;

          return (
            <div key={beast.type} className="bg-gray-600 p-3 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-lg font-bold flex items-center gap-1">
                  {SPIRIT_BEAST_ICONS[beast.type]} ({beast.level})
                </span>
                <span className={beast.isActive ? 'text-green-400' : 'text-red-400'}>
                  {beast.isActive ? 'Kích hoạt' : 'Chưa Kích hoạt'}
                </span>
              </div>
              <button
                onClick={() => onUpgrade(beast.type)}
                disabled={!canUpgrade || !beast.isActive}
                className={\`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 mt-2 \${
                  canUpgrade && beast.isActive
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }\`}
              >
                ⬆️
              </button>
              {!canUpgrade && beast.isActive && beast.level < maxLevelForThisUpgrade && (
                <p className="text-xs text-red-300 mt-1">
                  -: {primaryCost} {RESOURCE_ICONS[primaryResourceType]}, {generatesCost}{' '}
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

export default SpiritBeastPanel;`,
  },
  'pages': {
    'index.tsx': `import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import { GameState, LogEntry, ResourceChanges } from '../types/game';
import { initializeGame, loadGame, saveGame } from '../utils/gameLogic';
import { generateMapContent } from '../utils/mapUtils';
import { discoverTile, activateTile, harvestSource, upgradeSource, upgradeSpiritBeast } from '../utils/gameActions';
import { GAME_PHASE_INITIAL, GAME_PHASE_ADVANCED, MAX_LEVEL_INITIAL_TIER } from '../utils/constants';
import styles from '../styles/Home.module.css';

const ResourcePanel = dynamic(() => import('../components/ResourcePanel'), { ssr: false });
const Map = dynamic(() => import('../components/Map'), { ssr: false });
const SourcePanel = dynamic(() => import('../components/SourcePanel'), { ssr: false });
const SpiritBeastPanel = dynamic(() => import('../components/SpiritBeastPanel'), { ssr: false });
const ActivityLog = dynamic(() => import('../components/ActivityLog'), { ssr: false });
const NotificationSystem = dynamic(() => import('../components/NotificationSystem'), { ssr: false });

const Home: NextPage = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = loadGame();
    return savedState || initializeGame();
  });
  const { currentMapId, maps, resources, canHarvestOtherSources, unlockedTier2Upgrades } = gameState;
  const currentMapData = maps[currentMapId];
  const [notifications, setNotifications] = useState<LogEntry[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const savedState = loadGame();
    return savedState ? savedState.logs : [];
  });
  const [isAutoHarvesting, setIsAutoHarvesting] = useState<boolean>(gameState.isAutoHarvestingOnLoad || false);
  const [animatedResourceChanges, setAnimatedResourceChanges] = useState<ResourceChanges>({});
  const [activeSpiritBeastBonuses, setActiveSpiritBeastBonuses] = useState<{ [key: string]: boolean }>({});

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const logEntry: LogEntry = { timestamp: Date.now(), message, type };
    setNotifications((prev) => [...prev, logEntry]);
    setLogs((prev) => [...prev, logEntry]);
  }, []);

  useEffect(() => {
    saveGame(gameState, isAutoHarvesting);
    if (gameState.lastPlayedTime && gameState.isAutoHarvestingOnLoad) {
      const offlineDuration = Date.now() - gameState.lastPlayedTime;
      if (offlineDuration > 0) {
        setGameState((prevGameState) => {
          let updatedGameState = { ...prevGameState };
          let totalOfflineYield: ResourceChanges = {};
          let harvestedAnyOffline = false;

          const currentMap = updatedGameState.maps[updatedGameState.currentMapId];
          const sourcesToProcess = { ...currentMap.sources };

          for (const sourceKey in sourcesToProcess) {
            const source = sourcesToProcess[sourceKey];
            if (source.isActive) {
              const elapsedTimeSinceLastHarvest = Date.now() - source.lastHarvestTime;
              const numHarvests = Math.floor(elapsedTimeSinceLastHarvest / source.cooldown);

              if (numHarvests > 0) {
                const harvestResult = harvestSource(updatedGameState, sourceKey, true);
                if (harvestResult.success) {
                  updatedGameState = harvestResult.newState;
                  for (const resType in harvestResult.yieldedAmounts) {
                    totalOfflineYield[resType] = (totalOfflineYield[resType] || 0) + harvestResult.yieldedAmounts[resType];
                  }
                  harvestedAnyOffline = true;
                }
              }
            }
          }

          if (harvestedAnyOffline) {
            addLog(
              \`Đã thu hoạch ngoại tuyến: \${Object.entries(totalOfflineYield)
                .map(([type, amount]) => \`\${amount} \${type}\`)
                .join(', ')}\`,
              'success'
            );
          }

          updatedGameState.lastPlayedTime = Date.now();
          return updatedGameState;
        });
      }
    }

    const handleBeforeUnload = () => saveGame(gameState, isAutoHarvesting);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameState, isAutoHarvesting, addLog]);

  useEffect(() => {
    const newActiveBonuses: { [key: string]: boolean } = {};
    if (currentMapData?.spiritBeasts) {
      for (const key in currentMapData.spiritBeasts) {
        const beast = currentMapData.spiritBeasts[key];
        if (beast.isActive) {
          const primaryResourceType = NGU_HANH_RELATIONS.elementMap[beast.type];
          if (primaryResourceType) newActiveBonuses[primaryResourceType] = true;
        }
      }
    }
    setActiveSpiritBeastBonuses(newActiveBonuses);
  }, [currentMapData?.spiritBeasts]);

  useEffect(() => {
    if (currentMapId === GAME_PHASE_INITIAL && maps[GAME_PHASE_INITIAL]) {
      const initialSources = maps[GAME_PHASE_INITIAL].sources;
      const initialSpiritBeasts = maps[GAME_PHASE_INITIAL].spiritBeasts;

      const allSourcesMaxed = Object.values(initialSources).every((s) => s.level >= MAX_LEVEL_INITIAL_TIER);
      const allSpiritBeastsMaxed = Object.values(initialSpiritBeasts).every((sb) => sb.level >= MAX_LEVEL_INITIAL_TIER);

      if (allSourcesMaxed && allSpiritBeastsMaxed && !maps[GAME_PHASE_ADVANCED]) {
        addLog('Tất cả nguồn và linh thú đã đạt cấp tối đa ban đầu! Đang mở khóa bản đồ mới...', 'info');
        const advancedMapContent = generateMapContent(MAP_SIZE);
        setGameState((prev) => ({
          ...prev,
          currentMapId: GAME_PHASE_ADVANCED,
          maps: {
            ...prev.maps,
            [GAME_PHASE_ADVANCED]: {
              map: advancedMapContent.map,
              sources: advancedMapContent.sources,
              spiritBeasts: advancedMapContent.spiritBeasts,
            },
          },
          canHarvestOtherSources: true,
        }));
        addLog('Bản đồ mới đã được mở khóa! Hãy khám phá và kích hoạt các Linh Thú trên bản đồ này để mở khóa nâng cấp cấp độ tiếp theo (lên đến cấp 20)!', 'success');
      }
    }
  }, [currentMapId, maps, addLog]);

  const performAutoHarvest = useCallback(() => {
    setGameState((prevGameState) => {
      let currentGameState = { ...prevGameState };
      let harvestedCount = 0;
      let totalYieldedAmounts: ResourceChanges = {};

      const currentSources = currentGameState.maps[currentGameState.currentMapId].sources;

      for (const sourceKey in currentSources) {
        const source = currentSources[sourceKey];
        const now = Date.now();
        const canHarvest =
          source.isActive &&
          source.lastHarvestTime + source.cooldown <= now &&
          (currentGameState.currentMapId === GAME_PHASE_ADVANCED ||
            sourceKey === 'wood_forest' ||
            currentGameState.canHarvestOtherSources);

        if (canHarvest) {
          const harvestResult = harvestSource(currentGameState, sourceKey);
          if (harvestResult.success) {
            currentGameState = harvestResult.newState;
            addLog(harvestResult.message, 'success');
            harvestedCount++;
            for (const resType in harvestResult.yieldedAmounts) {
              totalYieldedAmounts[resType] =
                (totalYieldedAmounts[resType] || 0) + harvestResult.yieldedAmounts[resType];
            }
          }
        }
      }

      if (Object.keys(totalYieldedAmounts).length > 0) {
        setAnimatedResourceChanges(totalYieldedAmounts);
        setTimeout(() => setAnimatedResourceChanges({}), 800);
      }

      return harvestedCount > 0 ? currentGameState : prevGameState;
    });
  }, [addLog]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoHarvesting) {
      intervalId = setInterval(performAutoHarvest, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoHarvesting, performAutoHarvest]);

  const handleTileClick = useCallback(
    (row: number, col: number) => {
      const tile = currentMapData.map[row][col];
      if (!tile.isDiscovered) {
        const result = discoverTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, 'info');
        } else {
          addLog(result.message, 'error');
        }
      } else if (tile.isDiscovered && !tile.isActive && tile.type !== 'empty') {
        const result = activateTile(gameState, row, col);
        if (result.success) {
          setGameState(result.newState);
          addLog(result.message, 'success');
        } else {
          addLog(result.message, 'error');
        }
      }
    },
    [gameState, currentMapData, addLog]
  );

  const handleHarvest = useCallback(
    (sourceId: string) => {
      const result = harvestSource(gameState, sourceId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, 'success');
        setAnimatedResourceChanges(result.yieldedAmounts);
        setTimeout(() => setAnimatedResourceChanges({}), 800);
      } else {
        addLog(result.message, 'error');
      }
    },
    [gameState, addLog]
  );

  const handleUpgradeSource = useCallback(
    (sourceId: string) => {
      const result = upgradeSource(gameState, sourceId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, 'success');
      } else {
        addLog(result.message, 'error');
      }
    },
    [gameState, addLog]
  );

  const handleUpgradeSpiritBeast = useCallback(
    (spiritBeastId: string) => {
      const result = upgradeSpiritBeast(gameState, spiritBeastId);
      if (result.success) {
        setGameState(result.newState);
        addLog(result.message, 'success');
      } else {
        addLog(result.message, 'error');
      }
    },
    [gameState, addLog]
  );

  const toggleAutoHarvest = () => {
    setIsAutoHarvesting((prev) => {
      const newState = !prev;
      addLog(newState ? 'Đã bật chế độ thu hoạch tự động.' : 'Đã tắt chế độ thu hoạch tự động.', 'info');
      return newState;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ngũ Hành Khám Phá</title>
        <meta name="description" content="Ngũ Hành Khám Phá - Game chiến lược dựa trên nguyên lý Ngũ Hành" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{\`
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
        .animate-resource-gain {
          animation: resource-gain 0.7s ease-out forwards;
        }
        @keyframes resource-gain {
          0% { transform: translateY(0); opacity: 1; }
          20% { transform: translateY(-15px); opacity: 1; }
          80% { transform: translateY(-25px); opacity: 0.5; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
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
      \`}</style>
      <main className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-500 drop-shadow-lg text-center">
          Ngũ Hành Khám Phá
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-4 mx-auto">
          <div className="w-full bg-gray-800 p-2 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-200">
              Bản Đồ Khám Phá ({currentMapId === GAME_PHASE_INITIAL ? 'Ban Đầu' : 'Nâng Cao'})
            </h2>
            {currentMapData && <Map map={currentMapData.map} onTileClick={handleTileClick} />}
            <p className="text-sm text-gray-400 mt-4 text-center">
              Nhấp vào ô chưa khám phá để lộ diện. Nhấp lần thứ hai vào ô đã khám phá để kích hoạt nguồn/linh thú.
            </p>
            <ActivityLog logs={logs} />
          </div>
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
        <NotificationSystem notifications={notifications} setNotifications={setNotifications} />
      </main>
    </div>
  );
};

export default Home;`,
  },
  'styles': {
    'Home.module.css': `.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1f2937;
  color: #ffffff;
  padding: 1rem;
}`,
  },
  'types': {
    'game.ts': `export interface Tile {
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
}`,
  },
  'utils': {
    'constants.ts': `export const MAP_SIZE = 10;
export const TILE_SIZE_PX = 32;

export const RESOURCE_TYPES = ['metal', 'wood', 'water', 'fire', 'earth'] as const;

export const RESOURCE_ICONS: Record<string, string> = {
  metal: '💰',
  wood: '🌳',
  water: '💧',
  fire: '🔥',
  earth: '⛰️',
};

export const SPIRIT_BEAST_ICONS: Record<string, string> = {
  spirit_metal: '🐉',
  spirit_wood: '🦌',
  spirit_water: '🐢',
  spirit_fire: '🦅',
  spirit_earth: '🐻',
};

export const SOURCE_ICONS: Record<string, string> = {
  metal_mine: '⛏️',
  wood_forest: '🌲',
  water_spring: '🌊',
  fire_forge: '🌋',
  earth_field: '🌾',
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
  },
};

export const ELEMENT_TILE_BG_COLORS: Record<string, string> = {
  metal: 'bg-gray-500',
  wood: 'bg-lime-700',
  water: 'bg-blue-700',
  fire: 'bg-red-700',
  earth: 'bg-amber-700',
  empty: 'bg-gray-800',
};

export const BASE_RESOURCE_YIELD = 10;
export const BASE_HARVEST_COOLDOWN_MS = 10 * 1000;
export const UPGRADE_COSTS = {
  source: {
    basePrimary: 50,
    baseOpposite: 20,
    multiplier: 1.5,
    tier2Multiplier: 1.8,
  },
  spiritBeast: {
    basePrimary: 40,
    baseGenerates: 15,
    multiplier: 1.4,
    tier2Multiplier: 1.7,
  },
};
export const SPIRIT_BEAST_BONUS_PER_LEVEL = 0.05;
export const DISCOVERY_COST_AMOUNT = 5;
export const ACTIVATION_COST_AMOUNT = 5;
export const MAX_LEVEL_INITIAL_TIER = 10;
export const MAX_LEVEL_FINAL = 20;
export const GAME_PHASE_INITIAL = 'initial';
export const GAME_PHASE_ADVANCED = 'advanced';`,
    'gameLogic.ts': `import { GameState, MapData } from '../types/game';
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
};`,
    'gameActions.ts': `import { GameState, ActionResult, Tile, ResourceChanges } from '../types/game';
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
      message: \`Không đủ tài nguyên để khám phá ô này. Cần \${costAmount} \${costType}.\`,
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
    message: \`Đã khám phá ô tại (\${row}, \${col}). Mất \${costAmount} \${costType}.\`,
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
        message: \`Không đủ tài nguyên để kích hoạt. Cần \${ACTIVATION_COST_AMOUNT} \${generatingResource}.\`,
      };
    }

    newResources[generatingResource] -= ACTIVATION_COST_AMOUNT;
    currentMapData.sources[tile.type].isActive = true;
    tile.isActive = true;
    message = \`Đã kích hoạt nguồn \${tile.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')}! Mất \${ACTIVATION_COST_AMOUNT} \${generatingResource}.\`;
  } else if (currentMapData.spiritBeasts[tile.type]) {
    currentMapData.spiritBeasts[tile.type].isActive = true;
    tile.isActive = true;
    message = \`Đã kích hoạt linh thú \${tile.type.replace('spirit_', 'Linh Thú ')}!\`;

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
      message: \`Nguồn này đang hồi chiêu. Chờ \${remainingTime} giây.\`,
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
  const spiritBeastType = \`spirit_\${primaryResourceType}\`;
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
    message: \`Đã thu hoạch \${actualYield} \${primaryResourceType} và \${generatedYield} \${generatedResourceType} từ \${source.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')}!\`,
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
      message: \`Nguồn này đã đạt cấp tối đa (\${source.level}). \${
        source.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades
          ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.'
          : ''
      }\`,
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
      message: \`Không đủ tài nguyên để nâng cấp. Cần \${primaryCost} \${primaryResourceType} và \${oppositeCost} \${oppositeResourceType}.\`,
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
    message: \`Đã nâng cấp \${source.type
      .replace('_', ' ')
      .replace('mine', 'Mỏ')
      .replace('forest', 'Rừng')
      .replace('spring', 'Suối')
      .replace('forge', 'Lò')
      .replace('field', 'Đất')} lên cấp \${source.level}!\`,
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
      message: \`Linh thú này đã đạt cấp tối đa (\${spiritBeast.level}). \${
        spiritBeast.level >= MAX_LEVEL_INITIAL_TIER && !unlockedTier2Upgrades
          ? 'Cần kích hoạt tất cả linh thú trên bản đồ mới để tiếp tục nâng cấp.'
          : ''
      }\`,
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
      message: \`Không đủ tài nguyên để nâng cấp. Cần \${primaryCost} \${primaryResourceType} và \${generatesCost} \${generatesResourceType}.\`,
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
    message: \`Đã nâng cấp \${spiritBeast.type.replace('spirit_', 'Linh Thú ')} lên cấp \${spiritBeast.level}!\`,
  };
};`,
    'mapUtils.ts': `import { Tile, MapData } from '../types/game';
import {
  MAP_SIZE,
  RESOURCE_ICONS,
  SPIRIT_BEAST_ICONS,
  SOURCE_ICONS,
  BASE_RESOURCE_YIELD,
  BASE_HARVEST_COOLDOWN_MS,
  SPIRIT_BEAST_BONUS_PER_LEVEL,
} from './constants';

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getIconForType = (type: string): string => {
  return (
    RESOURCE_ICONS[type] ||
    SPIRIT_BEAST_ICONS[type] ||
    SOURCE_ICONS[type] ||
    ''
  );
};

export const generateMapContent = (size: number): MapData => {
  const newMap: Tile[][] = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => ({
      id: \`\${r}-\${c}\`,
      row: r,
      col: c,
      type: 'undiscovered',
      isDiscovered: false,
      isActive: false,
      hiddenType: 'empty',
    }))
  );

  const availablePositions: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      availablePositions.push({ r, c });
    }
  }

  const typesToPlace = [
    'metal_mine',
    'wood_forest',
    'water_spring',
    'fire_forge',
    'earth_field',
    'spirit_metal',
    'spirit_wood',
    'spirit_water',
    'spirit_fire',
    'spirit_earth',
  ];

  const sources: Record<string, any> = {};
  const spiritBeasts: Record<string, any> = {};

  typesToPlace.forEach((type) => {
    if (availablePositions.length === 0) return;
    const randomIndex = getRandomInt(0, availablePositions.length - 1);
    const { r, c } = availablePositions.splice(randomIndex, 1)[0];

    newMap[r][c].hiddenType = type;

    if (type.includes('_mine') || type.includes('_forest') || type.includes('_spring') || type.includes('_forge') || type.includes('_field')) {
      sources[type] = {
        type,
        level: 1,
        lastHarvestTime: 0,
        cooldown: BASE_HARVEST_COOLDOWN_MS,
        yield: BASE_RESOURCE_YIELD,
        isActive: false,
        row: r,
        col: c,
      };
    } else if (type.includes('spirit_')) {
      spiritBeasts[type] = {
        type,
        level: 1,
        bonus: SPIRIT_BEAST_BONUS_PER_LEVEL,
        isActive: false,
        row: r,
        col: c,
      };
    }
  });

  return { map: newMap, sources, spiritBeasts };
};`,
  },
  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;`,
  'package.json': `{
  "name": "ngu-hanh-game",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "typescript": "^5"
  }
}`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
};

// Function to create directories and files
function createProjectStructure(basePath, structure) {
  Object.entries(structure).forEach(([key, value]) => {
    const fullPath = path.join(basePath, key);
    
    if (typeof value === 'string') {
      // It's a file
      fs.writeFileSync(fullPath, value, 'utf8');
      console.log(`Created file: ${fullPath}`);
    } else {
      // It's a directory
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
      createProjectStructure(fullPath, value);
    }
  });
}

// Create the public directory and a placeholder favicon
function createPublicDirectory(basePath) {
  const publicPath = path.join(basePath, 'public');
  fs.mkdirSync(publicPath, { recursive: true });
  console.log(`Created directory: ${publicPath}`);
  
  // Create a minimal favicon.ico (placeholder)
  const faviconPath = path.join(publicPath, 'favicon.ico');
  fs.writeFileSync(faviconPath, '');
  console.log(`Created placeholder file: ${faviconPath}`);
}

// Main function to set up the project
function setupProject() {
  const projectRoot = path.join(process.cwd(), 'ngu-hanh-game');
  
  try {
    // Create project root directory
    fs.mkdirSync(projectRoot, { recursive: true });
    console.log(`Created project root: ${projectRoot}`);
    
    // Create project structure
    createProjectStructure(projectRoot, projectStructure);
    
    // Create public directory and favicon
    createPublicDirectory(projectRoot);
    
    console.log('\nProject structure created successfully!');
    console.log('\nNext steps:');
    console.log(`1. Navigate to the project directory: cd ngu-hanh-game`);
    console.log(`2. Install dependencies: npm install`);
    console.log(`3. Run the development server: npm run dev`);
    console.log(`4. Open http://localhost:3000 in your browser`);
  } catch (error) {
    console.error('Error creating project structure:', error);
  }
}

// Run the setup
setupProject();