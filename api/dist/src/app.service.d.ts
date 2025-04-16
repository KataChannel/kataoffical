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
    private readonly appId;
    processCallback(param: CallbackDataInput): Promise<CallbackDataOutput>;
    private doCallBackData;
    private saveCallBack;
    private deleteCallBack;
    private generateSHA256HMAC;
}
