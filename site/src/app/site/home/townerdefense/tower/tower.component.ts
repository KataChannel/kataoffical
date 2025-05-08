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
  template: `
    <div class="tower tower-{{ tower.type }}"
         [ngStyle]="{ 'left.px': tower.position.x - 20, 'top.px': tower.position.y - 20 }"> 🛡️
    </div>
    `,
  styleUrls: ['./tower.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TowerComponent {
  @Input() tower!: Tower;
}