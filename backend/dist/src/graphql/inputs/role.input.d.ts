export declare class CreateRoleInput {
    name: string;
}
export declare class UpdateRoleInput {
    name?: string;
}
export declare class RoleWhereInput {
    id?: string;
    name?: string;
}
export declare class RoleWhereUniqueInput {
    id?: string;
    name?: string;
}
export declare class CreatePermissionInput {
    name: string;
    description?: string;
}
export declare class UpdatePermissionInput {
    name?: string;
    description?: string;
}
export declare class PermissionWhereInput {
    id?: string;
    name?: string;
}
export declare class PermissionWhereUniqueInput {
    id?: string;
    name?: string;
}
