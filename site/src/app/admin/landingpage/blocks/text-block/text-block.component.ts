import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, TextBlockData } from '../../block.model';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-block.component.html', // Sử dụng templateUrl
  styleUrls: ['./text-block.component.scss'] // Sử dụng styleUrls
})
export class TextBlockComponent {
  @Input() block: Block | undefined;
  get data(): TextBlockData | undefined { return this.block?.data as TextBlockData; }
}