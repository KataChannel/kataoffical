import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../admin/user/user.service';
import { LandingpageService } from '../../../admin/landingpage/landingpage.service';
  
  @Component({
    selector: 'app-ladictv',
    imports: [
      CommonModule, 
      FormsModule, 
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule
    ], // Import các module cần thiết vào đây 
    templateUrl: './ladictv.component.html',
    styleUrls: ['./ladictv.component.scss'],
  })
  export class LadictvComponent implements OnInit {
    _UserService:UserService = inject(UserService);
    _LandingpageService:LandingpageService = inject(LandingpageService);
    Listladipage = signal<any[]>([]);
    Filerladi:any=[];
    profile:any = signal<any>({});
    constructor() {
        effect(async() => {
         await this._LandingpageService.getAllLandingpage()
         this.Listladipage = this._LandingpageService.ListLandingpage;
         this.Filerladi = [...this.Listladipage()];         
        })
    }
    ngOnInit(): void {
      this._UserService.getProfile().then(data => {
        if(data){
          this.profile.set(data);
        }
      });
    }
  
  
  
    applyFilters(event:any): void {      
      const query = (event.target as HTMLInputElement).value;
      this.Filerladi = this.Listladipage().filter(item => item.title.toLowerCase().includes(query));
    }
  
  } 