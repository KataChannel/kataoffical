// create_phaser_structure.js
const fs = require('fs');
const path = require('path');

console.log("--- Bắt đầu tạo cấu trúc file cho Angular + Phaser ---");

// Định nghĩa cấu trúc thư mục và file cần tạo/sửa đổi
const projectRoot = process.cwd(); // Lấy thư mục hiện tại nơi script được chạy

const directories = [
    'src/app/game',
    'src/app/game/scenes',
    // 'src/app/game/game-objects', // Thêm nếu muốn tách class Player,...
    'src/assets/maps',
    'src/assets/tiles',
    'src/assets/images',
    'src/assets/sprites',
    // Thêm các thư mục assets khác nếu cần
];

const files = {
    // === Game Component ===
    'src/app/game/game.component.ts': `
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from './scenes/main.scene'; // Import Scene chính
import { PreloadScene } from './scenes/preload.scene'; // Import Scene Preload

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef; // Tham chiếu đến div chứa game

  phaserInstance: Phaser.Game | null = null;
  phaserConfig: Phaser.Types.Core.GameConfig;

  constructor(private ngZone: NgZone) {
    // Cấu hình cơ bản cho Phaser
    this.phaserConfig = {
      type: Phaser.AUTO, // Tự động chọn WebGL hoặc Canvas
      parent: 'gameContainerId', // ID của div chứa game (sẽ đặt trong template)
      width: 800, // Chiều rộng canvas
      height: 600, // Chiều cao canvas
      backgroundColor: '#0077be', // Màu nền (màu biển ban đầu)
      physics: { // Kích hoạt hệ thống vật lý nếu cần (ví dụ: di chuyển nhân vật)
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }, // Game top-down thường không cần trọng lực
          debug: false // Hiện debug vật lý (hữu ích khi phát triển)
        }
      },
      // Danh sách các Scene của game
      // Chạy PreloadScene trước để tải tài nguyên, sau đó chạy MainScene
      scene: [PreloadScene, MainScene]
    };
  }

  ngOnInit(): void {
    // Khởi tạo Phaser bên trong NgZone.runOutsideAngular để tránh trigger change detection không cần thiết
    this.ngZone.runOutsideAngular(() => {
      this.phaserInstance = new Phaser.Game(this.phaserConfig);
    });
    console.log('Phaser game instance created.');
  }

  ngOnDestroy(): void {
    // Hủy instance Phaser khi component bị hủy để giải phóng tài nguyên
    if (this.phaserInstance) {
      this.phaserInstance.destroy(true);
      console.log('Phaser game instance destroyed.');
    }
    this.phaserInstance = null;
  }

  // --- Hàm ví dụ để gọi từ Angular UI (cần Service để kết nối) ---
  // Những hàm này nên được gọi qua một Service trung gian
  buildHouse() {
      console.warn("UI Action: Build House - Cần implement GameManagerService để gọi vào Phaser");
      // Ví dụ: this.gameManagerService.requestBuild('house');
  }

  showInventory() {
      console.warn("UI Action: Show Inventory - Cần implement logic UI hoặc gọi Service");
  }
}
`,

    'src/app/game/game.component.html': `
<div #gameContainer id="gameContainerId"></div>

<div class="game-ui">
  <h3>Menu (Angular UI)</h3>
  <button (click)="buildHouse()">Xây nhà</button>
  <button (click)="showInventory()">Xem kho đồ</button>
  </div>
`,

    'src/app/game/game.component.scss': `
// Đảm bảo container có kích thước
#gameContainerId {
  width: 800px; // Phải khớp với config Phaser
  height: 600px; // Phải khớp với config Phaser
  margin: 20px auto; // Căn giữa ví dụ
  border: 1px solid black; // Để dễ nhìn thấy vùng canvas
  canvas {
    display: block; // Loại bỏ khoảng trắng thừa dưới canvas
  }
}

.game-ui {
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed gray;
  max-width: 800px; // Giữ UI cùng chiều rộng với game
  margin: 10px auto;
}
`,

    // === Phaser Scenes ===
    'src/app/game/scenes/preload.scene.ts': `
import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    console.log('PreloadScene: Preloading assets...');

    // Hiển thị thanh tiến trình tải (ví dụ đơn giản)
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Đang tải...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
         color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      percentText.setText(parseInt((value * 100).toString(), 10) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      console.log('PreloadScene: Preload complete.');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      // Chuyển sang Scene chính sau khi tải xong
      this.scene.start('MainScene');
    });

    // --- Tải tài nguyên ở đây ---
    // !! Quan trọng: Thay thế các đường dẫn và key bằng tài nguyên thực tế của bạn !!
    console.log('PreloadScene: Loading placeholder assets paths. Replace with your actual assets!');

    // 1. Tilemap: Cần file JSON (xuất từ Tiled Map Editor) và ảnh Tileset
    this.load.image('tiles', 'assets/tiles/tilesheet.png'); // Key: 'tiles', Path: assets/tiles/tilesheet.png
    this.load.tilemapTiledJSON('map', 'assets/maps/map.json'); // Key: 'map', Path: assets/maps/map.json

    // 2. Ảnh cho nhà
    this.load.image('house', 'assets/images/house.png'); // Key: 'house', Path: assets/images/house.png

    // 3. Spritesheet cho nhân vật
    this.load.spritesheet('player', 'assets/sprites/player.png', { // Key: 'player', Path: assets/sprites/player.png
      frameWidth: 32, // Chiều rộng 1 frame
      frameHeight: 32 // Chiều cao 1 frame
      // startFrame: 0, // Frame bắt đầu (mặc định 0)
      // endFrame: -1 // Frame kết thúc (mặc định hết sheet)
    });

    // --- Ví dụ tải âm thanh ---
    // this.load.audio('backgroundMusic', ['assets/audio/music.ogg', 'assets/audio/music.mp3']);
  }

  create(): void {
    console.log('PreloadScene: Create method called (transitioning to MainScene).');
    // Thường không cần làm gì ở create của PreloadScene sau khi đã cấu hình chuyển scene trong 'complete'
  }
}
`,

    'src/app/game/scenes/main.scene.ts': `
import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private tileset!: Phaser.Tilemaps.Tileset;
  private groundLayer!: Phaser.Tilemaps.TilemapLayer | null;
  private waterLayer!: Phaser.Tilemaps.TilemapLayer | null;
  private objectLayer!: Phaser.Tilemaps.TilemapLayer | null;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private houses!: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    console.log('MainScene: Creating game world...');

    // --- Tạo bản đồ ---
    try {
        this.map = this.make.tilemap({ key: 'map' });
        // !! Quan trọng: 'tilesheet_in_tiled' là tên bạn đặt cho tileset KHI thêm vào trong Tiled Editor
        // !! 'tiles' là key bạn dùng khi load ảnh tileset trong PreloadScene
        this.tileset = this.map.addTilesetImage('tilesheet_in_tiled', 'tiles');

        if (!this.tileset) {
            console.error("Tileset không được tạo. Kiểm tra tên tileset trong Tiled ('tilesheet_in_tiled') và key ảnh ('tiles') có khớp không.");
            return; // Dừng nếu không có tileset
        }

        // Tạo các Layer (Tên layer phải khớp với Tiled)
        // Sử dụng createLayer thay vì createStaticLayer nếu cần thay đổi tile động
        this.waterLayer = this.map.createLayer('WaterLayer', this.tileset, 0, 0);
        this.groundLayer = this.map.createLayer('GroundLayer', this.tileset, 0, 0);
        this.objectLayer = this.map.createLayer('ObjectLayer', this.tileset, 0, 0);

        if (!this.groundLayer) {
            console.warn("Không tìm thấy GroundLayer trong Tiled map.");
        }
         if (!this.waterLayer) {
            console.warn("Không tìm thấy WaterLayer trong Tiled map.");
        }
        if (!this.objectLayer) {
            console.warn("Không tìm thấy ObjectLayer trong Tiled map.");
        } else {
             // Thiết lập va chạm cho ObjectLayer (dựa vào custom property 'collides' đặt trong Tiled)
            this.objectLayer.setCollisionByProperty({ collides: true });
        }

    } catch (error) {
        console.error("Lỗi khi tạo Tilemap hoặc Layers:", error);
        console.error("Kiểm tra xem file map.json có hợp lệ và các key/tên có đúng không?");
        // Có thể hiển thị thông báo lỗi cho người dùng ở đây
        this.add.text(100, 100, 'Lỗi tải map!', { color: '#ff0000', fontSize: '24px' });
        return; // Dừng nếu có lỗi nghiêm trọng
    }


    // --- Tạo nhân vật ---
    let playerStartX = this.map.widthInPixels / 2;
    let playerStartY = this.map.heightInPixels / 2;

    try {
        // Tìm vị trí spawn point từ Tiled (ví dụ: Object Layer tên 'Spawns', object tên 'PlayerSpawn')
        const spawnObjectLayer = this.map.getObjectLayer('Spawns'); // Lấy object layer
         if (spawnObjectLayer) {
            const spawnPoint = spawnObjectLayer.objects.find(obj => obj.name === 'PlayerSpawn');
             if (spawnPoint && typeof spawnPoint.x === 'number' && typeof spawnPoint.y === 'number') {
                playerStartX = spawnPoint.x;
                playerStartY = spawnPoint.y;
                console.log(\`Tìm thấy PlayerSpawn tại: [\${playerStartX}, \${playerStartY}]\`);
            } else {
                 console.warn("Không tìm thấy object 'PlayerSpawn' trong layer 'Spawns', dùng vị trí giữa map.");
            }
         } else {
            console.warn("Không tìm thấy Object Layer 'Spawns' trong map, dùng vị trí giữa map.");
         }
    } catch (error) {
        console.error("Lỗi khi tìm Spawn Point:", error);
    }


    this.player = this.physics.add.sprite(playerStartX, playerStartY, 'player');
    this.player.setCollideWorldBounds(true);

    // Thiết lập giới hạn camera và vật lý
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08); // Làm mịn camera follow

    // --- Tạo animations ---
    // !! Chỉnh sửa frame start/end cho phù hợp với spritesheet của bạn !!
    if (!this.anims.exists('player_idle')) { // Kiểm tra để tránh tạo lại anim nếu scene restart
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }), // VD: frame 0
            frameRate: 5,
            repeat: -1
        });
         this.anims.create({
            key: 'player_walk_down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }), // VD: frame 0, 1, 2
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk_up',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }), // VD: frame 3, 4, 5
            frameRate: 10,
            repeat: -1
        });
         this.anims.create({
            key: 'player_walk_left',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }), // VD: frame 6, 7, 8
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk_right',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }), // VD: frame 9, 10, 11
            frameRate: 10,
            repeat: -1
        });
    }

    this.player.anims.play('player_idle', true);

    // --- Thiết lập điều khiển ---
    this.cursors = this.input.keyboard.createCursorKeys();

    // --- Nhóm quản lý nhà ---
    this.houses = this.add.group();

    // --- Thiết lập va chạm ---
    if (this.objectLayer) {
        this.physics.add.collider(this.player, this.objectLayer);
    }
    // this.physics.add.collider(this.player, this.houses); // Thêm nếu nhà có physics body

    // --- Tương tác click vào ô đất ---
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (!this.groundLayer) return; // Bỏ qua nếu không có ground layer

      const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const tileX = this.groundLayer.worldToTileX(worldPoint.x);
      const tileY = this.groundLayer.worldToTileY(worldPoint.y);

      // Kiểm tra tile có tồn tại trên layer này không
      const clickedTile = this.groundLayer.getTileAt(tileX, tileY);

      if (clickedTile) {
        console.log(\`Clicked on tile: [\${tileX}, \${tileY}], Index: \${clickedTile.index}\`);
        // TODO: Thêm logic xử lý (ví dụ: kiểm tra xem có thể xây nhà ở đây không)
        // if (this.canBuildHere(tileX, tileY)) {
        //    this.placeHouse(tileX, tileY);
        // }
      } else {
        console.log(\`Clicked outside ground layer or on empty tile at: [\${tileX}, \${tileY}]\`);
      }
    });

    console.log('MainScene: World created.');
  }

  update(time: number, delta: number): void {
    // --- Xử lý di chuyển ---
    const speed = 180;
    let currentAnim = 'player_idle';
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      currentAnim = 'player_walk_left';
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      currentAnim = 'player_walk_right';
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      // Ưu tiên animation ngang nếu đang đi chéo
      if (currentAnim === 'player_idle') currentAnim = 'player_walk_up';
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      if (currentAnim === 'player_idle') currentAnim = 'player_walk_down';
    }

    // Chạy animation nếu khác frame trước hoặc đang idle
    if (this.player.anims.currentAnim?.key !== currentAnim) {
        this.player.anims.play(currentAnim, true);
    }

    // Chuẩn hóa tốc độ khi đi chéo
    this.player.body.velocity.normalize().scale(speed);
  }

  // --- Hàm ví dụ để đặt nhà ---
  placeHouse(tileX: number, tileY: number): void {
    if (!this.map) return;
    // Chuyển tile XY sang world XY (pixel)
    const worldX = this.map.tileToWorldX(tileX);
    const worldY = this.map.tileToWorldY(tileY);

    // Thêm ảnh nhà vào group
    // setOrigin(0, 1) thường hợp lý cho game isometric/top-down để gốc đặt ở chân đối tượng
    const newHouse = this.houses.create(worldX, worldY, 'house').setOrigin(0, 1);
    console.log(\`Placed house at tile [\${tileX}, \${tileY}]\`);

    // Cần thêm logic:
    // 1. Kiểm tra xem có thể xây ở đây không (đất trống, không có vật cản...)
    // 2. Trừ tài nguyên
    // 3. Có thể cần cập nhật dữ liệu map hoặc thêm va chạm cho ngôi nhà mới
  }

   // --- Hàm kiểm tra có thể xây dựng ---
   canBuildHere(tileX: number, tileY: number): boolean {
       if (!this.map || !this.groundLayer || !this.objectLayer) return false;

       const groundTile = this.groundLayer.getTileAt(tileX, tileY);
       const objectTile = this.objectLayer.getTileAt(tileX, tileY);

       // Điều kiện ví dụ:
       // - Phải có tile đất (không phải biển, không phải vực thẳm...)
       // - Không được có vật thể nào khác trên ô đó (cây, đá...)
       const canBuild = groundTile !== null && // Có tile trên ground layer
                      objectTile === null;     // Không có tile trên object layer

       if (!canBuild) {
            console.log(\`Không thể xây tại [\${tileX}, \${tileY}]: ground=\${groundTile?.index}, object=\${objectTile?.index}\`);
       }
       return canBuild;
   }

   // --- Hàm được gọi từ Service (ví dụ) ---
   handleBuildAction(buildType: string, tileX: number, tileY: number) {
        if (buildType === 'house') {
            if (this.canBuildHere(tileX, tileY)) {
                this.placeHouse(tileX, tileY);
            }
        }
        // else if (buildType === 'farm') { ... }
   }
}

`,

    // === Placeholder cho các file tài nguyên ===
    'src/assets/maps/map.json': `{
 "compressionlevel":-1,
 "height":20,
 "infinite":false,
 "layers":[
        {
         "data":[/* Dữ liệu tile cho layer này - sẽ được tạo bởi Tiled */],
         "height":20,
         "id":1,
         "name":"WaterLayer", // Tên layer phải khớp code
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0
        },
        {
         "data":[/* Dữ liệu tile cho layer này - sẽ được tạo bởi Tiled */],
         "height":20,
         "id":2,
         "name":"GroundLayer", // Tên layer phải khớp code
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0
        },
        {
         "data":[/* Dữ liệu tile cho layer này - sẽ được tạo bởi Tiled */],
         "height":20,
         "id":3,
         "name":"ObjectLayer", // Tên layer phải khớp code
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0,
         "properties":[ // Ví dụ đặt thuộc tính cho layer
                {
                 "name":"collidable",
                 "type":"bool",
                 "value":true
                }]
        },
        {
         "draworder":"topdown",
         "id":4,
         "name":"Spawns", // Layer chứa object spawn point
         "objects":[
                {
                 "height":32, // Kích thước không quá quan trọng, chỉ cần vị trí
                 "id":1,
                 "name":"PlayerSpawn", // Tên object phải khớp code
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":150, // Vị trí X spawn
                 "y":150  // Vị trí Y spawn
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":2,
 "orientation":"orthogonal", // Hoặc isometric
 "renderorder":"right-down",
 "tiledversion":"1.9.2", // Phiên bản Tiled bạn dùng
 "tileheight":16, // Chiều cao 1 tile
 "tilesets":[
        {
         "firstgid":1, // Global ID bắt đầu của tileset này
         "source":"..\/tiles\/tilesheet.tsx" // Đường dẫn tương đối đến file .tsx (hoặc .json nếu export riêng) TỪ file map.json
         // !! Quan trọng: Tiled thường lưu đường dẫn tương đối. Đảm bảo cấu trúc thư mục đúng.
         // !! Hoặc bạn có thể cấu hình Tiled để nhúng tileset vào map JSON.
        }],
 "tilewidth":16, // Chiều rộng 1 tile
 "type":"map",
 "version":"1.9",
 "width":25 // Số tile theo chiều ngang
}`,
    'src/assets/tiles/tilesheet.png': '// Placeholder: Thêm file ảnh tilesheet của bạn vào đây (ví dụ: 16x16 tiles)',
    'src/assets/images/house.png': '// Placeholder: Thêm file ảnh nhà của bạn vào đây',
    'src/assets/sprites/player.png': '// Placeholder: Thêm file ảnh spritesheet nhân vật của bạn vào đây (ví dụ: 32x32 frames)',
};

// --- Hàm thực thi ---

function createDirectories() {
    console.log("\n--- Tạo thư mục ---");
    directories.forEach(dir => {
        const fullPath = path.join(projectRoot, dir);
        if (!fs.existsSync(fullPath)) {
            try {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(`[OK] Đã tạo: ${dir}`);
            } catch (error) {
                console.error(`[Lỗi] Không thể tạo thư mục ${dir}:`, error);
            }
        } else {
            console.log(`[Tồn tại] Thư mục: ${dir}`);
        }
    });
}

function createFiles() {
    console.log("\n--- Tạo/Ghi đè file mã nguồn & placeholder ---");
    Object.entries(files).forEach(([filePath, content]) => {
        const fullPath = path.join(projectRoot, filePath);
        try {
            // Nếu là file ảnh placeholder, chỉ tạo file trống nếu chưa có
            if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.gif')) {
                if (!fs.existsSync(fullPath)) {
                     fs.writeFileSync(fullPath, `/* ${content} */`); // Ghi comment vào file trống
                     console.log(`[OK] Đã tạo placeholder: ${filePath}`);
                } else {
                     console.log(`[Tồn tại] Placeholder asset: ${filePath}`);
                }
            } else if (filePath.endsWith('.json') && filePath.includes('assets')) {
                 if (!fs.existsSync(fullPath)) {
                     fs.writeFileSync(fullPath, content.trim());
                     console.log(`[OK] Đã tạo placeholder JSON: ${filePath}`);
                } else {
                     console.log(`[Tồn tại] Placeholder JSON: ${filePath}`);
                }
            }
            else {
                // Ghi đè các file mã nguồn và config
                fs.writeFileSync(fullPath, content.trim());
                console.log(`[OK] Đã tạo/ghi đè: ${filePath}`);
            }
        } catch (error) {
            console.error(`[Lỗi] Không thể ghi file ${filePath}:`, error);
        }
    });
}

function modifyAppModule() {
    console.log("\n--- Cập nhật src/app/app.module.ts ---");
    const appModulePath = path.join(projectRoot, 'src/app/app.module.ts');
    try {
        let content = fs.readFileSync(appModulePath, 'utf8');

        // Thêm import GameComponent nếu chưa có
        const importStatement = "import { GameComponent } from './game/game.component';";
        if (!content.includes(importStatement)) {
            // Chèn sau dòng import AppComponent (hoặc dòng import cuối cùng trước @NgModule)
            const importRegex = /(import .* from '.*';\s*)+/;
            const match = content.match(importRegex);
            if (match) {
                content = content.replace(match[0], `${match[0]}${importStatement}\n`);
                console.log("[OK] Đã thêm import GameComponent.");
            } else {
                 // Nếu không tìm thấy import nào khác, thêm vào đầu (ít xảy ra)
                 content = `${importStatement}\n${content}`;
                 console.log("[OK] Đã thêm import GameComponent (vào đầu file).");
            }
        } else {
             console.log("[Tồn tại] Import GameComponent đã có.");
        }


        // Thêm GameComponent vào declarations nếu chưa có
         const declarationRegex = /declarations:\s*\[([^\]]*)\]/;
         const declarationMatch = content.match(declarationRegex);

         if (declarationMatch && !declarationMatch[1].includes('GameComponent')) {
             const existingDeclarations = declarationMatch[1].trim();
             let newDeclarations;
             if (existingDeclarations.endsWith(',')) {
                  newDeclarations = `${existingDeclarations} GameComponent`;
             } else if (existingDeclarations) { // Nếu có gì đó nhưng không có dấu phẩy cuối
                 newDeclarations = `${existingDeclarations}, GameComponent`;
             } else { // Mảng rỗng
                 newDeclarations = `GameComponent`;
             }
             content = content.replace(declarationRegex, `declarations: [${newDeclarations}]`);
             console.log("[OK] Đã thêm GameComponent vào declarations.");
         } else if (!declarationMatch) {
             console.warn("[Cảnh báo] Không tìm thấy mảng 'declarations' trong app.module.ts. Bạn cần thêm GameComponent thủ công.");
         }
         else {
             console.log("[Tồn tại] GameComponent đã có trong declarations.");
         }


        fs.writeFileSync(appModulePath, content);
        // console.log("[OK] Đã cập nhật app.module.ts");

    } catch (error) {
        console.error(`[Lỗi] Không thể cập nhật ${appModulePath}:`, error);
    }
}

function modifyAppComponentHtml() {
    console.log("\n--- Cập nhật src/app/app.component.html ---");
    const appHtmlPath = path.join(projectRoot, 'src/app/app.component.html');
    const newContent = `
<h1>My Angular + Phaser Game</h1>
<app-game></app-game>
`.trim();
    try {
        fs.writeFileSync(appHtmlPath, newContent);
        console.log("[OK] Đã ghi đè app.component.html để hiển thị GameComponent.");
    } catch (error) {
        console.error(`[Lỗi] Không thể ghi đè ${appHtmlPath}:`, error);
    }
}

// --- Chạy các hàm ---
createDirectories();
createFiles();
modifyAppModule();
modifyAppComponentHtml();

console.log("\n--- Hoàn tất! ---");
console.log("Các bước tiếp theo:");
console.log("1. Chạy 'npm install phaser' (nếu chưa làm).");
console.log("2. Thêm các file tài nguyên thực tế (ảnh, map JSON từ Tiled) vào thư mục 'src/assets/...' tương ứng.");
console.log("3. Chỉnh sửa tên tileset ('tilesheet_in_tiled') và tên các layer ('GroundLayer', 'WaterLayer', 'ObjectLayer', 'Spawns') trong 'main.scene.ts' cho khớp với file Tiled map của bạn.");
console.log("4. Chỉnh sửa animation frames trong 'main.scene.ts' cho khớp với spritesheet nhân vật của bạn.");
console.log("5. Chạy 'ng serve' để khởi động ứng dụng.");