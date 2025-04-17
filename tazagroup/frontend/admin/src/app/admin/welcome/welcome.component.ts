import { Component, effect, inject } from '@angular/core';
import { UserService } from '../../admin/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-welcome',
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private _UserService: UserService = inject(UserService);
  Profile: any = this._UserService.profile;
  constructor() {
    effect(async () => {
      await this._UserService.getProfile();
      this.Profile = this._UserService.profile;
    });
  }
}
