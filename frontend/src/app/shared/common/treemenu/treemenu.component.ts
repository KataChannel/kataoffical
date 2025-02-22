import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, inject, Input, OnChanges, Output, Signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { RouterLink } from '@angular/router';
import { DeletedialogComponent } from '../dialog/deletedialog/deletedialog.component';
import { UpdatedialogComponent } from '../dialog/updatedialog/updatedialog.component';
import { nest } from '../../utils/shared.utils';

@Component({
  selector: 'app-treemenu',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule,CommonModule,RouterLink,MatMenuModule],
  templateUrl: './treemenu.component.html',
  styleUrl: './treemenu.component.scss'
})
export class TreemenuComponent{
   
  @Input() ListMenu!: Signal<string[]>;
  @Output() UpdateEmit = new EventEmitter<any>();
  @Output() DeleteEmit = new EventEmitter<any>();
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      Title: node.Title,
      Slug: node.Slug,
      Item: node,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node?.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  private dialog:MatDialog = inject(MatDialog)
  constructor() {
    effect(() => {
      this.dataSource.data = nest(this.ListMenu(),'','pid');
    });
  }

  hasChild = (_: number, node: any) => node.expandable;
  ngOnInit(): void {
    this.dataSource.data = nest(this.ListMenu(),'','pid');
    this.treeControl.expandAll()
    console.log(this.dataSource.data);
    
  }
  Update(item:any): void {
    item.Parent = this.ListMenu();
    const dialogRef = this.dialog.open(UpdatedialogComponent,{data:item});
    dialogRef.afterClosed().subscribe((result) => {
      if (result!="false") {
        this.UpdateEmit.emit(result.Detail)
      }
    });
  }
  Delete(item:any): void {
    const dialogRef = this.dialog.open(DeletedialogComponent,{data:item});
    dialogRef.afterClosed().subscribe((result) => {
      if (result!="false") {
        this.DeleteEmit.emit(result.Detail)
      }
    });
  }
}
