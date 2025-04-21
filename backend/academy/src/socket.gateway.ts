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
  sendMenuUpdate() {
    this.server.emit('menu-updated'); // FE sẽ nhận sự kiện này
  }
  sendlandingPageUpdate() {
    this.server.emit('landingPage-updated'); // FE sẽ nhận sự kiện này
  }

}
