import { PrismaService } from 'prisma/prisma.service';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: {
        name?: string;
        permissionIds?: string[];
    }): Promise<any>;
    remove(id: string): Promise<any>;
    assignPermissionToRole(data: any): Promise<any>;
    removePermissionFromRole(data: any): Promise<any>;
}
