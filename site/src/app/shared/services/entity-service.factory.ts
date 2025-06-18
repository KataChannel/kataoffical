import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Router } from '@angular/router';
import { StorageService } from '../utils/storage.service';
import { ErrorLogService } from './errorlog.service';
import { SharedSocketService } from './sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class EntityServiceFactory {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService
  ) {}

  createService<T>(entityName: string): AbstractService<T> {
    const storage = this._StorageService;
    const router = this.router;
    const errorLog = this._ErrorLogService;
    const sharedSocket = this._sharedSocketService;
    return new class extends AbstractService<T> {
      constructor() {
        super(entityName, storage, router, errorLog, sharedSocket);
      }
    }();
  }
}