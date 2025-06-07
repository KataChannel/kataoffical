// src/townerdefense/game-area/game-area.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Enemy, Tower, BuildSpot, PathPoint, PATH } from '../interfaces'; // Import data structures
import { CommonModule, NgStyle } from '@angular/common';
import { EnemyComponent } from '../enemy/enemy.component';
import { TowerComponent } from '../tower/tower.component';

@Component({
  selector: 'app-game-area',
  standalone: true,
  imports: [
    CommonModule,
    NgStyle,
    EnemyComponent,
    TowerComponent
],
  template: `
    <div class="game-area">
      <div class="path">
        @for (point of path; track point; let i = $index) {
          <div class="path-point"
            [ngStyle]="{'left.px': point.x, 'top.px': point.y}">
          </div>
        }
      </div>
    
    
      @for (spot of buildSpots; track spot) {
        <div class="build-spot"
          [ngStyle]="{'left.px': spot.position.x - 25, 'top.px': spot.position.y - 25}" (click)="onBuildSpotClick(spot)">
          @if (spot.occupiedBy === null) {
            <span>+</span>
          } </div>
        }
    
    
        @for (enemy of enemies; track enemy) {
          <app-enemy [enemy]="enemy"></app-enemy>
        }
    
        @for (tower of towers; track tower) {
          <app-tower [tower]="tower"></app-tower>
        }
    
      </div>
    `,
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
      console.log(`Build spot ${spot.id} clicked, attempting to build ${this.selectedTowerType}`);
      this.buildTower.emit({ spotId: spot.id, towerType: this.selectedTowerType });
    } else {
         console.log(`Build spot ${spot.id} clicked, cannot build. Selected type: ${this.selectedTowerType}, Occupied: ${spot.occupiedBy !== null}`);
    }
  }

  // Helper để lấy tầm bắn của tháp (nếu cần hiển thị) - cần access TOWER_TYPES
  // getTowerRange(type: string): number {
  //     return TOWER_TYPES[type]?.range || 0;
  // }
}