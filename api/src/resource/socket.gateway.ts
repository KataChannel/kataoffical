import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  sendResourceUpdate(): { success: boolean; error?: string } { 
    try {
      // Phát sự kiện dynamic với tên: resourceupdated
      this.server.emit('resourceupdated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }  
  }
}