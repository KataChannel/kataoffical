import { TrackingEventService } from './trackingevent.service';
import { CreateTrackingeventDto, UpdateTrackingeventDto, FindByDto } from './dto/trackingevent.dto';
export declare class TrackingeventController {
    private readonly trackingeventService;
    constructor(trackingeventService: TrackingEventService);
    create(createTrackingeventDto: CreateTrackingeventDto): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    findBy(param: FindByDto): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    findAll(): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    update(id: string, updateTrackingeventDto: UpdateTrackingeventDto): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
    remove(id: string): Promise<{
        type: string;
        id: string;
        updatedAt: Date;
        affiliateLinkId: string;
        timestamp: Date;
        ipAddress: string | null;
        userAgent: string | null;
        triggeredByUserId: string | null;
    }>;
}
