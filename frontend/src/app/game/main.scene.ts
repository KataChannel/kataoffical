// src/app/game/main.scene.ts
import Phaser from 'phaser';

type IslandType = 'hoa' | 'kim' | 'moc' | 'thuy' | 'tho';

const islandAssets = {
    hoa: { video: 'dathoa', soil: 'odat_hoa' },
    kim: { video: 'datkim', soil: 'odat_kim' },
    moc: { video: 'datmoc', soil: 'odat_moc' },
    thuy: { video: 'datthuy', soil: 'odat_thuy' },
    tho: { video: 'dattho', soil: 'odat_tho' }
};

export class MainScene extends Phaser.Scene {
    private video!: Phaser.GameObjects.Video;
    private plotContainer!: Phaser.GameObjects.Container;
    // private zoomedIn = false; // Không cần nữa nếu dùng zoom step
    private currentIslandType: IslandType = 'hoa';
    private currentZoomLevel: number = 1; // Theo dõi mức zoom hiện tại
    private readonly ZOOM_STEP: number = 0.5; // Bước nhảy zoom
    private readonly MIN_ZOOM: number = 1;   // Zoom tối thiểu
    private readonly MAX_ZOOM: number = 3;   // Zoom tối đa

    constructor() {
        super({ key: 'MainScene' });
    }

    init(data: { islandType: IslandType }): void {
        // --- init giữ nguyên ---
        this.currentIslandType = data.islandType || 'hoa';
        console.log(`Initializing MainScene for island: ${this.currentIslandType}`);
        this.currentZoomLevel = this.MIN_ZOOM; // Reset zoom khi đổi đảo
    }

    preload(): void {
       // --- preload giữ nguyên ---
        const assets = islandAssets[this.currentIslandType];
        console.log(`Loading video: assets/videos/${assets.video}.mp4`);
        // Quan trọng: Sự kiện 'canplaythrough' đảm bảo video đã sẵn sàng trước khi lấy kích thước
        this.load.video(assets.video, `assets/videos/${assets.video}.mp4`, true); // false: no audio, true: noBlob

        console.log(`Loading spritesheet: assets/odat/${assets.soil}.png`);
        this.load.spritesheet(assets.soil, `assets/odat/${assets.soil}.png`, {
            frameWidth: 512,
            frameHeight: 512
        });
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
        this.video = this.add.video(gameWidth / 2, gameHeight / 2, assets.video); // Đặt tâm video ở giữa game
        this.video.setOrigin(0.5, 0.5); // Đặt gốc tọa độ ở tâm video

        // Lấy kích thước gốc của video để tính toán scale
        const videoWidth = this.video.width;
        const videoHeight = this.video.height;

        if (videoWidth > 0 && videoHeight > 0) {
            // --- TÍNH TOÁN VÀ ÁP DỤNG LẠI SCALE "FIT" ---
            // Tính tỷ lệ scale nhỏ nhất để video vừa khít vào khung game (960x960)
            // mà không bị méo và không bị cắt mất phần nào.
          //  const scale = Math.min(gameWidth / videoWidth, gameHeight / videoHeight);

            // Áp dụng tỷ lệ scale đã tính
          //  this.video.setScale(scale);
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
        this.plotContainer = this.add.container(500, 500);

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

                tile.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    // Nếu bạn KHÔNG muốn click vào ô đất mà vẫn bị zoom -> Bỏ dòng stopPropagation đi
                    // Nếu bạn MUỐN click vào ô đất sẽ KHÔNG bị zoom (nếu zoom bằng background click) -> giữ lại dòng này
                    // pointer.event.stopPropagation();

                    console.log(`Clicked on plot at [${row}, ${col}] on island ${this.currentIslandType}`);
                    // Xử lý trồng cây tại đây...
                });

                this.plotContainer.add(tile);
            }
        }
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