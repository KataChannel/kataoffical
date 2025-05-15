import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';
export enum SocketEvents {
  SANPHAM = 'sanpham',
  KHACHHANG = 'khachhang',
  USER = 'user',
  LEAD = 'lead',
  TASK = 'task',
  DEXUAT = 'dexuat',
  LANDING_PAGE = 'landingPage',
  TRACKING_EVENT = 'trackingevent',
  AFFILIATE_LINK = 'affiliatelink',
  MENU = 'menu',
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;
  // Gửi sự kiện cập nhật sản phẩm đến tất cả client
    sendUpdate(event: any, data?: any) {
        if (!this.server) {
          console.error('WebSocket server not initialized');
          return;
        }
        this.server.emit(`${event}-updated`, data);
    }
}
