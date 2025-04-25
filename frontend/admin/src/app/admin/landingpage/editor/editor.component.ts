import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, DropListRef } from '@angular/cdk/drag-drop'; // Import DropListRef
import { Block, TextBlockData, ImageBlockData, ButtonBlockData, BlockType, ColumnsBlockData, Column, ContainerBlockData, SectionBlockData, BlockDataMap } from '../block.model'; // Import các type mới
import { TextBlockComponent } from '../blocks/text-block/text-block.component';
import { ImageBlockComponent } from '../blocks/image-block/image-block.component';
import { ButtonBlockComponent } from '../blocks/button-block/button-block.component';
import { ColumnsBlockComponent } from '../blocks/columns-block/columns-block.component';
import { NavigatorPanelComponent } from '../navigator-panel/navigator-panel.component';
// *** THÊM IMPORT ***
import { SectionBlockComponent } from '../blocks/section-block/section-block.component';
import { ContainerBlockComponent } from '../blocks/container-block/container-block.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule, JsonPipe, FormsModule, DragDropModule,
    TextBlockComponent, ImageBlockComponent, ButtonBlockComponent,
    ColumnsBlockComponent, NavigatorPanelComponent,
    SectionBlockComponent, ContainerBlockComponent // <-- Thêm vào imports
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  // **QUAN TRỌNG**: pageBlocks giờ đây là mảng phẳng chứa TẤT CẢ các khối
  pageBlocks: Block[] = [];
  readonly mainDropListId = 'main-drop-list'; // ID đặc biệt cho cấp cao nhất (parentId=null)
  selectedBlock: Block | null = null;

  displayOptions = ['', 'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'];
  flexDirectionOptions = ['', 'row', 'row-reverse', 'column', 'column-reverse'];
  justifyContentOptions = ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  alignItemsOptions = ['', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

  constructor(private cdr: ChangeDetectorRef) {}

  // --- Hàm lấy ID của tất cả các drop list (main, section, container, column) ---
  get allDropListsIds(): string[] {
    const ids: string[] = [this.mainDropListId];
    // Duyệt qua mảng phẳng để tìm các container và lấy ID của chúng (hoặc ID cột)
    this.pageBlocks.forEach(block => {
        if (block.type === 'columns' && block.data?.columns) {
            (block.data as ColumnsBlockData).columns.forEach(col => ids.push(col.id));
        } else if (block.type === 'section' || block.type === 'container') {
            ids.push(block.id); // ID của section/container chính là ID drop list của nó
        }
    });
    return [...new Set(ids)]; // Loại bỏ ID trùng lặp
  }


  ngOnInit(): void { this.loadPageData(); }

  loadPageData(): void {
     // Ví dụ khởi tạo với cấu trúc lồng nhau
     this.pageBlocks = [
        // Section 1
        { id: 'sec-1', type: 'section', order: 1, parentId: null, data: {} as SectionBlockData, styles: { padding: '40px 0', backgroundColor: '#f8f9fa' } },
         // Container bên trong Section 1
        { id: 'cont-1', type: 'container', order: 1, parentId: 'sec-1', data: {} as ContainerBlockData, styles: { maxWidth: '960px', margin: '0 auto', padding: '20px', border: '1px solid #eee', backgroundColor: '#ffffff' } },
         // Text bên trong Container 1
        { id: 'txt-1', type: 'text', order: 1, parentId: 'cont-1', data: { content: 'Tiêu đề trong Container' }, styles: { textAlign: 'center', fontSize: '24px', marginBottom: '20px' } },
         // Columns bên trong Container 1
        { id: 'cols-1', type: 'columns', order: 2, parentId: 'cont-1', data: { columns: [ { id: 'c1-1', blocks: [], styles: { flex: '1'}}, { id: 'c1-2', blocks: [], styles: { flex: '1'}} ], gap: '20px'} },
         // Text bên trong Cột 1 của Columns 1
        { id: 'txt-c1-1', type: 'text', order: 1, parentId: 'c1-1', data: { content: 'Nội dung cột 1.' } },
         // Button bên trong Cột 2 của Columns 1
        { id: 'btn-c1-2', type: 'button', order: 1, parentId: 'c1-2', data: { text: 'Nút Cột 2' } },
        // Section 2 (rỗng)
        { id: 'sec-2', type: 'section', order: 2, parentId: null, data: {} as SectionBlockData, styles: { padding: '30px 0', minHeight: '100px' } },
     ];
     // Sắp xếp lại theo order ở cấp cao nhất (nếu cần) và cập nhật cấu trúc
     this.pageBlocks.sort((a, b) => (a.parentId === null && b.parentId === null) ? a.order - b.order : 0);
     this.updateAllParentIdsAndOrders(); // Cập nhật toàn bộ cấu trúc
     console.log("Loaded pageBlocks:", JSON.stringify(this.pageBlocks));
     console.log("All drop lists:", this.allDropListsIds);
  }


  addBlock(type: BlockType) {
    const newId = `${type}-${Date.now()}`;
    let newBlock: Block | null = null;
    // Khi thêm mới, mặc định thêm vào cấp cao nhất (parentId=null)
    const parentIdToAdd = null; // Hoặc có thể là ID của khối đang chọn nếu nó là container
    const siblings = this.getBlocksByParentId(parentIdToAdd);
    const newOrder = siblings.length + 1;

    switch (type) {
      case 'text': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { content: 'Nội dung văn bản mới...' } }; break;
      case 'image': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { src: '', alt: '' } }; break;
      case 'button': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { text: 'Nút mới', link: '#', variant: 'primary' } }; break;
      case 'columns':
        const col1Id = `col-${newId}-1`; const col2Id = `col-${newId}-2`;
        newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { columns: [ { id: col1Id, blocks: [], styles: { flex: '1' } }, { id: col2Id, blocks: [], styles: { flex: '1' } } ], gap: '10px' } }; break;
      case 'section': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: {} }; break;
      case 'container': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: {} }; break;
    }

    if (newBlock) {
      // Thêm vào mảng phẳng pageBlocks
      this.pageBlocks.push(newBlock);
      // Cập nhật lại order của các khối cùng cấp với khối vừa thêm
      this.updateOrderForLevel(parentIdToAdd);
      console.log('Added new block:', newBlock);
      this.cdr.detectChanges();
      this.selectBlockFromChild(newBlock);
    }
  }

  // --- Hàm Drop tập trung ---
  drop(event: CdkDragDrop<Block[]>) {
    const previousContainerId = event.previousContainer.id;
    const currentContainerId = event.container.id; // Đây là ID của drop list đích
    const draggedBlock = event.item.data as any;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousContainerId === currentContainerId) {
      // TH1: Kéo thả trong cùng một danh sách
      const siblings = this.getBlocksByParentId(draggedBlock.parentId); // Lấy các khối cùng cấp
      moveItemInArray(siblings, previousIndex, currentIndex);
      // Cập nhật lại order cho các khối trong danh sách đó
      this.updateOrderForLevel(draggedBlock.parentId);
    } else {
      // TH2: Kéo thả giữa các danh sách khác nhau
      // Lấy danh sách các khối con của container nguồn và đích TRƯỚC khi di chuyển
      const sourceSiblings = this.getBlocksByParentId(draggedBlock.parentId);
      const targetSiblings = this.getBlocksByParentId(currentContainerId); // ID của drop list đích chính là parentId mới

      // Thực hiện di chuyển trong mảng phẳng pageBlocks không còn cần thiết
      // vì ta sẽ cập nhật parentId và order
      // transferArrayItem(previousData, currentData, previousIndex, currentIndex); // Không dùng transferArrayItem trực tiếp

      // Cập nhật parentId và order cho khối được kéo
      draggedBlock.parentId = currentContainerId;
      // Tạm thời gán order là currentIndex, sẽ được chuẩn hóa sau
      draggedBlock.order = currentIndex + 1; // (+1 vì order bắt đầu từ 1)

      // Xóa khối khỏi vị trí cũ (logic này không cần nếu chỉ cập nhật parent/order)
      // const oldIndexInFlatArray = this.pageBlocks.findIndex(b => b.id === draggedBlock.id);
      // if (oldIndexInFlatArray > -1) this.pageBlocks.splice(oldIndexInFlatArray, 1);

      // Chèn khối vào vị trí mới (logic này không cần nếu chỉ cập nhật parent/order)
      // Cần tìm vị trí chèn đúng trong mảng phẳng pageBlocks -> phức tạp
      // --> Cách tiếp cận tốt hơn: Chỉ cập nhật parentId và order, sau đó sắp xếp lại khi cần hiển thị/lưu

      // Cập nhật lại order cho container nguồn và đích
      this.updateOrderForLevel(previousContainerId);
      this.updateOrderForLevel(currentContainerId, draggedBlock, currentIndex); // Truyền khối vừa thả và vị trí mới
    }

    console.log(`Block ${draggedBlock.id} parentId set to ${draggedBlock.parentId}, order might be temporary.`);
    this.updateAllParentIdsAndOrders(); // Cập nhật lại toàn bộ cấu trúc để đảm bảo tính nhất quán
    this.cdr.detectChanges(); // Đảm bảo UI cập nhật
  }

  // --- Cập nhật order cho các khối có cùng parentId ---
  // targetBlock và targetIndex chỉ cần khi kéo thả giữa các container khác nhau
  updateOrderForLevel(parentId: string | null, targetBlock?: Block, targetIndex?: number) {
      const siblings = this.getBlocksByParentId(parentId).filter(b => b.id !== targetBlock?.id); // Lọc ra các khối cùng cấp (trừ khối vừa thả nếu có)

      // Nếu có khối vừa thả vào (targetBlock), chèn nó vào đúng vị trí index mong muốn
      if (targetBlock !== undefined && targetIndex !== undefined) {
          siblings.splice(targetIndex, 0, targetBlock);
      }

      // Gán lại order tuần tự cho các khối trong cấp này
      siblings.forEach((block, index) => {
          block.order = index + 1;
           // Đảm bảo parentId cũng đúng (có thể không cần nếu chỉ kéo trong cùng cấp)
          // block.parentId = parentId;
      });
  }

  // --- Cập nhật toàn bộ Parent ID và Order ---
  updateAllParentIdsAndOrders() {
      const updateRecursively = (parentId: string | null) => {
          const children = this.pageBlocks
                               .filter(b => b.parentId === parentId)
                               .sort((a, b) => a.order - b.order); // Sắp xếp theo order hiện tại

          children.forEach((child, index) => {
              child.order = index + 1; // Gán lại order chính xác
              // Đệ quy cho các khối container
              if (this.isContainerBlock(child.type)) {
                  if (child.type === 'columns' && child.data?.columns) {
                       (child.data as ColumnsBlockData).columns.forEach(col => {
                           updateRecursively(col.id); // ID của cột là parentId cho khối trong cột
                       });
                   } else { // section, container
                       updateRecursively(child.id); // ID của khối là parentId cho khối bên trong
                   }
              }
          });
      };
      updateRecursively(null); // Bắt đầu từ cấp gốc (parentId = null)
       // Cập nhật lại tham chiếu mảng để ChangeDetection OnPush hoạt động (nếu dùng)
      // this.pageBlocks = [...this.pageBlocks];
      console.log("Structure updated:", JSON.stringify(this.pageBlocks.map(b => ({id: b.id, order: b.order, parentId: b.parentId}))));
  }


  // --- Hàm lấy các khối con theo parentId (từ mảng phẳng pageBlocks) ---
  getBlocksByParentId(parentId: string | null): Block[] {
      // ID của drop list chính là null trong parentId của khối
      const targetParentId = parentId === this.mainDropListId ? null : parentId;
      return this.pageBlocks
                 .filter(b => b.parentId === targetParentId)
                 .sort((a, b) => a.order - b.order);
  }

  // Helper kiểm tra loại container
  isContainerBlock(type: BlockType): boolean {
      return type === 'columns' || type === 'section' || type === 'container';
  }

  // --- Hàm xóa (giữ nguyên logic tìm và xóa đệ quy) ---
  requestDeleteBlock(blockId: string, event: MouseEvent) {
    event.stopPropagation();
    const blockToDelete = this.findBlockByIdRecursive(blockId);

    if (!blockToDelete) {
       console.warn(`Block ${blockId} not found for deletion.`);
       return;
    }

     if (this.selectedBlock?.id === blockId) {
        this.selectedBlock = null;
     }

     // Tìm và xóa tất cả khối con (trực tiếp và gián tiếp) trước
     const childrenIdsToDelete = this.findAllNestedChildrenIds(blockToDelete);
     console.log(`Deleting block ${blockId} and its children:`, childrenIdsToDelete);
     childrenIdsToDelete.forEach(childId => {
          const childIndex = this.pageBlocks.findIndex(b => b.id === childId);
          if (childIndex > -1) this.pageBlocks.splice(childIndex, 1);
     });

     // Xóa chính khối đó
     const index = this.pageBlocks.findIndex(b => b.id === blockId);
     if (index > -1) {
         this.pageBlocks.splice(index, 1);
         console.log('Deleted block:', blockId);
     } else {
         console.warn(`Block ${blockId} was already removed (possibly as a child).`);
     }

     // Cập nhật lại order của các khối cùng cấp với khối vừa xóa
     if (blockToDelete) {
        this.updateOrderForLevel(blockToDelete.parentId);
     }
     this.cdr.detectChanges();
 }

  // Tìm khối theo ID trong mảng phẳng pageBlocks
  findBlockByIdRecursive(blockId: string): any | null {
     return this.pageBlocks.find(b => b.id === blockId) || null;
  }

  // Tìm ID của tất cả khối con (trực tiếp và gián tiếp) của một khối cha
  findAllNestedChildrenIds(parentBlock: Block): string[] {
      let childrenIds: string[] = [];
      let parentDropListIds: string[] = [];

      if (parentBlock.type === 'columns' && parentBlock.data?.columns) {
          parentDropListIds = (parentBlock.data as ColumnsBlockData).columns.map(c => c.id);
      } else if (parentBlock.type === 'section' || parentBlock.type === 'container') {
          parentDropListIds.push(parentBlock.id);
      } else {
          return []; // Các khối không phải container không có con theo cấu trúc này
      }

      parentDropListIds.forEach(parentId => {
          const directChildren = this.pageBlocks.filter(b => b.parentId === parentId);
          directChildren.forEach(child => {
              childrenIds.push(child.id);
              if (this.isContainerBlock(child.type)) {
                  childrenIds.push(...this.findAllNestedChildrenIds(child)); // Đệ quy
              }
          });
      });

      return childrenIds;
  }


  // --- Các hàm khác giữ nguyên ---
  editBlock(block: Block) {
    // Hàm này không còn dùng trực tiếp, thay bằng inspector
    console.log('Editing block (legacy):', block);
    this.selectBlockFromChild(block); // Chọn khối để mở inspector
  }
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
  selectBlock(block: Block, event: MouseEvent) {
    event.stopPropagation();
    this.ensureStylesInitialized(block); // Khởi tạo styles nếu cần
    this.selectedBlock = block;
    this.cdr.detectChanges();
    console.log('Selected Block:', this.selectedBlock);
  }

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
  onStyleChange(block: Block | null, styleKey: string) {
    if (block?.styles && block.styles[styleKey] === '') {
      // Tùy chọn: xóa key khỏi object styles nếu giá trị là rỗng
      // delete block.styles[styleKey];
      // console.log(`Removed empty style: ${styleKey}`);
    }
    // console.log('Style changed:', styleKey, block?.styles);
    this.cdr.detectChanges(); // Đảm bảo cập nhật view
  }

  onColumnStyleChange(column: Column | null, styleKey: string) {
    if (column?.styles && column.styles[styleKey] === '') {
      // delete column.styles[styleKey];
    }
    // console.log('Column style changed:', column?.id, styleKey, column?.styles);
    this.cdr.detectChanges();
  }
  onDataChange() {
    // Hàm này có thể dùng để xử lý khi dữ liệu khối thay đổi
    console.log('Block data changed:', this.selectedBlock);
    this.cdr.detectChanges();
  }

}