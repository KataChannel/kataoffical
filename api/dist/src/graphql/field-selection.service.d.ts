import { GraphQLResolveInfo } from 'graphql';
export declare class FieldSelectionService {
    private readonly globalFieldMapping;
    private readonly modelFieldMapping;
    getFieldSelection(info: GraphQLResolveInfo, modelName?: string): any;
    normalizeSelection(selection: any, modelName?: string): any;
    private convertPrismaObjectToNormalizedPrismaObject;
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
