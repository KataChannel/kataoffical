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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var KataAppWebSocketGateway_1, KataAppMLService_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = exports.UpdateKataAppDto = exports.CreateKataAppDto = exports.PaginationDto = exports.KataAppMLService = exports.KataAppRateLimitGuard = exports.RateLimitMiddleware = exports.KataAppWebSocketGateway = exports.KataAppElasticsearchService = exports.KataAppEventService = exports.KataAppRepository = exports.KataAppService = exports.KataAppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const microservices_1 = require("@nestjs/microservices");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const redisStore = require("cache-manager-redis-store");
const kataapp_controller_1 = require("./kataapp.controller");
const kataapp_service_1 = require("./kataapp.service");
Object.defineProperty(exports, "KataAppService", { enumerable: true, get: function () { return kataapp_service_1.KataAppService; } });
const kataapp_repository_1 = require("./kataapp.repository");
Object.defineProperty(exports, "KataAppRepository", { enumerable: true, get: function () { return kataapp_repository_1.KataAppRepository; } });
const kataapp_event_service_1 = require("./kataapp-event.service");
Object.defineProperty(exports, "KataAppEventService", { enumerable: true, get: function () { return kataapp_event_service_1.KataAppEventService; } });
const kataapp_elasticsearch_service_1 = require("./kataapp-elasticsearch.service");
Object.defineProperty(exports, "KataAppElasticsearchService", { enumerable: true, get: function () { return kataapp_elasticsearch_service_1.KataAppElasticsearchService; } });
const kataapp_websocket_gateway_1 = require("./kataapp-websocket.gateway");
Object.defineProperty(exports, "KataAppWebSocketGateway", { enumerable: true, get: function () { return kataapp_websocket_gateway_1.KataAppWebSocketGateway; } });
const kataapp_rate_limit_guard_1 = require("./guards/kataapp-rate-limit.guard");
Object.defineProperty(exports, "KataAppRateLimitGuard", { enumerable: true, get: function () { return kataapp_rate_limit_guard_1.KataAppRateLimitGuard; } });
const kataapp_ml_service_1 = require("./services/kataapp-ml.service");
Object.defineProperty(exports, "KataAppMLService", { enumerable: true, get: function () { return kataapp_ml_service_1.KataAppMLService; } });
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
Object.defineProperty(exports, "RateLimitMiddleware", { enumerable: true, get: function () { return rate_limit_middleware_1.RateLimitMiddleware; } });
const prisma_service_1 = require("../prisma/prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
let KataAppModule = class KataAppModule {
    configure(consumer) {
        consumer
            .apply(rate_limit_middleware_1.RateLimitMiddleware)
            .forRoutes('kataapp');
    }
};
exports.KataAppModule = KataAppModule;
exports.KataAppModule = KataAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    store: redisStore,
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get('REDIS_PORT', 6379),
                    ttl: configService.get('REDIS_CACHE_TTL', 300),
                    max: 1000,
                    isGlobal: true,
                }),
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'KAFKA_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.KAFKA,
                        options: {
                            client: {
                                clientId: 'kataapp',
                                brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
                            },
                            consumer: {
                                groupId: 'kataapp-consumer',
                                allowAutoTopicCreation: true,
                            },
                            producer: {
                                allowAutoTopicCreation: true,
                                transactionalId: 'kataapp-transaction',
                            },
                        },
                    }),
                },
            ]),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    ttl: configService.get('THROTTLE_TTL', 60),
                    limit: configService.get('THROTTLE_LIMIT', 100),
                }),
            }),
            elasticsearch_1.ElasticsearchModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    node: configService.get('ELASTICSEARCH_NODE', 'http://localhost:9200'),
                    auth: {
                        username: configService.get('ELASTICSEARCH_USERNAME', ''),
                        password: configService.get('ELASTICSEARCH_PASSWORD', ''),
                    },
                    maxRetries: 10,
                    requestTimeout: 60000,
                }),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
        ],
        controllers: [kataapp_controller_1.KataAppController],
        providers: [
            kataapp_service_1.KataAppService,
            kataapp_repository_1.KataAppRepository,
            kataapp_event_service_1.KataAppEventService,
            kataapp_elasticsearch_service_1.KataAppElasticsearchService,
            kataapp_websocket_gateway_1.KataAppWebSocketGateway,
            kataapp_ml_service_1.KataAppMLService,
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_GUARD,
                useClass: kataapp_rate_limit_guard_1.KataAppRateLimitGuard,
            },
        ],
        exports: [kataapp_service_1.KataAppService, prisma_service_1.PrismaService],
    })
], KataAppModule);
const common_2 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const cache_manager_1 = require("cache-manager");
let KataAppService = class KataAppService {
    constructor(cacheManager, kafkaClient, repository, eventService, elasticsearchService, mlService, configService) {
        this.cacheManager = cacheManager;
        this.kafkaClient = kafkaClient;
        this.repository = repository;
        this.eventService = eventService;
        this.elasticsearchService = elasticsearchService;
        this.mlService = mlService;
        this.configService = configService;
    }
    async onModuleInit() {
        const topics = ['kataapp.created', 'kataapp.updated', 'kataapp.deleted'];
        topics.forEach(topic => {
            this.kafkaClient.subscribeToResponseOf(topic);
        });
        await this.kafkaClient.connect();
    }
    async findAll(paginationDto) {
        const cacheKey = `kataapp:all:${JSON.stringify(paginationDto)}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const result = await this.repository.findAll(paginationDto);
        await this.cacheManager.set(cacheKey, result, {
            ttl: this.configService.get('CACHE_TTL_SECONDS', 300)
        });
        return result;
    }
    async findById(id) {
        const cacheKey = `kataapp:${id}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const result = await this.repository.findById(id);
        if (result) {
            await this.cacheManager.set(cacheKey, result, {
                ttl: this.configService.get('CACHE_TTL_SECONDS', 300)
            });
        }
        return result;
    }
    async search(query, paginationDto) {
        const cacheKey = `kataapp:search:${query}:${JSON.stringify(paginationDto)}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const searchResults = await this.elasticsearchService.search(query, paginationDto);
        await this.cacheManager.set(cacheKey, searchResults, {
            ttl: this.configService.get('CACHE_TTL_SEARCH_SECONDS', 120)
        });
        return searchResults;
    }
    async create(createDto) {
        const result = await this.repository.create(createDto);
        await this.elasticsearchService.index(result);
        this.eventService.emitCreatedEvent(result);
        return result;
    }
    async update(id, updateDto) {
        const result = await this.repository.update(id, updateDto);
        await this.elasticsearchService.update(id, result);
        this.eventService.emitUpdatedEvent(result);
        await this.cacheManager.del(`kataapp:${id}`);
        await this.cacheManager.del(new RegExp(`kataapp:all:*`));
        await this.cacheManager.del(new RegExp(`kataapp:search:*`));
        return result;
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        if (result) {
            await this.elasticsearchService.delete(id);
            this.eventService.emitDeletedEvent({ id });
            await this.cacheManager.del(`kataapp:${id}`);
            await this.cacheManager.del(new RegExp(`kataapp:all:*`));
            await this.cacheManager.del(new RegExp(`kataapp:search:*`));
        }
        return result;
    }
    async predictWithRNN(data) {
        return this.mlService.predictWithRNN(data);
    }
};
exports.KataAppService = KataAppService;
exports.KataAppService = kataapp_service_1.KataAppService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, common_2.Inject)(common_2.CACHE_MANAGER)),
    __param(1, (0, common_2.Inject)('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, typeof (_b = typeof microservices_2.ClientKafka !== "undefined" && microservices_2.ClientKafka) === "function" ? _b : Object, typeof (_c = typeof kataapp_repository_1.KataAppRepository !== "undefined" && kataapp_repository_1.KataAppRepository) === "function" ? _c : Object, typeof (_d = typeof kataapp_event_service_1.KataAppEventService !== "undefined" && kataapp_event_service_1.KataAppEventService) === "function" ? _d : Object, typeof (_e = typeof kataapp_elasticsearch_service_1.KataAppElasticsearchService !== "undefined" && kataapp_elasticsearch_service_1.KataAppElasticsearchService) === "function" ? _e : Object, typeof (_f = typeof kataapp_ml_service_1.KataAppMLService !== "undefined" && kataapp_ml_service_1.KataAppMLService) === "function" ? _f : Object, config_1.ConfigService])
], kataapp_service_1.KataAppService);
let KataAppRepository = class KataAppRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.kataApp.findMany({
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder.toLowerCase() },
            }),
            this.prisma.kataApp.count(),
        ]);
        const lastPage = Math.ceil(total / limit);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                lastPage,
                hasNextPage: page < lastPage,
                hasPrevPage: page > 1,
            },
        };
    }
    async findById(id) {
        return this.prisma.kataApp.findUnique({
            where: { id },
        });
    }
    async create(createDto) {
        return this.prisma.kataApp.create({
            data: createDto,
        });
    }
    async update(id, updateDto) {
        return this.prisma.kataApp.update({
            where: { id },
            data: updateDto,
        });
    }
    async delete(id) {
        const deleted = await this.prisma.kataApp.delete({
            where: { id },
        });
        return !!deleted;
    }
};
exports.KataAppRepository = KataAppRepository;
exports.KataAppRepository = kataapp_repository_1.KataAppRepository = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], kataapp_repository_1.KataAppRepository);
let KataAppEventService = class KataAppEventService {
    constructor(kafkaClient) {
        this.kafkaClient = kafkaClient;
    }
    emitCreatedEvent(data) {
        this.kafkaClient.emit('kataapp.created', {
            key: data.id,
            value: JSON.stringify(data),
            timestamp: Date.now().toString(),
        });
    }
    emitUpdatedEvent(data) {
        this.kafkaClient.emit('kataapp.updated', {
            key: data.id,
            value: JSON.stringify(data),
            timestamp: Date.now().toString(),
        });
    }
    emitDeletedEvent(data) {
        this.kafkaClient.emit('kataapp.deleted', {
            key: data.id,
            value: JSON.stringify(data),
            timestamp: Date.now().toString(),
        });
    }
};
exports.KataAppEventService = KataAppEventService;
exports.KataAppEventService = kataapp_event_service_1.KataAppEventService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, common_2.Inject)('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [typeof (_g = typeof microservices_2.ClientKafka !== "undefined" && microservices_2.ClientKafka) === "function" ? _g : Object])
], kataapp_event_service_1.KataAppEventService);
const elasticsearch_2 = require("@nestjs/elasticsearch");
let KataAppElasticsearchService = class KataAppElasticsearchService {
    constructor(elasticsearchService, configService) {
        this.elasticsearchService = elasticsearchService;
        this.configService = configService;
        this.indexName = this.configService.get('ELASTICSEARCH_INDEX', 'kataapp');
        this.initIndex();
    }
    async initIndex() {
        const indexExists = await this.elasticsearchService.indices.exists({
            index: this.indexName,
        });
        if (!indexExists.body) {
            await this.elasticsearchService.indices.create({
                index: this.indexName,
                body: {
                    mappings: {
                        properties: {
                            title: { type: 'text', analyzer: 'standard' },
                            description: { type: 'text', analyzer: 'standard' },
                            content: { type: 'text', analyzer: 'standard' },
                            tags: { type: 'keyword' },
                            createdAt: { type: 'date' },
                            updatedAt: { type: 'date' },
                        },
                    },
                },
            });
        }
    }
    async index(document) {
        return this.elasticsearchService.index({
            index: this.indexName,
            id: document.id,
            body: {
                ...document,
                createdAt: new Date(document.createdAt).toISOString(),
                updatedAt: new Date(document.updatedAt).toISOString(),
            },
        });
    }
    async update(id, document) {
        return this.elasticsearchService.update({
            index: this.indexName,
            id,
            body: {
                doc: {
                    ...document,
                    updatedAt: new Date(document.updatedAt).toISOString(),
                },
            },
        });
    }
    async delete(id) {
        return this.elasticsearchService.delete({
            index: this.indexName,
            id,
        });
    }
    async search(query, paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const from = (page - 1) * limit;
        const response = await this.elasticsearchService.search({
            index: this.indexName,
            body: {
                from,
                size: limit,
                query: {
                    multi_match: {
                        query,
                        fields: ['title^3', 'description^2', 'content', 'tags'],
                        fuzziness: 'AUTO',
                    },
                },
                sort: [
                    { _score: { order: 'desc' } },
                    { createdAt: { order: 'desc' } },
                ],
            },
        });
        const hits = response.body.hits.hits;
        const total = response.body.hits.total.value;
        const lastPage = Math.ceil(total / limit);
        const data = hits.map(hit => ({
            ...hit._source,
            id: hit._id,
            score: hit._score,
        }));
        return {
            data,
            meta: {
                total,
                page,
                limit,
                lastPage,
                hasNextPage: page < lastPage,
                hasPrevPage: page > 1,
            },
        };
    }
};
exports.KataAppElasticsearchService = KataAppElasticsearchService;
exports.KataAppElasticsearchService = kataapp_elasticsearch_service_1.KataAppElasticsearchService = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_h = typeof elasticsearch_2.ElasticsearchService !== "undefined" && elasticsearch_2.ElasticsearchService) === "function" ? _h : Object, config_1.ConfigService])
], kataapp_elasticsearch_service_1.KataAppElasticsearchService);
const websockets_1 = require("@nestjs/websockets");
const common_3 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const ws_jwt_auth_guard_1 = require("../auth/guards/ws-jwt-auth.guard");
let KataAppWebSocketGateway = KataAppWebSocketGateway_1 = class KataAppWebSocketGateway {
    constructor(kataAppService) {
        this.kataAppService = kataAppService;
        this.logger = new common_3.Logger(KataAppWebSocketGateway_1.name);
    }
    afterInit(server) {
        this.logger.log('WebSocket Gateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleSubscribeToUpdates(client, payload) {
        const { roomId } = payload;
        client.join(roomId);
        this.logger.log(`Client ${client.id} joined room: ${roomId}`);
        return { event: 'subscribed', data: { roomId } };
    }
    handleUnsubscribeFromUpdates(client, payload) {
        const { roomId } = payload;
        client.leave(roomId);
        this.logger.log(`Client ${client.id} left room: ${roomId}`);
        return { event: 'unsubscribed', data: { roomId } };
    }
    notifyKataAppCreated(kataApp) {
        this.server.emit('kataAppCreated', kataApp);
        if (kataApp.id) {
            this.server.to(kataApp.id).emit('kataAppCreated', kataApp);
        }
    }
    notifyKataAppUpdated(kataApp) {
        this.server.emit('kataAppUpdated', kataApp);
        if (kataApp.id) {
            this.server.to(kataApp.id).emit('kataAppUpdated', kataApp);
        }
    }
    notifyKataAppDeleted(kataApp) {
        this.server.emit('kataAppDeleted', kataApp);
        if (kataApp.id) {
            this.server.to(kataApp.id).emit('kataAppDeleted', kataApp);
        }
    }
};
exports.KataAppWebSocketGateway = KataAppWebSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], kataapp_websocket_gateway_1.KataAppWebSocketGateway.prototype, "server", void 0);
__decorate([
    (0, common_3.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('subscribeToKataAppUpdates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], kataapp_websocket_gateway_1.KataAppWebSocketGateway.prototype, "handleSubscribeToUpdates", null);
__decorate([
    (0, common_3.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('unsubscribeFromKataAppUpdates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], kataapp_websocket_gateway_1.KataAppWebSocketGateway.prototype, "handleUnsubscribeFromUpdates", null);
exports.KataAppWebSocketGateway = kataapp_websocket_gateway_1.KataAppWebSocketGateway = KataAppWebSocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: 'kataapp',
    }),
    __metadata("design:paramtypes", [typeof (_j = typeof kataapp_service_1.KataAppService !== "undefined" && kataapp_service_1.KataAppService) === "function" ? _j : Object])
], kataapp_websocket_gateway_1.KataAppWebSocketGateway);
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let RateLimitMiddleware = class RateLimitMiddleware {
    constructor(redisService, configService) {
        this.redisService = redisService;
        this.configService = configService;
    }
    async use(req, res, next) {
        const ip = req.ip;
        const user = req.user?.id || 'anonymous';
        const path = req.path;
        const key = `ratelimit:${path}:${user}:${ip}`;
        const redis = this.redisService.getClient();
        const limit = this.configService.get('API_RATE_LIMIT', 100);
        const windowSizeInSeconds = this.configService.get('API_RATE_LIMIT_WINDOW', 60);
        const current = await redis.get(key);
        const currentCount = current ? parseInt(current, 10) : 0;
        if (currentCount >= limit) {
            return res.status(429).json({
                statusCode: 429,
                message: 'Too Many Requests',
                error: 'Rate limit exceeded',
                retryAfter: await redis.ttl(key),
            });
        }
        await redis.incr(key);
        if (currentCount === 0) {
            await redis.expire(key, windowSizeInSeconds);
        }
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - (currentCount + 1)));
        res.setHeader('X-RateLimit-Reset', Math.floor(Date.now() / 1000) + (await redis.ttl(key)));
        next();
    }
};
exports.RateLimitMiddleware = RateLimitMiddleware;
exports.RateLimitMiddleware = rate_limit_middleware_1.RateLimitMiddleware = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeof (_k = typeof nestjs_redis_1.RedisService !== "undefined" && nestjs_redis_1.RedisService) === "function" ? _k : Object, config_1.ConfigService])
], rate_limit_middleware_1.RateLimitMiddleware);
const common_4 = require("@nestjs/common");
const throttler_2 = require("@nestjs/throttler");
let KataAppRateLimitGuard = class KataAppRateLimitGuard extends throttler_2.ThrottlerGuard {
    constructor(configService) {
        super();
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user?.id || 'anonymous';
        if (request.user?.role === 'admin') {
            return true;
        }
        try {
            return await super.canActivate(context);
        }
        catch (error) {
            throw new common_4.HttpException({
                statusCode: common_4.HttpStatus.TOO_MANY_REQUESTS,
                message: 'Too Many Requests',
                error: 'Rate limit exceeded',
                retryAfter: this.configService.get('THROTTLE_TTL', 60),
            }, common_4.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
    getTracker(req) {
        return req.user?.id
            ? `${req.ip}-${req.user.id}`
            : req.ip;
    }
};
exports.KataAppRateLimitGuard = KataAppRateLimitGuard;
exports.KataAppRateLimitGuard = kataapp_rate_limit_guard_1.KataAppRateLimitGuard = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], kataapp_rate_limit_guard_1.KataAppRateLimitGuard);
const tf = require("@tensorflow/tfjs-node");
let KataAppMLService = KataAppMLService_1 = class KataAppMLService {
    constructor() {
        this.logger = new common_3.Logger(KataAppMLService_1.name);
        this.initModel();
    }
    async initModel() {
        try {
            this.model = await tf.loadLayersModel('file://./ml-models/rnn-model/model.json');
            this.logger.log('RNN model loaded successfully');
        }
        catch (error) {
            this.logger.warn('Could not load RNN model, creating a new one');
            this.createRNNModel();
        }
    }
    createRNNModel() {
        const model = tf.sequential();
        model.add(tf.layers.lstm({
            units: 64,
            returnSequences: false,
            inputShape: [10, 5],
        }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dropout({ rate: 0.2 }));
        model.add(tf.layers.dense({ units: 1 }));
        model.compile({
            optimizer: 'adam',
            loss: 'meanSquaredError',
            metrics: ['accuracy'],
        });
        this.model = model;
        this.logger.log('New RNN model created');
    }
    async predictWithRNN(data) {
        if (!this.model) {
            await this.initModel();
        }
        try {
            const tensorData = tf.tensor3d([data]);
            const prediction = this.model.predict(tensorData);
            const result = await prediction.array();
            tensorData.dispose();
            prediction.dispose();
            return result[0];
        }
        catch (error) {
            this.logger.error('Error in RNN prediction', error);
            throw new Error(`RNN prediction failed: ${error.message}`);
        }
    }
    async trainRNNModel(trainingData, epochs = 50) {
        if (!this.model) {
            await this.initModel();
        }
        try {
            const inputs = tf.tensor3d(trainingData.map(item => item.input));
            const outputs = tf.tensor2d(trainingData.map(item => [item.output]));
            const result = await this.model.fit(inputs, outputs, {
                epochs,
                batchSize: 32,
                validationSplit: 0.2,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        this.logger.debug(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.accuracy}`);
                    }
                }
            });
            await this.model.save('file://./ml-models/rnn-model');
            inputs.dispose();
            outputs.dispose();
            return {
                loss: result.history.loss[result.history.loss.length - 1],
                accuracy: result.history.accuracy[result.history.accuracy.length - 1],
            };
        }
        catch (error) {
            this.logger.error('Error in RNN training', error);
            throw new Error(`RNN training failed: ${error.message}`);
        }
    }
};
exports.KataAppMLService = KataAppMLService;
exports.KataAppMLService = kataapp_ml_service_1.KataAppMLService = KataAppMLService_1 = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [])
], kataapp_ml_service_1.KataAppMLService);
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'createdAt';
        this.sortOrder = 'desc';
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], pagination_dto_1.PaginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], pagination_dto_1.PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], pagination_dto_1.PaginationDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['asc', 'desc', 'ASC', 'DESC']),
    __metadata("design:type", String)
], pagination_dto_1.PaginationDto.prototype, "sortOrder", void 0);
const class_validator_2 = require("class-validator");
class CreateKataAppDto {
}
exports.CreateKataAppDto = CreateKataAppDto;
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.MaxLength)(100),
    __metadata("design:type", String)
], kataapp_dto_1.CreateKataAppDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.MaxLength)(500),
    __metadata("design:type", String)
], kataapp_dto_1.CreateKataAppDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_2.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], kataapp_dto_1.CreateKataAppDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], kataapp_dto_1.CreateKataAppDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], kataapp_dto_1.CreateKataAppDto.prototype, "authorId", void 0);
class UpdateKataAppDto {
}
exports.UpdateKataAppDto = UpdateKataAppDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.MaxLength)(100),
    __metadata("design:type", String)
], kataapp_dto_1.UpdateKataAppDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_2.MaxLength)(500),
    __metadata("design:type", String)
], kataapp_dto_1.UpdateKataAppDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], kataapp_dto_1.UpdateKataAppDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], kataapp_dto_1.UpdateKataAppDto.prototype, "tags", void 0);
const client_1 = require("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = prisma_service_1.PrismaService = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [])
], prisma_service_1.PrismaService);
//# sourceMappingURL=kataapp_mau.js.map