import { Component, OnInit } from '@angular/core';
import { ListDanhmuc, ListSanpham } from '../namno';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sanpham',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss']
})
export class SanphamComponent implements OnInit {
    ListSanpham: any[] = ListSanpham;
    ListDanhmuc: any[] = ListDanhmuc;
    ngOnInit(): void {
      console.log('ListSanpham', this.ListSanpham);
      console.log('ListDanhmuc', this.ListDanhmuc);
    }
    getListSanpham(item:any){
      return this.ListSanpham.filter(sp => sp.danhmuc === item.id);
    }
}
