import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Config, folders, notes, TREE_DATA, User } from './adminmain';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UsersService } from './listuser/listuser.services';
import { ConversationComponent } from '../../shared/common/conversation/conversation.component';
@Component({
  selector: 'app-adminmain',
  imports: [
    MatTreeModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    // ConversationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './adminmain.component.html',
  styleUrl: './adminmain.component.scss'
})
export class AdminmainComponent {
  isFullscreen:boolean=false
  showFiller = false;
  Config:any =Config
  User:any =User

  folders: any[] =  folders
  notes: any[] = notes

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      name: node.name,
      level: level,
      node:node,
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
  constructor(
    private _breakpointObserver:BreakpointObserver,
    private _UsersService:UsersService,
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: any) => node.expandable;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  async ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    });
  }
  logout() {    
    this._UsersService.Dangxuat().subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          location.reload();
        }, 0);
      }
    });
  }
}
