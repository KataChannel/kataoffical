"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_CONFIGURATIONS = void 0;
exports.registerAllModels = registerAllModels;
exports.getModelConfig = getModelConfig;
const dynamic_resolver_factory_1 = require("./dynamic-resolver.factory");
exports.MODEL_CONFIGURATIONS = [
    {
        name: 'User',
        pluralName: 'users',
        fields: {
            id: 'String',
            codeId: 'String',
            name: 'String',
            avatar: 'String',
            gender: 'String',
            email: 'String',
            SDT: 'String',
            phone: 'String',
            zaloId: 'String',
            facebookId: 'String',
            googleId: 'String',
            password: 'String',
            provider: 'String',
            providerId: 'String',
            isSuperAdmin: 'Boolean',
            isCTV: 'Boolean',
            isActive: 'Boolean',
            createdAt: 'DateTime',
            updatedAt: 'DateTime',
            registrationSource: 'String',
            inviteCode: 'String',
            affiliateCode: 'String',
            referrerId: 'String',
            ghichu: 'String'
        },
        requiredFields: ['isSuperAdmin', 'isCTV', 'isActive'],
        uniqueFields: ['id', 'codeId', 'email', 'inviteCode'],
        relations: {
            referrer: 'User',
            referrals: 'User',
            roles: 'UserRole'
        }
    },
    {
        name: 'Role',
        pluralName: 'roles',
        fields: {
            id: 'String',
            name: 'String',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['name'],
        uniqueFields: ['id', 'name'],
        relations: {
            permissions: 'RolePermission',
            users: 'UserRole'
        }
    },
    {
        name: 'Permission',
        pluralName: 'permissions',
        fields: {
            id: 'String',
            name: 'String',
            description: 'String',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['name'],
        uniqueFields: ['id', 'name'],
        relations: {
            roles: 'RolePermission'
        }
    },
    {
        name: 'Menu',
        pluralName: 'menus',
        fields: {
            id: 'String',
            title: 'String',
            icon: 'String',
            slug: 'String',
            parentId: 'String',
            order: 'Int',
            isActive: 'Boolean',
            serviceType: 'String',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['title', 'isActive'],
        uniqueFields: ['id'],
        relations: {
            parent: 'Menu',
            children: 'Menu'
        }
    },
    {
        name: 'AffiliateLink',
        pluralName: 'affiliateLinks',
        fields: {
            id: 'String',
            codeId: 'String',
            landingPageId: 'String',
            campaignName: 'String',
            description: 'String',
            utmSource: 'String',
            utmMedium: 'String',
            utmCampaign: 'String',
            utmTerm: 'String',
            utmContent: 'String',
            url: 'String',
            order: 'Int',
            isActive: 'Boolean',
            createdAt: 'DateTime',
            updatedAt: 'DateTime',
            createdById: 'String'
        },
        requiredFields: ['order', 'isActive'],
        uniqueFields: ['id', 'codeId'],
        relations: {
            landingPage: 'LandingPage',
            createdBy: 'User'
        }
    },
    {
        name: 'LandingPage',
        pluralName: 'landingPages',
        fields: {
            id: 'String',
            codeId: 'String',
            title: 'String',
            description: 'String',
            content: 'String',
            templateName: 'String',
            slug: 'String',
            metaTitle: 'String',
            metaDescription: 'String',
            metaKeywords: 'String',
            isActive: 'Boolean',
            order: 'Int',
            createdAt: 'DateTime',
            updatedAt: 'DateTime',
            createdById: 'String'
        },
        requiredFields: ['isActive', 'order'],
        uniqueFields: ['id', 'codeId', 'slug'],
        relations: {
            createdBy: 'User',
            affiliateLinks: 'AffiliateLink'
        }
    },
    {
        name: 'TrackingEvent',
        pluralName: 'trackingEvents',
        fields: {
            id: 'String',
            eventType: 'String',
            eventData: 'String',
            ipAddress: 'String',
            userAgent: 'String',
            referrer: 'String',
            sessionId: 'String',
            userId: 'String',
            affiliateLinkId: 'String',
            createdAt: 'DateTime'
        },
        requiredFields: ['eventType'],
        uniqueFields: ['id'],
        relations: {
            user: 'User',
            affiliateLink: 'AffiliateLink'
        }
    },
    {
        name: 'ChatAIMessage',
        pluralName: 'chatAIMessages',
        fields: {
            id: 'String',
            conversationId: 'String',
            sender: 'String',
            message: 'String',
            response: 'String',
            model: 'String',
            tokens: 'Int',
            cost: 'Float',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['sender', 'message'],
        uniqueFields: ['id'],
        relations: {}
    },
    {
        name: 'AuditLog',
        pluralName: 'auditLogs',
        fields: {
            id: 'String',
            action: 'String',
            entity: 'String',
            entityId: 'String',
            oldValues: 'String',
            newValues: 'String',
            userId: 'String',
            ipAddress: 'String',
            userAgent: 'String',
            createdAt: 'DateTime'
        },
        requiredFields: ['action', 'entity'],
        uniqueFields: ['id'],
        relations: {
            user: 'User'
        }
    },
    {
        name: 'Resource',
        pluralName: 'resources',
        fields: {
            id: 'String',
            codeId: 'String',
            title: 'String',
            url: 'String',
            description: 'String',
            type: 'String',
            isActive: 'Boolean',
            order: 'Int',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['isActive', 'order'],
        uniqueFields: ['id', 'codeId'],
        relations: {}
    },
    {
        name: 'FileManager',
        pluralName: 'fileManagers',
        fields: {
            id: 'String',
            codeId: 'String',
            fileName: 'String',
            originalName: 'String',
            filePath: 'String',
            fileSize: 'Int',
            mimeType: 'String',
            isActive: 'Boolean',
            order: 'Int',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['fileName', 'isActive', 'order'],
        uniqueFields: ['id', 'codeId'],
        relations: {}
    },
    {
        name: 'Doanhso',
        pluralName: 'doanhsos',
        fields: {
            id: 'String',
            userId: 'String',
            affiliateLinkId: 'String',
            amount: 'Float',
            description: 'String',
            status: 'String',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['userId', 'amount'],
        uniqueFields: ['id'],
        relations: {
            user: 'User',
            affiliateLink: 'AffiliateLink'
        }
    },
    {
        name: 'HoaHong',
        pluralName: 'hoaHongs',
        fields: {
            id: 'String',
            userId: 'String',
            affiliateLinkId: 'String',
            doanhsoId: 'String',
            amount: 'Float',
            percentage: 'Float',
            description: 'String',
            status: 'String',
            createdAt: 'DateTime',
            updatedAt: 'DateTime'
        },
        requiredFields: ['userId', 'amount'],
        uniqueFields: ['id'],
        relations: {
            user: 'User',
            affiliateLink: 'AffiliateLink',
            doanhso: 'Doanhso'
        }
    }
];
function registerAllModels() {
    exports.MODEL_CONFIGURATIONS.forEach(config => {
        dynamic_resolver_factory_1.ModelRegistry.register(config);
    });
}
function getModelConfig(modelName) {
    return exports.MODEL_CONFIGURATIONS.find(config => config.name === modelName || config.name.toLowerCase() === modelName.toLowerCase());
}
//# sourceMappingURL=model-configs.js.map