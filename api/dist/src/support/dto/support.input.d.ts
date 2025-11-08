export declare class CreateTicketInput {
    title: string;
    description: string;
    priority?: string;
    attachmentUrls?: string[];
}
export declare class UpdateTicketInput {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
}
export declare class CreateResponseInput {
    content: string;
    attachmentUrls?: string[];
}
