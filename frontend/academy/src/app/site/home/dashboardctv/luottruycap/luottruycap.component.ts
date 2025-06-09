import { Component, effect, inject } from '@angular/core';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-luottruycap',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './luottruycap.component.html',
  styleUrl: './luottruycap.component.scss'
})
export class LuottruycapComponent {
  _TrackingService:TrackingService = inject(TrackingService);
  _UserService:UserService = inject(UserService);
  profile = this._UserService.profile;
  ListTracking = this._TrackingService.ListTracking;
  constructor() {
    effect(async () => {
       await this._UserService.getProfile();
       await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'page_view'});
    });
  }
  async ngOnInit(): Promise<void> {
    await this._TrackingService.getTrackingBy({refCode: this.profile().phone,eventType:'page_view'});
  }
}
