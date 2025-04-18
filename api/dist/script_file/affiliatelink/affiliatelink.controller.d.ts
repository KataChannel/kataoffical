import { AffiliatelinkService } from './affiliatelink.service';
import { CreateAffiliatelinkDto, UpdateAffiliatelinkDto, ReorderAffiliatelinkDto, FindByDto } from './dto/affiliatelink.dto';
export declare class AffiliatelinkController {
    private readonly affiliatelinkService;
    constructor(affiliatelinkService: AffiliatelinkService);
    create(createAffiliatelinkDto: CreateAffiliatelinkDto): Promise<any>;
    findBy(param: FindByDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAffiliatelinkDto: UpdateAffiliatelinkDto): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(reorderAffiliatelinkDto: ReorderAffiliatelinkDto): Promise<void>;
}
