import { RoleService } from './role.service';
export declare class RoleController {
    private readonly rolesService;
    constructor(rolesService: RoleService);
    create(createRoleDto: any): Promise<any>;
    assignPermissionToRole(data: any): Promise<any>;
    removePermissionFromRole(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateRoleDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
