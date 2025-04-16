const fs = require('fs');
const path = require('path');

// Định nghĩa cấu trúc thư mục và file
const projectStructure = {
  'src/app/components/game-board': [
    'game-board.component.ts',
    'game-board.component.html',
    'game-board.component.css'
  ],
  'src/app/components/ui-panel': [
    'ui-panel.component.ts',
    'ui-panel.component.html',
    'ui-panel.component.css'
  ],
  'src/app/services': ['game.service.ts'],
  'src/app': ['app.component.ts', 'app.component.html', 'app.module.ts'],
  'src/assets/sprites': [], // Thư mục để lưu sprites (cần thêm thủ công sau)
  'src/environments': ['environment.ts'],
  'src': ['main.ts', 'styles.css', 'tsconfig.json']
};

// Nội dung của các file
const filesContent = {
  // src/app/app.component.ts
  'src/app/app.component.ts': `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'farm-game';
}
`,

  // src/app/app.component.html
  'src/app/app.component.html': `
<app-game-board></app-game-board>
<app-ui-panel></app-ui-panel>
`,

  // src/app/app.module.ts
  'src/app/app.module.ts': `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { UiPanelComponent } from './components/ui-panel/ui-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    UiPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`,

  // src/main.ts
  'src/main.ts': `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`,

  // src/styles.css
  'src/styles.css': `
/* Add global styles here */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
`,

  // src/environments/environment.ts
  'src/environments/environment.ts': `
export const environment = {
  production: false
};
`,

  // src/tsconfig.json
  'src/tsconfig.json': `
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "es2020",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2020",
    "lib": [
      "es2020",
      "dom"
    ],
    "strict": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
`,

  // src/app/components/game-board/game-board.component.ts
  'src/app/components/game-board/game-board.component.ts': `
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
`,

  // src/app/components/game-board/game-board.component.html
  'src/app/components/game-board/game-board.component.html': `
<canvas #gameCanvas></canvas>
`,

  // src/app/components/game-board/game-board.component.css
  'src/app/components/game-board/game-board.component.css': `
/* Add styles for game board if needed */
canvas {
  border: 1px solid black;
}
`,

  // src/app/components/ui-panel/ui-panel.component.ts
  'src/app/components/ui-panel/ui-panel.component.ts': `
import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-panel',
  templateUrl: './ui-panel.component.html',
  styleUrls: ['./ui-panel.component.css']
})
export class UiPanelComponent {}
`,

  // src/app/components/ui-panel/ui-panel.component.html
  'src/app/components/ui-panel/ui-panel.component.html': `
<div class="ui-panel">
  <div class="stats">
    <span>Level: 17</span>
    <span>Coins: 128.14</span>
    <span>Energy: 32</span>
    <span>Gems: 1,3856</span>
  </div>
  <div class="tools">
    <button>Harvest</button>
    <button>Plant</button>
    <button>Menu</button>
  </div>
</div>
`,

  // src/app/components/ui-panel/ui-panel.component.css
  'src/app/components/ui-panel/ui-panel.component.css': `
.ui-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}

.stats span {
  margin-right: 15px;
}

.tools button {
  margin: 5px;
}
`,

  // src/app/services/game.service.ts
  'src/app/services/game.service.ts': `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private characterPosition = { x: 100, y: 100 };
  private crops: { x: number, y: number, type: string, growth: number }[] = [];

  getCharacterPosition(): { x: number, y: number } {
    return { ...this.characterPosition };
  }

  moveCharacter(direction: string): void {
    const speed = 32;
    switch (direction) {
      case 'up':
        this.characterPosition.y -= speed;
        break;
      case 'down':
        this.characterPosition.y += speed;
        break;
      case 'left':
        this.characterPosition.x -= speed;
        break;
      case 'right':
        this.characterPosition.x += speed;
        break;
    }
  }

  plantCrop(x: number, y: number, type: string): void {
    this.crops.push({ x, y, type, growth: 0 });
  }

  getCrops(): { x: number, y: number, type: string, growth: number }[] {
    return [...this.crops];
  }

  growCrops(): void {
    this.crops.forEach(crop => {
      if (crop.growth < 100) {
        crop.growth += 10;
      }
    });
  }
}
`
};

// Tạo package.json
const packageJson = {
  name: 'farm-game',
  version: '0.0.0',
  scripts: {
    start: 'ng serve',
    build: 'ng build',
    test: 'ng test',
    lint: 'ng lint',
    e2e: 'ng e2e'
  },
  private: true,
  dependencies: {
    '@angular/animations': '^19.2.7',
    '@angular/common': '^19.2.7',
    '@angular/compiler': '^19.2.7',
    '@angular/core': '^19.2.7',
    '@angular/forms': '^19.2.7',
    '@angular/platform-browser': '^19.2.7',
    '@angular/platform-browser-dynamic': '^19.2.7',
    '@angular/router': '^19.2.7',
    'pixi.js': '^7.0.0',
    'rxjs': '~7.8.0',
    'tslib': '^2.3.0',
    'zone.js': '~0.14.0'
  },
  devDependencies: {
    '@angular-devkit/build-angular': '^19.2.7',
    '@angular/cli': '^19.2.7',
    '@angular/compiler-cli': '^19.2.7',
    '@types/jasmine': '~5.1.0',
    '@types/node': '^20.0.0',
    'jasmine-core': '~5.1.0',
    'karma': '~6.4.0',
    'karma-chrome-launcher': '~3.2.0',
    'karma-coverage': '~2.2.0',
    'karma-jasmine': '~5.1.0',
    'karma-jasmine-html-reporter': '~2.1.0',
    'typescript': '~5.6.0'
  }
};

// Hàm tạo thư mục và file
function createStructure() {
  // Tạo các thư mục
  Object.keys(projectStructure).forEach(folder => {
    const folderPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folder}`);
    }

    // Tạo các file trong thư mục
    projectStructure[folder].forEach(file => {
      const filePath = path.join(folderPath, file);
      const content = filesContent[path.join(folder, file)] || '';
      fs.writeFileSync(filePath, content.trim(), 'utf8');
      console.log(`Created file: ${filePath}`);
    });
  });

  // Tạo package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log(`Created file: ${packageJsonPath}`);
}

try {
  createStructure();
  console.log('Project structure created successfully!');
  console.log('Next steps:');
  console.log('1. Run `npm install` to install dependencies.');
  console.log('2. Add sprite images to `src/assets/sprites/` (grass.png, soil.png, character_walk.png, crop_growth.png).');
  console.log('3. Run `ng serve` to start the development server.');
} catch (error) {
  console.error('Error creating project structure:', error);
}