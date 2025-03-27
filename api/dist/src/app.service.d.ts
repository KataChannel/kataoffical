import { PrismaService } from 'prisma/prisma.service';
import { SearchDto } from './app.dto';
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
}
