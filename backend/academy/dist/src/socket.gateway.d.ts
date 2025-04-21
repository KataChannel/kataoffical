import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendSanphamUpdate(): void;
    sendMenuUpdate(): void;
    sendlandingPageUpdate(): void;
}
