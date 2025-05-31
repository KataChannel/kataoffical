import { Component } from '@angular/core';
import { ListDanhmuc } from '../namno';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-danhmuc',
  imports: [CommonModule],
  templateUrl: './danhmuc.component.html',
  styleUrl: './danhmuc.component.scss'
})
export class DanhmucComponent {
    ListDanhmuc: any[] = ListDanhmuc;
    ngOnInit(): void {
      console.log('ListDanhmuc', this.ListDanhmuc);
      
    }
}
