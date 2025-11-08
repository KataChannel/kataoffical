export declare class SupportUser {
    id: string;
    name?: string;
    email?: string;
}
export declare class SupportAttachment {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
    createdAt: Date;
}
export declare class SupportResponse {
    id: string;
    content: string;
    user: SupportUser;
    attachments: SupportAttachment[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class SupportTicket {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    user: SupportUser;
    technician?: SupportUser;
    responses: SupportResponse[];
    attachments: SupportAttachment[];
    createdAt: Date;
    updatedAt: Date;
}
