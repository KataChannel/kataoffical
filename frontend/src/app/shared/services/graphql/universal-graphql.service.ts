import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  FIND_ALL_UNIVERSAL,
  FIND_ONE_UNIVERSAL,
  CREATE_ONE_UNIVERSAL,
  CREATE_BULK_UNIVERSAL,
  UPDATE_ONE_UNIVERSAL,
  UPDATE_BULK_UNIVERSAL,
  DELETE_ONE_UNIVERSAL,
  DELETE_BULK_UNIVERSAL
} from '../../graphql/universal.operations';

// Universal interfaces
export interface QueryOptions {
  where?: any;
  orderBy?: any;
  skip?: number;
  take?: number;
}

export interface BulkOperationResult {
  count: number;
  successfulItems: any[];
  failedItems: any[];
}

export interface ModelService<T = any> {
  findAll(options?: QueryOptions): Observable<T[]>;
  findOne(where: any): Observable<T | null>;
  createOne(data: Partial<T>): Observable<T>;
  createBulk(data: Partial<T>[]): Observable<BulkOperationResult>;
  updateOne(where: any, data: Partial<T>): Observable<T>;
  updateBulk(where: any, data: Partial<T>): Observable<BulkOperationResult>;
  deleteOne(where: any): Observable<T>;
  deleteBulk(where: any): Observable<BulkOperationResult>;
}

@Injectable({
  providedIn: 'root'
})
export class UniversalGraphQLService {
  constructor(private apollo: Apollo) {}

  // Find all records for a model
  findAll<T = any>(modelName: string, options: QueryOptions = {}): Observable<T[]> {
    const whereJson = options.where ? JSON.stringify(options.where) : undefined;
    const orderByJson = options.orderBy ? JSON.stringify(options.orderBy) : undefined;

    return this.apollo.query({
      query: FIND_ALL_UNIVERSAL,
      variables: {
        modelName,
        where: whereJson,
        orderBy: orderByJson,
        skip: options.skip,
        take: options.take
      }
    }).pipe(
      map((result: any) => {
        const data = result.data?.findAllUniversal;
        return data ? JSON.parse(data) : [];
      })
    );
  }

  // Find one record for a model
  findOne<T = any>(modelName: string, where: any): Observable<T | null> {
    return this.apollo.query({
      query: FIND_ONE_UNIVERSAL,
      variables: {
        modelName,
        where: JSON.stringify(where)
      }
    }).pipe(
      map((result: any) => {
        const data = result.data?.findOneUniversal;
        return data ? JSON.parse(data) : null;
      })
    );
  }

  // Create one record for a model
  createOne<T = any>(modelName: string, data: Partial<T>): Observable<T> {
    return this.apollo.mutate({
      mutation: CREATE_ONE_UNIVERSAL,
      variables: {
        modelName,
        data: JSON.stringify(data)
      }
    }).pipe(
      map((result: any) => {
        const responseData = result.data?.createOneUniversal;
        return responseData ? JSON.parse(responseData) : null;
      })
    );
  }

  // Create multiple records for a model
  createBulk<T = any>(modelName: string, data: Partial<T>[]): Observable<BulkOperationResult> {
    return this.apollo.mutate({
      mutation: CREATE_BULK_UNIVERSAL,
      variables: {
        modelName,
        data: JSON.stringify(data)
      }
    }).pipe(
      map((result: any) => result.data?.createBulkUniversal || { count: 0, successfulItems: [], failedItems: [] })
    );
  }

  // Update one record for a model
  updateOne<T = any>(modelName: string, where: any, data: Partial<T>): Observable<T> {
    return this.apollo.mutate({
      mutation: UPDATE_ONE_UNIVERSAL,
      variables: {
        modelName,
        where: JSON.stringify(where),
        data: JSON.stringify(data)
      }
    }).pipe(
      map((result: any) => {
        const responseData = result.data?.updateOneUniversal;
        return responseData ? JSON.parse(responseData) : null;
      })
    );
  }

  // Update multiple records for a model
  updateBulk<T = any>(modelName: string, where: any, data: Partial<T>): Observable<BulkOperationResult> {
    return this.apollo.mutate({
      mutation: UPDATE_BULK_UNIVERSAL,
      variables: {
        modelName,
        where: JSON.stringify(where),
        data: JSON.stringify(data)
      }
    }).pipe(
      map((result: any) => result.data?.updateBulkUniversal || { count: 0, successfulItems: [], failedItems: [] })
    );
  }

  // Delete one record for a model
  deleteOne<T = any>(modelName: string, where: any): Observable<T> {
    return this.apollo.mutate({
      mutation: DELETE_ONE_UNIVERSAL,
      variables: {
        modelName,
        where: JSON.stringify(where)
      }
    }).pipe(
      map((result: any) => {
        const responseData = result.data?.deleteOneUniversal;
        return responseData ? JSON.parse(responseData) : null;
      })
    );
  }

  // Delete multiple records for a model
  deleteBulk<T = any>(modelName: string, where: any): Observable<BulkOperationResult> {
    return this.apollo.mutate({
      mutation: DELETE_BULK_UNIVERSAL,
      variables: {
        modelName,
        where: JSON.stringify(where)
      }
    }).pipe(
      map((result: any) => result.data?.deleteBulkUniversal || { count: 0, successfulItems: [], failedItems: [] })
    );
  }

  // Create a model-specific service
  createModelService<T = any>(modelName: string): ModelService<T> {
    return {
      findAll: (options?: QueryOptions) => this.findAll<T>(modelName, options),
      findOne: (where: any) => this.findOne<T>(modelName, where),
      createOne: (data: Partial<T>) => this.createOne<T>(modelName, data),
      createBulk: (data: Partial<T>[]) => this.createBulk<T>(modelName, data),
      updateOne: (where: any, data: Partial<T>) => this.updateOne<T>(modelName, where, data),
      updateBulk: (where: any, data: Partial<T>) => this.updateBulk<T>(modelName, where, data),
      deleteOne: (where: any) => this.deleteOne<T>(modelName, where),
      deleteBulk: (where: any) => this.deleteBulk<T>(modelName, where)
    };
  }
}