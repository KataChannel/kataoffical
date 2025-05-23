import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ 
  cors: {
    origin: '*', 
  },
})
export class SocketGateway { 
  @WebSocketServer() server: Server;
  sendImportdataUpdate(): { success: boolean; error?: string } { 
    try {
      this.server.emit('importdata-updated'); 
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  notifyImportdataSpecificEvent(data: any): void {
    this.server.emit('importdata-specific-event', data); 
  }
}
