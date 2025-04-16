import { AppService } from './app.service';
import { SearchDto } from './app.dto';
import { CallbackDataInput } from './callback/dto/callback-data-input.dto';
import { CallbackDataOutput } from './callback/dto/callback-data-output.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getVersion(): string;
    callBackData(param: CallbackDataInput): Promise<CallbackDataOutput>;
    search(searchDto: SearchDto): Promise<any>;
    getLastUpdated(table: string): Promise<{
        table: string;
        updatedAt: number;
    }>;
}
