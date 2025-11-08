import { OnModuleInit } from '@nestjs/common';
import { PerformanceLogService } from './services/performance-log.service';
export declare class SharedModule implements OnModuleInit {
    private readonly performanceLogService;
    constructor(performanceLogService: PerformanceLogService);
    onModuleInit(): void;
}
