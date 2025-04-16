// abc/game.ts
import Phaser from 'phaser';
// Import FarmScene từ cùng cấp hoặc thư mục con
import { FarmScene } from './scenes/FarmScene'; // Giả định FarmScene.ts nằm trong scenes/

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#2d2d2d',
    scale: { // Cân nhắc thêm cấu hình scale nếu muốn responsive
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [FarmScene] // Đưa scene đã refactor vào
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (TypeScript Modular Version)');