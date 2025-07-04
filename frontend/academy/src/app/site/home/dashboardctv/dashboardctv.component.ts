import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboardctv',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './dashboardctv.component.html',
  styleUrls: ['./dashboardctv.component.scss']
})

export class DashboardctvComponent {
  constructor() {}

  async ngOnInit(): Promise<void> {
 
  }
}
