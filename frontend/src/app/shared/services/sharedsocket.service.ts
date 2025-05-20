import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class SharedSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${environment.APIURL}`, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
  }

  getSocket(): Socket {
    return this.socket;
  }
}
