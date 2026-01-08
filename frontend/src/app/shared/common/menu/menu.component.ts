import { Component, Input } from '@angular/core';
import { ListMenus } from '../../mockdata/menu';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() Menus: any[] = [];
  constructor() {
    console.log('Menus', this.Menus);
  }
}
