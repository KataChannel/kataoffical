import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Block } from '../../block.model';
import { EditorComponent } from '../../editor/editor.component';

// Import các component con để render đệ quy
import { TextBlockComponent } from '../text-block/text-block.component';
import { ImageBlockComponent } from '../image-block/image-block.component';
import { ButtonBlockComponent } from '../button-block/button-block.component';
import { ColumnsBlockComponent } from '../columns-block/columns-block.component';
import { SectionBlockComponent } from '../section-block/section-block.component'; // Section có thể chứa container


@Component({
  selector: 'app-container-block',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    // Import các component con và chính nó để cho phép lồng container
    TextBlockComponent,
    ImageBlockComponent,
    ButtonBlockComponent,
    ColumnsBlockComponent,
    SectionBlockComponent, // Có thể chứa Section không? Tùy thiết kế
    ContainerBlockComponent, // Cho phép lồng container
  ],
  templateUrl: './container-block.component.html',
  styleUrls: ['./container-block.component.scss']
})
export class ContainerBlockComponent implements OnInit {
  @Input() block: Block | undefined;
  public editorComponent = inject(EditorComponent, { optional: true });

  // Container cũng lấy khối con từ EditorComponent dựa trên parentId
  get childBlocks(): Block[] {
    if (!this.block || !this.editorComponent) return [];
    return this.editorComponent.getBlocksByParentId(this.block.id).sort((a, b) => a.order - b.order);
  }

  get dropListId(): string {
    return this.block?.id || 'unknown-container';
  }

  ngOnInit(): void { }

  drop(event: CdkDragDrop<Block[]>) {
    this.editorComponent?.drop(event);
  }

  selectNestedBlock(nestedBlock: Block, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.selectBlockFromChild(nestedBlock);
  }

  requestDeleteNestedBlock(nestedBlockId: string, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.requestDeleteBlock(nestedBlockId, event);
  }
}