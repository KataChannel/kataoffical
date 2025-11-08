declare const testPayload: {
    createdAtFrom: string;
    createdAtTo: string;
    pageSize: number;
    page: number;
};
declare const where: {
    createdAtFrom: string;
    createdAtTo: string;
    pageSize: number;
    page: number;
};
declare const dateFrom: string;
declare const dateTo: string;
declare const whereClause: any;
declare const edgeCases: ({
    name: string;
    from: string;
    to: string;
} | {
    name: string;
    from: string;
    to: undefined;
} | {
    name: string;
    from: undefined;
    to: string;
})[];
