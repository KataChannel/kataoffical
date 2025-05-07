import { landingPageService } from './landingpage.service';
export declare class LandingpageController {
    private readonly landingpageService;
    constructor(landingpageService: landingPageService);
    create(createLandingpageDto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorder(body: {
        landingpageIds: string[];
    }): Promise<void>;
}
