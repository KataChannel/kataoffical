import { PrismaService } from 'prisma/prisma.service';
export declare class DonhangCronService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    autoCompleteOrdersDaily(): Promise<void>;
    private convertToVietnamTime;
    private createAuditLog;
    manualAutoComplete(dateString?: string): Promise<any>;
    private createManualAuditLog;
}
