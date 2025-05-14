import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendSanphamUpdate(): {
        success: boolean;
        error?: string;
    };
}
