import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { Debounce } from '../../../shared/utils/decorators';

@Component({
  selector: 'kata-toolbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() EditList: any[] = [];
  @Output() applyFilterEvent = new EventEmitter<Event>();
  @Output() createEvent = new EventEmitter<void>();
  @Output() openDeleteDialogEvent = new EventEmitter<any>();

  @Debounce(500)
  applyFilter(event: Event) {
    this.applyFilterEvent.emit(event);
  }
}