import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-commonuserguide',
  imports: [
    CommonModule
  ],
  templateUrl: './commonuserguide.component.html',
  styleUrls: ['./commonuserguide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonuserguideComponent {
    @Input() Detail: any;
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      console.log(this.Detail);
    }
}
