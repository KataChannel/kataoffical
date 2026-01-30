export declare class Nhomkhachhang {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    khachhang?: KhachhangBasic[];
}
export declare class KhachhangBasic {
    id: string;
    name?: string;
    tenkh?: string;
    diachi?: string;
    sdt?: string;
    email?: string;
    isActive: boolean;
}
