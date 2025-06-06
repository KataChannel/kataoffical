import { Component } from '@angular/core';
import { DashboardblockComponent } from '../../dashboard/dashboardblock/dashboardblock.component';
import { ChartOptions, RevenuechartComponent } from '../../dashboard/revenuechart/revenuechart.component';

@Component({
  selector: 'app-dashboarkhachhang',
  imports: [
    DashboardblockComponent,
    RevenuechartComponent
  ],
  templateUrl: './dashboarkhachhang.component.html',
  styleUrl: './dashboarkhachhang.component.scss'
})
export class DashboarkhachhangComponent {
  public sampleAreaChartOptions2!: ChartOptions;
  public sampleAreaChartOptions!: ChartOptions;
  public sampleCategories!: string[];
  constructor() {

  }
  generateRandomData(count: number, min = 10, max = 100): number[] {
    const data: number[] = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }
}