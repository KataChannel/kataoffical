import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private app!: PIXI.Application;
  private character!: PIXI.AnimatedSprite;
  private cropSprites: PIXI.AnimatedSprite[] = [];
  private direction: string = 'down';
  private isMoving: boolean = false;
  private growInterval: any;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.app = new PIXI.Application({
      view: this.gameCanvas.nativeElement,
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb
    });

    this.loadAssets();

    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.growInterval = setInterval(() => {
      this.gameService.growCrops();
      this.updateCrops();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.growInterval);
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.app.destroy(true);
  }

  loadAssets() {
    PIXI.Assets.load([
      'assets/sprites/grass.png',
      'assets/sprites/soil.png',
      'assets/sprites/character_walk.png',
      'assets/sprites/crop_growth.png'
    ]).then(() => {
      this.drawMap();
    });
  }

  drawMap() {
    const tileSize = 32;
    const mapWidth = 20;
    const mapHeight = 15;

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tile = new PIXI.Sprite(PIXI.Texture.from('assets/sprites/grass.png'));
        tile.x = x * tileSize;
        tile.y = y * tileSize;
        tile.width = tileSize;
        tile.height = tileSize;
        this.app.stage.addChild(tile);

        if (x >= 10 && y <= 5) {
          const soil = new PIXI.Sprite(PIXI.Texture.from('assets/sprites/soil.png'));
          soil.x = x * tileSize;
          soil.y = y * tileSize;
          soil.width = tileSize;
          soil.height = tileSize;
          this.app.stage.addChild(soil);

          this.gameService.plantCrop(x * tileSize, y * tileSize, 'wheat');
        }
      }
    }

    const textures: { [key: string]: PIXI.Texture[] } = {
      up: [],
      down: [],
      left: [],
      right: []
    };

    const frameWidth = 32;
    const frameHeight = 32;

    for (let i = 0; i < 4; i++) {
      textures.down.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/character_walk.png').baseTexture, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight)));
      textures.up.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/character_walk.png').baseTexture, new PIXI.Rectangle(i * frameWidth, frameHeight, frameWidth, frameHeight)));
      textures.left.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/character_walk.png').baseTexture, new PIXI.Rectangle(i * frameWidth, frameHeight * 2, frameWidth, frameHeight)));
      textures.right.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/character_walk.png').baseTexture, new PIXI.Rectangle(i * frameWidth, frameHeight * 3, frameWidth, frameHeight)));
    }

    this.character = new PIXI.AnimatedSprite(textures.down);
    this.character.x = this.gameService.getCharacterPosition().x;
    this.character.y = this.gameService.getCharacterPosition().y;
    this.character.width = 32;
    this.character.height = 32;
    this.character.animationSpeed = 0.1;
    this.character.play();
    this.app.stage.addChild(this.character);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.isMoving = true;
    let newDirection = this.direction;

    switch (event.key) {
      case 'ArrowUp':
        this.gameService.moveCharacter('up');
        newDirection = 'up';
        break;
      case 'ArrowDown':
        this.gameService.moveCharacter('down');
        newDirection = 'down';
        break;
      case 'ArrowLeft':
        this.gameService.moveCharacter('left');
        newDirection = 'left';
        break;
      case 'ArrowRight':
        this.gameService.moveCharacter('right');
        newDirection = 'right';
        break;
    }

    if (newDirection !== this.direction) {
      this.direction = newDirection;
      const textures = {
        up: this.character.textures.slice(4, 8),
        down: this.character.textures.slice(0, 4),
        left: this.character.textures.slice(8, 12),
        right: this.character.textures.slice(12, 16)
      };
      this.character.textures = textures[this.direction as keyof typeof textures];
      this.character.play();
    }

    const position = this.gameService.getCharacterPosition();
    this.character.x = position.x;
    this.character.y = position.y;
  }

  handleKeyUp(event: KeyboardEvent) {
    this.isMoving = false;
    this.character.stop();
  }

  updateCrops() {
    this.cropSprites.forEach(sprite => this.app.stage.removeChild(sprite));
    this.cropSprites = [];

    const textures: { [key: string]: PIXI.Texture[] } = {
      seed: [],
      growing: [],
      mature: []
    };

    const frameWidth = 32;
    const frameHeight = 32;

    for (let i = 0; i < 4; i++) {
      textures.seed.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/crop_growth.png').baseTexture, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight)));
      textures.growing.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/crop_growth.png').baseTexture, new PIXI.Rectangle(i * frameWidth, frameHeight, frameWidth, frameHeight)));
      textures.mature.push(new PIXI.Texture(PIXI.Texture.from('assets/sprites/crop_growth.png').baseTexture, new PIXI.Rectangle(i * frameWidth, frameHeight * 2, frameWidth, frameHeight)));
    }

    const crops = this.gameService.getCrops();
    crops.forEach(crop => {
      let stage = 'seed';
      if (crop.growth >= 66) {
        stage = 'mature';
      } else if (crop.growth >= 33) {
        stage = 'growing';
      }

      const cropSprite = new PIXI.AnimatedSprite(textures[stage as keyof typeof textures]);
      cropSprite.x = crop.x;
      cropSprite.y = crop.y;
      cropSprite.width = 32;
      cropSprite.height = 32;
      cropSprite.animationSpeed = 0.05;
      cropSprite.play();
      this.app.stage.addChild(cropSprite);
      this.cropSprites.push(cropSprite);
    });
  }
}