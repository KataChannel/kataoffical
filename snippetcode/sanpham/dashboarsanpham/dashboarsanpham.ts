import { Component } from '@angular/core';
import { DashboardblockComponent } from '../../../shared/common/chart/dashboardblock/dashboardblock';
import { ChartOptions, RevenuechartComponent } from '../../../shared/common/chart/revenuechart/revenuechart';

@Component({
  selector: 'app-dashboarsanpham',
  imports: [
    DashboardblockComponent,
    RevenuechartComponent
  ],
  templateUrl: './dashboarsanpham.html',
  styleUrl: './dashboarsanpham.scss'
})
export class DashboarsanphamComponent {
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