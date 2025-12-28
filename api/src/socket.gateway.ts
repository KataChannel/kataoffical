import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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

  // handleConnection(client: any) {
  //   console.log(`✅ Client connected: ${client.id}`);
  // }

  // handleDisconnect(client: any) {
  //   console.log(`❌ Client disconnected: ${client.id}`);
  // }

  sendSanphamUpdate() {
    console.log('📢 Emitting: sanpham-updated');
    this.server.emit('sanpham-updated');
  }
  sendBanggiaUpdate() {
    console.log('📢 Emitting: banggia-updated');
    this.server.emit('banggia-updated');
  }

  /**
   * Emit confirmation events for realtime order updates
   */
  sendDonhangConfirmed(donhangId: string, data: any) {
    console.log('📢 Emitting: donhang-confirmed', { donhangId, data });
    this.server.emit('donhang-confirmed', { donhangId, ...data });
  }

  sendDonhangRejected(donhangId: string, data: any) {
    console.log('📢 Emitting: donhang-rejected', { donhangId, data });
    this.server.emit('donhang-rejected', { donhangId, ...data });
  }

  sendDonhangUpdated(donhangId: string) {
    console.log('📢 Emitting: donhang-updated', { donhangId });
    this.server.emit('donhang-updated', { donhangId });
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
