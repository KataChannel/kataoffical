import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-dashboardblock',
  imports: [
   MatFormFieldModule,
   MatInputModule,
   FormsModule,
   CommonModule,
   MatButtonModule,
   MatIconModule,
   MatMenuModule,
   MatDatepickerModule
  ],
  templateUrl: './dashboardblock.component.html',
  styleUrls: ['./dashboardblock.component.scss'] // corrected 'styleUrl' to 'styleUrls'
})
export class DashboardblockComponent {
  @Input() title: string = 'Tiêu Đề';
  @Input() value: number = 0;
  @Input() type: string = 'value'; // 'percent' hoặc 'value'
  startDate: string = new Date().toISOString().split('T')[0]; // Ngày bắt đầu
  endDate: string = new Date().toISOString().split('T')[0]; // Ngày kết thúc
  applyDateRange(menu:any){
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    menu.closeMenu();
  }
}
