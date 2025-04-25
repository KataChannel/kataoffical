import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Block,
  TextBlockData,
  ImageBlockData,
  ButtonBlockData,
  BlockType,
  ColumnsBlockData,
  Column,
} from '../block.model';
import { TextBlockComponent } from '../blocks/text-block/text-block.component';
import { ImageBlockComponent } from '../blocks/image-block/image-block.component';
import { ButtonBlockComponent } from '../blocks/button-block/button-block.component';
import { ColumnsBlockComponent } from '../blocks/columns-block/columns-block.component';
import { NavigatorPanelComponent } from '../navigator-panel/navigator-panel.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe, // Thêm JsonPipe để dùng trong template
    DragDropModule,
    TextBlockComponent,
    ImageBlockComponent,
    ButtonBlockComponent,
    ColumnsBlockComponent,
    NavigatorPanelComponent,
    FormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  pageBlocks: any[] = [];
  readonly mainDropListId = 'main-drop-list'; // ID cho danh sách chính

  // --- State quản lý khối được chọn ---
  selectedBlock: Block | null = null;
  // Mảng các tùy chọn cho thuộc tính display
  displayOptions = ['', 'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'];
  // Mảng các tùy chọn cho flex-direction
  flexDirectionOptions = ['', 'row', 'row-reverse', 'column', 'column-reverse'];
  // Mảng các tùy chọn cho justify-content
  justifyContentOptions = ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  // Mảng các tùy chọn cho align-items
  alignItemsOptions = ['', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

  // Inject ChangeDetectorRef để cập nhật giao diện khi selectedBlock thay đổi từ component con
  constructor(private cdr: ChangeDetectorRef) {}

  // Getter để lấy ID của tất cả các drop list có thể thả vào
  get allDropListsIds(): string[] {
    const columnIds = this.pageBlocks
      .filter((block) => block.type === 'columns' && block.data?.columns)
      .flatMap((block) =>
        (block.data as ColumnsBlockData).columns.map((col) => col.id)
      );
    return [this.mainDropListId, ...columnIds];
  }

  ngOnInit(): void {
    this.loadPageData();
  }
  onDataChange() { 
    
  }
  loadPageData(): void {
    // Ví dụ khởi tạo với 1 columns block
    this.pageBlocks = [
      {
        id: 'uuid-text-outside-1',
        type: 'text',
        order: 1,
        parentId: null,
        data: { content: 'Khối Văn Bản Bên Ngoài' } as TextBlockData,
      },
      {
        id: 'uuid-cols-1',
        type: 'columns',
        order: 2,
        parentId: null,
        data: {
          columns: [
            {
              id: 'col-uuid-cols-1-1',
              blocks: [
                {
                  id: 'uuid-text-in-col-1',
                  type: 'text',
                  order: 1,
                  parentId: 'col-uuid-cols-1-1',
                  data: { content: 'Text trong cột 1' } as TextBlockData,
                },
              ],
              styles: { flex: '1', backgroundColor: '#f0f8ff' },
            }, // Thêm style ví dụ
            {
              id: 'col-uuid-cols-1-2',
              blocks: [],
              styles: { flex: '1', backgroundColor: '#fff0f5' },
            }, // Thêm style ví dụ
          ],
          gap: '15px',
        } as ColumnsBlockData,
      },
      {
        id: 'uuid-img-outside-1',
        type: 'image',
        order: 3,
        parentId: null,
        data: {
          src: 'https://via.placeholder.com/300x100.png?text=Ảnh+Banner',
        } as ImageBlockData,
        styles: { 'margin-bottom': '20px' },
      },
      {
        id: 'uuid-btn-outside-1',
        type: 'button',
        order: 4,
        parentId: null,
        data: {
          text: 'Nút Bên Ngoài',
          variant: 'secondary',
        } as ButtonBlockData,
      },
    ].sort((a, b) => a.order - b.order);
    // Cần đảm bảo parentId được cập nhật đúng khi load
    this.updateAllParentIds();
  }

  addBlock(type: BlockType) {
    const newId = `uuid-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    // Order sẽ được cập nhật bởi updateBlockOrder sau khi thêm vào mảng
    const newOrder = this.pageBlocks.length + 1;
    let newBlock: Block | null = null;

    switch (type) {
      case 'text':
        newBlock = {
          id: newId,
          type: 'text',
          order: newOrder,
          parentId: null,
          data: { content: 'Nội dung văn bản mới...' } as TextBlockData,
        };
        break;
      case 'image':
        newBlock = {
          id: newId,
          type: 'image',
          order: newOrder,
          parentId: null,
          data: { src: '' } as ImageBlockData,
        };
        break;
      case 'button':
        newBlock = {
          id: newId,
          type: 'button',
          order: newOrder,
          parentId: null,
          data: { text: 'Nút mới', variant: 'secondary' } as ButtonBlockData,
        };
        break;
      case 'columns':
        const col1Id = `col-${newId}-1`;
        const col2Id = `col-${newId}-2`;
        newBlock = {
          id: newId,
          type: 'columns',
          order: newOrder,
          parentId: null,
          data: {
            columns: [
              { id: col1Id, blocks: [], styles: { flex: '1' } },
              { id: col2Id, blocks: [], styles: { flex: '1' } },
            ],
            gap: '10px',
          } as ColumnsBlockData,
        };
        break;
    }
    if (newBlock) {
      this.pageBlocks.push(newBlock);
      this.updateBlockOrder(); // Cập nhật order cho danh sách chính
      console.log('Added new block:', newBlock);
    }
  }

  // Hàm xóa khối duy nhất, xử lý cả gốc và con
  requestDeleteBlock(blockId: string, event: MouseEvent) {
    event.stopPropagation(); // Ngăn việc chọn khối cha khi bấm xóa con
    if (this.selectedBlock?.id === blockId) {
      this.selectedBlock = null;
    }

    // Thử xóa ở cấp cao nhất trước
    const index = this.pageBlocks.findIndex((b) => b.id === blockId);
    if (index > -1) {
      const blockToDelete = this.pageBlocks[index];
      if (blockToDelete.type === 'columns') {
        console.warn(
          `Deleting columns block ${blockId}. Ensure nested blocks are handled if needed.`
        );
        // Có thể thêm logic xóa hoặc di chuyển các khối con ở đây
      }
      this.pageBlocks.splice(index, 1);
      this.updateBlockOrder();
      console.log('Deleted block:', blockId);
    } else {
      // Nếu không thấy, tìm và xóa trong các khối lồng nhau
      const deleted = this.findAndDeleteNestedBlock(this.pageBlocks, blockId);
      if (deleted) {
        console.log(`Deleted nested block ${blockId} successfully.`);
      } else {
        console.warn(`Block ${blockId} not found for deletion.`);
      }
    }
    this.cdr.detectChanges(); // Cập nhật view sau khi xóa
  }

  // Hàm đệ quy tìm và xóa block con
  findAndDeleteNestedBlock(blocks: Block[], blockId: string): boolean {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.type === 'columns' && block.data?.columns) {
        const columnsData = block.data as ColumnsBlockData;
        for (let j = 0; j < columnsData.columns.length; j++) {
          const col = columnsData.columns[j];
          const nestedIndex = col.blocks.findIndex((nb) => nb.id === blockId);
          if (nestedIndex > -1) {
            const deletedBlock = col.blocks.splice(nestedIndex, 1)[0];
            // Cập nhật lại order trong cột đó
            col.blocks.forEach((b, idx) => (b.order = idx + 1));
            return true; // Tìm thấy và đã xóa
          }
          // **Quan trọng**: Thêm đệ quy nếu khối con cũng là 'columns'
          if (this.findAndDeleteNestedBlock(col.blocks, blockId)) {
            return true;
          }
        }
      }
    }
    return false; // Không tìm thấy ở cấp này hoặc các cấp con
  }

  editBlock(block: Block) {
    // Hàm này không còn dùng trực tiếp, thay bằng inspector
    console.log('Editing block (legacy):', block);
    this.selectBlockFromChild(block); // Chọn khối để mở inspector
  }

  drop(event: CdkDragDrop<Block[]>) {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
    const previousData = previousContainer.data;
    const currentData = currentContainer.data;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const draggedBlock = event.item.data as Block;

    if (previousContainer === currentContainer) {
      // TH1: Kéo thả trong cùng một danh sách (chính hoặc cột)
      moveItemInArray(currentData, previousIndex, currentIndex);
      // Cập nhật order và parentId tùy thuộc vào danh sách nào
      if (currentContainer.id === this.mainDropListId) {
        this.updateBlockOrder(); // Cập nhật order danh sách chính
      } else {
        // Tìm cột chứa danh sách này và cập nhật khối con
        const ownerColumn = this.findColumnById(currentContainer.id);
        if (ownerColumn) {
          this.updateNestedBlockOrderAndParent(
            ownerColumn.blocks,
            ownerColumn.id
          );
        }
      }
      console.log(
        `Moved block within list ${currentContainer.id}:`,
        currentData
      );
    } else {
      // TH2: Kéo thả giữa các danh sách khác nhau
      transferArrayItem(previousData, currentData, previousIndex, currentIndex);

      // Cập nhật parentId và order cho khối được di chuyển và các danh sách liên quan
      if (currentContainer.id === this.mainDropListId) {
        // Thả vào danh sách chính
        draggedBlock.parentId = null;
        this.updateBlockOrder(); // Cập nhật toàn bộ danh sách chính
      } else {
        // Thả vào một cột
        draggedBlock.parentId = currentContainer.id; // currentContainer.id chính là columnId
        const targetColumn = this.findColumnById(currentContainer.id);
        if (targetColumn) {
          this.updateNestedBlockOrderAndParent(
            targetColumn.blocks,
            targetColumn.id
          );
        }
      }

      // Cập nhật danh sách nguồn (nếu không phải là danh sách chính)
      if (previousContainer.id !== this.mainDropListId) {
        const sourceColumn = this.findColumnById(previousContainer.id);
        if (sourceColumn) {
          this.updateNestedBlockOrderAndParent(
            sourceColumn.blocks,
            sourceColumn.id
          );
        }
      } else {
        // Nếu kéo từ danh sách chính ra, cũng cập nhật lại nó
        this.updateBlockOrder();
      }

      console.log(
        `Transferred block from ${previousContainer.id} to ${currentContainer.id}`
      );
    }
    this.cdr.detectChanges(); // Đảm bảo giao diện cập nhật sau khi kéo thả
    // this.saveChanges(); // Gọi hàm lưu nếu có
  }

  // Hàm tìm một cột dựa trên ID của nó (duyệt qua các columns block)
  private findColumnById(columnId: string): Column | undefined {
    for (const block of this.pageBlocks) {
      if (block.type === 'columns' && block.data?.columns) {
        const columnsData = block.data as ColumnsBlockData;
        const foundColumn = columnsData.columns.find(
          (col) => col.id === columnId
        );
        if (foundColumn) {
          return foundColumn;
        }
        // **Quan trọng**: Thêm đệ quy tìm trong cột lồng nhau
        else {
          for (const col of columnsData.columns) {
            const nestedFound = this.findNestedColumnById(col.blocks, columnId);
            if (nestedFound) return nestedFound;
          }
        }
      }
    }
    return undefined;
  }
  // Hàm phụ trợ đệ quy tìm cột lồng nhau
  private findNestedColumnById(
    blocks: Block[],
    columnId: string
  ): Column | undefined {
    for (const block of blocks) {
      if (block.type === 'columns' && block.data?.columns) {
        const columnsData = block.data as ColumnsBlockData;
        const foundColumn = columnsData.columns.find(
          (col) => col.id === columnId
        );
        if (foundColumn) {
          return foundColumn;
        } else {
          for (const col of columnsData.columns) {
            const nestedFound = this.findNestedColumnById(col.blocks, columnId);
            if (nestedFound) return nestedFound;
          }
        }
      }
    }
    return undefined;
  }

  // Cập nhật order cho các khối trong danh sách chính (pageBlocks)
  updateBlockOrder() {
    this.pageBlocks.forEach((block, index) => {
      block.order = index + 1;
      block.parentId = null; // Đảm bảo các khối ở cấp cao nhất có parentId là null
    });
  }

  // Hàm cập nhật thứ tự và parentId cho các khối con bên trong một cột cụ thể
  updateNestedBlockOrderAndParent(blocksInColumn: Block[], columnId: string) {
    blocksInColumn.forEach((block, index) => {
      block.order = index + 1; // Order dựa trên vị trí trong cột
      block.parentId = columnId; // Đảm bảo parentId đúng
    });
  }

  // Hàm cập nhật lại parentId cho tất cả các khối con khi load dữ liệu (cần đệ quy)
  updateAllParentIds() {
    const updateRecursively = (blocks: Block[], parentId: string | null) => {
      blocks.forEach((block, index) => {
        block.order = index + 1; // Cập nhật luôn order khi duyệt qua
        block.parentId = parentId;
        if (block.type === 'columns' && block.data?.columns) {
          (block.data as ColumnsBlockData).columns.forEach((col) => {
            updateRecursively(col.blocks, col.id); // Đệ quy vào từng cột
          });
        }
      });
    };
    updateRecursively(this.pageBlocks, null); // Bắt đầu từ cấp cao nhất
  }

  // Gọi hàm này khi chọn block
  selectBlock(block: Block, event: MouseEvent) {
    event.stopPropagation();
    this.ensureStylesInitialized(block); // Khởi tạo styles nếu cần
    this.selectedBlock = block;
    this.cdr.detectChanges();
    console.log('Selected Block:', this.selectedBlock);
  }

  // --- Phương thức bỏ chọn khối (khi click ra ngoài) ---
  deselectBlock(event?: MouseEvent) {
    if (this.selectedBlock) {
      const clickedElement = event?.target as HTMLElement;
      // Bỏ chọn nếu click ra nền canvas hoặc vùng palette (không phải inspector)
      const clickedOnAllowedBackground =
        clickedElement?.classList.contains('editor-canvas') ||
        clickedElement?.closest('.block-palette');

      if (!event || clickedOnAllowedBackground) {
        this.selectedBlock = null;
        this.cdr.detectChanges();
        console.log('Block deselected');
      }
    }
  }

  selectBlockFromChild(block: Block) {
    this.ensureStylesInitialized(block); // Khởi tạo styles nếu cần
    this.selectedBlock = block;
    this.cdr.detectChanges();
    console.log('Selected Block (from child):', this.selectedBlock);
  }

  // saveChanges() { console.log("Saving page state:", JSON.stringify(this.pageBlocks, null, 2)); }
  // --- Hàm khởi tạo styles nếu chưa có ---
  // Đảm bảo object styles tồn tại
  ensureStylesInitialized(block: Block | null) {
    if (block && !block.styles) {
      block.styles = {};
      console.log(`Initialized styles for block ${block.id}`);
    }
    // Khởi tạo styles cho cột con nếu chưa có
    if (block?.type === 'columns' && block.data?.columns) {
      block.data.columns.forEach((col: Column) => {
        if (!col.styles) {
          col.styles = {};
        }
      });
    }
  }

  // Hàm xử lý chung khi style thay đổi, có thể dùng để xóa key nếu value rỗng
  onStyleChange(block: Block | null, styleKey: string) {
    if (block?.styles && block.styles[styleKey] === '') {
      // Tùy chọn: xóa key khỏi object styles nếu giá trị là rỗng
      // delete block.styles[styleKey];
      // console.log(`Removed empty style: ${styleKey}`);
    }
    // console.log('Style changed:', styleKey, block?.styles);
    this.cdr.detectChanges(); // Đảm bảo cập nhật view
  }

  // Hàm xử lý khi style của cột con thay đổi
  onColumnStyleChange(column: Column | null, styleKey: string) {
    if (column?.styles && column.styles[styleKey] === '') {
      // delete column.styles[styleKey];
    }
    // console.log('Column style changed:', column?.id, styleKey, column?.styles);
    this.cdr.detectChanges();
  }
}
