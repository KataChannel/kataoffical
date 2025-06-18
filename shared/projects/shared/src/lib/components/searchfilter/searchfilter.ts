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
  selector: 'kata-searchfilter',
  templateUrl: './searchfilter.html',
  styleUrls: ['./searchfilter.scss'],
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
  @Input() isSingle: boolean = false; // New input for single selection mode
  @Output() OutFilter = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  searchText: string = '';
  initFilter: any[] = [];

  ngOnInit(): void {
    this.initFilter = [...this.filterItem]; // Deep copy to avoid mutating input
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  ChosenAll(): void {
    if (!this.isSingle) {
      this.ListFilter = [...this.ListItem];
      this.filterItem = [...this.initFilter];
    }
  }

  RemoveAll(): void {
    this.ListFilter = [];
    this.filterItem = [...this.initFilter];
    this.searchText = '';
  }

  CheckItem(item: any): boolean {
    return this.ListFilter?.some((v) => v.id === item.id);
  }

  doFilterItem(event: any, field: any): void {
    const value = event.target.value;
    this.searchText = value;
    if (!value) {
      this.filterItem = [...this.initFilter];
      return;
    }
    this.filterItem = this.initFilter.filter((v: any) =>
      removeVietnameseAccents(v[field]).toLowerCase().includes(value.toLowerCase()) ||
      v[field].toLowerCase().includes(value.toLowerCase())
    );
  }

  DoListFilter(): void {
    const uniqueMap = new Map();
    this.ListFilter.forEach(item => {
      const key = item[this.fieldsearch];
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    this.filterItem = Array.from(uniqueMap.values());
  }

  getChosen(): number {
    const uniqueMap = new Map();
    this.ListFilter.forEach(item => {
      const key = item[this.fieldsearch];
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    return Array.from(uniqueMap.values()).length;
  }

  ChosenItem(item: any): void {
    const value = item[this.fieldsearch];
    if (this.isSingle) {
      // Single selection mode: replace ListFilter with the selected item
      this.ListFilter = this.ListItem.filter((v: any) => v[this.fieldsearch] === value);
    } else {
      // Multi-selection mode: toggle item
      const checkItem = this.ListItem.filter((v: any) => v[this.fieldsearch] === value);
      const checkItemInFilter = this.ListFilter.filter((v: any) => v[this.fieldsearch] === value);
      if (checkItemInFilter.length > 0) {
        this.ListFilter = this.ListFilter.filter((v) => v[this.fieldsearch] !== value);
      } else {
        this.ListFilter = [...this.ListFilter, ...checkItem];
      }
    }
  }

  ApplyFilterColum(menu: any): void {
    this.OutFilter.emit(this.ListFilter);
    menu.closeMenu();
  }
}