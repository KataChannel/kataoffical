// Export all GraphQL services
export * from './user-graphql.service';
export * from './affiliate-link-graphql.service';

// Export common types
export interface BulkOperationResult {
  count: number;
  success: boolean;
  message?: string;
}

// Export generic GraphQL response wrapper
export interface GraphQLResponse<T> {
  data: T;
  loading: boolean;
  error?: any;
}