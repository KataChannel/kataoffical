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
    constructor() {
        this.globalFieldMapping = {
            'nhomncc': 'NhomNcc',
            'phieukho': 'PhieuKho',
            'sanphamkho': 'SanphamKho',
            'tonkho': 'TonKho',
            'phieukhosanpham': 'PhieuKhoSanpham',
            'donhangsanpham': 'Donhangsanpham',
            'dathangsanpham': 'Dathangsanpham',
            'banggiasanpham': 'Banggiasanpham',
            'chotkhodetail': 'chotkhodetail',
            'auditlog': 'AuditLog',
        };
        this.modelFieldMapping = {
            'nhacungcap': {
                'sanpham': 'Sanpham',
                'nhomncc': 'NhomNcc',
            },
            'sanpham': {
                'nhacungcap': 'Nhacungcap',
                'sanphamkho': 'SanphamKho',
                'tonkho': 'TonKho',
                'donhangsanpham': 'Donhangsanpham',
                'dathangsanpham': 'Dathangsanpham',
            }
        };
    }
    getFieldSelection(info, modelName) {
        try {
            const fields = graphqlFields(info);
            return this.convertFieldsToPrismaSelect(fields, modelName);
        }
        catch (error) {
            console.warn('⚠️ Field selection parsing failed, using default:', error.message);
            return undefined;
        }
    }
    normalizeSelection(selection, modelName) {
        if (!selection || typeof selection !== 'object')
            return selection;
        return this.convertPrismaObjectToNormalizedPrismaObject(selection, modelName);
    }
    convertPrismaObjectToNormalizedPrismaObject(obj, modelName) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return obj;
        const normalized = {};
        const normalizedModelName = modelName?.toLowerCase();
        for (let [key, value] of Object.entries(obj)) {
            let mappedKey = key;
            const normalizedKey = key.toLowerCase();
            if (normalizedModelName && this.modelFieldMapping[normalizedModelName]?.[normalizedKey]) {
                mappedKey = this.modelFieldMapping[normalizedModelName][normalizedKey];
            }
            else if (this.globalFieldMapping[normalizedKey]) {
                mappedKey = this.globalFieldMapping[normalizedKey];
            }
            if (typeof value === 'object' && value !== null) {
                normalized[mappedKey] = this.convertPrismaObjectToNormalizedPrismaObject(value);
            }
            else {
                normalized[mappedKey] = value;
            }
        }
        return normalized;
    }
    convertFieldsToPrismaSelect(fields, modelName) {
        const select = {};
        const include = {};
        let hasRelations = false;
        let hasScalarFields = false;
        const normalizedModelName = modelName?.toLowerCase();
        for (let [fieldName, fieldValue] of Object.entries(fields)) {
            const normalizedFieldName = fieldName.toLowerCase();
            if (normalizedModelName && this.modelFieldMapping[normalizedModelName]?.[normalizedFieldName]) {
                fieldName = this.modelFieldMapping[normalizedModelName][normalizedFieldName];
            }
            else if (this.globalFieldMapping[normalizedFieldName]) {
                fieldName = this.globalFieldMapping[normalizedFieldName];
            }
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
            if (safeSelect.roles) {
                safeSelect.roles = {
                    include: {
                        role: {
                            select: {
                                id: true,
                                name: true,
                                createdAt: true,
                                updatedAt: true
                            }
                        }
                    }
                };
            }
            return {
                ...selection,
                select: safeSelect
            };
        }
        if (selection.include && selection.include.roles) {
            return {
                ...selection,
                include: {
                    ...selection.include,
                    roles: {
                        include: {
                            role: {
                                select: {
                                    id: true,
                                    name: true,
                                    createdAt: true,
                                    updatedAt: true
                                }
                            }
                        }
                    }
                }
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