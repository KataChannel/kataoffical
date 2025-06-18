import { EventEmitter, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DivEditableComponent implements AfterViewInit {
    private renderer;
    value: any;
    type: 'number' | 'string';
    index: number | null;
    field: keyof any;
    row: any;
    format: string;
    validationRules: ((value: any) => {
        valid: boolean;
        error?: string;
    }) | null;
    valueUpdated: EventEmitter<{
        value: any;
        index: number | null;
        field: keyof any;
        row: any;
    }>;
    moveToNext: EventEmitter<void>;
    editableDiv: ElementRef;
    isEditing: boolean;
    displayValue: string;
    constructor(renderer: Renderer2);
    ngAfterViewInit(): void;
    private updateDisplayValue;
    startEditing(): void;
    onBlur(): void;
    onKeyDown(event: KeyboardEvent): void;
    private updateValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DivEditableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DivEditableComponent, "kata-diveditable", never, { "value": { "alias": "value"; "required": false; }; "type": { "alias": "type"; "required": false; }; "index": { "alias": "index"; "required": false; }; "field": { "alias": "field"; "required": false; }; "row": { "alias": "row"; "required": false; }; "format": { "alias": "format"; "required": false; }; "validationRules": { "alias": "validationRules"; "required": false; }; }, { "valueUpdated": "valueUpdated"; "moveToNext": "moveToNext"; }, never, never, true, never>;
}
