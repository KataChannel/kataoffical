import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendUserguideUpdate(): {
        success: boolean;
        error?: string;
    };
}
