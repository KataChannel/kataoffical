import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    afterInit(): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    sendSanphamUpdate(): void;
    sendKhachangUpdate(): void;
    senduserUpdate(): void;
}
