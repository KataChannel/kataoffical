import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  sendSanphamUpdate(): { success: boolean; error?: string } {
    try {
      this.server.emit('sanphamupdated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}