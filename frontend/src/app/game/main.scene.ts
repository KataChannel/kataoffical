// src/app/game/main.scene.ts
import Phaser from 'phaser';
import { GameStateService } from './game-state.service';

type IslandType = 'hoa' | 'kim' | 'moc' | 'thuy' | 'tho';

const islandAssets = {
    hoa: { video: 'dathoa', soil: 'odat_hoa' },
    kim: { video: 'datkim', soil: 'odat_kim' },
    moc: { video: 'datmoc', soil: 'odat_moc' },
    thuy: { video: 'datthuy', soil: 'odat_thuy' },
    tho: { video: 'dattho', soil: 'odat_tho' }
};

enum PlotState {
    EMPTY = 'empty',          // Ô đất trống
    SEEDLING = 'seedling',      // Đã gieo hạt -> cây con
    HARVESTABLE = 'harvestable',  // Cây trưởng thành, sẵn sàng thu hoạch
    // GROWING = 'growing' // Có thể thêm trạng thái đang lớn nếu cần animation phức tạp
}

const plantCatalog: { [key: string]: { name: string, growTime: number, harvestItem: string, seedlingKey: string, harvestableKey: string } } = {
    'seed_basic': { name: 'Cây Cơ Bản', growTime: 10, harvestItem: 'fruit_basic', seedlingKey: 'plant_basic_seedling', harvestableKey: 'plant_basic_harvestable' },
    'kim': { name: 'Dừa Kim', growTime: 60, harvestItem: 'fruit_kim', seedlingKey: 'plant_kim_seedling', harvestableKey: 'plant_kim_harvestable' },
    'moc': { name: 'Chuối Mộc', growTime: 45, harvestItem: 'fruit_moc', seedlingKey: 'plant_moc_seedling', harvestableKey: 'plant_moc_harvestable' },
    // ... thêm các loại cây khác
};
export class MainScene extends Phaser.Scene {
    private video!: Phaser.GameObjects.Video;
    private plotContainer!: Phaser.GameObjects.Container;
    // private zoomedIn = false; // Không cần nữa nếu dùng zoom step
    private currentIslandType: IslandType = 'hoa';
    private currentZoomLevel: number = 1; // Theo dõi mức zoom hiện tại
    private readonly ZOOM_STEP: number = 3; // Bước nhảy zoom
    private readonly MIN_ZOOM: number = 0.5  // Zoom tối thiểu
    private readonly MAX_ZOOM: number = 2;   // Zoom tối đa
    constructor(private gameStateService: GameStateService) { // Removed the generic type <GameStateService>
        super({ key: 'MainScene' });
    }

    init(data: { islandType: IslandType; gameStateService: GameStateService }): void {
        this.currentIslandType = data.islandType || 'hoa';
        this.gameStateService = data.gameStateService; // Lưu service
        console.log(`Initializing MainScene for island: ${this.currentIslandType}`);
        this.currentZoomLevel = this.MIN_ZOOM;
    }

    preload(): void {
       // --- preload giữ nguyên ---
        const assets = islandAssets[this.currentIslandType];
        console.log(`Loading video: assets/videos/${assets.video}.mp4`);
        this.load.video(assets.video, `assets/videos/${assets.video}.mp4`, true); // false: no audio, true: noBlob
        console.log(`Loading spritesheet: assets/odat/${assets.soil}.png`);
        this.load.spritesheet(assets.soil, `assets/odat/${assets.soil}.png`, {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.image('plant_basic_seedling', 'assets/images/plants/basic_seedling.png');
        this.load.image('plant_basic_harvestable', 'assets/images/plants/basic_harvestable.png');
        this.load.image('plant_kim_seedling', 'assets/images/plants/kim_seedling.png');
        this.load.image('plant_kim_harvestable', 'assets/images/plants/kim_harvestable.png');
        this.load.image('plant_moc_seedling', 'assets/images/plants/moc_seedling.png');
        this.load.image('plant_moc_harvestable', 'assets/images/plants/moc_harvestable.png');
    }

    create(): void {
        // --- Tạo background và ô đất ---
        this.createVideoBackground(); // Tạo video trước
        this.createTileContainer();   // Rồi đến các ô đất

        // --- Tạo animations ---
        const assets = islandAssets[this.currentIslandType];
        const animKey = `burningSoil_${this.currentIslandType}`;
        if (!this.anims.exists(animKey)) {
             this.anims.create({
                key: animKey,
                frames: this.anims.generateFrameNumbers(assets.soil, { start: 0, end: 3 }),
                frameRate: 6,
                repeat: -1
            });
            console.log(`Created animation: ${animKey}`);
        } else {
             console.log(`Animation already exists: ${animKey}`);
        }

        this.plotContainer.each((tile: Phaser.GameObjects.GameObject) => {
            if (tile instanceof Phaser.GameObjects.Sprite && tile.texture.key === assets.soil) {
                 tile.play(animKey);
            }
        });

        // --- Loại bỏ toggleZoom bằng click ---
        // this.input.on('pointerdown', () => this.toggleZoom()); // Xóa hoặc comment dòng này

        // --- Thiết lập camera ---
        this.cameras.main.setBounds(0, 0, 1000, 1000);
        this.cameras.main.centerOn(500, 500);
        this.cameras.main.setZoom(this.currentZoomLevel); // Đặt zoom ban đầu
    }






    createVideoBackground(): void {
        const assets = islandAssets[this.currentIslandType];
        const gameWidth = 1000
        const gameHeight = 1000

        // Quan trọng: Lấy video từ cache sau khi đã preload
        this.video = this.add.video(gameWidth/2, gameHeight/2, assets.video); // Đặt tâm video ở giữa game
        this.video.setOrigin(0.5, 0.5); // Đặt gốc tọa độ ở tâm video

        // Lấy kích thước gốc của video để tính toán scale
        const videoWidth = this.video.width;
        const videoHeight = this.video.height;

        if (videoWidth > 0 && videoHeight > 0) {
            // --- TÍNH TOÁN VÀ ÁP DỤNG LẠI SCALE "FIT" ---
            // Tính tỷ lệ scale nhỏ nhất để video vừa khít vào khung game (960x960)
            // mà không bị méo và không bị cắt mất phần nào.
            // const scale = Math.min(gameWidth / videoWidth, gameHeight / videoHeight);

            // Áp dụng tỷ lệ scale đã tính
            // this.video.setScale(650 / 960);
            // --- KẾT THÚC PHẦN SCALE ---

           // console.log(`Video '${assets.video}' loaded. Original: ${videoWidth}x${videoHeight}. Scaled by: ${scale.toFixed(2)} to fit within ${gameWidth}x${gameHeight}`);

        } else {
            // Fallback nếu không lấy được kích thước -> Dùng setDisplaySize có thể làm méo hình
          //  console.warn(`Video '${assets.video}' dimensions not available immediately. Using setDisplaySize as fallback (may distort).`);
          //  this.video.setDisplaySize(gameWidth, gameHeight);
        }

        // Phát video và đặt nó ở lớp dưới cùng
        this.video.play(true).setMute(true);
        this.video.setDepth(-1); // Đảm bảo video ở lớp dưới cùng
    }

    createTileContainer(): void {
        // --- createTileContainer giữ nguyên, chỉ bỏ stopPropagation nếu cần ---
        const assets = islandAssets[this.currentIslandType];
        this.plotContainer = this.add.container(500, 450);

        const spacing = 32;
        const rows = 5;
        const cols = 5;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = (col - (cols - 1) / 2) * spacing;
                const y = (row - (rows - 1) / 2) * spacing;

                const tile = this.add.sprite(x, y, assets.soil);
                tile.setScale(32 / 512);
                tile.setInteractive();
                tile.setDepth(0);
                tile.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    // Nếu bạn KHÔNG muốn click vào ô đất mà vẫn bị zoom -> Bỏ dòng stopPropagation đi
                    // Nếu bạn MUỐN click vào ô đất sẽ KHÔNG bị zoom (nếu zoom bằng background click) -> giữ lại dòng này
                    // pointer.event.stopPropagation();

                    console.log(`Clicked on plot at [${row}, ${col}] on island ${this.currentIslandType}`);
                    // Xử lý trồng cây tại đây...
                });
                this.plotContainer.add(tile);

                // const plantSprite = this.add.sprite(x, y, '');
                // plantSprite.setScale(0.7); // Điều chỉnh scale cây cho phù hợp
                // plantSprite.setVisible(false); // Ban đầu ẩn
                // plantSprite.setDepth(1); // Cây trồng đè lên đất nền
                // plantSprite.setOrigin(0.5, 0.8);

                // const plot = this.add.container(x, y);
                // plot.add([tile, plantSprite]); // Thêm đất nền và sprite cây vào container ô đất
                // plot.setSize(tile.displayWidth, tile.displayHeight); // Kích thước tương tác
                // plot.setInteractive();
                // plot.setData({
                //     state: PlotState.EMPTY,
                //     plantType: null, // Loại cây đang trồng (vd: 'seed_basic')
                //     plantedTime: 0,
                //     growTimer: null // Timer event của Phaser
                // });
                // plot.on('pointerdown', () => {
                //     this.handlePlotClick(plot); // Gọi hàm xử lý click riêng
                // });
                // this.plotContainer.add(plot);
            }
        }
    }
    handlePlotClick(plot: Phaser.GameObjects.Container): void {
        const plotData = plot.getData('state');
        const currentSeed = this.gameStateService.getCurrentSeed(); // Lấy hạt giống đang chọn từ service

        switch (plotData.state) {
            case PlotState.EMPTY:
                if (currentSeed && plantCatalog[currentSeed]) { // Kiểm tra có hạt giống được chọn và hợp lệ không
                    console.log(`Planting ${currentSeed} on empty plot.`);
                    this.plantSeed(plot, currentSeed);
                } else {
                    console.log("Click on empty plot, no seed selected.");
                    // Có thể thêm hiệu ứng lắc đầu hoặc thông báo "Chọn hạt giống trước"
                }
                break;

            case PlotState.SEEDLING:
                console.log("Click on seedling. Waiting for it to grow.");
                // Có thể hiển thị thông tin thời gian còn lại
                break;

            case PlotState.HARVESTABLE:
                console.log(`Harvesting ${plot.getData('plantType')}.`);
                this.harvestPlant(plot);
                break;
        }
    }
    plantSeed(plot: Phaser.GameObjects.Container, seedType: string): void {
        // 1. Sử dụng hạt giống từ kho đồ qua service
        this.gameStateService.useSeed(seedType);

        // 2. Cập nhật trạng thái ô đất
        const plantInfo = plantCatalog[seedType];
        plot.setData('state', PlotState.SEEDLING);
        plot.setData('plantType', seedType);
        plot.setData('plantedTime', this.time.now);

        // 3. Hiển thị hình ảnh cây con
        const plantSprite = plot.getAt(1) as Phaser.GameObjects.Sprite; // Lấy sprite cây (ở index 1)
        plantSprite.setTexture(plantInfo.seedlingKey); // Đặt ảnh cây con
        plantSprite.setScale(0.5); // Scale nhỏ lúc mới trồng
        plantSprite.setVisible(true);
        // (Tùy chọn) Thêm hiệu ứng trồng cây
        this.tweens.add({
            targets: plantSprite,
            scale: 0.7, // Scale lớn dần lên scale chuẩn của cây con
            duration: 300,
            ease: 'Power2'
        });


        // 4. Đặt hẹn giờ để cây lớn
        const growDuration = plantInfo.growTime * 1000; // Chuyển giây sang mili giây
        const timer = this.time.addEvent({
            delay: growDuration,
            callback: () => {
                this.growPlant(plot);
            },
            callbackScope: this,
        });
        plot.setData('growTimer', timer); // Lưu lại timer để có thể hủy nếu cần
    }

    growPlant(plot: Phaser.GameObjects.Container): void {
        // Kiểm tra xem ô đất có còn đang ở trạng thái seedling không (tránh trường hợp bị hủy giữa chừng)
        if (plot.getData('state') === PlotState.SEEDLING) {
            const plantType = plot.getData('plantType');
            const plantInfo = plantCatalog[plantType];

            console.log(`${plantType} has grown!`);
            plot.setData('state', PlotState.HARVESTABLE);

            // Cập nhật hình ảnh cây trưởng thành
            const plantSprite = plot.getAt(1) as Phaser.GameObjects.Sprite;
            plantSprite.setTexture(plantInfo.harvestableKey);
            plantSprite.setScale(0.7); // Reset scale về scale chuẩn
            // (Tùy chọn) Thêm hiệu ứng cây lớn lên
             this.tweens.add({
                 targets: plantSprite,
                 scale: 0.8, // Nháy to lên chút khi chín
                 yoyo: true,
                 duration: 200,
                 ease: 'Sine.easeInOut'
             });


            plot.setData('growTimer', null); // Xóa timer cũ
        }
    }

    harvestPlant(plot: Phaser.GameObjects.Container): void {
        const plantType = plot.getData('plantType');
        const plantInfo = plantCatalog[plantType];

        // 1. Thêm vật phẩm thu hoạch vào kho đồ qua service
        this.gameStateService.addInventoryItem(plantInfo.harvestItem, 1); // Thêm 1 trái cây/sản phẩm
        console.log(`Added 1 ${plantInfo.harvestItem} to inventory.`);

        // 2. (Tùy chọn) Thêm XP hoặc tiền tệ
        // this.gameStateService.addXP(plantInfo.xpReward);

        // 3. Reset ô đất về trạng thái EMPTY
        plot.setData('state', PlotState.EMPTY);
        plot.setData('plantType', null);
        plot.setData('plantedTime', 0);
        // Hủy timer nếu còn (dù không nên xảy ra ở trạng thái HARVESTABLE)
        const timer = plot.getData('growTimer');
        if (timer) {
            timer.remove();
            plot.setData('growTimer', null);
        }


        // 4. Ẩn hình ảnh cây
        const plantSprite = plot.getAt(1) as Phaser.GameObjects.Sprite;
         // (Tùy chọn) Thêm hiệu ứng thu hoạch
         this.tweens.add({
             targets: plantSprite,
             alpha: 0, // Mờ dần
             scale: 0.3, // Nhỏ lại
             duration: 300,
             ease: 'Power2',
             onComplete: () => {
                 plantSprite.setVisible(false);
                 plantSprite.setAlpha(1); // Reset alpha
                 plantSprite.setScale(0.7); // Reset scale
                 plantSprite.setTexture(''); // Xóa texture
             }
         });

        // 5. (Tùy chọn) Hiển thị hiệu ứng nhận được trái cây/sản phẩm bay lên
    }



    // --- Hàm zoom mới được gọi từ Angular ---
    zoomInCamera(): void {
        const targetZoom = Phaser.Math.Clamp(this.currentZoomLevel + this.ZOOM_STEP, this.MIN_ZOOM, this.MAX_ZOOM);
        if (targetZoom !== this.currentZoomLevel) {
             this.currentZoomLevel = targetZoom;
             console.log(`Zooming In to: ${this.currentZoomLevel}`);
             this.cameras.main.zoomTo(this.currentZoomLevel, 300, 'Sine.easeInOut'); // Thời gian zoom 300ms
        }
    }

    zoomOutCamera(): void {
       const targetZoom = Phaser.Math.Clamp(this.currentZoomLevel - this.ZOOM_STEP, this.MIN_ZOOM, this.MAX_ZOOM);
        if (targetZoom !== this.currentZoomLevel) {
            this.currentZoomLevel = targetZoom;
            console.log(`Zooming Out to: ${this.currentZoomLevel}`);
            this.cameras.main.zoomTo(this.currentZoomLevel, 300, 'Sine.easeInOut');
        }
    }

    // --- toggleZoom không cần thiết nữa ---
    /*
    toggleZoom(): void {
        // ... code cũ ...
    }
    */

     override update(): void {
        // Có thể thêm logic update nếu cần
     }
}