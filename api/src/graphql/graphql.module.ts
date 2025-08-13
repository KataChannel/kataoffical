import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UniversalResolver } from './universal.resolver';
import { UniversalService } from './universal.service';
import { EnhancedUniversalResolver } from './enhanced-universal.resolver';
import { EnhancedUniversalService } from './enhanced-universal.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';
import { GraphQLPerformanceService } from './performance.service';
import { DashboardResolver } from '../dashboard/dashboard.resolver';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  providers: [
    // Original universal services (keep for backward compatibility)
    UniversalResolver, 
    UniversalService,
    
    // Enhanced GraphQL services with dynamic field selection
    EnhancedUniversalResolver,
    EnhancedUniversalService,
    DataLoaderService,
    FieldSelectionService,
    GraphQLPerformanceService,
    
    // Dashboard resolver
    DashboardResolver,
  ],
  exports: [
    UniversalService,
    EnhancedUniversalService,
    DataLoaderService,
    FieldSelectionService,
    GraphQLPerformanceService,
  ],
})
export class GraphQLUniversalModule {}
