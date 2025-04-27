import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Block, TextBlockData, ImageBlockData, ButtonBlockData, BlockType, ColumnsBlockData, Column, ContainerBlockData, SectionBlockData, BlockDataMap, Interaction } from '../block.model';
import { TextBlockComponent } from '../blocks/text-block/text-block.component';
import { ImageBlockComponent } from '../blocks/image-block/image-block.component';
import { ButtonBlockComponent } from '../blocks/button-block/button-block.component';
import { ColumnsBlockComponent } from '../blocks/columns-block/columns-block.component';
import { NavigatorPanelComponent } from '../navigator-panel/navigator-panel.component';
import { SectionBlockComponent } from '../blocks/section-block/section-block.component';
import { ContainerBlockComponent } from '../blocks/container-block/container-block.component';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid @types/uuid

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule, JsonPipe, FormsModule, DragDropModule,
    TextBlockComponent, ImageBlockComponent, ButtonBlockComponent,
    ColumnsBlockComponent, NavigatorPanelComponent,
    SectionBlockComponent, ContainerBlockComponent
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  // Mảng phẳng chứa TẤT CẢ các khối
  pageBlocks: Block[] = [];
  readonly mainDropListId = 'main-drop-list'; // ID đặc biệt cho cấp cao nhất (parentId=null)
  selectedBlock: Block | null = null;

  displayOptions = ['', 'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none'];
  flexDirectionOptions = ['', 'row', 'row-reverse', 'column', 'column-reverse'];
  justifyContentOptions = ['', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  alignItemsOptions = ['', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

  // Biến tạm để tạo interaction mới
  newInteractionTrigger: 'hover' | 'click' = 'hover';
  newInteractionAction: 'addClass' = 'addClass';
  newInteractionClassName: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  get allDropListsIds(): string[] {
    const ids: string[] = [this.mainDropListId];
    this.pageBlocks.forEach(block => {
        if (block.type === 'columns' && block.data?.columns) {
            (block.data as ColumnsBlockData).columns.forEach(col => ids.push(col.id));
        } else if (block.type === 'section' || block.type === 'container') {
            ids.push(block.id);
        }
    });
    return [...new Set(ids)];
  }

  ngOnInit(): void { this.loadPageData(); }

  loadPageData(): void {
     this.pageBlocks = [
        { id: 'sec-1', type: 'section', order: 1, parentId: null, data: {} as SectionBlockData, styles: { padding: '40px 0', backgroundColor: '#f8f9fa' } },
        { id: 'cont-1', type: 'container', order: 1, parentId: 'sec-1', data: {} as ContainerBlockData, styles: { maxWidth: '960px', margin: '0 auto', padding: '20px', border: '1px solid #eee', backgroundColor: '#ffffff' } },
        { id: 'txt-1', type: 'text', order: 1, parentId: 'cont-1', data: { content: 'Tiêu đề trong Container' }, styles: { textAlign: 'center', fontSize: '24px', marginBottom: '20px' } },
        { id: 'cols-1', type: 'columns', order: 2, parentId: 'cont-1', data: { columns: [ { id: 'c1-1', styles: { flex: '1'}}, { id: 'c1-2', styles: { flex: '1'}} ], gap: '20px'} }, // Bỏ blocks khỏi data.columns
        { id: 'txt-c1-1', type: 'text', order: 1, parentId: 'c1-1', data: { content: 'Nội dung cột 1.' } },
        { id: 'btn-c1-2', type: 'button', order: 1, parentId: 'c1-2', data: { text: 'Nút Cột 2' } },
        { id: 'sec-2', type: 'section', order: 2, parentId: null, data: {} as SectionBlockData, styles: { padding: '30px 0', minHeight: '100px' } },
     ];
     this.pageBlocks.sort((a, b) => (a.parentId === null && b.parentId === null) ? a.order - b.order : 0);
     this.updateAllParentIdsAndOrders();
     console.log("Loaded pageBlocks:", JSON.stringify(this.pageBlocks));
  }

  addBlock(type: BlockType) {
    const newId = `${type}-${Date.now()}`;
    const parentIdToAdd = null;
    const siblings = this.getBlocksByParentId(parentIdToAdd);
    const newOrder = siblings.length + 1;
    let newBlock: Block | null = null;

    switch (type) {
      case 'text': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { content: 'Nội dung văn bản mới...' } }; break;
      case 'image': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { src: '', alt: '' } }; break;
      case 'button': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { text: 'Nút mới', link: '#', variant: 'primary' } }; break;
      case 'columns':
        const col1Id = `col-${newId}-1`; const col2Id = `col-${newId}-2`;
        newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: { columns: [ { id: col1Id, styles: { flex: '1' } }, { id: col2Id, styles: { flex: '1' } } ], gap: '10px' } }; break;
      case 'section': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: {} }; break;
      case 'container': newBlock = { id: newId, type: type, order: newOrder, parentId: parentIdToAdd, data: {} }; break;
    }

    if (newBlock) {
      this.pageBlocks.push(newBlock);
      this.updateOrderForLevel(parentIdToAdd);
      console.log('Added new block:', newBlock);
      this.cdr.detectChanges();
      this.selectBlockFromChild(newBlock);
    }
  }

  drop(event: CdkDragDrop<Block[]>) {
    const previousContainerId = event.previousContainer.id;
    const currentContainerId = event.container.id;
    const draggedBlock = event.item.data as Block;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // Xác định parentId thực sự từ containerId
    const previousParentId = previousContainerId === this.mainDropListId ? null : previousContainerId;
    const currentParentId = currentContainerId === this.mainDropListId ? null : currentContainerId;

    if (previousContainerId === currentContainerId) {
      const siblings = this.getBlocksByParentId(currentParentId);
      moveItemInArray(siblings, previousIndex, currentIndex);
      this.updateOrderForLevel(currentParentId);
    } else {
      draggedBlock.parentId = currentParentId;
      // Chèn khối vào đúng vị trí index mong muốn và cập nhật order
      this.updateOrderForLevel(currentParentId, draggedBlock, currentIndex);
       // Cập nhật lại order cho container nguồn (sau khi khối đã bị "lấy đi")
      this.updateOrderForLevel(previousParentId);
    }

    this.updateAllParentIdsAndOrders(); // Đảm bảo tính nhất quán
    this.cdr.detectChanges();
  }

  updateOrderForLevel(parentId: string | null, targetBlock?: Block, targetIndex?: number) {
      let siblings = this.getBlocksByParentId(parentId);

      // Nếu có targetBlock (kéo từ container khác vào)
      if (targetBlock !== undefined && targetIndex !== undefined) {
           // Loại bỏ targetBlock khỏi danh sách hiện tại (nếu nó vô tình có mặt)
           siblings = siblings.filter(b => b.id !== targetBlock.id);
          // Chèn vào vị trí mới
          siblings.splice(targetIndex, 0, targetBlock);
      }

      // Gán lại order tuần tự
      siblings.forEach((block, index) => {
          block.order = index + 1;
           // Đảm bảo parentId đúng (quan trọng khi kéo thả giữa các container)
          block.parentId = parentId;
      });
  }

  updateAllParentIdsAndOrders() {
      const updateRecursively = (parentId: string | null) => {
          const children = this.pageBlocks
                               .filter(b => b.parentId === parentId)
                               .sort((a, b) => a.order - b.order);

          children.forEach((child, index) => {
              child.order = index + 1;
              if (this.isContainerBlock(child.type)) {
                  if (child.type === 'columns' && child.data?.columns) {
                       (child.data as ColumnsBlockData).columns.forEach(col => {
                           updateRecursively(col.id);
                       });
                   } else {
                       updateRecursively(child.id);
                   }
              }
          });
      };
      updateRecursively(null);
      this.pageBlocks = [...this.pageBlocks]; // Cập nhật tham chiếu mảng
      console.log("Structure updated:", JSON.stringify(this.pageBlocks.map(b => ({id: b.id, order: b.order, parentId: b.parentId}))));
  }

  getBlocksByParentId(parentId: string | null): Block[] {
      const targetParentId = parentId === this.mainDropListId ? null : parentId;
      return this.pageBlocks
                 .filter(b => b.parentId === targetParentId)
                 .sort((a, b) => a.order - b.order);
  }

  isContainerBlock(type: BlockType): boolean {
      return type === 'columns' || type === 'section' || type === 'container';
  }

  requestDeleteBlock(blockId: string, event: MouseEvent) {
    event.stopPropagation();
    const blockToDelete = this.findBlockByIdRecursive(blockId);
    if (!blockToDelete) return;

    if (this.selectedBlock?.id === blockId) this.selectedBlock = null;

    const childrenIdsToDelete = this.findAllNestedChildrenIds(blockToDelete);
    const idsToDelete = [blockId, ...childrenIdsToDelete];

    this.pageBlocks = this.pageBlocks.filter(b => !idsToDelete.includes(b.id));

    this.updateOrderForLevel(blockToDelete.parentId); // Cập nhật order cấp cha
    this.cdr.detectChanges();
    console.log('Deleted block(s):', idsToDelete);
 }

  findBlockByIdRecursive(blockId: string): any | null {
     return this.pageBlocks.find(b => b.id === blockId) || null;
  }

  findAllNestedChildrenIds(parentBlock: Block): string[] {
      let childrenIds: string[] = [];
      let parentDropListIds: string[] = [];

      if (parentBlock.type === 'columns' && parentBlock.data?.columns) {
          parentDropListIds = (parentBlock.data as ColumnsBlockData).columns.map(c => c.id);
      } else if (parentBlock.type === 'section' || parentBlock.type === 'container') {
          parentDropListIds.push(parentBlock.id);
      }

      parentDropListIds.forEach(parentId => {
          const directChildren = this.pageBlocks.filter(b => b.parentId === parentId);
          directChildren.forEach(child => {
              childrenIds.push(child.id);
              if (this.isContainerBlock(child.type)) {
                  childrenIds.push(...this.findAllNestedChildrenIds(child));
              }
          });
      });
      return childrenIds;
  }

  ensureStylesInitialized(block: Block | null) {
      if (block && !block.styles) block.styles = {};
      if (block?.type === 'columns' && block.data?.columns) {
          block.data.columns.forEach((col: Omit<Column, 'blocks'>) => {
              if (!col.styles) col.styles = {};
          });
      }
  }

  ensureInteractionsInitialized(block: Block | null) {
      if (block && !block.interactions) block.interactions = [];
  }

  selectBlock(block: Block, event: MouseEvent) {
      event.stopPropagation();
      this.ensureStylesInitialized(block);
      this.ensureInteractionsInitialized(block);
      this.selectedBlock = block;
      this.resetNewInteractionForm();
      this.cdr.detectChanges();
  }

  deselectBlock(event?: MouseEvent) {
    if (this.selectedBlock) {
       const clickedElement = event?.target as HTMLElement;
       const clickedOnAllowedBackground = clickedElement?.classList.contains('editor-canvas') || clickedElement?.closest('.block-palette');
       if (!event || clickedOnAllowedBackground) {
           this.selectedBlock = null;
           this.cdr.detectChanges();
       }
    }
  }

  selectBlockFromChild(block: Block) {
      this.ensureStylesInitialized(block);
      this.ensureInteractionsInitialized(block);
      this.selectedBlock = block;
      this.resetNewInteractionForm();
      this.cdr.detectChanges();
  }

  onStyleChange(block: Block | null, styleKey: string) { this.cdr.detectChanges(); }
  onColumnStyleChange(column: Omit<Column, 'blocks'> | null, styleKey: string) { this.cdr.detectChanges(); }
  onDataChange() { this.cdr.detectChanges(); }

  addInteraction() {
    if (this.selectedBlock && this.newInteractionClassName.trim()) {
      this.ensureInteractionsInitialized(this.selectedBlock);
      const newInteraction: Interaction = {
        id: uuidv4(), trigger: this.newInteractionTrigger,
        action: this.newInteractionAction, className: this.newInteractionClassName.trim()
      };
      this.selectedBlock.interactions?.push(newInteraction);
      this.resetNewInteractionForm();
      this.cdr.detectChanges();
    }
  }

  removeInteraction(interactionId: string) {
    if (this.selectedBlock?.interactions) {
      const index = this.selectedBlock.interactions.findIndex(intr => intr.id === interactionId);
      if (index > -1) {
        this.selectedBlock.interactions.splice(index, 1);
        this.cdr.detectChanges();
      }
    }
  }

  resetNewInteractionForm() {
    this.newInteractionTrigger = 'hover';
    this.newInteractionAction = 'addClass';
    this.newInteractionClassName = '';
  }
}