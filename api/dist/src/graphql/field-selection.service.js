"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSelectionService = void 0;
const common_1 = require("@nestjs/common");
const graphqlFields = require("graphql-fields");
let FieldSelectionService = class FieldSelectionService {
    getFieldSelection(info) {
        try {
            const fields = graphqlFields(info);
            return this.convertFieldsToPrismaSelect(fields);
        }
        catch (error) {
            console.warn('⚠️ Field selection parsing failed, using default:', error.message);
            return undefined;
        }
    }
    convertFieldsToPrismaSelect(fields) {
        const select = {};
        const include = {};
        let hasRelations = false;
        let hasScalarFields = false;
        for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (this.isScalarField(fieldName)) {
                select[fieldName] = true;
                hasScalarFields = true;
            }
            else if (this.isRelationField(fieldName, fieldValue)) {
                const nestedSelection = this.convertFieldsToPrismaSelect(fieldValue);
                include[fieldName] = nestedSelection;
                hasRelations = true;
            }
            else {
                select[fieldName] = true;
                hasScalarFields = true;
            }
        }
        const result = {};
        if (hasScalarFields && Object.keys(select).length > 0) {
            result.select = select;
        }
        if (hasRelations && Object.keys(include).length > 0) {
            if (result.select) {
                result.select = {
                    ...result.select,
                    ...include
                };
            }
            else {
                result.include = include;
            }
        }
        return Object.keys(result).length > 0 ? result : undefined;
    }
    isScalarField(fieldName) {
        const scalarFields = [
            'id', 'createdAt', 'updatedAt', 'name', 'email', 'title', 'description',
            'price', 'quantity', 'status', 'active', 'enabled', 'deleted',
            'slug', 'code', 'type', 'category', 'tag', 'value', 'count',
            'amount', 'total', 'subtotal', 'tax', 'discount',
            'firstName', 'lastName', 'phone', 'address', 'city', 'country',
            'zipCode', 'postalCode', 'website', 'company', 'position',
            'birthDate', 'gender', 'avatar', 'image', 'url', 'path',
            'content', 'body', 'summary', 'excerpt', 'metadata',
            'sort', 'order', 'priority', 'weight', 'score', 'rating',
            'views', 'likes', 'shares', 'comments', 'downloads',
            'version', 'revision', 'hash', 'checksum', 'signature'
        ];
        return scalarFields.includes(fieldName) ||
            fieldName.endsWith('Id') ||
            fieldName.endsWith('At') ||
            fieldName.endsWith('Count') ||
            fieldName.endsWith('Total') ||
            fieldName.startsWith('is') ||
            fieldName.startsWith('has') ||
            fieldName.startsWith('can');
    }
    isRelationField(fieldName, fieldValue) {
        return typeof fieldValue === 'object' &&
            fieldValue !== null &&
            Object.keys(fieldValue).length > 0 &&
            !this.isScalarField(fieldName);
    }
    optimizeForModel(modelName, selection) {
        if (!selection)
            return selection;
        switch (modelName.toLowerCase()) {
            case 'user':
                return this.optimizeUserSelection(selection);
            case 'khachhang':
                return this.optimizeKhachhangSelection(selection);
            case 'sanpham':
                return this.optimizeSanphamSelection(selection);
            case 'donhang':
                return this.optimizeDonhangSelection(selection);
            default:
                return selection;
        }
    }
    optimizeUserSelection(selection) {
        if (selection.select) {
            const { password, refreshToken, ...safeSelect } = selection.select;
            return {
                ...selection,
                select: safeSelect
            };
        }
        return selection;
    }
    optimizeKhachhangSelection(selection) {
        if (selection.select && !selection.include) {
            return {
                ...selection,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    ...selection.select
                }
            };
        }
        return selection;
    }
    optimizeSanphamSelection(selection) {
        if (selection.select && !selection.include) {
            return {
                ...selection,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    inStock: true,
                    ...selection.select
                }
            };
        }
        return selection;
    }
    optimizeDonhangSelection(selection) {
        if (selection.select && !selection.include) {
            return {
                ...selection,
                select: {
                    id: true,
                    orderNumber: true,
                    status: true,
                    total: true,
                    createdAt: true,
                    ...selection.select
                }
            };
        }
        return selection;
    }
    mergeSelections(fieldSelection, customSelect) {
        if (!fieldSelection && !customSelect)
            return undefined;
        if (!fieldSelection)
            return customSelect;
        if (!customSelect)
            return fieldSelection;
        const mergedSelect = {
            ...fieldSelection.select,
            ...customSelect
        };
        const mergedInclude = {
            ...fieldSelection.include
        };
        const result = {};
        if (Object.keys(mergedSelect).length > 0) {
            result.select = mergedSelect;
        }
        if (Object.keys(mergedInclude).length > 0) {
            if (result.select) {
                result.select = {
                    ...result.select,
                    ...mergedInclude
                };
            }
            else {
                result.include = mergedInclude;
            }
        }
        return Object.keys(result).length > 0 ? result : undefined;
    }
    logFieldSelection(modelName, selection) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🔍 Field selection for ${modelName}:`, JSON.stringify(selection, null, 2));
        }
    }
};
exports.FieldSelectionService = FieldSelectionService;
exports.FieldSelectionService = FieldSelectionService = __decorate([
    (0, common_1.Injectable)()
], FieldSelectionService);
//# sourceMappingURL=field-selection.service.js.map