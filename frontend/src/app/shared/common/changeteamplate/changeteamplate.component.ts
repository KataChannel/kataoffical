import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '../../utils/storage.service';

@Component({
  selector: 'app-changeteamplate',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule
],
  templateUrl: './changeteamplate.component.html',
  styleUrl: './changeteamplate.component.scss'
})
export class ChangeteamplateComponent {
  constructor(
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  teamplate:any=1
  ListTeamplate:any[]=[
    {id:1,Title:"Teamplate 1"},
    {id:2,Title:"Teamplate 2"},
    {id:3,Title:"Teamplate 3"},
  ]
  ngOnInit(): void {
    this.teamplate = this.storageService.getItem('teamplate');
    console.log(this.teamplate);
  }
  ChangeTeamplate(item:any)
  {
      this.storageService.setItem('teamplate', item.id);
      if (isPlatformBrowser(this.platformId)) {
        window.location.reload();
      }
  }
}
