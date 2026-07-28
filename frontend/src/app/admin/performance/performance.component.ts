import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { PerformanceService, PerformanceStats, PerformanceMetric, PerformanceTrend } from '../../shared/services/performance.service';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  templateUrl: './performance.component.html',
  styleUrls: []
})
export class PerformanceComponent implements OnInit, OnDestroy, AfterViewInit {
  // Data properties
  summary: any = null;
  dbStats: PerformanceStats | null = null;
  logs: PerformanceMetric[] = [];
  dataSource = new MatTableDataSource<PerformanceMetric>([]);
  trends: PerformanceTrend[] = [];
  selectedLog: PerformanceMetric | null = null;

  // Filter properties
  selectedHours: number = 24;
  selectedOperation: string = '';
  selectedSuccess: string = 'all';
  selectedOperationType: string = 'all';
  selectedRequestType: string = 'all'; // 'all', 'graphql', 'http'
  minDuration: number | null = null;
  logLimit: number = 50;

  // UI state
  activeTab: string = 'dashboard';
  isLoading: boolean = false;
  errorMessage: string = '';
  autoRefresh: boolean = false;
  refreshInterval: Subscription | null = null;

  // Test results
  testResults: any[] = [];
  
  // Modal template reference
  @ViewChild('logDetailsModal', { static: false }) logDetailsModalTemplate!: TemplateRef<any>;
  
  // Sort reference
  @ViewChild(MatSort) sort!: MatSort;

  // Table columns
  displayedColumns: string[] = ['timestamp', 'operation', 'duration', 'status', 'method', 'url', 'memory', 'context'];
  displayedTrendColumns: string[] = ['hour', 'totalOperations', 'avgDuration', 'maxDuration', 'errorCount', 'errorRate'];

  constructor(
    private performanceService: PerformanceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    // Configure custom sorting for complex data
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'operation':
          return this.getOperationName(item);
        case 'status':
          return item.success;
        case 'memory':
          return item.memoryUsage || 0;
        case 'duration':
          return item.duration;
        case 'timestamp':
          return new Date(item.timestamp).getTime();
        case 'method':
          return this.isGraphQLLog(item) ? this.getOperationType(item) : item.method;
        case 'url':
          return this.getEndpointPath(item);
        default:
          return item[property];
      }
    };
    
    this.dataSource.sort = this.sort;
    // If we already have data, refresh the sort
    if (this.dataSource.data.length > 0) {
      this.dataSource._updateChangeSubscription();
    }
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  loadAllData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Load summary dashboard
    this.performanceService.getSummary(this.selectedHours).subscribe({
      next: (data) => {
        this.summary = data;
      },
      error: (error) => {
        console.error('Error loading summary:', error);
        this.errorMessage = 'Failed to load performance summary';
        this.showSnackBar('Failed to load performance summary', 'error');
      }
    });

    // Load database stats
    this.performanceService.getDatabaseStats(this.selectedHours).subscribe({
      next: (data) => {
        this.dbStats = data;
      },
      error: (error) => {
        console.error('Error loading database stats:', error);
      }
    });

    // Load trends
    this.performanceService.getTrends(this.selectedHours).subscribe({
      next: (data) => {
        this.trends = data;
      },
      error: (error) => {
        console.error('Error loading trends:', error);
      }
    });

    // Load logs with filters
    this.loadLogs();

    this.isLoading = false;
  }

  loadLogs(): void {
    const filter = {
      hours: this.selectedHours,
      limit: this.logLimit,
      operation: this.selectedOperation || undefined,
      success: this.selectedSuccess === 'all' ? undefined : this.selectedSuccess === 'true',
      minDuration: this.minDuration || undefined,
      requestType: this.selectedRequestType === 'all' ? undefined : this.selectedRequestType,
      operationType: this.selectedOperationType === 'all' ? undefined : this.selectedOperationType
    };

    this.performanceService.getLogs(filter).subscribe({
      next: (data) => {
        // Client-side filtering for GraphQL-specific filters since backend may not support them yet
        let filteredData = data;
        
        if (this.selectedRequestType === 'graphql') {
          filteredData = filteredData.filter(log => this.isGraphQLLog(log));
        } else if (this.selectedRequestType === 'http') {
          filteredData = filteredData.filter(log => !this.isGraphQLLog(log));
        }
        
        if (this.selectedOperationType !== 'all') {
          filteredData = filteredData.filter(log => 
            this.isGraphQLLog(log) && this.getOperationType(log).toLowerCase() === this.selectedOperationType
          );
        }
        
        this.logs = filteredData;
        this.dataSource.data = filteredData;
        // Ensure sort is applied after data update
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        console.error('Error loading logs:', error);
        this.showSnackBar('Error loading performance logs', 'error');
      }
    });
  }

  onFilterChange(): void {
    this.loadLogs();
  }

  onHoursChange(): void {
    this.loadAllData();
  }

  toggleAutoRefresh(): void {
    if (this.autoRefresh) {
      this.refreshInterval = interval(30000).subscribe(() => {
        this.loadAllData();
      });
    } else {
      if (this.refreshInterval) {
        this.refreshInterval.unsubscribe();
        this.refreshInterval = null;
      }
    }
  }

  // Test operations
  runTest(type: string): void {
    let testObservable;
    
    switch (type) {
      case 'fast':
        testObservable = this.performanceService.testFastOperation();
        break;
      case 'slow':
        testObservable = this.performanceService.testSlowOperation();
        break;
      case 'error':
        testObservable = this.performanceService.testErrorOperation();
        break;
      case 'bulk':
        testObservable = this.performanceService.testBulkOperations();
        break;
      default:
        return;
    }

    const startTime = Date.now();
    testObservable.subscribe({
      next: (result) => {
        const duration = Date.now() - startTime;
        this.testResults.unshift({
          type,
          success: true,
          duration: duration + 'ms',
          result,
          timestamp: new Date().toISOString()
        });
        
        // Refresh data after test
        setTimeout(() => this.loadAllData(), 1000);
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        this.testResults.unshift({
          type,
          success: false,
          duration: duration + 'ms',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  // Utility methods
  showSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const config = {
      duration: 3000,
      panelClass: [`snack-${type}`]
    };
    this.snackBar.open(message, 'Close', config);
  }

  getDurationColor(duration: string): string {
    const ms = parseFloat(duration.replace('ms', ''));
    if (ms > 1000) return 'text-red-600 bg-red-100';
    if (ms > 500) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  // Management operations
  cleanupLogs(): void {
    this.performanceService.cleanupLogs(30).subscribe({
      next: (result) => {
        this.showSnackBar(result.message, 'success');
        this.loadAllData();
      },
      error: (error) => {
        this.showSnackBar('Error cleaning up logs: ' + error.message, 'error');
      }
    });
  }

  clearMemoryMetrics(): void {
    this.performanceService.clearMemoryMetrics().subscribe({
      next: (result) => {
        this.showSnackBar(result.message, 'success');
        this.loadAllData();
      },
      error: (error) => {
        this.showSnackBar('Error clearing metrics: ' + error.message, 'error');
      }
    });
  }

  // GraphQL helper methods
  isGraphQLLog(log: PerformanceMetric): boolean {
    return log.context && (
      log.context.method === 'GRAPHQL' ||
      log.context.operation ||
      log.context.fieldName ||
      log.url?.includes('/graphql')
    );
  }

  getOperationName(log: PerformanceMetric): string {
    if (this.isGraphQLLog(log)) {
      return log.context?.fieldName || log.name || 'GraphQL Operation';
    }
    return log.name || log.url || 'HTTP Request';
  }

  getOperationType(log: PerformanceMetric): string {
    return log.context?.operation || 'query';
  }

  getFieldName(log: PerformanceMetric): string {
    return log.context?.fieldName || 'unknown';
  }

  getParentType(log: PerformanceMetric): string {
    return log.context?.parentType || 'Query';
  }

  getEndpointPath(log: PerformanceMetric): string {
    if (this.isGraphQLLog(log)) {
      const fieldName = this.getFieldName(log);
      const operation = this.getOperationType(log);
      return `/graphql/${fieldName} (${operation})`;
    }
    return log.url || log.context?.url || '-';
  }

  hasGraphQLArgs(log: PerformanceMetric): boolean {
    return log.context && log.context.args && Object.keys(log.context.args).length > 0;
  }

  getGraphQLArgs(log: PerformanceMetric): any {
    return log.context?.args || {};
  }

  // Modal dialog methods
  showLogDetails(log: PerformanceMetric): void {
    this.selectedLog = log;
    const dialogRef = this.dialog.open(this.logDetailsModalTemplate, {
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '90vh'
    });
  }

  closeLogDetails(): void {
    this.selectedLog = null;
    this.dialog.closeAll();
  }

  copyLogDetails(): void {
    if (this.selectedLog) {
      const details = {
        id: this.selectedLog.id,
        name: this.selectedLog.name,
        duration: this.selectedLog.duration,
        timestamp: this.selectedLog.timestamp,
        success: this.selectedLog.success,
        error: this.selectedLog.error,
        context: this.selectedLog.context
      };
      
      navigator.clipboard.writeText(JSON.stringify(details, null, 2)).then(() => {
        this.showSnackBar('Log details copied to clipboard', 'success');
      }).catch(() => {
        this.showSnackBar('Failed to copy to clipboard', 'error');
      });
    }
  }

  // Filter and stats methods
  resetFilters(): void {
    this.selectedOperation = '';
    this.selectedSuccess = 'all';
    this.selectedOperationType = 'all';
    this.selectedRequestType = 'all';
    this.minDuration = null;
    this.logLimit = 50;
    this.onFilterChange();
  }

  getGraphQLLogsCount(): number {
    return this.logs.filter(log => this.isGraphQLLog(log)).length;
  }

  getSuccessfulLogsCount(): number {
    return this.logs.filter(log => log.success).length;
  }

  getAverageDuration(): string {
    if (this.logs.length === 0) return '0';
    const avg = this.logs.reduce((sum, log) => sum + log.duration, 0) / this.logs.length;
    return avg.toFixed(1);
  }
}
