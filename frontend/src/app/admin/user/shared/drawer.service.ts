import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private _isOpen = signal(false);
  
  // Public readonly signal
  isOpen = this._isOpen.asReadonly();
  
  open(): void {
    this._isOpen.set(true);
  }
  
  close(): void {
    this._isOpen.set(false);
  }
  
  toggle(): void {
    this._isOpen.update(value => !value);
  }
}
