import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

// Use APIURL from environment
const API_URL = environment.APIURL; // Production API URL

export interface PerformanceLogFilter {
  limit?: number;
  offset?: number;
  operation?: string;
  success?: boolean;
  minDuration?: number;
  hours?: number;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  duration: number;
  timestamp: string;
  context?: any;
  success: boolean;
  error?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  memoryUsage?: number;
}

export interface PerformanceStats {
  timeRange: string;
  overview: {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    successRate: string;
    avgDuration: string;
    maxDuration: string;
    minDuration: string;
  };
  slowestOperations: Array<{
    name: string;
    duration: string;
    timestamp: string;
    url?: string;
    error?: string;
  }>;
  recentErrors: Array<{
    name: string;
    error: string;
    duration: string;
    timestamp: string;
    url?: string;
  }>;
  operationBreakdown: Array<{
    operation: string;
    count: number;
    avgDuration: string;
    maxDuration: string;
    minDuration: string;
  }>;
}

export interface PerformanceTrend {
  hour: string;
  totalOperations: number;
  avgDuration: string;
  maxDuration: string;
  errorCount: number;
  errorRate: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = `${API_URL}/performance`;

  constructor(private http: HttpClient) {}

  // Lấy real-time stats từ memory
  getRealTimeStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  // Lấy database stats với filtering
  getDatabaseStats(hours: number = 24): Observable<PerformanceStats> {
    const params = new HttpParams().set('hours', hours.toString());
    return this.http.get<PerformanceStats>(`${this.baseUrl}/db-stats`, { params });
  }

  // Lấy filtered logs
  getLogs(filter: PerformanceLogFilter = {}): Observable<PerformanceMetric[]> {
    let params = new HttpParams();
    
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.offset) params = params.set('offset', filter.offset.toString());
    if (filter.operation) params = params.set('operation', filter.operation);
    if (filter.success !== undefined) params = params.set('success', filter.success.toString());
    if (filter.minDuration) params = params.set('minDuration', filter.minDuration.toString());
    if (filter.hours) params = params.set('hours', filter.hours.toString());

    return this.http.get<PerformanceMetric[]>(`${this.baseUrl}/logs`, { params });
  }

  // Lấy performance trends
  getTrends(hours: number = 24): Observable<PerformanceTrend[]> {
    const params = new HttpParams().set('hours', hours.toString());
    return this.http.get<PerformanceTrend[]>(`${this.baseUrl}/trends`, { params });
  }

  // Lấy summary dashboard
  getSummary(hours: number = 24): Observable<any> {
    const params = new HttpParams().set('hours', hours.toString());
    return this.http.get(`${this.baseUrl}/summary`, { params });
  }

  // Cleanup old logs
  cleanupLogs(days: number = 30): Observable<any> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get(`${this.baseUrl}/cleanup`, { params });
  }

  // Clear memory metrics
  clearMemoryMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/clear`);
  }

  // Test endpoints
  testFastOperation(): Observable<any> {
    return this.http.get(`${API_URL}/test-performance/fast`);
  }

  testSlowOperation(): Observable<any> {
    return this.http.get(`${API_URL}/test-performance/slow`);
  }

  testErrorOperation(): Observable<any> {
    return this.http.get(`${API_URL}/test-performance/error`);
  }

  testBulkOperations(): Observable<any> {
    return this.http.post(`${API_URL}/test-performance/bulk`, {});
  }
}
