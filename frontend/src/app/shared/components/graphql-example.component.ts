import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { GraphqlService } from '../shared/services/graphql.service';
import { SanphamGraphQLService } from '../shared/services/sanpham-graphql.service';

/**
 * Example component demonstrating GraphQL service usage
 * Shows both direct GraphQL service usage and enhanced service patterns
 */
@Component({
  selector: 'app-graphql-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  template: `
    <div class="graphql-example-container">
      <h2>GraphQL Service Example</h2>
      
      <!-- Error Display -->
      <div *ngIf="sanphamService.error() || graphqlService.error()" class="error-banner">
        <p>❌ Error: {{ sanphamService.error() || graphqlService.error() }}</p>
        <button mat-button (click)="clearErrors()">Clear</button>
      </div>

      <!-- Loading Indicator -->
      <div *ngIf="sanphamService.isLoading() || graphqlService.isLoading()" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading...</p>
      </div>

      <!-- Search Section -->
      <div class="search-section">
        <mat-form-field>
          <mat-label>Search Products</mat-label>
          <input matInput [(ngModel)]="searchTerm" (keyup.enter)="performSearch()" placeholder="Enter product name or code">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="performSearch()">Search</button>
        <button mat-button (click)="clearSearch()">Clear</button>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button mat-raised-button color="primary" (click)="loadProducts()">
          Load Products
        </button>
        <button mat-raised-button color="accent" (click)="createSampleProduct()">
          Create Sample
        </button>
        <button mat-raised-button color="warn" (click)="bulkDeleteSelected()" 
                [disabled]="selectedIds().length === 0">
          Delete Selected ({{ selectedIds().length }})
        </button>
        <button mat-button (click)="loadDashboardStats()">
          Dashboard Stats
        </button>
        <button mat-button (click)="loadLowStock()">
          Low Stock Items
        </button>
      </div>

      <!-- Direct GraphQL Example -->
      <div class="direct-graphql-section">
        <h3>Direct GraphQL Service Usage</h3>
        <button mat-button (click)="directGraphQLExample()">Execute Custom Query</button>
        <pre *ngIf="customQueryResult()">{{ customQueryResult() | json }}</pre>
      </div>

      <!-- Products Table -->
      <div class="table-section" *ngIf="sanphamService.ListSanpham().length > 0">
        <h3>Products ({{ sanphamService.total() }} total)</h3>
        
        <table mat-table [dataSource]="sanphamService.ListSanpham()" class="products-table">
          <!-- Selection Column -->
          <ng-container matColumnDef="select">
            <th mat-header-cell *matHeaderCellDef>
              <input type="checkbox" (change)="toggleAll($event)" 
                     [checked]="isAllSelected()">
            </th>
            <td mat-cell *matCellDef="let product">
              <input type="checkbox" 
                     [checked]="isSelected(product.id)"
                     (change)="toggleSelection(product.id, $event)">
            </td>
          </ng-container>

          <!-- Product Code Column -->
          <ng-container matColumnDef="masp">
            <th mat-header-cell *matHeaderCellDef>Code</th>
            <td mat-cell *matCellDef="let product">{{ product.masp }}</td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let product">{{ product.title }}</td>
          </ng-container>

          <!-- Price Column -->
          <ng-container matColumnDef="giaban">
            <th mat-header-cell *matHeaderCellDef>Price</th>
            <td mat-cell *matCellDef="let product">{{ product.giaban | currency:'VND' }}</td>
          </ng-container>

          <!-- Stock Column -->
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef>Stock</th>
            <td mat-cell *matCellDef="let product">
              <span *ngFor="let tonkho of product.tonkhos">
                {{ tonkho.kho.tenKho }}: {{ tonkho.soluong }}
              </span>
            </td>
          </ng-container>

          <!-- Supplier Column -->
          <ng-container matColumnDef="supplier">
            <th mat-header-cell *matHeaderCellDef>Supplier</th>
            <td mat-cell *matCellDef="let product">{{ product.nhacungcap?.tenNhacungcap }}</td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let product">
              <button mat-icon-button (click)="viewProduct(product.id)">👁️</button>
              <button mat-icon-button (click)="editProduct(product.id)">✏️</button>
              <button mat-icon-button (click)="deleteProduct(product.id)">🗑️</button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <!-- Pagination -->
        <div class="pagination-section">
          <mat-paginator 
            [length]="sanphamService.total()"
            [pageSize]="sanphamService.pageSize()"
            [pageIndex]="sanphamService.page() - 1"
            [pageSizeOptions]="[10, 25, 50, 100]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </div>
      </div>

      <!-- Product Detail -->
      <div class="detail-section" *ngIf="sanphamService.DetailSanpham().id">
        <h3>Product Detail</h3>
        <div class="detail-card">
          <p><strong>ID:</strong> {{ sanphamService.DetailSanpham().id }}</p>
          <p><strong>Code:</strong> {{ sanphamService.DetailSanpham().masp }}</p>
          <p><strong>Title:</strong> {{ sanphamService.DetailSanpham().title }}</p>
          <p><strong>Description:</strong> {{ sanphamService.DetailSanpham().description }}</p>
          <p><strong>Price:</strong> {{ sanphamService.DetailSanpham().giaban | currency:'VND' }}</p>
          <p><strong>Cost:</strong> {{ sanphamService.DetailSanpham().giagoc | currency:'VND' }}</p>
          <p><strong>Unit:</strong> {{ sanphamService.DetailSanpham().dvt }}</p>
          <p><strong>Status:</strong> {{ sanphamService.DetailSanpham().isActive ? 'Active' : 'Inactive' }}</p>
          
          <!-- Stock Information -->
          <div *ngIf="sanphamService.DetailSanpham().tonkhos?.length > 0">
            <h4>Stock Information</h4>
            <div *ngFor="let tonkho of sanphamService.DetailSanpham().tonkhos">
              <p>{{ tonkho.kho.tenKho }}: {{ tonkho.soluong }} units</p>
            </div>
          </div>

          <!-- Recent Orders -->
          <div *ngIf="sanphamService.DetailSanpham().donhangsanphams?.length > 0">
            <h4>Recent Orders</h4>
            <div *ngFor="let item of sanphamService.DetailSanpham().donhangsanphams">
              <p>Order {{ item.donhang.madonhang }} - {{ item.soluong }} units 
                 ({{ item.donhang.createdAt | date }})</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="stats-section" *ngIf="dashboardStats()">
        <h3>Dashboard Statistics</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <h4>Total Products</h4>
            <p>{{ dashboardStats().totalProducts }}</p>
          </div>
          <div class="stat-card">
            <h4>Total Orders</h4>
            <p>{{ dashboardStats().totalOrders }}</p>
          </div>
          <div class="stat-card">
            <h4>Total Revenue</h4>
            <p>{{ dashboardStats().totalRevenue | currency:'VND' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .graphql-example-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .error-banner {
      background-color: #ffebee;
      color: #c62828;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .search-section, .action-section {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .products-table {
      width: 100%;
      margin-bottom: 20px;
    }

    .detail-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      background-color: #f9f9f9;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .stat-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      background-color: #fff;
    }

    .stat-card h4 {
      margin: 0 0 8px 0;
      color: #666;
    }

    .stat-card p {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .direct-graphql-section {
      margin: 20px 0;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    .pagination-section {
      margin-top: 20px;
    }

    pre {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 4px;
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class GraphQLExampleComponent implements OnInit {
  // Inject services
  private graphqlService = inject(GraphqlService);
  private sanphamService = inject(SanphamGraphQLService);
  private snackBar = inject(MatSnackBar);

  // Component state
  searchTerm = signal<string>('');
  selectedIds = signal<string[]>([]);
  customQueryResult = signal<any>(null);
  dashboardStats = signal<any>(null);

  // Table configuration
  displayedColumns = ['select', 'masp', 'title', 'giaban', 'stock', 'supplier', 'actions'];

  ngOnInit() {
    this.loadProducts();
    this.loadDashboardStats();
  }

  // Enhanced Service Methods

  async loadProducts() {
    await this.sanphamService.getAllSanpham({
      page: 1,
      pageSize: 10
    });
  }

  async performSearch() {
    const term = this.searchTerm().trim();
    if (term) {
      await this.sanphamService.searchSanpham(term);
    } else {
      await this.loadProducts();
    }
  }

  async clearSearch() {
    this.searchTerm.set('');
    await this.loadProducts();
  }

  async viewProduct(id: string) {
    await this.sanphamService.getSanphamById(id);
  }

  async editProduct(id: string) {
    // This would typically open an edit dialog
    console.log('Edit product:', id);
    this.snackBar.open(`Edit product ${id}`, 'Close', { duration: 3000 });
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      const success = await this.sanphamService.deleteSanpham(id);
      if (success) {
        this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
      }
    }
  }

  async createSampleProduct() {
    const sampleProduct = {
      title: `Sample Product ${Date.now()}`,
      masp: `SP${Date.now()}`,
      giaban: Math.floor(Math.random() * 100000) + 10000,
      giagoc: Math.floor(Math.random() * 80000) + 5000,
      dvt: 'cái',
      description: 'This is a sample product created for testing',
      isActive: true
    };

    const success = await this.sanphamService.createSanpham(sampleProduct);
    if (success) {
      this.snackBar.open('Sample product created successfully', 'Close', { duration: 3000 });
    }
  }

  async bulkDeleteSelected() {
    if (this.selectedIds().length === 0) return;

    if (confirm(`Delete ${this.selectedIds().length} selected products?`)) {
      const success = await this.sanphamService.bulkDeleteSanphams(this.selectedIds());
      if (success) {
        this.selectedIds.set([]);
        this.snackBar.open('Selected products deleted successfully', 'Close', { duration: 3000 });
      }
    }
  }

  async loadLowStock() {
    await this.sanphamService.getLowStockSanphams(5);
    this.snackBar.open('Loaded low stock items', 'Close', { duration: 3000 });
  }

  // Direct GraphQL Service Methods

  async directGraphQLExample() {
    try {
      // Example of using the GraphQL service directly for custom queries
      const customQuery = `
        query CustomProductAnalysis {
          productStats: findMany(
            modelName: "Sanpham"
            where: { isActive: true }
          )
          
          recentProducts: findMany(
            modelName: "Sanpham"
            orderBy: { createdAt: "desc" }
            take: 5
            include: {
              nhacungcap: true
              tonkhos: {
                include: { kho: true }
              }
            }
          )
        }
      `;

      const result = await this.graphqlService.executeCustomQuery(customQuery);
      
      if (result.data) {
        this.customQueryResult.set(result.data);
        this.snackBar.open('Custom query executed successfully', 'Close', { duration: 3000 });
      }
    } catch (error) {
      console.error('Custom query failed:', error);
    }
  }

  async loadDashboardStats() {
    try {
      const result = await this.graphqlService.getDashboardStats({
        dateRange: {
          from: new Date('2025-01-01'),
          to: new Date()
        }
      });

      if (result.data) {
        this.dashboardStats.set(result.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  }

  // Selection Management

  toggleSelection(id: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedIds.update(ids => [...ids, id]);
    } else {
      this.selectedIds.update(ids => ids.filter(selectedId => selectedId !== id));
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allIds = this.sanphamService.ListSanpham().map(product => product.id);
      this.selectedIds.set(allIds);
    } else {
      this.selectedIds.set([]);
    }
  }

  isAllSelected(): boolean {
    const products = this.sanphamService.ListSanpham();
    return products.length > 0 && this.selectedIds().length === products.length;
  }

  // Pagination

  async onPageChange(event: any) {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    
    await this.sanphamService.getAllSanpham({ page, pageSize });
  }

  // Utility Methods

  clearErrors() {
    this.sanphamService.clearError();
    this.graphqlService.clearError();
  }
}
