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
               console.log(`Spawned enemy ${spawnCount}/${maxSpawn}`);
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
    this.enemies.update(list => {
      return [...list, newEnemy];
    });
  }

  // Di chuyển tất cả kẻ địch
  private moveEnemies(): void {
    // Sử dụng mutate để cập nhật trực tiếp các kẻ địch trong mảng
    this.enemies.update(list => {
      const updatedEnemies = list
        .map(enemy => {
          const updatedEnemy = { ...enemy }; // Copy the enemy
          let targetPointIndex = 0;
          let currentPathLength = 0;
    
          // Find the segment
          for (let j = 0; j < this.path.length - 1; j++) {
            const p1 = this.path[j];
            const p2 = this.path[j + 1];
            const segmentLength = this.distance(p1, p2);
    
            if (updatedEnemy.pathProgress < currentPathLength + segmentLength) {
              targetPointIndex = j + 1;
              break;
            }
            currentPathLength += segmentLength;
            targetPointIndex = j + 2;
          }
    
          // If the enemy reaches the end, mark it for removal
          if (targetPointIndex >= this.path.length) {
            console.log(`Enemy ${updatedEnemy.id} reached the end.`);
            this.lives.update(lives => lives - 1);
            return null; // Mark for removal
          }
    
          // Calculate new position
          const p1 = this.path[targetPointIndex - 1];
          const p2 = this.path[targetPointIndex];
          const segmentLength = this.distance(p1, p2);
          const progressInSegment = updatedEnemy.pathProgress - currentPathLength;
          const newProgressInSegment = progressInSegment + updatedEnemy.speed;
          const newPathProgress = currentPathLength + newProgressInSegment;
          updatedEnemy.pathProgress = newPathProgress;
    
          const fraction = Math.min(1, newProgressInSegment / segmentLength);
          updatedEnemy.position = {
            x: p1.x + (p2.x - p1.x) * fraction,
            y: p1.y + (p2.y - p1.y) * fraction
          };
    
          return updatedEnemy;
        })
        .filter(enemy => enemy !== null); // Remove enemies marked for deletion
    
      return updatedEnemies;
    });
  }


  // Xử lý tháp tấn công kẻ địch
  private towersAttack(): void {
    const currentEnemies = this.enemies(); // Lấy danh sách địch hiện tại
     // Chỉ xử lý tấn công nếu có tháp VÀ có địch
    if (this.towers().length === 0 || currentEnemies.length === 0) return;

    // Sử dụng mutate cho cả tháp (cập nhật lastFired) và địch (cập nhật hp)
    this.towers.update(towersList => {
      const newTowersList = towersList.map(tower => {
        const updatedTower = { ...tower };
    
        // Check if the tower is ready to fire
        if (this.tickCount - updatedTower.lastFired >= updatedTower.attackSpeed) {
          // Find the first enemy in range
          const targetEnemy = this.enemies().find(enemy =>
            this.distance(updatedTower.position, enemy.position) <= updatedTower.range
          );
    
          if (targetEnemy) {
            console.log(`Tower ${updatedTower.id} attacking Enemy ${targetEnemy.id}`);
            // Update enemy HP in the enemies Signal
            this.enemies.update(enemiesList => {
              const newEnemiesList = enemiesList.map(enemy => {
                if (enemy.id === targetEnemy.id) {
                  const updatedEnemy = { ...enemy, hp: enemy.hp - updatedTower.damage };
                  if (updatedEnemy.hp <= 0) {
                    console.log(`Enemy ${updatedEnemy.id} defeated!`);
                    this.money.update(m => m + updatedEnemy.bounty);
                    return null; // Mark for removal
                  }
                  return updatedEnemy;
                }
                return enemy;
              });
              return newEnemiesList.filter(enemy => enemy !== null); // Remove defeated enemies
            });
    
            updatedTower.lastFired = this.tickCount; // Update last fired time
          }
        }
    
        return updatedTower;
      });
    
      return newTowersList;
    });

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
      this.towers.update((list: Tower[]) => {
        return [...list, newTower];
      });

      // Cập nhật điểm xây đã có tháp chiếm đóng
      this.buildSpots.update((list: BuildSpot[]) => {
        const newList = [...list];
        const s = newList.find((s: BuildSpot) => s.id === spotId);
        if (s) s.occupiedBy = newTower.id;
        return newList;
      });

      console.log(`Built ${towerType} tower at spot ${spotId}. Money left: ${this.money()}`);
      return true;
    } else {
        console.log(`Could not build tower at spot ${spotId}. Reasons: Spot occupied? ${spot?.occupiedBy !== null}, Enough money? ${this.money() >= (towerConfig?.cost || Infinity)}`);
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