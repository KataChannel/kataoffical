#!/usr/bin/env node

// Import các module cần thiết của Node.js
const fs = require('fs');
const path = require('path');
const process = require('process');

// Lấy tên dự án từ đối số dòng lệnh
const projectName = process.argv[2];

// Kiểm tra xem tên dự án đã được cung cấp chưa
if (!projectName) {
  console.error('Vui lòng cung cấp tên thư mục dự án.');
  console.log('Cách dùng: node create_phaser_farm.js YourProjectName');
  process.exit(1); // Thoát nếu thiếu tên dự án
}

// Đường dẫn tuyệt đối đến thư mục dự án
const projectPath = path.resolve(projectName);
const srcPath = path.join(projectPath, 'src');

console.log(`--- Bắt đầu tạo dự án: ${projectName} tại ${projectPath} ---`);

// --- Định nghĩa nội dung các file ---

const packageJsonContent = `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "Phaser Farming Game Frontend (LocalStorage)",
  "main": "dist/bundle.js",
  "scripts": {
    "start": "webpack serve --open",
    "build": "webpack",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [
    "phaser",
    "game",
    "farming",
    "typescript",
    "localstorage"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.12.12",
    "phaser": "^3.80.1",
    "ts-loader": "^9.5.1",
    "typescript": "^5.4.5",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.4"
  }
}`;

const tsconfigJsonContent = `{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}`;

const webpackConfigContent = `const path = require('path');

module.exports = {
  entry: './src/game.ts',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000,
    devMiddleware: {
      publicPath: '/dist/', // Đảm bảo bundle.js được phục vụ từ /dist/
    }
  },
};`;

const indexHtmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Phaser Farming Game</title>
    <link rel="stylesheet" href="style.css">
    <style>
        html, body { height: 100%; margin: 0; padding: 0; }
        body { display: flex; justify-content: center; align-items: center; background-color: #222; }
    </style>
</head>
<body>
    <div id="phaser-game"></div>
    <script src="dist/bundle.js"></script>
</body>
</html>`;

const styleCssContent = `/* style.css */
#phaser-game canvas {
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}`;

const fruitInterfaceContent = `// src/interfaces/fruit.interface.ts
export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FruitData {
  id: string;
  name: string;
  element: ElementType;
  growthTimeSeconds: number;
  harvestYield: number;
  seedCost?: number;
  colorSeed: number;
  colorGrowing: number;
  colorReady: number;
}

// Trạng thái ô đất để LƯU TRỮ (không chứa gameObject)
export interface StoredFarmPlotState {
    tileX: number;
    tileY: number;
    state: 'empty' | 'growing' | 'ready';
    fruitId: string | null;
    growthTimer: number; // Thời gian còn lại (tính bằng giây)
}

// Trạng thái ô đất trong Scene (bao gồm cả gameObject)
export interface FarmPlot extends StoredFarmPlotState {
     gameObject: Phaser.GameObjects.Rectangle | null;
}

// Kho đồ người chơi
export interface PlayerInventory {
    [fruitId: string]: number; // key là fruitId, value là số lượng
}`;

const fruitsDataContent = `// src/data/fruits.ts
import { FruitData } from '../interfaces/fruit.interface';

export const ALL_FRUITS: FruitData[] = [
  {
    id: 'kim_lan', name: 'Kim Lan', element: 'Kim', growthTimeSeconds: 10, harvestYield: 2,
    colorSeed: 0xd4af37, colorGrowing: 0xffec8b, colorReady: 0xffd700
  },
  {
    id: 'moc_dao', name: 'Mộc Đào', element: 'Mộc', growthTimeSeconds: 15, harvestYield: 3,
    colorSeed: 0x90ee90, colorGrowing: 0x3cb371, colorReady: 0x008000
  },
  {
    id: 'thuy_le', name: 'Thủy Lê', element: 'Thủy', growthTimeSeconds: 20, harvestYield: 2,
    colorSeed: 0xadd8e6, colorGrowing: 0x4682b4, colorReady: 0x0000ff
  },
  {
    id: 'hoa_luu', name: 'Hỏa Lựu', element: 'Hỏa', growthTimeSeconds: 25, harvestYield: 1,
    colorSeed: 0xffb6c1, colorGrowing: 0xff6347, colorReady: 0xff0000
  },
  {
    id: 'tho_ngo', name: 'Thổ Ngô', element: 'Thổ', growthTimeSeconds: 30, harvestYield: 5,
    colorSeed: 0xf4a460, colorGrowing: 0xcd853f, colorReady: 0x8b4513
  },
];

export function getFruitDataById(id: string): FruitData | undefined {
    return ALL_FRUITS.find(fruit => fruit.id === id);
}`;

const farmSceneContent = `// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

// Constants for localStorage keys
const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots';
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory';

// Kích thước và bố cục nông trại
const TILE_SIZE = 64;
const FARM_COLS = 5;
const FARM_ROWS = 5;
const FARM_GRID_X = 100;
const FARM_GRID_Y = 100;

export class FarmScene extends Phaser.Scene {
    private farmPlots: Map<string, FarmPlot> = new Map();
    private playerInventory: PlayerInventory = {};
    private inventoryText!: Phaser.GameObjects.Text;

    constructor() {
        super('FarmScene');
    }

    preload() {
        console.log('FarmScene preload');
    }

    create() {
        console.log('FarmScene create');
        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI();
        this.createUIElements();
        this.input.on('gameobjectdown', this.onGameObjectDown, this);
        this.time.addEvent({
            delay: 1000,
            callback: this.updateGrowthTimers,
            callbackScope: this,
            loop: true
        });
        this.updateInventoryDisplay();
    }

    loadStateFromLocalStorage() {
        console.log("Attempting to load state from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);

        if (savedInventoryJson) {
            try {
                this.playerInventory = JSON.parse(savedInventoryJson);
                console.log("Loaded inventory:", this.playerInventory);
            } catch (e) {
                console.error("Error parsing inventory from localStorage:", e);
                this.initializeInventory();
            }
        } else {
            console.log("No inventory found, initializing...");
            this.initializeInventory();
        }

        if (savedPlotsJson) {
             try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                this.farmPlots = new Map(savedPlotDataArray.map(([key, storedState]) => [key, { ...storedState, gameObject: null }]));
                console.log(\`Loaded \${this.farmPlots.size} plot states.\`);
            } catch (e) {
                console.error("Error parsing plot states from localStorage:", e);
                this.farmPlots.clear();
            }
        } else {
             console.log("No plot states found.");
             this.farmPlots.clear();
        }
    }

    saveStateToLocalStorage() {
        console.log("Saving state to localStorage...");
         try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plot.tileX, tileY: plot.tileY, state: plot.state,
                    fruitId: plot.fruitId, growthTimer: plot.growthTimer,
                };
                return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));
            console.log("State saved successfully.");
        } catch (e) {
            console.error("Error saving state to localStorage:", e);
        }
    }

    initializeInventory() {
        this.playerInventory = {};
        ALL_FRUITS.forEach(fruit => {
            this.playerInventory[fruit.id] = 0;
        });
    }

    createFarmGridAndUI() {
        console.log("Creating farm grid visuals...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                const plotX = FARM_GRID_X + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = FARM_GRID_Y + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = \`\${x}-\${y}\`;

                let plotState = this.farmPlots.get(plotKey);
                if (!plotState) {
                    plotState = {
                        tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0, gameObject: null
                    };
                    this.farmPlots.set(plotKey, plotState);
                }

                 const plotRect = this.add.rectangle(plotX, plotY, TILE_SIZE - 4, TILE_SIZE - 4)
                                     .setStrokeStyle(1, 0xeeeeee)
                                     .setInteractive();

                plotState.gameObject = plotRect;
                plotRect.setData('plotKey', plotKey);
                this.updatePlotVisual(plotState);
            }
        }
         console.log(\`Farm grid visuals created/updated for \${this.farmPlots.size} plots.\`);
    }

    createUIElements() {
        this.add.text(10, 10, 'Nông Trại Ngũ Hành (LocalStorage)', { fontSize: '24px', color: '#ffffff' });
        this.inventoryText = this.add.text(10, 40, 'Kho: ', { fontSize: '16px', color: '#ffffff', wordWrap: { width: 780 } });
    }

    updateInventoryDisplay() {
        let text = 'Kho: ';
        let items = [];
        for (const fruitId in this.playerInventory) {
            if (this.playerInventory[fruitId] > 0) {
                const fruitData = getFruitDataById(fruitId);
                items.push(\`\${fruitData?.name || fruitId}: \${this.playerInventory[fruitId]}\`);
            }
        }
        text += items.join(' | ') || 'Trống';
        if(this.inventoryText) { // Kiểm tra nếu text đã tạo
             this.inventoryText.setText(text);
        }
    }

    updatePlotVisual(plotState: FarmPlot) {
        if (!plotState.gameObject) return;
        let color = 0x5d4037;
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;
        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    color = (plotState.growthTimer <= fruitData.growthTimeSeconds / 2)
                            ? fruitData.colorGrowing : fruitData.colorSeed;
                } break;
            case 'ready':
                color = fruitData?.colorReady || 0xffffff; break;
            case 'empty': default: color = 0x5d4037; break;
        }
        plotState.gameObject.setFillStyle(color);
    }

    onGameObjectDown(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) {
        const plotKey = gameObject.getData('plotKey');
        if (!plotKey) return;
        const plotState = this.farmPlots.get(plotKey);
        if (!plotState) return;
        console.log(\`Clicked plot (\${plotState.tileX}, \${plotState.tileY}), state: \${plotState.state}\`);
        switch (plotState.state) {
            case 'empty': this.handlePlanting(plotState); break;
            case 'growing':
                 const fruitName = plotState.fruitId ? getFruitDataById(plotState.fruitId)?.name : 'Không rõ';
                 console.log(\`Đang trồng \${fruitName}. Còn lại: \${Math.ceil(plotState.growthTimer)}s\`);
                 break;
            case 'ready': this.handleHarvesting(plotState); break;
        }
    }

    handlePlanting(plotState: FarmPlot) {
        let choiceMessage = "Chọn cây muốn trồng:\\n";
        ALL_FRUITS.forEach((fruit, index) => {
            choiceMessage += \`\${index + 1}. \${fruit.name} (\${fruit.element} - \${fruit.growthTimeSeconds}s)\\n\`;
        });
        const choice = prompt(choiceMessage, "1");
        if (choice === null) return;
        const choiceIndex = parseInt(choice) - 1;
        if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= ALL_FRUITS.length) {
            alert("Lựa chọn không hợp lệ!"); return;
        }
        const selectedFruit = ALL_FRUITS[choiceIndex];
        plotState.state = 'growing';
        plotState.fruitId = selectedFruit.id;
        plotState.growthTimer = selectedFruit.growthTimeSeconds;
        this.updatePlotVisual(plotState);
        console.log(\`Planted \${selectedFruit.name} at (\${plotState.tileX}, \${plotState.tileY}).\`);
        this.saveStateToLocalStorage();
    }

    handleHarvesting(plotState: FarmPlot) {
        if (!plotState.fruitId) return;
        const fruitData = getFruitDataById(plotState.fruitId);
        if (!fruitData) return;
        const addedAmount = fruitData.harvestYield;
        this.playerInventory[fruitData.id] = (this.playerInventory[fruitData.id] || 0) + addedAmount;
        plotState.state = 'empty';
        plotState.fruitId = null;
        plotState.growthTimer = 0;
        this.updatePlotVisual(plotState);
        console.log(\`Harvested \${addedAmount} \${fruitData.name} from (\${plotState.tileX}, \${plotState.tileY}).\`);
        this.updateInventoryDisplay();
        this.saveStateToLocalStorage();
    }

    updateGrowthTimers() {
        let stateChanged = false;
        this.farmPlots.forEach(plot => {
            if (plot.state === 'growing' && plot.fruitId) {
                plot.growthTimer -= 1;
                stateChanged = true;
                const fruitData = getFruitDataById(plot.fruitId);
                if (!fruitData) return;
                const halfway = plot.growthTimer <= fruitData.growthTimeSeconds / 2;
                const expectedColor = halfway? fruitData.colorGrowing : fruitData.colorSeed;
                if(plot.gameObject?.fillColor !== expectedColor) {
                    this.updatePlotVisual(plot);
                }
                if (plot.growthTimer <= 0) {
                    plot.state = 'ready';
                    this.updatePlotVisual(plot);
                    console.log(\`Fruit \${fruitData.name} at (\${plot.tileX}, \${plot.tileY}) is ready!\`);
                }
            }
        });
        if (stateChanged) {
             this.saveStateToLocalStorage();
        }
    }
}`;

const gameTsContent = `// src/game.ts
import Phaser from 'phaser';
import { FarmScene } from './scenes/FarmScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-game',
  backgroundColor: '#2d2d2d',
  scene: [FarmScene]
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (LocalStorage Version)');`;


// --- Hàm tạo file và thư mục ---
function createFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ Đã tạo: ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`   ❌ Lỗi khi tạo file ${filePath}:`, err);
  }
}

function createDirectory(dirPath) {
   try {
    fs.mkdirSync(dirPath, { recursive: true });
    // console.log(`   📁 Đã tạo thư mục: ${dirPath}`); // Ít thông tin hơn
  } catch (err) {
    console.error(`   ❌ Lỗi khi tạo thư mục ${dirPath}:`, err);
  }
}

// --- Thực thi tạo dự án ---
try {
  console.log("--- Tạo cấu trúc thư mục ---");
  createDirectory(projectPath);
  createDirectory(srcPath);
  createDirectory(path.join(srcPath, 'scenes'));
  createDirectory(path.join(srcPath, 'data'));
  createDirectory(path.join(srcPath, 'interfaces'));
  createDirectory(path.join(projectPath, 'dist')); // Thư mục build
  createDirectory(path.join(projectPath, 'assets')); // Thư mục chứa assets

  console.log("--- Tạo các file cấu hình và mã nguồn ---");
  createFile(path.join(projectPath, 'package.json'), packageJsonContent);
  createFile(path.join(projectPath, 'tsconfig.json'), tsconfigJsonContent);
  createFile(path.join(projectPath, 'webpack.config.js'), webpackConfigContent);
  createFile(path.join(projectPath, 'index.html'), indexHtmlContent);
  createFile(path.join(projectPath, 'style.css'), styleCssContent);
  createFile(path.join(srcPath, 'interfaces', 'fruit.interface.ts'), fruitInterfaceContent);
  createFile(path.join(srcPath, 'data', 'fruits.ts'), fruitsDataContent);
  createFile(path.join(srcPath, 'scenes', 'FarmScene.ts'), farmSceneContent);
  createFile(path.join(srcPath, 'game.ts'), gameTsContent);

  console.log("\n--- HOÀN TẤT ---");
  console.log(`Đã tạo xong cấu trúc dự án '${projectName}'.`);
  console.log("Để bắt đầu:");
  console.log(`1. cd ${projectName}`);
  console.log("2. npm install  (hoặc yarn install)");
  console.log("3. npm start    (hoặc yarn start)");
  console.log("-----------------");

} catch (error) {
  console.error("\n--- LỖI TỔNG QUÁT ---");
  console.error("Đã xảy ra lỗi trong quá trình tạo dự án:", error);
  process.exit(1);
}