import Phaser from 'phaser';

// Định nghĩa các loại đảo
type IslandType = 'hoa' | 'kim' | 'moc' | 'thuy' | 'tho';

// Thông tin tài nguyên cho từng loại đảo
const islandAssets = {
    hoa: { video: 'dathoa', soil: 'odat_hoa' },
    kim: { video: 'datkim', soil: 'odat_kim' }, // Giả sử tên file là datkim.mp4, odat_kim.png
    moc: { video: 'datmoc', soil: 'odat_moc' }, // Giả sử tên file là datmoc.mp4, odat_moc.png
    thuy: { video: 'datthuy', soil: 'odat_thuy' }, // Giả sử tên file là datthuy.mp4, odat_thuy.png
    tho: { video: 'dattho', soil: 'odat_tho' }  // Giả sử tên file là dattho.mp4, odat_tho.png
};

export class MainScene extends Phaser.Scene {
    private video!: Phaser.GameObjects.Video;
    private plotContainer!: Phaser.GameObjects.Container;
    private zoomedIn = false;
    private currentIslandType: IslandType = 'hoa'; // Mặc định là Hỏa

    constructor() {
        super({ key: 'MainScene' });
    }

    // Nhận dữ liệu khi scene khởi tạo (ở đây là loại đảo)
    init(data: { islandType: IslandType }): void {
        this.currentIslandType = data.islandType || 'hoa'; // Lấy loại đảo từ data, nếu không có thì dùng mặc định
        console.log(`Initializing MainScene for island: ${this.currentIslandType}`);
    }

    preload(): void {
        const assets = islandAssets[this.currentIslandType];

        // Load video và spritesheet tương ứng với đảo được chọn
        console.log(`Loading video: assets/videos/${assets.video}.mp4`);
        this.load.video(assets.video, `assets/videos/${assets.video}.mp4`, true);

        console.log(`Loading spritesheet: assets/odat/${assets.soil}.png`);
        this.load.spritesheet(assets.soil, `assets/odat/${assets.soil}.png`, {
            frameWidth: 512,
            frameHeight: 512
        });

        // Load các assets chung khác nếu có
        // this.load.image('seed', 'assets/seed.png');
    }

    create(): void {
        this.createVideoBackground();
        this.createTileContainer();

        const assets = islandAssets[this.currentIslandType];

        // Tạo animation cho ô đất của đảo hiện tại
        // Đảm bảo key của animation là duy nhất hoặc không bị trùng nếu bạn chuyển scene liên tục
        const animKey = `burningSoil_${this.currentIslandType}`;
        if (!this.anims.exists(animKey)) { // Chỉ tạo nếu chưa tồn tại
             this.anims.create({
                key: animKey,
                frames: this.anims.generateFrameNumbers(assets.soil, { start: 0, end: 3 }), // Giả sử các spritesheet đều có 4 frame animation
                frameRate: 6,
                repeat: -1
            });
            console.log(`Created animation: ${animKey}`);
        } else {
             console.log(`Animation already exists: ${animKey}`);
        }


        // Gọi play animation cho các ô đất đã tạo trong createTileContainer
        this.plotContainer.each((tile: Phaser.GameObjects.GameObject) => {
            if (tile instanceof Phaser.GameObjects.Sprite && tile.texture.key === assets.soil) {
                 // Chỉ play animation cho sprite thuộc spritesheet của đảo hiện tại
                 tile.play(animKey);
            } else if (tile instanceof Phaser.GameObjects.Image && tile.texture.key === 'seed') {
                 // Xử lý cho seed nếu cần
            }
        });


        this.input.on('pointerdown', () => this.toggleZoom());

        // Đặt camera nhìn vào giữa đảo
        this.cameras.main.setBounds(0, 0, 960, 960); // Giữ nguyên kích thước viewport
        this.cameras.main.centerOn(480, 480);     // Giữ nguyên tâm camera
    }

    createVideoBackground(): void {
        const assets = islandAssets[this.currentIslandType];
        this.video = this.add.video(0, 0, assets.video); // Sử dụng key video tương ứng
        this.video.setOrigin(0, 0);
        this.video.play(true).setMute(true);

        // Scale video cho vừa với màn hình game (960x960)
        // Cần biết kích thước gốc của video để scale chính xác, hoặc dùng cách khác
        // Ví dụ đơn giản: scale để chiều rộng hoặc chiều cao vừa màn hình
        const videoWidth = this.video.width; // Lấy width gốc của video meta data nếu có, hoặc set cứng
        const videoHeight = this.video.height; // Lấy height gốc
        // Giả sử video gốc là 1920x1080 chẳng hạn
        // const scale = Math.max(960 / videoWidth, 960 / videoHeight); // Scale để fill
        const scale = Math.min(this.cameras.main.width / videoWidth, this.cameras.main.height / videoHeight); // Scale để fit, cần kích thước video gốc
        // Tạm thời set scale cứng nếu chưa biết size video gốc, cần chỉnh lại cho đúng
        // this.video.setDisplaySize(960, 960); // Cách này sẽ set kích thước hiển thị

        // Căn giữa video nếu kích thước không khớp hoàn hảo sau khi scale
        const displayWidth = 960; // Kích thước hiển thị mong muốn
        const displayHeight = 960;
        this.video.setDisplaySize(displayWidth, displayHeight); // Set kích thước hiển thị

        // Tính toán vị trí để căn giữa nếu cần (nếu dùng setDisplaySize thì thường origin 0,0 là được)
        // const x = (this.cameras.main.width - displayWidth) / 2;
        // const y = (this.cameras.main.height - displayHeight) / 2;
        // this.video.setPosition(x, y); // Căn giữa video nếu scale không vừa khít

        //Đảm bảo video ở dưới cùng
        this.video.setDepth(-1);
    }

    createTileContainer(): void {
        const assets = islandAssets[this.currentIslandType];
        this.plotContainer = this.add.container(480, 480);

        const spacing = 32; // Giữ nguyên khoảng cách ô đất
        const rows = 5;    // Giữ nguyên số lượng ô
        const cols = 5;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = (col - (cols - 1) / 2) * spacing;
                const y = (row - (rows - 1) / 2) * spacing;

                // Sử dụng spritesheet tương ứng với đảo
                const tile = this.add.sprite(x, y, assets.soil);
                tile.setScale(32 / 512); // Giữ nguyên scale ô đất
               // tile.play(animKey); // Sẽ gọi play sau khi tạo anim xong
                tile.setInteractive();

                tile.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    // Ngăn chặn sự kiện zoom khi click vào ô đất
                    pointer.event.stopPropagation();

                    // Xử lý trồng cây (ví dụ)
                    console.log(`Clicked on plot at [${row}, ${col}] on island ${this.currentIslandType}`);
                    // const seed = this.add.image(x, y - 10, 'seed').setScale(0.125);
                    // this.plotContainer.add(seed);
                });

                this.plotContainer.add(tile);
            }
        }
    }

    toggleZoom(): void {
        const cam = this.cameras.main;
        const targetZoom = this.zoomedIn ? 1 : 2;
        const targetX = 480;
        const targetY = 480;

        console.log(`Toggling zoom from ${cam.zoom} to ${targetZoom}`);

        cam.zoomTo(targetZoom, 500, 'Sine.easeInOut'); // Giảm thời gian zoom
        cam.pan(targetX, targetY, 500, 'Sine.easeInOut'); // Pan về trung tâm khi zoom/unzoom
        this.zoomedIn = !this.zoomedIn;
    }

     override update(): void {
        // Có thể thêm logic update nếu cần
     }
}