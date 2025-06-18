import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ToolbarComponent {
    EditList: any[];
    applyFilterEvent: EventEmitter<Event>;
    createEvent: EventEmitter<void>;
    openDeleteDialogEvent: EventEmitter<any>;
    applyFilter(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToolbarComponent, "kata-toolbar", never, { "EditList": { "alias": "EditList"; "required": false; }; }, { "applyFilterEvent": "applyFilterEvent"; "createEvent": "createEvent"; "openDeleteDialogEvent": "openDeleteDialogEvent"; }, never, never, true, never>;
}
