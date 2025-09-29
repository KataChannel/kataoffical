import { Injectable } from '@angular/core';
import { UniversalGraphQLService, QueryOptions, BulkOperationResult, ModelService } from './universal-graphql.service';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceFactory {
  constructor(private universalService: UniversalGraphQLService) {}

  // Create a service for any model
  createService<T = any>(modelName: string): ModelService<T> {
    return this.universalService.createModelService<T>(modelName);
  }

  // Pre-created services for common models
  get userService(): ModelService<any> {
    return this.createService('User');
  }

  get roleService(): ModelService<any> {
    return this.createService('Role');
  }

  get permissionService(): ModelService<any> {
    return this.createService('Permission');
  }

  get menuService(): ModelService<any> {
    return this.createService('Menu');
  }

  get affiliateLinkService(): ModelService<any> {
    return this.createService('AffiliateLink');
  }

  get landingPageService(): ModelService<any> {
    return this.createService('LandingPage');
  }

  get trackingEventService(): ModelService<any> {
    return this.createService('TrackingEvent');
  }

  get chatAIMessageService(): ModelService<any> {
    return this.createService('ChatAIMessage');
  }

  get auditLogService(): ModelService<any> {
    return this.createService('AuditLog');
  }

  get resourceService(): ModelService<any> {
    return this.createService('Resource');
  }

  get fileManagerService(): ModelService<any> {
    return this.createService('FileManager');
  }

  get doanhsoService(): ModelService<any> {
    return this.createService('Doanhso');
  }

  get hoaHongService(): ModelService<any> {
    return this.createService('HoaHong');
  }
}