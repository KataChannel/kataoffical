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
import { ContainerBlockComponent } from '../container-block/container-block.component'; // Sẽ tạo ở bước sau

@Component({
  selector: 'app-section-block',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    // Import các component con và chính nó nếu muốn cho phép lồng section (không khuyến khích)
    TextBlockComponent,
    ImageBlockComponent,
    ButtonBlockComponent,
    ColumnsBlockComponent,
    ContainerBlockComponent,
    // SectionBlockComponent // Tạm thời không cho lồng section
  ],
  templateUrl: './section-block.component.html',
  styleUrls: ['./section-block.component.scss']
})
export class SectionBlockComponent implements OnInit {
  @Input() block: Block | undefined;
  public editorComponent = inject(EditorComponent, { optional: true });

  // Section không lưu trực tiếp block con vào 'data', mà vào 'pageBlocks' với parentId là ID của section này
  // Nên cần lấy các khối con từ EditorComponent dựa trên parentId
  get childBlocks(): Block[] {
    if (!this.block || !this.editorComponent) return [];
    // Lọc tất cả các khối trong pageBlocks có parentId trùng với ID của section này
    // và sắp xếp chúng theo 'order'
    return this.editorComponent.getBlocksByParentId(this.block.id).sort((a, b) => a.order - b.order);
  }

  // ID của drop list cho section này
  get dropListId(): string {
    return this.block?.id || 'unknown-section';
  }

  ngOnInit(): void {
    // Có thể thực hiện logic khởi tạo nếu cần
  }

  // Xử lý sự kiện drop (chuyển cho EditorComponent xử lý)
  drop(event: CdkDragDrop<Block[]>) {
    if (this.editorComponent) {
      this.editorComponent.drop(event);
    } else {
      console.error("EditorComponent not available in SectionBlockComponent");
    }
  }

  // Các hàm gọi EditorComponent để chọn/xóa khối con
  selectNestedBlock(nestedBlock: Block, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.selectBlockFromChild(nestedBlock);
  }

  requestDeleteNestedBlock(nestedBlockId: string, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.requestDeleteBlock(nestedBlockId, event);
  }
}