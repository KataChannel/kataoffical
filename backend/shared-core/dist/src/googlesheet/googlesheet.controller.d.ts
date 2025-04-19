import { GooglesheetService } from './googlesheet.service';
export declare class GooglesheetController {
    private readonly googlesheetService;
    constructor(googlesheetService: GooglesheetService);
    getAll(sheetId: string, sheetName: string): Promise<any[]>;
    create(sheetId: string, sheetName: string, numfield: number, body: any): Promise<any>;
    update(numfield: number, row: string, body: any): Promise<any>;
    delete(row: string): Promise<any>;
}
