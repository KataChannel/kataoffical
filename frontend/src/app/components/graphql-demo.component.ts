import { Component, OnInit, signal, computed } from '@angular/core';
import { GraphqlService, OptimizedFindManyOptions, PaginationResult } from '../shared/services/graphql.service';

@Component({
  selector: 'app-graphql-demo',
  template: `
    <div class="container">
      <h2>GraphQL Service Demo</h2>
      
      <!-- Health Status -->
      <div class="health-status" [class.healthy]="healthStatus()" [class.unhealthy]="!healthStatus()">
        <strong>Server Status:</strong> {{ healthStatus() ? 'Healthy ✅' : 'Unhealthy ❌' }}
      </div>

      <!-- Performance Metrics -->
      <div class="metrics-panel">
        <h3>Performance Metrics</h3>
        <p><strong>Cache Hit Rate:</strong> {{ cacheHitRate() }}%</p>
        <p><strong>Cache Size:</strong> {{ cacheSize() }} entries</p>
        <p><strong>Total Queries:</strong> {{ totalQueries() }}</p>
        <button (click)="refreshMetrics()">Refresh Metrics</button>
      </div>

      <!-- Model Selection -->
      <div class="model-selection">
        <h3>Select Model</h3>
        <select [(ngModel)]="selectedModel" (change)="onModelChange()">
          <option value="">Select a model...</option>
          <option *ngFor="let model of availableModels()" [value]="model">{{ model }}</option>
        </select>
      </div>

      <!-- Data Display -->
      <div class="data-section" *ngIf="selectedModel">
        <h3>{{ selectedModel | titlecase }} Data</h3>
        
        <!-- Loading State -->
        <div *ngIf="loading()" class="loading">
          Loading {{ selectedModel }} data...
        </div>

        <!-- Error Display -->
        <div *ngIf="error()" class="error">
          Error: {{ error() }}
        </div>

        <!-- Data List -->
        <div *ngIf="!loading() && !error() && dataList().length > 0" class="data-list">
          <div class="data-controls">
            <button (click)="loadData()">Reload Data</button>
            <button (click)="clearModelCache()">Clear Cache</button>
            <input 
              type="number" 
              [(ngModel)]="pageSize" 
              placeholder="Page Size"
              min="1"
              max="100"
            >
            <button (click)="loadDataWithPagination(1)">Load with Pagination</button>
          </div>

          <div class="pagination-info" *ngIf="paginationResult()">
            <p>
              Page {{ paginationResult()?.currentPage }} of {{ paginationResult()?.totalPages }}
              ({{ paginationResult()?.totalCount }} total items)
            </p>
            <div class="pagination-controls">
              <button 
                (click)="loadDataWithPagination(paginationResult()!.currentPage - 1)"
                [disabled]="!paginationResult()?.hasPreviousPage"
              >
                Previous
              </button>
              <button 
                (click)="loadDataWithPagination(paginationResult()!.currentPage + 1)"
                [disabled]="!paginationResult()?.hasNextPage"
              >
                Next
              </button>
            </div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th *ngFor="let field of displayFields">{{ field }}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of currentDisplayData(); let i = index">
                <td *ngFor="let field of displayFields">
                  {{ getFieldValue(item, field) }}
                </td>
                <td>
                  <button (click)="viewDetail(item.id)" class="btn-small">View</button>
                  <button (click)="editItem(item)" class="btn-small">Edit</button>
                  <button (click)="deleteItem(item.id)" class="btn-small btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Data -->
        <div *ngIf="!loading() && !error() && dataList().length === 0" class="no-data">
          No {{ selectedModel }} data found.
        </div>
      </div>

      <!-- Create New Item -->
      <div class="create-section" *ngIf="selectedModel">
        <h3>Create New {{ selectedModel | titlecase }}</h3>
        <div class="create-form">
          <div *ngFor="let field of createFields" class="form-group">
            <label>{{ field }}:</label>
            <input 
              type="text" 
              [(ngModel)]="newItemData[field]"
              [placeholder]="'Enter ' + field"
            >
          </div>
          <button (click)="createNewItem()" [disabled]="!isCreateFormValid()">
            Create {{ selectedModel | titlecase }}
          </button>
        </div>
      </div>

      <!-- Batch Operations -->
      <div class="batch-section" *ngIf="selectedModel">
        <h3>Batch Operations</h3>
        <div class="batch-controls">
          <button (click)="batchCreateDemo()">Batch Create Demo</button>
          <button (click)="batchUpdateDemo()">Batch Update Demo</button>
          <button (click)="batchDeleteDemo()">Batch Delete Demo</button>
        </div>
      </div>

      <!-- Search -->
      <div class="search-section" *ngIf="selectedModel">
        <h3>Search {{ selectedModel | titlecase }}</h3>
        <div class="search-form">
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            placeholder="Enter search term..."
            (keyup.enter)="performSearch()"
          >
          <button (click)="performSearch()">Search</button>
          <button (click)="clearSearch()">Clear</button>
        </div>
      </div>

      <!-- Performance Monitor -->
      <div class="performance-monitor">
        <h3>Recent Performance</h3>
        <div class="recent-metrics">
          <div *ngFor="let metric of recentMetrics()" class="metric-item">
            <span class="operation">{{ metric.queryType }}</span>
            <span class="model">{{ metric.modelName || 'N/A' }}</span>
            <span class="time">{{ metric.queryTime }}ms</span>
            <span class="cache" [class.hit]="metric.cacheHit" [class.miss]="!metric.cacheHit">
              {{ metric.cacheHit ? 'Cache Hit' : 'Cache Miss' }}
            </span>
            <span class="count">{{ metric.resultCount }} items</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .health-status {
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 5px;
      font-weight: bold;
    }

    .health-status.healthy {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .health-status.unhealthy {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .metrics-panel {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .model-selection {
      margin-bottom: 20px;
    }

    .model-selection select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
    }

    .data-section {
      margin-bottom: 30px;
    }

    .data-controls {
      margin-bottom: 15px;
    }

    .data-controls button,
    .data-controls input {
      margin-right: 10px;
      padding: 6px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .data-controls button {
      background: #007bff;
      color: white;
      cursor: pointer;
    }

    .data-controls button:hover {
      background: #0056b3;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .data-table th,
    .data-table td {
      padding: 8px 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    .data-table th {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    .btn-small {
      padding: 4px 8px;
      margin-right: 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
      border-color: #dc3545;
    }

    .loading {
      color: #007bff;
      font-style: italic;
    }

    .error {
      color: #dc3545;
      background: #f8d7da;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #f5c6cb;
    }

    .no-data {
      color: #6c757d;
      font-style: italic;
    }

    .create-section,
    .batch-section,
    .search-section {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 10px;
    }

    .form-group label {
      display: inline-block;
      width: 100px;
      font-weight: bold;
    }

    .form-group input {
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
    }

    .pagination-info {
      margin-bottom: 15px;
    }

    .pagination-controls button {
      margin-right: 10px;
      padding: 6px 12px;
    }

    .performance-monitor {
      background: #e9ecef;
      padding: 15px;
      border-radius: 5px;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #dee2e6;
    }

    .metric-item:last-child {
      border-bottom: none;
    }

    .metric-item .operation {
      font-weight: bold;
      color: #495057;
    }

    .metric-item .cache.hit {
      color: #28a745;
    }

    .metric-item .cache.miss {
      color: #dc3545;
    }

    .search-form {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .search-form input {
      flex: 1;
      max-width: 300px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .batch-controls {
      display: flex;
      gap: 10px;
    }

    .batch-controls button {
      padding: 8px 16px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .batch-controls button:hover {
      background: #218838;
    }
  `]
})
export class GraphqlDemoComponent implements OnInit {

  // State signals
  selectedModel = '';
  dataList = signal<any[]>([]);
  availableModels = signal<string[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  healthStatus = signal<boolean>(true);
  cacheHitRate = signal<number>(0);
  cacheSize = signal<number>(0);
  recentMetrics = signal<any[]>([]);
  paginationResult = signal<PaginationResult<any> | null>(null);

  // Form data
  newItemData: any = {};
  searchTerm = '';
  pageSize = 20;

  // Display configuration
  displayFields: string[] = [];
  createFields: string[] = [];

  // Computed properties
  totalQueries = computed(() => this.recentMetrics().length);
  currentDisplayData = computed(() => {
    const pagination = this.paginationResult();
    return pagination ? pagination.data : this.dataList();
  });

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    this.loadAvailableModels();
    this.startPerformanceMonitoring();
  }

  loadAvailableModels() {
    this.graphqlService.getAvailableModels().subscribe({
      next: (models) => {
        this.availableModels.set(models);
      },
      error: (error) => {
        console.error('Error loading models:', error);
      }
    });
  }

  onModelChange() {
    if (this.selectedModel) {
      this.configureModelFields();
      this.loadData();
      this.resetNewItemData();
    }
  }

  configureModelFields() {
    // Configure display and create fields based on model
    const modelConfigs: { [key: string]: { display: string[], create: string[] } } = {
      'sanpham': {
        display: ['id', 'ten', 'gia', 'mota'],
        create: ['ten', 'gia', 'mota']
      },
      'khachhang': {
        display: ['id', 'ten', 'email', 'sdt'],
        create: ['ten', 'email', 'sdt']
      },
      'user': {
        display: ['id', 'ten', 'email', 'sdt'],
        create: ['ten', 'email', 'sdt']
      },
      'donhang': {
        display: ['id', 'ngaydat', 'trangthai', 'tongtien'],
        create: ['ngaydat', 'trangthai', 'tongtien']
      },
      'dathang': {
        display: ['id', 'ngaydat', 'trangthai'],
        create: ['ngaydat', 'trangthai']
      }
    };

    const config = modelConfigs[this.selectedModel] || {
      display: ['id', 'ten'],
      create: ['ten']
    };

    this.displayFields = config.display;
    this.createFields = config.create;
  }

  loadData() {
    if (!this.selectedModel) return;

    this.loading.set(true);
    this.error.set(null);
    this.paginationResult.set(null);

    const options: OptimizedFindManyOptions = {
      take: this.pageSize,
      orderBy: this.getDefaultOrderBy()
    };

    this.graphqlService.findMany(this.selectedModel, options).subscribe({
      next: (data) => {
        this.dataList.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  loadDataWithPagination(page: number) {
    if (!this.selectedModel) return;

    this.loading.set(true);
    this.error.set(null);

    this.graphqlService.findManyWithPagination(this.selectedModel, {
      pageSize: this.pageSize,
      page: page,
      orderBy: this.getDefaultOrderBy()
    }).subscribe({
      next: (result) => {
        this.paginationResult.set(result);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  getDefaultOrderBy() {
    const orderByConfigs: { [key: string]: any } = {
      'sanpham': { ten: 'asc' },
      'khachhang': { ten: 'asc' },
      'user': { ten: 'asc' },
      'donhang': { createdAt: 'desc' },
      'dathang': { createdAt: 'desc' }
    };

    return orderByConfigs[this.selectedModel] || { id: 'asc' };
  }

  viewDetail(id: string) {
    this.graphqlService.findUnique(this.selectedModel, { id }).subscribe({
      next: (item) => {
        console.log('Item detail:', item);
        alert('Item detail logged to console');
      },
      error: (error) => {
        console.error('Error loading detail:', error);
      }
    });
  }

  editItem(item: any) {
    const updatedData = { ten: item.ten + ' (updated)' };
    
    this.graphqlService.updateOne(this.selectedModel, { id: item.id }, updatedData).subscribe({
      next: (updated) => {
        console.log('Updated item:', updated);
        this.loadData(); // Reload data
      },
      error: (error) => {
        console.error('Error updating item:', error);
      }
    });
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.graphqlService.deleteOne(this.selectedModel, { id }).subscribe({
        next: (deleted) => {
          console.log('Deleted item:', deleted);
          this.loadData(); // Reload data
        },
        error: (error) => {
          console.error('Error deleting item:', error);
        }
      });
    }
  }

  createNewItem() {
    if (!this.isCreateFormValid()) return;

    this.graphqlService.createOne(this.selectedModel, this.newItemData).subscribe({
      next: (created) => {
        console.log('Created item:', created);
        this.loadData(); // Reload data
        this.resetNewItemData();
      },
      error: (error) => {
        console.error('Error creating item:', error);
      }
    });
  }

  isCreateFormValid(): boolean {
    return this.createFields.every(field => 
      this.newItemData[field] && this.newItemData[field].trim() !== ''
    );
  }

  resetNewItemData() {
    this.newItemData = {};
  }

  performSearch() {
    if (!this.searchTerm.trim()) return;

    const searchOptions: OptimizedFindManyOptions = {
      where: {
        OR: [
          { ten: { contains: this.searchTerm, mode: 'insensitive' } },
          { mota: { contains: this.searchTerm, mode: 'insensitive' } }
        ]
      },
      take: this.pageSize
    };

    this.loading.set(true);
    this.graphqlService.findMany(this.selectedModel, searchOptions).subscribe({
      next: (data) => {
        this.dataList.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadData();
  }

  clearModelCache() {
    this.graphqlService.clearCache(this.selectedModel);
    alert(`Cache cleared for ${this.selectedModel}`);
  }

  batchCreateDemo() {
    const demoData = [
      { ten: 'Demo Item 1', mota: 'Demo description 1' },
      { ten: 'Demo Item 2', mota: 'Demo description 2' },
      { ten: 'Demo Item 3', mota: 'Demo description 3' }
    ];

    this.graphqlService.batchCreate(this.selectedModel, demoData).subscribe({
      next: (created) => {
        console.log('Batch created:', created);
        this.loadData();
      },
      error: (error) => {
        console.error('Batch create error:', error);
      }
    });
  }

  batchUpdateDemo() {
    const operations = [
      { where: { id: '1' }, data: { ten: 'Batch Updated 1' } },
      { where: { id: '2' }, data: { ten: 'Batch Updated 2' } }
    ];

    this.graphqlService.batchUpdate(this.selectedModel, operations).subscribe({
      next: (updated) => {
        console.log('Batch updated:', updated);
        this.loadData();
      },
      error: (error) => {
        console.error('Batch update error:', error);
      }
    });
  }

  batchDeleteDemo() {
    const whereConditions = [
      { ten: { contains: 'Demo' } }
    ];

    if (confirm('This will delete all demo items. Continue?')) {
      this.graphqlService.batchDelete(this.selectedModel, whereConditions).subscribe({
        next: (deleted) => {
          console.log('Batch deleted:', deleted);
          this.loadData();
        },
        error: (error) => {
          console.error('Batch delete error:', error);
        }
      });
    }
  }

  refreshMetrics() {
    this.cacheHitRate.set(this.graphqlService.getCacheHitRate());
    this.cacheSize.set(this.graphqlService.getCacheSize());
    this.healthStatus.set(this.graphqlService.getHealthStatus());
    this.recentMetrics.set(this.graphqlService.getPerformanceMetrics().slice(-10));
  }

  startPerformanceMonitoring() {
    // Update metrics every 5 seconds
    setInterval(() => {
      this.refreshMetrics();
    }, 5000);
  }

  getFieldValue(item: any, field: string): any {
    const value = item[field];
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object' && value.constructor === Object) {
      return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
      return `[${value.length} items]`;
    }
    return value;
  }
}
