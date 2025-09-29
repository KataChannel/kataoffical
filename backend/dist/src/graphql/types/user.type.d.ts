import { Gender } from './gender.enum';
export declare class User {
    id: string;
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
    isSuperAdmin: boolean;
    isCTV: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    registrationSource?: string;
    inviteCode?: string;
    affiliateCode?: string;
    referrerId?: string;
    ghichu?: string;
}
