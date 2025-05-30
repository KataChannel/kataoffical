import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

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
