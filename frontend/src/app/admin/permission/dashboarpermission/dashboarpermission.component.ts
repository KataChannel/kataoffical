import { Component } from '@angular/core';

export interface ChartOptions {
  series: any[];
  chart: any;
  xaxis?: any;
  yaxis?: any;
  colors?: string[];
  [key: string]: any;
}

@Component({
  selector: 'app-dashboarpermission',
  imports: [],
  templateUrl: './dashboarpermission.component.html',
  styleUrl: './dashboarpermission.component.scss'
})
export class DashboarpermissionComponent {
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
