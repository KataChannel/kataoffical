import { PrismaService } from 'prisma/prisma.service';
export declare class AuditLogService {
    private prisma;
    constructor(prisma: PrismaService);
    getLogs(entity: string, entityId: string): Promise<any>;
}
