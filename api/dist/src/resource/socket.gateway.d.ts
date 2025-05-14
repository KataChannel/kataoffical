import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendResourceUpdate(): {
        success: boolean;
        error?: string;
    };
}
