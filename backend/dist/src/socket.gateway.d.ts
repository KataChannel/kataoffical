import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class SocketGateway implements OnModuleInit {
    server: Server;
    private emitCount;
    onModuleInit(): void;
    sendUpdate(event: any, data?: any): void;
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
