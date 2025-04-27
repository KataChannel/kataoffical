import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Block, ColumnsBlockData } from '../block.model';
import { EditorComponent } from '../editor/editor.component';
import { Pipe, PipeTransform } from '@angular/core'; // Import Pipe và PipeTransform

// Pipe sắp xếp (tạo hoặc import)
@Pipe({ name: 'sort', standalone: true })
export class SortPipe implements PipeTransform {
  transform(array: any[] | readonly any[] | null | undefined, field: string): any[] {
    if (!Array.isArray(array)) { return []; } // Trả về mảng rỗng nếu không phải mảng
    // Tạo bản sao trước khi sắp xếp để tránh thay đổi mảng gốc trực tiếp (quan trọng với OnPush)
    const sortedArray = [...array];
    sortedArray.sort((a: any, b: any) => a[field] - b[field]);
    return sortedArray;
  }
}

@Component({
  selector: 'app-navigator-panel',
  standalone: true,
  imports: [CommonModule, SortPipe], // Thêm SortPipe vào imports
  templateUrl: './navigator-panel.component.html',
  styleUrls: ['./navigator-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorPanelComponent {
  @Input() blocks: Block[] = []; // Nhận danh sách khối cấp cao nhất
  public editorComponent = inject(EditorComponent, { optional: true });

  getBlockIcon(type: string): string {
    switch (type) {
      case 'text': return '📝'; case 'image': return '🖼️'; case 'button': return '🔘';
      case 'columns': return '☰'; case 'section': return '📄'; case 'container': return '🗃️';
      default: return '🧱';
    }
  }

  getBlockDisplayName(block: Block): string {
    switch (block.type) {
      case 'text': return block.data?.content?.substring(0, 20) || 'Text';
      case 'image': return block.data?.alt || block.data?.src?.split('/').pop() || 'Image';
      case 'button': return block.data?.text || 'Button';
      case 'columns': return 'Columns'; case 'section': return 'Section'; case 'container': return 'Container';
      default: return block.type;
    }
  }

  selectBlock(block: Block, event: MouseEvent) {
    event.stopPropagation();
    this.editorComponent?.selectBlockFromChild(block);
  }

  getChildBlocks(block: Block): Block[] {
    if (!this.editorComponent) return [];
    if (block.type === 'section' || block.type === 'container') {
        return this.editorComponent.getBlocksByParentId(block.id);
    }
    return [];
  }

   getColumnChildBlocks(columnId: string): Block[] {
       if (!this.editorComponent) return [];
       return this.editorComponent.getBlocksByParentId(columnId);
   }
}