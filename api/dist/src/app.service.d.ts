import { PrismaService } from 'prisma/prisma.service';
import { SearchDto } from './app.dto';
import { CallbackDataInput } from './callback/dto/callback-data-input.dto';
import { CallbackDataOutput } from './callback/dto/callback-data-output.dto';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    private allowedModels;
    search(searchDto: SearchDto): Promise<any>;
    private buildWhereClause;
    private buildIncludeClause;
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
    private readonly appId;
    processCallback(param: CallbackDataInput): Promise<CallbackDataOutput>;
    private doCallBackData;
    private saveCallBack;
    private deleteCallBack;
    private generateSHA256HMAC;
}
