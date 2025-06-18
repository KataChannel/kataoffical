import { Signal } from '@angular/core';

export interface ServiceInterface<T> {
  ListComponent: Signal<T[]>;
  DetailComponent: Signal<T | null>;
  page: Signal<number>;
  totalPages: Signal<number>;
  total: Signal<number>;
  pageSize: Signal<number>;
  componentId: Signal<string | null>;
  ImportComponent(dulieu: T): Promise<void>;
  CreateComponent(dulieu: T): Promise<void>;
  getAllComponent(queryParams?: any, forceRefresh?: boolean): Promise<T[]>;
  getUpdatedCodeIds(): Promise<string[] | undefined>;
  getComponentBy(param?: any): Promise<void>;
  SearchBy(param: any): Promise<void>;
  updateComponent(dulieu: T): Promise<void>;
  DeleteComponent(component: T): Promise<void>;
  setComponentId(id: string | null): void;
  listenComponentUpdates(): void;
}