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
  console.log('Cách dùng: node create_phaser_farm_with_images.js YourProjectName');
  process.exit(1); // Thoát nếu thiếu tên dự án
}

// Đường dẫn tuyệt đối đến thư mục dự án
const projectPath = path.resolve(projectName);
const srcPath = path.join(projectPath, 'src');
const assetsPath = path.join(projectPath, 'assets'); // Đường dẫn thư mục assets

console.log(`--- Bắt đầu tạo dự án (với hình ảnh): ${projectName} tại ${projectPath} ---`);

// --- Định nghĩa nội dung các file (đã cập nhật) ---

const packageJsonContent = `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "Phaser Farming Game Frontend (LocalStorage & Images)",
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
    "localstorage",
    "sprites"
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
const CopyPlugin = require('copy-webpack-plugin'); // Thêm plugin copy assets

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
    publicPath: '/dist/' // Quan trọng cho dev server
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname), // Phục vụ file từ thư mục gốc (chứa index.html)
    },
    compress: true,
    port: 9000,
    devMiddleware: {
       publicPath: '/dist/', // Đảm bảo bundle.js được phục vụ từ /dist/
       writeToDisk: true, // Có thể cần thiết để plugin copy hoạt động đúng trong dev
    },
    watchFiles: ['src/**/*', 'assets/**/*'], // Theo dõi thay đổi trong src và assets
  },
  plugins: [
    new CopyPlugin({ // Copy thư mục assets vào dist khi build
      patterns: [
        { from: 'assets', to: 'assets' }
      ],
    }),
  ],
};`;

const indexHtmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Phaser Farming Game (Images)</title>
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
    border: 1px solid #555; /* Màu border nhẹ hơn */
    /* box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); */
}`;

// --- Cập nhật Interfaces ---
const fruitInterfaceContent = `// src/interfaces/fruit.interface.ts
export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface FruitData {
  id: string;
  name: string;
  element: ElementType;
  growthTimeSeconds: number;
  harvestYield: number;
  seedCost?: number;
  // Thay thế color bằng spriteKey
  spriteKeySeed: string;    // Key của ảnh khi mới gieo/hạt giống
  spriteKeyGrowing: string; // Key của ảnh khi đang lớn
  spriteKeyReady: string;   // Key của ảnh khi chín
}

// Trạng thái ô đất để LƯU TRỮ
export interface StoredFarmPlotState {
    tileX: number;
    tileY: number;
    state: 'empty' | 'growing' | 'ready';
    fruitId: string | null;
    growthTimer: number;
}

// Trạng thái ô đất trong Scene (dùng Image thay Rectangle)
export interface FarmPlot extends StoredFarmPlotState {
     gameObject: Phaser.GameObjects.Image | null; // Đổi thành Image
}

// Kho đồ người chơi
export interface PlayerInventory {
    [fruitId: string]: number;
}`;

// --- Cập nhật Data ---
const fruitsDataContent = `// src/data/fruits.ts
import { FruitData } from '../interfaces/fruit.interface';

// Định nghĩa các key cho sprite. Tên key nên trùng với tên file ảnh (không có phần mở rộng .png)
// Ví dụ: ảnh hạt giống kim là 'assets/seed_kim.png' thì key là 'seed_kim'
export const ALL_FRUITS: FruitData[] = [
  {
    id: 'kim_lan', name: 'Kim Lan', element: 'Kim', growthTimeSeconds: 10, harvestYield: 2,
    spriteKeySeed: 'seed_kim', spriteKeyGrowing: 'growing_kim', spriteKeyReady: 'ready_kim'
  },
  {
    id: 'moc_dao', name: 'Mộc Đào', element: 'Mộc', growthTimeSeconds: 15, harvestYield: 3,
    spriteKeySeed: 'seed_moc', spriteKeyGrowing: 'growing_moc', spriteKeyReady: 'ready_moc'
  },
  {
    id: 'thuy_le', name: 'Thủy Lê', element: 'Thủy', growthTimeSeconds: 20, harvestYield: 2,
    spriteKeySeed: 'seed_thuy', spriteKeyGrowing: 'growing_thuy', spriteKeyReady: 'ready_thuy'
  },
  {
    id: 'hoa_luu', name: 'Hỏa Lựu', element: 'Hỏa', growthTimeSeconds: 25, harvestYield: 1,
    spriteKeySeed: 'seed_hoa', spriteKeyGrowing: 'growing_hoa', spriteKeyReady: 'ready_hoa'
  },
  {
    id: 'tho_ngo', name: 'Thổ Ngô', element: 'Thổ', growthTimeSeconds: 30, harvestYield: 5,
    spriteKeySeed: 'seed_tho', spriteKeyGrowing: 'growing_tho', spriteKeyReady: 'ready_tho'
  },
];

export function getFruitDataById(id: string): FruitData | undefined {
    return ALL_FRUITS.find(fruit => fruit.id === id);
}
`;

// --- Cập nhật FarmScene ---
const farmSceneContent = `// src/scenes/FarmScene.ts
import Phaser from 'phaser';
import { ALL_FRUITS, getFruitDataById } from '../data/fruits';
import { FarmPlot, StoredFarmPlotState, PlayerInventory, FruitData } from '../interfaces/fruit.interface';

const PLOTS_STORAGE_KEY = 'phaserFarmGame_plots_v2'; // Đổi key để tránh xung đột với phiên bản cũ
const INVENTORY_STORAGE_KEY = 'phaserFarmGame_inventory_v2';

const TILE_SIZE = 64;
const FARM_COLS = 5;
const FARM_ROWS = 5;
const FARM_GRID_X = 100;
const FARM_GRID_Y = 100;
const EMPTY_PLOT_KEY = 'empty_plot'; // Key cho ảnh ô đất trống

export class FarmScene extends Phaser.Scene {
    private farmPlots: Map<string, FarmPlot> = new Map();
    private playerInventory: PlayerInventory = {};
    private inventoryText!: Phaser.GameObjects.Text;

    constructor() {
        super('FarmScene');
    }

    preload() {
        console.log('FarmScene preload: Loading images...');
        // Load ảnh ô đất trống
        this.load.image(EMPTY_PLOT_KEY, \`assets/\${EMPTY_PLOT_KEY}.png\`);

        // Load ảnh cho từng loại cây và giai đoạn
        ALL_FRUITS.forEach(fruit => {
            this.load.image(fruit.spriteKeySeed, \`assets/\${fruit.spriteKeySeed}.png\`);
            this.load.image(fruit.spriteKeyGrowing, \`assets/\${fruit.spriteKeyGrowing}.png\`);
            this.load.image(fruit.spriteKeyReady, \`assets/\${fruit.spriteKeyReady}.png\`);
            console.log(\`  Loading assets for \${fruit.name}\`);
        });
         console.log('Image loading scheduled.');
    }

    create() {
        console.log('FarmScene create');
        this.loadStateFromLocalStorage();
        this.createFarmGridAndUI();
        this.createUIElements();
        this.input.on('gameobjectdown', this.onGameObjectDown, this);
        this.time.addEvent({
            delay: 1000, callback: this.updateGrowthTimers,
            callbackScope: this, loop: true
        });
        this.updateInventoryDisplay();
    }

    loadStateFromLocalStorage() {
        console.log("Attempting to load state v2 from localStorage...");
        const savedPlotsJson = localStorage.getItem(PLOTS_STORAGE_KEY);
        const savedInventoryJson = localStorage.getItem(INVENTORY_STORAGE_KEY);

        if (savedInventoryJson) {
            try { this.playerInventory = JSON.parse(savedInventoryJson); console.log("Loaded inventory:", this.playerInventory); }
            catch (e) { console.error("Error parsing inventory:", e); this.initializeInventory(); }
        } else { console.log("No inventory found, initializing..."); this.initializeInventory(); }

        if (savedPlotsJson) {
             try {
                const savedPlotDataArray: [string, StoredFarmPlotState][] = JSON.parse(savedPlotsJson);
                this.farmPlots = new Map(savedPlotDataArray.map(([key, storedState]) => [key, { ...storedState, gameObject: null }]));
                console.log(\`Loaded \${this.farmPlots.size} plot states.\`);
            } catch (e) { console.error("Error parsing plot states:", e); this.farmPlots.clear(); }
        } else { console.log("No plot states found."); this.farmPlots.clear(); }
    }

    saveStateToLocalStorage() {
        // console.log("Saving state v2 to localStorage..."); // Bớt log để đỡ rối
         try {
            const plotsToStore: [string, StoredFarmPlotState][] = Array.from(this.farmPlots.entries()).map(([key, plot]) => {
                const storedState: StoredFarmPlotState = {
                    tileX: plot.tileX, tileY: plot.tileY, state: plot.state,
                    fruitId: plot.fruitId, growthTimer: plot.growthTimer,
                }; return [key, storedState];
            });
            localStorage.setItem(PLOTS_STORAGE_KEY, JSON.stringify(plotsToStore));
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.playerInventory));
            // console.log("State v2 saved.");
        } catch (e) { console.error("Error saving state v2:", e); }
    }

    initializeInventory() {
        this.playerInventory = {};
        ALL_FRUITS.forEach(fruit => { this.playerInventory[fruit.id] = 0; });
    }

    createFarmGridAndUI() {
        console.log("Creating farm grid visuals with images...");
        for (let y = 0; y < FARM_ROWS; y++) {
            for (let x = 0; x < FARM_COLS; x++) {
                const plotX = FARM_GRID_X + x * TILE_SIZE + TILE_SIZE / 2;
                const plotY = FARM_GRID_Y + y * TILE_SIZE + TILE_SIZE / 2;
                const plotKey = \`\${x}-\${y}\`;

                let plotState = this.farmPlots.get(plotKey);
                if (!plotState) {
                    plotState = { tileX: x, tileY: y, state: 'empty', fruitId: null, growthTimer: 0, gameObject: null };
                    this.farmPlots.set(plotKey, plotState);
                }

                // Tạo GameObject là Image thay vì Rectangle
                // Texture ban đầu sẽ được đặt trong updatePlotVisual
                 const plotImage = this.add.image(plotX, plotY, EMPTY_PLOT_KEY) // Tạm đặt ảnh đất trống
                                     .setInteractive() // Cho phép click
                                     .setDisplaySize(TILE_SIZE - 4, TILE_SIZE - 4); // Điều chỉnh kích thước nếu cần

                plotState.gameObject = plotImage;
                plotImage.setData('plotKey', plotKey);
                this.updatePlotVisual(plotState); // Cập nhật hình ảnh đúng ngay từ đầu
            }
        }
         console.log(\`Farm grid visuals created/updated for \${this.farmPlots.size} plots.\`);
    }

    createUIElements() {
        this.add.text(10, 10, 'Nông Trại Ngũ Hành (Ảnh)', { fontSize: '24px', color: '#ffffff' });
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
        if(this.inventoryText) { this.inventoryText.setText(text); }
    }

     // Cập nhật HÌNH ẢNH ô đất dựa trên trạng thái
    updatePlotVisual(plotState: FarmPlot) {
        if (!plotState.gameObject) return;

        let textureKey = EMPTY_PLOT_KEY; // Ảnh đất trống mặc định
        const fruitData = plotState.fruitId ? getFruitDataById(plotState.fruitId) : undefined;

        switch (plotState.state) {
            case 'growing':
                if (fruitData) {
                    // Ưu tiên ảnh đang lớn nếu qua nửa thời gian, nếu không là ảnh hạt giống
                     textureKey = (plotState.growthTimer <= fruitData.growthTimeSeconds / 2)
                            ? fruitData.spriteKeyGrowing
                            : fruitData.spriteKeySeed;
                }
                break;
            case 'ready':
                textureKey = fruitData?.spriteKeyReady || EMPTY_PLOT_KEY; // Ảnh chín hoặc đất trống nếu lỗi
                break;
            case 'empty':
            default:
                textureKey = EMPTY_PLOT_KEY;
                break;
        }
        // Đặt texture mới cho Image object
        plotState.gameObject.setTexture(textureKey);
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
        this.updatePlotVisual(plotState); // Cập nhật HÌNH ẢNH
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
        this.updatePlotVisual(plotState); // Cập nhật HÌNH ẢNH
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

                // Kiểm tra xem có cần cập nhật hình ảnh không (ví dụ khi chuyển từ seed -> growing)
                const halfway = plot.growthTimer <= fruitData.growthTimeSeconds / 2;
                const expectedKey = halfway? fruitData.spriteKeyGrowing : fruitData.spriteKeySeed;
                if(plot.gameObject?.texture.key !== expectedKey) {
                    this.updatePlotVisual(plot);
                }

                if (plot.growthTimer <= 0) {
                    plot.state = 'ready';
                    this.updatePlotVisual(plot); // Cập nhật HÌNH ẢNH chín
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
  // Cấu hình vật lý có thể cần nếu dùng sprite động sau này
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     debug: false // Bật debug nếu cần xem hitbox
  //   }
  // },
  scene: [FarmScene]
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (LocalStorage & Images Version)');`;


// --- Hàm tạo file và thư mục ---
function createFile(filePath, content) { /* ... Giống phiên bản trước ... */
    try {
        fs.writeFileSync(filePath, content);
        console.log(`   ✅ Đã tạo: ${path.basename(filePath)}`);
    } catch (err) {
        console.error(`   ❌ Lỗi khi tạo file ${filePath}:`, err);
    }
}
function createDirectory(dirPath) { /* ... Giống phiên bản trước ... */
    try {
        // Kiểm tra xem thư mục đã tồn tại chưa trước khi tạo (để tránh log thừa)
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`   📁 Đã tạo thư mục: ${path.relative(process.cwd(), dirPath)}`);
        }
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
  createDirectory(path.join(projectPath, 'dist'));
  createDirectory(assetsPath); // Tạo thư mục assets

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

  console.log("\n--- QUAN TRỌNG: CẦN THÊM FILE ẢNH! ---");
  console.log(`Script đã tạo xong code. Bây giờ bạn cần thêm các file ảnh (.png) vào thư mục '${path.relative(process.cwd(), assetsPath)}'.`);
  console.log("Các file ảnh cần thiết (tên file phải khớp chính xác):");
  console.log(`- ${'empty_plot.png'}`);
  ['kim', 'moc', 'thuy', 'hoa', 'tho'].forEach(el => {
      console.log(`- ${'seed_' + el + '.png'}`);
      console.log(`- ${'growing_' + el + '.png'}`);
      console.log(`- ${'ready_' + el + '.png'}`);
  });
  console.log("--------------------------------------------");


  console.log("\n--- HOÀN TẤT ---");
  console.log(`Đã tạo xong cấu trúc dự án '${projectName}'.`);
  console.log("Để bắt đầu:");
  console.log(`1. cd ${projectName}`);
  console.log("2. **Thêm các file ảnh vào thư mục 'assets' như hướng dẫn ở trên!**");
  console.log("3. npm install  (hoặc yarn install)");
  console.log("4. npm start    (hoặc yarn start)");
  console.log("-----------------");

} catch (error) {
  console.error("\n--- LỖI TỔNG QUÁT ---");
  console.error("Đã xảy ra lỗi trong quá trình tạo dự án:", error);
  process.exit(1);
}