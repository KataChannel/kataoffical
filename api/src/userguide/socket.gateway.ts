import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;
  // Bạn có thể thêm các hàm gửi event dynamic tại đây, hoặc giữ chung chung
  // Ví dụ:
  sendUserguideUpdate() { this.server.emit('settingupdated'); }
  // sendUserUpdate() { this.server.emit('userupdated'); }
}
