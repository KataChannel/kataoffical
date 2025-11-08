import { PrismaService } from 'prisma/prisma.service';
import { CreateTicketInput, UpdateTicketInput, CreateResponseInput } from './dto/support.input';
export declare class SupportService {
    private prisma;
    constructor(prisma: PrismaService);
    findTickets(user: any, status?: string, priority?: string): Promise<any>;
    findTicketById(id: string): Promise<any>;
    createTicket(user: any, input: CreateTicketInput): Promise<any>;
    updateTicket(id: string, input: UpdateTicketInput): Promise<any>;
    addResponse(user: any, ticketId: string, input: CreateResponseInput): Promise<any>;
    deleteTicket(id: string): Promise<boolean>;
    assignTicket(ticketId: string, technicianId: string): Promise<boolean>;
    private getFileTypeFromUrl;
}
