import { TrackingService } from './tracking.service';
import { CreateTrackingDto, UpdateTrackingDto, ReorderTrackingDto, FindByDto } from './dto/tracking.dto';
export declare class TrackingController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    create(createTrackingDto: CreateTrackingDto): Promise<any>;
    findBy(param: FindByDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTrackingDto: UpdateTrackingDto): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(reorderTrackingDto: ReorderTrackingDto): Promise<void>;
}
