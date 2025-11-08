import { SupportService } from './support.service';
import { CreateTicketInput, UpdateTicketInput, CreateResponseInput } from './dto/support.input';
export declare class SupportResolver {
    private readonly supportService;
    constructor(supportService: SupportService);
    tickets(user: any, status?: string, priority?: string): Promise<any>;
    ticket(id: string): Promise<any>;
    createTicket(user: any, input: CreateTicketInput): Promise<any>;
    updateTicket(id: string, input: UpdateTicketInput): Promise<any>;
    addResponse(user: any, ticketId: string, input: CreateResponseInput): Promise<any>;
    deleteTicket(id: string): Promise<boolean>;
    assignTicket(ticketId: string, technicianId: string): Promise<boolean>;
}
