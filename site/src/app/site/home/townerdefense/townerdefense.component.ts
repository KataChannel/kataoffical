// src/townerdefense/townerdefense.component.ts

import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core'; // Import Signal stuff and inject
import { GameService } from './game.service'; // Import service
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Cho [(ngModel)] nếu cần
import { GameAreaComponent } from './game-area/game-area.component'; // Import game area component

@Component({
  selector: 'app-root',
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    NgIf, NgFor,
    FormsModule,
    GameAreaComponent // Import component con
  ],
  templateUrl: './townerdefense.component.html',
  styleUrls: ['./townerdefense.component.css']
})
export class TownerdefenseComponent implements OnInit, OnDestroy {
  // Inject GameService
  private gameService = inject(GameService);

  // Lấy Signals từ GameService (signal to signal assignment)
  money = this.gameService.money;
  lives = this.gameService.lives;
  enemies = this.gameService.enemies;
  towers = this.gameService.towers;
  buildSpots = this.gameService.buildSpots;
  gameStatus = this.gameService.gameStatus;

  // Signal nội bộ component: loại tháp đang chọn để xây
  selectedTowerTypeToBuild = signal<string | null>(null);

  // Danh sách loại tháp có thể hiển thị trên UI
  towerTypesList = this.gameService.getTowerTypesList();

  constructor() {}

  ngOnInit(): void {
    console.log('TownerdefenseComponent OnInit. Initializing game...');
    this.gameService.initializeGame(); // Khởi tạo game khi townerdefense component khởi động
    // Game loop và spawning sẽ bắt đầu khi gọi gameService.startGame()
  }

  // Bắt đầu game từ UI
  startGame(): void {
      this.gameService.startGame();
  }

  // Chơi lại game
  restartGame(): void {
      this.gameService.initializeGame();
      this.selectedTowerTypeToBuild.set(null); // Reset lựa chọn xây tháp
      // Không tự động bắt đầu, chờ người chơi ấn Start Wave lần nữa
  }

  // Chọn loại tháp từ toolbar
  selectTowerToBuild(type: string | null): void {
    this.selectedTowerTypeToBuild.set(type);
    console.log(`Selected tower to build: ${type}`);
  }

  // Xử lý sự kiện xây tháp từ GameAreaComponent
  handleBuildTower(event: { spotId: number; towerType: string; }): void {
    console.log('Handling build tower event in TownerdefenseComponent', event);
    const built = this.gameService.buildTower(event.spotId, event.towerType);
    // Sau khi xây xong (thành công hay thất bại), có thể hủy chọn loại tháp
    if(built) {
       this.selectedTowerTypeToBuild.set(null);
    }
  }

  ngOnDestroy(): void {
    console.log('TownerdefenseComponent OnDestroy. Stopping game...');
    this.gameService.stopGame(); // Dừng game khi component bị hủy
  }
}