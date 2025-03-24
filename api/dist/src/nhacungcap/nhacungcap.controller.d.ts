import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(createNhacungcapDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNhacungcapDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
