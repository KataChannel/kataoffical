import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePermissionDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
