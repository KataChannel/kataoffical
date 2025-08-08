import { PrismaService } from '../../prisma/prisma.service';
import { EnhancedUniversalService } from './enhanced-universal.service';
import { DataLoaderService } from './dataloader.service';
import { FieldSelectionService } from './field-selection.service';

/**
 * GraphQL Context for Nexus schema
 * Provides access to services and utilities for resolvers
 */
export interface Context {
  prisma: PrismaService;
  enhancedService: EnhancedUniversalService;
  dataLoader: DataLoaderService;
  fieldSelection: FieldSelectionService;
  user?: any; // For authentication
  request?: any; // Express request object
}

/**
 * Create GraphQL context for each request
 */
export function createContext(services: {
  prisma: PrismaService;
  enhancedService: EnhancedUniversalService;
  dataLoader: DataLoaderService;
  fieldSelection: FieldSelectionService;
}): (req: any) => Context {
  return (req: any) => ({
    ...services,
    request: req,
    user: req.user, // From authentication middleware
  });
}
