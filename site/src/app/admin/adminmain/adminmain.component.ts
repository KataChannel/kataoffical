import { ChangeDetectionStrategy, Component, effect, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Config, User } from './adminmain';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuService } from '../menu/menu/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreemenuComponent } from '../../shared/common/treemenu/treemenu.component';
import { UserService } from '../user/user.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { StorageService } from '../../shared/utils/storage.service';
import { SettingService } from '../setting/setting.service';
@Component({
  selector: 'app-adminmain',
  imports: [
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
    TreemenuComponent,
  ],
  templateUrl: './adminmain.component.html',
  styleUrl: './adminmain.component.scss'
})
export class AdminmainComponent {
  isFullscreen:boolean=false
  showFiller = false;
  isShowBottomBar:boolean = false;
  Config:any =Config
  User:any ={}
  version:any= 'v1.0.0'
  logoImage:string = ''
  _MenuService:MenuService = inject(MenuService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('drawer1', { static: true }) drawer1!: MatDrawer;
  _snackBar:MatSnackBar = inject(MatSnackBar)
  _StorageService:StorageService = inject(StorageService)
  _SettingService:SettingService = inject(SettingService)
  ListMenu:any[] = []
  websiteconfig  = this._SettingService.DetailSetting
  constructor(
    private _breakpointObserver:BreakpointObserver,
    private _UserService:UserService,
    private _ErrorLogService:ErrorLogService,
  ) {
    effect(async () => {
       await this._SettingService.getSettingBy({ key: 'websiteconfig',isOne:true })
      });
  }
  async ngOnInit() {
    await this._SettingService.getSettingBy({ key: 'websiteconfig',isOne:true })    
    await this._UserService.getProfile().then(async (res: any) => {
      if(res){
        this.User = res;  
        const permissions = this.User?.permissions?.map((v:any)=>v.name); 
        const params = {permissions:permissions}   
        await this._MenuService.getTreeMenu(params)
        this.ListMenu = this._MenuService.ListMenu()    
      } 
    });
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
  async ClearCache(): Promise<void> {
    const token = this._StorageService.getItem('token');
    const permissions = this._StorageService.getItem('permissions');
    this._StorageService.clearAllIndexedDB()
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
}
