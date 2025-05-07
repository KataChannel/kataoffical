import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, ButtonBlockData } from '../../block.model';


@Component({
  selector: 'app-button-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-block.component.html', // Sử dụng templateUrl
  styleUrls: ['./button-block.component.scss'] // Sử dụng styleUrls
})
export class ButtonBlockComponent {
  @Input() block: Block | undefined;
  get data(): ButtonBlockData | undefined { return this.block?.data as ButtonBlockData; }
}