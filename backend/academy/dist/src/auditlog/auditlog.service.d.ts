import { PrismaService } from 'prisma/prisma.service';
export declare class AuditLogService {
    private prisma;
    constructor(prisma: PrismaService);
    getLogs(entity: string, entityId: string): Promise<{
        id: string;
        userId: string;
        action: string | null;
        entity: string | null;
        entityId: string | null;
        oldValue: import("@prisma/client/runtime/library").JsonValue | null;
        newValue: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
    }[]>;
}
