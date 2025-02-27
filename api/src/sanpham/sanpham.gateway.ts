import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SanphamGateway {
  @WebSocketServer() server: Server;

  // Gửi sự kiện cập nhật sản phẩm đến tất cả client
  sendSanphamUpdate() {
    this.server.emit('sanpham-updated'); // FE sẽ nhận sự kiện này
  }
}
