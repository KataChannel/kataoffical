
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract findMany(modelName: string, where?: Nullable<JSON>, orderBy?: Nullable<JSON>, skip?: Nullable<number>, take?: Nullable<number>, include?: Nullable<JSON>, select?: Nullable<JSON>): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract findUnique(modelName: string, where: JSON, include?: Nullable<JSON>, select?: Nullable<JSON>): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract modelMetadata(modelName: string): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract health(): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract getAvailableModels(): string[] | Promise<string[]>;

    abstract testSelectQuery(modelName: string): JSON | Promise<JSON>;

    abstract aggregateDonhang(where?: Nullable<JSON>): Nullable<AggregateResult> | Promise<Nullable<AggregateResult>>;

    abstract aggregateDathang(where?: Nullable<JSON>): Nullable<AggregateResult> | Promise<Nullable<AggregateResult>>;

    abstract aggregateSanpham(): Nullable<AggregateResult> | Promise<Nullable<AggregateResult>>;

    abstract aggregateKhachhang(): Nullable<AggregateResult> | Promise<Nullable<AggregateResult>>;

    abstract aggregateNhacungcap(): Nullable<AggregateResult> | Promise<Nullable<AggregateResult>>;

    abstract dailyMonthlyReport(batdau: string, ketthuc: string, groupBy: string): DailyMonthlyReportItem[] | Promise<DailyMonthlyReportItem[]>;

    abstract topProductsByQuantity(batdau: string, ketthuc: string, limit: number): TopProductItem[] | Promise<TopProductItem[]>;

    abstract topProductsByValue(batdau: string, ketthuc: string, limit: number): TopProductItem[] | Promise<TopProductItem[]>;
}

export abstract class IMutation {
    abstract createOne(modelName: string, data: JSON, include?: Nullable<JSON>, select?: Nullable<JSON>): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract updateOne(modelName: string, where: JSON, data: JSON, include?: Nullable<JSON>, select?: Nullable<JSON>): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract deleteOne(modelName: string, where: JSON): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract batchCreate(modelName: string, data: JSON[]): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract batchUpdate(modelName: string, items: JSON[]): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract batchDelete(modelName: string, ids: string[]): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract clearDataLoaderCache(modelName?: Nullable<string>): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract createRecord(data: JSON, modelName: string): JSON | Promise<JSON>;

    abstract deleteRecord(modelName: string, where: JSON): JSON | Promise<JSON>;

    abstract updateRecord(data: JSON, modelName: string, where: JSON): JSON | Promise<JSON>;
}

export class AggregateResult {
    _count?: Nullable<CountResult>;
    _sum?: Nullable<SumResult>;
}

export class CountResult {
    _all?: Nullable<number>;
}

export class SumResult {
    tongtien?: Nullable<number>;
    tongvat?: Nullable<number>;
}

export class DailyMonthlyReportItem {
    period: string;
    totalDonhang: number;
    totalRevenue: number;
    totalProfit: number;
}

export class TopProductItem {
    sanpham: ProductInfo;
    totalQuantity: number;
    totalValue: number;
}

export class ProductInfo {
    id: string;
    title?: Nullable<string>;
    masp?: Nullable<string>;
}

export type JSON = any;
export type DateTime = any;
type Nullable<T> = T | null;
