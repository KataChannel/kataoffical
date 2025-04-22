// import Phaser from 'phaser';

// export class MainScene extends Phaser.Scene {
//   private video!: Phaser.GameObjects.Video;
//   private plotContainer!: Phaser.GameObjects.Container;
//   private zoomedIn = false;

//   constructor() {
//     super({ key: 'MainScene' });
//   }

//   preload(): void {
//     this.load.video('background', 'assets/videos/video_dathoa.mp4', true);
//    // this.load.image('tile', 'assets/tile.png');
//    // this.load.image('seed', 'assets/seed.png');
//   }

//   create(): void {
//     this.createVideoBackground();
//     this.createTileContainer();
//     this.input.on('pointerdown', () => this.toggleZoom());
//   }

//   createVideoBackground(): void {
//     this.video = this.add.video(1024, 1952, 'background');
//     this.video.setOrigin(0, 0);
//     this.video.setDisplaySize(1024, 1952);
//     this.video.play(true).setMute(true);
//   }

//   createTileContainer(): void {
//     // Container cho các ô đất
//     this.plotContainer = this.add.container(512, 976); // Chính giữa video 1024x1952

//     const spacing = 64;
//     const rows = 3;
//     const cols = 4;

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         const x = (col - (cols - 1) / 2) * spacing;
//         const y = (row - (rows - 1) / 2) * spacing;
//         const tile = this.add.image(x, y, 'tile').setInteractive();

//         tile.on('pointerdown', () => {
//           const seed = this.add.image(x, y - 10, 'seed');
//           this.plotContainer.add(seed); // Thêm seed vào container để zoom theo
//         });

//         this.plotContainer.add(tile);
//       }
//     }

//     // Đặt camera nhìn vào giữa đảo
//     this.cameras.main.setBounds(0, 0, 1024, 1952);
//     this.cameras.main.centerOn(512, 976);
//   }

//   toggleZoom(): void {
//     const cam = this.cameras.main;

//     if (!this.zoomedIn) {
//       cam.zoomTo(2, 1000); // Zoom in 2x
//       cam.pan(512, 976, 1000, 'Sine.easeInOut');
//       this.zoomedIn = true;
//     } else {
//       cam.zoomTo(1, 1000); // Zoom out
//       cam.pan(512, 976, 1000, 'Sine.easeInOut');
//       this.zoomedIn = false;
//     }
//   }
// }
