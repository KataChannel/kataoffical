import { Component } from '@angular/core';
import { DashboardblockComponent } from '../../../../shared/common/chart/dashboardblock/dashboardblock.component';
import { ChartOptions, RevenuechartComponent } from '../../../../shared/common/chart/revenuechart/revenuechart.component';

@Component({
  selector: 'app-dashboarnhacungcap',
  imports: [
    DashboardblockComponent,
    RevenuechartComponent
  ],
  templateUrl: './dashboarnhacungcap.component.html',
  styleUrl: './dashboarnhacungcap.component.scss'
})
export class DashboarnhacungcapComponent {
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