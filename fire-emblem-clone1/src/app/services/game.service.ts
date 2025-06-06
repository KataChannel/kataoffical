import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { Tile } from '../models/tile';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  map: Tile[][] = [];
  characters: Character[] = [];
  currentTurn: 'player' | 'enemy' = 'player';

  constructor() {
    this.initializeMap(10, 10);
    this.initializeCharacters();
  }

  initializeMap(width: number, height: number) {
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ x, y, terrain: 'plain' });
      }
      this.map.push(row);
    }
  }

  initializeCharacters() {
    this.characters = [
      {
        id: 1,
        name: 'Sigurd',
        hp: 30,
        maxHp: 30,
        attack: 15,
        defense: 10,
        position: { x: 0, y: 0 },
        moveRange: 5,
        attackRange: 1,
        team: 'player'
      },
      {
        id: 2,
        name: 'Enemy',
        hp: 25,
        maxHp: 25,
        attack: 12,
        defense: 8,
        position: { x: 8, y: 8 },
        moveRange: 4,
        attackRange: 1,
        team: 'enemy'
      }
    ];
    this.updateMap();
  }

  moveCharacter(character: Character, x: number, y: number) {
    if (this.isValidMove(character, x, y)) {
      character.position = { x, y };
      this.updateMap();
    }
  }

  isValidMove(character: Character, x: number, y: number): boolean {
    const distance = Math.abs(character.position.x - x) + Math.abs(character.position.y - y);
    return distance <= character.moveRange && !this.map[y][x].occupiedBy && x >= 0 && y >= 0 && x < this.map[0].length && y < this.map.length;
  }

  attack(attacker: Character, target: Character) {
    const distance = Math.abs(attacker.position.x - target.position.x) + Math.abs(attacker.position.y - target.position.y);
    if (distance <= attacker.attackRange) {
      const damage = Math.max(0, attacker.attack - target.defense);
      target.hp = Math.max(0, target.hp - damage);
      if (target.hp === 0) {
        this.characters = this.characters.filter(c => c.id !== target.id);
      }
      this.updateMap();
    }
  }

  updateMap() {
    this.map.forEach(row => row.forEach(tile => (tile.occupiedBy = undefined)));
    this.characters.forEach(char => {
      this.map[char.position.y][char.position.x].occupiedBy = char;
    });
  }

  endTurn() {
    this.currentTurn = this.currentTurn === 'player' ? 'enemy' : 'player';
  }
}