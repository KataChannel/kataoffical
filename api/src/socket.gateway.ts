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
}
