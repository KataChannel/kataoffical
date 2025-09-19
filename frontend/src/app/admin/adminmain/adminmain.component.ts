import { ChangeDetectionStrategy, Component, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Config, User } from './adminmain';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuService } from '../menu/menu/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreemenuComponent } from '../../shared/common/treemenu/treemenu.component';
import { UserService } from '../user/user.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { StorageService } from '../../shared/utils/storage.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { removeVietnameseAccents } from '../../shared/utils/texttransfer.utils';
import { CommonuserguideComponent } from '../userguide/commonuserguide/commonuserguide.component';
import { UserguideService } from '../userguide/userguide.service';
import { MatDialog } from '@angular/material/dialog';
import { AdvancedSearchDialogComponent } from '../../components/advanced-search-dialog/advanced-search-dialog.component';
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
    // RouterLinkActive,
    TreemenuComponent,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    CommonuserguideComponent,
  ],
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.scss']
})
export class AdminmainComponent {
  isFullscreen:boolean=false
  showFiller = false;
  Config:any =Config
  User:any ={}
  isQuytrinh:any=false
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
    private _UserService:UserService,
    private _ErrorLogService:ErrorLogService,
  ) {}

  hasChild = (_: number, node: any) => node.expandable;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  _snackBar:MatSnackBar = inject(MatSnackBar)
  _StorageService:StorageService = inject(StorageService)
  _UserguideService:UserguideService = inject(UserguideService)
  private dialog = inject(MatDialog)
  ListMenu:any[] = []
  FilterListMenu:any[] = []
  DetailUserguide:any = signal<any>({});
  async ngOnInit() {
    await this._UserService.getProfile().then(async (res: any) => {
      if(res){
        this.User = res;  
        const permissions = this.User?.permissions?.map((v:any)=>v.name);     
        await this._MenuService.getTreeMenu(permissions)
        this.ListMenu = this.FilterListMenu = this._MenuService.ListMenu()    
        this.dataSource.data = this._MenuService.ListMenu()
      } 
    });
    await this._UserguideService.getUserguideBy({codeId:'I100001'})
    this.DetailUserguide = this._UserguideService.DetailUserguide
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
    this._UserService.logout().then((res: any) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
  searchFunction(event: any) {
    console.log(event.target.value,"ạhdkjsahdjkash");
    
    this.FilterListMenu = this.ListMenu.filter((item: any) => {
      return removeVietnameseAccents(item.title).toLowerCase().includes(event.target.value.toLowerCase()) 
      || item.title.toLowerCase().includes(event.target.value.toLowerCase())
      || item?.children?.some((child: any) => 
        removeVietnameseAccents(child.title).toLowerCase().includes(event.target.value.toLowerCase())
      || child.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    })  
  }
  async ClearCache(): Promise<void> {
    const token = this._StorageService.getItem('token');
    const permissions = this._StorageService.getItem('permissions');
    this._StorageService.deleteAllIndexedDBs()
    this._StorageService.clear()
    if (token) {
      this._StorageService.setItem('token', token);
    }
    if (permissions) {
      this._StorageService.setItem('permissions', permissions);
    }
    await this._ErrorLogService.ClearRedisCache()
    this._snackBar.open('Xóa Cache Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(AdvancedSearchDialogComponent, {
      width: '90vw',
      maxWidth: '90vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'advanced-search-dialog-container',
      data: {
        initialKeyword: '' // Có thể truyền keyword từ input nếu có
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Search dialog closed with result:', result);
      }
    });
  }
  events = [
    { date: '2025-01-01', title: 'Project Start', description: 'Initiated the project with team.', icon: 'fa-circle' },
    { date: '2025-03-01', title: 'Milestone 1', description: 'Completed first phase.', icon: 'fa-check' },
    { date: '2025-06-01', title: 'Milestone 2', description: 'Launched beta version.', icon: 'fa-rocket' },
  ];
}
