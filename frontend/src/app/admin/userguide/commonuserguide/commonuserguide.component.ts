import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
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
    }
    ImageURL = environment.ImageURL;
}
