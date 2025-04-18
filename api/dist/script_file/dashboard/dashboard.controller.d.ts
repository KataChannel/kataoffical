import { DashboardService } from './dashboard.service';
import { CreateDashboardDto, UpdateDashboardDto, ReorderDashboardDto, FindByDto } from './dto/dashboard.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    create(createDashboardDto: CreateDashboardDto): Promise<any>;
    findBy(param: FindByDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDashboardDto: UpdateDashboardDto): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(reorderDashboardDto: ReorderDashboardDto): Promise<void>;
}
