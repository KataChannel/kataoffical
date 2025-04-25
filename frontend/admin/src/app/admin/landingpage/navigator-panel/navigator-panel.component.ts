import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, ColumnsBlockData } from '../block.model';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-navigator-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigator-panel.component.html',
  styleUrls: ['./navigator-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorPanelComponent {
  // Nhận danh sách khối cấp cao nhất từ EditorComponent
  @Input() blocks: Block[] = [];
  public editorComponent = inject(EditorComponent, { optional: true });

  // Hàm lấy icon dựa trên loại khối
  getBlockIcon(type: string): string {
    switch (type) {
      case 'text': return '📝';
      case 'image': return '🖼️';
      case 'button': return '🔘';
      case 'columns': return '☰';
      case 'section': return '📄';
      case 'container': return '🗃️';
      default: return '🧱';
    }
  }

  // Hàm lấy tên hiển thị cho khối
  getBlockDisplayName(block: Block): string {
    switch (block.type) {
      case 'text': return block.data?.content?.substring(0, 20) || 'Text';
      case 'image': return block.data?.alt || block.data?.src?.split('/').pop() || 'Image';
      case 'button': return block.data?.text || 'Button';
      case 'columns': return 'Columns';
      case 'section': return 'Section';
      case 'container': return 'Container';
      default: return block.type;
    }
  }

  // Hàm xử lý khi một mục trong navigator được click
  selectBlock(block: Block, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.selectBlockFromChild(block);
  }

  // Hàm lấy các khối con trực tiếp của một khối (từ EditorComponent)
  getChildBlocks(block: Block): Block[] {
    if (!this.editorComponent) return [];
    // Section và Container lấy con theo parentId
    if (block.type === 'section' || block.type === 'container') {
        // Gọi hàm getBlocksByParentId của editor với ID của khối hiện tại
        return this.editorComponent.getBlocksByParentId(block.id);
    }
    return []; // Columns không trả về con trực tiếp ở đây
  }

   // Hàm lấy khối con của một cột (dùng trong template)
   getColumnChildBlocks(columnId: string): Block[] {
       if (!this.editorComponent) return [];
       // Gọi hàm getBlocksByParentId của editor với ID của cột
       return this.editorComponent.getBlocksByParentId(columnId);
   }
}