
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'kata-combobox',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class KataComboboxComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() displayField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() placeholder: string = 'Select an item';
  @Output() selectionChange = new EventEmitter<any>();

  filteredItems: any[] = [];
  searchTerm: string = '';
  isOpen: boolean = false;
  selectedItem: any = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredItems = [...this.items];
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  filterItems(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     console.log(`Filter value: ${filterValue}`);

    if (!filterValue) {
      this.filteredItems = [...this.items];
      return;
    }
    this.filteredItems = this.items.filter(item =>
      item[this.displayField].toLowerCase().includes(filterValue.toLowerCase())
    );
    console.log(`Filtered items: ${JSON.stringify(this.filteredItems)}`);
    console.log(`Filtered items: ${filterValue}`);

  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.searchTerm = item[this.displayField];
    this.isOpen = false;
    this.selectionChange.emit(item);
  }

  clearSelection() {
    this.selectedItem = null;
    this.searchTerm = '';
    this.filteredItems = [...this.items];
    this.selectionChange.emit(null);
  }
}