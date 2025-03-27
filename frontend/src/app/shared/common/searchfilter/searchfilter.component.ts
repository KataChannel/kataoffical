import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { removeVietnameseAccents } from "../../utils/texttransfer.utils";
@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
  ],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchfilterComponent {
  @Input() ListItem: any[] = [];
  @Input() filterItem: any[] = [];
  @Input() ListFilter: any[] = [];
  @Input() CountItems: any = 0;
  @Input() title: any = 'Items';
  @Input() fieldsearch: any = 'title';
  @Input() isEdit = signal(false);
  @Input() isDelete = signal(false);
  @Output() OutFilter = new EventEmitter<any>();
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  ChosenAll()
  {
    this.ListFilter =this.ListItem
  }
  RemoveAll()
  {
    this.ListFilter = [];
    this.filterItem = this.ListItem
  }
  doFilterItem(event: any,field:any): void {
      const value = event.target.value;
      this.filterItem = this.ListItem.filter((v) => 
      removeVietnameseAccents(v[field]).includes(value.toLowerCase())
      ||v[field].toLowerCase().includes(value.toLowerCase())
    );
  }
  DoListFilter()
  {
    this.filterItem = this.ListFilter
  }
  ChosenItem(item:any)
  {
    const CheckItem = this.filterItem.filter((v:any)=>v.id===item.id);
    const CheckItem1 = this.ListFilter.filter((v:any)=>v.id===item.id);
    if(CheckItem1.length>0)
    {
      this.ListFilter = this.ListFilter?.filter((v) => v.id !== item.id);
    }
    else{
      this.ListFilter = [...this.ListFilter,...CheckItem];
    }
  }
  CheckItem(item:any)
  {
    return this.ListFilter?.find((v)=>v.id===item.id)?true:false;
  }
  ApplyFilterColum(menu: any) {   
    this.OutFilter.emit(this.ListFilter);
    menu.closeMenu();
  }
}
