import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendImportdataUpdate(): {
        success: boolean;
        error?: string;
    };
    notifyImportdataSpecificEvent(data: any): void;
}
