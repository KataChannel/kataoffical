import { Character } from "./character";
export interface Tile {
  x: number;
  y: number;
  terrain: 'plain' | 'forest' | 'mountain' | 'wall';
  occupiedBy?: Character;
}