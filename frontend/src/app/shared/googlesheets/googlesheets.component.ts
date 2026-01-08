import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../environments/environment.development';
import { ConvertDriveData } from '../utils/shared.utils';
import { StorageService } from '../utils/storage.service';
import { GoogleSheetService } from './googlesheets.service';

@Component({
  selector: 'app-googlesheets',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './googlesheets.component.html',
  styleUrl: './googlesheets.component.scss'
})
export class GooglesheetsComponent {
  DriveInfo:any={
    ApiKey:environment.GSApiKey||'',
    IdSheet:'12Mjlh55kVxdX_12bgITi-zHDsa8EO9Puc6bSOkleIjg',
    SheetName:'ListSheets'
  }
  ListSheets:any[]=[];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  _GoogleSheetService:GoogleSheetService=inject(GoogleSheetService)
  _StorageService:StorageService=inject(StorageService)
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ListSheets = JSON.parse(localStorage.getItem('ListSheets') || '[]');
    }
  }
  async GetDrive()
    {
      const result = await this._GoogleSheetService.getDrive(this.DriveInfo);   
      console.log(result);  
      if(result.values.length>0)
      {
        this.ListSheets = ConvertDriveData(result.values)
        this._StorageService.setItem('ListSheets',this.ListSheets)
        this.ngOnInit()   
      }
      
  }
  RemoveDrive()
  {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('ListSheets');
    }
    this.ListSheets = [];
  }
}
