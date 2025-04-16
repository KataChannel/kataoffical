// abc/data/fruits.ts
import { FruitData } from '../interfaces/fruit.interface';

export const ALL_FRUITS: FruitData[] = [
     { id: 'kim_lan', name: 'Kim Lan', element: 'Kim', growthTimeSeconds: 10, harvestYield: 2, spriteKeySeed: 'seed_kim', spriteKeyGrowing: 'growing_kim', spriteKeyReady: 'ready_kim' },
     { id: 'moc_dao', name: 'Mộc Đào', element: 'Mộc', growthTimeSeconds: 15, harvestYield: 3, spriteKeySeed: 'seed_moc', spriteKeyGrowing: 'growing_moc', spriteKeyReady: 'ready_moc' },
     { id: 'thuy_le', name: 'Thủy Lê', element: 'Thủy', growthTimeSeconds: 20, harvestYield: 2, spriteKeySeed: 'seed_thuy', spriteKeyGrowing: 'growing_thuy', spriteKeyReady: 'ready_thuy' },
     { id: 'hoa_luu', name: 'Hỏa Lựu', element: 'Hỏa', growthTimeSeconds: 25, harvestYield: 1, spriteKeySeed: 'seed_hoa', spriteKeyGrowing: 'growing_hoa', spriteKeyReady: 'ready_hoa' },
     { id: 'tho_ngo', name: 'Thổ Ngô', element: 'Thổ', growthTimeSeconds: 30, harvestYield: 5, spriteKeySeed: 'seed_tho', spriteKeyGrowing: 'growing_tho', spriteKeyReady: 'ready_tho' },
];

export function getFruitDataById(id: string): FruitData | undefined {
    return ALL_FRUITS.find(fruit => fruit.id === id);
}