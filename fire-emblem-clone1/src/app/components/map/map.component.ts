import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character';
import { Tile } from '../../models/tile';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Tile[][] = [];
  selectedCharacter: Character | null = null;
  currentTurn: 'player' | 'enemy' = 'player';
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.map = this.gameService.map;
    this.currentTurn = this.gameService.currentTurn;
  }

  selectTile(tile: Tile) {
    if (this.selectedCharacter) {
      if (tile.occupiedBy && tile.occupiedBy.team !== this.selectedCharacter.team) {
        this.gameService.attack(this.selectedCharacter, tile.occupiedBy);
      } else {
        this.gameService.moveCharacter(this.selectedCharacter, tile.x, tile.y);
      }
      this.selectedCharacter = null;
    } else if (tile.occupiedBy && tile.occupiedBy.team === 'player') {
      this.selectedCharacter = tile.occupiedBy;
    }
  }

  endTurn() {
    this.gameService.endTurn();
    this.selectedCharacter = null;
  }
}