import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { CronExecutionLog, CronJob, CronJobProgress, CronJobResult, CronLogStats } from './cron-management';

@Injectable({
  providedIn: 'root'
})
export class CronManagementService {
  constructor(private storageService: StorageService) {
    // Load logs từ database khi khởi tạo
    this.loadLogsFromDatabase();
  }

  jobs = signal<CronJob[]>([]);
  executionLogs = signal<CronExecutionLog[]>([]);
  loading = signal<boolean>(false);
  loadingLogs = signal<boolean>(false);
  runningJobs = signal<Set<string>>(new Set());
  jobProgress = signal<Map<string, CronJobProgress>>(new Map());
  logStats = signal<CronLogStats | null>(null);

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getItem('token')
    };
  }

  async getJobs(): Promise<CronJob[]> {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/cron-management/jobs`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      this.jobs.set(result || []);
      return result;
    } catch (error) {
      console.error('Error fetching cron jobs:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  updateProgress(jobId: string, progress: CronJobProgress) {
    this.jobProgress.update(map => {
      const newMap = new Map(map);
      newMap.set(jobId, progress);
      return newMap;
    });
    
    // Also update log entry
    this.executionLogs.update(logs => 
      logs.map(l => l.jobId === jobId && l.status === 'running' ? {
        ...l,
        progress
      } : l)
    );
  }

  getProgress(jobId: string): CronJobProgress | undefined {
    return this.jobProgress().get(jobId);
  }

  async triggerJob(jobId: string, params?: any): Promise<CronJobResult> {
    const startTime = Date.now();
    const initialProgress: CronJobProgress = {
      current: 0,
      total: 100,
      percentage: 0,
      currentStep: 'Đang khởi tạo...',
      details: [],
      startTime: new Date()
    };

    const log: CronExecutionLog = {
      id: `log-${Date.now()}`,
      jobId,
      jobName: this.jobs().find(j => j.id === jobId)?.name || jobId,
      startTime: new Date(),
      status: 'running',
      progress: initialProgress
    };

    // Add to running jobs
    this.runningJobs.update(set => {
      const newSet = new Set(set);
      newSet.add(jobId);
      return newSet;
    });

    // Initialize progress
    this.updateProgress(jobId, initialProgress);

    // Add log entry
    this.executionLogs.update(logs => [log, ...logs.slice(0, 49)]);

    try {
      // Start progress simulation for better UX
      const progressInterval = this.startProgressSimulation(jobId);

      const response = await fetch(
        `${environment.APIURL}/cron-management/trigger/${jobId}`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: params ? JSON.stringify(params) : undefined
        }
      );

      // Stop simulation
      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CronJobResult = await response.json();

      // Final progress
      const finalProgress: CronJobProgress = {
        current: 100,
        total: 100,
        percentage: 100,
        currentStep: result.success ? 'Hoàn thành!' : 'Có lỗi xảy ra',
        details: this.extractProgressDetails(result),
        startTime: new Date(startTime)
      };

      this.updateProgress(jobId, finalProgress);

      // Update log entry
      this.executionLogs.update(logs => 
        logs.map(l => l.id === log.id ? {
          ...l,
          endTime: new Date(),
          status: result.success ? 'success' as const : 'failed' as const,
          message: result.message,
          error: result.error,
          progress: finalProgress
        } : l)
      );

      // Clear progress after delay
      setTimeout(() => {
        this.jobProgress.update(map => {
          const newMap = new Map(map);
          newMap.delete(jobId);
          return newMap;
        });
      }, 3000);

      return result;
    } catch (error: any) {
      // Update log entry with error
      const errorProgress: CronJobProgress = {
        current: 0,
        total: 100,
        percentage: 0,
        currentStep: 'Lỗi: ' + error.message,
        details: []
      };

      this.updateProgress(jobId, errorProgress);

      this.executionLogs.update(logs => 
        logs.map(l => l.id === log.id ? {
          ...l,
          endTime: new Date(),
          status: 'failed' as const,
          error: error.message,
          progress: errorProgress
        } : l)
      );

      // Clear progress after delay
      setTimeout(() => {
        this.jobProgress.update(map => {
          const newMap = new Map(map);
          newMap.delete(jobId);
          return newMap;
        });
      }, 3000);

      throw error;
    } finally {
      // Remove from running jobs
      this.runningJobs.update(set => {
        const newSet = new Set(set);
        newSet.delete(jobId);
        return newSet;
      });
      
      // Reload logs từ database sau khi hoàn thành (backend đã lưu)
      setTimeout(() => {
        this.loadLogsFromDatabase();
      }, 1000);
    }
  }

  private startProgressSimulation(jobId: string): any {
    let progress = 0;
    const steps = [
      'Đang khởi tạo...',
      'Đang kết nối...',
      'Đang xử lý dữ liệu...',
      'Đang đồng bộ...',
      'Đang hoàn tất...'
    ];
    
    return setInterval(() => {
      if (progress < 90) {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        
        const stepIndex = Math.min(
          Math.floor(progress / 20),
          steps.length - 1
        );

        this.updateProgress(jobId, {
          current: Math.round(progress),
          total: 100,
          percentage: Math.round(progress),
          currentStep: steps[stepIndex],
          details: []
        });
      }
    }, 500);
  }

  private extractProgressDetails(result: CronJobResult): string[] {
    const details: string[] = [];
    
    // Hiển thị details từ API (đã format sẵn)
    if (result.details) {
      if (typeof result.details === 'string') {
        // Split by newline nếu có nhiều dòng
        const lines = result.details.split('\n').filter(l => l.trim());
        details.push(...lines);
      } else if (Array.isArray(result.details)) {
        details.push(...result.details);
      }
    }
    
    if (result.result) {
      if (typeof result.result === 'object') {
        // Extract meaningful info from result
        if (result.result.databaseSize) {
          details.push(`💾 Dung lượng DB: ${result.result.databaseSize}`);
        }
        if (result.result.totalRecords !== undefined) {
          details.push(`📊 Tổng records: ${result.result.totalRecords.toLocaleString('vi-VN')}`);
        }
        if (result.result.tableCount !== undefined) {
          details.push(`📋 Số bảng: ${result.result.tableCount}`);
        }
        if (result.result.syncedCount !== undefined) {
          details.push(`Đã đồng bộ: ${result.result.syncedCount} bản ghi`);
        }
        if (result.result.updatedCount !== undefined) {
          details.push(`Đã cập nhật: ${result.result.updatedCount} bản ghi`);
        }
        if (result.result.processedCount !== undefined) {
          details.push(`Đã xử lý: ${result.result.processedCount} bản ghi`);
        }
        if (result.result.message) {
          details.push(result.result.message);
        }
        if (result.result.error) {
          details.push(`❌ ${result.result.error}`);
        }
      } else if (typeof result.result === 'string') {
        details.push(result.result);
      }
    }

    if (result.executionTime) {
      details.push(`⏱️ Thời gian: ${(result.executionTime / 1000).toFixed(2)}s`);
    }

    return details;
  }

  isJobRunning(jobId: string): boolean {
    return this.runningJobs().has(jobId);
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Database': '🗄️',
      'Đơn hàng': '📦',
      'System': '⚙️',
      'default': '🔧'
    };
    return icons[category] || icons['default'];
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'inactive': '#6b7280',
      'running': '#3b82f6',
      'success': '#10b981',
      'failed': '#ef4444'
    };
    return colors[status] || '#6b7280';
  }

  // ===== Database Persistence Methods =====
  
  /**
   * Load logs từ database API
   */
  async loadLogsFromDatabase(options?: {
    page?: number;
    limit?: number;
    status?: string;
    jobId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<void> {
    try {
      this.loadingLogs.set(true);
      
      const params = new URLSearchParams();
      if (options?.page) params.set('page', String(options.page));
      // Mặc định 10 logs gần nhất
      params.set('limit', String(options?.limit || 10));
      if (options?.status) params.set('status', options.status);
      if (options?.jobId) params.set('jobId', options.jobId);
      if (options?.startDate) params.set('startDate', options.startDate.toISOString());
      if (options?.endDate) params.set('endDate', options.endDate.toISOString());

      const url = `${environment.APIURL}/cron-management/logs${params.toString() ? '?' + params.toString() : ''}`;
      console.log('Loading logs from:', url); // Debug
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      console.log('Logs response status:', response.status); // Debug

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API logs response:', result); // Debug
      
      // Map data từ API sang format frontend
      // Backend trả về { logs, total }
      const logsData = result.logs || result.data || [];
      const logs: CronExecutionLog[] = logsData.map((log: any) => ({
        id: log.id,
        jobId: log.jobId,
        jobName: log.jobName,
        category: log.category,
        startTime: new Date(log.startTime),
        endTime: log.endTime ? new Date(log.endTime) : undefined,
        status: log.status?.toLowerCase() || 'pending',
        message: log.message,
        error: log.error,
        executionTime: log.executionTime,
        triggeredBy: log.triggeredBy,
        progress: log.details ? {
          current: 100,
          total: 100,
          percentage: 100,
          currentStep: log.status === 'SUCCESS' ? 'Hoàn thành' : 'Thất bại',
          details: this.parseDetails(log.details)
        } : undefined
      }));

      this.executionLogs.set(logs);
      
      // Load stats
      await this.loadLogStats();
      
    } catch (error) {
      console.error('Error loading logs from database:', error);
    } finally {
      this.loadingLogs.set(false);
    }
  }

  /**
   * Load thống kê logs
   */
  async loadLogStats(): Promise<CronLogStats | null> {
    try {
      const response = await fetch(
        `${environment.APIURL}/cron-management/logs/stats`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const stats = await response.json();
      this.logStats.set(stats);
      return stats;
    } catch (error) {
      console.error('Error loading log stats:', error);
      return null;
    }
  }

  /**
   * Xóa tất cả logs từ database
   */
  async clearLogsFromDatabase(): Promise<void> {
    try {
      const response = await fetch(
        `${environment.APIURL}/cron-management/logs`,
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear local state
      this.executionLogs.set([]);
      this.logStats.set(null);
    } catch (error) {
      console.error('Error clearing logs:', error);
      throw error;
    }
  }

  /**
   * Dọn dẹp logs cũ (giữ lại N ngày gần nhất)
   */
  async cleanupOldLogs(daysToKeep: number = 30): Promise<{ deletedCount: number }> {
    try {
      const response = await fetch(
        `${environment.APIURL}/cron-management/logs/cleanup`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({ daysToKeep })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Reload logs after cleanup
      await this.loadLogsFromDatabase();
      
      return result;
    } catch (error) {
      console.error('Error cleaning up old logs:', error);
      throw error;
    }
  }

  private parseDetails(details: any): string[] {
    if (!details) return [];
    if (Array.isArray(details)) {
      return details.map(item => typeof item === 'string' ? item : this.formatValue(item));
    }
    if (typeof details === 'string') {
      try {
        const parsed = JSON.parse(details);
        return this.parseDetails(parsed);
      } catch {
        return details.split('\n').filter((l: string) => l.trim());
      }
    }
    if (typeof details === 'object') {
      // Convert object to readable strings
      const result: string[] = [];
      for (const [key, value] of Object.entries(details)) {
        if (key === 'tableStats' && Array.isArray(value)) {
          // Format tableStats đặc biệt
          const topTables = (value as any[])
            .filter(t => t.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          if (topTables.length > 0) {
            const tablesStr = topTables
              .map(t => `${t.name}: ${t.count?.toLocaleString('vi-VN') || 0}`)
              .join(' | ');
            result.push(`📋 Top bảng: ${tablesStr}`);
          }
        } else {
          result.push(`${this.formatKey(key)}: ${this.formatValue(value)}`);
        }
      }
      return result;
    }
    return [];
  }

  private formatKey(key: string): string {
    const keyMap: Record<string, string> = {
      'databaseSize': '💾 Dung lượng DB',
      'totalRecords': '📊 Tổng records',
      'tableCount': '📋 Số bảng',
      'syncedCount': '✅ Đã đồng bộ',
      'updatedCount': '🔄 Đã cập nhật',
      'processedCount': '⚙️ Đã xử lý',
      'message': '📝 Thông báo',
      'error': '❌ Lỗi'
    };
    return keyMap[key] || key;
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') return value.toLocaleString('vi-VN');
    if (typeof value === 'boolean') return value ? 'Có' : 'Không';
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return `[${value.length} items]`;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  clearLogs() {
    // Clear local state và database
    this.clearLogsFromDatabase().catch(console.error);
  }
}
