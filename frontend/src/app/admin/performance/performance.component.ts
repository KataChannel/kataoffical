import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule
  ],
  templateUrl: './performance.component.html',
  styleUrls: []
})
export class PerformanceComponent implements OnInit, OnDestroy {
  // Data properties
  summary: any = null;
  dbStats: PerformanceStats | null = null;
  logs: PerformanceMetric[] = [];
  trends: PerformanceTrend[] = [];

  // Filter properties
  selectedHours: number = 24;
  selectedOperation: string = '';
  selectedSuccess: string = 'all';
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
      minDuration: this.minDuration || undefined
    };

    this.performanceService.getLogs(filter).subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
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
}
