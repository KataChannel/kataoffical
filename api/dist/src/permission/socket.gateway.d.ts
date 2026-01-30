import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendPermissionUpdate(): {
        success: boolean;
        error?: string;
    };
}
