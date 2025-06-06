
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
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
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule
],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchfilterComponent {
  @Input() ListItem: any[] = [];
  @Input() filterItem: any[] = [];
  @Input() ListFilter: any[] = [];
  @Input() CountItems: any = 0;
  @Input() icon: any = '';
  @Input() title: any = 'Items';
  @Input() fieldsearch: any = 'title';
  @Input() isEdit = signal(false);
  @Input() isDelete = signal(false);
  @Output() OutFilter = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  searchText: string = '';
  initFilter: any[] = [];
  ngOnInit(): void {
      this.initFilter = this.filterItem;
    // console.log('ListItem', this.ListItem);   
    // console.log('filterItem', this.filterItem);   
    // console.log('ListFilter', this.ListFilter);   
    // console.log('fieldsearch', this.fieldsearch);   
    
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  ChosenAll()
  {
    this.ListFilter =this.ListItem
    this.filterItem = this.initFilter
  }
  RemoveAll()
  {
    this.ListFilter = [];
    this.searchText = '';
    // this.filterItem = this.ListItem
  }
  CheckItem(item:any)
  {
    return this.ListFilter?.find((v)=>v.id===item.id)?true:false;
  }
  doFilterItem(event: any,field:any): void {
      const value = event.target.value;
      this.searchText = value;
      if (!value) {
        this.filterItem = this.initFilter
        return;
      }
      this.filterItem = this.initFilter.filter((v:any) => 
      removeVietnameseAccents(v[field]).includes(value.toLowerCase())
      ||v[field].toLowerCase().includes(value.toLowerCase()));

  }
  DoListFilter()
  {
    this.filterItem = this.ListFilter
  }
  ChosenItem(item:any)
  {
    // console.log('filterItem', this.filterItem);
    console.log('ListFilter', this.ListFilter);
    const value = item[this.fieldsearch]
    // this.ListFilter = this.ListItem?.filter((v:any)=>v[this.fieldsearch]===value);
    
    
    const CheckItem = this.ListItem.filter((v:any)=>v[this.fieldsearch]===value);
    const CheckItem1 = this.ListFilter.filter((v:any)=>v[this.fieldsearch]===value);
    if(CheckItem1.length>0)
    {
      this.ListFilter = this.ListFilter?.filter((v) => v[this.fieldsearch] !== value);
    }
    else{
      this.ListFilter = [...this.ListFilter,...CheckItem];
    }
    // console.log('item', item);
    // console.log('fieldsearch', this.fieldsearch);
    // // console.log('Checkfield', value);
    console.log('CheckItem', CheckItem);
    console.log('CheckItem1', CheckItem1);
    console.log('ListFilter', this.ListFilter);
    
  }

  ApplyFilterColum(menu: any) {  
    this.OutFilter.emit(this.ListFilter);
    menu.closeMenu();
  }
}
