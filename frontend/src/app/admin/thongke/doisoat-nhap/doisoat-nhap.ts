import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DathangService } from '../../dathang/dathang.service';
import { ChotkhoService } from '../../chotkho/chotkho.service';

@Component({
  selector: 'app-doisoat-nhap',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule
  ],
  templateUrl: './doisoat-nhap.html',
})
export class DoisoatNhapComponent implements OnInit {
  private _dathangService = inject(DathangService);
  private _chotkhoService = inject(ChotkhoService);

  warehouses = signal<any[]>([]);
  filters = signal({
    Batdau: new Date(new Date().setDate(new Date().getDate() - 7)),
    Ketthuc: new Date(),
    khoId: ''
  });

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['ngaynhan', 'madncc', 'nhacungcap', 'sanpham', 'slgiao', 'slnhan', 'chenhlech', 'status'];

  async ngOnInit() {
    const warehouses = await this._chotkhoService.getAllWarehouses();
    this.warehouses.set(warehouses);
    this.loadData();
  }

  async loadData() {
    const params = {
      Batdau: this.filters().Batdau,
      Ketthuc: this.filters().Ketthuc,
      khoId: this.filters().khoId,
      pageSize: 200,
      pageNumber: 1
    };

    const result = await this._dathangService.searchDathang(params);
    if (result && result.data) {
      const flattenedData: any[] = [];
      result.data.forEach((dh: any) => {
        dh.sanpham.forEach((sp: any) => {
          flattenedData.push({
            ngaynhan: dh.ngaynhan,
            madncc: dh.madncc,
            nhacungcap: dh.nhacungcap?.name,
            sanpham: sp.sanpham?.title || sp.title,
            slgiao: sp.slgiao || 0,
            slnhan: sp.slnhan || 0,
            chenhlech: (sp.slgiao || 0) - (sp.slnhan || 0),
            status: dh.status
          });
        });
      });
      this.dataSource.data = flattenedData;
    }
  }

  getStatusLabel(status: string): string {
    const map: any = {
      'dadat': 'Đã đặt',
      'dagiao': 'Đã giao',
      'dahoanthanh': 'Hoàn thành',
      'dahuy': 'Đã hủy'
    };
    return map[status] || status;
  }
}
