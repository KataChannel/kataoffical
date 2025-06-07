export interface Character {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  position: { x: number; y: number };
  moveRange: number;
  attackRange: number;
  team: 'player' | 'enemy';
}