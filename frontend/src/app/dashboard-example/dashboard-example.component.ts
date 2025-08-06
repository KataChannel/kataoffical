import { Component, OnInit, signal } from '@angular/core';
import { DashboardService, DashboardData, InventoryData } from '../shared/services/dashboard.service';
import { DateHelpers } from '../shared/utils/date-helpers';

@Component({
  selector: 'app-dashboard-example',
  template: `
    <div class="dashboard-container">
      <h1>Dashboard Example</h1>
      
      <!-- Date Range Selector -->
      <div class="date-range-selector">
        <h3>Select Date Range:</h3>
        <select (change)="onDateRangeChange($event)" [value]="selectedRange()">
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="custom">Custom Range</option>
        </select>
        
        @if (selectedRange() === 'custom') {
          <div class="custom-date-inputs">
            <input 
              type="date" 
              [(ngModel)]="customStartDate"
              (change)="onCustomDateChange()"
              placeholder="Start Date">
            <input 
              type="date" 
              [(ngModel)]="customEndDate"
              (change)="onCustomDateChange()"
              placeholder="End Date">
          </div>
        }
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
        <div class="loading">Loading dashboard data...</div>
      }

      <!-- Error State -->
      @if (error()) {
        <div class="error">
          <p>Error: {{ error() }}</p>
          <button (click)="clearError()">Clear Error</button>
        </div>
      }

      <!-- Dashboard Summary -->
      @if (dashboardData()) {
        <div class="dashboard-summary">
          <h2>Summary</h2>
          <div class="summary-cards">
            <div class="card">
              <h3>Total Orders</h3>
              <p>{{ dashboardData()?.summary.totalOrders | number }}</p>
            </div>
            <div class="card">
              <h3>Total Revenue</h3>
              <p>{{ dashboardData()?.summary.totalRevenue | currency:'VND' }}</p>
            </div>
            <div class="card">
              <h3>Total Products</h3>
              <p>{{ dashboardData()?.summary.totalProducts | number }}</p>
            </div>
            <div class="card">
              <h3>Total Customers</h3>
              <p>{{ dashboardData()?.summary.totalCustomers | number }}</p>
            </div>
          </div>
        </div>
      }

      <!-- Recent Orders -->
      @if (dashboardData()?.recentOrders?.length) {
        <div class="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order Code</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              @for (order of dashboardData()?.recentOrders; track order.id) {
                <tr>
                  <td>{{ order.madonhang }}</td>
                  <td>{{ order.khachhang.hovaten }}</td>
                  <td>{{ order.tongtien | currency:'VND' }}</td>
                  <td>{{ order.trangthai }}</td>
                  <td>{{ formatDate(order.createdAt, 'DD/MM/YYYY HH:mm') }}</td>
                  <td>{{ formatDate(order.ngaygiao, 'DD/MM/YYYY') }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Top Products -->
      @if (dashboardData()?.topProducts?.length) {
        <div class="top-products">
          <h2>Top Products</h2>
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Title</th>
                <th>Category</th>
                <th>Total Sold</th>
                <th>Revenue</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              @for (product of dashboardData()?.topProducts; track product.id) {
                <tr>
                  <td>{{ product.masp }}</td>
                  <td>{{ product.title }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.totalSold | number }}</td>
                  <td>{{ product.revenue | currency:'VND' }}</td>
                  <td>{{ product.profit | currency:'VND' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- Inventory Alerts -->
      @if (inventoryData()?.stockAlerts) {
        <div class="inventory-alerts">
          <h2>Inventory Alerts</h2>
          
          @if (inventoryData()?.stockAlerts.criticalStock?.length) {
            <div class="critical-stock">
              <h3>Critical Stock Levels</h3>
              @for (item of inventoryData()?.stockAlerts.criticalStock; track item.productId) {
                <div class="alert-item critical">
                  <strong>{{ item.productName }}</strong>
                  <span>Current: {{ item.currentStock }} | Min: {{ item.minStock }}</span>
                  <span class="days-warning">{{ item.daysUntilStockout }} days until stockout</span>
                </div>
              }
            </div>
          }

          @if (inventoryData()?.stockAlerts.excessStock?.length) {
            <div class="excess-stock">
              <h3>Excess Stock</h3>
              @for (item of inventoryData()?.stockAlerts.excessStock; track item.productId) {
                <div class="alert-item warning">
                  <strong>{{ item.productName }}</strong>
                  <span>Current: {{ item.currentStock }} | Max: {{ item.maxStock }}</span>
                  <span class="days-supply">{{ item.daysOfSupply }} days of supply</span>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Action Buttons -->
      <div class="actions">
        <button (click)="refreshData()" [disabled]="isLoading()">
          Refresh Data
        </button>
        <button (click)="loadInventoryData()" [disabled]="isLoading()">
          Load Inventory
        </button>
        <button (click)="clearAllData()">
          Clear Data
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .date-range-selector {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .custom-date-inputs {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .custom-date-inputs input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    .card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      text-align: center;
      background: #f9f9f9;
    }

    .card h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .card p {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }

    table th,
    table td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    table th {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    .inventory-alerts {
      margin-bottom: 30px;
    }

    .alert-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 5px;
      border-radius: 3px;
    }

    .alert-item.critical {
      background-color: #ffebee;
      border-left: 4px solid #f44336;
    }

    .alert-item.warning {
      background-color: #fff3e0;
      border-left: 4px solid #ff9800;
    }

    .days-warning {
      color: #f44336;
      font-weight: bold;
    }

    .days-supply {
      color: #ff9800;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }

    .actions button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    .actions button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .actions button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .loading {
      text-align: center;
      padding: 20px;
      font-size: 18px;
      color: #666;
    }

    .error {
      background-color: #ffebee;
      border: 1px solid #f44336;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .error p {
      margin: 0 0 10px 0;
      color: #f44336;
    }

    .error button {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
  `]
})
export class DashboardExampleComponent implements OnInit {
  // Reactive signals
  selectedRange = signal<string>('last30days');
  dashboardData = signal<DashboardData | null>(null);
  inventoryData = signal<InventoryData | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Custom date range
  customStartDate: string = '';
  customEndDate: string = '';

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    await this.loadDashboardData();
  }

  /**
   * Handle date range selection change
   */
  async onDateRangeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedRange.set(target.value);
    
    if (target.value !== 'custom') {
      await this.loadDashboardData();
    }
  }

  /**
   * Handle custom date range change
   */
  async onCustomDateChange() {
    if (this.customStartDate && this.customEndDate) {
      await this.loadDashboardData();
    }
  }

  /**
   * Load dashboard data with current date range
   */
  async loadDashboardData() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const filters = this.getCurrentDateFilters();
      const data = await this.dashboardService.getDashboardStats(filters);
      
      if (data) {
        this.dashboardData.set(data);
      } else {
        this.error.set('No dashboard data available');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data';
      this.error.set(errorMessage);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Load inventory data
   */
  async loadInventoryData() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const filters = this.getCurrentDateFilters();
      const data = await this.dashboardService.getInventorySummary(filters);
      
      if (data) {
        this.inventoryData.set(data);
      } else {
        this.error.set('No inventory data available');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load inventory data';
      this.error.set(errorMessage);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get current date filters based on selection
   */
  private getCurrentDateFilters(): any {
    const range = this.selectedRange();
    
    if (range === 'custom') {
      if (this.customStartDate && this.customEndDate) {
        return {
          startDate: DateHelpers.startOfDay(new Date(this.customStartDate)),
          endDate: DateHelpers.endOfDay(new Date(this.customEndDate))
        };
      }
      return {};
    }

    const presets = DateHelpers.getDateRangePresets();
    const preset = presets[range];
    
    if (preset) {
      return {
        startDate: preset.start,
        endDate: preset.end
      };
    }

    return {};
  }

  /**
   * Refresh all data
   */
  async refreshData() {
    await Promise.all([
      this.loadDashboardData(),
      this.loadInventoryData()
    ]);
  }

  /**
   * Clear all data
   */
  clearAllData() {
    this.dashboardData.set(null);
    this.inventoryData.set(null);
    this.dashboardService.clearData();
  }

  /**
   * Clear error state
   */
  clearError() {
    this.error.set(null);
    this.dashboardService.clearError();
  }

  /**
   * Format date for display using DateHelpers
   */
  formatDate(date: string | Date | moment.Moment | null | undefined, format?: string): string {
    return DateHelpers.formatDate(date, format);
  }
}
