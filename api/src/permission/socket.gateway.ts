import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ // Cấu hình CORS hoặc namespace có thể cần điều chỉnh tùy theo kiến trúc tổng thể
  cors: {
    origin: '*', // Cân nhắc cấu hình chặt chẽ hơn cho production
  },
  // namespace: 'permission', // Tùy chọn: sử dụng namespace cho từng module
})
export class SocketGateway { // Tên class SocketGateway được giữ nguyên, nó được cung cấp trong module động
  @WebSocketServer() server: Server;

  sendPermissionUpdate(): { success: boolean; error?: string } {
    try {
      this.server.emit('permission-updated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}