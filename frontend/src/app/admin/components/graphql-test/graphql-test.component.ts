import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversalGraphQLService } from '../../../shared/services/graphql/universal-graphql.service';
import { ModelServiceFactory } from '../../../shared/services/graphql/model-service.factory';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphql-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Universal GraphQL Test Component</h1>
      
      <!-- Available Models -->
      <div class="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Available Models:</h3>
        <div *ngIf="availableModels$ | async as models" class="flex flex-wrap gap-2">
          <span *ngFor="let model of models" class="bg-blue-200 px-2 py-1 rounded text-sm">
            {{ model }}
          </span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Users Section -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Users</h2>
          <button 
            (click)="loadUsers()" 
            class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
            Load Users
          </button>
          <div *ngIf="users$ | async as users" class="space-y-2">
            <div *ngFor="let user of users" class="p-2 border rounded">
              <p><strong>{{ user.name || 'No Name' }}</strong></p>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
              <p class="text-sm text-gray-600">CTV: {{ user.isCTV ? 'Yes' : 'No' }}</p>
            </div>
          </div>
        </div>

        <!-- Affiliate Links Section -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Affiliate Links</h2>
          <button 
            (click)="loadAffiliateLinks()" 
            class="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
            Load Affiliate Links
          </button>
          <div *ngIf="affiliateLinks$ | async as links" class="space-y-2">
            <div *ngFor="let link of links" class="p-2 border rounded">
              <p><strong>{{ link.campaignName || 'No Campaign Name' }}</strong></p>
              <p class="text-sm text-gray-600">{{ link.url }}</p>
              <p class="text-sm text-gray-600">Order: {{ link.order }}</p>
            </div>
          </div>
        </div>
        
        <!-- Dynamic Model Test -->
        <div class="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">Dynamic Model Test</h2>
          <div class="flex gap-2 mb-4">
            <input 
              [(ngModel)]="selectedModel" 
              placeholder="Enter model name (e.g., Role, Permission)" 
              class="border px-3 py-2 rounded flex-1">
            <button 
              (click)="loadDynamicModel()" 
              class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              Load Model
            </button>
          </div>
          <div *ngIf="dynamicData$ | async as data" class="space-y-2">
            <div *ngFor="let item of data" class="p-2 border rounded">
              <pre class="text-xs bg-gray-100 p-2 rounded">{{ item | json }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Test CRUD Operations -->
      <div class="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Test CRUD Operations</h3>
        <div class="flex gap-4 flex-wrap">
          <button 
            (click)="testCreateUser()" 
            class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Create Test User
          </button>
          <button 
            (click)="testCreateAffiliateLink()" 
            class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Create Test Affiliate Link
          </button>
          <button 
            (click)="testCreateRole()" 
            class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
            Create Test Role
          </button>
        </div>
        <div *ngIf="operationResult" class="mt-4 p-3 bg-yellow-100 border rounded">
          {{ operationResult }}
        </div>
      </div>
    </div>
  `
})
export class GraphqlTestComponent implements OnInit {
  users$: Observable<any[]> | null = null;
  affiliateLinks$: Observable<any[]> | null = null;
  dynamicData$: Observable<any[]> | null = null;
  availableModels$: Observable<string[]> | null = null;
  operationResult: string = '';
  selectedModel: string = '';

  constructor(
    private universalService: UniversalGraphQLService,
    private modelFactory: ModelServiceFactory
  ) {}

  ngOnInit() {
    // Initialize available models
    this.availableModels$ = new Observable(observer => {
      observer.next(['User', 'Role', 'Permission', 'Menu', 'AffiliateLink', 'LandingPage', 'TrackingEvent', 'ChatAIMessage']);
      observer.complete();
    });
  }

  loadUsers() {
    // Use universal service for User model
    this.users$ = this.universalService.findAll('User', { take: 10 });
  }

  loadAffiliateLinks() {
    // Use universal service for AffiliateLink model
    this.affiliateLinks$ = this.universalService.findAll('AffiliateLink', { take: 10 });
  }

  loadDynamicModel() {
    if (this.selectedModel.trim()) {
      this.dynamicData$ = this.universalService.findAll(this.selectedModel, { take: 10 });
    }
  }

  testCreateUser() {
    const newUser = {
      email: `test${Date.now()}@example.com`,
      name: `Test User ${Date.now()}`,
      isCTV: false
    };

    this.universalService.createOne('User', newUser).subscribe({
      next: (user: any) => {
        this.operationResult = `User created successfully: ${JSON.stringify(user)}`;
        this.loadUsers(); // Refresh the list
      },
      error: (error: any) => {
        this.operationResult = `Error creating user: ${error.message}`;
      }
    });
  }

  testCreateAffiliateLink() {
    const newLink = {
      campaignName: `Test Campaign ${Date.now()}`,
      url: `https://example.com/campaign/${Date.now()}`,
      order: 1,
      isActive: true,
      code: `TEST${Date.now()}`
    };

    this.universalService.createOne('AffiliateLink', newLink).subscribe({
      next: (link: any) => {
        this.operationResult = `Affiliate Link created successfully: ${JSON.stringify(link)}`;
        this.loadAffiliateLinks(); // Refresh the list
      },
      error: (error: any) => {
        this.operationResult = `Error creating affiliate link: ${error.message}`;
      }
    });
  }

  testCreateRole() {
    const newRole = {
      name: `Test Role ${Date.now()}`,
      description: `Test role created at ${new Date().toISOString()}`,
      isActive: true
    };

    this.universalService.createOne('Role', newRole).subscribe({
      next: (role: any) => {
        this.operationResult = `Role created successfully: ${JSON.stringify(role)}`;
      },
      error: (error: any) => {
        this.operationResult = `Error creating role: ${error.message}`;
      }
    });
  }
}