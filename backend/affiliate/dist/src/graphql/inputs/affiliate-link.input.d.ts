export declare class CreateAffiliateLinkInput {
    codeId?: string;
    landingPageId?: string;
    campaignName?: string;
    description?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    url?: string;
    order?: number;
    isActive?: boolean;
    createdById?: string;
}
export declare class UpdateAffiliateLinkInput {
    codeId?: string;
    landingPageId?: string;
    campaignName?: string;
    description?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    url?: string;
    order?: number;
    isActive?: boolean;
    createdById?: string;
}
export declare class AffiliateLinkWhereInput {
    id?: string;
    codeId?: string;
    campaignName?: string;
    isActive?: boolean;
    createdById?: string;
}
export declare class AffiliateLinkWhereUniqueInput {
    id?: string;
    codeId?: string;
}
