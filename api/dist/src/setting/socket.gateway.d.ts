import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendSettingUpdate(): {
        success: boolean;
        error?: string;
    };
}
