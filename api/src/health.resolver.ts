import { Resolver, Query } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@Resolver()
export class HealthResolver {
  @Query(() => GraphQLJSON, { 
    name: 'health',
    description: 'GraphQL health check endpoint'
  })
  async health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '2.0.0-enhanced',
      graphql: 'active',
      features: [
        'dynamic-field-selection',
        'dataloader-optimization',
        'performance-monitoring',
        'enhanced-resolvers'
      ]
    };
  }
}