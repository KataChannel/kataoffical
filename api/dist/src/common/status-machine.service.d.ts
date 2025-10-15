export type EntityType = 'donhang' | 'dathang';
export type DonhangStatus = 'dadat' | 'dagiao' | 'danhan' | 'huy' | 'hoanthanh';
export type DathangStatus = 'dadat' | 'dagiao' | 'danhan' | 'huy' | 'hoanthanh';
export interface StatusTransition {
    from: string;
    to: string;
    entity: EntityType;
    isValid: boolean;
    reason?: string;
}
export declare class StatusMachineService {
    private readonly validTransitions;
    private readonly reverseTransitions;
    validateTransition(entity: EntityType, fromStatus: string, toStatus: string, allowReverse?: boolean): StatusTransition;
    getValidNextStatuses(entity: EntityType, currentStatus: string, includeReverse?: boolean): string[];
    isFinalStatus(entity: EntityType, status: string): boolean;
    getStatusFlow(entity: EntityType): Record<string, string[]>;
}
