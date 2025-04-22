import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from './main.scene';

// Định nghĩa lại type ở đây hoặc import từ nơi khác
type IslandType = 'hoa' | 'kim' | 'moc' | 'thuy' | 'tho';

@Component({
  selector: 'app-game',
  standalone: true, // Đảm bảo standalone là true nếu component của bạn là standalone
  imports: [],     // Thêm CommonModule nếu bạn dùng *ngIf, *ngFor trong template
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // Sửa thành .css nếu bạn dùng css
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  gameInstance: Phaser.Game | null = null; // Đổi tên biến để tránh trùng tên class Phaser.Game
  selectedIsland: IslandType = 'hoa'; // Biến để lưu đảo đang chọn, mặc định là 'hoa'

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Logic khởi tạo nếu cần
  }

  ngAfterViewInit(): void {
    this.startGame(this.selectedIsland); // Khởi động game với đảo mặc định
  }

  ngOnDestroy(): void {
    this.destroyGame(); // Hủy game khi component bị destroy
  }

  // Hàm để khởi tạo hoặc khởi động lại game với một đảo cụ thể
  startGame(islandType: IslandType): void {
     this.selectedIsland = islandType;
     console.log(`Starting game with island: ${this.selectedIsland}`);

    // Hủy instance game cũ nếu đang chạy
    this.destroyGame();

    // Chạy Phaser bên ngoài Angular Zone để tránh các vấn đề về change detection không cần thiết
    this.ngZone.runOutsideAngular(() => {
        this.gameInstance = new Phaser.Game({
            type: Phaser.AUTO,
            width: 960,
            height: 960,
            pixelArt: true, // Giữ pixelArt nếu muốn
            parent: this.gameContainer.nativeElement,
            scene: [], // Khởi tạo không có scene ban đầu
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false // Tắt debug
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            // backgroundColor: '#ffffff' // Thêm màu nền nếu video load chậm
        });

        // Thêm MainScene và truyền dữ liệu loại đảo vào
        this.gameInstance.scene.add('MainScene', MainScene, true, { islandType: this.selectedIsland });
    });
  }

  // Hàm để hủy instance game hiện tại
  destroyGame(): void {
    if (this.gameInstance) {
      console.log("Destroying current game instance...");
      this.gameInstance.destroy(true); // true để xóa cả canvas khỏi DOM
      this.gameInstance = null;
    }
  }

  // Hàm để thay đổi đảo (sẽ được gọi từ template HTML)
  changeIsland(newIsland: IslandType): void {
    if (newIsland !== this.selectedIsland && this.gameInstance) {
        console.log(`Changing island to: ${newIsland}`);
        // Khởi động lại game với đảo mới
        // Cách 1: Destroy và tạo lại toàn bộ game instance
        this.startGame(newIsland);

        // Cách 2: Chỉ restart Scene hiện tại với data mới (phức tạp hơn, cần quản lý state cẩn thận)
        // this.selectedIsland = newIsland;
        // const scene = this.gameInstance.scene.getScene('MainScene');
        // if (scene) {
        //     scene.scene.restart({ islandType: this.selectedIsland });
        // }
    }
  }
}