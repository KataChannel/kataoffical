// src/app/game/game.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from './main.scene'; // Đảm bảo import MainScene

type IslandType = 'hoa' | 'kim' | 'moc' | 'thuy' | 'tho';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // Hoặc .css
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  gameInstance: Phaser.Game | null = null;
  selectedIsland: IslandType = 'hoa';

  // --- Các phần khác giữ nguyên ---

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startGame(this.selectedIsland);
  }

  ngOnDestroy(): void {
    this.destroyGame();
  }

  startGame(islandType: IslandType): void {
     // --- Phần khởi tạo game giữ nguyên ---
     this.selectedIsland = islandType;
     console.log(`Starting game with island: ${this.selectedIsland}`);
     this.destroyGame();
     this.ngZone.runOutsideAngular(() => {
        this.gameInstance = new Phaser.Game({
            type: Phaser.AUTO,
            width: 1500, // Giữ kích thước cố định cho game logic
            height: 1500,
            pixelArt: true,
            parent: this.gameContainer.nativeElement,
            scene: [],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: true // Tắt debug khi không cần
                }
            },
            scale: {
                mode: Phaser.Scale.FIT, // FIT sẽ giữ tỷ lệ và thu nhỏ/phóng to để vừa container
                autoCenter: Phaser.Scale.CENTER_BOTH, // Tự động căn giữa
                parent: 'gameContainerId', // Đảm bảo scale theo parent div
                width: '100%', // Chiều rộng theo parent
                height: '100%' // Chiều cao theo parent
            },
            // backgroundColor: '#2d2d2d' // Màu nền tạm thời để dễ thấy khung
        });
        this.gameInstance.scene.add('MainScene', MainScene, true, { islandType: this.selectedIsland });
    });
  }

  destroyGame(): void {
    if (this.gameInstance) {
      console.log("Destroying current game instance...");
      this.gameInstance.destroy(true);
      this.gameInstance = null;
    }
  }

  changeIsland(newIsland: IslandType): void {
    if (newIsland !== this.selectedIsland && this.gameInstance) {
        console.log(`Changing island to: ${newIsland}`);
        this.startGame(newIsland);
    }
  }

  // --- Hàm xử lý Zoom ---
  zoomIn(): void {
    const scene = this.gameInstance?.scene.getScene('MainScene') as MainScene; // Ép kiểu để gọi hàm custom
    if (scene?.zoomInCamera) { // Kiểm tra xem hàm có tồn tại không
        scene.zoomInCamera();
    } else {
        console.warn('MainScene or zoomInCamera method not found');
    }
  }

  zoomOut(): void {
    const scene = this.gameInstance?.scene.getScene('MainScene') as MainScene; // Ép kiểu
     if (scene?.zoomOutCamera) { // Kiểm tra xem hàm có tồn tại không
        scene.zoomOutCamera();
    } else {
        console.warn('MainScene or zoomOutCamera method not found');
    }
  }
}