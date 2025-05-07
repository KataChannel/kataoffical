import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Block, ColumnsBlockData, Column } from '../../block.model';

// Import các block component khác để có thể hiển thị chúng bên trong cột
import { TextBlockComponent } from '../text-block/text-block.component';
import { ImageBlockComponent } from '../image-block/image-block.component';
import { ButtonBlockComponent } from '../button-block/button-block.component';
import { EditorComponent } from '../../editor/editor.component'; // Inject EditorComponent

@Component({
  selector: 'app-columns-block',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    // Import các block component khác VÀ chính nó để hỗ trợ lồng nhau
    TextBlockComponent,
    ImageBlockComponent,
    ButtonBlockComponent,
    ColumnsBlockComponent, // <-- Thêm chính nó
  ],
  templateUrl: './columns-block.component.html',
  styleUrls: ['./columns-block.component.scss']
})
export class ColumnsBlockComponent implements OnInit {
  @Input() block: Block | undefined;
  // Inject EditorComponent để có thể tương tác với danh sách khối tổng và trạng thái selectedBlock
  public editorComponent = inject(EditorComponent, { optional: true }); // Để public để template có thể truy cập

  get data(): ColumnsBlockData | any {
    if (this.block?.type === 'columns') {
       return this.block?.data as ColumnsBlockData;
    }
    return undefined;
  }

  // Lấy danh sách ID của các drop list trong component này (mỗi cột là một drop list)
  get columnDropListIds(): string[] {
    return this.data?.columns.map((col:any) => col.id) || [];
  }

  ngOnInit(): void {
    // Khởi tạo dữ liệu cột nếu chưa có khi component được tạo
    if (this.block && this.block.type === 'columns' && !this.block.data?.columns) {
      console.log(`Initializing columns for block ${this.block.id}`);
      this.block.data = {
        columns: [
          { id: `col-${this.block.id}-1`, blocks: [], styles: { flex: '1' } },
          { id: `col-${this.block.id}-2`, blocks: [], styles: { flex: '1' } }
        ],
        gap: '10px'
      } as unknown as ColumnsBlockData;
       // Đảm bảo parentId của các block con được cập nhật (nếu load từ dữ liệu có sẵn)
       this.updateAllNestedParentIds();
    } else if (this.block?.type === 'columns') {
        // Nếu đã có data, vẫn cần đảm bảo parentId đúng
        this.updateAllNestedParentIds();
    }
  }

   // Hàm cập nhật parentId cho tất cả các khối con trực tiếp của ColumnsBlock này
   updateAllNestedParentIds() {
       if (this.data?.columns) {
           this.data.columns.forEach((col:any) => {
               col.blocks.forEach((nestedBlock:any) => {
                   nestedBlock.parentId = col.id;
                   // **Quan trọng**: Không gọi đệ quy ở đây để tránh vòng lặp vô hạn
                   // Việc cập nhật parentId cho cấp sâu hơn sẽ do component con đảm nhiệm khi nó init
               });
           });
       }
   }


  // Hàm xử lý khi thả khối vào một cột (gọi hàm drop của EditorComponent)
  drop(event: CdkDragDrop<Block[]>, columnId: string) {
    if (this.editorComponent) {
      // Chuyển sự kiện drop cho EditorComponent xử lý tập trung
      this.editorComponent.drop(event);
    } else {
       console.error("EditorComponent not injected! Cannot handle drop event in columns.");
    }
  }

  // --- Gọi hàm selectBlock của EditorComponent khi khối con được click ---
  selectNestedBlock(nestedBlock: Block, event: MouseEvent) {
    event.stopPropagation();
    if (this.editorComponent) {
       this.editorComponent.selectBlockFromChild(nestedBlock);
    }
  }

   // --- Gọi hàm xóa của EditorComponent khi nút xóa khối con được click ---
   requestDeleteNestedBlock(nestedBlockId: string, event: MouseEvent) {
      event.stopPropagation();
       if (this.editorComponent) {
           this.editorComponent.requestDeleteBlock(nestedBlockId, event);
       }
   }
}