import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class GooglesheetService {
    private readonly prisma;
    private _SocketGateway;
    private sheets;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    findAll(sheetId: any, sheetName: any): Promise<any[]>;
    create(sheetId: any, sheetName: any, data: any, numfield?: any): Promise<any>;
    update(rowNumber: number, data: any, numfield?: any): Promise<any>;
    delete(rowNumber: number): Promise<any>;
}
