import { Component, inject } from '@angular/core';
import { StorageService } from '../../shared/utils/storage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-lienheadmin',
  imports: [],
  templateUrl: './lienheadmin.component.html',
  styleUrl: './lienheadmin.component.scss'
})
export class LienheadminComponent {
  private _StorageService:StorageService = inject(StorageService);
  private _route:Router = inject(Router);

  constructor() { 
    
  }
  ngOnInit(): void {
   const permission = this._StorageService.getItem('permissions');
   console.log(JSON.parse(permission));
   const target = JSON.parse(permission)[0]
   console.log(target);
    if(target !==null ){
      this._route.navigate(['admin/', target.split('.')[0]]);
      
    }
}
}
