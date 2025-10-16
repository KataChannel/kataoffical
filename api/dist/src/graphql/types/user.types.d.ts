import { PaginationInfo } from './common.types';
export declare class Profile {
    id: string;
    userId: string;
    name: string;
    avatar?: string;
    bio?: string;
}
export declare class Role {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: Permission[];
}
export declare class Permission {
    id: string;
    codeId?: string;
    name: string;
    group?: string;
    description?: string;
    order?: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class User {
    id: string;
    email?: string;
    SDT?: string;
    provider?: string;
    providerId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile?: Profile;
    roles: Role[];
}
export declare class UserPaginated {
    data: User[];
    pagination: PaginationInfo;
}
export declare class CreateUserInput {
    email?: string;
    SDT?: string;
    password: string;
    provider?: string;
    providerId?: string;
    isActive: boolean;
}
export declare class UpdateUserInput {
    id: string;
    email?: string;
    SDT?: string;
    password?: string;
    isActive?: boolean;
}
export declare class UserFilterInput {
    search?: string;
    isActive?: boolean;
    provider?: string;
}
