import { useCallback } from 'react';
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
                <span className={`text-xs ${source.isActive ? 'text-green-400' : 'text-red-400'}`}>
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
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200 ${
                    canHarvest
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                  title="Thu Hoạch"
                >
                  {cooldownRemaining > 0 ? `(${cooldownRemaining}s)` : '👐'}
                </button>
                <button
                  onClick={() => onUpgrade(source.type)}
                  disabled={!canUpgrade || !source.isActive}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors duration-200 ${
                    canUpgrade && source.isActive
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
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

export default SourcePanel;