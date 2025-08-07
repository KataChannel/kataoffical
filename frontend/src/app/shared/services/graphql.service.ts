import { Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../utils/storage.service';
import { ErrorLogService } from './errorlog.service';
import { DateHelpers } from '../utils/date-helpers';
import { firstValueFrom } from 'rxjs';

export interface GraphQLQuery {
  query: string;
  variables?: any;
  operationName?: string;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: (string | number)[];
  }>;
}

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export interface SortInput {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FindManyOptions {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
  include?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private apolloClient!: ApolloClient<any>;
  
  // Signals for reactive state management
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private apollo: Apollo,
    private _StorageService: StorageService,
    private _ErrorLogService: ErrorLogService
  ) {
    // Initialize DateHelpers to suppress moment warnings
    DateHelpers.init();
    
    // Setup Apollo Client
    this.setupApolloClient();
  }

  /**
   * Setup Apollo Client with authentication
   */
  private setupApolloClient() {
    const httpLink = createHttpLink({
      uri: `${environment.APIURL}/graphql`
    });

    const authLink = setContext((_, { headers }) => {
      const token = this._StorageService.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      };
    });

    this.apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only'
        },
        query: {
          fetchPolicy: 'network-only'
        }
      }
    });

  }

  /**
   * Helper method to normalize model names (convert PascalCase to camelCase)
   */
  private normalizeModelName(modelName: string): string {
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }

  /**
   * Helper method to safely format dates for GraphQL queries
   */
  private formatDateForGraphQL(date: Date | string | moment.Moment | null | undefined): string | null {
    if (!date) return null;
    
    try {
      return DateHelpers.formatDateForAPI(date);
    } catch (error) {
      console.warn('Error formatting date for GraphQL:', error);
      return null;
    }
  }

  /**
   * Process filters to ensure dates are properly formatted
   */
  private processFilters(filters: any): any {
    if (!filters) return filters;

    const processedFilters = { ...filters };

    // Common date fields that need formatting
    const dateFields = [
      'startDate', 'endDate', 'fromDate', 'toDate', 'createdAt', 'updatedAt',
      'ngaytao', 'ngaycapnhat', 'ngaygiao', 'ngaydat', 'ngayxuat', 'ngaynhap',
      'batdau', 'ketthuc', 'tungay', 'denngay'
    ];

    for (const field of dateFields) {
      if (processedFilters[field]) {
        processedFilters[field] = this.formatDateForGraphQL(processedFilters[field]);
      }
    }

    // Handle date ranges
    if (processedFilters.dateRange) {
      if (processedFilters.dateRange.start) {
        processedFilters.dateRange.start = this.formatDateForGraphQL(processedFilters.dateRange.start);
      }
      if (processedFilters.dateRange.end) {
        processedFilters.dateRange.end = this.formatDateForGraphQL(processedFilters.dateRange.end);
      }
    }

    return processedFilters;
  }

  /**
   * Execute a GraphQL query or mutation using Apollo Client
   */
  async executeGraphQL<T = any>(query: GraphQLQuery): Promise<GraphQLResponse<T>> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await firstValueFrom(
        this.apollo.query({
          query: gql`${query.query}`,
          variables: query.variables,
          fetchPolicy: 'network-only'
        })
      );

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map(err => err.message).join(', ');
        this.error.set(errorMessage);
        await this._ErrorLogService.logError('GraphQL Error', result.errors);
      }

      return {
        data: result.data as T,
        errors: result.errors ? result.errors.map(err => ({
          message: err.message,
          locations: err.locations ? err.locations.map(loc => ({ line: loc.line, column: loc.column })) : undefined,
          path: err.path ? [...err.path] : undefined
        })) : undefined
      };
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown GraphQL error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('GraphQL Request Failed', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Execute a GraphQL mutation using Apollo Client
   */
  async executeMutation<T = any>(mutation: GraphQLQuery): Promise<GraphQLResponse<T>> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result:any = await firstValueFrom(
        this.apollo.mutate({
          mutation: gql`${mutation.query}`,
          variables: mutation.variables
        })
      );

      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors.map((err:any) => err.message).join(', ');
        this.error.set(errorMessage);
        await this._ErrorLogService.logError('GraphQL Error', result.errors);
      }

      return {
        data: result.data as T,
        errors: result.errors
      };
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown GraphQL error';
      this.error.set(errorMessage);
      await this._ErrorLogService.logError('GraphQL Mutation Failed', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Universal findMany using the actual GraphQL schema
   */
  async findMany<T = any>(
    modelName: string,
    options: FindManyOptions = {}
  ): Promise<GraphQLResponse<{ data: T[]; total: number; page: number; pageSize: number }>> {
    const normalizedModelName = this.normalizeModelName(modelName);
    const processedOptions = {
      ...options,
      where: this.processFilters(options.where)
    };

    const query = `
      query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          skip: $skip
          take: $take
          include: $include
        )
      }
    `;

    try {
      const result = await this.executeGraphQL<any>({
        query,
        variables: {
          modelName: normalizedModelName,
          ...processedOptions
        }
      });
      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error(result.errors.map(e => e.message).join(', '));
      }

      // The universal resolver returns data directly, so we need to format it
      if (result.data?.findMany) {
        return {
          data: {
            data: result.data.findMany,
            total: result.data.findMany.length,
            page: 1,
            pageSize: result.data.findMany.length
          },
          errors: result.errors
        };
      }

      return result;
    } catch (error) {
      console.error(`Error in findMany for model ${normalizedModelName}:`, error);
      throw error;
    }
  }

  /**
   * Universal findUnique using model-specific queries
   */
  async findOne<T = any>(
    modelName: string,
    where: any,
    include?: any
  ): Promise<T | null> {
    const normalizedModelName = this.normalizeModelName(modelName);

    const query = `
      query FindOne($where: JSON, $include: JSON) {
        ${normalizedModelName}(where: $where, include: $include)
      }
    `;

    try {
      const result = await this.executeGraphQL<any>({
        query,
        variables: { where, include }
      });

      return result.data?.[normalizedModelName] || null;
    } catch (error) {
      console.error(`Error in findOne for model ${normalizedModelName}:`, error);
      return null;
    }
  }

  /**
   * Universal create using mutations
   */
  async create<T = any>(
    modelName: string,
    data: any,
    include?: any
  ): Promise<T> {
    const normalizedModelName = this.normalizeModelName(modelName);

    const mutation = `
      mutation Create($data: JSON!, $include: JSON) {
        create${modelName}(data: $data, include: $include)
      }
    `;

    const result = await this.executeMutation<any>({
      query: mutation,
      variables: { data: this.processFilters(data), include }
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data?.[`create${modelName}`];
  }

  /**
   * Universal update using mutations
   */
  async update<T = any>(
    modelName: string,
    where: any,
    data: any,
    include?: any
  ): Promise<T> {
    const mutation = `
      mutation Update($where: JSON!, $data: JSON!, $include: JSON) {
        update${modelName}(where: $where, data: $data, include: $include)
      }
    `;

    const result = await this.executeMutation<any>({
      query: mutation,
      variables: { where, data: this.processFilters(data), include }
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data?.[`update${modelName}`];
  }

  /**
   * Universal delete using mutations
   */
  async delete<T = any>(
    modelName: string,
    where: any
  ): Promise<T> {
    const mutation = `
      mutation Delete($where: JSON!) {
        delete${modelName}(where: $where)
      }
    `;

    const result = await this.executeMutation<any>({
      query: mutation,
      variables: { where }
    });

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data?.[`delete${modelName}`];
  }

  /**
   * Simplified search method
   */
  async search<T = any>(
    modelName: string,
    searchTerm: string,
    searchFields: string[],
    options: FindManyOptions = {}
  ): Promise<{ data: T[]; total: number }> {
    const where = {
      OR: searchFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      })),
      ...options.where
    };

    const result = await this.findMany<T>(modelName, { ...options, where });
    
    return {
      data: result.data?.data || [],
      total: result.data?.total || 0
    };
  }

  /**
   * Debug method to test GraphQL connection
   */
  async debugQuery(): Promise<any> {
    try {
      // Test schema introspection
      const schemaQuery = `
        query IntrospectSchema {
          __schema {
            types {
              name
              kind
            }
          }
        }
      `;

      const schemaResult = await this.executeGraphQL({ query: schemaQuery });
      
      // Test available models
      const availableModels = ['khachhang', 'sanpham', 'donhang', 'dathang', 'nhacungcap'];
      
      console.log('Available types:', schemaResult.data?.__schema?.types
        ?.filter((t: any) => !t.name.startsWith('__'))
        ?.map((t: any) => t.name)
      );

      // Test a simple query
      const testResult = await this.findMany('khachhang', { take: 1 });
      
      return {
        schema: schemaResult,
        testQuery: testResult,
        availableModels
      };
    } catch (error) {
      console.error('Debug query failed:', error);
      throw error;
    }
  }

  /**
   * Get specific model data with proper typing
   */
  async getKhachhangs(options: FindManyOptions = {}) {
    return this.findMany('khachhang', options);
  }

  async getSanphams(options: FindManyOptions = {}) {
    return this.findMany('sanpham', options);
  }

  async getDonhangs(options: FindManyOptions = {}) {
    return this.findMany('donhang', options);
  }

  async getDathangs(options: FindManyOptions = {}) {
    return this.findMany('dathang', options);
  }

  async getNhacungcaps(options: FindManyOptions = {}) {
    return this.findMany('nhacungcap', options);
  }

  /**
   * Utility methods
   */
  clearError(): void {
    this.error.set(null);
  }

  isLoadingState(): boolean {
    return this.isLoading();
  }

  getCurrentError(): string | null {
    return this.error();
  }

  /**
   * Refresh Apollo Client cache
   */
  async refreshCache(): Promise<void> {
    await this.apolloClient.resetStore();
  }

  /**
   * Clear Apollo Client cache
   */
  async clearCache(): Promise<void> {
    await this.apolloClient.clearStore();
  }
}
