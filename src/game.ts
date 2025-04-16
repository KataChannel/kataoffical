// abc/game.ts
import Phaser from 'phaser';
import { FarmScene } from './scenes/FarmScene'; // Import từ thư mục con

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    backgroundColor: '#2d2d2d',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [FarmScene]
};

const game = new Phaser.Game(config);
console.log('Phaser game initialized (TypeScript Modular + TON Connect)');