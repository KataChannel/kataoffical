import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class PaginationComponent {
    page: number;
    totalPages: number;
    total: number;
    pageSize: number;
    pageSizeChange: EventEmitter<number>;
    previousPage: EventEmitter<void>;
    nextPage: EventEmitter<void>;
    private _snackBar;
    onPageSizeChange(size: number, menuHienthi: any): void;
    onPreviousPage(): void;
    onNextPage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "kata-pagination", never, { "page": { "alias": "page"; "required": false; }; "totalPages": { "alias": "totalPages"; "required": false; }; "total": { "alias": "total"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; }, { "pageSizeChange": "pageSizeChange"; "previousPage": "previousPage"; "nextPage": "nextPage"; }, never, never, true, never>;
}
