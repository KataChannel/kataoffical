import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  sendSettingUpdate(): { success: boolean; error?: string } {
    try {
      this.server.emit('settingupdated');
      return { success: true };
    } catch (error) {
      // Log error if needed
      return { success: false, error: (error as Error).message };
    }
  }
}
