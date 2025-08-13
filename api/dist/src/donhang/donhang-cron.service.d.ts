import { PrismaService } from 'prisma/prisma.service';
import { TimezoneUtilService } from '../shared/services/timezone-util.service';
export declare class DonhangCronService {
    private readonly prisma;
    private readonly timezoneUtil;
    private readonly logger;
    constructor(prisma: PrismaService, timezoneUtil: TimezoneUtilService);
    autoCompleteOrdersDaily(): Promise<void>;
    private convertToVietnamTime;
    private createAuditLog;
    manualAutoComplete(dateString?: string): Promise<any>;
}
