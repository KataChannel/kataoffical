import { Component, effect, inject } from '@angular/core';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { UserService } from '../../../../admin/user/user.service';

@Component({
  selector: 'app-luottruycap',
  imports: [],
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
