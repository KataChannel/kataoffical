"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLoaderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const dataloader_1 = require("dataloader");
let DataLoaderService = class DataLoaderService {
    constructor(prisma) {
        this.prisma = prisma;
        this.loaders = new Map();
    }
    getLoader(modelName, relationField, keyField = 'id') {
        const loaderKey = `${modelName}_${relationField}_${keyField}`;
        if (!this.loaders.has(loaderKey)) {
            const loader = new dataloader_1.default(async (keys) => {
                console.log(`🔄 DataLoader batch loading for ${loaderKey}:`, keys.length, 'items');
                try {
                    const model = this.prisma[modelName.toLowerCase()];
                    if (!model) {
                        throw new Error(`Model ${modelName} not found`);
                    }
                    const results = await model.findMany({
                        where: {
                            [keyField]: {
                                in: Array.from(keys)
                            }
                        },
                        include: {
                            [relationField]: true
                        }
                    });
                    const groupedResults = new Map();
                    keys.forEach(key => groupedResults.set(key, []));
                    results.forEach((item) => {
                        const key = item[keyField];
                        const relationData = item[relationField];
                        if (Array.isArray(relationData)) {
                            groupedResults.set(key, relationData);
                        }
                        else if (relationData) {
                            groupedResults.set(key, [relationData]);
                        }
                    });
                    return keys.map(key => groupedResults.get(key) || []);
                }
                catch (error) {
                    console.error(`❌ DataLoader error for ${loaderKey}:`, error);
                    throw error;
                }
            }, {
                cacheKeyFn: (key) => String(key),
                maxBatchSize: 100,
            });
            this.loaders.set(loaderKey, loader);
        }
        return this.loaders.get(loaderKey);
    }
    getSingleLoader(modelName, keyField = 'id') {
        const loaderKey = `${modelName}_single_${keyField}`;
        if (!this.loaders.has(loaderKey)) {
            const loader = new dataloader_1.default(async (keys) => {
                console.log(`🔄 DataLoader single batch loading for ${loaderKey}:`, keys.length, 'items');
                try {
                    const model = this.prisma[modelName.toLowerCase()];
                    if (!model) {
                        throw new Error(`Model ${modelName} not found`);
                    }
                    const results = await model.findMany({
                        where: {
                            [keyField]: {
                                in: Array.from(keys)
                            }
                        }
                    });
                    const resultMap = new Map();
                    results.forEach((item) => {
                        resultMap.set(item[keyField], item);
                    });
                    return keys.map(key => resultMap.get(key) || null);
                }
                catch (error) {
                    console.error(`❌ DataLoader single error for ${loaderKey}:`, error);
                    throw error;
                }
            }, {
                cacheKeyFn: (key) => String(key),
                maxBatchSize: 100,
            });
            this.loaders.set(loaderKey, loader);
        }
        return this.loaders.get(loaderKey);
    }
    async loadRelatedData(modelName, relationField, parentId, keyField = 'id') {
        const loader = this.getLoader(modelName, relationField, keyField);
        return loader.load(parentId);
    }
    async loadSingleRelatedData(modelName, id, keyField = 'id') {
        const loader = this.getSingleLoader(modelName, keyField);
        return loader.load(id);
    }
    clearCache() {
        console.log('🗑️ Clearing all DataLoader caches');
        this.loaders.forEach(loader => loader.clearAll());
    }
    clearLoaderCache(modelName, relationField, keyField = 'id') {
        const loaderKey = relationField
            ? `${modelName}_${relationField}_${keyField}`
            : `${modelName}_single_${keyField}`;
        const loader = this.loaders.get(loaderKey);
        if (loader) {
            console.log(`🗑️ Clearing cache for ${loaderKey}`);
            loader.clearAll();
        }
    }
    async preloadData(modelName, ids, relationField, keyField = 'id') {
        if (ids.length === 0)
            return;
        const loader = relationField
            ? this.getLoader(modelName, relationField, keyField)
            : this.getSingleLoader(modelName, keyField);
        await Promise.all(ids.map(id => loader.load(id)));
        console.log(`🚀 Preloaded ${ids.length} items for ${modelName}${relationField ? `.${relationField}` : ''}`);
    }
};
exports.DataLoaderService = DataLoaderService;
exports.DataLoaderService = DataLoaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DataLoaderService);
//# sourceMappingURL=dataloader.service.js.map