import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { UiPanelComponent } from './components/ui-panel/ui-panel.component';

@Component({
  selector: 'app-root',
  imports: [
    GameBoardComponent,
    UiPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'temp';
}
