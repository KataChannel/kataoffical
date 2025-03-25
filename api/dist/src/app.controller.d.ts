import { AppService } from './app.service';
import { SearchDto } from './app.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getVersion(): string;
    search(searchDto: SearchDto): Promise<any>;
    getLastUpdated(table: string): Promise<{
        table: string;
        updatedAt: any;
    }>;
}
