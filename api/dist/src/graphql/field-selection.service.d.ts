import { GraphQLResolveInfo } from 'graphql';
export declare class FieldSelectionService {
    getFieldSelection(info: GraphQLResolveInfo): any;
    private convertFieldsToPrismaSelect;
    private isScalarField;
    private isRelationField;
    optimizeForModel(modelName: string, selection: any): any;
    private optimizeUserSelection;
    private optimizeKhachhangSelection;
    private optimizeSanphamSelection;
    private optimizeDonhangSelection;
    mergeSelections(fieldSelection: any, customSelect?: any): any;
    logFieldSelection(modelName: string, selection: any): void;
}
