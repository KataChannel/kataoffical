import { ChangeDetectionStrategy, Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Config, User } from './adminmain';
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
import { MenuService } from '../menu/menu/menu.service';
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
  ],
  templateUrl: './adminmain.component.html',
  styleUrl: './adminmain.component.scss'
})
export class AdminmainComponent {
  isFullscreen:boolean=false
  showFiller = false;
  Config:any =Config
  User:any =User
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node?.children && node?.children.length > 0,
      title: node.title,
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
  _MenuService:MenuService = inject(MenuService)
  constructor(
    private _breakpointObserver:BreakpointObserver,
    private _UsersService:UsersService,
  ) {}

  hasChild = (_: number, node: any) => node.expandable;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  async ngOnInit() {
    await this._MenuService.getAllMenu()
    this.dataSource.data = this._MenuService.ListMenu().filter((item:any)=>item.isActive==true);    
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
  ClearCache(){
    const token = localStorage.getItem('token');
    localStorage.clear();
    if (token) {
      localStorage.setItem('token', token);
    }
  }
}
