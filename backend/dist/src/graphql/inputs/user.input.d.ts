import { Gender } from '../types/gender.enum';
export declare class CreateUserInput {
    codeId?: string;
    name?: string;
    avatar?: string;
    gender?: Gender;
    email?: string;
    SDT?: string;
    phone?: string;
    zaloId?: string;
    facebookId?: string;
    googleId?: string;
    password?: string;
    provider?: string;
    providerId?: string;
    isSuperAdmin?: boolean;
    isCTV?: boolean;
    isActive?: boolean;
    registrationSource?: string;
    inviteCode?: string;
    affiliateCode?: string;
    referrerId?: string;
    ghichu?: string;
}
export declare class UpdateUserInput {
    codeId?: string;
    name?: string;
    avatar?: string;
    gender?: Gender;
    email?: string;
    SDT?: string;
    phone?: string;
    zaloId?: string;
    facebookId?: string;
    googleId?: string;
    password?: string;
    provider?: string;
    providerId?: string;
    isSuperAdmin?: boolean;
    isCTV?: boolean;
    isActive?: boolean;
    registrationSource?: string;
    inviteCode?: string;
    affiliateCode?: string;
    referrerId?: string;
    ghichu?: string;
}
export declare class UserWhereInput {
    id?: string;
    codeId?: string;
    name?: string;
    email?: string;
    phone?: string;
    isCTV?: boolean;
    isActive?: boolean;
}
export declare class UserWhereUniqueInput {
    id?: string;
    codeId?: string;
    inviteCode?: string;
}
