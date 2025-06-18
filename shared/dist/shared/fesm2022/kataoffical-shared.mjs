import * as i0 from '@angular/core';
import { Injectable, Component, signal, EventEmitter, ViewChild, Output, Input, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { __decorate } from 'tslib';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import * as i3$1 from '@angular/material/sort';
import { MatSortModule, MatSort } from '@angular/material/sort';
import * as i2$1 from '@angular/material/table';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i6 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i7 from '@angular/material/menu';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i8 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i9 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i2$2 from '@angular/material/dialog';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i1$2 from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

class SharedService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SharedService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SharedService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SharedService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class SharedComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SharedComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: SharedComponent, isStandalone: true, selector: "kata-shared", ngImport: i0, template: `
    <p>
      shared works!
    </p>
  `, isInline: true, styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SharedComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-shared', imports: [], template: `
    <p>
      shared works!
    </p>
  ` }]
        }] });

function removeVietnameseAccents(text) {
    if (!text) {
        return ""; // Xử lý trường hợp đầu vào rỗng hoặc null
    }
    return text
        .replace(/đ/g, "d")
        .normalize("NFD") // Chuẩn hóa chuỗi về dạng NFD để tách dấu
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
        .replace(/[^a-zA-Z0-9]/g, "") // Loại bỏ tất cả ký tự không phải chữ cái hoặc số
        .toLowerCase(); // Chuyển đổi thành chữ thường
}
function toSnakeCase(text) {
    return removeVietnameseAccents(text)
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\W+/g, "_")
        .toLowerCase();
}
function toKebabCase(text) {
    return removeVietnameseAccents(text)
        .replace(/\s+/g, "-")
        .toLowerCase();
}

class SearchfilterComponent {
    ListItem = [];
    filterItem = [];
    ListFilter = [];
    CountItems = 0;
    icon = '';
    title = 'Items';
    fieldsearch = 'title';
    isEdit = signal(false);
    isDelete = signal(false);
    isSingle = false; // New input for single selection mode
    OutFilter = new EventEmitter();
    menuTrigger;
    searchText = '';
    initFilter = [];
    ngOnInit() {
        this.initFilter = [...this.filterItem]; // Deep copy to avoid mutating input
    }
    trackByFn(index, item) {
        return item.id;
    }
    ChosenAll() {
        if (!this.isSingle) {
            this.ListFilter = [...this.ListItem];
            this.filterItem = [...this.initFilter];
        }
    }
    RemoveAll() {
        this.ListFilter = [];
        this.filterItem = [...this.initFilter];
        this.searchText = '';
    }
    CheckItem(item) {
        return this.ListFilter?.some((v) => v.id === item.id);
    }
    doFilterItem(event, field) {
        const value = event.target.value;
        this.searchText = value;
        if (!value) {
            this.filterItem = [...this.initFilter];
            return;
        }
        this.filterItem = this.initFilter.filter((v) => removeVietnameseAccents(v[field]).toLowerCase().includes(value.toLowerCase()) ||
            v[field].toLowerCase().includes(value.toLowerCase()));
    }
    DoListFilter() {
        const uniqueMap = new Map();
        this.ListFilter.forEach(item => {
            const key = item[this.fieldsearch];
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            }
        });
        this.filterItem = Array.from(uniqueMap.values());
    }
    getChosen() {
        const uniqueMap = new Map();
        this.ListFilter.forEach(item => {
            const key = item[this.fieldsearch];
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            }
        });
        return Array.from(uniqueMap.values()).length;
    }
    ChosenItem(item) {
        const value = item[this.fieldsearch];
        if (this.isSingle) {
            // Single selection mode: replace ListFilter with the selected item
            this.ListFilter = this.ListItem.filter((v) => v[this.fieldsearch] === value);
        }
        else {
            // Multi-selection mode: toggle item
            const checkItem = this.ListItem.filter((v) => v[this.fieldsearch] === value);
            const checkItemInFilter = this.ListFilter.filter((v) => v[this.fieldsearch] === value);
            if (checkItemInFilter.length > 0) {
                this.ListFilter = this.ListFilter.filter((v) => v[this.fieldsearch] !== value);
            }
            else {
                this.ListFilter = [...this.ListFilter, ...checkItem];
            }
        }
    }
    ApplyFilterColum(menu) {
        this.OutFilter.emit(this.ListFilter);
        menu.closeMenu();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SearchfilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.7", type: SearchfilterComponent, isStandalone: true, selector: "kata-searchfilter", inputs: { ListItem: "ListItem", filterItem: "filterItem", ListFilter: "ListFilter", CountItems: "CountItems", icon: "icon", title: "title", fieldsearch: "fieldsearch", isEdit: "isEdit", isDelete: "isDelete", isSingle: "isSingle" }, outputs: { OutFilter: "OutFilter" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: MatMenuTrigger, descendants: true }], ngImport: i0, template: "@if (!icon) {\n  <button mat-flat-button color=\"primary\" [disabled]=\"!isEdit()\" [matMenuTriggerFor]=\"menu\" #menuTrigger=\"matMenuTrigger\">\n    {{CountItems}} {{title}}\n  </button>\n}\n@if (icon) {\n  <button mat-icon-button color=\"primary\" [matMenuTriggerFor]=\"menu\" #menuTrigger=\"matMenuTrigger\">\n    <mat-icon>{{icon}}</mat-icon>\n  </button>\n}\n<mat-menu #menu=\"matMenu\">\n  <div (click)=\"$event.stopPropagation()\" class=\"cursor-pointer flex flex-col space-y-4 p-3\">\n    <div class=\"relative w-full\">\n      <input type=\"text\" [(ngModel)]=\"searchText\"\n        placeholder=\"T\u00ECm Ki\u1EBFm...\" (keyup)=\"doFilterItem($event, fieldsearch)\"\n        class=\"block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40\">\n        <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n          <span class=\"material-symbols-outlined text-gray-500\">search</span>\n        </div>\n      </div>\n      <div class=\"flex flex-row space-x-2 items-center justify-between\">\n        <div class=\"flex flex-row space-x-2 items-center\">\n          @if (!isSingle) {\n            <span class=\"text-xs text-blue-600 underline\" (click)=\"ChosenAll()\">Ch\u1ECDn T\u1EA5t C\u1EA3</span>\n          }\n          <span class=\"text-xs text-blue-600 underline\" (click)=\"RemoveAll()\">Xo\u00E1</span>\n        </div>\n        <span class=\"text-xs text-blue-600 underline\" (click)=\"DoListFilter()\">{{getChosen()}} \u0110ang ch\u1ECDn</span>\n      </div>\n      <div class=\"w-full flex flex-col space-y-2 max-h-44 overflow-auto\">\n        @for (item of filterItem; track trackByFn($index, item)) {\n          <div (click)=\"ChosenItem(item)\" class=\"flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100\">\n            @if (CheckItem(item)) {\n              <span class=\"material-symbols-outlined text-blue-600\">check</span>\n            }\n            {{item[fieldsearch] || '(Tr\u1ED1ng)'}}\n          </div>\n        }\n      </div>\n      <div class=\"flex flex-row space-x-2 items-end justify-end\">\n        <button mat-flat-button color=\"warn\" (click)=\"menuTrigger.closeMenu()\">\u0110\u00F3ng</button>\n        <button mat-flat-button color=\"primary\" (click)=\"ApplyFilterColum(menuTrigger)\">\u00C1p D\u1EE5ng</button>\n      </div>\n    </div>\n  </mat-menu>", styles: [""], dependencies: [{ kind: "ngmodule", type: MatFormFieldModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "ngmodule", type: MatSelectModule }, { kind: "ngmodule", type: MatDialogModule }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "ngmodule", type: MatDatepickerModule }, { kind: "ngmodule", type: MatSortModule }, { kind: "ngmodule", type: MatPaginatorModule }, { kind: "ngmodule", type: MatTableModule }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i7.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "directive", type: i7.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: SearchfilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-searchfilter', imports: [
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
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!icon) {\n  <button mat-flat-button color=\"primary\" [disabled]=\"!isEdit()\" [matMenuTriggerFor]=\"menu\" #menuTrigger=\"matMenuTrigger\">\n    {{CountItems}} {{title}}\n  </button>\n}\n@if (icon) {\n  <button mat-icon-button color=\"primary\" [matMenuTriggerFor]=\"menu\" #menuTrigger=\"matMenuTrigger\">\n    <mat-icon>{{icon}}</mat-icon>\n  </button>\n}\n<mat-menu #menu=\"matMenu\">\n  <div (click)=\"$event.stopPropagation()\" class=\"cursor-pointer flex flex-col space-y-4 p-3\">\n    <div class=\"relative w-full\">\n      <input type=\"text\" [(ngModel)]=\"searchText\"\n        placeholder=\"T\u00ECm Ki\u1EBFm...\" (keyup)=\"doFilterItem($event, fieldsearch)\"\n        class=\"block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40\">\n        <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n          <span class=\"material-symbols-outlined text-gray-500\">search</span>\n        </div>\n      </div>\n      <div class=\"flex flex-row space-x-2 items-center justify-between\">\n        <div class=\"flex flex-row space-x-2 items-center\">\n          @if (!isSingle) {\n            <span class=\"text-xs text-blue-600 underline\" (click)=\"ChosenAll()\">Ch\u1ECDn T\u1EA5t C\u1EA3</span>\n          }\n          <span class=\"text-xs text-blue-600 underline\" (click)=\"RemoveAll()\">Xo\u00E1</span>\n        </div>\n        <span class=\"text-xs text-blue-600 underline\" (click)=\"DoListFilter()\">{{getChosen()}} \u0110ang ch\u1ECDn</span>\n      </div>\n      <div class=\"w-full flex flex-col space-y-2 max-h-44 overflow-auto\">\n        @for (item of filterItem; track trackByFn($index, item)) {\n          <div (click)=\"ChosenItem(item)\" class=\"flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100\">\n            @if (CheckItem(item)) {\n              <span class=\"material-symbols-outlined text-blue-600\">check</span>\n            }\n            {{item[fieldsearch] || '(Tr\u1ED1ng)'}}\n          </div>\n        }\n      </div>\n      <div class=\"flex flex-row space-x-2 items-end justify-end\">\n        <button mat-flat-button color=\"warn\" (click)=\"menuTrigger.closeMenu()\">\u0110\u00F3ng</button>\n        <button mat-flat-button color=\"primary\" (click)=\"ApplyFilterColum(menuTrigger)\">\u00C1p D\u1EE5ng</button>\n      </div>\n    </div>\n  </mat-menu>" }]
        }], propDecorators: { ListItem: [{
                type: Input
            }], filterItem: [{
                type: Input
            }], ListFilter: [{
                type: Input
            }], CountItems: [{
                type: Input
            }], icon: [{
                type: Input
            }], title: [{
                type: Input
            }], fieldsearch: [{
                type: Input
            }], isEdit: [{
                type: Input
            }], isDelete: [{
                type: Input
            }], isSingle: [{
                type: Input
            }], OutFilter: [{
                type: Output
            }], menuTrigger: [{
                type: ViewChild,
                args: [MatMenuTrigger]
            }] } });

function memoize() {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const cache = new Map();
        descriptor.value = function (...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            return result;
        };
        return descriptor;
    };
}
function Debounce(delay = 300) {
    return function (_target, _propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        let timeoutId;
        descriptor.value = function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                originalMethod.apply(this, args);
            }, delay);
        };
        return descriptor;
    };
}

class TableComponent {
    dataSource = new MatTableDataSource([]);
    displayedColumns = [];
    ColumnName = {};
    FilterColumns = [];
    Columns = [];
    ListFilter = [];
    EditList = [];
    columnsToShowLength = [];
    columnsToShowNestedObject = {};
    columnsToLoopArrayObject = [];
    toggleColumnEvent = new EventEmitter();
    filterColumnsEvent = new EventEmitter();
    updateDisplayedColumnsEvent = new EventEmitter();
    outFilterEvent = new EventEmitter();
    addToEditEvent = new EventEmitter();
    goToDetailEvent = new EventEmitter();
    paginator;
    sort;
    FilterHeaderColumn(list, column) {
        const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
        return uniqueList;
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    toggleColumn(item) {
        this.toggleColumnEvent.emit(item);
    }
    doFilterColumns(event) {
        this.filterColumnsEvent.emit(event);
    }
    updateDisplayedColumns() {
        this.updateDisplayedColumnsEvent.emit();
    }
    onOutFilter(event) {
        this.outFilterEvent.emit(event);
    }
    addToEdit(item) {
        this.addToEditEvent.emit(item);
    }
    goToDetail(item) {
        this.goToDetailEvent.emit(item);
    }
    checkSelect(item) {
        return this.EditList.some((v) => v.id === item.id);
    }
    checkItemInEdit(item) {
        return this.EditList.some((v) => v.id === item.id);
    }
    trackByFn(index, item) {
        return item.id;
    }
    isArray(value) {
        return Array.isArray(value);
    }
    isObject(value) {
        return typeof value === 'object' && value !== null && !this.isArray(value);
    }
    shouldShowLength(column) {
        return this.columnsToShowLength.includes(column);
    }
    shouldShowNestedObject(column) {
        return column in this.columnsToShowNestedObject;
    }
    getNestedObjectKey(column) {
        return this.columnsToShowNestedObject[column] || 'name';
    }
    shouldLoopArrayObject(column) {
        return this.columnsToLoopArrayObject.some(c => c.column === column);
    }
    getLoopArrayObjectKey(column) {
        const config = this.columnsToLoopArrayObject.find(c => c.column === column);
        return config ? config.key : 'name';
    }
    displayNestedObject(item, key) {
        if (!this.isObject(item))
            return '';
        return this.getNestedProperty(item, key);
    }
    displayArrayObject(item, key) {
        if (this.isArray(item)) {
            return item.map((subItem) => this.displayItem(subItem, key)).join('; ');
        }
        return this.displayItem(item, key);
    }
    displayItem(item, key = 'name') {
        if (this.isArray(item)) {
            return item.map((subItem) => this.displayItem(subItem, key)).join('; ');
        }
        else if (this.isObject(item)) {
            return this.getNestedProperty(item, key) ||
                item.name || item.title || item.label || item.id ||
                Object.entries(item)
                    .filter(([k]) => !['id'].includes(k))
                    .map(([k, v]) => `${k}: ${v}`)
                    .join('; ') || JSON.stringify(item);
        }
        return String(item);
    }
    getNestedProperty(obj, key) {
        if (!obj || !key)
            return '';
        const keys = key.split('.');
        let value = obj;
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            }
            else {
                return '';
            }
        }
        return String(value || '');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.7", type: TableComponent, isStandalone: true, selector: "kata-table", inputs: { dataSource: "dataSource", displayedColumns: "displayedColumns", ColumnName: "ColumnName", FilterColumns: "FilterColumns", Columns: "Columns", ListFilter: "ListFilter", EditList: "EditList", columnsToShowLength: "columnsToShowLength", columnsToShowNestedObject: "columnsToShowNestedObject", columnsToLoopArrayObject: "columnsToLoopArrayObject" }, outputs: { toggleColumnEvent: "toggleColumnEvent", filterColumnsEvent: "filterColumnsEvent", updateDisplayedColumnsEvent: "updateDisplayedColumnsEvent", outFilterEvent: "outFilterEvent", addToEditEvent: "addToEditEvent", goToDetailEvent: "goToDetailEvent" }, viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"w-full h-full overflow-auto\">\n  <table class=\"!border w-full cursor-pointer\" mat-table [dataSource]=\"dataSource\" matSort>\n    @for (column of displayedColumns; track column) {\n      <ng-container [matColumnDef]=\"column\">\n        @if (column == 'stt') {\n          <th class=\"flex !border !bg-slate-100 justify-center\" mat-header-cell *matHeaderCellDef>\n            <button matTooltip=\"\u1EA8n hi\u1EC7n c\u1ED9t\" mat-icon-button color=\"primary\" [matMenuTriggerFor]=\"menu\">\n              <mat-icon>tune</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n              <div class=\"flex flex-row space-x-2 items-center p-4\">\n                <mat-form-field appearance=\"outline\" class=\"w-full\" subscriptSizing=\"dynamic\">\n                  <input (input)=\"doFilterColumns($event)\" (click)=\"$event.stopPropagation()\" matInput placeholder=\"T\u00ECm Ki\u1EBFm\" />\n                  <mat-icon matPrefix>search</mat-icon>\n                </mat-form-field>\n                <button (click)=\"updateDisplayedColumns()\" mat-icon-button color=\"primary\">\n                  <mat-icon>check_circle</mat-icon>\n                </button>\n              </div>\n              <div class=\"flex flex-col max-h-80 overflow-auto\">\n                @for (item of FilterColumns; track item.key) {\n                  @if(item.key == 'stt') {\n                    <button [disabled]=\"true\" mat-menu-item (click)=\"toggleColumn(item);$event.stopPropagation()\">\n                      <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>\n                      <span>{{item.value}}</span>\n                    </button>\n                  } @else {\n                    <button mat-menu-item (click)=\"toggleColumn(item);$event.stopPropagation()\">\n                      <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>\n                      <span>{{item.value}}</span>\n                    </button>\n                  }\n                }\n              </div>\n            </mat-menu>\n          </th>\n        } @else {\n          <th class=\"!border whitespace-nowrap !bg-slate-100\" mat-header-cell *matHeaderCellDef mat-sort-header>\n            <span class=\"max-w-40 line-clamp-4 me-4\">\n              {{ ColumnName[column] }}\n            </span>\n            <kata-searchfilter [icon]=\"'filter_alt'\" [ListItem]=\"dataSource.data\" [fieldsearch]=\"column\"\n              [ListFilter]=\"ListFilter\" [filterItem]=\"FilterHeaderColumn(dataSource.filteredData,column)\"\n              (OutFilter)=\"onOutFilter($event)\"></kata-searchfilter>\n          </th>\n        }\n        <td class=\"border\" mat-cell *matCellDef=\"let row; let idx = index\">\n          @switch (column) {\n            @case ('codeId') {\n              <span (click)=\"goToDetail(row);\" class=\"max-w-40 line-clamp-4 font-bold text-blue-600\">\n                {{ row[column] }}\n              </span>\n            }\n            @case ('stt') {\n              <span (click)=\"addToEdit(row);\" class=\"flex justify-center items-center font-bold text-blue-600\">\n                @if(checkSelect(row)){\n                  <mat-icon>check</mat-icon>\n                } @else {\n                  <span>{{ idx + 1 }}</span>\n                }\n              </span>\n            }\n            @case ('createdAt') {\n              <span class=\"max-w-40 line-clamp-4\">\n                {{ row[column]|date:'dd/MM/yyyy'}}\n              </span>\n            }\n            @case ('isActive') {\n              <span class=\"max-w-40 line-clamp-4\">\n                @if (row[column]) {\n                  <mat-icon class=\"text-green-500\">check_circle</mat-icon>\n                } @else {\n                  <mat-icon class=\"text-red-500\">cancel</mat-icon>\n                }\n              </span>\n            }\n            @default {\n              @if (isArray(row[column])) {\n                @if (shouldShowLength(column)) {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    {{ row[column].length }}\n                  </span>\n                } @else if (shouldLoopArrayObject(column)) {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    @for (item of row[column]; track item; let last = $last) {\n                      {{ displayArrayObject(item, getLoopArrayObjectKey(column)) }}{{ last ? '' : ', ' }}\n                    }\n                  </span>\n                } @else {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    @for (item of row[column]; track item; let last = $last) {\n                      {{ displayItem(item) }}{{ last ? '' : ', ' }}\n                    }\n                  </span>\n                }\n              } @else if (shouldShowNestedObject(column) && isObject(row[column])) {\n                <span class=\"max-w-40 line-clamp-4\">\n                  {{ displayNestedObject(row[column], getNestedObjectKey(column)) }}\n                </span>\n              } @else {\n                <span class=\"max-w-40 line-clamp-4\">\n                  {{ row[column] }}\n                </span>\n              }\n            }\n          }\n        </td>\n      </ng-container>\n    }\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n    <tr class=\"border\" mat-row *matRowDef=\"let row; columns: displayedColumns;\"\n      class=\"hover:bg-slate-50 {{checkItemInEdit(row)?'!bg-blue-50':''}}\"></tr>\n    <tr class=\"mat-row border\" *matNoDataRow>\n      <td class=\"mat-cell p-4\" colspan=\"4\">Kh\u00F4ng t\u00ECm th\u1EA5y</td>\n    </tr>\n  </table>\n</div>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "pipe", type: i1$1.DatePipe, name: "date" }, { kind: "ngmodule", type: MatTableModule }, { kind: "component", type: i2$1.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i2$1.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2$1.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i2$1.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i2$1.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2$1.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i2$1.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2$1.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i2$1.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i2$1.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "directive", type: i2$1.MatNoDataRow, selector: "ng-template[matNoDataRow]" }, { kind: "ngmodule", type: MatSortModule }, { kind: "directive", type: i3$1.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i3$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "ngmodule", type: MatPaginatorModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i6.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i7.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i7.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i7.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i8.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i9.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: SearchfilterComponent, selector: "kata-searchfilter", inputs: ["ListItem", "filterItem", "ListFilter", "CountItems", "icon", "title", "fieldsearch", "isEdit", "isDelete", "isSingle"], outputs: ["OutFilter"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
__decorate([
    memoize()
], TableComponent.prototype, "FilterHeaderColumn", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-table', standalone: true, imports: [
                        CommonModule,
                        MatTableModule,
                        MatSortModule,
                        MatPaginatorModule,
                        MatIconModule,
                        MatButtonModule,
                        MatTooltipModule,
                        MatMenuModule,
                        FormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        SearchfilterComponent
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"w-full h-full overflow-auto\">\n  <table class=\"!border w-full cursor-pointer\" mat-table [dataSource]=\"dataSource\" matSort>\n    @for (column of displayedColumns; track column) {\n      <ng-container [matColumnDef]=\"column\">\n        @if (column == 'stt') {\n          <th class=\"flex !border !bg-slate-100 justify-center\" mat-header-cell *matHeaderCellDef>\n            <button matTooltip=\"\u1EA8n hi\u1EC7n c\u1ED9t\" mat-icon-button color=\"primary\" [matMenuTriggerFor]=\"menu\">\n              <mat-icon>tune</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n              <div class=\"flex flex-row space-x-2 items-center p-4\">\n                <mat-form-field appearance=\"outline\" class=\"w-full\" subscriptSizing=\"dynamic\">\n                  <input (input)=\"doFilterColumns($event)\" (click)=\"$event.stopPropagation()\" matInput placeholder=\"T\u00ECm Ki\u1EBFm\" />\n                  <mat-icon matPrefix>search</mat-icon>\n                </mat-form-field>\n                <button (click)=\"updateDisplayedColumns()\" mat-icon-button color=\"primary\">\n                  <mat-icon>check_circle</mat-icon>\n                </button>\n              </div>\n              <div class=\"flex flex-col max-h-80 overflow-auto\">\n                @for (item of FilterColumns; track item.key) {\n                  @if(item.key == 'stt') {\n                    <button [disabled]=\"true\" mat-menu-item (click)=\"toggleColumn(item);$event.stopPropagation()\">\n                      <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>\n                      <span>{{item.value}}</span>\n                    </button>\n                  } @else {\n                    <button mat-menu-item (click)=\"toggleColumn(item);$event.stopPropagation()\">\n                      <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>\n                      <span>{{item.value}}</span>\n                    </button>\n                  }\n                }\n              </div>\n            </mat-menu>\n          </th>\n        } @else {\n          <th class=\"!border whitespace-nowrap !bg-slate-100\" mat-header-cell *matHeaderCellDef mat-sort-header>\n            <span class=\"max-w-40 line-clamp-4 me-4\">\n              {{ ColumnName[column] }}\n            </span>\n            <kata-searchfilter [icon]=\"'filter_alt'\" [ListItem]=\"dataSource.data\" [fieldsearch]=\"column\"\n              [ListFilter]=\"ListFilter\" [filterItem]=\"FilterHeaderColumn(dataSource.filteredData,column)\"\n              (OutFilter)=\"onOutFilter($event)\"></kata-searchfilter>\n          </th>\n        }\n        <td class=\"border\" mat-cell *matCellDef=\"let row; let idx = index\">\n          @switch (column) {\n            @case ('codeId') {\n              <span (click)=\"goToDetail(row);\" class=\"max-w-40 line-clamp-4 font-bold text-blue-600\">\n                {{ row[column] }}\n              </span>\n            }\n            @case ('stt') {\n              <span (click)=\"addToEdit(row);\" class=\"flex justify-center items-center font-bold text-blue-600\">\n                @if(checkSelect(row)){\n                  <mat-icon>check</mat-icon>\n                } @else {\n                  <span>{{ idx + 1 }}</span>\n                }\n              </span>\n            }\n            @case ('createdAt') {\n              <span class=\"max-w-40 line-clamp-4\">\n                {{ row[column]|date:'dd/MM/yyyy'}}\n              </span>\n            }\n            @case ('isActive') {\n              <span class=\"max-w-40 line-clamp-4\">\n                @if (row[column]) {\n                  <mat-icon class=\"text-green-500\">check_circle</mat-icon>\n                } @else {\n                  <mat-icon class=\"text-red-500\">cancel</mat-icon>\n                }\n              </span>\n            }\n            @default {\n              @if (isArray(row[column])) {\n                @if (shouldShowLength(column)) {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    {{ row[column].length }}\n                  </span>\n                } @else if (shouldLoopArrayObject(column)) {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    @for (item of row[column]; track item; let last = $last) {\n                      {{ displayArrayObject(item, getLoopArrayObjectKey(column)) }}{{ last ? '' : ', ' }}\n                    }\n                  </span>\n                } @else {\n                  <span class=\"max-w-40 line-clamp-4\">\n                    @for (item of row[column]; track item; let last = $last) {\n                      {{ displayItem(item) }}{{ last ? '' : ', ' }}\n                    }\n                  </span>\n                }\n              } @else if (shouldShowNestedObject(column) && isObject(row[column])) {\n                <span class=\"max-w-40 line-clamp-4\">\n                  {{ displayNestedObject(row[column], getNestedObjectKey(column)) }}\n                </span>\n              } @else {\n                <span class=\"max-w-40 line-clamp-4\">\n                  {{ row[column] }}\n                </span>\n              }\n            }\n          }\n        </td>\n      </ng-container>\n    }\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n    <tr class=\"border\" mat-row *matRowDef=\"let row; columns: displayedColumns;\"\n      class=\"hover:bg-slate-50 {{checkItemInEdit(row)?'!bg-blue-50':''}}\"></tr>\n    <tr class=\"mat-row border\" *matNoDataRow>\n      <td class=\"mat-cell p-4\" colspan=\"4\">Kh\u00F4ng t\u00ECm th\u1EA5y</td>\n    </tr>\n  </table>\n</div>" }]
        }], propDecorators: { dataSource: [{
                type: Input
            }], displayedColumns: [{
                type: Input
            }], ColumnName: [{
                type: Input
            }], FilterColumns: [{
                type: Input
            }], Columns: [{
                type: Input
            }], ListFilter: [{
                type: Input
            }], EditList: [{
                type: Input
            }], columnsToShowLength: [{
                type: Input
            }], columnsToShowNestedObject: [{
                type: Input
            }], columnsToLoopArrayObject: [{
                type: Input
            }], toggleColumnEvent: [{
                type: Output
            }], filterColumnsEvent: [{
                type: Output
            }], updateDisplayedColumnsEvent: [{
                type: Output
            }], outFilterEvent: [{
                type: Output
            }], addToEditEvent: [{
                type: Output
            }], goToDetailEvent: [{
                type: Output
            }], paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }], FilterHeaderColumn: [] } });

class ToolbarComponent {
    EditList = [];
    applyFilterEvent = new EventEmitter();
    createEvent = new EventEmitter();
    openDeleteDialogEvent = new EventEmitter();
    applyFilter(event) {
        this.applyFilterEvent.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: ToolbarComponent, isStandalone: true, selector: "kata-toolbar", inputs: { EditList: "EditList" }, outputs: { applyFilterEvent: "applyFilterEvent", createEvent: "createEvent", openDeleteDialogEvent: "openDeleteDialogEvent" }, ngImport: i0, template: "<div class=\"p-2 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg\">\n  <div class=\"w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between\">\n    <div class=\"flex flex-row space-x-2 items-center\">\n      <div class=\"relative w-full\">\n        <input type=\"text\" placeholder=\"T\u00ECm Ki\u1EBFm...\" (keyup)=\"applyFilter($event)\"\n          class=\"block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40\">\n        <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n          <span class=\"material-symbols-outlined text-gray-500\">search</span>\n        </div>\n      </div>\n      <button class=\"flex flex-row items-center\" color=\"primary\" matTooltip=\"Th\u00EAm m\u1EDBi\" (click)=\"createEvent.emit()\"\n        mat-flat-button>\n        <mat-icon>add_circle</mat-icon>\n        <span class=\"whitespace-nowrap\">T\u1EA1o M\u1EDBi</span>\n      </button>\n      <button *ngIf=\"EditList.length > 0\" (click)=\"openDeleteDialogEvent.emit()\" class=\"flex flex-row items-center\"\n        color=\"warn\" matTooltip=\"Xo\u00E1\" mat-flat-button>\n        <mat-icon>delete</mat-icon>\n        <span class=\"whitespace-nowrap\">Xo\u00E1</span>\n      </button>\n    </div>\n  </div>\n</div>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatTooltipModule }, { kind: "directive", type: i6.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "ngmodule", type: FormsModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
__decorate([
    Debounce(500)
], ToolbarComponent.prototype, "applyFilter", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-toolbar', standalone: true, imports: [
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatTooltipModule,
                        MatFormFieldModule,
                        MatInputModule,
                        FormsModule
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"p-2 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg\">\n  <div class=\"w-full flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between\">\n    <div class=\"flex flex-row space-x-2 items-center\">\n      <div class=\"relative w-full\">\n        <input type=\"text\" placeholder=\"T\u00ECm Ki\u1EBFm...\" (keyup)=\"applyFilter($event)\"\n          class=\"block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40\">\n        <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n          <span class=\"material-symbols-outlined text-gray-500\">search</span>\n        </div>\n      </div>\n      <button class=\"flex flex-row items-center\" color=\"primary\" matTooltip=\"Th\u00EAm m\u1EDBi\" (click)=\"createEvent.emit()\"\n        mat-flat-button>\n        <mat-icon>add_circle</mat-icon>\n        <span class=\"whitespace-nowrap\">T\u1EA1o M\u1EDBi</span>\n      </button>\n      <button *ngIf=\"EditList.length > 0\" (click)=\"openDeleteDialogEvent.emit()\" class=\"flex flex-row items-center\"\n        color=\"warn\" matTooltip=\"Xo\u00E1\" mat-flat-button>\n        <mat-icon>delete</mat-icon>\n        <span class=\"whitespace-nowrap\">Xo\u00E1</span>\n      </button>\n    </div>\n  </div>\n</div>" }]
        }], propDecorators: { EditList: [{
                type: Input
            }], applyFilterEvent: [{
                type: Output
            }], createEvent: [{
                type: Output
            }], openDeleteDialogEvent: [{
                type: Output
            }], applyFilter: [] } });

class PaginationComponent {
    page = 1;
    totalPages = 1;
    total = 0;
    pageSize = 10;
    pageSizeChange = new EventEmitter();
    previousPage = new EventEmitter();
    nextPage = new EventEmitter();
    _snackBar = inject(MatSnackBar);
    onPageSizeChange(size, menuHienthi) {
        if (size > this.total) {
            this._snackBar.open(`Số lượng tối đa ${this.total}`, '', {
                duration: 1000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['snackbar-success'],
            });
            size = this.total;
        }
        this.pageSizeChange.emit(size);
        menuHienthi.closeMenu();
    }
    onPreviousPage() {
        if (this.page > 1) {
            this.previousPage.emit();
        }
    }
    onNextPage() {
        if (this.page < this.totalPages) {
            this.nextPage.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: PaginationComponent, isStandalone: true, selector: "kata-pagination", inputs: { page: "page", totalPages: "totalPages", total: "total", pageSize: "pageSize" }, outputs: { pageSizeChange: "pageSizeChange", previousPage: "previousPage", nextPage: "nextPage" }, ngImport: i0, template: "<div class=\"w-full flex flex-row space-x-4 justify-end items-center\">\n  <div class=\"flex items-center text-center\">\n    <strong>{{ (page - 1) * pageSize + 1 }}</strong> -\n    <strong>{{ page * pageSize > total ? total : page * pageSize }}</strong>\n    / {{ total }} m\u1EE5c\n  </div>\n  <div class=\"flex items-center justify-center\">\n    <span>{{ page }}/{{totalPages}} </span>\n    <span>Trang</span>\n  </div>\n  <div class=\"flex flex-row space-x-2 justify-center items-center\">\n    <span class=\"font-bold text-blue-600\" [matMenuTriggerFor]=\"menu1\" #menuHienthi=\"matMenuTrigger\">{{pageSize}} m\u1EE5c</span>\n    <mat-menu #menu1=\"matMenu\">\n      <div class=\"w-full flex flex-row space-x-2 p-4\" (click)=\"$event.stopPropagation()\">\n        <mat-form-field appearance=\"outline\" subscriptSizing=\"dynamic\">\n          <mat-label>S\u1ED1 l\u01B0\u1EE3ng</mat-label>\n          <input matInput [(ngModel)]=\"pageSize\" [ngModelOptions]=\"{ standalone: true }\"\n            placeholder=\"Vui l\u00F2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng\" />\n        </mat-form-field>\n        <button mat-icon-button color=\"primary\" (click)=\"onPageSizeChange(pageSize, menuHienthi)\">\n          <mat-icon>published_with_changes</mat-icon>\n        </button>\n      </div>\n    </mat-menu>\n    <div class=\"flex flex-row items-center\">\n      <button mat-icon-button color=\"primary\" [disabled]=\"page === 1\" (click)=\"onPreviousPage()\">\n        <mat-icon>keyboard_arrow_left</mat-icon>\n      </button>\n      <button mat-icon-button color=\"primary\" [disabled]=\"page === totalPages\" (click)=\"onNextPage()\">\n        <mat-icon>keyboard_arrow_right</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i7.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "directive", type: i7.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i8.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8.MatLabel, selector: "mat-label" }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i9.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-pagination', standalone: true, imports: [
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatMenuModule,
                        MatFormFieldModule,
                        MatInputModule,
                        FormsModule
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"w-full flex flex-row space-x-4 justify-end items-center\">\n  <div class=\"flex items-center text-center\">\n    <strong>{{ (page - 1) * pageSize + 1 }}</strong> -\n    <strong>{{ page * pageSize > total ? total : page * pageSize }}</strong>\n    / {{ total }} m\u1EE5c\n  </div>\n  <div class=\"flex items-center justify-center\">\n    <span>{{ page }}/{{totalPages}} </span>\n    <span>Trang</span>\n  </div>\n  <div class=\"flex flex-row space-x-2 justify-center items-center\">\n    <span class=\"font-bold text-blue-600\" [matMenuTriggerFor]=\"menu1\" #menuHienthi=\"matMenuTrigger\">{{pageSize}} m\u1EE5c</span>\n    <mat-menu #menu1=\"matMenu\">\n      <div class=\"w-full flex flex-row space-x-2 p-4\" (click)=\"$event.stopPropagation()\">\n        <mat-form-field appearance=\"outline\" subscriptSizing=\"dynamic\">\n          <mat-label>S\u1ED1 l\u01B0\u1EE3ng</mat-label>\n          <input matInput [(ngModel)]=\"pageSize\" [ngModelOptions]=\"{ standalone: true }\"\n            placeholder=\"Vui l\u00F2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng\" />\n        </mat-form-field>\n        <button mat-icon-button color=\"primary\" (click)=\"onPageSizeChange(pageSize, menuHienthi)\">\n          <mat-icon>published_with_changes</mat-icon>\n        </button>\n      </div>\n    </mat-menu>\n    <div class=\"flex flex-row items-center\">\n      <button mat-icon-button color=\"primary\" [disabled]=\"page === 1\" (click)=\"onPreviousPage()\">\n        <mat-icon>keyboard_arrow_left</mat-icon>\n      </button>\n      <button mat-icon-button color=\"primary\" [disabled]=\"page === totalPages\" (click)=\"onNextPage()\">\n        <mat-icon>keyboard_arrow_right</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>" }]
        }], propDecorators: { page: [{
                type: Input
            }], totalPages: [{
                type: Input
            }], total: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeChange: [{
                type: Output
            }], previousPage: [{
                type: Output
            }], nextPage: [{
                type: Output
            }] } });

class ListComponentComponent {
    componentService;
    columnConfig = {
        stt: '#',
        codeId: 'Code',
        title: 'Tiêu Đề',
        description: 'Mô Tả',
        status: 'Trạng Thái',
        order: 'Thứ Tự',
        createdAt: 'Ngày Tạo',
    };
    storageKey = 'ComponentColFilter';
    displayedColumns = [];
    ColumnName = {};
    FilterColumns = [];
    Columns = [];
    ListFilter = [];
    page = this.componentService.page || signal(1);
    totalPages = this.componentService.totalPages || signal(1);
    total = this.componentService.total || signal(0);
    pageSize = this.componentService.pageSize || signal(50);
    drawer;
    _breakpointObserver = inject(BreakpointObserver);
    _router = inject(Router);
    _dialog = inject(MatDialog);
    _snackBar = inject(MatSnackBar);
    dataSource = new MatTableDataSource(this.componentService.ListComponent());
    EditList = [];
    isSearch = signal(false);
    searchParam = {};
    constructor() {
        effect(() => {
            this.dataSource.data = this.componentService.ListComponent();
        });
    }
    async ngOnInit() {
        console.log('ListComponentComponent initialized with service:', this.componentService);
        await this.componentService.getAllComponent(this.searchParam, true);
        this.componentService.listenComponentUpdates();
        this.initializeColumns();
        this.setupDrawer();
    }
    initializeColumns() {
        this.ColumnName = this.columnConfig;
        this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
        this.FilterColumns = JSON.parse(localStorage.getItem(this.storageKey) || '[]').length
            ? JSON.parse(localStorage.getItem(this.storageKey))
            : this.Columns;
        localStorage.setItem(this.storageKey, JSON.stringify(this.FilterColumns));
        this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
        this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? { ...acc, [key]: value } : acc, {});
    }
    setupDrawer() {
        this._breakpointObserver
            .observe([Breakpoints.Handset])
            .subscribe((result) => {
            this.drawer.mode = result.matches ? 'over' : 'over';
        });
    }
    async applyFilter(event) {
        const filterValue = event.target.value;
        if (!filterValue) {
            await this.componentService.SearchBy(this.searchParam);
            return;
        }
        this.searchParam.title = filterValue;
        await this.componentService.SearchBy(this.searchParam);
    }
    toggleColumn(item) {
        const column = this.FilterColumns.find((v) => v.key === item.key);
        if (column) {
            column.isShow = !column.isShow;
            this.updateDisplayedColumns();
        }
    }
    updateDisplayedColumns() {
        this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
        this.ColumnName = this.FilterColumns.reduce((obj, item) => {
            if (item.isShow)
                obj[item.key] = item.value;
            return obj;
        }, {});
        localStorage.setItem(this.storageKey, JSON.stringify(this.FilterColumns));
    }
    doFilterColumns(event) {
        const query = event.target.value.toLowerCase();
        this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
    }
    create() {
        this.drawer.open();
        this._router.navigate(['admin/component', 'new']);
    }
    openDeleteDialog(template) {
        const dialogDeleteRef = this._dialog.open(template, {
            hasBackdrop: true,
            disableClose: true,
        });
        dialogDeleteRef.afterClosed().subscribe((result) => {
            if (result === "true") {
                this.DeleteListItem();
            }
        });
    }
    DeleteListItem() {
        this.EditList.forEach((item) => {
            this.componentService.DeleteComponent(item);
        });
        this.EditList = [];
        this._snackBar.open('Xóa Thành Công', '', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
        });
    }
    AddToEdit(item) {
        const existingItem = this.EditList.find((v) => v.id === item.id);
        if (existingItem) {
            this.EditList = this.EditList.filter((v) => v.id !== item.id);
        }
        else {
            this.EditList.push(item);
        }
    }
    goToDetail(item) {
        this.drawer.open();
        this.componentService.setComponentId(item.id);
        this.componentService.getComponentBy({ id: item.id, isOne: true });
        this._router.navigate(['admin/component', item.id]);
    }
    onOutFilter(event) {
        this.dataSource.data = event;
    }
    onPageSizeChange(size) {
        this.componentService.pageSize.set(size);
        this.componentService.page.set(1);
        this.componentService.getAllComponent(this.searchParam, true);
    }
    onPreviousPage() {
        if (this.componentService.page() > 1) {
            this.componentService.page.set(this.componentService.page() - 1);
            this.componentService.getAllComponent(this.searchParam, true);
        }
    }
    onNextPage() {
        if (this.componentService.page() < this.componentService.totalPages()) {
            this.componentService.page.set(this.componentService.page() + 1);
            this.componentService.getAllComponent(this.searchParam, true);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ListComponentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: ListComponentComponent, isStandalone: true, selector: "kata-listcomponent", inputs: { componentService: "componentService", columnConfig: "columnConfig", storageKey: "storageKey" }, viewQueries: [{ propertyName: "drawer", first: true, predicate: ["drawer"], descendants: true, static: true }], ngImport: i0, template: "<mat-drawer-container class=\"w-full h-full\" autosize>\n  <mat-drawer #drawer class=\"flex flex-col lg:!w-2/3 !w-full h-full\" [position]=\"'end'\" mode=\"over\">\n    <router-outlet></router-outlet>\n  </mat-drawer>\n  <div class=\"flex flex-col space-y-2 h-screen-16 w-full p-2\">\n    <kata-toolbar\n      [EditList]=\"EditList\"\n      (applyFilterEvent)=\"applyFilter($event)\"\n      (createEvent)=\"create()\"\n      (openDeleteDialogEvent)=\"openDeleteDialog(DeleteDialog)\">\n    </kata-toolbar>\n    <kata-table\n      [dataSource]=\"dataSource\"\n      [displayedColumns]=\"displayedColumns\"\n      [ColumnName]=\"ColumnName\"\n      [FilterColumns]=\"FilterColumns\"\n      [Columns]=\"Columns\"\n      [ListFilter]=\"ListFilter\"\n      [EditList]=\"EditList\"\n      (toggleColumnEvent)=\"toggleColumn($event)\"\n      (filterColumnsEvent)=\"doFilterColumns($event)\"\n      (updateDisplayedColumnsEvent)=\"updateDisplayedColumns()\"\n      (outFilterEvent)=\"onOutFilter($event)\"\n      (addToEditEvent)=\"AddToEdit($event)\"\n      (goToDetailEvent)=\"goToDetail($event)\">\n    </kata-table>\n    <kata-pagination\n      [page]=\"page()\"\n      [totalPages]=\"totalPages()\"\n      [total]=\"total()\"\n      [pageSize]=\"pageSize()\"\n      (pageSizeChange)=\"onPageSizeChange($event)\"\n      (previousPage)=\"onPreviousPage()\"\n      (nextPage)=\"onNextPage()\">\n    </kata-pagination>\n  </div>\n</mat-drawer-container>\n\n<ng-template #DeleteDialog>\n  <mat-dialog-content>\n    <div class=\"flex flex-col space-y-8 items-center justify-center\">\n      <div class=\"font-bold\">X\u00E1c Nh\u1EADn</div>\n      <div>B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\u00E1 kh\u00F4ng?</div>\n      <div class=\"flex flex-row space-x-2 items-center justify-center\">\n        <button mat-flat-button color=\"primary\" mat-dialog-close=\"true\">\u0110\u1ED3ng \u00DD</button>\n        <button mat-flat-button color=\"warn\" mat-dialog-close=\"false\">Hu\u1EF7 B\u1ECF</button>\n      </div>\n    </div>\n  </mat-dialog-content>\n</ng-template>", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatSidenavModule }, { kind: "component", type: i1$2.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i1$2.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i2$2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "component", type: TableComponent, selector: "kata-table", inputs: ["dataSource", "displayedColumns", "ColumnName", "FilterColumns", "Columns", "ListFilter", "EditList", "columnsToShowLength", "columnsToShowNestedObject", "columnsToLoopArrayObject"], outputs: ["toggleColumnEvent", "filterColumnsEvent", "updateDisplayedColumnsEvent", "outFilterEvent", "addToEditEvent", "goToDetailEvent"] }, { kind: "component", type: ToolbarComponent, selector: "kata-toolbar", inputs: ["EditList"], outputs: ["applyFilterEvent", "createEvent", "openDeleteDialogEvent"] }, { kind: "component", type: PaginationComponent, selector: "kata-pagination", inputs: ["page", "totalPages", "total", "pageSize"], outputs: ["pageSizeChange", "previousPage", "nextPage"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ListComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-listcomponent', standalone: true, imports: [
                        CommonModule,
                        MatSidenavModule,
                        RouterOutlet,
                        MatDialogModule,
                        TableComponent,
                        ToolbarComponent,
                        PaginationComponent
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-drawer-container class=\"w-full h-full\" autosize>\n  <mat-drawer #drawer class=\"flex flex-col lg:!w-2/3 !w-full h-full\" [position]=\"'end'\" mode=\"over\">\n    <router-outlet></router-outlet>\n  </mat-drawer>\n  <div class=\"flex flex-col space-y-2 h-screen-16 w-full p-2\">\n    <kata-toolbar\n      [EditList]=\"EditList\"\n      (applyFilterEvent)=\"applyFilter($event)\"\n      (createEvent)=\"create()\"\n      (openDeleteDialogEvent)=\"openDeleteDialog(DeleteDialog)\">\n    </kata-toolbar>\n    <kata-table\n      [dataSource]=\"dataSource\"\n      [displayedColumns]=\"displayedColumns\"\n      [ColumnName]=\"ColumnName\"\n      [FilterColumns]=\"FilterColumns\"\n      [Columns]=\"Columns\"\n      [ListFilter]=\"ListFilter\"\n      [EditList]=\"EditList\"\n      (toggleColumnEvent)=\"toggleColumn($event)\"\n      (filterColumnsEvent)=\"doFilterColumns($event)\"\n      (updateDisplayedColumnsEvent)=\"updateDisplayedColumns()\"\n      (outFilterEvent)=\"onOutFilter($event)\"\n      (addToEditEvent)=\"AddToEdit($event)\"\n      (goToDetailEvent)=\"goToDetail($event)\">\n    </kata-table>\n    <kata-pagination\n      [page]=\"page()\"\n      [totalPages]=\"totalPages()\"\n      [total]=\"total()\"\n      [pageSize]=\"pageSize()\"\n      (pageSizeChange)=\"onPageSizeChange($event)\"\n      (previousPage)=\"onPreviousPage()\"\n      (nextPage)=\"onNextPage()\">\n    </kata-pagination>\n  </div>\n</mat-drawer-container>\n\n<ng-template #DeleteDialog>\n  <mat-dialog-content>\n    <div class=\"flex flex-col space-y-8 items-center justify-center\">\n      <div class=\"font-bold\">X\u00E1c Nh\u1EADn</div>\n      <div>B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\u00E1 kh\u00F4ng?</div>\n      <div class=\"flex flex-row space-x-2 items-center justify-center\">\n        <button mat-flat-button color=\"primary\" mat-dialog-close=\"true\">\u0110\u1ED3ng \u00DD</button>\n        <button mat-flat-button color=\"warn\" mat-dialog-close=\"false\">Hu\u1EF7 B\u1ECF</button>\n      </div>\n    </div>\n  </mat-dialog-content>\n</ng-template>" }]
        }], ctorParameters: () => [], propDecorators: { componentService: [{
                type: Input,
                args: [{ required: true }]
            }], columnConfig: [{
                type: Input
            }], storageKey: [{
                type: Input
            }], drawer: [{
                type: ViewChild,
                args: ['drawer', { static: true }]
            }] } });

class DivEditableComponent {
    renderer;
    value = 0;
    type = 'string';
    index = null;
    field;
    row;
    format = '1.0-2';
    validationRules = null;
    valueUpdated = new EventEmitter();
    moveToNext = new EventEmitter();
    editableDiv;
    isEditing = false;
    displayValue = '';
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.updateDisplayValue();
    }
    updateDisplayValue() {
        if (this.type === 'number') {
            const numValue = Number(this.value) || 0;
            this.displayValue = numValue.toFixed(parseInt(this.format.split('-')[1], 10));
        }
        else {
            this.displayValue = this.value?.toString() || '';
        }
        if (this.editableDiv) {
            this.renderer.setProperty(this.editableDiv.nativeElement, 'innerText', this.displayValue);
        }
    }
    startEditing() {
        if (!this.isEditing) {
            this.isEditing = true;
            setTimeout(() => {
                this.editableDiv.nativeElement.focus();
                const range = document.createRange();
                range.selectNodeContents(this.editableDiv.nativeElement);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }, 0);
        }
    }
    onBlur() {
        this.updateValue();
        this.isEditing = false;
    }
    onKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.updateValue();
            this.isEditing = false;
            this.moveToNext.emit();
        }
        else if (event.key === 'Escape') {
            this.isEditing = false;
            this.updateDisplayValue();
        }
    }
    updateValue() {
        const rawValue = this.editableDiv.nativeElement.innerText.trim();
        let newValue = this.type === 'number' ? Number(rawValue) || 0 : rawValue;
        if (this.validationRules) {
            const validationResult = this.validationRules(newValue);
            if (!validationResult.valid) {
                this.updateDisplayValue();
                return;
            }
        }
        this.value = newValue;
        this.valueUpdated.emit({
            value: newValue,
            index: this.index,
            field: this.field,
            row: this.row
        });
        this.updateDisplayValue();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: DivEditableComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: DivEditableComponent, isStandalone: true, selector: "kata-diveditable", inputs: { value: "value", type: "type", index: "index", field: "field", row: "row", format: "format", validationRules: "validationRules" }, outputs: { valueUpdated: "valueUpdated", moveToNext: "moveToNext" }, viewQueries: [{ propertyName: "editableDiv", first: true, predicate: ["editableDiv"], descendants: true }], ngImport: i0, template: "<div #editableDiv\n     class=\"editable-div p-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none\"\n     [ngClass]=\"{'cursor-pointer': !isEditing}\"\n     [contentEditable]=\"isEditing\"\n     (dblclick)=\"startEditing()\"\n     (blur)=\"onBlur()\"\n     (keydown)=\"onKeyDown($event)\"\n     [innerText]=\"displayValue\">\n</div>", styles: [".editable-div{transition:all .2s ease}.editable-div:hover{background-color:#e2e8f0}.cursor-pointer{cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: DivEditableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-diveditable', imports: [CommonModule], template: "<div #editableDiv\n     class=\"editable-div p-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none\"\n     [ngClass]=\"{'cursor-pointer': !isEditing}\"\n     [contentEditable]=\"isEditing\"\n     (dblclick)=\"startEditing()\"\n     (blur)=\"onBlur()\"\n     (keydown)=\"onKeyDown($event)\"\n     [innerText]=\"displayValue\">\n</div>", styles: [".editable-div{transition:all .2s ease}.editable-div:hover{background-color:#e2e8f0}.cursor-pointer{cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }], propDecorators: { value: [{
                type: Input
            }], type: [{
                type: Input
            }], index: [{
                type: Input
            }], field: [{
                type: Input
            }], row: [{
                type: Input
            }], format: [{
                type: Input
            }], validationRules: [{
                type: Input
            }], valueUpdated: [{
                type: Output
            }], moveToNext: [{
                type: Output
            }], editableDiv: [{
                type: ViewChild,
                args: ['editableDiv']
            }] } });

class ButtonComponent {
    type = 'button';
    variant = 'primary';
    size = 'md';
    disabled = false;
    get buttonClasses() {
        const baseClasses = 'font-semibold rounded focus:outline-none focus:ring-2';
        const variantClasses = {
            primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
            secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
            danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
        };
        const sizeClasses = {
            sm: 'px-2 py-1 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };
        return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${this.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
    }
    onClick() {
        if (!this.disabled) {
            // Emit event or handle click
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.7", type: ButtonComponent, isStandalone: true, selector: "kata-button", inputs: { type: "type", variant: "variant", size: "size", disabled: "disabled" }, ngImport: i0, template: "<button\r\n      [type]=\"type\"\r\n      [ngClass]=\"buttonClasses\"\r\n      [disabled]=\"disabled\"\r\n      (click)=\"onClick()\">\r\n      <ng-content></ng-content>\r\n</button>", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.7", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'kata-button', imports: [CommonModule], template: "<button\r\n      [type]=\"type\"\r\n      [ngClass]=\"buttonClasses\"\r\n      [disabled]=\"disabled\"\r\n      (click)=\"onClick()\">\r\n      <ng-content></ng-content>\r\n</button>" }]
        }], propDecorators: { type: [{
                type: Input
            }], variant: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/*
 * Public API Surface of shared
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent, DivEditableComponent, ListComponentComponent, PaginationComponent, SearchfilterComponent, SharedComponent, SharedService, TableComponent, ToolbarComponent };
//# sourceMappingURL=kataoffical-shared.mjs.map
