import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListuserComponent } from '../listuser.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Forms, ListUser } from '../listuser';

@Component({
  selector: 'app-detailuser',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './detailuser.component.html',
  styleUrl: './detailuser.component.scss'
})
export class DetailUserComponent {
  _ListuserComponent:ListuserComponent = inject(ListuserComponent)
  _router:ActivatedRoute = inject(ActivatedRoute)
  constructor(){}
  Detail:any={Data:{},Forms:[]}
  isEdit:boolean=false
  isDelete:boolean=false
  idUser:any
  ngOnInit(): void {
    this._router.paramMap.subscribe(async (data: any) => {
      this.idUser = data.get('id')
      this.Detail.Forms = Forms;
      this.isEdit = this.idUser === '0';   
      if (this.idUser) {
        this._ListuserComponent.drawer.open();     
        this.Detail.Data = ListUser.find((v: any) => v.id === this.idUser) || {};
      } else {
        this.Detail.Data = {};
      }
    });
    
    
  }
  SaveData()
  {
    if(this.idUser=='0')
    {
      ListUser.push(this.Detail.Data)
    }
    else
    {
      ListUser[this.idUser]=this.Detail.Data
    }
    this.isEdit=false
    
  }
}
