import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, ImageBlockData } from '../../block.model';

@Component({
  selector: 'app-image-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-block.component.html', // Sử dụng templateUrl
  styleUrls: ['./image-block.component.scss'] // Sử dụng styleUrls
})
export class ImageBlockComponent {
  @Input() block: Block | undefined;
  get data(): ImageBlockData | undefined { return this.block?.data as ImageBlockData; }
}