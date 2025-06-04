// generate_td_code.js
// Script này dùng Node.js để tạo các file code cho game Tower Defense cơ bản bằng Angular.
// Chạy script này trong thư mục gốc của project Angular của bạn.

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'townerdefense');

const filesToGenerate = [
    {
        filepath: path.join(baseDir, 'interfaces.ts'),
        content: `
// src/townerdefense/interfaces.ts

// Định nghĩa một điểm trên đường đi
export interface PathPoint {
  x: number;
  y: number;
}

// Định nghĩa kẻ địch
export interface Enemy {
  id: number;
  type: string; // Loại địch (ví dụ: 'basic', 'fast')
  hp: number; // Máu hiện tại
  maxHp: number; // Máu tối đa
  speed: number; // Tốc độ di chuyển (ví dụ: pixel/tick)
  bounty: number; // Tiền nhận được khi tiêu diệt
  pathProgress: number; // Tiến độ di chuyển trên đường đi (ví dụ: số pixel đã đi)
  position: { x: number; y: number }; // Tọa độ hiện tại trên màn hình
}

// Định nghĩa tháp phòng thủ
export interface Tower {
  id: number;
  type: string; // Loại tháp (ví dụ: 'basic', 'aoe')
  cost: number; // Chi phí xây dựng
  range: number; // Tầm bắn (pixel)
  damage: number; // Sát thương mỗi lần bắn
  attackSpeed: number; // Tốc độ bắn (ví dụ: số tick giữa 2 lần bắn)
  lastFired: number; // Tick cuối cùng tháp đã bắn
  position: { x: number; y: number }; // Tọa độ trên màn hình (tại điểm xây tháp)
}

// Định nghĩa điểm có thể xây tháp
export interface BuildSpot {
    id: number;
    position: { x: number; y: number }; // Tọa độ của điểm xây
    occupiedBy: number | null; // ID của tháp đang chiếm giữ, null nếu trống
}

// Định nghĩa các loại địch (dữ liệu mẫu)
export const ENEMY_TYPES: { [key: string]: Omit<Enemy, 'id' | 'hp' | 'pathProgress' | 'position'> } = {
    basic: { type: 'basic', maxHp: 50, speed: 2, bounty: 10 },
    fast: { type: 'fast', maxHp: 30, speed: 4, bounty: 15 }
    // Thêm các loại địch khác
};

// Định nghĩa các loại tháp (dữ liệu mẫu)
export const TOWER_TYPES: { [key: string]: Omit<Tower, 'id' | 'lastFired' | 'position'> } = {
    basic: { type: 'basic', cost: 50, range: 100, damage: 15, attackSpeed: 30 }, // Bắn mỗi 30 ticks
    // Thêm các loại tháp khác
};

// Định nghĩa đường đi của địch (dữ liệu mẫu - các điểm nối tiếp)
// Tọa độ này là tọa độ trên "bản đồ" của GameAreaComponent
export const PATH: PathPoint[] = [
    { x: 0, y: 200 }, // Start
    { x: 150, y: 200 },
    { x: 150, y: 50 },
    { x: 400, y: 50 },
    { x: 400, y: 300 },
    { x: 600, y: 300 }, // End
];

// Định nghĩa các điểm có thể xây tháp (dữ liệu mẫu)
export const BUILD_SPOTS: Omit<BuildSpot, 'id' | 'occupiedBy'>[] = [
    { position: { x: 75, y: 150 } },
    { position: { x: 250, y: 100 } },
    { position: { x: 350, y: 200 } },
    { position: { x: 500, y: 250 } }
    // Thêm các điểm xây khác
];
        `
    },
    {
        filepath: path.join(baseDir, 'game.service.ts'),
        content: `
// src/townerdefense/game.service.ts

import { Injectable, signal, computed, WritableSignal, Signal, inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Enemy, Tower, PathPoint, BuildSpot, ENEMY_TYPES, TOWER_TYPES, PATH, BUILD_SPOTS } from './interfaces'; // Import data structures

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Signals cho trạng thái game
  money: WritableSignal<number> = signal(100);
  lives: WritableSignal<number> = signal(10);
  enemies: WritableSignal<Enemy[]> = signal([]);
  towers: WritableSignal<Tower[]> = signal([]);
  buildSpots: WritableSignal<BuildSpot[]> = signal([]);
  gameStatus: WritableSignal<'playing' | 'gameOver' | 'waiting'> = signal('waiting'); // Trạng thái game

  // Data tĩnh của game
  private path: PathPoint[] = PATH;
  private enemyTypes = ENEMY_TYPES;
  private towerTypes = TOWER_TYPES;

  private gameTickInterval = 30; // Tốc độ game (mili giây mỗi tick)
  private gameSubscription: Subscription | null = null;
  private enemySpawnSubscription: Subscription | null = null;

  private nextEnemyId = 0;
  private nextTowerId = 0;
  private tickCount = 0; // Đếm số tick game

  constructor() {
     console.log('GameService initialized');
  }

  // Khởi tạo game
  initializeGame(): void {
    console.log('Initializing game...');
    this.money.set(100);
    this.lives.set(10);
    this.enemies.set([]);
    this.towers.set([]);
    this.gameStatus.set('waiting');
    this.tickCount = 0;
    this.nextEnemyId = 0;
    this.nextTowerId = 0;

    // Khởi tạo điểm xây tháp
    const initialBuildSpots: BuildSpot[] = BUILD_SPOTS.map((spot, index) => ({
        id: index,
        position: spot.position,
        occupiedBy: null
    }));
    this.buildSpots.set(initialBuildSpots);

    console.log('Game initialized.');
  }

  // Bắt đầu game (có thể gọi khi ấn nút "Start Wave")
  startGame(): void {
    if (this.gameStatus() === 'playing') return;

    this.gameStatus.set('playing');
    console.log('Game started!');

    // Bắt đầu game tick
    this.startGameLoop();
    // Bắt đầu sinh lính
    this.startEnemySpawning();
  }

  // Dừng game (game over, win, pause)
  stopGame(): void {
    this.gameStatus.set('gameOver'); // Hoặc 'win', 'paused'
    this.stopGameLoop();
    this.stopEnemySpawning();
    console.log('Game stopped.');
  }


  // Bắt đầu vòng lặp chính của game
  private startGameLoop(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.gameSubscription = interval(this.gameTickInterval).subscribe(() => {
      this.tickCount++;
      this.moveEnemies();
      this.towersAttack();
      this.checkGameStatus();
    });
     console.log('Game loop started.');
  }

  // Dừng vòng lặp chính
  private stopGameLoop(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
      this.gameSubscription = null;
    }
  }

  // Bắt đầu sinh lính theo đợt (đơn giản: sinh liên tục một loại)
  private startEnemySpawning(): void {
      if (this.enemySpawnSubscription) {
          this.enemySpawnSubscription.unsubscribe();
      }
      // Sinh 5 lính basic mỗi 2 giây (trong bản basic)
      let spawnCount = 0;
      const maxSpawn = 10; // Tổng số lính sẽ sinh trong "đợt" này
      const spawnInterval = 2000; // Mỗi 2 giây sinh 1 con

      this.enemySpawnSubscription = interval(spawnInterval).subscribe(() => {
          if (spawnCount < maxSpawn && this.gameStatus() === 'playing') {
               this.spawnEnemy('basic'); // Sinh lính basic
               spawnCount++;
               console.log(\`Spawned enemy \${spawnCount}/\${maxSpawn}\`);
          } else if (spawnCount >= maxSpawn) {
               // Hết đợt lính
               this.stopEnemySpawning();
               console.log('Enemy spawning finished for this wave.');
               // Cần thêm logic chờ hết lính hiện tại để bắt đầu đợt mới
               // hoặc chuyển trạng thái game
          }
      });
      console.log('Enemy spawning started.');
  }

    // Dừng sinh lính
    private stopEnemySpawning(): void {
        if (this.enemySpawnSubscription) {
            this.enemySpawnSubscription.unsubscribe();
            this.enemySpawnSubscription = null;
        }
    }


  // Sinh một kẻ địch mới
  spawnEnemy(type: string): void {
    const enemyConfig = this.enemyTypes[type];
    if (!enemyConfig || this.path.length === 0) return;

    const startPoint = this.path[0];
    const newEnemy: Enemy = {
      ...enemyConfig,
      id: this.nextEnemyId++,
      hp: enemyConfig.maxHp,
      pathProgress: 0, // Bắt đầu từ điểm 0 trên đường đi
      position: { ...startPoint } // Vị trí ban đầu
    };

    // Thêm kẻ địch vào danh sách sử dụng mutate
    this.enemies.mutate(list => {
      list.push(newEnemy);
    });
  }

  // Di chuyển tất cả kẻ địch
  private moveEnemies(): void {
    // Sử dụng mutate để cập nhật trực tiếp các kẻ địch trong mảng
    this.enemies.mutate(list => {
        for (let i = 0; i < list.length; i++) {
            const enemy = list[i];
            // Tính toán điểm đích hiện tại trên đường đi
            let targetPointIndex = 0;
            let currentPathLength = 0;
             // Tìm đoạn đường mà địch đang đi
            for(let j = 0; j < this.path.length - 1; j++){
                 const p1 = this.path[j];
                 const p2 = this.path[j+1];
                 const segmentLength = this.distance(p1, p2);

                 if(enemy.pathProgress < currentPathLength + segmentLength){
                     targetPointIndex = j + 1;
                     break;
                 }
                 currentPathLength += segmentLength;
                 targetPointIndex = j + 2; // Nếu đã đi hết đoạn cuối cùng
            }

            // Nếu địch đã đi hết đường
            if (targetPointIndex >= this.path.length) {
                 // Địch đến đích -> Mất mạng
                console.log(\`Enemy \${enemy.id} reached the end.\`);
                this.lives.update(lives => lives - 1);
                 // Xóa địch này ra khỏi danh sách
                list.splice(i, 1);
                i--; // Giảm index để không bỏ sót phần tử sau khi xóa
                continue; // Chuyển sang địch tiếp theo
            }

            // Tính toán vị trí mới trên đường đi
            const p1 = this.path[targetPointIndex - 1];
            const p2 = this.path[targetPointIndex];
            const segmentLength = this.distance(p1, p2);
            const progressInSegment = enemy.pathProgress - currentPathLength;

            // Di chuyển thêm 1 bước tốc độ
            const newProgressInSegment = progressInSegment + enemy.speed;
            const newPathProgress = currentPathLength + newProgressInSegment;
            enemy.pathProgress = newPathProgress;

            // Tính toán vị trí (x, y) mới dựa trên tiến độ trong đoạn đường
            const fraction = Math.min(1, newProgressInSegment / segmentLength);
            enemy.position.x = p1.x + (p2.x - p1.x) * fraction;
            enemy.position.y = p1.y + (p2.y - p1.y) * fraction;

            // console.log(\`Enemy \${enemy.id} moved to (\${enemy.position.x.toFixed(1)}, \${enemy.position.y.toFixed(1)})\`);
        }
    });
  }


  // Xử lý tháp tấn công kẻ địch
  private towersAttack(): void {
    const currentEnemies = this.enemies(); // Lấy danh sách địch hiện tại
     // Chỉ xử lý tấn công nếu có tháp VÀ có địch
    if (this.towers().length === 0 || currentEnemies.length === 0) return;

    // Sử dụng mutate cho cả tháp (cập nhật lastFired) và địch (cập nhật hp)
    this.towers.mutate(towersList => {
        this.enemies.mutate(enemiesList => {

            for (const tower of towersList) {
                // Kiểm tra xem tháp đã sẵn sàng bắn chưa dựa vào attackSpeed
                if (this.tickCount - tower.lastFired >= tower.attackSpeed) {
                    // Tìm kẻ địch đầu tiên trong tầm bắn
                    let targetEnemy: Enemy | undefined = undefined;
                    for (const enemy of enemiesList) {
                        if (this.distance(tower.position, enemy.position) <= tower.range) {
                            targetEnemy = enemy; // Tìm thấy địch đầu tiên trong tầm
                            break; // Bản basic chỉ bắn mục tiêu đầu tiên tìm thấy
                        }
                    }

                    // Nếu tìm thấy địch
                    if (targetEnemy) {
                        // Bắn!
                        console.log(\`Tower \${tower.id} attacking Enemy \${targetEnemy.id}\`);
                        targetEnemy.hp -= tower.damage;
                        tower.lastFired = this.tickCount; // Cập nhật thời điểm bắn cuối

                        // Kiểm tra xem địch có chết không
                        if (targetEnemy.hp <= 0) {
                            console.log(\`Enemy \${targetEnemy.id} defeated!\`);
                            this.money.update(m => m + targetEnemy.bounty); // Cộng tiền
                            // Xóa địch chết khỏi danh sách
                            const enemyIndex = enemiesList.findIndex(e => e.id === targetEnemy!.id);
                            if(enemyIndex !== -1) {
                                enemiesList.splice(enemyIndex, 1);
                            }
                             // Sau khi xóa, không cần xử lý địch này nữa trong tick này
                             // và tiếp tục vòng lặp tìm mục tiêu cho tháp khác hoặc cho tháp này nếu có logic bắn nhiều mục tiêu
                        }
                    }
                }
            }
        }); // End mutate enemies
    }); // End mutate towers

  }


  // Xây tháp
  buildTower(spotId: number, towerType: string): boolean {
    const spot = this.buildSpots().find(s => s.id === spotId);
    const towerConfig = this.towerTypes[towerType];

    // Kiểm tra điểm xây có tồn tại, chưa có tháp, và đủ tiền không
    if (spot && spot.occupiedBy === null && towerConfig && this.money() >= towerConfig.cost) {
      // Trừ tiền
      this.money.update(m => m - towerConfig.cost);

      // Tạo tháp mới
      const newTower: Tower = {
        ...towerConfig,
        id: this.nextTowerId++,
        position: { ...spot.position }, // Vị trí tháp là vị trí điểm xây
        lastFired: 0 // Bắt đầu có thể bắn ngay
      };

      // Thêm tháp vào danh sách
      this.towers.mutate(list => {
        list.push(newTower);
      });

      // Cập nhật điểm xây đã có tháp chiếm đóng
      this.buildSpots.mutate(list => {
        const s = list.find(s => s.id === spotId);
        if(s) s.occupiedBy = newTower.id;
      });

      console.log(\`Built \${towerType} tower at spot \${spotId}. Money left: \${this.money()}\`);
      return true;
    } else {
        console.log(\`Could not build tower at spot \${spotId}. Reasons: Spot occupied? \${spot?.occupiedBy !== null}, Enough money? \${this.money() >= (towerConfig?.cost || Infinity)}\`);
    }
    return false;
  }

  // Kiểm tra trạng thái game (Win/Lose)
  private checkGameStatus(): void {
      if (this.lives() <= 0) {
           this.gameStatus.set('gameOver');
           this.stopGame();
           console.log('Game Over! Lives: 0');
      }
      // Thêm logic Win: ví dụ: sau X đợt lính và không còn lính nào trên bản đồ
      // if (/* wave completed */ && this.enemies().length === 0) {
      //     this.gameStatus.set('win');
      //     this.stopGame();
      //     console.log('You Win!');
      // }
  }


  // Helper: Tính khoảng cách giữa 2 điểm
  private distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


  // Lấy danh sách loại tháp có thể xây
  getTowerTypesList(): { type: string, cost: number }[] {
      return Object.values(this.towerTypes).map(t => ({ type: t.type, cost: t.cost }));
  }


  ngOnDestroy(): void {
    this.stopGameLoop();
    this.stopEnemySpawning();
    console.log('GameService destroyed');
  }
}
        `
    },
    {
        filepath: path.join(baseDir, 'enemy', 'enemy.component.ts'),
        content: `
// src/townerdefense/enemy/enemy.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Enemy } from '../interfaces';
import { CommonModule, NgStyle, NgIf } from '@angular/common';

@Component({
  selector: 'app-enemy',
  standalone: true,
  imports: [
    CommonModule,
    NgStyle,
    NgIf
  ],
  template: \`
    <div class="enemy {{ enemy.type }}"
         [ngStyle]="{ 'left.px': enemy.position.x - 15, 'top.px': enemy.position.y - 15 }"> <div class="hp-bar-container"><div class="hp-bar" [ngStyle]="{'width.%': (enemy.hp / enemy.maxHp) * 100}"></div></div>
         </div>
  \`,
  styleUrls: ['./enemy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Tối ưu hiệu suất
})
export class EnemyComponent {
  @Input() enemy!: Enemy;
}
        `
    },
     {
        filepath: path.join(baseDir, 'enemy', 'enemy.component.css'),
        content: `
/* src/townerdefense/enemy/enemy.component.css */

.enemy {
  position: absolute; /* Vị trí tuyệt đối trong game-area */
  width: 30px; /* Kích thước địch */
  height: 30px;
  background-color: red; /* Màu mặc định */
  border-radius: 50%; /* Hình tròn */
  border: 1px solid black;
  z-index: 10; /* Đảm bảo nằm trên đường đi */
  box-sizing: border-box; /* Kích thước bao gồm border */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em; /* Kích thước chữ máu */
  color: white;
  font-weight: bold;
}

/* Các loại địch cụ thể */
.enemy.basic {
    background-color: crimson;
}

.enemy.fast {
    background-color: orange;
}


.hp-bar-container {
    position: absolute;
    top: -8px; /* Đặt thanh máu phía trên địch */
    left: 0;
    width: 100%;
    height: 4px;
    background-color: grey;
    border-radius: 2px;
    overflow: hidden; /* Che phần thanh máu tràn ra */
}

.hp-bar {
    height: 100%;
    background-color: limegreen;
    transition: width 0.1s linear; /* Hiệu ứng khi máu giảm */
}
        `
    },
     {
        filepath: path.join(baseDir, 'tower', 'tower.component.ts'),
        content: `
// src/townerdefense/tower/tower.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Tower } from '../interfaces';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-tower',
  standalone: true,
  imports: [
    CommonModule,
    NgStyle
  ],
  template: \`
    <div class="tower tower-\{{ tower.type }}"
         [ngStyle]="{ 'left.px': tower.position.x - 20, 'top.px': tower.position.y - 20 }"> 🛡️
    </div>
    \`,
  styleUrls: ['./tower.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TowerComponent {
  @Input() tower!: Tower;
}
        `
    },
    {
        filepath: path.join(baseDir, 'tower', 'tower.component.css'),
        content: `
/* src/townerdefense/tower/tower.component.css */

.tower {
  position: absolute;
  width: 40px; /* Kích thước tháp */
  height: 40px;
  background-color: steelblue; /* Màu mặc định */
  border: 2px solid royalblue;
  border-radius: 5px;
  z-index: 20; /* Đảm bảo nằm trên địch và đường đi */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}

/* Các loại tháp cụ thể */
.tower.basic {
    background-color: #66cdaa;
    border-color: #008080;
}
        `
    },
     {
        filepath: path.join(baseDir, 'game-area', 'game-area.component.ts'),
        content: `
// src/townerdefense/game-area/game-area.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Enemy, Tower, BuildSpot, PathPoint, PATH } from '../interfaces'; // Import data structures
import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { EnemyComponent } from '../enemy/enemy.component';
import { TowerComponent } from '../tower/tower.component';

@Component({
  selector: 'app-game-area',
  standalone: true,
  imports: [
    CommonModule,
    NgFor, NgIf, NgStyle,
    EnemyComponent,
    TowerComponent
  ],
  template: \`
    <div class="game-area">
      <div class="path">
            <div *ngFor="let point of path; let i = index" class="path-point"
                 [ngStyle]="{'left.px': point.x, 'top.px': point.y}">
                 </div>
            </div>


      <div *ngFor="let spot of buildSpots" class="build-spot"
            [ngStyle]="{'left.px': spot.position.x - 25, 'top.px': spot.position.y - 25}" (click)="onBuildSpotClick(spot)">
            <span *ngIf="spot.occupiedBy === null">+</span> </div>


      <app-enemy *ngFor="let enemy of enemies" [enemy]="enemy"></app-enemy>

      <app-tower *ngFor="let tower of towers" [tower]="tower"></app-tower>

      </div>
  \`,
  styleUrls: ['./game-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameAreaComponent {
  // Nhận dữ liệu game từ TownerdefenseComponent (giá trị signal)
  @Input() enemies: Enemy[] | null = null;
  @Input() towers: Tower[] | null = null;
  @Input() buildSpots: BuildSpot[] | null = null;

  // Nhận loại tháp đang chọn để xây
  @Input() selectedTowerType: string | null = null;

  // Phát sự kiện khi click vào điểm xây tháp
  @Output() buildTower = new EventEmitter<{ spotId: number, towerType: string }>();

  // Đường đi (lấy từ data tĩnh)
  path: PathPoint[] = PATH; // Lấy đường đi từ interface

  onBuildSpotClick(spot: BuildSpot): void {
    // Chỉ phát sự kiện nếu đang có loại tháp được chọn VÀ điểm xây còn trống
    if (this.selectedTowerType && spot.occupiedBy === null) {
      console.log(\`Build spot \${spot.id} clicked, attempting to build \${this.selectedTowerType}\`);
      this.buildTower.emit({ spotId: spot.id, towerType: this.selectedTowerType });
    } else {
         console.log(\`Build spot \${spot.id} clicked, cannot build. Selected type: \${this.selectedTowerType}, Occupied: \${spot.occupiedBy !== null}\`);
    }
  }

  // Helper để lấy tầm bắn của tháp (nếu cần hiển thị) - cần access TOWER_TYPES
  // getTowerRange(type: string): number {
  //     return TOWER_TYPES[type]?.range || 0;
  // }
}
        `
    },
     {
        filepath: path.join(baseDir, 'game-area', 'game-area.component.css'),
        content: `
/* src/townerdefense/game-area/game-area.component.css */

.game-area {
  position: relative; /* Quan trọng: Để các phần tử con dùng position: absolute */
  width: 600px; /* Kích thước bản đồ */
  height: 400px;
  border: 2px solid #333;
  margin: 20px auto; /* Căn giữa */
  background-color: #c8e6c9; /* Nền bản đồ */
  overflow: hidden; /* Đảm bảo địch không ra khỏi bản đồ */
}

.path {
    position: absolute;
    width: 100%;
    height: 100%;
    /* Background hoặc vẽ path ở đây */
}

.path-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgba(139, 69, 19, 0.5); /* Màu nâu mờ */
    border-radius: 50%;
    transform: translate(-50%, -50%); /* Dịch để tâm nằm ở tọa độ chính xác */
    z-index: 5; /* Nằm dưới địch */
    /* Để debug vị trí điểm */
    /* font-size: 0.7em; color: white; text-align: center; line-height: 10px; */
}


.build-spot {
    position: absolute;
    width: 50px; /* Kích thước điểm xây */
    height: 50px;
    background-color: rgba(128, 128, 128, 0.5); /* Màu xám mờ */
    border: 1px dashed #333;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 15; /* Nằm trên đường đi, dưới tháp */
    font-size: 2em;
    color: white;
    font-weight: bold;
    /* Để debug vị trí điểm xây */
    /* transform: translate(-50%, -50%); /* Dịch để tâm nằm ở tọa độ chính xác */
}

.build-spot:hover {
    background-color: rgba(128, 128, 128, 0.8);
}

/* Chỉ báo tầm bắn (nếu dùng) */
.range-indicator {
    position: absolute;
    border: 1px dashed blue;
    border-radius: 50%;
    background-color: rgba(0, 0, 255, 0.1);
    pointer-events: none; /* Không chặn click vào điểm xây */
    transform: translate(-50%, -50%); /* Căn giữa */
    z-index: 18;
}
        `
    },
     {
        filepath: path.join(baseDir, 'townerdefense.component.ts'),
        content: `
// src/townerdefense/townerdefense.component.ts

import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core'; // Import Signal stuff and inject
import { GameService, Enemy, Tower, BuildSpot } from './game.service'; // Import service
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Cho [(ngModel)] nếu cần
import { GameAreaComponent } from './game-area/game-area.component'; // Import game area component
import { TOWER_TYPES } from './interfaces'; // Lấy danh sách loại tháp từ data

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
    console.log(\`Selected tower to build: \${type}\`);
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
        `
    },
     {
        filepath: path.join(baseDir, 'townerdefense.component.html'),
        content: `
<div class="container">
  <h1>Simple Tower Defense</h1>

  <div class="game-info">
    <div>💰 Tiền: {{ money() }}</div> <div>❤️ Mạng: {{ lives() }}</div> <div>Trạng thái: {{ gameStatus() | uppercase }}</div> </div>

  <div *ngIf="gameStatus() === 'gameOver'" class="game-over">
      <h2>GAME OVER!</h2>
      <button (click)="restartGame()">Chơi lại</button>
  </div>

   <div *ngIf="gameStatus() === 'waiting'" class="start-game">
       <button (click)="startGame()">Bắt đầu đợt lính</button>
   </div>


  <div class="toolbar">
    <h3>Xây tháp:</h3>
    <button *ngFor="let towerType of towerTypesList"
            [disabled]="money() < towerType.cost"
            [ngClass]="{'selected': selectedTowerTypeToBuild() === towerType.type}"
            (click)="selectTowerToBuild(towerType.type)">
       {{ towerType.type | uppercase }} ({{ towerType.cost }}💰)
    </button>
     <button [ngClass]="{'selected': selectedTowerTypeToBuild() === null}"
             (click)="selectTowerToBuild(null)">
             Hủy chọn
     </button>
  </div>

  <app-game-area
    [enemies]="enemies()" [towers]="towers()"   [buildSpots]="buildSpots()" [selectedTowerType]="selectedTowerTypeToBuild()" (buildTower)="handleBuildTower($event)"> </app-game-area>

</div>
        `
    },
    {
        filepath: path.join(baseDir, 'townerdefense.component.css'),
        content: `
/* src/townerdefense/townerdefense.component.css */
.container {
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #f4f4f4;
  user-select: none; /* Ngăn chọn text */
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.game-info {
  margin-bottom: 15px;
  font-size: 1.2em;
  color: #555;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.toolbar {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.toolbar button {
  padding: 10px 15px;
  font-size: 1em;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #e9e9e9;
  transition: background-color 0.2s ease;
}

.toolbar button:hover:not(:disabled) {
  background-color: #d0d0d0;
}

.toolbar button.selected {
    background-color: #a8e6cf;
    border-color: #5cb85c;
    font-weight: bold;
}

.toolbar button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}


.game-over {
    margin-top: 20px;
    color: crimson;
}

.game-over button, .start-game button {
     padding: 10px 20px;
     font-size: 1.2em;
     cursor: pointer;
     background-color: #4CAF50;
     color: white;
     border: none;
     border-radius: 5px;
     margin-top: 10px;
}

.game-over button:hover, .start-game button:hover {
     background-color: #45a049;
}
        `
    }
];

async function generateFiles() {
    console.log('Starting to generate Angular Tower Defense game files...');

    for (const file of filesToGenerate) {
        const dir = path.dirname(file.filepath);

        try {
            // Tạo thư mục (recursive: true tạo cả thư mục cha nếu chưa có)
            await fs.promises.mkdir(dir, { recursive: true });
            console.log(`Ensured directory exists: ${dir}`);

            // Ghi nội dung vào file
            await fs.promises.writeFile(file.filepath, file.content.trim(), 'utf8'); // trim() loại bỏ dòng trắng đầu/cuối
            console.log(`Successfully wrote file: ${file.filepath}`);

        } catch (error) {
            console.error(`Error generating file ${file.filepath}:`, error);
            // Dừng lại hoặc tiếp tục tùy vào mức độ nghiêm trọng của lỗi
        }
    }

    console.log('\nFile generation complete.');
    console.log('Remember to run "ng serve -o" in your Angular project directory to see the game.');
    console.log('Also, if you were not using standalone components, you might need to delete app.module.ts');
}

generateFiles();