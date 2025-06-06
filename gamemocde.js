const fs = require('fs');
const path = require('path');

// Định nghĩa cấu trúc thư mục và nội dung file
const projectStructure = {
  'src/app/models/character.ts': `
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
`,
  'src/app/models/tile.ts': `
export interface Tile {
  x: number;
  y: number;
  terrain: 'plain' | 'forest' | 'mountain' | 'wall';
  occupiedBy?: Character;
}
`,
  'src/app/services/game.service.ts': `
import { Injectable } from '@angular/core';
import { Character, Tile } from '../models';

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
`,
  'src/app/components/map/map.component.ts': `
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Tile, Character } from '../../models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Tile[][] = [];
  selectedCharacter: Character | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.map = this.gameService.map;
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
`,
  'src/app/components/map/map.component.html': `
<div class="map">
  <div class="row" *ngFor="let row of map">
    <div class="tile" *ngFor="let tile of row" (click)="selectTile(tile)"
         [class.selected]="selectedCharacter && tile.occupiedBy?.id === selectedCharacter.id">
      <span *ngIf="tile.occupiedBy" [class.player]="tile.occupiedBy.team === 'player'" [class.enemy]="tile.occupiedBy.team === 'enemy'">
        {{ tile.occupiedBy.name }} ({{ tile.occupiedBy.hp }}/{{ tile.occupiedBy.maxHp }})
      </span>
    </div>
  </div>
</div>
<div class="controls">
  <button (click)="endTurn()" [disabled]="gameService.currentTurn !== 'player'">End Turn</button>
</div>
`,
  'src/app/components/map/map.component.css': `
.map {
  display: inline-block;
}
.row {
  display: flex;
}
.tile {
  width: 60px;
  height: 60px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f0f0f0;
}
.tile:hover {
  background-color: #ddd;
}
.selected {
  background-color: #aaffaa;
}
.player {
  color: blue;
  font-weight: bold;
}
.enemy {
  color: red;
  font-weight: bold;
}
.controls {
  margin-top: 10px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
`,
  'src/app/app.component.ts': `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fire-emblem-clone';
}
`,
  'src/app/app.component.html': `
<h1>Fire Emblem Clone</h1>
<app-map></app-map>
`,
  'src/app/app.component.css': `
h1 {
  text-align: center;
  font-family: Arial, sans-serif;
}
`,
  'src/app/app.module.ts': `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`,
  'src/index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Fire Emblem Clone</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`,
  'src/styles.css': `
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
`,
  'src/main.ts': `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`
};

// Hàm tạo thư mục và file
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  // Tạo thư mục nếu chưa tồn tại
  fs.mkdirSync(dir, { recursive: true });
  // Ghi nội dung vào file
  fs.writeFileSync(filePath, content.trim());
  console.log(`Created: ${filePath}`);
}

// Hàm chính để tạo dự án
function createProject() {
  const projectDir = 'fire-emblem-clone';
  
  // Tạo thư mục dự án
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }

  // Tạo tất cả các file
  Object.entries(projectStructure).forEach(([filePath, content]) => {
    createFile(path.join(projectDir, filePath), content);
  });

  // Tạo file package.json cơ bản
  const packageJson = {
    name: "fire-emblem-clone",
    version: "0.0.0",
    scripts: {
      ng: "ng",
      start: "ng serve",
      build: "ng build",
      watch: "ng build --watch --configuration development",
      test: "ng test"
    },
    private: true,
    dependencies: {
      "@angular/animations": "^18.2.0",
      "@angular/common": "^18.2.0",
      "@angular/compiler": "^18.2.0",
      "@angular/core": "^18.2.0",
      "@angular/platform-browser": "^18.2.0",
      "@angular/platform-browser-dynamic": "^18.2.0",
      "rxjs": "~7.8.0",
      "tslib": "^2.3.0",
      "zone.js": "~0.14.10"
    },
    devDependencies: {
      "@angular-devkit/build-angular": "^18.2.9",
      "@angular/cli": "^18.2.9",
      "@angular/compiler-cli": "^18.2.0",
      "@types/jasmine": "~5.1.0",
      "jasmine-core": "~5.2.0",
      "karma": "~6.4.0",
      "karma-chrome-launcher": "~3.2.0",
      "karma-coverage": "~2.2.0",
      "karma-jasmine": "~5.1.0",
      "karma-jasmine-html-reporter": "~2.1.0",
      "typescript": "~5.5.2"
    }
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  console.log('Created: package.json');

  // Tạo file angular.json tối thiểu
  const angularJson = {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    version: 1,
    newProjectRoot: "projects",
    projects: {
      "fire-emblem-clone": {
        projectType: "application",
        schematics: {
          "@schematics/angular:component": {
            style: "css"
          }
        },
        root: "",
        sourceRoot: "src",
        prefix: "app",
        architect: {
          build: {
            builder: "@angular-devkit/build-angular:application",
            options: {
              outputPath: "dist/fire-emblem-clone",
              index: "src/index.html",
              browser: "src/main.ts",
              polyfills: ["zone.js"],
              tsConfig: "tsconfig.app.json",
              assets: [],
              styles: ["src/styles.css"],
              scripts: []
            },
            configurations: {
              production: {
                budgets: [
                  {
                    type: "initial",
                    maximumWarning: "500kb",
                    maximumError: "1mb"
                  }
                ],
                outputHashing: "all"
              },
              development: {
                optimization: false,
                extractLicenses: false,
                sourceMap: true
              }
            },
            defaultConfiguration: "production"
          },
          serve: {
            builder: "@angular-devkit/build-angular:dev-server",
            configurations: {
              production: {
                buildTarget: "fire-emblem-clone:build:production"
              },
              development: {
                buildTarget: "fire-emblem-clone:build:development"
              }
            },
            defaultConfiguration: "development"
          }
        }
      }
    }
  };

  fs.writeFileSync(
    path.join(projectDir, 'angular.json'),
    JSON.stringify(angularJson, null, 2)
  );
  console.log('Created: angular.json');

  // Tạo file tsconfig.json
  const tsconfigJson = {
    compileOnSave: false,
    compilerOptions: {
      outDir: "./dist/out-tsc",
      forceConsistentCasingInFileNames: true,
      strict: true,
      noImplicitOverride: true,
      noPropertyAccessFromIndexSignature: true,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      sourceMap: true,
      declaration: false,
      downlevelIteration: true,
      experimentalDecorators: true,
      moduleResolution: "node",
      importHelpers: true,
      target: "ES2022",
      module: "ES2022",
      useDefineForClassFields: false,
      lib: ["ES2022", "dom"]
    },
    angularCompilerOptions: {
      enableI18nLegacyMessageIdFormat: false,
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true
    }
  };

  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.json'),
    JSON.stringify(tsconfigJson, null, 2)
  );
  console.log('Created: tsconfig.json');

  // Tạo file tsconfig.app.json
  const tsconfigAppJson = {
    extends: "./tsconfig.json",
    compilerOptions: {
      outDir: "./out-tsc/app",
      types: []
    },
    files: [
      "src/main.ts"
    ],
    include: [
      "src/**/*.d.ts"
    ]
  };

  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.app.json'),
    JSON.stringify(tsconfigAppJson, null, 2)
  );
  console.log('Created: tsconfig.app.json');

  console.log(`Project created successfully in ${projectDir}!`);
}

// Thực thi hàm tạo dự án
createProject();