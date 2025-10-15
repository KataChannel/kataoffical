import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    afterInit(): void;
    sendSanphamUpdate(): void;
    sendBanggiaUpdate(): void;
    sendKhachangUpdate(): void;
    senduserUpdate(): void;
}
