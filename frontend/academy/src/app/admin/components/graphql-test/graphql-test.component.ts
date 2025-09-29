import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGraphQLService, User, AffiliateLinkGraphQLService, AffiliateLink } from '../../../shared/services/graphql';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphql-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">GraphQL Test Component</h1>
      
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
      </div>

      <!-- Test CRUD Operations -->
      <div class="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Test CRUD Operations</h3>
        <div class="flex gap-4">
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
        </div>
        <div *ngIf="operationResult" class="mt-4 p-3 bg-yellow-100 border rounded">
          {{ operationResult }}
        </div>
      </div>
    </div>
  `
})
export class GraphqlTestComponent implements OnInit {
  users$: Observable<User[]> | null = null;
  affiliateLinks$: Observable<AffiliateLink[]> | null = null;
  operationResult: string = '';

  constructor(
    private userService: UserGraphQLService,
    private affiliateLinkService: AffiliateLinkGraphQLService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadAffiliateLinks();
  }

  loadUsers() {
    this.users$ = this.userService.findAll({ take: 10 });
  }

  loadAffiliateLinks() {
    this.affiliateLinks$ = this.affiliateLinkService.findAll({ take: 10 });
  }

  testCreateUser() {
    const newUser = {
      name: 'Test User ' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      isCTV: true,
      isActive: true
    };

    this.userService.createOne(newUser).subscribe({
      next: (user) => {
        this.operationResult = `User created: ${user.name} (${user.id})`;
        this.loadUsers(); // Reload users
      },
      error: (error) => {
        this.operationResult = `Error creating user: ${error.message}`;
      }
    });
  }

  testCreateAffiliateLink() {
    const newLink = {
      campaignName: 'Test Campaign ' + Date.now(),
      url: 'https://example.com/test-' + Date.now(),
      description: 'Test affiliate link created via GraphQL',
      isActive: true,
      order: 1
    };

    this.affiliateLinkService.createOne(newLink).subscribe({
      next: (link) => {
        this.operationResult = `Affiliate link created: ${link.campaignName} (${link.id})`;
        this.loadAffiliateLinks(); // Reload links
      },
      error: (error) => {
        this.operationResult = `Error creating affiliate link: ${error.message}`;
      }
    });
  }
}