import { PrismaService } from 'prisma/prisma.service';
import { DonhangService } from './donhang.service';
export declare class DonhangCronService {
    private readonly prisma;
    private readonly donhangService;
    private readonly logger;
    constructor(prisma: PrismaService, donhangService: DonhangService);
    autoCompleteOrdersDaily(): Promise<void>;
    private convertToVietnamTime;
    private createAuditLog;
    manualAutoComplete(dateString?: string): Promise<any>;
    private createManualAuditLog;
}
