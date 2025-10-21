import { PrismaService } from '../../prisma/prisma.service';
export declare class ServerStabilityService {
    private readonly prisma;
    private readonly logger;
    private circuitBreakers;
    private activeRequests;
    constructor(prisma: PrismaService);
    private initializeHealthChecks;
    safeTransaction<T>(operation: (prisma: any) => Promise<T>, options?: {
        timeout?: number;
        maxWait?: number;
        circuitBreakerKey?: string;
        retryCount?: number;
    }): Promise<T>;
    private isRetryableError;
    private checkDatabaseHealth;
    private checkMemoryUsage;
    private checkRequestTimeouts;
    private isCircuitBreakerClosed;
    private recordCircuitBreakerSuccess;
    private recordCircuitBreakerFailure;
    private updateCircuitBreakerStates;
    getHealthStatus(): Promise<any>;
}
