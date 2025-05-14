import { Server } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    sendSanphamUpdate(): void;
    sendKhachangUpdate(): void;
    senduserUpdate(): void;
    sendleadUpdate(): void;
    sendtaskUpdate(): void;
    sendDexuatUpdate(): void;
    sendlandingPageUpdate(): void;
    sendTrackingEventUpdate(): void;
    sendAffiliatelinkUpdate(): void;
    sendMenuUpdate(): void;
}
