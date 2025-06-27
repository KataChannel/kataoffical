import { useState, useEffect, useRef } from 'react';
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
          className={`p-2 rounded-lg text-sm font-bold transition-colors duration-200 shadow-lg ${
            isAutoHarvesting ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'
          } text-white`}
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

export default ResourcePanel;