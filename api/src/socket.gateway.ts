import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('✅ WebSocket Server Initialized');
  }

  handleConnection(client: any) {
    console.log(`✅ Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }

  sendSanphamUpdate() {
    console.log('📢 Emitting: sanpham-updated');
    this.server.emit('sanpham-updated');
  }

  sendKhachangUpdate() {
    console.log('📢 Emitting: khachhang-updated');
    this.server.emit('khachhang-updated');
  }

  senduserUpdate() {
    console.log('📢 Emitting: user-updated');
    this.server.emit('user-updated');
  }
}
