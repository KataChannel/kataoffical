import { PrismaService } from '../../prisma/prisma.service';
import { EnhancedUniversalService } from './enhanced-universal.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';
export interface Context {
    prisma: PrismaService;
    enhancedService: EnhancedUniversalService;
    dataLoader: DataLoaderService;
    fieldSelection: FieldSelectionService;
    user?: any;
    request?: any;
}
export declare function createContext(services: {
    prisma: PrismaService;
    enhancedService: EnhancedUniversalService;
    dataLoader: DataLoaderService;
    fieldSelection: FieldSelectionService;
}): (req: any) => Context;
