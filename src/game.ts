// src/game.ts
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
console.log('Phaser game initialized (LocalStorage & Images Version)');