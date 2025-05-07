
export type Setting = {
    id: string;
    codeId: string;
    key: string;
    value: string;
    type: string;
    description?: string;
    order?: number;
    isActive: boolean;
    createdById?: string;
    createdBy?: any;
    createdAt: Date;
    updatedAt: Date;
};