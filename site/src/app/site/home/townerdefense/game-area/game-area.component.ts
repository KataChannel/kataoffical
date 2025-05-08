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
  template: `
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