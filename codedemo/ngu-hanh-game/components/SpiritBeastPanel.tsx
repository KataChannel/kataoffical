import { useCallback } from 'react';
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
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-200 mt-2 ${
                  canUpgrade && beast.isActive
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
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

export default SpiritBeastPanel;