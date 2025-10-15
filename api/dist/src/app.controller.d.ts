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
    getDatabaseInfo(): Promise<{
        success: boolean;
        database: {
            type: string;
            name: any;
            host: string;
            port: string;
            username: string;
            version: any;
            current_user: any;
            server_address: any;
            server_port: any;
            ssl_mode: string;
            schema: string;
            connection_url: string;
        };
        timestamp: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        timestamp: string;
        database?: undefined;
    }>;
}
