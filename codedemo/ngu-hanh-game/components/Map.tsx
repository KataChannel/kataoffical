import { Tile } from '../types/game';
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
      className={`relative border border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-200 ${tileBgClass} rounded-md`}
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
        gridTemplateColumns: `repeat(${MAP_SIZE}, ${TILE_SIZE_PX}px)`,
        gridTemplateRows: `repeat(${MAP_SIZE}, ${TILE_SIZE_PX}px)`,
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

export default Map;