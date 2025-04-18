import { TrackingeventService } from './trackingevent.service';
import { CreateTrackingeventDto, UpdateTrackingeventDto, ReorderTrackingeventDto, FindByDto } from './dto/trackingevent.dto';
export declare class TrackingeventController {
    private readonly trackingeventService;
    constructor(trackingeventService: TrackingeventService);
    create(createTrackingeventDto: CreateTrackingeventDto): Promise<any>;
    findBy(param: FindByDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTrackingeventDto: UpdateTrackingeventDto): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(reorderTrackingeventDto: ReorderTrackingeventDto): Promise<void>;
}
