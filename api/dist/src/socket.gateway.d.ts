import { Server } from 'socket.io';
export declare enum SocketEvents {
    SANPHAM = "sanpham",
    KHACHHANG = "khachhang",
    USER = "user",
    LEAD = "lead",
    TASK = "task",
    DEXUAT = "dexuat",
    LANDING_PAGE = "landingPage",
    TRACKING_EVENT = "trackingevent",
    AFFILIATE_LINK = "affiliatelink",
    MENU = "menu"
}
export declare class SocketGateway {
    server: Server;
    sendUpdate(event: any, data?: any): void;
}
