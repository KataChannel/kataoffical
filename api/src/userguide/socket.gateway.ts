import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  sendUserguideUpdate(): { success: boolean; error?: string } {
    try {
      this.server.emit('userguideupdated');
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}