import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameService } from '../../services/game.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private gameService: GameService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.app = new PIXI.Application({
      view: this.gameCanvas.nativeElement,
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb
    });

    this.loadAssets();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
      window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

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



    const baseTexture:any = PIXI.Texture.from('assets/sprites/crop_growth.png').baseTexture;

    if (!baseTexture.valid) {
        console.error('Failed to load crop texture');
        return; // Early return if texture fails to load
    }

    const textures: { [key: string]: PIXI.Texture[] } = {
        seed: [],
        growing: [],
        mature: []
    };

    const frameWidth = 32;
    const frameHeight = 32;

    for (let i = 0; i < 4; i++) {
      const downTexture:any = new PIXI.Texture(baseTexture);
      downTexture.frame = new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight);
      textures['down'].push(downTexture);
      const upTexture:any = new PIXI.Texture(baseTexture);
      upTexture.frame = new PIXI.Rectangle(i * frameWidth, frameHeight, frameWidth, frameHeight);
      textures['up'].push(upTexture);
      const leftTexture:any = new PIXI.Texture(baseTexture);
      leftTexture.frame = new PIXI.Rectangle(i * frameWidth, frameHeight * 2, frameWidth, frameHeight);
      textures['left'].push(leftTexture);
      const rightTexture:any = new PIXI.Texture(baseTexture);
      rightTexture.frame = new PIXI.Rectangle(i * frameWidth, frameHeight * 3, frameWidth, frameHeight);
      textures['right'].push(rightTexture);
    }

    this.character = new PIXI.AnimatedSprite(textures['down']);
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
    // Clear existing sprites to prevent memory leaks
    this.cropSprites.forEach(sprite => {
        this.app.stage.removeChild(sprite);
        sprite.destroy(); // Destroy sprite to free memory
    });
    this.cropSprites = [];

    // Load textures only once and reuse them
    const frameWidth = 32;
    const frameHeight = 32;
    const baseTexture:any = PIXI.Texture.from('assets/sprites/crop_growth.png').baseTexture;

    if (!baseTexture.valid) {
        console.error('Failed to load crop texture');
        return; // Early return if texture fails to load
    }

    const textures: { [key: string]: PIXI.Texture[] } = {
        seed: [],
        growing: [],
        mature: []
    };

    // Generate textures for each stage
    try {
      for (let i = 0; i < 4; i++) {
        // Create texture and set frame separately
        const seedTexture:any = new PIXI.Texture(baseTexture);
        seedTexture.frame = new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight);
        textures['seed'].push(seedTexture);

        const growingTexture:any = new PIXI.Texture(baseTexture);
        growingTexture.frame = new PIXI.Rectangle(i * frameWidth, frameHeight, frameWidth, frameHeight);
        textures['growing'].push(growingTexture);

        const matureTexture:any = new PIXI.Texture(baseTexture);
        matureTexture.frame = new PIXI.Rectangle(i * frameWidth, frameHeight * 2, frameWidth, frameHeight);
        textures['mature'].push(matureTexture);
    }
    } catch (error) {
        console.error('Error generating textures:', error);
        return;
    }

    // Get crops and render them
    const crops = this.gameService.getCrops();
    if (!crops || !Array.isArray(crops)) {
        console.warn('No valid crops data');
        return;
    }

    crops.forEach(crop => {
        if (!crop || typeof crop.growth !== 'number' || !crop.x || !crop.y) {
            console.warn('Invalid crop data:', crop);
            return;
        }

        // Determine growth stage
        let stage = 'seed';
        if (crop.growth >= 66) {
            stage = 'mature';
        } else if (crop.growth >= 33) {
            stage = 'growing';
        }

        // Create animated sprite
        const cropTextures = textures[stage as keyof typeof textures];
        if (!cropTextures || cropTextures.length === 0) {
            console.warn(`No textures available for stage: ${stage}`);
            return;
        }

        const cropSprite = new PIXI.AnimatedSprite(cropTextures);
        cropSprite.x = crop.x;
        cropSprite.y = crop.y;
        cropSprite.width = 32;
        cropSprite.height = 32;
        cropSprite.animationSpeed = 0.05;
        cropSprite.loop = true; // Ensure animation loops
        cropSprite.play();

        // Add to stage and track in cropSprites
        this.app.stage.addChild(cropSprite);
        this.cropSprites.push(cropSprite);
    });
}
}