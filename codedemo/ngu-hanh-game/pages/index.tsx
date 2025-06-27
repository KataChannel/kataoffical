import type { NextPage } from 'next';
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
              `Đã thu hoạch ngoại tuyến: ${Object.entries(totalOfflineYield)
                .map(([type, amount]) => `${amount} ${type}`)
                .join(', ')}`,
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
      <style jsx global>{`
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
      `}</style>
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

export default Home;