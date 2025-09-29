import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 50;
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  private emitCount = 0;

  onModuleInit() {
    // Increase max listeners to prevent memory leak warnings
    if (this.server) {
      this.server.setMaxListeners(50);
    }
  }

  // Gửi sự kiện cập nhật sản phẩm đến tất cả client và đếm số lần emit
  sendUpdate(event: any, data?: any) {
    if (!this.server) {
      console.error('WebSocket server not initialized');
      return;
    }
    
    // Tăng biến đếm và log số lần emit
    this.emitCount++;
    console.log(`Emit count: ${this.emitCount}`);
    this.server.emit(`${event}-updated`, data);
  }
    // Gửi sự kiện cập nhật sản phẩm đến tất cả client
  sendSanphamUpdate() {
    this.server.emit('sanpham-updated'); // FE sẽ nhận sự kiện này
  }
  sendKhachangUpdate() {
    this.server.emit('khachhang-updated'); // FE sẽ nhận sự kiện này
  }
  senduserUpdate() {
    this.server.emit('user-updated'); // FE sẽ nhận sự kiện này
  }
  sendleadUpdate() {
    this.server.emit('lead-updated'); // FE sẽ nhận sự kiện này
  }
  sendtaskUpdate() {
    this.server.emit('task-updated'); // FE sẽ nhận sự kiện này
  }
  sendDexuatUpdate() {
    this.server.emit('dexuat-updated'); // FE sẽ nhận sự kiện này
  }
  sendlandingPageUpdate() {
    this.server.emit('landingPage-updated'); // FE sẽ nhận sự kiện này
  }
  sendTrackingEventUpdate() {
    this.server.emit('trackingevent-updated'); // FE sẽ nhận sự kiện này
  }
  sendAffiliatelinkUpdate() {
    this.server.emit('affiliatelink-updated'); // FE sẽ nhận sự kiện này
  }
  sendMenuUpdate() {
    this.server.emit('menu-updated'); // FE sẽ nhận sự kiện này
  }
}
