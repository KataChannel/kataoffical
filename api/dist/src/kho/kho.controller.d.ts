import { khoService } from './kho.service';
export declare class khoController {
    private readonly khoService;
    constructor(khoService: khoService);
    create(createkhoDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatekhoDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
