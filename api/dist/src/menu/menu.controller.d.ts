import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdated(): Promise<{
        updatedAt: any;
    }>;
    findby(param: any): Promise<any>;
    getTree(data: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMenuDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
