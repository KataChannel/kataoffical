import { PrismaService } from 'prisma/prisma.service';
export interface TonkhoOperation {
    sanphamId: string;
    operation: 'increment' | 'decrement' | 'set';
    slton?: number;
    slchogiao?: number;
    slchonhap?: number;
    reason?: string;
}
export interface TonkhoValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
export declare class TonkhoManagerService {
    private prisma;
    constructor(prisma: PrismaService);
    updateTonkhoAtomic(operations: TonkhoOperation[]): Promise<void>;
    validateTonkhoConsistency(): Promise<TonkhoValidationResult>;
    getTonkhoSummary(khoId?: string): Promise<any[]>;
    recalculateTonkho(sanphamIds?: string[]): Promise<{
        fixed: number;
        errors: string[];
    }>;
}
