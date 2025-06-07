// src/townerdefense/enemy/enemy.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Enemy } from '../interfaces';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-enemy',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="enemy {{ enemy.type }}"
         [ngStyle]="{ 'left.px': enemy.position.x - 15, 'top.px': enemy.position.y - 15 }"> <div class="hp-bar-container"><div class="hp-bar" [ngStyle]="{'width.%': (enemy.hp / enemy.maxHp) * 100}"></div></div>
         </div>
  `,
  styleUrls: ['./enemy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Tối ưu hiệu suất
})
export class EnemyComponent {
  @Input() enemy!: Enemy;
}