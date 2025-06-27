import { Tile, MapData } from '../types/game';
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
      id: `${r}-${c}`,
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
};