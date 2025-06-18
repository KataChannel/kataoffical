import { Signal } from '@angular/core';
export interface ServiceInterface {
    ListComponent: Signal<any[]>;
    DetailComponent: Signal<any>;
    page: Signal<number>;
    totalPages: Signal<number>;
    total: Signal<number>;
    pageSize: Signal<number>;
    componentId: Signal<string | null>;
    ImportComponent(dulieu: any): Promise<void>;
    CreateComponent(dulieu: any): Promise<void>;
    getAllComponent(queryParams?: any, forceRefresh?: boolean): Promise<any[]>;
    getUpdatedCodeIds(): Promise<any[] | undefined>;
    getComponentBy(param?: any): Promise<void>;
    SearchBy(param: any): Promise<void>;
    updateComponent(dulieu: any): Promise<void>;
    DeleteComponent(component: any): Promise<void>;
    setComponentId(id: string | null): void;
    listenComponentUpdates(): void;
}
