import { AppService } from './app.service';
import { SearchDto } from './app.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    search(searchDto: SearchDto): Promise<any>;
}
